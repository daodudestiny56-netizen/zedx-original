/**
 * ZedX Original - Authentication Logic
 * Powered by Cocobase
 */

document.addEventListener('DOMContentLoaded', async () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Handle OAuth Callbacks if any
    handleOAuthCallback();

    // Social Login Listeners
    document.querySelectorAll('.social-auth button').forEach(btn => {
        btn.addEventListener('click', () => {
            const providerName = btn.textContent.trim().toLowerCase();
            initiateOAuth(providerName);
        });
    });
});

/**
 * Handle OAuth Authentication Initiation
 */
function initiateOAuth(provider) {
    showToast(`${provider} Uplink initialized...`);
    
    // In a real Cocobase setup, you would redirect to your OAuth provider URL
    // These URLs should be configured in your Cocobase dashboard
    // Example initiation (Replace with your actual OAuth URLs):
    if (provider.includes('google')) {
        // Redirect to Google OAuth (Usually handled via Google Identity Services or simple redirect if configured)
        showToast("Redirecting to Google Identity Protocol...");
        // window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/login.html')}&response_type=code&scope=email%20profile`;
    } else if (provider.includes('github')) {
        showToast("Connecting to GitHub Neural Net...");
        // window.location.href = `https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/login.html')}`;
    }
}

/**
 * Handle OAuth Callback when returning from provider
 */
async function handleOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state'); // In case state is used
    
    if (code && CONFIG.COCOBASE_ENABLED && db) {
        try {
            showToast("Syncing identity with Cocobase...");
            let user;
            
            // Note: In v1.3.1+, use db.auth namespace
            // Detect if returning from Github or Google based on URL or state
            // This is a simplified example
            if (window.location.href.includes('github') || state === 'github') {
                user = await db.auth.loginWithGithub({
                    code: code,
                    redirectUri: window.location.origin + window.location.pathname,
                    platform: 'web'
                });
            } else {
                // Default to google if no specific indicator
                user = await db.auth.loginWithGoogle({
                    idToken: code, // Or exchange code for token if your flow requires
                    platform: 'web'
                });
            }

            if (user) {
                showToast(`Welcome, Agent ${user.name || user.email}!`);
                localStorage.setItem('zedx_user_session', JSON.stringify({
                    name: user.name || user.email.split('@')[0],
                    email: user.email,
                    photo: user.photo
                }));
                setTimeout(() => window.location.href = 'index.html', 1500);
            }
        } catch (error) {
            console.error("OAuth Error:", error);
            showToast("OAuth Sync Failed: " + error.message);
        }
    }
}

/**
 * Handle Login via Cocobase
 */
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('loginBtn');

    if (password.length < 6) {
        showToast("Access Key must be at least 6 characters.");
        return;
    }

    try {
        setLoading(btn, true);

        if (CONFIG.COCOBASE_ENABLED && db) {
            console.log("Cocobase Auth: Logging in operative...", email);
            
            // Use db.auth.login (v1.3.1+)
            const result = await db.auth.login({ email, password });
            
            if (result.requires_2fa) {
                showToast("Verification Code Required. Check your secure line.");
                // Here you would show a 2FA input field
                return;
            }

            const user = result.user;
            showToast("Neural link established! Welcome back.");
            
            localStorage.setItem('zedx_user_session', JSON.stringify({ 
                name: user?.name || email.split('@')[0],
                email: email 
            }));
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Mock persistence fallback (Same as before)
            const users = JSON.parse(localStorage.getItem('zedx_mock_users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                showToast(`Welcome back, Agent ${user.name.split(' ')[0]}!`);
                localStorage.setItem('zedx_user_session', JSON.stringify(user));
                setTimeout(() => window.location.href = 'index.html', 1500);
            } else {
                throw new Error("Invalid credentials in local system.");
            }
        }
    } catch (error) {
        console.error("Auth Error:", error);
        showToast("Access Denied: " + error.message);
    } finally {
        setLoading(btn, false);
    }
}

/**
 * Handle Signup via Cocobase
 */
async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('signupBtn');

    if (password.length < 6) {
        showToast("Access Key security insufficient (min 6 chars).");
        return;
    }

    try {
        setLoading(btn, true);

        if (CONFIG.COCOBASE_ENABLED && db) {
            console.log("Cocobase Auth: Registering new identity...", email);
            // Use db.auth.register (v1.3.1+)
            await db.auth.register({
                email,
                password,
                data: { name }
            });
            
            showToast("Identity registered in the global grid!");
            setTimeout(() => window.location.href = 'login.html', 1500);
        } else {
            // Mock persistence fallback
            const users = JSON.parse(localStorage.getItem('zedx_mock_users') || '[]');
            if (users.some(u => u.email === email)) throw new Error("Neural ID already exists.");

            users.push({ name, email, password });
            localStorage.setItem('zedx_mock_users', JSON.stringify(users));
            showToast("Neural Profile Created. Synchronization required.");
            setTimeout(() => window.location.href = 'login.html', 1500);
        }
    } catch (error) {
        console.error("Auth Error:", error);
        showToast("Sync Error: " + error.message);
    } finally {
        setLoading(btn, false);
    }
}

/**
 * Helper to show loading state on buttons
 */
function setLoading(btn, isLoading) {
    if (isLoading) {
        btn.disabled = true;
        btn.dataset.originalText = btn.innerHTML;
        btn.innerHTML = 'SYNCING...';
    } else {
        btn.disabled = false;
        btn.innerHTML = btn.dataset.originalText;
    }
}

/**
 * Reuse toast from main/home if possible, or simple fallback
 */
function showToast(message) {
    // Check if global showToast exists
    if (typeof window.showToast === 'function') {
        window.showToast(message);
    } else {
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
}
