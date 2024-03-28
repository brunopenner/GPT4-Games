document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('game-container');
    let emptyIndex = 15;

    function initializePuzzle() {
        for (let i = 0; i < 16; i++) {
            const tile = document.createElement('div');
            tile.className = i === emptyIndex ? 'tile empty' : 'tile';
            tile.innerHTML = i === emptyIndex ? '' : i + 1;
            container.appendChild(tile);
        }
    }

    function swapTiles(clickedIndex) {
        // Calculate row and column for empty and clicked tiles
        const emptyRow = Math.floor(emptyIndex / 4);
        const emptyCol = emptyIndex % 4;
        const clickedRow = Math.floor(clickedIndex / 4);
        const clickedCol = clickedIndex % 4;

        // Check if the clicked tile is adjacent to the empty tile
        if ((emptyRow === clickedRow && Math.abs(emptyCol - clickedCol) === 1) ||
            (emptyCol === clickedCol && Math.abs(emptyRow - clickedRow) === 1)) {
            // Swap tiles
            [container.children[clickedIndex].innerHTML, container.children[emptyIndex].innerHTML] =
                [container.children[emptyIndex].innerHTML, container.children[clickedIndex].innerHTML];
            container.children[clickedIndex].className = 'tile empty';
            container.children[emptyIndex].className = 'tile';
            emptyIndex = clickedIndex;
        }
    }

    container.addEventListener('click', (e) => {
        const clickedTile = e.target;
        const clickedIndex = Array.from(container.children).indexOf(clickedTile);
        if (clickedTile.className.includes('empty')) return;
        swapTiles(clickedIndex);
    });

    initializePuzzle();
});
