export default class VertexData {
    _renderer;
    _handle;
    _attributeMap;
    vertexBuffer;
    indexBuffer;
    constructor(renderer, vertexBuffer, indexBuffer = null) {
        this._renderer = renderer;
        this._handle = this.gl.createVertexArray();
        this.vertexBuffer = vertexBuffer;
        this.indexBuffer = indexBuffer;
        this._attributeMap = {};
    }
    get gl() {
        return this._renderer.gl;
    }
    get handle() {
        return this._handle;
    }
    get indexed() {
        return this.indexBuffer !== null;
    }
    get count() {
        let count = 0;
        for (const index in this._attributeMap) {
            const attribute = this._attributeMap[index];
            count += attribute.size;
        }
        return count;
    }
    enableAttribute(attribute) {
        this._attributeMap[attribute.index] = attribute;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer.handle);
        this.gl.bindVertexArray(this.handle);
        this.gl.vertexAttribPointer(attribute.index, attribute.size, attribute.type, attribute.normalized, attribute.stride, attribute.offset);
        this.gl.enableVertexAttribArray(attribute.index);
        attribute.enabled = true;
    }
    disableAttribute(attributeIndex) {
        const attribute = this._attributeMap[attributeIndex];
        this.gl.disableVertexAttribArray(attribute.index);
        attribute.enabled = false;
    }
}
