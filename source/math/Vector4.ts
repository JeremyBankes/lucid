import Vector from './Vector';

export default class Vector4 extends Vector {

    public constructor(x: number = 0, y: number = x, z: number = y, w: number = z) {
        super(x, y, z, w);
    }

    get x() { return this.components[0]; }
    get y() { return this.components[1]; }
    get z() { return this.components[2]; }
    get w() { return this.components[3]; }
    set x(value: number) { this.components[0] = value; }
    set y(value: number) { this.components[1] = value; }
    set z(value: number) { this.components[2] = value; }
    set w(value: number) { this.components[3] = value; }

}