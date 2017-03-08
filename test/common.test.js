// /* eslint-disable */
// const Request = require("../src/js/api/API.js");
// const chai = require("chai");
// const config = require("../src/js/config/config.js")
// const Api = new Request(config)
// const expect = chai.expect;
// const should = chai.should();
// /*
//  * @登录测试
//  */
// describe('登录测试', () => {
//   it('登录成功返回', () => {
//     return Api.login({
//         email: "jasonx0915@163.com",
//         password: "am13011589858"
//     })
//     .then((data) => {
//         expect(data).to.be.an('object');
//         expect(data).to.include.keys('data');
//         expect(data).to.include.keys('status');
//     })
//   });
//   it('用户名不能为空', () => {
//     (() => Api.login({
//         email: "",
//         password: "am13011589858"
//     })).should.throw();
//   })
//   it('密码不能为空', () => {
//     (() => Api.login({
//         email: "jasonx0915@163.com",
//         password: ""
//     })).should.throw();
//   })
//   it('账号密码不匹配', () => {
//     return Api.login({
//         email: "jasonx0915@163.com",
//         password: "123456"
//     })
//     .catch(err => {
//         expect(err).to.be.an('object');
//         expect(err).to.include.keys('msg')
//         expect(err).to.include.keys('errcode')
//     })
//   })
// });
// /*
//  * @注册测试
//  */
// describe('注册测试', () => {
//   const random = Math.floor(Math.random()*100)
//   // it('注册成功返回', () => {
//   //   return Api.register({
//   //       username: "love" + random,
//   //       email: "huston" + random + "@qq.com",
//   //       password: "am13011589858"
//   //   })
//   //   .then((data) => {
//   //       expect(data).to.be.an('object');
//   //       expect(data).to.include.keys('status');
//   //   })
//   // });
//   it('用户名不能为空', () => {
//     (() => Api.register({
//         username: "",
//         email: "huston" + random + "@qq.com",
//         password: "am13011589858"
//     })).should.throw();
//   })
//   it('邮箱不能为空', () => {
//     (() => Api.register({
//         username: "lovesong" + random,
//         email: "",
//         password: "am13011589858"
//     })).should.throw();
//   })
//   it('密码不能为空', () => {
//     (() => Api.register({
//         username: "lovesong" + random,
//         email: "jasonx0915@163.com",
//         password: ""
//     })).should.throw();
//   })
//   it('密码格式错误', () => {
//     return Api.register({
//         username: "love" + random,
//         email: "huston" + random + "@qq.com",
//         password: "123456"
//     })
//     .catch(err => {
//         expect(err).to.be.an('object');
//         expect(err).to.include.keys('msg')
//         expect(err).to.include.keys('errcode')
//     })
//   })
//   it('用户名格式错误', () => {
//     return Api.register({
//         username: "lovesong" + random,
//         email: "huston" + random + "@qq.com",
//         password: "am123456"
//     })
//     .catch(err => {
//         expect(err).to.be.an('object');
//         expect(err).to.include.keys('msg')
//         expect(err).to.include.keys('errcode')
//     })
//   })
//   it('邮箱格式错误', () => {
//     return Api.register({
//         username: "lovesong" + random,
//         email: "huston" + random + "qq.com",
//         password: "am123456"
//     })
//     .catch(err => {
//         expect(err).to.be.an('object');
//         expect(err).to.include.keys('msg')
//         expect(err).to.include.keys('errcode')
//     })
//   })
//   it('邮箱重复', () => {
//     return Api.register({
//         username: "love" + random,
//         email: "jasonx0915@163.com",
//         password: "am123456"
//     })
//     .catch(err => {
//         expect(err).to.be.an('object');
//         expect(err).to.include.keys('msg')
//         expect(err).to.include.keys('errcode')
//     })
//   })
//   it('用户名重复', () => {
//     return Api.register({
//         username: "zbq0809",
//         email: "huston" + random + "qq.com",
//         password: "am123456"
//     })
//     .catch(err => {
//         expect(err).to.be.an('object');
//         expect(err).to.include.keys('msg')
//         expect(err).to.include.keys('errcode')
//     })
//   })
// });
// /*
//  * @banner
//  */
// describe('banner测试', () => {
//   it('获取banner图', () => {
//     return Api.banner()
//     .then((data) => {
//         expect(data).to.be.an('object');
//         expect(data).to.include.keys('status');
//         expect(data).to.include.keys('data');
//     })
//   })
// })
// /*
//  * @搜索
//  */
// describe('搜索测试', () => {
//   it('搜索电影列表', () => {
//     return Api.search({
//       movieName: "功夫瑜伽",
//       page: 1
//     })
//     .then((data) => {
//         expect(data).to.be.an('object');
//         expect(data).to.include.keys('status');
//         expect(data).to.include.keys('data');
//     })
//   })
//   it('搜索评论列表', () => {
//     return Api.search({
//       commentTitle: "这是标题",
//       page: 1
//     })
//     .then((data) => {
//         expect(data).to.be.an('object');
//         expect(data).to.include.keys('status');
//         expect(data).to.include.keys('data');
//     })
//   })
//   it('搜索用户列表', () => {
//     return Api.search({
//       userName: "love",
//       page: 1
//     })
//     .then((data) => {
//         expect(data).to.be.an('object');
//         expect(data).to.include.keys('status');
//         expect(data).to.include.keys('data');
//     })
//   })
// })