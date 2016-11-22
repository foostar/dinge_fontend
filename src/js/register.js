const $ = require("Zepto");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");

(($) => {
    function register(){
        this.init();
        this.errMsg = [];
    }
    register.prototype = {
        init(){
            dingeTools.init();
            this.bindEvent();
        },
        bindEvent () {
            $(".login_btn").on("click", () => {
                this.errMsg.splice(0,this.errMsg.length);
                var type = $(this).attr("data-type");
                this.formatData(type);
                if(this.errMsg.length > 0){
                    return console.log(this.errMsg[ 0 ],this.errMsg);
                }
                this.submitData(type)
                .done((result) => {
                    if(result.status == 1){
                        console.log(type+"成功！");
                        Cookie.set("dinge", result.data.token);
                        window.location.href = "/views/home.html";
                    } else {
                        console.log(result.msg);
                    }
                });
            });
        },
        formatData(type) {
            if(type == "login"){
                return this.formatLogin();
            }
            this.formatRegister();
        },
        formatLogin(){
            const accountResult = dingeTools.checkAccount($("#email").val());
            const passwordResult = dingeTools.checkPassword($("#password").val());
            if(accountResult) this.errMsg.push(accountResult);
            if(passwordResult) this.errMsg.push(passwordResult);
        },
        formatRegister() {
            const usernameResult = dingeTools.checkUsername($("#userName").val());
            const emailResult = dingeTools.checkEmail($("#email").val());
            const passwordResult = dingeTools.checkPassword($("#password").val());
            if(usernameResult) this.errMsg.push(usernameResult);
            if(emailResult) this.errMsg.push(emailResult);
            if(passwordResult) this.errMsg.push(passwordResult);
        },
        submitData(type){
            if(type == "login"){
                return this.submitLogin();
            }
            return this.submitRegister();
        },
        submitLogin(){
            return $.ajax({
                type:"get",
                url:"../data/signin.json",
                data:{
                    account:$("#email").val(),
                    password:$("#password").val()
                },
                datatype:"json"
            });
        },
        submitRegister(){
            return $.ajax({
                type:"get",
                url:"../data/signup.json",
                data:{
                    userName:$("#userName").val(),
                    email   :$("#email").val(),
                    password:$("#password").val()
                },
                datatype:"json"
            });
        }
    };
    new register();
})($);