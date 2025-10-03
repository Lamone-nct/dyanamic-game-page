// --- Core Elements ---
const cssLink = document.getElementById('css-link');
const gameScriptLoader = document.getElementById('game-script-loader');
const currentScriptDisplay = document.getElementById('current-script-display');
const gameOutput = document.getElementById('game-output');

// --- 1. CSS Switching Logic ---
/**
 * Changes the active CSS stylesheet.
 * @param {string} theme - 'default' or 'alt'
 */
function changeStyle(theme) {
    if (theme === 'default') {
        cssLink.href = 'css/style-default.css';
    } else if (theme === 'alt') {
        cssLink.href = 'css/style-alt.css';
    }
    console.log(`Style changed to: ${theme}`);
}

// --- 2. JavaScript (Game Script) Switching Logic ---
let loadedGameFunction = null; // A variable to hold the currently loaded game's main function

/**
 * Changes the active game script.
 * @param {string} scriptId - '1' or '2'
 */
function changeScript(scriptId) {
    // 1. Remove the old script tag to prevent double execution/memory issues
    const oldScript = document.getElementById('dynamic-game-script');
    if (oldScript) {
        oldScript.remove();
    }

    // 2. Clear the old function reference
    loadedGameFunction = null;
    
    // 3. Create a new script tag for the selected file
    const newScript = document.createElement('script');
    newScript.id = 'dynamic-game-script'; // Give it a unique ID for future removal

    if (scriptId === '1') {
        newScript.src = 'js/game-script-1.js';
        currentScriptDisplay.textContent = 'Game 1 (Color Changer)';
        // NOTE: The function runGame1 will be defined once the script loads
        loadedGameFunction = window.runGame1; 
    } else if (scriptId === '2') {
        newScript.src = 'js/game-script-2.js';
        currentScriptDisplay.textContent = 'Game 2 (Counter)';
        // NOTE: The function runGame2 will be defined once the script loads
        loadedGameFunction = window.runGame2;
    } else {
        console.error('Invalid script ID.');
        return;
    }

    // 4. Append the new script to the body to load and execute it
    document.body.appendChild(newScript);
    console.log(`Script changed to: game-script-${scriptId}.js`);

    // 5. Update the function reference once the script *is* loaded
    // This uses the 'onload' event to ensure the script is available
    newScript.onload = () => {
        if (scriptId === '1') {
            loadedGameFunction = window.runGame1;
        } else if (scriptId === '2') {
            loadedGameFunction = window.runGame2;
        }
        gameOutput.textContent = `Game ${scriptId} loaded! Click 'Execute Game Script'.`;
    };
}

// --- 3. Execution Logic ---
/**
 * Calls the main function of the currently loaded game script.
 */
function runGameFunction() {
    if (typeof loadedGameFunction === 'function') {
        // Pass the gameOutput element so the script can modify the page
        loadedGameFunction(gameOutput);
    } else {
        gameOutput.textContent = "No game script is loaded or the script hasn't finished loading. Please select a game!";
    }
}

// Automatically load the default script on page load
document.addEventListener('DOMContentLoaded', () => {
    changeScript('1');
});

