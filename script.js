const navItems = [
  { href: "index.html", key: "home", label: "Home" },
  { href: "mission-and-principles.html", key: "mission", label: "Mission" },
  { href: "get-involved.html", key: "involved", label: "Get Involved" },
  { href: "logistics.html", key: "logistics", label: "Logistics" },
  { href: "itinerary.html", key: "itinerary", label: "Itinerary" }
];

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  const activePage = document.body.dataset.page;
  const links = navItems
    .map((item) => {
      const activeClass = item.key === activePage ? "active" : "";
      return `<a class="${activeClass}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  mount.innerHTML = `
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="index.html">Summer Camp 2026</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav">Menu</button>
      </div>
      <div class="topbar-inner" style="padding-top: 0;">
        <nav id="main-nav" class="main-nav" aria-label="Primary">${links}</nav>
      </div>
    </header>
  `;

  const toggle = mount.querySelector(".nav-toggle");
  const nav = mount.querySelector("#main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
      const isExpanded = nav.classList.contains("show");
      toggle.setAttribute("aria-expanded", String(isExpanded));
    });
  }
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  mount.innerHTML = `
    <footer class="footer site-shell">
      <div>Summer Camp 2026. Built with love, consent, and practical checklists.</div>
      <div class="footer-links">
        <a href="https://chat.whatsapp.com/I6YLke4PKQG7AN7cFz4qK6" target="_blank" rel="noopener noreferrer">Join WhatsApp</a>
        <a href="logistics.html">Packing + Deposits</a>
        <a href="get-involved.html">Roles + Submissions</a>
      </div>
    </footer>
  `;
}

function setupCountdown() {
  const countdownNode = document.querySelector("[data-countdown]");
  if (!countdownNode) return;
  countdownNode.classList.add("crt-countdown");

  const campStart = new Date("2026-07-01T12:00:00-07:00").getTime();

  const paint = () => {
    const now = Date.now();
    const diff = Math.max(0, campStart - now);

    const day = 24 * 60 * 60 * 1000;
    const hour = 60 * 60 * 1000;
    const minute = 60 * 1000;

    const days = Math.floor(diff / day);
    const hours = Math.floor((diff % day) / hour);
    const minutes = Math.floor((diff % hour) / minute);
    const seconds = Math.floor((diff % minute) / 1000);

    const countdownToken = `${String(days).padStart(3, "0")}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;

    countdownNode.innerHTML = `
      <p class="crt-line crt-info">Dates: July 1 - July 6</p>
      <p class="crt-line crt-system">SYS // icamp 6 terminal uplink online</p>
      <p class="crt-line crt-info">INFO // launch target 2026-07-01 12:00 PDT</p>
      <p class="crt-line crt-ok"><span class="crt-red-dot" aria-hidden="true"></span>READY // T-minus ${countdownToken}</p>
      <p class="crt-line crt-prompt"><span class="crt-prefix">&gt;</span>awaiting campers<span class="crt-cursor" aria-hidden="true"></span></p>
    `;
  };

  paint();
  window.setInterval(paint, 1000);
}

function setupReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.02, rootMargin: "0px 0px 100px 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
}

renderHeader();
renderFooter();
setupCountdown();
setupReveals();
