(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      if (isOpen) {
        nav.querySelectorAll(".nav-group").forEach(group => {
          group.classList.remove("is-open");
          group.querySelector(".nav-submenu-toggle")?.setAttribute("aria-expanded", "false");
        });
      }
    });

    nav.querySelectorAll(".nav-submenu-toggle").forEach(submenuToggle => {
      submenuToggle.addEventListener("click", () => {
        const group = submenuToggle.closest(".nav-group");
        const isOpen = submenuToggle.getAttribute("aria-expanded") === "true";
        if (!group) return;
        group.classList.toggle("is-open", !isOpen);
        submenuToggle.setAttribute("aria-expanded", String(!isOpen));
      });
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });

    nav.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        nav.querySelectorAll(".nav-group.is-open").forEach(group => {
          group.classList.remove("is-open");
          group.querySelector(".nav-submenu-toggle")?.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

})();