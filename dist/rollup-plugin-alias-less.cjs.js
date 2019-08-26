'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));

const node_modules_path = module.paths.find(module_path => {
  return fs.existsSync(module_path);
});

function aliasLess(options = {}) {
  const filter = rollupPluginutils.createFilter(options.include, options.exclude);
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

module.exports = aliasLess;
