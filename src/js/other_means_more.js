const $ = require("Zepto");
const dingeTools = require("dingeTools");

$(() => {
    dingeTools.init();
    $(".goback").on("touchend", () => {
        window.history.back();
    });
    /*--------------------------------他人资料-更多-举报用户--------------*/
    $("#more_h3_user").click(() => {
        $("#more_h3_dis").toggle();
    });
    $("#more_h3_blacklist").click(() => {
        $("#mask").show();
        $("#pop").show();
    });
    $("#mask").click(() => {
        $(this).hide();
        $("#pop").hide();
    });
});