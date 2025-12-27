document.addEventListener('DOMContentLoaded', function () {
    const shuffleInstances = {};

    function initShuffle(gridSelector, itemSelector) {
        const grid = document.querySelector(gridSelector);
        if (!grid) {
            return;
        }

        const shuffle = new Shuffle(grid, {
            itemSelector: itemSelector,
            sizer: itemSelector, // use the item itself as the sizer
            speed: 500,
            easing: 'ease-in-out',
        });

        shuffleInstances[gridSelector] = shuffle;
    }

    // Expose the init function to be called from other scripts
    window.initShuffle = initShuffle;
    window.shuffleInstances = shuffleInstances;
});
