const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Components = require("./components");
const Cookie = require("js-cookie");
const Swiper = require("Swiper");

function Scrolladdcomponents(opt = {id : "list_box"}){
    Components.call(this,opt);
    this.page = 0;
    this.pageSize = 20;
};
Scrolladdcomponents.prototype = Object.create(Components.prototype);
Scrolladdcomponents.prototype.constructor = Scrolladdcomponents;
Scrolladdcomponents.prototype.bindEvent = function(page){
    this.scrollDir({
        up : (x) => {
            if(x <= 0){
                this.getTemplate();
            }
        }
    })
};
Scrolladdcomponents.prototype.scrollDir = function({
    up =   () => {},
    down = () => {}
} = {}){
    let scrollT = this.ele.scrollTop();
    this.ele.scroll(function(){
        if(scrollT < $(this).scrollTop()){
            up($(this).get(0).scrollHeight - ($(this).get(0).clientHeight + $(this).scrollTop()));
        }else{
            down()
        }
        scrollT = $(this).scrollTop();
    })
};
module.exports = Scrolladdcomponents;
