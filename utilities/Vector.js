export default class Vector {

    static UP = new Vector(0, -1);

    constructor(x = 0, y = x) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Vector|number} value
     */
    set(value) {
        if (value instanceof Vector) {
            this.x = value.x;
            this.y = value.y;
        } else {
            this.x = value;
            this.y = value;
        }
        return this;
    }

    /**
     * @param {Vector|number} value
     */
    add(value) {
        if (value instanceof Vector) {
            this.x += value.x;
            this.y += value.y;
        } else {
            this.x += value;
            this.y += value;
        }
        return this;
    }

    /**
     * @param {Vector|number} value
     */
    subtract(value) {
        if (value instanceof Vector) {
            this.x -= value.x;
            this.y -= value.y;
        } else {
            this.x
        }
        return this;
    }

    /**
     * @param {Vector|number} value
     */
    multiply(value) {
        if (value instanceof Vector) {
            this.x *= value.x;
            this.y *= value.y;
        } else {
            this.x *= value;
            this.y *= value;
        }
        return this;
    }

    /**
     * @param {Vector|number} value
     */
    divide(value) {
        if (value instanceof Vector) {
            if (value.x === 0 || value.y === 0) {
                throw new Error('Division by zero');
            }
            this.x /= value.x;
            this.y /= value.y;
        } else {
            if (value === 0) {
                throw new Error('Division by zero');
            }
            this.x /= value;
            this.y /= value;
        }
        return this;
    }

    /**
     * @param {Vector} vector
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * @param {Vector} vector
     */
    cross(vector) {
        return (this.x * vector.y) - (this.y * vector.x);
    }

    /**
     * @param {Vector|number} value
     */
    mod(value) {
        if (value instanceof Vector) {
            this.x %= value.x;
            this.y %= value.y;
        } else {
            this.x %= value;
            this.y %= value;
        }
        return this;
    }

    /**
     * @param {Vector} vector
     */
    distance(vector) {
        return Math.sqrt((this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y));
    }

    magnitude() {
        return this.distance(new Vector());
    }

    normalize() {
        if (this.x === 0 && this.y === 0) {
            return this;
        } else {
            return this.divide(this.magnitude());
        }
    }

    /**
     * @param {Vector} vector
     */
    equals(vector) {
        return this.x === vector.x && this.y === vector.y;
    }

    isZero() {
        return this.x === 0 && this.y === 0;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

}