const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Components = require("./components");
const Cookie = require("js-cookie");
const Swiper = require("Swiper");

function Listcomponents (opt) {
    Components.call(this, opt);
    this.hasNext = opt.hasNext || true;
    this.hasDel = opt.hasDel || true;
    this.hasBack = opt.hasBack || true;
    this.holdPosition = 0;
    this.page = 1;
    this.pageSize = opt.pageSize || 10;
    this.over = false;
    this.mySwiper = "";
    this.ele = $("#"+opt.id);
}
/*
 * @继承component
 */
Listcomponents.prototype = Object.create(Components.prototype);
/*
 * @绑定事件
 */
Listcomponents.prototype.bindEvent = function () {
    if (this.hasDel) {
        // 初试化touchmove，解决tap中 swipe不生效的问题
        dingeTools.initTouchMove();
        // 左滑出现删除按钮
        dingeTools.showDelete(this.ele);
        // 关闭删除按钮
        dingeTools.cancelDelete(this.ele);
        // 删除slider
        this.deleteSlider();
    }
    if (this.hasBack) {
        // 向上返回
        dingeTools.goBack();
    }
};
/*
 * @删除元素
 */
Listcomponents.prototype.deleteSlider = function () {
    // 删除slider
    this.ele.on("touchend",".del_info_btn", (event) => {
        var userId = $(this).attr("data-id");
        $(event.target).parent().parent().remove();
        this.deleteAction({
            token: Cookie.get("dinge"),
            page: this.page,
            id: userId
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
};
/*
 * @渲染元素
 */
Listcomponents.prototype.render = function () {
    this.showData();
};
/*
 * @展示数据
 */
Listcomponents.prototype.showData = function () {
    // 加载数据
    this.fetchData(this.page)
    .then((result) => {
        // 拼凑数据
        this.makeData(result);
        // 初始化swiper
        this.initSwiper(result);
    });
};
/*
 * @第一次拼接
 */
Listcomponents.prototype.makeData = function (result) {
    const { getTemplate } = this;
    let html = "";
    if(result.status == 1 &&  result.data.list.length>0) {
        let data = result.data.list;
        this.over = result.totalNum > (this.page * this.pageSize) ? false : true;
        data.forEach((item) => {
            html += "<div class='swiper-slide'>"+getTemplate(item)+"</div>";
        });
        $(html).appendTo($(".swiper-wrapper"));
    }
};
/*
 * @初始化swiper
 */
Listcomponents.prototype.initSwiper = function (result) {
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
            if (!self.hasNext) return;
            if (self.over) return;
            // 准备加载新的slider
            const swiperHeight = $(".swiper-wrapper").height();
            const containerHeight = self.mySwiper.height;
            if(swiperHeight > containerHeight){
                let transition = "-"+(swiperHeight-containerHeight+100);
                self.mySwiper.setWrapperTranslate(0,transition,0);
            }
            self.mySwiper.params.onlyExternal=true;
            // 加载新的slide
            fetchData(self.page)
            .then((result) => {
                if(result.status == 1 && result.data.list.length>0){
                    self.over = result.totalNum > (self.page * self.pageSize) ? false : true;
                    var data = result.data.list;
                    data.forEach((item) => {
                        var template = getTemplate(item);
                        self.mySwiper.appendSlide(template);
                    });
                    self.mySwiper.params.onlyExternal=false;
                    //Update active slide
                    self.mySwiper.updateActiveSlide(0);
                    self.page++;
                }
            });     
        }
    });
    this.page++;
};

Listcomponents.constructor = Listcomponents;

module.exports = Listcomponents;
