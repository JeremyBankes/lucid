import Matrix from '../math/Matrix.js';
import Vector from '../math/Vector.js';
import Renderer from './Renderer.js';
import Shader from './Shader.js';

export default class ShaderProgram {

    private _renderer: Renderer;
    private _handle: WebGLProgram;
    private _uniformLocationMap: { [key: string]: WebGLUniformLocation };

    public constructor(renderer: Renderer, vertexShader: Shader, fragmentShader: Shader) {
        this._renderer = renderer;
        this._handle = this.gl.createProgram();
        this.gl.attachShader(this._handle, vertexShader.handle);
        this.gl.attachShader(this._handle, fragmentShader.handle);
        this.gl.linkProgram(this._handle);
        if (!this.gl.getProgramParameter(this._handle, this.gl.LINK_STATUS)) {
            const details = this.gl.getProgramInfoLog(this._handle);
            throw new Error(`Could not link shader program.\n${details}`);
        }
        this._uniformLocationMap = {};
    }

    private get gl() {
        return this._renderer.gl;
    }

    public get handle() {
        return this._handle;
    }

    private _getUniformLocation(name: string) {
        if (name in this._uniformLocationMap) {
            return this._uniformLocationMap[name];
        } else {
            const location = this.gl.getUniformLocation(this.handle, name);
            this._uniformLocationMap[name] = location;
            return location;
        }
    }

    public setIntegerUniform(name: string, value: number) {
        this.gl.useProgram(this.handle);
        this.gl.uniform1i(this._getUniformLocation(name), value);
    }

    public setFloatUniform(name: string, value: number) {
        this.gl.useProgram(this.handle);
        this.gl.uniform1f(this._getUniformLocation(name), value);
    }

    public setVectorUniform(name: string, value: Vector) {
        this.gl.useProgram(this.handle);
        switch (value.size) {
            case 1: this.gl.uniform1f(this._getUniformLocation(name), value.components[0]); break;
            case 2: this.gl.uniform2f(this._getUniformLocation(name), value.components[0], value.components[1]); break;
            case 3: this.gl.uniform3f(this._getUniformLocation(name), value.components[0], value.components[1], value.components[2]); break;
            case 4: this.gl.uniform4f(this._getUniformLocation(name), value.components[0], value.components[1], value.components[2], value.components[3]); break;
            default: throw new Error(`${value.size}-component vector not supported as uniform.`);
        }
    }

    public setMatrixUniform(name: string, value: Matrix) {
        this.gl.useProgram(this.handle);
        if (value.width === 4 && value.height === 4) {
            this.gl.uniformMatrix4fv(this._getUniformLocation(name), true, value.toArray(), 0, value.width * value.height);
        } else if (value.width === 3 && value.height === 3) {
            this.gl.uniformMatrix3fv(this._getUniformLocation(name), true, value.toArray(), 0, value.width * value.height);
        } else if (value.width === 2 && value.height === 2) {
            this.gl.uniformMatrix2fv(this._getUniformLocation(name), true, value.toArray(), 0, value.width * value.height);
        } else if (value.width === 2 && value.height === 3) {
            this.gl.uniformMatrix2x3fv(this._getUniformLocation(name), true, value.toArray(), 0, value.width * value.height);
        } else if (value.width === 2 && value.height === 4) {
            this.gl.uniformMatrix2x4fv(this._getUniformLocation(name), true, value.toArray(), 0, value.width * value.height);
        } else if (value.width === 3 && value.height === 2) {
            this.gl.uniformMatrix3x2fv(this._getUniformLocation(name), true, value.toArray(), 0, value.width * value.height);
        } else if (value.width === 3 && value.height === 4) {
            this.gl.uniformMatrix3x4fv(this._getUniformLocation(name), true, value.toArray(), 0, value.width * value.height);
        } else if (value.width === 4 && value.height === 2) {
            this.gl.uniformMatrix4x2fv(this._getUniformLocation(name), true, value.toArray(), 0, value.width * value.height);
        } else if (value.width === 4 && value.height === 3) {
            this.gl.uniformMatrix4x3fv(this._getUniformLocation(name), true, value.toArray(), 0, value.width * value.height);
        } else {
            throw new Error(`${value.width}x${value.height} matrix not support as uniform.`);
        }
    }

}