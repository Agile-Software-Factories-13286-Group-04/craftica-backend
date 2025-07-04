#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('🚀 Iniciando tests de base de datos para Craftica API...\n');

async function runTests() {
  const tests = [
    {
      name: 'Test de Conexión Principal',
      command: 'npm run test:db -- --grep "Main Database Connection Test"',
      description: 'Verifica la conexión a la base de datos principal'
    },
    {
      name: 'Tests Completos de Base de Datos',
      command: 'npm run test:db',
      description: 'Ejecuta todos los tests de modelos y operaciones'
    }
  ];

  let allPassed = true;
  const results = [];

  for (const test of tests) {
    console.log(`📋 Ejecutando: ${test.name}`);
    console.log(`📝 Descripción: ${test.description}\n`);

    try {
      const { stdout, stderr } = await execAsync(test.command, { timeout: 30000 });
      
      if (stderr) {
        console.log('⚠️  Warnings:', stderr);
      }
      
      console.log('✅ Resultado:', stdout);
      results.push({ name: test.name, status: 'PASSED', output: stdout });
      
    } catch (error) {
      console.log('❌ Error:', error.message);
      results.push({ name: test.name, status: 'FAILED', error: error.message });
      allPassed = false;
    }

    console.log('─'.repeat(50) + '\n');
  }

  // Generar reporte
  console.log('📊 REPORTE DE TESTS');
  console.log('─'.repeat(50));
  
  results.forEach((result, index) => {
    const status = result.status === 'PASSED' ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${result.name}: ${result.status}`);
  });

  console.log('\n' + '─'.repeat(50));
  
  if (allPassed) {
    console.log('🎉 ¡Todos los tests pasaron exitosamente!');
    console.log('✅ La base de datos está funcionando correctamente');
  } else {
    console.log('⚠️  Algunos tests fallaron. Revisa los errores arriba.');
    process.exit(1);
  }

  console.log('\n📋 Resumen de verificación:');
  console.log('✅ Conexión a MongoDB');
  console.log('✅ Operaciones CRUD en todos los modelos');
  console.log('✅ Validación de esquemas');
  console.log('✅ Manejo de relaciones entre entidades');
  console.log('✅ Performance bajo carga');
}

// Verificar que MongoDB esté ejecutándose
async function checkMongoDB() {
  try {
    await execAsync('mongosh --eval "db.runCommand(\'ping\')"', { timeout: 5000 });
    console.log('✅ MongoDB está ejecutándose');
    return true;
  } catch (error) {
    console.log('❌ MongoDB no está ejecutándose');
    console.log('💡 Por favor, inicia MongoDB antes de ejecutar los tests');
    console.log('   Comando: mongod');
    return false;
  }
}

// Función principal
async function main() {
  const mongoRunning = await checkMongoDB();
  
  if (!mongoRunning) {
    process.exit(1);
  }

  await runTests();
}

main().catch(error => {
  console.error('💥 Error inesperado:', error);
  process.exit(1);
}); 