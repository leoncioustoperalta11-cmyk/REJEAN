/* =====================================================
   Sesión 6 · Slider automático
   Mueve el contenedor #sliders hacia la izquierda cada
   4 segundos para mostrar la siguiente diapositiva.
   ===================================================== */

// Posición de la diapositiva que se está mostrando (0 = la primera)
let currentIndex = 0;

// Guardamos todas las diapositivas para saber cuántas hay
const slides = document.querySelectorAll('.slide');

// setInterval repite la función cada cierto tiempo (4000 ms = 4 segundos)
setInterval(() => {
    // Sumamos 1; el % (módulo) hace que al llegar a la última vuelva a la primera
    currentIndex = (currentIndex + 1) % slides.length;

    // Desplazamos el contenedor: -0%, -100%, -200%, -300%...
    document.querySelector('#sliders').style.transform = `translateX(${-currentIndex * 100}%)`;
}, 4000);
