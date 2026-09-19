const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, '../.env.local');
const env = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const envVars = {};
for (const line of env.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const [k, ...v] = trimmed.split('=');
  envVars[k.trim()] = v.join('=').trim();
}

const { createClient } = require('@supabase/supabase-js');

// Read packages from lib/data/packages.ts
const packagesTs = fs.readFileSync(path.join(__dirname, '../lib/data/packages.ts'), 'utf8');
const jsonMatch = packagesTs.match(/export const initialPackages: Package\[\] = (\[[\s\S]*?\]);/);
if (!jsonMatch) {
  console.error('Could not extract packages JSON from packages.ts');
  process.exit(1);
}
const packages = JSON.parse(jsonMatch[1]);

async function seed() {
  const url = envVars.NEXT_PUBLIC_SUPABASE_URL;
  const key = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error('Missing Supabase credentials in .env.local');
    return;
  }
  const client = createClient(url, key);

  console.log(`Upserting ${packages.length} packages to Supabase...`);

  for (const pkg of packages) {
    const payload = {
      name: pkg.name,
      slug: pkg.slug,
      short_description: pkg.short_description,
      description: pkg.description,
      price: pkg.price,
      duration: pkg.duration,
      featured: pkg.featured,
      active: pkg.active,
      main_image: pkg.main_image,
      gallery: pkg.gallery || [],
      pickup_info: pkg.pickup_info,
      cancellation_policy: pkg.cancellation_policy,
      seo_title: pkg.seo_title,
      seo_description: pkg.seo_description,
    };

    const { data: existing } = await client
      .from('packages')
      .select('id')
      .eq('slug', pkg.slug)
      .maybeSingle();

    if (existing) {
      const { error: updateErr } = await client
        .from('packages')
        .update(payload)
        .eq('id', existing.id);
      if (updateErr) {
        console.error(`Error updating ${pkg.slug}:`, updateErr.message);
      } else {
        console.log(`Updated: ${pkg.slug}`);
      }
    } else {
      const { error: insertErr } = await client
        .from('packages')
        .insert(payload);
      if (insertErr) {
        console.error(`Error inserting ${pkg.slug}:`, insertErr.message);
      } else {
        console.log(`Inserted: ${pkg.slug}`);
      }
    }
  }

  console.log('Finished syncing packages to Supabase.');
}

seed();
