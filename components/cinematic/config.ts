import { processSteps } from "@/lib/content";

// La séquence occupe un écran par étape : la hauteur de la section est produite
// par les paliers de scroll eux-mêmes (voir sequence.tsx), pas par une constante.
export const STEP_COUNT = processSteps.length;
