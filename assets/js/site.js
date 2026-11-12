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

  const searchForm = document.querySelector("#site-search");
  if (searchForm) {
    const searchInput = searchForm.querySelector("input[name='q']");
    const searchStatus = document.querySelector("#search-status");
    const searchResults = document.querySelector("#search-results");
    const pagePaths = [
      "/", "/about-us/", "/character-guide/", "/clans/", "/community/",
      "/dark-pack/", "/getting-started/", "/ghouls/", "/humans/", "/hunter-info/",
      "/keybinds/", "/lore/", "/montana-falls-guide/", "/regions/",
      "/rules/", "/support-us/", "/the-chronicle/", "/world/"
    ];
    let searchIndex;

    const loadSearchIndex = async () => {
      if (searchIndex) return searchIndex;

      const pages = await Promise.all(pagePaths.map(async path => {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Could not load ${path}: ${response.status}`);

        const page = new DOMParser().parseFromString(await response.text(), "text/html");
        const main = page.querySelector("main");
        if (!main) throw new Error(`No main content found at ${path}`);

        const content = Array.from(main.querySelectorAll("h1, h2, h3, h4, p, li, dt, dd, blockquote, figcaption, .section-kicker, .eyebrow"))
          .map(element => {
            const copy = element.cloneNode(true);
            copy.querySelectorAll("br").forEach(lineBreak => lineBreak.replaceWith(" "));
            return copy.textContent.replace(/\s+/g, " ").trim();
          })
          .filter(Boolean)
          .join(" ");

        return {
          title: page.title,
          url: path,
          text: content
        };
      }));

      searchIndex = pages;
      return searchIndex;
    };

    const createSnippet = (text, terms) => {
      const lowerText = text.toLowerCase();
      const matchPositions = terms
        .map(term => lowerText.indexOf(term))
        .filter(position => position >= 0);
      if (!matchPositions.length) return text.slice(0, 200);
      const start = Math.max(0, Math.min(...matchPositions) - 70);
      const end = Math.min(text.length, start + 200);
      return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
    };

    const search = async query => {
      const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
      searchResults.replaceChildren();

      if (!terms.length) {
        searchStatus.textContent = "Enter a word or phrase to search the site.";
        return;
      }

      searchStatus.textContent = "Searching the site…";
      try {
        const pages = await loadSearchIndex();
        const matches = pages.map(page => {
          const searchableText = `${page.title} ${page.text}`.toLowerCase();
          const matched = terms.every(term => searchableText.includes(term));
          const score = matched
            ? terms.reduce((total, term) => total + searchableText.split(term).length - 1, 0)
            : 0;
          return { ...page, matched, score };
        }).filter(page => page.matched).sort((a, b) => b.score - a.score);

        matches.forEach(page => {
          const item = document.createElement("li");
          const link = document.createElement("a");
          const snippet = document.createElement("p");
          const termsInText = terms.filter(term => page.text.toLowerCase().includes(term));
          link.href = page.url;
          link.textContent = page.title;
          snippet.textContent = createSnippet(page.text, termsInText.length ? termsInText : terms);
          item.append(link, snippet);
          searchResults.append(item);
        });

        searchStatus.textContent = matches.length
          ? `${matches.length} page${matches.length === 1 ? "" : "s"} found.`
          : "No pages found. Try different search terms.";
      } catch (error) {
        console.error("Site search failed to load page content.", error);
        searchStatus.textContent = "Search is temporarily unavailable. Please try again later.";
      }
    };

    searchForm.addEventListener("submit", event => {
      event.preventDefault();
      const query = searchInput.value.trim();
      const url = new URL(window.location.href);
      if (query) url.searchParams.set("q", query);
      else url.searchParams.delete("q");
      window.history.replaceState({}, "", url);
      search(query);
    });

    const initialQuery = new URLSearchParams(window.location.search).get("q") || "";
    searchInput.value = initialQuery;
    if (initialQuery) search(initialQuery);
  }

})();