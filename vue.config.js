module.exports = {
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false,
    },
    electronBuilder: {
      nodeIntegration: true,
      chainWebpackRendererProcess(config) {
        config.plugins.delete("workbox");
        config.plugins.delete("pwa");
      },
    },
  },
};
