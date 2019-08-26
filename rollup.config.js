import pkg from "./package.json";

export default {
  input: "src/index.js",
  external: ["rollup-pluginutils", "fs", "path"],
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ]
};
