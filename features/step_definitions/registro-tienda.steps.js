import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";

// Simulación de base de datos en memoria
let tiendas = [];
let nuevaTienda;
let alerta;

function validarTienda(tienda) {
  const camposRequeridos = [
    "nombre",
    "calificacion",
    "imagen",
    "direccion",
    "ciudad",
    "pais",
  ];
  for (const campo of camposRequeridos) {
    if (!tienda[campo]) return { valido: false, alerta: "Faltan datos" };
  }
  if (typeof tienda.nombre !== "string")
    return {
      valido: false,
      alerta: "El nombre de la tienda tiene que ser de tipo texto",
    };
  return { valido: true };
}

// Escenario: Crear una nueva tienda
Given(
  "el usuario proporciona los datos necesarios para crear una nueva tienda",
  function () {
    nuevaTienda = {
      nombre: "Tienda Nueva",
      calificacion: 4.8,
      imagen: "a.jpg",
      direccion: "Av. 1",
      ciudad: "Ciudad A",
      pais: "País B",
    };
  }
);

// Escenario: Crear una nueva tienda con datos incompletos
Given(
  "el usuario no proporciona los datos necesarios para crear una nueva tienda correctamente",
  function () {
    nuevaTienda = {
      nombre: "Tienda Nueva",
      // calificacion: falta este campo
      imagen: "a.jpg",
      direccion: "Av. 1",
      ciudad: "Ciudad A",
      pais: "País B",
    };
  }
);

// Escenario: Crear una nueva tienda con datos inválidos
Given(
  "el usuario proporciona un valor numérico como nombre de tienda",
  function () {
    nuevaTienda = {
      nombre: 123, // Nombre como número en lugar de texto
      calificacion: 4.8,
      imagen: "a.jpg",
      direccion: "Av. 1",
      ciudad: "Ciudad A",
      pais: "País B",
    };
  }
);

// Paso común para todos los escenarios de registro
When("el usuario envía la solicitud de registro de tienda", function () {
  const validacion = validarTienda(nuevaTienda);
  if (validacion.valido) {
    tiendas.push(nuevaTienda);
    alerta = "Tienda creada correctamente";
  } else {
    alerta = validacion.alerta;
  }
});

// Then paso para verificar registro exitoso
Then(
  "se registra exitosamente la nueva tienda y se envía una alerta indicando que se creó la tienda correctamente",
  function () {
    expect(tiendas).to.include(nuevaTienda);
    expect(alerta).to.equal("Tienda creada correctamente");
  }
);

// Then paso para verificar error por datos incompletos
Then(
  "no se registra la nueva tienda y se envía una alerta indicando que faltan datos",
  function () {
    expect(tiendas).to.not.include(nuevaTienda);
    expect(alerta).to.equal("Faltan datos");
  }
);

// Then paso para verificar error por datos inválidos
Then(
  "no se registra la nueva tienda y se envía una alerta indicando que el nombre de la tienda tiene que ser de tipo texto",
  function () {
    expect(tiendas).to.not.include(nuevaTienda);
    expect(alerta).to.equal(
      "El nombre de la tienda tiene que ser de tipo texto"
    );
  }
);
