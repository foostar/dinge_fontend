const dingeTools = require("dingeTools");
const Listcomponents = require("./components/listcomponents");

function MessagesLike(opt){
    Listcomponents.call(this, opt);
}
MessagesLike.prototype = Object.create(Listcomponents.prototype);
MessagesLike.constructor = MessagesLike;

MessagesLike.prototype.fetchData = function (page) {
    return dingeTools.commentLikeMe({
        page:page
    });
};

MessagesLike.prototype.getTemplate = function (item) {
    return "<div class='like'><em>"+item.zanFrom.nickname+"</em>"+"喜欢了你的「<span>"+item.commentId.title+"</span>」</div>";
};

var messagelike = new MessagesLike({
    id: "message_like",
    hasNext: false,
    hasDel: false
});

messagelike.init();
