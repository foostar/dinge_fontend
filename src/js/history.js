/**
 * Created by xiusiteng on 2016-08-12.
 * @desc 历史记录
 */
import { api } from "dingeTools";
import Listcomponents from "./components/listcomponents";
import { fromNow } from "utils";

class History extends Listcomponents {
    constructor(opt) {
        super(opt);
    }
    getTemplate(item) {
        return "<div class='info_large'>"
                +"<a href='javascript:;'>"
                    +"<div class='history_title'>「"+item.title+"」</div>"
                    +"<div class='history_date font-normal'>"+fromNow(item.createdAt)+"</div>"
                +"</a>"
            +"</div>";
    }
    fetchData() {
        return api.historyList();
    }
}
const history = new History({
    id: "history",
    hasNext: false,
    hasDel: false
});
history.init();