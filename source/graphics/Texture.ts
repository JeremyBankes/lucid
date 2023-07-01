import { Tuple2, Vector2, VectorSource, VectorToolbox } from "@jeremy-bankes/vectorics";
import { Renderer } from "..";

export type TextureSource = ImageBitmap | HTMLVideoElement | HTMLCanvasElement | OffscreenCanvas;

export type FilterMode = "linear" | "nearest";

export class Texture {

    public readonly renderer: Renderer;
    public readonly dimensions: Vector2;

    private readonly _handle: GPUTexture;

    /**
     * @param renderer 
     * @param usage @see {@link Texture.USAGE}
     * @param dimensions 
     */
    public constructor(renderer: Renderer, usage: number, dimensions: VectorSource<Tuple2>) {
        console.log("Hello? Please run");
        this.dimensions = VectorToolbox.fromSource(2, dimensions);
        this.renderer = renderer;
        console.log("Please try and create texture");
        this._handle = renderer.underlying.device.createTexture({
            size: this.dimensions,
            format: "rgba8unorm",
            usage
        });
        console.log("Done!");
    }

    public static readonly USAGE = <const>{
        COPY_SOURCE: GPUTextureUsage.COPY_SRC,
        COPY_DESTINATION: GPUTextureUsage.COPY_DST,
        TEXTURE_BINDING: GPUTextureUsage.TEXTURE_BINDING,
        STORAGE_BINDING: GPUTextureUsage.STORAGE_BINDING,
        RENDER_ATTACHMENT: GPUTextureUsage.RENDER_ATTACHMENT
    };

    public static create(renderer: Renderer, usage: number, source: TextureSource) {
        console.log("Calling texture constructor....");
        const texture = new Texture(renderer, usage, [source.width, source.height]);
        console.log("Called");
        renderer.underlying.device.queue.copyExternalImageToTexture({ source }, { texture: texture._handle }, texture.dimensions);
        return texture;
    }

}