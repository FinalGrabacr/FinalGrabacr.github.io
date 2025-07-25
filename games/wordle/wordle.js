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

        this.guessInput = document.getElementById('guess-input');
        this.submitButton = document.getElementById('submit-button');
        this.gameGrid = document.getElementById('game-grid');
        this.messageDisplay = document.getElementById('message-display');

        // For clicking with mouse
        if (this.submitButton) {
            this.submitButton.addEventListener('click', this.handleGuess.bind(this));
        }

        // For entering with enter key
        if (this.guessInput) {
            this.guessInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    this.handleGuess();
                }
            })
        }
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
        console.log("The secret word is:", this.currentWord);

        this.guesses = Array(this.maxGuesses).fill('');
        this.currentRow = 0;
        this.gameOver = false;

        if (this.messageDisplay) this.messageDisplay.textContent = '';
        this.createGameGrid();
    }

    handleGuess() {
        if (this.gameOver) return; // Game's over; no more inputs

        if (!this.guessInput) {
            console.error("Guess input element not found");
            return;
        }

        const guess = this.guessInput.value.trim().toLowerCase();

        // Length validation; Change later to fully mimic the actual game
        if (guess.length !== this.wordLength) {
            this.displayMessage(`"${guess.toUpperCase()}" is not in the word list.`);
            return;
        }

        // Validation against the available dictionary
        if (!this.wordList.includes(guess)) {
            this.displayMessage(`"${guess.toUpperCase()}" is not in the word list.`);
            return;
        }

        this.displayMessage('');
        this.processValidGuess(guess);
        this.guessInput.value = '';
    }

    displayMessage(message, shake = false) {
        if (this.messageDisplay) {
            this.messageDisplay.textContent = message;
        }
        if (shake) {
            const currentRowElement = this.gameGrid ? this.gameGrid.children[this.currentRow] : null;

            if (currentRowElement) {
                currentRowElement.classList.add('shake');
                currentRowElement.addEventListener('animationend', () => {
                    currentRowElement.classList.remove('shake');
                }, { once: true });
            }
        }
    }

    processValidGuess(guess) {
        this.guesses[this.currentRow] = guess;

        this.updateGridDisplay(guess);
        this.checkLettersForColors(guess);

        if (guess === this.currentWord) {
            this.displayMessage('You guessed it! 🎉');
            this.gameOver = true;
            return;
        }

        if (this.currentRow >= this.maxGuesses - 1) {
            this.displayMessage(`Game Over! The word was ${this.currentWord.toUpperCase()}.`);
            this.gameOver = true;
            return;
        }

        this.currentRow++;
    }

    createGameGrid() {
        if (!this.gameGrid) {
            console.warn("Game grid element not found. Cannot create grid.");
            return;
        }
        this.gameGrid.innerHTML = ''; // Clear existing grid
        for (let i = 0; i < this.maxGuesses; i++) {
            const row = document.createElement('div');
            row.classList.add('wordle-row'); // Add a class for styling
            for (let j = 0; j < this.wordLength; j++) {
                const cell = document.createElement('div');
                cell.classList.add('wordle-cell'); // Add a class for styling
                row.appendChild(cell);
            }
            this.gameGrid.appendChild(row);
        }
    }

    updateGridDisplay(guess) {
        const currentRowElement = this.gameGrid.children[this.currentRow];
        if (currentRowElement) {
            for (let i = 0; i < this.wordLength; i++) {
                const cellElement = currentRowElement.children[i];
                if (cellElement && guess[i]) { // Ensure cellElement and letter exist
                    cellElement.textContent = guess[i].toUpperCase(); // Put the letter into the cell
                }
            }
        }
        console.log(`Updating grid for guess: ${guess}`); // Keep this for debugging if you want
    }

    checkLettersForColors(guess) {
        // Compares 'guess' to 'this.currentWord'
        // For each letter in the guess, determine if it's:
        // - Green: Correct letter, correct position
        // - Yellow: Correct letter, wrong position
        // - Gray: Letter not in the word
        // Then, it will add/remove CSS classes ('green', 'yellow', 'gray') to the
        // respective cells in the UI grid.
        console.log(`Checking colors for guess: ${guess} against secret word: ${this.currentWord}`);

        const currentRowElement = this.gameGrid.children[this.currentRow];
        for (let i = 0; i < this.wordLength; i++) {
            const cellElement = currentRowElement.children[i]; // Get the specific cell div

            // Example logic (you'll refine this):
            let statusClass = '';
            if (guess[i] === this.currentWord[i]) {
                statusClass = 'correct';
            } else if (this.currentWord.includes(guess[i])) {
                statusClass = 'present';
            } else {
                statusClass = 'absent';
            }

            cellElement.classList.add(statusClass);

            cellElement.classList.add('flipped');
            cellElement.addEventListener('animationend', () => {
            cellElement.classList.remove('flipped');
            }, { once: true });
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {

    const gameConfig = {
        wordListPath: 'games/wordle/words.txt',
        wordLength: 5,
        maxGuesses: 6
    };

    const wordle = new Wordle(gameConfig);

    const wordsLoadedSuccessfully = await wordle.loadWords();

    if (wordsLoadedSuccessfully) {
        wordle.initializeGame();
    } else {
        console.error("Game cannot start because word list failed to load.");
    }
});
