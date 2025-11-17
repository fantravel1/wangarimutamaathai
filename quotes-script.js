// ========================================
// QUOTE CATEGORY FILTERING
// ========================================

function initQuoteFiltering() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const quoteCards = document.querySelectorAll('.quote-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;

            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter quotes
            if (category === 'all') {
                quoteCards.forEach(card => card.classList.remove('hidden'));
            } else {
                quoteCards.forEach(card => {
                    const categories = card.dataset.category || '';
                    if (categories.includes(category)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }
        });
    });
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
    initQuoteFiltering();
    console.log('Quotes page initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
