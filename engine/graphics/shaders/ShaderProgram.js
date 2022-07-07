import Buffer from '/engine/graphics/Buffer.js';
import Renderer from '/engine/graphics/Renderer.js';
import Shader from '/engine/graphics/shaders/Shader.js';
import Matrix4 from '/engine/math/Matrix4.js';
import Vector2 from '/engine/math/Vector2.js';
import Vector3 from '/engine/math/Vector3.js';
import Vector4 from '/engine/math/Vector4.js';

export default class ShaderProgram {

    static VERTEX_ARRAY_TYPE = {

        INT: Renderer.GL.INT,
        FLOAT: Renderer.GL.FLOAT

    };

    /**
     * @param {object} options 
     * @param {Renderer} options.renderer 
     * @param {Shader} options.vertexShader
     * @param {Shader} options.fragmentShader
     */
    constructor(options) {
        if (!options.vertexShader.valid) {
            throw new Error('Invalid vertex shader.');
        }
        if (!options.fragmentShader.valid) {
            throw new Error('Invalid fragment shader.');
        }
        this._renderer = options.renderer;
        this._handle = this._renderer.context.createProgram();
        this._locations = {};
        this._renderer.context.attachShader(this._handle, options.vertexShader._handle);
        this._renderer.context.attachShader(this._handle, options.fragmentShader._handle);
        this._renderer.context.linkProgram(this._handle);

        if (!this._renderer.context.getProgramParameter(this._handle, WebGLRenderingContext.LINK_STATUS)) {
            const log = this._renderer.context.getProgramInfoLog(this._handle);
            console.warn(`Failed to link shader program\n${log}`);
            this._renderer.context.deleteProgram(this._handle);
            this._handle = null;
        }
    }

    use() {
        this._renderer.context.useProgram(this._handle);
    }

    /**
     * @param {string} name 
     * @param {number} value 
     */
    setIntegerUniform(name, value) {
        this._renderer.context.uniform1i(this._getUniformLocation(name), value);
    }

    /**
     * @param {string} name 
     * @param {number|Vector2|Vector3|Vector4|Matrix4|Float32Array|Int32Array|Vector2[]|Vector3[]|Vector4[]|Matrix4[]} value 
     */
    setUniform(name, value) {
        this.use();
        const location = this._getUniformLocation(name);
        if (value instanceof Matrix4) {
            this._renderer.context.uniformMatrix4fv(location, false, value.getTransposedData() /* OpenGL uses column-major ordering */);
        } else if (value instanceof Vector2) {
            this._renderer.context.uniform2f(location, value.x, value.y);
        } else if (value instanceof Vector3) {
            this._renderer.context.uniform3f(location, value.x, value.y, value.z);
        } else if (value instanceof Vector4) {
            this._renderer.context.uniform4f(location, value.x, value.y, value.z, value.w);
        } else if (typeof value === 'number') {
            this._renderer.context.uniform1f(location, value);
        } else if (value instanceof Float32Array) {
            this._renderer.context.uniform1fv(location, value);
        } else if (value instanceof Int32Array) {
            this._renderer.context.uniform1iv(location, value);
        } else if (value instanceof Array) {
            if (value.length > 0) {
                const first = value[0];
                if (first instanceof Vector2) {
                    const list = new Float32Array(value.length * 2);
                    for (let i = 0; i < value.length; i++) {
                        const vector = /** @type {Vector2} */ (value[i]);
                        list.set(vector.toArray(), i * 2);
                    }
                    this._renderer.context.uniform2fv(location, list);
                } else if (first instanceof Vector3) {
                    const list = new Float32Array(value.length * 3);
                    for (let i = 0; i < value.length; i++) {
                        const vector = /** @type {Vector3} */ (value[i]);
                        list.set(vector.toArray(), i * 3);
                    }
                    this._renderer.context.uniform3fv(location, list);
                } else if (first instanceof Vector4) {
                    const list = new Float32Array(value.length * 4);
                    for (let i = 0; i < value.length; i++) {
                        const vector = /** @type {Vector4} */ (value[i]);
                        list.set(vector.toArray(), i * 4);
                    }
                    this._renderer.context.uniform4fv(location, list);
                }
            }
        }
    }

    /**
     * @param {string} name
     */
    _getUniformLocation(name) {
        if (name in this._locations) {
            return this._locations[name];
        }
        const location = this._renderer.context.getUniformLocation(this._handle, name);
        this._locations[name] = location;
        return location;
    }

    /**
     * @param {string} name
     */
    getAttributeIndex(name) {
        const index = this._renderer.context.getAttribLocation(this._handle, name);
        if (index === -1) {
            throw new Error(`Shader program has no attribute named "${name}".`);
        }
        return index;
    }

    /**
     * @param {string} name The name of the attribute (Must match name in shader)
     * @param {Buffer} buffer
     * @param {number} componentCount Number of values in attribute
     * @param {number} type VertexArray.TYPE
     * @param {boolean} normalized
     * @param {number} stride Bytes between attributes
     * @param {number} offset Bytes from start
     */
    addAttribute(name, buffer, componentCount, type, normalized = false, stride = 0, offset = 0, enable = true) {
        buffer.bind();
        const index = this.getAttributeIndex(name);
        this._renderer.context.vertexAttribPointer(index, componentCount, type, normalized, stride, offset);
        if (enable) {
            this.enableAttribute(index);
        }
    }

    /**
     * @param {string|number} nameOrIndex 
     */
    enableAttribute(nameOrIndex) {
        if (typeof nameOrIndex === 'string') {
            nameOrIndex = this.getAttributeIndex(nameOrIndex);
        }
        this._renderer.context.enableVertexAttribArray(nameOrIndex);
    }

    /**
     * @param {string} name
     * @param {boolean} [perInstance]
     */
    setAttributePerInstance(name, perInstance = true) {
        const index = this.getAttributeIndex(name);
        this._renderer.context.vertexAttribDivisor(index, perInstance ? 1 : 0);
    }

}