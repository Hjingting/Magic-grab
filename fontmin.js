

const Fontmin = require("fontmin")

// 自定义
const filePath = "./src/assets/css/FZY4JW.ttf";
const fontName = "FZY4JW";
const extractText = "活动规则仓库19912991838盒币领取奖励确认支付使用抓抓券已签到开心收下再来一局"
const exportPath = "./src/assets/css/fonts";

const fontmin = new Fontmin()
  .src(filePath)
  .use(
    Fontmin.glyph({
      text: extractText,
      hinting: false // keep ttf hint info (fpgm, prep, cvt). default = true
    })
  )
  .use(Fontmin.ttf2eot())
  .use(Fontmin.ttf2svg())
  .use(
    Fontmin.ttf2woff({
      deflate: true // deflate woff. default = false
    })
  )
  .use(
    Fontmin.css({
      fontFamily: fontName,
      base64: true
    })
  )
  .dest(exportPath);

fontmin.run();