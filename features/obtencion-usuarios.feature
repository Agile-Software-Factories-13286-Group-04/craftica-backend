Feature: Obtención de usuarios

  Scenario: Listado exitoso de usuarios
    Given el usuario desea conocer los perfiles registrados
    When el usuario solicita ver la lista de usuarios
    Then se muestra el listado completo de los usuarios

  Scenario: No hay usuarios registrados
    Given el sistema no cuenta con usuarios registrados
    When el usuario solicita ver la lista de usuarios
    Then se muestra un mensaje indicando que no existen usuarios disponibles

  Scenario: Consulta de un usuario específico
    Given el sistema tiene varios usuarios registrados
    When el usuario pide la información del perfil con id 1
    Then se devuelve el objeto de usuario que incluye nombre y correo
