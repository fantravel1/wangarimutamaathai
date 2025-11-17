// ========================================
// PROGRESS BAR
// ========================================

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    progressBar.style.width = scrollPercentage + '%';
}

// ========================================
// NAVIGATION VISIBILITY
// ========================================

function handleNavigation() {
    const nav = document.getElementById('nav');
    const cover = document.getElementById('cover');
    const coverBottom = cover.offsetTop + cover.offsetHeight;

    if (window.pageYOffset > coverBottom - 100) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }
}

// ========================================
// INTERSECTION OBSERVER FOR CHAPTERS
// ========================================

function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all chapters
    const chapters = document.querySelectorAll('.chapter');
    chapters.forEach(chapter => {
        observer.observe(chapter);
    });

    // Observe closing section
    const closing = document.querySelector('.closing');
    if (closing) {
        observer.observe(closing);
    }
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// PARALLAX EFFECT FOR IMAGES
// ========================================

function handleParallax() {
    const images = document.querySelectorAll('.chapter-image');

    images.forEach(image => {
        const container = image.closest('.chapter');
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

        if (scrollPercent >= 0 && scrollPercent <= 1) {
            const parallaxValue = (scrollPercent - 0.5) * 30;
            image.style.transform = `translateY(${parallaxValue}px) scale(1.05)`;
        }
    });
}

// ========================================
// DEBOUNCE FUNCTION FOR PERFORMANCE
// ========================================

function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// THROTTLE FUNCTION FOR SCROLL EVENTS
// ========================================

function throttle(func, limit = 16) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// LAZY LOADING IMAGES
// ========================================

function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.chapter-text, .chapter-image-container');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// ========================================
// COVER SECTION FADE OUT ON SCROLL
// ========================================

function handleCoverFade() {
    const cover = document.getElementById('cover');
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;

    if (scrollPosition < windowHeight) {
        const opacity = 1 - (scrollPosition / windowHeight);
        cover.style.opacity = Math.max(opacity, 0);
    }
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

function initKeyboardNavigation() {
    const chapters = Array.from(document.querySelectorAll('.chapter'));
    let currentChapterIndex = -1;

    document.addEventListener('keydown', (e) => {
        // Down arrow or Page Down
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            if (currentChapterIndex < chapters.length - 1) {
                currentChapterIndex++;
                chapters[currentChapterIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
        // Up arrow or Page Up
        else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if (currentChapterIndex > 0) {
                currentChapterIndex--;
                chapters[currentChapterIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            } else if (currentChapterIndex === 0) {
                document.getElementById('cover').scrollIntoView({
                    behavior: 'smooth'
                });
                currentChapterIndex = -1;
            }
        }
        // Home key
        else if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            currentChapterIndex = -1;
        }
        // End key
        else if (e.key === 'End') {
            e.preventDefault();
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
            currentChapterIndex = chapters.length - 1;
        }
    });

    // Update current chapter index on scroll
    const chapterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentChapterIndex = chapters.indexOf(entry.target);
            }
        });
    }, { threshold: 0.5 });

    chapters.forEach(chapter => chapterObserver.observe(chapter));
}

// ========================================
// ANIMATE STATS ON SCROLL
// ========================================

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

function logPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        });
    }
}

// ========================================
// ACCESSIBILITY: PREFERS REDUCED MOTION
// ========================================

function checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        document.documentElement.style.scrollBehavior = 'auto';
    }
}

// ========================================
// INIT ALL FUNCTIONS
// ========================================

function init() {
    // Check for reduced motion preference
    checkReducedMotion();

    // Initialize observers
    initIntersectionObserver();
    initLazyLoading();

    // Initialize interactions
    initSmoothScroll();
    initKeyboardNavigation();
    animateStats();

    // Scroll event listeners with throttling
    const throttledScroll = throttle(() => {
        updateProgressBar();
        handleNavigation();
        handleCoverFade();
        revealOnScroll();
    }, 16);

    const debouncedParallax = debounce(handleParallax, 10);

    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('scroll', debouncedParallax);

    // Initial calls
    updateProgressBar();
    handleNavigation();

    // Performance logging (optional)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        logPerformance();
    }
}

// ========================================
// DOM READY
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// EXPORT FOR TESTING (if needed)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateProgressBar,
        handleNavigation,
        initIntersectionObserver,
        debounce,
        throttle
    };
}
