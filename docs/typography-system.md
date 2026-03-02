# Typography System — Modern Minimalist Tech (DashDigital-Inspired)

## 1) Primary Sans-Serif Font (Body)

### **Primary: Inter**
Inter is a clean, highly readable sans-serif optimized for UI and long-form digital reading. It has excellent legibility at small sizes, balanced proportions, and a neutral, modern tone that fits minimalist tech branding.

**Google Fonts link**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**CSS embed snippet**

```css
:root {
  --font-body: "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
```

---

## 2) Secondary Fonts (Headings / Display)

### **Option A: Sora**
Sora pairs well with Inter by adding geometric character and a subtle futuristic edge for headlines while remaining clean.

**Google Fonts link**

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&display=swap" rel="stylesheet">
```

**CSS snippet**

```css
:root {
  --font-heading: "Sora", "Inter", "Segoe UI", Roboto, Arial, sans-serif;
}
```

### **Option B: Space Grotesk**
Space Grotesk offers a technical and editorial feel, ideal for feature headers, product names, and hero statements.

**Google Fonts link**

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

**CSS snippet**

```css
:root {
  --font-display: "Space Grotesk", "Inter", "Segoe UI", Roboto, Arial, sans-serif;
}
```

---

## 3) Sample CSS Stylesheet

```css
/* Import in <head> with <link> tags for best performance */

:root {
  --font-body: "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-heading: "Sora", "Inter", "Segoe UI", Roboto, Arial, sans-serif;
  --font-display: "Space Grotesk", "Inter", "Segoe UI", Roboto, Arial, sans-serif;

  --text-color: #0f172a;      /* slate-900 */
  --text-muted: #334155;      /* slate-700 */
  --bg-color: #ffffff;

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  font-family: var(--font-body);
  font-size: 1rem;            /* 16px */
  line-height: 1.65;
  letter-spacing: 0;
  font-weight: var(--weight-regular);
  color: var(--text-color);
  background: var(--bg-color);
}

/* Headline scale */
h1, h2, h3, h4, h5, h6 {
  margin: 0 0 0.6em;
  font-family: var(--font-heading);
  color: var(--text-color);
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-weight: var(--weight-semibold);
}

h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem); /* 40px–72px */
  font-family: var(--font-display);       /* More distinct hero style */
  font-weight: var(--weight-bold);
  letter-spacing: -0.03em;
  line-height: 1.05;
}

h2 {
  font-size: clamp(2rem, 3.2vw, 3rem);    /* 32px–48px */
}

h3 {
  font-size: clamp(1.5rem, 2.4vw, 2.25rem); /* 24px–36px */
}

h4 {
  font-size: clamp(1.25rem, 1.8vw, 1.75rem); /* 20px–28px */
}

h5 {
  font-size: 1.125rem; /* 18px */
  letter-spacing: -0.01em;
}

h6 {
  font-size: 1rem; /* 16px */
  letter-spacing: 0;
  text-transform: uppercase;
  font-weight: var(--weight-medium);
}

p,
li,
small,
label,
input,
textarea,
button {
  font-family: var(--font-body);
}

p {
  margin: 0 0 1em;
  max-width: 68ch;
  color: var(--text-muted);
}

/* Utility classes for hierarchy */
.text-lead {
  font-size: clamp(1.125rem, 1.6vw, 1.375rem); /* 18px–22px */
  line-height: 1.6;
  letter-spacing: -0.005em;
  font-weight: var(--weight-regular);
}

.text-caption {
  font-size: 0.875rem;   /* 14px */
  line-height: 1.45;
  letter-spacing: 0.01em;
}

.text-overline {
  font-size: 0.75rem;    /* 12px */
  line-height: 1.4;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: var(--weight-semibold);
}
```

---

## 4) Fallback Strategy for Compatibility & Performance

Recommended fallback stack pattern:

```css
font-family: "Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

Why this stack works:
- **Segoe UI** is widely available on Windows.
- **Roboto** is common on Android and ChromeOS.
- **Helvetica Neue / Arial** provide strong macOS and generic fallback coverage.
- **sans-serif** ensures a final generic fallback on all browsers/devices.

Use `display=swap` in Google Fonts URLs to avoid invisible text during font loading.

---

## 5) Why This System Fits a DashDigital-Like Minimalist Tech Style

- **Inter for body**: highly legible and neutral, ideal for dense product content, case studies, and UI labels.
- **Sora for headings**: modern geometric forms create clean, premium hierarchy without decorative noise.
- **Space Grotesk for hero/display**: introduces a subtle tech-forward personality that helps standout banners and product names.
- **Tight headline tracking + generous body line-height**: creates a signature contemporary rhythm—confident headers, relaxed reading text.
- **Limited weight palette (400/500/600/700)**: keeps interfaces visually consistent and professional.

### Example usage pattern
- **H1 (hero statement)** → Space Grotesk 700, very tight tracking.
- **Section titles (H2/H3)** → Sora 600.
- **Body/UI copy** → Inter 400/500.
- **Meta labels / overlines** → Inter or Sora 600 uppercase with increased letter spacing.
