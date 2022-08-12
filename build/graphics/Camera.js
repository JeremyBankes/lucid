import Matrix4 from '../math/Matrix4';
import Vector3 from '../math/Vector3';
export default class Camera {
    projectionMatrix;
    position;
    rotation;
    scale;
    constructor(projectionMatrix) {
        this.projectionMatrix = projectionMatrix;
        this.position = new Vector3(0.0);
        this.rotation = new Vector3(0.0);
        this.scale = new Vector3(1.0);
    }
    get viewMatrix() {
        return new Matrix4(1, 0, 0, this.position.x, 0, 1, 0, this.position.y, 0, 0, 1, this.position.z, 0, 0, 0, 1).multiply(new Matrix4(this.scale.x, 0, 0, 0, 0, this.scale.y, 0, 0, 0, 0, this.scale.z, 0, 0, 0, 0, 1)).multiply(new Matrix4(1, 0, 0, 0, 0, Math.cos(this.rotation.x), Math.sin(this.rotation.x), 0, 0, -Math.sin(this.rotation.x), Math.cos(this.rotation.x), 0, 0, 0, 0, 1)).multiply(new Matrix4(Math.cos(this.rotation.y), 0, -Math.sin(this.rotation.y), 0, 0, 1, 0, 0, Math.sin(this.rotation.y), 0, Math.cos(this.rotation.y), 0, 0, 0, 0, 1)).multiply(new Matrix4(Math.cos(this.rotation.z), -Math.sin(this.rotation.z), 0, 0, Math.sin(this.rotation.z), Math.cos(this.rotation.z), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1));
    }
}
