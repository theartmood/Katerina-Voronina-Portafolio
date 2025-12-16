import { createClient } from '@supabase/supabase-js';
import { PROJECTS } from '../lib/data/projects';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Supabase credentials not found in environment variables');
    console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateProjects() {
    console.log('🚀 Starting migration...\n');

    let successCount = 0;
    let errorCount = 0;

    for (const project of PROJECTS) {
        try {
            console.log(`📝 Migrating: ${project.title}`);

            // Insert project
            const { data: insertedProject, error: projectError } = await supabase
                .from('projects')
                .insert({
                    slug: project.slug,
                    title: project.title,
                    description: project.description,
                    category: project.category,
                    year: parseInt(project.year),
                    featured: project.featured || false,
                    order_index: PROJECTS.indexOf(project)
                })
                .select()
                .single();

            if (projectError) {
                throw projectError;
            }

            console.log(`   ✓ Project created with ID: ${insertedProject.id}`);

            // Insert image record (using existing Unsplash URL)
            const { error: imageError } = await supabase
                .from('project_images')
                .insert({
                    project_id: insertedProject.id,
                    storage_path: `external/${project.slug}`, // Mark as external
                    public_url: project.imageUrl,
                    alt_text: project.title,
                    width: project.width,
                    height: project.height,
                    is_cover: true,
                    order_index: 0
                });

            if (imageError) {
                throw imageError;
            }

            console.log(`   ✓ Image record created`);
            console.log(`   ✓ ${project.title} migrated successfully\n`);
            successCount++;

        } catch (error) {
            console.error(`   ❌ Error migrating ${project.title}:`, error);
            errorCount++;
        }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`   ✓ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${errorCount}`);
    console.log(`   📁 Total: ${PROJECTS.length}`);

    if (successCount === PROJECTS.length) {
        console.log('\n🎉 Migration completed successfully!');
        console.log('\n💡 Next steps:');
        console.log('   1. Visit http://localhost:3000/admin to manage projects');
        console.log('   2. Upload your own images to replace Unsplash placeholders');
        console.log('   3. Update project descriptions and details');
    } else {
        console.log('\n⚠️  Migration completed with errors. Please check the logs above.');
    }
}

// Run migration
migrateProjects()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    });
