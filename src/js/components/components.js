const $ = require("Zepto");
const dingeTools = require("dingeTools");

function Components(opt) {
    this.ele = $("#"+opt.id);
}

Components.prototype = {
    init() {
        dingeTools.init();
        this.bindEvent();
        this.render();
    }
};

Components.constructor = Components;

module.exports = Components;