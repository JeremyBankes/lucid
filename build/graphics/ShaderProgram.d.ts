import Matrix from '../math/Matrix';
import Vector from '../math/Vector';
import Renderer from './Renderer';
import Shader from './Shader';
export default class ShaderProgram {
    private _renderer;
    private _handle;
    private _uniformLocationMap;
    constructor(renderer: Renderer, vertexShader: Shader, fragmentShader: Shader);
    private get gl();
    get handle(): WebGLProgram;
    private _getUniformLocation;
    setIntegerUniform(name: string, value: number): void;
    setFloatUniform(name: string, value: number): void;
    setVectorUniform(name: string, value: Vector): void;
    setMatrixUniform(name: string, value: Matrix): void;
}
