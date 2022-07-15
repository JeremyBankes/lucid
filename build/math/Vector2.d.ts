import Vector from './Vector.js';
export default class Vector2 extends Vector {
    constructor(x?: number, y?: number);
    get x(): number;
    get y(): number;
    set x(value: number);
    set y(value: number);
}
