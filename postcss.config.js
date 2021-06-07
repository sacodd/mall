module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度
      viewportHeight: 667, // 视窗的高度
      unitPrecision: 5,  // 指定‘px’转化为视窗单位的小数位数
      viewportUnit: 'vw',  // 指定需要转化为的视窗单位
      selectorBlackList: ['tab-bar', 'tab-bar-item'],  // 不需要转化的类
      minPixelValue: 1,  // 小于等于‘1px’不转化
      mediaQuert: false  // 允许在媒体查询中转化
    }
  }
}