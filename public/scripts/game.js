class PongGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ball = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            radius: 10,
            speedX: 2,
            speedY: 2,
            color: 'white'
        };

        this.leftPaddle = {
            x: 10,
            y: this.canvas.height / 2 - 50,
            width: 15,
            height: 100,
            speedY: 16,
            color: 'white'
        };

        this.rightPaddle = {
            x: this.canvas.width - 25,
            y: this.canvas.height / 2 - 50,
            width: 15,
            height: 100,
            speedY: 16,
            color: 'white'
        };

        this.keys = {
            w: false,
            s: false,
            ArrowUp: false,
            ArrowDown: false
        };

        this.leftScore = 0;
        this.rightScore = 0;

        this.start();
        document.addEventListener('keydown', (e) => this.handleInput(e));

        document.addEventListener('keydown', (e) => {
            if (this.keys.hasOwnProperty(e.key)) {
                this.keys[e.key] = true;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            if (this.keys.hasOwnProperty(e.key)) {
                this.keys[e.key] = false;
            }
        });
        
    }

    drawCircle(x, y, radius, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawRectangle(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    resetBall() {
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        this.ball.speedX = -this.ball.speedX;
    }

    handleInput(e) {
        switch(e.key) {
            case 'w':
                this.leftPaddle.y -= this.leftPaddle.speedY;
                break;
            case 's':
                this.leftPaddle.y += this.leftPaddle.speedY;
                break;
            case 'ArrowUp':
                this.rightPaddle.y -= this.rightPaddle.speedY;
                break;
            case 'ArrowDown':
                this.rightPaddle.y += this.rightPaddle.speedY;
                break;
            case 'r':
                this.resetGame();
                break;
        }
    }

    update() {

        // Move the left paddle
        if (this.keys.w) {
            this.leftPaddle.y = Math.max(0, this.leftPaddle.y - this.leftPaddle.speedY);
        }
        if (this.keys.s) {
            this.leftPaddle.y = Math.min(this.canvas.height - this.leftPaddle.height, this.leftPaddle.y + this.leftPaddle.speedY);
        }

        // Move the right paddle
        if (this.keys.ArrowUp) {
            this.rightPaddle.y = Math.max(0, this.rightPaddle.y - this.rightPaddle.speedY);
        }     
        if (this.keys.ArrowDown) {
            this.rightPaddle.y = Math.min(this.canvas.height - this.rightPaddle.height, this.rightPaddle.y + this.rightPaddle.speedY);
        }


        // Move the ball
        this.ball.x += this.ball.speedX;
        this.ball.y += this.ball.speedY;

        if(this.ball.y + this.ball.radius > this.canvas.height || this.ball.y - this.ball.radius < 0) {
            this.ball.speedY = -this.ball.speedY;
        }

        // Ball hits left paddle
        if(this.ball.x - this.ball.radius < this.leftPaddle.x + this.leftPaddle.width && this.ball.x - this.ball.radius > this.leftPaddle.x && this.ball.y > this.leftPaddle.y && this.ball.y < this.leftPaddle.y + this.leftPaddle.height) {
            this.ball.speedX = -this.ball.speedX;
        }

        // Ball hits right paddle
        if(this.ball.x + this.ball.radius > this.rightPaddle.x && this.ball.x + this.ball.radius < this.rightPaddle.x + this.rightPaddle.width && this.ball.y > this.rightPaddle.y && this.ball.y < this.rightPaddle.y + this.rightPaddle.height) {
            this.ball.speedX = -this.ball.speedX;
        }

        // Ball goes out of bounds
        if(this.ball.x + this.ball.radius > this.canvas.width) {
            this.leftScore++;
            this.resetBall();
        }

        if(this.ball.x - this.ball.radius < 0) {
            this.rightScore++;
            this.resetBall();
        }

        this.redraw();

        requestAnimationFrame(() => this.update());
    }

    redraw() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Fill the canvas with black background
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        // Draw the ball
        this.drawCircle(this.ball.x, this.ball.y, this.ball.radius, this.ball.color);
    
        // Draw paddles
        this.drawRectangle(this.leftPaddle.x, this.leftPaddle.y, this.leftPaddle.width, this.leftPaddle.height, this.leftPaddle.color);
        this.drawRectangle(this.rightPaddle.x, this.rightPaddle.y, this.rightPaddle.width, this.rightPaddle.height, this.rightPaddle.color);
    
        // Draw score
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.fillText(this.leftScore, this.canvas.width / 4, 30);
        this.ctx.fillText(this.rightScore, 3 * this.canvas.width / 4, 30);
    }
    

    resetGame() {
        this.leftScore = 0;
        this.rightScore = 0;
        this.resetBall();
    }

    start() {
        this.resetGame();
        this.update();
    }
}

document.myGame = new PongGame();

// log the score once every second
setInterval(() => {
    console.log(`Left Score: ${document.myGame.leftScore}, Right Score: ${document.myGame.rightScore}`);
}, 1000);
