/* =====================================================
   Sesión 7 · Lightbox de la galería
   Al hacer clic en una imagen se muestra ampliada;
   al hacer clic fuera de ella o en la X, se cierra.
   ===================================================== */

// Esperamos a que todo el HTML esté cargado antes de buscar los elementos
document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");        // fondo oscuro
    const lightboxImg = document.getElementById("lightbox-img"); // imagen grande
    const closeBtn = document.querySelector(".close");           // la X

    // Para cada imagen de la galería: al hacer clic, mostramos el lightbox
    document.querySelectorAll("#galeria img").forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";  // lo hacemos visible
            lightboxImg.src = img.src;        // copiamos la imagen en la ventana grande
        });
    });

    // Clic en la X: ocultamos el lightbox
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Clic en el fondo oscuro (no en la imagen): ocultamos el lightbox
    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });
});
