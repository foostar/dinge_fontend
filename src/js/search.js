const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");

$(() => {
    function Search(){ 
        this.page = 1;
        this.init();
    }
    Search.prototype={
        init(){
            dingeTools.init();
            this.bindEvent();
            this.render();
        },
        bindEvent(){
            this.changeHref();
            this.movieHref();
        },
        //渲染页面
        render(){
            this.loadingImg();
            /*self.movieList()*/
            this.movieList();
        },
        loadingImg(){
            $(".loading").show();
        },
        movieList(){
             //debugger
            //电影列表的接口
            dingeTools.movie({
                page:this.page
            })
            .then((result) => {
                let html = "";
                if(result.status == 1 && result.data.list.length>0){ 
                    let data = result.data.list;
                    data.forEach((item) => {
                       //console.log(item.images.medium);
                        html += "<li><a href='moviedetails.html?id="+item._id+"'><img src="+item.images.large+" alt=''><span class='font-h'>"+item.title+"</span></a></li>";
                    });
                    $(html).appendTo($(".search_body"));
                    $(".loading").hide();
                }
            });
        },
        changeHref(){
            //点击搜索跳转搜索Ajax.load
            $("#sousuo").change(() => {
                //$(document).load(searchMovie.html);
                window.location.href = "searchMovie.html";
            });
        },
        movieHref(){
            $(".search_body").on("click","li", () => {
                window.location.href = "moviedetails.html";
            });
        }
    };
    new Search();
 //   search.init();
});