export default class VertexAttribute {

    // The index within a VAO to bind this attribute to.    `
    public index: number;
    // The number of components in this vertex attribute.
    public size: number;
    public type: number;
    public normalized: boolean;
    public stride: number;
    public offset: number;
    public enabled: boolean;

    public constructor(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number) {
        this.index = index;
        this.size = size;
        this.type = type;
        this.normalized = normalized;
        this.stride = stride;
        this.offset = offset;
        this.enabled = false;
    }

}