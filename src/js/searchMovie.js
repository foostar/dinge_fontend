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
        init(){
            dingeTools.init();
            this.render();
            this.bindEvent();
        },
        render(){
            this.movieModule();
            this.reviewModule();
            this.userModule(); 
        },
        bindEvent(){
            this.cancel();
            this.tab();
        },
        movieModule(){
            //电影模块
            dingeTools.search({
                movieId:"12345"
            })
            .then((res) => {
                //console.log(res);
                let html = "";
                if(res.status == 1){
                    let data = res.data.list;   
                    //console.log(data);         
                    for(let i=0;i<data.length;i++){
                        let monent = data[ i ].releasetime;
                        let monsubstr=monent.substr(0, 10);    
                        html += "<ul>"
                                    +"<li class='search_tag1img'><img src="+data[ i ].images.large+" alt=''></li>"
                                    +"<li class='search_tag1txt'>"
                                        +"<div class='tag1_title font-title'>"+data[ i ].title+"</div>"
                                        +"<div class='tag1_midtxt'><span class='font-normal'>"+monsubstr+"</span><em class='font-normal'>"+data[ i ].directors[ i ].name+"</em></div>"
                                        +"<div class='tag1_bnttxt font-normal'><span class='font-title'>"+data[ i ].rating.average+"</span>评分</div>"
                                    +"</li>"
                                +"</ul>";
                    }
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
                //console.log(res.data.content);
                //console.log(res.data);
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
                //console.log(res.data.content);
                //console.log(res.data);
                let html = "";
                if(res.status == 1){
                    let data = res.data.list;   
                    //console.log(data[0].commentFrom);         
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
            $("#tag li").click(() => {
                $("#tag li").eq($(this).index()).addClass("current").siblings().removeClass("current");
                $(".tagClass").hide().eq($(this).index()).show();
            });
        },
        cancel(){
            //点击取消触发事件
            $("#search_cancel").click(() => {
                window.location.href="search.html";
            });
        }
    };
    new SearchMovie();
});