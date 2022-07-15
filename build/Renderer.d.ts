export default class Renderer {
    private context;
    constructor(canvas: HTMLCanvasElement);
    get canvas(): HTMLCanvasElement;
    get width(): number;
    get height(): number;
    get aspectRatio(): number;
}
