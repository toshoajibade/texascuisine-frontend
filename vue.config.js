module.exports = {
  lintOnSave: true,
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/sw.js',
      globDirectory: "dist/",
      swDest: "sw.js"
    }
  }
};
