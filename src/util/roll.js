import pawer from '../util/pawer'
import {
    coin,
    funny
} from '../data/imgs'
import {
    setData,
    getData
} from '../data/global'
import reward from '../data/reward'

class roll {
    // 匹配到的节点
    node = ''
    // 是否处于上升过程
    flag = 0
    // 移动速度
    velocity = 2 * getData('rootFontSize') / 100
    // 是否下降
    down = false
    currentPaw = new pawer()

    constructor(data) {
        // 将待移动节点压入ready数组
        this.ready = []
        // 执行数组
        this.execute = []
        // 位移数组
        this.step = []
        let that = this
        // 待调度数组初始化
        data.children().each(function () {
            that.ready.push($(this))
            that.step.push(0)
        })
        // 基本变量的获取
        this.boxWidth = data.children().eq(0).width()
        // 父元素的宽度
        this.parentBoxWidth = $('.boxes').width()
        // 展盒的边距
        this.boxMargin = $('.commonBox').css('marginRight').replace('px', '')
    }

    rollLeft() {
        let timer = setTimeout(() => {
            this.loop()
        }, getData('boxRollViolet'))
    }

    loop() {
        if (this.flag === 1) {
            this.execute.splice(2, 1)
            this.step.splice(2, 1)
            this.flag = 0
        }
        this.monitor()
        // 执行数组初始化
        if (this.execute.length === 0) {
            if (this.ready.length !== 0) {
                this.execute.push(this.ready.shift())
            }
        }

        // 正在执行的最后一个元素
        if (this.step[this.execute.length - 1] <= (-this.boxWidth - this.boxMargin)) {
            if (this.ready.length !== 0) {
                this.execute.push(this.ready.shift())
                this.step.push(0)
            }
        }

        for (let item = 0; item < this.execute.length; item++) {
            this.step[item] -= this.velocity
            this.execute[item].css({
                transform: `translate3d(${this.step[item]}px,0px,0px)`
            })
            if (this.step[0] < (-this.boxWidth - this.boxMargin - this.parentBoxWidth)) {
                this.step[0] = 0
                this.execute[0].css({
                    transform: `translate3d(0px,0px,0px)`
                })
                this.step.shift()
                this.ready.push(this.execute.shift())
                // 移除后index--,避免漏了当前数组的第一个
                item--
            }
        }
        setTimeout(() => {
            this.loop()
        }, getData('boxRollViolet'))
    }
    // 监听
    monitor() {
        // 未开启
        if (!getData('openMonitor')) {
            return
        }
        // 获取到的数据添加至Ready的末尾
        if (getData('matchBox')) {
            if (this.execute[this.execute.length - 1].css("transform").substring(7).split(',')[4] <= (-this.boxWidth - this.boxMargin)) {
                // 新增节点
                let $new
                if ($('.boxes').children().length <= 5) {
                    // 抓盒币
                    if (getData('boxCoin') < 199) {
                        $new = $(`<div class="box commonBox"><img src='${coin}' class='coin'>5盒币</div></div>`)
                    } else {
                        $new = $(`<div class="commonBox"><img src='${funny}' class='materialItem'><div class='itemName'>滑稽抱枕</div></div></div>`)
                    }
                    // 抓实物
                    $('.boxes').append($new)
                    this.node = $('.boxes').children().last()
                    this.execute.push($new)
                } else {
                    // 替换节点内容
                    if (getData('boxCoin') < 199) {
                        this.ready[0].html(`<img src='${coin}' class='coin'>5盒币</div>`)
                    } else {
                        this.ready[0].html(`<img src='${earphone}' class='materialItem'><div class='itemName'>滑稽抱枕</div></div>`)
                    }
                    this.node = this.ready[0]
                }
                setData('matchBox', false)
                // 爪子张开
                this.currentPaw.openPaw().then((isDown) => {
                    this.down = isDown
                })
            }
        }
        // 与定时器绑定下降
        if (this.down) {
            this.currentPaw.pawDown().then((data) => {
                this.down = data.down
                // 与定时器解绑
                this.flag = data.flag
                setData(('openMonitor', false))
                // 爪子下降结束后，立马上升
                this.currentPaw.pawUp(this.node).then(() => {
                    // 上升至顶部
                    // 判断抓取成功/失败
                    this.currentPaw.isGet(this.node, true).then(() => {
                        // 出现弹窗
                        setTimeout(() => {
                            $('.commonPay').removeClass('hide').addClass('show')
                            $('.getCoinBox').removeClass('hide').addClass('show').siblings().removeClass('show').addClass('hide')
                            $('.getCoinBox .yellowText').text(this.node.text())
                            this.node.css({
                                transform: `translate3d(0px,0px,0px)`
                            })
                            this.ready.push(this.node)
                        }, 300);

                    }, () => {
                        this.node.css({
                            transform: `translate3d(0px,0px,0px)`
                        })
                        this.ready.push(this.node)
                        setTimeout(() => {
                            $('.commonPay').removeClass('hide').addClass('show')
                            $('.noGet').removeClass('hide').addClass('show').siblings().removeClass('show').addClass('hide')
                        }, 500)
                    })
                    $('.mainWrap').css("pointer-events", "auto")
                    return false
                })
            })
        }
    }
}

module.exports = roll