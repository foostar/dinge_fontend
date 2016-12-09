const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Components = require("./components/components");

$(() => {
    function Find(opt){ 
        Components.call(this, opt);
        this.page = 1;
    }
    Find.prototype = Object.create(Components.prototype);
    Find.constructor = Find;
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
    Find.prototype.bindEvent = function () {
        //点击搜索跳转搜索Ajax.load
        $("#search").submit((event) => {
            event.preventDefault();
            if(!$("#sousuo").val()) return false;
            if(/\<\>/g.test($("#sousuo").val())) return false;
            window.location.href = `searchMovie.html?movie=${$("#sousuo").val()}`;
        });
    };
    const search = new Find({
        id: "find",
        hasDel: false
    });
    search.init();
});