# Yehana Projects — Website

Custom HTML/CSS/JS marketing site for Yehana Projects, a construction & finishing
contractor based in Knysna, serving the Garden Route. No CMS, no build tooling —
plain static files, deployable anywhere.

## Structure

```
index.html              Single-page site (all sections)
assets/css/
  reset.css              Minimal cross-browser reset
  tokens.css              Design tokens: color, type, spacing
  main.css                 Layout primitives, typography, section rhythm
  components.css        Nav, hero, bento grid, before/after slider, footer, etc.
assets/js/
  main.js                    Mobile nav toggle, scroll-reveal, footer year
  before-after-slider.js   Drag/touch/keyboard before-after comparison
  hero-motion.js         Pointer-driven parallax on the hero grid (desktop only)
schema/local-business.json  Source copy of the LocalBusiness JSON-LD (also inlined in <head>)
robots.txt, sitemap.xml     Basic crawl config
```

## Run locally

No build step needed — any static server works:

```
python3 -m http.server 8000
# then open http://localhost:8000
```

## Before going live — checklist

- [ ] Swap all `.ba-slider__img` placeholder blocks for real `<img>` before/after
      project photos (add meaningful `alt` text on each)
- [ ] Replace the 3 testimonials in `#testimonials` with real, verified client
      quotes — placeholders are clearly marked and intentionally **not** marked
      up with Review/AggregateRating schema until they're real
- [ ] Add real headshots for Dumisani and the 10 specialists (currently
      placeholder tiles in `#team`)
- [ ] Add an `assets/img/og-cover.jpg` (1200×630) for social share previews,
      referenced in `<meta property="og:image">`
- [ ] Confirm the canonical domain in `index.html`, `robots.txt`, and
      `sitemap.xml` (currently `https://www.yehanaprojects.co.za/`)
- [ ] Add a real street address to `schema/local-business.json` and the footer
      if the business has one for NAP consistency — currently service-area only
- [ ] Run Lighthouse / PageSpeed Insights once real images are in place and
      confirm sub-2.5s LCP (compress images to WebP, target <200KB hero image)
- [ ] Add a favicon

## Deploy

Static output, no build step — works as-is on Vercel, Netlify, GitHub Pages,
or any static host. For Vercel: `vercel --prod` from this directory, or connect
the GitHub repo in the Vercel dashboard for auto-deploys on push.
