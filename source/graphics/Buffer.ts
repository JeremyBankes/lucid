import { Renderer } from "./Renderer";

export class Buffer {

    public readonly renderer: Renderer;
    public readonly size: number;

    private readonly _handle: GPUBuffer;


    /** 
     * @param renderer 
     * @param usage @see {@link Buffer.USAGE}
     * @param size 
     */
    public constructor(renderer: Renderer, usage: number, size: number) {
        this.renderer = renderer;
        this.size = size;
        this._handle = renderer.underlying.device.createBuffer({ size, usage: usage | GPUBufferUsage.COPY_DST });
    }

    public write(sourceData: BufferSource | number[], destinationOffset: number = 0, sourceOffset: number = 0, size?: number) {
        if (Array.isArray(sourceData)) {
            sourceData = new Float32Array(sourceData);
        }
        if (size === undefined) {
            size = "length" in sourceData && typeof sourceData.length === "number" ? sourceData.length : sourceData.byteLength;
        }
        this.renderer.underlying.device.queue.writeBuffer(this._handle, destinationOffset, sourceData, sourceOffset, size);
    }

    public static create(renderer: Renderer, usage: number, data: number[]) {
        const source = new Float32Array(data);
        const buffer = new Buffer(renderer, usage, source.byteLength);
        buffer.write(source, 0, 0, source.length);
        return buffer;
    }

    public static readonly USAGE = <const>{
        MAP_READ: GPUBufferUsage.MAP_READ,
        MAP_WRITE: GPUBufferUsage.MAP_WRITE,
        COPY_SOURCE: GPUBufferUsage.COPY_SRC,
        COPY_DESTINATION: GPUBufferUsage.COPY_DST,
        INDEX: GPUBufferUsage.INDEX,
        VERTEX: GPUBufferUsage.VERTEX,
        UNIFORM: GPUBufferUsage.UNIFORM,
        STORAGE: GPUBufferUsage.STORAGE,
        INDIRECT: GPUBufferUsage.INDIRECT,
        QUERY_RESOLVE: GPUBufferUsage.QUERY_RESOLVE
    };

}