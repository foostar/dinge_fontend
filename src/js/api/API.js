/*
 *   @API接口
 *       #Author   xiusiteng
 *       #createAt   2016-11-18
 *       #question   使用fetch  
 *   适应方式：  1.改写api方法  2.改写storage 
 */
var $ = require("Zepto");
var Cookie = require("js-cookie");

function Api (opt) {
    this.env = opt.env;
    this.URL = opt.url;
    this.requestNum = 0;
    this.cacheTime = opt.cacheTime || 0;
    this.showLoading =  opt.showLoading || function(){};
    this.closeLoading = opt.closeLoading || function(){};
}
Api.prototype = {
    constructor: Api,
    /*
     * 请求函数
     */
    api: function (opt, storage, controls) {
        var self = this;
        return new Promise((reslove, reject) => {
            $.ajax({
                url: opt.url || "",
                data: opt.data || {},
                type: opt.method || "GET",
                datatype: "json",
                beforeSend: function(data) {
                    if (opt.isAuth) {
                        if(!Cookie.get("dinge")) {
                            return reject({ errcode:100401, msg: "token为必传的参数，或token过期" });
                        }
                        data.setRequestHeader("authentication", Cookie.get("dinge"));
                    }
                    self.requestNum++;
                    self.showLoading();
                },
                success: function (data) {
                    reslove(data);
                },
                error: function(data) {
                    let responseJSON;
                    try {
                        responseJSON = JSON.parse(data.response);
                    } catch(e) {
                        responseJSON = data.response;
                    }
                    reject(responseJSON);
                },
                complete: function(data) {
                    let responseJSON;
                    try {
                        responseJSON = JSON.parse(data.response);
                    } catch(e) {
                        responseJSON = data.response;
                    }
                    let toSave = true;
                    if (!storage) {
                        toSave = false;
                    }
                    if(responseJSON.status == 1 && toSave) {
                        var value;
                        var local = JSON.parse(self.getStorage(storage));
                        if(!controls) { 
                            value = responseJSON.data;
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
                        if (controls && controls.delete) {
                            if (opt.data.page == 1) {
                                local.list = local.list.filter(function(v){
                                    return v[ controls.delete ] != opt.data.id;
                                });
                                local.list.push(responseJSON.data);
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
        });
    },
    /*
     * 设置缓存
     */
    setStorage: function (key, value) {
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
        var tmpstorage = this.getStorage(key);
        if (!tmpstorage) {
            return false;
        }
        var storage = JSON.parse(tmpstorage);
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
     * 获取我的信息
     */
    userInfo: function (opt, cache) {
        var self = this;
        var key = "userinfo";
        if(this.isExpire(key, cache)) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/getUserInfo.json` : `${self.URL}/Api/user/getUserInfo`,
            data: opt,
            isAuth: true
        }, key);
    },
    /*
     * 获取用户信息
     */
    getUsers: function (opt, cache) {
        var self = this;
        if (!opt || !opt.userId) throw new Error("userId为必传的参数，或传入参数不合法");
        var key = opt.userId + "userinfo";
        if(this.isExpire(key, cache)) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/getUserInfo.json` : `${self.URL}/Api/user/userInfo`,
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
            data: opt,
            isAuth:true
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
            data: opt,
            isAuth: true
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
        if (!opt.page) opt.page = 1;
        if (opt.movieId){
            key = opt.movieId + "comments";
        } else if(opt.userId) {
            key = opt.userId + "comment";
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
            data: opt,
            isAuth: true
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
            data: opt,
            isAuth: true
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
            data: opt,
            isAuth: true
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
            data: opt,
            isAuth: true
        }, key, { delete: "typeId" });
    },
    /*
     * 对我的评论
     */
    commentToMe: function (opt, cache) {
        var self = this;
        var key = "commentToMe";
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/commentToMe.json` : `${self.URL}/Api/comment/commentsToMe`,
            data: opt,
            isAuth: true
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
            data: opt,
            isAuth: true
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
            data: opt,
            isAuth: true
        }, key);
    },
    /*
     * 我的评论
     */
    myConmments: function(opt, cache) {
        var self = this;
        var key = "myConmments";
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/getMyConmment.json` : `${self.URL}/Api/comment/myComments`,
            data: opt,
            isAuth: true
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
            data: opt,
            isAuth: true
        }, key, { delete: "_id" });
    },
    /*
     * 我关注的人
     */
    myFocusList: function (opt, cache) {
        var self = this;
        var key = "myFocus";
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/getUserFocuslist.json` : `${self.URL}/Api/user/getUserFocuslist`,
            data: opt,
            isAuth: true
        }, key);
    },
    /*
     * 我的粉丝
     */
    fansList: function (opt, cache) {
        var self = this;
        var key = "myFans";
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/getUserFocuslist.json` : `${self.URL}/Api/user/getUserFocusFromlist`,
            data: opt,
            isAuth: true
        }, key);
    },
    /*
     * 搜索电影
     */
    movie: function (opt, cache) {
        var self = this;
        var key;
        if (opt.id) {
            key = opt.id + "moviedetail";
        } else {
            key = "movieList";
        }
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/movieFindOne.json` : `${self.URL}/Api/movie/showMovieList`,
            data: opt
        }, key);
    },
    /*
     * 我的收藏
     */
    getMyCollet: function (opt, cache) {
        var self = this;
        var key = "mycollet";
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/getMyCollet.json` : `${self.URL}/Api/comment/getMyCollet`,
            data: opt,
            isAuth: true
        }, key);
    },
    /*
     * 收藏
     */
    collet: function (opt) {
        var self = this;
        var key = "mycollet";
        if (!opt || !opt.commentId) throw new Error("id为必传的参数，或传入参数不合法");
        opt = Object.assign({
            type: "collet",
            isList: false,
            page: 1
        }, opt);
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/unCollet.json` : `${self.URL}/Api/comment/collet`,
            type: self.env == "test" ? "GET" : "POST",
            data: opt,
            isAuth: true
        }, key, opt.type == "collet" ? {} : { delete: "_id" });
    },
    /*
     * 加关注
     */
    focus: function (opt) {
        var self = this;
        var key = "myFocus";
        if (!opt || !opt.userId) throw new Error("id为必传的参数，或传入参数不合法");
        opt = Object.assign({
            type: "focus",
            isList: false,
            page: 1
        }, opt);
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/focusUser.json` : `${self.URL}/Api/user/FocusUser`,
            type: self.env == "test" ? "GET" : "POST",
            data: opt,
            isAuth: true
        }, key, opt.type == "focus" ? {} : { delete: "_id" });
    },
    /*
     * 注册
     */
    register: function (opt) {
        var self = this;
        if (!opt || !opt.username) throw new Error("userName为必传的参数，或传入参数不合法");
        if (!opt || !opt.email) throw new Error("email为必传的参数，或传入参数不合法");
        if (!opt || !opt.password) throw new Error("password为必传的参数，或传入参数不合法");
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/signup.json` : `${self.URL}/Api/user/signup`,
            method:self.env == "test" ? "get" : "POST",
            data: opt
        });
    },
    /*
     * 登录
     */
    login: function (opt) {
        var self = this;
        if (!opt || !opt.email) throw new Error("email为必传的参数，或传入参数不合法");
        if (!opt || !opt.password) throw new Error("password为必传的参数，或传入参数不合法");
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/signin.json` : `${self.URL}/Api/user/signin`,
            method:self.env == "test" ? "get" : "POST",
            data: opt
        });
    },
    /*
     * 搜索
     */
    search: function (opt) {
        var self = this;
        let url = `${self.URL}/data/movieFindOne.json`;
        if (this.env == "test") {
            if (opt.commentTitle) {
                url = `${self.URL}/data/commentsDetail.json`;
            }
            if (opt.userName) {
                url = `${self.URL}/data/commentsDetail.json`;
            }
        } else {
            url = `${self.URL}/Api/common/search`;
        }
        return this.api({
            url: url,
            data: opt
        });
    },
    /*
     * 评论详情
     */
    commentsDetail: function (opt, cache) {
        var self = this;
        var key = `${opt.commentId}commentsDetail`;
        if (!opt || !opt.commentId) throw new Error("commentId为必传的参数，或传入参数不合法");
        if(this.isExpire(key, cache) && opt.page == 1) {
            return self.cacheData(key);
        }
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/commentsDetail.json` : `${self.URL}/Api/comment/commentsDetail`,
            data: opt
        }, key);
    },
    /*
     * 点赞
     */
    star: function (opt) {
        var self = this;
        if (!opt || !opt.commentId) throw new Error("commentId为必传的参数，或传入参数不合法");
        var key = `${opt.commentId}commentsDetail`;
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/unCollet.json` : `${self.URL}/Api/comment/addLike`,
            data: opt,
            isAuth: true
        }, key);
    },
    /*
     * 评论电影
     */
    comment: function (opt) {
        var self = this;
        if (!opt || !opt.title) throw new Error("title为必传的参数，或传入参数不合法");
        if (!opt || !opt.content) throw new Error("content为必传的参数，或传入参数不合法");
        if (!opt || !opt.movie) throw new Error("movie为必传的参数，或传入参数不合法");
        if (!opt || !opt.rank) throw new Error("rank为必传的参数，或传入参数不合法");
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/unCollet.json` : `${self.URL}/Api/comment/commentMovie`,
            data: opt,
            isAuth: true
        });
    },
    /*
     * 回复评论
     */
    reply: function (opt) {
        var self = this;
        if (!opt || !opt.commentTo) throw new Error("commentTo为必传的参数，或传入参数不合法");
        if (!opt || !opt.commentFrom) throw new Error("commentFrom为必传的参数，或传入参数不合法");
        if (!opt || !opt.commentId) throw new Error("commentId为必传的参数，或传入参数不合法");
        if (!opt || !opt.content) throw new Error("content为必传的参数，或传入参数不合法");
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/unCollet.json` : `${self.URL}/Api/comment/addComments`,
            data: opt,
            isAuth: true
        });
    },
    /*
     * 拉黑用户
     */
    blacklist: function (opt) {
        var self = this;
        if (!opt || !opt.userId) throw new Error("userId为必传的参数，或传入参数不合法");
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/unCollet.json` : `${self.URL}/Api/user/blackList`,
            data: opt,
            isAuth: true
        });
    },
    /*
     * 举报用户
     */
    reportUser: function (opt) {
        var self = this;
        if (!opt || !opt.userId) throw new Error("userId为必传的参数，或传入参数不合法");
        return this.api({
            url: self.env == "test" ? `${self.URL}/data/unCollet.json` : `${self.URL}/Api/user/reportUser`,
            data: opt,
            isAuth: true
        });
    }
};
module.exports = Api;
