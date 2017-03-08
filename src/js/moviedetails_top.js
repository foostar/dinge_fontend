import $ from "Zepto";
import { dingeTools, api } from "dingeTools";
import { getURLParam, format } from "utils";

const { init } = dingeTools;

class moviedetailTop{
    constructor() {
        this.init();
    }
    init() {
        init();
        this.loadData();
    }
    loadData(){
        const id=  getURLParam("id");
        api.movie({
            movieId:id
        })
        .then((res) => {
            let html = "";
            if(res.status == 1&& res.data._id){
                let data = res.data;
                html += "<div class='m_details_top'>"
                            +"<div class='m_details_topimg'><img src="+data.images.large+" alt=''></div>"
                            +"<div class='m_d_top_position'>"
                            +"<div class='m_mask font-normal'><span class='font-title'>"+data.rating.average+"</span>评分</div>"
                            +"<p class='font-bold'>"
                                    +"<span>"+data.title+"</span>"
                                    +"<span>"+data.aka[ 0 ].name+"</span>"
                                    +"<span>"+data.etitle+"</span>"
                                +"</p>"
                            +"</div>"
                        +"</div>"
                        +"<div class='m_detail_man font-normal'>"
                            +"<span>导演："+data.directors[ 0 ].name+"</span>"
                            +"<span>主演："+data.casts[ 0 ].name+"</span>"
                            +"<span>又名："+data.aka[ 0 ].name+"</span>"
                            +"<span>类型："+data.genres[ 0 ].name+"</span>"
                            +"<span>国家："+data.country[ 0 ].name+"</span>"
                            +"<span>语言："+data.language[ 0 ].name+"</span>"
                            +"<span>上映日期："+format(data.releasetime, "yyyy-mm-dd")+"</span>"
                            +"<span>片长："+data.actime+"</span>"
                        +"</div>"
                        +"<div class='m_detail_introduce font-normal'>"
                            +"<span>故事简介</span>"
                            +"<p>《荒野猎人》是2015年亚利桑德罗·冈萨雷斯·伊纳里多执导的剧情电影，由莱昂纳多·迪卡普里奥、汤姆·哈迪、威尔·保尔特 、多姆纳尔·格利森、保罗·安德森等主演。《荒野猎人》根据迈克尔·彭克同名长篇小说改编，故事讲述19世纪一名皮...</p>"
                        +"</div>";
                $(html).appendTo($(".moviedetail_content"));                            
            }   
        });
    }

}
new moviedetailTop();