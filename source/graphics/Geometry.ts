import Vector3 from '../math/Vector3';

export default class Geometry {

    public points: Vector3[];

    public constructor() {
        this.points = [];
    }

    public get pointCount() {
        return 0;
    }

    public getData() {
        return this.points.flatMap(point => point.components);
    }

}