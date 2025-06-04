document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    function showSlide(index) {
        // Oculta la diapositiva actual
        slides[currentSlide].classList.remove('active');

        // Actualiza el índice
        currentSlide = index;

        // Muestra la nueva diapositiva
        slides[currentSlide].classList.add('active');

        // Actualiza el estado de los botones
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }

    // Event Listeners para los botones
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Mostrar la primera diapositiva inicialmente
    showSlide(0);

    // --- Navegación con Teclado ---
    document.addEventListener('keydown', (event) => {
        // Verifica si el botón "Anterior" existe y no está deshabilitado
        if (event.key === 'ArrowLeft' && prevBtn && !prevBtn.disabled) {
            prevBtn.click(); // Simula un clic en el botón "Anterior"
        }
        // Verifica si el botón "Siguiente" existe y no está deshabilitado
        else if (event.key === 'ArrowRight' && nextBtn && !nextBtn.disabled) {
            nextBtn.click(); // Simula un clic en el botón "Siguiente"
        }
    });
});