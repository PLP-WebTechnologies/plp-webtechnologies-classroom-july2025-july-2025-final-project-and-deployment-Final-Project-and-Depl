// Script pour gérer la navbar qui disparaît au défilement
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    // Ajouter un peu d'espace en haut du body pour compenser la navbar fixe
    document.body.style.paddingTop = header.offsetHeight + 'px';
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Si on défile vers le bas et qu'on a défilé plus que la hauteur de la navbar
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            // Cacher la navbar
            header.style.transform = 'translateY(-100%)';
        } else {
            // Montrer la navbar
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});