import $ from "Zepto";
import { api } from "dingeTools";
import Components from "./components/components";

class UserInfo extends Components{
    constructor(opt){
        super(opt);
    }
    bindEvent() {
        $(".user_carouse").on("touchend", () => {
            window.location.href = "/views/edit_user.html";
        });
    }
    fetchData() {
        return api.userInfo({});
    }
    makeData(result) {
        const data = result.data;
        $(".user_carouse img").attr("src", data.avatar);
        $(".user_nickname").html(data.nickname);
        $(".notice").html(data.sign);
    }
}
const userinfo = new UserInfo({ id:"userinfo" });
userinfo.init();