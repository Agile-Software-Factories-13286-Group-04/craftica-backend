const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

//Simulacion
let publicaciones = [];
let nuevaPublicacion;
let mensajeErrorPublicacion;

// Escenario 01
Given('el artesano ha iniciado sesión exitosamente', function () {
    this.autenticado = true;
});

When('proporciona los datos requeridos para crear una publicación (título, descripción, imágenes, precio, categoría ' +
    'y producto válido)', function () {
    nuevaPublicacion = {
        titulo: 'Pulsera tejida',
        descripcion: 'Hecha a mano con hilos naturales',
        imagenes: ['img1.jpg'],
        precio: 25,
        categoria: 'artesanía cultural',
        productoValido: true
    };

    if (this.autenticado && nuevaPublicacion.imagenes.length > 0 && nuevaPublicacion.productoValido) {
        publicaciones.push(nuevaPublicacion);
    }
});

Then('el sistema registra la publicación correctamente', function () {
    expect(publicaciones).to.include(nuevaPublicacion);
});

// Escenario 02
Given('el artesando intenta publicar un producto', function () {
    this.autenticado = true;
});

When('completa todos los campos excepto las imágenes', function () {
    nuevaPublicacion = {
        titulo: 'Jarro pintado',
        descripcion: 'Decorado con motivos andinos',
        imagenes: [],
        precio: 30,
        categoria: 'artesanía cultural',
        productoValido: true
    };

    if (nuevaPublicacion.imagenes.length === 0) {
        mensajeErrorPublicacion = 'Debe adjuntar al menos una imagen.';
    }
});

Then('el sistema muestra mensaje indicando que debe adjuntar al menos una imagen.', function () {
    expect(mensajeErrorPublicacion).to.equal('Debe adjuntar al menos una imagen.');
});

// Escenario 03
Given('el artesano intenta publicar un producto', function () {
    this.autenticado = true;
});

When('proporciona un producto que no pertenece a la categoría artística o cultural permitida', function () {
    nuevaPublicacion = {
        titulo: 'Zapatillas deportivas',
        descripcion: 'Con diseño moderno',
        imagenes: ['img2.jpg'],
        precio: 50,
        categoria: 'ropa deportiva',
        productoValido: false
    };

    if (!nuevaPublicacion.productoValido) {
        mensajeErrorPublicacion = 'El producto no es válido.';
    }
});


Then('no se registra la publicación y se muestra una alerta indicando que el producto no es válido', function () {
    expect(mensajeErrorPublicacion).to.equal('El producto no es válido.');
});
