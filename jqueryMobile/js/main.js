$(function () {
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

    (function () {
        var $ol = $("#timelist");
        for (var i = 1; i <= 20; i++) {
            var li = $("<li>").html(5 * i);
            $ol.append(li);
        }
    })();

    $(document).on("pagebeforeshow", "#left", function () {
        console.log("left pagebeforeshow");
    });
    $(document).on("pageshow", "#left", function () {
        console.log("left pageshow");
    });
    $.fn.itemSlider = function (options) {
        var configs = $.extend({
            num: 4,
            speed: 1000,
            easing: 'swing',
            isloop: false,
        }, options);

        var $list = this;
        $list.on("swipeleft", function () {
            animationLi(false);
        }).on("swiperight", function () {
            animationLi(true);
        });

        var width = $list.width();
        var limit = $list.parent().width();
        console.log(width, limit);
        var scope = width - limit;//最终位置 

        var num = configs.num;
        var isloop = configs.isloop;
        console.log('isloop', isloop);
        var ml = [];
        for (var i = 0; i <= num; i++) {
            ml[i] = (-i * scope / num).toFixed(1);
        }
        console.log(ml);

        function animationLi(direcet) {
            var now = parseFloat($list.css("margin-left")).toFixed(1);
            var next, sb;
            for (var j = 0; j <= num; j++) {
                if (ml[j] == now) {
                    //向左移动
                    if (!direcet) {
                        sb = j + 1;
                     
                        if (!isloop && sb > 4) {
                            sb = num;
                        }
                    } else {
                        sb = j - 1;
                        if (!isloop && sb < 0) {
                            sb = 0;
                        }
                    }
                    next = ml[sb];
                    console.log(now);
                    console.log(sb);
                    $list.animate({
                        marginLeft: next + "px",
                    }, configs.speed, configs.easing);
                    break;
                }
            }
        }
    }


    $("#timelist").itemSlider({ num: 4, speed: 500, isloop: true });


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
        onScrollEnd: function () {
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
            eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false,
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