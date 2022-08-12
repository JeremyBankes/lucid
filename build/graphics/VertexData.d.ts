import Buffer from './Buffer';
import Renderer from './Renderer';
export default class VertexData {
    private _renderer;
    private _handle;
    private _attributeMap;
    vertexBuffer: Buffer;
    indexBuffer: Buffer;
    constructor(renderer: Renderer, vertexBuffer: Buffer, indexBuffer?: Buffer);
    private get gl();
    get handle(): WebGLVertexArrayObject;
    get indexed(): boolean;
    get count(): number;
    enableAttribute(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number): void;
    disableAttribute(attributeIndex: number): void;
}
