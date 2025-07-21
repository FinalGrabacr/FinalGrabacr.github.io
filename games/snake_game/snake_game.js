const width = 15;
const height = 15;

class SnakeGame {
    constructor(canvasId, boardWidth = 20, boardHeight = 20) {
        console.log("SnakeGame constructor called.");

        // Canvas setup
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.canvas.width = boardWidth * this.gridSize;
        this.canvas.height = boardHeight * this.gridSize;

        // Board dimensions in terms of grid units
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;

        // Game state variables
        this.snake = []; // Initialized as empty, will be set in initializeGame
        this.food = null; // Initially no food, set to null to avoid initial drawing warnings
        this.direction = ''; // Initial direction, set in initializeGame
        this.score = 0;
        this.gameInterval = null; // To hold the setInterval ID
        this.gameSpeed = 150; // Milliseconds per game update (lower = faster)
        this.isGameOver = true; // Initially, the game is not running
        this.lastDirectionInput = ''; // To prevent immediate 180-degree turns

        // References to HTML elements
        this.scoreDisplay = document.getElementById('score');
        this.startButton = document.getElementById('startButton');

        // Bind event listeners to maintain 'this' context within class methods
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.startButton.addEventListener('click', this.startGame.bind(this));
    }

    // --- Helper Methods (Internal to the class) ---

    /**
     * Generates a new random food position, ensuring it's not on the snake.
     * @private
     */
    _generateFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * this.boardWidth),
                y: Math.floor(Math.random() * this.boardHeight)
            };
        } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)); // Loop until not on snake

        this.food = newFood;
        console.log("Food generated at:", JSON.stringify(this.food));
    }

    /**
     * Checks if a given head segment collides with any segment in an array (e.g., snake body).
     * @param {object} head - The snake's head coordinates {x, y}.
     * @param {Array<object>} array - The array of segments to check against.
     * @private
     * @returns {boolean} - True if collision occurs, false otherwise.
     */
    _checkCollision(head, array) {
        return array.some(segment => segment.x === head.x && segment.y === head.y);
    }

    // --- Public Game Methods ---

    /**
     * Initializes or resets the game state for a new round.
     */
    initializeGame() {
        console.log("initializeGame called.");
        // Reset snake to starting position (center of board)
        this.snake = [{ x: Math.floor(this.boardWidth / 2), y: Math.floor(this.boardHeight / 2) }];
        this.direction = 'right'; // Start moving right
        this.lastDirectionInput = 'right';
        this.score = 0;
        this.scoreDisplay.textContent = this.score; // Update score display
        this._generateFood(); // Place the first food item
        this.isGameOver = false; // Game is now running

        // Hide start button once game starts
        this.startButton.style.display = 'none';

        // Clear any existing game loop to prevent multiple loops running
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }
        // Start the game loop at the defined speed
        this.gameInterval = setInterval(() => this.gameLoop(), this.gameSpeed);
        console.log("Game loop started with speed:", this.gameSpeed);

        this.draw(); // Draw the initial state of the game
    }

    /**
     * Draws all game elements (snake, food) on the canvas.
     */
    draw() {
        // Clear the entire canvas before drawing new frame
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        if (this.snake && this.snake.length > 0) {
            this.ctx.fillStyle = 'lime'; // Color for the snake
            this.snake.forEach(segment => {
                this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize);
            });
        }

        // Draw food (only if it exists and has valid coordinates)
        if (this.food && typeof this.food.x === 'number' && typeof this.food.y === 'number') {
            this.ctx.fillStyle = 'red'; // Color for the food
            this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize, this.gridSize);
        }
    }

    /**
     * The main game loop function, called repeatedly by setInterval.
     * Updates game state, moves snake, checks collisions, updates score.
     */
    gameLoop() {
        console.log("gameLoop called. Current Score:", this.score, "Snake Head:", JSON.stringify(this.snake[0]), "Direction:", this.direction);
        if (this.isGameOver) {
            console.log("gameLoop stopping: Game is over (isGameOver is true).");
            return;
        }

        // Create new head position based on current direction
        const head = { x: this.snake[0].x, y: this.snake[0].y };

        switch (this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }

        // Add the new head to the beginning of the snake array
        this.snake.unshift(head);
        console.log("Snake after unshift:", JSON.stringify(this.snake));

        // Check for food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            console.log("Food eaten! Score:", this.score);
            this.score++;
            this.scoreDisplay.textContent = this.score;
            this._generateFood(); // Generate new food
        } else {
            this.snake.pop(); // Remove tail if no food eaten (snake moves but doesn't grow)
            console.log("Snake after pop:", JSON.stringify(this.snake));
        }

        // Check for collisions (walls and self-collision)
        // Wall collision: head goes outside canvas boundaries
        // Self-collision: head collides with any part of its own body (excluding the head itself)
        if (
            head.x < 0 || head.x >= this.boardWidth ||
            head.y < 0 || head.y >= this.boardHeight ||
            this._checkCollision(head, this.snake.slice(1)) // Slice(1) gets all segments EXCEPT the new head
        ) {
            console.log("Collision detected! Calling gameOver(). Head:", JSON.stringify(head));
            this.gameOver();
            return; // Stop further execution for this game loop tick
        }

        this.draw(); // Redraw the game after state update
    }

    /**
     * Handles keyboard input for changing snake direction.
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    handleKeyDown(event) {
        // Prevent default scroll behavior for arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
        }

        const newDirection = event.key.replace('Arrow', '').toLowerCase();

        // Prevent immediate 180-degree turns
        const oppositeDirections = {
            'up': 'down', 'down': 'up',
            'left': 'right', 'right': 'left'
        };

        // Only change direction if it's not the opposite of the current direction
        if (newDirection in oppositeDirections && this.direction !== oppositeDirections[newDirection]) {
            this.direction = newDirection;
            console.log("Direction changed to:", this.direction);
        }
    }

    /**
     * Starts the game from the "Play Game" button click.
     */
    startGame() {
        console.log("Start Game button clicked.");
        // Attach keyboard listener only when game starts (or is active)
        document.addEventListener('keydown', this.handleKeyDown);
        this.initializeGame(); // Initialize/reset the game
    }

    /**
     * Handles the end of the game (collision or other game over conditions).
     */
    gameOver() {
        this.isGameOver = true;
        clearInterval(this.gameInterval); // Stop the game loop
        document.removeEventListener('keydown', this.handleKeyDown); // Remove keyboard listener

        alert(`Game Over! Your score: ${this.score}`); // Notify the player

        console.log("Game Over triggered!");
        this.startButton.textContent = 'Play Again'; // Change button text
        this.startButton.style.display = 'block'; // Show button to restart
    }
}

// --- Initialize the Game When the DOM is Ready ---
// This ensures all HTML elements are loaded before the JavaScript tries to access them.
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded fired. Initializing SnakeGame instance.");
    // Create an instance of the SnakeGame class
    // 'gameCanvas' is the ID of your <canvas> element in HTML
    // 'width' and 'height' are the global constants defined at the top of this file
    const snakeGame = new SnakeGame('gameCanvas', width, height);
    snakeGame.draw(); // Initial draw to show the static snake head before the game starts
    console.log("Initial draw complete (static snake head visible).");

    // The game will start when the user clicks the "Start Game" button.
    // The event listener for the button is set up inside the class constructor's bind.
});