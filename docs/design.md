# Website design rules

The site is plain on purpose: type, screenshots and
space. Anything that does not carry information is left out. Check a change against this list
before it goes in.

## What the page is made of

- **Two colours and one line.** `--ink` on `--paper`, with `--olive` and `--muted` as the two
  greys for secondary text and `--line` for rules. Dark and light swap the same tokens.
  `--accent`, the yellow of the logo, is only ever a line: the short bar above a chapter heading, the underline of a link or of the
  selected item, and the focus ring. It never fills a shape and never colours text. Any other
  colour on a page comes from screenshots of Suhina.
- **One typeface.** Host Grotesk in weights 400 and 600. `--mono` (Geist Mono) is only for
  things a person types or reads from a screen: keys, file names, saved setting names.
- **Five sizes.** 14 px notes, 17 px text, 22 px item names, the `h2` scale and the `h1` scale.
- **Square corners.** No border radius, no shadows, no gradients, no tinted panels.
- **One button.** A solid `--ink` rectangle with uppercase text, for downloading. Everything
  else that can be clicked is an underlined link or plain text that underlines on hover.
- **One layout.** A chapter is a heading on the left and a narrow column of text beside it,
  optionally followed by one full-width picture on a black panel. Lists use rules between rows.

## What is left out

- Pills, chips, tags and badges. A state such as "pre-alpha" or "work in progress" is written
  as words in the sentence or line it belongs to.
- Dots, glyph arrows (↗ → ↓) and icons as decoration. An icon is allowed only where it is the
  control itself (the theme switch, the `+` of a row that opens).
- Uppercase labels above headings, slogans, counters and other kickers.
- A second accent, coloured hover states and highlighted blocks.
- Cards and boxes. Group with space and a rule, not a border around the thing.
- Text that repeats a neighbour. One heading, one or two short paragraphs, one link.

## Search engines and previews

- Every page is prerendered with one `h1`; chapters are `h2`, items inside them `h3`.
- The title and description of each page name what it is in the words people search with
  (`DAW`, `open source`, the platforms). `src/data/site.ts` builds the canonical URL, preview
  tags and the home page's structured data from them.
- Fonts load from a `<link>` in each page's head with `preconnect`, never from CSS `@import`.
- Every image has its size, an `alt` that says what it shows, and `loading="lazy"` below the
  first screen. The first screenshot is the page's largest paint and has `fetchpriority="high"`.
- Link text says where the link goes. No "click here", no bare arrows.
