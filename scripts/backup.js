const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load .env.local
const envPath = path.join(__dirname, '../.env.local');
const env = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const envVars = { ...process.env };
for (const line of env.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const [k, ...v] = trimmed.split('=');
  envVars[k.trim()] = v.join('=').trim();
}

const url = envVars.NEXT_PUBLIC_SUPABASE_URL;
// Prefer the service role key (bypasses RLS) if one is configured
const key = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const client = createClient(url, key, { auth: { persistSession: false } });

const TABLES = [
  'reviews',
  'bookings',
  'packages',
  'package_inclusions',
  'package_exclusions',
  'package_itinerary',
  'activities',
  'pickup_locations',
  'faqs',
  'gallery',
  'site_settings',
  'blogs',
  'blog_posts',
  'comments',
];

const PAGE_SIZE = 1000;
const KEEP_COUNT = 3;

async function fetchAll(table) {
  const rows = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await client
      .from(table)
      .select('*')
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    rows.push(...data);
    if (data.length < PAGE_SIZE) return rows;
  }
}

async function backup() {
  const startedAt = new Date();
  const result = {
    createdAt: startedAt.toISOString(),
    source: url,
    keyType: envVars.SUPABASE_SERVICE_ROLE_KEY ? 'service_role' : 'anon',
    tables: {},
    errors: {},
  };

  console.log(`Backing up ${url} ...\n`);
  for (const table of TABLES) {
    try {
      const rows = await fetchAll(table);
      result.tables[table] = rows;
      console.log(`  ${table.padEnd(20)} ${rows.length} rows`);
    } catch (err) {
      result.errors[table] = err.message;
      console.log(`  ${table.padEnd(20)} skipped (${err.message})`);
    }
  }

  const outDir = path.join(__dirname, '../backups');
  fs.mkdirSync(outDir, { recursive: true });
  const stamp = startedAt.toISOString().replace(/[:.]/g, '-').replace('Z', '');
  const json = JSON.stringify(result, null, 2);
  const outFile = path.join(outDir, `backup-${stamp}.json`);
  fs.writeFileSync(outFile, json);
  fs.writeFileSync(path.join(outDir, 'latest.json'), json);

  console.log(`\nSaved ${path.relative(process.cwd(), outFile)} (also backups/latest.json)`);

  // Keep only the newest KEEP_COUNT timestamped backups (names sort chronologically)
  const old = fs
    .readdirSync(outDir)
    .filter((f) => /^backup-.*\.json$/.test(f))
    .sort()
    .slice(0, -KEEP_COUNT);
  for (const f of old) {
    fs.unlinkSync(path.join(outDir, f));
    console.log(`Removed old backup ${f}`);
  }
}

backup().catch((err) => {
  console.error('Backup failed:', err);
  process.exit(1);
});
