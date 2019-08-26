const path = require("path");
const { rollup } = require("rollup");
const postcss = require("rollup-plugin-postcss");
const aliasLess = require(".");

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
})
  .then(build =>
    build.generate({
      format: "esm"
    })
  )
  .then(bundle => {
    const { code } = bundle.output[0];
    console.log(code);
  });
