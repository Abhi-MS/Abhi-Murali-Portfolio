const btnEl = document.querySelector(".btn");

btnEl.addEventListener("mouseover", (event)=>{
    const x = event.pageX - btnEl.offsetLeft;
    const y = event.pageY - btnEl.offsetTop;

    btnEl.style.setProperty("--xPos", x + "px");
    btnEl.style.setProperty("--yPos", y + "px");
});

// Dynamic navbar on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('#home');
    const heroHeight = heroSection.offsetHeight;
    
    if (window.scrollY > heroHeight * 0.8) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Custom dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownSelected = document.getElementById('dropdownSelected');
    const dropdownOptions = document.getElementById('dropdownOptions');
    const selectedText = document.querySelector('.selected-text');
    const hiddenInput = document.getElementById('subject');
    const options = document.querySelectorAll('.dropdown-option');

    // Only proceed if dropdown elements exist
    if (dropdownSelected && dropdownOptions && selectedText && hiddenInput) {
        // Toggle dropdown
        dropdownSelected.addEventListener('click', function() {
            dropdownSelected.classList.toggle('active');
            dropdownOptions.classList.toggle('show');
        });

        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                const text = this.textContent;
                
                selectedText.textContent = text;
                selectedText.classList.remove('dropdown-placeholder');
                hiddenInput.value = value;
                
                dropdownSelected.classList.remove('active');
                dropdownOptions.classList.remove('show');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.custom-dropdown')) {
                dropdownSelected.classList.remove('active');
                dropdownOptions.classList.remove('show');
            }
        });

        // Set initial placeholder state
        selectedText.classList.add('dropdown-placeholder');
    }
});

// Contact method click handlers
document.addEventListener('DOMContentLoaded', function() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const url = this.getAttribute('data-url');
            
            if (action === 'email') {
                window.location.href = url;
            } else if (action === 'link') {
                window.open(url, '_blank');
            }
        });
    });
});

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const submitButton = document.querySelector('.submit-button');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Update button to show loading state
            const originalButtonContent = submitButton.innerHTML;
            submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            
            try {
                // Submit to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                    
                    // Clear the form
                    contactForm.reset();
                    
                    // Reset dropdown to placeholder state
                    const selectedText = document.querySelector('.selected-text');
                    const hiddenInput = document.getElementById('subject');
                    if (selectedText && hiddenInput) {
                        selectedText.textContent = 'Choose your topic...';
                        selectedText.classList.add('dropdown-placeholder');
                        hiddenInput.value = '';
                    }
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                // Show error message
                showMessage('Oops! There was a problem sending your message. Please try again.', 'error');
            } finally {
                // Restore button
                submitButton.innerHTML = originalButtonContent;
                submitButton.disabled = false;
            }
        });
    }
});

// Function to show success/error messages
function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Insert message before the form
    const contactForm = document.querySelector('.contact-form');
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navOverlay = document.getElementById('navOverlay');
    const navCloseBtn = document.getElementById('navCloseBtn');
    const body = document.body;

    if (hamburgerBtn && navOverlay) {
        hamburgerBtn.addEventListener('click', function() {
            toggleNavMenu();
        });

        // Close button functionality
        if (navCloseBtn) {
            navCloseBtn.addEventListener('click', function() {
                closeNavMenu();
            });
        }

        // Close menu when clicking on overlay background
        navOverlay.addEventListener('click', function(e) {
            if (e.target === navOverlay) {
                closeNavMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
                closeNavMenu();
            }
        });
    }
});

function toggleNavMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navOverlay = document.getElementById('navOverlay');
    const body = document.body;

    hamburgerBtn.classList.toggle('active');
    navOverlay.classList.toggle('active');
    body.classList.toggle('nav-open');
}

function closeNavMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navOverlay = document.getElementById('navOverlay');
    const body = document.body;

    hamburgerBtn.classList.remove('active');
    navOverlay.classList.remove('active');
    body.classList.remove('nav-open');
}