const $ = require("Zepto");
const Swiper = require("Swiper");
const dingeTools = require("dingeTools");
const Scrolladdcomponents = require("./components/scrolladdcomponents");
$(() => {
    function Home(opt){
        Scrolladdcomponents.call(this,opt);
        // this.page = 0;
        // this.pageSize = 20;
        // this.init();
    }
    Home.prototype = Object.create(Scrolladdcomponents.prototype);
    Home.prototype.constructor = Home;
    //渲染页面
    Home.prototype.render = function(){
        this.loadingImg();
        Promise.all([ this.loadingBanner(),this.getTemplate() ])
        .then(() => {
            $("#loading").hide();
        });
    };
    Home.prototype.loadingBanner = function(){
        //轮播图部分
        return new Promise((resolve, reject) => {
            dingeTools.banner({}, -1)
            .then((result) => {
                var html = "";
                if(result.status == 1 && result.data.list.length>0){
                    var data = result.data.list;
                    data.forEach((item) => {
                        html += "<div class='swiper-slide'><a class='pic' href='javascript://'><img src="+item.url+" alt=''/></a></div>";
                    });
                    $(html).appendTo($(".swiper-wrapper"));
                }
                if(result.status == 1){
                    new Swiper(".swiper-container",{
                        direction:"horizontal",//横向滑动
                        loop:true,//形成环路（即：可以从最后一张图跳转到第一张图
                        pagination:".swiper-pagination",//分页器
                        prevButton:".swiper-button-prev",//前进按钮
                        nextButton:".swiper-button-next",//后退按钮
                        autoplay:3000//每隔3秒自动播放

                    });
                }
                resolve();
            }, (err) => {
                reject(err);
            });
        });
    };
    Home.prototype.nextPage = function() {
        this.page++;
        return dingeTools.comments({
            page: this.page,
            pageSize: this.pageSize
        }, 0);
    };
    Home.prototype.getTemplate = function(){
        return new Promise((resolve, reject) => {
            this.nextPage()
            .then((res) => {
                var data = res.data.list;
                var html = "";
                data.length > 0 && data.forEach((item,index) => {
                    html += "<div class='home_comment_block flex-container";
                    if(index%2){
                        html+=" home_comment_right";
                    }
                    html +=  "'>"
                                +"<img class='home_comment_img flex-normal' src='"+item.movie.images.small+"' alt=''>"
                                +"<div class='home_comment flex-normal'>"
                                    +"<div class='home_comment_author font-normal'>"
                                        +"<em>"+dingeTools.fromNow(item.createdAt)+"</em>"
                                        +"<a href='other_means.html'><span style='background-image:url(../.."+item.commentFrom.avatar+");'>"+item.commentFrom.nickname+"</span></a>"
                                    +"</div>"
                                    +"<div class='home_comment_title'>"+item.content+"</div>"
                                    +"<div class='flex-container home_comment_meta font-normal'>"
                                        +"<div class='flex-normal'>阅读<span>"+item.reading+"</span></div>"
                                        +"<div class='flex-normal'>评论<span>"+item.rank+"</span></div>"
                                        +"<div class='flex-normal'>喜欢<span>"+item.weight+"</span></div>"
                                    +"</div>"
                                +"</div>"
                            +"</div>";
                });
                $(html).appendTo($("#loadingComent"));
                resolve();
            }, (err) => {
                reject(err);
            });
        });
    };
    const home = new Home();
    home.init();
});
