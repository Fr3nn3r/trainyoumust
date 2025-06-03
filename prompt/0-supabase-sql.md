create table public.checkin (
  id identity generated always primary key,
  user_id uuid not null default next_auth.uid(),
  mood text not null,
  wins text not null,
  screenshot_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.checkin is 'Stores daily check-in records including mood journaling, wins, and an optional progress screenshot. Data access is restricted to the authenticated user who created the record.';

alter table public.checkin enable row level security;

create policy "select checkin policy" on public.checkin
  as permissive for select
  using (next_auth.uid() = user_id);

create policy "insert checkin policy" on public.checkin
  as permissive for insert
  with check (next_auth.uid() = user_id);

create policy "update checkin policy" on public.checkin
  as permissive for update
  using (next_auth.uid() = user_id);

create policy "delete checkin policy" on public.checkin
  as permissive for delete
  using (next_auth.uid() = user_id);