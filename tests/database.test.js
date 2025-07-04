import mongoose from 'mongoose';
import { expect } from 'chai';
import UserModel from '../src/models/UserModel.js';
import StoreModel from '../src/models/StoreModel.js';
import ProductModel from '../src/models/ProductModel.js';
import PublicationModel from '../src/models/PublicationModel.js';
import CommentModel from '../src/models/CommentModel.js';
import ReactionModel from '../src/models/ReactionModel.js';

describe('Database Connection and Operations Tests', () => {
  let connection;

  before(async () => {
    try {
      // Conectar a la base de datos de test
      connection = await mongoose.connect('mongodb://localhost:27017/Uma_Database_Test');
      console.log('✅ Conectado a la base de datos de test');
    } catch (error) {
      console.error('❌ Error conectando a la base de datos:', error);
      throw error;
    }
  });

  after(async () => {
    try {
      // Limpiar la base de datos de test
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      console.log('✅ Base de datos de test limpiada y conexión cerrada');
    } catch (error) {
      console.error('❌ Error cerrando conexión:', error);
    }
  });

  beforeEach(async () => {
    // Limpiar todas las colecciones antes de cada test
    await UserModel.deleteMany({});
    await StoreModel.deleteMany({});
    await ProductModel.deleteMany({});
    await PublicationModel.deleteMany({});
    await CommentModel.deleteMany({});
    await ReactionModel.deleteMany({});
  });

  describe('Database Connection', () => {
    it('should connect to MongoDB successfully', () => {
      expect(mongoose.connection.readyState).to.equal(1); // 1 = connected
    });

    it('should have correct database name', () => {
      expect(mongoose.connection.name).to.equal('Uma_Database_Test');
    });
  });

  describe('User Model Tests', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        _id: 1,
        nombres: 'Juan',
        apellidos: 'Pérez',
        telefono: '+573001234567',
        foto: 'https://ejemplo.com/foto.jpg',
        credencial: {
          correo: 'juan@ejemplo.com',
          password: 'password123'
        },
        localidad: {
          direccion: 'Calle 123 #45-67',
          ciudad: 'Bogotá',
          pais: 'Colombia'
        }
      };

      const user = await UserModel.create(userData);
      
      expect(user._id).to.equal(1);
      expect(user.nombres).to.equal('Juan');
      expect(user.apellidos).to.equal('Pérez');
      expect(user.credencial.correo).to.equal('juan@ejemplo.com');
      expect(user.createdAt).to.exist;
      expect(user.updatedAt).to.exist;
    });

    it('should find user by ID', async () => {
      const userData = {
        _id: 2,
        nombres: 'María',
        apellidos: 'García',
        telefono: '+573001112223',
        foto: 'https://ejemplo.com/maria.jpg',
        credencial: {
          correo: 'maria@ejemplo.com',
          password: 'password456'
        },
        localidad: {
          direccion: 'Carrera 50 #80-90',
          ciudad: 'Cali',
          pais: 'Colombia'
        }
      };

      await UserModel.create(userData);
      const foundUser = await UserModel.findById(2);
      
      expect(foundUser).to.exist;
      expect(foundUser.nombres).to.equal('María');
      expect(foundUser.credencial.correo).to.equal('maria@ejemplo.com');
    });

    it('should update user successfully', async () => {
      const userData = {
        _id: 3,
        nombres: 'Carlos',
        apellidos: 'López',
        telefono: '+573003334445',
        foto: 'https://ejemplo.com/carlos.jpg',
        credencial: {
          correo: 'carlos@ejemplo.com',
          password: 'password789'
        },
        localidad: {
          direccion: 'Avenida 30 #15-20',
          ciudad: 'Barranquilla',
          pais: 'Colombia'
        }
      };

      await UserModel.create(userData);
      
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: 3 },
        { nombres: 'Carlos Alberto', telefono: '+573009998887' },
        { new: true }
      );

      expect(updatedUser.nombres).to.equal('Carlos Alberto');
      expect(updatedUser.telefono).to.equal('+573009998887');
    });

    it('should delete user successfully', async () => {
      const userData = {
        _id: 4,
        nombres: 'Ana',
        apellidos: 'Rodríguez',
        telefono: '+573005556667',
        foto: 'https://ejemplo.com/ana.jpg',
        credencial: {
          correo: 'ana@ejemplo.com',
          password: 'password101'
        },
        localidad: {
          direccion: 'Calle 80 #10-15',
          ciudad: 'Cartagena',
          pais: 'Colombia'
        }
      };

      await UserModel.create(userData);
      
      const deleteResult = await UserModel.findByIdAndDelete(4);
      expect(deleteResult._id).to.equal(4);
      
      const foundUser = await UserModel.findById(4);
      expect(foundUser).to.be.null;
    });
  });

  describe('Store Model Tests', () => {
    it('should create a new store successfully', async () => {
      const storeData = {
        _id: 1,
        nombre: 'Tienda Artesanal',
        calificacion: 4.5,
        imagen: 'https://ejemplo.com/tienda.jpg',
        localidad: {
          direccion: 'Calle 100 #50-30',
          ciudad: 'Medellín',
          pais: 'Colombia'
        }
      };

      const store = await StoreModel.create(storeData);
      
      expect(store._id).to.equal(1);
      expect(store.nombre).to.equal('Tienda Artesanal');
      expect(store.calificacion).to.equal(4.5);
      expect(store.localidad.ciudad).to.equal('Medellín');
    });
  });

  describe('Product Model Tests', () => {
    it('should create a new product successfully', async () => {
      const productData = {
        _id: 1,
        nombre: 'Maceta Artesanal',
        precio: 25000,
        descripcion: 'Maceta hecha a mano con arcilla',
        categoria: ['Hogar', 'Jardín']
      };

      const product = await ProductModel.create(productData);
      
      expect(product._id).to.equal(1);
      expect(product.nombre).to.equal('Maceta Artesanal');
      expect(product.precio).to.equal(25000);
      expect(product.categoria).to.include('Hogar');
      expect(product.categoria).to.include('Jardín');
    });
  });

  describe('Publication Model Tests', () => {
    it('should create a new publication successfully', async () => {
      const publicationData = {
        _id: 1,
        titulo: 'Nueva Maceta Artesanal',
        descripcion: 'Hermosa maceta hecha a mano',
        fecha: new Date(),
        imagenes: [
          'https://ejemplo.com/imagen1.jpg',
          'https://ejemplo.com/imagen2.jpg'
        ],
        tienda_id: 1,
        producto_id: 1
      };

      const publication = await PublicationModel.create(publicationData);
      
      expect(publication._id).to.equal(1);
      expect(publication.titulo).to.equal('Nueva Maceta Artesanal');
      expect(publication.tienda_id).to.equal(1);
      expect(publication.producto_id).to.equal(1);
      expect(publication.imagenes).to.have.length(2);
    });
  });

  describe('Comment Model Tests', () => {
    it('should create a new comment successfully', async () => {
      const commentData = {
        _id: 1,
        comentario: '¡Hermoso producto!',
        fecha: new Date(),
        usuario_id: 1,
        publicacion_id: 1,
        megusta: 0
      };

      const comment = await CommentModel.create(commentData);
      
      expect(comment._id).to.equal(1);
      expect(comment.comentario).to.equal('¡Hermoso producto!');
      expect(comment.usuario_id).to.equal(1);
      expect(comment.publicacion_id).to.equal(1);
      expect(comment.megusta).to.equal(0);
    });
  });

  describe('Reaction Model Tests', () => {
    it('should create a new reaction successfully', async () => {
      const reactionData = {
        _id: 1,
        reaccion: 1,
        fecha: new Date(),
        usuario_id: 1,
        publicacion_id: 1
      };

      const reaction = await ReactionModel.create(reactionData);
      
      expect(reaction._id).to.equal(1);
      expect(reaction.reaccion).to.equal(1);
      expect(reaction.usuario_id).to.equal(1);
      expect(reaction.publicacion_id).to.equal(1);
    });
  });

  describe('Complex Operations Tests', () => {
    it('should handle multiple related operations', async () => {
      // Crear usuario
      const user = await UserModel.create({
        _id: 10,
        nombres: 'Test',
        apellidos: 'User',
        telefono: '+573000000000',
        foto: 'https://ejemplo.com/test.jpg',
        credencial: {
          correo: 'test@ejemplo.com',
          password: 'test123'
        },
        localidad: {
          direccion: 'Test Address',
          ciudad: 'Test City',
          pais: 'Test Country'
        }
      });

      // Crear tienda
      const store = await StoreModel.create({
        _id: 10,
        nombre: 'Test Store',
        calificacion: 5.0,
        imagen: 'https://ejemplo.com/store.jpg',
        localidad: {
          direccion: 'Store Address',
          ciudad: 'Store City',
          pais: 'Store Country'
        }
      });

      // Crear producto
      const product = await ProductModel.create({
        _id: 10,
        nombre: 'Test Product',
        precio: 10000,
        descripcion: 'Test Description',
        categoria: ['Test']
      });

      // Crear publicación
      const publication = await PublicationModel.create({
        _id: 10,
        titulo: 'Test Publication',
        descripcion: 'Test Description',
        fecha: new Date(),
        imagenes: ['https://ejemplo.com/test.jpg'],
        tienda_id: 10,
        producto_id: 10
      });

      // Crear comentario
      const comment = await CommentModel.create({
        _id: 10,
        comentario: 'Test Comment',
        fecha: new Date(),
        usuario_id: 10,
        publicacion_id: 10,
        megusta: 0
      });

      // Crear reacción
      const reaction = await ReactionModel.create({
        _id: 10,
        reaccion: 1,
        fecha: new Date(),
        usuario_id: 10,
        publicacion_id: 10
      });

      // Verificar que todo se creó correctamente
      expect(user._id).to.equal(10);
      expect(store._id).to.equal(10);
      expect(product._id).to.equal(10);
      expect(publication._id).to.equal(10);
      expect(comment._id).to.equal(10);
      expect(reaction._id).to.equal(10);

      // Verificar relaciones
      expect(publication.tienda_id).to.equal(store._id);
      expect(publication.producto_id).to.equal(product._id);
      expect(comment.usuario_id).to.equal(user._id);
      expect(comment.publicacion_id).to.equal(publication._id);
      expect(reaction.usuario_id).to.equal(user._id);
      expect(reaction.publicacion_id).to.equal(publication._id);
    });
  });
}); 