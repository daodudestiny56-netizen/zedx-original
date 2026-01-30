/**
 * ZedX Original - Home Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedProducts();
});

async function renderFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    try {
        let featured;
        
        // Try to fetch from Cocobase if enabled and connected
        if (CONFIG.COCOBASE_ENABLED && db) {
            console.log("Cocobase: Fetching featured products...");
            const remoteProducts = await db.listDocuments("products");
            featured = remoteProducts.filter(p => p.featured).slice(0, 3);
            
            // If empty, fallback to mock
            if (!featured.length) featured = PRODUCTS.slice(0, 3);
        } else {
            // Default mock behavior
            featured = PRODUCTS.slice(0, 3);
        }

        container.innerHTML = featured.map(product => `
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

        initAnimations();
    } catch (error) {
        console.error("Cocobase fetch error:", error);
        // Robust fallback
        const featured = PRODUCTS.slice(0, 3);
        // ... same innerHTML logic ...
        container.innerHTML = featured.map(product => `
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
        initAnimations();
    }
}

/**
 * Quick addToCart for Home page
 */
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.CART) || '[]');
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify(cart));
    updateCartCounter();
    
    // Feedback notification (simple alert or toast)
    showToast(`${product.name} added to cart!`);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('active');
        setTimeout(() => {
            toast.classList.remove('active');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }, 100);
}
