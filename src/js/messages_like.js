const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Swiper = require("Swiper");

$(() => {
    function MessagesLike(){
        this.page = 0;
    }
    MessagesLike.prototype = {
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
            return dingeTools.commentLikeMe({
                token: Cookie.get("dinge"),
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
                                    +"<div class='like'><em>"+item.commentFrom.nickname+"</em>"+"喜欢了你的「<span>"+item.content+"</span>」</div>"
                                +"</div>"
                            +"</div>";
                });
                $(html).appendTo($(".swiper-wrapper"));
            }
        },
        initSwiper(result){
            if(result.status == 1){
                // 初始化swiper
                new Swiper(".swiper-container",{
                    slidesPerView:"auto",
                    mode:"vertical",
                    watchActiveIndex: true
                });
            }
        }
    };
    var messagelike = new MessagesLike();
    messagelike.init();
});