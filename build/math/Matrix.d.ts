export default class Matrix {
    private _data;
    private _width;
    constructor(data: number[], width: number);
    get width(): number;
    get height(): number;
    get(column: number, row: number): number;
    transpose(): this;
    multiply(matrix: Matrix): this;
    toArray(): number[];
    toString(): string;
}
