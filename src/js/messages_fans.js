const dingeTools = require("dingeTools");
const Listcomponents = require("./components/listcomponents");

function MessagesFans(opt){
    Listcomponents.call(this, opt);
}
MessagesFans.prototype = Object.create(Listcomponents.prototype);
MessagesFans.constructor = MessagesFans;

MessagesFans.prototype.fetchData = function (page) {
    return dingeTools.userLikeMe({
        page:page
    });
};

MessagesFans.prototype.getTemplate = function (item) {
    return "<div class='fans'><span>"+item.nickname+"</span>成为了你的粉丝</div>";
};

var messagesFans = new MessagesFans({
    id: "message_like",
    hasNext: false,
    hasDel: false
});

messagesFans.init();