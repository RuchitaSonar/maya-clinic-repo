document.querySelector('form[name="appointmentForm"]').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect selected checkbox values
    const checkboxes = document.querySelectorAll('input[name="your-subject"]:checked');
    const selectedSubjects = Array.from(checkboxes).map(checkbox => checkbox.value);

    // Add to hidden input
    const hiddenInput = document.querySelector('#your-subjects');
    hiddenInput.value = selectedSubjects.join(', ');

    // Validation flags
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.form-floating').forEach(el => {
        el.classList.remove('is-invalid');
        const errorElement = el.querySelector('.error-message');
        if (errorElement) errorElement.remove();
    });

    // Helper to show errors
    function showError(inputElement, message) {
        const formGroup = inputElement.closest('.form-floating') || inputElement.closest('.products-checkbox');
        const errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
        isValid = false;
    }

    // Validate form fields
    const name = document.querySelector('#your-name');
    const email = document.querySelector('#your-email');
    const phone = document.querySelector('#your-phone');
    const message = document.querySelector('#your-message');

    if (!name.value.trim()) showError(name, 'Name is required.');
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) showError(email, 'Valid email is required.');
    if (!phone.value.trim() || !/^\d{10}$/.test(phone.value)) showError(phone, 'Valid 10-digit phone number is required.');
    if (selectedSubjects.length === 0) showError(document.querySelector('.products-checkbox'), 'Select at least one enquiry option.');
    if (!message.value.trim() || message.value.length < 10) showError(message, 'Message must be at least 10 characters.');

    // Submit if valid
    if (isValid) {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbw6iFxUlJ_WYfkZIPZx-4SvMcQxz5hzoQaE6IoERO4p53399MYeMpZXWgGpubCZyN3i/exec';
        const form = document.forms['contact-form'];
        const formData = new FormData(form);

        document.querySelector('#new-form').classList.add('hide-div');
        document.querySelector('#result-loading').classList.remove('hide-div');
        document.querySelector('#form-submit').classList.add('hide-div');
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(() => {
                document.querySelector('#new-form').classList.add('hide-div');
                document.querySelector('#result-loading').classList.add('hide-div');
                document.querySelector('#form-submit').classList.remove('hide-div');
            })
            .catch(error => console.error('Error!', error.message));
    }
});
