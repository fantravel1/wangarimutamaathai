// ========================================
// SMOOTH SCROLL FOR QUICK NAV LINKS
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('.quick-nav-link');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.research-nav').offsetHeight;
                const quickNavHeight = document.querySelector('.quick-nav').offsetHeight;
                const offset = navHeight + quickNavHeight + 20;

                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Highlight the clicked link
                links.forEach(l => l.style.background = 'transparent');
                this.style.background = 'var(--light-cream)';
                this.style.color = 'var(--primary-green)';
            }
        });
    });
}

// ========================================
// ACTIVE SECTION HIGHLIGHTING
// ========================================

function highlightActiveSection() {
    const sections = document.querySelectorAll('.resource-section');
    const navLinks = document.querySelectorAll('.quick-nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        navLinks.forEach(l => {
                            l.style.background = 'transparent';
                            l.style.color = 'var(--earth-brown)';
                        });
                        link.style.background = 'var(--light-cream)';
                        link.style.color = 'var(--primary-green)';
                    }
                });
            }
        });
    }, {
        rootMargin: '-150px 0px -50% 0px',
        threshold: 0
    });

    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

function createBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);

    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-green);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 999;
        }

        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .back-to-top:hover {
            background: var(--secondary-green);
            transform: translateY(-4px);
            box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
        }

        .back-to-top:active {
            transform: translateY(-2px);
        }

        @media (max-width: 640px) {
            .back-to-top {
                width: 45px;
                height: 45px;
                bottom: 1.5rem;
                right: 1.5rem;
            }
        }
    `;
    document.head.appendChild(style);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

function createSearchBox() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text"
               class="search-input"
               placeholder="Search resources..."
               aria-label="Search resources">
        <div class="search-results"></div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .search-container {
            max-width: 600px;
            margin: 2rem auto;
            padding: 0 1rem;
        }

        .search-input {
            width: 100%;
            padding: 1rem 1.5rem;
            font-size: 1rem;
            border: 2px solid var(--light-cream);
            border-radius: 30px;
            background: white;
            transition: all 0.3s ease;
            font-family: var(--font-sans);
        }

        .search-input:focus {
            outline: none;
            border-color: var(--primary-green);
            box-shadow: 0 4px 20px rgba(45, 90, 61, 0.1);
        }

        .search-results {
            margin-top: 1rem;
            font-size: 0.9rem;
            color: var(--earth-brown);
        }
    `;
    document.head.appendChild(style);

    // Insert after hero section
    const hero = document.querySelector('.research-hero');
    hero.after(searchContainer);

    // Search functionality
    const searchInput = searchContainer.querySelector('.search-input');
    const searchResults = searchContainer.querySelector('.search-results');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const searchTerm = e.target.value.toLowerCase().trim();

        if (searchTerm.length < 2) {
            // Clear highlighting
            document.querySelectorAll('.resource-card, .resource-item').forEach(item => {
                item.style.display = '';
                item.style.opacity = '1';
            });
            searchResults.textContent = '';
            return;
        }

        searchTimeout = setTimeout(() => {
            let matches = 0;
            const allItems = document.querySelectorAll('.resource-card, .resource-item');

            allItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = '';
                    item.style.opacity = '1';
                    matches++;
                } else {
                    item.style.opacity = '0.3';
                    item.style.filter = 'blur(1px)';
                }
            });

            searchResults.textContent = `Found ${matches} resource${matches !== 1 ? 's' : ''} matching "${searchTerm}"`;
        }, 300);
    });
}

// ========================================
// LAZY LOADING FOR PERFORMANCE
// ========================================

function initLazyLoad() {
    const cards = document.querySelectorAll('.resource-card, .resource-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px'
    });

    cards.forEach(card => observer.observe(card));
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Escape to clear search
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('.search-input');
            if (searchInput && searchInput === document.activeElement) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        }
    });
}

// ========================================
// PRINT OPTIMIZATION
// ========================================

function optimizeForPrint() {
    window.addEventListener('beforeprint', () => {
        // Expand all collapsed content
        document.querySelectorAll('.resource-card, .resource-item').forEach(item => {
            item.style.pageBreakInside = 'avoid';
        });
    });
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

function enhanceAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#books';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';

    const style = document.createElement('style');
    style.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary-green);
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            z-index: 10000;
        }

        .skip-link:focus {
            top: 0;
        }
    `;
    document.head.appendChild(style);
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Ensure all interactive elements are keyboard accessible
    document.querySelectorAll('.resource-card, .resource-item').forEach(item => {
        item.setAttribute('tabindex', '0');
    });
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

function logPerformance() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Research page load time: ${pageLoadTime}ms`);

                // Count resources
                const totalResources = document.querySelectorAll('.resource-card, .resource-item').length;
                console.log(`Total resources loaded: ${totalResources}`);
            });
        }
    }
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
    // Core functionality
    initSmoothScroll();
    highlightActiveSection();
    createBackToTop();
    createSearchBox();

    // Performance
    initLazyLoad();

    // Enhancements
    initKeyboardShortcuts();
    optimizeForPrint();
    enhanceAccessibility();

    // Development
    logPerformance();

    console.log('Research page initialized successfully');
}

// ========================================
// DOM READY
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
