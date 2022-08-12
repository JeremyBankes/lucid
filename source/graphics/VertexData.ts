import Buffer from './Buffer';
import Renderer from './Renderer';

export default class VertexData {


    private _renderer: Renderer;
    private _handle: WebGLVertexArrayObject;
    private _attributeMap: {
        [index: number]: {
            index: number,
            size: number,
            type: number,
            normalized: boolean,
            stride: number,
            offset: number
        }
    };

    public vertexBuffer: Buffer;
    public indexBuffer: Buffer;

    public constructor(renderer: Renderer, vertexBuffer: Buffer, indexBuffer: Buffer = null) {
        this._renderer = renderer;
        this._handle = this.gl.createVertexArray();

        this.vertexBuffer = vertexBuffer;
        this.indexBuffer = indexBuffer;
        this._attributeMap = {};
    }

    private get gl() {
        return this._renderer.gl;
    }

    public get handle() {
        return this._handle;
    }

    public get indexed() {
        return this.indexBuffer !== null;
    }

    public get count() {
        let count = 0;
        for (const index in this._attributeMap) {
            const attribute = this._attributeMap[index];
            count += attribute.size
        }
        return count;
    }

    public enableAttribute(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number) {
        this._attributeMap[index] = { index, size, type, normalized, stride, offset };
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer.handle);
        this.gl.bindVertexArray(this.handle);
        this.gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
        this.gl.enableVertexAttribArray(index);
    }

    public disableAttribute(attributeIndex: number) {
        const attribute = this._attributeMap[attributeIndex];
        this.gl.disableVertexAttribArray(attribute.index);
    }

}