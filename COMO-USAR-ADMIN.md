# 📚 CÓMO USAR EL PANEL DE ADMINISTRACIÓN

Guía completa para gestionar tu portafolio profesional.

---

## 🎯 ACCESO AL ADMIN PANEL

### Local (Desarrollo):
```
http://localhost:3000/admin
```

### Producción:
```
https://tu-dominio.vercel.app/admin
```

⚠️ **Importante**: El panel está disponible sin autenticación en desarrollo. Para producción, debes implementar autenticación (ver sección de seguridad al final).

---

## 📊 DASHBOARD PRINCIPAL

Cuando entras a `/admin` verás:

### 1. Estadísticas en tiempo real:
- **Total de Proyectos**: Cantidad total de proyectos
- **Total de Imágenes**: Imágenes subidas a Supabase
- **Proyectos Destacados**: Marcados como featured
- **Proyectos Designing**: Categoría UX/UI

### 2. Lista de proyectos:
- Ver todos tus proyectos
- Buscar por título
- Filtrar por categoría
- Editar o eliminar proyectos

---

## ➕ CREAR UN NUEVO PROYECTO

### Paso 1: Clic en "Nuevo Proyecto"

### Paso 2: Completar el formulario

#### Información Básica:

**Título*** (requerido)
```
Ejemplo: Rediseño de App Bancaria
```

**Slug*** (requerido)
```
URL amigable: rediseno-app-bancaria
Automático desde el título, pero puedes editarlo
```

**Categoría*** (requerido)
- `designing`: Para proyectos de UX/UI Design
- `drawings`: Para proyectos de Arte/Ilustración

#### Descripciones:

**Descripción Corta*** (requerido)
```
Máximo 200 caracteres
Aparece en: tarjetas de proyectos, previews
Ejemplo: "Rediseño completo de la experiencia de usuario para app de banca móvil"
```

**Descripción Larga** (opcional)
```
Sin límite de caracteres
Aparece en: página individual del proyecto
Ejemplo: "Este proyecto nació de la necesidad de modernizar..."
Soporta saltos de línea para mejor legibilidad
```

#### Metadata:

**Cliente** (opcional)
```
Ejemplo: Banco Nacional
```

**Año*** (requerido)
```
Ejemplo: 2024
Rango válido: 1900-2100
```

**Tags** (opcional)
```
Separados por comas
Ejemplo: ux, ui, mobile, fintech, figma
Útiles para: SEO, búsquedas futuras, filtros
```

#### Opciones:

**Destacado** (checkbox)
```
✓ = Aparece en homepage con prioridad
  = Solo visible en página de categoría
```

**Publicado** (checkbox)
```
✓ = Visible para el público
  = Borrador, solo visible en admin
```

#### SEO (opcional pero recomendado):

**SEO Title**
```
Ejemplo: Rediseño App Bancaria | UX/UI Design
Aparece en: Google, redes sociales
```

**SEO Description**
```
Ejemplo: "Proyecto de rediseño UX/UI para app bancaria con +100k usuarios..."
Aparece en: resultados de búsqueda
```

**Meta Keywords**
```
Separados por comas
Ejemplo: ux design, app design, fintech, mobile banking
```

### Paso 3: Subir imágenes

#### Sistema de Drag & Drop:

1. **Arrastra archivos** al área de upload O **clic para seleccionar**

2. **Previsualización automática**:
   - Ver thumbnails de todas las imágenes
   - Información de cada archivo (nombre, tamaño)
   - Botón X para eliminar antes de subir

3. **Validación automática**:
   - ✅ Formatos: JPG, PNG, WebP, AVIF, GIF
   - ✅ Tamaño máximo: 50MB por imagen
   - ✅ Máximo 10 imágenes a la vez
   - ❌ Error visual si algo no es válido

4. **Clic en "Subir N imágenes"**:
   - Barra de progreso en tiempo real
   - Indica: "Subiendo 3 de 10 - 45%"
   - Optimización automática en proceso

#### ¿Qué pasa al subir?

El sistema automáticamente:

1. **Comprime** la imagen (2400px máximo, 85% calidad)
2. **Extrae metadata** (dimensiones, aspect ratio, formato)
3. **Genera blur placeholder** (10px thumbnail en base64)
4. **Sube a Supabase Storage** (bucket `portfolio-images`)
5. **Obtiene URL pública** con CDN
6. **Guarda en base de datos** (tabla `project_images`)

#### Gestión de imágenes subidas:

**Seleccionar imagen de portada:**
```
Radio button junto a cada imagen
Solo una puede ser portada
Primera imagen = portada por defecto
```

**Reordenar imágenes:**
```
Arrastra las imágenes para cambiar el orden
El orden se guarda automáticamente
Importante para galerías
```

**Eliminar imagen:**
```
Clic en botón "Eliminar"
Confirmar acción
Se borra de Supabase Storage Y base de datos
```

**Alt text:**
```
Texto alternativo para accesibilidad
Ejemplo: "Pantalla principal de la app con nuevo diseño"
Mejora SEO y accesibilidad
```

### Paso 4: Guardar

**Clic en "Crear Proyecto"**
- Validación automática de campos requeridos
- Mensaje de éxito o error
- Redirección automática a lista de proyectos
- El proyecto ya es visible (si está publicado)

---

## ✏️ EDITAR UN PROYECTO EXISTENTE

### Desde la lista de proyectos:

1. **Buscar el proyecto**
   - Usar buscador si tienes muchos
   - O scroll en la lista

2. **Clic en el icono de editar** (lápiz)

3. **Modificar campos deseados**
   - Todos los campos son editables
   - Cambios se guardan al dar "Actualizar"

4. **Gestionar imágenes**:
   - Subir nuevas imágenes
   - Eliminar imágenes existentes
   - Cambiar imagen de portada
   - Reordenar galería

5. **Guardar cambios**

---

## 🗑️ ELIMINAR UN PROYECTO

### Precaución: Esta acción NO es reversible

1. **Clic en el icono de eliminar** (papelera roja)

2. **Confirmar eliminación**
   - Popup de confirmación
   - Leer advertencia

3. **¿Qué se elimina?**
   - ✅ Registro del proyecto en base de datos
   - ✅ Todas las imágenes asociadas en Storage
   - ✅ Todas las referencias a imágenes en DB
   - ✅ Vistas y estadísticas del proyecto

### Alternativa: Despublicar

Si no quieres eliminar permanentemente:
- Edita el proyecto
- Desmarca "Publicado"
- Guardar
- El proyecto se oculta del público pero permanece en admin

---

## 🎨 MEJORES PRÁCTICAS

### Para imágenes:

**Dimensiones recomendadas:**
```
Portada (cover):
- Landscape: 1920x1080px (16:9)
- Portrait: 1080x1350px (4:5)
- Square: 1200x1200px (1:1)

Galería:
- Máximo 2400px de ancho
- Alto variable según diseño
- Mantén aspect ratio consistente
```

**Preparación antes de subir:**
```
✅ Exporta desde Figma/Sketch en PNG o JPG
✅ Máxima calidad desde tu herramienta
✅ NO comprimas manualmente (el sistema lo hace)
✅ Usa nombres descriptivos: "app-home-screen.png"
```

**Orden de imágenes:**
```
1. Portada/Hero (la más impactante)
2. Overview/Context
3. Proceso de diseño
4. Detalles específicos
5. Mockups/prototipos
6. Resultados/métricas
```

### Para contenido:

**Títulos:**
```
✅ Claros y concisos
✅ Incluye tipo de proyecto
❌ Evita jerga innecesaria
Ejemplo: "App de Meditación - UX/UI Design"
```

**Descripciones cortas:**
```
✅ Hook atractivo
✅ Menciona el problema resuelto
✅ Máximo 2 líneas
❌ No copies la descripción larga
```

**Descripciones largas:**
```
Estructura recomendada:
1. Contexto del proyecto
2. Desafío/problema
3. Solución implementada
4. Proceso de diseño
5. Resultados/impacto
```

**Tags:**
```
✅ Usa 5-10 tags relevantes
✅ Combina: herramientas + tipo + industria
✅ Ejemplos: figma, ux-research, mobile, healthcare
❌ Evita tags genéricos como "design"
```

### Para SEO:

**Meta títulos:**
```
✅ 50-60 caracteres
✅ Incluye keyword principal
✅ Formato: "Proyecto | Tipo | Tu Nombre"
```

**Meta descripciones:**
```
✅ 150-160 caracteres
✅ Call to action implícito
✅ Menciona beneficio/resultado
```

---

## 📈 FLUJO DE TRABAJO RECOMENDADO

### Workflow profesional:

**1. Preparación offline:**
```
- Exporta todas las imágenes
- Escribe textos en documento separado
- Revisa ortografía
- Define tags y categoría
```

**2. Creación en admin:**
```
- Crear proyecto con info básica
- Subir todas las imágenes
- Seleccionar portada
- Ordenar galería
- Marcar como "No publicado" (borrador)
```

**3. Revisión:**
```
- Ver preview del proyecto
- Verificar que imágenes carguen bien
- Revisar responsive en móvil
- Corregir si es necesario
```

**4. Publicación:**
```
- Editar proyecto
- Marcar "Publicado"
- Guardar
- Verificar en producción
- Compartir en redes sociales
```

---

## 🔒 SEGURIDAD (Importante para Producción)

### Estado actual:
⚠️ El admin panel NO tiene autenticación en desarrollo.

### Para producción DEBES:

**Opción 1: Autenticación con Supabase Auth**

1. Crear usuario administrador en Supabase
2. Agregar middleware de autenticación
3. Proteger rutas `/admin/*`

**Opción 2: Vercel Password Protection**

1. En Vercel Dashboard → Settings
2. Enable "Password Protection"
3. Solo usuarios con contraseña acceden

**Opción 3: IP Allowlist**

1. Restringir `/admin` solo a tu IP
2. Configurar en `vercel.json` o middleware

### Recomendación:
Para un portafolio personal, **Vercel Password Protection** es la opción más simple y segura.

---

## 💡 TIPS Y TRUCOS

### Atajos de teclado (próximamente):
```
Ctrl/Cmd + S = Guardar
Esc = Cancelar/Volver
```

### Subida masiva:
```
Si tienes muchos proyectos:
1. Sube imágenes en grupos de 5-10
2. Crea proyectos uno por uno
3. Usa tags consistentes para facilitar búsqueda futura
```

### Mantenimiento:
```
- Revisa métricas en dashboard semanalmente
- Elimina proyectos obsoletos
- Actualiza descripciones con nuevos resultados
- Reordena proyectos destacados según relevancia
```

### Backup:
```
- Supabase hace backup automático
- Exporta tus proyectos periódicamente (próximamente)
- Mantén archivos originales en tu computadora
```

---

## 🆘 PROBLEMAS COMUNES

### "Error al subir imagen"
```
Causas:
- Imagen muy grande (>50MB)
- Formato no soportado
- Problema de conexión

Solución:
- Comprime la imagen antes de subir
- Verifica formato (JPG, PNG, WebP)
- Recarga la página e intenta de nuevo
```

### "Slug ya existe"
```
Causa:
- Ya tienes un proyecto con ese slug

Solución:
- Cambia el slug a algo único
- Agrega año o categoría: "app-bancaria-2024"
```

### "Proyecto no aparece en el sitio"
```
Causa:
- Proyecto no está publicado

Solución:
- Edita el proyecto
- Marca checkbox "Publicado"
- Guardar
```

### "Imágenes no cargan"
```
Causa:
- Variables de entorno incorrectas
- Bucket no configurado

Solución:
- Verifica .env.local tiene las credenciales correctas
- Verifica que bucket 'portfolio-images' existe en Supabase
```

---

## 📞 NECESITAS AYUDA?

Consulta:
- `SETUP-PRODUCTION.md` - Configuración inicial
- `README.md` - Overview del proyecto
- Logs en Vercel Dashboard
- Logs en Supabase Dashboard

---

**¡Disfruta gestionando tu portafolio profesional! 🎨✨**




