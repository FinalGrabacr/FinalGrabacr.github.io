class Wordle {
    construction(config) {
        this.wordList = [];
        this.currentWord = '';
        this.guesses = [];
        this.currentRow = 0;
        this.gameOver = false;

        this.wordListPath = config.wordListPath;
        this.wordLength = config.wordLength || 5;
        this.maxGuesses = config.maxGuesses || 6;
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
    }
}

document.addEventListener('DOMContentLoaded', async () => {

    const gameConfig = {
        wordListPath: 'games/wordle/words.txt',
        wordLength: 5,
        maxGuesses: 6
    };

    const wordle = new WordleGame(gameConfig);

    const wordsLoadedSuccessfully = await wordle.loadWords();

    if (wordsLoadedSuccessfully) {
        wordle.initializeGame();
    } else {
        console.error("Game cannot start because word list failed to load.");
    }
});
