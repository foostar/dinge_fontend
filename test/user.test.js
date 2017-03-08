// /* eslint-disable */
// const Request = require("../src/js/api/API.js");
// const chai = require("chai");
// const config = require("../src/js/config/config.js")
// const Api = new Request(config)
// const expect = chai.expect;
// const should = chai.should();

// describe('我的信息', () => {
//     it('成功返回我的信息', () => {
//         return Api.userInfo()
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     });
// })

// describe('获取用户信息', () => {
//     it('成功获取用户信息', () => {
//         return Api.getUser({
//             userId: "58b7d28cc0f53102d4c3bbea"
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     });
//     it('少传了用户id', () => {
//         (() => Api.getUser()).should.throw();
//     });
// })

// describe('修改用户信息', () => {
//     it('成功修改用户信息', () => {
//         return Api.editUserInfo({
//             nickname: "小缺缺",
//             birthday: new Date("1993-06-12"),
//             sex: "女",
//             city: "河北省,石家庄市,长安区"
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('status');
//         })
//     });
// })

// describe('用户历史记录', () => {
//     it('成功访问用户历史访问记录', () => {
//         return Api.historyList()
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     });
// })

// describe('喜欢我的人', () => {
//     it('成功访问喜欢我的人', () => {
//         return Api.userLikeMe({
//             page: 1
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     });
// })

// describe('我关注的人', () => {
//     it('成功访问我关注的人', () => {
//         return Api.myFocusList({
//             page: 1
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     });
// })

// describe('我的粉丝', () => {
//     it('成功访问我的粉丝', () => {
//         return Api.fansList({
//             page: 1
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     });
// })

// describe('我的收藏', () => {
//     it('成功访问我的收藏', () => {
//         return Api.getMyCollet({
//             page: 1
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     });
// })

// describe('收藏', () => {
//     it('成功收藏', () => {
//         return Api.collet({
//             commentId: "589c562f3c417589361cf77b"
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('status');
//         })
//     });
//     // it('成功取消收藏', () => {
//     //     return Api.collet({
//     //         type: "uncollet",
//     //         commentId: "589c55493c417589361cf779",
//     //         isList: true
//     //     })
//     //     .then((data) => {
//     //         console.log("返回一条新的数据", data)
//     //         expect(data).to.be.an('object');
//     //         expect(data).to.include.keys('data');
//     //         expect(data).to.include.keys('status');
//     //     })
//     // });
//     it('少传了用户commentId', () => {
//         (() => Api.getMyCollet()).should.throw();
//     });
// })

// describe('关注', () => {
//     it('成功关注', () => {
//         return Api.focus({
//             userId: "58b7d825e3b4ae11eb60a7e2"
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('status');
//         })
//     });
//     // it('成功取消关注', () => {
//     //     return Api.focus({
//     //         type: "unfocus",
//     //         userId: "58b7def94b82d714350d3527",
//     //         isList: true
//     //     })
//     //     .then((data) => {
//     //         console.log("返回一条新的数据", data)
//     //         expect(data).to.be.an('object');
//     //         expect(data).to.include.keys('status');
//     //     })
//     // });
//     it('少传了用户userId', () => {
//         (() => Api.focus()).should.throw();
//     });
// })

// describe('拉黑用户', () => {
//     it('成功拉黑用户', () => {
//         return Api.blacklist({
//             userId: "58b7d825e3b4ae11eb60a7e2"
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('status');
//         })
//     });
//     it('少传了用户userId', () => {
//         (() => Api.blacklist()).should.throw();
//     });
// })

// describe('举报用户', () => {
//     it('成功举报用户', () => {
//         return Api.reportUser({
//             userId: "58b7d825e3b4ae11eb60a7e2"
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('status');
//         })
//     });
//     it('少传了用户userId', () => {
//         (() => Api.reportUser()).should.throw();
//     });
// })