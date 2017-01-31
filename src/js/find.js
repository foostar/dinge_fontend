const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Scrolladdcomponents = require("./components/scrolladdcomponents");

$(() => {
    function Find(opt){ 
        Scrolladdcomponents.call(this, opt);
        this.page = 1;
        this.holdPosition = 0;
        this.mySwiper = "";
    }
    Find.prototype = Object.create(Scrolladdcomponents.prototype);
    Find.constructor = Find;
    Find.prototype.render = function(){
        this.showData();
        this.skipEvent();
    };
    Find.prototype.getTemplate = function (item) {
        return "<div class='search_item'><a href='moviedetails.html?id="+item._id+"'><img src="+item.images.large+" alt=''><span class='font-h'>"+item.title+"</span></a></div>";
    };
    Find.prototype.fetchData = function () {
        return dingeTools.movie({
            page: this.page
        });
    };
    Find.prototype.makeData = function(result) {
        const { getTemplate } = this;
        let html = "";
        if(result.status == 1 &&  result.data.list.length>0) {
            let data = result.data.list;
            data.forEach((item) => {
                html += "<div class='swiper-slide'>"+getTemplate(item)+"</div>";
            });
            $(html).appendTo($(".swiper-wrapper"));
        }
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