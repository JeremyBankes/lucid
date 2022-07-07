export default class Vector4 {

    constructor(x = 0, y = x, z = y, w = z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    /**
     * @param {Vector4|number} xOrValue
     * @param {number} [y]
     * @param {number} [z]
     * @param {number} [w]
     */
    set(xOrValue, y = null, z = null, w = null) {
        if (xOrValue instanceof Vector4) {
            this.x = xOrValue.x;
            this.y = xOrValue.y;
            this.z = xOrValue.z;
            this.w = xOrValue.w;
        } else {
            this.x = xOrValue;
            this.y = y === null ? xOrValue : y;
            this.z = z === null ? xOrValue : z;
            this.w = w === null ? xOrValue : w;
        }
        return this;
    }

    /**
     * @param {Vector4|number} xOrValue
     * @param {number} [y]
     * @param {number} [z]
     * @param {number} [w]
     */
    add(xOrValue, y = null, z = null, w = null) {
        if (xOrValue instanceof Vector4) {
            this.x += xOrValue.x;
            this.y += xOrValue.y;
            this.z += xOrValue.z;
            this.w += xOrValue.w;
        } else {
            this.x += xOrValue;
            this.y += y === null ? xOrValue : y;
            this.z += z === null ? xOrValue : z;
            this.w += w === null ? xOrValue : w;
        }
        return this;
    }

    /**
     * @param {Vector4|number} xOrValue
     * @param {number} [y]
     * @param {number} [z]
     * @param {number} [w]
     */
    subtract(xOrValue, y = null, z = null, w = null) {
        if (xOrValue instanceof Vector4) {
            this.x -= xOrValue.x;
            this.y -= xOrValue.y;
            this.z -= xOrValue.z;
            this.w -= xOrValue.w;
        } else {
            this.x -= xOrValue;
            this.y -= y === null ? xOrValue : y;
            this.z -= z === null ? xOrValue : z;
            this.w -= w === null ? xOrValue : w;
        }
        return this;
    }

    /**
     * @param {Vector4|number} xOrValue
     * @param {number} [y]
     * @param {number} [z]
     * @param {number} [w]
     */
    multiply(xOrValue, y = null, z = null, w = null) {
        if (xOrValue instanceof Vector4) {
            this.x *= xOrValue.x;
            this.y *= xOrValue.y;
            this.z *= xOrValue.z;
            this.w *= xOrValue.w;
        } else {
            this.x *= xOrValue;
            this.y *= y === null ? xOrValue : y;
            this.z *= z === null ? xOrValue : z;
            this.w *= w === null ? xOrValue : w;
        }
        return this;
    }

    /**
     * @param {Vector4|number} xOrValue
     * @param {number} [y]
     * @param {number} [z]
     * @param {number} [w]
     */
    divide(xOrValue, y = null, z = null, w = null) {
        if (xOrValue instanceof Vector4) {
            if (xOrValue.x === 0 || xOrValue.y === 0 || xOrValue.z === 0 || xOrValue.w === 0) {
                throw new Error('Division by zero');
            }
            this.x /= xOrValue.x;
            this.y /= xOrValue.y;
            this.z /= xOrValue.z;
            this.w /= xOrValue.w;
        } else {
            if (xOrValue === 0 || y === 0 || z === 0 || w === 0) {
                throw new Error('Division by zero');
            }
            this.x /= xOrValue;
            this.y /= y === null ? xOrValue : y;
            this.z /= z === null ? xOrValue : z;
            this.w /= w === null ? xOrValue : w;
        }
        return this;
    }

    /**
     * @param {Vector4|number} value
     */
    mod(value) {
        if (value instanceof Vector4) {
            this.x %= value.x;
            this.y %= value.y;
            this.z %= value.z;
            this.w %= value.w;
        } else {
            this.x %= value;
            this.y %= value;
            this.z %= value;
            this.w %= value;
        }
        return this;
    }

    /**
     * @param {Vector4} vector
     */
    equals(vector) {
        return this.x === vector.x && this.y === vector.y && this.z === vector.z && this.w === vector.w;
    }

    isZero() {
        return this.x === 0 && this.y === 0 && this.z === 0 && this.w === 0;
    }

    clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    toArray() {
        return [this.x, this.y, this.z, this.w];
    }

}