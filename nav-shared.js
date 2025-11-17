// ========================================
// SHARED NAVIGATION FUNCTIONALITY
// ========================================

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.main-nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            toggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('.main-nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                toggle.textContent = '☰';
            });
        });
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}
