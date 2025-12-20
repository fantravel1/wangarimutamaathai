// ========================================
// IMPACT MAP INTERACTIONS
// ========================================

// Country data with descriptions
const countryData = {
    kenya: {
        name: 'Kenya',
        flag: '🇰🇪',
        description: 'The birthplace of the Green Belt Movement in 1977. Kenya remains the heart of the movement, with the most extensive network of tree nurseries and community groups.',
        highlight: 'origin'
    },
    ethiopia: {
        name: 'Ethiopia',
        flag: '🇪🇹',
        description: 'Inspired by Wangari\'s vision, Ethiopia launched massive reforestation campaigns. The country\'s Green Legacy Initiative has become one of the world\'s largest tree planting programs.',
        highlight: 'major'
    },
    uganda: {
        name: 'Uganda',
        flag: '🇺🇬',
        description: 'Adopted the Green Belt Movement model to protect Lake Victoria\'s watershed and combat deforestation, with strong focus on school-based tree planting programs.',
        highlight: 'major'
    },
    tanzania: {
        name: 'Tanzania',
        flag: '🇹🇿',
        description: 'Embraced community-led conservation from the late 1980s, focusing on coastal mangrove restoration and protecting the slopes of Mount Kilimanjaro.',
        highlight: 'major'
    },
    rwanda: {
        name: 'Rwanda',
        flag: '🇷🇼',
        description: 'Integrated GBM principles into post-genocide healing efforts, combining environmental restoration with community reconciliation through Umuganda planting days.',
        highlight: 'moderate'
    },
    burundi: {
        name: 'Burundi',
        flag: '🇧🇮',
        description: 'Adopted community-based tree planting to address deforestation and soil erosion in the densely populated Great Lakes region.',
        highlight: 'moderate'
    },
    malawi: {
        name: 'Malawi',
        flag: '🇲🇼',
        description: 'Implemented women-led reforestation programs inspired by the Green Belt Movement to address firewood shortages and protect Lake Malawi\'s watershed.',
        highlight: 'moderate'
    },
    zimbabwe: {
        name: 'Zimbabwe',
        flag: '🇿🇼',
        description: 'Community forestry initiatives following the GBM model, focusing on sustainable firewood production and watershed protection.',
        highlight: 'moderate'
    },
    drc: {
        name: 'DR Congo',
        flag: '🇨🇩',
        description: 'Grassroots conservation efforts in the Congo Basin inspired by Wangari\'s vision of community-led environmental protection.',
        highlight: 'growing'
    },
    nigeria: {
        name: 'Nigeria',
        flag: '🇳🇬',
        description: 'Women\'s groups adopted GBM methodology to combat desertification in the north and restore degraded farmlands across the country.',
        highlight: 'growing'
    },
    southafrica: {
        name: 'South Africa',
        flag: '🇿🇦',
        description: 'Environmental justice movements inspired by Wangari\'s approach, combining tree planting with community empowerment programs.',
        highlight: 'growing'
    },
    morocco: {
        name: 'Morocco',
        flag: '🇲🇦',
        description: 'North African reforestation efforts to combat desertification, drawing inspiration from the Green Belt Movement\'s grassroots model.',
        highlight: 'growing'
    },
    egypt: {
        name: 'Egypt',
        flag: '🇪🇬',
        description: 'Green initiatives in the Nile Delta region inspired by the Pan-African Green Belt Network, focusing on urban and peri-urban tree planting.',
        highlight: 'growing'
    }
};

// Format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toLocaleString();
}

// Initialize map interactions
function initMapInteractions() {
    const markers = document.querySelectorAll('.map-marker');
    const regions = document.querySelectorAll('.country-region');
    const popup = document.getElementById('countryPopup');
    const popupClose = popup?.querySelector('.popup-close');

    if (!popup) return;

    // Handle marker clicks
    markers.forEach(marker => {
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            const country = marker.dataset.country;
            showPopup(marker, country);
        });

        // Keyboard accessibility
        marker.setAttribute('tabindex', '0');
        marker.setAttribute('role', 'button');
        marker.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const country = marker.dataset.country;
                showPopup(marker, country);
            }
        });
    });

    // Handle region clicks
    regions.forEach(region => {
        region.addEventListener('click', (e) => {
            e.stopPropagation();
            const country = region.dataset.country;
            const marker = document.querySelector(`.map-marker[data-country="${country}"]`);
            if (marker) {
                showPopup(marker, country);
            }
        });
    });

    // Close popup
    if (popupClose) {
        popupClose.addEventListener('click', hidePopup);
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (popup.classList.contains('active') && !popup.contains(e.target)) {
            hidePopup();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            hidePopup();
        }
    });

    // Scroll to regional section when clicking "Learn more"
    initRegionLinks();
}

// Show popup with country info
function showPopup(marker, country) {
    const popup = document.getElementById('countryPopup');
    if (!popup || !country) return;

    const data = countryData[country];
    const trees = marker.dataset.trees || '0';
    const nurseries = marker.dataset.nurseries || '0';
    const women = marker.dataset.women || '0';

    // Update popup content
    const titleEl = popup.querySelector('.popup-title');
    const treesEl = document.getElementById('popupTrees');
    const nurseriesEl = document.getElementById('popupNurseries');
    const womenEl = document.getElementById('popupWomen');
    const descEl = document.getElementById('popupDescription');

    if (titleEl) titleEl.textContent = `${data?.flag || ''} ${data?.name || country}`;
    if (treesEl) treesEl.textContent = formatNumber(parseInt(trees));
    if (nurseriesEl) nurseriesEl.textContent = formatNumber(parseInt(nurseries));
    if (womenEl) womenEl.textContent = formatNumber(parseInt(women));
    if (descEl) descEl.textContent = data?.description || '';

    // Show popup
    popup.classList.add('active');

    // Focus the close button for accessibility
    const closeBtn = popup.querySelector('.popup-close');
    if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 100);
    }
}

// Hide popup
function hidePopup() {
    const popup = document.getElementById('countryPopup');
    if (popup) {
        popup.classList.remove('active');
    }
}

// Initialize region card links (scroll to section)
function initRegionLinks() {
    const markers = document.querySelectorAll('.map-marker');

    markers.forEach(marker => {
        marker.addEventListener('dblclick', (e) => {
            const country = marker.dataset.country;
            const regionCard = document.getElementById(`region-${country}`);
            if (regionCard) {
                hidePopup();
                regionCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                regionCard.classList.add('highlight-flash');
                setTimeout(() => regionCard.classList.remove('highlight-flash'), 2000);
            }
        });
    });
}

// Add highlight animation style dynamically
function addHighlightStyle() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlightFlash {
            0%, 100% { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); }
            50% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.5); }
        }
        .highlight-flash {
            animation: highlightFlash 0.5s ease-in-out 3;
        }
    `;
    document.head.appendChild(style);
}

// Add hover tooltips
function initTooltips() {
    const markers = document.querySelectorAll('.map-marker');

    markers.forEach(marker => {
        const country = marker.dataset.country;
        const data = countryData[country];

        if (data) {
            marker.setAttribute('aria-label', `${data.flag} ${data.name}: Click for details`);
        }
    });
}

// Animate connection lines on scroll
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.2 });

    const animatedElements = document.querySelectorAll('.timeline-item, .region-card, .category-card');
    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
    addHighlightStyle();
    initMapInteractions();
    initTooltips();
    initScrollAnimations();
    console.log('Impact map initialized successfully');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
