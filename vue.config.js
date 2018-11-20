module.exports = {
  lintOnSave: false,
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      globDirectory: "dist/",
      skipWaiting: true,
      clientsClaim: true,
      swDest: "sw.js",
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/res\.cloudinary\.com/,
          handler: "staleWhileRevalidate"
        },
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: "staleWhileRevalidate"
        }
      ]
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/app.scss";`
        // @import "@/assets/styles/reset.scss";`
      }
    }
  }
};
