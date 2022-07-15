export default class Vector {
    private _size;
    components: number[];
    constructor(...components: number[]);
    get size(): number;
    private componentWiseOperation;
    add(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]): this;
    subtract(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]): this;
    multiply(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]): this;
    divide(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]): this;
    modulate(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]): this;
    dot(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]): number;
    getDistance(vectorOrFirstComponent: Vector | number, ...otherComponents: number[]): number;
    getMagnitude(): number;
    isZero(): boolean;
    clone(): Vector;
    toString(): string;
}
