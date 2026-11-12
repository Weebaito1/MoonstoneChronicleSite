# The Moonstone Chronicle — Website Starter

A responsive, multi-page HTML/CSS/JavaScript starter for The Moonstone Chronicle, styled around an Old West after-dark / Victorian Gothic / occult atmosphere.

## Included pages

- `index.html` — public landing pages
- `about-us.html` — overview of the Chronicle, its setting, and roleplay approach
- `rules.html` — roleplay expectations and where to find current official rules
- `support-us.html` — optional Community Support Tiers, Ko-fi link, and fan-project support policy
- `world.html` — Montana Falls setting and frontier overview
- `the-chronicle.html` — introduction to the Chronicle, World of Darkness, and collaborative storytelling
- `lore.html` — the Kindred, sects, clans, and the emerging domain of Montana Falls
- `clans.html` — the 13 core Kindred clans, lineages, and other paths
- `hunter-info.html` — the Imbued, their Second Sight, Creeds, and Hunter experience
- `humans.html` — The Human Experience and life on the frontier
- `regions.html` — The World of Montana Falls and its five territories
- `getting-started.html` — onboarding path
- `character-guide.html` — character sheet workflow and V20-inspired reference
- `keybinds.html` — where to check client and server control bindings
- `montana-falls-guide.html` — introduction to the Chronicle's frontier setting
- `dark-pack.html` — fan-content policy, attribution, and official agreement link
- `community.html` — community values, ways to connect, and Discord/Ko-fi links
- `assets/css/site.css` — shared design system and responsive styles
- `assets/js/site.js` — responsive navigation and page utilities

The main navigation groups **About Us**, **Rules**, and **Support Us** under **Moonstone**; **The World of Montana Falls** and the Montana Falls guide under **Montana Falls**; and the Chronicle overview, Kindred, Hunters, and humans under **The Creatures**. Clans are linked from the Kindred page. Onboarding, character, and keybind pages are grouped under **Getting Started**. The Chronicle overview and Kindred page each have their own page, while Arrival in Montana Falls is covered on the Montana Falls page. Dropdowns open on hover or keyboard focus on desktop, and expand with their toggle buttons on smaller screens. Server-specific rules, control bindings, and Montana Falls details should be confirmed with staff where the guides note that information is not yet published.

## Run locally

GitHub Pages uses Jekyll to apply the clean permalinks declared in each page's front matter. Opening the source HTML files directly or serving the repository with a basic static server does not process those permalinks.

For a local preview with clean URLs, build or serve the project with Jekyll from the project folder:

```bash
jekyll serve
```

Then open `http://localhost:4000`.

## Future Site Edits

- Add the official community invite, server connection details, and support contact when they are ready.
- Publish the final server rules, age and whitelist requirements, character approval process, approved character options, and current keybinds.
- Add staff-approved town, district, and travel details for Montana Falls.
- Add the staff-approved V20 and Chronicle homebrew Merits and Flaws, including point values, definitions, requirements, and limits.
- Replace sample background image URLs with commissioned or licensed imagery, or custom Moonstone artwork.
- Add the final favicon, social preview image, and domain details.
- Recheck mobile layouts, keyboard navigation, internal and external links, and contrast after content updates.

## Design tokens

The shared palette is defined at the top of `assets/css/site.css` using CSS custom properties:
- Midnight: `--ink`
- Slate: `--slate`
- Antique gold: `--gold`
- Oxblood: `--oxblood`
- Deep plum: `--plum`
- Restrained silver: `--silver`

Fonts are Cinzel, IM Fell English, and Inter via Google Fonts. A system-font fallback is provided.
