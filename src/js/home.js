import $ from "Zepto";
import Swiper from "Swiper";
import { api } from "dingeTools";
import Scrolladdcomponents from "./components/scrolladdcomponents";
import { fromNow } from "utils";

class Home extends Scrolladdcomponents {
    constructor(opt) {
        super(opt);
    }
    render() {
        this.loadingBanner();
        this.getTemplate();
    }
    loadingBanner() {
        //轮播图部分
        return new Promise((resolve, reject) => {
            api.banner({})
            .then((result) => {
                var html = "";
                if(result.status == 1 && result.data.length>0){
                    var data = result.data;
                    data.forEach((item) => {
                        html += "<div class='swiper-slide'><a class='pic' href='javascript://'><img src="+item.content+" alt=''/></a></div>";
                    });
                    $(html).appendTo($(".swiper-wrapper"));
                    new Swiper(".swiper-container",{
                        direction:"horizontal",//横向滑动
                        loop:true,//形成环路（即：可以从最后一张图跳转到第一张图
                        pagination:".swiper-pagination",//分页器
                        prevButton:".swiper-button-prev",//前进按钮
                        nextButton:".swiper-button-next",//后退按钮
                        autoplay:3000//每隔3秒自动播放

                    });
                    resolve();
                }
            }, (err) => {
                reject(err);
            });
        });
    }
    nextPage() {
        this.page++;
        return api.comments({
            page: this.page,
            pageSize: this.pageSize,
            rights: 90
        });
    }
    getTemplate() {
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
                                +"<img class='home_comment_img flex-normal' src='"+item.movie.images.large+"' alt=''>"
                                +"<div class='home_comment flex-normal'>"
                                    +"<div class='home_comment_author font-normal'>"
                                        +"<em>"+fromNow(item.createdAt)+"</em>"
                                        +"<a href='other_means.html'><span style='background-image:url(../.."+item.commentFrom.avatar+");'>"+item.commentFrom.nickname+"</span></a>"
                                    +"</div>"
                                    +"<div class='home_comment_title'>"+item.content+"</div>"
                                    +"<div class='flex-container home_comment_meta font-normal'>"
                                        +"<div class='flex-normal'>阅读<span>"+item.reading+"</span></div>"
                                        +"<div class='flex-normal'>评论<span>"+item.reply.length+"</span></div>"
                                        +"<div class='flex-normal'>喜欢<span>"+item.star.length+"</span></div>"
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
    }
}
const home = new Home({
    id: "home"
});
home.init();
