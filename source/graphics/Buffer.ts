import Renderer from './Renderer.js';

export type BufferType = 'array' | 'elementArray';

export default class Buffer {

    private _renderer: Renderer;
    private _handle: WebGLBuffer;
    private _type: BufferType;
    private _size: number;

    public constructor(renderer: Renderer, type: BufferType = 'array') {
        this._renderer = renderer;
        this._handle = renderer.gl.createBuffer();
        this._type = type;
    }

    public get type() {
        return this._type;
    }

    public get glBufferType() {
        if (this._type === 'array') {
            return this._renderer.gl.ARRAY_BUFFER;
        } else if (this._type === 'elementArray') {
            return this._renderer.gl.ELEMENT_ARRAY_BUFFER;
        } else {
            throw new Error(`Unknown buffer type "${this.type}".`);
        }
    }

    get size() {
        return this._size;
    }

    public setData(data: BufferSource, size: number) {
        this._renderer.gl.bindBuffer(this.glBufferType, this._handle);
        this._renderer.gl.bufferData(this.glBufferType, data, this._renderer.gl.STATIC_DRAW);
        this._size = size;
    }

    public setInteger16Data(...data: number[]) {
        const array = new Uint16Array(data);
        this.setData(array, array.length);
    }

    public setInteger32Data(...data: number[]) {
        const array = new Uint32Array(data);
        this.setData(array, array.length);
    }

    public setFloat32Data(...data: number[]) {
        const array = new Float32Array(data);
        this.setData(array, array.length);
    }

    public setFloat64Data(...data: number[]) {
        const array = new Float64Array(data);
        this.setData(array, array.length);
    }

    public get handle() {
        return this._handle;
    }

}