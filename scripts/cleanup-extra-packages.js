const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load .env.local
const envPath = path.join(__dirname, '../.env.local');
const env = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const envVars = {};
for (const line of env.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const [k, ...v] = trimmed.split('=');
  envVars[k.trim()] = v.join('=').trim();
}

const url = envVars.NEXT_PUBLIC_SUPABASE_URL;
const key = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const client = createClient(url, key);

// Read the real 18 packages from lib/data/packages.ts
const packagesTs = fs.readFileSync(path.join(__dirname, '../lib/data/packages.ts'), 'utf8');
const jsonMatch = packagesTs.match(/export const initialPackages: Package\[\] = (\[[\s\S]*?\]);/);
if (!jsonMatch) {
  console.error('Could not extract packages JSON from packages.ts');
  process.exit(1);
}

const realPackages = JSON.parse(jsonMatch[1]);
const realSlugs = new Set(realPackages.map(p => p.slug));

console.log(`Found ${realPackages.length} real packages in initialPackages:`);
realPackages.forEach((p, i) => console.log(` ${i + 1}. ${p.name} (${p.slug})`));

async function cleanup() {
  // Fetch all packages currently in database
  const { data: dbPackages, error } = await client
    .from('packages')
    .select('id, name, slug');

  if (error) {
    console.error('Error fetching database packages:', error);
    return;
  }

  console.log(`\nTotal packages currently in database: ${dbPackages.length}`);

  const toDelete = dbPackages.filter(p => !realSlugs.has(p.slug));

  if (toDelete.length === 0) {
    console.log('No extra packages found! Database already contains only the real 18 packages.');
    return;
  }

  console.log(`\nFound ${toDelete.length} extra packages to delete:`);
  toDelete.forEach((p, i) => console.log(` [DELETE] ${i + 1}. ${p.name} (id: ${p.id}, slug: ${p.slug})`));

  for (const pkg of toDelete) {
    // Delete child relations if any exist
    await client.from('package_inclusions').delete().eq('package_id', pkg.id);
    await client.from('package_exclusions').delete().eq('package_id', pkg.id);
    await client.from('package_itinerary').delete().eq('package_id', pkg.id);

    const { error: delErr } = await client
      .from('packages')
      .delete()
      .eq('id', pkg.id);

    if (delErr) {
      console.error(`Failed to delete package ${pkg.name} (${pkg.id}):`, delErr);
    } else {
      console.log(` Successfully deleted: ${pkg.name} (${pkg.slug})`);
    }
  }

  // Verify remaining count
  const { data: remaining } = await client
    .from('packages')
    .select('id, name, slug');

  console.log(`\nVerification: Database now has exactly ${remaining ? remaining.length : 0} packages:`);
  if (remaining) {
    remaining.forEach((p, i) => console.log(` ${i + 1}. ${p.name} (${p.slug})`));
  }
}

cleanup();
