// Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Back to top button
        const backToTopButton = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });

        // Auto-scrolling services
        const servicesContainer = document.getElementById('services-scroll');
        const scrollDots = document.querySelectorAll('.scroll-dot');
        let currentIndex = 0;
        let autoScrollInterval;
        
        // Function to scroll to a specific index
        function scrollToIndex(index) {
            const serviceCards = document.querySelectorAll('.service-card');
            if (index >= serviceCards.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = serviceCards.length - 1;
            } else {
                currentIndex = index;
            }
            
            const card = serviceCards[currentIndex];
            const containerWidth = servicesContainer.offsetWidth;
            const cardWidth = card.offsetWidth;
            const scrollPosition = card.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
            
            servicesContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            // Update active dot
            scrollDots.forEach(dot => dot.classList.remove('active'));
            scrollDots[currentIndex].classList.add('active');
        }
        
        // Start auto-scrolling
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                scrollToIndex(currentIndex + 1);
            }, 2000); // Change every 2 seconds
        }
        
        // Pause auto-scrolling when hovering over services
        servicesContainer.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        // Resume auto-scrolling when mouse leaves
        servicesContainer.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
        
        // Click handler for scroll dots
        scrollDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                scrollToIndex(index);
                clearInterval(autoScrollInterval);
                startAutoScroll();
            });
        });
        
        // Initialize auto-scrolling
        startAutoScroll();