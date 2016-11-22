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
        this.page = 0;
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
            dingeTools.showDelete(self.ele);
            // 关闭删除按钮
            dingeTools.cancelDelete(self.ele);
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
            let { deleteAction, page, mySwiper, getTemplate } = this;
            // 删除slider
            this.ele.on("touchend",".del_info_btn", (event) => {
                var userId = $(this).attr("data-id");
                $(this).parent().parent().remove();
                deleteAction({
                    token:Cookie.get("dinge"),
                    page:page,
                    userId:userId
                })
                .done((result) => {
                    if(result.status == 1 && result.data){
                        const item = result.data;
                        const template = getTemplate(item);
                        mySwiper.params.onlyExternal=true;
                        mySwiper.appendSlide(template);
                        mySwiper.params.onlyExternal=false;
                        //Update active slide
                        mySwiper.updateActiveSlide(0);
                    }   
                });
                event.stopPropagation();
            });
        },
        deleteAction(data){
            return $.ajax({
                url:"../data/unfocus.json",
                method:"GET",
                data:data,
                dataType:"json"
            });
        },
        render(){
            this.showList(); 
        },
        showList(){
            // 加载数据
            this.loadColletList(this.page)
            .done((result) => {
                // 拼凑数据
                this.makeData(result);
                // 初始化swiper
                this.initSwiper(result);
            });
        },
        loadColletList(page){
            return  $.ajax({
                url:"../data/getMyCollet.json",
                method:"GET",
                data:{
                    token:Cookie.get("dinge"),
                    page:page
                },
                dataType:"json"
            });
        },
        makeData(result){
            const { getTemplate } = this;
            let html = "";
            if(result.status == 1 &&  result.data.length>0) {
                let data = result.data;
                data.forEach((item) => {
                    html += "<div class='swiper-slide'>"+getTemplate(item)+"</div>";
                });
                $(html).appendTo($(".swiper-wrapper"));
            }
        },
        initSwiper(result){
            let { mySwiper, holdPosition, page, loadColletList } = this;
            if(result.status == 1 && page == 0){
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
                            const containerHeight = self.mySwiper.height;
                            if(swiperHeight > containerHeight){
                                var transition = "-"+(swiperHeight-containerHeight+100);
                                mySwiper.setWrapperTranslate(0,transition,0);
                            }
                            mySwiper.params.onlyExternal=true;
                            //Show loader
                            $(".preloader").addClass("visible_bottom");
                            //加载新的slide
                            loadColletList(page)
                            .done((result) => {
                                if(result.status == 1 &&  result.data.length>0){
                                    let data = result.data;
                                    data.forEach((item) => {
                                        const template = self.getTemplate(item);
                                        self.mySwiper.appendSlide(template);
                                    });
                                    mySwiper.params.onlyExternal=false;
                                    //Update active slide
                                    mySwiper.updateActiveSlide(0);
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
