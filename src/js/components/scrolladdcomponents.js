import $ from "Zepto";
import Components from "./components";

class Scrolladdcomponents extends Components{
    constructor(opt = {id : "list_box"}){
        super(opt);
        this.page = 0;
        this.pageSize = 20;
    }
    bindEvent() {
        this.scrollDir({
            up : (x) => {
                if(x <= 20){
                    this.getTemplate();
                }
            }
        });
    }
    scrollDir({
        up =   () => {},
        down = () => {}
    } = {}) {
        let scrollT = this.ele.scrollTop();
        this.ele.scroll(function(){
            //console.log($(this).scrollTop(), ($(document).height()-$("#footer").height()+1), $(this).get(0).scrollHeight);
            if(scrollT < $(this).scrollTop()){
                up($(this).get(0).scrollHeight - ($(this).get(0).clientHeight + $(this).scrollTop()));
            }else{
                down();
            }
            scrollT = $(this).scrollTop();
        });
    }
}

export default Scrolladdcomponents;
