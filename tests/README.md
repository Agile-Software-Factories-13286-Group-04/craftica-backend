# Tests de Base de Datos - Craftica API

## Descripción
Este directorio contiene los tests para verificar la conexión y funcionamiento de la base de datos MongoDB en la API Craftica.

## Archivos de Test

### 📁 `database.test.js`
Tests completos de todos los modelos y operaciones CRUD:
- ✅ Conexión a base de datos de test
- ✅ Tests de todos los modelos (User, Store, Product, Publication, Comment, Reaction)
- ✅ Operaciones CRUD completas
- ✅ Tests de relaciones entre entidades
- ✅ Limpieza automática de datos de test

### 📁 `connection.test.js`
Tests específicos de conexión a la base de datos principal:
- ✅ Verificación de conexión a MongoDB
- ✅ Tests de configuración de base de datos
- ✅ Operaciones básicas CRUD
- ✅ Tests de performance bajo carga

### 📁 `run-tests.js`
Script automatizado para ejecutar todos los tests:
- ✅ Verificación de MongoDB ejecutándose
- ✅ Ejecución secuencial de tests
- ✅ Generación de reportes
- ✅ Manejo de errores

## Comandos de Ejecución

### Instalar dependencias
```bash
npm install
```

### Ejecutar tests de base de datos completos
```bash
npm run test:db
```

### Ejecutar solo tests de conexión
```bash
npm run test:connection
```

### Ejecutar script completo con reporte
```bash
npm run test:full
```

### Ejecutar todos los tests (BD + Cucumber)
```bash
npm run test:all
```

## Prerrequisitos

### 1. MongoDB ejecutándose
```bash
# Iniciar MongoDB
mongod

# O verificar que esté ejecutándose
mongosh --eval "db.runCommand('ping')"
```

### 2. Dependencias instaladas
```bash
npm install
```

## Estructura de los Tests

### Database Connection Tests
```javascript
describe('Database Connection', () => {
  it('should connect to MongoDB successfully', () => {
    expect(mongoose.connection.readyState).to.equal(1);
  });
});
```

### Model Tests
```javascript
describe('User Model Tests', () => {
  it('should create a new user successfully', async () => {
    const user = await UserModel.create(userData);
    expect(user._id).to.equal(1);
  });
});
```

### CRUD Operations Tests
```javascript
describe('CRUD Operations', () => {
  it('should perform Create, Read, Update, Delete', async () => {
    // Create
    const user = await UserModel.create(data);
    
    // Read
    const found = await UserModel.findById(user._id);
    
    // Update
    const updated = await UserModel.findOneAndUpdate(...);
    
    // Delete
    await UserModel.findByIdAndDelete(user._id);
  });
});
```

## Base de Datos de Test

Los tests utilizan una base de datos separada:
- **Base de datos principal**: `Uma_Database`
- **Base de datos de test**: `Uma_Database_Test`

Esto asegura que los tests no afecten los datos de producción.

## Configuración

### Mocha Configuration (`.mocharc.json`)
```json
{
  "extension": ["js"],
  "spec": "tests/**/*.test.js",
  "require": "esm",
  "timeout": 10000,
  "reporter": "spec",
  "colors": true
}
```

### Timeouts
- **Test individual**: 10 segundos
- **Script completo**: 30 segundos
- **Verificación MongoDB**: 5 segundos

## Reportes

### Salida de Test Exitoso
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

### Salida de Script Completo
```
🚀 Iniciando tests de base de datos para Craftica API...

✅ MongoDB está ejecutándose

📋 Ejecutando: Test de Conexión Principal
📝 Descripción: Verifica la conexión a la base de datos principal

✅ Resultado: [output del test]

📊 REPORTE DE TESTS
──────────────────────────────────────────────────
1. ✅ Test de Conexión Principal: PASSED
2. ✅ Tests Completos de Base de Datos: PASSED

──────────────────────────────────────────────────
🎉 ¡Todos los tests pasaron exitosamente!
✅ La base de datos está funcionando correctamente

📋 Resumen de verificación:
✅ Conexión a MongoDB
✅ Operaciones CRUD en todos los modelos
✅ Validación de esquemas
✅ Manejo de relaciones entre entidades
✅ Performance bajo carga
```

## Troubleshooting

### Error: MongoDB no está ejecutándose
```bash
❌ MongoDB no está ejecutándose
💡 Por favor, inicia MongoDB antes de ejecutar los tests
   Comando: mongod
```

### Error: Timeout en tests
```bash
# Aumentar timeout en .mocharc.json
{
  "timeout": 30000
}
```

### Error: Conexión rechazada
```bash
# Verificar que MongoDB esté en el puerto correcto
mongosh --port 27017
```

### Error: Permisos de base de datos
```bash
# Verificar permisos de escritura
mongosh --eval "db.runCommand('ping')"
```

## Mantenimiento

### Limpieza de Datos de Test
Los tests limpian automáticamente los datos después de cada ejecución:
- `beforeEach`: Limpia colecciones específicas
- `after`: Elimina la base de datos de test completa

### Actualización de Tests
Para agregar nuevos tests:
1. Crear archivo en `tests/`
2. Usar estructura de `describe` e `it`
3. Importar modelos necesarios
4. Agregar limpieza en `beforeEach` si es necesario

### Monitoreo de Performance
Los tests incluyen verificación de performance:
- Creación de múltiples registros
- Medición de tiempo de respuesta
- Validación de límites de tiempo 