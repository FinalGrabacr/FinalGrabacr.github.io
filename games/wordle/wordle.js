class Wordle {
    constructor(config) {
        this.wordList = [];
        this.currentWord = '';
        this.guesses = [];
        this.currentRow = 0;
        this.gameOver = false;
        this.wordListPath = config.wordListPath;
        this.wordLength = config.wordLength || 5;
        this.maxGuesses = config.maxGuesses || 6;

        // UI element references
        this.guessInput = document.getElementById('guess-input'); // Hidden but referenced
        this.submitButton = document.getElementById('submit-button'); // Hidden but referenced
        this.gameGrid = document.getElementById('game-grid');
        this.messageDisplay = document.getElementById('message-display');
        this.keyboardContainer = document.getElementById('keyboard');

        // Stores the 'best' state for each letter on the keyboard
        this.letterStates = {}; // e.g., {'a': 'absent', 's': 'correct'}

        // Event listener for physical keyboard input
        document.addEventListener('keydown', this.handlePhysicalKeyPress.bind(this));
    }

    async loadWords() {
        try {
            const response = await fetch(this.wordListPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
            }
            const data = await response.text();

            this.wordList = data.split('\n')
                .map(word => word.trim().toLowerCase())
                .filter(word => word.length === this.wordLength && word.length > 0);

            console.log(`Word list loaded: ${this.wordList.length} words of length ${this.wordLength}.`);
            return true;
        } catch (error) {
            console.error('Error loading word list:', error);
            // Update message display in case of fetch error
            if (this.messageDisplay) {
                this.messageDisplay.textContent = `Error loading words. Check console.`;
                this.messageDisplay.style.color = 'red';
            }
            return false;
        }
    }

    pickRandomWord() {
        if (this.wordList.length === 0) {
            console.error("Word list is empty or not loaded. Cannot pick random word.");
            return null;
        }
        const randomIndex = Math.floor(Math.random() * this.wordList.length);
        return this.wordList[randomIndex];
    }

    initializeGame() {
        if (this.wordList.length === 0) {
            console.error("Attempted to initialize game before word list was loaded.");
            return;
        }
        this.currentWord = this.pickRandomWord();
        // REMOVE THIS LINE LATER FOR REAL GAMEPLAY! It's for debugging.
        console.log("The secret word is:", this.currentWord);

        this.guesses = Array(this.maxGuesses).fill(''); // Each element will be the current guess string
        this.currentRow = 0;
        this.gameOver = false;

        if (this.messageDisplay) this.messageDisplay.textContent = '';
        this.createGameGrid();
        this.createKeyboard(); // Create the on-screen keyboard
        this.resetLetterStates(); // Reset keyboard letter colors for a new game
    }

    // --- Unified Key Press Handler (physical and on-screen) ---
    handleKeyPress(key) {
        if (this.gameOver) return;

        // Get the current row's cells for visual updates
        const currentRowCells = this.gameGrid.children[this.currentRow]?.children;
        if (!currentRowCells) {
            console.warn("Current row cells not found.");
            return;
        }
        let currentGuess = this.guesses[this.currentRow]; // Get the current string guess for this row

        if (key === 'enter') {
            if (currentGuess.length === this.wordLength) {
                this.handleGuess(); // Process the complete guess
            } else {
                this.displayMessage(`Not enough letters!`, true); // Shake row if not full word
            }
        } else if (key === 'backspace') {
            if (currentGuess.length > 0) {
                this.displayMessage(''); // Clear any previous error messages

                // Update the guess string
                currentGuess = currentGuess.slice(0, -1);
                this.guesses[this.currentRow] = currentGuess;

                // Clear the last letter in the UI
                const lastCell = currentRowCells[currentGuess.length];
                if (lastCell) {
                    lastCell.textContent = '';
                    lastCell.classList.remove('filled'); // Remove filled style
                }
            }
        } else if (key.length === 1 && key.match(/[a-z]/i)) { // Check if it's a single letter (a-z)
            if (currentGuess.length < this.wordLength) {
                this.displayMessage(''); // Clear any previous error messages

                // Append letter to the guess string
                currentGuess += key.toLowerCase();
                this.guesses[this.currentRow] = currentGuess;

                // Display the letter in the current cell
                const currentCell = currentRowCells[currentGuess.length - 1];
                if (currentCell) {
                    currentCell.textContent = key.toUpperCase();
                    currentCell.classList.add('filled'); // Add a class for filled cell style
                }
            }
        }
    }

    // --- Physical Keyboard Input Handler ---
    handlePhysicalKeyPress(event) {
        const key = event.key.toLowerCase();
        // Prevent default browser behavior for Enter/Backspace if we handle them
        if (key === 'enter' || key === 'backspace') {
            event.preventDefault();
        }
        this.handleKeyPress(key); // Pass to our unified handler
    }

    // --- Main Guess Processing Logic (Called by handleKeyPress when 'Enter' is pressed) ---
    handleGuess() {
        if (this.gameOver) return;

        const guess = this.guesses[this.currentRow];

        // Ensure length validation (should be caught by handleKeyPress, but good to double check)
        if (guess.length !== this.wordLength) {
            this.displayMessage(`Not enough letters!`, true);
            return;
        }

        // Validate against the available dictionary
        if (!this.wordList.includes(guess)) {
            this.displayMessage(`"${guess.toUpperCase()}" is not in the word list.`, true); // Shake if not in dictionary
            return;
        }

        this.displayMessage(''); // Clear any previous messages

        this.checkLettersForColors(guess); // Apply colors to grid cells and update keyboard states

        // Check for win condition
        if (guess === this.currentWord) {
            this.displayMessage('You guessed it! 🎉', false); // No shake on win
            this.gameOver = true;
            // Optionally add a win animation here
            return;
        }

        // Check for loss condition
        if (this.currentRow >= this.maxGuesses - 1) { // -1 because currentRow is 0-indexed
            this.displayMessage(`Game Over! The word was ${this.currentWord.toUpperCase()}.`, false); // No shake on loss
            this.gameOver = true;
            return;
        }

        this.currentRow++; // Move to the next row for the next guess
        this.guesses[this.currentRow] = ''; // Initialize the next row's guess string
    }

    displayMessage(message, shake = false) {
        if (this.messageDisplay) {
            this.messageDisplay.textContent = message;
            this.messageDisplay.style.color = shake ? 'orange' : '#4CAF50'; // Red/orange for errors, green for success

            // Set a timeout to clear message after a few seconds if it's an error/warning
            if (shake || message.length > 0 && !this.gameOver) {
                clearTimeout(this.messageTimeout); // Clear previous timeout
                this.messageTimeout = setTimeout(() => {
                    if (!this.gameOver) { // Don't clear if game is over (win/loss message)
                        this.messageDisplay.textContent = '';
                    }
                }, 2000); // Message disappears after 2 seconds
            }
        }
        if (shake) {
            const currentRowElement = this.gameGrid?.children[this.currentRow];

            if (currentRowElement) {
                currentRowElement.classList.add('shake');
                currentRowElement.addEventListener('animationend', () => {
                    currentRowElement.classList.remove('shake');
                }, { once: true });
            }
        }
    }

    // --- Grid Creation (no change) ---
    createGameGrid() {
        if (!this.gameGrid) {
            console.warn("Game grid element not found. Cannot create grid.");
            return;
        }
        this.gameGrid.innerHTML = ''; // Clear existing grid
        for (let i = 0; i < this.maxGuesses; i++) {
            const row = document.createElement('div');
            row.classList.add('wordle-row');
            for (let j = 0; j < this.wordLength; j++) {
                const cell = document.createElement('div');
                cell.classList.add('wordle-cell');
                row.appendChild(cell);
            }
            this.gameGrid.appendChild(row);
        }
    }

    // --- Keyboard Creation ---
    createKeyboard() {
        if (!this.keyboardContainer) {
            console.warn("Keyboard container element not found. Cannot create keyboard.");
            return;
        }

        this.keyboardContainer.innerHTML = ''; // Clear any existing keyboard

        const rows = [
            'qwertyuiop',
            'asdfghjkl',
            'zxcvbnm'
        ];

        rows.forEach((rowLetters, index) => {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('keyboard-row');

            // Add Enter button to the last row
            if (index === rows.length - 1) {
                const enterButton = document.createElement('button');
                enterButton.textContent = 'Enter';
                enterButton.classList.add('keyboard-button', 'big-button');
                enterButton.dataset.key = 'enter';
                rowDiv.appendChild(enterButton);
            }

            // Create letter buttons
            for (const char of rowLetters) {
                const button = document.createElement('button');
                button.textContent = char.toUpperCase();
                button.classList.add('keyboard-button');
                button.dataset.key = char;
                rowDiv.appendChild(button);
            }

            // Add Backspace button to the last row
            if (index === rows.length - 1) {
                const backspaceButton = document.createElement('button');
                backspaceButton.textContent = 'Backspace';
                backspaceButton.classList.add('keyboard-button', 'big-button');
                backspaceButton.dataset.key = 'backspace';
                rowDiv.appendChild(backspaceButton);
            }

            this.keyboardContainer.appendChild(rowDiv);
        });

        // Add event listener to the keyboard container (event delegation)
        this.keyboardContainer.addEventListener('click', (event) => {
            const target = event.target;
            // Check if the clicked element is a keyboard-button (or a child of one)
            const button = target.closest('.keyboard-button');
            if (button) {
                const key = button.dataset.key;
                this.handleKeyPress(key); // Call the unified handler
            }
        });
    }

    // --- Reset letter states for a new game ---
    resetLetterStates() {
        this.letterStates = {};
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        for (const char of alphabet) {
            this.letterStates[char] = 'default'; // 'default', 'absent', 'present', 'correct'
        }
        this.updateKeyboardColors(); // Apply the default colors to the keyboard
    }

    // --- Update keyboard key colors based on letterStates ---
    updateKeyboardColors() {
        if (!this.keyboardContainer) return;

        this.keyboardContainer.querySelectorAll('.keyboard-button').forEach(button => {
            const keyChar = button.dataset.key; // Get the letter from data-key

            // Skip Enter/Backspace buttons when applying letter states
            if (keyChar === 'enter' || keyChar === 'backspace' || !keyChar.match(/[a-z]/i)) {
                return;
            }

            // Remove existing color classes
            button.classList.remove('keyboard-correct', 'keyboard-present', 'keyboard-absent');

            // Apply the new color class based on the letter's state
            const state = this.letterStates[keyChar];
            if (state && state !== 'default') {
                button.classList.add(`keyboard-${state}`);
            }
        });
    }

    /**
     * Updates the state of a letter for the on-screen keyboard.
     * Higher priority states (correct > present > absent) override lower ones.
     * @param {string} letter The letter to update.
     * @param {string} newState The new state ('correct', 'present', 'absent').
     */
    updateLetterState(letter, newState) {
        const currentState = this.letterStates[letter];

        // Priority logic: correct > present > absent > default
        if (newState === 'correct') {
            this.letterStates[letter] = 'correct';
        } else if (newState === 'present' && currentState !== 'correct') { // Only update to present if not already correct
            this.letterStates[letter] = 'present';
        } else if (newState === 'absent' && currentState !== 'correct' && currentState !== 'present') { // Only update to absent if not already correct or present
            this.letterStates[letter] = 'absent';
        }
        // If newState is default, it only applies if current is also default (implicitly handled)
    }

    // --- Core Wordle Logic: Check letters for colors and update keyboard state ---
    checkLettersForColors(guess) {
        const currentRowElement = this.gameGrid.children[this.currentRow];
        const currentWordLetters = this.currentWord.split('');
        const guessLetters = guess.split('');

        // Track which letters in the secret word have been "consumed" by a match
        const secretWordConsumed = new Array(this.wordLength).fill(false);
        // Track which letters in the guess have been processed (for green/yellow)
        const guessProcessed = new Array(this.wordLength).fill(false);

        // First pass: Identify 'correct' (green) letters
        for (let i = 0; i < this.wordLength; i++) {
            const cellElement = currentRowElement.children[i];
            if (guessLetters[i] === currentWordLetters[i]) {
                cellElement.classList.add('correct');
                this.updateLetterState(guessLetters[i], 'correct');
                secretWordConsumed[i] = true;
                guessProcessed[i] = true;
            }
        }

        // Second pass: Identify 'present' (yellow) and 'absent' (gray) letters
        for (let i = 0; i < this.wordLength; i++) {
            const cellElement = currentRowElement.children[i];
            if (guessProcessed[i]) {
                // This letter was already handled as 'correct' in the first pass
                continue;
            }

            let statusClass = 'absent'; // Default to absent
            let foundPresent = false;

            // Check if the letter exists anywhere in the secret word, not already consumed
            for (let j = 0; j < this.wordLength; j++) {
                if (!secretWordConsumed[j] && guessLetters[i] === currentWordLetters[j]) {
                    statusClass = 'present';
                    secretWordConsumed[j] = true; // Consume this letter in the secret word
                    foundPresent = true;
                    break; // Found a match, move to the next letter in the guess
                }
            }

            cellElement.classList.add(statusClass);
            this.updateLetterState(guessLetters[i], statusClass);
        }

        // Apply flip animation to all cells in the current row after all colors are determined
        Array.from(currentRowElement.children).forEach(cell => {
            cell.classList.add('flipped');
            cell.addEventListener('animationend', () => {
                cell.classList.remove('flipped');
            }, { once: true });
        });

        // Update keyboard colors after processing all letters in the guess
        this.updateKeyboardColors();
    }
}