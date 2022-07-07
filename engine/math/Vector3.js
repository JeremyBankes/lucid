export default class Vector3 {

    constructor(x = 0, y = x, z = y) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * @param {Vector3|number} xOrValue
     * @param {number} [y]
     * @param {number} [z]
     */
    set(xOrValue, y = null, z = null) {
        if (xOrValue instanceof Vector3) {
            this.x = xOrValue.x;
            this.y = xOrValue.y;
            this.z = xOrValue.z;
        } else {
            this.x = xOrValue;
            this.y = y === null ? xOrValue : y;
            this.z = z === null ? xOrValue : z;
        }
        return this;
    }

    /**
     * @param {Vector3|number} xOrValue
     * @param {number} [y]
     * @param {number} [z]
     */
    add(xOrValue, y = null, z = null) {
        if (xOrValue instanceof Vector3) {
            this.x += xOrValue.x;
            this.y += xOrValue.y;
            this.z += xOrValue.z;
        } else {
            this.x += xOrValue;
            this.y += y === null ? xOrValue : y;
            this.z += z === null ? xOrValue : z;
        }
        return this;
    }

    /**
     * @param {Vector3|number} xOrValue
     * @param {number} [y]
     * @param {number} [z]
     */
    subtract(xOrValue, y = null, z = null) {
        if (xOrValue instanceof Vector3) {
            this.x -= xOrValue.x;
            this.y -= xOrValue.y;
            this.z -= xOrValue.z;
        } else {
            this.x -= xOrValue;
            this.y -= y === null ? xOrValue : y;
            this.z -= z === null ? xOrValue : z;
        }
        return this;
    }

    /**
     * @param {Vector3|number} xOrValue
     * @param {number} [y]
     * @param {number} [z]
     */
    multiply(xOrValue, y = null, z = null) {
        if (xOrValue instanceof Vector3) {
            this.x *= xOrValue.x;
            this.y *= xOrValue.y;
            this.z *= xOrValue.z;
        } else {
            this.x *= xOrValue;
            this.y *= y === null ? xOrValue : y;
            this.z *= z === null ? xOrValue : z;
        }
        return this;
    }

    /**
     * @param {Vector3|number} xOrValue
     * @param {number} [y]
     * @param {number} [z]
     */
    divide(xOrValue, y = null, z = null) {
        if (xOrValue instanceof Vector3) {
            if (xOrValue.x === 0 || xOrValue.y === 0 || xOrValue.z === 0) {
                throw new Error('Division by zero');
            }
            this.x /= xOrValue.x;
            this.y /= xOrValue.y;
            this.z /= xOrValue.z;
        } else {
            if (xOrValue === 0 || y === 0 || z === 0) {
                throw new Error('Division by zero');
            }
            this.x /= xOrValue;
            this.y /= y === null ? xOrValue : y;
            this.z /= z === null ? xOrValue : z;
        }
        return this;
    }

    /**
     * @param {Vector3} vector
     */
    cross(vector) {
        this.x = this.y * vector.z - this.z * vector.y;
        this.y = this.z * vector.x - this.x * vector.z;
        this.z = this.x * vector.y - this.y * vector.x;
        return this;
    }

    /**
     * @param {Vector3|number} value
     */
    mod(value) {
        if (value instanceof Vector3) {
            this.x %= value.x;
            this.y %= value.y;
            this.z %= value.z;
        } else {
            this.x %= value;
            this.y %= value;
            this.z %= value;
        }
        return this;
    }

    /**
     * @param {Vector3} vector
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    /**
     * @param {Vector3} vector
     */
    distance(vector) {
        return Math.sqrt((this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y) + (this.z - vector.z) * (this.z - vector.z));
    }

    magnitude() {
        return this.distance(new Vector3());
    }

    normalize() {
        if (this.x === 0 && this.y === 0 && this.z === 0) {
            return this;
        } else {
            return this.divide(this.magnitude());
        }
    }

    /**
     * @param {Vector3} vector
     */
    equals(vector) {
        return this.x === vector.x && this.y === vector.y && this.z === vector.z;
    }

    isZero() {
        return this.x === 0 && this.y === 0 && this.z === 0;
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    toArray() {
        return [this.x, this.y, this.z];
    }

}