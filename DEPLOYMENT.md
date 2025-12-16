# Deployment Guide - Vercel

This guide will walk you through deploying the Katerina Voronina Portfolio to Vercel.

## Prerequisites

1. **Supabase Project**: Create a project at [supabase.com](https://supabase.com)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

## Step 1: Configure Supabase

### 1.1 Create Database Tables

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql`
4. Click **Run** to execute the SQL

### 1.2 Create Storage Bucket

1. Navigate to **Storage** in Supabase dashboard
2. Click **New bucket**
3. Name it `portfolio-images`
4. Make it **Public**
5. Go to **Policies** tab and add:
   - Policy name: `Public read access`
   - Allowed operation: `SELECT`
   - Policy definition: `true`

### 1.3 Get API Credentials

1. Navigate to **Settings** → **API**
2. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key**

## Step 2: Deploy to Vercel

### 2.1 Import Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Vercel will auto-detect Next.js

### 2.2 Configure Environment Variables

In the **Environment Variables** section, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2.3 Deploy

1. Click **Deploy**
2. Wait for build to complete (~2-3 minutes)
3. Your site will be live at `https://your-project.vercel.app`

## Step 3: Configure Custom Domain (Optional)

1. Go to your project in Vercel
2. Navigate to **Settings** → **Domains**
3. Add your custom domain (e.g., `katerinavoronina.com`)
4. Follow DNS configuration instructions

## Step 4: Migrate Existing Data (Optional)

If you want to migrate the static project data to Supabase:

1. Use the Supabase dashboard to insert projects manually, or
2. Create a migration script (see `MIGRATION.md`)

## Performance Optimizations

Vercel automatically provides:

- ✅ **Edge Network**: Global CDN
- ✅ **Image Optimization**: Automatic AVIF/WebP conversion
- ✅ **Static Generation**: Pre-rendered pages
- ✅ **Incremental Static Regeneration**: On-demand updates

## Monitoring

1. **Analytics**: Enable Vercel Analytics in project settings
2. **Speed Insights**: Enable Web Vitals tracking
3. **Logs**: View deployment and function logs in dashboard

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `package.json` has correct dependencies

### Images Not Loading

- Verify Supabase bucket is public
- Check `next.config.ts` has correct `remotePatterns`
- Ensure environment variables are set correctly

### 404 on Dynamic Routes

- Verify `generateStaticParams` is implemented
- Check project slugs match URL structure
- Rebuild and redeploy

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
