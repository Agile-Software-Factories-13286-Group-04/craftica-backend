const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

//Simulacion
let publicacionesArtesanales = [
    {
        id: 1,
        titulo: 'Escultura en madera',
        comentarios: [],
        meGusta: 0
    }
];

let comentarioUsuario;
let mensajeComentario;
let publicacionSeleccionada;
let reaccionRegistrada;

// Escenario 01
Given('el usuario ha iniciado sesión y visualiza una publicación artesanal', function () {
    this.usuarioAutenticado = true;
    publicacionSeleccionada = publicacionesArtesanales[0];
});

When('escribe un comentario y lo envía', function () {
    comentarioUsuario = '¡Qué hermoso trabajo artesanal!';

    if (this.usuarioAutenticado && comentarioUsuario.trim().length > 0) {
        publicacionSeleccionada.comentarios.push(comentarioUsuario);
    }
});

Then('el sistema guardo el comentario y lo muestra junto a la publicación.', function () {
    expect(publicacionSeleccionada.comentarios).to.include(comentarioUsuario);
});

// Escenario 02
Given('el usuario está navegando por las publicaciones artesanales', function () {
    this.usuarioAutenticado = true;
    publicacionSeleccionada = publicacionesArtesanales[0];
});

When('presiona el botón de “me gusta” en una publicación', function () {
    if (this.usuarioAutenticado) {
        publicacionSeleccionada.meGusta += 1;
        reaccionRegistrada = true;
    }
});

Then('el sistema registra la acción y actualiza el contador de “me gusta”.', function () {
    expect(reaccionRegistrada).to.be.true;
    expect(publicacionSeleccionada.meGusta).to.be.greaterThan(0);
});

// Escenario 03
Given('el usuario intenta enviar un comentario vacío', function () {
    this.usuarioAutenticado = true;
    comentarioUsuario = '   ';
});

When('presiona el botón de enviar', function () {
    if (comentarioUsuario.trim().length === 0) {
        mensajeComentario = 'El comentario no puede estar vacío.';
    }
});

Then('el sistema muestra un mensaje de error.', function () {
    expect(mensajeComentario).to.equal('El comentario no puede estar vacío.');
});
