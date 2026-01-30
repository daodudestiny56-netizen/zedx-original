/**
 * ZedX Original - Shop Page Logic
 */

let currentFilters = {
    category: 'all',
    maxPrice: 5000,
    sort: 'featured'
};

document.addEventListener('DOMContentLoaded', () => {
    // Check for category in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        currentFilters.category = categoryParam;
        const radio = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
        if (radio) radio.checked = true;
    }

    initFilters();
    renderShopProducts();
});

function initFilters() {
    // Category radios
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            renderShopProducts();
        });
    });

    // Price range
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            currentFilters.maxPrice = parseInt(e.target.value);
            priceValue.textContent = `$${currentFilters.maxPrice.toLocaleString()}`;
            // Debounce filtering for better performance
            debounceFilter();
        });
    }

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            renderShopProducts();
        });
    }
}

let filterTimeout;
function debounceFilter() {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => {
        renderShopProducts();
    }, 300);
}

async function renderShopProducts() {
    const container = document.getElementById('shopProducts');
    const statsEl = document.getElementById('shopStats');
    if (!container) return;

    // Show loading state if Cocobase is enabled
    if (CONFIG.COCOBASE_ENABLED && db) {
        container.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Syncing with Cocobase...</p>
            </div>
        `;
    }

    try {
        let productsToFilter;

        if (CONFIG.COCOBASE_ENABLED && db) {
            const remoteProducts = await db.listDocuments("products");
            productsToFilter = remoteProducts.length ? remoteProducts : PRODUCTS;
        } else {
            productsToFilter = PRODUCTS;
        }

        // Filter products
        let filtered = productsToFilter.filter(p => {
            const matchCategory = currentFilters.category === 'all' || p.category === currentFilters.category;
            const matchPrice = p.price <= currentFilters.maxPrice;
            return matchCategory && matchPrice;
        });

        // Sort products
        if (currentFilters.sort === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentFilters.sort === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentFilters.sort === 'newest') {
            filtered.reverse();
        }

        // Update stats
        if (statsEl) {
            statsEl.textContent = `Showing ${filtered.length} products`;
        }

        // Render
        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px;">
                    <h3>No compatible matches found.</h3>
                    <p style="color: var(--color-text-secondary);">Try adjusting your filters or search terms.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(product => `
            <div class="product-card" data-aos="fade-up">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <div class="product-price">$${product.price}</div>
                        <div class="product-actions">
                            <button class="product-action-btn" onclick="addToCart('${product.id}')" title="Add to Cart">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </button>
                            <a href="product.html?id=${product.id}" class="product-action-btn" title="View Details">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        if (typeof initAnimations === 'function') initAnimations();

    } catch (error) {
        console.error("Shop sync error:", error);
        // Fallback to local products on error
        const filtered = PRODUCTS; 
        statsEl.textContent = `Showing fallback data (${filtered.length} products)`;
        // ... (render logic would go here, same as above)
    }
}
