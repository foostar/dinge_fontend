 /* eslint-disable */
 /**
 * Created by xiusiteng on 2016-08-12.
 * @desc 公共工具函数
 */
const jQuery = require("jQuery");
const API = require("API");
const Cookie = require("js-cookie");

;(function($){
    var config = {
        env: 'test',
        url: 'http://localhost:3080',
        cacheTime: 5
    }
    var Api = new API(config)
    Cookie.set("dinge","577cc175ffd27d3c2f325c6f")
    // 增加foreach方法
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(callback, thisArg) {  
            var T, k;  
            if (this == null) {  
                throw new TypeError(" this is null or not defined");  
            }  
            var O = Object(this);  
            var len = O.length >>> 0; // Hack to convert O.length to a UInt32  
            if ({}.toString.call(callback) != "[object Function]") {  
                throw new TypeError(callback + " is not a function");  
            }  
            if (thisArg) {  
                T = thisArg;  
            }  
            k = 0;  
            while (k < len) {  
                var kValue;  
                if (k in O) {  
                    kValue = O[ k ];  
                    callback.call(T, kValue, k, O);  
                }  
                k++;  
            }  
        };  
    } 
    var DingeTools = {
        getURLParam:function (key){
            var  url=  window.location;
            var  paramStrArr= url.href.split('?');
         // alert(params[1]);
         if(paramStrArr.length>=2&&paramStrArr[1]!=""){
           var  paramStr=paramStrArr[1];
              var  paramArr = paramStr.split('&');
                     for (var index  in paramArr){
                        var paramstr= paramArr[index];    //key=value
                        var paramArray =  paramstr.split('=');
                      if(paramArray.length==2&&paramArray[0]==key){
                          return   paramArray[1];
                        }
                }       
            }
            return null;
        },
        //重置表单
        resetForm:function(opt){
            var _option = {
                className:"form-group",   //表单group值
                errorClass:"has-error",   //错误信息提示框
                helpClass:"help-block",   //错误信息提示
                countDownClass:"btn-primary", //倒计时变化样式 
                helpInfo:"获取验证码",   //倒计时提示文字
                countDown:"getvalidate"  //倒计时button
            };
            var option = $.extend({},_option,opt);
            if(!option.formId){
                throw new Error("请传入要重置的表单ID");
            }
            $("#"+option.formId+" ."+option.className+"").each(function(index,ele){
                var inputText = $(ele).find($("input[type='text'], input[type='password'], input[type='email'], input[type='number']"));
                var inputRadio = $(ele).find($("input[type='radio']"));
                var inputCheckbox = $(ele).find($("input[type='checkbox']"));
                var select = $(ele).find($("select"));
                var textarea = $(ele).find($("textarea"));
                var counter = $(ele).find($("."+option.countDown+""));
                if(inputText){
                    $(ele,inputText).removeClass("has-error");
                    $(ele).find($("."+option.helpClass+"")).each(function(index,element){
                        $(element).html("");
                    });
                    inputText.val("");
                }
                if(inputRadio){
                    inputRadio.each(function(index,element){
                        element.checked = false;
                        if(index == 0){
                            element.checked = true;
                        }
                    });
                }
                if(textarea){
                    textarea.val("");
                }
                if(inputCheckbox){
                    inputCheckbox.each(function(index,element){
                        element.checked = false;
                        if(index == 0){
                            element.checked = true;
                        }
                    });
                }
                if(select.length>0){
                    select.val(select.find("option")[ 0 ].val());
                }
                if(counter){
                    counter.removeClass(option.countDownClass);
                    counter.attr("disabled",true);
                    counter.html(option.helpInfo);
                }
            });
        },
        // 检测账户
        checkAccount: function(val) {
            if(val.length < 1){
                return '账号不能为空！'
            }
            if(val.length > 10){
                return '账号不能大于10个字符！'
            }
        },
        // 检测用户名
        checkUsername: function(val) {
            if(val.length < 1){
                return "用户名不能为空！";
            }
            if(val.length > 8){
                return "用户名不能多于8个字符！";
            }
        },
        // 检测邮箱
        checkEmail: function(val) {
            var reg=/^\w{3,}@\w+(\.\w+)+$/; 
            if (!val) {
                return "邮箱不能为空！";
            }
            if(!reg.test(val)){
                return "邮箱格式不正确！";
            }
        },
        // 检测密码
        checkPassword: function(val){
            var regNumber=/^[a-zA-Z]+$/;
            var regAscll=/^[a-zA-Z0-9]+$/;
            var regLetter=/^[A-Z0-9]+$/;
            if(val.length < 6){
                return "密码不能少于6位！"
            }
            if(val.length > 18){
                return "密码不能多于18位！"
            }
            if(regNumber.test(val)){
                return "密码至少包含一位数字"
            }
            if(regLetter.test(val)){
                return "密码至少包含一位小写字符"
            }
            if(!regAscll.test(val)){
                return "密码不能包含特殊字符"
            }
            /*if(regAscll.test(val)){
                return "密码至少包含一位大写字符"
            }*/
        },
        //  初始化底层font-size
        init:function(){
            var evt = "onorientationchange" in window ? "orientationchange" : "resize"
            var remPage = function(){
                document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
            }
            window.addEventListener(evt, remPage, false);
            remPage()
        },
        // 左滑出现删除按钮
        showDelete:function(ele){
            ele.on("swipeLeft",".swiper-slide", function(){
                $(this).find(".del_info_mask").show()
                $(this).find(".info_slide").addClass("slide-left");
                $(this).find(".del_info_btn").addClass("del_info_visible_normal");
            });
        },
        // 关闭删除按钮
        cancelDelete:function(ele){
            var self = this
            ele.on("click",'.del_info_mask', function(event){
                self.cancelBtn()  
            });
        },
        // 关闭删除特效
        cancelBtn:function(){
            if($(".slide-left")){
                $(".slide-left").removeClass("slide-left");
                $(".del_info_visible_normal").removeClass("del_info_visible_normal");  
                $(".del_info_mask").hide();  
            }
        },
        // 加载底部
        loadingFooter2:function(){    
            var dtd = $.Deferred();
            $("#footer2").load("../views/footer2.html",function(){
                dtd.resolve({status:1});
            });
            return dtd;
        },
        // 初试化touchmove，解决tap中 swipe不生效的问题
        initTouchMove:function(){
            document.addEventListener("touchmove", function (event) {
                event.preventDefault();
            }, false);
        },
        // 向上返回
        goBack:function(){
            $(".goback").on("tap", function(){
                window.history.back();
            });
        },
        // 获取url的参数
        getQueryString:function(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null){
                return  unescape(r[ 2 ]);
            } 
            return null;
        },
        // 时间格式化
        format:function (date,fmt) {
            var o = {
                "M+": new Date(date).getMonth() + 1, //月份 
                "d+": new Date(date).getDate(), //日 
                "h+": new Date(date).getHours(), //小时 
                "m+": new Date(date).getMinutes(), //分 
                "s+": new Date(date).getSeconds(), //秒 
                "q+": Math.floor((new Date(date).getMonth() + 3) / 3), //季度 
                "S": new Date(date).getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (new Date(date).getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[ k ]) : (("00" + o[ k ]).substr(("" + o[ k ]).length))); 
                }
            }
            return fmt;
        },
        // 距今时间的格式化
        fromNow:function(fmt){
            var fmtStamp = new Date(fmt).getTime();
            var now = Date.now();
            var timeDiff = (now-fmtStamp)/1000;
            var tmpTime;
            if(timeDiff<60) {
                fmt = "刚刚";
                return fmt;
            }
            if(timeDiff<3600 && timeDiff>60) {
                tmpTime = parseInt(timeDiff/60);
                fmt = tmpTime+"分钟前";
            }
            if(timeDiff<86400 && timeDiff>3600){
                tmpTime = parseInt(timeDiff/3600);
                fmt = tmpTime+"小时前";
            }
            if(timeDiff<172800 && timeDiff>86400){
                fmt = "昨天";
            }
            if(timeDiff<1382400 && timeDiff>172800){
                tmpTime = parseInt(timeDiff/86400);
                fmt = tmpTime+"天前";
            }
            if(timeDiff<2592000 && timeDiff>1382400){
                fmt = "1个月内";
            }
            if(timeDiff<31536000 && timeDiff>2592000){
                tmpTime = parseInt(timeDiff/2592000);
                fmt = tmpTime+"个月前";
            }
            if(timeDiff<157680000 && timeDiff>31536000){
                tmpTime = parseInt(timeDiff/31536000);
                fmt = tmpTime+"年前";
            }
            return fmt;
        }
    };
    // 选择区域插件
    DingeTools.LArea = (function() {
        var MobileArea = function() {
            this.gearArea;
            this.data;
            this.index = 0;
            this.value = [0, 0, 0];
        }
        MobileArea.prototype = {
            init: function(params) {
                this.params = params;
                this.trigger = document.querySelector(params.trigger);
                if(params.valueTo){
                  this.valueTo=document.querySelector(params.valueTo);
                }
                this.keys = params.keys;
                this.type = params.type||1;
                switch (this.type) {
                    case 1:
                    case 2:
                        break;
                    default:
                        throw new Error('错误提示: 没有这种数据源类型');
                        break;
                }
                this.bindEvent();
            },
            getData: function(callback) {
                var _self = this;
                if (typeof _self.params.data == "object") {
                    _self.data = _self.params.data;
                    callback();
                } else {
                    var xhr = new XMLHttpRequest();
                    xhr.open('get', _self.params.data);
                    xhr.onload = function(e) {
                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                            var responseData = JSON.parse(xhr.responseText);
                            _self.data = responseData.data;
                            if (callback) {
                                callback()
                            };
                        }
                    }
                    xhr.send();
                }
            },
            bindEvent: function() {
                var _self = this;
                //呼出插件
                function popupArea(e) {
                    _self.gearArea = document.createElement("div");
                    _self.gearArea.className = "gearArea";
                    _self.gearArea.innerHTML = '<div class="area_ctrl slideInUp">' +
                        '<div class="area_btn_box">' +
                        '<div class="area_btn larea_cancel">取消</div>' +
                        '<div class="area_btn larea_finish">确定</div>' +
                        '</div>' +
                        '<div class="area_roll_mask">' +
                        '<div class="area_roll">' +
                        '<div>' +
                        '<div class="gear area_province" data-areatype="area_province"></div>' +
                        '<div class="area_grid">' +
                        '</div>' +
                        '</div>' +
                        '<div>' +
                        '<div class="gear area_city" data-areatype="area_city"></div>' +
                        '<div class="area_grid">' +
                        '</div>' +
                        '</div>' +
                        '<div>' +
                        '<div class="gear area_county" data-areatype="area_county"></div>' +
                        '<div class="area_grid">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    document.body.appendChild(_self.gearArea);
                    areaCtrlInit();
                    var larea_cancel = _self.gearArea.querySelector(".larea_cancel");
                    larea_cancel.addEventListener('touchstart', function(e) {
                        _self.close(e);
                    });
                    var larea_finish = _self.gearArea.querySelector(".larea_finish");
                    larea_finish.addEventListener('touchstart', function(e) {
                        _self.finish(e);
                    });
                    var area_province = _self.gearArea.querySelector(".area_province");
                    var area_city = _self.gearArea.querySelector(".area_city");
                    var area_county = _self.gearArea.querySelector(".area_county");
                    area_province.addEventListener('touchstart', gearTouchStart);
                    area_city.addEventListener('touchstart', gearTouchStart);
                    area_county.addEventListener('touchstart', gearTouchStart);
                    area_province.addEventListener('touchmove', gearTouchMove);
                    area_city.addEventListener('touchmove', gearTouchMove);
                    area_county.addEventListener('touchmove', gearTouchMove);
                    area_province.addEventListener('touchend', gearTouchEnd);
                    area_city.addEventListener('touchend', gearTouchEnd);
                    area_county.addEventListener('touchend', gearTouchEnd);
                }
                //初始化插件默认值
                function areaCtrlInit() {
                    _self.gearArea.querySelector(".area_province").setAttribute("val", _self.value[0]);
                    _self.gearArea.querySelector(".area_city").setAttribute("val", _self.value[1]);
                    _self.gearArea.querySelector(".area_county").setAttribute("val", _self.value[2]);

                    switch (_self.type) {
                        case 1:
                            _self.setGearTooth(_self.data);
                            break;
                        case 2:
                            _self.setGearTooth(_self.data[0]);
                            break;
                    }
                }
                //触摸开始
                function gearTouchStart(e) {
                    e.preventDefault();
                    var target = e.target;
                    while (true) {
                        if (!target.classList.contains("gear")) {
                            target = target.parentElement;
                        } else {
                            break
                        }
                    }
                    clearInterval(target["int_" + target.id]);
                    target["old_" + target.id] = e.targetTouches[0].screenY;
                    target["o_t_" + target.id] = (new Date()).getTime();
                    var top = target.getAttribute('top');
                    if (top) {
                        target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
                    } else {
                        target["o_d_" + target.id] = 0;
                    }
                    target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
                }
                //手指移动
                function gearTouchMove(e) {
                    e.preventDefault();
                    var target = e.target;
                    while (true) {
                        if (!target.classList.contains("gear")) {
                            target = target.parentElement;
                        } else {
                            break
                        }
                    }
                    target["new_" + target.id] = e.targetTouches[0].screenY;
                    target["n_t_" + target.id] = (new Date()).getTime();
                    var f = (target["new_" + target.id] - target["old_" + target.id]) * 30 / window.innerHeight;
                    target["pos_" + target.id] = target["o_d_" + target.id] + f;
                    target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
                    target.setAttribute('top', target["pos_" + target.id] + 'em');
                    if(e.targetTouches[0].screenY<1){
                        gearTouchEnd(e);
                    };
                }
                //离开屏幕
                function gearTouchEnd(e) {
                    e.preventDefault();
                    var target = e.target;
                    while (true) {
                        if (!target.classList.contains("gear")) {
                            target = target.parentElement;
                        } else {
                            break;
                        }
                    }
                    var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
                    if (Math.abs(flag) <= 0.2) {
                        target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
                    } else {
                        if (Math.abs(flag) <= 0.5) {
                            target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
                        } else {
                            target["spd_" + target.id] = flag / 2;
                        }
                    }
                    if (!target["pos_" + target.id]) {
                        target["pos_" + target.id] = 0;
                    }
                    rollGear(target);
                }
                //缓动效果
                function rollGear(target) {
                    var d = 0;
                    var stopGear = false;
                    function setDuration() {
                        target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms';
                        stopGear = true;
                    }
                    clearInterval(target["int_" + target.id]);
                    target["int_" + target.id] = setInterval(function() {
                        var pos = target["pos_" + target.id];
                        var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
                        pos += speed;
                        if (Math.abs(speed) > 0.1) {} else {
                            var b = Math.round(pos / 2) * 2;
                            pos = b;
                            setDuration();
                        }
                        if (pos > 0) {
                            pos = 0;
                            setDuration();
                        }
                        var minTop = -(target.dataset.len - 1) * 2;
                        if (pos < minTop) {
                            pos = minTop;
                            setDuration();
                        }
                        if (stopGear) {
                            var gearVal = Math.abs(pos) / 2;
                            setGear(target, gearVal);
                            clearInterval(target["int_" + target.id]);
                        }
                        target["pos_" + target.id] = pos;
                        target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                        target.setAttribute('top', pos + 'em');
                        d++;
                    }, 30);
                }
                //控制插件滚动后停留的值
                function setGear(target, val) {
                    val = Math.round(val);
                    target.setAttribute("val", val);
                    switch (_self.type) {
                        case 1:
                             _self.setGearTooth(_self.data);
                            break;
                        case 2:
                         switch(target.dataset['areatype']){
                             case 'area_province':
                             _self.setGearTooth(_self.data[0]);
                                 break;
                             case 'area_city':
                                 var ref = target.childNodes[val].getAttribute('ref');
                                 var childData=[];
                                 var nextData= _self.data[2];
                                 for (var i in nextData) {
                                     if(i==ref){
                                        childData = nextData[i];
                                        break;
                                     }
                                 };
                            _self.index=2;
                            _self.setGearTooth(childData);
                                 break;
                         }
                    }
                    
                }
                _self.getData(function() {
                    _self.trigger.addEventListener('click', popupArea);
                });
            },
            //重置节点个数
            setGearTooth: function(data) {
                var _self = this;
                var item = data || [];
                var l = item.length;
                var gearChild = _self.gearArea.querySelectorAll(".gear");
                var gearVal = gearChild[_self.index].getAttribute('val');
                var maxVal = l - 1;
                if (gearVal > maxVal) {
                    gearVal = maxVal;
                }
                gearChild[_self.index].setAttribute('data-len', l);
                if (l > 0) {
                    var id = item[gearVal][this.keys['id']];
                    var childData;
                    switch (_self.type) {
                        case 1:
                        childData = item[gearVal].child
                            break;
                        case 2:
                         var nextData= _self.data[_self.index+1] 
                         for (var i in nextData) {
                             if(i==id){
                                childData = nextData[i];
                                break;
                             }
                         };
                            break;
                    }
                    var itemStr = "";
                    for (var i = 0; i < l; i++) {
                        itemStr += "<div class='tooth'  ref='" + item[i][this.keys['id']] + "'>" + item[i][this.keys['name']] + "</div>";
                    }
                    gearChild[_self.index].innerHTML = itemStr;
                    gearChild[_self.index].style["-webkit-transform"] = 'translate3d(0,' + (-gearVal * 2) + 'em,0)';
                    gearChild[_self.index].setAttribute('top', -gearVal * 2 + 'em');
                    gearChild[_self.index].setAttribute('val', gearVal);
                    _self.index++;
                    if (_self.index > 2) {
                        _self.index = 0;
                        return;
                    }
                    _self.setGearTooth(childData);
                } else {
                    gearChild[_self.index].innerHTML = "<div class='tooth'></div>";
                    gearChild[_self.index].setAttribute('val', 0);
                    if(_self.index==1){
                        gearChild[2].innerHTML = "<div class='tooth'></div>";
                        gearChild[2].setAttribute('val', 0);
                    }
                    _self.index = 0;
                }
            },
            finish: function(e) {
                var _self = this;
                var area_province = _self.gearArea.querySelector(".area_province");
                var area_city = _self.gearArea.querySelector(".area_city");
                var area_county = _self.gearArea.querySelector(".area_county");
                var provinceVal = parseInt(area_province.getAttribute("val"));
                var provinceText = area_province.childNodes[provinceVal].textContent;
                var provinceCode = area_province.childNodes[provinceVal].getAttribute('ref');
                var cityVal = parseInt(area_city.getAttribute("val"));
                var cityText = area_city.childNodes[cityVal].textContent;
                var cityCode = area_city.childNodes[cityVal].getAttribute('ref');
                var countyVal = parseInt(area_county.getAttribute("val"));
                var countyText = area_county.childNodes[countyVal].textContent;
                var countyCode = area_county.childNodes[countyVal].getAttribute('ref');
                _self.trigger.value = (provinceText + ((cityText)?(',' + cityText):(''))+ ((countyText)?(',' + countyText):(''))).replace(",市辖区","").replace(",县","");
                _self.value = [provinceVal, cityVal, countyVal];
                if(this.valueTo){
                    this.valueTo.value= provinceCode +((cityCode)?(',' + cityCode):('')) + ((countyCode)?(',' + countyCode):(''));
                }
                _self.close(e);
            },
            close: function(e) {
                e.preventDefault();
                var _self = this;
                var evt = new CustomEvent('input');
                _self.trigger.dispatchEvent(evt);
                document.body.removeChild(_self.gearArea);
                _self.gearArea=null;
            }
        }
        return MobileArea;
    })()
    // 选择时间插件
    DingeTools.LCalendar = (function() {
        var MobileCalendar = function() {
            this.gearDate;
            this.minY = 1900;
            this.minM = 1;
            this.minD = 1;
            this.maxY = 2099;
            this.maxM = 12;
            this.maxD = 31;
        }
        MobileCalendar.prototype = {
            init: function(params) {
                this.type = params.type;
                this.trigger = document.querySelector(params.trigger);
                if (this.trigger.getAttribute("data-lcalendar") != null) {
                    var arr = this.trigger.getAttribute("data-lcalendar").split(',');
                    var minArr = arr[0].split('-');
                    this.minY = ~~minArr[0];
                    this.minM = ~~minArr[1];
                    this.minD = ~~minArr[2];
                    var maxArr = arr[1].split('-');
                    this.maxY = ~~maxArr[0];
                    this.maxM = ~~maxArr[1];
                    this.maxD = ~~maxArr[2];
                }
                if (params.minDate) {
                    var minArr = params.minDate.split('-');
                    this.minY = ~~minArr[0];
                    this.minM = ~~minArr[1];
                    this.minD = ~~minArr[2];
                }
                if (params.maxDate) {
                    var maxArr = params.maxDate.split('-');
                    this.maxY = ~~maxArr[0];
                    this.maxM = ~~maxArr[1];
                    this.maxD = ~~maxArr[2];
                }
                this.bindEvent(this.type);
            },
            bindEvent: function(type) {
                var _self = this;
                //呼出日期插件
                function popupDate(e) {
                    _self.gearDate = document.createElement("div");
                    _self.gearDate.className = "gearDate";
                    _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                        '<div class="date_btn_box">' +
                        '<div class="date_btn lcalendar_cancel">取消</div>' +
                        '<div class="date_btn lcalendar_finish">确定</div>' +
                        '</div>' +
                        '<div class="date_roll_mask">' +
                        '<div class="date_roll">' +
                        '<div>' +
                        '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                        '<div class="date_grid">' +
                        '<div>年</div>' +
                        '</div>' +
                        '</div>' +
                        '<div>' +
                        '<div class="gear date_mm" data-datetype="date_mm"></div>' +
                        '<div class="date_grid">' +
                        '<div>月</div>' +
                        '</div>' +
                        '</div>' +
                        '<div>' +
                        '<div class="gear date_dd" data-datetype="date_dd"></div>' +
                        '<div class="date_grid">' +
                        '<div>日</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    document.body.appendChild(_self.gearDate);
                    dateCtrlInit();
                    var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                    lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
                    var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                    lcalendar_finish.addEventListener('touchstart', finishMobileDate);
                    var date_yy = _self.gearDate.querySelector(".date_yy");
                    var date_mm = _self.gearDate.querySelector(".date_mm");
                    var date_dd = _self.gearDate.querySelector(".date_dd");
                    date_yy.addEventListener('touchstart', gearTouchStart);
                    date_mm.addEventListener('touchstart', gearTouchStart);
                    date_dd.addEventListener('touchstart', gearTouchStart);
                    date_yy.addEventListener('touchmove', gearTouchMove);
                    date_mm.addEventListener('touchmove', gearTouchMove);
                    date_dd.addEventListener('touchmove', gearTouchMove);
                    date_yy.addEventListener('touchend', gearTouchEnd);
                    date_mm.addEventListener('touchend', gearTouchEnd);
                    date_dd.addEventListener('touchend', gearTouchEnd);
                }
                //初始化年月日插件默认值
                function dateCtrlInit() {
                    var date = new Date();
                    var dateArr = {
                        yy: date.getFullYear(),
                        mm: date.getMonth(),
                        dd: date.getDate() - 1
                    };
                    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(_self.trigger.value)) {
                        var rs = _self.trigger.value.match(/(^|-)\d{1,4}/g);
                        dateArr.yy = rs[0] - _self.minY;
                        dateArr.mm = rs[1].replace(/-/g, "") - 1;
                        dateArr.dd = rs[2].replace(/-/g, "") - 1;
                    } else {
                        dateArr.yy = dateArr.yy - _self.minY;
                    }
                    _self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
                    _self.gearDate.querySelector(".date_mm").setAttribute("val", dateArr.mm);
                    _self.gearDate.querySelector(".date_dd").setAttribute("val", dateArr.dd);
                    setDateGearTooth();
                }
                //呼出年月插件
                function popupYM(e) {
                    _self.gearDate = document.createElement("div");
                    _self.gearDate.className = "gearDate";
                    _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                        '<div class="date_btn_box">' +
                        '<div class="date_btn lcalendar_cancel">取消</div>' +
                        '<div class="date_btn lcalendar_finish">确定</div>' +
                        '</div>' +
                        '<div class="date_roll_mask">' +
                        '<div class="ym_roll">' +
                        '<div>' +
                        '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                        '<div class="date_grid">' +
                        '<div>年</div>' +
                        '</div>' +
                        '</div>' +
                        '<div>' +
                        '<div class="gear date_mm" data-datetype="date_mm"></div>' +
                        '<div class="date_grid">' +
                        '<div>月</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    document.body.appendChild(_self.gearDate);
                    ymCtrlInit();
                    var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                    lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
                    var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                    lcalendar_finish.addEventListener('touchstart', finishMobileYM);
                    var date_yy = _self.gearDate.querySelector(".date_yy");
                    var date_mm = _self.gearDate.querySelector(".date_mm");
                    date_yy.addEventListener('touchstart', gearTouchStart);
                    date_mm.addEventListener('touchstart', gearTouchStart);
                    date_yy.addEventListener('touchmove', gearTouchMove);
                    date_mm.addEventListener('touchmove', gearTouchMove);
                    date_yy.addEventListener('touchend', gearTouchEnd);
                    date_mm.addEventListener('touchend', gearTouchEnd);
                }
                //初始化年月插件默认值
                function ymCtrlInit() {
                    var date = new Date();
                    var dateArr = {
                        yy: date.getFullYear(),
                        mm: date.getMonth()
                    };
                    if (/^\d{4}-\d{1,2}$/.test(_self.trigger.value)) {
                        rs = _self.trigger.value.match(/(^|-)\d{1,4}/g);
                        dateArr.yy = rs[0] - _self.minY;
                        dateArr.mm = rs[1].replace(/-/g, "") - 1;
                    } else {
                        dateArr.yy = dateArr.yy - _self.minY;
                    }
                    _self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
                    _self.gearDate.querySelector(".date_mm").setAttribute("val", dateArr.mm);
                    setDateGearTooth();
                }
                //呼出日期+时间插件
                function popupDateTime(e) {
                    _self.gearDate = document.createElement("div");
                    _self.gearDate.className = "gearDatetime";
                    _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                        '<div class="date_btn_box">' +
                        '<div class="date_btn lcalendar_cancel">取消</div>' +
                        '<div class="date_btn lcalendar_finish">确定</div>' +
                        '</div>' +
                        '<div class="date_roll_mask">' +
                        '<div class="datetime_roll">' +
                        '<div>' +
                        '<div class="gear date_yy" data-datetype="date_yy"></div>' +
                        '<div class="date_grid">' +
                        '<div>年</div>' +
                        '</div>' +
                        '</div>' +
                        '<div>' +
                        '<div class="gear date_mm" data-datetype="date_mm"></div>' +
                        '<div class="date_grid">' +
                        '<div>月</div>' +
                        '</div>' +
                        '</div>' +
                        '<div>' +
                        '<div class="gear date_dd" data-datetype="date_dd"></div>' +
                        '<div class="date_grid">' +
                        '<div>日</div>' +
                        '</div>' +
                        '</div>' +
                        '<div>' +
                        '<div class="gear time_hh" data-datetype="time_hh"></div>' +
                        '<div class="date_grid">' +
                        '<div>时</div>' +
                        '</div>' +
                        '</div>' +
                        '<div>' +
                        '<div class="gear time_mm" data-datetype="time_mm"></div>' +
                        '<div class="date_grid">' +
                        '<div>分</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' + //date_roll
                        '</div>' + //date_roll_mask
                        '</div>';
                    document.body.appendChild(_self.gearDate);
                    dateTimeCtrlInit();
                    var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                    lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
                    var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                    lcalendar_finish.addEventListener('touchstart', finishMobileDateTime);
                    var date_yy = _self.gearDate.querySelector(".date_yy");
                    var date_mm = _self.gearDate.querySelector(".date_mm");
                    var date_dd = _self.gearDate.querySelector(".date_dd");
                    var time_hh = _self.gearDate.querySelector(".time_hh");
                    var time_mm = _self.gearDate.querySelector(".time_mm");
                    date_yy.addEventListener('touchstart', gearTouchStart);
                    date_mm.addEventListener('touchstart', gearTouchStart);
                    date_dd.addEventListener('touchstart', gearTouchStart);
                    time_hh.addEventListener('touchstart', gearTouchStart);
                    time_mm.addEventListener('touchstart', gearTouchStart);
                    date_yy.addEventListener('touchmove', gearTouchMove);
                    date_mm.addEventListener('touchmove', gearTouchMove);
                    date_dd.addEventListener('touchmove', gearTouchMove);
                    time_hh.addEventListener('touchmove', gearTouchMove);
                    time_mm.addEventListener('touchmove', gearTouchMove);
                    date_yy.addEventListener('touchend', gearTouchEnd);
                    date_mm.addEventListener('touchend', gearTouchEnd);
                    date_dd.addEventListener('touchend', gearTouchEnd);
                    time_hh.addEventListener('touchend', gearTouchEnd);
                    time_mm.addEventListener('touchend', gearTouchEnd);
                }
                //初始化年月日时分插件默认值
                function dateTimeCtrlInit() {
                    var date = new Date();
                    var dateArr = {
                        yy: date.getFullYear(),
                        mm: date.getMonth(),
                        dd: date.getDate() - 1,
                        hh: date.getHours(),
                        mi: date.getMinutes()
                    };
                    if (/^\d{4}-\d{1,2}-\d{1,2}\s\d{2}:\d{2}$/.test(_self.trigger.value)) {
                        var rs = _self.trigger.value.match(/(^|-|\s|:)\d{1,4}/g);
                        dateArr.yy = rs[0] - _self.minY;
                        dateArr.mm = rs[1].replace(/-/g, "") - 1;
                        dateArr.dd = rs[2].replace(/-/g, "") - 1;
                        dateArr.hh = parseInt(rs[3].replace(/\s0?/g, ""));
                        dateArr.mi = parseInt(rs[4].replace(/:0?/g, ""));
                    } else {
                        dateArr.yy = dateArr.yy - _self.minY;
                    }
                    _self.gearDate.querySelector(".date_yy").setAttribute("val", dateArr.yy);
                    _self.gearDate.querySelector(".date_mm").setAttribute("val", dateArr.mm);
                    _self.gearDate.querySelector(".date_dd").setAttribute("val", dateArr.dd);
                    setDateGearTooth();
                    _self.gearDate.querySelector(".time_hh").setAttribute("val", dateArr.hh);
                    _self.gearDate.querySelector(".time_mm").setAttribute("val", dateArr.mi);
                    setTimeGearTooth();
                }
                //呼出时间插件
                function popupTime(e) {
                    _self.gearDate = document.createElement("div");
                    _self.gearDate.className = "gearDate";
                    _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
                        '<div class="date_btn_box">' +
                        '<div class="date_btn lcalendar_cancel">取消</div>' +
                        '<div class="date_btn lcalendar_finish">确定</div>' +
                        '</div>' +
                        '<div class="date_roll_mask">' +
                        '<div class="time_roll">' +
                        '<div>' +
                        '<div class="gear time_hh" data-datetype="time_hh"></div>' +
                        '<div class="date_grid">' +
                        '<div>时</div>' +
                        '</div>' +
                        '</div>' +
                        '<div>' +
                        '<div class="gear time_mm" data-datetype="time_mm"></div>' +
                        '<div class="date_grid">' +
                        '<div>分</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' + //time_roll
                        '</div>' +
                        '</div>';
                    document.body.appendChild(_self.gearDate);
                    timeCtrlInit();
                    var lcalendar_cancel = _self.gearDate.querySelector(".lcalendar_cancel");
                    lcalendar_cancel.addEventListener('touchstart', closeMobileCalendar);
                    var lcalendar_finish = _self.gearDate.querySelector(".lcalendar_finish");
                    lcalendar_finish.addEventListener('touchstart', finishMobileTime);
                    var time_hh = _self.gearDate.querySelector(".time_hh");
                    var time_mm = _self.gearDate.querySelector(".time_mm");
                    time_hh.addEventListener('touchstart', gearTouchStart);
                    time_mm.addEventListener('touchstart', gearTouchStart);
                    time_hh.addEventListener('touchmove', gearTouchMove);
                    time_mm.addEventListener('touchmove', gearTouchMove);
                    time_hh.addEventListener('touchend', gearTouchEnd);
                    time_mm.addEventListener('touchend', gearTouchEnd);
                }
                //初始化时分插件默认值
                function timeCtrlInit() {
                    var d = new Date();
                    var e = {
                        hh: d.getHours(),
                        mm: d.getMinutes()
                    };
                    if (/^\d{2}:\d{2}$/.test(_self.trigger.value)) {
                        rs = _self.trigger.value.match(/(^|:)\d{2}/g);
                        e.hh = parseInt(rs[0].replace(/^0?/g, ""));
                        e.mm = parseInt(rs[1].replace(/:0?/g, ""))
                    }
                    _self.gearDate.querySelector(".time_hh").setAttribute("val", e.hh);
                    _self.gearDate.querySelector(".time_mm").setAttribute("val", e.mm);
                    setTimeGearTooth();
                }
                //重置日期节点个数
                function setDateGearTooth() {
                    var passY = _self.maxY - _self.minY + 1;
                    var date_yy = _self.gearDate.querySelector(".date_yy");
                    var itemStr = "";
                    if (date_yy && date_yy.getAttribute("val")) {
                        //得到年份的值
                        var yyVal = parseInt(date_yy.getAttribute("val"));
                        //p 当前节点前后需要展示的节点个数
                        for (var p = 0; p <= passY - 1; p++) {
                            itemStr += "<div class='tooth'>" + (_self.minY + p) + "</div>";
                        }
                        date_yy.innerHTML = itemStr;
                        var top = Math.floor(parseFloat(date_yy.getAttribute('top')));
                        if (!isNaN(top)) {
                            top % 2 == 0 ? (top = top) : (top = top + 1);
                            top > 8 && (top = 8);
                            var minTop = 8 - (passY - 1) * 2;
                            top < minTop && (top = minTop);
                            date_yy.style["-webkit-transform"] = 'translate3d(0,' + top + 'em,0)';
                            date_yy.setAttribute('top', top + 'em');
                            yyVal = Math.abs(top - 8) / 2;
                            date_yy.setAttribute("val", yyVal);
                        } else {
                            date_yy.style["-webkit-transform"] = 'translate3d(0,' + (8 - yyVal * 2) + 'em,0)';
                            date_yy.setAttribute('top', 8 - yyVal * 2 + 'em');
                        }
                    } else {
                        return;
                    }
                    var date_mm = _self.gearDate.querySelector(".date_mm");
                    if (date_mm && date_mm.getAttribute("val")) {
                        itemStr = "";
                        //得到月份的值
                        var mmVal = parseInt(date_mm.getAttribute("val"));
                        var maxM = 11;
                        var minM = 0;
                        //当年份到达最大值
                        if (yyVal == passY - 1) {
                            maxM = _self.maxM - 1;
                        }
                        //当年份到达最小值
                        if (yyVal == 0) {
                            minM = _self.minM - 1;
                        }
                        //p 当前节点前后需要展示的节点个数
                        for (var p = 0; p < maxM - minM + 1; p++) {
                            itemStr += "<div class='tooth'>" + (minM + p + 1) + "</div>";
                        }
                        date_mm.innerHTML = itemStr;
                        if (mmVal > maxM) {
                            mmVal = maxM;
                            date_mm.setAttribute("val", mmVal);
                        } else if (mmVal < minM) {
                            mmVal = maxM;
                            date_mm.setAttribute("val", mmVal);
                        }
                        date_mm.style["-webkit-transform"] = 'translate3d(0,' + (8 - (mmVal - minM) * 2) + 'em,0)';
                        date_mm.setAttribute('top', 8 - (mmVal - minM) * 2 + 'em');
                    } else {
                        return;
                    }
                    var date_dd = _self.gearDate.querySelector(".date_dd");
                    if (date_dd && date_dd.getAttribute("val")) {
                        itemStr = "";
                        //得到日期的值
                        var ddVal = parseInt(date_dd.getAttribute("val"));
                        //返回月份的天数
                        var maxMonthDays = calcDays(yyVal, mmVal);
                        //p 当前节点前后需要展示的节点个数
                        var maxD = maxMonthDays - 1;
                        var minD = 0;
                        //当年份月份到达最大值
                        if (yyVal == passY - 1 && _self.maxM == mmVal + 1) {
                            maxD = _self.maxD - 1;
                        }
                        //当年、月到达最小值
                        if (yyVal == 0 && _self.minM == mmVal + 1) {
                            minD = _self.minD - 1;
                        }
                        for (var p = 0; p < maxD - minD + 1; p++) {
                            itemStr += "<div class='tooth'>" + (minD + p + 1) + "</div>";
                        }
                        date_dd.innerHTML = itemStr;
                        if (ddVal > maxD) {
                            ddVal = maxD;
                            date_dd.setAttribute("val", ddVal);
                        } else if (ddVal < minD) {
                            ddVal = minD;
                            date_dd.setAttribute("val", ddVal);
                        }
                        date_dd.style["-webkit-transform"] = 'translate3d(0,' + (8 - (ddVal - minD) * 2) + 'em,0)';
                        date_dd.setAttribute('top', 8 - (ddVal - minD) * 2 + 'em');
                    } else {
                        return;
                    }
                }
                //重置时间节点个数
                function setTimeGearTooth() {
                    var time_hh = _self.gearDate.querySelector(".time_hh");
                    if (time_hh && time_hh.getAttribute("val")) {
                        var i = "";
                        var hhVal = parseInt(time_hh.getAttribute("val"));
                        for (var g = 0; g <= 23; g++) {
                            i += "<div class='tooth'>" + g + "</div>";
                        }
                        time_hh.innerHTML = i;
                        time_hh.style["-webkit-transform"] = 'translate3d(0,' + (8 - hhVal * 2) + 'em,0)';
                        time_hh.setAttribute('top', 8 - hhVal * 2 + 'em');
                    } else {
                        return
                    }
                    var time_mm = _self.gearDate.querySelector(".time_mm");
                    if (time_mm && time_mm.getAttribute("val")) {
                        var i = "";
                        var mmVal = parseInt(time_mm.getAttribute("val"));
                        for (var g = 0; g <= 59; g++) {
                            i += "<div class='tooth'>" + g + "</div>";
                        }
                        time_mm.innerHTML = i;
                        time_mm.style["-webkit-transform"] = 'translate3d(0,' + (8 - mmVal * 2) + 'em,0)';
                        time_mm.setAttribute('top', 8 - mmVal * 2 + 'em');
                    } else {
                        return
                    }
                }
                //求月份最大天数
                function calcDays(year, month) {
                    if (month == 1) {
                        year += _self.minY;
                        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0 && year % 4000 != 0)) {
                            return 29;
                        } else {
                            return 28;
                        }
                    } else {
                        if (month == 3 || month == 5 || month == 8 || month == 10) {
                            return 30;
                        } else {
                            return 31;
                        }
                    }
                }
                //触摸开始
                function gearTouchStart(e) {
                    e.preventDefault();
                    var target = e.target;
                    while (true) {
                        if (!target.classList.contains("gear")) {
                            target = target.parentElement;
                        } else {
                            break
                        }
                    }
                    clearInterval(target["int_" + target.id]);
                    target["old_" + target.id] = e.targetTouches[0].screenY;
                    target["o_t_" + target.id] = (new Date()).getTime();
                    var top = target.getAttribute('top');
                    if (top) {
                        target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
                    } else {
                        target["o_d_" + target.id] = 0;
                    }
                    target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
                }
                //手指移动
                function gearTouchMove(e) {
                    e.preventDefault();
                    var target = e.target;
                    while (true) {
                        if (!target.classList.contains("gear")) {
                            target = target.parentElement;
                        } else {
                            break
                        }
                    }
                    target["new_" + target.id] = e.targetTouches[0].screenY;
                    target["n_t_" + target.id] = (new Date()).getTime();
                    var f = (target["new_" + target.id] - target["old_" + target.id]) * 30 / window.innerHeight;
                    target["pos_" + target.id] = target["o_d_" + target.id] + f;
                    target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
                    target.setAttribute('top', target["pos_" + target.id] + 'em');
                    if (e.targetTouches[0].screenY < 1) {
                        gearTouchEnd(e);
                    };
                }
                //离开屏幕
                function gearTouchEnd(e) {
                    e.preventDefault();
                    var target = e.target;
                    while (true) {
                        if (!target.classList.contains("gear")) {
                            target = target.parentElement;
                        } else {
                            break;
                        }
                    }
                    var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
                    if (Math.abs(flag) <= 0.2) {
                        target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
                    } else {
                        if (Math.abs(flag) <= 0.5) {
                            target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
                        } else {
                            target["spd_" + target.id] = flag / 2;
                        }
                    }
                    if (!target["pos_" + target.id]) {
                        target["pos_" + target.id] = 0;
                    }
                    rollGear(target);
                }
                //缓动效果
                function rollGear(target) {
                    var d = 0;
                    var stopGear = false;

                    function setDuration() {
                        target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms';
                        stopGear = true;
                    }
                    var passY = _self.maxY - _self.minY + 1;
                    clearInterval(target["int_" + target.id]);
                    target["int_" + target.id] = setInterval(function() {
                        var pos = target["pos_" + target.id];
                        var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
                        pos += speed;
                        if (Math.abs(speed) > 0.1) {} else {
                            var b = Math.round(pos / 2) * 2;
                            pos = b;
                            setDuration();
                        }
                        if (pos > 8) {
                            pos = 8;
                            setDuration();
                        }
                        switch (target.dataset.datetype) {
                            case "date_yy":
                                var minTop = 8 - (passY - 1) * 2;
                                if (pos < minTop) {
                                    pos = minTop;
                                    setDuration();
                                }
                                if (stopGear) {
                                    var gearVal = Math.abs(pos - 8) / 2;
                                    setGear(target, gearVal);
                                    clearInterval(target["int_" + target.id]);
                                }
                                break;
                            case "date_mm":
                                var date_yy = _self.gearDate.querySelector(".date_yy");
                                //得到年份的值
                                var yyVal = parseInt(date_yy.getAttribute("val"));
                                var maxM = 11;
                                var minM = 0;
                                //当年份到达最大值
                                if (yyVal == passY - 1) {
                                    maxM = _self.maxM - 1;
                                }
                                //当年份到达最小值
                                if (yyVal == 0) {
                                    minM = _self.minM - 1;
                                }
                                var minTop = 8 - (maxM - minM) * 2;
                                if (pos < minTop) {
                                    pos = minTop;
                                    setDuration();
                                }
                                if (stopGear) {
                                    var gearVal = Math.abs(pos - 8) / 2 + minM;
                                    setGear(target, gearVal);
                                    clearInterval(target["int_" + target.id]);
                                }
                                break;
                            case "date_dd":
                                var date_yy = _self.gearDate.querySelector(".date_yy");
                                var date_mm = _self.gearDate.querySelector(".date_mm");
                                //得到年份的值
                                var yyVal = parseInt(date_yy.getAttribute("val"));
                                //得到月份的值
                                var mmVal = parseInt(date_mm.getAttribute("val"));
                                //返回月份的天数
                                var maxMonthDays = calcDays(yyVal, mmVal);
                                var maxD = maxMonthDays - 1;
                                var minD = 0;
                                //当年份月份到达最大值
                                if (yyVal == passY - 1 && _self.maxM == mmVal + 1) {
                                    maxD = _self.maxD - 1;
                                }
                                //当年、月到达最小值
                                if (yyVal == 0 && _self.minM == mmVal + 1) {
                                    minD = _self.minD - 1;
                                }
                                var minTop = 8 - (maxD - minD) * 2;
                                if (pos < minTop) {
                                    pos = minTop;
                                    setDuration();
                                }
                                if (stopGear) {
                                    var gearVal = Math.abs(pos - 8) / 2 + minD;
                                    setGear(target, gearVal);
                                    clearInterval(target["int_" + target.id]);
                                }
                                break;
                            case "time_hh":
                                if (pos < -38) {
                                    pos = -38;
                                    setDuration();
                                }
                                if (stopGear) {
                                    var gearVal = Math.abs(pos - 8) / 2;
                                    setGear(target, gearVal);
                                    clearInterval(target["int_" + target.id]);
                                }
                                break;
                            case "time_mm":
                                if (pos < -110) {
                                    pos = -110;
                                    setDuration();
                                }
                                if (stopGear) {
                                    var gearVal = Math.abs(pos - 8) / 2;
                                    setGear(target, gearVal);
                                    clearInterval(target["int_" + target.id]);
                                }
                                break;
                            default:
                        }
                        target["pos_" + target.id] = pos;
                        target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                        target.setAttribute('top', pos + 'em');
                        d++;
                    }, 30);
                }
                //控制插件滚动后停留的值
                function setGear(target, val) {
                    val = Math.round(val);
                    target.setAttribute("val", val);
                    if (/date/.test(target.dataset.datetype)) {
                        setDateGearTooth();
                    } else {
                        setTimeGearTooth();
                    }
                }
                //取消
                function closeMobileCalendar(e) {
                    e.preventDefault();
                    var evt;
                    try {
                        evt = new CustomEvent('input');
                    } catch (e) {
                        //兼容旧浏览器(注意：该方法已从最新的web标准中删除)
                        evt = document.createEvent('Event');
                        evt.initEvent('input', true, true);
                    }
                    _self.trigger.dispatchEvent(evt);
                    _self.gearDate.className = 'gearDate gearDate_out';
                    setTimeout(function(){
                        document.body.removeChild(_self.gearDate);
                        _self.gearDate=null;
                    },500)
                }

                //日期确认
                function finishMobileDate(e) {
                    var passY = _self.maxY - _self.minY + 1;
                    var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                    var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
                    date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
                    var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
                    date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
                    _self.trigger.value = (date_yy % passY + _self.minY) + "-" + date_mm + "-" + date_dd;
                    closeMobileCalendar(e);
                }
                //年月确认
                function finishMobileYM(e) {
                    var passY = _self.maxY - _self.minY + 1;
                    var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                    var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
                    date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
                    _self.trigger.value = (date_yy % passY + _self.minY) + "-" + date_mm;
                    closeMobileCalendar(e);
                }
                //日期时间确认
                function finishMobileDateTime(e) {
                    var passY = _self.maxY - _self.minY + 1;
                    var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
                    var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
                    date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
                    var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
                    date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
                    var time_hh = parseInt(Math.round(_self.gearDate.querySelector(".time_hh").getAttribute("val")));
                    time_hh = time_hh > 9 ? time_hh : '0' + time_hh;
                    var time_mm = parseInt(Math.round(_self.gearDate.querySelector(".time_mm").getAttribute("val")));
                    time_mm = time_mm > 9 ? time_mm : '0' + time_mm;
                    _self.trigger.value = (date_yy % passY + _self.minY) + "-" + date_mm + "-" + date_dd + " " + (time_hh.length < 2 ? "0" : "") + time_hh + (time_mm.length < 2 ? ":0" : ":") + time_mm;
                    closeMobileCalendar(e);
                }
                //时间确认
                function finishMobileTime(e) {
                    var time_hh = parseInt(Math.round(_self.gearDate.querySelector(".time_hh").getAttribute("val")));
                    time_hh = time_hh > 9 ? time_hh : '0' + time_hh;
                    var time_mm = parseInt(Math.round(_self.gearDate.querySelector(".time_mm").getAttribute("val")));
                    time_mm = time_mm > 9 ? time_mm : '0' + time_mm;
                    _self.trigger.value = (time_hh.length < 2 ? "0" : "") + time_hh + (time_mm.length < 2 ? ":0" : ":") + time_mm;
                    closeMobileCalendar(e);
                }
                _self.trigger.addEventListener('click', {
                    "ym": popupYM,
                    "date": popupDate,
                    "datetime": popupDateTime,
                    "time": popupTime
                }[type]);
            }
        }
        return MobileCalendar;
    })()
    DingeTools.LUploader = function(el, params) {
        var _self = this;
        _self.trigger=el;
        _self.params = {
            accept: 'image/*',
            multiple: false,
            maxsize: 102400,
            imgObj: {},
            showsize: false,
            quality:0.8,
            url: ''
        }
        for (var param in params) {
            _self.params[param] = params[param];
        }
        _self.init();
    };
    DingeTools.LUploader.prototype.init = function() {
        var _self = this;
        _self.trigger.setAttribute('accept', _self.params.accept);
        _self.params.multiple && _self.trigger.setAttribute('multiple', '');

        var btn = document.querySelector('#' + _self.trigger.getAttribute('data-LUploader'));
        btn.addEventListener('click', function() {
            _self.trigger.click();
        });
        _self.trigger.addEventListener('change', function() {
            if (!this.files.length) return;
            var files = Array.prototype.slice.call(this.files);
            files.forEach(function(file, i) {
                if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
                var reader = new FileReader();
                _self.params.imgObj.size = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024)) / 10 + "MB" : ~~(file.size / 1024) + "KB";
                var li = document.createElement("li");
                li.innerHTML = '<div class="LUploader-progress"><span></span></div>';
                if (_self.params.showsize) {
                    var div_size = document.createElement('div');
                    div_size.className = 'LUploader-size';
                    div_size.textContent = _self.params.imgObj.size;
                    li.appendChild(div_size);
                }
                var LUploaderList = _self.trigger.parentElement.querySelector('.LUploader-list');
                if (!_self.params.multiple) { //假如是单个上传
                    if (_self.old_li) {
                        LUploaderList.removeChild(_self.old_li);
                    } else {
                        _self.old_li = li;
                    }
                }
                LUploaderList.appendChild(li);
                LUploaderList.parentElement.nextElementSibling.style['display'] = 'none';
                reader.onload = function() {
                    var params = dataSet(_self.trigger);
                    var url = _self.params.url;
                    var result = this.result;
                    var img = new Image();
                    _self.params.imgObj.src = img.src = result;
                    console.log(_self)
                    li.style['background-image'] = 'url(' + result + ')';
                    if (result.length <= _self.params.maxsize) {
                        img = null;
                        _self.upload(url, params, result, file.type, li);
                        return;
                    }
                    if (img.complete) {
                        callback();
                    } else {
                        img.onload = callback;
                    }

                    function callback() {
                        var data = _self.compress(img);
                        _self.upload(url, params, data, file.type, li);
                        img = null;
                    }
                };
                reader.readAsDataURL(file);
            });
        });
    };
    DingeTools.LUploader.prototype.compress = function(img) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        var moreCanvas = document.createElement("canvas");
        var morectx = moreCanvas.getContext("2d");
        var maxsize = 100 * 1024;
        var width = img.width;
        var height = img.height;
        var ratio;
        if ((ratio = width * height / 4000000) > 1) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        } else {
            ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        var count;
        if ((count = width * height / 1000000) > 1) {
            count = ~~(Math.sqrt(count) + 1);
            var nw = ~~(width / count);
            var nh = ~~(height / count);
            moreCanvas.width = nw;
            moreCanvas.height = nh;
            for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                    morectx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                    ctx.drawImage(moreCanvas, i * nw, j * nh, nw, nh);
                }
            }
        } else {
            ctx.drawImage(img, 0, 0, width, height);
        }
        var ndata = canvas.toDataURL('image/jpeg', this.params.quality);
        moreCanvas.width = moreCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
    };
    DingeTools.LUploader.prototype.upload = function(url, obj, basestr, type, li) {
        var text = window.atob(basestr.split(",")[1]);
        var buffer = new Uint8Array(text.length);
        var pecent = 0;
        for (var i = 0; i < text.length; i++) {
            buffer[i] = text.charCodeAt(i);
        }
        var span = li.querySelector('.LUploader-progress').querySelector('span');
        var xhr = new XMLHttpRequest();
        xhr.open('post', url);
        xhr.onload = function(e) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                var data = JSON.parse(xhr.responseText);
                var result = data['status'];
                if(result == 1){
                    document.getElementById("user_carouse").src = data.url 
                }
                var text = result == 0 ? '上传成功' : '上传失败';
                span.style['width'] = '100%';
                span.innerHTML = text;
            }
            else {
                span.innerHTML = '上传失败';
            }
        }
        xhr.upload.addEventListener('progress', function(e) {
            pecent = ~~(100 * e.loaded / e.total);
            span.style['width'] = pecent + '%';
            span.innerHTML = (pecent == 100 ? 99 : pecent) + '%';
        }, false);
        var data = {};
        for (var key in obj) {
            if (key !== 'luploader') {
                if (obj[key] == 'basestr') {
                    data[key] = basestr;
                } else {
                    data[key] = obj[key];
                }
            }
        };
        data = serializeObject(data);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(data);
    }

    function isArray(arr) {
        if (Object.prototype.toString.apply(arr) === '[object Array]') return true;
        else return false;
    };

    function serializeObject(obj) {
        if (typeof obj === 'string') return obj;
        var resultArray = [];
        var separator = '&';
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (isArray(obj[prop])) {
                    var toPush = [];
                    for (var i = 0; i < obj[prop].length; i++) {
                        toPush.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop][i]));
                    }
                    if (toPush.length > 0) resultArray.push(toPush.join(separator));
                } else {
                    resultArray.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
                }
            }

        }
        return resultArray.join(separator);
    };

    function dataSet(el) {
        var dataset = {};
        for (var i = 0; i < el.attributes.length; i++) {
            var attr = el.attributes[i];
            if (attr.name.indexOf('data-') >= 0) {
                dataset[toCamelCase(attr.name.split('data-')[1])] = attr.value;
            }
        }
        return dataset;
    }

    function toCamelCase(string) {
        return string.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    };
    var tools = $.extend({}, DingeTools, Api);
    function objCreat(proto){
        function Create(){}
        Create.prototype = proto;
        return new Create();
    }
    module.exports = objCreat(tools);
})(jQuery);
