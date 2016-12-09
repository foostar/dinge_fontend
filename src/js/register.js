const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const Components = require("./components/components");

(($) => {
    function Register(opt){
        Components.call(this, opt);
        this.errMsg = [];
    }
    Register.prototype = Object.create(Components.prototype);
    Register.constructor = Register;
    Register.prototype.bindEvent = function () {
        // if(Cookie.get("dinge")) {
        //     window.location.href = "/views/user.html";
        // }
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
            })
            .catch(err => {
                console.log("err", err);
            });
        });
    };
    Register.prototype.render = function () {};
    Register.prototype.formatData = function (type) {
        if(type == "login"){
            return this.formatLogin();
        }
        this.formatRegister();
    };
    Register.prototype.formatLogin = function () {
        const accountResult = dingeTools.checkAccount($("#email").val());
        const passwordResult = dingeTools.checkPassword($("#password").val());
        if(accountResult) this.errMsg.push(accountResult);
        if(passwordResult) this.errMsg.push(passwordResult);
    };
    Register.prototype.formatRegister = function () {
        const usernameResult = dingeTools.checkUsername($("#userName").val());
        const emailResult = dingeTools.checkEmail($("#email").val());
        const passwordResult = dingeTools.checkPassword($("#password").val());
        if(usernameResult) this.errMsg.push(usernameResult);
        if(emailResult) this.errMsg.push(emailResult);
        if(passwordResult) this.errMsg.push(passwordResult);
    };
    Register.prototype.submitData = function (type) {
        if(type == "login"){
            return this.submitLogin();
        }
        return this.submitRegister();
    };
    Register.prototype.submitLogin = function () {
        return dingeTools.login({
            email:$("#email").val(),
            password:$("#password").val()
        });
    };
    Register.prototype.submitRegister = function () {
        return dingeTools.register({
            username:$("#userName").val(),
            email   :$("#email").val(),
            password:$("#password").val()
        });
    };
    const register = new Register({id: "register"});
    register.init();
})($);