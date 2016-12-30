/**
 * Created by xiusiteng on 2016-11-30.
 * @desc 我收藏的列表
 */
const dingeTools = require("dingeTools");
const Listcomponents = require("./components/listcomponents");

function MyCollet(opt){
    Listcomponents.call(this, opt);
}
MyCollet.prototype = Object.create(Listcomponents.prototype);
MyCollet.constructor = MyCollet;
MyCollet.prototype.getTemplate = function (item) {
    return "<div class='info_mini'>"
                +"<div class='info_slide'>"
                    +"<div class='mycollet_author font-normal'><a href='javascript:;'>"+item.commentFrom.nickname+"<span>"+dingeTools.format(item.createdAt,"yy-MM-dd")+"</span></a></div>"
                    +"<div class='mycollet_title'><a href='javascript:;'>「"+item.title+"」</a></div>"
                    +"<div class='mycollet_content font-normal'>"+item.content+"</div>"
                +"</div>"
                +"<div class='del_info_btn' data-id='"+item._id+"'></div>"
                +"<div class='del_info_mask'></div>"
            +"</div>";
};
MyCollet.prototype.deleteAction = function (data) {
    return dingeTools.uncollet(data);
};
MyCollet.prototype.fetchData = function (page) {
    return dingeTools.getMyCollet({
        page:page
    });
};
const mycollet = new MyCollet({id:"mycollet"});
mycollet.init();
