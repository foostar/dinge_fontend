import $ from "Zepto";
import { api } from "dingeTools";
import Scrolladdcomponents from "./components/scrolladdcomponents";

class Find extends Scrolladdcomponents {
    constructor(opt) {
        super(opt);
        this.holdPosition = 0;
        this.mySwiper = "";
    }
    render() {
        this.skipEvent();
        this.getTemplate();
    }
    nextPage() {
        this.page++;
        return api.movie({
            page: this.page
        });
    }
    getTemplate() {
        return new Promise((resolve, reject) => {
            this.nextPage()
            .then((result) => {
                let html = "";
                if(result.status == 1 &&  result.data.list.length>0) {
                    let data = result.data.list;
                    data.forEach((item) => {
                        html += "<div class='swiper-slide'>\
                                    <div class='search_item'>\
                                        <a href='moviedetails.html?id="+item._id+"'>\
                                            <img src="+item.images.large+" alt=''><span class='font-h'>"+item.title+"</span>\
                                        </a>\
                                    </div>\
                                </div>";
                    });
                    $(html).appendTo($(".swiper-wrapper"));
                }
                resolve();
            }, (err) => {
                reject(err);
            });
        });
    }
    skipEvent() {
        $("#search").on("touchend", function() {
            let searchValue = $(".search_item").eq(0).find("span").html() || "";
            window.location.href = `search.html?name=${encodeURIComponent(searchValue)}`;
        });
    }
}
const search = new Find({
    id: "find_scroll",
    hasDel: false
});
search.init();
