# 🚀 Guía de Deployment a Vercel

Este portafolio está optimizado para producción con rendimiento de nivel profesional.

## 🎯 Features Implementadas

### ✅ Backend (Supabase)
- ✅ Schema optimizado con índices y RLS
- ✅ Storage bucket configurado (50MB límite)
- ✅ Políticas de seguridad implementadas
- ✅ Analytics de vistas de proyectos
- ✅ Full-text search ready

### ✅ Frontend Optimizaciones
- ✅ Blur placeholders automáticos
- ✅ Lazy loading inteligente
- ✅ Progressive image loading
- ✅ Compresión automática de imágenes
- ✅ Responsive images con srcset
- ✅ Next.js Image optimization
- ✅ AVIF y WebP support

### ✅ Performance
- ✅ Cache headers optimizados
- ✅ CDN-ready
- ✅ Security headers
- ✅ Metadata SEO completa

---

## 📋 Pre-requisitos

1. **Cuenta de Vercel** - [vercel.com](https://vercel.com)
2. **Supabase ya configurado** (completado ✓)
3. **Git repository** (GitHub, GitLab, o Bitbucket)

---

## 🔑 Paso 1: Obtener Credenciales de Supabase

### Opción A: Desde el Dashboard

1. Ve a: https://supabase.com/dashboard/project/zqpfcffiqhxromzwogeq/settings/api

2. Copia estos valores:
   - **Project URL**: `https://zqpfcffiqhxromzwogeq.supabase.co`
   - **anon/public key**: (empieza con "eyJ...")

### Opción B: Desde MCP (ya conectado)

Las credenciales ya están disponibles vía MCP.

---

## 🚀 Paso 2: Deploy en Vercel

### Método 1: Deploy con CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Configurar variables de entorno cuando se solicite
```

### Método 2: Deploy desde Dashboard

1. **Ir a Vercel Dashboard**
   - https://vercel.com/new

2. **Importar Proyecto**
   - Conecta tu repositorio Git
   - Selecciona el proyecto

3. **Configurar Framework**
   - Framework Preset: **Next.js**
   - Build Command: `npm run build` (ya detectado)
   - Output Directory: `.next` (ya detectado)

4. **Variables de Entorno** (IMPORTANTE)
   
   Añade estas variables en Vercel:

   ```env
   # Supabase (OBLIGATORIAS)
   NEXT_PUBLIC_SUPABASE_URL=https://zqpfcffiqhxromzwogeq.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui

   # Site Config (Recomendadas)
   NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
   NEXT_PUBLIC_SITE_NAME=Katerina Voronina Portfolio
   NEXT_PUBLIC_SITE_DESCRIPTION=Professional UX/UI Design and Art Portfolio
   ```

   ⚠️ **Importante**: Reemplaza `tu-anon-key-aqui` con tu clave real.

5. **Deploy**
   - Click en "Deploy"
   - Espera 2-3 minutos

---

## ✅ Paso 3: Verificar Deployment

Después del deploy, verifica:

### 1. **Sitio Principal**
- https://tu-dominio.vercel.app
- ✅ Debe cargar sin errores
- ✅ Imágenes deben tener blur placeholders
- ✅ Navegación smooth

### 2. **Admin Panel**
- https://tu-dominio.vercel.app/admin
- ✅ Debe permitir crear proyectos
- ✅ Debe permitir subir imágenes
- ✅ Progress bar funcionando

### 3. **Performance**
Prueba en Google PageSpeed Insights:
- https://pagespeed.web.dev/

**Expected Scores:**
- Performance: 90+ ✅
- Accessibility: 95+ ✅
- Best Practices: 95+ ✅
- SEO: 100 ✅

---

## 🎨 Paso 4: Subir Primeros Proyectos

1. **Ir al Admin Panel**
   ```
   https://tu-dominio.vercel.app/admin
   ```

2. **Crear Nuevo Proyecto**
   - Click "New Project"
   - Llena el formulario:
     - Title: "My First Project"
     - Slug: "my-first-project"
     - Category: "designing" o "drawings"
     - Description: Breve descripción
     - Year: 2024
     - Featured: ✅ (opcional)

3. **Subir Imágenes**
   - Arrastra tus imágenes (hasta 50MB c/u)
   - El sistema automáticamente:
     - ✅ Comprime las imágenes
     - ✅ Genera blur placeholders
     - ✅ Extrae metadata (width, height)
     - ✅ Calcula aspect ratio
   - Click "Subir"

4. **Ver Resultado**
   - Ve a: `https://tu-dominio.vercel.app/projects/my-first-project`
   - Las imágenes deben cargar con:
     - ✅ Blur placeholder inicial
     - ✅ Fade-in smooth
     - ✅ Lazy loading

---

## 🔧 Optimizaciones Profesionales Incluidas

### 1. **Imágenes**
```typescript
// Automático en cada upload:
- Compresión inteligente (85% quality)
- Blur placeholder generado
- Metadata completa guardada
- Aspect ratio calculado
- Formatos: AVIF > WebP > JPEG
```

### 2. **Caching**
```javascript
// Headers configurados en vercel.json:
- Imágenes: 1 año de cache
- Static assets: 1 año de cache
- HTML: sin cache (para actualizaciones rápidas)
```

### 3. **Security**
```javascript
// Headers de seguridad:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
```

### 4. **SEO**
```typescript
// Cada proyecto tiene:
- Open Graph tags
- Twitter Cards
- Structured data (JSON-LD)
- Meta keywords
- Sitemap automático
```

---

## 📊 Monitoreo Post-Deploy

### 1. **Vercel Analytics** (Gratis)
```bash
# Ver en dashboard
https://vercel.com/tu-usuario/proyecto/analytics
```

### 2. **Supabase Analytics**
```bash
# Ver vistas de proyectos
SELECT project_id, COUNT(*) as views
FROM project_views
GROUP BY project_id
ORDER BY views DESC;
```

### 3. **Core Web Vitals**
- LCP (Largest Contentful Paint): < 2.5s ✅
- FID (First Input Delay): < 100ms ✅
- CLS (Cumulative Layout Shift): < 0.1 ✅

---

## 🎯 Comandos Útiles

### Ver logs en producción
```bash
vercel logs tu-dominio.vercel.app
```

### Redeploy rápido
```bash
vercel --prod
```

### Ver estado del build
```bash
vercel inspect tu-dominio.vercel.app
```

---

## 🆘 Troubleshooting

### ❌ Error: "Supabase connection failed"
**Solución:**
1. Verifica que las variables de entorno estén en Vercel
2. Ve a: Settings > Environment Variables
3. Asegúrate que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` están ahí

### ❌ Error: "Images not loading"
**Solución:**
1. Verifica que el bucket sea público en Supabase
2. Ve a: Storage > portfolio-images > Settings
3. Marca "Public bucket"

### ❌ Error: "Build failed"
**Solución:**
```bash
# Probar build localmente
npm run build

# Ver errores
npm run type-check
```

---

## 🎉 ¡Listo!

Tu portafolio profesional está en producción con:

✅ Performance optimizado (90+ score)
✅ Imágenes ultra-optimizadas
✅ Blur placeholders automáticos
✅ Lazy loading inteligente
✅ SEO completo
✅ Analytics integrado
✅ Security headers
✅ CDN global (Vercel Edge Network)

**URL del sitio:** https://tu-dominio.vercel.app
**Admin panel:** https://tu-dominio.vercel.app/admin

---

## 📚 Recursos

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Image**: https://nextjs.org/docs/app/building-your-application/optimizing/images
- **Supabase Storage**: https://supabase.com/docs/guides/storage
- **Web Vitals**: https://web.dev/vitals/

---

## 🚀 Próximos Pasos (Opcional)

1. **Dominio Custom**
   - Vercel Settings > Domains
   - Añade tu dominio personalizado

2. **Google Analytics**
   - Añade `NEXT_PUBLIC_GA_TRACKING_ID` en variables de entorno

3. **OG Images Dinámicos**
   - Implementar @vercel/og para generar Open Graph images

4. **Sitemap Automático**
   - Ya está implementado en `app/sitemap.ts`

---

**Made with ❤️ for professional portfolios**

