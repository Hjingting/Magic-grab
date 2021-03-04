window.currentRoller = ''

const global = {
    // 初始硬币值为8
    boxCoin: 8,
    // 展盒滚动速度
    boxRollViolet: 10,
    // 是否开启监听
    openMonitor: false,
    // 是否初次切换至抓实物部分
    grabMaterial: true,
    // 抓手摆动
    startShake: true,
    // 当前设备屏幕html的font-size
    rootFontSize: 100,
    // 是否匹配到展盒
    matchBox: false,
    // 用户是否可点击
    isClick:true,
    // 用户是否已签到
    isSignIn:false,
}

function setData(dataName, dataNum) {
    global[dataName] = dataNum
}

function getData(dataName) {
    return global[dataName]
}

module.exports = {
    setData,
    getData
}