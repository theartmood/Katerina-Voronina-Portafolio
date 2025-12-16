# Panel de Administración - Guía de Uso

Guía completa para gestionar tu portafolio usando el panel de administración.

## 🚀 Acceso al Panel

En modo desarrollo, accede al panel en:
```
http://localhost:3000/admin
```

> **⚠️ Importante**: Este panel solo está disponible en desarrollo. Para producción, implementa autenticación adecuada (NextAuth, Clerk, etc.).

## 📊 Dashboard

El dashboard muestra estadísticas de tu portafolio:
- **Total de proyectos**
- **Imágenes totales**
- **Proyectos destacados**
- **Proyectos por categoría**

## ➕ Crear Nuevo Proyecto

### Paso 1: Información Básica

1. Haz clic en **"Nuevo Proyecto"**
2. Completa el formulario:
   - **Título**: Nombre del proyecto (requerido)
   - **Slug**: URL amigable (se genera automáticamente del título)
   - **Descripción**: Detalles del proyecto
   - **Categoría**: Interface o Drawing
   - **Año**: Año de creación
   - **Cliente**: Nombre del cliente (opcional)
   - **Destacado**: Marca si quieres que aparezca en la página principal
   - **Orden**: Número para ordenar proyectos

3. Haz clic en **"Crear Proyecto"**

### Paso 2: Subir Imágenes

Una vez creado el proyecto:

1. Serás redirigido a la página de edición
2. Verás la sección **"Imágenes"**
3. Arrastra imágenes o haz clic para seleccionar
4. Puedes subir hasta 10 imágenes a la vez
5. Tamaño máximo: 5MB por imagen
6. Formatos aceptados: JPG, PNG, WebP, AVIF

> **💡 Tip**: La primera imagen que subas será la imagen de portada del proyecto

## ✏️ Editar Proyecto

1. En el dashboard, haz clic en el ícono de **editar** (lápiz)
2. Modifica la información que necesites
3. Sube más imágenes si lo deseas
4. Haz clic en **"Actualizar Proyecto"**

## 🗑️ Eliminar Proyecto

1. En el dashboard, haz clic en el ícono de **eliminar** (papelera)
2. Confirma la eliminación
3. El proyecto y todas sus imágenes serán eliminados permanentemente

> **⚠️ Advertencia**: Esta acción no se puede deshacer

## 📸 Mejores Prácticas para Imágenes

### Dimensiones Recomendadas

- **Proyectos Interface**: 1920x1080px o superior
- **Proyectos Drawing**: Mantén la relación de aspecto original
- **Mínimo**: 1200px de ancho

### Optimización

Las imágenes se optimizan automáticamente:
- ✅ Conversión a formatos modernos (AVIF/WebP)
- ✅ Lazy loading
- ✅ Responsive images
- ✅ CDN de Supabase

### Consejos

1. **Usa imágenes de alta calidad** - El sistema las optimizará
2. **Nombra tus archivos descriptivamente** - Ayuda a la organización
3. **Comprime antes de subir** - Aunque el sistema optimiza, ayuda a acelerar la carga
4. **Usa formatos modernos** - WebP o AVIF cuando sea posible

## 🔄 Migración de Datos Estáticos

Si tienes datos en `lib/data/projects.ts` y quieres migrarlos a Supabase:

### Requisitos Previos

1. Asegúrate de tener las credenciales de Supabase en `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
   ```

2. Verifica que el schema SQL se haya ejecutado en Supabase

### Ejecutar Migración

```bash
# Instalar dependencias si no lo has hecho
npm install

# Ejecutar migración
npm run migrate
```

El script:
- ✅ Lee proyectos de `lib/data/projects.ts`
- ✅ Los inserta en la base de datos
- ✅ Crea registros de imágenes (usando URLs de Unsplash)
- ✅ Muestra progreso y errores

### Después de la Migración

1. Visita `/admin` para ver los proyectos migrados
2. Edita cada proyecto para subir tus propias imágenes
3. Actualiza descripciones y detalles según necesites

## 🔧 Troubleshooting

### Error: "Supabase credentials not found"

**Solución**: Verifica que `.env.local` tenga las credenciales correctas:
```env
NEXT_PUBLIC_SUPABASE_URL=https://zqpfcffiqhxromzwogeq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key-aqui
```

### Error al subir imágenes

**Posibles causas**:
1. El bucket `portfolio-images` no existe → Créalo en Supabase Storage
2. El bucket no es público → Hazlo público en configuración
3. Archivo muy grande → Máximo 5MB por imagen
4. Formato no soportado → Usa JPG, PNG, WebP o AVIF

### Proyecto no aparece en el sitio

**Verifica**:
1. El proyecto está guardado en Supabase (revisa en el dashboard de Supabase)
2. Tiene al menos una imagen
3. La categoría está correctamente asignada
4. Recarga la página del portafolio

### Imágenes no se cargan

**Solución**:
1. Verifica que el bucket sea público
2. Revisa las políticas de storage en Supabase
3. Confirma que las URLs sean correctas en la tabla `project_images`

## 🚀 Despliegue a Producción

### Importante: Seguridad

El panel actual **NO tiene autenticación**. Antes de desplegar:

1. **Opción 1**: Elimina la carpeta `app/admin` del build de producción
2. **Opción 2**: Implementa autenticación:
   - NextAuth.js
   - Clerk
   - Supabase Auth
   - Auth0

### Variables de Entorno

En Vercel/tu plataforma, configura:
```env
NEXT_PUBLIC_SUPABASE_URL=tu-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key
```

## 📚 Recursos Adicionales

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

---

**¿Necesitas ayuda?** Revisa los logs de la consola del navegador para más detalles sobre errores.
