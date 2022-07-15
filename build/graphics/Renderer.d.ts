import Mesh from './Mesh.js';
export default class Renderer {
    private _gl;
    constructor(canvas: HTMLCanvasElement);
    get gl(): WebGL2RenderingContext;
    get canvas(): HTMLCanvasElement;
    get width(): number;
    get height(): number;
    get aspectRatio(): number;
    startRender(): void;
    render(mesh: Mesh): void;
}
