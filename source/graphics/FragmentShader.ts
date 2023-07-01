import { Shader } from "./Shader";

export class FragmentShader extends Shader {

    createFragmentState(): GPUFragmentState {
        return {
            module: this["_handle"],
            entryPoint: this.entryPoint,
            targets: [{ format: this.renderer.underlying.preferredCanvasFormat }]
        }
    }

}