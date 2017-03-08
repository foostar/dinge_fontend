/*
 *   @API接口
 *       #Author   xiusiteng
 *       #createAt   2016-11-18
 *       #question   使用fetch  
 *   适应方式：  1.改写fetch方法  2.改写store
 */
import "isomorphic-fetch";
import Cookie from "js-cookie";
import Cache from "../lib/cache/index.js";

export default class Api {
    constructor(opt) {
        this.env = opt.env;
        this.URL = opt.url;
        this.requestNum = 0;
        this.cacheTime = opt.cacheTime || 0;
        this.modal = opt.modal;
    }
    raw(args, up) {
        return Object.keys(args)
            .sort()
            .reduce((a, b) => `${a}&${up ? b.toLowerCase() : b}=${args[ b ]}`, "")
            .slice(1);
    }
    fetch(opt) {
        const token = Cookie.get("dinge");
        this.requestNum++;
        const { url, body, query, method, params } = opt;
        const fetchUrl = url.replace("\:\w+\/", (s) => {
            if (params) {
                return opt.params[ s.substring(0, s.length - 1) ];
            }
        }) + (query ? "?" + this.raw(query) : "");
        // self.showLoading();
        let options = {
            headers: {
                "Content-Type": "application/json",
                "authentication": process.env.NODE_ENV == "test" ? "730e8a6cd52b21e02553b382e774f9bf8d278a0d" : (token || "")
            }
        };
        if (method && method == "POST") {
            options = Object.assign(options, {
                method: "POST",
                body: JSON.stringify(body || {})
            });
        }
        return fetch(fetchUrl, options)
            .then((response) => {
                return {response, json: response.json()};
            }).then(({response, json}) => {
                this.requestNum--;
                if (this.requestNum == 0) {
                    console.log(response);
                    // self.closeLoading();
                }
                if(!response.ok) {
                    return json.then((data) => {
                        return Promise.reject(data);
                    });
                }
                return json;
            });
    }
    /*
     * 登录
     */
    login(opt) {
        const { email, password } = opt;
        if (!opt || !email) throw new Error("email为必传的参数，或传入参数不合法");
        if (!password) throw new Error("password为必传的参数，或传入参数不合法");
        Cache.del("userinfo");
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/signin.json` : `${this.URL}/Api/user/signin`,
            method:this.env == "test" ? "get" : "POST",
            body: opt
        });
    }
    /*
     * 注册
     */
    register(opt) {
        const { username, email, password } = opt;
        if (!opt || !username) throw new Error("userName为必传的参数，或传入参数不合法");
        if (!email) throw new Error("email为必传的参数，或传入参数不合法");
        if (!password) throw new Error("password为必传的参数，或传入参数不合法");
        Cache.del("userinfo");
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/signup.json` : `${this.URL}/Api/user/signup`,
            method:this.env == "test" ? "get" : "POST",
            body: opt
        });
    }
    /*
     * 获取banner图片
     */
    banner(opt, options) {
        options = options || {};
        const storgeKey = "banner";
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/getCarousels.json` : `${this.URL}/Api/common/getCarousels`
        });
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 30 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 搜索
     */
    search(opt) {
        let url = `${this.URL}/data/movieFindOne.json`;
        if (this.env == "test") {
            if (opt.commentTitle) {
                url = `${this.URL}/data/commentsDetail.json`;
            }
            if (opt.userName) {
                url = `${this.URL}/data/commentsDetail.json`;
            }
        } else {
            url = `${this.URL}/Api/common/search`;
        }
        return this.fetch({
            url,
            query: opt
        });
    }
    /*********** 用户方面  ***********/
    /*
     * 我的信息
     */
    userInfo(opt, options) {
        options = options || {};
        const storgeKey = "userinfo";
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/getUserInfo.json` : `${this.URL}/Api/user/getUserInfo`
        });
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 3 * 24 * 60 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 获取其他用户信息
     */
    getUser(opt, options) {
        options = options || {};
        if (!opt || !opt.userId) throw new Error("userId为必传的参数，或传入参数不合法");
        const storgeKey = "userinfo" + opt.userId;
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/getUserInfo.json` : `${this.URL}/Api/user/userInfo`,
            query: opt
        });
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 5 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 获取用户信息
     */
    editUserInfo(opt) {
        if (!opt) throw new Error("参数不能为空，或传入参数不合法");
        Cache.del("userinfo");
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/editUserInfo.json` : `${this.URL}/Api/user/editUserInfo`,
            method:this.env == "test" ? "get" : "POST",
            body: opt
        });
    }
    /*
     * 浏览历史
     */
    historyList(opt, options) {
        options = options || {};
        const storgeKey = "history";
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/history.json` : `${this.URL}/Api/user/getHistory`
        });
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 5 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 喜欢我的人
     */
    userLikeMe(opt, options) {
        options = options || {};
        const { page } = opt;
        if (!opt || !page) throw new Error("page为必传的参数，或传入参数不合法");
        const storgeKey = "userLikeMe";
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/commentsDetail.json` : `${this.URL}/Api/user/getUserFocusFromlist`,
            query: opt
        });
        if (page != 1) return fetch();
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 5 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 我关注的人
     */
    myFocusList(opt, options) {
        options = options || {};
        const { page } = opt;
        if (!opt || !page) throw new Error("page为必传的参数，或传入参数不合法");
        const storgeKey = "myFocus";
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/getUserFocuslist.json` : `${this.URL}/Api/user/getUserFocuslist`,
            query: opt
        });
        if (page != 1) return fetch();
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 5 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 我的粉丝
     */
    fansList(opt, options) {
        options = options || {};
        const { page } = opt;
        if (!opt || !page) throw new Error("page为必传的参数，或传入参数不合法");
        const storgeKey = "myFans";
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/getUserFocuslist.json` : `${this.URL}/Api/user/getUserFocusFromlist`,
            query: opt
        });
        if (page != 1) return fetch();
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 5 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 我的收藏
     */
    getMyCollet(opt, options) {
        options = options || {};
        const { page } = opt;
        if (!opt || !page) throw new Error("page为必传的参数，或传入参数不合法");
        const storgeKey = "mycollet";
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/getMyCollet.json` : `${this.URL}/Api/comment/getMyCollet`,
            query: opt
        });
        if (page && page != 1) return fetch();
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 30 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 收藏
     */
    collet(opt) {
        if (!opt || !opt.commentId) throw new Error("id为必传的参数，或传入参数不合法");
        Cache.del("mycollet");
        opt = Object.assign({
            type: "collet",
            isList: false,
            page: 1
        }, opt);
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/unCollet.json` : `${this.URL}/Api/comment/collet`,
            body: opt,
            method: "POST"
        });
    }
    /*
     * 关注
     */
    focus(opt) {
        if (!opt || !opt.userId) throw new Error("id为必传的参数，或传入参数不合法");
        Cache.del("myFocus");
        opt = Object.assign({
            type: "focus",
            isList: false,
            page: 1
        }, opt);
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/focusUser.json` : `${this.URL}/Api/user/FocusUser`,
            body: opt,
            method: "POST"
        });
    }
    /*
     * 拉黑用户
     */
    blacklist(opt) {
        if (!opt || !opt.userId) throw new Error("userId为必传的参数，或传入参数不合法");
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/unCollet.json` : `${this.URL}/Api/user/blackList`,
            query: opt
        });
    }
    /*
     * 举报用户
     */
    reportUser(opt) {
        if (!opt || !opt.userId) throw new Error("userId为必传的参数，或传入参数不合法");
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/unCollet.json` : `${this.URL}/Api/user/reportUser`,
            query: opt
        });
    }
    /*********** 评论方面  **********/
    /*
     * 获取首页的评论
     */
    comments(opt, options) {
        options = options || {};
        if (!opt) throw new Error("page为必传的参数，或传入参数不合法");
        const { page } = opt;
        if (!page) opt.page = 1;
        let storgeKey = null;
        if (opt.movieId){
            storgeKey = opt.movieId + "comments";
        } else if(opt.userId) {
            storgeKey = opt.userId + "comment";
        } else {
            storgeKey = "homecomments";
        }
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/getCommentsByRight.json` : `${this.URL}/Api/comment/getComments`,
            query: opt
        });
        if (page != 1) return fetch();
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 5 * 60 * 1000,
            sync   : 1,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 我的评论
     */
    myComments(opt, options) {
        options = options || {};
        const { page } = opt;
        if (!opt || !page) throw new Error("page为必传的参数，或传入参数不合法");
        const storgeKey = "myComments";
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/getMyConmment.json` : `${this.URL}/Api/comment/myComments`,
            query: opt
        });
        if (page != 1) return fetch();
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 5 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 删除我的评论
     */
    delMyConmments(opt) {
        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
        Cache.del("myConmments");
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/deleteMyConmment.json` : `${this.URL}/Api/comment/delMyComments`,
            query: opt
        });
    }
    /*
     * 对我的评论
     */
    commentToMe(opt, options) {
        options = options || {};
        const { page } = opt;
        if (!opt || !page) throw new Error("page为必传的参数，或传入参数不合法");
        const storgeKey = "commentToMe";
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/commentToMe.json` : `${this.URL}/Api/comment/commentsToMe`,
            query: opt
        });
        if (page != 1) return fetch();
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 5 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 喜欢我的评论
     */
    commentLikeMe(opt, options) {
        options = options || {};
        const { page } = opt;
        if (!opt || !page) throw new Error("page为必传的参数，或传入参数不合法");
        const storgeKey = "commentLikeMe";
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/commentsDetail.json` : `${this.URL}/Api/comment/zanList`,
            query: opt
        });
        if (page != 1) return fetch();
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 5 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 评论详情
     */
    commentsDetail(opt, options) {
        options = options || {};
        const { commentId } = opt;
        if (!opt || !commentId) throw new Error("commentId为必传的参数，或传入参数不合法");
        const storgeKey = `${commentId}commentsDetail`;
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/commentsDetail.json` : `${this.URL}/Api/comment/commentsDetail`,
            query: opt
        });
        if (opt.page && opt.page != 1) return fetch();
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 30 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 点赞
     */
    star(opt) {
        const { commentId } = opt;
        if (!opt || !commentId) throw new Error("commentId为必传的参数，或传入参数不合法");
        Cache.del(`${commentId}commentsDetail`);
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/unCollet.json` : `${this.URL}/Api/comment/addLike`,
            body: opt,
            method: "POST"
        });
    }
    /*
     * 评论电影
     */
    comment(opt) {
        const { title, content, movie, rank } = opt;
        if (!opt || !title) throw new Error("title为必传的参数，或传入参数不合法");
        if (!content) throw new Error("content为必传的参数，或传入参数不合法");
        if (!movie) throw new Error("movie为必传的参数，或传入参数不合法");
        if (!rank) throw new Error("rank为必传的参数，或传入参数不合法");
        const storge = [ "homecomments", opt.movie+"comments", "myConmments" ];
        Promise.all(storge.map((v) => Cache.del(v)));
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/unCollet.json` : `${this.URL}/Api/comment/commentMovie`,
            body: opt,
            method: "POST"
        });
    }
    /*
     * 回复评论
     */
    reply(opt) {
        const { commentTo, commentId, content } = opt;
        if (!opt || !commentTo) throw new Error("commentTo为必传的参数，或传入参数不合法");
        if (!commentId) throw new Error("commentId为必传的参数，或传入参数不合法");
        if (!content) throw new Error("content为必传的参数，或传入参数不合法");
        Cache.del(`${commentId}commentsDetail`);
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/unCollet.json` : `${this.URL}/Api/comment/addComments`,
            body: opt,
            method: "POST"
        });
    }
    /********* 聊天方面 *********/
    /*
     * 获取聊天详情
     */
    dialogue(opt, options) {
        options = options || {};
        const { page, typeId } = opt;
        if (!opt || !page) throw new Error("page为必传的参数，或传入参数不合法");
        if (!typeId) throw new Error("typeId为必传的参数，或传入参数不合法");
        const storgeKey = "message" + opt.typeId;
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/getMessageDetail.json` : `${this.URL}/Api/message/getMessageDetail`,
            query: opt
        });
        if (page != 1) return fetch();
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 5 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 发送聊天信息
     */
    sendMessage(opt) {
        const { to, content } = opt;
        if (!opt || !to) throw new Error("page为必传的参数，或传入参数不合法");
        if (!content) throw new Error("typeId为必传的参数，或传入参数不合法");
        const storgeKey = "message" + opt.typeId;
        Promise.all([ Cache.del("messageList"), Cache.del(storgeKey) ]);
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/sendMessage.json` : `${this.URL}/Api/message/sendMessage`,
            body: opt,
            method: "POST"
        });
    }
    /*
     * 获取聊天列表
     */
    messageList(opt, options) {
        options = options || {};
        const { page } = opt;
        if (!opt || !page) throw new Error("page为必传的参数，或传入参数不合法");
        const storgeKey = "messageList";
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/getMessageList.json` : `${this.URL}/Api/message/getMessageList`,
            query: opt
        });
        if (page != 1) return fetch();
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 5 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
    /*
     * 删除聊天列表
     */
    deleteMesList(opt) {
        const { page, typeId } = opt;
        if (!opt || !page) throw new Error("page为必传的参数，或传入参数不合法");
        if (!typeId) throw new Error("typeId为必传的参数，或传入参数不合法");
        Cache.del("messageList");
        return this.fetch({
            url: this.env == "test" ? `${this.URL}/data/deletemessageList.json` : `${this.URL}/Api/message/delMessageList`,
            query: opt
        });
    }
    /******* 电影方面 *******/
    /*
     * 搜索电影
     */
    movie(opt, options) {
        options = options || {};
        let storgeKey;
        const fetch = () => this.fetch({
            url: this.env == "test" ? `${this.URL}/data/movieFindOne.json` : `${this.URL}/Api/movie/showMovieList`,
            query: opt
        });
        if (opt.movieId) {
            storgeKey = opt.id + "moviedetail";
            Cache.add(storgeKey, fetch, Object.assign({
                expires: 3 * 24 * 60 * 60 * 1000,
                sync   : 2,
                force  : true
            }, options));
            return Cache.get(storgeKey);
        }
        storgeKey = "movieList";
        if (opt.page && opt.page != 1) return fetch();
        Cache.add(storgeKey, fetch, Object.assign({
            expires: 30 * 60 * 1000,
            sync   : 2,
            force  : true
        }, options));
        return Cache.get(storgeKey);
    }
}
