//Babel配置文件，可以通过编写babel.config.js或者.babelrc文件来编写，但这两个文件不能共存，会报错
module.exports = {
  "presets": [
    //预设：Babel 的预设（preset）可以被看作是一组 Babel 插件和/或 options 配置的可共享模块。
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    //
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
