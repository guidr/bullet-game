var Bullet = (function () {
    'use strict';

    function Bullet(positionX, positionY) {
        this.x = positionX;
        this.y = positionY;

        this._isAlive = true;
        this._speedX = getRandomSpeed();
        this._speedY = getRandomSpeed();
    }

    Bullet.Styles = {
        STROKE_STYLE: 'black',
        LINE_WIDTH: 1,
        RADIUS: 5,
    }

    Bullet.prototype.isAlive = function () {
        return this._isAlive;
    }

    Bullet.prototype.kill = function () {
        this._isAlive = false;
    }

    Bullet.prototype.move = function () {
        this.x = this.x + this._speedX;
        this.y = this.y + this._speedY;
    }

    Bullet.prototype.isTouchingAnyEdgeOf = function (canvas) {
        var bulletHalfWidth = Bullet.Styles.RADIUS + Bullet.Styles.LINE_WIDTH;

        if (this.x <= bulletHalfWidth) {
            return { x: bulletHalfWidth, y: this.y };
        } else if (this.y <= bulletHalfWidth) {
            return { x: this.x, y: bulletHalfWidth };
        } else if (this.x >= canvas.clientWidth - bulletHalfWidth) {
            return { x: canvas.clientWidth - bulletHalfWidth, y: this.y };
        } else if (this.y >= canvas.clientHeight - bulletHalfWidth) {
            return { x: this.x, y: canvas.clientHeight - bulletHalfWidth };
        }

        return false;
    }

    return Bullet;

    /**
     * Helpers
     */

    function getRandomSpeed (max, min) {
        max = max || 10;
        min = min || -10;

        return Math.random() * (max - min) + min;
    }

})();
