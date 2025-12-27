document.addEventListener('DOMContentLoaded', function () {
    // Logic for the Hommes page
    if (document.querySelector('body.hommes-page')) {
        const productsContainer = document.querySelector('.products-container');
        const categoryTabs = document.querySelectorAll('.category-tab');
        const searchBar = document.getElementById('search-bar');
        const gridSelector = '.products-container';

        renderProducts(gridSelector, hommesProducts, () => {
            if (typeof initProductCards === 'function') {
                initProductCards();
            }
            if (typeof initShuffle === 'function') {
                initShuffle(gridSelector, '.product-card');
            }
        });

        const handleFilter = () => {
            const activeTab = document.querySelector('.category-tab.active');
            const category = activeTab.getAttribute('data-category');
            const searchTerm = searchBar.value.toLowerCase();
            const shuffle = window.shuffleInstances[gridSelector];

            if (shuffle) {
                shuffle.filter(element => {
                    const productName = element.querySelector('.product-name').textContent.toLowerCase();
                    const productCategory = element.getAttribute('data-category');

                    const categoryMatch = category === 'all' || productCategory === category;
                    const searchMatch = productName.includes(searchTerm);

                    return categoryMatch && searchMatch;
                });
            }
        };

        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                handleFilter();
            });
        });

        searchBar.addEventListener('input', handleFilter);
    }

    // Logic for the Femmes page
    if (document.querySelector('body.femmes-page')) {
        const productsContainer = document.querySelector('.products-container');
        const categoryTabs = document.querySelectorAll('.category-tab');
        const searchBar = document.getElementById('search-bar');
        const gridSelector = '.products-container';

        renderProducts(gridSelector, femmesProducts, () => {
            if (typeof initProductCards === 'function') {
                initProductCards();
            }
            if (typeof initShuffle === 'function') {
                initShuffle(gridSelector, '.product-card');
            }
        });

        const handleFilter = () => {
            const activeTab = document.querySelector('.category-tab.active');
            const category = activeTab.getAttribute('data-category');
            const searchTerm = searchBar.value.toLowerCase();
            const shuffle = window.shuffleInstances[gridSelector];

            if (shuffle) {
                shuffle.filter(element => {
                    const productName = element.querySelector('.product-name').textContent.toLowerCase();
                    const productCategory = element.getAttribute('data-category');

                    const categoryMatch = category === 'all' || productCategory === category;
                    const searchMatch = productName.includes(searchTerm);

                    return categoryMatch && searchMatch;
                });
            }
        };

        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                handleFilter();
            });
        });

        searchBar.addEventListener('input', handleFilter);
    }
    
    // Logic for the "Produits" page
    if (document.querySelector('body.produits-page')) {
        const allProducts = [...(femmesProducts || []), ...(hommesProducts || [])];
        const searchBar = document.getElementById('search-bar');
        const gridSelector = '.products-container';

        renderProducts(gridSelector, allProducts, () => {
            if (typeof initProductCards === 'function') {
                initProductCards();
            }
            if (typeof initShuffle === 'function') {
                initShuffle(gridSelector, '.product-card');
            }
        });

        const handleFilter = () => {
            const searchTerm = searchBar.value.toLowerCase();
            const shuffle = window.shuffleInstances[gridSelector];

            if (shuffle) {
                shuffle.filter(element => {
                    const productName = element.querySelector('.product-name').textContent.toLowerCase();
                    return productName.includes(searchTerm);
                });
            }
        };

        searchBar.addEventListener('input', handleFilter);
    }

    // Logic for the Index page (featured products)
    if (document.querySelector('.featured-products-container')) {
        const featuredProducts = [
            ...(hommesProducts || []).slice(0, 2),
            ...(femmesProducts || []).slice(0, 2)
        ];
        if (featuredProducts.length > 0) {
            renderProducts('.featured-products-container', featuredProducts);
        }
    }

    // Logic for the gallery on the Index page
    if (document.getElementById('gallery-product-grid')) {
        const galleryProductIds = ['f20', 'h2', 'f33', 'h32', 'f12', 'h5'];
        const allProducts = [...(femmesProducts || []), ...(hommesProducts || [])];
        const galleryProducts = galleryProductIds.map(id => allProducts.find(p => p.id === id)).filter(p => p); // filter out undefined if id not found

        if (galleryProducts.length > 0) {
            renderProducts('#gallery-product-grid', galleryProducts);
        }
    }

    // Logic for the Contact page
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (name && email && subject && message) {
                alert('Merci pour votre message ! Nous vous contacterons bientôt.');
                this.reset();
            } else {
                alert('Veuillez remplir tous les champs obligatoires.');
            }
        });
    }
});