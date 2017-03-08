const $ = require("Zepto");
const { api } = require("dingeTools");
const Listcomponents = require("./components/listcomponents");
const { getURLParam } = require("utils");


function User(opt){
    Listcomponents.call(this, opt);
    this.userId = getURLParam("userId");
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
    const userId = this.userId;
    return Promise.all([ api.getUser({ userId  }), api.comments({
        userId,
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
    const userId = this.userId;
    /*加关注*/
    $("#guanzhu").tap(() => {
        api.focus({
            userId
        })
        .then(() => {
            $("#guanzhu").text("已关注");
        },(err) => {
            console.log(err);
        });
    });
};

const user = new User({
    id: "other",
    hasDel: false,
    hasEvent: true
});
user.init();