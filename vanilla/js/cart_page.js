/**
 * ZedX Original - Cart Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.CART) || '[]');
    const tableBody = document.getElementById('cartTableBody');
    const cartLayout = document.getElementById('cartLayout');
    const emptyCart = document.getElementById('emptyCart');

    if (cart.length === 0) {
        if (cartLayout) cartLayout.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        return;
    }

    if (cartLayout) cartLayout.style.display = 'grid';
    if (emptyCart) emptyCart.style.display = 'none';

    if (!tableBody) return;

    tableBody.innerHTML = cart.map((item, index) => `
        <tr>
            <td>
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div>
                        <div style="font-weight: 700; font-size: 1.1rem;">${item.name}</div>
                        <div style="color: var(--color-text-secondary); font-size: 0.9rem;">ID: ${item.id}</div>
                    </div>
                </div>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <div class="quantity-selector" style="display: flex; align-items: center; background: rgba(255,255,255,0.05); border-radius: 4px; width: fit-content; border: 1px solid rgba(0,240,255,0.2);">
                    <button onclick="updateQty(${index}, -1)" style="padding: 5px 12px; background: transparent; color: white;">-</button>
                    <span style="width: 30px; text-align: center; font-weight: 700;">${item.quantity}</span>
                    <button onclick="updateQty(${index}, 1)" style="padding: 5px 12px; background: transparent; color: white;">+</button>
                </div>
            </td>
            <td><strong style="color: var(--color-accent-primary);">$${(item.price * item.quantity).toFixed(2)}</strong></td>
            <td>
                <button onclick="removeItem(${index})" style="background: transparent; color: var(--color-error); border: 1px solid rgba(255,0,110,0.3); padding: 8px; border-radius: 4px; cursor: pointer; transition: all 0.3s;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');

    calculateTotals(cart);
}

function calculateTotals(cart) {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 1000 ? 0 : 50; // Mock shipping logic

    document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summaryShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `$${(subtotal + (shipping === 'FREE' ? 0 : shipping)).toFixed(2)}`;
}

function updateQty(index, delta) {
    let cart = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.CART) || '[]');
    cart[index].quantity += delta;
    
    if (cart[index].quantity < 1) {
        removeItem(index);
        return;
    }

    localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify(cart));
    renderCart();
    updateCartCounter();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.CART) || '[]');
    cart.splice(index, 1);
    localStorage.setItem(CONFIG.STORAGE_KEYS.CART, JSON.stringify(cart));
    renderCart();
    updateCartCounter();
}
