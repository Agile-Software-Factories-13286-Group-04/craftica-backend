import mongoose from 'mongoose';
import { expect } from 'chai';

describe('Simple Database Connection Test', () => {
  before(async () => {
    try {
      // Verificar si ya hay una conexión activa
      if (mongoose.connection.readyState === 1) {
        console.log('✅ Ya hay una conexión activa a MongoDB');
        return;
      }

      // Conectar a MongoDB
      await mongoose.connect('mongodb://localhost:27017/Uma_Database');
      console.log('✅ Conectado exitosamente a MongoDB');
    } catch (error) {
      console.error('❌ Error conectando a MongoDB:', error.message);
      throw error;
    }
  });

  after(async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log('✅ Conexión cerrada exitosamente');
      }
    } catch (error) {
      console.error('❌ Error cerrando conexión:', error.message);
    }
  });

  describe('Connection Status', () => {
    it('should be connected to MongoDB', () => {
      expect(mongoose.connection.readyState).to.equal(1); // 1 = connected
    });

    it('should have correct database name', () => {
      expect(mongoose.connection.name).to.equal('Uma_Database');
    });

    it('should have correct host', () => {
      expect(mongoose.connection.host).to.equal('localhost');
    });

    it('should have correct port', () => {
      expect(mongoose.connection.port).to.equal(27017);
    });
  });

  describe('Basic Database Operations', () => {
    it('should be able to ping the database', async () => {
      const result = await mongoose.connection.db.admin().ping();
      expect(result.ok).to.equal(1);
    });

    it('should list collections', async () => {
      const collections = await mongoose.connection.db.listCollections().toArray();
      expect(collections).to.be.an('array');
      console.log('📋 Colecciones disponibles:', collections.map(c => c.name));
    });
  });
}); 