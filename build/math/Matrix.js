export default class Matrix {
    _data;
    _width;
    constructor(data, width) {
        this._data = data;
        this._width = width;
        if (this._data.length % this._width !== 0) {
            throw new Error('Cannot create a complete matrix from given data.');
        }
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._data.length / this.width;
    }
    transpose() {
        const oldData = [...this._data];
        for (let i = 0; i < this._data.length; i++) {
            const x = i % this.width;
            const y = Math.floor(i / this.width);
            this._data[x * this.height + y] = oldData[y * this.width + x];
        }
        this._width = this.height;
    }
    multiply(matrix) {
        // TO-DO Matrix multiplication
    }
    toString() {
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
