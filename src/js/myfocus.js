/**
 * Created by xiusiteng on 2016-11-30.
 * @desc 我的关注
 */
import { api } from "dingeTools";
import Listcomponents from "./components/listcomponents";

class MyFocus extends Listcomponents{
    constructor(opt) {
        super(opt);
    }
    getTemplate(item) {
        return "<div class='info_normal'>"
                    +"<div class='info_slide'>"
                        +"<div class='myfocus_carouse'>"
                            +"<a href='javascript:;'>"
                                +"<img src='"+item.avatar+"'>"
                            +"</a>"
                        +"</div>"
                        +"<div class='myfocus_content'>"
                            +"<a href='javascript:;'>"
                                +"<div class='myfocus_nickname'>"+item.nickname+"</div>"
                                +"<div class='myfocus_notice font-normal'>"+item.sign+"</div>"
                            +"</a>"
                        +"</div>"
                    +"</div>"
                    +"<div class='del_info_btn' data-id='"+item._id+"'></div>"
                    +"<div class='del_info_mask'></div>"
                +"</div>";
    }
    deleteAction(data) {
        return api.delMyFocus(Object.assign({}, data, {
            isList: true,
            type: "unfocus"
        }));
    }
    fetchData(page) {
        return  api.myFocusList({
            page
        });
    }
}
const myfocus = new MyFocus({id:"myfocus"});
myfocus.init();