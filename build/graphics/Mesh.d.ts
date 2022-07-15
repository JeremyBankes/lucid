import ShaderProgram from './ShaderProgram.js';
import VertexData from './VertexData.js';
export default class Mesh {
    private _vertexData;
    private _program;
    constructor(vertexData: VertexData, program: ShaderProgram);
    get vertexData(): VertexData;
    get program(): ShaderProgram;
}
