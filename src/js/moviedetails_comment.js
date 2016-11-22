const $ = require("Zepto");
const dingeTools = require("dingeTools");
$(() => {
    dingeTools.init(); 
    dingeTools.loadingFooter2();
    $(".goback").on("touchend", () => {
        window.history.back();
    });
});