Feature: Creación de usuario

  Scenario: Creación exitosa de usuario
    Given el usuario inicia el proceso de registro
    When envía todos los datos requeridos de manera correcta
    Then se muestra un mensaje confirmando que el usuario ha sido registrado

  Scenario: Datos incompletos en la solicitud de registro
    Given el usuario inicia el proceso de registro
    When omite algún dato obligatorio y envía la solicitud
    Then se muestra un mensaje indicando que todos los campos son obligatorios

  Scenario: Correo con formato inválido
    Given el usuario inicia el proceso de registro
    When proporciona un correo con formato incorrecto y envía la solicitud
    Then se muestra un mensaje indicando “Formato de correo inválido”
