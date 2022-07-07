export default class Vector2 {

    /**
     * Creates a 2-component vector.
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = x) {
        this.data = /** @type {[number, number]} */ ([x, y]);
    }

    get x() { return this.data[0]; }

    set x(value) { this.data[0] = value; }

    get y() { return this.data[1]; }

    set y(value) { this.data[1] = value; }

    /**
     * Sets the value of this vector.
     * @param {Vector2|number} xOrValue
     * @param {number} [y]
     */
    set(xOrValue, y = null) {
        if (xOrValue instanceof Vector2) {
            this.x = xOrValue.x;
            this.y = xOrValue.y;
        } else {
            this.x = xOrValue;
            this.y = y === null ? xOrValue : y;
        }
        return this;
    }

    /**
     * Adds to the value of this vector.
     * @param {Vector2|number} xOrValue
     * @param {number} [y]
     */
    add(xOrValue, y = null) {
        if (xOrValue instanceof Vector2) {
            this.x += xOrValue.x;
            this.y += xOrValue.y;
        } else {
            this.x += xOrValue;
            this.y += y === null ? xOrValue : y;
        }
        return this;
    }

    /**
     * Subtracts from the value of this vector.
     * @param {Vector2|number} xOrValue
     * @param {number} [y]
     */
    subtract(xOrValue, y = null) {
        if (xOrValue instanceof Vector2) {
            this.x -= xOrValue.x;
            this.y -= xOrValue.y;
        } else {
            this.x -= xOrValue;
            this.y -= y === null ? xOrValue : y;
        }
        return this;
    }

    /**
     * Multiplies the value of this vector.
     * @param {Vector2|number} xOrValue
     * @param {number} [y]
     */
    multiply(xOrValue, y = null) {
        if (xOrValue instanceof Vector2) {
            this.x *= xOrValue.x;
            this.y *= xOrValue.y;
        } else {
            this.x *= xOrValue;
            this.y *= y === null ? xOrValue : y;
        }
        return this;
    }

    /**
     * Divides the value of this vector.
     * @param {Vector2|number} xOrValue
     * @param {number} [y]
     */
    divide(xOrValue, y = null) {
        if (xOrValue instanceof Vector2) {
            if (xOrValue.x === 0 || xOrValue.y === 0) {
                throw new Error('Division by zero');
            }
            this.x /= xOrValue.x;
            this.y /= xOrValue.y;
        } else {
            if (xOrValue === 0 || y === 0) {
                throw new Error('Division by zero');
            }
            this.x /= xOrValue;
            this.y /= y === null ? xOrValue : y;
        }
        return this;
    }

    /**
    * Modulates the value of this vector.
    * @param {Vector2|number} value
    */
    mod(value) {
        if (value instanceof Vector2) {
            this.x %= value.x;
            this.y %= value.y;
        } else {
            this.x %= value;
            this.y %= value;
        }
        return this;
    }

    /**
     * @param {Vector2} vector
     * @returns The dot product of this vector and {@link vector}.
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * @param {Vector2} vector
     * @returns The distance between this vector and {@link vector} in 2D space.
     */
    distance(vector) {
        return Math.sqrt((this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y));
    }

    /**
     * @returns The magnitude of this vector.
     */
    magnitude() {
        return this.distance(new Vector2());
    }

    /**
     * Normalizes this vector into a scale of 0 to 1.
     */
    normalize() {
        if (this.x === 0 && this.y === 0) {
            return this;
        } else {
            return this.divide(this.magnitude());
        }
    }

    /**
     * @param {Vector2} vector
     * @returns True if this vector and {@link vector} are equal.
     */
    equals(vector) {
        return this.x === vector.x && this.y === vector.y;
    }

    /**
     * @returns True if this vector is zero.
     */
    isZero() {
        return this.x === 0 && this.y === 0;
    }

    /**
     * @returns A clone of this vector.
     */
    clone() {
        return new Vector2(this.x, this.y);
    }

    /**
     * @returns {[number, number]} The components of this vector as an array.
     */
    toArray() {
        return [...this.data];
    }

}