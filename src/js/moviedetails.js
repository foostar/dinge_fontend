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
            // 向上返回
            dingeTools.goBack();
            //self.goHref();
            this.moviedetailsTop(); //电影详情页上面部分
        },
        getTemplate(item){
            //debugger
            return  "<a href='moviedetails_comment.html?id="+item._id+"'>"
                        +"<div class='info_mini'>"
                            +"<div class='info_slide'>"
                                +"<div class='mycollet_author font-normal'>"
                                    +"<div class='m_detail_left'>"  
                                        +"<img src='"+item.commentFrom.avatar+"' alt=''><span>"+item.commentFrom.nickname+"</span>"
                                    +"</div>"
                                    +"<div class='m_detail_comment'>"+item.rank+"</div>"
                                +"</div>"
                                +"<div class='mycollet_title m_detail_title'>"+item.title+"</div>"
                                +"<div class='mycollet_content font-normal'>"+item.content+"</div>"
                            +"</div>"
                            +"<div class='del_info_btn' data-id='"+item._id+"'></div>"
                        +"</div>"
                    +"</a>";
        },
        render(){
            this.showList(); 
        },
        showList(){
            // 加载数据
            this.loadColletList(this.page)
            // 拼凑数据
            .then((result) => {
                this.makeData(result);
                this.initSwiper(result);
            });
        },
        loadColletList(page){
            console.log(page);
            // const id=  dingeTools.getURLParam("id");
            // return dingeTools.commentByMovie({
            //     token:Cookie.get("dinge"),
            //     page:page,
            //     id:id
            // });
        },
        moviedetailsTop(){   //TODO 加载头部部分
            //debugger
            const id=  dingeTools.getURLParam("id");
            dingeTools.movie({
                token:Cookie.get("dinge"),
                id:id
            })
            .then((result) => {
                //debugger
                let html = "";
                if(result.status == 1 && result.data.list.length>0){ 
                    let data = result.data.list;
                    data.forEach((item) => {
                        html += "<a href='moviedetails_top.html?id="+item._id+"'>"
                                    +"<div class='m_details_topimg'><img src="+item.images.large+" alt=''></div>"
                                    +"<div class='m_d_top_position'>"
                                        +"<div class='m_mask font-normal'><span class='font-title'>"+item.rating.average+"</span>评分</div>"
                                        +"<p class='font-bold'>"
                                            +"<span>"+item.title+"</span>"
                                            +"<span>"+item.aka[ 0 ].name+"</span>"
                                            +"<span>"+item.etitle+"</span>"
                                        +"</p>"
                                    +"</div>"
                                +"</a>";
                    });
                    $(html).appendTo($(".m_details_top"));
                }
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
            let { mySwiper, holdPosition, page, loadColletList, getTemplate } = this;
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
                                var transition = "-"+(swiperHeight-containerHeight+100);
                                mySwiper.setWrapperTranslate(0,transition,0);
                            }
                            mySwiper.params.onlyExternal=true;
                            //Show loader
                            $(".preloader").addClass("visible_bottom");
                            //加载新的slide
                            loadColletList(page)
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
