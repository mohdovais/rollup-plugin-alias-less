import { createFilter } from 'rollup-pluginutils';
import fs from 'fs';
import path from 'path';

const node_modules_path = module.paths.find(module_path => {
  return fs.existsSync(module_path);
});

function aliasLess(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const aliases = Object.assign({}, options.alias, {
    "~": node_modules_path
  });

  return {
    name: "rollup-plugin-alias-less",

    transform(code, id) {
      if (!filter(id) || !/\.less$/.test(id)) return null;

      Object.keys(aliases).forEach(alias => {
        const regexr = new RegExp(
          `@import\\s+['"]${alias}([\\w-.\\s\/\\\\]+)['"];`,
          "gm"
        );

        code = code.replace(regexr, function(match, query) {
          return `@import '${path.resolve(
            aliases[alias],
            query.replace(/^[\/\\]/, "")
          )}';`;
        });
      });

      return code;
    }
  };
}

export default aliasLess;
