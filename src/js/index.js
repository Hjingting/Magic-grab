import reward from '../data/reward'
import {
    coin
} from '../data/imgs'
import roll from '../util/roll'
import  {setData,getData} from '../data/global'



$(document).ready(function () {   
    // 抓盒币
    $('.clickBtn.boxCoinBtn').click(function () {
        // 改变遮罩层位置
        $('.shadow_top').removeClass('shadow_top_right').addClass('shadotop_left')
        // 改变抓抓机背景
        $('.mainBg-2').removeClass('mainBg-2').addClass('mainBg-1')
        // 按钮选项
        $('.grabCoin').removeClass('hide').addClass('show')
        $('.grabMaterial').removeClass('show').addClass('hide')
        $('.boxes').empty()
        $('.machineCover').removeClass('machineCover2').addClass('machineCover1')
        $('.boxes').empty()
        for (let i in reward.coinBox.primary) {
            $('.boxes').append(`<div class="box commonBox"><img src='${coin}' class='coin'>${reward.coinBox.primary[i]}</div></div>`)
        }
        currentRoller = new roll($('.boxes'))
        currentRoller.rollLeft()
        setData('boxCoin',8)
    })
    // 抓实物
    $('.clickBtn.materialBtn').click(function () {
        setData('boxCoin',199)
        // 改变遮罩层位置
        $('.shadow_top').removeClass('shadow_top_left').addClass('shadow_top_right')
        // 改变抓抓机背景
        $('.mainBg-1').removeClass('mainBg-1').addClass('mainBg-2')
        // 按钮选项
        $('.grabMaterial').removeClass('hide').addClass('show')
        $('.grabCoin').removeClass('show').addClass('hide')
        $('.machineCover').removeClass('machineCover1').addClass('machineCover2')
        // 抓实物初始化弹窗
        if (getData('grabMaterial')) {
            setData('grabMaterial',false)
            $('.mask').removeClass('show').addClass('hide')
            $('.initBg2').removeClass('hide').addClass('show')
        }

        $('.boxes').empty()
        for (let i in reward.item.primary) {
            $('.boxes').append(`<div class='commonBox'><img src='${reward.item.primary[i].img}' class='materialItem'><div class='itemName'>${reward.item.primary[i].name}</div></div></div>`)
        }
        currentRoller = new roll($('.boxes'))
        currentRoller.rollLeft()
        
    })
    // 盒币个数按钮 - 抓盒币(阴影效果+盒币切换)
    $('.eight').click(function () {
        $('.shadow_boxCoin').addClass('show').addClass('shadow_start').removeClass('shadow_center').removeClass('shadow_end')
        setData('boxCoin',8)
        $('.boxes').empty()
        for (let i in reward.coinBox.primary) {
            $('.boxes').append(`<div class="box commonBox"><img src='${coin}' class='coin'>${reward.coinBox.primary[i]}</div></div>`)
        }
        currentRoller = new roll($('.boxes'))
        currentRoller.rollLeft()
    })
    $('.eighteen').click(function () {
        $('.shadow_boxCoin').addClass('show').addClass('shadow_center').removeClass('shadow_start').removeClass('shadow_end')
        setData('boxCoin',18)
        $('.boxes').empty()
        for (let i in reward.coinBox.intermediate) {
            $('.boxes').append(`<div class="box commonBox"><img src='${coin}' class='coin'>${reward.coinBox.intermediate[i]}</div></div>`)
        }
        currentRoller = new roll($('.boxes'))
        currentRoller.rollLeft()
    })
    $('.thirtyEight').click(function () {
        $('.shadow_boxCoin').addClass('show').addClass('shadow_end').removeClass('shadow_start').removeClass('shadow_center')
        setData('boxCoin',38)
        $('.boxes').empty()
        for (let i in reward.coinBox.senior) {
            $('.boxes').append(`<div class="box commonBox"><img src='${coin}' class='coin'>${reward.coinBox.senior[i]}</div></div>`)
        }
        currentRoller = new roll($('.boxes'))
        currentRoller.rollLeft()
    })

    // 盒币个数按钮 - 抓实物
    $('.materialOne').click(function () {
        $('.shadow_material').addClass('show').removeClass('shadow_center2').addClass('shadow_start2')
        setData('boxCoin',199)
        $('.boxes').empty()
        for (let i in reward.item.primary) {
            $('.boxes').append(`<div class='commonBox'><img src='${reward.item.primary[i].img}' class='materialItem'><div class='itemName'>${reward.item.primary[i].name}</div></div></div>`)
        }
        currentRoller = new roll($('.boxes'))
        currentRoller.rollLeft()
    })
    $('.materialTwo').click(function () {
        $('.shadow_material').addClass('show').removeClass('shadow_start2').addClass('shadow_center2')
        setData('boxCoin',1299)
        $('.boxes').empty()
        for (let i in reward.item.senior) {
            $('.boxes').append(`<div class='commonBox'><img src='${reward.item.senior[i].img}' class='materialItem'><div class='itemName'>${reward.item.senior[i].name}</div></div></div>`)
        }
        currentRoller = new roll($('.boxes'))
        currentRoller.rollLeft()
    })

    // Go - 抓娃娃
    $('.goButton').click(function () {
        $('.commonPay').removeClass('hide').addClass('show')
        $('.payWays .info .yellowText').text( getData('boxCoin') + '盒币')
        $('.payWays').removeClass('hide').addClass('show').siblings().not('.close').removeClass('show').addClass('hide')
    })

    // 确认支付 - 使用盒币支付
    $('.confirmPay').click(function () {
        $('.payWays').removeClass('show').addClass('hide')
        $('.confirmInfo .info .yellowText').text(getData('boxCoin') + '盒币')
        $('.confirmInfo').removeClass('hide').addClass('show')
    })
})