const SPREADSHEET_ID = "1byq3QRziKbSGZw-tkcwJ_HWSkGlDpOfki4SByYojdDg";

const SHEETS = [
  "transactions",
  "programs",
  "people",
  "assets",
  "notifications",
  "auditLogs",
  "settings"
];

function doGet() {
  return jsonResponse({
    ok: true,
    app: "MASJID 360",
    workspace: Session.getActiveUser().getEmail(),
    data: readAll()
  });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    if (body.action === "sync") {
      writeAll(body.payload || {});
      return jsonResponse({ ok: true, message: "Synced to Google Sheets" });
    }
    if (body.action === "append") {
      appendRecord(body.sheet, body.record);
      return jsonResponse({ ok: true, message: "Record appended" });
    }
    return jsonResponse({ ok: false, message: "Unknown action" });
  } catch (error) {
    return jsonResponse({ ok: false, message: error.message });
  }
}

function setupMasjid360() {
  const ss = getSpreadsheet();
  SHEETS.forEach((name) => ensureSheet(ss, name));
  PropertiesService.getScriptProperties().setProperty("MASJID_360_READY", "true");
  return "MASJID 360 backend ready";
}

function readAll() {
  const ss = getSpreadsheet();
  return SHEETS.reduce((result, sheetName) => {
    const sheet = ensureSheet(ss, sheetName);
    result[sheetName] = readSheet(sheet);
    return result;
  }, {});
}

function writeAll(payload) {
  const ss = getSpreadsheet();
  Object.keys(payload).forEach((sheetName) => {
    if (!SHEETS.includes(sheetName) || !Array.isArray(payload[sheetName])) return;
    const sheet = ensureSheet(ss, sheetName);
    writeSheet(sheet, payload[sheetName]);
  });
}

function appendRecord(sheetName, record) {
  if (!SHEETS.includes(sheetName)) throw new Error("Sheet is not allowed");
  const sheet = ensureSheet(getSpreadsheet(), sheetName);
  const headers = getHeaders(sheet, record);
  sheet.appendRow(headers.map((header) => record[header] || ""));
}

function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function ensureSheet(ss, name) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(defaultHeaders(name));
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function defaultHeaders(name) {
  const headers = {
    transactions: ["id", "date", "source", "type", "category", "program", "beneficiary", "method", "amount", "status", "inputBy", "verifiedBy", "approvedBy", "updatedAt", "deletedAt"],
    programs: ["id", "name", "category", "pic", "schedule", "budget", "target", "actual", "progress", "status", "kpi", "description", "updatedAt", "deletedAt"],
    people: ["id", "name", "role", "category", "phone", "address", "expertise", "bio", "engagement", "updatedAt", "deletedAt"],
    assets: ["id", "name", "type", "location", "pic", "budget", "realized", "progress", "status", "acquisitionStatus", "serial", "description", "updatedAt", "deletedAt"],
    notifications: ["type", "title", "severity", "time", "read", "actionUrl"],
    auditLogs: ["actor", "action", "object", "before", "after", "time", "device"],
    settings: ["key", "value", "updatedAt"]
  };
  return headers[name] || ["id", "value", "updatedAt"];
}

function getHeaders(sheet, record) {
  const existing = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0].filter(String);
  const merged = Array.from(new Set(existing.concat(Object.keys(record || {}))));
  if (merged.length !== existing.length) {
    sheet.getRange(1, 1, 1, merged.length).setValues([merged]);
  }
  return merged;
}

function readSheet(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).filter((row) => row.some(String)).map((row) => {
    return headers.reduce((record, header, index) => {
      record[header] = row[index];
      return record;
    }, {});
  });
}

function writeSheet(sheet, rows) {
  const headers = rows.length ? Array.from(new Set(rows.flatMap((row) => Object.keys(row)))) : defaultHeaders(sheet.getName());
  const values = [headers].concat(rows.map((row) => headers.map((header) => row[header] === undefined ? "" : row[header])));
  sheet.clearContents();
  sheet.getRange(1, 1, values.length, headers.length).setValues(values);
  sheet.setFrozenRows(1);
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
