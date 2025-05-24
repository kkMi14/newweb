document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: false
    });

    // Handle navigation
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const nextButtons = document.querySelectorAll('.next-button a');

    // Function to activate a section
    function activateSection(sectionId) {
        // Remove active class from all sections and nav links
        sections.forEach(section => {
            section.classList.remove('active-section');
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current section and corresponding nav link
        const currentSection = document.querySelector(sectionId);
        const currentNavLink = document.querySelector(`nav a[href="${sectionId}"]`);
        
        currentSection.classList.remove('active-section');
        
        // Force reflow to restart animation
        void currentSection.offsetWidth;
        
        currentSection.classList.add('active-section');
        currentNavLink.classList.add('active');
        
        // Scroll to top of the section
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Refresh AOS animations
        setTimeout(() => {
            AOS.refresh();
        }, 500);
    }

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href');
            activateSection(sectionId);
        });
    });

    // Add click event listeners to next buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href');
            activateSection(sectionId);
        });
    });

    // Handle hash changes for direct links
    function handleHashChange() {
        const hash = window.location.hash;
        if (hash && document.querySelector(hash)) {
            activateSection(hash);
        } else {
            // Default to first section if no hash or invalid hash
            activateSection('#traditional-farming');
        }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Check hash on initial load
    if (window.location.hash) {
        handleHashChange();
    }

    // Add animation to phone mockup
    const chatBubbles = document.querySelectorAll('.chat-bubble');
    const chatInput = document.querySelector('.chat-input');
    
    // Animate chat bubbles with a delay
    chatBubbles.forEach((bubble, index) => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            bubble.style.transition = 'all 0.5s ease';
            bubble.style.opacity = '1';
            bubble.style.transform = 'translateY(0)';
        }, 1000 + (index * 700));
    });
    
    // Animate chat input
    if (chatInput) {
        chatInput.style.opacity = '0';
        chatInput.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            chatInput.style.transition = 'all 0.5s ease';
            chatInput.style.opacity = '1';
            chatInput.style.transform = 'translateY(0)';
        }, 2500);
    }

    // Create a simple typing animation for the chat input
    const chatInputField = document.querySelector('.chat-input input');
    if (chatInputField) {
        const placeholderText = chatInputField.getAttribute('placeholder');
        chatInputField.setAttribute('placeholder', '');
        
        let i = 0;
        function typeWriter() {
            if (i < placeholderText.length) {
                chatInputField.setAttribute('placeholder', 
                    chatInputField.getAttribute('placeholder') + placeholderText.charAt(i));
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 3000);
    }
});
