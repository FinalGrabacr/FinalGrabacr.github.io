class PongGame {
    constructor(canvasId, boardWidth = 20, boardHeight = 20) {
        console.log("PongGame constructor called.");

        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.gridSize = 20;

        this.canvas.width = boardWidth * this.gridSize;
        this.canvas.height = boardHeight * this.gridSize;

        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;

        this.ball = null;
        this.direction = 0; // ball direction in degrees
        this.gameInterval = null;
        this.gameSpeed = 300; // milliseconds
        this.isGameOver = true;
        this.lastDirection = 0;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


    }
}