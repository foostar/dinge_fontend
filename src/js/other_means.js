const $ = require("Zepto");
const dingeTools = require("dingeTools");

$(() => {
    dingeTools.init();
    $(".goback").on("touchend", () => {
        window.history.back();
    });
    /*$("#goback_user").click(function(){
        history.back();
    });*/
    $.ajax({
        url:"../data/getUserInfo.json",
        method:"GET",
        data:{
            token:"xxx"
        },
        dataType:"json",
        success:(res) => {
            var data = res.data;
            //console.log(data);
            $("#other_src img").attr("src",data.avatar);
            $("#other_name").text(data.nickname);
            $("#other_cont").text(data.sign);
        },
        error:(e) => {
            console.log(e);
        }
    });

    $.ajax({
        url:"../data/getMyConmment.json",
        method:"GET",
        dataType:"json"
    }).done((res) => {
        //console.log(res.data[ 0 ]);
        let html="";
        if(res.status == 1&&res.data.length>0){
            let data = res.data;
            /*for(var i=0;i<data.length;i++){
                html += "<div class='mar_28 other_pinglun'>"
                            +"<h4>「<span>"+data[ i ].title+"</span>」</h4>"
                            +"<p>"+data[ i ].content+"</p>"
                        +"</div>";
            }
            $(html).appendTo($("#other_conts"));*/
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
    /*$("#guanzhu").click(function(){
        if($("#guanzhu").text("+关注")){
            $.ajax({
                url:"../data/focusUser.json",
                method:"GET",
                dataType:"json"           
            }).done(function(res){
                console.log(res.msg);
                $("#guanzhu").text(res.msg);
            });  
        }else if($("#guanzhu").text("已关注")){
            $("#guanzhu").text("取消关注");
        }else if($("#guanzhu").text("取消关注")){
            $("#guanzhu").text("+关注");
        }
    });*/
    $("#guanzhu").click(() => {
        $.ajax({
            url:"../data/focusUser.json",
            method:"GET",
            dataType:"json"           
        }).done((res) => {
            //console.log(res.msg);
            $("#guanzhu").text(res.msg);
        });  
    });
});


