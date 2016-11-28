const $ = require("Zepto");
const dingeTools = require("dingeTools");

$(() => {
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
});