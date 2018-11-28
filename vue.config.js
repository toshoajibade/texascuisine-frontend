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
      navigateFallback: "/",
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/res\.cloudinary\.com/,
          handler: "staleWhileRevalidate",
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: "cacheFirst",
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/app.scss";`
      }
    }
  }
};
