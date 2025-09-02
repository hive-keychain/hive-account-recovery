import Papa from "papaparse";
import { Config } from "../Config";

export type RecoveryAccountRow = {
  accountRecoveryName: string;
  recoveryLink: string;
  description: string;
};

const stripWrapper = (text: string) => {
  return text.replace(/^[^{]*|[^}]*$/g, "");
};

const extractedSheetIdFromHtmlview = (url: string): string | null => {
  const m = url.match(/\/d\/([a-zA-Z0-9-_]+)\/htmlview/);
  return m ? m[1] : null;
};

const getRecoveryAccountByUsername = async (
  sheetId: string,
  username: string,
  gid: string | number = "0"
): Promise<RecoveryAccountRow | undefined> => {
  const tq = encodeURIComponent(
    `select A,B,C where A='${username.replace(/'/g, "\\'")}' limit 1`
  );
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&tq=${tq}&gid=${gid}&_=${Date.now()}`;

  const res = await fetch(url, { cache: "no-store" });
  const txt = await res.text();
  const json = JSON.parse(stripWrapper(txt));

  const rows = (json.table?.rows ?? []) as Array<{
    c: Array<{ v: any } | null>;
  }>;
  if (!rows.length) return undefined;

  const cells = rows[0].c.map((c) => (c ? c.v : ""));
  const [a, b, c] = cells;

  const row: RecoveryAccountRow = {
    accountRecoveryName: String(a ?? ""),
    recoveryLink: String(b ?? ""),
    description: String(c ?? ""),
  };

  return row.accountRecoveryName ? row : undefined;
};

const getRecoveryByRecoveryUsernameFromHtmlView = async (
  htmlViewUrl: string,
  username: string,
  gid: string | number = "0"
): Promise<RecoveryAccountRow | undefined> => {
  const sheetId = extractedSheetIdFromHtmlview(htmlViewUrl);
  if (!sheetId)
    throw new Error("Could not extract SHEET_ID from htmlview URL.");
  return getRecoveryAccountByUsername(sheetId, username, gid);
};

export const SpreadsheetUtils = {
  getRecoveryByRecoveryUsernameFromHtmlView,
};
