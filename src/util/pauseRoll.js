import {
    getData
} from '../data/global'
class autoScroll {
    notPause = true
    // 执行数组
    execute = []
    // 位移数组
    step = []
    constructor(arr) {
        // 待调度数组
        this.ready = []
        let that = this
        arr.children().each(function () {
            that.ready.push($(this))
            that.step.push(0)
        })
    }
    pauseRoll() {
        let t = setInterval(() => {
            this.goUp()
        }, 20);
    }
    goUp() {
        if (this.notPause) {
            // 初始化执行数组
            if (this.execute.length === 0) {
                if (this.ready.length !== 0) {
                    this.execute.push(this.ready.shift())
                }
            }
            // 已出界 回到起点
            if (this.step[0] < -110 * getData('rootFontSize') / 100) {
                this.step[0] = 0
                this.execute[0].css({
                    transform: `translate3d(0px,0px,0px)`
                })
                this.ready.push(this.execute.pop(this.execute[0]))
            }

            for (let item = 0; item < this.execute.length; item++) {
                this.step[item] -= 2 * getData('rootFontSize') / 100
                this.execute[item].css({
                    transform: `translate3d(0px,${this.step[item]}px,0px)`
                })
                if (this.step[item] <= -56 * getData('rootFontSize') / 100 && this.step[item] > -58 * getData('rootFontSize') / 100) {
                    this.notPause = false
                    setTimeout(() => {
                        this.notPause = true
                    }, 500);
                }
            }
        }
    }
}

module.exports = autoScroll