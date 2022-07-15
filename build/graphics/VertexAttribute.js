export default class VertexAttribute {
    // The index within a VAO to bind this attribute to.    `
    index;
    // The number of components in this vertex attribute.
    size;
    type;
    normalized;
    stride;
    offset;
    enabled;
    constructor(index, size, type, normalized, stride, offset) {
        this.index = index;
        this.size = size;
        this.type = type;
        this.normalized = normalized;
        this.stride = stride;
        this.offset = offset;
        this.enabled = false;
    }
}
