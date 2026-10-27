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

// Mobile Projects Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('mobileProjectsTrack');
    const prevBtn = document.getElementById('mobilePrevBtn');
    const nextBtn = document.getElementById('mobileNextBtn');
    const dots = document.querySelectorAll('.mobile-carousel-dot');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.mobile-project-card').length;
    
    function updateCarousel() {
        const cards = document.querySelectorAll('.mobile-project-card');
        if (cards.length === 0) return;
        
        const container = document.querySelector('.mobile-projects-carousel');
        const containerWidth = container.offsetWidth;
        const cardElement = cards[0];
        const cardWidth = cardElement.offsetWidth;
        const cardMargin = 20; // margin on each side
        const totalCardWidth = cardWidth + (cardMargin * 2);
        
        // Simple centering: offset to center first card, then move by slide amount
        const centerOffset = (containerWidth - cardWidth) / 2 - cardMargin;
        const translateX = centerOffset - (currentSlide * totalCardWidth);
        
        console.log('Container width:', containerWidth);
        console.log('Card width:', cardWidth);
        console.log('Center offset:', centerOffset);
        console.log('Current slide:', currentSlide);
        console.log('Translate X:', translateX);
        
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update button states
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }
    
    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            currentSlide = slideIndex;
            updateCarousel();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Touch/swipe support
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Auto-play (optional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentSlide === totalSlides - 1) {
                currentSlide = 0;
            } else {
                currentSlide++;
            }
            updateCarousel();
        }, 4000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause on hover/touch
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);
    track.addEventListener('touchstart', stopAutoPlay);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setTimeout(updateCarousel, 50);
    });
    
    // Initialize with small delay to ensure DOM is ready
    setTimeout(updateCarousel, 100);
});

// Hashnode writing carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('writingCarousel');
    const slide = document.getElementById('writingSlide');
    const previousButton = document.getElementById('writingPrevious');
    const nextButton = document.getElementById('writingNext');
    const position = document.getElementById('writingPosition');

    if (!carousel || !slide || !previousButton || !nextButton || !position) return;

    const fallbackPosts = [
        {
            title: 'GSoC 2025: Building a Modern Network Monitoring Interface with SwitchMap-NG',
            url: 'https://abhimurali.hashnode.dev/gsoc-2025-building-a-modern-network-monitoring-interface-with-switchmap-ng'
        },
        {
            title: 'Optimizing Metrics Pipelines: From Database Design to Frontend Performance',
            url: 'https://abhimurali.hashnode.dev/from-database-design-to-frontend-performance'
        },
        {
            title: 'Breathing New Life into a Legacy UI with Next.js 15 & Tailwind CSS v4',
            url: 'https://abhimurali.hashnode.dev/modernize-flask-ui-nextjs-tailwind'
        },
        {
            title: "What's New in SwitchMap-NG: Connection Charts, Frontend Testing, and a Config UI",
            url: 'https://abhimurali.hashnode.dev/whats-new-in-switchmap-ng'
        }
    ];

    let posts = [];
    let currentIndex = 0;
    let usingFallback = true;

    function renderPost(post) {
        slide.replaceChildren();

        if (usingFallback) {
            const fallbackNotice = document.createElement('p');
            fallbackNotice.className = 'writing-status';
            fallbackNotice.textContent = 'Live Hashnode posts are unavailable; showing saved articles.';
            slide.append(fallbackNotice);
        }

        const heading = document.createElement('h3');
        heading.textContent = post.title;

        const metadata = document.createElement('p');
        metadata.className = 'writing-metadata';

        const publicationDate = document.createElement('time');
        if (post.publishedAt && !Number.isNaN(Date.parse(post.publishedAt))) {
            const date = new Date(post.publishedAt);
            publicationDate.dateTime = date.toISOString();
            publicationDate.textContent = date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } else {
            publicationDate.textContent = 'Date unavailable';
        }
        metadata.append(publicationDate);

        if (Number.isFinite(post.readTimeInMinutes) && post.readTimeInMinutes > 0) {
            const readTime = document.createElement('span');
            readTime.textContent = `${post.readTimeInMinutes} min read`;
            metadata.append(' · ', readTime);
        }

        const brief = document.createElement('p');
        brief.className = 'writing-brief';
        brief.textContent = post.brief || 'Read this article on Hashnode.';

        const link = document.createElement('a');
        link.href = post.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Read on Hashnode';

        slide.append(heading, metadata, brief, link);
        position.textContent = `${currentIndex + 1} of ${posts.length}`;
        previousButton.disabled = posts.length < 2;
        nextButton.disabled = posts.length < 2;
    }

    function showPost(index) {
        if (posts.length === 0) return;
        currentIndex = (index + posts.length) % posts.length;
        renderPost(posts[currentIndex]);
    }

    previousButton.addEventListener('click', () => showPost(currentIndex - 1));
    nextButton.addEventListener('click', () => showPost(currentIndex + 1));

    carousel.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            showPost(currentIndex - 1);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            showPost(currentIndex + 1);
        }
    });

    let touchStartX = null;
    carousel.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (event) => {
        if (touchStartX === null) return;
        const distance = touchStartX - event.changedTouches[0].clientX;
        touchStartX = null;
        if (Math.abs(distance) < 50) return;
        showPost(currentIndex + (distance > 0 ? 1 : -1));
    }, { passive: true });

    // Hashnode now gates GraphQL reads behind Pro, so this static page uses the requested fallback.
    posts = fallbackPosts.map((post) => ({
        ...post,
        brief: 'Read the full article on Hashnode.'
    }));
    showPost(0);
});