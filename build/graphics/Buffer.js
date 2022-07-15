export default class Buffer {
    _renderer;
    _handle;
    _type;
    _size;
    constructor(renderer, type = 'array') {
        this._renderer = renderer;
        this._handle = renderer.gl.createBuffer();
        this._type = type;
    }
    get type() {
        return this._type;
    }
    get glBufferType() {
        if (this._type === 'array') {
            return this._renderer.gl.ARRAY_BUFFER;
        }
        else if (this._type === 'elementArray') {
            return this._renderer.gl.ELEMENT_ARRAY_BUFFER;
        }
        else {
            throw new Error(`Unknown buffer type "${this.type}".`);
        }
    }
    get size() {
        return this._size;
    }
    setData(data, size) {
        this._renderer.gl.bindBuffer(this.glBufferType, this._handle);
        this._renderer.gl.bufferData(this.glBufferType, data, this._renderer.gl.STATIC_DRAW);
        this._size = size;
    }
    setInteger16Data(...data) {
        const array = new Uint16Array(data);
        this.setData(array, array.length);
    }
    setInteger32Data(...data) {
        const array = new Uint32Array(data);
        this.setData(array, array.length);
    }
    setFloat32Data(...data) {
        const array = new Float32Array(data);
        this.setData(array, array.length);
    }
    setFloat64Data(...data) {
        const array = new Float64Array(data);
        this.setData(array, array.length);
    }
    get handle() {
        return this._handle;
    }
}
