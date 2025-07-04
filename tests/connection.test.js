import mongoose from 'mongoose';
import { expect } from 'chai';
import UserModel from '../src/models/UserModel.js';

describe('Main Database Connection Test', () => {
  let connection;

  before(async () => {
    try {
      // Conectar a la base de datos principal
      connection = await mongoose.connect('mongodb://localhost:27017/Uma_Database');
      console.log('✅ Conectado a la base de datos principal');
    } catch (error) {
      console.error('❌ Error conectando a la base de datos principal:', error);
      throw error;
    }
  });

  after(async () => {
    try {
      await mongoose.connection.close();
      console.log('✅ Conexión a la base de datos principal cerrada');
    } catch (error) {
      console.error('❌ Error cerrando conexión:', error);
    }
  });

  describe('Database Connection Status', () => {
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

  describe('Database Operations', () => {
    beforeEach(async () => {
      // Limpiar solo la colección de usuarios para no afectar otros datos
      await UserModel.deleteMany({});
    });

    it('should perform basic CRUD operations', async () => {
      // Create
      const userData = {
        _id: 999,
        nombres: 'Test',
        apellidos: 'Connection',
        telefono: '+573009999999',
        foto: 'https://ejemplo.com/test.jpg',
        credencial: {
          correo: 'test.connection@ejemplo.com',
          password: 'test123'
        },
        localidad: {
          direccion: 'Test Address',
          ciudad: 'Test City',
          pais: 'Test Country'
        }
      };

      const user = await UserModel.create(userData);
      expect(user._id).to.equal(999);
      expect(user.nombres).to.equal('Test');

      // Read
      const foundUser = await UserModel.findById(999);
      expect(foundUser).to.exist;
      expect(foundUser.credencial.correo).to.equal('test.connection@ejemplo.com');

      // Update
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: 999 },
        { nombres: 'Test Updated' },
        { new: true }
      );
      expect(updatedUser.nombres).to.equal('Test Updated');

      // Delete
      await UserModel.findByIdAndDelete(999);
      const deletedUser = await UserModel.findById(999);
      expect(deletedUser).to.be.null;
    });

    it('should handle multiple users', async () => {
      const users = [
        {
          _id: 1001,
          nombres: 'User1',
          apellidos: 'Test',
          telefono: '+573001001001',
          foto: 'https://ejemplo.com/user1.jpg',
          credencial: {
            correo: 'user1@test.com',
            password: 'pass1'
          },
          localidad: {
            direccion: 'Address 1',
            ciudad: 'City 1',
            pais: 'Country 1'
          }
        },
        {
          _id: 1002,
          nombres: 'User2',
          apellidos: 'Test',
          telefono: '+573002002002',
          foto: 'https://ejemplo.com/user2.jpg',
          credencial: {
            correo: 'user2@test.com',
            password: 'pass2'
          },
          localidad: {
            direccion: 'Address 2',
            ciudad: 'City 2',
            pais: 'Country 2'
          }
        }
      ];

      const createdUsers = await UserModel.insertMany(users);
      expect(createdUsers).to.have.length(2);
      expect(createdUsers[0]._id).to.equal(1001);
      expect(createdUsers[1]._id).to.equal(1002);

      const allUsers = await UserModel.find();
      expect(allUsers).to.have.length(2);
    });
  });

  describe('Database Performance', () => {
    it('should handle connection under load', async () => {
      const startTime = Date.now();
      
      // Realizar múltiples operaciones
      const promises = [];
      for (let i = 2001; i <= 2010; i++) {
        const userData = {
          _id: i,
          nombres: `User${i}`,
          apellidos: 'Performance',
          telefono: `+57300${i}${i}${i}`,
          foto: `https://ejemplo.com/user${i}.jpg`,
          credencial: {
            correo: `user${i}@performance.com`,
            password: `pass${i}`
          },
          localidad: {
            direccion: `Address ${i}`,
            ciudad: `City ${i}`,
            pais: 'Performance Country'
          }
        };
        promises.push(UserModel.create(userData));
      }

      await Promise.all(promises);
      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`⏱️  Tiempo para crear 10 usuarios: ${duration}ms`);
      expect(duration).to.be.lessThan(5000); // Debe tomar menos de 5 segundos

      const users = await UserModel.find({ apellidos: 'Performance' });
      expect(users).to.have.length(10);
    });
  });
}); 