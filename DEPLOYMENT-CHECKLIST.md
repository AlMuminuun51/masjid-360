# MASJID 360 Deployment Checklist

## PWA

- [ ] `manifest.webmanifest` terbaca.
- [ ] `service-worker.js` aktif pada HTTPS.
- [ ] Logo aplikasi tampil pada install prompt.
- [ ] Login menampilkan logo MDD dan teks `Developed by : Markaz Dakwah Digital`.
- [ ] Dashboard menampilkan teks `Developed by : Markaz Dakwah Digital`.

## GitHub Pages

- [ ] Semua file berada di root repository atau path Pages yang benar.
- [ ] GitHub Pages memakai HTTPS.
- [ ] `start_url` pada manifest cocok dengan lokasi hosting.
- [ ] Cache service worker di-refresh setelah update versi.

## Google Workspace

- [ ] Sheet dibuat di akun `al.muminuun51@gmail.com`.
- [ ] Apps Script terpasang di Sheet yang benar.
- [ ] Fungsi `setupMasjid360` sudah dijalankan.
- [ ] Deployment Web App sudah dibuat.
- [ ] Web App URL sudah dimasukkan ke `config.js`.
- [ ] Kebijakan akses Web App sesuai keputusan takmir.

## Produksi

- [ ] Ganti login demo dengan Google OAuth.
- [ ] Validasi role dari backend, bukan dari frontend.
- [ ] Terapkan rate limit dan validasi input di Apps Script.
- [ ] Proteksi tab audit log.
- [ ] Tentukan data yang boleh masuk public dashboard.
- [ ] Backup Google Sheet terjadwal.
