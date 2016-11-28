const $ = require("Zepto");
const dingeTools = require("dingeTools");

$(() => {
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
});