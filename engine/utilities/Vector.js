
class Vector {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(x, y = x) {
        this.x += x;
        this.y += y;
        return this;
    }

    subtract(x, y = x) {
        this.x -= x;
        this.y -= y;
        return this;
    }

    multiply(x, y = x) {
        this.x *= x;
        this.y *= y;
        return this;
    }

    divide(x, y = x) {
        this.x /= x;
        this.y /= y;
        return this;
    }

    /**
     * Determines the distance between two vectors
     * @param {Vector} vector The target vector
     * @returns The distance between this vector and the target vector
     */
    distance(vector) {
        return Math.sqrt((this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y));
    }

    /**
     * Determines the distance between this vector, and a given point
     * @param {number} x The x coordinate of the point
     * @param {number} y The y coordinate of the point
     * @returns The distance vetween this vector and the target point
     */
    distancePoint(x, y) {
        return Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y));
    }

    magnitude() {
        return this.distancePoint(0, 0);
    }

}

export default Point;