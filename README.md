# Craftica API - Documentación

## Descripción
API REST para la plataforma Craftica, una aplicación de comercio electrónico que permite gestionar usuarios, tiendas, productos, publicaciones, comentarios y reacciones.

## Base URL
```
http://localhost:3000
```

## Tecnologías
- **Node.js** con Express.js
- **MongoDB** con Mongoose
- **ES6 Modules**

## Instalación y Ejecución

### Prerrequisitos
- Node.js (v14 o superior)
- MongoDB (ejecutándose en localhost:27017)

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd craftica-backend

# Instalar dependencias
npm install

# Ejecutar el servidor
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Estructura de la Base de Datos

### Base de Datos
- **Nombre**: `Uma_Database`
- **Host**: `localhost:27017`

## Endpoints de la API

---

## 👤 USUARIOS

### Obtener todos los usuarios
```http
GET /usuarios
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": 1,
    "nombres": "Juan",
    "apellidos": "Pérez",
    "telefono": "+573001234567",
    "foto": "https://ejemplo.com/foto.jpg",
    "credencial": {
      "correo": "juan@ejemplo.com",
      "password": "password123"
    },
    "localidad": {
      "direccion": "Calle 123 #45-67",
      "ciudad": "Bogotá",
      "pais": "Colombia"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Crear un nuevo usuario
```http
POST /usuarios
```

**Body (sin _id - se genera automáticamente):**
```json
{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "telefono": "+573001234567",
  "foto": "https://ejemplo.com/foto.jpg",
  "credencial": {
    "correo": "juan@ejemplo.com",
    "password": "password123"
  },
  "localidad": {
    "direccion": "Calle 123 #45-67",
    "ciudad": "Bogotá",
    "pais": "Colombia"
  }
}
```

**Respuesta exitosa (201):**
```json
{
  "status": "Usuario agregado",
  "user": {
    "_id": 1,
    "nombres": "Juan",
    "apellidos": "Pérez",
    // ... resto de datos del usuario
  }
}
```

### Obtener usuario por ID
```http
GET /usuarios/:id
```

**Respuesta exitosa (200):**
```json
{
  "_id": 1,
  "nombres": "Juan",
  "apellidos": "Pérez",
  // ... resto de datos del usuario
}
```

### Actualizar usuario
```http
PUT /usuarios/:id
```

**Body:**
```json
{
  "nombres": "Juan Carlos",
  "telefono": "+573009876543"
}
```

**Respuesta exitosa (200):**
```json
{
  "status": "Usuario Actualizado"
}
```

### Eliminar usuario
```http
DELETE /usuarios/:id
```

**Respuesta exitosa (200):**
```json
{
  "status": "Usuario Eliminado"
}
```

### Login de usuario
```http
POST /usuarios/login
```

**Body:**
```json
{
  "correo": "juan@ejemplo.com",
  "password": "password123"
}
```

**Respuesta exitosa (200):**
```json
{
  "status": "Usuario logueado",
  "user": {
    "_id": 1,
    "nombres": "Juan",
    "apellidos": "Pérez",
    // ... resto de datos del usuario
  }
}
```

**Respuesta de error (401):**
```json
{
  "status": "Contraseña incorrecta"
}
```

---

## 🏪 TIENDAS

### Obtener todas las tiendas
```http
GET /tiendas
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": 1,
    "nombre": "Tienda Artesanal",
    "calificacion": 4.5,
    "imagen": "https://ejemplo.com/tienda.jpg",
    "localidad": {
      "direccion": "Calle 100 #50-30",
      "ciudad": "Medellín",
      "pais": "Colombia"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Crear una nueva tienda
```http
POST /tiendas
```

**Body (sin _id - se genera automáticamente):**
```json
{
  "nombre": "Tienda Artesanal",
  "calificacion": 4.5,
  "imagen": "https://ejemplo.com/tienda.jpg",
  "localidad": {
    "direccion": "Calle 100 #50-30",
    "ciudad": "Medellín",
    "pais": "Colombia"
  }
}
```

**Respuesta exitosa (201):**
```json
{
  "status": "Tienda agregada",
  "store": {
    "_id": 1,
    "nombre": "Tienda Artesanal",
    // ... resto de datos de la tienda
  }
}
```

### Obtener tienda por ID
```http
GET /tiendas/:id
```

### Actualizar tienda
```http
PUT /tiendas/:id
```

### Eliminar tienda
```http
DELETE /tiendas/:id
```

---

## 📦 PRODUCTOS

### Obtener todos los productos
```http
GET /productos
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": 1,
    "nombre": "Maceta Artesanal",
    "precio": 25000,
    "descripcion": "Maceta hecha a mano con arcilla",
    "categoria": ["Hogar", "Jardín"],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Crear un nuevo producto
```http
POST /productos
```

**Body (sin _id - se genera automáticamente):**
```json
{
  "nombre": "Maceta Artesanal",
  "precio": 25000,
  "descripcion": "Maceta hecha a mano con arcilla",
  "categoria": ["Hogar", "Jardín"]
}
```

**Respuesta exitosa (201):**
```json
{
  "status": "Producto agregado",
  "product": {
    "_id": 1,
    "nombre": "Maceta Artesanal",
    // ... resto de datos del producto
  }
}
```

### Obtener producto por ID
```http
GET /productos/:id
```

### Actualizar producto
```http
PUT /productos/:id
```

### Eliminar producto
```http
DELETE /productos/:id
```

---

## 📢 PUBLICACIONES

### Obtener todas las publicaciones
```http
GET /publicaciones
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": 1,
    "titulo": "Nueva Maceta Artesanal",
    "descripcion": "Hermosa maceta hecha a mano",
    "fecha": "2024-01-15T10:30:00.000Z",
    "imagenes": [
      "https://ejemplo.com/imagen1.jpg",
      "https://ejemplo.com/imagen2.jpg"
    ],
    "tienda_id": 1,
    "producto": {
      "_id": 1,
      "nombre": "Maceta Artesanal",
      "precio": 25000,
      "descripcion": "Maceta hecha a mano con arcilla",
      "categoria": ["Hogar", "Jardín"]
    }
  }
]
```

### Crear una nueva publicación
```http
POST /publicaciones
```

**Body (sin _id - se genera automáticamente):**
```json
{
  "titulo": "Nueva Maceta Artesanal",
  "descripcion": "Hermosa maceta hecha a mano",
  "imagenes": [
    "https://ejemplo.com/imagen1.jpg",
    "https://ejemplo.com/imagen2.jpg"
  ],
  "tienda_id": 1,
  "producto_id": 1
}
```

**Nota:** La fecha se asigna automáticamente al crear la publicación.

**Respuesta exitosa (201):**
```json
{
  "status": "Publicación agregada",
  "publication": {
    "_id": 1,
    "titulo": "Nueva Maceta Artesanal",
    // ... resto de datos de la publicación
  }
}
```

### Obtener publicación por ID
```http
GET /publicaciones/:id
```

**Respuesta exitosa (200):**
```json
{
  "_id": 1,
  "titulo": "Nueva Maceta Artesanal",
  "descripcion": "Hermosa maceta hecha a mano",
  "fecha": "2024-01-15T10:30:00.000Z",
  "imagenes": [
    "https://ejemplo.com/imagen1.jpg",
    "https://ejemplo.com/imagen2.jpg"
  ],
  "tienda_id": 1,
  "producto": {
    "_id": 1,
    "nombre": "Maceta Artesanal",
    "precio": 25000,
    "descripcion": "Maceta hecha a mano con arcilla",
    "categoria": ["Hogar", "Jardín"]
  }
}
```

### Actualizar publicación
```http
PUT /publicaciones/:id
```

### Eliminar publicación
```http
DELETE /publicaciones/:id
```

---

## 💬 COMENTARIOS

### Obtener todos los comentarios
```http
GET /comentarios
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": 1,
    "comentario": "¡Hermoso producto!",
    "fecha": "2024-01-15T10:30:00.000Z",
    "usuario_id": 1,
    "publicacion_id": 1,
    "megusta": 5,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Crear un nuevo comentario
```http
POST /comentarios
```

**Body (sin _id - se genera automáticamente):**
```json
{
  "comentario": "¡Hermoso producto!",
  "usuario_id": 1,
  "publicacion_id": 1
}
```

**Nota:** La fecha y megusta (0) se asignan automáticamente.

**Respuesta exitosa (201):**
```json
{
  "status": "Comentario agregado",
  "comment": {
    "_id": 1,
    "comentario": "¡Hermoso producto!",
    // ... resto de datos del comentario
  }
}
```

### Obtener comentario por ID
```http
GET /comentarios/:id
```

### Actualizar comentario
```http
PUT /comentarios/:id
```

### Eliminar comentario
```http
DELETE /comentarios/:id
```

### Obtener comentarios por publicación
```http
GET /comentarios/publicacion/:id
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": 1,
    "comentario": "¡Hermoso producto!",
    "fecha": "2024-01-15T10:30:00.000Z",
    "megusta": 5,
    "usuario": {
      "_id": 1,
      "nombres": "Juan",
      "apellidos": "Pérez",
      "correo": "juan@ejemplo.com",
      "foto": "https://ejemplo.com/foto.jpg"
    }
  }
]
```

---

## ❤️ REACCIONES

### Obtener todas las reacciones
```http
GET /reacciones
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": 1,
    "reaccion": 1,
    "fecha": "2024-01-15T10:30:00.000Z",
    "usuario_id": 1,
    "publicacion_id": 1,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Crear una nueva reacción
```http
POST /reacciones
```

**Body (sin _id - se genera automáticamente):**
```json
{
  "reaccion": 1,
  "usuario_id": 1,
  "publicacion_id": 1
}
```

**Nota:** La fecha se asigna automáticamente. El valor de `reaccion` puede ser 1 (like) o 0 (dislike).

**Respuesta exitosa (201):**
```json
{
  "status": "Reaccion agregada",
  "reaction": {
    "_id": 1,
    "reaccion": 1,
    // ... resto de datos de la reacción
  }
}
```

### Obtener reacción por ID
```http
GET /reacciones/:id
```

### Actualizar reacción
```http
PUT /reacciones/:id
```

### Eliminar reacción
```http
DELETE /reacciones/:id
```

### Obtener cantidad de likes por publicación
```http
GET /reacciones/publicacion/:id
```

**Respuesta exitosa (200):**
```json
{
  "status": "Cantidad de Likes",
  "cantidad": 15
}
```

---

## 📋 Códigos de Estado HTTP

- **200**: OK - Solicitud exitosa
- **201**: Created - Recurso creado exitosamente
- **400**: Bad Request - Datos de entrada incorrectos
- **401**: Unauthorized - No autorizado
- **404**: Not Found - Recurso no encontrado
- **500**: Internal Server Error - Error interno del servidor

## 🔧 Ejemplos de Uso con JavaScript

### Ejemplo: Obtener todas las publicaciones
```javascript
fetch('http://localhost:3000/publicaciones')
  .then(response => response.json())
  .then(data => {
    console.log('Publicaciones:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Ejemplo: Crear un nuevo usuario
```javascript
const nuevoUsuario = {
  "nombres": "María",
  "apellidos": "García",
  "telefono": "+573001112223",
  "foto": "https://ejemplo.com/maria.jpg",
  "credencial": {
    "correo": "maria@ejemplo.com",
    "password": "password456"
  },
  "localidad": {
    "direccion": "Carrera 50 #80-90",
    "ciudad": "Cali",
    "pais": "Colombia"
  }
};

fetch('http://localhost:3000/usuarios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(nuevoUsuario)
})
.then(response => response.json())
.then(data => {
  console.log('Usuario creado:', data);
})
.catch(error => {
  console.error('Error:', error);
});
```

### Ejemplo: Login de usuario
```javascript
const credenciales = {
  "correo": "juan@ejemplo.com",
  "password": "password123"
};

fetch('http://localhost:3000/usuarios/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(credenciales)
})
.then(response => response.json())
.then(data => {
  if (data.status === "Usuario logueado") {
    console.log('Login exitoso:', data.user);
  } else {
    console.log('Error de login:', data.status);
  }
})
.catch(error => {
  console.error('Error:', error);
});
```

## 📝 Notas Importantes

1. **IDs**: Los IDs se generan automáticamente en el backend. No es necesario enviarlos desde el frontend
2. **Fechas**: Se asignan automáticamente al crear recursos
3. **Validaciones**: La API valida la existencia de referencias antes de crear relaciones
4. **CORS**: La API tiene CORS habilitado para permitir peticiones desde el frontend
5. **MongoDB**: Asegúrate de que MongoDB esté ejecutándose en `localhost:27017`

## 🚀 Próximas Mejoras

- Autenticación con JWT
- Validación de datos más robusta
- Paginación en endpoints de listado
- Filtros y búsqueda avanzada
- Subida de archivos para imágenes
- Rate limiting
- Documentación con Swagger/OpenAPI 