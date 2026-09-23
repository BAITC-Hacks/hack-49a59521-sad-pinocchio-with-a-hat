# Samruk-Kazyna Design System

**Samruk-Kazyna JSC** (Самұрық-Қазына) is Kazakhstan's Sovereign Wealth Fund — the state-owned national investment holding that owns or co-owns the country's strategic enterprises (KazMunayGas, Kazatomprom, Kazakhstan Temir Zholy, Samruk-Energy, KEGOC, QazPost, Kazakhtelecom, QazaqGaz, Air Astana…). Founded 2008 by presidential decree; the Government is the sole shareholder. Its digital voice is semi-governmental: formal, institutional, trilingual (Kazakh / Russian / English).

## Products represented
1. **sk.kz** — corporate website of the Fund (news, governance, investors, portfolio, hotline). Font: PT Sans. Square, ornamented, navy + gold.
2. **qsamruk.kz** — group careers portal ("Вакансии в лучших компаниях страны"). Font: Rubik. Same navy + gold, 2px radii, light shadows, photo hero.
Related (linked, not recreated): sknews.kz (SK NEWS corporate news portal), sk-trust.kz (charity fund), sk-hotline.kz.

## Sources
- `uploads/logo.svg` — official mark + wordmark, single-colour (no fill; recoloured copies in `assets/`).
- 6 screenshots in `uploads/` — sk.kz home (hero, dropdown, hotline, footer, splash loader) and qsamruk.kz home.
- Live page structure of https://sk.kz/?lang=en (read for copy, nav tree and asset names; assets could not be downloaded).
- No codebase, Figma or brand book was provided. All values are **measured from 2× screenshots** (CSS px = screenshot px ÷ 2) and sampled pixel colours.

---

## CONTENT FUNDAMENTALS
- **Voice:** institutional third person. The Fund refers to itself as "Samruk-Kazyna", "the Fund", "Samruk-Kazyna JSC", "Samruk-Kazyna Group". Never "we" in news; "We guarantee" / "We are looking forward to your applications!" appears only in service blocks (hotline, charity).
- **Addressing the reader:** impersonal or polite "you" ("You can report any violations of the Code of Conduct…"). Russian UI uses formal «Вы» with capital В ("Если Вы продолжаете…").
- **Headlines:** news-wire style, Title Case in English ("Samruk-Kazyna Maintains Growth in Key Financial and Operational Indicators"), sentence case in Russian. Full names + titles of officials ("Nurlan Zhakupov Meets with Chairman of Sunwah Group"). Numbers stated precisely ("approximately $11 billion", "More Than 1,500 AI Agents").
- **Excerpts** are truncated mid-word with "..." ("…Gaziantep Provin...").
- **Labels:** short nouns — "About SK", "For investors", "Press Center", "Procurements", "Charity". CTAs: "More", "See more", "All news", "All companies"; Russian: «Войти», «Регистрация», «Найти», «Расширенный поиск», «Все компании».
- **Caps:** UPPERCASE reserved for card heads (HOTLINE, WE GUARANTEE) and portal section titles (ПОБЕДИТЕЛИ КОНКУРСА HR-БРЕНД 2025). Russian quotes use «ёлочки» («Архитектор талантов»); legal names in quotes: © 2009-2026 "Samruk-Kazyna" JSC.
- **Dates:** "23 September" in tabs, "23.09.2026" in lists.
- **No emoji**, no exclamation marks in product UI, no slang. Kazakh place/brand names keep native letters (Қазақстан Темір Жолы, Nurdağı).
- **Trilingual:** every surface has Қаз / Рус / Eng switcher; design for longest (Russian/Kazakh strings run ~20–30% longer).

## VISUAL FOUNDATIONS
- **Colour:** deep navy `#17335D` (headlines, portal bar, primary buttons) and darker navy `#283652` (footer, active tab, loader) paired with a muted, warm **gold/khaki `#A78C6D`** (card bars, underlines, secondary buttons, icons) and a greyer **tan `#AA9D8A`** (inactive tabs, nav hover). Links are a plain web blue `#0260BA`. Everything else is cool light grey (`#ECECEC` page, `#EEEEEE` cards, `#D1D1D1` bands). No gradients, no bright/saturated accents; colour is sparse and heraldic.
- **Type:** sk.kz = PT Sans (regular for almost everything, bold only for uppercase card heads); headlines are *regular weight*, navy, large (30px / 35px leading). Section titles 36px regular, dark grey, centred. qsamruk.kz = Rubik, heavier (500–700), uppercase bold section titles.
- **Backgrounds:** the signature is a **Kazakh "koshkar-muyiz" (ram's horn) ornament** tiled in two light greys behind the header/hero band (`.sk-pattern`). Sections open with an **ornament border rule + gold Samruk bird** divider (`.sk-border-ornament`, `.sk-bird`). A pale line-drawn Samruk mark sits as a watermark bottom-right in the hero text panel. Otherwise flat grey page.
- **Imagery:** documentary, natural-light photos of official meetings, schools, industrial workers in PPE; slightly cool, unfiltered. Always hard-cropped rectangles, no rounding, no duotone. qsamruk hero uses a dimmed industrial video with a navy wash.
- **Layout:** fixed centred column (1180px sk.kz / ~1200px portal); header is a white bar in that column (not full-bleed) floating on the ornament band. Hero = 50/50 text/photo split; four date tabs attached underneath. Grids of 3 (info cards), 4 (news), 5 (logos/nominations). Generous vertical rhythm (60–90px between sections). No sticky elements observed.
- **Corners:** sk.kz — **0 radius everywhere**. Portal — 2px on buttons/inputs. Only circles: pager dots and social icons.
- **Borders:** 1px hairlines (grey `#9B9B9B` on news cards, `#C4C4C4` on pickers, `#CBD4E1` on inputs, gold on nomination tiles). Info cards use a **9px solid gold top bar** instead of a border.
- **Shadows:** sk.kz uses none. Portal uses one soft panel shadow (`0 4px 24px rgba(23,51,93,.08)`) for the floating search panel and the winners panel.
- **Cards:** sk.kz — flat `#EEEEEE` fill, gold top bar, uppercase navy heading, photo flush at bottom. Portal — white, gold hairline, centred logo + text.
- **Hover:** nav items fill tan with white text; dropdown rows go `#C4C4C4`; news cards fill white; logos lift 3px; buttons brighten ~10%. **Press:** darken (brightness .88); gold → `#937E65`.
- **Active indicators:** navy date tab with a diamond notch; filled gold dot; gold UPPERCASE nav item on portal.
- **Motion:** slow, calm — carousel crossfade/slide ~600ms, auto-advance ~7s; loader = thin navy progress line under the logo on grey. Easing standard ease-out; no bounces.
- **Transparency/blur:** only the cookie banner (navy ~78% opacity) and the hero photo wash. No backdrop blur.

## ICONOGRAPHY
- sk.kz ships its own small set of **thin-line icons** as SVG/PNG in `/local/templates/default_template/assets/img/icons/` (search, search-light, clear, arrow-primary, arrow-light, slider-arrow, lang-arrow, briefcase, watermark, dots, bird, border) plus PNG social icons (facebook, youtube, instagram, telegram-logo). Gold for utility icons (search, briefcase), blue/navy for arrows, white in the footer inside outlined circles.
- **These files could not be downloaded.** Substitution: **Lucide** (`lucide-static@0.460.0` via unpkg), rendered through the `Icon` component with CSS masks so they tint to tokens. Stroke is slightly heavier than the originals — flagged.
- Ornament bitmaps (`ornament-tile.png`, `ornament-border-crop.png`, `ornament-bird-crop.png`, `watermark-crop.png`) are **cropped from the screenshots** — faithful but low-res; replace with the originals when available.
- The opening quote mark in the hero is a typographic “ in PT Sans Bold, gold.
- No emoji. No icon font. Unicode arrows not used (arrows are icons).

## Logo
`assets/logo.svg` (original, black), `logo-navy.svg`, `logo-white.svg`, `logo-gold.svg` (same paths, fill recoloured). The live site uses a **two-colour** version (gold rays + wordmark "SAMRUK", navy bird + "KAZYNA") — not supplied; request it. Group-company logos and QSAMRUK/SK NEWS marks in `assets/logos/` are screenshot crops.

## Fonts
PT Sans and Rubik load from Google Fonts (`tokens/fonts.css`). No font binaries were supplied; both identifications are visual — please confirm/provide files.

---

## Index
- `styles.css` — entry; imports `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `brand-assets.css` (ornament utility classes).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `assets/` — logos, ornament bitmaps, `photos/`, `logos/` (group companies, partners strip).
- `components/` — React primitives (below), one `.card.html` per folder.
- `ui_kits/sk-kz/` — corporate homepage recreation. `ui_kits/qsamruk/` — careers portal home.
- `thumbnail.html`, `SKILL.md`.

## Components
- **core/**: Icon, Button, ArrowLink, SocialIcon
- **navigation/**: SiteHeader, NavDropdown, LangSelect, SiteFooter, PortalHeader
- **forms/**: TextField, SelectField, SearchInput, CompanyPicker
- **content/**: HeroSlide, DateTabs, DotPager, SectionDivider, NewsCard, InfoCard, SectionTitle, StatCounter, NominationCard, LogoTile

No source component library existed; the inventory is derived from what the screenshots show. Intentional additions: **Icon** (wrapper for the Lucide substitute); **TextField error state** (not observed).
