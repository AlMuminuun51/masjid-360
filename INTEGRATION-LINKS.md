# MASJID 360 Integration Links

## Google Workspace

- Project folder: https://drive.google.com/drive/folders/1VPISNu09zQuEWr85n6wT4QGIlUrfw03f
- Backend spreadsheet: https://docs.google.com/spreadsheets/d/1byq3QRziKbSGZw-tkcwJ_HWSkGlDpOfki4SByYojdDg/edit
- Uploaded GitHub Pages ZIP: https://drive.google.com/file/d/1kKLMeiNo20XV2LBMLfGpzdfDWslZlEJH/view
- Workspace account: al.muminuun51@gmail.com

## Apps Script Setup

Apps Script project created:

- https://script.google.com/home/projects/1ol59D7EzCpt1vIbEkrziNaSX8fKbow0G0xPyTe7crMsatkfVY4UHQ0i3/edit

The `Code.gs` file is already prepared as a standalone Web App backend and points to the backend spreadsheet ID above.

Manual step still required in the Apps Script browser tab:

1. In the open `Deployment baru` dialog, click `Izinkan akses`.
2. Complete the Google authorization prompt for `al.muminuun51@gmail.com`.
3. Finish deploy as `Aplikasi web`.
4. Set `Jalankan sebagai` to `Saya (al.muminuun51@gmail.com)`.
5. Set `Yang memiliki akses` to `Siapa saja`.
6. Copy the generated Web App URL.
7. Paste the URL into `config.js` as `googleAppsScriptUrl`.
8. Re-upload `config.js` to GitHub so the public PWA uses the live backend.

## GitHub Pages Setup

- Repository: https://github.com/AlMuminuun51/masjid-360
- Public PWA: https://almuminuun51.github.io/masjid-360/
- Source: Deploy from a branch
- Branch: `main`
- Folder: `/ (root)`

## Current Local App

- `config.js` already contains the Google Sheet ID.
- `googleAppsScriptUrl` is still blank until the Apps Script Web App is deployed.
