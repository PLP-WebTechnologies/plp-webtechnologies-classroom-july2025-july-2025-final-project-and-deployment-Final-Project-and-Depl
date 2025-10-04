/**
 * Dynamically renders product cards into a specified container.
 * @param {string} containerSelector - The CSS selector for the container element.
 * @param {Array<Object>} products - An array of product objects to render.
 */
/**
 * Dynamically renders product cards into a specified container.
 * @param {string} containerSelector - The CSS selector for the container element.
 * @param {Array<Object>} products - An array of product objects to render.
 * @param {Function} [callback] - An optional callback function to execute after rendering.
 */
function renderProducts(containerSelector, products, callback) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error(`Product container with selector '${containerSelector}' not found.`);
        return;
    }

    // Clear any existing content
    container.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);

        const productName = product.name;
        const productImage = product.image;
        const productPrice = product.price.toFixed(2).replace('.', ',');

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${productImage}" alt="${productName}" onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(productName)}'">
            </div>
            <div class="product-info">
                <h3 class="product-name">${productName}</h3>
                <p class="product-price">${productPrice} €</p>
                <div class="product-actions">
                    <a href="https://wa.me/1234567890?text=Je%20souhaite%20commander%20le%20produit%20${encodeURIComponent(productName)}" class="whatsapp-order">
                        <i class="fab fa-whatsapp"></i> Commander
                    </a>
                    <button class="add-to-cart" data-name="${productName}" data-price="${product.price}" data-image="${productImage}">
                        <i class="fas fa-shopping-cart"></i> Ajouter
                    </button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });

    // Execute the callback function if provided
    if (callback && typeof callback === 'function') {
        callback();
    }
}