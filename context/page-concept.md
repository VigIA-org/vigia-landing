Rol: Desarrollador Frontend Senior y Especialista en UX/UI con dominio de animaciones de alto rendimiento.

Objetivo: Construir la landing page de "VigIA" utilizando Astro, Tailwind CSS y GSAP.

Concepto: "The Silent Guardian" (Seguridad, Poder y Navegación Cinematográfica).
1. Fundamentos de Diseño (Tailwind Config)

    Fondo: Gris carbonado profundo (#121212).

    Tipografía:

        Cuerpo: Fuente sans-serif limpia y moderna (Geist o Inter).

        Acentos y Títulos: Fuente técnica monoespaciada (JetBrains Mono).

    Colores: Azul Cobalto para acentos de poder y Verde Esmeralda para estados de actividad del sistema.

2. Experiencia Visual y Navegación 3D (GSAP)

    Transición Cinematográfica (Parallax Z): Las secciones no deben simplemente deslizarse hacia arriba. Al hacer scroll, la sección actual debe escalarse y desvanecerse (zoom-out) mientras la siguiente sección emerge desde la profundidad (zoom-in), simulando el movimiento de una cámara de cine a través de un espacio tridimensional.

    Hero Section: Fondo con video en loop sutil que muestre el modelo YOLOv26 detectando objetos en tiempo real con bounding boxes.

    Retícula del Mouse (Interactive HUD):

        Implementar un cursor personalizado tipo retícula en SVG.

        Selector de Mira: Control flotante para cambiar el estilo de la retícula (Punto Simple, Cruz Táctica, Advanced Sight tipo Call of Duty).

    Física de Movimiento: Usar GSAP ScrollTrigger con un ligero scrub (suavizado) para que el usuario sienta que tiene el control total de la "cámara" durante la navegación.

3. Estructura de Contenido (Jerarquía de Información)

    Hero: Headline impactante con acentos en Azul Cobalto.

    Narrativa del Problema: Espacios limpios y tipografía clara.

    VigIA Engine: Sección técnica con el "Pulso" del sistema en Verde Esmeralda.

    Integración de Feedback: Visualización del bot de Telegram y la base de datos SQLite.

    Especificaciones Técnicas: Grid espacioso con detalles en fuente monoespaciada.

4. Restricciones Técnicas

    Framework: Astro (Static Site Generation) para carga instantánea.

    Animaciones: GSAP para la lógica de profundidad (Z-axis), el cursor y los estados del sistema.

    Optimización: Usar capas de GPU para las transiciones 3D para evitar tirones (lags) en el navegador.

    Responsividad: En dispositivos móviles, simplificar la transición 3D a un desvanecimiento suave para mantener la usabilidad.
