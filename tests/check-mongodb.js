#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('🔍 Verificando estado de MongoDB...\n');

async function checkMongoDB() {
  try {
    // Intentar conectar a MongoDB
    const { stdout } = await execAsync('mongosh --eval "db.runCommand(\'ping\')"', { timeout: 5000 });
    
    if (stdout.includes('ok') && stdout.includes('1')) {
      console.log('✅ MongoDB está ejecutándose correctamente');
      console.log('📊 Información de conexión:');
      console.log('   - Host: localhost');
      console.log('   - Puerto: 27017');
      console.log('   - Estado: Activo');
      
      // Verificar la base de datos
      try {
        const { stdout: dbInfo } = await execAsync('mongosh Uma_Database --eval "db.stats()"', { timeout: 5000 });
        console.log('✅ Base de datos Uma_Database accesible');
        console.log('📋 Información de la base de datos:');
        console.log(dbInfo);
      } catch (error) {
        console.log('⚠️  Base de datos Uma_Database no existe, se creará automáticamente');
      }
      
      return true;
    } else {
      console.log('❌ MongoDB no responde correctamente');
      return false;
    }
    
  } catch (error) {
    console.log('❌ MongoDB no está ejecutándose');
    console.log('💡 Para iniciar MongoDB:');
    console.log('');
    console.log('   Opción 1 - MongoDB local:');
    console.log('   brew services start mongodb-community');
    console.log('   # o');
    console.log('   mongod');
    console.log('');
    console.log('   Opción 2 - MongoDB Atlas (nube):');
    console.log('   - Crear cuenta en https://cloud.mongodb.com');
    console.log('   - Crear cluster gratuito');
    console.log('   - Obtener string de conexión');
    console.log('');
    console.log('   Opción 3 - Docker:');
    console.log('   docker run -d -p 27017:27017 --name mongodb mongo:latest');
    console.log('');
    console.log('🔧 Después de iniciar MongoDB, ejecuta:');
    console.log('   npm run test:simple');
    console.log('');
    
    return false;
  }
}

async function testConnection() {
  console.log('🧪 Probando conexión con Mongoose...\n');
  
  try {
    const mongoose = await import('mongoose');
    
    // Intentar conectar
    await mongoose.default.connect('mongodb://localhost:27017/Uma_Database');
    
    console.log('✅ Conexión exitosa con Mongoose');
    console.log(`📊 Base de datos: ${mongoose.default.connection.name}`);
    console.log(`🌐 Host: ${mongoose.default.connection.host}`);
    console.log(`🔌 Puerto: ${mongoose.default.connection.port}`);
    console.log(`📈 Estado: ${mongoose.default.connection.readyState === 1 ? 'Conectado' : 'Desconectado'}`);
    
    // Listar colecciones
    const collections = await mongoose.default.connection.db.listCollections().toArray();
    console.log(`📋 Colecciones existentes: ${collections.length}`);
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    await mongoose.default.connection.close();
    console.log('✅ Conexión cerrada correctamente');
    
    return true;
    
  } catch (error) {
    console.log('❌ Error conectando con Mongoose:');
    console.log(`   ${error.message}`);
    return false;
  }
}

async function main() {
  const mongoRunning = await checkMongoDB();
  
  if (mongoRunning) {
    console.log('\n' + '─'.repeat(50));
    await testConnection();
  }
  
  console.log('\n📋 Resumen:');
  if (mongoRunning) {
    console.log('✅ MongoDB está listo para usar');
    console.log('🚀 Puedes ejecutar los tests completos con:');
    console.log('   npm run test:simple');
    console.log('   npm run test:db');
  } else {
    console.log('❌ MongoDB no está disponible');
    console.log('🔧 Sigue las instrucciones arriba para instalar/iniciar MongoDB');
  }
}

main().catch(error => {
  console.error('💥 Error inesperado:', error);
  process.exit(1);
}); 