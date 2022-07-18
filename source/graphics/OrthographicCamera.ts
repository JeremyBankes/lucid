import Matrix4 from '../math/Matrix4.js';
import Camera from './Camera.js';

export default class OrthographicCamera extends Camera {

    constructor(top: number, right: number, bottom: number, left: number, near: number, far: number) {
        const topPlusBottom = top + bottom;
        const topMinusBottom = top - bottom;
        const rightMinusLeft = right - left;
        const rightPlusLeft = right + left;
        const farPlusNear = far + near;
        const farMinusNear = far - near;
        super(new Matrix4(
            2 / rightMinusLeft, 0, 0, (-rightPlusLeft / rightMinusLeft),
            0, 2 / topMinusBottom, 0, (-topPlusBottom / topMinusBottom),
            0, 0, -2 / farMinusNear, (-farPlusNear / farMinusNear),
            0, 0, 0, 1
        ));
    }

}