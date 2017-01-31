const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Scrolladdcomponents = require("./components/scrolladdcomponents");

$(() => {
    function Find(opt){ 
        Scrolladdcomponents.call(this, opt);
        this.holdPosition = 0;
        this.mySwiper = "";
    }
    Find.prototype = Object.create(Scrolladdcomponents.prototype);
    Find.constructor = Find;
    Find.prototype.render = function(){
        this.skipEvent();
        this.getTemplate();
    };
    Find.prototype.nextPage = function() {
        this.page++;
        return dingeTools.movie({
            page: this.page
        });
    };
    Find.prototype.getTemplate = function () {
        return new Promise((resolve, reject) => {
            this.nextPage()
            .then((result) => {
                let html = "";
                if(result.status == 1 &&  result.data.list.length>0) {
                    let data = result.data.list;
                    data.forEach((item) => {
                        html += "<div class='swiper-slide'><div class='search_item'><a href='moviedetails.html?id="+item._id+"'><img src="+item.images.large+" alt=''><span class='font-h'>"+item.title+"</span></a></div></div>";
                    });
                }
                $(html).appendTo($(".swiper-wrapper"));
                resolve();
            }, (err) => {
                reject(err);
            });
        });
        
    };
    Find.prototype.skipEvent = function () {
        $("#search").on("touchend", function() {
            let searchValue = $(".search_item").eq(0).find("span").html() || "";
            window.location.href = `search.html?name=${encodeURIComponent(searchValue)}`;
        });
    };
    const search = new Find({
        id: "find_scroll",
        hasDel: false
    });
    search.init();
});