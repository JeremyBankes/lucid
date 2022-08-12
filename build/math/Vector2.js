import Vector from './Vector';
export default class Vector2 extends Vector {
    constructor(x = 0, y = x) {
        super(x, y);
    }
    get x() { return this.components[0]; }
    get y() { return this.components[1]; }
    set x(value) { this.components[0] = value; }
    set y(value) { this.components[1] = value; }
}
