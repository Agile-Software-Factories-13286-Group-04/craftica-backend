Feature: Interacción Mediante Comentarios en Publicaciones

  Scenario: Comentario exitoso en una publicación
    Given el usuario ha iniciado sesión y visualiza una publicación artesanal
    When escribe un comentario y lo envía
    Then el sistema guardo el comentario y lo muestra junto a la publicación.

  Scenario: Reacción exitosa a una publicación
    Given el usuario está navegando por las publicaciones artesanales
    When presiona el botón de “me gusta” en una publicación
    Then el sistema registra la acción y actualiza el contador de “me gusta”.

  Scenario: Comentario sin contenido
    Given el usuario intenta enviar un comentario vacío
    When presiona el botón de enviar
    Then el sistema muestra un mensaje de error.


