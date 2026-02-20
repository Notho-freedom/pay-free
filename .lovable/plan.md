
# Complete Website Rebuild for Manuella DJIENANG — AI Video Formation

## What we're building

A full conversion-focused sales website with a dark, gold & purple premium design, a secure payment flow (keeping NotchPay), and a protected member area where students access their training videos after payment.

## What changes vs. what stays

- **Kept:** The entire backend (NotchPay payment edge functions, `transactions` table, webhook)
- **Rebuilt from scratch:** All frontend pages and visual design
- **Added:** New `/formation` (student area) page with email-gated video access

---

## Visual Identity

| Element | Value |
|---|---|
| Background | Deep black `#0a0a0f` |
| Primary accent | Gold `#c9a227` / `#f0c040` |
| Secondary accent | Deep purple `#6b21a8` / `#9333ea` |
| Font — headings | Space Grotesk (already installed) |
| Font — body | Inter (already installed) |
| Animations | Subtle fade-in on scroll, gold shimmer on CTAs |

---

## Pages & Structure

```text
/ (Landing / Sales page)
/paiement (Payment form — keep existing logic)
/confirmation (After payment — keep existing logic)
/formation (Protected student area — NEW)
```

---

## Page 1 — Landing Page (`/`) — Full Rebuild

Sections in order:

1. **Hero** — Strong hook: *"Cette vidéo a été faite par une IA. Pas de caméra. Pas de studio."* + animated gradient background + CTA button scrolling to pricing
2. **Pain points** — 4 cards addressing: fear of being on camera, no equipment, no editing skills, no time
3. **What you'll learn** — 3 steps: Create your AI avatar → Record with Google Flow → Export and publish
4. **Pricing** — Single offer card (premium, centered) with price and CTA — adapts `src/lib/offers.ts`
5. **Testimonials** — 3 placeholder testimonial cards (Manuella will fill in real ones)
6. **FAQ** — Accordion with 5 most common questions
7. **Final CTA** — Bottom banner reinforcing urgency

## Page 2 — Payment (`/paiement`) — Minimal visual refresh

Keep all existing payment logic (NotchPay). Update visual style only: dark background, gold accents, same form fields.

## Page 3 — Confirmation (`/confirmation`) — Visual refresh

Keep existing logic. Update visual to match dark/gold theme. Change WhatsApp button → "Accéder à ma formation" link to `/formation`.

## Page 4 — Student Area (`/formation`) — NEW PAGE

This is the protected video library. Access works like this:

1. Student visits `/formation`
2. Enters their email address
3. The app queries the `transactions` table: `SELECT * FROM transactions WHERE customer_email = ? AND status = 'completed'`
4. **If found** → reveals the video grid (up to 6 videos, embedded iframes — YouTube unlisted or Google Drive links)
5. **If not found** → shows an error message asking them to check their email or contact support

The video links will be hardcoded initially as placeholder text (e.g. `https://youtu.be/VOTRE_LIEN`) — Manuella replaces these with her real links once ready.

No login system required — email-based access check is simple and sufficient for this use case.

---

## Technical Details

### Files to create / modify

| File | Action |
|---|---|
| `src/pages/Index.tsx` | Full rebuild — new dark sales page |
| `src/pages/Payment.tsx` | Visual update only — dark theme |
| `src/pages/Confirmation.tsx` | Visual update — dark theme, change WhatsApp → formation link |
| `src/pages/Formation.tsx` | New page — email-gated video library |
| `src/lib/offers.ts` | Update to single formation offer with correct price & features |
| `src/index.css` | Update CSS variables to dark/gold/purple palette |
| `src/App.tsx` | Add `/formation` route |

### Database — No schema changes needed

The existing `transactions` table already has `customer_email` and `status` columns. The student area simply reads from it using the anon key (SELECT is already allowed by the existing RLS policy).

### Videos placeholder structure

```typescript
const videos = [
  { id: 1, title: "Module 1 — Introduction à l'IA", url: "https://youtu.be/PLACEHOLDER" },
  { id: 2, title: "Module 2 — Créer votre avatar", url: "https://youtu.be/PLACEHOLDER" },
  // ... up to 6
]
```

Manuella updates these URLs directly in the code (or we can add a simple admin panel later).

---

## What Manuella needs to provide later

- Real video links (YouTube unlisted or Google Drive)
- Real testimonials (names + quotes)
- Real price for the formation
- WhatsApp group link (if she wants one)
- Her email address for the support contact

---

## Implementation Order

1. Update `src/index.css` — new dark color palette
2. Update `src/lib/offers.ts` — single formation offer
3. Rebuild `src/pages/Index.tsx` — full sales page with all sections
4. Update `src/pages/Payment.tsx` — dark theme
5. Update `src/pages/Confirmation.tsx` — dark theme + link to `/formation`
6. Create `src/pages/Formation.tsx` — email-gated video area
7. Update `src/App.tsx` — add new route
