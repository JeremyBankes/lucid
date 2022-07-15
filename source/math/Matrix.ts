export default class Matrix {

    private _data: number[];
    private _width: number;

    constructor(data: number[], width: number) {
        this._data = data;
        this._width = width;
        if (this._data.length % this._width !== 0) {
            throw new Error('Cannot create a complete matrix from given data.');
        }
    }

    public get width() {
        return this._width;
    }

    public get height() {
        return this._data.length / this.width;
    }

    public transpose() {
        const oldData = [...this._data];
        for (let i = 0; i < this._data.length; i++) {
            const x = i % this.width;
            const y = Math.floor(i / this.width);
            this._data[x * this.height + y] = oldData[y * this.width + x];
        }
        this._width = this.height;
    }

    public multiply(matrix: Matrix) {
        // TO-DO Matrix multiplication
    }

    public toString() {
        let line = [];
        const lines = [];
        let longestNumberLength = 0;
        for (let i = 0; i < this._data.length; i++) {
            const numberLength = this._data[i].toLocaleString([], {}).length;
            if (numberLength > longestNumberLength) {
                longestNumberLength = numberLength;
            }
        }
        for (let i = 0; i < this._data.length; i++) {
            const value = this._data[i];
            line.push(value.toLocaleString([], {}).padStart(longestNumberLength, ' '));
            if (line.length >= this.width) {
                lines.push(`[ ${line.join(', ')} ]`);
                line = [];
            }
        }
        return `Matrix (${this.width}x${this.height})\n${lines.join('\n')}`;
    }

}