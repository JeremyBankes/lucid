import Buffer from './Buffer.js';
import Renderer from './Renderer.js';
import VertexAttribute from './VertexAttribute.js';
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
    enableAttribute(attribute: VertexAttribute): void;
    disableAttribute(attributeIndex: number): void;
}
