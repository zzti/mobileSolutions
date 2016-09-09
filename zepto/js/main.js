$(function() {
    //页面导航
   // $("#main").on("swipeleft", swipeleftHandler).on("swiperight", swiperightHandler);
    //右滑动
    function swiperightHandler(event) {
        console.log("右滑动");
        $.mobile.changePage("#left", { transition: "slidefade", });
    }
    //左滑动
    function swipeleftHandler(event) {
        console.log("左滑动");
        $.mobile.changePage("#right", { transition: "slidefade", reverse: true });
    }
 
 
    var $down = $("#pullDown"), myScroll;
    var $downlabe = $(".pullDownLabel");
    var $uplabe = $(".pullUpLabel");
    var $up = $("#pullUp");
    var $ul = $("#scroller ul");
    var $rt = $("#right");
    var $scroller = $("#scroller");
    function upload() {
        setTimeout(function () {
            $up.hide();
            $uplabe.html("上拉加载更多...");
            var num = parseInt(Math.random() * $ul.find("li").length);
            var li = $ul.find("li").eq(num).clone();
            $ul.append(li);
            myScroll.refresh();
        }, 1100);
    }
    function download() {
        setTimeout(function () {
            $down.hide();
            $downlabe.html("下拉刷新...");
            var num = parseInt(Math.random() * $ul.find("li").length);
            var li = $ul.find("li").eq(num).clone();
            $ul.prepend(li);
            myScroll.refresh();
        }, 1500);
    }
    myScroll = new iScroll('wrapper', {
        onBeforeScrollStart: null,
        onRefresh: function () {
           // console.log("onRefresh");
            $downlabe.html("下拉刷新");
        },
        onScrollMove: function () {
            //console.log("minScrollY", this.minScrollY);
            //console.log("maxScrollY", this.maxScrollY);
            //滚动条到顶部的时候
            if ($rt.scrollTop() == 0 && this.y > 0) {
                $down.show();
                console.log("下拉", $rt.scrollTop());
            }
            //滚动条的到顶部的距离 大于等于 页面总高度减去视野高度  50让其靠近下方
            if (this.y < 0 && ($rt.scrollTop() - 50 >= ($scroller.height() - $(window).height()))) {
                $up.show();
                console.log("上拉", $(document).height(), $("#scroller").height());
            }
        },
        onScrollEnd:function() {
            console.log("onScrollEnd");
            if ($down.is(":visible")) {
                $downlabe.html("加载中...");
                download();
            }
            if ($up.is(":visible")) {
                $uplabe.html("加载中...");
                upload();
            }

        }
    });
    var myScroll1 = new iScroll('wrapper1',
        {
            eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false ,
            snapSpeed: 400,
            momentum: false,
            snap: true,
            indicators: {
                el: document.getElementById('indicator'),
                resize: false
            }
        }
        );

})