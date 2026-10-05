# RentABeachCondo.com — Grand Strand Coastal Rental Directory

A direct-from-owner coastal vacation-rental directory prototype built for the Grand Strand area of South Carolina (North Myrtle Beach, Myrtle Beach, and Surfside Beach).

## 🚀 Key Features

- **Traveler Directory:** Live hero search, area & building hierarchies, responsive condo listings, amenity filters, grid/list view toggle, and direct owner inquiry drawer with simulated email notification.
- **5-Step Owner Onboarding:** Fast application flow with photo drag & drop, cover badge selection, reordering, legal photo authorization, sticky live preview card, and a 1-click **Autofill Demo Data** tool.
- **Turnkey Admin Backoffice:** Side-by-side application inspection, 1-click **Approve & Publish** to live browse with an 8-second undo snackbar, request changes modal, inquiry audit log, and launch readiness checklist.
- **Responsive Hardware Frame Switcher:** Built-in floating demo toolbar supporting Desktop, Tablet (768px), and Mobile (375px) device previews.

---

## 🛠 Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Custom Coastal Tokens
- **Routing:** React Router v6 (with `RouteErrorBoundary` and Netlify SPA fallback redirects)
- **State Management:** Zustand (with referentially stable selectors)
- **Icons:** Lucide React
- **Typography:** Self-hosted Google Fonts (`@fontsource/newsreader`, `@fontsource/hanken-grotesk`)

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Netlify Deployment

This repository is pre-configured for one-click deployment on [Netlify](https://www.netlify.com/):

1. **Connect Git Repository:** Select `Vacation-Rental-Site` on Netlify.
2. **Build Settings (automatically read from `netlify.toml`):**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. **SPA Redirects:** Handled via `netlify.toml` and `public/_redirects` (`/*  /index.html  200`).
