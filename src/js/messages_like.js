import { api } from "dingeTools";
import Listcomponents from "./components/listcomponents";

class MessagesLike extends Listcomponents {
    constructor(opt) {
        super(opt);
    }
    fetchData(page) {
        return api.commentLikeMe({
            page
        });
    }
    getTemplate(item) {
        return "<div class='like'><em>"+item.zanFrom.nickname+"</em>"+"喜欢了你的「<span>"+item.commentId.title+"</span>」</div>";
    }
}
const like = new MessagesLike({
    id: "message_like",
    hasNext: false,
    hasDel: false
});

like.init();
