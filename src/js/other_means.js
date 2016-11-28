const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");

$(() => {
    let page = 1;
    dingeTools.init();
    $(".goback").on("touchend", () => {
        window.history.back();
    });
    dingeTools.userinfo({
        token: Cookie.get("dinge")
    }).then((res) => {
        var data = res.data;
        //console.log(data);
        $("#other_src img").attr("src",data.avatar);
        $("#other_name").text(data.nickname);
        $("#other_cont").text(data.sign);
    });
    dingeTools.myConmments({
        token: Cookie.get("dinge"),
        page
    })
    .then((res) => {
        let html="";
        if(res.status == 1 && res.data.list.length>0){
            let data = res.data.list;
            data.forEach((item) => {
                html += "<div class='mar_28 other_pinglun'>"
                            +"<h4 class='font-bold'>「<span>"+item.title+"</span>」</h4>"
                            +"<p class='font-normal'>"+item.content+"</p>"
                        +"</div>";
            });
            $(html).appendTo($("#other_conts"));
        }
    });

    /*加关注*/

    $("#guanzhu").click(() => {
        dingeTools.focus({
            token: Cookie.get("dinge"),
            id: "1111"
        })
        .then(() => {
            $("#guanzhu").text("已关注");
        });
    });
});


