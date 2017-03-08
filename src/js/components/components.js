import $ from "Zepto";
import { dingeTools } from "dingeTools";
import Events from "../lib/events.js";

const { init } = dingeTools;
class Components{
    constructor(opt) {
        this.ele = $("#"+opt.id);
        this.hasEvent = opt.hasEvent || false;
    }
    init() {
        init();
        this.render();
        this.bindEvent();
        if (this.hasEvent) {
            this.attachEvent();
        }
    }
    render() {
        this.showData();
    }
    showData() {
        this.fetchData()
        .then(result => {
            this.makeData(result);
        })
        .catch((err) => {
            if(err.errcode && (err.errcode == 100401 || err.errcode == 100402)) {
                return window.location.href = "/views/login.html";
            }
        });
    }
}
Events.mixTo(Components);

export default Components;
