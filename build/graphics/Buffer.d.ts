import Renderer from './Renderer.js';
export declare type BufferType = 'array' | 'elementArray';
export default class Buffer {
    private _renderer;
    private _handle;
    private _type;
    private _size;
    constructor(renderer: Renderer, type?: BufferType);
    get type(): BufferType;
    get glBufferType(): number;
    get size(): number;
    setData(data: BufferSource, size: number): void;
    setInteger16Data(...data: number[]): void;
    setInteger32Data(...data: number[]): void;
    setFloat32Data(...data: number[]): void;
    setFloat64Data(...data: number[]): void;
    get handle(): WebGLBuffer;
}
