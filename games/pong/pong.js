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

        this.paddleWidth = 1;
        this.paddleHeight = 5;

        this.leftPaddleY = Math.floor((this.boardHeight - this.paddleHeight) / 2);
        this.rightPaddleY = Math.floor((this.boardHeight - this.paddleHeight) / 2);

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#fff';

        for (let i = 0; i < this.paddleHeight; i++) {
            this.ctx.fillRect(
                1 * this.gridSize,
                (this.leftPaddleY + i) * this.gridSize,
                this.gridSize,
                this.gridSize
            );
        }

        for (let i = 0; i < this.paddleHeight; i++) {
            this.ctx.fillRect(
                (this.boardWidth - 2) * this.gridSize,
                (this.rightPaddleY + i) * this.gridSize,
                this.gridSize,
                this.gridSize
            )
        }


    }
}