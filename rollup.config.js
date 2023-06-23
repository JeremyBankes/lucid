import { getBabelOutputPlugin as BabelOutputPlugin } from "@rollup/plugin-babel";
import TypeScriptPlugin from "@rollup/plugin-typescript";

export default {
    input: "source/index.ts",
    output: {
        file: "build/index.js",
        name: "Lucid",
        format: "esm",
        exports: "named"
    },
    external: [/^@jeremy-bankes\/.+$/],
    plugins: [
        TypeScriptPlugin(),
        BabelOutputPlugin({ presets: [["@babel/preset-env", { modules: "umd" }]] })
    ]
};