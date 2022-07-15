import Application from '../build/Application.js';
import Buffer from '../build/graphics/Buffer.js';
import Mesh from '../build/graphics/Mesh.js';
import ShaderProgram from '../build/graphics/ShaderProgram.js';
import VertexAttribute from '../build/graphics/VertexAttribute.js';
import VertexData from '../build/graphics/VertexData.js';
import State from '../build/state/State.js';
import Matrix from '../build/math/Matrix.js';

class PlayState extends State {

    /** @type {Application} */ sandbox;
    /** @type {Mesh}        */ mesh;

    /**
     * @param {Application} sandbox 
     */
    constructor(sandbox) {
        super();
        this.sandbox = sandbox;
    }

    async load() {
        await super.load();
        this.sandbox.assets.add('meta', '/sandbox/meta.json');
        this.sandbox.assets.add('root', '/sandbox/index.html');
        this.sandbox.assets.add('shader.vertex.basic', '/sandbox/assets/shaders/basic.vert', 'text/shader');
        this.sandbox.assets.add('shader.fragment.basic', '/sandbox/assets/shaders/basic.frag', 'text/shader');
        await this.sandbox.assets.load();

        const meta = this.sandbox.assets.get('meta');
        console.log(meta);

        const document = this.sandbox.assets.get('root');
        console.log(document);

        const basicVertexShader = this.sandbox.assets.get('shader.vertex.basic');
        console.log(basicVertexShader);

        const basicFragmentShader = this.sandbox.assets.get('shader.fragment.basic');
        console.log(basicFragmentShader);

        const program = new ShaderProgram(this.sandbox.renderer, basicVertexShader, basicFragmentShader);

        const vertexBuffer = new Buffer(this.sandbox.renderer, 'array');
        vertexBuffer.setFloat32Data(
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.5, 0.5, 0.0,
            -0.5, 0.5, 0.0
        );

        const indexBuffer = new Buffer(this.sandbox.renderer, 'elementArray');
        indexBuffer.setInteger16Data(
            0, 1, 2,
            2, 3, 0
        );

        const vertexData = new VertexData(this.sandbox.renderer, vertexBuffer, indexBuffer);
        const attributeIndex = this.sandbox.renderer.gl.getAttribLocation(program.handle, 'vertexPosition');
        vertexData.enableAttribute(new VertexAttribute(attributeIndex, 3, this.sandbox.renderer.gl.FLOAT, false, 0, 0));

        this.mesh = new Mesh(vertexData, program);
    }

    /**
     * @param {State} oldState 
     */
    enter(oldState) {
        super.enter(oldState);
    }

    /**
     * @param {number} deltaTime
     */
    update(deltaTime) {
        this.sandbox.renderer.render(this.mesh);
    }

}

const canvas = document.getElementById('lucidCanvas');
if (canvas instanceof HTMLCanvasElement) {
    const sandbox = new Application(canvas);
    sandbox.states.register(new PlayState(sandbox));
    sandbox.states.change(PlayState.name);
    sandbox.start();
}

// const matrix = new Matrix([
//     1, 2,
//     3, 4,
//     5, 6
// ], 2);

// console.log(matrix.toString());

// matrix.transpose();

// console.log(matrix.toString());

// if (canvas instanceof HTMLCanvasElement) {
//     const gl = canvas.getContext('webgl');
//     if (gl !== null) {
//         gl.viewport(0, 0, canvas.width, canvas.height);

//         const vertShader = gl.createShader(gl.VERTEX_SHADER);
//         gl.shaderSource(vertShader, 'attribute vec3 c;void main(void){gl_Position=vec4(c, 1.0);}');
//         gl.compileShader(vertShader);
//         const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
//         gl.shaderSource(fragShader, 'void main(void){gl_FragColor=vec4(0,1,1,1);}');
//         gl.compileShader(fragShader);
//         const prog = gl.createProgram();
//         gl.attachShader(prog, vertShader);
//         gl.attachShader(prog, fragShader);
//         gl.linkProgram(prog);
//         gl.useProgram(prog);

//         gl.clearColor(1, 0, 1, 1);
//         gl.clear(gl.COLOR_BUFFER_BIT);

//         const vertexBuf = gl.createBuffer();
//         gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0]), gl.STATIC_DRAW);

//         const coord = gl.getAttribLocation(prog, "c");
//         gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
//         gl.enableVertexAttribArray(coord);

//         gl.drawArrays(gl.TRIANGLES, 0, 3);
//     }
// }