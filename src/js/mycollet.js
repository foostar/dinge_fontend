/**
 * Created by xiusiteng on 2016-11-30.
 * @desc 我收藏的列表
 */
import { api } from "dingeTools";
import Listcomponents from "./components/listcomponents";
import { format } from "utils";

class MyCollet extends Listcomponents{
    constructor(opt) {
        super(opt);
    }
    getTemplate(item) {
        return "<div class='info_mini'>"
                +"<div class='info_slide'>"
                    +"<div class='mycollet_author font-normal'><a href='javascript:;'>"+item.commentFrom.nickname+"<span>"+format(item.createdAt,"yy-MM-dd")+"</span></a></div>"
                    +"<div class='mycollet_title'><a href='javascript:;'>「"+item.title+"」</a></div>"
                    +"<div class='mycollet_content font-normal'>"+item.content+"</div>"
                +"</div>"
                +"<div class='del_info_btn' data-id='"+item._id+"'></div>"
                +"<div class='del_info_mask'></div>"
            +"</div>";
    }
    deleteAction(data) {
        return api.uncollet(Object.assign({}, data, {
            isList: true,
            type: "uncollet"
        }));
    }
    fetchData(page) {
        return api.getMyCollet({
            page
        });
    }
}
const mycollet = new MyCollet({id:"mycollet"});
mycollet.init();
