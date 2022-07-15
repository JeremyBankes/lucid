import TextLoader from '../assets/TextLoader.js';
import Renderer from './Renderer.js';
export default class ShaderLoader extends TextLoader {
    protected _renderer: Renderer;
    constructor(renderer: Renderer);
    load(response: Response): Promise<any>;
}
