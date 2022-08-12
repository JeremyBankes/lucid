import TextLoader from '../assets/TextLoader';
import Renderer from './Renderer';
export default class ShaderLoader extends TextLoader {
    protected _renderer: Renderer;
    constructor(renderer: Renderer);
    load(response: Response): Promise<any>;
}
