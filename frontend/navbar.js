// NavBar functionality for Amazon Clone
import { getUsers, createUser } from './api.js';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchForm = document.querySelector('.nav-search');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                // Redirect to search results page
                window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
            }
        });
        
        // Add real-time search suggestion functionality (Amazon-like)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            // Clear previous timeout
            clearTimeout(searchTimeout);
            
            // Set new timeout to debounce search
            searchTimeout = setTimeout(() => {
                const searchTerm = searchInput.value.trim();
                // In a real Amazon implementation, this would call an API for search suggestions
                // For now, we'll just let the user press enter or click search
            }, 300); // 300ms delay
        });
        
        // Handle Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }
    
    // Cart functionality
    const cartIcon = document.querySelector('.nav-cart');
    if (cartIcon) {
        // Update cart count on page load
        updateCartCount();
        
        // Listen for cart updates
        window.addEventListener('storage', updateCartCount);
    }
    
    // Wishlist functionality
    const wishlistIcon = document.querySelector('.nav-wishlist');
    if (wishlistIcon) {
        wishlistIcon.addEventListener('click', function() {
            // Check if user is logged in
            const token = localStorage.getItem('token');
            if (token) {
                // Redirect to wishlist page
                window.location.href = 'wishlist.html';
            } else {
                // Redirect to login page
                window.location.href = 'login.html';
            }
        });
    }
    
    // Sign in functionality
    const signInElement = document.querySelector('.nav-signin');
    if (signInElement) {
        signInElement.addEventListener('click', function(e) {
            // Prevent default behavior
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Sign in element clicked');
            
            // Check if user is already signed in
            const token = localStorage.getItem('token');
            
            console.log('User logged in:', !!token);
            
            if (token) {
                console.log('Redirecting to profile.html');
                // Redirect to profile page
                window.location.href = 'profile.html';
            } else {
                console.log('Redirecting to login.html');
                // Redirect to login page
                window.location.href = 'login.html';
            }
        });
    }
    
    // Update sign in status display
    function updateSignInStatus() {
        const signInText = document.querySelector('.nav-signin p span');
        const token = localStorage.getItem('token');
        let username = 'sign in';
        
        if (token) {
            try {
                // Decode JWT token to get user info
                const payload = JSON.parse(atob(token.split('.')[1]));
                username = payload.firstName || payload.email.split('@')[0] || 'User';
            } catch (e) {
                // If token is invalid, remove it
                console.error('Invalid token', e);
                localStorage.removeItem('token');
            }
        }
        
        if (signInText) {
            signInText.textContent = token ? `Hello, ${username}` : 'Hello, sign in';
        }
    }
    
    // Update cart count
    async function updateCartCount() {
        const token = localStorage.getItem('token');
        if (!token) {
            // If not logged in, hide cart count
            const cartElement = document.querySelector('.nav-cart');
            if (cartElement) {
                const existingBadge = cartElement.querySelector('.cart-count');
                if (existingBadge) {
                    existingBadge.remove();
                }
            }
            return;
        }
        
        try {
            const response = await fetch('http://localhost:5000/api/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const cart = await response.json();
                let totalCount = 0;
                
                if (cart.items) {
                    cart.items.forEach(item => {
                        totalCount += item.quantity || 0;
                    });
                }
                
                // Update cart display with a badge
                const cartElement = document.querySelector('.nav-cart');
                if (cartElement) {
                    // Remove any existing badge
                    const existingBadge = cartElement.querySelector('.cart-count');
                    if (existingBadge) {
                        existingBadge.remove();
                    }
                    
                    // Add badge if there are items
                    if (totalCount > 0) {
                        const badge = document.createElement('span');
                        badge.className = 'cart-count';
                        badge.textContent = totalCount;
                        badge.style.cssText = `
                            position: absolute;
                            top: 5px;
                            right: 5px;
                            background-color: #ff9900;
                            color: #000;
                            border-radius: 50%;
                            width: 18px;
                            height: 18px;
                            font-size: 12px;
                            font-weight: bold;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        `;
                        cartElement.style.position = 'relative';
                        cartElement.appendChild(badge);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    }
    
    // Initialize sign in status
    updateSignInStatus();
    
    // Location functionality
    const locationElement = document.querySelector('.nav-address');
    if (locationElement) {
        locationElement.addEventListener('click', function() {
            const newLocation = prompt('Enter your location:', 'India');
            if (newLocation) {
                const locationText = document.querySelector('.add-sec');
                if (locationText) {
                    locationText.textContent = newLocation;
                    // Save to localStorage for persistence
                    localStorage.setItem('userLocation', newLocation);
                }
            }
        });
    }
    
    // Load saved location if exists
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
        const locationText = document.querySelector('.add-sec');
        if (locationText) {
            locationText.textContent = savedLocation;
        }
    }
    
    // Returns & Orders functionality
    const returnsElement = document.querySelector('.nav-return');
    if (returnsElement) {
        returnsElement.addEventListener('click', function() {
            // Check if user is logged in
            const token = localStorage.getItem('token');
            if (token) {
                // Redirect to orders section in profile
                window.location.href = 'profile.html#orders';
            } else {
                // Redirect to login page
                window.location.href = 'login.html';
            }
        });
    }
    
    // Logo click - go to home page
    const logoElement = document.querySelector('.nav-logo');
    if (logoElement) {
        logoElement.addEventListener('click', function() {
            window.location.href = 'Amazon_Clone.html';
        });
    }
    
    // Panel functionality
    const panelAllButton = document.querySelector('.panel-all');
    const panelOps = document.querySelector('.panel-ops');
    if (panelAllButton && panelOps) {
        panelAllButton.addEventListener('click', function() {
            // Toggle visibility of panel options
            if (panelOps.style.display === 'none') {
                panelOps.style.display = 'flex';
            } else {
                panelOps.style.display = 'none';
            }
        });
    }
});