/* =====================================================
   Sesión 9 · Menú desplegable para celulares
   El botón ☰ agrega o quita la clase "active" del menú;
   en el CSS, esa clase hace que el menú se abra.
   ===================================================== */

const menuToggle = document.getElementById("menu-cel"); // botón ☰
const menu = document.getElementById("menu");           // lista del menú

// Cada clic en ☰ abre o cierra el menú
menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// Al elegir una opción del menú, lo cerramos para ver la sección
document.querySelectorAll("#menu a").forEach(enlace => {
    enlace.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});
