const cfg = window.MASJID360_CONFIG || {};

const state = {
  user: null,
  route: "dashboard",
  data: null,
  deferredInstall: null
};

const navGroups = [
  {
    title: "Pusat Kendali",
    items: [
      ["dashboard", "⌂", "Dashboard Utama"],
      ["action", "!", "Action Required"],
      ["public", "◉", "Public Dashboard"]
    ]
  },
  {
    title: "MASJID 8P Framework",
    items: [
      ["baitullah", "☾", "Baitullah"],
      ["finance", "₨", "Baitul Maal"],
      ["tarbiyah", "▣", "Baitut Tarbiyah"],
      ["dakwah", "◌", "Baitud Dakwah"],
      ["muamalah", "◇", "Baitul Muamalah"]
    ]
  },
  {
    title: "Operasional",
    items: [
      ["programs", "▤", "Program"],
      ["people", "♙", "SDM & Jamaah"],
      ["assets", "▧", "Pembangunan & Aset"],
      ["reports", "▦", "Laporan"]
    ]
  }
];

const permissions = {
  super_admin: ["*"],
  ketua_takmir: ["dashboard", "action", "public", "finance", "programs", "people", "assets", "reports", "baitullah", "tarbiyah", "dakwah", "muamalah"],
  bendahara: ["dashboard", "action", "public", "finance", "reports"],
  admin_program: ["dashboard", "action", "programs", "people", "tarbiyah", "dakwah", "reports"],
  donatur: ["dashboard", "public", "finance", "reports"],
  public: ["public"]
};

const roleCredentials = {
  developer: "developer360",
  super_admin: "admin360",
  takmir: "takmir360",
  jamaah: "jamaah"
};

Object.keys(permissions).forEach((role) => delete permissions[role]);
Object.assign(permissions, {
  developer: ["*"],
  super_admin: ["*"],
  takmir: ["dashboard", "action", "public", "finance", "programs", "people", "assets", "reports", "baitullah", "tarbiyah", "dakwah", "muamalah"],
  jamaah: ["dashboard", "public", "programs", "people", "assets", "reports"]
});

navGroups.forEach((group) => {
  group.items = group.items.filter(([route]) => route !== "settings");
});

const seedData = {
  transactions: [
    { id: "TRX-2026-001", date: "2026-08-01", source: "Infak Jumat", type: "Infak", category: "Penerimaan", program: "Operasional Masjid", beneficiary: "Masjid", method: "Transfer", amount: 18500000, status: "PUBLISHED", inputBy: "Bendahara", verifiedBy: "Ketua Takmir", approvedBy: "Super Admin" },
    { id: "TRX-2026-002", date: "2026-08-03", source: "Donatur Tetap", type: "Sedekah", category: "Penerimaan", program: "Santunan Dhuafa", beneficiary: "Program Sosial", method: "QRIS", amount: 9200000, status: "APPROVED", inputBy: "Bendahara", verifiedBy: "Ketua Takmir", approvedBy: "" },
    { id: "TRX-2026-003", date: "2026-08-04", source: "Kas Masjid", type: "Operasional", category: "Pengeluaran", program: "Kebersihan Masjid", beneficiary: "Vendor", method: "Tunai", amount: 2750000, status: "VERIFIED", inputBy: "Bendahara", verifiedBy: "Ketua Takmir", approvedBy: "" },
    { id: "TRX-2026-004", date: "2026-08-05", source: "Wakaf Produktif", type: "Wakaf", category: "Penerimaan", program: "Renovasi Area Wudhu", beneficiary: "Masjid", method: "Transfer", amount: 25000000, status: "SUBMITTED", inputBy: "Admin", verifiedBy: "", approvedBy: "" },
    { id: "TRX-2026-005", date: "2026-08-07", source: "Dana Pendidikan", type: "Sedekah", category: "Pengeluaran", program: "Tahsin Remaja", beneficiary: "Peserta", method: "Transfer", amount: 3800000, status: "PUBLISHED", inputBy: "Bendahara", verifiedBy: "Ketua Takmir", approvedBy: "Super Admin" }
  ],
  programs: [
    { id: "PRG-001", name: "Tahsin Remaja Masjid", category: "Tarbiyah", pic: "Ustadz Salman", budget: 7200000, target: 80, actual: 64, progress: 72, status: "RUNNING", kpi: "Kehadiran 80%" },
    { id: "PRG-002", name: "Santunan Dhuafa Bulanan", category: "Sosial", pic: "Divisi Sosial", budget: 15000000, target: 120, actual: 96, progress: 83, status: "RUNNING", kpi: "Penyaluran tepat sasaran" },
    { id: "PRG-003", name: "Kajian Keluarga Sakinah", category: "Dakwah", pic: "Ustadzah Nabila", budget: 4500000, target: 250, actual: 310, progress: 100, status: "REPORTED", kpi: "Peserta & dokumentasi" },
    { id: "PRG-004", name: "Bazar Halal UMKM Jamaah", category: "Muamalah", pic: "Tim Ekonomi", budget: 6000000, target: 30, actual: 24, progress: 54, status: "APPROVED", kpi: "UMKM aktif" }
  ],
  people: [
    { id: "PPL-001", name: "Ahmad Fauzan", role: "Ketua Takmir", category: "Takmir Masjid", phone: "Demo", address: "Area masjid", expertise: "Governance", engagement: 94 },
    { id: "PPL-002", name: "Siti Rahmah", role: "Bendahara", category: "Pengurus Masjid", phone: "Demo", address: "Area masjid", expertise: "Keuangan", engagement: 88 },
    { id: "PPL-003", name: "Ustadz Salman", role: "Guru Tahsin", category: "Ustadz", phone: "Demo", address: "Area masjid", expertise: "Tahsin Al-Quran", engagement: 91 },
    { id: "PPL-004", name: "Komunitas Pemuda", role: "Relawan", category: "Pemuda Masjid", phone: "Demo", address: "Area masjid", expertise: "Event & media", engagement: 76 },
    { id: "PPL-005", name: "Hamba Allah", role: "Donatur", category: "Donatur", phone: "Demo", address: "Tidak dipublikasikan", expertise: "Kontribusi program", engagement: 82 }
  ],
  assets: [
    { id: "AST-001", name: "Renovasi Area Wudhu", type: "Proyek Pembangunan", budget: 85000000, realized: 47000000, progress: 55, status: "RUNNING", acquisitionStatus: "Wakaf", location: "Area Wudhu", pic: "Tim Pembangunan" },
    { id: "AST-002", name: "Sound System Utama", type: "Inventaris", budget: 18000000, realized: 18000000, progress: 100, status: "ACTIVE", acquisitionStatus: "Beli", location: "Ruang Utama", pic: "Takmir" },
    { id: "AST-003", name: "Karpet Ruang Utama", type: "Inventaris", budget: 26000000, realized: 0, progress: 15, status: "PLANNED", acquisitionStatus: "Hibah", location: "Ruang Utama", pic: "Pengurus" }
  ],
  notifications: [
    { type: "approval", title: "3 transaksi menunggu approval", severity: "high", time: "Hari ini" },
    { type: "report", title: "2 program belum membuat laporan", severity: "medium", time: "Kemarin" },
    { type: "project", title: "1 proyek melewati timeline rencana", severity: "high", time: "2 hari lalu" },
    { type: "document", title: "5 dokumen bukti perlu dilengkapi", severity: "low", time: "Minggu ini" }
  ],
  quran: [
    { surah: "Al-Fatihah", ayah: 1, arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang." },
    { surah: "Al-Fatihah", ayah: 2, arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "Segala puji bagi Allah, Tuhan seluruh alam." },
    { surah: "Al-Baqarah", ayah: 2, arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ", translation: "Kitab ini tidak ada keraguan padanya." }
  ],
  auditLogs: [
    { actor: "Bendahara", action: "SUBMITTED", object: "TRX-2026-004", time: "2026-08-05 09:10" },
    { actor: "Ketua Takmir", action: "VERIFIED", object: "TRX-2026-003", time: "2026-08-04 16:21" },
    { actor: "Admin Program", action: "UPDATED_PROGRESS", object: "PRG-001", time: "2026-08-03 20:15" }
  ]
};

function loadData() {
  const stored = localStorage.getItem("masjid360:data");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("masjid360:data", JSON.stringify(seedData));
  return structuredClone(seedData);
}

function saveData() {
  localStorage.setItem("masjid360:data", JSON.stringify(state.data));
}

function ensureCollections() {
  state.data.people = state.data.people || [];
  state.data.programs = state.data.programs || [];
  state.data.assets = state.data.assets || [];
  state.data.auditLogs = state.data.auditLogs || [];
}

function can(route) {
  const allowed = permissions[state.user?.role] || [];
  return allowed.includes("*") || allowed.includes(route);
}

function canWrite() {
  return ["developer", "super_admin"].includes(state.user?.role);
}

function rupiah(value) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value || 0);
}

function shortNumber(value) {
  return new Intl.NumberFormat("id-ID").format(value || 0);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2600);
}

function metrics() {
  const income = state.data.transactions.filter((t) => t.category === "Penerimaan").reduce((sum, t) => sum + Number(t.amount), 0);
  const expense = state.data.transactions.filter((t) => t.category === "Pengeluaran").reduce((sum, t) => sum + Number(t.amount), 0);
  const ziswaf = state.data.transactions.filter((t) => ["Zakat", "Infak", "Sedekah", "Wakaf"].includes(t.type)).reduce((sum, t) => sum + Number(t.amount), 0);
  return {
    balance: income - expense,
    income,
    expense,
    ziswaf,
    activePrograms: state.data.programs.filter((p) => ["RUNNING", "APPROVED"].includes(p.status)).length,
    donePrograms: state.data.programs.filter((p) => ["REPORTED", "COMPLETED"].includes(p.status)).length,
    people: state.data.people.length,
    beneficiaries: 612,
    score: Math.round((92 + 89 + 84 + 91 + 72 + 95 + 86 + 81) / 8)
  };
}

function renderNav() {
  const nav = document.getElementById("sideNav");
  nav.innerHTML = navGroups.map((group) => `
    <div class="nav-group">
      <div class="nav-group-title">${group.title}</div>
      ${group.items.filter(([route]) => can(route)).map(([route, icon, label]) => `
        <button class="nav-link ${state.route === route ? "active" : ""}" data-route="${route}">
          <span class="nav-icon">${icon}</span><span>${label}</span>
        </button>
      `).join("")}
    </div>
  `).join("");
  nav.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.route));
  });
}

function navigate(route) {
  if (!can(route)) {
    showToast("Role ini belum memiliki akses ke modul tersebut.");
    return;
  }
  state.route = route;
  location.hash = route;
  renderNav();
  renderView();
  document.querySelector(".sidebar").classList.remove("open");
}

function kpiCard(label, value, delta, badge = "") {
  return `
    <article class="card kpi-card">
      <div class="kpi-top">
        <span class="kpi-icon-3d">${iconForLabel(label)}</span>
        ${badge ? `<span class="badge gold-badge">${badge}</span>` : ""}
      </div>
      <div class="kpi-label"><span>${label}</span></div>
      <div>
        <div class="kpi-value">${value}</div>
        <span class="delta">${delta}</span>
      </div>
    </article>
  `;
}

function iconForLabel(label) {
  const map = {
    "Saldo Kas": "Rp",
    "Penerimaan": "+",
    "Pengeluaran": "-",
    "ZISWAF": "Z",
    "Program Aktif": "P",
    "Program Selesai": "OK",
    "Jamaah": "J",
    "Penerima Manfaat": "M",
    "Total Penerimaan": "+",
    "Total Pengeluaran": "-",
    "Saldo": "Rp",
    "Takmir": "T",
    "Pengurus": "G",
    "Pemuda": "Y",
    "Proyek": "3D",
    "Inventaris": "I",
    "Wakaf": "W",
    "Beli": "B"
  };
  return map[label] || "360";
}

function pageHeader(title, subtitle, action = "") {
  return `
    <div class="page-title title-3d">
      <div>
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </div>
      ${action}
    </div>
  `;
}

function renderDashboard() {
  const m = metrics();
  return `
    ${pageHeader("MASJID 360&deg;", "Satu Data Masjid, satu dashboard akuntabilitas, banyak manfaat untuk umat.", `<span class="badge green">Developed by : Markaz Dakwah Digital</span>`)}
    <section class="dashboard-hero-3d">
      <div class="hero-copy">
        <span class="gold-kicker">Islamic Mosque Operating System</span>
        <h2>Transparansi Amanah dalam Visual 3D Modern</h2>
        <p>Menghubungkan ibadah, dana, program, jamaah, pembangunan, dan laporan publik dalam satu ruang kendali yang lebih dinamis.</p>
      </div>
      <div class="mosque-visual-3d" aria-hidden="true">
        <div class="dome"></div>
        <div class="minaret left"></div>
        <div class="minaret right"></div>
        <div class="mosque-body">
          <span>360</span>
        </div>
        <div class="gold-orbit one"></div>
        <div class="gold-orbit two"></div>
      </div>
    </section>
    <section class="grid cols-4">
      ${kpiCard("Saldo Kas", rupiah(m.balance), "+12% dari bulan lalu", "Amanah")}
      ${kpiCard("Penerimaan", rupiah(m.income), "5 sumber dana aktif")}
      ${kpiCard("Pengeluaran", rupiah(m.expense), "Terkendali")}
      ${kpiCard("ZISWAF", rupiah(m.ziswaf), "Siap dipublikasikan")}
      ${kpiCard("Program Aktif", m.activePrograms, "Berjalan")}
      ${kpiCard("Program Selesai", m.donePrograms, "Sudah dilaporkan")}
      ${kpiCard("Jamaah", shortNumber(m.people), "Database terpadu")}
      ${kpiCard("Penerima Manfaat", shortNumber(m.beneficiaries), "Impact terukur")}
    </section>

    <section class="split" style="margin-top:16px">
      <div class="card">
        <div class="section-title"><h3>Financial & Program Pulse</h3>${can("finance") ? `<button class="ghost-action" data-route-jump="finance">Detail</button>` : ""}</div>
        ${barChart([
          ["Zakat", 23],
          ["Infak", 74],
          ["Sedekah", 42],
          ["Wakaf", 56],
          ["Operasional", 31]
        ])}
      </div>
      <div class="card">
        <div class="section-title"><h3>Action Required</h3><span class="badge red">${state.data.notifications.length} perlu tindak lanjut</span></div>
        <div class="timeline">
          ${state.data.notifications.map((n) => `
            <div class="timeline-item">
              <span class="timeline-dot"></span>
              <div><strong>${n.title}</strong><br><span class="muted">${n.time} · ${n.type}</span></div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="grid cols-2" style="margin-top:16px">
      <div class="card smart-card">
        <div class="section-title"><h3>Trust Loop Smart Art</h3><span class="badge gold-badge">Amanah</span></div>
        ${smartFlow(["Donasi", "Alokasi", "Eksekusi", "Verifikasi", "Impact", "Laporan", "Trust"])}
      </div>
      <div class="card">
        <div class="section-title"><h3>Impact Mix Chart</h3><span class="badge gold-badge">Gold Focus</span></div>
        ${donutChart([["Ibadah", 28], ["Keuangan", 24], ["Sosial", 22], ["Pendidikan", 16], ["Dakwah", 10]])}
      </div>
    </section>

    <section class="grid cols-3" style="margin-top:16px">
      <div class="card">
        <div class="section-title"><h3>Prayer Widget</h3><span class="badge blue">${cfg.prayer?.city || "Lokasi"}</span></div>
        ${renderPrayerWidget()}
      </div>
      <div class="card">
        <div class="section-title"><h3>Masjid Productivity Score</h3><strong>${m.score}/100</strong></div>
        ${barChart([["Ibadah", 92], ["Keuangan", 89], ["Pendidikan", 84], ["Dakwah", 91], ["Ekonomi", 72], ["Sosial", 95], ["Governance", 86]])}
      </div>
      <div class="card">
        <div class="section-title"><h3>Quran Digital</h3><span class="badge">Bookmark siap</span></div>
        ${renderQuranWidget()}
      </div>
    </section>
  `;
}

function smartFlow(items) {
  return `<div class="smart-flow">${items.map((item, index) => `
    <div class="flow-node">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${item}</strong>
    </div>
  `).join("")}</div>`;
}

function donutChart(rows) {
  return `
    <div class="donut-layout">
      <div class="donut-3d" aria-label="Impact Mix Chart">
        <span>87</span>
        <small>MPS</small>
      </div>
      <div class="donut-legend">
        ${rows.map(([label, value]) => `
          <div><span class="legend-gold"></span><strong>${label}</strong><em>${value}%</em></div>
        `).join("")}
      </div>
    </div>
  `;
}

function barChart(rows) {
  return `<div class="chart-bars">${rows.map(([label, value]) => `
    <div class="bar-row">
      <strong>${label}</strong>
      <div class="bar-track"><div class="bar-fill" style="width:${value}%"></div></div>
      <span>${value}%</span>
    </div>
  `).join("")}</div>`;
}

function prayerTimes() {
  const p = cfg.prayer || {};
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const lngHour = (p.longitude || 0) / 15;
  const zenith = 90.833;
  const fajrZenith = 108;
  const ishaZenith = 107;

  function dayOfYear(y, m, d) {
    return Math.floor((275 * m) / 9) - Math.floor((m + 9) / 12) * (1 + Math.floor((y - 4 * Math.floor(y / 4) + 2) / 3)) + d - 30;
  }

  function calc(isSunrise, z) {
    const n = dayOfYear(year, month, day);
    const t = n + ((isSunrise ? 6 : 18) - lngHour) / 24;
    const mean = (0.9856 * t) - 3.289;
    let trueLng = mean + (1.916 * Math.sin(rad(mean))) + (0.020 * Math.sin(rad(2 * mean))) + 282.634;
    trueLng = normalize(trueLng);
    let rightAsc = deg(Math.atan(0.91764 * Math.tan(rad(trueLng))));
    rightAsc = normalize(rightAsc);
    rightAsc += Math.floor(trueLng / 90) * 90 - Math.floor(rightAsc / 90) * 90;
    rightAsc /= 15;
    const sinDec = 0.39782 * Math.sin(rad(trueLng));
    const cosDec = Math.cos(Math.asin(sinDec));
    const cosH = (Math.cos(rad(z)) - (sinDec * Math.sin(rad(p.latitude || 0)))) / (cosDec * Math.cos(rad(p.latitude || 0)));
    let hourAngle = isSunrise ? 360 - deg(Math.acos(cosH)) : deg(Math.acos(cosH));
    hourAngle /= 15;
    const localMean = hourAngle + rightAsc - (0.06571 * t) - 6.622;
    return normalizeHour(localMean - lngHour + (p.timezone || 7));
  }

  const sunrise = calc(true, zenith);
  const sunset = calc(false, zenith);
  const subuh = calc(true, fajrZenith);
  const isya = calc(false, ishaZenith);
  const dzuhur = normalizeHour((sunrise + sunset) / 2);
  const ashar = normalizeHour(dzuhur + 3.25);
  return {
    Subuh: addOffset(subuh, p.offsets?.subuh),
    Dzuhur: addOffset(dzuhur, p.offsets?.dzuhur),
    Ashar: addOffset(ashar, p.offsets?.ashar),
    Maghrib: addOffset(sunset, p.offsets?.maghrib),
    Isya: addOffset(isya, p.offsets?.isya)
  };
}

function rad(degrees) { return Math.PI * degrees / 180; }
function deg(radians) { return radians * 180 / Math.PI; }
function normalize(value) { return (value + 360) % 360; }
function normalizeHour(value) { return (value + 24) % 24; }
function addOffset(hour, minutes = 0) { return normalizeHour(hour + (minutes || 0) / 60); }
function formatHour(hour) {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${String((h + Math.floor(m / 60)) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function renderPrayerWidget() {
  const times = prayerTimes();
  const now = new Date();
  const current = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  const entries = Object.entries(times);
  const next = entries.find(([, h]) => h > current) || entries[0];
  return `
    <div class="prayer-grid">
      ${entries.map(([name, hour]) => `<div class="prayer-time"><span>${name}</span><strong>${formatHour(hour)}</strong></div>`).join("")}
    </div>
    <p class="muted" style="margin-top:12px">Shalat berikutnya: <strong>${next[0]} ${formatHour(next[1])}</strong>. Jadwal dihitung dari koordinat dan offset konfigurasi, bukan angka statis.</p>
  `;
}

function renderQuranWidget() {
  const item = state.data.quran[0];
  return `
    <div class="quran-reader">
      <select id="quranSelect" aria-label="Pilih ayat">
        ${state.data.quran.map((q, index) => `<option value="${index}">${q.surah} : ${q.ayah}</option>`).join("")}
      </select>
      <div id="quranText">
        <div class="arabic">${item.arabic}</div>
        <p>${item.translation}</p>
      </div>
      ${canWrite() ? `<button class="ghost-action" id="bookmarkQuran">Bookmark Bacaan</button>` : `<span class="badge blue">Mode lihat saja</span>`}
      <p class="muted">Dataset penuh dapat diimpor dari sumber Quran berlisensi jelas melalui backend Google Workspace.</p>
    </div>
  `;
}

function renderFinance() {
  const writable = canWrite();
  return `
    ${pageHeader("Baitul Maal", "Kelola penerimaan, pengeluaran, ZISWAF, approval, audit trail, dan publikasi transparansi.")}
    <div class="card">
      <div class="toolbar">
        <input id="txSearch" placeholder="Cari transaksi, program, sumber dana">
        <select id="txStatus"><option value="">Semua status</option><option>SUBMITTED</option><option>VERIFIED</option><option>APPROVED</option><option>PUBLISHED</option></select>
        <button class="ghost-action" id="exportTransactions">Export CSV</button>
      </div>
      ${writable ? `<form id="transactionForm" class="form-grid">
        <input name="source" placeholder="Sumber dana" required>
        <select name="category"><option>Penerimaan</option><option>Pengeluaran</option></select>
        <select name="type"><option>Zakat</option><option>Infak</option><option>Sedekah</option><option>Wakaf</option><option>Operasional</option><option>Donasi</option></select>
        <input name="program" placeholder="Program terkait" required>
        <input name="beneficiary" placeholder="Penerima/manfaat" required>
        <input name="amount" type="number" min="1" placeholder="Nominal" required>
        <button class="primary-action full" type="submit">Tambah Transaksi Draft</button>
      </form>` : `<p class="muted">Mode lihat saja. Role ini tidak memiliki hak input, ubah, atau hapus data.</p>`}
      <div id="transactionTable" class="table-wrap" style="margin-top:16px"></div>
    </div>
  `;
}

function transactionRows() {
  const query = (document.getElementById("txSearch")?.value || "").toLowerCase();
  const status = document.getElementById("txStatus")?.value || "";
  return state.data.transactions.filter((t) => {
    const haystack = `${t.id} ${t.source} ${t.type} ${t.program} ${t.beneficiary}`.toLowerCase();
    return haystack.includes(query) && (!status || t.status === status);
  });
}

function drawTransactions() {
  const root = document.getElementById("transactionTable");
  if (!root) return;
  const rows = transactionRows();
  root.innerHTML = `
    <table>
      <thead><tr><th>ID</th><th>Tanggal</th><th>Sumber</th><th>Kategori</th><th>Program</th><th>Nominal</th><th>Status</th>${canWrite() ? "<th>Aksi</th>" : ""}</tr></thead>
      <tbody>
        ${rows.map((t) => `
          <tr>
            <td>${t.id}</td><td>${t.date}</td><td>${t.source}<br><span class="muted">${t.type}</span></td>
            <td>${t.category}</td><td>${t.program}<br><span class="muted">${t.beneficiary}</span></td><td>${rupiah(t.amount)}</td>
            <td><span class="badge ${t.status === "PUBLISHED" ? "green" : t.status === "SUBMITTED" ? "red" : "blue"}">${t.status}</span></td>
            ${canWrite() ? `<td><button class="ghost-action" data-approve="${t.id}">Majukan Status</button></td>` : ""}
          </tr>
        `).join("") || `<tr><td colspan="${canWrite() ? 8 : 7}">Belum ada transaksi yang cocok.</td></tr>`}
      </tbody>
    </table>
  `;
  root.querySelectorAll("[data-approve]").forEach((button) => {
    button.addEventListener("click", () => advanceTransaction(button.dataset.approve));
  });
}

function advanceTransaction(id) {
  if (!canWrite()) {
    showToast("Role ini hanya dapat melihat data.");
    return;
  }
  const flow = ["DRAFT", "SUBMITTED", "VERIFIED", "APPROVED", "PUBLISHED"];
  const tx = state.data.transactions.find((t) => t.id === id);
  tx.status = flow[Math.min(flow.indexOf(tx.status) + 1, flow.length - 1)] || "SUBMITTED";
  state.data.auditLogs.unshift({ actor: state.user.label, action: tx.status, object: tx.id, time: new Date().toLocaleString("id-ID") });
  saveData();
  drawTransactions();
  showToast(`Status ${id} menjadi ${tx.status}.`);
}

function renderPrograms() {
  const writable = canWrite();
  return `
    ${pageHeader("Program & Database Ummat", "Input bio data ekosistem masjid dan program/kegiatan agar tersimpan sebagai database yang dapat ditampilkan di Public Dashboard.")}
    ${writable ? `
      <section class="grid cols-2">
        <div class="card input-card-3d">
          <div class="section-title"><h3>Form Bio Data Ekosistem Masjid</h3><span class="badge gold-badge">Public DB</span></div>
          <form id="peopleBioForm" class="form-grid">
            <input name="name" placeholder="Nama lengkap / nama komunitas" required>
            <select name="category" required>
              <option>Takmir Masjid</option>
              <option>Pengurus Masjid</option>
              <option>Ustadz</option>
              <option>Guru</option>
              <option>Mentor</option>
              <option>Donatur</option>
              <option>Pemuda Masjid</option>
            </select>
            <input name="role" placeholder="Jabatan/peran/spesialisasi" required>
            <input name="phone" placeholder="Kontak publik / internal">
            <input name="address" placeholder="Domisili / area tugas">
            <input name="expertise" placeholder="Keahlian / kontribusi">
            <textarea class="full" name="bio" placeholder="Bio singkat, aman untuk publik"></textarea>
            <button class="primary-action full" type="submit">Simpan Bio Data</button>
          </form>
        </div>
        <div class="card input-card-3d">
          <div class="section-title"><h3>Form Program / Kegiatan Masjid</h3><span class="badge gold-badge">Program</span></div>
          <form id="programForm" class="form-grid">
            <input name="name" placeholder="Nama program/kegiatan" required>
            <select name="category" required>
              <option>Baitullah</option>
              <option>Baitul Maal</option>
              <option>Tarbiyah</option>
              <option>Dakwah</option>
              <option>Muamalah</option>
              <option>Sosial</option>
              <option>Pemuda</option>
              <option>Pembangunan</option>
            </select>
            <input name="pic" placeholder="PIC / Penanggung jawab" required>
            <input name="schedule" placeholder="Jadwal / periode kegiatan">
            <input name="budget" type="number" min="0" placeholder="Anggaran">
            <input name="target" type="number" min="0" placeholder="Target peserta/manfaat">
            <select name="status">
              <option>PLANNED</option>
              <option>APPROVED</option>
              <option>RUNNING</option>
              <option>COMPLETED</option>
              <option>REPORTED</option>
            </select>
            <input name="kpi" placeholder="KPI / target capaian">
            <textarea class="full" name="description" placeholder="Deskripsi program/kegiatan"></textarea>
            <button class="primary-action full" type="submit">Simpan Program</button>
          </form>
        </div>
      </section>
    ` : `<div class="card"><p class="muted">Mode lihat saja. Role ini dapat melihat database dan program, tanpa hak input, ubah, atau hapus data.</p></div>`}

    <section class="grid cols-4" style="margin-top:16px">
      ${kpiCard("Program Aktif", state.data.programs.filter((p) => ["RUNNING", "APPROVED", "PLANNED"].includes(p.status)).length, "Database program")}
      ${kpiCard("Takmir", countPeople("Takmir Masjid"), "Bio data")}
      ${kpiCard("Pengurus", countPeople("Pengurus Masjid"), "Bio data")}
      ${kpiCard("Pemuda", countPeople("Pemuda Masjid"), "Engagement")}
    </section>

    <section class="grid cols-3">
      ${state.data.programs.map((p) => `
        <article class="card module-card">
          <div class="section-title"><h3>${p.name}</h3><span class="badge blue">${p.status}</span></div>
          <p>${p.category} · PIC ${p.pic}</p>
          <div class="progress"><span style="width:${p.progress}%"></span></div>
          <p><strong>${p.progress}%</strong> progress · ${p.actual || 0}/${p.target || 0} peserta · ${rupiah(p.budget)}</p>
          ${p.schedule ? `<p class="muted">${p.schedule}</p>` : ""}
          ${writable ? `<button class="ghost-action" data-program-progress="${p.id}">Update Progress</button>` : `<span class="badge blue">Mode lihat saja</span>`}
        </article>
      `).join("")}
    </section>

    <section class="card table-wrap" style="margin-top:16px">
      <div class="section-title"><h3>Database Bio Data Masjid</h3><span class="badge gold-badge">${state.data.people.length} entri</span></div>
      ${peopleTable(state.data.people)}
    </section>
  `;
}

function countPeople(category) {
  return state.data.people.filter((person) => person.category === category).length;
}

function peopleTable(rows) {
  return `
    <table>
      <thead><tr><th>ID</th><th>Nama</th><th>Kategori</th><th>Peran</th><th>Domisili</th><th>Keahlian</th></tr></thead>
      <tbody>${rows.map((p) => `
        <tr>
          <td>${p.id}</td><td>${p.name}</td><td>${p.category}</td><td>${p.role}</td><td>${p.address || "-"}</td><td>${p.expertise || "-"}</td>
        </tr>
      `).join("") || `<tr><td colspan="6">Belum ada bio data.</td></tr>`}</tbody>
    </table>
  `;
}

function renderPeople() {
  return `
    ${pageHeader("People Database", "Satu master data untuk takmir, pengurus, ustadz, mentor, donatur, relawan, pemuda, dan jamaah.")}
    <div class="card table-wrap">
      <table>
        <thead><tr><th>ID</th><th>Nama</th><th>Role</th><th>Kategori</th><th>Engagement</th></tr></thead>
        <tbody>${state.data.people.map((p) => `
          <tr><td>${p.id}</td><td>${p.name}</td><td>${p.role}</td><td>${p.category}</td><td>${p.engagement}%</td></tr>
        `).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderPublic() {
  const m = metrics();
  const publicPeople = state.data.people.filter((p) => ["Takmir Masjid", "Pengurus Masjid", "Ustadz", "Guru", "Mentor", "Donatur", "Pemuda Masjid"].includes(p.category));
  const publicAssets = state.data.assets.slice(0, 8);
  return `
    <section class="public-hero">
      <h1>Transparansi Amanah Masjid</h1>
      <p>Jamaah dapat melihat ringkasan dana, program, impact, dan pembangunan tanpa data pribadi atau informasi sensitif.</p>
    </section>
    <section class="grid cols-4" style="margin-top:16px">
      ${kpiCard("Total Penerimaan", rupiah(m.income), "Publik")}
      ${kpiCard("Total Pengeluaran", rupiah(m.expense), "Publik")}
      ${kpiCard("Saldo", rupiah(m.balance), "Publik")}
      ${kpiCard("Penerima Manfaat", shortNumber(m.beneficiaries), "Tanpa data pribadi")}
    </section>
    <section class="grid cols-2" style="margin-top:16px">
      <div class="card"><div class="section-title"><h3>Distribusi Sumber Dana</h3></div>${barChart([["Zakat", 22], ["Infak", 38], ["Sedekah", 18], ["Wakaf", 22]])}</div>
      <div class="card"><div class="section-title"><h3>Progress Program Publik</h3></div>${barChart(state.data.programs.map((p) => [p.name, p.progress]))}</div>
    </section>
    <section class="grid cols-2" style="margin-top:16px">
      <div class="card table-wrap">
        <div class="section-title"><h3>Database SDM Publik</h3><span class="badge gold-badge">${publicPeople.length} entri</span></div>
        <table>
          <thead><tr><th>Nama</th><th>Kategori</th><th>Peran</th><th>Keahlian/Kontribusi</th></tr></thead>
          <tbody>${publicPeople.map((p) => `
            <tr><td>${p.name}</td><td>${p.category}</td><td>${p.role}</td><td>${p.expertise || "-"}</td></tr>
          `).join("") || `<tr><td colspan="4">Belum ada data publik.</td></tr>`}</tbody>
        </table>
      </div>
      <div class="card table-wrap">
        <div class="section-title"><h3>Program & Kegiatan Publik</h3><span class="badge gold-badge">${state.data.programs.length} program</span></div>
        <table>
          <thead><tr><th>Program</th><th>Kategori</th><th>PIC</th><th>Status</th><th>Progress</th></tr></thead>
          <tbody>${state.data.programs.map((p) => `
            <tr><td>${p.name}</td><td>${p.category}</td><td>${p.pic}</td><td>${p.status}</td><td>${p.progress}%</td></tr>
          `).join("") || `<tr><td colspan="5">Belum ada program publik.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
    <section class="card table-wrap" style="margin-top:16px">
      <div class="section-title"><h3>Pembangunan & Aset Publik</h3><span class="badge gold-badge">${state.data.assets.length} item</span></div>
      <table>
        <thead><tr><th>Nama</th><th>Tipe</th><th>Lokasi</th><th>Status Asal</th><th>Kondisi/Progress</th></tr></thead>
        <tbody>${publicAssets.map((a) => `
          <tr><td>${a.name}</td><td>${a.type}</td><td>${a.location || "-"}</td><td>${a.acquisitionStatus || "-"}</td><td>${a.status} · ${a.progress}%</td></tr>
        `).join("") || `<tr><td colspan="5">Belum ada data aset publik.</td></tr>`}</tbody>
      </table>
    </section>
  `;
}

function renderModules(title, subtitle, cards) {
  return `
    ${pageHeader(title, subtitle)}
    <section class="grid cols-3">
      ${cards.map((card) => `
        <article class="card module-card">
          <span class="badge">${card.area}</span>
          <h3>${card.title}</h3>
          <p>${card.body}</p>
          <div class="progress"><span style="width:${card.progress}%"></span></div>
          <strong>${card.progress}% kesiapan data</strong>
        </article>
      `).join("")}
    </section>
  `;
}

function renderReports() {
  return `
    ${pageHeader("Laporan & Transparansi", "Reporting engine untuk laporan harian, mingguan, bulanan, tahunan, PDF, Excel/CSV, dan publikasi.")}
    <section class="grid cols-3">
      ${["Laporan Keuangan", "Laporan ZISWAF", "Laporan Program", "Laporan Pembangunan", "Laporan Sosial", "Audit Log"].map((name) => `
        <article class="card module-card">
          <h3>${name}</h3>
          <p>Siap diekspor dan dipublikasikan sesuai role serta kebijakan privasi.</p>
          ${canWrite() ? `<button class="ghost-action" data-report="${name}">Generate</button>` : `<span class="badge blue">Mode lihat saja</span>`}
        </article>
      `).join("")}
    </section>
    <div class="card table-wrap" style="margin-top:16px">
      <div class="section-title"><h3>Audit Log</h3><span class="badge">Immutable untuk user biasa</span></div>
      <table><thead><tr><th>Aktor</th><th>Aksi</th><th>Objek</th><th>Waktu</th></tr></thead>
      <tbody>${state.data.auditLogs.map((log) => `<tr><td>${log.actor}</td><td>${log.action}</td><td>${log.object}</td><td>${log.time}</td></tr>`).join("")}</tbody></table>
    </div>
  `;
}

function renderAssets() {
  const writable = canWrite();
  const projects = state.data.assets.filter((asset) => asset.type === "Proyek Pembangunan");
  const inventory = state.data.assets.filter((asset) => asset.type !== "Proyek Pembangunan");
  return `
    ${pageHeader("Pembangunan & Aset", "Input program pembangunan dan seluruh item aset/inventaris masjid beserta status asal asetnya.")}
    ${writable ? `
      <section class="grid cols-2">
        <div class="card input-card-3d">
          <div class="section-title"><h3>Form Program Pembangunan</h3><span class="badge gold-badge">Proyek</span></div>
          <form id="constructionForm" class="form-grid">
            <input name="name" placeholder="Nama program/proyek pembangunan" required>
            <input name="location" placeholder="Lokasi area proyek" required>
            <input name="pic" placeholder="PIC / penanggung jawab">
            <input name="budget" type="number" min="0" placeholder="RAB / budget">
            <input name="realized" type="number" min="0" placeholder="Realisasi">
            <input name="progress" type="number" min="0" max="100" placeholder="Progress %" required>
            <select name="status">
              <option>PLANNED</option>
              <option>RUNNING</option>
              <option>ON HOLD</option>
              <option>COMPLETED</option>
              <option>REPORTED</option>
            </select>
            <select name="acquisitionStatus">
              <option>Wakaf</option>
              <option>Hibah</option>
              <option>Hadiah</option>
              <option>Dipinjamkan</option>
              <option>Beli</option>
              <option>Lainnya</option>
            </select>
            <textarea class="full" name="description" placeholder="Catatan pembangunan, vendor, timeline, dokumentasi"></textarea>
            <button class="primary-action full" type="submit">Simpan Program Pembangunan</button>
          </form>
        </div>
        <div class="card input-card-3d">
          <div class="section-title"><h3>Form Aset / Inventaris</h3><span class="badge gold-badge">Inventaris</span></div>
          <form id="inventoryForm" class="form-grid">
            <input name="name" placeholder="Nama item aset/inventaris" required>
            <input name="location" placeholder="Lokasi penyimpanan/pemakaian" required>
            <input name="pic" placeholder="Penanggung jawab">
            <input name="budget" type="number" min="0" placeholder="Nilai aset">
            <select name="acquisitionStatus" required>
              <option>Wakaf</option>
              <option>Hibah</option>
              <option>Hadiah</option>
              <option>Dipinjamkan</option>
              <option>Beli</option>
              <option>Lainnya</option>
            </select>
            <select name="status">
              <option>ACTIVE</option>
              <option>MAINTENANCE</option>
              <option>DAMAGED</option>
              <option>BORROWED</option>
              <option>DISPOSED</option>
            </select>
            <input name="progress" type="number" min="0" max="100" value="100" placeholder="Kondisi %">
            <input name="serial" placeholder="Kode/nomor seri aset">
            <textarea class="full" name="description" placeholder="Catatan kondisi, sumber, atau dokumentasi"></textarea>
            <button class="primary-action full" type="submit">Simpan Aset / Inventaris</button>
          </form>
        </div>
      </section>
    ` : `<div class="card"><p class="muted">Mode lihat saja. Role ini dapat melihat proyek dan inventaris tanpa hak input, ubah, atau hapus data.</p></div>`}

    <section class="grid cols-4" style="margin-top:16px">
      ${kpiCard("Proyek", projects.length, "Pembangunan")}
      ${kpiCard("Inventaris", inventory.length, "Aset tercatat")}
      ${kpiCard("Wakaf", state.data.assets.filter((a) => a.acquisitionStatus === "Wakaf").length, "Status asal")}
      ${kpiCard("Beli", state.data.assets.filter((a) => a.acquisitionStatus === "Beli").length, "Status asal")}
    </section>

    <section class="grid cols-3" style="margin-top:16px">
      ${state.data.assets.map((a) => `
        <article class="card module-card">
          <div class="section-title"><h3>${a.name}</h3><span class="badge gold-badge">${a.acquisitionStatus || "-"}</span></div>
          <p>${a.type} · ${a.location || "-"} · PIC ${a.pic || "-"}</p>
          <div class="progress"><span style="width:${a.progress || 0}%"></span></div>
          <p><strong>${a.progress || 0}%</strong> · ${a.status} · ${rupiah(a.realized || a.budget || 0)}</p>
        </article>
      `).join("")}
    </section>

    <section class="card table-wrap" style="margin-top:16px">
      <div class="section-title"><h3>Tabel Aset & Inventaris Masjid</h3><span class="badge gold-badge">${state.data.assets.length} item</span></div>
      <table>
        <thead><tr><th>ID</th><th>Nama</th><th>Tipe</th><th>Lokasi</th><th>Status Asal</th><th>Kondisi/Progress</th><th>PIC</th><th>Nilai</th></tr></thead>
        <tbody>${state.data.assets.map((a) => `
          <tr>
            <td>${a.id}</td><td>${a.name}</td><td>${a.type}</td><td>${a.location || "-"}</td><td>${a.acquisitionStatus || "-"}</td><td>${a.status} · ${a.progress || 0}%</td><td>${a.pic || "-"}</td><td>${rupiah(a.budget || 0)}</td>
          </tr>
        `).join("") || `<tr><td colspan="8">Belum ada aset.</td></tr>`}</tbody>
      </table>
    </section>
  `;
}

function renderView() {
  const root = document.getElementById("viewRoot");
  const routes = {
    dashboard: renderDashboard,
    finance: renderFinance,
    programs: renderPrograms,
    people: renderPeople,
    public: renderPublic,
    reports: renderReports,
    action: () => renderModules("Action Required", "Pusat tindak lanjut approval, laporan, deadline, dan dokumen.", state.data.notifications.map((n, i) => ({ area: n.severity, title: n.title, body: `${n.type} · ${n.time}`, progress: 100 - i * 14 }))),
    baitullah: () => renderModules("Masjid sebagai Baitullah", "Aktivitas ibadah, imam, muadzin, dzikir, tilawah, tahfidz, dan adzan otomatis.", [
      { area: "Prayer", title: "Jadwal Shalat Realtime", body: "Dihitung dari koordinat masjid, metode, madhhab, dan offset manual.", progress: 85 },
      { area: "Adzan", title: "Konfigurasi Audio", body: "Enable/disable, volume, test audio, dan integrasi perangkat masjid.", progress: 62 },
      { area: "Quran", title: "Al-Quran Digital", body: "Bookmark, pencarian, audio, qari, terjemahan, dan sumber data berlisensi.", progress: 58 }
    ]),
    tarbiyah: () => renderModules("Masjid sebagai Baitut Tarbiyah", "Pendidikan, kelas, kajian, tahsin, tahfidz, mentor, presensi, progress, dan evaluasi.", [
      { area: "Program", title: "Tahsin & Tahfidz", body: "Kelola kelas, peserta, mentor, presensi, dan capaian hafalan.", progress: 72 },
      { area: "Skill", title: "Digital Skill", body: "Literasi finansial, digital marketing, desain, public speaking, dan leadership.", progress: 64 },
      { area: "KPI", title: "Completion Rate", body: "Kehadiran, jam belajar, penyelesaian, dan evaluasi peserta.", progress: 68 }
    ]),
    dakwah: () => renderModules("Masjid sebagai Baitud Dakwah", "Kajian, ceramah, khatib, ustadz, event, dokumentasi, media, dan reach digital.", [
      { area: "Event", title: "Kajian & Ceramah", body: "Jadwal kajian, tema, ustadz, peserta, dokumentasi, video, dan audio.", progress: 78 },
      { area: "Media", title: "Konten Dakwah", body: "Artikel, klip sosial media, dokumentasi event, dan publikasi.", progress: 61 },
      { area: "Impact", title: "Reach Digital", body: "KPI dakwah aktif, peserta, konten diproduksi, dan jangkauan.", progress: 66 }
    ]),
    muamalah: () => renderModules("Masjid sebagai Baitul Muamalah", "Koperasi, UMKM jamaah, wakaf produktif, bazar halal, produk, dan pemberdayaan.", [
      { area: "UMKM", title: "UMKM Jamaah", body: "Profil usaha, kategori, omzet, status, dan kebutuhan pendampingan.", progress: 55 },
      { area: "Wakaf", title: "Wakaf Produktif", body: "Aset, nilai, pengelola, pendapatan, dan pemanfaatan.", progress: 52 },
      { area: "Bazar", title: "Bazar Halal", body: "Event, tenant, produk, transaksi, dan penerima manfaat.", progress: 49 }
    ]),
    assets: renderAssets
  };
  root.innerHTML = (routes[state.route] || routes.dashboard)();
  bindViewEvents();
}

function bindViewEvents() {
  document.querySelectorAll("[data-route-jump]").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.routeJump)));
  const peopleBioForm = document.getElementById("peopleBioForm");
  if (peopleBioForm) {
    peopleBioForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(peopleBioForm);
      state.data.people.unshift({
        id: `PPL-${Date.now().toString().slice(-6)}`,
        name: form.get("name"),
        category: form.get("category"),
        role: form.get("role"),
        phone: form.get("phone"),
        address: form.get("address"),
        expertise: form.get("expertise"),
        bio: form.get("bio"),
        engagement: 75
      });
      state.data.auditLogs.unshift({ actor: state.user.label, action: "CREATED_PEOPLE_BIO", object: state.data.people[0].id, time: new Date().toLocaleString("id-ID") });
      saveData();
      renderView();
      showToast("Bio data berhasil disimpan dan siap tampil di Public Dashboard.");
    });
  }
  const programForm = document.getElementById("programForm");
  if (programForm) {
    programForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(programForm);
      state.data.programs.unshift({
        id: `PRG-${Date.now().toString().slice(-6)}`,
        name: form.get("name"),
        category: form.get("category"),
        pic: form.get("pic"),
        schedule: form.get("schedule"),
        budget: Number(form.get("budget") || 0),
        target: Number(form.get("target") || 0),
        actual: 0,
        progress: form.get("status") === "COMPLETED" || form.get("status") === "REPORTED" ? 100 : 0,
        status: form.get("status"),
        kpi: form.get("kpi"),
        description: form.get("description")
      });
      state.data.auditLogs.unshift({ actor: state.user.label, action: "CREATED_PROGRAM", object: state.data.programs[0].id, time: new Date().toLocaleString("id-ID") });
      saveData();
      renderView();
      showToast("Program/kegiatan berhasil disimpan.");
    });
  }
  const constructionForm = document.getElementById("constructionForm");
  if (constructionForm) {
    constructionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(constructionForm);
      state.data.assets.unshift({
        id: `AST-${Date.now().toString().slice(-6)}`,
        name: form.get("name"),
        type: "Proyek Pembangunan",
        location: form.get("location"),
        pic: form.get("pic"),
        budget: Number(form.get("budget") || 0),
        realized: Number(form.get("realized") || 0),
        progress: Number(form.get("progress") || 0),
        status: form.get("status"),
        acquisitionStatus: form.get("acquisitionStatus"),
        description: form.get("description")
      });
      state.data.auditLogs.unshift({ actor: state.user.label, action: "CREATED_CONSTRUCTION", object: state.data.assets[0].id, time: new Date().toLocaleString("id-ID") });
      saveData();
      renderView();
      showToast("Program pembangunan berhasil disimpan.");
    });
  }
  const inventoryForm = document.getElementById("inventoryForm");
  if (inventoryForm) {
    inventoryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(inventoryForm);
      state.data.assets.unshift({
        id: `AST-${Date.now().toString().slice(-6)}`,
        name: form.get("name"),
        type: "Inventaris",
        location: form.get("location"),
        pic: form.get("pic"),
        budget: Number(form.get("budget") || 0),
        realized: Number(form.get("budget") || 0),
        progress: Number(form.get("progress") || 100),
        status: form.get("status"),
        acquisitionStatus: form.get("acquisitionStatus"),
        serial: form.get("serial"),
        description: form.get("description")
      });
      state.data.auditLogs.unshift({ actor: state.user.label, action: "CREATED_INVENTORY", object: state.data.assets[0].id, time: new Date().toLocaleString("id-ID") });
      saveData();
      renderView();
      showToast("Aset/inventaris berhasil disimpan.");
    });
  }
  const txSearch = document.getElementById("txSearch");
  const txStatus = document.getElementById("txStatus");
  if (txSearch) txSearch.addEventListener("input", drawTransactions);
  if (txStatus) txStatus.addEventListener("change", drawTransactions);
  const txForm = document.getElementById("transactionForm");
  if (txForm) {
    txForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(txForm);
      state.data.transactions.unshift({
        id: `TRX-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString().slice(0, 10),
        source: form.get("source"),
        category: form.get("category"),
        type: form.get("type"),
        program: form.get("program"),
        beneficiary: form.get("beneficiary"),
        method: "Input aplikasi",
        amount: Number(form.get("amount")),
        status: "DRAFT",
        inputBy: state.user.label,
        verifiedBy: "",
        approvedBy: ""
      });
      state.data.auditLogs.unshift({ actor: state.user.label, action: "CREATED", object: state.data.transactions[0].id, time: new Date().toLocaleString("id-ID") });
      saveData();
      txForm.reset();
      drawTransactions();
      showToast("Transaksi draft berhasil ditambahkan.");
    });
    drawTransactions();
  }
  const exportButton = document.getElementById("exportTransactions");
  if (exportButton) exportButton.addEventListener("click", () => exportCsv("transactions.csv", state.data.transactions));
  document.querySelectorAll("[data-program-progress]").forEach((button) => {
    button.addEventListener("click", () => {
      const p = state.data.programs.find((item) => item.id === button.dataset.programProgress);
      p.progress = Math.min(100, p.progress + 5);
      if (p.progress === 100) p.status = "COMPLETED";
      saveData();
      renderView();
      showToast(`Progress ${p.name} diperbarui.`);
    });
  });
  document.querySelectorAll("[data-report]").forEach((button) => button.addEventListener("click", () => showToast(`${button.dataset.report} berhasil disiapkan dalam mode demo.`)));
  const quranSelect = document.getElementById("quranSelect");
  if (quranSelect) {
    quranSelect.addEventListener("change", () => {
      const q = state.data.quran[Number(quranSelect.value)];
      document.getElementById("quranText").innerHTML = `<div class="arabic">${q.arabic}</div><p>${q.translation}</p>`;
    });
  }
  const bookmark = document.getElementById("bookmarkQuran");
  if (bookmark) bookmark.addEventListener("click", () => showToast("Bookmark bacaan tersimpan di perangkat ini."));
}

function exportCsv(filename, rows) {
  const headers = Object.keys(rows[0] || {});
  const csv = [headers.join(","), ...rows.map((row) => headers.map((h) => `"${String(row[h] ?? "").replaceAll('"', '""')}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function syncBackend() {
  if (!cfg.googleAppsScriptUrl) {
    showToast("Backend belum disambungkan. Aplikasi berjalan dengan data lokal.");
    return;
  }
  try {
    const response = await fetch(cfg.googleAppsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action: "sync", payload: state.data })
    });
    const result = await response.json();
    showToast(result.ok ? "Data tersinkron ke Google Workspace." : "Sinkronisasi belum berhasil.");
  } catch (error) {
    showToast("Data belum dapat disinkronkan. Coba lagi nanti.");
  }
}

function updateClock() {
  const now = new Date();
  const dateFmt = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const timeFmt = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short" });
  const parts = dateFmt.format(now).split(",");
  document.getElementById("dayLabel").textContent = parts[0] || "";
  document.getElementById("dateLabel").textContent = parts[1]?.trim() || dateFmt.format(now);
  document.getElementById("timeLabel").textContent = timeFmt.format(now);
}

function init() {
  state.data = loadData();
  ensureCollections();
  document.getElementById("mosqueName").textContent = cfg.mosqueName || "MASJID 360";
  document.getElementById("workspaceLabel").textContent = cfg.workspaceAccount || "Google Workspace";
  updateClock();
  setInterval(updateClock, 1000);

  const session = localStorage.getItem("masjid360:user");
  if (session) {
    state.user = JSON.parse(session);
    if (!roleCredentials[state.user.role]) {
      localStorage.removeItem("masjid360:user");
      state.user = null;
    } else {
      document.getElementById("loginScreen").classList.add("hidden");
      document.getElementById("appShell").classList.remove("hidden");
      const hashRoute = location.hash.replace("#", "") || "dashboard";
      state.route = can(hashRoute) ? hashRoute : (can("dashboard") ? "dashboard" : "public");
      renderNav();
      renderView();
    }
  }

  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const code = document.getElementById("accessCode").value.trim();
    const role = document.getElementById("roleSelect").value;
    if (code !== roleCredentials[role]) {
      showToast("Password belum sesuai untuk role yang dipilih.");
      return;
    }
    state.user = { role, label: document.getElementById("roleSelect").selectedOptions[0].textContent };
    localStorage.setItem("masjid360:user", JSON.stringify(state.user));
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("appShell").classList.remove("hidden");
    state.route = "dashboard";
    renderNav();
    renderView();
  });

  document.getElementById("menuToggle").addEventListener("click", () => document.querySelector(".sidebar").classList.toggle("open"));
  document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("masjid360:user");
    location.reload();
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredInstall = event;
    document.getElementById("installButton").classList.remove("hidden");
  });
  document.getElementById("installButton").addEventListener("click", async () => {
    if (!state.deferredInstall) return;
    state.deferredInstall.prompt();
    await state.deferredInstall.userChoice;
    state.deferredInstall = null;
    document.getElementById("installButton").classList.add("hidden");
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
  }
}

init();
