/* ═══════════════════════════════════════════════════════════
   GINSUL SNACK — app.js
   - Lokasi: Depan Sekolah SMK Tritech Informatika
   - Menu: Gorengan Crispy Serba Rp 1.000
   - Form Bersih & Tata Letak Rapi
   ═══════════════════════════════════════════════════════════ */
"use strict";

/* ─── DATA MENU GORENGAN CRISPY TERPERCAYA ─── */
const MENUS = [
  { 
    id: "otak_otak",
    name: "Otak-otak Goreng Crispy",
    emoji: "🍢",
    desc: "Olahan ikan tenggiri gurih digoreng keemasan di minyak panas, renyah di luar kenyal lembut di dalam.",
    harga: 1000,
    badge: "🔥 Best Seller",
    img: "images/otak_otak.jpg"
  },
  { 
    id: "sosis",
    name: "Sosis Goreng Mekar",
    emoji: "🌭",
    desc: "Sosis premium digoreng mekar renyah dengan balutan bumbu gurih dan saus cabai spesial.",
    harga: 1000,
    badge: "⭐ Favorit",
    img: "images/sosis.jpg"
  },
  { 
    id: "telur_gulung",
    name: "Telur Gulung Goreng",
    emoji: "🥚",
    desc: "Kocokan telur berbumbu digoreng dan digulung seketika di wajan panas, gurih empuk nagih.",
    harga: 1000,
    badge: "✨ Viral & Hits",
    img: "images/telur_gulung.jpg"
  },
  { 
    id: "tempura",
    name: "Tempura Goreng Renyah",
    emoji: "🍤",
    desc: "Olahan ikan & sayuran digoreng dengan tepung krispi keemasan, super renyah saat digigit.",
    harga: 1000,
    badge: "🌟 Super Renyah",
    img: "images/tempura.jpg"
  },
  { 
    id: "tahu_goreng",
    name: "Tahu Goreng Crispy",
    emoji: "🧆",
    desc: "Tahu segar digoreng dadakan hingga kulit luar krispi renyah dan bagian dalam tetap lembut gurih.",
    harga: 1000,
    badge: "💛 Gurih Nagih",
    img: "images/tahu_goreng.jpg"
  }
];

/* ─── STATE APLIKASI ─── */
const qty = {};
let allOrders = {};

MENUS.forEach(m => qty[m.id] = 0);

/* ══════════════════════════════════════════
   INIT SAAT DOM READY
══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  renderMenuCards();
  renderMenuOrderList();
  createParticles();
  initScrollTop();
  initNavScroll();
  initVideoAudioSync();
  updateSummary();
  loadLocalOrders();
  initSampleOrdersIfEmpty();
});

/* ══════════════════════════════════════════
   PARTIKEL LATAR BELAKANG
══════════════════════════════════════════ */
function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  const colors = ["#FF6B35", "#FFD700", "#FF3E3E", "#FF8C42"];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement("div");
    p.className = "ptcl";
    const size = Math.random() * 10 + 4;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${10 + Math.random() * 14}s;
      animation-delay:${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}

/* ══════════════════════════════════════════
   NAVBAR & SCROLL INTERACTION
══════════════════════════════════════════ */
function toggleNav() {
  document.getElementById("navLinks").classList.toggle("open");
  document.getElementById("hamburger").classList.toggle("open");
}
function closeNav() {
  document.getElementById("navLinks").classList.remove("open");
  document.getElementById("hamburger").classList.remove("open");
}
function initNavScroll() {
  window.addEventListener("scroll", () => {
    const nav = document.getElementById("navbar");
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);

    let current = "";
    document.querySelectorAll("section[id]").forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    document.querySelectorAll(".nav-links a").forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
    document.querySelectorAll(".mbn-item").forEach(m => {
      m.classList.toggle("active", m.getAttribute("href") === "#" + current);
    });
  });
}

/* ══════════════════════════════════════════
   MUSIC PLAYER (gimsul.mp3)
══════════════════════════════════════════ */
let isPlaying = false;
function toggleMusic() {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");
  const disc = document.getElementById("musicDisc");
  const lbl = document.getElementById("musicLabel");
  const video = document.getElementById("umkmVideo");

  if (!audio) return;

  if (isPlaying) {
    audio.pause();
    btn.classList.remove("playing");
    disc.classList.remove("spin");
    lbl.textContent = "Musik UMKM";
    isPlaying = false;
  } else {
    // Matikan pemutaran video jika sedang aktif agar suara tidak tabrakan
    if (video && !video.paused) {
      video.pause();
      showToast("🎵 Memutar musik latar — Video dijeda", "info");
    }

    if (!audio.src || audio.src === "" || audio.src.endsWith("bgmusic.mp3")) {
      audio.src = "gimsul.mp3";
    }
    audio.play().then(() => {
      btn.classList.add("playing");
      disc.classList.add("spin");
      lbl.textContent = "Pause Musik";
      isPlaying = true;
      showToast("🎵 Memutar musik: Ginsul Snack", "success");
    }).catch(() => {
      audio.src = "music/gimsul.mp3";
      audio.play().then(() => {
        btn.classList.add("playing");
        disc.classList.add("spin");
        lbl.textContent = "Pause Musik";
        isPlaying = true;
        showToast("🎵 Memutar musik: Ginsul Snack", "success");
      }).catch(() => {
        showToast("🎵 Klik sekali lagi untuk memulai musik UMKM", "info");
      });
    });
  }
}

/* ══════════════════════════════════════════
   VIDEO & AUDIO SYNCHRONIZATION
   (Otomatis mematikan musik latar saat video aneh.mp4 diputar)
══════════════════════════════════════════ */
function initVideoAudioSync() {
  const video = document.getElementById("umkmVideo");
  const audio = document.getElementById("bgMusic");
  if (!video) return;

  // Saat video mulai diputar
  video.addEventListener("play", () => {
    if (audio && !audio.paused) {
      audio.pause();
      const btn = document.getElementById("musicBtn");
      const disc = document.getElementById("musicDisc");
      const lbl = document.getElementById("musicLabel");
      if (btn) btn.classList.remove("playing");
      if (disc) disc.classList.remove("spin");
      if (lbl) lbl.textContent = "Musik UMKM";
      isPlaying = false;
      showToast("🎬 Memutar video — Musik latar otomatis dimatikan", "info");
    }

    const triggerBtn = document.getElementById("videoTriggerBtn");
    if (triggerBtn) {
      triggerBtn.innerHTML = `<i class="fas fa-pause"></i> Jeda Video`;
    }
  });

  // Saat video dijeda
  video.addEventListener("pause", () => {
    const triggerBtn = document.getElementById("videoTriggerBtn");
    if (triggerBtn) {
      triggerBtn.innerHTML = `<i class="fas fa-play"></i> Putar Video`;
    }
  });

  // Saat video selesai diputar
  video.addEventListener("ended", () => {
    const triggerBtn = document.getElementById("videoTriggerBtn");
    if (triggerBtn) {
      triggerBtn.innerHTML = `<i class="fas fa-redo"></i> Putar Ulang`;
    }
    showToast("✨ Video selesai diputar. Terima kasih!", "info");
  });
}

function playVideoDirectly() {
  const video = document.getElementById("umkmVideo");
  const videoSec = document.getElementById("video");
  if (!video) return;

  if (video.paused) {
    if (videoSec) {
      videoSec.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    video.play().catch(err => {
      console.log("Video play notice:", err);
    });
  } else {
    video.pause();
  }
}

/* ══════════════════════════════════════════
   RENDER MENU CARDS
══════════════════════════════════════════ */
function renderMenuCards() {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;

  grid.innerHTML = MENUS.map(m => `
    <div class="menu-card" onclick="goOrderItem('${m.id}')">
      <div class="menu-card-img-wrap">
        <img src="${m.img}" alt="${m.name}" class="menu-food-img" loading="lazy" onerror="this.src='image.png'"/>
        <span class="menu-badge">${m.badge}</span>
        <span class="menu-price-tag">Rp ${m.harga.toLocaleString("id-ID")}</span>
      </div>
      <div class="menu-card-body">
        <div class="menu-name">${m.emoji} ${m.name}</div>
        <div class="menu-desc">${m.desc}</div>
        <div class="menu-footer">
          <div class="menu-price">Rp ${m.harga.toLocaleString("id-ID")} <small>/pcs</small></div>
          <button class="menu-order-btn" onclick="event.stopPropagation(); goOrderItem('${m.id}')">
            <i class="fas fa-plus"></i> Tambah
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function goOrderItem(id) {
  document.getElementById("pesan").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    changeQty(id, 1);
    const itemEl = document.querySelector(`[data-id="${id}"]`);
    if (itemEl) {
      itemEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      itemEl.style.transition = "all .3s";
      itemEl.style.boxShadow = "0 0 0 3px var(--or)";
      setTimeout(() => itemEl.style.boxShadow = "", 1200);
    }
  }, 400);
}

/* ══════════════════════════════════════════
   RENDER ORDER MENU LIST (FORM PEMESANAN)
══════════════════════════════════════════ */
function renderMenuOrderList() {
  const list = document.getElementById("menuOrderList");
  if (!list) return;

  list.innerHTML = MENUS.map(m => `
    <div class="oml-item" data-id="${m.id}">
      <img src="${m.img}" alt="${m.name}" class="oml-thumb" onerror="this.src='image.png'"/>
      <div class="oml-info">
        <div class="oml-name">${m.name}</div>
        <div class="oml-price">Rp 1.000 / pcs</div>
      </div>
      <div class="qty-wrap">
        <button type="button" class="qty-btn qty-minus" onclick="changeQty('${m.id}', -1)">−</button>
        <span class="qty-num" id="qty_${m.id}" data-v="0">0</span>
        <button type="button" class="qty-btn qty-plus" onclick="changeQty('${m.id}', 1)">+</button>
      </div>
    </div>
  `).join("");
}

/* ══════════════════════════════════════════
   QTY & SUMMARY CALCULATION
══════════════════════════════════════════ */
function changeQty(id, delta) {
  qty[id] = Math.max(0, (qty[id] || 0) + delta);
  const el = document.getElementById(`qty_${id}`);
  if (el) {
    el.textContent = qty[id];
    el.dataset.v = qty[id];
  }
  updateSummary();
}

function updateSummary() {
  let total = 0;
  let totalPcs = 0;
  const lines = [];

  MENUS.forEach(m => {
    const count = qty[m.id] || 0;
    if (count > 0) {
      const subtotal = count * m.harga;
      total += subtotal;
      totalPcs += count;
      lines.push(`
        <div class="s-line">
          <span>${m.emoji} <strong>${m.name}</strong> × ${count} pcs</span>
          <span class="s-subtotal">Rp ${subtotal.toLocaleString("id-ID")}</span>
        </div>
      `);
    }
  });

  const summaryItems = document.getElementById("summaryItems");
  const totalEl = document.getElementById("totalHarga");

  if (summaryItems) {
    summaryItems.innerHTML = lines.length ? lines.join("") : "<em>Belum ada menu yang dipilih</em>";
  }
  if (totalEl) {
    totalEl.textContent = `Rp ${total.toLocaleString("id-ID")}`;
  }

  // Promo Beli 10 Gratis 1
  const promoEl = document.getElementById("promoNote");
  if (promoEl) {
    if (totalPcs >= 10) {
      const bonus = Math.floor(totalPcs / 10);
      promoEl.style.display = "block";
      promoEl.innerHTML = `🎁 <strong>PROMO BERLAKU:</strong> Kamu pesan ${totalPcs} pcs & dapat bonus <strong>${bonus} pcs GRATIS</strong>!`;
    } else {
      promoEl.style.display = "none";
    }
  }
}

/* ══════════════════════════════════════════
   ORDER SUBMISSION (INSTAN & 100% LANCAR)
══════════════════════════════════════════ */
function handleOrderSubmit(e) {
  if (e) e.preventDefault();

  const namaInput = document.getElementById("namaPembeli");
  const nama = namaInput ? namaInput.value.trim() : "";
  const kepedasan = document.getElementById("kepedasan")?.value || "Tidak Pedas";
  const catatan = document.getElementById("catatan")?.value.trim() || "-";

  if (!nama) {
    showToast("⚠️ Mohon masukkan nama Anda!", "warn");
    if (namaInput) {
      namaInput.focus();
      namaInput.style.borderColor = "var(--danger)";
      setTimeout(() => namaInput.style.borderColor = "", 2000);
    }
    return false;
  }

  const totalPcs = MENUS.reduce((sum, m) => sum + (qty[m.id] || 0), 0);
  if (totalPcs === 0) {
    showToast("⚠️ Silakan pilih minimal 1 menu gorengan!", "warn");
    const firstMenu = document.querySelector(".oml-item");
    if (firstMenu) {
      firstMenu.style.boxShadow = "0 0 0 3px var(--primary)";
      setTimeout(() => firstMenu.style.boxShadow = "", 1500);
    }
    return false;
  }

  const items = {};
  MENUS.forEach(m => {
    if (qty[m.id] > 0) items[m.id] = qty[m.id];
  });

  const total = MENUS.reduce((sum, m) => sum + (qty[m.id] || 0) * m.harga, 0);

  const orderData = {
    nama,
    kepedasan,
    catatan: catatan || "-",
    items,
    total,
    totalPcs,
    waktu: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
    timestamp: Date.now()
  };

  // 1. Simpan seketika ke memori & LocalStorage
  const localId = "order_" + Date.now();
  const existing = getLocalOrders();
  existing[localId] = orderData;
  localStorage.setItem("ginsul_orders", JSON.stringify(existing));
  localStorage.setItem("ginsul_has_initialized", "true");
  allOrders = existing;

  // 2. Render ke riwayat pesanan seketika
  renderOrders(allOrders);

  // 3. Buka popup modal sukses seketika
  showSuccessModal(nama, total);

  // 4. Reset form & quantity counter
  resetForm();

  // 5. Sinkronisasi ke Firestore di latar belakang (tanpa menghambat UI)
  if (window.__firestore && window.__fsAddDoc && window.__fsCollection) {
    window.__fsAddDoc(window.__fsCollection(window.__firestore, "pesanan"), orderData).catch(err => {
      console.log("Firestore background sync:", err.message);
    });
  }

  return false;
}

document.getElementById("orderForm")?.addEventListener("submit", handleOrderSubmit);

function resetForm() {
  const namaInput = document.getElementById("namaPembeli");
  const catatanInput = document.getElementById("catatan");
  if (namaInput) namaInput.value = "";
  if (catatanInput) catatanInput.value = "";

  MENUS.forEach(m => {
    qty[m.id] = 0;
    const el = document.getElementById(`qty_${m.id}`);
    if (el) {
      el.textContent = "0";
      el.dataset.v = "0";
    }
  });
  updateSummary();
}

/* ══════════════════════════════════════════
   RENDER DAFTAR PESANAN (TATA LETAK RAPI)
══════════════════════════════════════════ */
/* ══════════════════════════════════════════
   STORAGE & SINKRONISASI PESANAN
══════════════════════════════════════════ */
function getLocalOrders() {
  try {
    return JSON.parse(localStorage.getItem("ginsul_orders") || "{}");
  } catch(e) {
    return {};
  }
}

function loadLocalOrders() {
  allOrders = getLocalOrders();
  renderOrders(allOrders);
}

function initSampleOrdersIfEmpty() {
  const initialized = localStorage.getItem("ginsul_has_initialized");
  if (!initialized) {
    const sample = {
      "sample_1": {
        nama: "Siswa SMK Tritech",
        kepedasan: "Pedas Sedang",
        catatan: "Bumbu balado dipisah ya bang",
        items: { "otak_otak": 5, "telur_gulung": 5, "sosis": 2 },
        total: 12000,
        totalPcs: 12,
        waktu: new Date(Date.now() - 3600000).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
        timestamp: Date.now() - 3600000
      }
    };
    localStorage.setItem("ginsul_orders", JSON.stringify(sample));
    localStorage.setItem("ginsul_has_initialized", "true");
    allOrders = sample;
    renderOrders(allOrders);
  }
}

function renderOrders(data) {
  allOrders = data || {};
  const container = document.getElementById("orderHistoryList");
  if (!container) return;

  const keys = Object.keys(allOrders);
  const countEl = document.getElementById("orderCount");
  if (countEl) countEl.textContent = keys.length + " pesanan";

  if (keys.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <h4>Belum ada riwayat pesanan</h4>
        <p>Pesanan baru yang masuk akan langsung tampil di sini!</p>
      </div>`;
    return;
  }

  const sortedKeys = keys.sort((a, b) => (allOrders[b].timestamp || 0) - (allOrders[a].timestamp || 0));

  container.innerHTML = sortedKeys.map(key => {
    const order = allOrders[key];

    const itemsSummary = MENUS
      .filter(m => order.items?.[m.id] > 0)
      .map(m => `
        <span class="hc-item-pill">
          ${m.emoji} ${m.name} <strong>×${order.items[m.id]}</strong>
        </span>
      `).join("") || "-";

    const totalPcs = MENUS.reduce((sum, m) => sum + (order.items?.[m.id] || 0), 0);

    return `
      <div class="history-card" id="hc_${key}">
        <div class="hc-top">
          <div class="hc-buyer-profile">
            <div class="hc-avatar-icon"><i class="fas fa-user-circle"></i></div>
            <div>
              <div class="hc-name">${esc(order.nama)}</div>
              <div class="hc-time"><i class="fas fa-clock"></i> ${esc(order.waktu || "-")}</div>
            </div>
          </div>
          <button class="hc-delete" onclick="deleteOrder('${key}')" title="Hapus pesanan">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>

        <div class="hc-badge-row">
          <span class="hc-spicy">${getSpicyBadge(order.kepedasan)}</span>
          <span class="hc-status-badge"><i class="fas fa-check"></i> Pesanan Diterima</span>
        </div>

        <div class="hc-items-list">${itemsSummary}</div>

        ${order.catatan && order.catatan !== "-" ? `
          <div class="hc-note"><i class="fas fa-sticky-note"></i> "${esc(order.catatan)}"</div>
        ` : ""}

        <div class="hc-bottom">
          <div>
            <span class="hc-total-label">Total Bayar</span>
            <div class="hc-total">Rp ${(order.total || 0).toLocaleString("id-ID")}</div>
          </div>
          <span class="hc-pcs-badge"><i class="fas fa-utensils"></i> ${totalPcs} pcs</span>
        </div>
      </div>
    `;
  }).join("");
}

function getSpicyBadge(k) {
  if (!k) return "😊 Gurih Manis";
  if (k.includes("Sangat")) return "🔥 Sangat Pedas";
  if (k.includes("Pedas")) return "🌶️ Pedas Sedang";
  return "😊 Tidak Pedas";
}

/* ══════════════════════════════════════════
   DELETE & CLEAR PESANAN (LANGSUNG TERHAPUS)
══════════════════════════════════════════ */
async function deleteOrder(key) {
  if (!confirm("Hapus pesanan ini dari daftar?")) return;

  // 1. Hapus langsung dari database jika terhubung
  if (window.__firestore && window.__fsDeleteDoc && window.__fsDoc) {
    window.__fsDeleteDoc(window.__fsDoc(window.__firestore, "pesanan", key)).catch(e => {
      console.log("Delete sync notice:", e.message);
    });
  }

  // 2. Hapus langsung dari memori & localStorage
  delete allOrders[key];
  localStorage.setItem("ginsul_orders", JSON.stringify(allOrders));
  localStorage.setItem("ginsul_has_initialized", "true");

  // 3. Render ulang tampilan seketika
  renderOrders(allOrders);
  showToast("🗑️ Pesanan berhasil dihapus!", "success");
}

async function clearHistory() {
  const total = Object.keys(allOrders).length;
  if (total === 0) {
    showToast("ℹ️ Tidak ada pesanan untuk dibersihkan.", "info");
    return;
  }

  if (!confirm(`Hapus SEMUA ${total} riwayat pesanan?`)) return;

  // 1. Hapus semua data di database jika terhubung
  if (window.__firestore && window.__fsDeleteDoc && window.__fsDoc) {
    for (const k of Object.keys(allOrders)) {
      window.__fsDeleteDoc(window.__fsDoc(window.__firestore, "pesanan", k)).catch(() => {});
    }
  }

  // 2. Kosongkan memori & localStorage
  allOrders = {};
  localStorage.setItem("ginsul_orders", JSON.stringify({}));
  localStorage.setItem("ginsul_has_initialized", "true");

  // 3. Render state kosong seketika
  renderOrders({});
  showToast("✅ Semua riwayat pesanan telah dibersihkan!", "success");
}

function searchOrders() {
  const query = document.getElementById("searchOrder").value.toLowerCase();
  document.querySelectorAll(".history-card").forEach(card => {
    const name = card.querySelector(".hc-name")?.textContent.toLowerCase() || "";
    card.style.display = name.includes(query) ? "" : "none";
  });
}

/* ══════════════════════════════════════════
   MODAL SUKSES & TOAST
══════════════════════════════════════════ */
function showSuccessModal(nama, total) {
  document.getElementById("modalTitle").textContent = "Pesanan Berhasil Dikirim! 🎉";
  document.getElementById("modalMsg").textContent =
    `Terima kasih ${nama}! Pesanan senilai Rp ${total.toLocaleString("id-ID")} sudah kami terima dan segera disiapkan hangat-hangat! 🍢`;
  show("successModal");
  show("modalOverlay");
  launchConfetti();
}

function closeModal() {
  hide("successModal");
  hide("modalOverlay");
  document.getElementById("riwayat").scrollIntoView({ behavior: "smooth" });
}

function launchConfetti() {
  const items = ["🎉", "🍢", "🌭", "🥚", "🍤", "🧆", "⭐", "🔥", "💛"];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement("div");
    el.textContent = items[Math.floor(Math.random() * items.length)];
    el.style.cssText = `
      position:fixed; font-size:${1.2 + Math.random()}rem;
      left:${15 + Math.random() * 70}%; top:${15 + Math.random() * 25}%;
      z-index:1500; pointer-events:none;
      animation:confettiFly ${0.8 + Math.random() * 0.6}s ease forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1600);
  }
}

let toastTimer;
function showToast(msg, type = "info") {
  clearTimeout(toastTimer);
  const existing = document.querySelector(".toast-msg");
  if (existing) existing.remove();

  const colors = { info: "#3b82f6", warn: "#f59e0b", error: "#ef4444", success: "#22c55e" };
  const t = document.createElement("div");
  t.className = "toast-msg";
  t.innerHTML = msg.replace(/\n/g, "<br/>");
  t.style.cssText = `
    position:fixed; top:82px; right:24px; z-index:2000;
    background:${colors[type] || colors.info}; color:#fff;
    padding:13px 20px; border-radius:12px;
    font-weight:600; font-size:.84rem; max-width:320px;
    box-shadow:0 8px 28px rgba(0,0,0,.45);
    animation:toastIn .25s ease; line-height:1.5;
  `;
  document.body.appendChild(t);
  toastTimer = setTimeout(() => t.remove(), 3500);
}

/* ══════════════════════════════════════════
   SCROLL TO TOP & UTILITIES
══════════════════════════════════════════ */
function initScrollTop() {
  window.addEventListener("scroll", () => {
    const btn = document.getElementById("scrollTop");
    if (btn) btn.classList.toggle("show", window.scrollY > 300);
  });
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function show(id) { document.getElementById(id)?.classList.remove("hidden"); }
function hide(id) { document.getElementById(id)?.classList.add("hidden"); }

/* Expose fungsi ke window */
window.toggleMusic = toggleMusic;
window.toggleNav = toggleNav;
window.closeNav = closeNav;
window.changeQty = changeQty;
window.closeModal = closeModal;
window.deleteOrder = deleteOrder;
window.clearHistory = clearHistory;
window.searchOrders = searchOrders;
window.scrollToTop = scrollToTop;
window.goOrderItem = goOrderItem;
window.handleOrderSubmit = handleOrderSubmit;
window.renderOrders = renderOrders;
window.loadLocalOrders = loadLocalOrders;
window.playVideoDirectly = playVideoDirectly;
