module.exports = function(source) {
  const options = this.getOptions();
  const rule = options.rule;
  const debug = options.debug;

  const replaced = source.replace(rule.from, rule.to);

  if (debug && replaced !== source) {
    if (this.emitWarning) {
      this.emitWarning(`[ReplaceAdvancedPlugin Loader] Replace in: ${this.resourcePath}`);
    } else {
      console.log("[ReplaceAdvancedPlugin Loader] Replace in:", this.resourcePath);
    }
  }

  return replaced;
};
