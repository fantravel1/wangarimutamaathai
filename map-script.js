// ========================================
// MAP INTERACTIONS
// ========================================

function initMapInteractions() {
    const markers = document.querySelectorAll('.country-marker');

    markers.forEach(marker => {
        marker.addEventListener('click', () => {
            const country = marker.dataset.country;
            alert(`Explore ${country}'s impact in the regional section below!`);
        });
    });
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
    initMapInteractions();
    console.log('Impact map initialized');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
