/**
 * Shaders de la galaxie.
 *
 * Deux passes, dessinées dans cet ordre sur un même canvas :
 *
 *  1. la nébuleuse — un quad plein écran dont le fragment shader fabrique une
 *     matière nuageuse par bruit fractal ; c'est elle qui donne au noir son
 *     épaisseur et sa couleur ;
 *  2. les étoiles — des sprites de points en mélange additif, projetés en
 *     perspective, dont la profondeur boucle sur le GPU (aucun recyclage côté
 *     processeur, d'où le nombre de particules possible).
 *
 * Le halo lumineux n'est pas obtenu par une passe de post-traitement : chaque
 * étoile porte son propre dégradé radial et le mélange additif les fait
 * s'additionner. Résultat proche d'un bloom, pour une fraction du coût.
 */

export const QUAD_VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

export const NEBULA_FRAG = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 outColor;

uniform vec2  uResolution;
uniform float uTime;
uniform float uDepth;    // avancée de la caméra, normalisée
uniform vec2  uMouse;
uniform float uOpacity;
uniform float uLight;    // intensité de la lampe portée par le curseur

// Bruit de valeur : suffisant ici, et bien moins coûteux qu'un simplex.
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Bruit fractal : l'empilement d'octaves donne les volutes.
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(37.1, 17.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;

  // Position à l'écran, conservée telle quelle : c'est contre elle qu'on
  // mesure la distance au curseur, avant que la parallaxe ne décale la matière.
  vec2 pScreen = (uv - 0.5) * vec2(aspect, 1.0);

  vec2 p = pScreen;
  // Parallaxe : la nébuleuse dérive plus lentement que les étoiles, ce qui
  // la place derrière elles sans qu'on ait à la dessiner plus loin.
  p += uMouse * 0.012;
  p.y += uDepth * 0.09;

  // La lampe. uMouse est en repère écran (y vers le bas), l'espace de rendu
  // a son y vers le haut : d'où l'inversion.
  vec2 lampPos = vec2(uMouse.x * aspect, -uMouse.y);
  float lampDist = length(pScreen - lampPos);
  float lamp = exp(-lampDist * lampDist * 7.0) * uLight;

  float t = uTime * 0.012;

  // Déformation du domaine : le bruit se replie sur lui-même et cesse de
  // ressembler à des taches régulières.
  vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 2.2 + 3.4 * q + vec2(1.7, 9.2) + t * 0.6),
                fbm(p * 2.2 + 3.4 * q + vec2(8.3, 2.8) - t * 0.4));
  float f = fbm(p * 2.4 + 3.0 * r);

  // Bande de la voie lactée : la densité se concentre le long d'un axe
  // légèrement ondulé, au lieu de baigner tout l'écran uniformément.
  float axis = p.y * 1.35 + sin(p.x * 0.8 + 0.4) * 0.28 + cos(p.x * 1.9) * 0.06;
  float band = exp(-axis * axis * 3.2);

  // La lampe ne peint pas un rond de lumière : elle abaisse le seuil de
  // révélation, si bien qu'elle fait *apparaître* la structure déjà présente
  // dans le bruit. C'est ce qui distingue un éclairage d'une tache.
  float reveal = lamp * 0.30;
  float density = smoothstep(0.32 - reveal, 0.95 - reveal * 0.45, f) * band;

  // Voies obscures : des bandes de poussière qui masquent la lumière.
  float dust = smoothstep(0.45, 0.72, fbm(p * 3.6 + r * 1.5 - t * 0.3));
  density *= 1.0 - dust * 0.55;

  vec3 cold = vec3(0.15, 0.28, 0.85);
  vec3 warm = vec3(0.42, 0.34, 0.78);
  vec3 core = vec3(0.62, 0.72, 1.00);

  vec3 col = mix(cold, warm, smoothstep(0.2, 0.8, r.x));
  col = mix(col, core, pow(density, 3.0) * 0.7);
  // Sous la lampe, la matière tire vers le blanc bleuté : elle est éclairée,
  // pas seulement plus dense.
  col = mix(col, core, lamp * 0.5);

  float a = (density + lamp * 0.05) * 0.20 * uOpacity;

  // Vignettage : le cadre se referme, le regard reste au centre.
  a *= 1.0 - smoothstep(0.35, 1.05, length(p * vec2(0.85, 1.15)));

  outColor = vec4(col * a, a);
}`;

export const STAR_VERT = `#version 300 es
precision highp float;

// x, y : position dans le plan ; z : germe de profondeur ; w : caractère
in vec4 aSeed;

uniform vec2  uResolution;
uniform float uCamZ;
uniform float uNear;
uniform float uFar;
uniform float uFocal;
uniform float uTime;
uniform vec2  uMouse;
uniform float uPixelRatio;
uniform float uReduceMotion;
uniform float uBoot;        // montée en lumière à l'ouverture

out float vBright;
out vec3  vColor;

void main() {
  float range = uFar - uNear;

  // Tunnel infini : la profondeur boucle par modulo. Une étoile dépassée par
  // la caméra réapparaît au fond sans que le processeur ait à la recycler —
  // c'est ce qui rend tenable un champ de plusieurs dizaines de milliers.
  float z = uNear + mod(aSeed.z * range - uCamZ, range);

  float scale = uFocal / z;
  float spread = max(uResolution.x, uResolution.y) * 1.25;

  vec2 world = aSeed.xy * spread;
  // Les étoiles proches réagissent davantage à la souris que les lointaines.
  world += uMouse * (1.0 - z / uFar) * 55.0;

  vec2 screen = uResolution * 0.5 + world * scale;
  vec2 ndc = (screen / uResolution) * 2.0 - 1.0;
  gl_Position = vec4(ndc.x, -ndc.y, 0.0, 1.0);

  float character = fract(aSeed.w);
  float radius = mix(0.5, 2.1, character * character);
  gl_PointSize = clamp(radius * scale * 9.0 * uPixelRatio, 1.0, 110.0);

  // Apparition au loin, extinction juste devant l'objectif.
  float depthFade = smoothstep(uFar, uFar * 0.45, z);
  float nearFade  = smoothstep(uNear, uNear + 260.0, z);

  float phase = aSeed.w * 43.0;
  float twinkle = uReduceMotion > 0.5
    ? 1.0
    : 0.78 + 0.22 * sin(uTime * 0.9 + phase);

  vBright = depthFade * nearFade * twinkle * mix(0.35, 1.0, character) * uBoot;

  // Une minorité d'étoiles franchement plus chaudes ou plus bleues : c'est
  // cette dispersion, et non la quantité, qui rend un ciel crédible.
  float tint = fract(aSeed.w * 7.13);
  vec3 white = vec3(0.92, 0.95, 1.00);
  vec3 blue  = vec3(0.62, 0.74, 1.00);
  vec3 amber = vec3(1.00, 0.90, 0.76);
  vColor = tint > 0.86 ? amber : (tint > 0.55 ? blue : white);
}`;

export const STAR_FRAG = `#version 300 es
precision highp float;

in float vBright;
in vec3  vColor;
out vec4 outColor;

void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;

  // Noyau serré + halo large : additionnés par le mélange additif, ils
  // produisent la diffusion lumineuse d'un vrai bloom.
  float core = pow(1.0 - d, 7.0);
  float halo = pow(1.0 - d, 1.7) * 0.22;

  float a = (core + halo) * vBright;
  outColor = vec4(vColor * a, a);
}`;
