const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    resolve: {
      // ... rest of the resolve config
      fallback: { fs: false, path: require.resolve("path-browserify") },
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'uk',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false
    }
  }
});
