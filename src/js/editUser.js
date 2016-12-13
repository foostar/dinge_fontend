/**
 * Created by xiusiteng on 2016-08-12.
 * @desc 编辑用户资料
 */
const $ = require("Zepto");
const dingeUI = require("dingeUi");
const dingeTools = require("dingeTools");
const Cookie = require("js-cookie");
const config = require("./config/config");

const { provsData, citysData, distsData } = require("./lib/cityData.js");
const Components = require("./components/components");

$(() => {
    function EditUser(opt){
        Components.call(this,opt);
    }
    EditUser.prototype = Object.create(Components.prototype);
    EditUser.prototype.constructor = EditUser;
    EditUser.prototype.bindEvent = function(){
        // 提交用户资料
        this.submitUserData();
        // 性别选择弹出层
        this.alertSexChoice();
        // 选择性别
        this.choiceSex();
        // 上传图片
        this.uploadCarouse();
    };
    EditUser.prototype.uploadCarouse = function(){
        new dingeUI.LUploader(document.getElementById("carouse"), {
            url: `${config.url}/carouse/api/addCarouse`,//post请求地址
            multiple: false,//是否一次上传多个文件 默认false
            maxsize: 102400,//忽略压缩操作的文件体积上限 默认100kb
            accept: "image/*",//可上传的图片类型
            quality: 0.1,//压缩比 默认0.1  范围0.1-1.0 越小压缩率越大
            showsize:false//是否显示原始文件大小 默认false
        });
    };
    EditUser.prototype.choiceSex = function(){
        $(".edit_modal a").on("touchend", (event) => {
            $(".edit_content_sex").html($(event.target).html());
            $(".edit_mask").addClass("edit_mask_out");
            setTimeout(() => {
                $(".edit_mask").removeClass("edit_mask_out edit_mask_in");
                $(".edit_mask").hide();
            },100);
        });
    };
    EditUser.prototype.alertSexChoice = function(){
        this.ele.on("touchend",".edit_content_sex", () => {
            $(".edit_mask").show();
            setTimeout(() => {
                $(".edit_mask").addClass("edit_mask_in");
            },0);
        });
    };
    EditUser.prototype.submitUserData = function(){
        $(".goback").on("touchend", (event) => {
            event.preventDefault();
            if($("#sign").val().length > 30){
                return alert("签名不能大于30个字符！");
            }
            // 拼凑数据
            let data = {
                avatar: $(".edit_carouse img").attr("src"),
                nickname: $(".edit_content_username input").val(),
                sign: $("#sign").val(),
                sex: $(".edit_content_sex").html(),
                city: $("#city").val(),
                birthday: $("#birthday").val()
            };
            // 修改数据
            this.editUserInfo(data);
        });
    };
    EditUser.prototype.editUserInfo = function(data){
        dingeTools.editUserInfo(data)
        .then((result) => {
            if(result.status == 1){
                window.history.back();
            }
        }, err => {
            if(err.errcode == 100401 || err.errcode == 100402) {
                window.location.href = "/views/login.html";
            }
        });
    };
    EditUser.prototype.render = function(){
        this.showUserData();
    };
    EditUser.prototype.showUserData = function(){
        // 加载数据
        this.loadUserData()
        // 展示数据
        .then((result) => {
            this.makeData(result);
        });
    };
    EditUser.prototype.loadUserData = function(){
        return dingeTools.userInfo({}, -1);
    };
    EditUser.prototype.makeData = function(result){
        if(result.status == 1){
            // 给当前页面赋值
            const data = result.data;
            $(".edit_carouse").attr("data-src",data.avatar);
            $(".edit_carouse img").attr("src",data.avatar);
            $(".edit_content_username input").val(data.nickname);
            $("#sign").val(data.sign);
            $(".word_count span").html(data.sign.length);
            $(".edit_content_sex").html(data.sex);
            $("#city").val(data.city);
            let birthday = new Date(data.birthday);
            birthday = birthday.getFullYear() + "-" + (birthday.getMonth() + 1) + "-" + birthday.getDate();
            $("#birthday").val(birthday);
            $("#carouse").attr("data-user-id",Cookie.get("dinge"));
            const sign = document.getElementById("sign");
            // 创建日历插件
            const calendar = new dingeUI.LCalendar();
            calendar.init({
                "trigger": "#birthday", //标签id
                "type": "date", //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
                "minDate": "1900-1-1", //最小日期
                "maxDate": new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() //最大日期
            });

            // 创建地区插件
            const area1 = new dingeUI.LArea();
            area1.init({
                "trigger": "#city", //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                "valueTo": "#city_value", //选择完毕后id属性输出到该位置
                "keys": {
                    id: "value",
                    name: "text"
                }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                "type": 2, //数据源类型
                "data": [ provsData, citysData, distsData ] //数据源
            });
            // 计算输入字符
            sign.oninput = () => {
                $(".word_count span").html(sign.value.length);
            };
        }
    };
    const edituser = new EditUser({id:"edituser"});
    edituser.init();
});
