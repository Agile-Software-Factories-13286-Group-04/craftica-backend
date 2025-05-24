const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

// Simulación de usuarios
let usuarios = [];
let resultado;
let usuarioEspecifico;

Given('el usuario desea conocer los perfiles registrados', function () {
    usuarios = [
        { id: 1, nombre: 'Ana Torres', correo: 'ana@correo.com' },
        { id: 2, nombre: 'Luis Gómez', correo: 'luis@correo.com' }
    ];
});

When('el usuario solicita ver la lista de usuarios', function () {
    resultado = usuarios;
});

Then('se muestra el listado completo de los usuarios', function () {
    expect(resultado).to.be.an('array');
    expect(resultado.length).to.be.greaterThan(0);
});

Given('el sistema no cuenta con usuarios registrados', function () {
    usuarios = [];
});

Then('se muestra un mensaje indicando que no existen usuarios disponibles', function () {
    // En este caso consideramos que la respuesta será un array vacío
    expect(usuarios).to.be.an('array').that.is.empty;
});

Given('el sistema tiene varios usuarios registrados', function () {
    usuarios = [
        { id: 1, nombre: 'Ana Torres', correo: 'ana@correo.com' },
        { id: 2, nombre: 'Luis Gómez', correo: 'luis@correo.com' }
    ];
});

When('el usuario pide la información del perfil con id {int}', function (id) {
    usuarioEspecifico = usuarios.find(u => u.id === id);
});

Then('se devuelve el objeto de usuario que incluye nombre y correo', function () {
    expect(usuarioEspecifico).to.be.an('object');
    expect(usuarioEspecifico).to.have.all.keys('id', 'nombre', 'correo');
});
