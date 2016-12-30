/**
 * Created by xiusiteng on 2016-11-30.
 * @desc 我的评论
 */
const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Listcomponents = require("./components/listcomponents");

$(() => {
    function MyComment(opt){
        Listcomponents.call(this, opt);
    }
    MyComment.prototype = Object.create(Listcomponents.prototype);
    MyComment.constructor = MyComment;
    MyComment.prototype.getTemplate = function (item) {
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
    };
    MyComment.prototype.deleteAction = function (data) {
        return dingeTools.delMyConmments(data);
    };
    MyComment.prototype.fetchData = function (page) {
        return dingeTools.myConmments({
            token:Cookie.get("dinge"),
            page:page
        });
    };
    const mycomment = new MyComment({id:"mycomment"});
    mycomment.init();
});
    