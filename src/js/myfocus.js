/**
 * Created by xiusiteng on 2016-11-30.
 * @desc 我的关注
 */
const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Listcomponents = require("./components/listcomponents");

$(() => {
    function MyFocus(opt){
        Listcomponents.call(this, opt);
    }
    MyFocus.prototype = Object.create(Listcomponents.prototype);
    MyFocus.constructor = MyFocus;
    MyFocus.prototype.getTemplate = function (item) {
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
    };
    MyFocus.prototype.deleteAction = function (data) {
        return dingeTools.delMyFocus(data);
    };
    MyFocus.prototype.fetchData = function (page) {
        return  dingeTools.myFocusList({
            token:Cookie.get("dinge"),
            page:page
        });
    };
    const myfocus = new MyFocus({id:"myfocus"});
    myfocus.init();
});