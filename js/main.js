(function () {
  const progress = document.querySelector(".top-progress");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const reveals = document.querySelectorAll(".reveal");

  function updateProgress() {
    if (!progress) return;
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
    progress.style.width = pct + "%";
  }

  function openOnView() {
    const trigger = window.innerHeight * 0.9;
    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add("in");
      }
    });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      const expanded = nav.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", String(expanded));
    });

    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("scroll", openOnView, { passive: true });
  window.addEventListener("resize", openOnView);
  updateProgress();
  openOnView();
})();
