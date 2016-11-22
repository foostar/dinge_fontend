const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Swiper = require("Swiper");

$(() => {
    function MessagesFans(){
        this.page = 0;
    }
    MessagesFans.prototype = {
        init(){
            dingeTools.init();
            this.bindEvent();
            this.render();
        },
        bindEvent(){
            // 向上返回
            $(".goback").on("touchend", () => {
                window.history.back();
            });
        },
        render(){
            this.showList();
        },
        showList(){
            // 加载数据
            this.loadCommentList()
            .then((result) => {
                // 拼凑数据
                this.makeData(result);
                // 初始化swiper
                this.initSwiper(result);
            });
        },
        loadCommentList(){
            let { page } = this;
            page++;
            return dingeTools.userLikeMe({
                token:Cookie.get("dinge"),
                page: page
            });
        },
        makeData(result){
            let html = "";
            if(result.status == 1 && result.data.list.length>0){ 
                let data = result.data.list;
                data.forEach((item) => {
                    html += "<div class='swiper-wrapper'>"
                                +"<div class='swiper-slide'>"
                                    +"<div class='fans'><span>"+item.commentFrom.nickname+"</span>成为了你的粉丝</div>"
                                +"</div>"
                            +"</div>";
                });
                $(html).appendTo($(".swiper-wrapper"));
            }
        },
        initSwiper(result){
            if(result.status == 1 && this.page == 1){
                // 初始化swiper
                new Swiper(".swiper-container",{
                    slidesPerView:"auto",
                    mode:"vertical",
                    watchActiveIndex: true
                });
            }
        }
    };
    var messagefans = new MessagesFans();
    messagefans.init();
});