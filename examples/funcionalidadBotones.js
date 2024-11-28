// Selecciona todos los enlaces con la clase "abrir"
const btnAbrir = document.querySelectorAll(".abrir");

// Agrega un evento de clic a cada enlace
btnAbrir.forEach(btn => {
    btn.addEventListener("click", (event) => {
        event.preventDefault(); // Previene el comportamiento por defecto del enlace
        const modalId = btn.getAttribute("data-modal"); // Obtiene el ID del modal
        const modal = document.getElementById(modalId); // Selecciona el modal correspondiente
        modal.showModal(); // Muestra el modal
    });
});

// Cierra el modal al hacer clic fuera de él
document.querySelectorAll("dialog").forEach(modal => {
    modal.addEventListener("click", (event) => {
        // Verifica si el clic fue en el área de fondo del modal
        if (event.target === modal) {
            modal.close(); // Cierra el modal
        }
    });
});