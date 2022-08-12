import Vector from './Vector';
export default class Vector4 extends Vector {
    constructor(x?: number, y?: number, z?: number, w?: number);
    get x(): number;
    get y(): number;
    get z(): number;
    get w(): number;
    set x(value: number);
    set y(value: number);
    set z(value: number);
    set w(value: number);
}
