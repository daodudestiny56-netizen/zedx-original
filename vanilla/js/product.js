/**
 * ZedX Original - Product Detail Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        window.location.href = 'shop.html';
        return;
    }

    renderProductDetail(productId);
});

function renderProductDetail(id) {
    const container = document.getElementById('productContainer');
    const product = PRODUCTS.find(p => p.id === id);

    if (!product) {
        container.innerHTML = `
            <div style="text-align: center; padding: 100px 0;">
                <h1 class="section-title">404: OBJECT NOT FOUND</h1>
                <p>The requested data node does not exist in our database.</p>
                <a href="shop.html" class="btn btn-primary" style="margin-top: 20px;">Return to Shop</a>
            </div>
        `;
        return;
    }

    // Update Page Title
    document.title = `${product.name} - ZedX Original`;

    setTimeout(() => {
        container.innerHTML = `
            <div class="product-detail-layout">
                <div class="product-gallery" data-aos="fade-right">
                    <div class="main-image-wrapper" style="background: rgba(0,0,0,0.3); border-radius: 20px; overflow: hidden; border: 1px solid var(--color-accent-primary); position: relative;">
                        ${product.badge ? `<div class="product-badge" style="z-index: 10;">${product.badge}</div>` : ''}
                        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto; display: block; filter: contrast(1.1);">
                    </div>
                </div>
                
                <div class="product-info-panel" data-aos="fade-left">
                    <div class="product-category" style="color: var(--color-accent-primary); letter-spacing: 2px; text-transform: uppercase;">${product.category}</div>
                    <h1>${product.name}</h1>
                    
                    <div class="product-price" style="font-size: 2.5rem; font-family: var(--font-heading); font-weight: 700; margin-bottom: 30px;">$${product.price}</div>
                    
                    <p style="font-size: 1.2rem; color: var(--color-text-secondary); margin-bottom: 40px; line-height: 1.8;">${product.description}</p>
                    
                    <div class="specs-grid">
                        ${product.features.map(f => `
                            <div style="display: flex; align-items: center; gap: 10px; color: var(--color-text-primary);">
                                <span style="color: var(--color-accent-primary);">⚡</span> ${f}
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="purchase-actions" style="display: flex; gap: 20px; align-items: center;">
                        <div class="quantity-selector" style="display: flex; align-items: center; background: rgba(255,255,255,0.1); border-radius: 8px; border: 1px solid var(--color-accent-primary);">
                            <button onclick="changeQty(-1)" style="padding: 15px 20px; background: transparent; color: white;">-</button>
                            <input type="number" id="purchaseQty" value="1" min="1" style="width: 50px; text-align: center; border: none; background: transparent; color: white; font-weight: 700;">
                            <button onclick="changeQty(1)" style="padding: 15px 20px; background: transparent; color: white;">+</button>
                        </div>
                        <button class="btn btn-primary" onclick="handleAddToCart('${product.id}')" style="flex: 1;">ADD TO SYSTEM (CART)</button>
                    </div>
                </div>
            </div>
        `;
        
        renderRelatedProducts(product.category, product.id);
        if (typeof initAnimations === 'function') initAnimations();
    }, CONFIG.MOCK_DB_DELAY);
}

function changeQty(amt) {
    const input = document.getElementById('purchaseQty');
    if (!input) return;
    let val = parseInt(input.value) + amt;
    if (val < 1) val = 1;
    input.value = val;
}

function handleAddToCart(productId) {
    const qtyInput = document.getElementById('purchaseQty');
    const quantity = parseInt(qtyInput.value);
    
    // Using global addToCart logic but with specific quantity
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.CART) || '[]');
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify(cart));
    if (typeof updateCartCounter === 'function') updateCartCounter();
    
    if (typeof showToast === 'function') {
        showToast(`${quantity} x ${product.name} added to cart!`);
    } else {
        alert(`${product.name} added to cart!`);
    }
}

function renderRelatedProducts(category, excludeId) {
    const container = document.getElementById('relatedProducts');
    if (!container) return;

    const related = PRODUCTS.filter(p => p.category === category && p.id !== excludeId).slice(0, 3);
    
    if (related.length === 0) {
        container.innerHTML = '<p>No related products found.</p>';
        return;
    }

    container.innerHTML = related.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-footer">
                    <div class="product-price">$${product.price}</div>
                    <a href="product.html?id=${product.id}" class="product-action-btn">
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}
