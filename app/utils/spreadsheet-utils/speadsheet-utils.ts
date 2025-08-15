import Papa from "papaparse";
import { Config } from "../Config";

//TODO: the columns are just placeholders, we need to change them to the actual columns
export type RecoveryAccountRow = {
  username: string;
  data: string;
  amount: number;
  expiration: string;
};

export async function fetchRowsFromCsv(): Promise<RecoveryAccountRow[]> {
  const res = await fetch(Config.spreadsheetUrl, { cache: "no-store" });
  const text = await res.text();

  const parsed = Papa.parse<string[]>(text, {
    header: true, // uses first row as header
    skipEmptyLines: true,
  });

  if (parsed.errors.length) {
    throw new Error(parsed.errors.map((e) => e.message).join("; "));
  }

  //TODO: the columns are just placeholders, we need to change them to the actual columns
  return (parsed.data as any[]).map((r) => ({
    username: String(r.username ?? "").trim(),
    data: String(r.data ?? "").trim(),
    amount: Number(r.amount ?? 0),
    expiration: String(r.expiration ?? "").trim(),
  }));
}

export async function getRowByUsername(
  username: string
): Promise<RecoveryAccountRow | undefined> {
  const res = await fetch(Config.spreadsheetUrl, { cache: "no-store" });
  const csvText = await res.text();

  const parsed = Papa.parse<RecoveryAccountRow>(csvText, {
    header: true, // First row = headers
    skipEmptyLines: true, // Ignore blank lines
  });

  if (parsed.errors.length) {
    throw new Error(
      "CSV parse error: " + parsed.errors.map((e) => e.message).join("; ")
    );
  }

  const target = username.trim().toLowerCase();

  return parsed.data.find(
    (row) => row.username?.trim().toLowerCase() === target
  );
}
