# ⚡ INICIO RÁPIDO - 3 PASOS

## 🎯 Tu portafolio está 100% listo. Solo necesitas:

---

## PASO 1: Configurar Variables de Entorno (2 minutos)

Crea el archivo `.env.local` en la raíz del proyecto:

```bash
cp env.example .env.local
```

Luego **edita** `.env.local` y pega esto:

```env
# Supabase (YA CONECTADO)
NEXT_PUBLIC_SUPABASE_URL=https://zqpfcffiqhxromzwogeq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxcGZjZmZpcWh4cm9tendvZ2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NjI1NDMsImV4cCI6MjA4MTMzODU0M30.RCd8pGoaDrCTL6rYUzfxcDOXTbnv1_joRCNOrfaPrks

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Katerina Voronina Portfolio
NEXT_PUBLIC_SITE_DESCRIPTION=UX/UI Design & Art Portfolio
```

✅ **Listo!** Las credenciales reales ya están configuradas.

---

## PASO 2: Iniciar el Servidor (1 minuto)

```bash
# Si no has instalado dependencias:
npm install

# Correr en desarrollo:
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

---

## PASO 3: Subir Tu Primer Proyecto (5 minutos)

1. **Ve al admin panel:**
   ```
   http://localhost:3000/admin
   ```

2. **Clic en "Nuevo Proyecto"**

3. **Completa el formulario:**
   - Título: "Mi Primer Proyecto"
   - Slug: "mi-primer-proyecto" (auto-generado)
   - Categoría: "designing" o "drawings"
   - Descripción corta: Una frase atractiva
   - Año: 2024

4. **Arrastra 2-3 imágenes** al área de upload
   - El sistema las optimiza automáticamente ✅
   - Genera blur placeholders ✅
   - Las sube a Supabase ✅

5. **Selecciona la imagen de portada**

6. **Clic en "Crear Proyecto"**

7. **Ve a la homepage** → ¡Tu proyecto está visible!

---

## ✅ VERIFICACIÓN

Deberías ver:
- ✅ Homepage con animaciones
- ✅ Tu proyecto en la galería
- ✅ Clic en proyecto abre página individual
- ✅ Imágenes cargan con blur placeholder
- ✅ Navegación funciona perfectamente

---

## 🚀 DEPLOY A PRODUCCIÓN

Cuando estés listo para publicar:

### Opción 1: GitHub + Vercel (Recomendado)

```bash
# 1. Push a GitHub
git add .
git commit -m "Ready for production"
git push origin main

# 2. Ve a vercel.com
# 3. "Add New Project"
# 4. Selecciona tu repo
# 5. Agrega las mismas variables de entorno
# 6. Deploy

# ¡Listo en 2 minutos! 🎉
```

### Opción 2: Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

---

## 📚 DOCUMENTACIÓN COMPLETA

Si necesitas más información:

- **RESUMEN-FINAL.md** → Overview completo del proyecto
- **SETUP-PRODUCTION.md** → Guía detallada de deployment
- **COMO-USAR-ADMIN.md** → Manual completo del admin panel
- **CHECKLIST-DEPLOYMENT.md** → Checklist exhaustivo

---

## 🎨 FEATURES YA CONFIGURADAS

✅ Next.js 15 con App Router
✅ Supabase conectado (DB + Storage)
✅ Admin panel completo
✅ Progressive image loading
✅ Optimización automática de imágenes
✅ Blur placeholders
✅ Lazy loading inteligente
✅ AVIF + WebP automático
✅ SEO optimizado
✅ Responsive design
✅ Animaciones premium
✅ Cache headers configurados
✅ Security headers
✅ TypeScript sin errores
✅ Linting pasando

---

## 💡 TIPS

### Subir Múltiples Proyectos:
```
1. Prepara todas tus imágenes exportadas
2. Escribe las descripciones en un doc
3. Ve al /admin y crea proyectos uno por uno
4. En 30-60 min tendrás 5-10 proyectos listos
```

### Mejores Prácticas de Imágenes:
```
- Portadas: 1920x1080px (landscape)
- Galerías: Máximo 2400px ancho
- Formato: JPG o PNG (el sistema optimiza automáticamente)
- No comprimas manualmente, déjalo al sistema
```

### Marcar Proyectos Destacados:
```
- En el formulario, marca checkbox "Destacado"
- Esos proyectos aparecerán en la homepage
- Máximo 3-6 destacados recomendado
```

---

## 🐛 ¿ALGO NO FUNCIONA?

### "Cannot connect to Supabase":
```bash
# Verifica que .env.local existe y tiene las credenciales correctas
cat .env.local
```

### "Images don't load":
```bash
# Verifica que el bucket existe
# Ve a: https://supabase.com/dashboard/project/zqpfcffiqhxromzwogeq/storage
# Debe existir: portfolio-images (público)
```

### "Admin panel doesn't work":
```bash
# Asegúrate que el servidor está corriendo
npm run dev
# Luego ve a: http://localhost:3000/admin
```

---

## 🎉 ¡LISTO!

Tu portafolio profesional está configurado y funcionando.

**Solo 3 comandos para empezar:**

```bash
cp env.example .env.local
npm install
npm run dev
```

**Luego abre:** http://localhost:3000

---

**¿Necesitas ayuda?** Lee `RESUMEN-FINAL.md` para info completa.

**¡A subir proyectos! 🚀✨**

