 /**
 * Created by xiusiteng on 2016-08-12.
 * @desc 公共工具函数
 */
import $ from "Zepto";
import API from "API";
import config from "../config/config";
class DingeTools {
    //  初始化底层font-size
    init(){
        /* eslint-disable */
        const locationMap = {
            home: 0,
            find: 1,
            moviedetails: 1,
            comment:1,
            write:1,
            message:2,
            messagelist:2,
            messages:2,
            messages_comment:2,
            messages_fans:2,
            messages_like:2,
            user:3,
            edit_user:3,
            other_means:3,
            mycollet:3,
            history:3,
            myfocus:3,
            mycomment:3
        };
        /* eslint-enable */
        var href = window.location.href;
        var key = href.substring(href.lastIndexOf("/")+1, href.lastIndexOf("."));
        if ($(".footer")) {
            $(".footer").find("a").eq(locationMap[ key ]).addClass("active");
        }
        var evt = "onorientationchange" in window ? "orientationchange" : "resize";
        var remPage = function(){
            document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + "px";
        };
        window.addEventListener(evt, remPage, false);
        remPage();
    }
    // 左滑出现删除按钮
    showDelete(ele){
        ele.on("swipeLeft",".swiper-slide", function(){
            $(".swiper-slide").find(".del_info_mask").css({ display: "block" });
            $(".swiper-slide").find(".info_slide").addClass("slide-left");
            $(".swiper-slide").find(".del_info_btn").addClass("del_info_visible_normal");
        });
    }
    // 关闭删除按钮
    cancelDelete(ele){
        var self = this;
        ele.on("click",".del_info_mask", function(){
            self.cancelBtn();  
        });
    }
    // 关闭删除特效
    cancelBtn(){
        if($(".slide-left")){
            $(".slide-left").removeClass("slide-left");
            $(".del_info_visible_normal").removeClass("del_info_visible_normal");  
            $(".del_info_mask").css({display: "none"});  
        }
    }
    // 加载底部
    loadingFooter2(){    
        var dtd = $.Deferred();
        $("#footer2").load("../views/footer2.html",function(){
            dtd.resolve({status:1});
        });
        return dtd;
    }
    // 初试化touchmove，解决tap中 swipe不生效的问题
    initTouchMove(){
        document.addEventListener("touchmove", function (event) {
            event.preventDefault();
        }, false);
    }
    // 向上返回
    goBack(){
        $(".goback").on("touchend", function(){
            event.preventDefault();
            window.history.back();
        });
    }
}
module.exports = {
    dingeTools: new DingeTools(),
    api: new API(config)
};
