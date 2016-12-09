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
        //最后统一修改
        $(".loading").hide();
    }
};
Components.prototype.loadingImg = function(){
    $("#loading").show();
};

Components.prototype.constructor = Components;

module.exports = Components;
