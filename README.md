# Katerina Voronina Portfolio

A modern, high-performance portfolio website built with Next.js 15, featuring stunning animations, optimized images, and Supabase integration.

## ✨ Features

- **Next.js 15 App Router**: Latest React Server Components and streaming
- **Supabase Integration**: Database and image storage ready
- **Optimized Images**: Automatic AVIF/WebP conversion, lazy loading
- **Framer Motion**: Smooth, premium animations
- **Tailwind CSS**: Custom design system with aurora gradients
- **TypeScript**: Full type safety
- **SEO Optimized**: Dynamic metadata and Open Graph tags
- **Responsive Design**: Mobile-first, works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (optional, for database features)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your Supabase credentials (optional)
# NEXT_PUBLIC_SUPABASE_URL=your-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
katerina-voronina-portfolio/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── projects/            # Projects pages
│   ├── about/               # About page
│   └── contact/             # Contact page
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components
│   └── projects/            # Project-specific components
├── lib/
│   ├── supabase/            # Supabase clients
│   ├── types/               # TypeScript types
│   └── data/                # Static data
├── public/                  # Static assets
└── supabase-schema.sql      # Database schema
```

## 🎨 Design System

### Colors

- **Void**: `#050505` - Deep black background
- **Amethyst Dark**: `#6b46c1` - Purple accent
- **Midnight**: `#1e1b4b` - Deep blue
- **Platinum**: `#e5e5e5` - Light text

### Typography

- **Serif**: Playfair Display (headings)
- **Sans**: Inter (body text)

### Animations

- **Blob Animation**: Organic gradient movement
- **Spring Transitions**: Natural, physics-based motion
- **Parallax Effects**: Depth on scroll

## 🗄️ Supabase Setup (Optional)

The site works with static data out of the box. To enable Supabase:

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase-schema.sql`
3. Create a storage bucket named `portfolio-images`
4. Add credentials to `.env.local`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📦 Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm run start

# Type check
npm run type-check

# Lint
npm run lint
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide.

### Other Platforms

The site can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Cloudflare Pages
- Self-hosted with Docker

## 🎯 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Image Optimization**: AVIF with WebP fallback
- **Static Generation**: Pre-rendered pages
- **Lazy Loading**: Images load on demand
- **Code Splitting**: Automatic route-based splitting

## 📝 Content Management

### Static Data (Current)

Projects are defined in `lib/data/projects.ts`. To add a project:

```typescript
{
  id: 'unique-id',
  slug: 'project-slug',
  title: 'Project Title',
  year: '2024',
  category: 'interface', // or 'drawing'
  imageUrl: 'https://...',
  description: 'Project description',
  featured: true,
  width: 1600,
  height: 1200,
}
```

### Supabase (Optional)

See [MIGRATION.md](./MIGRATION.md) to migrate to Supabase database.

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (optional)
- **Storage**: Supabase Storage (optional)
- **Deployment**: Vercel

## 📄 License

© 2024 Katerina Voronina. All rights reserved.

## 🤝 Support

For questions or issues:

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Check [MIGRATION.md](./MIGRATION.md) for data migration
- Review [Next.js docs](https://nextjs.org/docs)
- Review [Supabase docs](https://supabase.com/docs)

---

**Built with ❤️ using Next.js 15 and Supabase**
