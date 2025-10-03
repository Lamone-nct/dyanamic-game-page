/**
 * Game 1: Randomly changes the background color and updates the output text.
 * @param {HTMLElement} outputElement - The element to display the game results.
 */
function runGame1(outputElement) {
    // Random color generator
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    
    // Change the body's background color
    document.body.style.backgroundColor = randomColor;
    
    outputElement.textContent = `Game 1 ran! Background color changed to ${randomColor}.`;
}
