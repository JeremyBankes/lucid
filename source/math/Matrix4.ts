import Matrix from './Matrix.js';

export default class Matrix4 extends Matrix {

    public constructor(...data: number[]) {
        super(data, 4);
        if (data.length !== this.width * this.width) {
            throw new Error('A Matrix4 for must be instantiated with 16 numbers');
        }
    }

}