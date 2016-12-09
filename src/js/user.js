const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Components = require("./components/components")

;(($) => {
    function UserInfo(opt){
        Components.call(this, opt);
    }
    UserInfo.prototype = Object.create(Components.prototype);
    UserInfo.constructor = UserInfo;
    // 绑定事件
    UserInfo.prototype.bindEvent = function () {
        $(".user_carouse").on("touchend", () => {
            window.location.href = "/views/edit_user.html";
        });
    };
    // 获取数据
    UserInfo.prototype.fetchData = function () {
        return dingeTools.userInfo({}, -1);
    };
    // 组装数据
    UserInfo.prototype.makeData = function (result) {
        const data = result.data;
        $(".user_carouse img").attr("src", data.avatar);
        $(".user_nickname").html(data.nickname);
        $(".notice").html(data.sign);
    };
    const userinfo = new UserInfo({ id:"userinfo" });
    userinfo.init();
})($);