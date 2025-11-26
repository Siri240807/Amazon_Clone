// Product API functions for connecting frontend to backend

import { getProducts, getProductsByCategory, getProductById, addToCart as apiAddToCart } from './api.js';

// Fetch and display products by category
export async function loadCategoryProducts(category) {
    try {
        const products = await getProductsByCategory(category);
        const container = document.getElementById('products-container');
        
        if (container) {
            container.innerHTML = `<h2 style="width:100%; text-align:center; margin-bottom:20px;">${category} Products</h2>`;
            
            if (products && products.length > 0) {
                products.forEach(product => {
                    const div = document.createElement('div');
                    div.className = 'box';
                    div.innerHTML = `
                        <div class="box-img" style="background-image: url('${product.imageUrl}')" onclick='viewProduct("${category}", "${product._id}")'></div>
                        <h3 onclick='viewProduct("${category}", "${product._id}")'>${product.name}</h3>
                        <p onclick='viewProduct("${category}", "${product._id}")'>Price: $${product.price}</p>
                        <button class="view-details-btn" onclick='viewProduct("${category}", "${product._id}")'>View Details</button>
                    `;
                    container.appendChild(div);
                });
            } else {
                container.innerHTML += '<p style="text-align:center; width:100%;">No products found in this category.</p>';
            }
        }
    } catch (error) {
        console.error('Failed to load products:', error);
        // Fallback to local data if API fails
        loadLocalCategoryProducts(category);
    }
}

// Fallback to local data if API is not available
function loadLocalCategoryProducts(category) {
    const allProducts = {
        Health: [
            {name: "Vitamin C", price: 15, img: "images/health_personalcare.jpg"},
            {name: "Hand Sanitizer", price: 5, img: "images/health_personalcare.jpg"}
        ],
        Clothing: [
            {name: "T-shirt", price: 20, img: "images/clothing_fashion.jpg"},
            {name: "Jeans", price: 35, img: "images/clothing_fashion.jpg"}
        ],
        SSD_RAM: [
            {name: "Crucial SSD", price: 80, img: "images/Deals on crucial SSD & RAMs.jpg"},
            {name: "8GB RAM", price: 30, img: "images/Deals on crucial SSD & RAMs.jpg"}
        ],
        Home_Kitchen: [
            {name: "Blender", price: 50, img: "images/Home Kitchen and Outdoors.jpg"},
            {name: "Knife Set", price: 25, img: "images/Home Kitchen and Outdoors.jpg"}
        ],
        New_Launches: [
            {name: "Smart Watch", price: 120, img: "images/New launches.jpg"}
        ],
        Gaming: [
            {name: "Gaming Mouse", price: 40, img: "images/Get you game on.jpg"},
            {name: "Gaming Keyboard", price: 70, img: "images/Get you game on.jpg"}
        ],
        Printers_Electronics: [
            {name: "Laser Printer", price: 150, img: "images/Deals on Printers and Electronic devices.jpg"}
        ],
        Offers: [
            {name: "Freebie Pack", price: 0, img: "images/Freebies & more offers.jpg"}
        ]
    };

    const container = document.getElementById('products-container');
    if (container) {
        container.innerHTML = `<h2 style="width:100%; text-align:center; margin-bottom:20px;">${category} Products</h2>`;
        
        if (allProducts[category]) {
            allProducts[category].forEach(prod => {
                const div = document.createElement('div');
                div.className = 'box';
                div.innerHTML = `
                    <div class="box-img" style="background-image: url('${prod.img}')" onclick='viewProduct("${category}", "${prod.name}")'></div>
                    <h3 onclick='viewProduct("${category}", "${prod.name}")'>${prod.name}</h3>
                    <p onclick='viewProduct("${category}", "${prod.name}")'>Price: $${prod.price}</p>
                    <button class="view-details-btn" onclick='viewProduct("${category}", "${prod.name}")'>View Details</button>
                `;
                container.appendChild(div);
            });
        }
    }
}

// Fetch and display product details
export async function loadProductDetails(category, productId) {
    try {
        const product = await getProductById(productId);
        const container = document.getElementById('product-details');
        
        if (container && product) {
            container.innerHTML = `
                <div class="box">
                    <div class="box-img" style="background-image: url('${product.imageUrl}'); height:300px; width:300px; margin:auto;"></div>
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <label>Quantity: <input type="number" id="qty" value="1" min="1" style="width:50px;"></label><br><br>
                    <button id="add-to-cart">Add to Cart</button>
                </div>
            `;
            
            // Add event listener to the Add to Cart button
            document.getElementById('add-to-cart').onclick = function() {
                const qty = parseInt(document.getElementById('qty').value);
                addToCart(product._id, qty);
            };
        }
    } catch (error) {
        console.error('Failed to load product details:', error);
        // Fallback to local data if API fails
        loadLocalProductDetails(category, productId);
    }
}

// Fallback to local data if API is not available
function loadLocalProductDetails(category, productName) {
    const allProducts = {
        Health: [{name: "Vitamin C", price: 15, img: "images/health_personalcare.jpg"}, {name: "Hand Sanitizer", price: 5, img: "images/health_personalcare.jpg"}],
        Clothing: [{name: "T-shirt", price: 20, img: "images/clothing_fashion.jpg"}, {name: "Jeans", price: 35, img: "images/clothing_fashion.jpg"}],
        SSD_RAM: [{name: "Crucial SSD", price: 80, img: "images/Deals on crucial SSD & RAMs.jpg"}, {name: "8GB RAM", price: 30, img: "images/Deals on crucial SSD & RAMs.jpg"}],
        Home_Kitchen: [{name: "Blender", price: 50, img: "images/Home Kitchen and Outdoors.jpg"}, {name: "Knife Set", price: 25, img: "images/Home Kitchen and Outdoors.jpg"}],
        New_Launches: [{name: "Smart Watch", price: 120, img: "images/New launches.jpg"}],
        Gaming: [{name: "Gaming Mouse", price: 40, img: "images/Get you game on.jpg"}, {name: "Gaming Keyboard", price: 70, img: "images/Get you game on.jpg"}],
        Printers_Electronics: [{name: "Laser Printer", price: 150, img: "images/Deals on Printers and Electronic devices.jpg"}],
        Offers: [{name: "Freebie Pack", price: 0, img: "images/Freebies & more offers.jpg"}]
    };

    const product = allProducts[category].find(p => p.name === productName);
    const container = document.getElementById('product-details');

    if (container && product) {
        container.innerHTML = `
            <div class="box">
                <div class="box-img" style="background-image: url('${product.img}'); height:300px; width:300px; margin:auto;"></div>
                <h2>${product.name}</h2>
                <p>Price: $${product.price}</p>
                <label>Quantity: <input type="number" id="qty" value="1" min="1" style="width:50px;"></label><br><br>
                <button id="add-to-cart">Add to Cart</button>
            </div>
        `;

        document.getElementById('add-to-cart').onclick = function() {
            const qty = parseInt(document.getElementById('qty').value);
            addToCart(product.name, qty); // For local data, we use product name as identifier
        }
    }
}

// Add product to cart
async function addToCart(productId, qty) {
  try {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // Instead of alert, show a message in the UI
      showMessage('Please log in to add items to your cart.', 'error');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
      return;
    }
    
    // Add to cart via API
    await apiAddToCart(productId, qty);
    // Instead of alert, show a success message in the UI
    showMessage('Product added to cart!', 'success');
  } catch (error) {
    console.error('Failed to add product to cart:', error);
    // Instead of alert, show an error message in the UI
    showMessage('Failed to add product to cart. Please try again.', 'error');
  }
}

// Function to show messages to the user without using alerts
function showMessage(message, type) {
  // Create a message element
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    z-index: 10000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    ${type === 'success' ? 'background-color: #4CAF50;' : 'background-color: #f44336;'}
  `;
  
  // Add to document
  document.body.appendChild(messageElement);
  
  // Remove after 3 seconds
  setTimeout(() => {
    if (messageElement.parentNode) {
      messageElement.parentNode.removeChild(messageElement);
    }
  }, 3000);
}
