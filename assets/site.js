// Wardle Travel demo site: shared header/footer, passcode gate and small
// interactive bits. No build step, so this runs as-is on GitHub Pages.

// ---------- Business details (placeholders until real details are confirmed) ----------

const BUSINESS = {
  name: "Wardle Travel",
  branch: {
    name: "Wardle Travel",
    address: ["1 High Street", "Anytown", "AB1 2CD"],
    phone: "01632 960123",
    email: "hello@example.com",
    hours: [
      ["Monday", "09:30 – 17:00"],
      ["Tuesday", "09:30 – 17:00"],
      ["Wednesday", "09:30 – 17:00"],
      ["Thursday", "09:30 – 17:00"],
      ["Friday", "09:30 – 17:00"],
      ["Saturday", "10:00 – 14:00"],
      ["Sunday", "Closed"],
    ],
  },
};

const tel = (phone) => "tel:+44" + phone.replace(/\s/g, "").replace(/^0/, "");
const directionsUrl = (address) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address.join(", "));

// ---------- Passcode gate ----------

// This is only a light hiding mechanism: GitHub Pages is public and the page
// source can still be read. We store a SHA-256 hash rather than the passcode
// itself so it is not sitting in plain text. To change it, hash the new
// passcode (e.g. `echo -n "newcode" | sha256sum`) and paste it here.
const PASSCODE_SHA256 = "47ddf8876bdd708ca2b69625c9a3cc1de944e3350627fd53db0619075a30b54b";
const GATE_KEY = "wt_unlocked";

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function isUnlocked() {
  try {
    return sessionStorage.getItem(GATE_KEY) === PASSCODE_SHA256;
  } catch {
    return false;
  }
}

function renderGate() {
  const gate = document.getElementById("gate");
  gate.innerHTML = `
    <form class="gate-card" id="gate-form">
      <div class="logo">${logoHtml()}</div>
      <h1>Private preview</h1>
      <p>This demo site is not public yet. Enter the passcode to continue.</p>
      <input type="password" id="gate-input" placeholder="Passcode" autocomplete="current-password" autofocus />
      <p class="gate-error" id="gate-error" role="alert"></p>
      <button type="submit" class="btn btn-accent btn-block">Continue</button>
    </form>`;

  const input = document.getElementById("gate-input");
  const error = document.getElementById("gate-error");

  input.addEventListener("input", () => (error.textContent = ""));
  document.getElementById("gate-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const hash = await sha256(input.value.trim());
    if (hash === PASSCODE_SHA256) {
      try {
        sessionStorage.setItem(GATE_KEY, hash);
      } catch {
        /* storage blocked: stay unlocked for this page view only */
      }
      document.documentElement.classList.remove("locked");
      window.scrollTo(0, 0);
    } else {
      error.textContent = "Incorrect passcode.";
      input.select();
    }
  });
  input.focus();
}

// ---------- Shared layout ----------

function logoHtml() {
  return `
    <span class="logo-mark" aria-hidden="true">🧭</span>
    <span class="logo-text"><strong>Wardle Travel</strong><span>Family-run travel agents</span></span>`;
}

const NAV = [
  ["index.html", "Home"],
  ["about.html", "About"],
  ["contact.html", "Contact"],
];

function renderHeader() {
  const current = location.pathname.split("/").pop() || "index.html";
  const b = BUSINESS.branch;
  const links = NAV.map(
    ([href, label]) => `<a href="${href}" class="${href === current ? "active" : ""}">${label}</a>`
  ).join("");

  document.getElementById("site-header").innerHTML = `
    <div class="demo-banner">Demo site · all content, prices and reviews are placeholders</div>
    <div class="topbar">
      <div class="container">
        <span class="topbar-links">
          <span>📞 <a href="${tel(b.phone)}">${b.phone}</a></span>
        </span>
        <span class="topbar-links topbar-tagline">
          <a href="#" data-placeholder="Facebook page link to be added.">Facebook</a>
          <a href="#" data-placeholder="Instagram link to be added.">Instagram</a>
        </span>
      </div>
    </div>
    <header class="site-header">
      <div class="container">
        <a href="index.html" class="logo" aria-label="Wardle Travel home">${logoHtml()}</a>
        <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">☰</button>
        <nav class="nav" id="nav">
          ${links}
          <a href="index.html#book" class="btn btn-primary">Book online</a>
        </nav>
      </div>
    </header>`;

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "✕" : "☰";
  });
}

function renderFooter() {
  const year = new Date().getFullYear();
  const b = BUSINESS.branch;
  document.getElementById("site-footer").innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="index.html" class="logo">${logoHtml()}</a>
            <p>Your local, family-owned independent travel agency. Placeholder text: sells on behalf of an ABTA member (details to be confirmed).</p>
            <div class="trust-row"><span>ABTA</span><span>ATOL</span></div>
          </div>
          <div>
            <h4>Wardle Travel</h4>
            <ul>
              <li><a href="index.html#book">Book online</a></li>
              <li><a href="about.html">About us</a></li>
              <li><a href="contact.html">Contact us</a></li>
            </ul>
          </div>
          <div>
            <h4>Policies</h4>
            <ul>
              <li><a href="#" data-placeholder="Terms &amp; conditions to be added.">Terms &amp; conditions</a></li>
              <li><a href="#" data-placeholder="Privacy policy to be added.">Privacy policy</a></li>
              <li><a href="#" data-placeholder="Cookies policy to be added.">Cookies policy</a></li>
              <li><a href="https://www.gov.uk/foreign-travel-advice" target="_blank" rel="noopener">Foreign travel advice</a></li>
              <li><a href="https://travelaware.campaign.gov.uk/" target="_blank" rel="noopener">Travel Aware</a></li>
            </ul>
          </div>
          <div>
            <h4>Visit us</h4>
            <ul>
              <li>${b.address.join("<br>")}</li>
              <li><a href="${tel(b.phone)}">${b.phone}</a></li>
              <li><a href="mailto:${b.email}">${b.email}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-legal">
          <p><strong style="color:#e2e8f0">Book with confidence.</strong> Placeholder text: ABTA membership number, ATOL details and the ABTA Code of Conduct and arbitration information will go here once confirmed.</p>
          <p>© ${year} Wardle Travel. Demo website for stakeholder review. Company number and registered office: placeholder.</p>
        </div>
      </div>
    </footer>
    <div class="modal-backdrop" id="placeholder-modal" role="dialog" aria-modal="true" aria-labelledby="placeholder-title">
      <div class="modal">
        <div class="big">🚧</div>
        <h3 id="placeholder-title">Coming soon</h3>
        <p id="placeholder-text">This is a placeholder in the demo site and isn't connected to anything yet.</p>
        <button class="btn btn-accent" data-close-modal>Got it</button>
      </div>
    </div>`;
}

// ---------- Placeholder interactions ----------

function showPlaceholder(text) {
  const modal = document.getElementById("placeholder-modal");
  document.getElementById("placeholder-text").textContent =
    text || "This is a placeholder in the demo site and isn't connected to anything yet.";
  modal.classList.add("open");
}

function wirePlaceholders() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-placeholder]");
    if (trigger) {
      e.preventDefault();
      showPlaceholder(trigger.dataset.placeholder || undefined);
    }
    if (e.target.closest("[data-close-modal]") || e.target.id === "placeholder-modal") {
      document.getElementById("placeholder-modal").classList.remove("open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.getElementById("placeholder-modal")?.classList.remove("open");
  });

  // Every form on the demo is a placeholder: show a friendly message instead of submitting.
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showPlaceholder(form.dataset.demoForm || undefined);
    });
  });
}

function wireCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((wrap) => {
    const track = wrap.querySelector(".reviews");
    const step = () => track.querySelector(".review").offsetWidth + 20;
    wrap.querySelector("[data-prev]")?.addEventListener("click", () => track.scrollBy({ left: -step() }));
    wrap.querySelector("[data-next]")?.addEventListener("click", () => track.scrollBy({ left: step() }));
  });
}

// Show one age picker per child when the Children count changes.
function wireChildAges() {
  const count = document.querySelector("[data-child-count]");
  const wrap = document.querySelector("[data-child-ages]");
  if (!count || !wrap) return;
  const grid = wrap.querySelector(".child-ages-grid");

  const ageOptions = ['<option value="" selected disabled>Age</option>']
    .concat(Array.from({ length: 18 }, (_, age) => `<option value="${age}">${age === 0 ? "Under 1" : age}</option>`))
    .join("");

  count.addEventListener("change", () => {
    const n = Number(count.value);
    // Keep any ages already picked when the count goes up or down.
    const previous = Array.from(grid.querySelectorAll("select"), (sel) => sel.value);
    grid.innerHTML = Array.from(
      { length: n },
      (_, i) => `
        <div class="field">
          <label for="b-child-${i + 1}">Child ${i + 1}</label>
          <select id="b-child-${i + 1}" required>${ageOptions}</select>
        </div>`
    ).join("");
    grid.querySelectorAll("select").forEach((sel, i) => {
      if (previous[i]) sel.value = previous[i];
    });
    wrap.hidden = n === 0;
  });
}

// Fills any element marked data-branch with the branch card, and
// data-hours with the opening hours table.
function renderBranch() {
  const b = BUSINESS.branch;
  document.querySelectorAll("[data-branch]").forEach((el) => {
    el.innerHTML = `
      <div class="card branch">
        <h3>📍 ${b.name}</h3>
        <dl>
          <dt>Address</dt><dd>${b.address.join("<br>")}</dd>
          <dt>Phone</dt><dd><a href="${tel(b.phone)}">${b.phone}</a></dd>
          <dt>Email</dt><dd><a href="mailto:${b.email}">${b.email}</a></dd>
        </dl>
        <div class="actions">
          <a href="${tel(b.phone)}" class="btn btn-accent">Call us</a>
          <a href="${directionsUrl(b.address)}" target="_blank" rel="noopener" class="btn btn-ghost">Get directions</a>
          ${el.hasAttribute("data-branch-link") ? '<a href="contact.html" class="btn btn-ghost">View branch details</a>' : ""}
        </div>
      </div>`;
  });
  document.querySelectorAll("[data-hours]").forEach((el) => {
    el.innerHTML = `
      <table class="hours">
        ${b.hours.map(([day, time]) => `<tr><th>${day}</th><td class="${time === "Closed" ? "closed" : ""}">${time}</td></tr>`).join("")}
      </table>`;
  });
}

// ---------- Boot ----------

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderBranch();
  wirePlaceholders();
  wireCarousels();
  wireChildAges();
  if (document.documentElement.classList.contains("locked")) renderGate();
});

// Decide lock state as early as possible so content never flashes.
if (isUnlocked()) document.documentElement.classList.remove("locked");
