/**
 * Created by xiusiteng on 2016-08-12.
 * @desc 历史记录
 */
const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Swiper = require("Swiper");

(($) => {
    function MyComment(opt){
        this.ele = $("#"+opt.id);
        this.mySwiper = "";
        this.holdPosition = 0;
        this.page = 1;
        this.init();
    }
    MyComment.prototype = {
        init(){
            dingeTools.init();
            this.bindEvent();
            this.render();
        },
        bindEvent(){
            // 初试化touchmove，解决tap中 swipe不生效的问题
            dingeTools.initTouchMove();
            // 左滑出现删除按钮
            dingeTools.showDelete(this.ele);
            // 删除我的影评
            this.deleteSlider();
            // 关闭删除按钮
            dingeTools.cancelDelete(this.ele);
            // 向上返回
            dingeTools.goBack();
        },
        getTemplate(item){
            return "<div class='info_mini'>"
                        +"<div class='info_slide'>"
                            +"<a href='javascript:;'>"
                                +"<div class='mycomment_title font-h'>「"+item.content+"」</div>"
                                +"<ul class='mycomment_body font-normal'><li class='mycomment_heart'><img src='../images/comment_likeS.png' alt=''><span>"+item.star+"</span></li><li class='mycomment_say'><img src='../images/comment_commentS.png' alt=''><span>"+item.reading+"</span></li></ul>"
                            +"</a>"
                        +"</div>"
                        +"<div class='del_info_btn' data-id='"+item._id+"'></div>"
                        +"<div class='del_info_mask'></div>"
                    +"</div>";
        },
        deleteSlider(){
            // 删除slider
            this.ele.on("touchend",".del_info_btn", (event) => {
                var userId = $(this).attr("data-id");
                $(event.target).parent().parent().remove();
                this.deleteAction({
                    token:Cookie.get("dinge"),
                    page:this.page,
                    userId:userId
                })
                .then((result) => {
                    if(result.status == 1 && result.data){
                        const item = result.data;
                        const template = this.getTemplate(item);
                        this.mySwiper.params.onlyExternal=true;
                        this.mySwiper.appendSlide(template);
                        this.mySwiper.params.onlyExternal=false;
                        //Update active slide
                        this.mySwiper.updateActiveSlide(0);
                    }   
                });
                event.stopPropagation();
            });
        },
        deleteAction(data){
            return dingeTools.delMyConmments(data);
        },  
        render(){
            this.showList();
        },
        showList(){
            // 加载数据
            this.fetchData(this.page)
            .then((result) => {
                // 拼凑数据
                this.makeData(result);
                // 初始化swiper
                this.initSwiper(result);
            });
        },
        fetchData(page){
            return dingeTools.myConmments({
                token:Cookie.get("dinge"),
                page:page
            });
        },
        makeData(result){
            const { getTemplate } = this;
            let html = "";
            if(result.status == 1 &&  result.data.list.length>0) {
                let data = result.data.list;
                data.forEach((item) => {
                    html += "<div class='swiper-slide'>"+getTemplate(item)+"</div>";
                });
                $(html).appendTo($(".swiper-wrapper"));
            }
        },
        initSwiper(result){
            let { getTemplate, fetchData } = this;
            var self = this;
            if (result.status != 1 || this.page != 1) return;
            // 初始化swiper
            this.mySwiper = new Swiper(".swiper-container",{
                slidesPerView:"auto",
                mode:"vertical",
                watchActiveIndex: true,
                onTouchStart() {
                    self.holdPosition = 0;
                },
                onTouchMove(){
                    dingeTools.cancelBtn();
                },
                onResistanceAfter(s, pos){
                    self.holdPosition = pos;
                },
                onTouchEnd(){
                    if (self.holdPosition < 100) return;
                    if ((self.page-1) * 20 > result.data.totalNum) return;
                    // 准备加载新的slider
                    const swiperHeight = $(".swiper-wrapper").height();
                    const containerHeight = self.mySwiper.height;
                    if(swiperHeight > containerHeight){
                        let transition = "-"+(swiperHeight-containerHeight+100);
                        self.mySwiper.setWrapperTranslate(0,transition,0);
                    }
                    self.mySwiper.params.onlyExternal=true;
                    //Show loader
                    $(".preloader").addClass("visible_bottom");
                    // 加载新的slide
                    fetchData(self.page)
                    .then((result) => {
                        if(result.status == 1 && result.data.list.length>0){
                            var data = result.data.list;
                            data.forEach((item) => {
                                var template = getTemplate(item);
                                self.mySwiper.appendSlide(template);
                            });
                            self.mySwiper.params.onlyExternal=false;
                            //Update active slide
                            self.mySwiper.updateActiveSlide(0);
                            //Hide loader
                            $(".preloader").removeClass("visible_bottom");
                            self.page++;
                        }
                    });     
                }
            }); 
            this.page++;  
        }
    };
    new MyComment({id:"mycomment"});
})($);