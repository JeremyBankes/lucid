import { GenericVector } from "./GenericVector";

export class Vector4 extends GenericVector<4> {

    public get x() { return this.components[0]; }
    public set x(value: number) { this.components[0] = value; }
    public get y() { return this.components[1]; }
    public set y(value: number) { this.components[1] = value; }
    public get z() { return this.components[2]; }
    public set z(value: number) { this.components[2] = value; }
    public get w() { return this.components[3]; }
    public set w(value: number) { this.components[3] = value; }

    public get width() { return this.z; }
    public set width(value: number) { this.z = value; }
    public get height() { return this.w; }
    public set height(value: number) { this.w = value; }

}