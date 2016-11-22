/*
 *   @API接口
 *       #Author   xiusiteng
 *       #createAt   2016-11-18
 *       #question   使用fetch  
 *   适应方式：  1.改写api方法  2.改写storage 
 */
var $ = require("jQuery");

function API (opt) {
    this.env = opt.env;
    this.URL = opt.url;
    this.requestNum = 0;
    this.cacheTime = opt.cacheTime || 0;
    this.showLoading =  opt.showLoading || function(){};
    this.closeLoading = opt.closeLoading || function(){};
}
API.prototype = {
    /*
     * 请求函数
     */
    api: function (opt, storage, controls) {
        var self = this;
        return $.ajax({
            url: opt.url || "",
            data: opt.data || {},
            method: opt.method || "GET",
            datatype: "json",
            beforeSend: function() {
                self.requestNum++;
                self.showLoading();
            },
            complete: function(data) {
                if(data.responseJSON.status == 1) {
                    var value;
                    var local = JSON.parse(self.getStorage(storage));
                    if(!controls) { 
                        value = data.responseJSON.data;
                        if(Object.prototype.toString.call(value) == "[object Object]") {
                            value = JSON.stringify(Object.assign({}, value, { timeStamp: Date.now() }));
                        } else {
                            value = JSON.stringify(Object.assign({}, { 
                                timeStamp: Date.now(),
                                mes: value
                            }));
                        }
                    }
                    if(controls && controls.replace == true) {
                        value = Object.assign({}, JSON.parse(self.getStorage(storage)), opt.data, {
                            timeStamp: Date.now()
                        });
                        if (value.token) {
                            delete value.token;
                        }
                        value = JSON.stringify(value);
                    }
                    if(controls && controls.push == true) {
                        if(local.list.length == 10) {
                            local.list.shift();
                        }
                        var templateMes = Object.assign({}, local.list[ 0 ]);
                        if(!templateMes.from){
                            templateMes = {
                                from:{},
                                to:{},
                                content:"",
                                createdAt:new Date(),
                                updatedAt:new Date()
                            };
                        }
                        templateMes.from._id = opt.data.token;
                        var userinfo = JSON.parse(self.getStorage("userinfo"));
                        local.list.forEach(function(v){
                            if(v.from._id == opt.data.token) {
                                v.from.avatar = userinfo.avatar;
                            } else {
                                templateMes.to._id = v.from._id;
                                templateMes.to.nickname = v.from.nickname;
                                templateMes.to.avatar = v.from.avatar;
                            }
                        });
                        templateMes.content = opt.data.content;
                        templateMes.createdAt = new Date();
                        templateMes.updatedAt = new Date();
                        local.list.push(templateMes);
                        value = JSON.stringify(local);
                    }
                    if (controls && controls.delete) {
                        if (opt.data.page == 1) {
                            local.list = local.list.filter(function(v){
                                return v[ controls.delete ] != opt.data.id;
                            });
                            local.list.push(data.responseJSON.data);
                            value = JSON.stringify(local);
                        } else {
                            value = JSON.stringify(local);
                        }
                    }
                    self.setStorage(storage, value);
                }
                self.requestNum--;
                if (self.requestNum == 0) {
                    self.closeLoading();
                }
            }
        });
    },
    /*
     * 设置缓存
     */
    setStorage: function (key, value) {
        console.log(key, value)
        if(!key || !value) throw new Error("缺少必要的参数");
        if(Object.prototype.toString.call(value) == "[object object]") {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },
    /*
     * 读取缓存
     */
    getStorage: function (key) {
        if(!key) throw new Error("缺少必要的参数");
        return localStorage.getItem(key);
    },
    /*
     * 删除缓存
     */
    removeStorage: function (key) {
        if(!key) throw new Error("缺少必要的参数");
        return localStorage.removeItem(key);
    },
    /*
     * 判断缓存是否过期
     */
    isExpire: function (key, cache) {
        var self = this;
        var now = Date.now();
        var storage = JSON.parse(this.getStorage(key));
        if(cache == 0){
            cache = 0;
        } else {
            cache = cache || self.cacheTime;
        }
        if(cache != 0 && storage && (cache == -1 || (now - storage.timeStamp) < cache * 60000 )){
            return true;
        }
        this.removeStorage(key);
    },
    /*
     * 推送缓存
     */
    cacheData: function (key) {
        var storage = JSON.parse(this.getStorage(key));
        return new Promise((resolve) => {
            resolve({ status: 1 , data: storage });
        });
    },
    /*
     * 获取用户信息
     */
    userInfo: function (opt, cache) {
        var self = this;
        var key = "userinfo";
        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache)) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/getUserInfo.json` : `${self.URL}/Api/user/getUserInfo`,
            data: opt
        }, key);
    },
    /*
     * 编辑用户信息
     */
    editUserInfo: function (opt) {
        var self = this;
        var key = "userinfo";
        if (!opt) throw new Error("参数不能为空，或传入参数不合法");
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/editUserInfo.json` : `${self.URL}/Api/user/editUserInfo`,
            method: self.env == "test" ? "GET" : "POST",
            data: opt
        }, key, {replace: true});
    },
    /*
     * 浏览历史
     */
    historyList: function (opt, cache) {
        var self = this;
        var key = "history";
        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache)) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/history.json` : `${self.URL}/Api/user/getHistory`,
            data: opt
        }, key);
    },
    /*
     * 获取banner图片
     */
    banner: function (opt, cache) {
        var self = this;
        var key = "banner";
        if(this.isExpire(key, cache)) {
            return self.cacheData(key);
        }
        return this.api(Object.assign({}, opt, {
            url: self.env == "test" ? `${self.URL}/data/getCarousels.json` : `${self.URL}/Api/common/getCarousels`
        }), key);
    },
    /*
     * 获取首页的评论
     */
    comments: function (opt, cache) {
        var self = this;
        var key;
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if (opt.movieId){
            key = opt.movieId + "comments";
        } else {
            key = "homecomments";
        }
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/getCommentsByRight.json` : `${self.URL}/Api/comment/getComments`,
            data: opt
        }, key);
    },
    /*
     * 获取聊天详情
     */
    dialogue: function (opt, cache) {
        var self = this;
        var key = opt.typeId;
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if (!opt || !opt.typeId) throw new Error("typeId为必传的参数，或传入参数不合法");
        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/getMessageDetail.json` : `${self.URL}/Api/message/getMessageDetail`,
            data: opt
        }, key);
    },
    /*
     * 发送聊天信息
     */
    sendMessage: function (opt) {
        var self = this;
        var key = opt.typeId;
        if (!opt || !opt.to) throw new Error("page为必传的参数，或传入参数不合法");
        if (!opt || !opt.content) throw new Error("typeId为必传的参数，或传入参数不合法");
        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/sendMessage.json` : `${self.URL}/Api/message/sendMessage`,
            data: opt
        }, key, { push: true });
    },
    /*
     * 获取聊天列表
     */
    messageList: function (opt, cache) {
        var self = this;
        var key = "messageList";
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/getMessageList.json` : `${self.URL}/Api/message/getMessageList`,
            data: opt
        }, key);
    },
    /*
     * 删除聊天列表
     */
    deleteMesList: function (opt) {
        var self = this;
        var key = "messageList";
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
        if (!opt || !opt.typeId) throw new Error("typeId为必传的参数，或传入参数不合法");
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/deletemessageList.json` : `${self.URL}/Api/message/delMessageList`,
            data: opt
        }, key, { delete: "typeId" });
    },
    /*
     * 对我的评论
     */
    commentToMe: function (opt, cache) {
        var self = this;
        var key = "commentToMe";
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/commentToMe.json` : `${self.URL}/Api/comment/commentsToMe`,
            data: opt
        }, key);
    },
    /*
     * 喜欢我的评论
     */
    commentLikeMe: function (opt, cache) {
        var self = this;
        var key = "commentLikeMe";
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/commentsDetail.json` : `${self.URL}/Api/comment/commentLikeMe`,
            data: opt
        }, key);
    },
    /*
     * 喜欢我的人
     */
    userLikeMe: function (opt, cache) {
        var self = this;
        var key = "userLikeMe";
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/commentsDetail.json` : `${self.URL}/Api/comment/userLikeMe`,
            data: opt
        }, key);
    },
    /*
     * 我的评论
     */
    myConmments: function(opt, cache) {
        var self = this;
        var key = "myConmments";
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/getMyConmment.json` : `${self.URL}/Api/comment/myComments`,
            data: opt
        }, key);
    },
    /*
     * 删除我的评论
     */
    delMyConmments: function (opt) {
        var self = this;
        var key = "myConmments";
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/deleteMyConmment.json` : `${self.URL}/Api/message/delMyComments`,
            data: opt
        }, key, { delete: "_id" });
    }

};
module.exports = API;