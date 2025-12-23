# Configuración de SheetDB para el Formulario de Contacto

## Problema Común: Error 400

El error 400 en SheetDB generalmente significa que **los nombres de las columnas en tu Google Sheet no coinciden** con los nombres que se están enviando desde el formulario.

## Verificación Paso a Paso

### 1. Verificar la URL de SheetDB

La URL debe tener el formato:
```
https://sheetdb.io/api/v1/[TU_ID_DE_SHEET]
```

#### Para Desarrollo Local (`.env.local`):
```env
NEXT_PUBLIC_SHEETDB_URL=https://sheetdb.io/api/v1/ezqlumxug5dnn
```

#### Para Producción en Vercel:
1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega una nueva variable:
   - **Name:** `NEXT_PUBLIC_SHEETDB_URL`
   - **Value:** `https://sheetdb.io/api/v1/ezqlumxug5dnn` (tu URL completa)
   - **Environment:** Selecciona Production, Preview, y Development según necesites
5. Haz clic en **Save**
6. **Re-deploy** tu aplicación para que los cambios surtan efecto

**Nota:** Si no configuras la variable en Vercel, el código usará la URL por defecto hardcodeada, pero es mejor práctica usar variables de entorno.

### 2. Verificar los Nombres de las Columnas en Google Sheets

**IMPORTANTE:** Los nombres de las columnas en tu Google Sheet deben coincidir **EXACTAMENTE** (incluyendo mayúsculas/minúsculas) con los nombres que se envían desde el código.

#### Columnas Requeridas (en este orden):
1. `Name` - Nombre del contacto (con mayúscula)
2. `Email` - Email del contacto (con mayúscula)
3. `Subject` - Asunto del mensaje (con mayúscula)
4. `Message` - Mensaje completo (con mayúscula)

**IMPORTANTE:** Los nombres deben tener exactamente estas mayúsculas: `Name`, `Email`, `Subject`, `Message`

### 3. Pasos para Configurar Google Sheets

1. **Crear una nueva hoja de Google Sheets**
2. **En la primera fila, agregar exactamente estos nombres de columnas:**
   ```
   name | email | subject | message | date
   ```
3. **Conectar SheetDB:**
   - Ve a [sheetdb.io](https://sheetdb.io)
   - Crea una nueva API
   - Conecta tu Google Sheet
   - Copia el ID de la API (la parte después de `/api/v1/`)

### 4. Verificar en la Consola del Navegador

Cuando envíes el formulario, abre la consola del navegador (F12) y busca:

- **📤 Enviando a SheetDB:** - Muestra qué datos se están enviando
- **📥 Respuesta de SheetDB:** - Muestra la respuesta del servidor
- **❌ SheetDB error response:** - Si hay un error, muestra detalles

### 5. Errores Comunes y Soluciones

#### Error 400: Bad Request
- **Causa:** Los nombres de las columnas no coinciden
- **Solución:** Verifica que los nombres en Google Sheets sean exactamente: `Name`, `Email`, `Subject`, `Message` (con mayúsculas)

#### Error 404: Not Found
- **Causa:** La URL de SheetDB es incorrecta o el ID no existe
- **Solución:** Verifica la URL en `.env.local` o en el código

#### Error 500: Internal Server Error
- **Causa:** Problema con SheetDB o con la configuración de Google Sheets
- **Solución:** Verifica que la hoja de Google Sheets esté compartida correctamente con SheetDB

### 6. Formato de Datos

El código envía los datos en este formato:
```json
{
  "Name": "Nombre del usuario",
  "Email": "email@ejemplo.com",
  "Subject": "Asunto del mensaje",
  "Message": "Mensaje completo"
}
```

**IMPORTANTE:** Los nombres de las propiedades deben coincidir exactamente con los nombres de las columnas en Google Sheets (con mayúsculas).

### 7. Fallback a Mailto

Si SheetDB falla, el formulario automáticamente usa `mailto:` como respaldo, abriendo el cliente de email del usuario.

## Testing

Para probar que funciona:

1. Abre la consola del navegador (F12)
2. Ve a la página de contacto
3. Llena el formulario
4. Envía el formulario
5. Revisa la consola para ver los logs
6. Verifica en tu Google Sheet que los datos se hayan guardado

## Notas Adicionales

- SheetDB tiene límites en el plan gratuito
- Los datos se guardan en tiempo real
- Puedes ver los datos directamente en Google Sheets

