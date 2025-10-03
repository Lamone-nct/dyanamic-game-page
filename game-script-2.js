// A persistent state for Game 2 (only active when this script is loaded)
let game2Count = 0;

/**
 * Game 2: Increments a counter and displays the current count.
 * @param {HTMLElement} outputElement - The element to display the game results.
 */
function runGame2(outputElement) {
    game2Count++;
    outputElement.textContent = `Game 2 ran! The counter is now at: ${game2Count}`;
    
    // Reset the body's style, as Game 1 might have changed it
    document.body.style.backgroundColor = '';
}
