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
  const HtmlWebpackPlugins = config.plugins.filter(
    (p) => p.constructor.name === "HtmlWebpackPlugin"
  );
  HtmlWebpackPlugins.forEach((p) => (p.options = p.userOptions));

  // the original call
  multipleEntry.addMultiEntry(config);

  // now carry on with the options object
  HtmlWebpackPlugins.forEach((p) => {
    p.userOptions = p.options;
    delete p.options;
  });

  const definePlugin = config.plugins.find(
    (p) => p.constructor.name === "DefinePlugin"
  );

  definePlugin.definitions["process.env"] = {
    ...definePlugin.definitions["process.env"],
    // expose netlify build env variables
    URL: JSON.stringify(process.env.URL),
    DEPLOY_PRIME_URL: JSON.stringify(process.env.DEPLOY_PRIME_URL),
    BRANCH: JSON.stringify(process.env.BRANCH),
  };

  config.externals = {
    react: "React",
    "react-dom": "ReactDOM",
    "netlify-cms-app": "NetlifyCmsApp",
  };

  return config;
};
