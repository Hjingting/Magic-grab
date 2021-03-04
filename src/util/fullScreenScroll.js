class fullScreenScroll {
    sectionIndex = 0;
    //section数量    
    sectionNum = 2;
    //section滚动时间(ms)    
    scrollDuration = 700;
    scrolling = false
    //页面向下滚动
    scrollDown() {
        // 屏内滚动
        if ($('.partTwo').scrollTop() > 0) {
            return
        } else {
            //section位置往上，若在最前则不滚动，使滚动状态为非滚动中;否则进行页面滚动        
            if (--this.sectionIndex < 0) {
                this.sectionIndex++;
                this.scrolling = false;
            } else {
                console.log(3)
                this.scrollPage();
            }
        }
    }
    //页面向上滚动
    scrollUp() {
        // 屏内滚动

        if (Math.ceil(($('.partOne').scrollTop())) < $('.mainBg-1').height() - $(window).height()) {
            return
        } else {
            //section位置往下，若在最后则不滚动，使滚动状态为非滚动中;否则进行页面滚动        
            if (++this.sectionIndex >= this.sectionNum) {
                this.sectionIndex--;
                this.scrolling = false;
            } else {
                this.scrollPage();
            }
        }
    }
    //页面滚动    
    scrollPage() {
        //获取窗口的高度，计算滚动到对应section的高度        
        var scrollHeight = $(window).height() * this.sectionIndex;
        //通过css3动画进行滚动        
        $(".main").css({
            "transition-duration": this.scrollDuration + "ms",
            "transform": "translate3d(0px,-" + scrollHeight + "px,0px)"
        });
        //设置等待动画完成后，设置滚动状态为非滚动中
        setTimeout(() => {
            this.scrolling = false;
        }, this.scrollDuration);
    }
}

module.exports = fullScreenScroll