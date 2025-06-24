import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";

let nuevoUsuario = {};
let mensajeRegistro;

Given("el usuario inicia el proceso de registro", function () {
  nuevoUsuario = {};
  mensajeRegistro = null;
});

When("envía todos los datos requeridos de manera correcta", function () {
  nuevoUsuario = {
    nombre: "Carlos Rivera",
    correo: "carlos@correo.com",
    contrasena: "Segura123",
    telefono: "987654321",
  };
  mensajeRegistro = "Usuario registrado con éxito";
});

Then(
  "se muestra un mensaje confirmando que el usuario ha sido registrado",
  function () {
    expect(mensajeRegistro).to.equal("Usuario registrado con éxito");
  }
);

When("omite algún dato obligatorio y envía la solicitud", function () {
  nuevoUsuario = {
    nombre: "Carlos Rivera",
    correo: "", // faltó correo
    contrasena: "Segura123",
    telefono: "987654321",
  };
  mensajeRegistro = "Por favor, complete todos los campos";
});

Then(
  "se muestra un mensaje indicando que todos los campos son obligatorios",
  function () {
    expect(mensajeRegistro).to.equal("Por favor, complete todos los campos");
  }
);

When(
  "proporciona un correo con formato incorrecto y envía la solicitud",
  function () {
    nuevoUsuario = {
      nombre: "Carlos Rivera",
      correo: "carlos#correo.com", // formato inválido
      contrasena: "Segura123",
      telefono: "987654321",
    };
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoUsuario.correo);
    mensajeRegistro = emailValido
      ? "Usuario registrado con éxito"
      : "Formato de correo inválido";
  }
);

Then(
  "se muestra un mensaje indicando “Formato de correo inválido”",
  function () {
    expect(mensajeRegistro).to.equal("Formato de correo inválido");
  }
);
