import Matrix4 from '../math/Matrix4';
import Vector3 from '../math/Vector3';
export default class Camera {
    projectionMatrix: Matrix4;
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
    constructor(projectionMatrix: Matrix4);
    get viewMatrix(): Matrix4;
}
