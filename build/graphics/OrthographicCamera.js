import Matrix4 from '../math/Matrix4';
import Camera from './Camera';
export default class OrthographicCamera extends Camera {
    constructor(top, right, bottom, left, near, far) {
        const topPlusBottom = top + bottom;
        const topMinusBottom = top - bottom;
        const rightMinusLeft = right - left;
        const rightPlusLeft = right + left;
        const farPlusNear = far + near;
        const farMinusNear = far - near;
        super(new Matrix4(2 / rightMinusLeft, 0, 0, (-rightPlusLeft / rightMinusLeft), 0, 2 / topMinusBottom, 0, (-topPlusBottom / topMinusBottom), 0, 0, -2 / farMinusNear, (-farPlusNear / farMinusNear), 0, 0, 0, 1));
    }
}
