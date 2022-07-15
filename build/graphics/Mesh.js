export default class Mesh {
    _vertexData;
    _program;
    constructor(vertexData, program) {
        this._vertexData = vertexData;
        this._program = program;
    }
    get vertexData() {
        return this._vertexData;
    }
    get program() {
        return this._program;
    }
}
