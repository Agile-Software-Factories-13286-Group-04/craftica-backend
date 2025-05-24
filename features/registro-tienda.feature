Feature: Registro de tienda

  Scenario: Crear una nueva tienda
    Given el usuario proporciona los datos necesarios para crear una nueva tienda
    When el usuario envía la solicitud de registro de tienda
    Then se registra exitosamente la nueva tienda y se envía una alerta indicando que se creó la tienda correctamente

  Scenario: Crear una nueva tienda con datos incompletos
    Given el usuario no proporciona los datos necesarios para crear una nueva tienda correctamente
    When el usuario envía la solicitud de registro de tienda
    Then no se registra la nueva tienda y se envía una alerta indicando que faltan datos

  Scenario: Crear una nueva tienda con datos inválidos
    Given el usuario proporciona un valor numérico como nombre de tienda
    When el usuario envía la solicitud de registro de tienda
    Then no se registra la nueva tienda y se envía una alerta indicando que el nombre de la tienda tiene que ser de tipo texto