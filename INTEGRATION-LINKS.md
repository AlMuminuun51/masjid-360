# MASJID 360 Integration Links

## Google Workspace

- Project folder: https://drive.google.com/drive/folders/1VPISNu09zQuEWr85n6wT4QGIlUrfw03f
- Backend spreadsheet: https://docs.google.com/spreadsheets/d/1byq3QRziKbSGZw-tkcwJ_HWSkGlDpOfki4SByYojdDg/edit
- Uploaded GitHub Pages ZIP: https://drive.google.com/file/d/1kKLMeiNo20XV2LBMLfGpzdfDWslZlEJH/view

## Apps Script Setup

1. Open the backend spreadsheet.
2. Click Extensions -> Apps Script.
3. Copy `backend/google-apps-script/Code.gs` into `Code.gs`.
4. Add/edit `appsscript.json` using `backend/google-apps-script/appsscript.json`.
5. Run `setupMasjid360`.
6. Deploy -> New deployment -> Web app.
7. Copy the Web App URL into `config.js` as `googleAppsScriptUrl`.

## GitHub Pages Setup

1. Create a new GitHub repository, for example `masjid-360`.
2. Upload all files from this folder to the repository root.
3. Open Settings -> Pages.
4. Source: Deploy from a branch.
5. Branch: `main`, folder `/root`.
6. Save and wait for the Pages URL.

## Current Local App

- `config.js` already contains the Google Sheet ID.
- `googleAppsScriptUrl` is still blank until the Apps Script Web App is deployed.
