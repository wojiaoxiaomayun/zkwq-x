const path = require("path");

class ReplaceAdvancedPlugin {
  constructor(options = {}) {
    this.debug = options.debug || false;

    this.replacements = (options.replacements || []).map(item => ({
      from: item.from instanceof RegExp ? item.from : new RegExp(item.from, "g"),
      to: item.to,
      exts: item.exts || ["js"],
      useLoader: item.useLoader || false,
    }));
  }

  log(...args) {
    if (this.debug) console.log("[ReplaceAdvancedPlugin]", ...args);
  }

  apply(compiler) {
    const pluginName = "ReplaceAdvancedPlugin";

    // Loader 阶段替换
    compiler.hooks.normalModuleFactory.tap(pluginName, factory => {
      factory.hooks.afterResolve.tap(pluginName, data => {
        if (!data || !data.resource || typeof data.resource !== "string") return;

        const resourcePath = data.resource;

        this.replacements.forEach(rule => {
          if (!rule.useLoader) return;

          const matched = rule.exts.some(ext => resourcePath.endsWith("." + ext));
          if (!matched) return;

          this.log("Loader Match:", resourcePath);

          data.loaders.unshift({
            loader: path.resolve(__dirname, "./replace-advanced-loader.js"),
            options: { rule, debug: this.debug }
          });
        });

        // Webpack 5 不允许返回 data，Webpack 4 可以返回
        if (!compiler.webpack || !compiler.webpack.version || compiler.webpack.version.startsWith("4")) {
          return data;
        }
      });
    });

    // 构建产物阶段替换
    compiler.hooks.thisCompilation.tap(pluginName, compilation => {
      const applyReplace = (assets, RawSource) => {
        for (const filename of Object.keys(assets)) {
          if (!filename || typeof filename !== "string") continue;
          if (!filename.includes(".")) continue;

          const ext = filename.split(".").pop();

          let source;
          try {
            source = assets[filename].source().toString();
          } catch (e) {
            this.log("⚠️ Cannot read asset source:", filename);
            continue;
          }

          let replaced = source;
          let changed = false;

          this.replacements.forEach(rule => {
            if (!rule.exts.includes(ext)) return;

            const before = replaced;
            replaced = replaced.replace(rule.from, rule.to);

            if (before !== replaced) {
              changed = true;
              this.log(`Asset Replace [${filename}] ext=.${ext}`);
            }
          });

          if (changed) {
            compilation.updateAsset
              ? compilation.updateAsset(filename, new RawSource(replaced)) // Webpack 5
              : compilation.assets[filename] = new RawSource(replaced);   // Webpack 4
          }
        }
      };

      // 判断 Webpack 5 或 4
      if (compilation.hooks.processAssets && compiler.webpack) {
        // Webpack 5
        const RawSource = compiler.webpack.sources.RawSource;
        compilation.hooks.processAssets.tap(
          { name: pluginName, stage: compilation.constructor.PROCESS_ASSETS_STAGE_OPTIMIZE },
          assets => applyReplace(assets, RawSource)
        );
      } else {
        // Webpack 4
        const RawSource = require("webpack-sources").RawSource;
        compilation.hooks.optimizeAssets.tap(pluginName, assets => applyReplace(assets, RawSource));
      }
    });
  }
}

module.exports = ReplaceAdvancedPlugin;
