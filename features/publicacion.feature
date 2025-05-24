Feature: Publicación de Productos Artesanales

  Scenario: Publicación exitosa de un producto artesanal
    Given el artesano ha iniciado sesión exitosamente
    When proporciona los datos requeridos para crear una publicación título, descripción, imágenes, precio, categoría y producto válido
    Then el sistema registra la publicación correctamente

  Scenario: Publicación sin imágenes adjuntas
    Given el artesando intenta publicar un producto
    When completa todos los campos excepto las imágenes
    Then el sistema muestra mensaje indicando que debe adjuntar al menos una imagen.

  Scenario: Asociación incorrecta de producto
    Given el artesano intenta publicar un producto
    When proporciona un producto que no pertenece a la categoría artística o cultural permitida
    Then no se registra la publicación y se muestra una alerta indicando que el producto no es válido

