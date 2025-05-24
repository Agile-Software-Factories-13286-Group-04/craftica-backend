const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

// Simulación de datos
let tiendas = [
  { id: 1, nombre: 'Tienda A', calificacion: 4.5, imagen: 'a.jpg', direccion: 'Av. 1', ciudad: 'Ciudad A', pais: 'País A' },
  { id: 2, nombre: 'Tienda B', calificacion: 4.0, imagen: 'b.jpg', direccion: 'Av. 2', ciudad: 'Ciudad B', pais: 'País B' },
];

let respuesta;
let tiendaConsultada;
let datosActualizados;

// Escenario: Consulta de todas las tiendas
Given('el usuario quiere conocer todas las tiendas registradas', function () {
  // Contexto inicial, no se requiere lógica
});

When('el usuario envía la solicitud de consulta general', function () {
  respuesta = tiendas;
});

Then('se envía un listado de todas las tiendas disponibles', function () {
  expect(respuesta).to.be.an('array');
  expect(respuesta.length).to.be.greaterThan(0);
});

// Escenario: Consulta de una tienda específica
Given('el usuario consulta por una tienda en especifico', function () {
  this.idTienda = 1; // Simula una tienda específica
});

When('el usuario envía la solicitud de consulta específica', function () {
  tiendaConsultada = tiendas.find(t => t.id === this.idTienda);
});

Then('se envía la información de dicha tienda', function () {
  expect(tiendaConsultada).to.be.an('object');
  expect(tiendaConsultada).to.have.property('nombre');
});

// Escenario: Actualizar tienda
Given('el usuario quiere actualizar los datos de su tienda', function () {
  datosActualizados = {
    id: 1,
    nombre: 'Tienda A+',
    calificacion: 5,
    imagen: 'a_plus.jpg',
    direccion: 'Av. Actualizada',
    ciudad: 'Ciudad Nueva',
    pais: 'País Nuevo'
  };
});

When('el usuario envía la solicitud de actualización', function () {
  const index = tiendas.findIndex(t => t.id === datosActualizados.id);
  if (index !== -1) {
    tiendas[index] = datosActualizados;
    respuesta = tiendas[index];
  }
});

Then('se actualiza exitosamente la tienda', function () {
  expect(respuesta).to.deep.equal(datosActualizados);
});