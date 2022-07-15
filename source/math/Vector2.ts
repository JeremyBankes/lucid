import Vector from './Vector.js';

export default class Vector2 extends Vector {

    public constructor(x: number = 0, y: number = x) {
        super(x, y);
    }

    get x() { return this.components[0]; }
    get y() { return this.components[1]; }
    set x(value: number) { this.components[0] = value; }
    set y(value: number) { this.components[1] = value; }

}