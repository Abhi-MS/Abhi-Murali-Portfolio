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