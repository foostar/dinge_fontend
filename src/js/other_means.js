const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Listcomponents = require("./components/listcomponents");

$(() => {
    function User(opt){
        Listcomponents.call(this, opt);
    }
    User.prototype = Object.create(Listcomponents.prototype);
    User.constructor = User;
    User.prototype.getTemplate = function (item) {
        return "<div class='mar_28 other_pinglun'>"
                            +"<h4 class='font-bold'>「<span>"+item.title+"</span>」</h4>"
                            +"<p class='font-normal'>"+item.content+"</p>"
                        +"</div>";
    };
    User.prototype.fetchData = function (page) {
        return Promise.all([ dingeTools.userInfo({ token: Cookie.get("dinge") }), dingeTools.myConmments({
            token: Cookie.get("dinge"),
            page
        }) ])
        .then(([ userinfo, commments ]) => {
            var data = userinfo.data;
            //console.log(data);
            $("#other_src img").attr("src",data.avatar);
            $("#other_name").text(data.nickname);
            $("#other_cont").text(data.sign);
            return new Promise((reslove) => reslove(commments));
        });
    };
    User.prototype.attachEvent = function () {
        /*加关注*/
        $("#guanzhu").tap(() => {
            dingeTools.focus({
                token: Cookie.get("dinge"),
                id: "1111"
            })
            .then(() => {
                $("#guanzhu").text("已关注");
            },(err) => {
                console.log(err);
            });
        });
    };
    var user = new User({
        id: "other",
        hasDel: false,
        hasEvent: true
    });
    user.init();
});