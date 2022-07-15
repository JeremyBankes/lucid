import Mesh from './Mesh.js';

export default class Renderer {

    private _gl: WebGL2RenderingContext;

    public constructor(canvas: HTMLCanvasElement) {
        const gl = canvas.getContext('webgl2');
        if (gl === null) {
            throw new Error('Failed to aquire WebGL2 context.');
        }
        this._gl = gl;
    }

    public get gl() {
        return this._gl;
    }

    public get canvas() {
        return this.gl.canvas;
    }

    public get width() {
        return this.canvas.width;
    }

    public get height() {
        return this.canvas.height;
    }

    public get aspectRatio() {
        return this.width / this.height;
    }

    public startRender() {
        this.gl.clearColor(0.05, 0.15, 0.25, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public render(mesh: Mesh) {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.useProgram(mesh.program.handle);
        this.gl.bindBuffer(mesh.vertexData.vertexBuffer.glBufferType, mesh.vertexData.vertexBuffer.handle);
        this.gl.bindVertexArray(mesh.vertexData.handle);
        if (mesh.vertexData.indexed) {
            this.gl.bindBuffer(mesh.vertexData.indexBuffer.glBufferType, mesh.vertexData.indexBuffer.handle);
            this.gl.drawElements(this.gl.TRIANGLES, mesh.vertexData.indexBuffer.size, this.gl.UNSIGNED_SHORT, 0);
        } else {
            this.gl.drawArrays(this.gl.TRIANGLES, 0, mesh.vertexData.count);
        }
    }

}