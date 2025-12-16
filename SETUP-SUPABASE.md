# 🚀 Guía de Configuración Rápida de Supabase

## Paso 1: Ejecutar el Schema SQL en Supabase

1. **Abre tu proyecto de Supabase:**
   - Ve a: https://supabase.com/dashboard/project/zqpfcffiqhxromzwogeq

2. **Ir al SQL Editor:**
   - En el menú lateral, haz clic en **"SQL Editor"**
   - O ve directamente a: https://supabase.com/dashboard/project/zqpfcffiqhxromzwogeq/sql

3. **Crear nueva query:**
   - Haz clic en **"New query"**

4. **Copiar y pegar el schema:**
   - Abre el archivo `supabase-schema.sql` (ya lo tienes abierto)
   - Copia TODO el contenido
   - Pégalo en el editor SQL de Supabase

5. **Ejecutar:**
   - Haz clic en **"Run"** o presiona `Ctrl/Cmd + Enter`
   - Deberías ver un mensaje de éxito

6. **Verificar tablas creadas:**
   - Ve a **"Table Editor"** en el menú lateral
   - Deberías ver dos tablas:
     - `projects`
     - `project_images`

---

## Paso 2: Crear el Bucket de Storage

1. **Ir a Storage:**
   - En el menú lateral, haz clic en **"Storage"**
   - O ve a: https://supabase.com/dashboard/project/zqpfcffiqhxromzwogeq/storage/buckets

2. **Crear nuevo bucket:**
   - Haz clic en **"New bucket"**
   - Nombre: `portfolio-images`
   - **Importante:** Marca como **"Public bucket"** ✅
   - Haz clic en **"Create bucket"**

3. **Configurar políticas (opcional):**
   - Si no marcaste como público, ve a la pestaña **"Policies"**
   - Añade una política de lectura pública

---

## Paso 3: Obtener Credenciales de API

1. **Ir a Settings:**
   - En el menú lateral, haz clic en **"Settings"** (icono de engranaje)
   - Luego **"API"**
   - O ve a: https://supabase.com/dashboard/project/zqpfcffiqhxromzwogeq/settings/api

2. **Copiar credenciales:**
   - **Project URL:** `https://zqpfcffiqhxromzwogeq.supabase.co`
   - **anon/public key:** (copia la clave larga que empieza con "eyJ...")

---

## Paso 4: Configurar Variables de Entorno

1. **Crear archivo .env.local:**
   ```bash
   # En la terminal, en la raíz del proyecto:
   cp .env.local.example .env.local
   ```

2. **Editar .env.local:**
   - Abre el archivo `.env.local`
   - Reemplaza con tus credenciales:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://zqpfcffiqhxromzwogeq.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
   ```

   ⚠️ **Importante:** Reemplaza `tu-anon-key-aqui` con la clave que copiaste en el Paso 3

---

## Paso 5: Migrar Datos (Opcional)

Si quieres migrar los proyectos de ejemplo a Supabase:

```bash
npm run migrate
```

Esto creará los proyectos en tu base de datos.

---

## Paso 6: Iniciar el Servidor

```bash
npm run dev
```

Luego visita:
- **Portafolio:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin

---

## ✅ Verificación

Después de completar los pasos, verifica:

1. **En Supabase Dashboard:**
   - ✅ Tablas `projects` y `project_images` existen
   - ✅ Bucket `portfolio-images` existe y es público

2. **En tu aplicación:**
   - ✅ El admin panel carga sin errores
   - ✅ Puedes crear un proyecto de prueba
   - ✅ Puedes subir imágenes

---

## 🆘 Si algo no funciona

1. **Revisa la consola del navegador** (F12) para ver errores
2. **Verifica que `.env.local` tenga las credenciales correctas**
3. **Asegúrate de que el bucket sea público**
4. **Reinicia el servidor** después de cambiar `.env.local`

---

## 📝 Próximo Paso

Una vez completados estos pasos, podrás:
- Crear proyectos desde `/admin`
- Subir imágenes con drag & drop
- Gestionar tu portafolio completo
