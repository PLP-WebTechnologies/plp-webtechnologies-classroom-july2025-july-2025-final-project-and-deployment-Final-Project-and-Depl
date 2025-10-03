// Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Cart elements
    const cartBtn = document.getElementById('cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Cart data
    let cart = JSON.parse(localStorage.getItem('charlyShopCart')) || [];
    
    // Initialize cart
    function initCart() {
        updateCartUI();
        setupEventListeners();
    }
    
    // Update cart UI
    function updateCartUI() {
        // Update cart count
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Update cart items
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
            cartTotalPrice.textContent = '0.00';
            return;
        }
        
        // Add items to cart
        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">${item.price.toFixed(2)} €</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-index="${index}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase" data-index="${index}">+</button>
                        <i class="fas fa-trash remove-item" data-index="${index}"></i>
                    </div>
                </div>
            `;
            
            cartItems.appendChild(cartItemElement);
        });
        
        // Update total price
        cartTotalPrice.textContent = total.toFixed(2);
        
        // Update checkout link with cart details
        updateCheckoutLink();
    }
    
    // Update WhatsApp checkout link with cart details
    function updateCheckoutLink() {
        let message = "Salut Charly Shop 👋\n\nJe souhaite commander :\n\n";
        
        cart.forEach(item => {
            message += `- ${item.name} (${item.quantity}x)\n`;
        });
        
        message += "\nPeux-tu me confirmer le prix total et les modalités de livraison ? 😊";
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        
        // Update checkout button link
        checkoutBtn.href = `https://wa.me/1234567890?text=${encodedMessage}`;
    }
    
    // Add item to cart
    function addToCart(item) {
        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingItemIndex !== -1) {
            // Increase quantity if item exists
            cart[existingItemIndex].quantity += 1;
        } else {
            // Add new item with quantity 1
            cart.push({
                ...item,
                quantity: 1
            });
        }
        
        // Save cart to localStorage
        saveCart();
        
        // Update UI
        updateCartUI();
        
        // Show cart
        showCart();
    }
    
    // Remove item from cart
    function removeItem(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    }
    
    // Increase item quantity
    function increaseQuantity(index) {
        cart[index].quantity += 1;
        saveCart();
        updateCartUI();
    }
    
    // Decrease item quantity
    function decreaseQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            removeItem(index);
        }
        saveCart();
        updateCartUI();
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('charlyShopCart', JSON.stringify(cart));
    }
    
    // Show cart
    function showCart() {
        cartOverlay.classList.add('active');
    }
    
    // Hide cart
    function hideCart() {
        cartOverlay.classList.remove('active');
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Open cart
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCart();
        });
        
        // Close cart
        closeCartBtn.addEventListener('click', hideCart);
        
        // Click outside to close
        cartOverlay.addEventListener('click', function(e) {
            if (e.target === cartOverlay) {
                hideCart();
            }
        });
        
        // Cart item quantity buttons and remove
        cartItems.addEventListener('click', function(e) {
            if (e.target.classList.contains('increase')) {
                const index = parseInt(e.target.dataset.index);
                increaseQuantity(index);
            } else if (e.target.classList.contains('decrease')) {
                const index = parseInt(e.target.dataset.index);
                decreaseQuantity(index);
            } else if (e.target.classList.contains('remove-item')) {
                const index = parseInt(e.target.dataset.index);
                removeItem(index);
            }
        });
    }
    
    // Initialize cart
    initCart();
    
    // Make addToCart function available globally
    window.addToCart = addToCart;
});