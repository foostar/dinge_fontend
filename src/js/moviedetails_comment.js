import { dingeTools } from "dingeTools";
dingeTools.init(); 
dingeTools.loadingFooter2();
document.querySelector(".goback").addEventListener("touchend", () => {
    window.history.back();
});