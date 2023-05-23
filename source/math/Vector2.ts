import { GenericVector } from "./GenericVector";

export class Vector2 extends GenericVector<2> {

    public get x() { return this.components[0]; }
    public set x(value: number) { this.components[0] = value; }
    public get y() { return this.components[1]; }
    public set y(value: number) { this.components[1] = value; }

    public get width() { return this.x; }
    public set width(value: number) { this.x = value; }
    public get height() { return this.y; }
    public set height(value: number) { this.y = value; }


}