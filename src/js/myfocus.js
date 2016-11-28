const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Swiper = require("Swiper");

(($) => {
    function MyFocus(opt){
        this.holdPosition = 0;
        this.page = 1;
        this.mySwiper = "";
        this.ele = $("#"+opt.id);
        this.init();
    }
    MyFocus.prototype = {
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
            // 删除slider
            this.deleteSlider();
            // 向上返回
            dingeTools.goBack();

        },
        getTemplate(item){
            return "<div class='info_normal'>"
                        +"<div class='info_slide'>"
                            +"<div class='myfocus_carouse'>"
                                +"<a href='javascript:;'>"
                                    +"<img src='"+item.avatar+"'>"
                                +"</a>"
                            +"</div>"
                            +"<div class='myfocus_content'>"
                                +"<a href='javascript:;'>"
                                    +"<div class='myfocus_nickname'>"+item.nickname+"</div>"
                                    +"<div class='myfocus_notice font-normal'>"+item.sign+"</div>"
                                +"</a>"
                            +"</div>"
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
            return dingeTools.delMyFocus(data);
        },
        render(){
            this.showList();
        },
        fetchData(page){
            return  dingeTools.myFocusList({
                token:Cookie.get("dinge"),
                page:page
            });
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
    new MyFocus({id:"myfocus"});
})($);
