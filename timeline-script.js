// ========================================
// TIMELINE INTERSECTION OBSERVER
// ========================================

function initTimelineAnimations() {
    const events = document.querySelectorAll('.timeline-event');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    events.forEach(event => {
        observer.observe(event);
    });
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
    initTimelineAnimations();
    console.log('Timeline initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
