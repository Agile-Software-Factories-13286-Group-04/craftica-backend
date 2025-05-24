Feature: Gestión de tiendas

  Scenario: Consulta de todas las tiendas
    Given el usuario quiere conocer todas las tiendas registradas
    When el usuario envía la solicitud de consulta general
    Then se envía un listado de todas las tiendas disponibles

  Scenario: Consulta de una tienda específica
    Given el usuario consulta por una tienda en especifico
    When el usuario envía la solicitud de consulta específica
    Then se envía la información de dicha tienda

  Scenario: Actualizar tienda
    Given el usuario quiere actualizar los datos de su tienda
    When el usuario envía la solicitud de actualización
    Then se actualiza exitosamente la tienda