import Papa from "papaparse";

export type Race = {
  date: string;
  course: string;
  distance: string;
  horse: string;
  jockey: string;
  trainer: string;
  position: number | null;
  odds: string;
};

const CSV_URL =
  "https://raw.githubusercontent.com/LiterallyPizza/Horseracing/refs/heads/main/2025.csv";

const norm = (s: string) => s.trim().toLowerCase().replace(/[\s_]+/g, "");

function pick(row: Record<string, string>, keys: string[]): string {
  const map: Record<string, string> = {};
  for (const k of Object.keys(row)) map[norm(k)] = row[k];
  for (const k of keys) {
    const v = map[norm(k)];
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return "";
}

export async function fetchRaces(): Promise<Race[]> {
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error(`Failed to fetch CSV: ${res.status}`);
  const text = await res.text();

  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });

  return parsed.data
    .map((row) => {
      const posRaw = pick(row, ["finish position", "position", "finish", "pos"]);
      const pos = parseInt(posRaw, 10);
      return {
        date: pick(row, ["race date", "date"]),
        course: pick(row, ["course", "track", "venue"]),
        distance: pick(row, ["distance"]),
        horse: pick(row, ["horse name", "horse"]),
        jockey: pick(row, ["jockey"]),
        trainer: pick(row, ["trainer"]),
        position: Number.isFinite(pos) ? pos : null,
        odds: pick(row, ["odds", "sp", "starting price"]),
      } as Race;
    })
    .filter((r) => r.horse || r.trainer || r.jockey);
}
