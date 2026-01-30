/**
 * ZedX Original - Global Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSearchModal();
    initAnimations();
    updateCartCounter();
});

/**
 * Navbar transparent to solid on scroll & User Session check
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // User session check
    const userSession = JSON.parse(localStorage.getItem('zedx_user_session'));
    const loginLink = document.querySelector('a[href="login.html"]');
    
    if (userSession && loginLink) {
        // Change login icon to logout/profile
        loginLink.href = '#';
        loginLink.title = `Logout (${userSession.name || userSession.email})`;
        loginLink.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-primary)" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
        `;
        
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Terminate neural link (Logout)?')) {
                localStorage.removeItem('zedx_user_session');
                window.location.reload();
            }
        });
    }
}

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

/**
 * Search Modal Logic
 */
function initSearchModal() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchBtn && searchModal) {
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('active');
            setTimeout(() => searchInput.focus(), 300);
        });

        searchClose.addEventListener('click', () => {
            searchModal.classList.remove('active');
        });

        // Close on escape
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchModal.classList.contains('active')) {
                searchModal.classList.remove('active');
            }
        });

        // Close on clicking outside
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });

        // Basic Search Logic
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            const filtered = PRODUCTS.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.category.toLowerCase().includes(query)
            );

            renderSearchResults(filtered);
        });
    }
}

function renderSearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    if (results.length === 0) {
        searchResults.innerHTML = '<p style="padding: 20px; text-align: center;">No products found.</p>';
        return;
    }

    searchResults.innerHTML = results.map(p => `
        <a href="product.html?id=${p.id}" class="search-result-item" style="display: flex; align-items: center; gap: 15px; padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); color: white;">
            <img src="${p.image}" alt="${p.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
            <div>
                <div style="font-weight: 600;">${p.name}</div>
                <div style="color: var(--color-accent-primary);">$${p.price}</div>
            </div>
        </a>
    `).join('');
}

/**
 * Basic AOS (Animate On Scroll) implementation
 */
function initAnimations() {
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    aosElements.forEach(el => observer.observe(el));
    
    // Count Up Animation for Stats
    const statsValues = document.querySelectorAll('.stat-value[data-count]');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateValue(entry.target, 0, target, 2000);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsValues.forEach(val => statsObserver.observe(val));
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = end.toLocaleString() + '+';
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Global Cart Functions
 */
function updateCartCounter() {
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        const cart = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.CART) || '[]');
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountEl.textContent = count;
        
        // Add animation effect
        cartCountEl.classList.add('cart-bump');
        setTimeout(() => cartCountEl.classList.remove('cart-bump'), 300);
    }
}
