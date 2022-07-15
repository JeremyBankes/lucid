export default class Geometry {
    points;
    constructor() {
        this.points = [];
    }
    get pointCount() {
        return 0;
    }
    getData() {
        return this.points.flatMap(point => point.components);
    }
}
