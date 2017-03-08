import Listcomponents from "./components/listcomponents";
import { api } from "dingeTools";

class MessagesComment extends Listcomponents {
    constructor(opt) {
        super(opt);
    }
    getTemplate(item) {
        return "<div class='info_large info_media'>"
                +"<div class='info_slide'>"
                    +"<div class='mescomment_carouse'>"
                        +"<a href='javascript:;'>"
                            +"<img src='"+item.commentFrom.avatar+"' alt=''>"
                            +"<em class='font-normal'>"+item.commentFrom.nickname+"</em>"
                        +"</a>"
                    +"</div>"
                    +"<div class='mescomment_comment'>"
                        +"<a href='javascript:;'>"
                            +"<p class='font-bold'>"+item.content+"</p>"
                            +"<h4 class='font-normal'>——「<span>"+item.commentId.title+"</span>」</h4>"
                        +"</a>"
                    +"</div>"
                +"</div>"
                +"<div class='del_info_btn' data-id='"+item._id+"'></div>"
                +"<div class='del_info_mask'></div>"
            +"</div>";
    }
    fetchData(page) {
        return api.commentToMe({
            page
        });
    }
}
const comment = new MessagesComment({id:"commentToMe"});
comment.init();
