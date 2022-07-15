export default class Matrix {
    private _data;
    private _width;
    constructor(data: number[], width: number);
    get width(): number;
    get height(): number;
    transpose(): void;
    multiply(matrix: Matrix): void;
    toString(): string;
}
