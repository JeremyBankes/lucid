import Vector from './Vector.js';
export default class Vector4 extends Vector {
    constructor(x = 0, y = x, z = y, w = z) {
        super(x, y, z, w);
    }
    get x() { return this.components[0]; }
    get y() { return this.components[1]; }
    get z() { return this.components[2]; }
    get w() { return this.components[3]; }
    set x(value) { this.components[0] = value; }
    set y(value) { this.components[1] = value; }
    set z(value) { this.components[2] = value; }
    set w(value) { this.components[3] = value; }
}
