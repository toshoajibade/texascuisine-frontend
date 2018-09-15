module.exports = {
  lintOnSave: false,
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      globDirectory: "dist/",
      skipWaiting: true,
      clientsClaim: true,
      swDest: "sw.js",
      runtimeCaching: [{
        urlPattern: /^https:\/\/res\.cloudinary\.com/,
        handler: 'staleWhileRevalidate'
            },
        {
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: 'staleWhileRevalidate'
        },
        {
        urlPattern: /(?:item|user|order)/,
        handler: 'staleWhileRevalidate'
        },
        ]
    }
  }
};
