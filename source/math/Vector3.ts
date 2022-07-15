import Vector from './Vector.js';

export default class Vector3 extends Vector {

    public constructor(x: number = 0, y: number = x, z: number = y) {
        super(x, y, z);
    }

    get x() { return this.components[0]; }
    get y() { return this.components[1]; }
    get z() { return this.components[2]; }
    set x(value: number) { this.components[0] = value; }
    set y(value: number) { this.components[1] = value; }
    set z(value: number) { this.components[2] = value; }

}