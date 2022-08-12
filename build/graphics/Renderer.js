import OrthographicCamera from './OrthographicCamera';
export default class Renderer {
    _gl;
    _camera;
    constructor(canvas) {
        const gl = canvas.getContext('webgl2');
        if (gl === null) {
            throw new Error('Failed to aquire WebGL2 context.');
        }
        this._gl = gl;
        this._camera = new OrthographicCamera(-1, this.aspectRatio, 1, -this.aspectRatio, 0.001, 1000);
    }
    get gl() {
        return this._gl;
    }
    get canvas() {
        return this.gl.canvas;
    }
    get camera() {
        return this._camera;
    }
    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }
    get aspectRatio() {
        return this.width / this.height;
    }
    startRender() {
        this.gl.clearColor(0.05, 0.15, 0.25, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    render(mesh) {
        mesh.program.setMatrixUniform('viewMatrix', this._camera.viewMatrix);
        mesh.program.setMatrixUniform('projectionMatrix', this._camera.projectionMatrix);
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.useProgram(mesh.program.handle);
        this.gl.bindBuffer(mesh.vertexData.vertexBuffer.glBufferType, mesh.vertexData.vertexBuffer.handle);
        this.gl.bindVertexArray(mesh.vertexData.handle);
        this.gl.bindTexture(this.gl.TEXTURE_2D, mesh.texture.handle);
        if (mesh.vertexData.indexed) {
            this.gl.bindBuffer(mesh.vertexData.indexBuffer.glBufferType, mesh.vertexData.indexBuffer.handle);
            this.gl.drawElements(this.gl.TRIANGLES, mesh.vertexData.indexBuffer.size, this.gl.UNSIGNED_SHORT, 0);
        }
        else {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, mesh.vertexData.count);
        }
    }
}
