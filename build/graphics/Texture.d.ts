import Renderer from './Renderer';
export default class Texture {
    private _gl;
    private _handle;
    constructor(renderer: Renderer, source?: TexImageSource);
    private get gl();
    get handle(): WebGLTexture;
}
