import Renderer from './Renderer';
export declare type ShaderType = 'vertex' | 'fragment';
export default class Shader {
    private _renderer;
    private _type;
    private _handle;
    constructor(renderer: Renderer, type: ShaderType, source: string);
    private get gl();
    get type(): ShaderType;
    get handle(): WebGLShader;
}
