create extension if not exists pgcrypto;

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text,
  location text,
  description text,
  rate numeric(10,2) not null default 0,
  cleaning_fee numeric(10,2) not null default 0,
  bedrooms integer default 1,
  bathrooms integer default 1,
  guests integer default 1,
  rating numeric(3,2) default 0,
  status text default 'Available',
  image text,
  amenities text[] default '{}',
  created_at timestamptz default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  property_slug text not null,
  guest_name text,
  guest_email text,
  guest_phone text,
  check_in date,
  check_out date,
  guests integer default 1,
  notes text,
  total_amount numeric(10,2) default 0,
  status text default 'pending_payment',
  created_at timestamptz default now()
);

create table if not exists owner_profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  property_slug text,
  created_at timestamptz default now()
);


-- Recommended setup for access roles:
-- 1. Create users in Supabase Authentication.
-- 2. Set user_metadata.role to 'admin' or 'owner'.
-- Example with SQL after signup (run in SQL editor with service role tools if applicable):
-- update auth.users
-- set raw_user_meta_data = jsonb_build_object('role', 'admin')
-- where email = 'admin@yourdomain.com';
--
-- update auth.users
-- set raw_user_meta_data = jsonb_build_object('role', 'owner')
-- where email = 'owner@yourdomain.com';

-- Optional profile table for app-level role mapping
create table if not exists app_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role text check (role in ('master_admin','listing_manager','sales_manager','owner')),
  created_at timestamptz default now()
);
\n
create table if not exists rental_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text,
  phone text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists sales_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text,
  phone text,
  message text,
  stage text default 'New Buyer',
  property_interest text,
  budget text,
  created_at timestamptz default now()
);

create table if not exists owner_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text,
  phone text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists owner_payouts (
  id uuid primary key default gen_random_uuid(),
  owner_name text,
  statement_month text,
  gross_bookings numeric(10,2) default 0,
  owner_payout numeric(10,2) default 0,
  created_at timestamptz default now()
);
