import $ from "Zepto";
import { api, dingeTools } from "dingeTools";
import { getURLParam } from "utils";

const { init } = dingeTools;
/*
searchMovie page tab 切换
*/
class SearchMovie{
    constructor(){
        this.active = "movie";
    }
    init() {
        init();
        this.render();
        this.bindEvent();
    }
    bindEvent () {
        this.search();
        this.cancel();
        this.tab();
    }
    render() {
        $(".search_mov").val(decodeURIComponent(getURLParam("name")));
        this.renderModule();
    }
    renderModule() {
        if (this.active == "movie") {
            this.movieModule();
        } else if(this.active == "comment") {
            this.reviewModule();
        } else {
            this.userModule(); 
        }
    }
    search() {
        $(".search i").click(() => {
            $("form").submit();
        });
        $("form").submit((event) => {
            event.preventDefault();
            this.formatSearch()
            .then(() => {
                this.renderModule();
            }, err => {
                console.log(err);
            });
        });
    }
    formatSearch() {
        return new Promise((reslove, reject) => {
            if (!$(".search_mov").val()) {
                return reject({ msg: "搜索项不能为空！" });
            }
            if ($(".search_mov").val().length > 10) {
                return reject({ msg: "搜索项过长！" });
            }
            if ($(".search_mov").val().match(/\<script\>/g)) {
                return reject({ msg: "搜索不合法！" });
            }
            reslove();
        });
    }
    movieModule() {
        //电影模块
        api.search({
            movieName:$(".search_mov").val()
        })
        .then((res) => {
            let html = "";
            if(res.status == 1){
                $("#searchMovie_movie").html("");
                let data = res.data.list;   
                data.forEach((v) => {
                    let monent = v.releaseTime.substr(0, 10);
                    let directors = "";
                    v.directors.forEach((d) => {
                        directors += `<em class='font-normal'>${d.name}</em>`;
                    });
                    html += `<ul><li class='search_tag1img'><img src=${v.images.large} alt=''></li><li class='search_tag1txt'><div class='tag1_title font-title'>${v.title}</div><div class='tag1_midtxt'><span class='font-normal'>${monent}</span>${directors}</div><div class='tag1_bnttxt font-normal'><span class='font-title'>${parseInt(v.rating.average).toFixed(1)}</span>评分</div></li></ul>"`;
                });
                $(html).appendTo($("#searchMovie_movie"));
            }
        });
    }
    reviewModule() {
        //影评模块
        api.search({
            commentTitle:$(".search_mov").val()
        })
        .then((res) => {
            $("#searchMovie_movie").html("");
            let html = "";
            if(res.status == 1){
                let data = res.data.list;   
                //console.log(data);         
                for(let i=0;i<data.length;i++){
                    html += "<div class='review_div'>"
                                +"<div class='review_title font-title'>"+data[ i ].title+"</div>"
                                +"<span class='font-normal'>——《"+data[ i ].movie+"》</span>"
                                +"<p class='font-normal'>"+data[ i ].content+"</p>"
                            +"</div>";
                }
                $(html).appendTo($("#searchMovie_review"));
            }
        });
    }
    userModule() {
        api.search({
            userName:$(".search_mov").val()
        })
        .then((res) => {
            $("#searchMovie_movie").html("");
            let html = "";
            if(res.status == 1){
                let data = res.data.list;   
                for(let i=0;i<data.length;i++){
                    let item = data[ i ];
                    let commentFromItem = item.commentFrom;
                    html += "<ul class='movie_user' data-id="+item._id+">"
                                +"<li class='user_img'><a href='javascript:;'><img src="+commentFromItem.avatar+" alt=''></a></li>"
                                +"<li class='user_txt font-h'>"+commentFromItem.nickname+"</li>"        
                            +"</ul>";
                }
                $(html).appendTo($("#searchMovie_user"));
            }
        });
    }
    tab() {
        //选项卡点击事件
        $("#tag").on("touchend", (e)=> {
            let currentElem = e.target;
            let index = $(currentElem).index();
            let active = index === 0 ? "movie" : index ===1 ? "comment" : "user";
            $("#tag li").eq(index).addClass("current").siblings().removeClass("current");
            $(".tagClass").hide().eq(index).show();
            this.active = active;
            this.formatSearch()
            .then(() => {
                this.renderModule();
            }, err => {
                console.log(err);
            });
        });
    }
    cancel() {
        //点击取消触发事件
        $("#search_cancel").click(() => {
            window.location.href="find.html";
        });
    }
}
const search = new SearchMovie();
search.init();