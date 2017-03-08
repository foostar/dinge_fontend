module.exports = {
    getURLParam:function (key){
        var  url=  window.location;
        var  paramStrArr= url.href.split("?");
        if(paramStrArr.length>=2&&paramStrArr[ 1 ]!=""){
            var  paramStr=paramStrArr[ 1 ];
            var  paramArr = paramStr.split("&");
            for (var index  in paramArr){
                var paramstr= paramArr[ index ];    //key=value
                var paramArray =  paramstr.split("=");
                if(paramArray.length==2&&paramArray[ 0 ]==key){
                    return   paramArray[ 1 ];
                }
            }       
        }
        return null;
    },
    // 检测账户
    checkAccount: function(val) {
        if(val.length < 1){
            return "账号不能为空！";
        }
        if(val.length > 20){
            return "账号不能大于10个字符！";
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
            return "密码不能少于6位！";
        }
        if(val.length > 18){
            return "密码不能多于18位！";
        }
        if(regNumber.test(val)){
            return "密码至少包含一位数字";
        }
        if(regLetter.test(val)){
            return "密码至少包含一位小写字符";
        }
        if(!regAscll.test(val)){
            return "密码不能包含特殊字符";
        }
        /*if(regAscll.test(val)){
            return "密码至少包含一位大写字符"
        }*/
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