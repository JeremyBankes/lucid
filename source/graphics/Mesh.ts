import ShaderProgram from './ShaderProgram';
import Texture from './Texture';
import VertexData from './VertexData';

export default class Mesh {

    private _vertexData: VertexData;
    private _program: ShaderProgram;
    private _texture: Texture;

    public constructor(vertexData: VertexData, program: ShaderProgram, texture: Texture) {
        this._vertexData = vertexData;
        this._program = program;
        this._texture = texture;
    }

    public get vertexData() {
        return this._vertexData;
    }

    public get program() {
        return this._program;
    }

    public get texture() {
        return this._texture;
    }

}