/**
 * Created by xiusiteng on 2016-11-30.
 * @desc 我的评论
 */
import { api } from "dingeTools";
import Listcomponents from "./components/listcomponents";

class MyComment extends Listcomponents {
    constructor(opt){
        super(opt);
    }
    getTemplate(item) {
        return "<div class='info_mini'>"
                    +"<div class='info_slide'>"
                        +"<a href='javascript:;'>"
                            +"<div class='mycomment_title font-h'>「"+item.title+"」</div>"
                            +"<ul class='mycomment_body font-normal'><li class='mycomment_heart'><img src='../images/comment_likeS.png' alt=''><span>"+item.star+"</span></li><li class='mycomment_say'><img src='../images/comment_commentS.png' alt=''><span>"+item.reply+"</span></li></ul>"
                        +"</a>"
                    +"</div>"
                    +"<div class='del_info_btn' data-id='"+item._id+"'></div>"
                    +"<div class='del_info_mask'></div>"
                +"</div>";
    }
    deleteAction(data) {
        return api.delMyConmments(data);
    }
    fetchData(page) {
        return api.myComments({
            page
        });
    }
}
const mycomment = new MyComment({id:"mycomment"});
mycomment.init();
    