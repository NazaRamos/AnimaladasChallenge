function submitForm() {
    var form = document.getElementById('contactForm');
    var isValid = form.checkValidity();
    
    if (isValid) {
        var confirmationDiv = document.getElementById('confirmation');
        confirmationDiv.innerHTML = '<p class="text-success">¡Gracias por su mensaje! Su consulta/comentario se envió correctamente.</p>';
        form.reset();
    } else {
        form.reportValidity();
    }
}