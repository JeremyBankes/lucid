import Vector3 from '../math/Vector3.js';
export default class Geometry {
    points: Vector3[];
    constructor();
    get pointCount(): number;
    getData(): number[];
}
