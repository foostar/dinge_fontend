/**
 * Created by xiusiteng on 2016-08-12.
 * @desc 私信详细列表
 */
const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Swiper = require("Swiper");
(($) => {
    function MessageList(opt){
        this.holdPosition = 0;
        this.page = 1;
        this.mySwiper = "";
        this.ele = $("#"+opt.id);
        this.init();
    }
    MessageList.prototype={
        init(){
            dingeTools.init(); 
            this.bindEvent();
            this.render();
        },
        bindEvent(){
            var self = this;
            // 初试化touchmove，解决tap中 swipe不生效的问题
            dingeTools.initTouchMove();
            // 左滑出现删除按钮
            dingeTools.showDelete(self.ele);
            // 关闭删除按钮
            dingeTools.cancelDelete(self.ele);
            // 删除silder
            self.deleteFocus();
            // 向上返回
            dingeTools.goBack();
        },
        getTemplate(item){
            return "<div class='info_mini'>"
                        +"<div class='info_slide'>"
                            +"<div class='message_carouse'><a href='/views/message.html?mId="+item.typeId+"'><img src='"+item.avatar+"'/></a></div>"
                            +"<div class='message_list'>"
                                +"<div class='message_nickname'><a href='/views/message.html?mId="+item.typeId+"&name="+encodeURI(encodeURI(item.username))+"'>"+item.username+"</a></div>"
                                +"<div class='message_date'>"+dingeTools.format(item.createdAt,"MM-dd")+"</div>"
                                +"<div class='message_talk'>"+item.content+"</div>"
                            +"</div>"
                        +"</div>"
                        +"<div class='del_info_btn' data-id='"+item.typeId+"'></div>"
                        +"<div class='del_info_mask'></div>"
                    +"</div>";
        },
        deleteFocus(){
            // 删除slider
            var self = this;
            $(".swiper-container").on("tap",".del_info_btn",function(event){
                var typeId = $(this).attr("data-id");
                $(this).parent().parent().remove();
                dingeTools.deleteMesList({
                    token:Cookie.get("dinge"),
                    page:self.page,
                    id:typeId
                })
                .then(function(result){
                    if(result.status == 1 && result.data){
                        var item = result.data;
                        var template = self.getTemplate(item);
                        self.mySwiper.params.onlyExternal=true;
                        self.mySwiper.appendSlide(template);
                        self.mySwiper.params.onlyExternal=false;
                        //Update active slide
                        self.mySwiper.updateActiveSlide(0);
                    }   
                });
                event.stopPropagation();
            });
        },
        render(){
            this.showList();
        },
        loadMessageList(page){
            return  dingeTools.messageList({
                token:Cookie.get("dinge"),
                page:page
            });
        },
        showList(){
            var self = this;
            // 加载数据
            self.loadMessageList(self.page)
            .then(function(result){
                // 拼凑数据
                self.makeData(result);
                // 初始化swiper
                self.initSwiper(result);
            });
        },
        makeData(result){
            var self = this;
            var html = "";
            if(result.status == 1 &&  result.data.list.length>0) {
                var data = result.data.list;
                data.forEach(function(item){
                    html += "<div class='swiper-slide'>"+self.getTemplate(item)+"</div>";
                });
                $(html).appendTo($(".swiper-wrapper"));
            }
        },
        initSwiper(result){
            var self = this;
            if(result.status == 1 && self.page == 1){
                // 初始化swiper
                self.mySwiper = new Swiper(".swiper-container",{
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
                        if (self.holdPosition>100) {
                            var swiperHeight = $(".swiper-wrapper").height();
                            var containerHeight = self.mySwiper.height;
                            if(swiperHeight > containerHeight){
                                var transition = "-"+(swiperHeight-containerHeight+100);
                                self.mySwiper.setWrapperTranslate(0,transition,0);
                            }
                            // Hold Swiper in required position
                            //mySwiper.setWrapperTranslate(0,100,0);

                            //Dissalow futher interactions
                            self.mySwiper.params.onlyExternal=true;

                            //Show loader
                            $(".preloader").addClass("visible_bottom");

                            //加载新的slide
                            self.page++;
                            self.loadMessageList(self.page)
                            .done(function(result){
                                if(result.status == 1 && result.data.list.length>0){
                                    var data = result.data.list;
                                    data.forEach(function(item){
                                        var template = self.getTemplate(item);
                                        self.mySwiper.appendSlide(template);
                                    });
                                    self.mySwiper.params.onlyExternal=false;
                                    //Update active slide
                                    self.mySwiper.updateActiveSlide(0);
                                    //Hide loader
                                    $(".preloader").removeClass("visible_bottom");
                                }
                            });
                        }
                    }
                });
                
            }    
        }
    };

    new MessageList({id:"messagelist"});
})($);
