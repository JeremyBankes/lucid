import Camera from './Camera';
import Mesh from './Mesh';
export default class Renderer {
    private _gl;
    private _camera;
    constructor(canvas: HTMLCanvasElement);
    get gl(): WebGL2RenderingContext;
    get canvas(): HTMLCanvasElement;
    get camera(): Camera;
    get width(): number;
    get height(): number;
    get aspectRatio(): number;
    startRender(): void;
    render(mesh: Mesh): void;
}
