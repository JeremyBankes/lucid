import Vector from './Vector.js';
export default class Vector3 extends Vector {
    constructor(x?: number, y?: number, z?: number);
    get x(): number;
    get y(): number;
    get z(): number;
    set x(value: number);
    set y(value: number);
    set z(value: number);
}
