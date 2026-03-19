# r2X Studio — SEO & Website Changes Documentation
**Website:** https://whalevoice.in  
**Prepared for:** Antigravity Team  
**Date:** March 19, 2026  

---

## Overview

This document outlines all required SEO and code changes for the r2X Studio website hosted on GitHub Pages at `whalevoice.in`. The website consists of two pages:

- `index.html` — Homepage
- `pages/about.html` — About page

All changes are to be committed directly to the GitHub repository.

---

## Change 1 — index.html `<head>` SEO Tags

### What to change
Replace the existing `<head>` block in `index.html` with the updated version below.

### Current code (lines to find):
```html
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>r2X — Communication Design</title>
  <link rel="stylesheet" href="css/globals.css"/>
  <link rel="stylesheet" href="css/index.css"/>
</head>
```

### Replace with:
```html
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <!-- SEO: Page Title -->
  <title>r2X Studio — Web Design, Branding & UI/UX Freelance Services in India</title>

  <!-- SEO: Meta Description -->
  <meta name="description" content="r2X Studio offers professional freelance services including website design, e-commerce stores, portfolio design, branding, and UI/UX design in India. Fast delivery, affordable pricing."/>

  <!-- SEO: Keywords -->
  <meta name="keywords" content="web design india, freelance web designer, e-commerce website, branding design, UI UX design, portfolio website, whalevoice, r2x studio"/>

  <!-- SEO: Robots -->
  <meta name="robots" content="index, follow"/>

  <!-- SEO: Author -->
  <meta name="author" content="r2X Studio"/>

  <!-- Open Graph Tags (for WhatsApp & Instagram link previews) -->
  <meta property="og:title" content="r2X Studio — Web Design & Branding Services"/>
  <meta property="og:description" content="Professional freelance web design, branding, and UI/UX services in India."/>
  <meta property="og:url" content="https://whalevoice.in"/>
  <meta property="og:type" content="website"/>
  <meta property="og:site_name" content="r2X Studio"/>

  <!-- Canonical URL -->
  <link rel="canonical" href="https://whalevoice.in/"/>

  <link rel="stylesheet" href="css/globals.css"/>
  <link rel="stylesheet" href="css/index.css"/>
</head>
```

---

## Change 2 — index.html Hidden H1 Tag

### Why
The homepage has no H1 heading tag which is critical for Google SEO. Since the design is visual/animated, we add a hidden H1 that only search engines can read.

### What to change
Add the following line immediately after the opening `<body>` tag in `index.html`:

### Find:
```html
<body>
  <div id="cursor"></div>
```

### Replace with:
```html
<body>

  <!-- SEO: Hidden H1 for search engines -->
  <h1 style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);opacity:0;">
    r2X Studio — Freelance Web Design, Branding & UI/UX Services in India
  </h1>

  <div id="cursor"></div>
```

---

## Change 3 — index.html Fix Instagram Link

### Why
The Instagram link currently points to `https://instagram.com` (the homepage) instead of the actual r2X profile.

### Find:
```html
<a href="https://instagram.com" target="_blank">@r2X_life</a>
```

### Replace with:
```html
<a href="https://instagram.com/r2X_life" target="_blank">@r2X_life</a>
```

---

## Change 4 — pages/about.html `<head>` SEO Tags

### What to change
Add the following SEO meta tags inside the `<head>` section of `pages/about.html`, after the existing `<meta charset>` and `<meta viewport>` tags and before any `<link>` tags.

### Add these lines:
```html
  <!-- SEO: Page Title -->
  <title>About r2X Studio — Freelance Design Team in India</title>

  <!-- SEO: Meta Description -->
  <meta name="description" content="Learn about r2X Studio, a freelance communication design team offering web design, branding, UI/UX and e-commerce solutions in India. Meet the team and explore our work."/>

  <!-- SEO: Keywords -->
  <meta name="keywords" content="about r2x studio, freelance design team india, communication design, web designers india, branding agency india"/>

  <!-- SEO: Robots -->
  <meta name="robots" content="index, follow"/>

  <!-- SEO: Author -->
  <meta name="author" content="r2X Studio"/>

  <!-- Open Graph Tags -->
  <meta property="og:title" content="About r2X Studio — Freelance Design Team"/>
  <meta property="og:description" content="Freelance design team specializing in web design, branding and UI/UX in India."/>
  <meta property="og:url" content="https://whalevoice.in/pages/about.html"/>
  <meta property="og:type" content="website"/>
  <meta property="og:site_name" content="r2X Studio"/>

  <!-- Canonical URL -->
  <link rel="canonical" href="https://whalevoice.in/pages/about.html"/>
```

---

## Change 5 — sitemap.xml (Already Created)

The sitemap file already exists at the root of the repository. Confirm it contains exactly:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://whalevoice.in/</loc>
    <lastmod>2026-03-19</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://whalevoice.in/pages/about.html</loc>
    <lastmod>2026-03-19</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## Change 6 — robots.txt (Already Created)

The robots.txt file already exists at the root of the repository. Confirm it contains exactly:

```
User-agent: *
Allow: /

Sitemap: https://whalevoice.in/sitemap.xml
```

---

## Summary Checklist

| # | File | Change | Status |
|---|------|--------|--------|
| 1 | `index.html` | Add SEO meta tags in `<head>` | ✅ Done |
| 2 | `index.html` | Add hidden H1 tag after `<body>` | ✅ Done |
| 3 | `index.html` | Fix Instagram link URL | ✅ Done |
| 4 | `pages/about.html` | Add SEO meta tags in `<head>` | ✅ Done |
| 5 | `sitemap.xml` | Verify content is correct | ✅ Done |
| 6 | `robots.txt` | Verify content is correct | ✅ Done |

---

## After All Changes Are Done

1. Commit all changes to the GitHub repository
2. Wait 2–3 minutes for GitHub Pages to update
3. Go to **Google Search Console** → Sitemaps → Resubmit sitemap
4. Go to **URL Inspection** → Request Indexing for:
   - `https://whalevoice.in/`
   - `https://whalevoice.in/pages/about.html`

---

## Notes

- Do NOT remove or modify any existing CSS, JS, or HTML structure — only add the tags specified above
- The hidden H1 uses CSS to hide it visually but keep it readable by Google — do not change the inline style
- The Open Graph tags improve how the link looks when shared on WhatsApp, Instagram, and other platforms
- All changes are additive — nothing existing needs to be deleted except the old `<title>` tag in `index.html`

---

*Document prepared by Claude for r2X Studio / whalevoice.in*
