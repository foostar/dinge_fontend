import $ from "Zepto";
import { api } from "dingeTools";
import Cookie from "js-cookie";
import Components from "./components/components";
import { checkAccount, checkPassword, checkEmail, checkUsername } from "utils";

class Register extends Components{
    constructor(opt) {
        super(opt);
        this.errMsg = [];
    }
    bindEvent() {
        $(".login_btn").on("click", (event) => {
            this.errMsg.splice(0,this.errMsg.length);
            var type = $(event.target).attr("data-type");
            this.formatData(type);
            if(this.errMsg.length > 0){
                return console.log(this.errMsg[ 0 ],this.errMsg);
            }
            this.submitData(type)
            .then((result) => {
                const data = result.data;
                if(type == "login") {
                    Cookie.set("dinge", data.token);
                    Cookie.set("dingeId", data.userId.toString());
                    return window.location.href = "/views/user.html";
                }
                window.location.href = "/views/login.html";
            });
        });
    }
    render(){}
    formatData(type) {
        if(type == "login"){
            return this.formatLogin();
        }
        this.formatRegister();
    }
    formatLogin() {
        const accountResult = checkAccount($("#email").val());
        const passwordResult = checkPassword($("#password").val());
        if(accountResult) this.errMsg.push(accountResult);
        if(passwordResult) this.errMsg.push(passwordResult);
    }
    formatRegister() {
        const usernameResult = checkUsername($("#userName").val());
        const emailResult = checkEmail($("#email").val());
        const passwordResult = checkPassword($("#password").val());
        if(usernameResult) this.errMsg.push(usernameResult);
        if(emailResult) this.errMsg.push(emailResult);
        if(passwordResult) this.errMsg.push(passwordResult);
    }
    submitData(type) {
        if(type == "login"){
            return this.submitLogin();
        }
        return this.submitRegister();
    }
    submitLogin() {
        return api.login({
            email:$("#email").val(),
            password:$("#password").val()
        });
    }
    submitRegister() {
        return api.register({
            username:$("#userName").val(),
            email   :$("#email").val(),
            password:$("#password").val()
        });
    }
}
const register = new Register({id: "register"});
register.init();
