  /* eslint-disable */
 /**
 * Created by xiusiteng on 2016-08-12.
 * @desc 公共工具函数
 */
const $ = require("Zepto");
const API = require("API");
const Cookie = require("js-cookie");
const config = require("../config/config");

var Api = new API(config)
if (config.env == 'test') {
    Cookie.set("dinge","577cc175ffd27d3c2f325c6f")
}
var DingeTools = {
    getURLParam:function (key){
        var  url=  window.location;
        var  paramStrArr= url.href.split('?');
     // alert(params[1]);
     if(paramStrArr.length>=2&&paramStrArr[1]!=""){
       var  paramStr=paramStrArr[1];
          var  paramArr = paramStr.split('&');
                 for (var index  in paramArr){
                    var paramstr= paramArr[index];    //key=value
                    var paramArray =  paramstr.split('=');
                  if(paramArray.length==2&&paramArray[0]==key){
                      return   paramArray[1];
                    }
            }       
        }
        return null;
    },
    //重置表单
    resetForm:function(opt){
        var _option = {
            className:"form-group",   //表单group值
            errorClass:"has-error",   //错误信息提示框
            helpClass:"help-block",   //错误信息提示
            countDownClass:"btn-primary", //倒计时变化样式 
            helpInfo:"获取验证码",   //倒计时提示文字
            countDown:"getvalidate"  //倒计时button
        };
        var option = $.extend({},_option,opt);
        if(!option.formId){
            throw new Error("请传入要重置的表单ID");
        }
        $("#"+option.formId+" ."+option.className+"").each(function(index,ele){
            var inputText = $(ele).find($("input[type='text'], input[type='password'], input[type='email'], input[type='number']"));
            var inputRadio = $(ele).find($("input[type='radio']"));
            var inputCheckbox = $(ele).find($("input[type='checkbox']"));
            var select = $(ele).find($("select"));
            var textarea = $(ele).find($("textarea"));
            var counter = $(ele).find($("."+option.countDown+""));
            if(inputText){
                $(ele,inputText).removeClass("has-error");
                $(ele).find($("."+option.helpClass+"")).each(function(index,element){
                    $(element).html("");
                });
                inputText.val("");
            }
            if(inputRadio){
                inputRadio.each(function(index,element){
                    element.checked = false;
                    if(index == 0){
                        element.checked = true;
                    }
                });
            }
            if(textarea){
                textarea.val("");
            }
            if(inputCheckbox){
                inputCheckbox.each(function(index,element){
                    element.checked = false;
                    if(index == 0){
                        element.checked = true;
                    }
                });
            }
            if(select.length>0){
                select.val(select.find("option")[ 0 ].val());
            }
            if(counter){
                counter.removeClass(option.countDownClass);
                counter.attr("disabled",true);
                counter.html(option.helpInfo);
            }
        });
    },
    // 检测账户
    checkAccount: function(val) {
        if(val.length < 1){
            return '账号不能为空！'
        }
        if(val.length > 20){
            return '账号不能大于10个字符！'
        }
    },
    // 检测用户名
    checkUsername: function(val) {
        if(val.length < 1){
            return "用户名不能为空！";
        }
        if(val.length > 8){
            return "用户名不能多于8个字符！";
        }
    },
    // 检测邮箱
    checkEmail: function(val) {
        var reg=/^\w{3,}@\w+(\.\w+)+$/; 
        if (!val) {
            return "邮箱不能为空！";
        }
        if(!reg.test(val)){
            return "邮箱格式不正确！";
        }
    },
    // 检测密码
    checkPassword: function(val){
        var regNumber=/^[a-zA-Z]+$/;
        var regAscll=/^[a-zA-Z0-9]+$/;
        var regLetter=/^[A-Z0-9]+$/;
        if(val.length < 6){
            return "密码不能少于6位！"
        }
        if(val.length > 18){
            return "密码不能多于18位！"
        }
        if(regNumber.test(val)){
            return "密码至少包含一位数字"
        }
        if(regLetter.test(val)){
            return "密码至少包含一位小写字符"
        }
        if(!regAscll.test(val)){
            return "密码不能包含特殊字符"
        }
        /*if(regAscll.test(val)){
            return "密码至少包含一位大写字符"
        }*/
    },
    //  初始化底层font-size
    init:function(){
        var evt = "onorientationchange" in window ? "orientationchange" : "resize"
        var remPage = function(){
            document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
        }
        window.addEventListener(evt, remPage, false);
        remPage()
    },
    // 左滑出现删除按钮
    showDelete:function(ele){
        ele.on("swipeLeft",".swiper-slide", function(){
            $(this).find(".del_info_mask").show()
            $(this).find(".info_slide").addClass("slide-left");
            $(this).find(".del_info_btn").addClass("del_info_visible_normal");
        });
    },
    // 关闭删除按钮
    cancelDelete:function(ele){
        var self = this
        ele.on("click",'.del_info_mask', function(event){
            self.cancelBtn()  
        });
    },
    // 关闭删除特效
    cancelBtn:function(){
        if($(".slide-left")){
            $(".slide-left").removeClass("slide-left");
            $(".del_info_visible_normal").removeClass("del_info_visible_normal");  
            $(".del_info_mask").hide();  
        }
    },
    // 加载底部
    loadingFooter2:function(){    
        var dtd = $.Deferred();
        $("#footer2").load("../views/footer2.html",function(){
            dtd.resolve({status:1});
        });
        return dtd;
    },
    // 初试化touchmove，解决tap中 swipe不生效的问题
    initTouchMove:function(){
        document.addEventListener("touchmove", function (event) {
            event.preventDefault();
        }, false);
    },
    // 向上返回
    goBack:function(){
        $(".goback").on("tap", function(){
            window.history.back();
        });
    },
    // 获取url的参数
    getQueryString:function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null){
            return  unescape(r[ 2 ]);
        } 
        return null;
    },
    // 时间格式化
    format:function (date,fmt) {
        var o = {
            "M+": new Date(date).getMonth() + 1, //月份 
            "d+": new Date(date).getDate(), //日 
            "h+": new Date(date).getHours(), //小时 
            "m+": new Date(date).getMinutes(), //分 
            "s+": new Date(date).getSeconds(), //秒 
            "q+": Math.floor((new Date(date).getMonth() + 3) / 3), //季度 
            "S": new Date(date).getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (new Date(date).getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[ k ]) : (("00" + o[ k ]).substr(("" + o[ k ]).length))); 
            }
        }
        return fmt;
    },
    // 距今时间的格式化
    fromNow:function(fmt){
        var fmtStamp = new Date(fmt).getTime();
        var now = Date.now();
        var timeDiff = (now-fmtStamp)/1000;
        var tmpTime;
        if(timeDiff<60) {
            fmt = "刚刚";
            return fmt;
        }
        if(timeDiff<3600 && timeDiff>60) {
            tmpTime = parseInt(timeDiff/60);
            fmt = tmpTime+"分钟前";
        }
        if(timeDiff<86400 && timeDiff>3600){
            tmpTime = parseInt(timeDiff/3600);
            fmt = tmpTime+"小时前";
        }
        if(timeDiff<172800 && timeDiff>86400){
            fmt = "昨天";
        }
        if(timeDiff<1382400 && timeDiff>172800){
            tmpTime = parseInt(timeDiff/86400);
            fmt = tmpTime+"天前";
        }
        if(timeDiff<2592000 && timeDiff>1382400){
            fmt = "1个月内";
        }
        if(timeDiff<31536000 && timeDiff>2592000){
            tmpTime = parseInt(timeDiff/2592000);
            fmt = tmpTime+"个月前";
        }
        if(timeDiff<157680000 && timeDiff>31536000){
            tmpTime = parseInt(timeDiff/31536000);
            fmt = tmpTime+"年前";
        }
        return fmt;
    }
};
const tools = $.extend({}, DingeTools, Api);
function objCreat(proto){
    function Create(){}
    Create.prototype = proto;
    return new Create();
}
module.exports = objCreat(tools);
