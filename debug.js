const { rollup } = require("rollup");
const postcss = require("rollup-plugin-postcss");
const aliasLess = require("./src");

rollup({
  input: "sample/main.js",
  plugins: [
    aliasLess({
      alias: {
        PathToFile: path.resolve(__dirname, "sample/path/to/")
      }
    }),
    postcss()
  ]
}).then(
  build => {
    const bundle = build.generate({
      type: "esm"
    });

    console.log(bundle);
  },
  error => {
    console.log("========== ERROR ==========");
    console.log(error);
    console.log("===========================");
  }
);
