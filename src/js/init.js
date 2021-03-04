import roll from '../util/roll'
import reward from '../data/reward'
import pauseRoll from '../util/pauseRoll'
import user from '../data/userInfo'
import fullScreenScroll from '../util/fullScreenScroll'
import {
    coin
} from '../data/imgs'
import {
    setData,
    getData
} from '../data/global'

function initFunction() {
    $('.boxes').empty()
    $('.awardUl').empty()
    setData("rootFontSize", document.documentElement.style.fontSize.replace('px', ''))
    let fullScreen = new fullScreenScroll()
    // 展盒向左循环滚动
    // 初始化抓盒币的展盒
    for (let i in reward.coinBox.primary) {
        $('.boxes').append(`<div class="box commonBox"><img src='${coin}' class='coin'>
        </div>`)
    }
    currentRoller = new roll($('.boxes'))
    currentRoller.rollLeft()

    // 顶部获奖名单滚动
    for (let i = 0; i < reward.awardUser.length; i++) {
        $('.awardUl').append(`<li class="awardLi"><span class="awardName"><span>恭喜</span> <span class="nickName">${reward.awardUser[i].name}</span><span> 获得了</span></span>
        <span class="awardItem">${reward.awardUser[i].item}</span></li>`)
    }
    let pauseRoller = new pauseRoll($('.awardUl'))
    pauseRoller.pauseRoll()

    //设置partOne、partTwo高度适配屏幕高度
    $('.partOne').css({
        height: $(window).height(),
        overflowY: 'auto',
        overflowX: 'hidden'
    })
    $('.partTwo').css({
        height: $(window).height(),
        overflowY: 'auto',
        overflowX: 'hidden'
    })
    // 全屏滚动
    let main = $('.main'); //滑动容器
    let startY = ''
    let endY = ''
    main.on('mousewheel', function (e) {
        e.preventDefault()
    })
    // 触屏开始
    main.on('touchstart', function (e) {
        var touch = e.originalEvent.targetTouches[0];
        startY = touch.pageY;
    });
    //触屏结束
    main.on('touchend', function (e) {
        var touch = e.originalEvent.changedTouches[0];
        var endY = touch.pageY;

        if (endY - startY < 0) {
            fullScreen.scrollUp();

        } else if (endY - startY > 0) {
            fullScreen.scrollDown();
        }
    });
}


$(document).ready(function () {
    let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    window.addEventListener(resizeEvt, function () {
        initFunction()
    }, false);

    // 初级场提示框
    $('.commonPay').removeClass('hide').addClass('show')
    $('.initBg1').removeClass('hide').addClass('show')
    initFunction()

    // 用户连续签到卡
    $('.days').children().each(function () {
        if ($(this).index() < user.day) {
            $(this).removeClass('normalDayCard').addClass('lightDayCard').append(`<div class="arrive"></div>`).children().eq(0).addClass(`commonLight lightDay${$(this).index() + 1}`)
        }
    })


})