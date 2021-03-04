// 导入用户数据
import User from '../data/userInfo'
import pawer from '../util/pawer'
import {
    setData,
    getData
} from '../data/global'

$(document).ready(function () {
    //今日签到
    $('.signInToday').click(function () {
        if (!getData('isSignIn')) {
            setData('isSignIn', true)
            $(this).removeClass('yellowBtn').addClass('greyBtn')
            $(this).siblings().removeClass('yellowBottom').addClass('greyBottom')
            $(this).html(`<span class="receiveReward">已签到</span>
        <span class="receiveReward greyTextBorder centerBtn" style="top:50%;left:50%;transform:translate:(-50%,-50%)">已签到</span>`)
            if (User.day !== 6) {
                $('section').eq(User.day).removeClass('normalDayCard').addClass('lightDayCard').append(`<div class="arrive"></div>`).children().eq(0).addClass(`commonLight lightDay${User.day + 1}`)
            } else if (User.day === 6) {
                $('section').eq(User.day).removeClass('normalDayCard').addClass('presentLightCard').append(`<div class="arrive"></div>`).children().eq(0).addClass(`commonLight lightDay${User.day + 1}`)
                $('.getReward').removeClass('greyBtn').addClass('yellowBtn').children().eq(1).removeClass('greyTextBorder').addClass('yellowTextBorder').css('left', '23.5%')
                $('.getReward').siblings().removeClass('greyBottom').addClass('yellowBottom')
            }
        }
    })

    let currentPaw = new pawer($('.pawRope'), $('.boxes'), $('.box'))
    // 确认支付 - 使用抓抓券
    // 对当前用户的抓抓券数量进行判断
    $('.useTicket').click(function () {
        if (User.ticket === 0) {
            $('.payWays').removeClass('show').addClass('hide')
            $('.payTicket').removeClass('hide').addClass('show')
        } else {
            $('.mask').removeClass('show').addClass('hide')
        }
    })

    // 确认支付 - 盒币付款
    // 对当前用户的盒币数量进行判断
    $('.payBoxCoin').click(function () {
        if (User.boxCoin < getData('boxCoin')) {
            $('.confirmInfo').removeClass('show').addClass('hide')
            $('.notEnough').removeClass('hide').addClass('show')
        } else {
            $('.mask').removeClass('show').addClass('hide')
            // 用户已成功支付
            $('.mainWrap').css("pointer-events", "none")
            setData('startShake', true)
            currentPaw.pawShake()
            // 延迟两秒后开始监听 模拟向后端请求数据
            setTimeout(() => {
                setData('openMonitor', true)
                // 成功获取数据
                setData('matchBox', true)
            }, 2000);
        }
    })
})