// API utility functions for connecting frontend to backend

const API_BASE_URL = 'http://localhost:5000/api';

// Generic API call function
async function apiCall(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers
        },
        ...options
    };
    
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// User API functions
export async function getUsers() {
    return apiCall('/users');
}

export async function getUserById(id) {
    return apiCall(`/users/${id}`);
}

export async function createUser(userData) {
    return apiCall('/users', {
        method: 'POST',
        body: JSON.stringify(userData)
    });
}

export async function updateUser(id, userData) {
    return apiCall(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
    });
}

export async function deleteUser(id) {
    return apiCall(`/users/${id}`, {
        method: 'DELETE'
    });
}

// Product API functions
export async function getProducts() {
    return apiCall('/products');
}

export async function getProductById(id) {
    return apiCall(`/products/${id}`);
}

export async function getProductsByCategory(category) {
    return apiCall(`/products/category/${category}`);
}

export async function searchProducts(query) {
    return apiCall(`/products/search?query=${encodeURIComponent(query)}`);
}

export async function createProduct(productData) {
    return apiCall('/products', {
        method: 'POST',
        body: JSON.stringify(productData)
    });
}

export async function updateProduct(id, productData) {
    return apiCall(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData)
    });
}

export async function deleteProduct(id) {
    return apiCall(`/products/${id}`, {
        method: 'DELETE'
    });
}

// Cart API functions
export async function getCart() {
    return apiCall('/cart');
}

export async function addToCart(productId, quantity = 1) {
    return apiCall('/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity })
    });
}

export async function updateCartItem(productId, quantity) {
    return apiCall('/cart/update', {
        method: 'PUT',
        body: JSON.stringify({ productId, quantity })
    });
}

export async function removeFromCart(productId) {
    return apiCall('/cart/remove', {
        method: 'DELETE',
        body: JSON.stringify({ productId })
    });
}

export async function clearCart() {
    return apiCall('/cart/clear', {
        method: 'DELETE'
    });
}

// Wishlist API functions
export async function getWishlist() {
    return apiCall('/wishlist');
}

export async function addToWishlist(productId) {
    return apiCall('/wishlist/add', {
        method: 'POST',
        body: JSON.stringify({ productId })
    });
}

export async function removeFromWishlist(productId) {
    return apiCall('/wishlist/remove', {
        method: 'DELETE',
        body: JSON.stringify({ productId })
    });
}

export async function isProductInWishlist(productId) {
    return apiCall(`/wishlist/check/${productId}`);
}

// Search products
export async function searchProducts(query) {
    return apiCall(`/products/search?query=${encodeURIComponent(query)}`);
}
