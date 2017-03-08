/* eslint-disable */
// const Request = require("../src/js/api/API.js");
// const chai = require("chai");
// const config = require("../src/js/config/config.js")
// const Api = new Request(config)
// const expect = chai.expect;
// const should = chai.should();

// describe('影评', () => {
//     it('成功返回首页评论', () => {
//         return Api.comments({
//             page: 1
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     });
//     it('成功返回电影的评论', () => {
//         return Api.comments({
//             page: 1,
//             movieId: '589aea2f7151bf18e371c29e'
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     });
//     it('成功返回用户的评论', () => {
//         return Api.comments({
//             page: 1,
//             userId: '5859171127f4610cf904a0f2'
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     });
// })

// describe('我的影评', () => {
//     it('成功返回我的影评', () => {
//         return Api.myComments({
//             page: 1
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     })
// })

// describe('对我的评论', () => {
//     it('成功返回对我的评论', () => {
//         return Api.commentToMe({
//             page: 1
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     })
// })

// describe('评论详情', () => {
//     it('成功返回评论详情', () => {
//         return Api.commentsDetail({
//             commentId: "589c55493c417589361cf779"
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('data');
//             expect(data).to.include.keys('status');
//         })
//     })
//     it('没有传commentId', () => {
//         (() => Api.commentsDetail()).should.throw()
//     })
// })

// describe('点赞', () => {
//     it('成功点赞', () => {
//         return Api.star({
//             commentId: "58bd23e35cff8709667978f1",
//             zanTo: "5853bae535aa9e0dbd63cd11"
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('status');
//         })
//     })
//     it('没有传commentId', () => {
//         (() => Api.star()).should.throw()
//     })
// })

// describe('写影评', () => {
//     it('成功写影评', () => {
//         return Api.comment({
//             title: "这是标题444",
//             content: "这是内容444这是内容444这是内容444这是内容444这是内容444这是内容444这是内容444",
//             movie: "589ae4297151bf18e371c270",
//             rank: 8
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('status');
//         })
//     })
//     it('少传参数', () => {
//         (() => Api.comment({
//             title: "这是标题444",
//             content: "这是内容444这是内容444这是内容444这是内容444这是内容444这是内容444这是内容444",
//             movie: "589ae4297151bf18e371c270"
//         })).should.throw()
//     })
// })

// describe('写评论', () => {
//     it('成功写评论', () => {
//         return Api.reply({
//             content: "这是一条回复55555",
//             commentId: "589c55493c417589361cf779",
//             commentTo: "5853bb3e56ab520e01ed08cf"
//         })
//         .then((data) => {
//             expect(data).to.be.an('object');
//             expect(data).to.include.keys('status');
//         })
//     })
//     it('少传参数', () => {
//         (() => Api.reply({
//             content: "这是内容444这是内容444这是内容444这是内容444这是内容444这是内容444这是内容444",
//             commentTo: "5853bb3e56ab520e01ed08cf"
//         })).should.throw()
//     })
// })