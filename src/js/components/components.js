const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Events = require("../lib/events.js");


function Components(opt) {
    this.ele = $("#"+opt.id);
    this.hasEvent = opt.hasEvent || false;
    this.hasSwiper = opt.hasSwiper;
}
Components.prototype = {
    init() {
        dingeTools.init();
        this.bindEvent();
        this.render();
        if (this.hasEvent) {
            this.attachEvent();
        }
    },
    render() {
        this.showData();
    },
    showData() {
        this.fetchData()
        .then((result) => {
            this.makeData(result);
        },(err) => {
            if(err.errcode && (err.errcode == 100401 || err.errcode == 100402)) {
                dingeTools.removeStorage("userinfo");
                return window.location.href = "/views/login.html";
            }
        });
    }
};
Events.mixTo(Components);
Components.constructor = Components;

module.exports = Components;
