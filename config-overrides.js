const multipleEntry = require("react-app-rewire-multiple-entry")([
  {
    entry: "src/cms",
    template: "public/admin/index.html",
    outPath: "/admin/index.html",
  },
]);

module.exports = function override(config) {
  // https://github.com/Derek-Hu/react-app-rewire-multiple-entry/issues/31#issuecomment-1010679745
  // multipleEntry expects an "options" object but since cra v5 it is called "userOptions"
  // HACK -> copy userOptions reference and hope for the best
  const webpackPlugins = config.plugins.filter(
    (p) => p.constructor.name === "HtmlWebpackPlugin"
  );
  webpackPlugins.forEach((p) => (p.options = p.userOptions));

  // the original call
  multipleEntry.addMultiEntry(config);

  // now carry on with the options object
  webpackPlugins.forEach((p) => {
    p.userOptions = p.options;
    delete p.options;
  });

  return config;
};
