# Playa Escondida Vacation Homes — Branded Full Scaffold

This package includes your uploaded logo already integrated across the platform.

## Included
- Header logo
- Homepage hero logo
- Footer logo
- For Sale page and nav tab
- Booking page logo
- Admin dashboard logo
- Owner portal logo
- Favicon
- Invoice / owner statement preview
- Branded email templates
- Booking form with state
- Booking draft creation service
- Stripe checkout scaffold
- Supabase client scaffold
- Supabase SQL schema
- Auth context for admin login

## Run locally on Mac
```bash
npm install
npm run dev
```

Then open:
```bash
http://localhost:5173
```

## Configure environment
1. Copy `.env.example` to `.env`
2. Add:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
   - VITE_STRIPE_PUBLISHABLE_KEY

## What still needs real credentials or backend
- Supabase live database connection
- Supabase Auth for real users
- Stripe Checkout Session backend
- Airbnb / Booking.com / Expedia sync through a PMS or channel manager

## Recommended next production steps
1. create your Supabase project
2. run `supabase/schema.sql`
3. add your real listings
4. connect Stripe
5. wire email templates to your mail provider
6. connect PMS / channel manager for OTA sync

## Site structure update
- Vacation Rentals
- For Sale
- Owner Services

## Fun marketing update
- Saul marketing image integrated into homepage
- For Sale page updated with more personality-driven sales presentation
- Better Call Saul style branding added in a light, playful way


## New upgrades in this package
- floating Saul mascot section on homepage
- dedicated Lead Center page
- separate lead forms for rentals, buyers, and owners
- booking calendar page scaffold
- CRM pipeline cards inside admin dashboard


## Bilingual upgrade
- English / Spanish language switcher in header
- Translated navigation and key page content
- Spanish and English booking / lead / owner service flows


## Private tabs update
- Admin tab is hidden unless logged in as admin
- Owner Services tab is hidden unless logged in as owner or admin
- Admin and Owner pages are now protected routes
- Public visitors only see customer-facing pages


## Supabase authentication upgrade
- Admin and Owner access now use Supabase Auth
- Demo role selector removed
- Private tabs appear only after a successful Supabase login
- Protected routes wait for auth session before rendering
- Recommended: set `user_metadata.role` to `admin` or `owner` in Supabase Auth


## How to configure Supabase Auth
1. Create a Supabase project
2. Copy `.env.example` to `.env`
3. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. In Supabase Authentication, create your users
5. Set each user's role in `user_metadata`:
   - `admin`
   - `owner`
6. Deploy the site again

Example users:
- `admin@yourdomain.com` → admin
- `owner@yourdomain.com` → owner


## Role upgrade and export support
- Added roles:
  - `master_admin`
  - `listing_manager`
  - `sales_manager`
  - `owner`
- Admin and owner areas remain hidden until login
- Public homepage no longer shows internal performance stats
- Export buttons added for reservations, sales, and owner-style report data
- Suggested role mapping lives in Supabase `user_metadata.role`


## Recommended Supabase users
- `masteradmin@yourdomain.com` → `master_admin`
- `listings@yourdomain.com` → `listing_manager`
- `sales@yourdomain.com` → `sales_manager`
- `owner@yourdomain.com` → `owner`
\n
## Live Supabase data upgrade
- Admin dashboard now reads reservations from `bookings`
- Sales manager can read/export `sales_leads`
- Owner-style reports can read/export `owner_payouts`
- Lead Center can save directly into:
  - `rental_leads`
  - `sales_leads`
  - `owner_leads`
- Safe fallback data remains in place when tables are empty


## Vercel routing fix
This package includes `vercel.json` with an SPA rewrite so routes like:
- `/for-sale`
- `/owner-services`
- `/leads`
- `/booking-calendar`

work correctly on Vercel instead of returning `404 NOT_FOUND`.
