-- Placeholder migration for meeting-to-action tables.
-- Wire to your migration tool later (e.g., node-pg-migrate, knex, prisma).

create extension if not exists pgcrypto;

create table if not exists meetings (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'initialized',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references meetings(id) on delete cascade,
  title text not null,
  status text not null default 'pending',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists actions (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references meetings(id) on delete cascade,
  task_id uuid not null references tasks(id) on delete cascade,
  type text not null,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

