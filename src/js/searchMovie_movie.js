const $ = require("Zepto");
const dingeTools = require("dingeTools");

$(() => {
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
});