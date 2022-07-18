import Matrix4 from '../math/Matrix4.js';

export default class Camera {

    public projectionMatrix: Matrix4;

    constructor(projectionMatrix: Matrix4) {
        this.projectionMatrix = projectionMatrix;
    }

}