/**
 * Created by xiusiteng on 2016-08-12.
 * @desc 我收藏的列表
 */
const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Swiper = require("Swiper");

(($) => {
    function MyCollet(opt){
        this.holdPosition = 0;
        this.page = 1;
        this.mySwiper = "";
        this.ele = $("#"+opt.id);
        this.init();
    }
    MyCollet.prototype = {
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
            // 关闭删除按钮
            dingeTools.cancelDelete(this.ele);
            // 删除silder
            this.deleteSilder();
            // 向上返回
            dingeTools.goBack();
        },
        getTemplate(item){
            return "<div class='info_mini'>"
                        +"<div class='info_slide'>"
                            +"<div class='mycollet_author font-normal'><a href='javascript:;'>"+item.commentFrom.nickname+"<span>"+dingeTools.format(item.createdAt,"yy-MM-dd")+"</span></a></div>"
                            +"<div class='mycollet_title'><a href='javascript:;'>「"+item.title+"」</a></div>"
                            +"<div class='mycollet_content font-normal'>"+item.content+"</div>"
                        +"</div>"
                        +"<div class='del_info_btn' data-id='"+item._id+"'></div>"
                        +"<div class='del_info_mask'></div>"
                    +"</div>";
        },
        deleteSilder(){
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
            return dingeTools.uncollet(data);
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
            return dingeTools.getMyCollet({
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
            let { holdPosition, page, fetchData } = this;
            const self = this;
            if(result.status == 1 && page == 1){
                // 初始化swiper
                this.mySwiper = new Swiper(".swiper-container",{
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
                            const containerHeight = self.mySwiper.height;
                            if(swiperHeight > containerHeight){
                                var transition = "-"+(swiperHeight-containerHeight+100);
                                self.mySwiper.setWrapperTranslate(0,transition,0);
                            }
                            self.mySwiper.params.onlyExternal=true;
                            //Show loader
                            $(".preloader").addClass("visible_bottom");
                            //加载新的slide
                            fetchData(page)
                            .then((result) => {
                                if(result.status == 1 &&  result.data.list.length>0){
                                    let data = result.data.list;
                                    data.forEach((item) => {
                                        const template = self.getTemplate(item);
                                        self.mySwiper.appendSlide(template);
                                    });
                                    self.mySwiper.params.onlyExternal=false;
                                    //Update active slide
                                    self.mySwiper.updateActiveSlide(0);
                                    //Hide loader
                                    $(".preloader").removeClass("visible_bottom");
                                    page++;
                                }
                            });
                        }
                    }
                });
                page++;
            } 
        }
    };
    new MyCollet({id:"mycollet"});
})($);
