import { api } from "dingeTools";
import Listcomponents from "./components/listcomponents";

class MessagesFans extends Listcomponents {
    constructor(opt) {
        super(opt);
    }
    fetchData(page) {
        return api.userLikeMe({
            page
        });
    }
    getTemplate(item) {
        return "<div class='fans'><span>"+item.nickname+"</span>成为了你的粉丝</div>";
    }
} 

const fans = new MessagesFans({
    id: "message_like",
    hasNext: false,
    hasDel: false
});
fans.init();