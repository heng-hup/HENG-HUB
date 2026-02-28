create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  created_at timestamptz default now()
);

create table if not exists products (
  id serial primary key,
  name text,
  description text,
  price numeric(12,2),
  currency text default 'THB',
  created_at timestamptz default now()
);

create table if not exists orders (
  id serial primary key,
  user_id uuid references users(id),
  product_id int references products(id),
  amount numeric(12,2),
  currency text,
  status text,
  created_at timestamptz default now()
);

create table if not exists feed (
  id serial primary key,
  user_id uuid,
  message text,
  created_at timestamptz default now()
);