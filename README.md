# dinge_fontend
  dinge前端项目地址更新，将前后端分离，前端使用gulp的dev-server进行开发，<br>
  项目本地开发启动： npm run dev<br>
  项目打包：   npm run build
  
## 一共有如下几点更新：
  1.使用webpack+gulp的自动化打包方案<br>
    [gulp官方文档](http://www.gulpjs.com.cn/)  [webpack官方文档](http://webpackdoc.com/)<br>
    打包文件gulpfile和webpack.config.js 里面有详细的步骤注释
  2.使用cmd规范，引入使用require<br>
  3.使用es6语法   [es6语法文档](http://www.nodeclass.com/api/ECMAScript6.html)<br>
  4.jquery换成zepto，混入了fx和fx_method， [点透问题使用touchend](http://www.bubuko.com/infodetail-649496.html)<br>
  5.使用api统一接口<br>
  6.取消的deffered的应用，请使用[promise规范](http://www.jianshu.com/p/063f7e490e9a)<br>   
  7.使用[less](http://lesscss.cn/)进行css书写 
