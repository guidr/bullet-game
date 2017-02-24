(function (window, document) {
    'use strict';

    function Game (canvas) {
        this.canvas = canvas;
        this.bullets = [ ];

        this.animation;
    }

    Game.prototype.start = function () {
        if (!this.animation) {
        //     return alert('Game already started');
            this.canvas.addEventListener('mousedown', this.triggerBullet.bind(this), false);
        }

        this.draw();
    }

    Game.prototype.pause = function () {
        // this.canvas.removeEventListener('mousedown', this.triggerBullet.bind(this), false);
        window.cancelAnimationFrame(this.animation);
    }

    Game.prototype.triggerBullet = function (event) {
        this.createBullet(event.clientX, event.clientY);
    }

    Game.prototype.draw = function () {
        // console.log(new Date().toLocaleTimeString());

        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var i,
            totalBullets = this.bullets.length;

        for (i = 0; i < totalBullets; i++) {
            this.bullets[i].draw(this.canvas, ctx);
        }

        this.animation = window.requestAnimationFrame(this.draw.bind(this));
    }

    Game.prototype.createBullet = function (positionX, positionY) {
        var bullet = new Bullet(positionX, positionY);
        this.bullets.push(bullet);

        // console.log(this.bullets);

        return bullet;
    }

    function Bullet (x, y) {
        this.x = x;
        this.y = y;
        this.speed = this.getRandomSpeed();
        this.angleSpeed = this.getRandomSpeed();
        this.alive = true;

        // var speed = this.getRandomSpeed();
        // setInterval(function () {
        //     this.x = this.x + 1;
        //     // console.log('updated ' + this.x);
        // }.bind(this), speed);

        console.log(this.angleSpeed);
    }

    Bullet.prototype.getRandomSpeed = function () {
        // return (Math.random() * 5) //+ 1;
        var max = 10, min = -10;
        return Math.random() * (max - min) + min;
    }

    Bullet.prototype.isTouchingEdgesOf = function (canvas) {
        if (this.x <= 6) {
            this.x = 6;
            return true;
        }

        if (this.y <= 6) {
            this.y = 6;
            return true;
        }

        if (this.x >= canvas.clientWidth - 6) {
            this.x = canvas.clientWidth - 6;
            return true;
        }

        if (this.y >= canvas.clientHeight - 6) {
            this.y = canvas.clientHeight - 6;
            return true;
        }

        return false;
    }

    Bullet.prototype.draw = function (canvas, ctx) {
        // var ctx = canvas.getContext('2d');
        if (this.alive) {
            this.x = this.x + this.speed;
            this.y = this.y + this.angleSpeed;

            // if (this.speed > 0) {
            //     if (this.x + 6 >= canvas.clientWidth) {
            //         this.x = canvas.clientWidth - 6;
            //         this.alive = false;
            //     }
            // } else {
            //     if (this.x - 6 < 0) {
            //         this.x = 6;
            //         this.alive = false;
            //     }
            // }
            if (this.isTouchingEdgesOf(canvas)) {
                this.alive = false;
            }


        } else {
            // this.y = this.y + 15;

            // if (this.y + 6 >= canvas.clientHeight) {
            //     this.y = canvas.clientHeight - 6;
            // }
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);

        // if (!this.alive) {
        //     ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
        //     ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        //     ctx.fill();
        // } else {
        //     ctx.strokeStyle = null;
        // }

        ctx.stroke();
    }


    var game = new Game(document.querySelector('#game'));
    game.start();


    document.querySelector('#controls #pauseButton').addEventListener('click', function () {
        game.pause();
    });

    document.querySelector('#controls #resumeButton').addEventListener('click', function () {
        game.start();
    });






/*
    var game = document.querySelector('#game');
    // console.log(game);

    game.addEventListener('mousedown', onClick, false);

   // var x = null;

    function onClick(event) {
        // console.log(event);
        //x = event.clientX;

        var bullet = drawBullet(event.target, event.clientX, event.clientY);

        // setTimeout(function () {
        //     move(bullet);
        // }, 500);
    }

    function drawBullet(game, x, y) {
        var ctx = game.getContext('2d');

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.stroke();

        window.requestAnimationFrame(function () {
            x = x + 2;

            // console.log(x, game.clientWidth);

            if (x + 5 <= game.clientWidth) {
                return drawBullet(game, x + 2, y);
            }

            alert('Game over');
        });

        return ctx;
    }

    function move(bullet) {
        console.log('Moving bullet');
        console.log(bullet);
    }
*/
})(window, document);
