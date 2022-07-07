export default class Matrix4 {

    /**
     * @param {...number} data
     */
    constructor(...data) {
        this.data = [];
        this.set(...data);
    }

    get size() { return 4; }

    /**
     * @param {number[]} data
     */
    set(...data) {
        for (let i = 0; i < Math.max(this.size * this.size, data.length); i++) {
            this.data[i] = i < data.length ? data[i] : 0;
        }
        return this;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} value
     */
    setValue(x, y, value) {
        this.data[y * this.size + x] = value;
    }

    /**
     * @param {number} x 
     * @param {number} y 
     */
    getValue(x, y) {
        return this.data[y * this.size + x];
    }

    /**
     * @param {Matrix4} matrix 
     */
    multiply(matrix) {
        const self = this.clone();
        for (let thisRow = 0; thisRow < this.size; thisRow++) {
            for (let thatColumn = 0; thatColumn < this.size; thatColumn++) {
                let sum = 0;
                for (let i = 0; i < this.size; i++) {
                    sum += self.getValue(i, thisRow) * matrix.getValue(thatColumn, i);
                }
                this.setValue(thatColumn, thisRow, sum);
            }
        }
        return this;
    }

    transpose() {
        return this.set(...this.getTransposedData());
    }

    clone() {
        return new Matrix4(...this.data);
    }

    getTransposedData() {
        return [
            this.data[0], this.data[4], this.data[8], this.data[12],
            this.data[1], this.data[5], this.data[9], this.data[13],
            this.data[2], this.data[6], this.data[10], this.data[14],
            this.data[3], this.data[7], this.data[11], this.data[15]
        ];
    }

    toString() {
        const prefix = 'Matrix 4x4';
        const padding = ''.padStart(prefix.length + 3, ' ');
        const format = (value) => value.toFixed(2).padStart(8, ' ');
        return `${prefix} [ ${format(this.data[0])}, ${format(this.data[1])}, ${format(this.data[2])}, ${format(this.data[3])}\n` +
            `${padding}${format(this.data[4])}, ${format(this.data[5])}, ${format(this.data[6])}, ${format(this.data[7])}\n` +
            `${padding}${format(this.data[8])}, ${format(this.data[9])}, ${format(this.data[10])}, ${format(this.data[11])}\n` +
            `${padding}${format(this.data[12])}, ${format(this.data[13])}, ${format(this.data[14])}, ${format(this.data[15])} ]`;
    }

}