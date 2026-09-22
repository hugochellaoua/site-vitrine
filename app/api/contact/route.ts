/**
 * Réception du formulaire de contact → message dans Slack.
 *
 * L'envoi passe par un « webhook entrant » Slack : une URL secrète, gratuite,
 * propre à un canal. Aucune dépendance, aucun service tiers en plus.
 * L'URL est lue dans la variable d'environnement `SLACK_WEBHOOK_URL`, jamais
 * dans le code : quiconque la connaît peut écrire dans le canal.
 *
 * Règle directrice : on ne répond « envoyé » au visiteur que si Slack a
 * confirmé la réception. Une demande perdue en silence est le pire résultat
 * possible pour un formulaire commercial.
 */

const LIMITS = { firstName: 80, lastName: 80, email: 200, phone: 40, message: 2800, source: 60 } as const;

// Format d'adresse volontairement permissif : le seul but est d'écarter la
// faute de frappe manifeste, pas de trancher sur la validité d'une adresse.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = Record<keyof typeof LIMITS, string>;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Neutralise le texte saisi avant de l'insérer dans un message Slack.
 * Dans la syntaxe Slack, `<…>` crée des mentions (`<!channel>`, `<@U123>`) et
 * des liens (`<https://…|texte>`) : sans cet échappement, n'importe quel
 * visiteur pourrait notifier tout l'espace de travail ou glisser un faux lien.
 */
function escape(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function slackMessage(d: Payload) {
  const name = [d.firstName, d.lastName].filter(Boolean).join(" ") || "Sans nom";
  const quoted = d.message
    ? escape(d.message)
        .split("\n")
        .map((line) => `>${line}`)
        .join("\n")
    : "_Aucun message_";

  return {
    // Texte de repli : c'est lui qu'affichent les notifications mobiles.
    text: `${d.source ? escape(d.source) : "Nouvelle demande de contact"} — ${escape(name)} (${escape(d.email)})`,
    blocks: [
      { type: "header", text: { type: "plain_text", text: d.source ? `📊 ${d.source}` : "📩 Nouvelle demande de contact" } },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Nom*\n${escape(name)}` },
          { type: "mrkdwn", text: `*E-mail*\n${escape(d.email)}` },
          { type: "mrkdwn", text: `*Téléphone*\n${d.phone ? escape(d.phone) : "—"}` },
        ],
      },
      { type: "section", text: { type: "mrkdwn", text: `*Message*\n${quoted}` } },
      {
        type: "context",
        elements: [{ type: "mrkdwn", text: `Envoyé depuis ${escape(d.source || "le formulaire de contact du site")}` }],
      },
    ],
  };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Pot de miel : un champ invisible pour un humain, que les robots remplissent.
  // On répond « envoyé » pour ne pas leur apprendre à le contourner, mais rien ne part.
  if (clean(body.website, 200)) {
    return Response.json({ ok: true });
  }

  const data: Payload = {
    firstName: clean(body.firstName, LIMITS.firstName),
    lastName: clean(body.lastName, LIMITS.lastName),
    email: clean(body.email, LIMITS.email),
    phone: clean(body.phone, LIMITS.phone),
    message: clean(body.message, LIMITS.message),
    // D'où vient la demande : formulaire de contact ou simulateur de ROI.
    source: clean(body.source, LIMITS.source),
  };

  if (!EMAIL.test(data.email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    // Non configuré : on refuse plutôt que de faire croire à un envoi réussi.
    console.error("[contact] SLACK_WEBHOOK_URL absente — demande non transmise :", data.email);
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackMessage(data)),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("[contact] Slack a refusé la demande :", res.status, await res.text());
      return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] Slack injoignable :", err);
    return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
