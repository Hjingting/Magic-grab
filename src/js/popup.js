
$(document).ready(function () {
    // 出现弹窗时，禁止页面滑动
    $('.mask').on("touchmove", function (e) {
        $('.mainWrap').css({
            overflow:'hidden'
        })
    });
    $('.mask').on('mousewheel',function(e) {
        e.preventDefault()
    })

    //假设页面同时只能存在一个弹框
    $('.close').click(function () {
        // 关闭所有的弹窗
        $('.mask').removeClass('show').addClass('hide')
    })
    $('.rule').click(function () {
        $('.ruleDetail').removeClass('hide').addClass('show')
    })
    $('.warehouse').click(function () {
        $('.warehouseDetail').removeClass('hide').addClass('show')
    })

    // 字数过多，字体缩小
    $('.column3').each(function () {
        if ($(this).text().length > 6) {
            $(this).find('span').addClass('smallFont')
        }
    })

    // 仓库 - 填写地址
    $('.writeAddress').click(function () {
        $('.mask').removeClass('show').addClass('hide')
        $('.address').removeClass('hide').addClass('show')
    })

    //仓库 - 填写QQ
    $('.writeQQ').click(function () {
        $('.mask').removeClass('show').addClass('hide')
        $('.QQ').removeClass('hide').addClass('show')
    })

    // 点击宝箱 - 奖励预览
    $('.present').click(function () {
        let index = $(this).index()
        // 替换黄字span元素内的文字
        $('.unlock .yellowText').text(40 * (index + 1))

        $('.reward').removeClass('hide').addClass('show')
    })

    // 再来一次
    $('.onceAgain').click(function () {
        $('.mask').removeClass('show').addClass('hide')
    })
    $('.takeIt').click(function () {
        $('.mask').removeClass('show').addClass('hide')
    })

    // 盒币不足
    $('.notEnough').click(function() {
        $('.mask').removeClass('show').addClass('hide')
    })

    // 去参与
    $('.participateBtn').click(function() {
        $('.mask').removeClass('show').addClass('hide')
    })
})