const $ = require("Zepto");
const dingeTools = require("dingeTools");

$(() => {
    /*
    searchMovie page tab 切换
    */
    function SearchMovie(){
        this.init();
    }
    SearchMovie.prototype ={
        actice:"movie",
        init(){
            dingeTools.init();
            this.render();
            this.bindEvent();
        },
        render(){
            $(".search_mov").val(decodeURIComponent(dingeTools.getURLParam("movie")));
            this.renderModule();
        },
        renderModule() {
            if (this.actice == "movie") {
                this.movieModule();
            } else if(this.actice == "comment") {
                this.reviewModule();
            } else {
                this.userModule(); 
            }
        },
        search(){
            $(".search i").click(() => {
                $("form").submit();
            });
            $("form").submit((event) => {
                event.preventDefault();
                this.renderModule();
            });
        },
        bindEvent(){
            this.search();
            this.cancel();
            this.tab();
        },
        movieModule(){
            //电影模块
            dingeTools.search({
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
        },
        reviewModule(){
            //影评模块
            dingeTools.search({
                commentId: "12345"
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
        },
        userModule(){
            dingeTools.search({
                userId: "12345"
            })
            .then((res) => {
                $("#searchMovie_movie").html("");
                let html = "";
                if(res.status == 1){
                    let data = res.data.list;           
                    for(let i=0;i<data.length;i++){
                        html += "<ul class='movie_user'>"
                                    +"<li class='user_img'><a href='javascript:;'><img src="+data[ i ].commentFrom.avatar+" alt=''></a></li>"
                                    +"<li class='user_txt'>"+data[ i ].commentFrom.nickname+"</li>"        
                                +"</ul>";
                    }
                    $(html).appendTo($("#searchMovie_user"));
                }
            });
        },
        tab(){
            //选项卡点击事件
            $("#tag li").click((event) => {
                $("#tag li").eq($(event.target).index()).addClass("current").siblings().removeClass("current");
                $(".tagClass").hide().eq($(event.target).index()).show();
            });
        },
        cancel(){
            //点击取消触发事件
            $("#search_cancel").click(() => {
                window.location.href="find.html";
            });
        }
    };
    new SearchMovie();
});