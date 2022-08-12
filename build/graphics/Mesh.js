export default class Mesh {
    _vertexData;
    _program;
    _texture;
    constructor(vertexData, program, texture) {
        this._vertexData = vertexData;
        this._program = program;
        this._texture = texture;
    }
    get vertexData() {
        return this._vertexData;
    }
    get program() {
        return this._program;
    }
    get texture() {
        return this._texture;
    }
}
