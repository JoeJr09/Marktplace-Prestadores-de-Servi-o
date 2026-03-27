SET search_path TO acode_aqui;

INSERT INTO users (
  id,
  email,
  email_normalized,
  username,
  username_normalized,
  full_name,
  phone,
  company_name,
  password_hash,
  role,
  status,
  is_seeded
) VALUES
  (
    '11111111-1111-4111-8111-111111111111',
    'username@guest.com',
    'username@guest.com',
    'guest.local',
    'guest.local',
    'Guest Operator',
    '+55 (61) 99999-0001',
    NULL,
    'c3a31cde66041a2f7e499f0150b35749:ac50687e858e87e135c253c36feb8637209acfff6874533e1b2270887e7e6fdcf4bf08462d3ad5825dd8302bf94d52b12f081517f97b7ac89ef5749c7a5c7378',
    'guest',
    'active',
    true
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'dev.user@acode.local',
    'dev.user@acode.local',
    'dev.user',
    'dev.user',
    'Developer User',
    '+55 (61) 99999-0002',
    NULL,
    'bcd18233efe2577a084318cb5d9b8c50:66229c38dac49ca2c0f63ae648ef489cf86ccc888ffa7e05627efe0faad275d1e1e7a29304d4a2700373637cd55d28eb7364aed9eaccafc74df4fa79a4c64800',
    'customer',
    'active',
    true
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'admin@acode.local',
    'admin@acode.local',
    'admin.local',
    'admin.local',
    'Platform Admin',
    '+55 (61) 99999-0003',
    'Acode Aqui Admin',
    '0d6e1b2951cdc434f19e9e179fea3465:c0c8dc8f1f085e2e738098995614b66671de8f9899223870ba9dcbe9f2245f1b4d565b5de21a67cbceea0b4bf87cc754887118dc73fe54cac8efd77c021c4ea8',
    'admin',
    'active',
    true
  )
ON CONFLICT (email_normalized) DO UPDATE SET
  username = EXCLUDED.username,
  username_normalized = EXCLUDED.username_normalized,
  full_name = EXCLUDED.full_name,
  phone = EXCLUDED.phone,
  company_name = EXCLUDED.company_name,
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  status = EXCLUDED.status,
  is_seeded = EXCLUDED.is_seeded;
