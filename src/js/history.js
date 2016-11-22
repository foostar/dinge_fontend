/**
 * Created by xiusiteng on 2016-08-12.
 * @desc 历史记录
 */
const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Swiper = require("Swiper");

$(() => {
    function History(){

    }
    History.prototype = {
        init(){
            dingeTools.init();
            this.bindEvent();
            this.render();
        },
        bindEvent(){
            // 向上返回
            dingeTools.goBack();
        },
        render(){
            this.showList();
        },
        showList(){
            // 加载数据
            this.loadHistoryList()
            .then((result) => {
                // 拼凑数据
                this.makeData(result);
                // 初始化swiper
                this.initSwiper(result);
            });
        },
        loadHistoryList(){
            return dingeTools.historyList({
                token: Cookie.get("dinge")
            });
        },
        makeData(result){
            var html = "";
            if(result.status == 1 && result.data.list.length>0){ 
                var data = result.data.list;
                data.forEach((item) => {
                    html += "<div class='swiper-wrapper'>"
                                +"<div class='swiper-slide'>"
                                    +"<div class='info_large'>"
                                        +"<a href='javascript:;'>"
                                            +"<div class='history_title'>「"+item.title+"」</div>"
                                            +"<div class='history_date font-normal'>"+dingeTools.fromNow(item.createdAt)+"</div>"
                                        +"</a>"
                                    +"</div>"
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
    var history = new History();
    history.init();
});