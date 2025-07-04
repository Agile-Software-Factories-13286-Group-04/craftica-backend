# 📋 Resumen de Tests de Base de Datos - Craftica API

## 🎯 Objetivo
Este documento resume todos los tests de conexión y guardado de base de datos creados para asegurar que la API Craftica funciona correctamente.

## 📁 Archivos de Test Creados

### 1. `tests/database.test.js`
**Descripción**: Tests completos de todos los modelos y operaciones CRUD
- ✅ Conexión a base de datos de test (`Uma_Database_Test`)
- ✅ Tests de todos los modelos (User, Store, Product, Publication, Comment, Reaction)
- ✅ Operaciones CRUD completas (Create, Read, Update, Delete)
- ✅ Tests de relaciones entre entidades
- ✅ Limpieza automática de datos de test
- ✅ Tests de operaciones complejas con múltiples entidades

**Comando**: `npm run test:db`

### 2. `tests/connection.test.js`
**Descripción**: Tests específicos de conexión a la base de datos principal
- ✅ Verificación de conexión a MongoDB
- ✅ Tests de configuración de base de datos
- ✅ Operaciones básicas CRUD
- ✅ Tests de performance bajo carga
- ✅ Verificación de host, puerto y nombre de base de datos

**Comando**: `npm run test:connection`

### 3. `tests/simple-connection.test.js`
**Descripción**: Test simple de conexión sin conflictos
- ✅ Verificación básica de conexión
- ✅ Ping a la base de datos
- ✅ Listado de colecciones
- ✅ Manejo de conexiones existentes

**Comando**: `npm run test:simple`

### 4. `tests/check-mongodb.js`
**Descripción**: Script de verificación del estado de MongoDB
- ✅ Verificación si MongoDB está ejecutándose
- ✅ Información de conexión
- ✅ Instrucciones de instalación
- ✅ Test de conexión con Mongoose
- ✅ Listado de colecciones existentes

**Comando**: `npm run check:mongodb`

### 5. `tests/run-tests.js`
**Descripción**: Script automatizado para ejecutar todos los tests
- ✅ Verificación de MongoDB ejecutándose
- ✅ Ejecución secuencial de tests
- ✅ Generación de reportes
- ✅ Manejo de errores

**Comando**: `npm run test:full`

## 🚀 Comandos Disponibles

### Verificación de MongoDB
```bash
npm run check:mongodb
```

### Tests Individuales
```bash
# Test simple de conexión
npm run test:simple

# Tests completos de base de datos
npm run test:db

# Tests de conexión principal
npm run test:connection
```

### Tests Completos
```bash
# Ejecutar script completo con reporte
npm run test:full

# Ejecutar todos los tests (BD + Cucumber)
npm run test:all
```

## 📊 Cobertura de Tests

### ✅ Conexión a Base de Datos
- [x] Verificación de MongoDB ejecutándose
- [x] Conexión a base de datos principal
- [x] Conexión a base de datos de test
- [x] Manejo de errores de conexión
- [x] Cierre correcto de conexiones

### ✅ Modelos de Datos
- [x] UserModel - CRUD completo
- [x] StoreModel - CRUD completo
- [x] ProductModel - CRUD completo
- [x] PublicationModel - CRUD completo
- [x] CommentModel - CRUD completo
- [x] ReactionModel - CRUD completo

### ✅ Operaciones CRUD
- [x] Create - Crear registros
- [x] Read - Leer registros por ID y listar todos
- [x] Update - Actualizar registros
- [x] Delete - Eliminar registros
- [x] Validación de datos

### ✅ Relaciones entre Entidades
- [x] Publicaciones con productos
- [x] Comentarios con usuarios y publicaciones
- [x] Reacciones con usuarios y publicaciones
- [x] Validación de referencias

### ✅ Performance y Carga
- [x] Creación de múltiples registros
- [x] Medición de tiempo de respuesta
- [x] Validación de límites de tiempo
- [x] Manejo de operaciones concurrentes

## 🔧 Configuración

### Dependencias Agregadas
```json
{
  "devDependencies": {
    "mocha": "^10.2.0",
    "chai": "^5.2.0",
    "esm": "^3.2.25"
  }
}
```

### Configuración de Mocha (`.mocharc.json`)
```json
{
  "extension": ["js"],
  "spec": "tests/**/*.test.js",
  "timeout": 10000,
  "reporter": "spec",
  "colors": true,
  "bail": false,
  "recursive": true
}
```

### Scripts Agregados al package.json
```json
{
  "scripts": {
    "test:db": "node --experimental-vm-modules node_modules/mocha/bin/mocha tests/database.test.js",
    "test:connection": "node --experimental-vm-modules node_modules/mocha/bin/mocha tests/connection.test.js",
    "test:simple": "node --experimental-vm-modules node_modules/mocha/bin/mocha tests/simple-connection.test.js",
    "test:full": "node tests/run-tests.js",
    "check:mongodb": "node tests/check-mongodb.js"
  }
}
```

## 📋 Prerrequisitos

### 1. MongoDB Instalado y Ejecutándose
```bash
# Opción 1: MongoDB local
brew services start mongodb-community
# o
mongod

# Opción 2: Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Opción 3: MongoDB Atlas (nube)
# Crear cuenta en https://cloud.mongodb.com
```

### 2. Dependencias Instaladas
```bash
npm install
```

## 🧪 Ejecución de Tests

### Paso 1: Verificar MongoDB
```bash
npm run check:mongodb
```

### Paso 2: Ejecutar Tests
```bash
# Si MongoDB está ejecutándose
npm run test:simple
npm run test:db
npm run test:full
```

## 📈 Resultados Esperados

### Test Exitoso
```
✅ Conectado a la base de datos de test
  Database Connection and Operations Tests
    Database Connection
      ✓ should connect to MongoDB successfully
      ✓ should have correct database name
    User Model Tests
      ✓ should create a new user successfully
      ✓ should find user by ID
      ✓ should update user successfully
      ✓ should delete user successfully
    Store Model Tests
      ✓ should create a new store successfully
    Product Model Tests
      ✓ should create a new product successfully
    Publication Model Tests
      ✓ should create a new publication successfully
    Comment Model Tests
      ✓ should create a new comment successfully
    Reaction Model Tests
      ✓ should create a new reaction successfully
    Complex Operations Tests
      ✓ should handle multiple related operations

  12 passing (2.5s)
```

### Verificación de MongoDB
```
🔍 Verificando estado de MongoDB...

✅ MongoDB está ejecutándose correctamente
📊 Información de conexión:
   - Host: localhost
   - Puerto: 27017
   - Estado: Activo

✅ Base de datos Uma_Database accesible
📋 Información de la base de datos:
[información de la BD]

🧪 Probando conexión con Mongoose...

✅ Conexión exitosa con Mongoose
📊 Base de datos: Uma_Database
🌐 Host: localhost
🔌 Puerto: 27017
📈 Estado: Conectado
📋 Colecciones existentes: 0
✅ Conexión cerrada correctamente

📋 Resumen:
✅ MongoDB está listo para usar
🚀 Puedes ejecutar los tests completos con:
   npm run test:simple
   npm run test:db
```

## 🚨 Troubleshooting

### Error: MongoDB no está ejecutándose
```bash
❌ MongoDB no está ejecutándose
💡 Para iniciar MongoDB:
   brew services start mongodb-community
   # o
   mongod
```

### Error: Conexión rechazada
```bash
# Verificar que MongoDB esté en el puerto correcto
mongosh --port 27017
```

### Error: Timeout en tests
```bash
# Aumentar timeout en .mocharc.json
{
  "timeout": 30000
}
```

### Error: Módulo esm no encontrado
```bash
# Instalar dependencias
npm install
```

## 🎉 Beneficios de los Tests

1. **Verificación Automática**: Los tests verifican automáticamente que la base de datos funciona
2. **Detección Temprana de Problemas**: Identifican problemas antes de que lleguen a producción
3. **Documentación Viva**: Los tests sirven como documentación de cómo usar los modelos
4. **Refactoring Seguro**: Permiten hacer cambios con confianza
5. **Integración Continua**: Preparados para CI/CD

## 📝 Notas Importantes

- Los tests usan una base de datos separada (`Uma_Database_Test`) para no afectar datos de producción
- Se limpian automáticamente después de cada ejecución
- Incluyen manejo de errores y timeouts
- Son compatibles con ES6 modules
- Funcionan con Node.js v22 y MongoDB 6+

## 🚀 Próximos Pasos

1. **Instalar MongoDB** si no está instalado
2. **Ejecutar `npm run check:mongodb`** para verificar el estado
3. **Ejecutar `npm run test:simple`** para el primer test
4. **Ejecutar `npm run test:db`** para tests completos
5. **Integrar en CI/CD** para verificación automática

---

**Estado**: ✅ Tests completos creados y listos para usar
**Última actualización**: $(date)
**Versión**: 1.0.0 