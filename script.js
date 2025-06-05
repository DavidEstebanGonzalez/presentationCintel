document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const progressSteps = document.querySelectorAll('.progress-step');
    const diagramSteps = document.querySelectorAll('.diagram-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const stepSelector = document.getElementById('stepSelector');
    const darkMode = document.getElementById('dark-mode');
    const lightMode = document.getElementById('light-mode');
    const technicalDescription = document.getElementById('technical-description');
    
    // Estado actual
    let currentStep = 0; // Asegúrate que el paso inicial es 0
    
    // Descripciones técnicas para cada paso
    const descriptions = {
        3: "El proceso comienza con el registro de usuario, donde se capturan datos personales y biométricos faciales a través de dispositivos móviles o computadoras. Estos datos son la base para el reconocimiento posterior.",
        4: "La verificación de identidad conecta con la API de CINTEL para validar la autenticidad de la cédula proporcionada. Este paso es importante para garantizar que los datos biométricos estén asociados a una identidad real y verificada.",
        5: "Los datos verificados se envían al servidor backend, que los procesa y almacena de forma segura. La base de datos mantiene la información encriptada y organizada.",
        6: "Los embeddings son representaciones matemáticas de los rostros (vectores multidimensionales) que permiten comparar eficientemente las características faciales.",
        7: "El sistema procesa en tiempo real los streams de video de múltiples cámaras, detectando rostros y comparándolos con los embeddings almacenados para identificar a las personas registradas.",
        8: "La interfaz de monitoreo permite visualizar todas las cámaras, con marcación de rostros identificados vs. desconocidos.",
    };
    
    // Función para mostrar un paso específico
    function showStep(stepNumber) {
        // Ocultar todos los pasos
        diagramSteps.forEach(step => {
            step.classList.remove('active');
        });

        // Actualizar la barra de progreso
        progressSteps.forEach((step, index) => {
            if (index < stepNumber) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index === stepNumber) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        // Mostrar el paso actual
        document.getElementById(`step${stepNumber}`).classList.add('active');

        // Actualizar el selector de pasos
        stepSelector.value = stepNumber;

        // Actualizar la descripción técnica
        if (descriptions[stepNumber]) {
            technicalDescription.textContent = descriptions[stepNumber];
            technicalDescription.parentElement.style.display = '';
        } else {
            technicalDescription.textContent = '';
            technicalDescription.parentElement.style.display = 'none';
        }

        // Actualizar el estado de los botones
        prevBtn.disabled = stepNumber === 0;
        nextBtn.disabled = stepNumber === 9;

        // Actualizar el estado actual
        currentStep = stepNumber;

        // Iniciar animaciones específicas para cada paso
        startStepAnimations(stepNumber);
    }
    
    // Función para iniciar animaciones específicas para cada paso
    function startStepAnimations(stepNumber) {
        // Reiniciar todas las animaciones primero
        resetAllAnimations();
        
        // Animaciones específicas para cada paso
        switch(stepNumber) {
            case 1:
                // Animación de typing en el formulario
                animateTyping();
                break;
            case 2:
                // Animación de verificación
                setTimeout(() => {
                    document.querySelector('.status-indicator.success').style.opacity = '1';
                }, 1500);
                break;
            case 3:
                // Animación de datos entrando a la base de datos
                animateDataFlow('.backend-flow .data-packet', 3);
                break;
            case 4:
                // Animación de generación de embeddings
                animateDataFlow('.embeddings-flow .data-packet', 3);
                break;
            case 5:
                // Animación de detección facial
                document.querySelectorAll('.face-detection').forEach(el => {
                    el.style.display = 'block';
                });
                break;
            case 6:
                // Animación de alerta
                setTimeout(() => {
                    document.querySelector('.alert-item').classList.add('pulse-alert');
                }, 1000);
                break;
        }
    }
    
    // Función para reiniciar todas las animaciones
    function resetAllAnimations() {
        // Reiniciar animación de typing
        document.querySelectorAll('.form-field input').forEach(input => {
            input.style.animation = 'none';
        });
        
        // Reiniciar indicadores de verificación
        document.querySelectorAll('.status-indicator').forEach(indicator => {
            indicator.style.opacity = '0.5';
        });
        
        // Reiniciar detección facial
        document.querySelectorAll('.face-detection').forEach(el => {
            el.style.display = 'none';
        });
        
        // Reiniciar alertas
        document.querySelector('.alert-item')?.classList.remove('pulse-alert');
    }
    
    // Función para animar el typing en el formulario
    function animateTyping() {
        const inputs = document.querySelectorAll('.form-field input');
        inputs.forEach((input, index) => {
            setTimeout(() => {
                input.style.animation = 'typing 1s steps(20, end)';
                input.value = index === 0 ? 'Juan Pérez' : 
                             index === 1 ? '1234567890' : 
                             'juan.perez@ejemplo.com';
            }, index * 1000);
        });
    }
    
    // Función para animar el flujo de datos
    function animateDataFlow(selector, count) {
        const packets = document.querySelectorAll(selector);
        packets.forEach((packet, index) => {
            packet.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) { // Permite ir hasta el paso 0
            showStep(currentStep - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentStep < 8) {
            showStep(currentStep + 1);
        }
    });
    
    stepSelector.addEventListener('change', (e) => {
        showStep(parseInt(e.target.value));
    });
    
    // Event Listeners para los pasos en la barra de progreso
    progressSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            showStep(index + 1);
        });
    });
    
    // Cambio de tema claro/oscuro
    darkMode.addEventListener('click', () => {
        document.body.classList.remove('light-mode');
    });
    
    lightMode.addEventListener('click', () => {
        document.body.classList.add('light-mode');
    });
    
    // Inicializar tooltips para elementos con data-tooltip
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        element.appendChild(tooltip);
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && !prevBtn.disabled) {
            prevBtn.click();
        } else if (event.key === 'ArrowRight' && !nextBtn.disabled) {
            nextBtn.click();
        }
    });
    
    // Mostrar el primer paso al cargar
    showStep(0); // Cambia 1 por 0
    
    // Añadir clase para animación inicial
    setTimeout(() => {
        document.querySelector('.diagram-container').classList.add('loaded');
    }, 500);
});

    const totalSteps = 7; // Actualiza el número total de pasos

    function updateNavigation() {
        // Actualizar visibilidad de botones de navegación
        if (currentStep === 1) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }

        if (currentStep === totalSteps) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }

        // Actualizar el selector de pasos
        stepSelector.value = currentStep;
    }