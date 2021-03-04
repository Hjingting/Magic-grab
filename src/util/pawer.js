import  {setData,getData} from '../data/global'

class pawer {
    // 绳子伸缩量
    height = 0
    // 绳子长度
    ropeLength = 200* getData('rootFontSize') / 100
    // 爪子下降速度
    ropeDownVelocity = 1.5 *getData('rootFontSize') / 100
    // 爪子上升速度
    ropeUpVelocity = 1.8 * getData('rootFontSize')/ 100
    // 爪子摇晃角度
    pawDeg = 0
    // 爪子摇晃方向
    positive = 1
    // 爪子位置
    desPos = 0.5 * ($('.fixedBox')).width() + 0.25 * ($('.pawRope')).width() + $('.pawLeft').width()

    //爪子摆动
    pawShake() {
        let shake = setInterval(() => {
            if (getData('startShake')) {
                this.pawDeg += this.positive
                if (this.pawDeg < -8) {
                    this.positive = 1
                }
                if (this.pawDeg > 8) {
                    this.positive = -1
                }
                $('.pawRope').css({
                    transform: `rotate(${this.pawDeg}deg)`
                })
            } else {
                this.pawDeg = 0
                this.positive = 1
                clearInterval(shake)
            }

        }, 50);
    }

    // 爪子张开
    openPaw() {
        return new Promise((resolve) => {
            $('.pawRope').css({
                transform: "rotate(0deg)",
                transition: '0.5s'
            })
            $('.pawLeft').css({
                transform: "rotate(23deg)",
                transformOrigin: '96% 5%',
                transition: '0.5s'
            })
            $('.pawRight').css({
                transform: "rotate(-20deg)",
                transformOrigin: '4% 5%',
                transition: '0.5s'
            })
            // 爪子张开时就停止摇晃 归位
            setData('startShake',false)
            setTimeout(() => {
                $('.pawRope').css({
                    transform: "rotate(0deg)",
                    transition: '0s'
                })
                resolve(true)
            }, 570);
        })
    }

    // 爪子下降
    pawDown() {
        return new Promise((resolve) => {
            this.height += this.ropeDownVelocity
            $('.pawRope').css({
                transform: `translate3d(0px,${this.height}px,0px)`
            })
            if (this.height >= 180 * getData('rootFontSize') / 100) {
                // 爪子合起
                $('.pawLeft').css({
                    transform: "rotate(0deg)",
                    transformOrigin: '96% 5%',
                    transition: '0.4s'
                })
                $('.pawRight').css({
                    transform: "rotate(0deg)",
                    transformOrigin: '4% 5%',
                    transition: '0.4s'
                })
            }
            if (this.height >= this.ropeLength) {
                resolve({
                    down: false,
                    flag: 1
                })
            }
        })

    }

    // 爪子上升
    pawUp(node) {
        return new Promise((resolve) => {
            let upTimer = setInterval(() => {
                if (this.height >= 0) {
                    this.height -= this.ropeUpVelocity
                    $('.pawRope').css({
                        transform: `translate3d(0px,${this.height}px,0px)`
                    })
                    node.css({
                        transform: `translate3d(-${this.desPos}px,${this.height-this.ropeLength}px,0px)`
                    })
                } else {
                    resolve()
                    clearTimeout(upTimer)
                }
            }, 1);
        })

    }

    // 判断是否获奖
    isGet(node, str = false) {
        let tmpY = this.height - this.ropeLength
        return new Promise((resolve, reject) => {
            if (str) {
                resolve()
            } else {
                let t = setInterval(() => {
                    if (tmpY < 30 * getData('rootFontSize') / 50) {
                        tmpY += 8 *getData('rootFontSize') / 50
                        node.css({
                            transform: `translate3d(-${this.desPos}px,${tmpY}px,0px)`
                        })
                    } else {
                        clearInterval(t)
                        reject()
                    }
                }, 10);
            }
        })
    }
}

module.exports = pawer