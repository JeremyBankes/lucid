import ShaderProgram from './ShaderProgram.js';
import VertexData from './VertexData.js';

export default class Mesh {

    private _vertexData: VertexData;
    private _program: ShaderProgram;

    public constructor(vertexData: VertexData, program: ShaderProgram) {
        this._vertexData = vertexData;
        this._program = program;
    }

    public get vertexData() {
        return this._vertexData;
    }

    public get program() {
        return this._program;
    }

}