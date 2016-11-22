const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");

(($) => {
    function UserInfo(opt){
        this.id = opt.id;
        this.init();
    }
    UserInfo.prototype = {
        init(){
            dingeTools.init();
            this.bindEvent();
            this.render();
        },
        bindEvent(){
            $(".user_carouse").on("touchend", () => {
                window.location.href = "/views/edit_user.html";
            });
        },
        // 获取数据
        getData(){
            return dingeTools.userInfo({
                token:Cookie.get("dinge")
            });
        },
        // 渲染数据
        renderData(result){
            const data = result.data;
            $(".user_carouse img").attr("src", data.avatar);
            $(".user_nickname").html(data.nickname);
            $(".notice").html(data.sign);
        },
        // 渲染页面
        render(){
            this.getData()
            .then((result) => {
                this.renderData(result);
            });
        }
    };
    new UserInfo({
        id:"userinfo"
    });
})($);