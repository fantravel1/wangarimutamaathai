// ========================================
// VIDEO CATEGORY FILTERING
// ========================================

function initVideoFiltering() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const videoCards = document.querySelectorAll('.video-card');
    const videoSections = document.querySelectorAll('.video-section');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;

            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter videos
            if (category === 'all') {
                videoSections.forEach(section => section.classList.remove('hidden'));
                videoCards.forEach(card => card.classList.remove('hidden'));
            } else {
                videoSections.forEach(section => {
                    if (section.dataset.category === category) {
                        section.classList.remove('hidden');
                    } else {
                        section.classList.add('hidden');
                    }
                });
            }

            // Smooth scroll to first visible section
            const firstVisible = document.querySelector('.video-section:not(.hidden)');
            if (firstVisible && category !== 'all') {
                setTimeout(() => {
                    firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
    initVideoFiltering();
    console.log('Video library initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
