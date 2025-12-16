# Data Migration Guide

This guide explains how to migrate your existing project data to Supabase.

## Option 1: Manual Entry (Recommended for Small Datasets)

Use the Supabase dashboard to manually insert projects:

1. Go to **Table Editor** in Supabase
2. Select `projects` table
3. Click **Insert row**
4. Fill in project details
5. Repeat for all projects

## Option 2: SQL Insert Script

Create a SQL script to insert all projects at once:

```sql
-- Insert Interface Projects
INSERT INTO projects (slug, title, description, category, year, featured, order_index)
VALUES
  ('chronos-banking', 'Chronos Banking', 'A fintech experience focused on wealth visualization through fluid data interpretation.', 'interface', 2024, true, 1),
  ('aura-health', 'Aura Health', 'Biometric monitoring dashboard designed for calmness and clarity in high-stress environments.', 'interface', 2023, true, 2),
  ('velvet-ecomm', 'Velvet E-Comm', 'Luxury fashion marketplace prioritizing imagery and whitespace over navigational complexity.', 'interface', 2023, false, 3);

-- Insert Drawing Projects
INSERT INTO projects (slug, title, category, year, featured, order_index)
VALUES
  ('ephemeral-silence', 'Ephemeral Silence', 'drawing', 2023, false, 4),
  ('void-structure', 'Void Structure', 'drawing', 2022, false, 5),
  ('organic-decay', 'Organic Decay', 'drawing', 2024, false, 6),
  ('lumina', 'Lumina', 'drawing', 2023, false, 7);
```

Run this in the Supabase SQL Editor.

## Option 3: Programmatic Migration

Create a migration script to upload data programmatically:

```typescript
// scripts/migrate-data.ts
import { createClient } from '@supabase/supabase-js';
import { PROJECTS } from '../lib/data/projects';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for admin access
);

async function migrateProjects() {
  for (const project of PROJECTS) {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        slug: project.slug,
        title: project.title,
        description: project.description,
        category: project.category,
        year: parseInt(project.year),
        featured: project.featured || false,
      });

    if (error) {
      console.error(`Error inserting ${project.title}:`, error);
    } else {
      console.log(`✓ Inserted ${project.title}`);
    }
  }
}

migrateProjects();
```

Run with:
```bash
npx tsx scripts/migrate-data.ts
```

## Migrating Images

### From Unsplash to Supabase Storage

1. Download images from Unsplash
2. Upload to Supabase Storage bucket `portfolio-images`
3. Update project records with new URLs

### Using the Upload Helper

```typescript
import { uploadImage } from '@/lib/supabase/storage';

const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
const { publicUrl, storagePath } = await uploadImage(file, 'project-slug');

// Then insert into project_images table
await supabase.from('project_images').insert({
  project_id: projectId,
  storage_path: storagePath,
  public_url: publicUrl,
  alt_text: 'Project image',
  width: 1600,
  height: 1200,
  is_cover: true,
  order_index: 0,
});
```

## Fallback Strategy

The current implementation uses static data from `lib/data/projects.ts` as a fallback. You can:

1. **Keep using static data**: No migration needed, works out of the box
2. **Hybrid approach**: Use Supabase for new projects, static data for existing
3. **Full migration**: Move everything to Supabase

## Switching Between Static and Supabase

To switch from static data to Supabase, update your data fetching functions:

```typescript
// lib/data/projects.ts

export async function getAllProjects(): Promise<Project[]> {
  // Option 1: Use static data (current)
  return PROJECTS;

  // Option 2: Fetch from Supabase
  const supabase = createClient();
  const { data } = await supabase.from('projects').select('*').order('order_index');
  return data || [];
}
```

## Verification

After migration, verify:

1. ✅ All projects appear in Supabase dashboard
2. ✅ Images load correctly
3. ✅ Project detail pages work
4. ✅ Featured projects display on homepage
