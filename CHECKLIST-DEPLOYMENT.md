# ✅ CHECKLIST DE DEPLOYMENT A PRODUCCIÓN

Usa esta lista para asegurar que todo esté configurado correctamente antes de hacer deploy.

---

## 📋 PRE-DEPLOYMENT

### 1. Configuración Local

- [ ] Archivo `.env.local` creado con credenciales reales
- [ ] Proyecto funciona en `http://localhost:3000`
- [ ] Admin panel funciona en `http://localhost:3000/admin`
- [ ] Puedes crear proyectos y subir imágenes localmente
- [ ] Las imágenes se ven correctamente en el portafolio

### 2. Base de Datos Supabase

- [ ] Tablas creadas: `projects`, `project_images`, `project_views`
- [ ] RLS (Row Level Security) habilitado
- [ ] Políticas de lectura pública configuradas
- [ ] Storage bucket `portfolio-images` existe
- [ ] Bucket es público (para lectura)
- [ ] Políticas de storage configuradas

### 3. Build Local

```bash
# Ejecutar estos comandos y verificar que pasan:

npm run type-check     # ✅ Sin errores de TypeScript
npm run lint          # ✅ Sin errores de linting
npm run build         # ✅ Build exitoso
npm run start         # ✅ Producción funciona localmente
```

- [ ] `type-check` pasa sin errores
- [ ] `lint` pasa sin warnings críticos
- [ ] `build` completa exitosamente
- [ ] `start` sirve el sitio correctamente

### 4. Git y GitHub

- [ ] Código está en GitHub (repositorio privado o público)
- [ ] `.env.local` NO está commiteado (está en .gitignore)
- [ ] `node_modules/` NO está commiteado
- [ ] Último commit incluye todos los cambios
- [ ] Branch principal es `main` o `master`

---

## 🚀 DEPLOYMENT A VERCEL

### 1. Crear Proyecto en Vercel

- [ ] Cuenta creada en [vercel.com](https://vercel.com)
- [ ] GitHub conectado a Vercel
- [ ] Repositorio importado
- [ ] Framework detectado como "Next.js"
- [ ] Build Command es `npm run build` (default)

### 2. Configurar Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables, agregar:

**Variables requeridas:**

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
  ```
  Value: https://zqpfcffiqhxromzwogeq.supabase.co
  ```

- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  ```
  Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxcGZjZmZpcWh4cm9tendvZ2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NjI1NDMsImV4cCI6MjA4MTMzODU0M30.RCd8pGoaDrCTL6rYUzfxcDOXTbnv1_joRCNOrfaPrks
  ```

- [ ] `NEXT_PUBLIC_SITE_NAME`
  ```
  Value: Katerina Voronina Portfolio
  ```

- [ ] `NEXT_PUBLIC_SITE_DESCRIPTION`
  ```
  Value: UX/UI Design & Art Portfolio
  ```

**Después del primer deploy:**

- [ ] `NEXT_PUBLIC_SITE_URL` (actualizar con tu URL de Vercel)
  ```
  Value: https://tu-dominio.vercel.app
  ```

### 3. Configuración de Vercel

- [ ] Build settings confirmados
- [ ] Root Directory es `.` (raíz)
- [ ] Node version: 18.x o superior
- [ ] Todas las variables de entorno aplicadas a "Production"

### 4. Deploy

- [ ] Click en "Deploy"
- [ ] Build completado sin errores (check logs)
- [ ] Deploy exitoso (status: Ready)
- [ ] URL de producción generada

---

## 🔍 POST-DEPLOYMENT

### 1. Verificación Funcional

**Homepage:**
- [ ] Se carga correctamente
- [ ] Animaciones funcionan suavemente
- [ ] Navegación funciona
- [ ] Links a proyectos funcionan
- [ ] Footer tiene links correctos

**Proyectos:**
- [ ] Página `/designing` se carga
- [ ] Página `/drawings` se carga
- [ ] Tarjetas de proyectos se ven bien
- [ ] Click en proyecto abre página individual
- [ ] Galerías de imágenes funcionan
- [ ] Navegación entre proyectos funciona

**Admin Panel:**
- [ ] `/admin` es accesible
- [ ] Dashboard muestra estadísticas
- [ ] Puedes crear un proyecto de prueba
- [ ] Puedes subir imágenes
- [ ] Puedes editar proyecto
- [ ] Puedes eliminar proyecto de prueba
- [ ] Cambios se reflejan en el sitio público

### 2. Verificación de Imágenes

- [ ] Imagen de portada carga rápidamente
- [ ] Blur placeholder aparece primero
- [ ] Transición suave a imagen completa
- [ ] Lazy loading funciona (imágenes fuera de viewport no cargan)
- [ ] Todas las imágenes son nítidas y de alta calidad
- [ ] No hay errores 404 en la consola

### 3. Performance

Abrir Chrome DevTools → Lighthouse y ejecutar audit:

- [ ] **Performance**: Score > 90
- [ ] **Accessibility**: Score > 90
- [ ] **Best Practices**: Score > 90
- [ ] **SEO**: Score > 90
- [ ] **LCP** (Largest Contentful Paint): < 2.5s
- [ ] **FID** (First Input Delay): < 100ms
- [ ] **CLS** (Cumulative Layout Shift): < 0.1

### 4. Responsive Design

Probar en diferentes tamaños:

- [ ] **Desktop** (1920px+): Layout perfecto
- [ ] **Laptop** (1440px): Todo visible y usable
- [ ] **Tablet** (768px-1024px): Navegación adaptada
- [ ] **Mobile Large** (414px): Menú hamburguesa funciona
- [ ] **Mobile Small** (375px): Todo legible
- [ ] **Orientación horizontal**: Sin problemas

### 5. Navegadores

Probar en:

- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari iOS (si tienes iPhone)
- [ ] Chrome Android (si tienes Android)

### 6. SEO

- [ ] Meta título aparece en pestaña del navegador
- [ ] Meta description visible al compartir en redes
- [ ] Open Graph tags funcionan (previsualizar con [metatags.io](https://metatags.io))
- [ ] Favicon visible
- [ ] `robots.txt` accesible: `https://tu-dominio.vercel.app/robots.txt`
- [ ] Sitemap accesible: `https://tu-dominio.vercel.app/sitemap.xml`

### 7. Analytics (Si configuraste)

- [ ] Google Analytics recibe pageviews
- [ ] Vercel Analytics muestra datos
- [ ] Eventos se trackean correctamente

---

## 🔒 SEGURIDAD

### 1. Headers de Seguridad

Verificar con [securityheaders.com](https://securityheaders.com):

- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] `X-XSS-Protection: 1; mode=block`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`

### 2. Admin Panel

**Si es producción pública:**
- [ ] Password protection activado en Vercel O
- [ ] Autenticación implementada O
- [ ] Ruta `/admin` bloqueada para público

**Si es solo para ti:**
- [ ] Solo tú conoces la URL del admin
- [ ] Considerar agregar autenticación básica

### 3. Supabase

- [ ] Anon key es la pública (no el service role key)
- [ ] RLS está habilitado en todas las tablas
- [ ] Políticas de seguridad correctas
- [ ] No hay queries sin protección RLS

---

## 🎨 CONTENIDO

### 1. Primer Contenido

- [ ] Al menos 3 proyectos publicados
- [ ] Cada proyecto tiene:
  - [ ] Título descriptivo
  - [ ] Descripción corta atractiva
  - [ ] Descripción larga completa
  - [ ] 3-8 imágenes de calidad
  - [ ] Imagen de portada seleccionada
  - [ ] Tags relevantes
  - [ ] Categoría correcta
  - [ ] Año actual o reciente

- [ ] Al menos 1 proyecto marcado como "Destacado"

### 2. Página About

- [ ] Información personalizada (si aplica)
- [ ] Foto/imagen personal
- [ ] Links a redes sociales actualizados
- [ ] Bio profesional

### 3. Página Contact

- [ ] Email correcto
- [ ] Links sociales funcionan
- [ ] Formulario funciona (si lo agregaste)

---

## 🌐 DOMINIO PERSONALIZADO (Opcional)

Si quieres usar dominio propio (ej: `katerinavoronina.com`):

### 1. Comprar Dominio

- [ ] Dominio comprado (Namecheap, GoDaddy, etc.)
- [ ] DNS configurado

### 2. Configurar en Vercel

- [ ] Vercel Dashboard → Settings → Domains
- [ ] Agregar dominio personalizado
- [ ] Seguir instrucciones de DNS
- [ ] Esperar propagación (hasta 48h)
- [ ] SSL automático activado

### 3. Actualizar Variables

- [ ] Cambiar `NEXT_PUBLIC_SITE_URL` a tu dominio
- [ ] Redeploy para aplicar cambios
- [ ] Verificar que todo funciona con nuevo dominio

---

## 📊 MONITOREO

### Herramientas Recomendadas

- [ ] **Vercel Analytics**: Activado para ver tráfico
- [ ] **Google Search Console**: Registrar sitio
- [ ] **Uptime Monitor**: Configurar alerta si el sitio cae
- [ ] **Sentry** (opcional): Para tracking de errores

### Mantenimiento Regular

- [ ] Revisar analytics semanalmente
- [ ] Actualizar proyectos regularmente
- [ ] Monitorear performance
- [ ] Backup de base de datos mensual (Supabase lo hace automático)

---

## 🐛 TROUBLESHOOTING

### Build Fails

**Error**: `Module not found` o `Cannot find module`
```bash
# Solución:
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error**: TypeScript errors
```bash
# Solución:
npm run type-check
# Corregir errores mostrados
```

### Runtime Errors

**Error**: Images don't load
```
Checklist:
1. ¿Variables de entorno correctas en Vercel?
2. ¿Bucket portfolio-images existe?
3. ¿Bucket es público?
4. ¿URL de Supabase correcta en next.config.ts?
```

**Error**: Can't create projects
```
Checklist:
1. ¿Tablas existen en Supabase?
2. ¿RLS policies correctas?
3. ¿Consola del navegador muestra errores?
```

### Performance Issues

**Lighthouse score bajo**
```
Checklist:
1. ¿Imágenes son muy grandes? (optimizar antes de subir)
2. ¿Demasiadas animaciones simultáneas?
3. ¿Cache headers configurados?
4. ¿Next.js Image component usado correctamente?
```

---

## ✅ CHECKLIST FINAL

Una vez completados todos los pasos anteriores:

- [ ] Sitio carga en < 3 segundos
- [ ] Todas las páginas funcionan
- [ ] Admin panel funcional
- [ ] Proyectos visibles y navegables
- [ ] Imágenes optimizadas
- [ ] Responsive en todos los dispositivos
- [ ] Lighthouse score > 90 en todo
- [ ] SEO configurado
- [ ] Analytics funcionando
- [ ] Sin errores en consola
- [ ] Sin errores en Vercel logs

---

## 🎉 ¡LISTO PARA PRODUCCIÓN!

Si todos los items están marcados, tu portafolio está listo para mostrar al mundo.

**Próximos pasos:**
1. Comparte tu portafolio en LinkedIn
2. Actualiza tu CV con la URL
3. Envía a clientes potenciales
4. Publica en redes sociales
5. Agrega más proyectos regularmente

**¡Tu portafolio profesional de $10M está vivo! 🚀✨**

---

**Fecha de deployment**: _______________
**URL de producción**: _______________
**Notas adicionales**: _______________




