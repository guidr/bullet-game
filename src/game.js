var Game = (function (window, document) {
    'use strict';

    // constants
    var LOG_TIMEOUT = 1000;

    // private attibutes
    var _canvas,
        _bullets = [ ],
        _logs = [ ],
        _logId = 0;

    function Game (canvas) {
        _canvas = canvas;

        // do initial resize and attach event to window
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // load shot shound
        this.shotShound = new Audio('shot.wav');
    }

    Game.prototype.start = function () {
        // bind mousedown event to shot a new bullet
        _canvas.addEventListener('mousedown', this.shot.bind(this));

        // do inital draw on canvas
        draw();
    }

    Game.prototype.shot = function (event) {
        // create bullet at mouse positions
        var bullet = new Bullet(event.clientX, event.clientY);
        log('Triggered at [' + bullet.x + ', ' + bullet.y + ']');
        _bullets.push(bullet);

        // play shot sound
        if (!this.shotShound.paused) {
            this.shotShound.pause();
        }

        this.shotShound.currentTime = 0;
        this.shotShound.play();
    }

    return Game;

    /**
     * Helpers / Private methods
     */

    function resizeCanvas () {
        _canvas.width = window.innerWidth;
        _canvas.height = window.innerHeight;
    }

    function draw () {
        var context = _canvas.getContext('2d');

        // clear the canvas for redraw
        context.clearRect(0, 0, _canvas.width, _canvas.height);

        // filter bullets to remove dead elements
        _bullets = _bullets.filter(function (bullet) {
            return bullet.isAlive();
        });

        // if (_bullets.length === 0) {
        //     console.log('idle');
        // }

        _bullets.forEach(function (bullet) {
            var touchingPosition = bullet.isTouchingAnyEdgeOf(_canvas);
            if (touchingPosition !== false) {
                // bullet is touching canvas edge. mark it as dead
                bullet.kill();

                log('Hit edge at [' + Math.round(touchingPosition.x) + ', ' + Math.round(touchingPosition.y) + ']')
            }

            // draw bullet on canvas
            context.beginPath();
            context.arc(bullet.x, bullet.y, Bullet.Styles.RADIUS, 0, 2 * Math.PI);
            context.strokeStyle = Bullet.Styles.STROKE_STYLE;
            context.lineWidth = Bullet.Styles.LINE_WIDTH;
            context.stroke();

            // update bullet position for next redraw
            bullet.move();
        });

        _logs.forEach(function (log, index) {
            var textX = _canvas.clientWidth - context.measureText(log.message).width - 10,
                textY = _canvas.clientHeight - 10 - (15 * index);

            context.fillText(log.message, textX, textY);
        });

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        requestAnimationFrame(draw);
    }

    function log (message) {
        var log = { id: ++_logId, message: message };
        _logs.push(log);

        setTimeout(function () {
            var index = _logs.indexOf(log);
            if (index > -1) {
                _logs.splice(index, 1);
            }
        }, LOG_TIMEOUT);
    }

})(window, document);
