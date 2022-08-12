import ShaderProgram from './ShaderProgram';
import Texture from './Texture';
import VertexData from './VertexData';
export default class Mesh {
    private _vertexData;
    private _program;
    private _texture;
    constructor(vertexData: VertexData, program: ShaderProgram, texture: Texture);
    get vertexData(): VertexData;
    get program(): ShaderProgram;
    get texture(): Texture;
}
