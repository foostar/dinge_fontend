/**
 * Created by xiusiteng on 2016-08-12.
 * @desc 私信详细列表
 */
const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Swiper = require("Swiper");
(($) => {
    function Message(){
        this.holdPosition = 0;
        this.page = 1;
        this.mySwiper = "";
        this.init();
    }
    Message.prototype = {
        init(){
            dingeTools.init(); 
            this.bindEvent();
            this.render();
        },
        bindEvent(){
            // 发送私信
            this.sendMessage();
            // 向上返回
            this.goBack();
            // 刷新拉取新的聊天信息
            this.getRefresh();
        },
        goBack() {
            $(".goback").on("touchend", () => {
                const typeId = dingeTools.getQueryString("mId");
                const messageData = JSON.parse(dingeTools.getStorage(typeId));
                let messageList = JSON.parse(dingeTools.getStorage("messageList")) || {};
                const lastData = messageData.list[ messageData.list.length - 1 ];
                messageList.list && messageList.list.forEach((v) => {
                    if(v.typeId == typeId && messageData.list.length > 0 && lastData.createdAt != v.createdAt) {
                        v.content = lastData.content;
                        v.createdAt = lastData.createdAt;
                    }
                });
                dingeTools.setStorage("messageList", JSON.stringify(messageList));
                window.history.back();
            });
        },
        getRefresh(){
            $(".chat-refresh").on("touchend", () => {
                this.showList();
            });
        },
        sendMessage(){
            const { mySwiper } = this;
            $("#sendMessage").submit((event) => {
                const messageInput = $.trim($("#message_input").val());
                event.preventDefault();
                if(messageInput){
                    const toId = $(".triangle-left").attr("data-to");
                    this.sendPost({
                        token:Cookie.get("dinge"),
                        to:toId,
                        content:messageInput,
                        typeId:dingeTools.getQueryString("mId")
                    })
                    .done((result) => {
                        if(result.status == 1){
                            mySwiper.appendSlide(
                                "<div class='swiper-slide swiper-from'>"
                                    +"<div class='dialog_carouse'><img src='"+result.data.avatar+"'/></div>"
                                    +"<div class='triangle-right'></div>"
                                    +"<div class='dialog_content'>"+messageInput+"</div>"
                                +"</div>"
                            );
                            const swiperHeight = $(".swiper-wrapper").height();
                            const containerHeight = this.mySwiper.height;
                            if(swiperHeight > containerHeight){
                                let transition = "-"+(swiperHeight-containerHeight);
                                mySwiper.setWrapperTranslate(0,transition,0);
                            }
                            mySwiper.params.onlyExternal=false;
                            dingeTools.resetForm({
                                formId:"sendMessage"
                            });
                        }
                    });
                }  
            });
        },
        sendPost(data){
            return dingeTools.sendMessage(data);
        },
        render(){
            $(".mes_to").html(decodeURI(decodeURI(dingeTools.getQueryString("name"))));
            // 展示数据
            this.showList();
        },
        showList(){
            // 加载数据
            this.loadMessage(this.page)
            .then((result) => {
                // 拼凑数据
                this.makeData(result);
                // 初始化swiper
                this.initSwiper(result);
            });
        },
        loadMessage(page){
            // 加载详细信息
            return  dingeTools.dialogue({
                token:Cookie.get("dinge"),
                page:page,
                typeId:dingeTools.getQueryString("mId")
            });
        },
        makeData(result){
            if(result.status == 1 && result.data.list.length>0){
                $(".swiper-wrapper").html("");
                let html = "";
                let data = result.data.list;
                data.forEach((item) => {
                    let frome = "";
                    let direction = "left";
                    if(item.from._id == Cookie.get("dinge")){
                        frome = "swiper-from";
                        direction = "right";
                    }
                    html += "<div class='swiper-slide'>"
                                +"<div class='swiper-slide-warpper "+frome+"'>"
                                    +"<div class='dialog_carouse'><img src='"+item.from.avatar+"'/></div>"
                                    +"<div data-to='"+item.to._id+"' class='triangle-"+direction+"'></div>"
                                    +"<div class='dialog_content'>"+item.content+"</div>"
                                +"</div>"
                            +"</div>";
                });
                $(".swiper-wrapper").prepend($(html));
            }
        },
        initSwiper(result){
            let { mySwiper, holdPosition, page, loadMessage } = this;
            if(result.status == 1 && this.page == 1){
                // 初始化swiper
                mySwiper = new Swiper(".swiper-container",{
                    slidesPerView:"auto",
                    mode:"vertical",
                    watchActiveIndex: true,
                    onFirstInit(swiper){
                        var swiperHeight = $(".swiper-wrapper").height();
                        var containerHeight = swiper.height;
                        if(swiperHeight > containerHeight){
                            var transition = "-"+(swiperHeight-containerHeight);
                            swiper.setWrapperTranslate(0,transition,0);
                        }
                    },
                    onTouchStart() {
                        holdPosition = 0;
                    },
                    onResistanceBefore(s, pos){
                        holdPosition = pos;
                    },
                    onTouchEnd(){
                        if (holdPosition>100) {
                            // Hold Swiper in required position
                            mySwiper.setWrapperTranslate(0,100,0);

                            //Dissalow futher interactions
                            mySwiper.params.onlyExternal=true;

                            //Show loader
                            $(".preloader").addClass("visible");

                            //加载新的slide
                            loadMessage(page)
                            .done((result) => {
                                if(result.status == 1 && result.data.list.length>0){
                                    const data = result.data.list;
                                    data.forEach(function(item){
                                        let frome = "",direction = "left";
                                        if(item.from._id == Cookie.get("dinge")){
                                            frome = "swiper-from";
                                            direction = "right";
                                        }
                                        mySwiper.prependSlide(
                                            "<div class='swiper-slide-warpper "+frome+"'>"
                                                +"<div class='dialog_carouse'><img src='"+item.from.avatar+"'/></div>"
                                                +"<div class='triangle-"+direction+"'></div>"
                                                +"<div class='dialog_content'>"+item.content+"</div>"
                                            +"</div>");
                                    });
                                    //Release interactions and set wrapper
                                    mySwiper.setWrapperTranslate(0,0,0);
                                    mySwiper.params.onlyExternal=false;

                                    //Update active slide
                                    mySwiper.updateActiveSlide(0);

                                    //Hide loader
                                    $(".preloader").removeClass("visible");
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
    new Message();
})($);

    