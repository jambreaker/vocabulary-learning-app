export type Grade = {
  /** Ganze Note 1-6 */
  value: 1 | 2 | 3 | 4 | 5 | 6;
  /** Anzeige inkl. Tendenz, z. B. "2+" oder "3-" */
  display: string;
  label: string;
};

const GRADE_LABELS: Record<Grade["value"], string> = {
  1: "sehr gut",
  2: "gut",
  3: "befriedigend",
  4: "ausreichend",
  5: "mangelhaft",
  6: "ungenügend",
};

// Untere Prozentgrenzen, absteigend sortiert (Basis: 92/81/67/50/30 für die ganzen Noten).
const THRESHOLDS: Array<{ min: number; value: Grade["value"]; display: string }> = [
  { min: 98, value: 1, display: "1+" },
  { min: 95, value: 1, display: "1" },
  { min: 92, value: 1, display: "1-" },
  { min: 89, value: 2, display: "2+" },
  { min: 85, value: 2, display: "2" },
  { min: 81, value: 2, display: "2-" },
  { min: 76, value: 3, display: "3+" },
  { min: 71, value: 3, display: "3" },
  { min: 67, value: 3, display: "3-" },
  { min: 61, value: 4, display: "4+" },
  { min: 56, value: 4, display: "4" },
  { min: 50, value: 4, display: "4-" },
  { min: 43, value: 5, display: "5+" },
  { min: 37, value: 5, display: "5" },
  { min: 30, value: 5, display: "5-" },
];

/** Deutsche Schulnote mit Tendenz (+/-) nach Prozent-Notenschlüssel. */
export function calculateGrade(known: number, total: number): Grade {
  const percent = total > 0 ? (known / total) * 100 : 0;
  const match = THRESHOLDS.find((entry) => percent >= entry.min);
  const value = match?.value ?? 6;
  return { value, display: match?.display ?? "6", label: GRADE_LABELS[value] };
}
