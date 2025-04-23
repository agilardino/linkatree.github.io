$(document).ready(function() {
    // Configuración del modal
    const modalOverlay = $('#modalOverlay');
    const modalContainer = $('.modal-container');
    const modalBody = $('#modalBody');
    const modalTitle = $('#modalTitle');
    const closeModal = $('#closeModal');
    
    // Abrir modal con contenido interno
    $('.modal-trigger').on('click', function(e) {
        e.preventDefault();
        const target = $(this).data('target');
        const title = $(this).text() || $(this).attr('title') || 'Contenido';
        
        // Obtener y mostrar el contenido correspondiente
        const content = $('#' + target).html();
        modalBody.html(content);
        modalTitle.text(title);
        
        // Mostrar el overlay con animación
        modalOverlay.fadeIn(100, function() {
            modalOverlay.addClass('active');
        });
        
        $('body').css('overflow', 'hidden');
    });
    
    // Función para cerrar el modal
    function closeModalFunction() {
        modalBody.find('iframe').each(function(){
            const src = $(this).attr('src');
            $(this).attr('src', ''); //limpia el src
            $(this).attr('src', src);
        });

        modalOverlay.removeClass('active');
        setTimeout(function() {
            modalOverlay.fadeOut(200);
            $('body').css('overflow', 'auto');
        }, 200);
    }
    
    // Eventos para cerrar el modal
    closeModal.on('click', closeModalFunction);
    
    modalOverlay.on('click', function(e) {
        if (e.target === modalOverlay[0]) {
            closeModalFunction();
        }
    });
    
    $(document).on('keyup', function(e) {
        if (e.key === "Escape") {
            closeModalFunction();
        }
    });
});