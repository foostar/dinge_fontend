const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Swiper = require("Swiper");

(($) => {
    function MessagesComment(opt){
        this.holdPosition = 0;
        this.page = 1;
        this.mySwiper = "";
        this.ele = $("#"+opt.id);
        this.init();
    }
    MessagesComment.prototype={
        init(){
            dingeTools.init(); 
            this.bindEvent();
            this.render();
        },
        getTemplate(item){
            return "<div class='info_large'>"
                        +"<div class='info_slide'>"
                            +"<div class='mescomment_carouse'>"
                                +"<a href='javascript:;'>"
                                    +"<img src='"+item.commentFrom.avatar+"' alt=''>"
                                    +"<em class='font-normal'>"+item.commentFrom.nickname+"</em>"
                                +"</a>"
                            +"</div>"
                            +"<div class='mescomment_comment'>"
                                +"<a href='javascript:;'>"
                                    +"<p class='font-bold'>"+item.content+"</p>"
                                    +"<h4 class='font-normal'>——「<span>"+item.commentId.title+"</span>」</h4>"
                                +"</a>"
                            +"</div>"
                        +"</div>"
                        +"<div class='del_info_btn' data-id='"+item._id+"'></div>"
                        +"<div class='del_info_mask'></div>"
                    +"</div>";
        },
        bindEvent(){
            // 初试化touchmove，解决tap中 swipe不生效的问题
            dingeTools.initTouchMove();
            // 左滑出现删除按钮
            dingeTools.showDelete(this.ele);
            // 关闭删除按钮
            dingeTools.cancelDelete(this.ele);
            // 向上返回
            dingeTools.goBack();
        },
        render(){
            // 展示数据
            this.showList();
        },
        showList(){
            let { page } = this;
            // 加载数据
            this.loadMessageComment({
                token: Cookie.get("dinge"),
                page: page
            })
            .then((result) => {
                // 拼凑数据
                this.makeData(result);
                // 初始化swiper
                this.initSwiper(result);
            });
        },
        loadMessageComment(data){
            return  dingeTools.commentToMe(data);
        },
        makeData(result){
            let html = "";
            if(result.status == 1 &&  result.data.list.length>0) {
                let data = result.data.list;
                data.forEach((item) => {
                    html += "<div class='swiper-slide'>"+this.getTemplate(item)+"</div>";
                });
                $(html).appendTo($(".swiper-wrapper"));
            }
        },
        initSwiper(result){
            let { mySwiper, holdPosition, page, loadMessageComment, getTemplate } = this;
            if(result.status == 1 && page == 1){
                // 初始化swiper
                mySwiper = new Swiper(".swiper-container",{
                    slidesPerView:"auto",
                    mode:"vertical",
                    watchActiveIndex: true,
                    onTouchStart() {
                        holdPosition = 0;
                    },
                    onTouchMove(){
                        dingeTools.cancelBtn();
                    },
                    onResistanceAfter(s, pos){
                        holdPosition = pos;
                    },
                    onTouchEnd(){
                        if (holdPosition>100) {
                            const swiperHeight = $(".swiper-wrapper").height();
                            const containerHeight = mySwiper.height;
                            if(swiperHeight > containerHeight){
                                let transition = "-"+(swiperHeight-containerHeight+100);
                                mySwiper.setWrapperTranslate(0,transition,0);
                            }
                            mySwiper.params.onlyExternal=true;
                            //Show loader
                            $(".preloader").addClass("visible_bottom");
                            //加载新的slide
                            loadMessageComment({
                                token:Cookie.get("dinge"),
                                page:page
                            })
                            .then((result) => {
                                if(result.status == 1 &&  result.data.list.length>0){
                                    let data = result.data.list;
                                    data.forEach((item) => {
                                        const template = getTemplate(item);
                                        mySwiper.appendSlide(template);
                                    });
                                    mySwiper.params.onlyExternal=false;
                                    //Update active slide
                                    mySwiper.updateActiveSlide(0);
                                    //Hide loader
                                    $(".preloader").removeClass("visible_bottom");
                                }
                                page++;
                            });
                        }
                    }
                });
                page++;
            } 
        }
    };
    new MessagesComment({id:"commentToMe"});
})($);
