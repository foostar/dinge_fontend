webpackJsonp([0,25],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Created by xiusiteng on 2016-08-12.
	 * @desc 编辑用户资料
	 */
	var $ = __webpack_require__(1);
	var dingeTools = __webpack_require__(4);
	var Cookie = __webpack_require__(7);

	var _require = __webpack_require__(8),
	    provsData = _require.provsData,
	    citysData = _require.citysData,
	    distsData = _require.distsData;

	$(function () {
	    function EditUser(opt) {
	        this.ele = $("#" + opt.id);
	        this.init();
	    }
	    EditUser.prototype = {
	        init: function init() {
	            dingeTools.init();
	            this.bindEvent();
	            this.render();
	        },
	        bindEvent: function bindEvent() {
	            // 提交用户资料
	            this.submitUserData();
	            // 性别选择弹出层
	            this.alertSexChoice();
	            // 选择性别
	            this.choiceSex();
	            // 上传图片
	            this.uploadCarouse();
	        },
	        uploadCarouse: function uploadCarouse() {
	            new dingeTools.LUploader(document.getElementById("carouse"), {
	                url: "/carouse/api/addCarouse", //post请求地址
	                multiple: false, //是否一次上传多个文件 默认false
	                maxsize: 102400, //忽略压缩操作的文件体积上限 默认100kb
	                accept: "image/*", //可上传的图片类型
	                quality: 0.1, //压缩比 默认0.1  范围0.1-1.0 越小压缩率越大
	                showsize: false //是否显示原始文件大小 默认false
	            });
	        },
	        choiceSex: function choiceSex() {
	            var _this = this;

	            $(".edit_modal a").on("touchend", function () {
	                $(".edit_content_sex").html($(_this).html());
	                $(".edit_mask").addClass("edit_mask_out");
	                setTimeout(function () {
	                    $(".edit_mask").removeClass("edit_mask_out edit_mask_in");
	                    $(".edit_mask").hide();
	                }, 100);
	            });
	        },
	        alertSexChoice: function alertSexChoice() {
	            this.ele.on("click", ".edit_content_sex", function () {
	                $(".edit_mask").show();
	                setTimeout(function () {
	                    $(".edit_mask").addClass("edit_mask_in");
	                }, 0);
	            });
	        },
	        submitUserData: function submitUserData() {
	            var _this2 = this;

	            $(".goback").on("click", function (event) {
	                event.preventDefault();
	                if ($("#sign").val().length > 30) {
	                    return alert("签名不能大于30个字符！");
	                }
	                // 拼凑数据
	                var data = {
	                    avatar: $(".edit_carouse img").attr("src"),
	                    nickname: $(".edit_content_username input").val(),
	                    sign: $("#sign").val(),
	                    sex: $(".edit_content_sex").html(),
	                    city: $("#city").val(),
	                    birthday: $("#birthday").val(),
	                    token: Cookie.get("dinge")
	                };
	                // 修改数据
	                _this2.editUserInfo(data);
	            });
	        },
	        editUserInfo: function editUserInfo(data) {
	            dingeTools.editUserInfo(data).then(function (result) {
	                if (result.status == 1) {
	                    window.history.back();
	                }
	            });
	        },
	        render: function render() {
	            this.showUserData();
	        },
	        showUserData: function showUserData() {
	            var _this3 = this;

	            // 加载数据
	            this.loadUserData()
	            // 展示数据
	            .then(function (result) {
	                _this3.makeData(result);
	            });
	        },
	        loadUserData: function loadUserData() {
	            return dingeTools.userInfo({
	                token: Cookie.get("dinge")
	            }, -1);
	        },
	        makeData: function makeData(result) {
	            if (result.status == 1) {
	                (function () {
	                    // 给当前页面赋值
	                    var data = result.data;
	                    $(".edit_carouse").attr("data-src", data.avatar);
	                    $(".edit_carouse img").attr("src", data.avatar);
	                    $(".edit_content_username input").val(data.nickname);
	                    $("#sign").val(data.sign);
	                    $(".word_count span").html(data.sign.length);
	                    $(".edit_content_sex").html(data.sex);
	                    $("#city").val(data.city);
	                    $("#birthday").val(data.birthday);
	                    $("#carouse").attr("data-user-id", Cookie.get("dinge"));
	                    var sign = document.getElementById("sign");
	                    // 创建日历插件
	                    var calendar = new dingeTools.LCalendar();
	                    calendar.init({
	                        "trigger": "#birthday", //标签id
	                        "type": "date", //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
	                        "minDate": "1900-1-1", //最小日期
	                        "maxDate": new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() //最大日期
	                    });

	                    // 创建地区插件
	                    var area1 = new dingeTools.LArea();
	                    area1.init({
	                        "trigger": "#city", //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
	                        "valueTo": "#city_value", //选择完毕后id属性输出到该位置
	                        "keys": {
	                            id: "value",
	                            name: "text"
	                        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
	                        "type": 2, //数据源类型
	                        "data": [provsData, citysData, distsData] //数据源
	                    });
	                    // 计算输入字符
	                    sign.oninput = function () {
	                        $(".word_count span").html(sign.value.length);
	                    };
	                })();
	            }
	        }
	    };
	    new EditUser({ id: "edituser" });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2)(__webpack_require__(3))

	/*** EXPORTS FROM exports-loader ***/
	module.exports = window.$;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript !== "undefined")
			execScript(src);
		else
			eval.call(null, src);
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */\n(function(global, factory) {\n  if (typeof define === 'function' && define.amd)\n    define(function() { return factory(global) })\n  else\n    factory(global)\n}(this, function(window) {\n  var Zepto = (function() {\n  var undefined, key, $, classList, emptyArray = [], concat = emptyArray.concat, filter = emptyArray.filter, slice = emptyArray.slice,\n    document = window.document,\n    elementDisplay = {}, classCache = {},\n    cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },\n    fragmentRE = /^\\s*<(\\w+|!)[^>]*>/,\n    singleTagRE = /^<(\\w+)\\s*\\/?>(?:<\\/\\1>|)$/,\n    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\w:]+)[^>]*)\\/>/ig,\n    rootNodeRE = /^(?:body|html)$/i,\n    capitalRE = /([A-Z])/g,\n\n    // special attributes that should be get/set via method calls\n    methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],\n\n    adjacencyOperators = [ 'after', 'prepend', 'before', 'append' ],\n    table = document.createElement('table'),\n    tableRow = document.createElement('tr'),\n    containers = {\n      'tr': document.createElement('tbody'),\n      'tbody': table, 'thead': table, 'tfoot': table,\n      'td': tableRow, 'th': tableRow,\n      '*': document.createElement('div')\n    },\n    readyRE = /complete|loaded|interactive/,\n    simpleSelectorRE = /^[\\w-]*$/,\n    class2type = {},\n    toString = class2type.toString,\n    zepto = {},\n    camelize, uniq,\n    tempParent = document.createElement('div'),\n    propMap = {\n      'tabindex': 'tabIndex',\n      'readonly': 'readOnly',\n      'for': 'htmlFor',\n      'class': 'className',\n      'maxlength': 'maxLength',\n      'cellspacing': 'cellSpacing',\n      'cellpadding': 'cellPadding',\n      'rowspan': 'rowSpan',\n      'colspan': 'colSpan',\n      'usemap': 'useMap',\n      'frameborder': 'frameBorder',\n      'contenteditable': 'contentEditable'\n    },\n    isArray = Array.isArray ||\n      function(object){ return object instanceof Array }\n\n  zepto.matches = function(element, selector) {\n    if (!selector || !element || element.nodeType !== 1) return false\n    var matchesSelector = element.matches || element.webkitMatchesSelector ||\n                          element.mozMatchesSelector || element.oMatchesSelector ||\n                          element.matchesSelector\n    if (matchesSelector) return matchesSelector.call(element, selector)\n    // fall back to performing a selector:\n    var match, parent = element.parentNode, temp = !parent\n    if (temp) (parent = tempParent).appendChild(element)\n    match = ~zepto.qsa(parent, selector).indexOf(element)\n    temp && tempParent.removeChild(element)\n    return match\n  }\n\n  function type(obj) {\n    return obj == null ? String(obj) :\n      class2type[toString.call(obj)] || \"object\"\n  }\n\n  function isFunction(value) { return type(value) == \"function\" }\n  function isWindow(obj)     { return obj != null && obj == obj.window }\n  function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }\n  function isObject(obj)     { return type(obj) == \"object\" }\n  function isPlainObject(obj) {\n    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype\n  }\n\n  function likeArray(obj) {\n    var length = !!obj && 'length' in obj && obj.length,\n      type = $.type(obj)\n\n    return 'function' != type && !isWindow(obj) && (\n      'array' == type || length === 0 ||\n        (typeof length == 'number' && length > 0 && (length - 1) in obj)\n    )\n  }\n\n  function compact(array) { return filter.call(array, function(item){ return item != null }) }\n  function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }\n  camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) }\n  function dasherize(str) {\n    return str.replace(/::/g, '/')\n           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')\n           .replace(/([a-z\\d])([A-Z])/g, '$1_$2')\n           .replace(/_/g, '-')\n           .toLowerCase()\n  }\n  uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }\n\n  function classRE(name) {\n    return name in classCache ?\n      classCache[name] : (classCache[name] = new RegExp('(^|\\\\s)' + name + '(\\\\s|$)'))\n  }\n\n  function maybeAddPx(name, value) {\n    return (typeof value == \"number\" && !cssNumber[dasherize(name)]) ? value + \"px\" : value\n  }\n\n  function defaultDisplay(nodeName) {\n    var element, display\n    if (!elementDisplay[nodeName]) {\n      element = document.createElement(nodeName)\n      document.body.appendChild(element)\n      display = getComputedStyle(element, '').getPropertyValue(\"display\")\n      element.parentNode.removeChild(element)\n      display == \"none\" && (display = \"block\")\n      elementDisplay[nodeName] = display\n    }\n    return elementDisplay[nodeName]\n  }\n\n  function children(element) {\n    return 'children' in element ?\n      slice.call(element.children) :\n      $.map(element.childNodes, function(node){ if (node.nodeType == 1) return node })\n  }\n\n  function Z(dom, selector) {\n    var i, len = dom ? dom.length : 0\n    for (i = 0; i < len; i++) this[i] = dom[i]\n    this.length = len\n    this.selector = selector || ''\n  }\n\n  // `$.zepto.fragment` takes a html string and an optional tag name\n  // to generate DOM nodes from the given html string.\n  // The generated DOM nodes are returned as an array.\n  // This function can be overridden in plugins for example to make\n  // it compatible with browsers that don't support the DOM fully.\n  zepto.fragment = function(html, name, properties) {\n    var dom, nodes, container\n\n    // A special case optimization for a single tag\n    if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))\n\n    if (!dom) {\n      if (html.replace) html = html.replace(tagExpanderRE, \"<$1></$2>\")\n      if (name === undefined) name = fragmentRE.test(html) && RegExp.$1\n      if (!(name in containers)) name = '*'\n\n      container = containers[name]\n      container.innerHTML = '' + html\n      dom = $.each(slice.call(container.childNodes), function(){\n        container.removeChild(this)\n      })\n    }\n\n    if (isPlainObject(properties)) {\n      nodes = $(dom)\n      $.each(properties, function(key, value) {\n        if (methodAttributes.indexOf(key) > -1) nodes[key](value)\n        else nodes.attr(key, value)\n      })\n    }\n\n    return dom\n  }\n\n  // `$.zepto.Z` swaps out the prototype of the given `dom` array\n  // of nodes with `$.fn` and thus supplying all the Zepto functions\n  // to the array. This method can be overridden in plugins.\n  zepto.Z = function(dom, selector) {\n    return new Z(dom, selector)\n  }\n\n  // `$.zepto.isZ` should return `true` if the given object is a Zepto\n  // collection. This method can be overridden in plugins.\n  zepto.isZ = function(object) {\n    return object instanceof zepto.Z\n  }\n\n  // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and\n  // takes a CSS selector and an optional context (and handles various\n  // special cases).\n  // This method can be overridden in plugins.\n  zepto.init = function(selector, context) {\n    var dom\n    // If nothing given, return an empty Zepto collection\n    if (!selector) return zepto.Z()\n    // Optimize for string selectors\n    else if (typeof selector == 'string') {\n      selector = selector.trim()\n      // If it's a html fragment, create nodes from it\n      // Note: In both Chrome 21 and Firefox 15, DOM error 12\n      // is thrown if the fragment doesn't begin with <\n      if (selector[0] == '<' && fragmentRE.test(selector))\n        dom = zepto.fragment(selector, RegExp.$1, context), selector = null\n      // If there's a context, create a collection on that context first, and select\n      // nodes from there\n      else if (context !== undefined) return $(context).find(selector)\n      // If it's a CSS selector, use it to select nodes.\n      else dom = zepto.qsa(document, selector)\n    }\n    // If a function is given, call it when the DOM is ready\n    else if (isFunction(selector)) return $(document).ready(selector)\n    // If a Zepto collection is given, just return it\n    else if (zepto.isZ(selector)) return selector\n    else {\n      // normalize array if an array of nodes is given\n      if (isArray(selector)) dom = compact(selector)\n      // Wrap DOM nodes.\n      else if (isObject(selector))\n        dom = [selector], selector = null\n      // If it's a html fragment, create nodes from it\n      else if (fragmentRE.test(selector))\n        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null\n      // If there's a context, create a collection on that context first, and select\n      // nodes from there\n      else if (context !== undefined) return $(context).find(selector)\n      // And last but no least, if it's a CSS selector, use it to select nodes.\n      else dom = zepto.qsa(document, selector)\n    }\n    // create a new Zepto collection from the nodes found\n    return zepto.Z(dom, selector)\n  }\n\n  // `$` will be the base `Zepto` object. When calling this\n  // function just call `$.zepto.init, which makes the implementation\n  // details of selecting nodes and creating Zepto collections\n  // patchable in plugins.\n  $ = function(selector, context){\n    return zepto.init(selector, context)\n  }\n\n  function extend(target, source, deep) {\n    for (key in source)\n      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {\n        if (isPlainObject(source[key]) && !isPlainObject(target[key]))\n          target[key] = {}\n        if (isArray(source[key]) && !isArray(target[key]))\n          target[key] = []\n        extend(target[key], source[key], deep)\n      }\n      else if (source[key] !== undefined) target[key] = source[key]\n  }\n\n  // Copy all but undefined properties from one or more\n  // objects to the `target` object.\n  $.extend = function(target){\n    var deep, args = slice.call(arguments, 1)\n    if (typeof target == 'boolean') {\n      deep = target\n      target = args.shift()\n    }\n    args.forEach(function(arg){ extend(target, arg, deep) })\n    return target\n  }\n\n  // `$.zepto.qsa` is Zepto's CSS selector implementation which\n  // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.\n  // This method can be overridden in plugins.\n  zepto.qsa = function(element, selector){\n    var found,\n        maybeID = selector[0] == '#',\n        maybeClass = !maybeID && selector[0] == '.',\n        nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked\n        isSimple = simpleSelectorRE.test(nameOnly)\n    return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById\n      ( (found = element.getElementById(nameOnly)) ? [found] : [] ) :\n      (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :\n      slice.call(\n        isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName\n          maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class\n          element.getElementsByTagName(selector) : // Or a tag\n          element.querySelectorAll(selector) // Or it's not simple, and we need to query all\n      )\n  }\n\n  function filtered(nodes, selector) {\n    return selector == null ? $(nodes) : $(nodes).filter(selector)\n  }\n\n  $.contains = document.documentElement.contains ?\n    function(parent, node) {\n      return parent !== node && parent.contains(node)\n    } :\n    function(parent, node) {\n      while (node && (node = node.parentNode))\n        if (node === parent) return true\n      return false\n    }\n\n  function funcArg(context, arg, idx, payload) {\n    return isFunction(arg) ? arg.call(context, idx, payload) : arg\n  }\n\n  function setAttribute(node, name, value) {\n    value == null ? node.removeAttribute(name) : node.setAttribute(name, value)\n  }\n\n  // access className property while respecting SVGAnimatedString\n  function className(node, value){\n    var klass = node.className || '',\n        svg   = klass && klass.baseVal !== undefined\n\n    if (value === undefined) return svg ? klass.baseVal : klass\n    svg ? (klass.baseVal = value) : (node.className = value)\n  }\n\n  // \"true\"  => true\n  // \"false\" => false\n  // \"null\"  => null\n  // \"42\"    => 42\n  // \"42.5\"  => 42.5\n  // \"08\"    => \"08\"\n  // JSON    => parse if valid\n  // String  => self\n  function deserializeValue(value) {\n    try {\n      return value ?\n        value == \"true\" ||\n        ( value == \"false\" ? false :\n          value == \"null\" ? null :\n          +value + \"\" == value ? +value :\n          /^[\\[\\{]/.test(value) ? $.parseJSON(value) :\n          value )\n        : value\n    } catch(e) {\n      return value\n    }\n  }\n\n  $.type = type\n  $.isFunction = isFunction\n  $.isWindow = isWindow\n  $.isArray = isArray\n  $.isPlainObject = isPlainObject\n\n  $.isEmptyObject = function(obj) {\n    var name\n    for (name in obj) return false\n    return true\n  }\n\n  $.isNumeric = function(val) {\n    var num = Number(val), type = typeof val\n    return val != null && type != 'boolean' &&\n      (type != 'string' || val.length) &&\n      !isNaN(num) && isFinite(num) || false\n  }\n\n  $.inArray = function(elem, array, i){\n    return emptyArray.indexOf.call(array, elem, i)\n  }\n\n  $.camelCase = camelize\n  $.trim = function(str) {\n    return str == null ? \"\" : String.prototype.trim.call(str)\n  }\n\n  // plugin compatibility\n  $.uuid = 0\n  $.support = { }\n  $.expr = { }\n  $.noop = function() {}\n\n  $.map = function(elements, callback){\n    var value, values = [], i, key\n    if (likeArray(elements))\n      for (i = 0; i < elements.length; i++) {\n        value = callback(elements[i], i)\n        if (value != null) values.push(value)\n      }\n    else\n      for (key in elements) {\n        value = callback(elements[key], key)\n        if (value != null) values.push(value)\n      }\n    return flatten(values)\n  }\n\n  $.each = function(elements, callback){\n    var i, key\n    if (likeArray(elements)) {\n      for (i = 0; i < elements.length; i++)\n        if (callback.call(elements[i], i, elements[i]) === false) return elements\n    } else {\n      for (key in elements)\n        if (callback.call(elements[key], key, elements[key]) === false) return elements\n    }\n\n    return elements\n  }\n\n  $.grep = function(elements, callback){\n    return filter.call(elements, callback)\n  }\n\n  if (window.JSON) $.parseJSON = JSON.parse\n\n  // Populate the class2type map\n  $.each(\"Boolean Number String Function Array Date RegExp Object Error\".split(\" \"), function(i, name) {\n    class2type[ \"[object \" + name + \"]\" ] = name.toLowerCase()\n  })\n\n  // Define methods that will be available on all\n  // Zepto collections\n  $.fn = {\n    constructor: zepto.Z,\n    length: 0,\n\n    // Because a collection acts like an array\n    // copy over these useful array functions.\n    forEach: emptyArray.forEach,\n    reduce: emptyArray.reduce,\n    push: emptyArray.push,\n    sort: emptyArray.sort,\n    splice: emptyArray.splice,\n    indexOf: emptyArray.indexOf,\n    concat: function(){\n      var i, value, args = []\n      for (i = 0; i < arguments.length; i++) {\n        value = arguments[i]\n        args[i] = zepto.isZ(value) ? value.toArray() : value\n      }\n      return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)\n    },\n\n    // `map` and `slice` in the jQuery API work differently\n    // from their array counterparts\n    map: function(fn){\n      return $($.map(this, function(el, i){ return fn.call(el, i, el) }))\n    },\n    slice: function(){\n      return $(slice.apply(this, arguments))\n    },\n\n    ready: function(callback){\n      // need to check if document.body exists for IE as that browser reports\n      // document ready when it hasn't yet created the body element\n      if (readyRE.test(document.readyState) && document.body) callback($)\n      else document.addEventListener('DOMContentLoaded', function(){ callback($) }, false)\n      return this\n    },\n    get: function(idx){\n      return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]\n    },\n    toArray: function(){ return this.get() },\n    size: function(){\n      return this.length\n    },\n    remove: function(){\n      return this.each(function(){\n        if (this.parentNode != null)\n          this.parentNode.removeChild(this)\n      })\n    },\n    each: function(callback){\n      emptyArray.every.call(this, function(el, idx){\n        return callback.call(el, idx, el) !== false\n      })\n      return this\n    },\n    filter: function(selector){\n      if (isFunction(selector)) return this.not(this.not(selector))\n      return $(filter.call(this, function(element){\n        return zepto.matches(element, selector)\n      }))\n    },\n    add: function(selector,context){\n      return $(uniq(this.concat($(selector,context))))\n    },\n    is: function(selector){\n      return this.length > 0 && zepto.matches(this[0], selector)\n    },\n    not: function(selector){\n      var nodes=[]\n      if (isFunction(selector) && selector.call !== undefined)\n        this.each(function(idx){\n          if (!selector.call(this,idx)) nodes.push(this)\n        })\n      else {\n        var excludes = typeof selector == 'string' ? this.filter(selector) :\n          (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)\n        this.forEach(function(el){\n          if (excludes.indexOf(el) < 0) nodes.push(el)\n        })\n      }\n      return $(nodes)\n    },\n    has: function(selector){\n      return this.filter(function(){\n        return isObject(selector) ?\n          $.contains(this, selector) :\n          $(this).find(selector).size()\n      })\n    },\n    eq: function(idx){\n      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)\n    },\n    first: function(){\n      var el = this[0]\n      return el && !isObject(el) ? el : $(el)\n    },\n    last: function(){\n      var el = this[this.length - 1]\n      return el && !isObject(el) ? el : $(el)\n    },\n    find: function(selector){\n      var result, $this = this\n      if (!selector) result = $()\n      else if (typeof selector == 'object')\n        result = $(selector).filter(function(){\n          var node = this\n          return emptyArray.some.call($this, function(parent){\n            return $.contains(parent, node)\n          })\n        })\n      else if (this.length == 1) result = $(zepto.qsa(this[0], selector))\n      else result = this.map(function(){ return zepto.qsa(this, selector) })\n      return result\n    },\n    closest: function(selector, context){\n      var nodes = [], collection = typeof selector == 'object' && $(selector)\n      this.each(function(_, node){\n        while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))\n          node = node !== context && !isDocument(node) && node.parentNode\n        if (node && nodes.indexOf(node) < 0) nodes.push(node)\n      })\n      return $(nodes)\n    },\n    parents: function(selector){\n      var ancestors = [], nodes = this\n      while (nodes.length > 0)\n        nodes = $.map(nodes, function(node){\n          if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {\n            ancestors.push(node)\n            return node\n          }\n        })\n      return filtered(ancestors, selector)\n    },\n    parent: function(selector){\n      return filtered(uniq(this.pluck('parentNode')), selector)\n    },\n    children: function(selector){\n      return filtered(this.map(function(){ return children(this) }), selector)\n    },\n    contents: function() {\n      return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })\n    },\n    siblings: function(selector){\n      return filtered(this.map(function(i, el){\n        return filter.call(children(el.parentNode), function(child){ return child!==el })\n      }), selector)\n    },\n    empty: function(){\n      return this.each(function(){ this.innerHTML = '' })\n    },\n    // `pluck` is borrowed from Prototype.js\n    pluck: function(property){\n      return $.map(this, function(el){ return el[property] })\n    },\n    show: function(){\n      return this.each(function(){\n        this.style.display == \"none\" && (this.style.display = '')\n        if (getComputedStyle(this, '').getPropertyValue(\"display\") == \"none\")\n          this.style.display = defaultDisplay(this.nodeName)\n      })\n    },\n    replaceWith: function(newContent){\n      return this.before(newContent).remove()\n    },\n    wrap: function(structure){\n      var func = isFunction(structure)\n      if (this[0] && !func)\n        var dom   = $(structure).get(0),\n            clone = dom.parentNode || this.length > 1\n\n      return this.each(function(index){\n        $(this).wrapAll(\n          func ? structure.call(this, index) :\n            clone ? dom.cloneNode(true) : dom\n        )\n      })\n    },\n    wrapAll: function(structure){\n      if (this[0]) {\n        $(this[0]).before(structure = $(structure))\n        var children\n        // drill down to the inmost element\n        while ((children = structure.children()).length) structure = children.first()\n        $(structure).append(this)\n      }\n      return this\n    },\n    wrapInner: function(structure){\n      var func = isFunction(structure)\n      return this.each(function(index){\n        var self = $(this), contents = self.contents(),\n            dom  = func ? structure.call(this, index) : structure\n        contents.length ? contents.wrapAll(dom) : self.append(dom)\n      })\n    },\n    unwrap: function(){\n      this.parent().each(function(){\n        $(this).replaceWith($(this).children())\n      })\n      return this\n    },\n    clone: function(){\n      return this.map(function(){ return this.cloneNode(true) })\n    },\n    hide: function(){\n      return this.css(\"display\", \"none\")\n    },\n    toggle: function(setting){\n      return this.each(function(){\n        var el = $(this)\n        ;(setting === undefined ? el.css(\"display\") == \"none\" : setting) ? el.show() : el.hide()\n      })\n    },\n    prev: function(selector){ return $(this.pluck('previousElementSibling')).filter(selector || '*') },\n    next: function(selector){ return $(this.pluck('nextElementSibling')).filter(selector || '*') },\n    html: function(html){\n      return 0 in arguments ?\n        this.each(function(idx){\n          var originHtml = this.innerHTML\n          $(this).empty().append( funcArg(this, html, idx, originHtml) )\n        }) :\n        (0 in this ? this[0].innerHTML : null)\n    },\n    text: function(text){\n      return 0 in arguments ?\n        this.each(function(idx){\n          var newText = funcArg(this, text, idx, this.textContent)\n          this.textContent = newText == null ? '' : ''+newText\n        }) :\n        (0 in this ? this.pluck('textContent').join(\"\") : null)\n    },\n    attr: function(name, value){\n      var result\n      return (typeof name == 'string' && !(1 in arguments)) ?\n        (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :\n        this.each(function(idx){\n          if (this.nodeType !== 1) return\n          if (isObject(name)) for (key in name) setAttribute(this, key, name[key])\n          else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))\n        })\n    },\n    removeAttr: function(name){\n      return this.each(function(){ this.nodeType === 1 && name.split(' ').forEach(function(attribute){\n        setAttribute(this, attribute)\n      }, this)})\n    },\n    prop: function(name, value){\n      name = propMap[name] || name\n      return (1 in arguments) ?\n        this.each(function(idx){\n          this[name] = funcArg(this, value, idx, this[name])\n        }) :\n        (this[0] && this[0][name])\n    },\n    removeProp: function(name){\n      name = propMap[name] || name\n      return this.each(function(){ delete this[name] })\n    },\n    data: function(name, value){\n      var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()\n\n      var data = (1 in arguments) ?\n        this.attr(attrName, value) :\n        this.attr(attrName)\n\n      return data !== null ? deserializeValue(data) : undefined\n    },\n    val: function(value){\n      if (0 in arguments) {\n        if (value == null) value = \"\"\n        return this.each(function(idx){\n          this.value = funcArg(this, value, idx, this.value)\n        })\n      } else {\n        return this[0] && (this[0].multiple ?\n           $(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :\n           this[0].value)\n      }\n    },\n    offset: function(coordinates){\n      if (coordinates) return this.each(function(index){\n        var $this = $(this),\n            coords = funcArg(this, coordinates, index, $this.offset()),\n            parentOffset = $this.offsetParent().offset(),\n            props = {\n              top:  coords.top  - parentOffset.top,\n              left: coords.left - parentOffset.left\n            }\n\n        if ($this.css('position') == 'static') props['position'] = 'relative'\n        $this.css(props)\n      })\n      if (!this.length) return null\n      if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))\n        return {top: 0, left: 0}\n      var obj = this[0].getBoundingClientRect()\n      return {\n        left: obj.left + window.pageXOffset,\n        top: obj.top + window.pageYOffset,\n        width: Math.round(obj.width),\n        height: Math.round(obj.height)\n      }\n    },\n    css: function(property, value){\n      if (arguments.length < 2) {\n        var element = this[0]\n        if (typeof property == 'string') {\n          if (!element) return\n          return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)\n        } else if (isArray(property)) {\n          if (!element) return\n          var props = {}\n          var computedStyle = getComputedStyle(element, '')\n          $.each(property, function(_, prop){\n            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))\n          })\n          return props\n        }\n      }\n\n      var css = ''\n      if (type(property) == 'string') {\n        if (!value && value !== 0)\n          this.each(function(){ this.style.removeProperty(dasherize(property)) })\n        else\n          css = dasherize(property) + \":\" + maybeAddPx(property, value)\n      } else {\n        for (key in property)\n          if (!property[key] && property[key] !== 0)\n            this.each(function(){ this.style.removeProperty(dasherize(key)) })\n          else\n            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'\n      }\n\n      return this.each(function(){ this.style.cssText += ';' + css })\n    },\n    index: function(element){\n      return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])\n    },\n    hasClass: function(name){\n      if (!name) return false\n      return emptyArray.some.call(this, function(el){\n        return this.test(className(el))\n      }, classRE(name))\n    },\n    addClass: function(name){\n      if (!name) return this\n      return this.each(function(idx){\n        if (!('className' in this)) return\n        classList = []\n        var cls = className(this), newName = funcArg(this, name, idx, cls)\n        newName.split(/\\s+/g).forEach(function(klass){\n          if (!$(this).hasClass(klass)) classList.push(klass)\n        }, this)\n        classList.length && className(this, cls + (cls ? \" \" : \"\") + classList.join(\" \"))\n      })\n    },\n    removeClass: function(name){\n      return this.each(function(idx){\n        if (!('className' in this)) return\n        if (name === undefined) return className(this, '')\n        classList = className(this)\n        funcArg(this, name, idx, classList).split(/\\s+/g).forEach(function(klass){\n          classList = classList.replace(classRE(klass), \" \")\n        })\n        className(this, classList.trim())\n      })\n    },\n    toggleClass: function(name, when){\n      if (!name) return this\n      return this.each(function(idx){\n        var $this = $(this), names = funcArg(this, name, idx, className(this))\n        names.split(/\\s+/g).forEach(function(klass){\n          (when === undefined ? !$this.hasClass(klass) : when) ?\n            $this.addClass(klass) : $this.removeClass(klass)\n        })\n      })\n    },\n    scrollTop: function(value){\n      if (!this.length) return\n      var hasScrollTop = 'scrollTop' in this[0]\n      if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset\n      return this.each(hasScrollTop ?\n        function(){ this.scrollTop = value } :\n        function(){ this.scrollTo(this.scrollX, value) })\n    },\n    scrollLeft: function(value){\n      if (!this.length) return\n      var hasScrollLeft = 'scrollLeft' in this[0]\n      if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset\n      return this.each(hasScrollLeft ?\n        function(){ this.scrollLeft = value } :\n        function(){ this.scrollTo(value, this.scrollY) })\n    },\n    position: function() {\n      if (!this.length) return\n\n      var elem = this[0],\n        // Get *real* offsetParent\n        offsetParent = this.offsetParent(),\n        // Get correct offsets\n        offset       = this.offset(),\n        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()\n\n      // Subtract element margins\n      // note: when an element has margin: auto the offsetLeft and marginLeft\n      // are the same in Safari causing offset.left to incorrectly be 0\n      offset.top  -= parseFloat( $(elem).css('margin-top') ) || 0\n      offset.left -= parseFloat( $(elem).css('margin-left') ) || 0\n\n      // Add offsetParent borders\n      parentOffset.top  += parseFloat( $(offsetParent[0]).css('border-top-width') ) || 0\n      parentOffset.left += parseFloat( $(offsetParent[0]).css('border-left-width') ) || 0\n\n      // Subtract the two offsets\n      return {\n        top:  offset.top  - parentOffset.top,\n        left: offset.left - parentOffset.left\n      }\n    },\n    offsetParent: function() {\n      return this.map(function(){\n        var parent = this.offsetParent || document.body\n        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css(\"position\") == \"static\")\n          parent = parent.offsetParent\n        return parent\n      })\n    }\n  }\n\n  // for now\n  $.fn.detach = $.fn.remove\n\n  // Generate the `width` and `height` functions\n  ;['width', 'height'].forEach(function(dimension){\n    var dimensionProperty =\n      dimension.replace(/./, function(m){ return m[0].toUpperCase() })\n\n    $.fn[dimension] = function(value){\n      var offset, el = this[0]\n      if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :\n        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :\n        (offset = this.offset()) && offset[dimension]\n      else return this.each(function(idx){\n        el = $(this)\n        el.css(dimension, funcArg(this, value, idx, el[dimension]()))\n      })\n    }\n  })\n\n  function traverseNode(node, fun) {\n    fun(node)\n    for (var i = 0, len = node.childNodes.length; i < len; i++)\n      traverseNode(node.childNodes[i], fun)\n  }\n\n  // Generate the `after`, `prepend`, `before`, `append`,\n  // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.\n  adjacencyOperators.forEach(function(operator, operatorIndex) {\n    var inside = operatorIndex % 2 //=> prepend, append\n\n    $.fn[operator] = function(){\n      // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings\n      var argType, nodes = $.map(arguments, function(arg) {\n            var arr = []\n            argType = type(arg)\n            if (argType == \"array\") {\n              arg.forEach(function(el) {\n                if (el.nodeType !== undefined) return arr.push(el)\n                else if ($.zepto.isZ(el)) return arr = arr.concat(el.get())\n                arr = arr.concat(zepto.fragment(el))\n              })\n              return arr\n            }\n            return argType == \"object\" || arg == null ?\n              arg : zepto.fragment(arg)\n          }),\n          parent, copyByClone = this.length > 1\n      if (nodes.length < 1) return this\n\n      return this.each(function(_, target){\n        parent = inside ? target : target.parentNode\n\n        // convert all methods to a \"before\" operation\n        target = operatorIndex == 0 ? target.nextSibling :\n                 operatorIndex == 1 ? target.firstChild :\n                 operatorIndex == 2 ? target :\n                 null\n\n        var parentInDocument = $.contains(document.documentElement, parent)\n\n        nodes.forEach(function(node){\n          if (copyByClone) node = node.cloneNode(true)\n          else if (!parent) return $(node).remove()\n\n          parent.insertBefore(node, target)\n          if (parentInDocument) traverseNode(node, function(el){\n            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&\n               (!el.type || el.type === 'text/javascript') && !el.src){\n              var target = el.ownerDocument ? el.ownerDocument.defaultView : window\n              target['eval'].call(target, el.innerHTML)\n            }\n          })\n        })\n      })\n    }\n\n    // after    => insertAfter\n    // prepend  => prependTo\n    // before   => insertBefore\n    // append   => appendTo\n    $.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){\n      $(html)[operator](this)\n      return this\n    }\n  })\n\n  zepto.Z.prototype = Z.prototype = $.fn\n\n  // Export internal API functions in the `$.zepto` namespace\n  zepto.uniq = uniq\n  zepto.deserializeValue = deserializeValue\n  $.zepto = zepto\n\n  return $\n})()\n\nwindow.Zepto = Zepto\nwindow.$ === undefined && (window.$ = Zepto)\n\n;(function($){\n  var _zid = 1, undefined,\n      slice = Array.prototype.slice,\n      isFunction = $.isFunction,\n      isString = function(obj){ return typeof obj == 'string' },\n      handlers = {},\n      specialEvents={},\n      focusinSupported = 'onfocusin' in window,\n      focus = { focus: 'focusin', blur: 'focusout' },\n      hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }\n\n  specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'\n\n  function zid(element) {\n    return element._zid || (element._zid = _zid++)\n  }\n  function findHandlers(element, event, fn, selector) {\n    event = parse(event)\n    if (event.ns) var matcher = matcherFor(event.ns)\n    return (handlers[zid(element)] || []).filter(function(handler) {\n      return handler\n        && (!event.e  || handler.e == event.e)\n        && (!event.ns || matcher.test(handler.ns))\n        && (!fn       || zid(handler.fn) === zid(fn))\n        && (!selector || handler.sel == selector)\n    })\n  }\n  function parse(event) {\n    var parts = ('' + event).split('.')\n    return {e: parts[0], ns: parts.slice(1).sort().join(' ')}\n  }\n  function matcherFor(ns) {\n    return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')\n  }\n\n  function eventCapture(handler, captureSetting) {\n    return handler.del &&\n      (!focusinSupported && (handler.e in focus)) ||\n      !!captureSetting\n  }\n\n  function realEvent(type) {\n    return hover[type] || (focusinSupported && focus[type]) || type\n  }\n\n  function add(element, events, fn, data, selector, delegator, capture){\n    var id = zid(element), set = (handlers[id] || (handlers[id] = []))\n    events.split(/\\s/).forEach(function(event){\n      if (event == 'ready') return $(document).ready(fn)\n      var handler   = parse(event)\n      handler.fn    = fn\n      handler.sel   = selector\n      // emulate mouseenter, mouseleave\n      if (handler.e in hover) fn = function(e){\n        var related = e.relatedTarget\n        if (!related || (related !== this && !$.contains(this, related)))\n          return handler.fn.apply(this, arguments)\n      }\n      handler.del   = delegator\n      var callback  = delegator || fn\n      handler.proxy = function(e){\n        e = compatible(e)\n        if (e.isImmediatePropagationStopped()) return\n        e.data = data\n        var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))\n        if (result === false) e.preventDefault(), e.stopPropagation()\n        return result\n      }\n      handler.i = set.length\n      set.push(handler)\n      if ('addEventListener' in element)\n        element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))\n    })\n  }\n  function remove(element, events, fn, selector, capture){\n    var id = zid(element)\n    ;(events || '').split(/\\s/).forEach(function(event){\n      findHandlers(element, event, fn, selector).forEach(function(handler){\n        delete handlers[id][handler.i]\n      if ('removeEventListener' in element)\n        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))\n      })\n    })\n  }\n\n  $.event = { add: add, remove: remove }\n\n  $.proxy = function(fn, context) {\n    var args = (2 in arguments) && slice.call(arguments, 2)\n    if (isFunction(fn)) {\n      var proxyFn = function(){ return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }\n      proxyFn._zid = zid(fn)\n      return proxyFn\n    } else if (isString(context)) {\n      if (args) {\n        args.unshift(fn[context], fn)\n        return $.proxy.apply(null, args)\n      } else {\n        return $.proxy(fn[context], fn)\n      }\n    } else {\n      throw new TypeError(\"expected function\")\n    }\n  }\n\n  $.fn.bind = function(event, data, callback){\n    return this.on(event, data, callback)\n  }\n  $.fn.unbind = function(event, callback){\n    return this.off(event, callback)\n  }\n  $.fn.one = function(event, selector, data, callback){\n    return this.on(event, selector, data, callback, 1)\n  }\n\n  var returnTrue = function(){return true},\n      returnFalse = function(){return false},\n      ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,\n      eventMethods = {\n        preventDefault: 'isDefaultPrevented',\n        stopImmediatePropagation: 'isImmediatePropagationStopped',\n        stopPropagation: 'isPropagationStopped'\n      }\n\n  function compatible(event, source) {\n    if (source || !event.isDefaultPrevented) {\n      source || (source = event)\n\n      $.each(eventMethods, function(name, predicate) {\n        var sourceMethod = source[name]\n        event[name] = function(){\n          this[predicate] = returnTrue\n          return sourceMethod && sourceMethod.apply(source, arguments)\n        }\n        event[predicate] = returnFalse\n      })\n\n      event.timeStamp || (event.timeStamp = Date.now())\n\n      if (source.defaultPrevented !== undefined ? source.defaultPrevented :\n          'returnValue' in source ? source.returnValue === false :\n          source.getPreventDefault && source.getPreventDefault())\n        event.isDefaultPrevented = returnTrue\n    }\n    return event\n  }\n\n  function createProxy(event) {\n    var key, proxy = { originalEvent: event }\n    for (key in event)\n      if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]\n\n    return compatible(proxy, event)\n  }\n\n  $.fn.delegate = function(selector, event, callback){\n    return this.on(event, selector, callback)\n  }\n  $.fn.undelegate = function(selector, event, callback){\n    return this.off(event, selector, callback)\n  }\n\n  $.fn.live = function(event, callback){\n    $(document.body).delegate(this.selector, event, callback)\n    return this\n  }\n  $.fn.die = function(event, callback){\n    $(document.body).undelegate(this.selector, event, callback)\n    return this\n  }\n\n  $.fn.on = function(event, selector, data, callback, one){\n    var autoRemove, delegator, $this = this\n    if (event && !isString(event)) {\n      $.each(event, function(type, fn){\n        $this.on(type, selector, data, fn, one)\n      })\n      return $this\n    }\n\n    if (!isString(selector) && !isFunction(callback) && callback !== false)\n      callback = data, data = selector, selector = undefined\n    if (callback === undefined || data === false)\n      callback = data, data = undefined\n\n    if (callback === false) callback = returnFalse\n\n    return $this.each(function(_, element){\n      if (one) autoRemove = function(e){\n        remove(element, e.type, callback)\n        return callback.apply(this, arguments)\n      }\n\n      if (selector) delegator = function(e){\n        var evt, match = $(e.target).closest(selector, element).get(0)\n        if (match && match !== element) {\n          evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element})\n          return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))\n        }\n      }\n\n      add(element, event, callback, data, selector, delegator || autoRemove)\n    })\n  }\n  $.fn.off = function(event, selector, callback){\n    var $this = this\n    if (event && !isString(event)) {\n      $.each(event, function(type, fn){\n        $this.off(type, selector, fn)\n      })\n      return $this\n    }\n\n    if (!isString(selector) && !isFunction(callback) && callback !== false)\n      callback = selector, selector = undefined\n\n    if (callback === false) callback = returnFalse\n\n    return $this.each(function(){\n      remove(this, event, callback, selector)\n    })\n  }\n\n  $.fn.trigger = function(event, args){\n    event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)\n    event._args = args\n    return this.each(function(){\n      // handle focus(), blur() by calling them directly\n      if (event.type in focus && typeof this[event.type] == \"function\") this[event.type]()\n      // items in the collection might not be DOM elements\n      else if ('dispatchEvent' in this) this.dispatchEvent(event)\n      else $(this).triggerHandler(event, args)\n    })\n  }\n\n  // triggers event handlers on current element just as if an event occurred,\n  // doesn't trigger an actual event, doesn't bubble\n  $.fn.triggerHandler = function(event, args){\n    var e, result\n    this.each(function(i, element){\n      e = createProxy(isString(event) ? $.Event(event) : event)\n      e._args = args\n      e.target = element\n      $.each(findHandlers(element, event.type || event), function(i, handler){\n        result = handler.proxy(e)\n        if (e.isImmediatePropagationStopped()) return false\n      })\n    })\n    return result\n  }\n\n  // shortcut methods for `.bind(event, fn)` for each event type\n  ;('focusin focusout focus blur load resize scroll unload click dblclick '+\n  'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave '+\n  'change select keydown keypress keyup error').split(' ').forEach(function(event) {\n    $.fn[event] = function(callback) {\n      return (0 in arguments) ?\n        this.bind(event, callback) :\n        this.trigger(event)\n    }\n  })\n\n  $.Event = function(type, props) {\n    if (!isString(type)) props = type, type = props.type\n    var event = document.createEvent(specialEvents[type] || 'Events'), bubbles = true\n    if (props) for (var name in props) (name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])\n    event.initEvent(type, bubbles, true)\n    return compatible(event)\n  }\n\n})(Zepto)\n\n;(function($){\n  var jsonpID = +new Date(),\n      document = window.document,\n      key,\n      name,\n      rscript = /<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi,\n      scriptTypeRE = /^(?:text|application)\\/javascript/i,\n      xmlTypeRE = /^(?:text|application)\\/xml/i,\n      jsonType = 'application/json',\n      htmlType = 'text/html',\n      blankRE = /^\\s*$/,\n      originAnchor = document.createElement('a')\n\n  originAnchor.href = window.location.href\n\n  // trigger a custom event and return false if it was cancelled\n  function triggerAndReturn(context, eventName, data) {\n    var event = $.Event(eventName)\n    $(context).trigger(event, data)\n    return !event.isDefaultPrevented()\n  }\n\n  // trigger an Ajax \"global\" event\n  function triggerGlobal(settings, context, eventName, data) {\n    if (settings.global) return triggerAndReturn(context || document, eventName, data)\n  }\n\n  // Number of active Ajax requests\n  $.active = 0\n\n  function ajaxStart(settings) {\n    if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')\n  }\n  function ajaxStop(settings) {\n    if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')\n  }\n\n  // triggers an extra global event \"ajaxBeforeSend\" that's like \"ajaxSend\" but cancelable\n  function ajaxBeforeSend(xhr, settings) {\n    var context = settings.context\n    if (settings.beforeSend.call(context, xhr, settings) === false ||\n        triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)\n      return false\n\n    triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])\n  }\n  function ajaxSuccess(data, xhr, settings, deferred) {\n    var context = settings.context, status = 'success'\n    settings.success.call(context, data, status, xhr)\n    if (deferred) deferred.resolveWith(context, [data, status, xhr])\n    triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])\n    ajaxComplete(status, xhr, settings)\n  }\n  // type: \"timeout\", \"error\", \"abort\", \"parsererror\"\n  function ajaxError(error, type, xhr, settings, deferred) {\n    var context = settings.context\n    settings.error.call(context, xhr, type, error)\n    if (deferred) deferred.rejectWith(context, [xhr, type, error])\n    triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])\n    ajaxComplete(type, xhr, settings)\n  }\n  // status: \"success\", \"notmodified\", \"error\", \"timeout\", \"abort\", \"parsererror\"\n  function ajaxComplete(status, xhr, settings) {\n    var context = settings.context\n    settings.complete.call(context, xhr, status)\n    triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])\n    ajaxStop(settings)\n  }\n\n  function ajaxDataFilter(data, type, settings) {\n    if (settings.dataFilter == empty) return data\n    var context = settings.context\n    return settings.dataFilter.call(context, data, type)\n  }\n\n  // Empty function, used as default callback\n  function empty() {}\n\n  $.ajaxJSONP = function(options, deferred){\n    if (!('type' in options)) return $.ajax(options)\n\n    var _callbackName = options.jsonpCallback,\n      callbackName = ($.isFunction(_callbackName) ?\n        _callbackName() : _callbackName) || ('Zepto' + (jsonpID++)),\n      script = document.createElement('script'),\n      originalCallback = window[callbackName],\n      responseData,\n      abort = function(errorType) {\n        $(script).triggerHandler('error', errorType || 'abort')\n      },\n      xhr = { abort: abort }, abortTimeout\n\n    if (deferred) deferred.promise(xhr)\n\n    $(script).on('load error', function(e, errorType){\n      clearTimeout(abortTimeout)\n      $(script).off().remove()\n\n      if (e.type == 'error' || !responseData) {\n        ajaxError(null, errorType || 'error', xhr, options, deferred)\n      } else {\n        ajaxSuccess(responseData[0], xhr, options, deferred)\n      }\n\n      window[callbackName] = originalCallback\n      if (responseData && $.isFunction(originalCallback))\n        originalCallback(responseData[0])\n\n      originalCallback = responseData = undefined\n    })\n\n    if (ajaxBeforeSend(xhr, options) === false) {\n      abort('abort')\n      return xhr\n    }\n\n    window[callbackName] = function(){\n      responseData = arguments\n    }\n\n    script.src = options.url.replace(/\\?(.+)=\\?/, '?$1=' + callbackName)\n    document.head.appendChild(script)\n\n    if (options.timeout > 0) abortTimeout = setTimeout(function(){\n      abort('timeout')\n    }, options.timeout)\n\n    return xhr\n  }\n\n  $.ajaxSettings = {\n    // Default type of request\n    type: 'GET',\n    // Callback that is executed before request\n    beforeSend: empty,\n    // Callback that is executed if the request succeeds\n    success: empty,\n    // Callback that is executed the the server drops error\n    error: empty,\n    // Callback that is executed on request complete (both: error and success)\n    complete: empty,\n    // The context for the callbacks\n    context: null,\n    // Whether to trigger \"global\" Ajax events\n    global: true,\n    // Transport\n    xhr: function () {\n      return new window.XMLHttpRequest()\n    },\n    // MIME types mapping\n    // IIS returns Javascript as \"application/x-javascript\"\n    accepts: {\n      script: 'text/javascript, application/javascript, application/x-javascript',\n      json:   jsonType,\n      xml:    'application/xml, text/xml',\n      html:   htmlType,\n      text:   'text/plain'\n    },\n    // Whether the request is to another domain\n    crossDomain: false,\n    // Default timeout\n    timeout: 0,\n    // Whether data should be serialized to string\n    processData: true,\n    // Whether the browser should be allowed to cache GET responses\n    cache: true,\n    //Used to handle the raw response data of XMLHttpRequest.\n    //This is a pre-filtering function to sanitize the response.\n    //The sanitized response should be returned\n    dataFilter: empty\n  }\n\n  function mimeToDataType(mime) {\n    if (mime) mime = mime.split(';', 2)[0]\n    return mime && ( mime == htmlType ? 'html' :\n      mime == jsonType ? 'json' :\n      scriptTypeRE.test(mime) ? 'script' :\n      xmlTypeRE.test(mime) && 'xml' ) || 'text'\n  }\n\n  function appendQuery(url, query) {\n    if (query == '') return url\n    return (url + '&' + query).replace(/[&?]{1,2}/, '?')\n  }\n\n  // serialize payload and append it to the URL for GET requests\n  function serializeData(options) {\n    if (options.processData && options.data && $.type(options.data) != \"string\")\n      options.data = $.param(options.data, options.traditional)\n    if (options.data && (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType))\n      options.url = appendQuery(options.url, options.data), options.data = undefined\n  }\n\n  $.ajax = function(options){\n    var settings = $.extend({}, options || {}),\n        deferred = $.Deferred && $.Deferred(),\n        urlAnchor, hashIndex\n    for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]\n\n    ajaxStart(settings)\n\n    if (!settings.crossDomain) {\n      urlAnchor = document.createElement('a')\n      urlAnchor.href = settings.url\n      // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049\n      urlAnchor.href = urlAnchor.href\n      settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)\n    }\n\n    if (!settings.url) settings.url = window.location.toString()\n    if ((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex)\n    serializeData(settings)\n\n    var dataType = settings.dataType, hasPlaceholder = /\\?.+=\\?/.test(settings.url)\n    if (hasPlaceholder) dataType = 'jsonp'\n\n    if (settings.cache === false || (\n         (!options || options.cache !== true) &&\n         ('script' == dataType || 'jsonp' == dataType)\n        ))\n      settings.url = appendQuery(settings.url, '_=' + Date.now())\n\n    if ('jsonp' == dataType) {\n      if (!hasPlaceholder)\n        settings.url = appendQuery(settings.url,\n          settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')\n      return $.ajaxJSONP(settings, deferred)\n    }\n\n    var mime = settings.accepts[dataType],\n        headers = { },\n        setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },\n        protocol = /^([\\w-]+:)\\/\\//.test(settings.url) ? RegExp.$1 : window.location.protocol,\n        xhr = settings.xhr(),\n        nativeSetHeader = xhr.setRequestHeader,\n        abortTimeout\n\n    if (deferred) deferred.promise(xhr)\n\n    if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')\n    setHeader('Accept', mime || '*/*')\n    if (mime = settings.mimeType || mime) {\n      if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]\n      xhr.overrideMimeType && xhr.overrideMimeType(mime)\n    }\n    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))\n      setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')\n\n    if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name])\n    xhr.setRequestHeader = setHeader\n\n    xhr.onreadystatechange = function(){\n      if (xhr.readyState == 4) {\n        xhr.onreadystatechange = empty\n        clearTimeout(abortTimeout)\n        var result, error = false\n        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {\n          dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))\n\n          if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')\n            result = xhr.response\n          else {\n            result = xhr.responseText\n\n            try {\n              // http://perfectionkills.com/global-eval-what-are-the-options/\n              // sanitize response accordingly if data filter callback provided\n              result = ajaxDataFilter(result, dataType, settings)\n              if (dataType == 'script')    (1,eval)(result)\n              else if (dataType == 'xml')  result = xhr.responseXML\n              else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)\n            } catch (e) { error = e }\n\n            if (error) return ajaxError(error, 'parsererror', xhr, settings, deferred)\n          }\n\n          ajaxSuccess(result, xhr, settings, deferred)\n        } else {\n          ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)\n        }\n      }\n    }\n\n    if (ajaxBeforeSend(xhr, settings) === false) {\n      xhr.abort()\n      ajaxError(null, 'abort', xhr, settings, deferred)\n      return xhr\n    }\n\n    var async = 'async' in settings ? settings.async : true\n    xhr.open(settings.type, settings.url, async, settings.username, settings.password)\n\n    if (settings.xhrFields) for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]\n\n    for (name in headers) nativeSetHeader.apply(xhr, headers[name])\n\n    if (settings.timeout > 0) abortTimeout = setTimeout(function(){\n        xhr.onreadystatechange = empty\n        xhr.abort()\n        ajaxError(null, 'timeout', xhr, settings, deferred)\n      }, settings.timeout)\n\n    // avoid sending empty string (#319)\n    xhr.send(settings.data ? settings.data : null)\n    return xhr\n  }\n\n  // handle optional data/success arguments\n  function parseArguments(url, data, success, dataType) {\n    if ($.isFunction(data)) dataType = success, success = data, data = undefined\n    if (!$.isFunction(success)) dataType = success, success = undefined\n    return {\n      url: url\n    , data: data\n    , success: success\n    , dataType: dataType\n    }\n  }\n\n  $.get = function(/* url, data, success, dataType */){\n    return $.ajax(parseArguments.apply(null, arguments))\n  }\n\n  $.post = function(/* url, data, success, dataType */){\n    var options = parseArguments.apply(null, arguments)\n    options.type = 'POST'\n    return $.ajax(options)\n  }\n\n  $.getJSON = function(/* url, data, success */){\n    var options = parseArguments.apply(null, arguments)\n    options.dataType = 'json'\n    return $.ajax(options)\n  }\n\n  $.fn.load = function(url, data, success){\n    if (!this.length) return this\n    var self = this, parts = url.split(/\\s/), selector,\n        options = parseArguments(url, data, success),\n        callback = options.success\n    if (parts.length > 1) options.url = parts[0], selector = parts[1]\n    options.success = function(response){\n      self.html(selector ?\n        $('<div>').html(response.replace(rscript, \"\")).find(selector)\n        : response)\n      callback && callback.apply(self, arguments)\n    }\n    $.ajax(options)\n    return this\n  }\n\n  var escape = encodeURIComponent\n\n  function serialize(params, obj, traditional, scope){\n    var type, array = $.isArray(obj), hash = $.isPlainObject(obj)\n    $.each(obj, function(key, value) {\n      type = $.type(value)\n      if (scope) key = traditional ? scope :\n        scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'\n      // handle data in serializeArray() format\n      if (!scope && array) params.add(value.name, value.value)\n      // recurse into nested objects\n      else if (type == \"array\" || (!traditional && type == \"object\"))\n        serialize(params, value, traditional, key)\n      else params.add(key, value)\n    })\n  }\n\n  $.param = function(obj, traditional){\n    var params = []\n    params.add = function(key, value) {\n      if ($.isFunction(value)) value = value()\n      if (value == null) value = \"\"\n      this.push(escape(key) + '=' + escape(value))\n    }\n    serialize(params, obj, traditional)\n    return params.join('&').replace(/%20/g, '+')\n  }\n})(Zepto)\n\n;(function($){\n  $.fn.serializeArray = function() {\n    var name, type, result = [],\n      add = function(value) {\n        if (value.forEach) return value.forEach(add)\n        result.push({ name: name, value: value })\n      }\n    if (this[0]) $.each(this[0].elements, function(_, field){\n      type = field.type, name = field.name\n      if (name && field.nodeName.toLowerCase() != 'fieldset' &&\n        !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&\n        ((type != 'radio' && type != 'checkbox') || field.checked))\n          add($(field).val())\n    })\n    return result\n  }\n\n  $.fn.serialize = function(){\n    var result = []\n    this.serializeArray().forEach(function(elm){\n      result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))\n    })\n    return result.join('&')\n  }\n\n  $.fn.submit = function(callback) {\n    if (0 in arguments) this.bind('submit', callback)\n    else if (this.length) {\n      var event = $.Event('submit')\n      this.eq(0).trigger(event)\n      if (!event.isDefaultPrevented()) this.get(0).submit()\n    }\n    return this\n  }\n\n})(Zepto)\n\n;(function(){\n  // getComputedStyle shouldn't freak out when called\n  // without a valid element as argument\n  try {\n    getComputedStyle(undefined)\n  } catch(e) {\n    var nativeGetComputedStyle = getComputedStyle\n    window.getComputedStyle = function(element, pseudoElement){\n      try {\n        return nativeGetComputedStyle(element, pseudoElement)\n      } catch(e) {\n        return null\n      }\n    }\n  }\n})()\n  return Zepto\n}))\n"

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/* eslint-disable */
	/**
	* Created by xiusiteng on 2016-08-12.
	* @desc 公共工具函数
	*/
	var jQuery = __webpack_require__(5);
	var API = __webpack_require__(6);
	var Cookie = __webpack_require__(7);

	;(function ($) {
	    var config = {
	        env: 'test',
	        url: 'http://localhost:3080',
	        cacheTime: 5
	    };
	    var Api = new API(config);
	    Cookie.set("dinge", "577cc175ffd27d3c2f325c6f");
	    // 增加foreach方法
	    if (!Array.prototype.forEach) {
	        Array.prototype.forEach = function (callback, thisArg) {
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
	                    kValue = O[k];
	                    callback.call(T, kValue, k, O);
	                }
	                k++;
	            }
	        };
	    }
	    var DingeTools = {
	        getURLParam: function getURLParam(key) {
	            var url = window.location;
	            var paramStrArr = url.href.split('?');
	            // alert(params[1]);
	            if (paramStrArr.length >= 2 && paramStrArr[1] != "") {
	                var paramStr = paramStrArr[1];
	                var paramArr = paramStr.split('&');
	                for (var index in paramArr) {
	                    var paramstr = paramArr[index]; //key=value
	                    var paramArray = paramstr.split('=');
	                    if (paramArray.length == 2 && paramArray[0] == key) {
	                        return paramArray[1];
	                    }
	                }
	            }
	            return null;
	        },
	        //重置表单
	        resetForm: function resetForm(opt) {
	            var _option = {
	                className: "form-group", //表单group值
	                errorClass: "has-error", //错误信息提示框
	                helpClass: "help-block", //错误信息提示
	                countDownClass: "btn-primary", //倒计时变化样式 
	                helpInfo: "获取验证码", //倒计时提示文字
	                countDown: "getvalidate" //倒计时button
	            };
	            var option = $.extend({}, _option, opt);
	            if (!option.formId) {
	                throw new Error("请传入要重置的表单ID");
	            }
	            $("#" + option.formId + " ." + option.className + "").each(function (index, ele) {
	                var inputText = $(ele).find($("input[type='text'], input[type='password'], input[type='email'], input[type='number']"));
	                var inputRadio = $(ele).find($("input[type='radio']"));
	                var inputCheckbox = $(ele).find($("input[type='checkbox']"));
	                var select = $(ele).find($("select"));
	                var textarea = $(ele).find($("textarea"));
	                var counter = $(ele).find($("." + option.countDown + ""));
	                if (inputText) {
	                    $(ele, inputText).removeClass("has-error");
	                    $(ele).find($("." + option.helpClass + "")).each(function (index, element) {
	                        $(element).html("");
	                    });
	                    inputText.val("");
	                }
	                if (inputRadio) {
	                    inputRadio.each(function (index, element) {
	                        element.checked = false;
	                        if (index == 0) {
	                            element.checked = true;
	                        }
	                    });
	                }
	                if (textarea) {
	                    textarea.val("");
	                }
	                if (inputCheckbox) {
	                    inputCheckbox.each(function (index, element) {
	                        element.checked = false;
	                        if (index == 0) {
	                            element.checked = true;
	                        }
	                    });
	                }
	                if (select.length > 0) {
	                    select.val(select.find("option")[0].val());
	                }
	                if (counter) {
	                    counter.removeClass(option.countDownClass);
	                    counter.attr("disabled", true);
	                    counter.html(option.helpInfo);
	                }
	            });
	        },
	        // 检测账户
	        checkAccount: function checkAccount(val) {
	            if (val.length < 1) {
	                return '账号不能为空！';
	            }
	            if (val.length > 10) {
	                return '账号不能大于10个字符！';
	            }
	        },
	        // 检测用户名
	        checkUsername: function checkUsername(val) {
	            if (val.length < 1) {
	                return "用户名不能为空！";
	            }
	            if (val.length > 8) {
	                return "用户名不能多于8个字符！";
	            }
	        },
	        // 检测邮箱
	        checkEmail: function checkEmail(val) {
	            var reg = /^\w{3,}@\w+(\.\w+)+$/;
	            if (!val) {
	                return "邮箱不能为空！";
	            }
	            if (!reg.test(val)) {
	                return "邮箱格式不正确！";
	            }
	        },
	        // 检测密码
	        checkPassword: function checkPassword(val) {
	            var regNumber = /^[a-zA-Z]+$/;
	            var regAscll = /^[a-zA-Z0-9]+$/;
	            var regLetter = /^[A-Z0-9]+$/;
	            if (val.length < 6) {
	                return "密码不能少于6位！";
	            }
	            if (val.length > 18) {
	                return "密码不能多于18位！";
	            }
	            if (regNumber.test(val)) {
	                return "密码至少包含一位数字";
	            }
	            if (regLetter.test(val)) {
	                return "密码至少包含一位小写字符";
	            }
	            if (!regAscll.test(val)) {
	                return "密码不能包含特殊字符";
	            }
	            /*if(regAscll.test(val)){
	                return "密码至少包含一位大写字符"
	            }*/
	        },
	        //  初始化底层font-size
	        init: function init() {
	            var evt = "onorientationchange" in window ? "orientationchange" : "resize";
	            var remPage = function remPage() {
	                document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
	            };
	            window.addEventListener(evt, remPage, false);
	            remPage();
	        },
	        // 左滑出现删除按钮
	        showDelete: function showDelete(ele) {
	            ele.on("swipeLeft", ".swiper-slide", function () {
	                $(this).find(".del_info_mask").show();
	                $(this).find(".info_slide").addClass("slide-left");
	                $(this).find(".del_info_btn").addClass("del_info_visible_normal");
	            });
	        },
	        // 关闭删除按钮
	        cancelDelete: function cancelDelete(ele) {
	            var self = this;
	            ele.on("click", '.del_info_mask', function (event) {
	                self.cancelBtn();
	            });
	        },
	        // 关闭删除特效
	        cancelBtn: function cancelBtn() {
	            if ($(".slide-left")) {
	                $(".slide-left").removeClass("slide-left");
	                $(".del_info_visible_normal").removeClass("del_info_visible_normal");
	                $(".del_info_mask").hide();
	            }
	        },
	        // 加载底部
	        loadingFooter2: function loadingFooter2() {
	            var dtd = $.Deferred();
	            $("#footer2").load("../views/footer2.html", function () {
	                dtd.resolve({ status: 1 });
	            });
	            return dtd;
	        },
	        // 初试化touchmove，解决tap中 swipe不生效的问题
	        initTouchMove: function initTouchMove() {
	            document.addEventListener("touchmove", function (event) {
	                event.preventDefault();
	            }, false);
	        },
	        // 向上返回
	        goBack: function goBack() {
	            $(".goback").on("tap", function () {
	                window.history.back();
	            });
	        },
	        // 获取url的参数
	        getQueryString: function getQueryString(name) {
	            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	            var r = window.location.search.substr(1).match(reg);
	            if (r != null) {
	                return unescape(r[2]);
	            }
	            return null;
	        },
	        // 时间格式化
	        format: function format(date, fmt) {
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
	                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	                }
	            }
	            return fmt;
	        },
	        // 距今时间的格式化
	        fromNow: function fromNow(fmt) {
	            var fmtStamp = new Date(fmt).getTime();
	            var now = Date.now();
	            var timeDiff = (now - fmtStamp) / 1000;
	            var tmpTime;
	            if (timeDiff < 60) {
	                fmt = "刚刚";
	                return fmt;
	            }
	            if (timeDiff < 3600 && timeDiff > 60) {
	                tmpTime = parseInt(timeDiff / 60);
	                fmt = tmpTime + "分钟前";
	            }
	            if (timeDiff < 86400 && timeDiff > 3600) {
	                tmpTime = parseInt(timeDiff / 3600);
	                fmt = tmpTime + "小时前";
	            }
	            if (timeDiff < 172800 && timeDiff > 86400) {
	                fmt = "昨天";
	            }
	            if (timeDiff < 1382400 && timeDiff > 172800) {
	                tmpTime = parseInt(timeDiff / 86400);
	                fmt = tmpTime + "天前";
	            }
	            if (timeDiff < 2592000 && timeDiff > 1382400) {
	                fmt = "1个月内";
	            }
	            if (timeDiff < 31536000 && timeDiff > 2592000) {
	                tmpTime = parseInt(timeDiff / 2592000);
	                fmt = tmpTime + "个月前";
	            }
	            if (timeDiff < 157680000 && timeDiff > 31536000) {
	                tmpTime = parseInt(timeDiff / 31536000);
	                fmt = tmpTime + "年前";
	            }
	            return fmt;
	        }
	    };
	    // 选择区域插件
	    DingeTools.LArea = function () {
	        var MobileArea = function MobileArea() {
	            this.gearArea;
	            this.data;
	            this.index = 0;
	            this.value = [0, 0, 0];
	        };
	        MobileArea.prototype = {
	            init: function init(params) {
	                this.params = params;
	                this.trigger = document.querySelector(params.trigger);
	                if (params.valueTo) {
	                    this.valueTo = document.querySelector(params.valueTo);
	                }
	                this.keys = params.keys;
	                this.type = params.type || 1;
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
	            getData: function getData(callback) {
	                var _self = this;
	                if (_typeof(_self.params.data) == "object") {
	                    _self.data = _self.params.data;
	                    callback();
	                } else {
	                    var xhr = new XMLHttpRequest();
	                    xhr.open('get', _self.params.data);
	                    xhr.onload = function (e) {
	                        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 0) {
	                            var responseData = JSON.parse(xhr.responseText);
	                            _self.data = responseData.data;
	                            if (callback) {
	                                callback();
	                            };
	                        }
	                    };
	                    xhr.send();
	                }
	            },
	            bindEvent: function bindEvent() {
	                var _self = this;
	                //呼出插件
	                function popupArea(e) {
	                    _self.gearArea = document.createElement("div");
	                    _self.gearArea.className = "gearArea";
	                    _self.gearArea.innerHTML = '<div class="area_ctrl slideInUp">' + '<div class="area_btn_box">' + '<div class="area_btn larea_cancel">取消</div>' + '<div class="area_btn larea_finish">确定</div>' + '</div>' + '<div class="area_roll_mask">' + '<div class="area_roll">' + '<div>' + '<div class="gear area_province" data-areatype="area_province"></div>' + '<div class="area_grid">' + '</div>' + '</div>' + '<div>' + '<div class="gear area_city" data-areatype="area_city"></div>' + '<div class="area_grid">' + '</div>' + '</div>' + '<div>' + '<div class="gear area_county" data-areatype="area_county"></div>' + '<div class="area_grid">' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
	                    document.body.appendChild(_self.gearArea);
	                    areaCtrlInit();
	                    var larea_cancel = _self.gearArea.querySelector(".larea_cancel");
	                    larea_cancel.addEventListener('touchstart', function (e) {
	                        _self.close(e);
	                    });
	                    var larea_finish = _self.gearArea.querySelector(".larea_finish");
	                    larea_finish.addEventListener('touchstart', function (e) {
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
	                            break;
	                        }
	                    }
	                    clearInterval(target["int_" + target.id]);
	                    target["old_" + target.id] = e.targetTouches[0].screenY;
	                    target["o_t_" + target.id] = new Date().getTime();
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
	                            break;
	                        }
	                    }
	                    target["new_" + target.id] = e.targetTouches[0].screenY;
	                    target["n_t_" + target.id] = new Date().getTime();
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
	                        target["spd_" + target.id] = flag < 0 ? -0.08 : 0.08;
	                    } else {
	                        if (Math.abs(flag) <= 0.5) {
	                            target["spd_" + target.id] = flag < 0 ? -0.16 : 0.16;
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
	                    target["int_" + target.id] = setInterval(function () {
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
	                            switch (target.dataset['areatype']) {
	                                case 'area_province':
	                                    _self.setGearTooth(_self.data[0]);
	                                    break;
	                                case 'area_city':
	                                    var ref = target.childNodes[val].getAttribute('ref');
	                                    var childData = [];
	                                    var nextData = _self.data[2];
	                                    for (var i in nextData) {
	                                        if (i == ref) {
	                                            childData = nextData[i];
	                                            break;
	                                        }
	                                    };
	                                    _self.index = 2;
	                                    _self.setGearTooth(childData);
	                                    break;
	                            }
	                    }
	                }
	                _self.getData(function () {
	                    _self.trigger.addEventListener('click', popupArea);
	                });
	            },
	            //重置节点个数
	            setGearTooth: function setGearTooth(data) {
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
	                            childData = item[gearVal].child;
	                            break;
	                        case 2:
	                            var nextData = _self.data[_self.index + 1];
	                            for (var i in nextData) {
	                                if (i == id) {
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
	                    gearChild[_self.index].style["-webkit-transform"] = 'translate3d(0,' + -gearVal * 2 + 'em,0)';
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
	                    if (_self.index == 1) {
	                        gearChild[2].innerHTML = "<div class='tooth'></div>";
	                        gearChild[2].setAttribute('val', 0);
	                    }
	                    _self.index = 0;
	                }
	            },
	            finish: function finish(e) {
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
	                _self.trigger.value = (provinceText + (cityText ? ',' + cityText : '') + (countyText ? ',' + countyText : '')).replace(",市辖区", "").replace(",县", "");
	                _self.value = [provinceVal, cityVal, countyVal];
	                if (this.valueTo) {
	                    this.valueTo.value = provinceCode + (cityCode ? ',' + cityCode : '') + (countyCode ? ',' + countyCode : '');
	                }
	                _self.close(e);
	            },
	            close: function close(e) {
	                e.preventDefault();
	                var _self = this;
	                var evt = new CustomEvent('input');
	                _self.trigger.dispatchEvent(evt);
	                document.body.removeChild(_self.gearArea);
	                _self.gearArea = null;
	            }
	        };
	        return MobileArea;
	    }();
	    // 选择时间插件
	    DingeTools.LCalendar = function () {
	        var MobileCalendar = function MobileCalendar() {
	            this.gearDate;
	            this.minY = 1900;
	            this.minM = 1;
	            this.minD = 1;
	            this.maxY = 2099;
	            this.maxM = 12;
	            this.maxD = 31;
	        };
	        MobileCalendar.prototype = {
	            init: function init(params) {
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
	            bindEvent: function bindEvent(type) {
	                var _self = this;
	                //呼出日期插件
	                function popupDate(e) {
	                    _self.gearDate = document.createElement("div");
	                    _self.gearDate.className = "gearDate";
	                    _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' + '<div class="date_btn_box">' + '<div class="date_btn lcalendar_cancel">取消</div>' + '<div class="date_btn lcalendar_finish">确定</div>' + '</div>' + '<div class="date_roll_mask">' + '<div class="date_roll">' + '<div>' + '<div class="gear date_yy" data-datetype="date_yy"></div>' + '<div class="date_grid">' + '<div>年</div>' + '</div>' + '</div>' + '<div>' + '<div class="gear date_mm" data-datetype="date_mm"></div>' + '<div class="date_grid">' + '<div>月</div>' + '</div>' + '</div>' + '<div>' + '<div class="gear date_dd" data-datetype="date_dd"></div>' + '<div class="date_grid">' + '<div>日</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
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
	                    _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' + '<div class="date_btn_box">' + '<div class="date_btn lcalendar_cancel">取消</div>' + '<div class="date_btn lcalendar_finish">确定</div>' + '</div>' + '<div class="date_roll_mask">' + '<div class="ym_roll">' + '<div>' + '<div class="gear date_yy" data-datetype="date_yy"></div>' + '<div class="date_grid">' + '<div>年</div>' + '</div>' + '</div>' + '<div>' + '<div class="gear date_mm" data-datetype="date_mm"></div>' + '<div class="date_grid">' + '<div>月</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
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
	                    _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' + '<div class="date_btn_box">' + '<div class="date_btn lcalendar_cancel">取消</div>' + '<div class="date_btn lcalendar_finish">确定</div>' + '</div>' + '<div class="date_roll_mask">' + '<div class="datetime_roll">' + '<div>' + '<div class="gear date_yy" data-datetype="date_yy"></div>' + '<div class="date_grid">' + '<div>年</div>' + '</div>' + '</div>' + '<div>' + '<div class="gear date_mm" data-datetype="date_mm"></div>' + '<div class="date_grid">' + '<div>月</div>' + '</div>' + '</div>' + '<div>' + '<div class="gear date_dd" data-datetype="date_dd"></div>' + '<div class="date_grid">' + '<div>日</div>' + '</div>' + '</div>' + '<div>' + '<div class="gear time_hh" data-datetype="time_hh"></div>' + '<div class="date_grid">' + '<div>时</div>' + '</div>' + '</div>' + '<div>' + '<div class="gear time_mm" data-datetype="time_mm"></div>' + '<div class="date_grid">' + '<div>分</div>' + '</div>' + '</div>' + '</div>' + //date_roll
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
	                    _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' + '<div class="date_btn_box">' + '<div class="date_btn lcalendar_cancel">取消</div>' + '<div class="date_btn lcalendar_finish">确定</div>' + '</div>' + '<div class="date_roll_mask">' + '<div class="time_roll">' + '<div>' + '<div class="gear time_hh" data-datetype="time_hh"></div>' + '<div class="date_grid">' + '<div>时</div>' + '</div>' + '</div>' + '<div>' + '<div class="gear time_mm" data-datetype="time_mm"></div>' + '<div class="date_grid">' + '<div>分</div>' + '</div>' + '</div>' + '</div>' + //time_roll
	                    '</div>' + '</div>';
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
	                        e.mm = parseInt(rs[1].replace(/:0?/g, ""));
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
	                            top % 2 == 0 ? top = top : top = top + 1;
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
	                        return;
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
	                        return;
	                    }
	                }
	                //求月份最大天数
	                function calcDays(year, month) {
	                    if (month == 1) {
	                        year += _self.minY;
	                        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0 && year % 4000 != 0) {
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
	                            break;
	                        }
	                    }
	                    clearInterval(target["int_" + target.id]);
	                    target["old_" + target.id] = e.targetTouches[0].screenY;
	                    target["o_t_" + target.id] = new Date().getTime();
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
	                            break;
	                        }
	                    }
	                    target["new_" + target.id] = e.targetTouches[0].screenY;
	                    target["n_t_" + target.id] = new Date().getTime();
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
	                        target["spd_" + target.id] = flag < 0 ? -0.08 : 0.08;
	                    } else {
	                        if (Math.abs(flag) <= 0.5) {
	                            target["spd_" + target.id] = flag < 0 ? -0.16 : 0.16;
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
	                    target["int_" + target.id] = setInterval(function () {
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
	                    setTimeout(function () {
	                        document.body.removeChild(_self.gearDate);
	                        _self.gearDate = null;
	                    }, 500);
	                }

	                //日期确认
	                function finishMobileDate(e) {
	                    var passY = _self.maxY - _self.minY + 1;
	                    var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
	                    var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
	                    date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
	                    var date_dd = parseInt(Math.round(_self.gearDate.querySelector(".date_dd").getAttribute("val"))) + 1;
	                    date_dd = date_dd > 9 ? date_dd : '0' + date_dd;
	                    _self.trigger.value = date_yy % passY + _self.minY + "-" + date_mm + "-" + date_dd;
	                    closeMobileCalendar(e);
	                }
	                //年月确认
	                function finishMobileYM(e) {
	                    var passY = _self.maxY - _self.minY + 1;
	                    var date_yy = parseInt(Math.round(_self.gearDate.querySelector(".date_yy").getAttribute("val")));
	                    var date_mm = parseInt(Math.round(_self.gearDate.querySelector(".date_mm").getAttribute("val"))) + 1;
	                    date_mm = date_mm > 9 ? date_mm : '0' + date_mm;
	                    _self.trigger.value = date_yy % passY + _self.minY + "-" + date_mm;
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
	                    _self.trigger.value = date_yy % passY + _self.minY + "-" + date_mm + "-" + date_dd + " " + (time_hh.length < 2 ? "0" : "") + time_hh + (time_mm.length < 2 ? ":0" : ":") + time_mm;
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
	        };
	        return MobileCalendar;
	    }();
	    DingeTools.LUploader = function (el, params) {
	        var _self = this;
	        _self.trigger = el;
	        _self.params = {
	            accept: 'image/*',
	            multiple: false,
	            maxsize: 102400,
	            imgObj: {},
	            showsize: false,
	            quality: 0.8,
	            url: ''
	        };
	        for (var param in params) {
	            _self.params[param] = params[param];
	        }
	        _self.init();
	    };
	    DingeTools.LUploader.prototype.init = function () {
	        var _self = this;
	        _self.trigger.setAttribute('accept', _self.params.accept);
	        _self.params.multiple && _self.trigger.setAttribute('multiple', '');

	        var btn = document.querySelector('#' + _self.trigger.getAttribute('data-LUploader'));
	        btn.addEventListener('click', function () {
	            _self.trigger.click();
	        });
	        _self.trigger.addEventListener('change', function () {
	            if (!this.files.length) return;
	            var files = Array.prototype.slice.call(this.files);
	            files.forEach(function (file, i) {
	                if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
	                var reader = new FileReader();
	                _self.params.imgObj.size = file.size / 1024 > 1024 ? ~~(10 * file.size / 1024 / 1024) / 10 + "MB" : ~~(file.size / 1024) + "KB";
	                var li = document.createElement("li");
	                li.innerHTML = '<div class="LUploader-progress"><span></span></div>';
	                if (_self.params.showsize) {
	                    var div_size = document.createElement('div');
	                    div_size.className = 'LUploader-size';
	                    div_size.textContent = _self.params.imgObj.size;
	                    li.appendChild(div_size);
	                }
	                var LUploaderList = _self.trigger.parentElement.querySelector('.LUploader-list');
	                if (!_self.params.multiple) {
	                    //假如是单个上传
	                    if (_self.old_li) {
	                        LUploaderList.removeChild(_self.old_li);
	                    } else {
	                        _self.old_li = li;
	                    }
	                }
	                LUploaderList.appendChild(li);
	                LUploaderList.parentElement.nextElementSibling.style['display'] = 'none';
	                reader.onload = function () {
	                    var params = dataSet(_self.trigger);
	                    var url = _self.params.url;
	                    var result = this.result;
	                    var img = new Image();
	                    _self.params.imgObj.src = img.src = result;
	                    console.log(_self);
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
	    DingeTools.LUploader.prototype.compress = function (img) {
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
	    DingeTools.LUploader.prototype.upload = function (url, obj, basestr, type, li) {
	        var text = window.atob(basestr.split(",")[1]);
	        var buffer = new Uint8Array(text.length);
	        var pecent = 0;
	        for (var i = 0; i < text.length; i++) {
	            buffer[i] = text.charCodeAt(i);
	        }
	        var span = li.querySelector('.LUploader-progress').querySelector('span');
	        var xhr = new XMLHttpRequest();
	        xhr.open('post', url);
	        xhr.onload = function (e) {
	            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 0) {
	                var data = JSON.parse(xhr.responseText);
	                var result = data['status'];
	                if (result == 1) {
	                    document.getElementById("user_carouse").src = data.url;
	                }
	                var text = result == 0 ? '上传成功' : '上传失败';
	                span.style['width'] = '100%';
	                span.innerHTML = text;
	            } else {
	                span.innerHTML = '上传失败';
	            }
	        };
	        xhr.upload.addEventListener('progress', function (e) {
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
	    };

	    function isArray(arr) {
	        if (Object.prototype.toString.apply(arr) === '[object Array]') return true;else return false;
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
	        return string.toLowerCase().replace(/-(.)/g, function (match, group1) {
	            return group1.toUpperCase();
	        });
	    };
	    var tools = $.extend({}, DingeTools, Api);
	    function objCreat(proto) {
	        function Create() {}
	        Create.prototype = proto;
	        return new Create();
	    }
	    module.exports = objCreat(tools);
	})(jQuery);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v3.1.1
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2016-09-22T22:30Z
	 */
	( function( global, factory ) {

		"use strict";

		if ( typeof module === "object" && typeof module.exports === "object" ) {

			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";

	var arr = [];

	var document = window.document;

	var getProto = Object.getPrototypeOf;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call( Object );

	var support = {};



		function DOMEval( code, doc ) {
			doc = doc || document;

			var script = doc.createElement( "script" );

			script.text = code;
			doc.head.appendChild( script ).parentNode.removeChild( script );
		}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module



	var
		version = "3.1.1",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android <=4.0 only
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {

			// Return all the elements in a clean array
			if ( num == null ) {
				return slice.call( this );
			}

			// Return just the one element from the set
			return num < 0 ? this[ num + this.length ] : this[ num ];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type( obj );
			return ( type === "number" || type === "string" ) &&

				// parseFloat NaNs numeric-cast false positives ("")
				// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				// subtraction forces infinities to NaN
				!isNaN( obj - parseFloat( obj ) );
		},

		isPlainObject: function( obj ) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if ( !obj || toString.call( obj ) !== "[object Object]" ) {
				return false;
			}

			proto = getProto( obj );

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
		},

		isEmptyObject: function( obj ) {

			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;

			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			DOMEval( code );
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android <=4.0 only
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.3.3
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-08-08
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,

		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		fcssescape = function( ch, asCodePoint ) {
			if ( asCodePoint ) {

				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if ( ch === "\0" ) {
					return "\uFFFD";
				}

				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
			}

			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		},

		disabledAncestor = addCombinator(
			function( elem ) {
				return elem.disabled === true && ("form" in elem || "label" in elem);
			},
			{ dir: "parentNode", next: "legend" }
		);

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						while ( i-- ) {
							groups[i] = "#" + nid + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created element and returns a boolean result
	 */
	function assert( fn ) {
		var el = document.createElement("fieldset");

		try {
			return !!fn( el );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( el.parentNode ) {
				el.parentNode.removeChild( el );
			}
			// release memory in IE
			el = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				a.sourceIndex - b.sourceIndex;

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for :enabled/:disabled
	 * @param {Boolean} disabled true for :disabled; false for :enabled
	 */
	function createDisabledPseudo( disabled ) {

		// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function( elem ) {

			// Only certain elements can match :enabled or :disabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
			if ( "form" in elem ) {

				// Check for inherited disabledness on relevant non-disabled elements:
				// * listed form-associated elements in a disabled fieldset
				//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
				// * option elements in a disabled optgroup
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
				// All such elements have a "form" property.
				if ( elem.parentNode && elem.disabled === false ) {

					// Option elements defer to a parent optgroup if present
					if ( "label" in elem ) {
						if ( "label" in elem.parentNode ) {
							return elem.parentNode.disabled === disabled;
						} else {
							return elem.disabled === disabled;
						}
					}

					// Support: IE 6 - 11
					// Use the isDisabled shortcut property to check for disabled fieldset ancestors
					return elem.isDisabled === disabled ||

						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled &&
							disabledAncestor( elem ) === disabled;
				}

				return elem.disabled === disabled;

			// Try to winnow out elements that can't be disabled before trusting the disabled property.
			// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
			// even exist on them, let alone have a boolean value.
			} else if ( "label" in elem ) {
				return elem.disabled === disabled;
			}

			// Remaining elements are neither :enabled nor :disabled
			return false;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, subWindow,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( preferredDoc !== document &&
			(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

			// Support: IE 11, Edge
			if ( subWindow.addEventListener ) {
				subWindow.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( subWindow.attachEvent ) {
				subWindow.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( el ) {
			el.className = "i";
			return !el.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( el ) {
			el.appendChild( document.createComment("") );
			return !el.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( el ) {
			docElem.appendChild( el ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID filter and find
		if ( support.getById ) {
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var elem = context.getElementById( id );
					return elem ? [ elem ] : [];
				}
			};
		} else {
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};

			// Support: IE 6 - 7 only
			// getElementById is not reliable as a find shortcut
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var node, i, elems,
						elem = context.getElementById( id );

					if ( elem ) {

						// Verify the id attribute
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}

						// Fall back on getElementsByName
						elems = context.getElementsByName( id );
						i = 0;
						while ( (elem = elems[i++]) ) {
							node = elem.getAttributeNode("id");
							if ( node && node.value === id ) {
								return [ elem ];
							}
						}
					}

					return [];
				}
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See https://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( el ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// https://bugs.jquery.com/ticket/12359
				docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( el.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !el.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !el.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibling-combinator selector` fails
				if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( el ) {
				el.innerHTML = "<a href='' disabled='disabled'></a>" +
					"<select disabled='disabled'><option/></select>";

				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				el.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( el.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( el.querySelectorAll(":enabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Support: IE9-11+
				// IE's :disabled selector does not pick up the children of disabled fieldsets
				docElem.appendChild( el ).disabled = true;
				if ( el.querySelectorAll(":disabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				el.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( el ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( el, "*" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( el, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.escape = function( sel ) {
		return (sel + "").replace( rcssescape, fcssescape );
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": createDisabledPseudo( false ),
			"disabled": createDisabledPseudo( true ),

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			skip = combinator.next,
			key = skip || dir,
			checkNonElements = base && key === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
				return false;
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( skip && skip === elem.nodeName.toLowerCase() ) {
								elem = elem[ dir ] || elem;
							} else if ( (oldCache = uniqueCache[ key ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ key ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( el ) {
		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( el ) {
		el.innerHTML = "<a href='#'></a>";
		return el.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( el ) {
		el.innerHTML = "<input/>";
		el.firstChild.setAttribute( "value", "" );
		return el.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( el ) {
		return el.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;

	// Deprecated
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;




	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
		}

		// Single element
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if ( typeof qualifier !== "string" ) {
			return jQuery.grep( elements, function( elem ) {
				return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
			} );
		}

		// Simple selector that can be filtered directly, removing non-Elements
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter( qualifier, elements );
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		if ( elems.length === 1 && elem.nodeType === 1 ) {
			return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
		}

		return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			ret = this.pushStack( [] );

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			return len > 1 ? jQuery.uniqueSort( ret ) : ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						if ( elem ) {

							// Inject the element directly into the jQuery object
							this[ 0 ] = elem;
							this.length = 1;
						}
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				targets = typeof selectors !== "string" && jQuery( selectors );

			// Positional selectors never match, since there's no _selection_ context
			if ( !rneedsContext.test( selectors ) ) {
				for ( ; i < l; i++ ) {
					for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

						// Always skip document fragments
						if ( cur.nodeType < 11 && ( targets ?
							targets.index( cur ) > -1 :

							// Don't pass non-elements to Sizzle
							cur.nodeType === 1 &&
								jQuery.find.matchesSelector( cur, selectors ) ) ) {

							matched.push( cur );
							break;
						}
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory && !firing ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	function Identity( v ) {
		return v;
	}
	function Thrower( ex ) {
		throw ex;
	}

	function adoptValue( value, resolve, reject ) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
				method.call( value ).done( resolve ).fail( reject );

			// Other thenables
			} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
				method.call( value, resolve, reject );

			// Other non-thenables
			} else {

				// Support: Android 4.0 only
				// Strict mode functions invoked without .call/.apply get global-object context
				resolve.call( undefined, value );
			}

		// For Promises/A+, convert exceptions into rejections
		// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
		// Deferred#then to conditionally suppress rejection.
		} catch ( value ) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.call( undefined, value );
		}
	}

	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, callbacks,
					// ... .then handlers, argument index, [final state]
					[ "notify", "progress", jQuery.Callbacks( "memory" ),
						jQuery.Callbacks( "memory" ), 2 ],
					[ "resolve", "done", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 0, "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 1, "rejected" ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					"catch": function( fn ) {
						return promise.then( null, fn );
					},

					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;

						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {

								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
					then: function( onFulfilled, onRejected, onProgress ) {
						var maxDepth = 0;
						function resolve( depth, deferred, handler, special ) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then;

										// Support: Promises/A+ section 2.3.3.3.3
										// https://promisesaplus.com/#point-59
										// Ignore double-resolution attempts
										if ( depth < maxDepth ) {
											return;
										}

										returned = handler.apply( that, args );

										// Support: Promises/A+ section 2.3.1
										// https://promisesaplus.com/#point-48
										if ( returned === deferred.promise() ) {
											throw new TypeError( "Thenable self-resolution" );
										}

										// Support: Promises/A+ sections 2.3.3.1, 3.5
										// https://promisesaplus.com/#point-54
										// https://promisesaplus.com/#point-75
										// Retrieve `then` only once
										then = returned &&

											// Support: Promises/A+ section 2.3.4
											// https://promisesaplus.com/#point-64
											// Only check objects and functions for thenability
											( typeof returned === "object" ||
												typeof returned === "function" ) &&
											returned.then;

										// Handle a returned thenable
										if ( jQuery.isFunction( then ) ) {

											// Special processors (notify) just wait for resolution
											if ( special ) {
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special )
												);

											// Normal processors (resolve) also hook into progress
											} else {

												// ...and disregard older resolution values
												maxDepth++;

												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special ),
													resolve( maxDepth, deferred, Identity,
														deferred.notifyWith )
												);
											}

										// Handle all other returned values
										} else {

											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if ( handler !== Identity ) {
												that = undefined;
												args = [ returned ];
											}

											// Process the value(s)
											// Default process is resolve
											( special || deferred.resolveWith )( that, args );
										}
									},

									// Only normal processors (resolve) catch and reject exceptions
									process = special ?
										mightThrow :
										function() {
											try {
												mightThrow();
											} catch ( e ) {

												if ( jQuery.Deferred.exceptionHook ) {
													jQuery.Deferred.exceptionHook( e,
														process.stackTrace );
												}

												// Support: Promises/A+ section 2.3.3.3.4.1
												// https://promisesaplus.com/#point-61
												// Ignore post-resolution exceptions
												if ( depth + 1 >= maxDepth ) {

													// Only substitute handlers pass on context
													// and multiple values (non-spec behavior)
													if ( handler !== Thrower ) {
														that = undefined;
														args = [ e ];
													}

													deferred.rejectWith( that, args );
												}
											}
										};

								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if ( depth ) {
									process();
								} else {

									// Call an optional hook to record the stack, in case of exception
									// since it's otherwise lost when execution goes async
									if ( jQuery.Deferred.getStackHook ) {
										process.stackTrace = jQuery.Deferred.getStackHook();
									}
									window.setTimeout( process );
								}
							};
						}

						return jQuery.Deferred( function( newDefer ) {

							// progress_handlers.add( ... )
							tuples[ 0 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onProgress ) ?
										onProgress :
										Identity,
									newDefer.notifyWith
								)
							);

							// fulfilled_handlers.add( ... )
							tuples[ 1 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onFulfilled ) ?
										onFulfilled :
										Identity
								)
							);

							// rejected_handlers.add( ... )
							tuples[ 2 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onRejected ) ?
										onRejected :
										Thrower
								)
							);
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 5 ];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(
						function() {

							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},

						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[ 3 - i ][ 2 ].disable,

						// progress_callbacks.lock
						tuples[ 0 ][ 2 ].lock
					);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add( tuple[ 3 ].fire );

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( singleValue ) {
			var

				// count of uncompleted subordinates
				remaining = arguments.length,

				// count of unprocessed arguments
				i = remaining,

				// subordinate fulfillment data
				resolveContexts = Array( i ),
				resolveValues = slice.call( arguments ),

				// the master Deferred
				master = jQuery.Deferred(),

				// subordinate callback factory
				updateFunc = function( i ) {
					return function( value ) {
						resolveContexts[ i ] = this;
						resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( !( --remaining ) ) {
							master.resolveWith( resolveContexts, resolveValues );
						}
					};
				};

			// Single- and empty arguments are adopted like Promise.resolve
			if ( remaining <= 1 ) {
				adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if ( master.state() === "pending" ||
					jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

					return master.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while ( i-- ) {
				adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
			}

			return master.promise();
		}
	} );


	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	jQuery.Deferred.exceptionHook = function( error, stack ) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
			window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
		}
	};




	jQuery.readyException = function( error ) {
		window.setTimeout( function() {
			throw error;
		} );
	};




	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function( fn ) {

		readyList
			.then( fn )

			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch( function( error ) {
				jQuery.readyException( error );
			} );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
		}
	} );

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if ( document.readyState === "complete" ||
		( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout( jQuery.ready );

	} else {

		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", completed );

		// A fallback to window.onload, that will always work
		window.addEventListener( "load", completed );
	}




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		if ( chainable ) {
			return elems;
		}

		// Gets
		if ( bulk ) {
			return fn.call( elems );
		}

		return len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function( owner ) {

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if ( typeof data === "string" ) {
				cache[ jQuery.camelCase( data ) ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ jQuery.camelCase( prop ) ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :

				// Always use camelCase key (gh-2257)
				owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
		},
		access: function( owner, key, value ) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				return this.get( owner, key );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key !== undefined ) {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map( jQuery.camelCase );
				} else {
					key = jQuery.camelCase( key );

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ?
						[ key ] :
						( key.match( rnothtmlwhite ) || [] );
				}

				i = key.length;

				while ( i-- ) {
					delete cache[ key[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function getData( data ) {
		if ( data === "true" ) {
			return true;
		}

		if ( data === "false" ) {
			return false;
		}

		if ( data === "null" ) {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if ( data === +data + "" ) {
			return +data;
		}

		if ( rbrace.test( data ) ) {
			return JSON.parse( data );
		}

		return data;
	}

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = getData( data );
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each( function() {

					// We always store the camelCased key
					dataUser.set( this, key, value );
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHiddenWithinTree = function( elem, el ) {

			// isHiddenWithinTree might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;

			// Inline style trumps all
			return elem.style.display === "none" ||
				elem.style.display === "" &&

				// Otherwise, check computed style
				// Support: Firefox <=43 - 45
				// Disconnected elements can have computed display: none, so first confirm that elem is
				// in the document.
				jQuery.contains( elem.ownerDocument, elem ) &&

				jQuery.css( elem, "display" ) === "none";
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};




	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() {
					return tween.cur();
				} :
				function() {
					return jQuery.css( elem, prop, "" );
				},
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}


	var defaultDisplayMap = {};

	function getDefaultDisplay( elem ) {
		var temp,
			doc = elem.ownerDocument,
			nodeName = elem.nodeName,
			display = defaultDisplayMap[ nodeName ];

		if ( display ) {
			return display;
		}

		temp = doc.body.appendChild( doc.createElement( nodeName ) );
		display = jQuery.css( temp, "display" );

		temp.parentNode.removeChild( temp );

		if ( display === "none" ) {
			display = "block";
		}
		defaultDisplayMap[ nodeName ] = display;

		return display;
	}

	function showHide( elements, show ) {
		var display, elem,
			values = [],
			index = 0,
			length = elements.length;

		// Determine new display value for elements that need to change
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			display = elem.style.display;
			if ( show ) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if ( display === "none" ) {
					values[ index ] = dataPriv.get( elem, "display" ) || null;
					if ( !values[ index ] ) {
						elem.style.display = "";
					}
				}
				if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
					values[ index ] = getDefaultDisplay( elem );
				}
			} else {
				if ( display !== "none" ) {
					values[ index ] = "none";

					// Remember what we're overwriting
					dataPriv.set( elem, "display", display );
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for ( index = 0; index < length; index++ ) {
			if ( values[ index ] != null ) {
				elements[ index ].style.display = values[ index ];
			}
		}

		return elements;
	}

	jQuery.fn.extend( {
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHiddenWithinTree( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE <=9 only
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;

		if ( typeof context.getElementsByTagName !== "undefined" ) {
			ret = context.getElementsByTagName( tag || "*" );

		} else if ( typeof context.querySelectorAll !== "undefined" ) {
			ret = context.querySelectorAll( tag || "*" );

		} else {
			ret = [];
		}

		if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
			return jQuery.merge( [ context ], ret );
		}

		return ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	var documentElement = document.documentElement;



	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if ( selector ) {
				jQuery.find.matchesSelector( documentElement, selector );
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( nativeEvent ) {

			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix( nativeEvent );

			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array( arguments.length ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;

			for ( i = 1; i < arguments.length; i++ ) {
				args[ i ] = arguments[ i ];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, handleObj, sel, matchedHandlers, matchedSelectors,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			if ( delegateCount &&

				// Support: IE <=9
				// Black-hole SVG <use> instance trees (trac-13180)
				cur.nodeType &&

				// Support: Firefox <=42
				// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
				// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
				// Support: IE 11 only
				// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
				!( event.type === "click" && event.button >= 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
						matchedHandlers = [];
						matchedSelectors = {};
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matchedSelectors[ sel ] === undefined ) {
								matchedSelectors[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matchedSelectors[ sel ] ) {
								matchedHandlers.push( handleObj );
							}
						}
						if ( matchedHandlers.length ) {
							handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		addProp: function( name, hook ) {
			Object.defineProperty( jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: jQuery.isFunction( hook ) ?
					function() {
						if ( this.originalEvent ) {
								return hook( this.originalEvent );
						}
					} :
					function() {
						if ( this.originalEvent ) {
								return this.originalEvent[ name ];
						}
					},

				set: function( value ) {
					Object.defineProperty( this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					} );
				}
			} );
		},

		fix: function( originalEvent ) {
			return originalEvent[ jQuery.expando ] ?
				originalEvent :
				new jQuery.Event( originalEvent );
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android <=2.3 only
					src.returnValue === false ?
				returnTrue :
				returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = ( src.target && src.target.nodeType === 3 ) ?
				src.target.parentNode :
				src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each( {
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,

		which: function( event ) {
			var button = event.button;

			// Add which for key events
			if ( event.which == null && rkeyEvent.test( event.type ) ) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
				if ( button & 1 ) {
					return 1;
				}

				if ( button & 2 ) {
					return 3;
				}

				if ( button & 4 ) {
					return 2;
				}

				return 0;
			}

			return event.which;
		}
	}, jQuery.event.addProp );

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {

		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var

		/* eslint-disable max-len */

		// See https://github.com/eslint/eslint/issues/3229
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

		/* eslint-enable */

		// Support: IE <=10 - 11, Edge 12 - 13
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	function manipulationTarget( elem, content ) {
		if ( jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

			return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {
		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};



	( function() {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if ( !div ) {
				return;
			}

			div.style.cssText =
				"box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		jQuery.extend( support, {
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE <=9 only
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i,
			val = 0;

		// If we already have the right measurement, avoid augmentation
		if ( extra === ( isBorderBox ? "border" : "content" ) ) {
			i = 4;

		// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var val,
			valueIsBorderBox = true,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Support: IE <=11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = elem.getBoundingClientRect()[ name ];
		}

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	function raf() {
		if ( timerId ) {
			window.requestAnimationFrame( raf );
			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
			isBox = "width" in props || "height" in props,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHiddenWithinTree( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Queue-skipping animations hijack the fx hooks
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Detect show/hide animations
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.test( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;

					// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject( props );
		if ( !propTween && jQuery.isEmptyObject( orig ) ) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if ( isBox && elem.nodeType === 1 ) {

			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if ( restoreDisplay == null ) {
				restoreDisplay = dataPriv.get( elem, "display" );
			}
			display = jQuery.css( elem, "display" );
			if ( display === "none" ) {
				if ( restoreDisplay ) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide( [ elem ], true );
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css( elem, "display" );
					showHide( [ elem ] );
				}
			}

			// Animate inline elements as inline-block
			if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
				if ( jQuery.css( elem, "float" ) === "none" ) {

					// Restore the original display value at the end of pure show/hide animations
					if ( !propTween ) {
						anim.done( function() {
							style.display = restoreDisplay;
						} );
						if ( restoreDisplay == null ) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// Implement show/hide animations
		propTween = false;
		for ( prop in orig ) {

			// General show/hide setup for this element animation
			if ( !propTween ) {
				if ( dataShow ) {
					if ( "hidden" in dataShow ) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if ( toggle ) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if ( hidden ) {
					showHide( [ elem ], true );
				}

				/* eslint-disable no-loop-func */

				anim.done( function() {

				/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if ( !hidden ) {
						showHide( [ elem ] );
					}
					dataPriv.remove( elem, "fxshow" );
					for ( prop in orig ) {
						jQuery.style( elem, prop, orig[ prop ] );
					}
				} );
			}

			// Per-property setup
			propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = propTween.start;
				if ( hidden ) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3 only
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnothtmlwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		// Go to the end state if fx are off or if document is hidden
		if ( jQuery.fx.off || document.hidden ) {
			opt.duration = 0;

		} else {
			if ( typeof opt.duration !== "number" ) {
				if ( opt.duration in jQuery.fx.speeds ) {
					opt.duration = jQuery.fx.speeds[ opt.duration ];

				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.requestAnimationFrame ?
				window.requestAnimationFrame( raf ) :
				window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		if ( window.cancelAnimationFrame ) {
			window.cancelAnimationFrame( timerId );
		} else {
			window.clearInterval( timerId );
		}

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name,
				i = 0,

				// Attribute names can contain non-HTML whitespace characters
				// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
				attrNames = value && value.match( rnothtmlwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};

	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle,
				lowercaseName = name.toLowerCase();

			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ lowercaseName ];
				attrHandle[ lowercaseName ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					lowercaseName :
					null;
				attrHandle[ lowercaseName ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					if ( tabindex ) {
						return parseInt( tabindex, 10 );
					}

					if (
						rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) &&
						elem.href
					) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




		// Strip and collapse whitespace according to HTML spec
		// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
		function stripAndCollapse( value ) {
			var tokens = value.match( rnothtmlwhite ) || [];
			return tokens.join( " " );
		}


	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnothtmlwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnothtmlwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnothtmlwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
						return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					// Handle most common string cases
					if ( typeof ret === "string" ) {
						return ret.replace( rreturn, "" );
					}

					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :

						// Support: IE <=10 - 11 only
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						stripAndCollapse( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option, i,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one",
						values = one ? null : [],
						max = one ? index + 1 : options.length;

					if ( index < 0 ) {
						i = max;

					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								!option.disabled &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];

						/* eslint-disable no-cond-assign */

						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);

			jQuery.event.trigger( e, null, elem );
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, valueOrFunction ) {

				// If value is a function, invoke it and use its return value
				var value = jQuery.isFunction( valueOrFunction ) ?
					valueOrFunction() :
					valueOrFunction;

				s[ s.length ] = encodeURIComponent( key ) + "=" +
					encodeURIComponent( value == null ? "" : value );
			};

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				if ( val == null ) {
					return null;
				}

				if ( jQuery.isArray( val ) ) {
					return jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} );
				}

				return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	var
		r20 = /%20/g,
		rhash = /#.*$/,
		rantiCache = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// Request state (becomes false upon send and true upon completion)
				completed,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// uncached part of the url
				uncached,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( completed ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return completed ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						if ( completed == null ) {
							name = requestHeadersNames[ name.toLowerCase() ] =
								requestHeadersNames[ name.toLowerCase() ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( completed == null ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( completed ) {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							} else {

								// Lazy-add the new callbacks in a way that preserves old ones
								for ( code in map ) {
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR );

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( completed ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace( rhash, "" );

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// Remember the hash so we can put it back
				uncached = s.url.slice( cacheURL.length );

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if ( s.cache === false ) {
					cacheURL = cacheURL.replace( rantiCache, "$1" );
					uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

			// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if ( s.data && s.processData &&
				( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
				s.data = s.data.replace( r20, "+" );
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add( s.complete );
			jqXHR.done( s.success );
			jqXHR.fail( s.error );

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( completed ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					completed = false;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Rethrow post-completion exceptions
					if ( completed ) {
						throw e;
					}

					// Propagate others as results
					done( -1, e );
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Ignore repeat invocations
				if ( completed ) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( this[ 0 ] ) {
				if ( jQuery.isFunction( html ) ) {
					html = html.call( this[ 0 ] );
				}

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function( selector ) {
			this.parent( selector ).not( "body" ).each( function() {
				jQuery( this ).replaceWith( this.childNodes );
			} );
			return this;
		}
	} );


	jQuery.expr.pseudos.hidden = function( elem ) {
		return !jQuery.expr.pseudos.visible( elem );
	};
	jQuery.expr.pseudos.visible = function( elem ) {
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	};




	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE <=9 only
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter( function( s ) {
		if ( s.crossDomain ) {
			s.contents.script = false;
		}
	} );

	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();


	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( typeof data !== "string" ) {
			return [];
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if ( !context ) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if ( support.createHTMLDocument ) {
				context = document.implementation.createHTMLDocument( "" );

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement( "base" );
				base.href = document.location.href;
				context.head.appendChild( base );
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec( data );
		scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = stripAndCollapse( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.pseudos.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {

			// Preserve chaining for setter
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win, rect, doc,
				elem = this[ 0 ];

			if ( !elem ) {
				return;
			}

			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if ( !elem.getClientRects().length ) {
				return { top: 0, left: 0 };
			}

			rect = elem.getBoundingClientRect();

			// Make sure element is not hidden (display: none)
			if ( rect.width || rect.height ) {
				doc = elem.ownerDocument;
				win = getWindow( doc );
				docElem = doc.documentElement;

				return {
					top: rect.top + win.pageYOffset - docElem.clientTop,
					left: rect.left + win.pageXOffset - docElem.clientLeft
				};
			}

			// Return zeros for disconnected and hidden elements (gh-2310)
			return rect;
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
					left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
				};
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf( "outer" ) === 0 ?
							elem[ "inner" + name ] :
							elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		}
	} );

	jQuery.parseJSON = JSON.parse;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}




	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}





	return jQuery;
	} );


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/*
	 *   @API接口
	 *       #Author   xiusiteng
	 *       #createAt   2016-11-18
	 *       #question   使用fetch  
	 *   适应方式：  1.改写api方法  2.改写storage 
	 */
	var $ = __webpack_require__(5);

	function API(opt) {
	    this.env = opt.env;
	    this.URL = opt.url;
	    this.requestNum = 0;
	    this.cacheTime = opt.cacheTime || 0;
	    this.showLoading = opt.showLoading || function () {};
	    this.closeLoading = opt.closeLoading || function () {};
	}
	API.prototype = {
	    /*
	     * 请求函数
	     */
	    api: function api(opt, storage, controls) {
	        var self = this;
	        return $.ajax({
	            url: opt.url || "",
	            data: opt.data || {},
	            method: opt.method || "GET",
	            datatype: "json",
	            beforeSend: function beforeSend() {
	                self.requestNum++;
	                self.showLoading();
	            },
	            complete: function complete(data) {
	                if (data.responseJSON.status == 1) {
	                    var value;
	                    var local = JSON.parse(self.getStorage(storage));
	                    if (!controls) {
	                        value = data.responseJSON.data;
	                        if (Object.prototype.toString.call(value) == "[object Object]") {
	                            value = JSON.stringify(Object.assign({}, value, { timeStamp: Date.now() }));
	                        } else {
	                            value = JSON.stringify(Object.assign({}, {
	                                timeStamp: Date.now(),
	                                mes: value
	                            }));
	                        }
	                    }
	                    if (controls && controls.replace == true) {
	                        value = Object.assign({}, JSON.parse(self.getStorage(storage)), opt.data, {
	                            timeStamp: Date.now()
	                        });
	                        if (value.token) {
	                            delete value.token;
	                        }
	                        value = JSON.stringify(value);
	                    }
	                    if (controls && controls.push == true) {
	                        if (local.list.length == 10) {
	                            local.list.shift();
	                        }
	                        var templateMes = Object.assign({}, local.list[0]);
	                        if (!templateMes.from) {
	                            templateMes = {
	                                from: {},
	                                to: {},
	                                content: "",
	                                createdAt: new Date(),
	                                updatedAt: new Date()
	                            };
	                        }
	                        templateMes.from._id = opt.data.token;
	                        var userinfo = JSON.parse(self.getStorage("userinfo"));
	                        local.list.forEach(function (v) {
	                            if (v.from._id == opt.data.token) {
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
	                            local.list = local.list.filter(function (v) {
	                                return v[controls.delete] != opt.data.id;
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
	    setStorage: function setStorage(key, value) {
	        console.log(key, value);
	        if (!key || !value) throw new Error("缺少必要的参数");
	        if (Object.prototype.toString.call(value) == "[object object]") {
	            value = JSON.stringify(value);
	        }
	        localStorage.setItem(key, value);
	    },
	    /*
	     * 读取缓存
	     */
	    getStorage: function getStorage(key) {
	        if (!key) throw new Error("缺少必要的参数");
	        return localStorage.getItem(key);
	    },
	    /*
	     * 删除缓存
	     */
	    removeStorage: function removeStorage(key) {
	        if (!key) throw new Error("缺少必要的参数");
	        return localStorage.removeItem(key);
	    },
	    /*
	     * 判断缓存是否过期
	     */
	    isExpire: function isExpire(key, cache) {
	        var self = this;
	        var now = Date.now();
	        var storage = JSON.parse(this.getStorage(key));
	        if (cache == 0) {
	            cache = 0;
	        } else {
	            cache = cache || self.cacheTime;
	        }
	        if (cache != 0 && storage && (cache == -1 || now - storage.timeStamp < cache * 60000)) {
	            return true;
	        }
	        this.removeStorage(key);
	    },
	    /*
	     * 推送缓存
	     */
	    cacheData: function cacheData(key) {
	        var storage = JSON.parse(this.getStorage(key));
	        return new Promise(function (resolve) {
	            resolve({ status: 1, data: storage });
	        });
	    },
	    /*
	     * 获取用户信息
	     */
	    userInfo: function userInfo(opt, cache) {
	        var self = this;
	        var key = "userinfo";
	        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
	        if (this.isExpire(key, cache)) {
	            return self.cacheData(key);
	        }
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/getUserInfo.json" : self.URL + "/Api/user/getUserInfo",
	            data: opt
	        }, key);
	    },
	    /*
	     * 编辑用户信息
	     */
	    editUserInfo: function editUserInfo(opt) {
	        var self = this;
	        var key = "userinfo";
	        if (!opt) throw new Error("参数不能为空，或传入参数不合法");
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/editUserInfo.json" : self.URL + "/Api/user/editUserInfo",
	            method: self.env == "test" ? "GET" : "POST",
	            data: opt
	        }, key, { replace: true });
	    },
	    /*
	     * 浏览历史
	     */
	    historyList: function historyList(opt, cache) {
	        var self = this;
	        var key = "history";
	        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
	        if (this.isExpire(key, cache)) {
	            return self.cacheData(key);
	        }
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/history.json" : self.URL + "/Api/user/getHistory",
	            data: opt
	        }, key);
	    },
	    /*
	     * 获取banner图片
	     */
	    banner: function banner(opt, cache) {
	        var self = this;
	        var key = "banner";
	        if (this.isExpire(key, cache)) {
	            return self.cacheData(key);
	        }
	        return this.api(Object.assign({}, opt, {
	            url: self.env == "test" ? self.URL + "/data/getCarousels.json" : self.URL + "/Api/common/getCarousels"
	        }), key);
	    },
	    /*
	     * 获取首页的评论
	     */
	    comments: function comments(opt, cache) {
	        var self = this;
	        var key;
	        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
	        if (opt.movieId) {
	            key = opt.movieId + "comments";
	        } else {
	            key = "homecomments";
	        }
	        if (this.isExpire(key, cache) && opt.page == 1) {
	            return self.cacheData(key);
	        }
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/getCommentsByRight.json" : self.URL + "/Api/comment/getComments",
	            data: opt
	        }, key);
	    },
	    /*
	     * 获取聊天详情
	     */
	    dialogue: function dialogue(opt, cache) {
	        var self = this;
	        var key = opt.typeId;
	        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
	        if (!opt || !opt.typeId) throw new Error("typeId为必传的参数，或传入参数不合法");
	        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
	        if (this.isExpire(key, cache) && opt.page == 1) {
	            return self.cacheData(key);
	        }
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/getMessageDetail.json" : self.URL + "/Api/message/getMessageDetail",
	            data: opt
	        }, key);
	    },
	    /*
	     * 发送聊天信息
	     */
	    sendMessage: function sendMessage(opt) {
	        var self = this;
	        var key = opt.typeId;
	        if (!opt || !opt.to) throw new Error("page为必传的参数，或传入参数不合法");
	        if (!opt || !opt.content) throw new Error("typeId为必传的参数，或传入参数不合法");
	        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/sendMessage.json" : self.URL + "/Api/message/sendMessage",
	            data: opt
	        }, key, { push: true });
	    },
	    /*
	     * 获取聊天列表
	     */
	    messageList: function messageList(opt, cache) {
	        var self = this;
	        var key = "messageList";
	        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
	        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
	        if (this.isExpire(key, cache) && opt.page == 1) {
	            return self.cacheData(key);
	        }
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/getMessageList.json" : self.URL + "/Api/message/getMessageList",
	            data: opt
	        }, key);
	    },
	    /*
	     * 删除聊天列表
	     */
	    deleteMesList: function deleteMesList(opt) {
	        var self = this;
	        var key = "messageList";
	        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
	        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
	        if (!opt || !opt.typeId) throw new Error("typeId为必传的参数，或传入参数不合法");
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/deletemessageList.json" : self.URL + "/Api/message/delMessageList",
	            data: opt
	        }, key, { delete: "typeId" });
	    },
	    /*
	     * 对我的评论
	     */
	    commentToMe: function commentToMe(opt, cache) {
	        var self = this;
	        var key = "commentToMe";
	        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
	        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
	        if (this.isExpire(key, cache) && opt.page == 1) {
	            return self.cacheData(key);
	        }
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/commentToMe.json" : self.URL + "/Api/comment/commentsToMe",
	            data: opt
	        }, key);
	    },
	    /*
	     * 喜欢我的评论
	     */
	    commentLikeMe: function commentLikeMe(opt, cache) {
	        var self = this;
	        var key = "commentLikeMe";
	        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
	        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
	        if (this.isExpire(key, cache) && opt.page == 1) {
	            return self.cacheData(key);
	        }
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/commentsDetail.json" : self.URL + "/Api/comment/commentLikeMe",
	            data: opt
	        }, key);
	    },
	    /*
	     * 喜欢我的人
	     */
	    userLikeMe: function userLikeMe(opt, cache) {
	        var self = this;
	        var key = "userLikeMe";
	        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
	        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
	        if (this.isExpire(key, cache) && opt.page == 1) {
	            return self.cacheData(key);
	        }
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/commentsDetail.json" : self.URL + "/Api/comment/userLikeMe",
	            data: opt
	        }, key);
	    },
	    /*
	     * 我的评论
	     */
	    myConmments: function myConmments(opt, cache) {
	        var self = this;
	        var key = "myConmments";
	        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
	        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
	        if (this.isExpire(key, cache) && opt.page == 1) {
	            return self.cacheData(key);
	        }
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/getMyConmment.json" : self.URL + "/Api/comment/myComments",
	            data: opt
	        }, key);
	    },
	    /*
	     * 删除我的评论
	     */
	    delMyConmments: function delMyConmments(opt) {
	        var self = this;
	        var key = "myConmments";
	        if (!opt || !opt.page) throw new Error("page为必传的参数，或传入参数不合法");
	        if (!opt || !opt.token) throw new Error("token为必传的参数，或传入参数不合法");
	        return this.api({
	            url: self.env == "test" ? self.URL + "/data/deleteMyConmment.json" : self.URL + "/Api/message/delMyComments",
	            data: opt
	        }, key, { delete: "_id" });
	    }

	};
	module.exports = API;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.1.3
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		var registeredInModuleLoader = false;
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			registeredInModuleLoader = true;
		}
		if (true) {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}

		function init (converter) {
			function api (key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}

				// Write

				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);

					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}

					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}

					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}

					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);

					return (document.cookie = [
						key, '=', value,
						attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
						attributes.path ? '; path=' + attributes.path : '',
						attributes.domain ? '; domain=' + attributes.domain : '',
						attributes.secure ? '; secure' : ''
					].join(''));
				}

				// Read

				if (!key) {
					result = {};
				}

				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;

				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');

					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}

					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);

						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}

						if (key === name) {
							result = cookie;
							break;
						}

						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}

				return result;
			}

			api.set = api;
			api.get = function (key) {
				return api.call(api, key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};

			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};

			api.withConverter = init;

			return api;
		}

		return init(function () {});
	}));


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";//省级
	/* eslint-disable */var provsData=[{"text":"\u5317\u4EAC\u5E02","value":"110000"},{"text":"\u5929\u6D25\u5E02","value":"120000"},{"text":"\u6CB3\u5317\u7701","value":"130000"},{"text":"\u5C71\u897F\u7701","value":"140000"},{"text":"\u5185\u8499\u53E4\u81EA\u6CBB\u533A","value":"150000"},{"text":"\u8FBD\u5B81\u7701","value":"210000"},{"text":"\u5409\u6797\u7701","value":"220000"},{"text":"\u9ED1\u9F99\u6C5F\u7701","value":"230000"},{"text":"\u4E0A\u6D77\u5E02","value":"310000"},{"text":"\u6C5F\u82CF\u7701","value":"320000"},{"text":"\u6D59\u6C5F\u7701","value":"330000"},{"text":"\u5B89\u5FBD\u7701","value":"340000"},{"text":"\u798F\u5EFA\u7701","value":"350000"},{"text":"\u6C5F\u897F\u7701","value":"360000"},{"text":"\u5C71\u4E1C\u7701","value":"370000"},{"text":"\u6CB3\u5357\u7701","value":"410000"},{"text":"\u6E56\u5317\u7701","value":"420000"},{"text":"\u6E56\u5357\u7701","value":"430000"},{"text":"\u5E7F\u4E1C\u7701","value":"440000"},{"text":"\u5E7F\u897F\u58EE\u65CF\u81EA\u6CBB\u533A","value":"450000"},{"text":"\u6D77\u5357\u7701","value":"460000"},{"text":"\u91CD\u5E86\u5E02","value":"500000"},{"text":"\u56DB\u5DDD\u7701","value":"510000"},{"text":"\u8D35\u5DDE\u7701","value":"520000"},{"text":"\u4E91\u5357\u7701","value":"530000"},{"text":"\u897F\u85CF\u81EA\u6CBB\u533A","value":"540000"},{"text":"\u9655\u897F\u7701","value":"610000"},{"text":"\u7518\u8083\u7701","value":"620000"},{"text":"\u9752\u6D77\u7701","value":"630000"},{"text":"\u5B81\u590F\u56DE\u65CF\u81EA\u6CBB\u533A","value":"640000"},{"text":"\u65B0\u7586\u7EF4\u543E\u5C14\u81EA\u6CBB\u533A","value":"650000"},{"text":"\u53F0\u6E7E\u7701","value":"710000"},{"text":"\u9999\u6E2F\u7279\u522B\u884C\u653F\u533A","value":"810000"},{"text":"\u6FB3\u95E8\u7279\u522B\u884C\u653F\u533A","value":"820000"}],citysData={"110000":[{"text":"\u5E02\u8F96\u533A","value":"110100"},{"text":"\u53BF","value":"110200"}],"120000":[{"text":"\u5E02\u8F96\u533A","value":"120100"},{"text":"\u53BF","value":"120200"}],"130000":[{"text":"\u77F3\u5BB6\u5E84\u5E02","value":"130100"},{"text":"\u5510\u5C71\u5E02","value":"130200"},{"text":"\u79E6\u7687\u5C9B\u5E02","value":"130300"},{"text":"\u90AF\u90F8\u5E02","value":"130400"},{"text":"\u90A2\u53F0\u5E02","value":"130500"},{"text":"\u4FDD\u5B9A\u5E02","value":"130600"},{"text":"\u5F20\u5BB6\u53E3\u5E02","value":"130700"},{"text":"\u627F\u5FB7\u5E02","value":"130800"},{"text":"\u6CA7\u5DDE\u5E02","value":"130900"},{"text":"\u5ECA\u574A\u5E02","value":"131000"},{"text":"\u8861\u6C34\u5E02","value":"131100"}],"140000":[{"text":"\u592A\u539F\u5E02","value":"140100"},{"text":"\u5927\u540C\u5E02","value":"140200"},{"text":"\u9633\u6CC9\u5E02","value":"140300"},{"text":"\u957F\u6CBB\u5E02","value":"140400"},{"text":"\u664B\u57CE\u5E02","value":"140500"},{"text":"\u6714\u5DDE\u5E02","value":"140600"},{"text":"\u664B\u4E2D\u5E02","value":"140700"},{"text":"\u8FD0\u57CE\u5E02","value":"140800"},{"text":"\u5FFB\u5DDE\u5E02","value":"140900"},{"text":"\u4E34\u6C7E\u5E02","value":"141000"},{"text":"\u5415\u6881\u5E02","value":"141100"}],"150000":[{"text":"\u547C\u548C\u6D69\u7279\u5E02","value":"150100"},{"text":"\u5305\u5934\u5E02","value":"150200"},{"text":"\u4E4C\u6D77\u5E02","value":"150300"},{"text":"\u8D64\u5CF0\u5E02","value":"150400"},{"text":"\u901A\u8FBD\u5E02","value":"150500"},{"text":"\u9102\u5C14\u591A\u65AF\u5E02","value":"150600"},{"text":"\u547C\u4F26\u8D1D\u5C14\u5E02","value":"150700"},{"text":"\u5DF4\u5F66\u6DD6\u5C14\u5E02","value":"150800"},{"text":"\u4E4C\u5170\u5BDF\u5E03\u5E02","value":"150900"},{"text":"\u5174\u5B89\u76DF","value":"152200"},{"text":"\u9521\u6797\u90ED\u52D2\u76DF","value":"152500"},{"text":"\u963F\u62C9\u5584\u76DF","value":"152900"}],"210000":[{"text":"\u6C88\u9633\u5E02","value":"210100"},{"text":"\u5927\u8FDE\u5E02","value":"210200"},{"text":"\u978D\u5C71\u5E02","value":"210300"},{"text":"\u629A\u987A\u5E02","value":"210400"},{"text":"\u672C\u6EAA\u5E02","value":"210500"},{"text":"\u4E39\u4E1C\u5E02","value":"210600"},{"text":"\u9526\u5DDE\u5E02","value":"210700"},{"text":"\u8425\u53E3\u5E02","value":"210800"},{"text":"\u961C\u65B0\u5E02","value":"210900"},{"text":"\u8FBD\u9633\u5E02","value":"211000"},{"text":"\u76D8\u9526\u5E02","value":"211100"},{"text":"\u94C1\u5CAD\u5E02","value":"211200"},{"text":"\u671D\u9633\u5E02","value":"211300"},{"text":"\u846B\u82A6\u5C9B\u5E02","value":"211400"}],"220000":[{"text":"\u957F\u6625\u5E02","value":"220100"},{"text":"\u5409\u6797\u5E02","value":"220200"},{"text":"\u56DB\u5E73\u5E02","value":"220300"},{"text":"\u8FBD\u6E90\u5E02","value":"220400"},{"text":"\u901A\u5316\u5E02","value":"220500"},{"text":"\u767D\u5C71\u5E02","value":"220600"},{"text":"\u677E\u539F\u5E02","value":"220700"},{"text":"\u767D\u57CE\u5E02","value":"220800"},{"text":"\u5EF6\u8FB9\u671D\u9C9C\u65CF\u81EA\u6CBB\u5DDE","value":"222400"}],"230000":[{"text":"\u54C8\u5C14\u6EE8\u5E02","value":"230100"},{"text":"\u9F50\u9F50\u54C8\u5C14\u5E02","value":"230200"},{"text":"\u9E21\u897F\u5E02","value":"230300"},{"text":"\u9E64\u5C97\u5E02","value":"230400"},{"text":"\u53CC\u9E2D\u5C71\u5E02","value":"230500"},{"text":"\u5927\u5E86\u5E02","value":"230600"},{"text":"\u4F0A\u6625\u5E02","value":"230700"},{"text":"\u4F73\u6728\u65AF\u5E02","value":"230800"},{"text":"\u4E03\u53F0\u6CB3\u5E02","value":"230900"},{"text":"\u7261\u4E39\u6C5F\u5E02","value":"231000"},{"text":"\u9ED1\u6CB3\u5E02","value":"231100"},{"text":"\u7EE5\u5316\u5E02","value":"231200"},{"text":"\u5927\u5174\u5B89\u5CAD\u5730\u533A","value":"232700"}],"310000":[{"text":"\u5E02\u8F96\u533A","value":"310100"},{"text":"\u53BF","value":"310200"}],"320000":[{"text":"\u5357\u4EAC\u5E02","value":"320100"},{"text":"\u65E0\u9521\u5E02","value":"320200"},{"text":"\u5F90\u5DDE\u5E02","value":"320300"},{"text":"\u5E38\u5DDE\u5E02","value":"320400"},{"text":"\u82CF\u5DDE\u5E02","value":"320500"},{"text":"\u5357\u901A\u5E02","value":"320600"},{"text":"\u8FDE\u4E91\u6E2F\u5E02","value":"320700"},{"text":"\u6DEE\u5B89\u5E02","value":"320800"},{"text":"\u76D0\u57CE\u5E02","value":"320900"},{"text":"\u626C\u5DDE\u5E02","value":"321000"},{"text":"\u9547\u6C5F\u5E02","value":"321100"},{"text":"\u6CF0\u5DDE\u5E02","value":"321200"},{"text":"\u5BBF\u8FC1\u5E02","value":"321300"}],"330000":[{"text":"\u676D\u5DDE\u5E02","value":"330100"},{"text":"\u5B81\u6CE2\u5E02","value":"330200"},{"text":"\u6E29\u5DDE\u5E02","value":"330300"},{"text":"\u5609\u5174\u5E02","value":"330400"},{"text":"\u6E56\u5DDE\u5E02","value":"330500"},{"text":"\u7ECD\u5174\u5E02","value":"330600"},{"text":"\u91D1\u534E\u5E02","value":"330700"},{"text":"\u8862\u5DDE\u5E02","value":"330800"},{"text":"\u821F\u5C71\u5E02","value":"330900"},{"text":"\u53F0\u5DDE\u5E02","value":"331000"},{"text":"\u4E3D\u6C34\u5E02","value":"331100"}],"340000":[{"text":"\u5408\u80A5\u5E02","value":"340100"},{"text":"\u829C\u6E56\u5E02","value":"340200"},{"text":"\u868C\u57E0\u5E02","value":"340300"},{"text":"\u6DEE\u5357\u5E02","value":"340400"},{"text":"\u9A6C\u978D\u5C71\u5E02","value":"340500"},{"text":"\u6DEE\u5317\u5E02","value":"340600"},{"text":"\u94DC\u9675\u5E02","value":"340700"},{"text":"\u5B89\u5E86\u5E02","value":"340800"},{"text":"\u9EC4\u5C71\u5E02","value":"341000"},{"text":"\u6EC1\u5DDE\u5E02","value":"341100"},{"text":"\u961C\u9633\u5E02","value":"341200"},{"text":"\u5BBF\u5DDE\u5E02","value":"341300"},{"text":"\u516D\u5B89\u5E02","value":"341500"},{"text":"\u4EB3\u5DDE\u5E02","value":"341600"},{"text":"\u6C60\u5DDE\u5E02","value":"341700"},{"text":"\u5BA3\u57CE\u5E02","value":"341800"}],"350000":[{"text":"\u798F\u5DDE\u5E02","value":"350100"},{"text":"\u53A6\u95E8\u5E02","value":"350200"},{"text":"\u8386\u7530\u5E02","value":"350300"},{"text":"\u4E09\u660E\u5E02","value":"350400"},{"text":"\u6CC9\u5DDE\u5E02","value":"350500"},{"text":"\u6F33\u5DDE\u5E02","value":"350600"},{"text":"\u5357\u5E73\u5E02","value":"350700"},{"text":"\u9F99\u5CA9\u5E02","value":"350800"},{"text":"\u5B81\u5FB7\u5E02","value":"350900"}],"360000":[{"text":"\u5357\u660C\u5E02","value":"360100"},{"text":"\u666F\u5FB7\u9547\u5E02","value":"360200"},{"text":"\u840D\u4E61\u5E02","value":"360300"},{"text":"\u4E5D\u6C5F\u5E02","value":"360400"},{"text":"\u65B0\u4F59\u5E02","value":"360500"},{"text":"\u9E70\u6F6D\u5E02","value":"360600"},{"text":"\u8D63\u5DDE\u5E02","value":"360700"},{"text":"\u5409\u5B89\u5E02","value":"360800"},{"text":"\u5B9C\u6625\u5E02","value":"360900"},{"text":"\u629A\u5DDE\u5E02","value":"361000"},{"text":"\u4E0A\u9976\u5E02","value":"361100"}],"370000":[{"text":"\u6D4E\u5357\u5E02","value":"370100"},{"text":"\u9752\u5C9B\u5E02","value":"370200"},{"text":"\u6DC4\u535A\u5E02","value":"370300"},{"text":"\u67A3\u5E84\u5E02","value":"370400"},{"text":"\u4E1C\u8425\u5E02","value":"370500"},{"text":"\u70DF\u53F0\u5E02","value":"370600"},{"text":"\u6F4D\u574A\u5E02","value":"370700"},{"text":"\u6D4E\u5B81\u5E02","value":"370800"},{"text":"\u6CF0\u5B89\u5E02","value":"370900"},{"text":"\u5A01\u6D77\u5E02","value":"371000"},{"text":"\u65E5\u7167\u5E02","value":"371100"},{"text":"\u83B1\u829C\u5E02","value":"371200"},{"text":"\u4E34\u6C82\u5E02","value":"371300"},{"text":"\u5FB7\u5DDE\u5E02","value":"371400"},{"text":"\u804A\u57CE\u5E02","value":"371500"},{"text":"\u6EE8\u5DDE\u5E02","value":"371600"},{"text":"\u83CF\u6CFD\u5E02","value":"371700"}],"410000":[{"text":"\u90D1\u5DDE\u5E02","value":"410100"},{"text":"\u5F00\u5C01\u5E02","value":"410200"},{"text":"\u6D1B\u9633\u5E02","value":"410300"},{"text":"\u5E73\u9876\u5C71\u5E02","value":"410400"},{"text":"\u5B89\u9633\u5E02","value":"410500"},{"text":"\u9E64\u58C1\u5E02","value":"410600"},{"text":"\u65B0\u4E61\u5E02","value":"410700"},{"text":"\u7126\u4F5C\u5E02","value":"410800"},{"text":"\u6FEE\u9633\u5E02","value":"410900"},{"text":"\u8BB8\u660C\u5E02","value":"411000"},{"text":"\u6F2F\u6CB3\u5E02","value":"411100"},{"text":"\u4E09\u95E8\u5CE1\u5E02","value":"411200"},{"text":"\u5357\u9633\u5E02","value":"411300"},{"text":"\u5546\u4E18\u5E02","value":"411400"},{"text":"\u4FE1\u9633\u5E02","value":"411500"},{"text":"\u5468\u53E3\u5E02","value":"411600"},{"text":"\u9A7B\u9A6C\u5E97\u5E02","value":"411700"},{"text":"\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212","value":"419000"}],"420000":[{"text":"\u6B66\u6C49\u5E02","value":"420100"},{"text":"\u9EC4\u77F3\u5E02","value":"420200"},{"text":"\u5341\u5830\u5E02","value":"420300"},{"text":"\u5B9C\u660C\u5E02","value":"420500"},{"text":"\u8944\u9633\u5E02","value":"420600"},{"text":"\u9102\u5DDE\u5E02","value":"420700"},{"text":"\u8346\u95E8\u5E02","value":"420800"},{"text":"\u5B5D\u611F\u5E02","value":"420900"},{"text":"\u8346\u5DDE\u5E02","value":"421000"},{"text":"\u9EC4\u5188\u5E02","value":"421100"},{"text":"\u54B8\u5B81\u5E02","value":"421200"},{"text":"\u968F\u5DDE\u5E02","value":"421300"},{"text":"\u6069\u65BD\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE","value":"422800"},{"text":"\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212","value":"429000"}],"430000":[{"text":"\u957F\u6C99\u5E02","value":"430100"},{"text":"\u682A\u6D32\u5E02","value":"430200"},{"text":"\u6E58\u6F6D\u5E02","value":"430300"},{"text":"\u8861\u9633\u5E02","value":"430400"},{"text":"\u90B5\u9633\u5E02","value":"430500"},{"text":"\u5CB3\u9633\u5E02","value":"430600"},{"text":"\u5E38\u5FB7\u5E02","value":"430700"},{"text":"\u5F20\u5BB6\u754C\u5E02","value":"430800"},{"text":"\u76CA\u9633\u5E02","value":"430900"},{"text":"\u90F4\u5DDE\u5E02","value":"431000"},{"text":"\u6C38\u5DDE\u5E02","value":"431100"},{"text":"\u6000\u5316\u5E02","value":"431200"},{"text":"\u5A04\u5E95\u5E02","value":"431300"},{"text":"\u6E58\u897F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE","value":"433100"}],"440000":[{"text":"\u5E7F\u5DDE\u5E02","value":"440100"},{"text":"\u97F6\u5173\u5E02","value":"440200"},{"text":"\u6DF1\u5733\u5E02","value":"440300"},{"text":"\u73E0\u6D77\u5E02","value":"440400"},{"text":"\u6C55\u5934\u5E02","value":"440500"},{"text":"\u4F5B\u5C71\u5E02","value":"440600"},{"text":"\u6C5F\u95E8\u5E02","value":"440700"},{"text":"\u6E5B\u6C5F\u5E02","value":"440800"},{"text":"\u8302\u540D\u5E02","value":"440900"},{"text":"\u8087\u5E86\u5E02","value":"441200"},{"text":"\u60E0\u5DDE\u5E02","value":"441300"},{"text":"\u6885\u5DDE\u5E02","value":"441400"},{"text":"\u6C55\u5C3E\u5E02","value":"441500"},{"text":"\u6CB3\u6E90\u5E02","value":"441600"},{"text":"\u9633\u6C5F\u5E02","value":"441700"},{"text":"\u6E05\u8FDC\u5E02","value":"441800"},{"text":"\u4E1C\u839E\u5E02","value":"441900"},{"text":"\u4E2D\u5C71\u5E02","value":"442000"},{"text":"\u6F6E\u5DDE\u5E02","value":"445100"},{"text":"\u63ED\u9633\u5E02","value":"445200"},{"text":"\u4E91\u6D6E\u5E02","value":"445300"}],"450000":[{"text":"\u5357\u5B81\u5E02","value":"450100"},{"text":"\u67F3\u5DDE\u5E02","value":"450200"},{"text":"\u6842\u6797\u5E02","value":"450300"},{"text":"\u68A7\u5DDE\u5E02","value":"450400"},{"text":"\u5317\u6D77\u5E02","value":"450500"},{"text":"\u9632\u57CE\u6E2F\u5E02","value":"450600"},{"text":"\u94A6\u5DDE\u5E02","value":"450700"},{"text":"\u8D35\u6E2F\u5E02","value":"450800"},{"text":"\u7389\u6797\u5E02","value":"450900"},{"text":"\u767E\u8272\u5E02","value":"451000"},{"text":"\u8D3A\u5DDE\u5E02","value":"451100"},{"text":"\u6CB3\u6C60\u5E02","value":"451200"},{"text":"\u6765\u5BBE\u5E02","value":"451300"},{"text":"\u5D07\u5DE6\u5E02","value":"451400"}],"460000":[{"text":"\u6D77\u53E3\u5E02","value":"460100"},{"text":"\u4E09\u4E9A\u5E02","value":"460200"},{"text":"\u4E09\u6C99\u5E02","value":"460300"},{"text":"\u7701\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212","value":"469000"}],"500000":[{"text":"\u5E02\u8F96\u533A","value":"500100"},{"text":"\u53BF","value":"500200"}],"510000":[{"text":"\u6210\u90FD\u5E02","value":"510100"},{"text":"\u81EA\u8D21\u5E02","value":"510300"},{"text":"\u6500\u679D\u82B1\u5E02","value":"510400"},{"text":"\u6CF8\u5DDE\u5E02","value":"510500"},{"text":"\u5FB7\u9633\u5E02","value":"510600"},{"text":"\u7EF5\u9633\u5E02","value":"510700"},{"text":"\u5E7F\u5143\u5E02","value":"510800"},{"text":"\u9042\u5B81\u5E02","value":"510900"},{"text":"\u5185\u6C5F\u5E02","value":"511000"},{"text":"\u4E50\u5C71\u5E02","value":"511100"},{"text":"\u5357\u5145\u5E02","value":"511300"},{"text":"\u7709\u5C71\u5E02","value":"511400"},{"text":"\u5B9C\u5BBE\u5E02","value":"511500"},{"text":"\u5E7F\u5B89\u5E02","value":"511600"},{"text":"\u8FBE\u5DDE\u5E02","value":"511700"},{"text":"\u96C5\u5B89\u5E02","value":"511800"},{"text":"\u5DF4\u4E2D\u5E02","value":"511900"},{"text":"\u8D44\u9633\u5E02","value":"512000"},{"text":"\u963F\u575D\u85CF\u65CF\u7F8C\u65CF\u81EA\u6CBB\u5DDE","value":"513200"},{"text":"\u7518\u5B5C\u85CF\u65CF\u81EA\u6CBB\u5DDE","value":"513300"},{"text":"\u51C9\u5C71\u5F5D\u65CF\u81EA\u6CBB\u5DDE","value":"513400"}],"520000":[{"text":"\u8D35\u9633\u5E02","value":"520100"},{"text":"\u516D\u76D8\u6C34\u5E02","value":"520200"},{"text":"\u9075\u4E49\u5E02","value":"520300"},{"text":"\u5B89\u987A\u5E02","value":"520400"},{"text":"\u6BD5\u8282\u5E02","value":"520500"},{"text":"\u94DC\u4EC1\u5E02","value":"520600"},{"text":"\u9ED4\u897F\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE","value":"522300"},{"text":"\u9ED4\u4E1C\u5357\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u5DDE","value":"522600"},{"text":"\u9ED4\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE","value":"522700"}],"530000":[{"text":"\u6606\u660E\u5E02","value":"530100"},{"text":"\u66F2\u9756\u5E02","value":"530300"},{"text":"\u7389\u6EAA\u5E02","value":"530400"},{"text":"\u4FDD\u5C71\u5E02","value":"530500"},{"text":"\u662D\u901A\u5E02","value":"530600"},{"text":"\u4E3D\u6C5F\u5E02","value":"530700"},{"text":"\u666E\u6D31\u5E02","value":"530800"},{"text":"\u4E34\u6CA7\u5E02","value":"530900"},{"text":"\u695A\u96C4\u5F5D\u65CF\u81EA\u6CBB\u5DDE","value":"532300"},{"text":"\u7EA2\u6CB3\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u5DDE","value":"532500"},{"text":"\u6587\u5C71\u58EE\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE","value":"532600"},{"text":"\u897F\u53CC\u7248\u7EB3\u50A3\u65CF\u81EA\u6CBB\u5DDE","value":"532800"},{"text":"\u5927\u7406\u767D\u65CF\u81EA\u6CBB\u5DDE","value":"532900"},{"text":"\u5FB7\u5B8F\u50A3\u65CF\u666F\u9887\u65CF\u81EA\u6CBB\u5DDE","value":"533100"},{"text":"\u6012\u6C5F\u5088\u50F3\u65CF\u81EA\u6CBB\u5DDE","value":"533300"},{"text":"\u8FEA\u5E86\u85CF\u65CF\u81EA\u6CBB\u5DDE","value":"533400"}],"540000":[{"text":"\u62C9\u8428\u5E02","value":"540100"},{"text":"\u660C\u90FD\u5730\u533A","value":"542100"},{"text":"\u5C71\u5357\u5730\u533A","value":"542200"},{"text":"\u65E5\u5580\u5219\u5730\u533A","value":"542300"},{"text":"\u90A3\u66F2\u5730\u533A","value":"542400"},{"text":"\u963F\u91CC\u5730\u533A","value":"542500"},{"text":"\u6797\u829D\u5730\u533A","value":"542600"}],"610000":[{"text":"\u897F\u5B89\u5E02","value":"610100"},{"text":"\u94DC\u5DDD\u5E02","value":"610200"},{"text":"\u5B9D\u9E21\u5E02","value":"610300"},{"text":"\u54B8\u9633\u5E02","value":"610400"},{"text":"\u6E2D\u5357\u5E02","value":"610500"},{"text":"\u5EF6\u5B89\u5E02","value":"610600"},{"text":"\u6C49\u4E2D\u5E02","value":"610700"},{"text":"\u6986\u6797\u5E02","value":"610800"},{"text":"\u5B89\u5EB7\u5E02","value":"610900"},{"text":"\u5546\u6D1B\u5E02","value":"611000"}],"620000":[{"text":"\u5170\u5DDE\u5E02","value":"620100"},{"text":"\u5609\u5CEA\u5173\u5E02","value":"620200"},{"text":"\u91D1\u660C\u5E02","value":"620300"},{"text":"\u767D\u94F6\u5E02","value":"620400"},{"text":"\u5929\u6C34\u5E02","value":"620500"},{"text":"\u6B66\u5A01\u5E02","value":"620600"},{"text":"\u5F20\u6396\u5E02","value":"620700"},{"text":"\u5E73\u51C9\u5E02","value":"620800"},{"text":"\u9152\u6CC9\u5E02","value":"620900"},{"text":"\u5E86\u9633\u5E02","value":"621000"},{"text":"\u5B9A\u897F\u5E02","value":"621100"},{"text":"\u9647\u5357\u5E02","value":"621200"},{"text":"\u4E34\u590F\u56DE\u65CF\u81EA\u6CBB\u5DDE","value":"622900"},{"text":"\u7518\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE","value":"623000"}],"630000":[{"text":"\u897F\u5B81\u5E02","value":"630100"},{"text":"\u6D77\u4E1C\u5E02","value":"630200"},{"text":"\u6D77\u5317\u85CF\u65CF\u81EA\u6CBB\u5DDE","value":"632200"},{"text":"\u9EC4\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE","value":"632300"},{"text":"\u6D77\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE","value":"632500"},{"text":"\u679C\u6D1B\u85CF\u65CF\u81EA\u6CBB\u5DDE","value":"632600"},{"text":"\u7389\u6811\u85CF\u65CF\u81EA\u6CBB\u5DDE","value":"632700"},{"text":"\u6D77\u897F\u8499\u53E4\u65CF\u85CF\u65CF\u81EA\u6CBB\u5DDE","value":"632800"}],"640000":[{"text":"\u94F6\u5DDD\u5E02","value":"640100"},{"text":"\u77F3\u5634\u5C71\u5E02","value":"640200"},{"text":"\u5434\u5FE0\u5E02","value":"640300"},{"text":"\u56FA\u539F\u5E02","value":"640400"},{"text":"\u4E2D\u536B\u5E02","value":"640500"}],"650000":[{"text":"\u4E4C\u9C81\u6728\u9F50\u5E02","value":"650100"},{"text":"\u514B\u62C9\u739B\u4F9D\u5E02","value":"650200"},{"text":"\u5410\u9C81\u756A\u5730\u533A","value":"652100"},{"text":"\u54C8\u5BC6\u5730\u533A","value":"652200"},{"text":"\u660C\u5409\u56DE\u65CF\u81EA\u6CBB\u5DDE","value":"652300"},{"text":"\u535A\u5C14\u5854\u62C9\u8499\u53E4\u81EA\u6CBB\u5DDE","value":"652700"},{"text":"\u5DF4\u97F3\u90ED\u695E\u8499\u53E4\u81EA\u6CBB\u5DDE","value":"652800"},{"text":"\u963F\u514B\u82CF\u5730\u533A","value":"652900"},{"text":"\u514B\u5B5C\u52D2\u82CF\u67EF\u5C14\u514B\u5B5C\u81EA\u6CBB\u5DDE","value":"653000"},{"text":"\u5580\u4EC0\u5730\u533A","value":"653100"},{"text":"\u548C\u7530\u5730\u533A","value":"653200"},{"text":"\u4F0A\u7281\u54C8\u8428\u514B\u81EA\u6CBB\u5DDE","value":"654000"},{"text":"\u5854\u57CE\u5730\u533A","value":"654200"},{"text":"\u963F\u52D2\u6CF0\u5730\u533A","value":"654300"},{"text":"\u81EA\u6CBB\u533A\u76F4\u8F96\u53BF\u7EA7\u884C\u653F\u533A\u5212","value":"659000"}],"710000":"","810000":"","820000":""},distsData={"110100":[{"text":"\u4E1C\u57CE\u533A","value":"110101"},{"text":"\u897F\u57CE\u533A","value":"110102"},{"text":"\u671D\u9633\u533A","value":"110105"},{"text":"\u4E30\u53F0\u533A","value":"110106"},{"text":"\u77F3\u666F\u5C71\u533A","value":"110107"},{"text":"\u6D77\u6DC0\u533A","value":"110108"},{"text":"\u95E8\u5934\u6C9F\u533A","value":"110109"},{"text":"\u623F\u5C71\u533A","value":"110111"},{"text":"\u901A\u5DDE\u533A","value":"110112"},{"text":"\u987A\u4E49\u533A","value":"110113"},{"text":"\u660C\u5E73\u533A","value":"110114"},{"text":"\u5927\u5174\u533A","value":"110115"},{"text":"\u6000\u67D4\u533A","value":"110116"},{"text":"\u5E73\u8C37\u533A","value":"110117"}],"110200":[{"text":"\u5BC6\u4E91\u53BF","value":"110228"},{"text":"\u5EF6\u5E86\u53BF","value":"110229"}],"120100":[{"text":"\u548C\u5E73\u533A","value":"120101"},{"text":"\u6CB3\u4E1C\u533A","value":"120102"},{"text":"\u6CB3\u897F\u533A","value":"120103"},{"text":"\u5357\u5F00\u533A","value":"120104"},{"text":"\u6CB3\u5317\u533A","value":"120105"},{"text":"\u7EA2\u6865\u533A","value":"120106"},{"text":"\u4E1C\u4E3D\u533A","value":"120110"},{"text":"\u897F\u9752\u533A","value":"120111"},{"text":"\u6D25\u5357\u533A","value":"120112"},{"text":"\u5317\u8FB0\u533A","value":"120113"},{"text":"\u6B66\u6E05\u533A","value":"120114"},{"text":"\u5B9D\u577B\u533A","value":"120115"},{"text":"\u6EE8\u6D77\u65B0\u533A","value":"120116"}],"120200":[{"text":"\u5B81\u6CB3\u53BF","value":"120221"},{"text":"\u9759\u6D77\u53BF","value":"120223"},{"text":"\u84DF\u53BF","value":"120225"}],"130100":[{"text":"\u5E02\u8F96\u533A","value":"130101"},{"text":"\u957F\u5B89\u533A","value":"130102"},{"text":"\u6865\u4E1C\u533A","value":"130103"},{"text":"\u6865\u897F\u533A","value":"130104"},{"text":"\u65B0\u534E\u533A","value":"130105"},{"text":"\u4E95\u9649\u77FF\u533A","value":"130107"},{"text":"\u88D5\u534E\u533A","value":"130108"},{"text":"\u4E95\u9649\u53BF","value":"130121"},{"text":"\u6B63\u5B9A\u53BF","value":"130123"},{"text":"\u683E\u57CE\u53BF","value":"130124"},{"text":"\u884C\u5510\u53BF","value":"130125"},{"text":"\u7075\u5BFF\u53BF","value":"130126"},{"text":"\u9AD8\u9091\u53BF","value":"130127"},{"text":"\u6DF1\u6CFD\u53BF","value":"130128"},{"text":"\u8D5E\u7687\u53BF","value":"130129"},{"text":"\u65E0\u6781\u53BF","value":"130130"},{"text":"\u5E73\u5C71\u53BF","value":"130131"},{"text":"\u5143\u6C0F\u53BF","value":"130132"},{"text":"\u8D75\u53BF","value":"130133"},{"text":"\u8F9B\u96C6\u5E02","value":"130181"},{"text":"\u85C1\u57CE\u5E02","value":"130182"},{"text":"\u664B\u5DDE\u5E02","value":"130183"},{"text":"\u65B0\u4E50\u5E02","value":"130184"},{"text":"\u9E7F\u6CC9\u5E02","value":"130185"}],"130200":[{"text":"\u5E02\u8F96\u533A","value":"130201"},{"text":"\u8DEF\u5357\u533A","value":"130202"},{"text":"\u8DEF\u5317\u533A","value":"130203"},{"text":"\u53E4\u51B6\u533A","value":"130204"},{"text":"\u5F00\u5E73\u533A","value":"130205"},{"text":"\u4E30\u5357\u533A","value":"130207"},{"text":"\u4E30\u6DA6\u533A","value":"130208"},{"text":"\u66F9\u5983\u7538\u533A","value":"130209"},{"text":"\u6EE6\u53BF","value":"130223"},{"text":"\u6EE6\u5357\u53BF","value":"130224"},{"text":"\u4E50\u4EAD\u53BF","value":"130225"},{"text":"\u8FC1\u897F\u53BF","value":"130227"},{"text":"\u7389\u7530\u53BF","value":"130229"},{"text":"\u9075\u5316\u5E02","value":"130281"},{"text":"\u8FC1\u5B89\u5E02","value":"130283"}],"130300":[{"text":"\u5E02\u8F96\u533A","value":"130301"},{"text":"\u6D77\u6E2F\u533A","value":"130302"},{"text":"\u5C71\u6D77\u5173\u533A","value":"130303"},{"text":"\u5317\u6234\u6CB3\u533A","value":"130304"},{"text":"\u9752\u9F99\u6EE1\u65CF\u81EA\u6CBB\u53BF","value":"130321"},{"text":"\u660C\u9ECE\u53BF","value":"130322"},{"text":"\u629A\u5B81\u53BF","value":"130323"},{"text":"\u5362\u9F99\u53BF","value":"130324"}],"130400":[{"text":"\u5E02\u8F96\u533A","value":"130401"},{"text":"\u90AF\u5C71\u533A","value":"130402"},{"text":"\u4E1B\u53F0\u533A","value":"130403"},{"text":"\u590D\u5174\u533A","value":"130404"},{"text":"\u5CF0\u5CF0\u77FF\u533A","value":"130406"},{"text":"\u90AF\u90F8\u53BF","value":"130421"},{"text":"\u4E34\u6F33\u53BF","value":"130423"},{"text":"\u6210\u5B89\u53BF","value":"130424"},{"text":"\u5927\u540D\u53BF","value":"130425"},{"text":"\u6D89\u53BF","value":"130426"},{"text":"\u78C1\u53BF","value":"130427"},{"text":"\u80A5\u4E61\u53BF","value":"130428"},{"text":"\u6C38\u5E74\u53BF","value":"130429"},{"text":"\u90B1\u53BF","value":"130430"},{"text":"\u9E21\u6CFD\u53BF","value":"130431"},{"text":"\u5E7F\u5E73\u53BF","value":"130432"},{"text":"\u9986\u9676\u53BF","value":"130433"},{"text":"\u9B4F\u53BF","value":"130434"},{"text":"\u66F2\u5468\u53BF","value":"130435"},{"text":"\u6B66\u5B89\u5E02","value":"130481"}],"130500":[{"text":"\u5E02\u8F96\u533A","value":"130501"},{"text":"\u6865\u4E1C\u533A","value":"130502"},{"text":"\u6865\u897F\u533A","value":"130503"},{"text":"\u90A2\u53F0\u53BF","value":"130521"},{"text":"\u4E34\u57CE\u53BF","value":"130522"},{"text":"\u5185\u4E18\u53BF","value":"130523"},{"text":"\u67CF\u4E61\u53BF","value":"130524"},{"text":"\u9686\u5C27\u53BF","value":"130525"},{"text":"\u4EFB\u53BF","value":"130526"},{"text":"\u5357\u548C\u53BF","value":"130527"},{"text":"\u5B81\u664B\u53BF","value":"130528"},{"text":"\u5DE8\u9E7F\u53BF","value":"130529"},{"text":"\u65B0\u6CB3\u53BF","value":"130530"},{"text":"\u5E7F\u5B97\u53BF","value":"130531"},{"text":"\u5E73\u4E61\u53BF","value":"130532"},{"text":"\u5A01\u53BF","value":"130533"},{"text":"\u6E05\u6CB3\u53BF","value":"130534"},{"text":"\u4E34\u897F\u53BF","value":"130535"},{"text":"\u5357\u5BAB\u5E02","value":"130581"},{"text":"\u6C99\u6CB3\u5E02","value":"130582"}],"130600":[{"text":"\u5E02\u8F96\u533A","value":"130601"},{"text":"\u65B0\u5E02\u533A","value":"130602"},{"text":"\u5317\u5E02\u533A","value":"130603"},{"text":"\u5357\u5E02\u533A","value":"130604"},{"text":"\u6EE1\u57CE\u53BF","value":"130621"},{"text":"\u6E05\u82D1\u53BF","value":"130622"},{"text":"\u6D9E\u6C34\u53BF","value":"130623"},{"text":"\u961C\u5E73\u53BF","value":"130624"},{"text":"\u5F90\u6C34\u53BF","value":"130625"},{"text":"\u5B9A\u5174\u53BF","value":"130626"},{"text":"\u5510\u53BF","value":"130627"},{"text":"\u9AD8\u9633\u53BF","value":"130628"},{"text":"\u5BB9\u57CE\u53BF","value":"130629"},{"text":"\u6D9E\u6E90\u53BF","value":"130630"},{"text":"\u671B\u90FD\u53BF","value":"130631"},{"text":"\u5B89\u65B0\u53BF","value":"130632"},{"text":"\u6613\u53BF","value":"130633"},{"text":"\u66F2\u9633\u53BF","value":"130634"},{"text":"\u8821\u53BF","value":"130635"},{"text":"\u987A\u5E73\u53BF","value":"130636"},{"text":"\u535A\u91CE\u53BF","value":"130637"},{"text":"\u96C4\u53BF","value":"130638"},{"text":"\u6DBF\u5DDE\u5E02","value":"130681"},{"text":"\u5B9A\u5DDE\u5E02","value":"130682"},{"text":"\u5B89\u56FD\u5E02","value":"130683"},{"text":"\u9AD8\u7891\u5E97\u5E02","value":"130684"}],"130700":[{"text":"\u5E02\u8F96\u533A","value":"130701"},{"text":"\u6865\u4E1C\u533A","value":"130702"},{"text":"\u6865\u897F\u533A","value":"130703"},{"text":"\u5BA3\u5316\u533A","value":"130705"},{"text":"\u4E0B\u82B1\u56ED\u533A","value":"130706"},{"text":"\u5BA3\u5316\u53BF","value":"130721"},{"text":"\u5F20\u5317\u53BF","value":"130722"},{"text":"\u5EB7\u4FDD\u53BF","value":"130723"},{"text":"\u6CBD\u6E90\u53BF","value":"130724"},{"text":"\u5C1A\u4E49\u53BF","value":"130725"},{"text":"\u851A\u53BF","value":"130726"},{"text":"\u9633\u539F\u53BF","value":"130727"},{"text":"\u6000\u5B89\u53BF","value":"130728"},{"text":"\u4E07\u5168\u53BF","value":"130729"},{"text":"\u6000\u6765\u53BF","value":"130730"},{"text":"\u6DBF\u9E7F\u53BF","value":"130731"},{"text":"\u8D64\u57CE\u53BF","value":"130732"},{"text":"\u5D07\u793C\u53BF","value":"130733"}],"130800":[{"text":"\u5E02\u8F96\u533A","value":"130801"},{"text":"\u53CC\u6865\u533A","value":"130802"},{"text":"\u53CC\u6EE6\u533A","value":"130803"},{"text":"\u9E70\u624B\u8425\u5B50\u77FF\u533A","value":"130804"},{"text":"\u627F\u5FB7\u53BF","value":"130821"},{"text":"\u5174\u9686\u53BF","value":"130822"},{"text":"\u5E73\u6CC9\u53BF","value":"130823"},{"text":"\u6EE6\u5E73\u53BF","value":"130824"},{"text":"\u9686\u5316\u53BF","value":"130825"},{"text":"\u4E30\u5B81\u6EE1\u65CF\u81EA\u6CBB\u53BF","value":"130826"},{"text":"\u5BBD\u57CE\u6EE1\u65CF\u81EA\u6CBB\u53BF","value":"130827"},{"text":"\u56F4\u573A\u6EE1\u65CF\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF","value":"130828"}],"130900":[{"text":"\u5E02\u8F96\u533A","value":"130901"},{"text":"\u65B0\u534E\u533A","value":"130902"},{"text":"\u8FD0\u6CB3\u533A","value":"130903"},{"text":"\u6CA7\u53BF","value":"130921"},{"text":"\u9752\u53BF","value":"130922"},{"text":"\u4E1C\u5149\u53BF","value":"130923"},{"text":"\u6D77\u5174\u53BF","value":"130924"},{"text":"\u76D0\u5C71\u53BF","value":"130925"},{"text":"\u8083\u5B81\u53BF","value":"130926"},{"text":"\u5357\u76AE\u53BF","value":"130927"},{"text":"\u5434\u6865\u53BF","value":"130928"},{"text":"\u732E\u53BF","value":"130929"},{"text":"\u5B5F\u6751\u56DE\u65CF\u81EA\u6CBB\u53BF","value":"130930"},{"text":"\u6CCA\u5934\u5E02","value":"130981"},{"text":"\u4EFB\u4E18\u5E02","value":"130982"},{"text":"\u9EC4\u9A85\u5E02","value":"130983"},{"text":"\u6CB3\u95F4\u5E02","value":"130984"}],"131000":[{"text":"\u5E02\u8F96\u533A","value":"131001"},{"text":"\u5B89\u6B21\u533A","value":"131002"},{"text":"\u5E7F\u9633\u533A","value":"131003"},{"text":"\u56FA\u5B89\u53BF","value":"131022"},{"text":"\u6C38\u6E05\u53BF","value":"131023"},{"text":"\u9999\u6CB3\u53BF","value":"131024"},{"text":"\u5927\u57CE\u53BF","value":"131025"},{"text":"\u6587\u5B89\u53BF","value":"131026"},{"text":"\u5927\u5382\u56DE\u65CF\u81EA\u6CBB\u53BF","value":"131028"},{"text":"\u9738\u5DDE\u5E02","value":"131081"},{"text":"\u4E09\u6CB3\u5E02","value":"131082"}],"131100":[{"text":"\u5E02\u8F96\u533A","value":"131101"},{"text":"\u6843\u57CE\u533A","value":"131102"},{"text":"\u67A3\u5F3A\u53BF","value":"131121"},{"text":"\u6B66\u9091\u53BF","value":"131122"},{"text":"\u6B66\u5F3A\u53BF","value":"131123"},{"text":"\u9976\u9633\u53BF","value":"131124"},{"text":"\u5B89\u5E73\u53BF","value":"131125"},{"text":"\u6545\u57CE\u53BF","value":"131126"},{"text":"\u666F\u53BF","value":"131127"},{"text":"\u961C\u57CE\u53BF","value":"131128"},{"text":"\u5180\u5DDE\u5E02","value":"131181"},{"text":"\u6DF1\u5DDE\u5E02","value":"131182"}],"140100":[{"text":"\u5E02\u8F96\u533A","value":"140101"},{"text":"\u5C0F\u5E97\u533A","value":"140105"},{"text":"\u8FCE\u6CFD\u533A","value":"140106"},{"text":"\u674F\u82B1\u5CAD\u533A","value":"140107"},{"text":"\u5C16\u8349\u576A\u533A","value":"140108"},{"text":"\u4E07\u67CF\u6797\u533A","value":"140109"},{"text":"\u664B\u6E90\u533A","value":"140110"},{"text":"\u6E05\u5F90\u53BF","value":"140121"},{"text":"\u9633\u66F2\u53BF","value":"140122"},{"text":"\u5A04\u70E6\u53BF","value":"140123"},{"text":"\u53E4\u4EA4\u5E02","value":"140181"}],"140200":[{"text":"\u5E02\u8F96\u533A","value":"140201"},{"text":"\u57CE\u533A","value":"140202"},{"text":"\u77FF\u533A","value":"140203"},{"text":"\u5357\u90CA\u533A","value":"140211"},{"text":"\u65B0\u8363\u533A","value":"140212"},{"text":"\u9633\u9AD8\u53BF","value":"140221"},{"text":"\u5929\u9547\u53BF","value":"140222"},{"text":"\u5E7F\u7075\u53BF","value":"140223"},{"text":"\u7075\u4E18\u53BF","value":"140224"},{"text":"\u6D51\u6E90\u53BF","value":"140225"},{"text":"\u5DE6\u4E91\u53BF","value":"140226"},{"text":"\u5927\u540C\u53BF","value":"140227"}],"140300":[{"text":"\u5E02\u8F96\u533A","value":"140301"},{"text":"\u57CE\u533A","value":"140302"},{"text":"\u77FF\u533A","value":"140303"},{"text":"\u90CA\u533A","value":"140311"},{"text":"\u5E73\u5B9A\u53BF","value":"140321"},{"text":"\u76C2\u53BF","value":"140322"}],"140400":[{"text":"\u5E02\u8F96\u533A","value":"140401"},{"text":"\u57CE\u533A","value":"140402"},{"text":"\u90CA\u533A","value":"140411"},{"text":"\u957F\u6CBB\u53BF","value":"140421"},{"text":"\u8944\u57A3\u53BF","value":"140423"},{"text":"\u5C6F\u7559\u53BF","value":"140424"},{"text":"\u5E73\u987A\u53BF","value":"140425"},{"text":"\u9ECE\u57CE\u53BF","value":"140426"},{"text":"\u58F6\u5173\u53BF","value":"140427"},{"text":"\u957F\u5B50\u53BF","value":"140428"},{"text":"\u6B66\u4E61\u53BF","value":"140429"},{"text":"\u6C81\u53BF","value":"140430"},{"text":"\u6C81\u6E90\u53BF","value":"140431"},{"text":"\u6F5E\u57CE\u5E02","value":"140481"}],"140500":[{"text":"\u5E02\u8F96\u533A","value":"140501"},{"text":"\u57CE\u533A","value":"140502"},{"text":"\u6C81\u6C34\u53BF","value":"140521"},{"text":"\u9633\u57CE\u53BF","value":"140522"},{"text":"\u9675\u5DDD\u53BF","value":"140524"},{"text":"\u6CFD\u5DDE\u53BF","value":"140525"},{"text":"\u9AD8\u5E73\u5E02","value":"140581"}],"140600":[{"text":"\u5E02\u8F96\u533A","value":"140601"},{"text":"\u6714\u57CE\u533A","value":"140602"},{"text":"\u5E73\u9C81\u533A","value":"140603"},{"text":"\u5C71\u9634\u53BF","value":"140621"},{"text":"\u5E94\u53BF","value":"140622"},{"text":"\u53F3\u7389\u53BF","value":"140623"},{"text":"\u6000\u4EC1\u53BF","value":"140624"}],"140700":[{"text":"\u5E02\u8F96\u533A","value":"140701"},{"text":"\u6986\u6B21\u533A","value":"140702"},{"text":"\u6986\u793E\u53BF","value":"140721"},{"text":"\u5DE6\u6743\u53BF","value":"140722"},{"text":"\u548C\u987A\u53BF","value":"140723"},{"text":"\u6614\u9633\u53BF","value":"140724"},{"text":"\u5BFF\u9633\u53BF","value":"140725"},{"text":"\u592A\u8C37\u53BF","value":"140726"},{"text":"\u7941\u53BF","value":"140727"},{"text":"\u5E73\u9065\u53BF","value":"140728"},{"text":"\u7075\u77F3\u53BF","value":"140729"},{"text":"\u4ECB\u4F11\u5E02","value":"140781"}],"140800":[{"text":"\u5E02\u8F96\u533A","value":"140801"},{"text":"\u76D0\u6E56\u533A","value":"140802"},{"text":"\u4E34\u7317\u53BF","value":"140821"},{"text":"\u4E07\u8363\u53BF","value":"140822"},{"text":"\u95FB\u559C\u53BF","value":"140823"},{"text":"\u7A37\u5C71\u53BF","value":"140824"},{"text":"\u65B0\u7EDB\u53BF","value":"140825"},{"text":"\u7EDB\u53BF","value":"140826"},{"text":"\u57A3\u66F2\u53BF","value":"140827"},{"text":"\u590F\u53BF","value":"140828"},{"text":"\u5E73\u9646\u53BF","value":"140829"},{"text":"\u82AE\u57CE\u53BF","value":"140830"},{"text":"\u6C38\u6D4E\u5E02","value":"140881"},{"text":"\u6CB3\u6D25\u5E02","value":"140882"}],"140900":[{"text":"\u5E02\u8F96\u533A","value":"140901"},{"text":"\u5FFB\u5E9C\u533A","value":"140902"},{"text":"\u5B9A\u8944\u53BF","value":"140921"},{"text":"\u4E94\u53F0\u53BF","value":"140922"},{"text":"\u4EE3\u53BF","value":"140923"},{"text":"\u7E41\u5CD9\u53BF","value":"140924"},{"text":"\u5B81\u6B66\u53BF","value":"140925"},{"text":"\u9759\u4E50\u53BF","value":"140926"},{"text":"\u795E\u6C60\u53BF","value":"140927"},{"text":"\u4E94\u5BE8\u53BF","value":"140928"},{"text":"\u5CA2\u5C9A\u53BF","value":"140929"},{"text":"\u6CB3\u66F2\u53BF","value":"140930"},{"text":"\u4FDD\u5FB7\u53BF","value":"140931"},{"text":"\u504F\u5173\u53BF","value":"140932"},{"text":"\u539F\u5E73\u5E02","value":"140981"}],"141000":[{"text":"\u5E02\u8F96\u533A","value":"141001"},{"text":"\u5C27\u90FD\u533A","value":"141002"},{"text":"\u66F2\u6C83\u53BF","value":"141021"},{"text":"\u7FFC\u57CE\u53BF","value":"141022"},{"text":"\u8944\u6C7E\u53BF","value":"141023"},{"text":"\u6D2A\u6D1E\u53BF","value":"141024"},{"text":"\u53E4\u53BF","value":"141025"},{"text":"\u5B89\u6CFD\u53BF","value":"141026"},{"text":"\u6D6E\u5C71\u53BF","value":"141027"},{"text":"\u5409\u53BF","value":"141028"},{"text":"\u4E61\u5B81\u53BF","value":"141029"},{"text":"\u5927\u5B81\u53BF","value":"141030"},{"text":"\u96B0\u53BF","value":"141031"},{"text":"\u6C38\u548C\u53BF","value":"141032"},{"text":"\u84B2\u53BF","value":"141033"},{"text":"\u6C7E\u897F\u53BF","value":"141034"},{"text":"\u4FAF\u9A6C\u5E02","value":"141081"},{"text":"\u970D\u5DDE\u5E02","value":"141082"}],"141100":[{"text":"\u5E02\u8F96\u533A","value":"141101"},{"text":"\u79BB\u77F3\u533A","value":"141102"},{"text":"\u6587\u6C34\u53BF","value":"141121"},{"text":"\u4EA4\u57CE\u53BF","value":"141122"},{"text":"\u5174\u53BF","value":"141123"},{"text":"\u4E34\u53BF","value":"141124"},{"text":"\u67F3\u6797\u53BF","value":"141125"},{"text":"\u77F3\u697C\u53BF","value":"141126"},{"text":"\u5C9A\u53BF","value":"141127"},{"text":"\u65B9\u5C71\u53BF","value":"141128"},{"text":"\u4E2D\u9633\u53BF","value":"141129"},{"text":"\u4EA4\u53E3\u53BF","value":"141130"},{"text":"\u5B5D\u4E49\u5E02","value":"141181"},{"text":"\u6C7E\u9633\u5E02","value":"141182"}],"150100":[{"text":"\u5E02\u8F96\u533A","value":"150101"},{"text":"\u65B0\u57CE\u533A","value":"150102"},{"text":"\u56DE\u6C11\u533A","value":"150103"},{"text":"\u7389\u6CC9\u533A","value":"150104"},{"text":"\u8D5B\u7F55\u533A","value":"150105"},{"text":"\u571F\u9ED8\u7279\u5DE6\u65D7","value":"150121"},{"text":"\u6258\u514B\u6258\u53BF","value":"150122"},{"text":"\u548C\u6797\u683C\u5C14\u53BF","value":"150123"},{"text":"\u6E05\u6C34\u6CB3\u53BF","value":"150124"},{"text":"\u6B66\u5DDD\u53BF","value":"150125"}],"150200":[{"text":"\u5E02\u8F96\u533A","value":"150201"},{"text":"\u4E1C\u6CB3\u533A","value":"150202"},{"text":"\u6606\u90FD\u4ED1\u533A","value":"150203"},{"text":"\u9752\u5C71\u533A","value":"150204"},{"text":"\u77F3\u62D0\u533A","value":"150205"},{"text":"\u767D\u4E91\u9102\u535A\u77FF\u533A","value":"150206"},{"text":"\u4E5D\u539F\u533A","value":"150207"},{"text":"\u571F\u9ED8\u7279\u53F3\u65D7","value":"150221"},{"text":"\u56FA\u9633\u53BF","value":"150222"},{"text":"\u8FBE\u5C14\u7F55\u8302\u660E\u5B89\u8054\u5408\u65D7","value":"150223"}],"150300":[{"text":"\u5E02\u8F96\u533A","value":"150301"},{"text":"\u6D77\u52C3\u6E7E\u533A","value":"150302"},{"text":"\u6D77\u5357\u533A","value":"150303"},{"text":"\u4E4C\u8FBE\u533A","value":"150304"}],"150400":[{"text":"\u5E02\u8F96\u533A","value":"150401"},{"text":"\u7EA2\u5C71\u533A","value":"150402"},{"text":"\u5143\u5B9D\u5C71\u533A","value":"150403"},{"text":"\u677E\u5C71\u533A","value":"150404"},{"text":"\u963F\u9C81\u79D1\u5C14\u6C81\u65D7","value":"150421"},{"text":"\u5DF4\u6797\u5DE6\u65D7","value":"150422"},{"text":"\u5DF4\u6797\u53F3\u65D7","value":"150423"},{"text":"\u6797\u897F\u53BF","value":"150424"},{"text":"\u514B\u4EC0\u514B\u817E\u65D7","value":"150425"},{"text":"\u7FC1\u725B\u7279\u65D7","value":"150426"},{"text":"\u5580\u5587\u6C81\u65D7","value":"150428"},{"text":"\u5B81\u57CE\u53BF","value":"150429"},{"text":"\u6556\u6C49\u65D7","value":"150430"}],"150500":[{"text":"\u5E02\u8F96\u533A","value":"150501"},{"text":"\u79D1\u5C14\u6C81\u533A","value":"150502"},{"text":"\u79D1\u5C14\u6C81\u5DE6\u7FFC\u4E2D\u65D7","value":"150521"},{"text":"\u79D1\u5C14\u6C81\u5DE6\u7FFC\u540E\u65D7","value":"150522"},{"text":"\u5F00\u9C81\u53BF","value":"150523"},{"text":"\u5E93\u4F26\u65D7","value":"150524"},{"text":"\u5948\u66FC\u65D7","value":"150525"},{"text":"\u624E\u9C81\u7279\u65D7","value":"150526"},{"text":"\u970D\u6797\u90ED\u52D2\u5E02","value":"150581"}],"150600":[{"text":"\u5E02\u8F96\u533A","value":"150601"},{"text":"\u4E1C\u80DC\u533A","value":"150602"},{"text":"\u8FBE\u62C9\u7279\u65D7","value":"150621"},{"text":"\u51C6\u683C\u5C14\u65D7","value":"150622"},{"text":"\u9102\u6258\u514B\u524D\u65D7","value":"150623"},{"text":"\u9102\u6258\u514B\u65D7","value":"150624"},{"text":"\u676D\u9526\u65D7","value":"150625"},{"text":"\u4E4C\u5BA1\u65D7","value":"150626"},{"text":"\u4F0A\u91D1\u970D\u6D1B\u65D7","value":"150627"}],"150700":[{"text":"\u5E02\u8F96\u533A","value":"150701"},{"text":"\u6D77\u62C9\u5C14\u533A","value":"150702"},{"text":"\u624E\u8D49\u8BFA\u5C14\u533A","value":"150703"},{"text":"\u963F\u8363\u65D7","value":"150721"},{"text":"\u83AB\u529B\u8FBE\u74E6\u8FBE\u65A1\u5C14\u65CF\u81EA\u6CBB\u65D7","value":"150722"},{"text":"\u9102\u4F26\u6625\u81EA\u6CBB\u65D7","value":"150723"},{"text":"\u9102\u6E29\u514B\u65CF\u81EA\u6CBB\u65D7","value":"150724"},{"text":"\u9648\u5DF4\u5C14\u864E\u65D7","value":"150725"},{"text":"\u65B0\u5DF4\u5C14\u864E\u5DE6\u65D7","value":"150726"},{"text":"\u65B0\u5DF4\u5C14\u864E\u53F3\u65D7","value":"150727"},{"text":"\u6EE1\u6D32\u91CC\u5E02","value":"150781"},{"text":"\u7259\u514B\u77F3\u5E02","value":"150782"},{"text":"\u624E\u5170\u5C6F\u5E02","value":"150783"},{"text":"\u989D\u5C14\u53E4\u7EB3\u5E02","value":"150784"},{"text":"\u6839\u6CB3\u5E02","value":"150785"}],"150800":[{"text":"\u5E02\u8F96\u533A","value":"150801"},{"text":"\u4E34\u6CB3\u533A","value":"150802"},{"text":"\u4E94\u539F\u53BF","value":"150821"},{"text":"\u78F4\u53E3\u53BF","value":"150822"},{"text":"\u4E4C\u62C9\u7279\u524D\u65D7","value":"150823"},{"text":"\u4E4C\u62C9\u7279\u4E2D\u65D7","value":"150824"},{"text":"\u4E4C\u62C9\u7279\u540E\u65D7","value":"150825"},{"text":"\u676D\u9526\u540E\u65D7","value":"150826"}],"150900":[{"text":"\u5E02\u8F96\u533A","value":"150901"},{"text":"\u96C6\u5B81\u533A","value":"150902"},{"text":"\u5353\u8D44\u53BF","value":"150921"},{"text":"\u5316\u5FB7\u53BF","value":"150922"},{"text":"\u5546\u90FD\u53BF","value":"150923"},{"text":"\u5174\u548C\u53BF","value":"150924"},{"text":"\u51C9\u57CE\u53BF","value":"150925"},{"text":"\u5BDF\u54C8\u5C14\u53F3\u7FFC\u524D\u65D7","value":"150926"},{"text":"\u5BDF\u54C8\u5C14\u53F3\u7FFC\u4E2D\u65D7","value":"150927"},{"text":"\u5BDF\u54C8\u5C14\u53F3\u7FFC\u540E\u65D7","value":"150928"},{"text":"\u56DB\u5B50\u738B\u65D7","value":"150929"},{"text":"\u4E30\u9547\u5E02","value":"150981"}],"152200":[{"text":"\u4E4C\u5170\u6D69\u7279\u5E02","value":"152201"},{"text":"\u963F\u5C14\u5C71\u5E02","value":"152202"},{"text":"\u79D1\u5C14\u6C81\u53F3\u7FFC\u524D\u65D7","value":"152221"},{"text":"\u79D1\u5C14\u6C81\u53F3\u7FFC\u4E2D\u65D7","value":"152222"},{"text":"\u624E\u8D49\u7279\u65D7","value":"152223"},{"text":"\u7A81\u6CC9\u53BF","value":"152224"}],"152500":[{"text":"\u4E8C\u8FDE\u6D69\u7279\u5E02","value":"152501"},{"text":"\u9521\u6797\u6D69\u7279\u5E02","value":"152502"},{"text":"\u963F\u5DF4\u560E\u65D7","value":"152522"},{"text":"\u82CF\u5C3C\u7279\u5DE6\u65D7","value":"152523"},{"text":"\u82CF\u5C3C\u7279\u53F3\u65D7","value":"152524"},{"text":"\u4E1C\u4E4C\u73E0\u7A46\u6C81\u65D7","value":"152525"},{"text":"\u897F\u4E4C\u73E0\u7A46\u6C81\u65D7","value":"152526"},{"text":"\u592A\u4EC6\u5BFA\u65D7","value":"152527"},{"text":"\u9576\u9EC4\u65D7","value":"152528"},{"text":"\u6B63\u9576\u767D\u65D7","value":"152529"},{"text":"\u6B63\u84DD\u65D7","value":"152530"},{"text":"\u591A\u4F26\u53BF","value":"152531"}],"152900":[{"text":"\u963F\u62C9\u5584\u5DE6\u65D7","value":"152921"},{"text":"\u963F\u62C9\u5584\u53F3\u65D7","value":"152922"},{"text":"\u989D\u6D4E\u7EB3\u65D7","value":"152923"}],"210100":[{"text":"\u5E02\u8F96\u533A","value":"210101"},{"text":"\u548C\u5E73\u533A","value":"210102"},{"text":"\u6C88\u6CB3\u533A","value":"210103"},{"text":"\u5927\u4E1C\u533A","value":"210104"},{"text":"\u7687\u59D1\u533A","value":"210105"},{"text":"\u94C1\u897F\u533A","value":"210106"},{"text":"\u82CF\u5BB6\u5C6F\u533A","value":"210111"},{"text":"\u4E1C\u9675\u533A","value":"210112"},{"text":"\u6C88\u5317\u65B0\u533A","value":"210113"},{"text":"\u4E8E\u6D2A\u533A","value":"210114"},{"text":"\u8FBD\u4E2D\u53BF","value":"210122"},{"text":"\u5EB7\u5E73\u53BF","value":"210123"},{"text":"\u6CD5\u5E93\u53BF","value":"210124"},{"text":"\u65B0\u6C11\u5E02","value":"210181"}],"210200":[{"text":"\u5E02\u8F96\u533A","value":"210201"},{"text":"\u4E2D\u5C71\u533A","value":"210202"},{"text":"\u897F\u5C97\u533A","value":"210203"},{"text":"\u6C99\u6CB3\u53E3\u533A","value":"210204"},{"text":"\u7518\u4E95\u5B50\u533A","value":"210211"},{"text":"\u65C5\u987A\u53E3\u533A","value":"210212"},{"text":"\u91D1\u5DDE\u533A","value":"210213"},{"text":"\u957F\u6D77\u53BF","value":"210224"},{"text":"\u74E6\u623F\u5E97\u5E02","value":"210281"},{"text":"\u666E\u5170\u5E97\u5E02","value":"210282"},{"text":"\u5E84\u6CB3\u5E02","value":"210283"}],"210300":[{"text":"\u5E02\u8F96\u533A","value":"210301"},{"text":"\u94C1\u4E1C\u533A","value":"210302"},{"text":"\u94C1\u897F\u533A","value":"210303"},{"text":"\u7ACB\u5C71\u533A","value":"210304"},{"text":"\u5343\u5C71\u533A","value":"210311"},{"text":"\u53F0\u5B89\u53BF","value":"210321"},{"text":"\u5CAB\u5CA9\u6EE1\u65CF\u81EA\u6CBB\u53BF","value":"210323"},{"text":"\u6D77\u57CE\u5E02","value":"210381"}],"210400":[{"text":"\u5E02\u8F96\u533A","value":"210401"},{"text":"\u65B0\u629A\u533A","value":"210402"},{"text":"\u4E1C\u6D32\u533A","value":"210403"},{"text":"\u671B\u82B1\u533A","value":"210404"},{"text":"\u987A\u57CE\u533A","value":"210411"},{"text":"\u629A\u987A\u53BF","value":"210421"},{"text":"\u65B0\u5BBE\u6EE1\u65CF\u81EA\u6CBB\u53BF","value":"210422"},{"text":"\u6E05\u539F\u6EE1\u65CF\u81EA\u6CBB\u53BF","value":"210423"}],"210500":[{"text":"\u5E02\u8F96\u533A","value":"210501"},{"text":"\u5E73\u5C71\u533A","value":"210502"},{"text":"\u6EAA\u6E56\u533A","value":"210503"},{"text":"\u660E\u5C71\u533A","value":"210504"},{"text":"\u5357\u82AC\u533A","value":"210505"},{"text":"\u672C\u6EAA\u6EE1\u65CF\u81EA\u6CBB\u53BF","value":"210521"},{"text":"\u6853\u4EC1\u6EE1\u65CF\u81EA\u6CBB\u53BF","value":"210522"}],"210600":[{"text":"\u5E02\u8F96\u533A","value":"210601"},{"text":"\u5143\u5B9D\u533A","value":"210602"},{"text":"\u632F\u5174\u533A","value":"210603"},{"text":"\u632F\u5B89\u533A","value":"210604"},{"text":"\u5BBD\u7538\u6EE1\u65CF\u81EA\u6CBB\u53BF","value":"210624"},{"text":"\u4E1C\u6E2F\u5E02","value":"210681"},{"text":"\u51E4\u57CE\u5E02","value":"210682"}],"210700":[{"text":"\u5E02\u8F96\u533A","value":"210701"},{"text":"\u53E4\u5854\u533A","value":"210702"},{"text":"\u51CC\u6CB3\u533A","value":"210703"},{"text":"\u592A\u548C\u533A","value":"210711"},{"text":"\u9ED1\u5C71\u53BF","value":"210726"},{"text":"\u4E49\u53BF","value":"210727"},{"text":"\u51CC\u6D77\u5E02","value":"210781"},{"text":"\u5317\u9547\u5E02","value":"210782"}],"210800":[{"text":"\u5E02\u8F96\u533A","value":"210801"},{"text":"\u7AD9\u524D\u533A","value":"210802"},{"text":"\u897F\u5E02\u533A","value":"210803"},{"text":"\u9C85\u9C7C\u5708\u533A","value":"210804"},{"text":"\u8001\u8FB9\u533A","value":"210811"},{"text":"\u76D6\u5DDE\u5E02","value":"210881"},{"text":"\u5927\u77F3\u6865\u5E02","value":"210882"}],"210900":[{"text":"\u5E02\u8F96\u533A","value":"210901"},{"text":"\u6D77\u5DDE\u533A","value":"210902"},{"text":"\u65B0\u90B1\u533A","value":"210903"},{"text":"\u592A\u5E73\u533A","value":"210904"},{"text":"\u6E05\u6CB3\u95E8\u533A","value":"210905"},{"text":"\u7EC6\u6CB3\u533A","value":"210911"},{"text":"\u961C\u65B0\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF","value":"210921"},{"text":"\u5F70\u6B66\u53BF","value":"210922"}],"211000":[{"text":"\u5E02\u8F96\u533A","value":"211001"},{"text":"\u767D\u5854\u533A","value":"211002"},{"text":"\u6587\u5723\u533A","value":"211003"},{"text":"\u5B8F\u4F1F\u533A","value":"211004"},{"text":"\u5F13\u957F\u5CAD\u533A","value":"211005"},{"text":"\u592A\u5B50\u6CB3\u533A","value":"211011"},{"text":"\u8FBD\u9633\u53BF","value":"211021"},{"text":"\u706F\u5854\u5E02","value":"211081"}],"211100":[{"text":"\u5E02\u8F96\u533A","value":"211101"},{"text":"\u53CC\u53F0\u5B50\u533A","value":"211102"},{"text":"\u5174\u9686\u53F0\u533A","value":"211103"},{"text":"\u5927\u6D3C\u53BF","value":"211121"},{"text":"\u76D8\u5C71\u53BF","value":"211122"}],"211200":[{"text":"\u5E02\u8F96\u533A","value":"211201"},{"text":"\u94F6\u5DDE\u533A","value":"211202"},{"text":"\u6E05\u6CB3\u533A","value":"211204"},{"text":"\u94C1\u5CAD\u53BF","value":"211221"},{"text":"\u897F\u4E30\u53BF","value":"211223"},{"text":"\u660C\u56FE\u53BF","value":"211224"},{"text":"\u8C03\u5175\u5C71\u5E02","value":"211281"},{"text":"\u5F00\u539F\u5E02","value":"211282"}],"211300":[{"text":"\u5E02\u8F96\u533A","value":"211301"},{"text":"\u53CC\u5854\u533A","value":"211302"},{"text":"\u9F99\u57CE\u533A","value":"211303"},{"text":"\u671D\u9633\u53BF","value":"211321"},{"text":"\u5EFA\u5E73\u53BF","value":"211322"},{"text":"\u5580\u5587\u6C81\u5DE6\u7FFC\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF","value":"211324"},{"text":"\u5317\u7968\u5E02","value":"211381"},{"text":"\u51CC\u6E90\u5E02","value":"211382"}],"211400":[{"text":"\u5E02\u8F96\u533A","value":"211401"},{"text":"\u8FDE\u5C71\u533A","value":"211402"},{"text":"\u9F99\u6E2F\u533A","value":"211403"},{"text":"\u5357\u7968\u533A","value":"211404"},{"text":"\u7EE5\u4E2D\u53BF","value":"211421"},{"text":"\u5EFA\u660C\u53BF","value":"211422"},{"text":"\u5174\u57CE\u5E02","value":"211481"}],"220100":[{"text":"\u5E02\u8F96\u533A","value":"220101"},{"text":"\u5357\u5173\u533A","value":"220102"},{"text":"\u5BBD\u57CE\u533A","value":"220103"},{"text":"\u671D\u9633\u533A","value":"220104"},{"text":"\u4E8C\u9053\u533A","value":"220105"},{"text":"\u7EFF\u56ED\u533A","value":"220106"},{"text":"\u53CC\u9633\u533A","value":"220112"},{"text":"\u519C\u5B89\u53BF","value":"220122"},{"text":"\u4E5D\u53F0\u5E02","value":"220181"},{"text":"\u6986\u6811\u5E02","value":"220182"},{"text":"\u5FB7\u60E0\u5E02","value":"220183"}],"220200":[{"text":"\u5E02\u8F96\u533A","value":"220201"},{"text":"\u660C\u9091\u533A","value":"220202"},{"text":"\u9F99\u6F6D\u533A","value":"220203"},{"text":"\u8239\u8425\u533A","value":"220204"},{"text":"\u4E30\u6EE1\u533A","value":"220211"},{"text":"\u6C38\u5409\u53BF","value":"220221"},{"text":"\u86DF\u6CB3\u5E02","value":"220281"},{"text":"\u6866\u7538\u5E02","value":"220282"},{"text":"\u8212\u5170\u5E02","value":"220283"},{"text":"\u78D0\u77F3\u5E02","value":"220284"}],"220300":[{"text":"\u5E02\u8F96\u533A","value":"220301"},{"text":"\u94C1\u897F\u533A","value":"220302"},{"text":"\u94C1\u4E1C\u533A","value":"220303"},{"text":"\u68A8\u6811\u53BF","value":"220322"},{"text":"\u4F0A\u901A\u6EE1\u65CF\u81EA\u6CBB\u53BF","value":"220323"},{"text":"\u516C\u4E3B\u5CAD\u5E02","value":"220381"},{"text":"\u53CC\u8FBD\u5E02","value":"220382"}],"220400":[{"text":"\u5E02\u8F96\u533A","value":"220401"},{"text":"\u9F99\u5C71\u533A","value":"220402"},{"text":"\u897F\u5B89\u533A","value":"220403"},{"text":"\u4E1C\u4E30\u53BF","value":"220421"},{"text":"\u4E1C\u8FBD\u53BF","value":"220422"}],"220500":[{"text":"\u5E02\u8F96\u533A","value":"220501"},{"text":"\u4E1C\u660C\u533A","value":"220502"},{"text":"\u4E8C\u9053\u6C5F\u533A","value":"220503"},{"text":"\u901A\u5316\u53BF","value":"220521"},{"text":"\u8F89\u5357\u53BF","value":"220523"},{"text":"\u67F3\u6CB3\u53BF","value":"220524"},{"text":"\u6885\u6CB3\u53E3\u5E02","value":"220581"},{"text":"\u96C6\u5B89\u5E02","value":"220582"}],"220600":[{"text":"\u5E02\u8F96\u533A","value":"220601"},{"text":"\u6D51\u6C5F\u533A","value":"220602"},{"text":"\u6C5F\u6E90\u533A","value":"220605"},{"text":"\u629A\u677E\u53BF","value":"220621"},{"text":"\u9756\u5B87\u53BF","value":"220622"},{"text":"\u957F\u767D\u671D\u9C9C\u65CF\u81EA\u6CBB\u53BF","value":"220623"},{"text":"\u4E34\u6C5F\u5E02","value":"220681"}],"220700":[{"text":"\u5E02\u8F96\u533A","value":"220701"},{"text":"\u5B81\u6C5F\u533A","value":"220702"},{"text":"\u524D\u90ED\u5C14\u7F57\u65AF\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF","value":"220721"},{"text":"\u957F\u5CAD\u53BF","value":"220722"},{"text":"\u4E7E\u5B89\u53BF","value":"220723"},{"text":"\u6276\u4F59\u5E02","value":"220781"}],"220800":[{"text":"\u5E02\u8F96\u533A","value":"220801"},{"text":"\u6D2E\u5317\u533A","value":"220802"},{"text":"\u9547\u8D49\u53BF","value":"220821"},{"text":"\u901A\u6986\u53BF","value":"220822"},{"text":"\u6D2E\u5357\u5E02","value":"220881"},{"text":"\u5927\u5B89\u5E02","value":"220882"}],"222400":[{"text":"\u5EF6\u5409\u5E02","value":"222401"},{"text":"\u56FE\u4EEC\u5E02","value":"222402"},{"text":"\u6566\u5316\u5E02","value":"222403"},{"text":"\u73F2\u6625\u5E02","value":"222404"},{"text":"\u9F99\u4E95\u5E02","value":"222405"},{"text":"\u548C\u9F99\u5E02","value":"222406"},{"text":"\u6C6A\u6E05\u53BF","value":"222424"},{"text":"\u5B89\u56FE\u53BF","value":"222426"}],"230100":[{"text":"\u5E02\u8F96\u533A","value":"230101"},{"text":"\u9053\u91CC\u533A","value":"230102"},{"text":"\u5357\u5C97\u533A","value":"230103"},{"text":"\u9053\u5916\u533A","value":"230104"},{"text":"\u5E73\u623F\u533A","value":"230108"},{"text":"\u677E\u5317\u533A","value":"230109"},{"text":"\u9999\u574A\u533A","value":"230110"},{"text":"\u547C\u5170\u533A","value":"230111"},{"text":"\u963F\u57CE\u533A","value":"230112"},{"text":"\u4F9D\u5170\u53BF","value":"230123"},{"text":"\u65B9\u6B63\u53BF","value":"230124"},{"text":"\u5BBE\u53BF","value":"230125"},{"text":"\u5DF4\u5F66\u53BF","value":"230126"},{"text":"\u6728\u5170\u53BF","value":"230127"},{"text":"\u901A\u6CB3\u53BF","value":"230128"},{"text":"\u5EF6\u5BFF\u53BF","value":"230129"},{"text":"\u53CC\u57CE\u5E02","value":"230182"},{"text":"\u5C1A\u5FD7\u5E02","value":"230183"},{"text":"\u4E94\u5E38\u5E02","value":"230184"}],"230200":[{"text":"\u5E02\u8F96\u533A","value":"230201"},{"text":"\u9F99\u6C99\u533A","value":"230202"},{"text":"\u5EFA\u534E\u533A","value":"230203"},{"text":"\u94C1\u950B\u533A","value":"230204"},{"text":"\u6602\u6602\u6EAA\u533A","value":"230205"},{"text":"\u5BCC\u62C9\u5C14\u57FA\u533A","value":"230206"},{"text":"\u78BE\u5B50\u5C71\u533A","value":"230207"},{"text":"\u6885\u91CC\u65AF\u8FBE\u65A1\u5C14\u65CF\u533A","value":"230208"},{"text":"\u9F99\u6C5F\u53BF","value":"230221"},{"text":"\u4F9D\u5B89\u53BF","value":"230223"},{"text":"\u6CF0\u6765\u53BF","value":"230224"},{"text":"\u7518\u5357\u53BF","value":"230225"},{"text":"\u5BCC\u88D5\u53BF","value":"230227"},{"text":"\u514B\u5C71\u53BF","value":"230229"},{"text":"\u514B\u4E1C\u53BF","value":"230230"},{"text":"\u62DC\u6CC9\u53BF","value":"230231"},{"text":"\u8BB7\u6CB3\u5E02","value":"230281"}],"230300":[{"text":"\u5E02\u8F96\u533A","value":"230301"},{"text":"\u9E21\u51A0\u533A","value":"230302"},{"text":"\u6052\u5C71\u533A","value":"230303"},{"text":"\u6EF4\u9053\u533A","value":"230304"},{"text":"\u68A8\u6811\u533A","value":"230305"},{"text":"\u57CE\u5B50\u6CB3\u533A","value":"230306"},{"text":"\u9EBB\u5C71\u533A","value":"230307"},{"text":"\u9E21\u4E1C\u53BF","value":"230321"},{"text":"\u864E\u6797\u5E02","value":"230381"},{"text":"\u5BC6\u5C71\u5E02","value":"230382"}],"230400":[{"text":"\u5E02\u8F96\u533A","value":"230401"},{"text":"\u5411\u9633\u533A","value":"230402"},{"text":"\u5DE5\u519C\u533A","value":"230403"},{"text":"\u5357\u5C71\u533A","value":"230404"},{"text":"\u5174\u5B89\u533A","value":"230405"},{"text":"\u4E1C\u5C71\u533A","value":"230406"},{"text":"\u5174\u5C71\u533A","value":"230407"},{"text":"\u841D\u5317\u53BF","value":"230421"},{"text":"\u7EE5\u6EE8\u53BF","value":"230422"}],"230500":[{"text":"\u5E02\u8F96\u533A","value":"230501"},{"text":"\u5C16\u5C71\u533A","value":"230502"},{"text":"\u5CAD\u4E1C\u533A","value":"230503"},{"text":"\u56DB\u65B9\u53F0\u533A","value":"230505"},{"text":"\u5B9D\u5C71\u533A","value":"230506"},{"text":"\u96C6\u8D24\u53BF","value":"230521"},{"text":"\u53CB\u8C0A\u53BF","value":"230522"},{"text":"\u5B9D\u6E05\u53BF","value":"230523"},{"text":"\u9976\u6CB3\u53BF","value":"230524"}],"230600":[{"text":"\u5E02\u8F96\u533A","value":"230601"},{"text":"\u8428\u5C14\u56FE\u533A","value":"230602"},{"text":"\u9F99\u51E4\u533A","value":"230603"},{"text":"\u8BA9\u80E1\u8DEF\u533A","value":"230604"},{"text":"\u7EA2\u5C97\u533A","value":"230605"},{"text":"\u5927\u540C\u533A","value":"230606"},{"text":"\u8087\u5DDE\u53BF","value":"230621"},{"text":"\u8087\u6E90\u53BF","value":"230622"},{"text":"\u6797\u7538\u53BF","value":"230623"},{"text":"\u675C\u5C14\u4F2F\u7279\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF","value":"230624"}],"230700":[{"text":"\u5E02\u8F96\u533A","value":"230701"},{"text":"\u4F0A\u6625\u533A","value":"230702"},{"text":"\u5357\u5C94\u533A","value":"230703"},{"text":"\u53CB\u597D\u533A","value":"230704"},{"text":"\u897F\u6797\u533A","value":"230705"},{"text":"\u7FE0\u5CE6\u533A","value":"230706"},{"text":"\u65B0\u9752\u533A","value":"230707"},{"text":"\u7F8E\u6EAA\u533A","value":"230708"},{"text":"\u91D1\u5C71\u5C6F\u533A","value":"230709"},{"text":"\u4E94\u8425\u533A","value":"230710"},{"text":"\u4E4C\u9A6C\u6CB3\u533A","value":"230711"},{"text":"\u6C64\u65FA\u6CB3\u533A","value":"230712"},{"text":"\u5E26\u5CAD\u533A","value":"230713"},{"text":"\u4E4C\u4F0A\u5CAD\u533A","value":"230714"},{"text":"\u7EA2\u661F\u533A","value":"230715"},{"text":"\u4E0A\u7518\u5CAD\u533A","value":"230716"},{"text":"\u5609\u836B\u53BF","value":"230722"},{"text":"\u94C1\u529B\u5E02","value":"230781"}],"230800":[{"text":"\u5E02\u8F96\u533A","value":"230801"},{"text":"\u5411\u9633\u533A","value":"230803"},{"text":"\u524D\u8FDB\u533A","value":"230804"},{"text":"\u4E1C\u98CE\u533A","value":"230805"},{"text":"\u90CA\u533A","value":"230811"},{"text":"\u6866\u5357\u53BF","value":"230822"},{"text":"\u6866\u5DDD\u53BF","value":"230826"},{"text":"\u6C64\u539F\u53BF","value":"230828"},{"text":"\u629A\u8FDC\u53BF","value":"230833"},{"text":"\u540C\u6C5F\u5E02","value":"230881"},{"text":"\u5BCC\u9526\u5E02","value":"230882"}],"230900":[{"text":"\u5E02\u8F96\u533A","value":"230901"},{"text":"\u65B0\u5174\u533A","value":"230902"},{"text":"\u6843\u5C71\u533A","value":"230903"},{"text":"\u8304\u5B50\u6CB3\u533A","value":"230904"},{"text":"\u52C3\u5229\u53BF","value":"230921"}],"231000":[{"text":"\u5E02\u8F96\u533A","value":"231001"},{"text":"\u4E1C\u5B89\u533A","value":"231002"},{"text":"\u9633\u660E\u533A","value":"231003"},{"text":"\u7231\u6C11\u533A","value":"231004"},{"text":"\u897F\u5B89\u533A","value":"231005"},{"text":"\u4E1C\u5B81\u53BF","value":"231024"},{"text":"\u6797\u53E3\u53BF","value":"231025"},{"text":"\u7EE5\u82AC\u6CB3\u5E02","value":"231081"},{"text":"\u6D77\u6797\u5E02","value":"231083"},{"text":"\u5B81\u5B89\u5E02","value":"231084"},{"text":"\u7A46\u68F1\u5E02","value":"231085"}],"231100":[{"text":"\u5E02\u8F96\u533A","value":"231101"},{"text":"\u7231\u8F89\u533A","value":"231102"},{"text":"\u5AE9\u6C5F\u53BF","value":"231121"},{"text":"\u900A\u514B\u53BF","value":"231123"},{"text":"\u5B59\u5434\u53BF","value":"231124"},{"text":"\u5317\u5B89\u5E02","value":"231181"},{"text":"\u4E94\u5927\u8FDE\u6C60\u5E02","value":"231182"}],"231200":[{"text":"\u5E02\u8F96\u533A","value":"231201"},{"text":"\u5317\u6797\u533A","value":"231202"},{"text":"\u671B\u594E\u53BF","value":"231221"},{"text":"\u5170\u897F\u53BF","value":"231222"},{"text":"\u9752\u5188\u53BF","value":"231223"},{"text":"\u5E86\u5B89\u53BF","value":"231224"},{"text":"\u660E\u6C34\u53BF","value":"231225"},{"text":"\u7EE5\u68F1\u53BF","value":"231226"},{"text":"\u5B89\u8FBE\u5E02","value":"231281"},{"text":"\u8087\u4E1C\u5E02","value":"231282"},{"text":"\u6D77\u4F26\u5E02","value":"231283"}],"232700":[{"text":"\u547C\u739B\u53BF","value":"232721"},{"text":"\u5854\u6CB3\u53BF","value":"232722"},{"text":"\u6F20\u6CB3\u53BF","value":"232723"}],"310100":[{"text":"\u9EC4\u6D66\u533A","value":"310101"},{"text":"\u5F90\u6C47\u533A","value":"310104"},{"text":"\u957F\u5B81\u533A","value":"310105"},{"text":"\u9759\u5B89\u533A","value":"310106"},{"text":"\u666E\u9640\u533A","value":"310107"},{"text":"\u95F8\u5317\u533A","value":"310108"},{"text":"\u8679\u53E3\u533A","value":"310109"},{"text":"\u6768\u6D66\u533A","value":"310110"},{"text":"\u95F5\u884C\u533A","value":"310112"},{"text":"\u5B9D\u5C71\u533A","value":"310113"},{"text":"\u5609\u5B9A\u533A","value":"310114"},{"text":"\u6D66\u4E1C\u65B0\u533A","value":"310115"},{"text":"\u91D1\u5C71\u533A","value":"310116"},{"text":"\u677E\u6C5F\u533A","value":"310117"},{"text":"\u9752\u6D66\u533A","value":"310118"},{"text":"\u5949\u8D24\u533A","value":"310120"}],"310200":[{"text":"\u5D07\u660E\u53BF","value":"310230"}],"320100":[{"text":"\u5E02\u8F96\u533A","value":"320101"},{"text":"\u7384\u6B66\u533A","value":"320102"},{"text":"\u79E6\u6DEE\u533A","value":"320104"},{"text":"\u5EFA\u90BA\u533A","value":"320105"},{"text":"\u9F13\u697C\u533A","value":"320106"},{"text":"\u6D66\u53E3\u533A","value":"320111"},{"text":"\u6816\u971E\u533A","value":"320113"},{"text":"\u96E8\u82B1\u53F0\u533A","value":"320114"},{"text":"\u6C5F\u5B81\u533A","value":"320115"},{"text":"\u516D\u5408\u533A","value":"320116"},{"text":"\u6EA7\u6C34\u533A","value":"320117"},{"text":"\u9AD8\u6DF3\u533A","value":"320118"}],"320200":[{"text":"\u5E02\u8F96\u533A","value":"320201"},{"text":"\u5D07\u5B89\u533A","value":"320202"},{"text":"\u5357\u957F\u533A","value":"320203"},{"text":"\u5317\u5858\u533A","value":"320204"},{"text":"\u9521\u5C71\u533A","value":"320205"},{"text":"\u60E0\u5C71\u533A","value":"320206"},{"text":"\u6EE8\u6E56\u533A","value":"320211"},{"text":"\u6C5F\u9634\u5E02","value":"320281"},{"text":"\u5B9C\u5174\u5E02","value":"320282"}],"320300":[{"text":"\u5E02\u8F96\u533A","value":"320301"},{"text":"\u9F13\u697C\u533A","value":"320302"},{"text":"\u4E91\u9F99\u533A","value":"320303"},{"text":"\u8D3E\u6C6A\u533A","value":"320305"},{"text":"\u6CC9\u5C71\u533A","value":"320311"},{"text":"\u94DC\u5C71\u533A","value":"320312"},{"text":"\u4E30\u53BF","value":"320321"},{"text":"\u6C9B\u53BF","value":"320322"},{"text":"\u7762\u5B81\u53BF","value":"320324"},{"text":"\u65B0\u6C82\u5E02","value":"320381"},{"text":"\u90B3\u5DDE\u5E02","value":"320382"}],"320400":[{"text":"\u5E02\u8F96\u533A","value":"320401"},{"text":"\u5929\u5B81\u533A","value":"320402"},{"text":"\u949F\u697C\u533A","value":"320404"},{"text":"\u621A\u5885\u5830\u533A","value":"320405"},{"text":"\u65B0\u5317\u533A","value":"320411"},{"text":"\u6B66\u8FDB\u533A","value":"320412"},{"text":"\u6EA7\u9633\u5E02","value":"320481"},{"text":"\u91D1\u575B\u5E02","value":"320482"}],"320500":[{"text":"\u5E02\u8F96\u533A","value":"320501"},{"text":"\u864E\u4E18\u533A","value":"320505"},{"text":"\u5434\u4E2D\u533A","value":"320506"},{"text":"\u76F8\u57CE\u533A","value":"320507"},{"text":"\u59D1\u82CF\u533A","value":"320508"},{"text":"\u5434\u6C5F\u533A","value":"320509"},{"text":"\u5E38\u719F\u5E02","value":"320581"},{"text":"\u5F20\u5BB6\u6E2F\u5E02","value":"320582"},{"text":"\u6606\u5C71\u5E02","value":"320583"},{"text":"\u592A\u4ED3\u5E02","value":"320585"}],"320600":[{"text":"\u5E02\u8F96\u533A","value":"320601"},{"text":"\u5D07\u5DDD\u533A","value":"320602"},{"text":"\u6E2F\u95F8\u533A","value":"320611"},{"text":"\u901A\u5DDE\u533A","value":"320612"},{"text":"\u6D77\u5B89\u53BF","value":"320621"},{"text":"\u5982\u4E1C\u53BF","value":"320623"},{"text":"\u542F\u4E1C\u5E02","value":"320681"},{"text":"\u5982\u768B\u5E02","value":"320682"},{"text":"\u6D77\u95E8\u5E02","value":"320684"}],"320700":[{"text":"\u5E02\u8F96\u533A","value":"320701"},{"text":"\u8FDE\u4E91\u533A","value":"320703"},{"text":"\u65B0\u6D66\u533A","value":"320705"},{"text":"\u6D77\u5DDE\u533A","value":"320706"},{"text":"\u8D63\u6986\u53BF","value":"320721"},{"text":"\u4E1C\u6D77\u53BF","value":"320722"},{"text":"\u704C\u4E91\u53BF","value":"320723"},{"text":"\u704C\u5357\u53BF","value":"320724"}],"320800":[{"text":"\u5E02\u8F96\u533A","value":"320801"},{"text":"\u6E05\u6CB3\u533A","value":"320802"},{"text":"\u6DEE\u5B89\u533A","value":"320803"},{"text":"\u6DEE\u9634\u533A","value":"320804"},{"text":"\u6E05\u6D66\u533A","value":"320811"},{"text":"\u6D9F\u6C34\u53BF","value":"320826"},{"text":"\u6D2A\u6CFD\u53BF","value":"320829"},{"text":"\u76F1\u7719\u53BF","value":"320830"},{"text":"\u91D1\u6E56\u53BF","value":"320831"}],"320900":[{"text":"\u5E02\u8F96\u533A","value":"320901"},{"text":"\u4EAD\u6E56\u533A","value":"320902"},{"text":"\u76D0\u90FD\u533A","value":"320903"},{"text":"\u54CD\u6C34\u53BF","value":"320921"},{"text":"\u6EE8\u6D77\u53BF","value":"320922"},{"text":"\u961C\u5B81\u53BF","value":"320923"},{"text":"\u5C04\u9633\u53BF","value":"320924"},{"text":"\u5EFA\u6E56\u53BF","value":"320925"},{"text":"\u4E1C\u53F0\u5E02","value":"320981"},{"text":"\u5927\u4E30\u5E02","value":"320982"}],"321000":[{"text":"\u5E02\u8F96\u533A","value":"321001"},{"text":"\u5E7F\u9675\u533A","value":"321002"},{"text":"\u9097\u6C5F\u533A","value":"321003"},{"text":"\u6C5F\u90FD\u533A","value":"321012"},{"text":"\u5B9D\u5E94\u53BF","value":"321023"},{"text":"\u4EEA\u5F81\u5E02","value":"321081"},{"text":"\u9AD8\u90AE\u5E02","value":"321084"}],"321100":[{"text":"\u5E02\u8F96\u533A","value":"321101"},{"text":"\u4EAC\u53E3\u533A","value":"321102"},{"text":"\u6DA6\u5DDE\u533A","value":"321111"},{"text":"\u4E39\u5F92\u533A","value":"321112"},{"text":"\u4E39\u9633\u5E02","value":"321181"},{"text":"\u626C\u4E2D\u5E02","value":"321182"},{"text":"\u53E5\u5BB9\u5E02","value":"321183"}],"321200":[{"text":"\u5E02\u8F96\u533A","value":"321201"},{"text":"\u6D77\u9675\u533A","value":"321202"},{"text":"\u9AD8\u6E2F\u533A","value":"321203"},{"text":"\u59DC\u5830\u533A","value":"321204"},{"text":"\u5174\u5316\u5E02","value":"321281"},{"text":"\u9756\u6C5F\u5E02","value":"321282"},{"text":"\u6CF0\u5174\u5E02","value":"321283"}],"321300":[{"text":"\u5E02\u8F96\u533A","value":"321301"},{"text":"\u5BBF\u57CE\u533A","value":"321302"},{"text":"\u5BBF\u8C6B\u533A","value":"321311"},{"text":"\u6CAD\u9633\u53BF","value":"321322"},{"text":"\u6CD7\u9633\u53BF","value":"321323"},{"text":"\u6CD7\u6D2A\u53BF","value":"321324"}],"330100":[{"text":"\u5E02\u8F96\u533A","value":"330101"},{"text":"\u4E0A\u57CE\u533A","value":"330102"},{"text":"\u4E0B\u57CE\u533A","value":"330103"},{"text":"\u6C5F\u5E72\u533A","value":"330104"},{"text":"\u62F1\u5885\u533A","value":"330105"},{"text":"\u897F\u6E56\u533A","value":"330106"},{"text":"\u6EE8\u6C5F\u533A","value":"330108"},{"text":"\u8427\u5C71\u533A","value":"330109"},{"text":"\u4F59\u676D\u533A","value":"330110"},{"text":"\u6850\u5E90\u53BF","value":"330122"},{"text":"\u6DF3\u5B89\u53BF","value":"330127"},{"text":"\u5EFA\u5FB7\u5E02","value":"330182"},{"text":"\u5BCC\u9633\u5E02","value":"330183"},{"text":"\u4E34\u5B89\u5E02","value":"330185"}],"330200":[{"text":"\u5E02\u8F96\u533A","value":"330201"},{"text":"\u6D77\u66D9\u533A","value":"330203"},{"text":"\u6C5F\u4E1C\u533A","value":"330204"},{"text":"\u6C5F\u5317\u533A","value":"330205"},{"text":"\u5317\u4ED1\u533A","value":"330206"},{"text":"\u9547\u6D77\u533A","value":"330211"},{"text":"\u911E\u5DDE\u533A","value":"330212"},{"text":"\u8C61\u5C71\u53BF","value":"330225"},{"text":"\u5B81\u6D77\u53BF","value":"330226"},{"text":"\u4F59\u59DA\u5E02","value":"330281"},{"text":"\u6148\u6EAA\u5E02","value":"330282"},{"text":"\u5949\u5316\u5E02","value":"330283"}],"330300":[{"text":"\u5E02\u8F96\u533A","value":"330301"},{"text":"\u9E7F\u57CE\u533A","value":"330302"},{"text":"\u9F99\u6E7E\u533A","value":"330303"},{"text":"\u74EF\u6D77\u533A","value":"330304"},{"text":"\u6D1E\u5934\u53BF","value":"330322"},{"text":"\u6C38\u5609\u53BF","value":"330324"},{"text":"\u5E73\u9633\u53BF","value":"330326"},{"text":"\u82CD\u5357\u53BF","value":"330327"},{"text":"\u6587\u6210\u53BF","value":"330328"},{"text":"\u6CF0\u987A\u53BF","value":"330329"},{"text":"\u745E\u5B89\u5E02","value":"330381"},{"text":"\u4E50\u6E05\u5E02","value":"330382"}],"330400":[{"text":"\u5E02\u8F96\u533A","value":"330401"},{"text":"\u5357\u6E56\u533A","value":"330402"},{"text":"\u79C0\u6D32\u533A","value":"330411"},{"text":"\u5609\u5584\u53BF","value":"330421"},{"text":"\u6D77\u76D0\u53BF","value":"330424"},{"text":"\u6D77\u5B81\u5E02","value":"330481"},{"text":"\u5E73\u6E56\u5E02","value":"330482"},{"text":"\u6850\u4E61\u5E02","value":"330483"}],"330500":[{"text":"\u5E02\u8F96\u533A","value":"330501"},{"text":"\u5434\u5174\u533A","value":"330502"},{"text":"\u5357\u6D54\u533A","value":"330503"},{"text":"\u5FB7\u6E05\u53BF","value":"330521"},{"text":"\u957F\u5174\u53BF","value":"330522"},{"text":"\u5B89\u5409\u53BF","value":"330523"}],"330600":[{"text":"\u5E02\u8F96\u533A","value":"330601"},{"text":"\u8D8A\u57CE\u533A","value":"330602"},{"text":"\u7ECD\u5174\u53BF","value":"330621"},{"text":"\u65B0\u660C\u53BF","value":"330624"},{"text":"\u8BF8\u66A8\u5E02","value":"330681"},{"text":"\u4E0A\u865E\u5E02","value":"330682"},{"text":"\u5D4A\u5DDE\u5E02","value":"330683"}],"330700":[{"text":"\u5E02\u8F96\u533A","value":"330701"},{"text":"\u5A7A\u57CE\u533A","value":"330702"},{"text":"\u91D1\u4E1C\u533A","value":"330703"},{"text":"\u6B66\u4E49\u53BF","value":"330723"},{"text":"\u6D66\u6C5F\u53BF","value":"330726"},{"text":"\u78D0\u5B89\u53BF","value":"330727"},{"text":"\u5170\u6EAA\u5E02","value":"330781"},{"text":"\u4E49\u4E4C\u5E02","value":"330782"},{"text":"\u4E1C\u9633\u5E02","value":"330783"},{"text":"\u6C38\u5EB7\u5E02","value":"330784"}],"330800":[{"text":"\u5E02\u8F96\u533A","value":"330801"},{"text":"\u67EF\u57CE\u533A","value":"330802"},{"text":"\u8862\u6C5F\u533A","value":"330803"},{"text":"\u5E38\u5C71\u53BF","value":"330822"},{"text":"\u5F00\u5316\u53BF","value":"330824"},{"text":"\u9F99\u6E38\u53BF","value":"330825"},{"text":"\u6C5F\u5C71\u5E02","value":"330881"}],"330900":[{"text":"\u5E02\u8F96\u533A","value":"330901"},{"text":"\u5B9A\u6D77\u533A","value":"330902"},{"text":"\u666E\u9640\u533A","value":"330903"},{"text":"\u5CB1\u5C71\u53BF","value":"330921"},{"text":"\u5D4A\u6CD7\u53BF","value":"330922"}],"331000":[{"text":"\u5E02\u8F96\u533A","value":"331001"},{"text":"\u6912\u6C5F\u533A","value":"331002"},{"text":"\u9EC4\u5CA9\u533A","value":"331003"},{"text":"\u8DEF\u6865\u533A","value":"331004"},{"text":"\u7389\u73AF\u53BF","value":"331021"},{"text":"\u4E09\u95E8\u53BF","value":"331022"},{"text":"\u5929\u53F0\u53BF","value":"331023"},{"text":"\u4ED9\u5C45\u53BF","value":"331024"},{"text":"\u6E29\u5CAD\u5E02","value":"331081"},{"text":"\u4E34\u6D77\u5E02","value":"331082"}],"331100":[{"text":"\u5E02\u8F96\u533A","value":"331101"},{"text":"\u83B2\u90FD\u533A","value":"331102"},{"text":"\u9752\u7530\u53BF","value":"331121"},{"text":"\u7F19\u4E91\u53BF","value":"331122"},{"text":"\u9042\u660C\u53BF","value":"331123"},{"text":"\u677E\u9633\u53BF","value":"331124"},{"text":"\u4E91\u548C\u53BF","value":"331125"},{"text":"\u5E86\u5143\u53BF","value":"331126"},{"text":"\u666F\u5B81\u7572\u65CF\u81EA\u6CBB\u53BF","value":"331127"},{"text":"\u9F99\u6CC9\u5E02","value":"331181"}],"340100":[{"text":"\u5E02\u8F96\u533A","value":"340101"},{"text":"\u7476\u6D77\u533A","value":"340102"},{"text":"\u5E90\u9633\u533A","value":"340103"},{"text":"\u8700\u5C71\u533A","value":"340104"},{"text":"\u5305\u6CB3\u533A","value":"340111"},{"text":"\u957F\u4E30\u53BF","value":"340121"},{"text":"\u80A5\u4E1C\u53BF","value":"340122"},{"text":"\u80A5\u897F\u53BF","value":"340123"},{"text":"\u5E90\u6C5F\u53BF","value":"340124"},{"text":"\u5DE2\u6E56\u5E02","value":"340181"}],"340200":[{"text":"\u5E02\u8F96\u533A","value":"340201"},{"text":"\u955C\u6E56\u533A","value":"340202"},{"text":"\u5F0B\u6C5F\u533A","value":"340203"},{"text":"\u9E20\u6C5F\u533A","value":"340207"},{"text":"\u4E09\u5C71\u533A","value":"340208"},{"text":"\u829C\u6E56\u53BF","value":"340221"},{"text":"\u7E41\u660C\u53BF","value":"340222"},{"text":"\u5357\u9675\u53BF","value":"340223"},{"text":"\u65E0\u4E3A\u53BF","value":"340225"}],"340300":[{"text":"\u5E02\u8F96\u533A","value":"340301"},{"text":"\u9F99\u5B50\u6E56\u533A","value":"340302"},{"text":"\u868C\u5C71\u533A","value":"340303"},{"text":"\u79B9\u4F1A\u533A","value":"340304"},{"text":"\u6DEE\u4E0A\u533A","value":"340311"},{"text":"\u6000\u8FDC\u53BF","value":"340321"},{"text":"\u4E94\u6CB3\u53BF","value":"340322"},{"text":"\u56FA\u9547\u53BF","value":"340323"}],"340400":[{"text":"\u5E02\u8F96\u533A","value":"340401"},{"text":"\u5927\u901A\u533A","value":"340402"},{"text":"\u7530\u5BB6\u5EB5\u533A","value":"340403"},{"text":"\u8C22\u5BB6\u96C6\u533A","value":"340404"},{"text":"\u516B\u516C\u5C71\u533A","value":"340405"},{"text":"\u6F58\u96C6\u533A","value":"340406"},{"text":"\u51E4\u53F0\u53BF","value":"340421"}],"340500":[{"text":"\u5E02\u8F96\u533A","value":"340501"},{"text":"\u82B1\u5C71\u533A","value":"340503"},{"text":"\u96E8\u5C71\u533A","value":"340504"},{"text":"\u535A\u671B\u533A","value":"340506"},{"text":"\u5F53\u6D82\u53BF","value":"340521"},{"text":"\u542B\u5C71\u53BF","value":"340522"},{"text":"\u548C\u53BF","value":"340523"}],"340600":[{"text":"\u5E02\u8F96\u533A","value":"340601"},{"text":"\u675C\u96C6\u533A","value":"340602"},{"text":"\u76F8\u5C71\u533A","value":"340603"},{"text":"\u70C8\u5C71\u533A","value":"340604"},{"text":"\u6FC9\u6EAA\u53BF","value":"340621"}],"340700":[{"text":"\u5E02\u8F96\u533A","value":"340701"},{"text":"\u94DC\u5B98\u5C71\u533A","value":"340702"},{"text":"\u72EE\u5B50\u5C71\u533A","value":"340703"},{"text":"\u90CA\u533A","value":"340711"},{"text":"\u94DC\u9675\u53BF","value":"340721"}],"340800":[{"text":"\u5E02\u8F96\u533A","value":"340801"},{"text":"\u8FCE\u6C5F\u533A","value":"340802"},{"text":"\u5927\u89C2\u533A","value":"340803"},{"text":"\u5B9C\u79C0\u533A","value":"340811"},{"text":"\u6000\u5B81\u53BF","value":"340822"},{"text":"\u679E\u9633\u53BF","value":"340823"},{"text":"\u6F5C\u5C71\u53BF","value":"340824"},{"text":"\u592A\u6E56\u53BF","value":"340825"},{"text":"\u5BBF\u677E\u53BF","value":"340826"},{"text":"\u671B\u6C5F\u53BF","value":"340827"},{"text":"\u5CB3\u897F\u53BF","value":"340828"},{"text":"\u6850\u57CE\u5E02","value":"340881"}],"341000":[{"text":"\u5E02\u8F96\u533A","value":"341001"},{"text":"\u5C6F\u6EAA\u533A","value":"341002"},{"text":"\u9EC4\u5C71\u533A","value":"341003"},{"text":"\u5FBD\u5DDE\u533A","value":"341004"},{"text":"\u6B59\u53BF","value":"341021"},{"text":"\u4F11\u5B81\u53BF","value":"341022"},{"text":"\u9EDF\u53BF","value":"341023"},{"text":"\u7941\u95E8\u53BF","value":"341024"}],"341100":[{"text":"\u5E02\u8F96\u533A","value":"341101"},{"text":"\u7405\u740A\u533A","value":"341102"},{"text":"\u5357\u8C2F\u533A","value":"341103"},{"text":"\u6765\u5B89\u53BF","value":"341122"},{"text":"\u5168\u6912\u53BF","value":"341124"},{"text":"\u5B9A\u8FDC\u53BF","value":"341125"},{"text":"\u51E4\u9633\u53BF","value":"341126"},{"text":"\u5929\u957F\u5E02","value":"341181"},{"text":"\u660E\u5149\u5E02","value":"341182"}],"341200":[{"text":"\u5E02\u8F96\u533A","value":"341201"},{"text":"\u988D\u5DDE\u533A","value":"341202"},{"text":"\u988D\u4E1C\u533A","value":"341203"},{"text":"\u988D\u6CC9\u533A","value":"341204"},{"text":"\u4E34\u6CC9\u53BF","value":"341221"},{"text":"\u592A\u548C\u53BF","value":"341222"},{"text":"\u961C\u5357\u53BF","value":"341225"},{"text":"\u988D\u4E0A\u53BF","value":"341226"},{"text":"\u754C\u9996\u5E02","value":"341282"}],"341300":[{"text":"\u5E02\u8F96\u533A","value":"341301"},{"text":"\u57C7\u6865\u533A","value":"341302"},{"text":"\u7800\u5C71\u53BF","value":"341321"},{"text":"\u8427\u53BF","value":"341322"},{"text":"\u7075\u74A7\u53BF","value":"341323"},{"text":"\u6CD7\u53BF","value":"341324"}],"341500":[{"text":"\u5E02\u8F96\u533A","value":"341501"},{"text":"\u91D1\u5B89\u533A","value":"341502"},{"text":"\u88D5\u5B89\u533A","value":"341503"},{"text":"\u5BFF\u53BF","value":"341521"},{"text":"\u970D\u90B1\u53BF","value":"341522"},{"text":"\u8212\u57CE\u53BF","value":"341523"},{"text":"\u91D1\u5BE8\u53BF","value":"341524"},{"text":"\u970D\u5C71\u53BF","value":"341525"}],"341600":[{"text":"\u5E02\u8F96\u533A","value":"341601"},{"text":"\u8C2F\u57CE\u533A","value":"341602"},{"text":"\u6DA1\u9633\u53BF","value":"341621"},{"text":"\u8499\u57CE\u53BF","value":"341622"},{"text":"\u5229\u8F9B\u53BF","value":"341623"}],"341700":[{"text":"\u5E02\u8F96\u533A","value":"341701"},{"text":"\u8D35\u6C60\u533A","value":"341702"},{"text":"\u4E1C\u81F3\u53BF","value":"341721"},{"text":"\u77F3\u53F0\u53BF","value":"341722"},{"text":"\u9752\u9633\u53BF","value":"341723"}],"341800":[{"text":"\u5E02\u8F96\u533A","value":"341801"},{"text":"\u5BA3\u5DDE\u533A","value":"341802"},{"text":"\u90CE\u6EAA\u53BF","value":"341821"},{"text":"\u5E7F\u5FB7\u53BF","value":"341822"},{"text":"\u6CFE\u53BF","value":"341823"},{"text":"\u7EE9\u6EAA\u53BF","value":"341824"},{"text":"\u65CC\u5FB7\u53BF","value":"341825"},{"text":"\u5B81\u56FD\u5E02","value":"341881"}],"350100":[{"text":"\u5E02\u8F96\u533A","value":"350101"},{"text":"\u9F13\u697C\u533A","value":"350102"},{"text":"\u53F0\u6C5F\u533A","value":"350103"},{"text":"\u4ED3\u5C71\u533A","value":"350104"},{"text":"\u9A6C\u5C3E\u533A","value":"350105"},{"text":"\u664B\u5B89\u533A","value":"350111"},{"text":"\u95FD\u4FAF\u53BF","value":"350121"},{"text":"\u8FDE\u6C5F\u53BF","value":"350122"},{"text":"\u7F57\u6E90\u53BF","value":"350123"},{"text":"\u95FD\u6E05\u53BF","value":"350124"},{"text":"\u6C38\u6CF0\u53BF","value":"350125"},{"text":"\u5E73\u6F6D\u53BF","value":"350128"},{"text":"\u798F\u6E05\u5E02","value":"350181"},{"text":"\u957F\u4E50\u5E02","value":"350182"}],"350200":[{"text":"\u5E02\u8F96\u533A","value":"350201"},{"text":"\u601D\u660E\u533A","value":"350203"},{"text":"\u6D77\u6CA7\u533A","value":"350205"},{"text":"\u6E56\u91CC\u533A","value":"350206"},{"text":"\u96C6\u7F8E\u533A","value":"350211"},{"text":"\u540C\u5B89\u533A","value":"350212"},{"text":"\u7FD4\u5B89\u533A","value":"350213"}],"350300":[{"text":"\u5E02\u8F96\u533A","value":"350301"},{"text":"\u57CE\u53A2\u533A","value":"350302"},{"text":"\u6DB5\u6C5F\u533A","value":"350303"},{"text":"\u8354\u57CE\u533A","value":"350304"},{"text":"\u79C0\u5C7F\u533A","value":"350305"},{"text":"\u4ED9\u6E38\u53BF","value":"350322"}],"350400":[{"text":"\u5E02\u8F96\u533A","value":"350401"},{"text":"\u6885\u5217\u533A","value":"350402"},{"text":"\u4E09\u5143\u533A","value":"350403"},{"text":"\u660E\u6EAA\u53BF","value":"350421"},{"text":"\u6E05\u6D41\u53BF","value":"350423"},{"text":"\u5B81\u5316\u53BF","value":"350424"},{"text":"\u5927\u7530\u53BF","value":"350425"},{"text":"\u5C24\u6EAA\u53BF","value":"350426"},{"text":"\u6C99\u53BF","value":"350427"},{"text":"\u5C06\u4E50\u53BF","value":"350428"},{"text":"\u6CF0\u5B81\u53BF","value":"350429"},{"text":"\u5EFA\u5B81\u53BF","value":"350430"},{"text":"\u6C38\u5B89\u5E02","value":"350481"}],"350500":[{"text":"\u5E02\u8F96\u533A","value":"350501"},{"text":"\u9CA4\u57CE\u533A","value":"350502"},{"text":"\u4E30\u6CFD\u533A","value":"350503"},{"text":"\u6D1B\u6C5F\u533A","value":"350504"},{"text":"\u6CC9\u6E2F\u533A","value":"350505"},{"text":"\u60E0\u5B89\u53BF","value":"350521"},{"text":"\u5B89\u6EAA\u53BF","value":"350524"},{"text":"\u6C38\u6625\u53BF","value":"350525"},{"text":"\u5FB7\u5316\u53BF","value":"350526"},{"text":"\u91D1\u95E8\u53BF","value":"350527"},{"text":"\u77F3\u72EE\u5E02","value":"350581"},{"text":"\u664B\u6C5F\u5E02","value":"350582"},{"text":"\u5357\u5B89\u5E02","value":"350583"}],"350600":[{"text":"\u5E02\u8F96\u533A","value":"350601"},{"text":"\u8297\u57CE\u533A","value":"350602"},{"text":"\u9F99\u6587\u533A","value":"350603"},{"text":"\u4E91\u9704\u53BF","value":"350622"},{"text":"\u6F33\u6D66\u53BF","value":"350623"},{"text":"\u8BCF\u5B89\u53BF","value":"350624"},{"text":"\u957F\u6CF0\u53BF","value":"350625"},{"text":"\u4E1C\u5C71\u53BF","value":"350626"},{"text":"\u5357\u9756\u53BF","value":"350627"},{"text":"\u5E73\u548C\u53BF","value":"350628"},{"text":"\u534E\u5B89\u53BF","value":"350629"},{"text":"\u9F99\u6D77\u5E02","value":"350681"}],"350700":[{"text":"\u5E02\u8F96\u533A","value":"350701"},{"text":"\u5EF6\u5E73\u533A","value":"350702"},{"text":"\u987A\u660C\u53BF","value":"350721"},{"text":"\u6D66\u57CE\u53BF","value":"350722"},{"text":"\u5149\u6CFD\u53BF","value":"350723"},{"text":"\u677E\u6EAA\u53BF","value":"350724"},{"text":"\u653F\u548C\u53BF","value":"350725"},{"text":"\u90B5\u6B66\u5E02","value":"350781"},{"text":"\u6B66\u5937\u5C71\u5E02","value":"350782"},{"text":"\u5EFA\u74EF\u5E02","value":"350783"},{"text":"\u5EFA\u9633\u5E02","value":"350784"}],"350800":[{"text":"\u5E02\u8F96\u533A","value":"350801"},{"text":"\u65B0\u7F57\u533A","value":"350802"},{"text":"\u957F\u6C40\u53BF","value":"350821"},{"text":"\u6C38\u5B9A\u53BF","value":"350822"},{"text":"\u4E0A\u676D\u53BF","value":"350823"},{"text":"\u6B66\u5E73\u53BF","value":"350824"},{"text":"\u8FDE\u57CE\u53BF","value":"350825"},{"text":"\u6F33\u5E73\u5E02","value":"350881"}],"350900":[{"text":"\u5E02\u8F96\u533A","value":"350901"},{"text":"\u8549\u57CE\u533A","value":"350902"},{"text":"\u971E\u6D66\u53BF","value":"350921"},{"text":"\u53E4\u7530\u53BF","value":"350922"},{"text":"\u5C4F\u5357\u53BF","value":"350923"},{"text":"\u5BFF\u5B81\u53BF","value":"350924"},{"text":"\u5468\u5B81\u53BF","value":"350925"},{"text":"\u67D8\u8363\u53BF","value":"350926"},{"text":"\u798F\u5B89\u5E02","value":"350981"},{"text":"\u798F\u9F0E\u5E02","value":"350982"}],"360100":[{"text":"\u5E02\u8F96\u533A","value":"360101"},{"text":"\u4E1C\u6E56\u533A","value":"360102"},{"text":"\u897F\u6E56\u533A","value":"360103"},{"text":"\u9752\u4E91\u8C31\u533A","value":"360104"},{"text":"\u6E7E\u91CC\u533A","value":"360105"},{"text":"\u9752\u5C71\u6E56\u533A","value":"360111"},{"text":"\u5357\u660C\u53BF","value":"360121"},{"text":"\u65B0\u5EFA\u53BF","value":"360122"},{"text":"\u5B89\u4E49\u53BF","value":"360123"},{"text":"\u8FDB\u8D24\u53BF","value":"360124"}],"360200":[{"text":"\u5E02\u8F96\u533A","value":"360201"},{"text":"\u660C\u6C5F\u533A","value":"360202"},{"text":"\u73E0\u5C71\u533A","value":"360203"},{"text":"\u6D6E\u6881\u53BF","value":"360222"},{"text":"\u4E50\u5E73\u5E02","value":"360281"}],"360300":[{"text":"\u5E02\u8F96\u533A","value":"360301"},{"text":"\u5B89\u6E90\u533A","value":"360302"},{"text":"\u6E58\u4E1C\u533A","value":"360313"},{"text":"\u83B2\u82B1\u53BF","value":"360321"},{"text":"\u4E0A\u6817\u53BF","value":"360322"},{"text":"\u82A6\u6EAA\u53BF","value":"360323"}],"360400":[{"text":"\u5E02\u8F96\u533A","value":"360401"},{"text":"\u5E90\u5C71\u533A","value":"360402"},{"text":"\u6D54\u9633\u533A","value":"360403"},{"text":"\u4E5D\u6C5F\u53BF","value":"360421"},{"text":"\u6B66\u5B81\u53BF","value":"360423"},{"text":"\u4FEE\u6C34\u53BF","value":"360424"},{"text":"\u6C38\u4FEE\u53BF","value":"360425"},{"text":"\u5FB7\u5B89\u53BF","value":"360426"},{"text":"\u661F\u5B50\u53BF","value":"360427"},{"text":"\u90FD\u660C\u53BF","value":"360428"},{"text":"\u6E56\u53E3\u53BF","value":"360429"},{"text":"\u5F6D\u6CFD\u53BF","value":"360430"},{"text":"\u745E\u660C\u5E02","value":"360481"},{"text":"\u5171\u9752\u57CE\u5E02","value":"360482"}],"360500":[{"text":"\u5E02\u8F96\u533A","value":"360501"},{"text":"\u6E1D\u6C34\u533A","value":"360502"},{"text":"\u5206\u5B9C\u53BF","value":"360521"}],"360600":[{"text":"\u5E02\u8F96\u533A","value":"360601"},{"text":"\u6708\u6E56\u533A","value":"360602"},{"text":"\u4F59\u6C5F\u53BF","value":"360622"},{"text":"\u8D35\u6EAA\u5E02","value":"360681"}],"360700":[{"text":"\u5E02\u8F96\u533A","value":"360701"},{"text":"\u7AE0\u8D21\u533A","value":"360702"},{"text":"\u8D63\u53BF","value":"360721"},{"text":"\u4FE1\u4E30\u53BF","value":"360722"},{"text":"\u5927\u4F59\u53BF","value":"360723"},{"text":"\u4E0A\u72B9\u53BF","value":"360724"},{"text":"\u5D07\u4E49\u53BF","value":"360725"},{"text":"\u5B89\u8FDC\u53BF","value":"360726"},{"text":"\u9F99\u5357\u53BF","value":"360727"},{"text":"\u5B9A\u5357\u53BF","value":"360728"},{"text":"\u5168\u5357\u53BF","value":"360729"},{"text":"\u5B81\u90FD\u53BF","value":"360730"},{"text":"\u4E8E\u90FD\u53BF","value":"360731"},{"text":"\u5174\u56FD\u53BF","value":"360732"},{"text":"\u4F1A\u660C\u53BF","value":"360733"},{"text":"\u5BFB\u4E4C\u53BF","value":"360734"},{"text":"\u77F3\u57CE\u53BF","value":"360735"},{"text":"\u745E\u91D1\u5E02","value":"360781"},{"text":"\u5357\u5EB7\u5E02","value":"360782"}],"360800":[{"text":"\u5E02\u8F96\u533A","value":"360801"},{"text":"\u5409\u5DDE\u533A","value":"360802"},{"text":"\u9752\u539F\u533A","value":"360803"},{"text":"\u5409\u5B89\u53BF","value":"360821"},{"text":"\u5409\u6C34\u53BF","value":"360822"},{"text":"\u5CE1\u6C5F\u53BF","value":"360823"},{"text":"\u65B0\u5E72\u53BF","value":"360824"},{"text":"\u6C38\u4E30\u53BF","value":"360825"},{"text":"\u6CF0\u548C\u53BF","value":"360826"},{"text":"\u9042\u5DDD\u53BF","value":"360827"},{"text":"\u4E07\u5B89\u53BF","value":"360828"},{"text":"\u5B89\u798F\u53BF","value":"360829"},{"text":"\u6C38\u65B0\u53BF","value":"360830"},{"text":"\u4E95\u5188\u5C71\u5E02","value":"360881"}],"360900":[{"text":"\u5E02\u8F96\u533A","value":"360901"},{"text":"\u8881\u5DDE\u533A","value":"360902"},{"text":"\u5949\u65B0\u53BF","value":"360921"},{"text":"\u4E07\u8F7D\u53BF","value":"360922"},{"text":"\u4E0A\u9AD8\u53BF","value":"360923"},{"text":"\u5B9C\u4E30\u53BF","value":"360924"},{"text":"\u9756\u5B89\u53BF","value":"360925"},{"text":"\u94DC\u9F13\u53BF","value":"360926"},{"text":"\u4E30\u57CE\u5E02","value":"360981"},{"text":"\u6A1F\u6811\u5E02","value":"360982"},{"text":"\u9AD8\u5B89\u5E02","value":"360983"}],"361000":[{"text":"\u5E02\u8F96\u533A","value":"361001"},{"text":"\u4E34\u5DDD\u533A","value":"361002"},{"text":"\u5357\u57CE\u53BF","value":"361021"},{"text":"\u9ECE\u5DDD\u53BF","value":"361022"},{"text":"\u5357\u4E30\u53BF","value":"361023"},{"text":"\u5D07\u4EC1\u53BF","value":"361024"},{"text":"\u4E50\u5B89\u53BF","value":"361025"},{"text":"\u5B9C\u9EC4\u53BF","value":"361026"},{"text":"\u91D1\u6EAA\u53BF","value":"361027"},{"text":"\u8D44\u6EAA\u53BF","value":"361028"},{"text":"\u4E1C\u4E61\u53BF","value":"361029"},{"text":"\u5E7F\u660C\u53BF","value":"361030"}],"361100":[{"text":"\u5E02\u8F96\u533A","value":"361101"},{"text":"\u4FE1\u5DDE\u533A","value":"361102"},{"text":"\u4E0A\u9976\u53BF","value":"361121"},{"text":"\u5E7F\u4E30\u53BF","value":"361122"},{"text":"\u7389\u5C71\u53BF","value":"361123"},{"text":"\u94C5\u5C71\u53BF","value":"361124"},{"text":"\u6A2A\u5CF0\u53BF","value":"361125"},{"text":"\u5F0B\u9633\u53BF","value":"361126"},{"text":"\u4F59\u5E72\u53BF","value":"361127"},{"text":"\u9131\u9633\u53BF","value":"361128"},{"text":"\u4E07\u5E74\u53BF","value":"361129"},{"text":"\u5A7A\u6E90\u53BF","value":"361130"},{"text":"\u5FB7\u5174\u5E02","value":"361181"}],"370100":[{"text":"\u5E02\u8F96\u533A","value":"370101"},{"text":"\u5386\u4E0B\u533A","value":"370102"},{"text":"\u5E02\u4E2D\u533A","value":"370103"},{"text":"\u69D0\u836B\u533A","value":"370104"},{"text":"\u5929\u6865\u533A","value":"370105"},{"text":"\u5386\u57CE\u533A","value":"370112"},{"text":"\u957F\u6E05\u533A","value":"370113"},{"text":"\u5E73\u9634\u53BF","value":"370124"},{"text":"\u6D4E\u9633\u53BF","value":"370125"},{"text":"\u5546\u6CB3\u53BF","value":"370126"},{"text":"\u7AE0\u4E18\u5E02","value":"370181"}],"370200":[{"text":"\u5E02\u8F96\u533A","value":"370201"},{"text":"\u5E02\u5357\u533A","value":"370202"},{"text":"\u5E02\u5317\u533A","value":"370203"},{"text":"\u9EC4\u5C9B\u533A","value":"370211"},{"text":"\u5D02\u5C71\u533A","value":"370212"},{"text":"\u674E\u6CA7\u533A","value":"370213"},{"text":"\u57CE\u9633\u533A","value":"370214"},{"text":"\u80F6\u5DDE\u5E02","value":"370281"},{"text":"\u5373\u58A8\u5E02","value":"370282"},{"text":"\u5E73\u5EA6\u5E02","value":"370283"},{"text":"\u83B1\u897F\u5E02","value":"370285"}],"370300":[{"text":"\u5E02\u8F96\u533A","value":"370301"},{"text":"\u6DC4\u5DDD\u533A","value":"370302"},{"text":"\u5F20\u5E97\u533A","value":"370303"},{"text":"\u535A\u5C71\u533A","value":"370304"},{"text":"\u4E34\u6DC4\u533A","value":"370305"},{"text":"\u5468\u6751\u533A","value":"370306"},{"text":"\u6853\u53F0\u53BF","value":"370321"},{"text":"\u9AD8\u9752\u53BF","value":"370322"},{"text":"\u6C82\u6E90\u53BF","value":"370323"}],"370400":[{"text":"\u5E02\u8F96\u533A","value":"370401"},{"text":"\u5E02\u4E2D\u533A","value":"370402"},{"text":"\u859B\u57CE\u533A","value":"370403"},{"text":"\u5CC4\u57CE\u533A","value":"370404"},{"text":"\u53F0\u513F\u5E84\u533A","value":"370405"},{"text":"\u5C71\u4EAD\u533A","value":"370406"},{"text":"\u6ED5\u5DDE\u5E02","value":"370481"}],"370500":[{"text":"\u5E02\u8F96\u533A","value":"370501"},{"text":"\u4E1C\u8425\u533A","value":"370502"},{"text":"\u6CB3\u53E3\u533A","value":"370503"},{"text":"\u57A6\u5229\u53BF","value":"370521"},{"text":"\u5229\u6D25\u53BF","value":"370522"},{"text":"\u5E7F\u9976\u53BF","value":"370523"}],"370600":[{"text":"\u5E02\u8F96\u533A","value":"370601"},{"text":"\u829D\u7F58\u533A","value":"370602"},{"text":"\u798F\u5C71\u533A","value":"370611"},{"text":"\u725F\u5E73\u533A","value":"370612"},{"text":"\u83B1\u5C71\u533A","value":"370613"},{"text":"\u957F\u5C9B\u53BF","value":"370634"},{"text":"\u9F99\u53E3\u5E02","value":"370681"},{"text":"\u83B1\u9633\u5E02","value":"370682"},{"text":"\u83B1\u5DDE\u5E02","value":"370683"},{"text":"\u84EC\u83B1\u5E02","value":"370684"},{"text":"\u62DB\u8FDC\u5E02","value":"370685"},{"text":"\u6816\u971E\u5E02","value":"370686"},{"text":"\u6D77\u9633\u5E02","value":"370687"}],"370700":[{"text":"\u5E02\u8F96\u533A","value":"370701"},{"text":"\u6F4D\u57CE\u533A","value":"370702"},{"text":"\u5BD2\u4EAD\u533A","value":"370703"},{"text":"\u574A\u5B50\u533A","value":"370704"},{"text":"\u594E\u6587\u533A","value":"370705"},{"text":"\u4E34\u6710\u53BF","value":"370724"},{"text":"\u660C\u4E50\u53BF","value":"370725"},{"text":"\u9752\u5DDE\u5E02","value":"370781"},{"text":"\u8BF8\u57CE\u5E02","value":"370782"},{"text":"\u5BFF\u5149\u5E02","value":"370783"},{"text":"\u5B89\u4E18\u5E02","value":"370784"},{"text":"\u9AD8\u5BC6\u5E02","value":"370785"},{"text":"\u660C\u9091\u5E02","value":"370786"}],"370800":[{"text":"\u5E02\u8F96\u533A","value":"370801"},{"text":"\u5E02\u4E2D\u533A","value":"370802"},{"text":"\u4EFB\u57CE\u533A","value":"370811"},{"text":"\u5FAE\u5C71\u53BF","value":"370826"},{"text":"\u9C7C\u53F0\u53BF","value":"370827"},{"text":"\u91D1\u4E61\u53BF","value":"370828"},{"text":"\u5609\u7965\u53BF","value":"370829"},{"text":"\u6C76\u4E0A\u53BF","value":"370830"},{"text":"\u6CD7\u6C34\u53BF","value":"370831"},{"text":"\u6881\u5C71\u53BF","value":"370832"},{"text":"\u66F2\u961C\u5E02","value":"370881"},{"text":"\u5156\u5DDE\u5E02","value":"370882"},{"text":"\u90B9\u57CE\u5E02","value":"370883"}],"370900":[{"text":"\u5E02\u8F96\u533A","value":"370901"},{"text":"\u6CF0\u5C71\u533A","value":"370902"},{"text":"\u5CB1\u5CB3\u533A","value":"370911"},{"text":"\u5B81\u9633\u53BF","value":"370921"},{"text":"\u4E1C\u5E73\u53BF","value":"370923"},{"text":"\u65B0\u6CF0\u5E02","value":"370982"},{"text":"\u80A5\u57CE\u5E02","value":"370983"}],"371000":[{"text":"\u5E02\u8F96\u533A","value":"371001"},{"text":"\u73AF\u7FE0\u533A","value":"371002"},{"text":"\u6587\u767B\u5E02","value":"371081"},{"text":"\u8363\u6210\u5E02","value":"371082"},{"text":"\u4E73\u5C71\u5E02","value":"371083"}],"371100":[{"text":"\u5E02\u8F96\u533A","value":"371101"},{"text":"\u4E1C\u6E2F\u533A","value":"371102"},{"text":"\u5C9A\u5C71\u533A","value":"371103"},{"text":"\u4E94\u83B2\u53BF","value":"371121"},{"text":"\u8392\u53BF","value":"371122"}],"371200":[{"text":"\u5E02\u8F96\u533A","value":"371201"},{"text":"\u83B1\u57CE\u533A","value":"371202"},{"text":"\u94A2\u57CE\u533A","value":"371203"}],"371300":[{"text":"\u5E02\u8F96\u533A","value":"371301"},{"text":"\u5170\u5C71\u533A","value":"371302"},{"text":"\u7F57\u5E84\u533A","value":"371311"},{"text":"\u6CB3\u4E1C\u533A","value":"371312"},{"text":"\u6C82\u5357\u53BF","value":"371321"},{"text":"\u90EF\u57CE\u53BF","value":"371322"},{"text":"\u6C82\u6C34\u53BF","value":"371323"},{"text":"\u82CD\u5C71\u53BF","value":"371324"},{"text":"\u8D39\u53BF","value":"371325"},{"text":"\u5E73\u9091\u53BF","value":"371326"},{"text":"\u8392\u5357\u53BF","value":"371327"},{"text":"\u8499\u9634\u53BF","value":"371328"},{"text":"\u4E34\u6CAD\u53BF","value":"371329"}],"371400":[{"text":"\u5E02\u8F96\u533A","value":"371401"},{"text":"\u5FB7\u57CE\u533A","value":"371402"},{"text":"\u9675\u53BF","value":"371421"},{"text":"\u5B81\u6D25\u53BF","value":"371422"},{"text":"\u5E86\u4E91\u53BF","value":"371423"},{"text":"\u4E34\u9091\u53BF","value":"371424"},{"text":"\u9F50\u6CB3\u53BF","value":"371425"},{"text":"\u5E73\u539F\u53BF","value":"371426"},{"text":"\u590F\u6D25\u53BF","value":"371427"},{"text":"\u6B66\u57CE\u53BF","value":"371428"},{"text":"\u4E50\u9675\u5E02","value":"371481"},{"text":"\u79B9\u57CE\u5E02","value":"371482"}],"371500":[{"text":"\u5E02\u8F96\u533A","value":"371501"},{"text":"\u4E1C\u660C\u5E9C\u533A","value":"371502"},{"text":"\u9633\u8C37\u53BF","value":"371521"},{"text":"\u8398\u53BF","value":"371522"},{"text":"\u830C\u5E73\u53BF","value":"371523"},{"text":"\u4E1C\u963F\u53BF","value":"371524"},{"text":"\u51A0\u53BF","value":"371525"},{"text":"\u9AD8\u5510\u53BF","value":"371526"},{"text":"\u4E34\u6E05\u5E02","value":"371581"}],"371600":[{"text":"\u5E02\u8F96\u533A","value":"371601"},{"text":"\u6EE8\u57CE\u533A","value":"371602"},{"text":"\u60E0\u6C11\u53BF","value":"371621"},{"text":"\u9633\u4FE1\u53BF","value":"371622"},{"text":"\u65E0\u68E3\u53BF","value":"371623"},{"text":"\u6CBE\u5316\u53BF","value":"371624"},{"text":"\u535A\u5174\u53BF","value":"371625"},{"text":"\u90B9\u5E73\u53BF","value":"371626"}],"371700":[{"text":"\u5E02\u8F96\u533A","value":"371701"},{"text":"\u7261\u4E39\u533A","value":"371702"},{"text":"\u66F9\u53BF","value":"371721"},{"text":"\u5355\u53BF","value":"371722"},{"text":"\u6210\u6B66\u53BF","value":"371723"},{"text":"\u5DE8\u91CE\u53BF","value":"371724"},{"text":"\u90D3\u57CE\u53BF","value":"371725"},{"text":"\u9104\u57CE\u53BF","value":"371726"},{"text":"\u5B9A\u9676\u53BF","value":"371727"},{"text":"\u4E1C\u660E\u53BF","value":"371728"}],"410100":[{"text":"\u5E02\u8F96\u533A","value":"410101"},{"text":"\u4E2D\u539F\u533A","value":"410102"},{"text":"\u4E8C\u4E03\u533A","value":"410103"},{"text":"\u7BA1\u57CE\u56DE\u65CF\u533A","value":"410104"},{"text":"\u91D1\u6C34\u533A","value":"410105"},{"text":"\u4E0A\u8857\u533A","value":"410106"},{"text":"\u60E0\u6D4E\u533A","value":"410108"},{"text":"\u4E2D\u725F\u53BF","value":"410122"},{"text":"\u5DE9\u4E49\u5E02","value":"410181"},{"text":"\u8365\u9633\u5E02","value":"410182"},{"text":"\u65B0\u5BC6\u5E02","value":"410183"},{"text":"\u65B0\u90D1\u5E02","value":"410184"},{"text":"\u767B\u5C01\u5E02","value":"410185"}],"410200":[{"text":"\u5E02\u8F96\u533A","value":"410201"},{"text":"\u9F99\u4EAD\u533A","value":"410202"},{"text":"\u987A\u6CB3\u56DE\u65CF\u533A","value":"410203"},{"text":"\u9F13\u697C\u533A","value":"410204"},{"text":"\u79B9\u738B\u53F0\u533A","value":"410205"},{"text":"\u91D1\u660E\u533A","value":"410211"},{"text":"\u675E\u53BF","value":"410221"},{"text":"\u901A\u8BB8\u53BF","value":"410222"},{"text":"\u5C09\u6C0F\u53BF","value":"410223"},{"text":"\u5F00\u5C01\u53BF","value":"410224"},{"text":"\u5170\u8003\u53BF","value":"410225"}],"410300":[{"text":"\u5E02\u8F96\u533A","value":"410301"},{"text":"\u8001\u57CE\u533A","value":"410302"},{"text":"\u897F\u5DE5\u533A","value":"410303"},{"text":"\u700D\u6CB3\u56DE\u65CF\u533A","value":"410304"},{"text":"\u6DA7\u897F\u533A","value":"410305"},{"text":"\u5409\u5229\u533A","value":"410306"},{"text":"\u6D1B\u9F99\u533A","value":"410311"},{"text":"\u5B5F\u6D25\u53BF","value":"410322"},{"text":"\u65B0\u5B89\u53BF","value":"410323"},{"text":"\u683E\u5DDD\u53BF","value":"410324"},{"text":"\u5D69\u53BF","value":"410325"},{"text":"\u6C5D\u9633\u53BF","value":"410326"},{"text":"\u5B9C\u9633\u53BF","value":"410327"},{"text":"\u6D1B\u5B81\u53BF","value":"410328"},{"text":"\u4F0A\u5DDD\u53BF","value":"410329"},{"text":"\u5043\u5E08\u5E02","value":"410381"}],"410400":[{"text":"\u5E02\u8F96\u533A","value":"410401"},{"text":"\u65B0\u534E\u533A","value":"410402"},{"text":"\u536B\u4E1C\u533A","value":"410403"},{"text":"\u77F3\u9F99\u533A","value":"410404"},{"text":"\u6E5B\u6CB3\u533A","value":"410411"},{"text":"\u5B9D\u4E30\u53BF","value":"410421"},{"text":"\u53F6\u53BF","value":"410422"},{"text":"\u9C81\u5C71\u53BF","value":"410423"},{"text":"\u90CF\u53BF","value":"410425"},{"text":"\u821E\u94A2\u5E02","value":"410481"},{"text":"\u6C5D\u5DDE\u5E02","value":"410482"}],"410500":[{"text":"\u5E02\u8F96\u533A","value":"410501"},{"text":"\u6587\u5CF0\u533A","value":"410502"},{"text":"\u5317\u5173\u533A","value":"410503"},{"text":"\u6BB7\u90FD\u533A","value":"410505"},{"text":"\u9F99\u5B89\u533A","value":"410506"},{"text":"\u5B89\u9633\u53BF","value":"410522"},{"text":"\u6C64\u9634\u53BF","value":"410523"},{"text":"\u6ED1\u53BF","value":"410526"},{"text":"\u5185\u9EC4\u53BF","value":"410527"},{"text":"\u6797\u5DDE\u5E02","value":"410581"}],"410600":[{"text":"\u5E02\u8F96\u533A","value":"410601"},{"text":"\u9E64\u5C71\u533A","value":"410602"},{"text":"\u5C71\u57CE\u533A","value":"410603"},{"text":"\u6DC7\u6EE8\u533A","value":"410611"},{"text":"\u6D5A\u53BF","value":"410621"},{"text":"\u6DC7\u53BF","value":"410622"}],"410700":[{"text":"\u5E02\u8F96\u533A","value":"410701"},{"text":"\u7EA2\u65D7\u533A","value":"410702"},{"text":"\u536B\u6EE8\u533A","value":"410703"},{"text":"\u51E4\u6CC9\u533A","value":"410704"},{"text":"\u7267\u91CE\u533A","value":"410711"},{"text":"\u65B0\u4E61\u53BF","value":"410721"},{"text":"\u83B7\u5609\u53BF","value":"410724"},{"text":"\u539F\u9633\u53BF","value":"410725"},{"text":"\u5EF6\u6D25\u53BF","value":"410726"},{"text":"\u5C01\u4E18\u53BF","value":"410727"},{"text":"\u957F\u57A3\u53BF","value":"410728"},{"text":"\u536B\u8F89\u5E02","value":"410781"},{"text":"\u8F89\u53BF\u5E02","value":"410782"}],"410800":[{"text":"\u5E02\u8F96\u533A","value":"410801"},{"text":"\u89E3\u653E\u533A","value":"410802"},{"text":"\u4E2D\u7AD9\u533A","value":"410803"},{"text":"\u9A6C\u6751\u533A","value":"410804"},{"text":"\u5C71\u9633\u533A","value":"410811"},{"text":"\u4FEE\u6B66\u53BF","value":"410821"},{"text":"\u535A\u7231\u53BF","value":"410822"},{"text":"\u6B66\u965F\u53BF","value":"410823"},{"text":"\u6E29\u53BF","value":"410825"},{"text":"\u6C81\u9633\u5E02","value":"410882"},{"text":"\u5B5F\u5DDE\u5E02","value":"410883"}],"410900":[{"text":"\u5E02\u8F96\u533A","value":"410901"},{"text":"\u534E\u9F99\u533A","value":"410902"},{"text":"\u6E05\u4E30\u53BF","value":"410922"},{"text":"\u5357\u4E50\u53BF","value":"410923"},{"text":"\u8303\u53BF","value":"410926"},{"text":"\u53F0\u524D\u53BF","value":"410927"},{"text":"\u6FEE\u9633\u53BF","value":"410928"}],"411000":[{"text":"\u5E02\u8F96\u533A","value":"411001"},{"text":"\u9B4F\u90FD\u533A","value":"411002"},{"text":"\u8BB8\u660C\u53BF","value":"411023"},{"text":"\u9122\u9675\u53BF","value":"411024"},{"text":"\u8944\u57CE\u53BF","value":"411025"},{"text":"\u79B9\u5DDE\u5E02","value":"411081"},{"text":"\u957F\u845B\u5E02","value":"411082"}],"411100":[{"text":"\u5E02\u8F96\u533A","value":"411101"},{"text":"\u6E90\u6C47\u533A","value":"411102"},{"text":"\u90FE\u57CE\u533A","value":"411103"},{"text":"\u53EC\u9675\u533A","value":"411104"},{"text":"\u821E\u9633\u53BF","value":"411121"},{"text":"\u4E34\u988D\u53BF","value":"411122"}],"411200":[{"text":"\u5E02\u8F96\u533A","value":"411201"},{"text":"\u6E56\u6EE8\u533A","value":"411202"},{"text":"\u6E11\u6C60\u53BF","value":"411221"},{"text":"\u9655\u53BF","value":"411222"},{"text":"\u5362\u6C0F\u53BF","value":"411224"},{"text":"\u4E49\u9A6C\u5E02","value":"411281"},{"text":"\u7075\u5B9D\u5E02","value":"411282"}],"411300":[{"text":"\u5E02\u8F96\u533A","value":"411301"},{"text":"\u5B9B\u57CE\u533A","value":"411302"},{"text":"\u5367\u9F99\u533A","value":"411303"},{"text":"\u5357\u53EC\u53BF","value":"411321"},{"text":"\u65B9\u57CE\u53BF","value":"411322"},{"text":"\u897F\u5CE1\u53BF","value":"411323"},{"text":"\u9547\u5E73\u53BF","value":"411324"},{"text":"\u5185\u4E61\u53BF","value":"411325"},{"text":"\u6DC5\u5DDD\u53BF","value":"411326"},{"text":"\u793E\u65D7\u53BF","value":"411327"},{"text":"\u5510\u6CB3\u53BF","value":"411328"},{"text":"\u65B0\u91CE\u53BF","value":"411329"},{"text":"\u6850\u67CF\u53BF","value":"411330"},{"text":"\u9093\u5DDE\u5E02","value":"411381"}],"411400":[{"text":"\u5E02\u8F96\u533A","value":"411401"},{"text":"\u6881\u56ED\u533A","value":"411402"},{"text":"\u7762\u9633\u533A","value":"411403"},{"text":"\u6C11\u6743\u53BF","value":"411421"},{"text":"\u7762\u53BF","value":"411422"},{"text":"\u5B81\u9675\u53BF","value":"411423"},{"text":"\u67D8\u57CE\u53BF","value":"411424"},{"text":"\u865E\u57CE\u53BF","value":"411425"},{"text":"\u590F\u9091\u53BF","value":"411426"},{"text":"\u6C38\u57CE\u5E02","value":"411481"}],"411500":[{"text":"\u5E02\u8F96\u533A","value":"411501"},{"text":"\u6D49\u6CB3\u533A","value":"411502"},{"text":"\u5E73\u6865\u533A","value":"411503"},{"text":"\u7F57\u5C71\u53BF","value":"411521"},{"text":"\u5149\u5C71\u53BF","value":"411522"},{"text":"\u65B0\u53BF","value":"411523"},{"text":"\u5546\u57CE\u53BF","value":"411524"},{"text":"\u56FA\u59CB\u53BF","value":"411525"},{"text":"\u6F62\u5DDD\u53BF","value":"411526"},{"text":"\u6DEE\u6EE8\u53BF","value":"411527"},{"text":"\u606F\u53BF","value":"411528"}],"411600":[{"text":"\u5E02\u8F96\u533A","value":"411601"},{"text":"\u5DDD\u6C47\u533A","value":"411602"},{"text":"\u6276\u6C9F\u53BF","value":"411621"},{"text":"\u897F\u534E\u53BF","value":"411622"},{"text":"\u5546\u6C34\u53BF","value":"411623"},{"text":"\u6C88\u4E18\u53BF","value":"411624"},{"text":"\u90F8\u57CE\u53BF","value":"411625"},{"text":"\u6DEE\u9633\u53BF","value":"411626"},{"text":"\u592A\u5EB7\u53BF","value":"411627"},{"text":"\u9E7F\u9091\u53BF","value":"411628"},{"text":"\u9879\u57CE\u5E02","value":"411681"}],"411700":[{"text":"\u5E02\u8F96\u533A","value":"411701"},{"text":"\u9A7F\u57CE\u533A","value":"411702"},{"text":"\u897F\u5E73\u53BF","value":"411721"},{"text":"\u4E0A\u8521\u53BF","value":"411722"},{"text":"\u5E73\u8206\u53BF","value":"411723"},{"text":"\u6B63\u9633\u53BF","value":"411724"},{"text":"\u786E\u5C71\u53BF","value":"411725"},{"text":"\u6CCC\u9633\u53BF","value":"411726"},{"text":"\u6C5D\u5357\u53BF","value":"411727"},{"text":"\u9042\u5E73\u53BF","value":"411728"},{"text":"\u65B0\u8521\u53BF","value":"411729"}],"419000":[{"text":"\u6D4E\u6E90\u5E02","value":"419001"}],"420100":[{"text":"\u5E02\u8F96\u533A","value":"420101"},{"text":"\u6C5F\u5CB8\u533A","value":"420102"},{"text":"\u6C5F\u6C49\u533A","value":"420103"},{"text":"\u785A\u53E3\u533A","value":"420104"},{"text":"\u6C49\u9633\u533A","value":"420105"},{"text":"\u6B66\u660C\u533A","value":"420106"},{"text":"\u9752\u5C71\u533A","value":"420107"},{"text":"\u6D2A\u5C71\u533A","value":"420111"},{"text":"\u4E1C\u897F\u6E56\u533A","value":"420112"},{"text":"\u6C49\u5357\u533A","value":"420113"},{"text":"\u8521\u7538\u533A","value":"420114"},{"text":"\u6C5F\u590F\u533A","value":"420115"},{"text":"\u9EC4\u9642\u533A","value":"420116"},{"text":"\u65B0\u6D32\u533A","value":"420117"}],"420200":[{"text":"\u5E02\u8F96\u533A","value":"420201"},{"text":"\u9EC4\u77F3\u6E2F\u533A","value":"420202"},{"text":"\u897F\u585E\u5C71\u533A","value":"420203"},{"text":"\u4E0B\u9646\u533A","value":"420204"},{"text":"\u94C1\u5C71\u533A","value":"420205"},{"text":"\u9633\u65B0\u53BF","value":"420222"},{"text":"\u5927\u51B6\u5E02","value":"420281"}],"420300":[{"text":"\u5E02\u8F96\u533A","value":"420301"},{"text":"\u8305\u7BAD\u533A","value":"420302"},{"text":"\u5F20\u6E7E\u533A","value":"420303"},{"text":"\u90E7\u53BF","value":"420321"},{"text":"\u90E7\u897F\u53BF","value":"420322"},{"text":"\u7AF9\u5C71\u53BF","value":"420323"},{"text":"\u7AF9\u6EAA\u53BF","value":"420324"},{"text":"\u623F\u53BF","value":"420325"},{"text":"\u4E39\u6C5F\u53E3\u5E02","value":"420381"}],"420500":[{"text":"\u5E02\u8F96\u533A","value":"420501"},{"text":"\u897F\u9675\u533A","value":"420502"},{"text":"\u4F0D\u5BB6\u5C97\u533A","value":"420503"},{"text":"\u70B9\u519B\u533A","value":"420504"},{"text":"\u7307\u4EAD\u533A","value":"420505"},{"text":"\u5937\u9675\u533A","value":"420506"},{"text":"\u8FDC\u5B89\u53BF","value":"420525"},{"text":"\u5174\u5C71\u53BF","value":"420526"},{"text":"\u79ED\u5F52\u53BF","value":"420527"},{"text":"\u957F\u9633\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF","value":"420528"},{"text":"\u4E94\u5CF0\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF","value":"420529"},{"text":"\u5B9C\u90FD\u5E02","value":"420581"},{"text":"\u5F53\u9633\u5E02","value":"420582"},{"text":"\u679D\u6C5F\u5E02","value":"420583"}],"420600":[{"text":"\u5E02\u8F96\u533A","value":"420601"},{"text":"\u8944\u57CE\u533A","value":"420602"},{"text":"\u6A0A\u57CE\u533A","value":"420606"},{"text":"\u8944\u5DDE\u533A","value":"420607"},{"text":"\u5357\u6F33\u53BF","value":"420624"},{"text":"\u8C37\u57CE\u53BF","value":"420625"},{"text":"\u4FDD\u5EB7\u53BF","value":"420626"},{"text":"\u8001\u6CB3\u53E3\u5E02","value":"420682"},{"text":"\u67A3\u9633\u5E02","value":"420683"},{"text":"\u5B9C\u57CE\u5E02","value":"420684"}],"420700":[{"text":"\u5E02\u8F96\u533A","value":"420701"},{"text":"\u6881\u5B50\u6E56\u533A","value":"420702"},{"text":"\u534E\u5BB9\u533A","value":"420703"},{"text":"\u9102\u57CE\u533A","value":"420704"}],"420800":[{"text":"\u5E02\u8F96\u533A","value":"420801"},{"text":"\u4E1C\u5B9D\u533A","value":"420802"},{"text":"\u6387\u5200\u533A","value":"420804"},{"text":"\u4EAC\u5C71\u53BF","value":"420821"},{"text":"\u6C99\u6D0B\u53BF","value":"420822"},{"text":"\u949F\u7965\u5E02","value":"420881"}],"420900":[{"text":"\u5E02\u8F96\u533A","value":"420901"},{"text":"\u5B5D\u5357\u533A","value":"420902"},{"text":"\u5B5D\u660C\u53BF","value":"420921"},{"text":"\u5927\u609F\u53BF","value":"420922"},{"text":"\u4E91\u68A6\u53BF","value":"420923"},{"text":"\u5E94\u57CE\u5E02","value":"420981"},{"text":"\u5B89\u9646\u5E02","value":"420982"},{"text":"\u6C49\u5DDD\u5E02","value":"420984"}],"421000":[{"text":"\u5E02\u8F96\u533A","value":"421001"},{"text":"\u6C99\u5E02\u533A","value":"421002"},{"text":"\u8346\u5DDE\u533A","value":"421003"},{"text":"\u516C\u5B89\u53BF","value":"421022"},{"text":"\u76D1\u5229\u53BF","value":"421023"},{"text":"\u6C5F\u9675\u53BF","value":"421024"},{"text":"\u77F3\u9996\u5E02","value":"421081"},{"text":"\u6D2A\u6E56\u5E02","value":"421083"},{"text":"\u677E\u6ECB\u5E02","value":"421087"}],"421100":[{"text":"\u5E02\u8F96\u533A","value":"421101"},{"text":"\u9EC4\u5DDE\u533A","value":"421102"},{"text":"\u56E2\u98CE\u53BF","value":"421121"},{"text":"\u7EA2\u5B89\u53BF","value":"421122"},{"text":"\u7F57\u7530\u53BF","value":"421123"},{"text":"\u82F1\u5C71\u53BF","value":"421124"},{"text":"\u6D60\u6C34\u53BF","value":"421125"},{"text":"\u8572\u6625\u53BF","value":"421126"},{"text":"\u9EC4\u6885\u53BF","value":"421127"},{"text":"\u9EBB\u57CE\u5E02","value":"421181"},{"text":"\u6B66\u7A74\u5E02","value":"421182"}],"421200":[{"text":"\u5E02\u8F96\u533A","value":"421201"},{"text":"\u54B8\u5B89\u533A","value":"421202"},{"text":"\u5609\u9C7C\u53BF","value":"421221"},{"text":"\u901A\u57CE\u53BF","value":"421222"},{"text":"\u5D07\u9633\u53BF","value":"421223"},{"text":"\u901A\u5C71\u53BF","value":"421224"},{"text":"\u8D64\u58C1\u5E02","value":"421281"}],"421300":[{"text":"\u5E02\u8F96\u533A","value":"421301"},{"text":"\u66FE\u90FD\u533A","value":"421303"},{"text":"\u968F\u53BF","value":"421321"},{"text":"\u5E7F\u6C34\u5E02","value":"421381"}],"422800":[{"text":"\u6069\u65BD\u5E02","value":"422801"},{"text":"\u5229\u5DDD\u5E02","value":"422802"},{"text":"\u5EFA\u59CB\u53BF","value":"422822"},{"text":"\u5DF4\u4E1C\u53BF","value":"422823"},{"text":"\u5BA3\u6069\u53BF","value":"422825"},{"text":"\u54B8\u4E30\u53BF","value":"422826"},{"text":"\u6765\u51E4\u53BF","value":"422827"},{"text":"\u9E64\u5CF0\u53BF","value":"422828"}],"429000":[{"text":"\u4ED9\u6843\u5E02","value":"429004"},{"text":"\u6F5C\u6C5F\u5E02","value":"429005"},{"text":"\u5929\u95E8\u5E02","value":"429006"},{"text":"\u795E\u519C\u67B6\u6797\u533A","value":"429021"}],"430100":[{"text":"\u5E02\u8F96\u533A","value":"430101"},{"text":"\u8299\u84C9\u533A","value":"430102"},{"text":"\u5929\u5FC3\u533A","value":"430103"},{"text":"\u5CB3\u9E93\u533A","value":"430104"},{"text":"\u5F00\u798F\u533A","value":"430105"},{"text":"\u96E8\u82B1\u533A","value":"430111"},{"text":"\u671B\u57CE\u533A","value":"430112"},{"text":"\u957F\u6C99\u53BF","value":"430121"},{"text":"\u5B81\u4E61\u53BF","value":"430124"},{"text":"\u6D4F\u9633\u5E02","value":"430181"}],"430200":[{"text":"\u5E02\u8F96\u533A","value":"430201"},{"text":"\u8377\u5858\u533A","value":"430202"},{"text":"\u82A6\u6DDE\u533A","value":"430203"},{"text":"\u77F3\u5CF0\u533A","value":"430204"},{"text":"\u5929\u5143\u533A","value":"430211"},{"text":"\u682A\u6D32\u53BF","value":"430221"},{"text":"\u6538\u53BF","value":"430223"},{"text":"\u8336\u9675\u53BF","value":"430224"},{"text":"\u708E\u9675\u53BF","value":"430225"},{"text":"\u91B4\u9675\u5E02","value":"430281"}],"430300":[{"text":"\u5E02\u8F96\u533A","value":"430301"},{"text":"\u96E8\u6E56\u533A","value":"430302"},{"text":"\u5CB3\u5858\u533A","value":"430304"},{"text":"\u6E58\u6F6D\u53BF","value":"430321"},{"text":"\u6E58\u4E61\u5E02","value":"430381"},{"text":"\u97F6\u5C71\u5E02","value":"430382"}],"430400":[{"text":"\u5E02\u8F96\u533A","value":"430401"},{"text":"\u73E0\u6656\u533A","value":"430405"},{"text":"\u96C1\u5CF0\u533A","value":"430406"},{"text":"\u77F3\u9F13\u533A","value":"430407"},{"text":"\u84B8\u6E58\u533A","value":"430408"},{"text":"\u5357\u5CB3\u533A","value":"430412"},{"text":"\u8861\u9633\u53BF","value":"430421"},{"text":"\u8861\u5357\u53BF","value":"430422"},{"text":"\u8861\u5C71\u53BF","value":"430423"},{"text":"\u8861\u4E1C\u53BF","value":"430424"},{"text":"\u7941\u4E1C\u53BF","value":"430426"},{"text":"\u8012\u9633\u5E02","value":"430481"},{"text":"\u5E38\u5B81\u5E02","value":"430482"}],"430500":[{"text":"\u5E02\u8F96\u533A","value":"430501"},{"text":"\u53CC\u6E05\u533A","value":"430502"},{"text":"\u5927\u7965\u533A","value":"430503"},{"text":"\u5317\u5854\u533A","value":"430511"},{"text":"\u90B5\u4E1C\u53BF","value":"430521"},{"text":"\u65B0\u90B5\u53BF","value":"430522"},{"text":"\u90B5\u9633\u53BF","value":"430523"},{"text":"\u9686\u56DE\u53BF","value":"430524"},{"text":"\u6D1E\u53E3\u53BF","value":"430525"},{"text":"\u7EE5\u5B81\u53BF","value":"430527"},{"text":"\u65B0\u5B81\u53BF","value":"430528"},{"text":"\u57CE\u6B65\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"430529"},{"text":"\u6B66\u5188\u5E02","value":"430581"}],"430600":[{"text":"\u5E02\u8F96\u533A","value":"430601"},{"text":"\u5CB3\u9633\u697C\u533A","value":"430602"},{"text":"\u4E91\u6EAA\u533A","value":"430603"},{"text":"\u541B\u5C71\u533A","value":"430611"},{"text":"\u5CB3\u9633\u53BF","value":"430621"},{"text":"\u534E\u5BB9\u53BF","value":"430623"},{"text":"\u6E58\u9634\u53BF","value":"430624"},{"text":"\u5E73\u6C5F\u53BF","value":"430626"},{"text":"\u6C68\u7F57\u5E02","value":"430681"},{"text":"\u4E34\u6E58\u5E02","value":"430682"}],"430700":[{"text":"\u5E02\u8F96\u533A","value":"430701"},{"text":"\u6B66\u9675\u533A","value":"430702"},{"text":"\u9F0E\u57CE\u533A","value":"430703"},{"text":"\u5B89\u4E61\u53BF","value":"430721"},{"text":"\u6C49\u5BFF\u53BF","value":"430722"},{"text":"\u6FA7\u53BF","value":"430723"},{"text":"\u4E34\u6FA7\u53BF","value":"430724"},{"text":"\u6843\u6E90\u53BF","value":"430725"},{"text":"\u77F3\u95E8\u53BF","value":"430726"},{"text":"\u6D25\u5E02\u5E02","value":"430781"}],"430800":[{"text":"\u5E02\u8F96\u533A","value":"430801"},{"text":"\u6C38\u5B9A\u533A","value":"430802"},{"text":"\u6B66\u9675\u6E90\u533A","value":"430811"},{"text":"\u6148\u5229\u53BF","value":"430821"},{"text":"\u6851\u690D\u53BF","value":"430822"}],"430900":[{"text":"\u5E02\u8F96\u533A","value":"430901"},{"text":"\u8D44\u9633\u533A","value":"430902"},{"text":"\u8D6B\u5C71\u533A","value":"430903"},{"text":"\u5357\u53BF","value":"430921"},{"text":"\u6843\u6C5F\u53BF","value":"430922"},{"text":"\u5B89\u5316\u53BF","value":"430923"},{"text":"\u6C85\u6C5F\u5E02","value":"430981"}],"431000":[{"text":"\u5E02\u8F96\u533A","value":"431001"},{"text":"\u5317\u6E56\u533A","value":"431002"},{"text":"\u82CF\u4ED9\u533A","value":"431003"},{"text":"\u6842\u9633\u53BF","value":"431021"},{"text":"\u5B9C\u7AE0\u53BF","value":"431022"},{"text":"\u6C38\u5174\u53BF","value":"431023"},{"text":"\u5609\u79BE\u53BF","value":"431024"},{"text":"\u4E34\u6B66\u53BF","value":"431025"},{"text":"\u6C5D\u57CE\u53BF","value":"431026"},{"text":"\u6842\u4E1C\u53BF","value":"431027"},{"text":"\u5B89\u4EC1\u53BF","value":"431028"},{"text":"\u8D44\u5174\u5E02","value":"431081"}],"431100":[{"text":"\u5E02\u8F96\u533A","value":"431101"},{"text":"\u96F6\u9675\u533A","value":"431102"},{"text":"\u51B7\u6C34\u6EE9\u533A","value":"431103"},{"text":"\u7941\u9633\u53BF","value":"431121"},{"text":"\u4E1C\u5B89\u53BF","value":"431122"},{"text":"\u53CC\u724C\u53BF","value":"431123"},{"text":"\u9053\u53BF","value":"431124"},{"text":"\u6C5F\u6C38\u53BF","value":"431125"},{"text":"\u5B81\u8FDC\u53BF","value":"431126"},{"text":"\u84DD\u5C71\u53BF","value":"431127"},{"text":"\u65B0\u7530\u53BF","value":"431128"},{"text":"\u6C5F\u534E\u7476\u65CF\u81EA\u6CBB\u53BF","value":"431129"}],"431200":[{"text":"\u5E02\u8F96\u533A","value":"431201"},{"text":"\u9E64\u57CE\u533A","value":"431202"},{"text":"\u4E2D\u65B9\u53BF","value":"431221"},{"text":"\u6C85\u9675\u53BF","value":"431222"},{"text":"\u8FB0\u6EAA\u53BF","value":"431223"},{"text":"\u6E86\u6D66\u53BF","value":"431224"},{"text":"\u4F1A\u540C\u53BF","value":"431225"},{"text":"\u9EBB\u9633\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"431226"},{"text":"\u65B0\u6643\u4F97\u65CF\u81EA\u6CBB\u53BF","value":"431227"},{"text":"\u82B7\u6C5F\u4F97\u65CF\u81EA\u6CBB\u53BF","value":"431228"},{"text":"\u9756\u5DDE\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u53BF","value":"431229"},{"text":"\u901A\u9053\u4F97\u65CF\u81EA\u6CBB\u53BF","value":"431230"},{"text":"\u6D2A\u6C5F\u5E02","value":"431281"}],"431300":[{"text":"\u5E02\u8F96\u533A","value":"431301"},{"text":"\u5A04\u661F\u533A","value":"431302"},{"text":"\u53CC\u5CF0\u53BF","value":"431321"},{"text":"\u65B0\u5316\u53BF","value":"431322"},{"text":"\u51B7\u6C34\u6C5F\u5E02","value":"431381"},{"text":"\u6D9F\u6E90\u5E02","value":"431382"}],"433100":[{"text":"\u5409\u9996\u5E02","value":"433101"},{"text":"\u6CF8\u6EAA\u53BF","value":"433122"},{"text":"\u51E4\u51F0\u53BF","value":"433123"},{"text":"\u82B1\u57A3\u53BF","value":"433124"},{"text":"\u4FDD\u9756\u53BF","value":"433125"},{"text":"\u53E4\u4E08\u53BF","value":"433126"},{"text":"\u6C38\u987A\u53BF","value":"433127"},{"text":"\u9F99\u5C71\u53BF","value":"433130"}],"440100":[{"text":"\u5E02\u8F96\u533A","value":"440101"},{"text":"\u8354\u6E7E\u533A","value":"440103"},{"text":"\u8D8A\u79C0\u533A","value":"440104"},{"text":"\u6D77\u73E0\u533A","value":"440105"},{"text":"\u5929\u6CB3\u533A","value":"440106"},{"text":"\u767D\u4E91\u533A","value":"440111"},{"text":"\u9EC4\u57D4\u533A","value":"440112"},{"text":"\u756A\u79BA\u533A","value":"440113"},{"text":"\u82B1\u90FD\u533A","value":"440114"},{"text":"\u5357\u6C99\u533A","value":"440115"},{"text":"\u841D\u5C97\u533A","value":"440116"},{"text":"\u589E\u57CE\u5E02","value":"440183"},{"text":"\u4ECE\u5316\u5E02","value":"440184"}],"440200":[{"text":"\u5E02\u8F96\u533A","value":"440201"},{"text":"\u6B66\u6C5F\u533A","value":"440203"},{"text":"\u6D48\u6C5F\u533A","value":"440204"},{"text":"\u66F2\u6C5F\u533A","value":"440205"},{"text":"\u59CB\u5174\u53BF","value":"440222"},{"text":"\u4EC1\u5316\u53BF","value":"440224"},{"text":"\u7FC1\u6E90\u53BF","value":"440229"},{"text":"\u4E73\u6E90\u7476\u65CF\u81EA\u6CBB\u53BF","value":"440232"},{"text":"\u65B0\u4E30\u53BF","value":"440233"},{"text":"\u4E50\u660C\u5E02","value":"440281"},{"text":"\u5357\u96C4\u5E02","value":"440282"}],"440300":[{"text":"\u5E02\u8F96\u533A","value":"440301"},{"text":"\u7F57\u6E56\u533A","value":"440303"},{"text":"\u798F\u7530\u533A","value":"440304"},{"text":"\u5357\u5C71\u533A","value":"440305"},{"text":"\u5B9D\u5B89\u533A","value":"440306"},{"text":"\u9F99\u5C97\u533A","value":"440307"},{"text":"\u76D0\u7530\u533A","value":"440308"}],"440400":[{"text":"\u5E02\u8F96\u533A","value":"440401"},{"text":"\u9999\u6D32\u533A","value":"440402"},{"text":"\u6597\u95E8\u533A","value":"440403"},{"text":"\u91D1\u6E7E\u533A","value":"440404"}],"440500":[{"text":"\u5E02\u8F96\u533A","value":"440501"},{"text":"\u9F99\u6E56\u533A","value":"440507"},{"text":"\u91D1\u5E73\u533A","value":"440511"},{"text":"\u6FE0\u6C5F\u533A","value":"440512"},{"text":"\u6F6E\u9633\u533A","value":"440513"},{"text":"\u6F6E\u5357\u533A","value":"440514"},{"text":"\u6F84\u6D77\u533A","value":"440515"},{"text":"\u5357\u6FB3\u53BF","value":"440523"}],"440600":[{"text":"\u5E02\u8F96\u533A","value":"440601"},{"text":"\u7985\u57CE\u533A","value":"440604"},{"text":"\u5357\u6D77\u533A","value":"440605"},{"text":"\u987A\u5FB7\u533A","value":"440606"},{"text":"\u4E09\u6C34\u533A","value":"440607"},{"text":"\u9AD8\u660E\u533A","value":"440608"}],"440700":[{"text":"\u5E02\u8F96\u533A","value":"440701"},{"text":"\u84EC\u6C5F\u533A","value":"440703"},{"text":"\u6C5F\u6D77\u533A","value":"440704"},{"text":"\u65B0\u4F1A\u533A","value":"440705"},{"text":"\u53F0\u5C71\u5E02","value":"440781"},{"text":"\u5F00\u5E73\u5E02","value":"440783"},{"text":"\u9E64\u5C71\u5E02","value":"440784"},{"text":"\u6069\u5E73\u5E02","value":"440785"}],"440800":[{"text":"\u5E02\u8F96\u533A","value":"440801"},{"text":"\u8D64\u574E\u533A","value":"440802"},{"text":"\u971E\u5C71\u533A","value":"440803"},{"text":"\u5761\u5934\u533A","value":"440804"},{"text":"\u9EBB\u7AE0\u533A","value":"440811"},{"text":"\u9042\u6EAA\u53BF","value":"440823"},{"text":"\u5F90\u95FB\u53BF","value":"440825"},{"text":"\u5EC9\u6C5F\u5E02","value":"440881"},{"text":"\u96F7\u5DDE\u5E02","value":"440882"},{"text":"\u5434\u5DDD\u5E02","value":"440883"}],"440900":[{"text":"\u5E02\u8F96\u533A","value":"440901"},{"text":"\u8302\u5357\u533A","value":"440902"},{"text":"\u8302\u6E2F\u533A","value":"440903"},{"text":"\u7535\u767D\u53BF","value":"440923"},{"text":"\u9AD8\u5DDE\u5E02","value":"440981"},{"text":"\u5316\u5DDE\u5E02","value":"440982"},{"text":"\u4FE1\u5B9C\u5E02","value":"440983"}],"441200":[{"text":"\u5E02\u8F96\u533A","value":"441201"},{"text":"\u7AEF\u5DDE\u533A","value":"441202"},{"text":"\u9F0E\u6E56\u533A","value":"441203"},{"text":"\u5E7F\u5B81\u53BF","value":"441223"},{"text":"\u6000\u96C6\u53BF","value":"441224"},{"text":"\u5C01\u5F00\u53BF","value":"441225"},{"text":"\u5FB7\u5E86\u53BF","value":"441226"},{"text":"\u9AD8\u8981\u5E02","value":"441283"},{"text":"\u56DB\u4F1A\u5E02","value":"441284"}],"441300":[{"text":"\u5E02\u8F96\u533A","value":"441301"},{"text":"\u60E0\u57CE\u533A","value":"441302"},{"text":"\u60E0\u9633\u533A","value":"441303"},{"text":"\u535A\u7F57\u53BF","value":"441322"},{"text":"\u60E0\u4E1C\u53BF","value":"441323"},{"text":"\u9F99\u95E8\u53BF","value":"441324"}],"441400":[{"text":"\u5E02\u8F96\u533A","value":"441401"},{"text":"\u6885\u6C5F\u533A","value":"441402"},{"text":"\u6885\u53BF","value":"441421"},{"text":"\u5927\u57D4\u53BF","value":"441422"},{"text":"\u4E30\u987A\u53BF","value":"441423"},{"text":"\u4E94\u534E\u53BF","value":"441424"},{"text":"\u5E73\u8FDC\u53BF","value":"441426"},{"text":"\u8549\u5CAD\u53BF","value":"441427"},{"text":"\u5174\u5B81\u5E02","value":"441481"}],"441500":[{"text":"\u5E02\u8F96\u533A","value":"441501"},{"text":"\u57CE\u533A","value":"441502"},{"text":"\u6D77\u4E30\u53BF","value":"441521"},{"text":"\u9646\u6CB3\u53BF","value":"441523"},{"text":"\u9646\u4E30\u5E02","value":"441581"}],"441600":[{"text":"\u5E02\u8F96\u533A","value":"441601"},{"text":"\u6E90\u57CE\u533A","value":"441602"},{"text":"\u7D2B\u91D1\u53BF","value":"441621"},{"text":"\u9F99\u5DDD\u53BF","value":"441622"},{"text":"\u8FDE\u5E73\u53BF","value":"441623"},{"text":"\u548C\u5E73\u53BF","value":"441624"},{"text":"\u4E1C\u6E90\u53BF","value":"441625"}],"441700":[{"text":"\u5E02\u8F96\u533A","value":"441701"},{"text":"\u6C5F\u57CE\u533A","value":"441702"},{"text":"\u9633\u897F\u53BF","value":"441721"},{"text":"\u9633\u4E1C\u53BF","value":"441723"},{"text":"\u9633\u6625\u5E02","value":"441781"}],"441800":[{"text":"\u5E02\u8F96\u533A","value":"441801"},{"text":"\u6E05\u57CE\u533A","value":"441802"},{"text":"\u6E05\u65B0\u533A","value":"441803"},{"text":"\u4F5B\u5188\u53BF","value":"441821"},{"text":"\u9633\u5C71\u53BF","value":"441823"},{"text":"\u8FDE\u5C71\u58EE\u65CF\u7476\u65CF\u81EA\u6CBB\u53BF","value":"441825"},{"text":"\u8FDE\u5357\u7476\u65CF\u81EA\u6CBB\u53BF","value":"441826"},{"text":"\u82F1\u5FB7\u5E02","value":"441881"},{"text":"\u8FDE\u5DDE\u5E02","value":"441882"}],"441900":"","442000":"","445100":[{"text":"\u5E02\u8F96\u533A","value":"445101"},{"text":"\u6E58\u6865\u533A","value":"445102"},{"text":"\u6F6E\u5B89\u533A","value":"445103"},{"text":"\u9976\u5E73\u53BF","value":"445122"}],"445200":[{"text":"\u5E02\u8F96\u533A","value":"445201"},{"text":"\u6995\u57CE\u533A","value":"445202"},{"text":"\u63ED\u4E1C\u533A","value":"445203"},{"text":"\u63ED\u897F\u53BF","value":"445222"},{"text":"\u60E0\u6765\u53BF","value":"445224"},{"text":"\u666E\u5B81\u5E02","value":"445281"}],"445300":[{"text":"\u5E02\u8F96\u533A","value":"445301"},{"text":"\u4E91\u57CE\u533A","value":"445302"},{"text":"\u65B0\u5174\u53BF","value":"445321"},{"text":"\u90C1\u5357\u53BF","value":"445322"},{"text":"\u4E91\u5B89\u53BF","value":"445323"},{"text":"\u7F57\u5B9A\u5E02","value":"445381"}],"450100":[{"text":"\u5E02\u8F96\u533A","value":"450101"},{"text":"\u5174\u5B81\u533A","value":"450102"},{"text":"\u9752\u79C0\u533A","value":"450103"},{"text":"\u6C5F\u5357\u533A","value":"450105"},{"text":"\u897F\u4E61\u5858\u533A","value":"450107"},{"text":"\u826F\u5E86\u533A","value":"450108"},{"text":"\u9095\u5B81\u533A","value":"450109"},{"text":"\u6B66\u9E23\u53BF","value":"450122"},{"text":"\u9686\u5B89\u53BF","value":"450123"},{"text":"\u9A6C\u5C71\u53BF","value":"450124"},{"text":"\u4E0A\u6797\u53BF","value":"450125"},{"text":"\u5BBE\u9633\u53BF","value":"450126"},{"text":"\u6A2A\u53BF","value":"450127"}],"450200":[{"text":"\u5E02\u8F96\u533A","value":"450201"},{"text":"\u57CE\u4E2D\u533A","value":"450202"},{"text":"\u9C7C\u5CF0\u533A","value":"450203"},{"text":"\u67F3\u5357\u533A","value":"450204"},{"text":"\u67F3\u5317\u533A","value":"450205"},{"text":"\u67F3\u6C5F\u53BF","value":"450221"},{"text":"\u67F3\u57CE\u53BF","value":"450222"},{"text":"\u9E7F\u5BE8\u53BF","value":"450223"},{"text":"\u878D\u5B89\u53BF","value":"450224"},{"text":"\u878D\u6C34\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"450225"},{"text":"\u4E09\u6C5F\u4F97\u65CF\u81EA\u6CBB\u53BF","value":"450226"}],"450300":[{"text":"\u5E02\u8F96\u533A","value":"450301"},{"text":"\u79C0\u5CF0\u533A","value":"450302"},{"text":"\u53E0\u5F69\u533A","value":"450303"},{"text":"\u8C61\u5C71\u533A","value":"450304"},{"text":"\u4E03\u661F\u533A","value":"450305"},{"text":"\u96C1\u5C71\u533A","value":"450311"},{"text":"\u4E34\u6842\u533A","value":"450312"},{"text":"\u9633\u6714\u53BF","value":"450321"},{"text":"\u7075\u5DDD\u53BF","value":"450323"},{"text":"\u5168\u5DDE\u53BF","value":"450324"},{"text":"\u5174\u5B89\u53BF","value":"450325"},{"text":"\u6C38\u798F\u53BF","value":"450326"},{"text":"\u704C\u9633\u53BF","value":"450327"},{"text":"\u9F99\u80DC\u5404\u65CF\u81EA\u6CBB\u53BF","value":"450328"},{"text":"\u8D44\u6E90\u53BF","value":"450329"},{"text":"\u5E73\u4E50\u53BF","value":"450330"},{"text":"\u8354\u6D66\u53BF","value":"450331"},{"text":"\u606D\u57CE\u7476\u65CF\u81EA\u6CBB\u53BF","value":"450332"}],"450400":[{"text":"\u5E02\u8F96\u533A","value":"450401"},{"text":"\u4E07\u79C0\u533A","value":"450403"},{"text":"\u957F\u6D32\u533A","value":"450405"},{"text":"\u9F99\u5729\u533A","value":"450406"},{"text":"\u82CD\u68A7\u53BF","value":"450421"},{"text":"\u85E4\u53BF","value":"450422"},{"text":"\u8499\u5C71\u53BF","value":"450423"},{"text":"\u5C91\u6EAA\u5E02","value":"450481"}],"450500":[{"text":"\u5E02\u8F96\u533A","value":"450501"},{"text":"\u6D77\u57CE\u533A","value":"450502"},{"text":"\u94F6\u6D77\u533A","value":"450503"},{"text":"\u94C1\u5C71\u6E2F\u533A","value":"450512"},{"text":"\u5408\u6D66\u53BF","value":"450521"}],"450600":[{"text":"\u5E02\u8F96\u533A","value":"450601"},{"text":"\u6E2F\u53E3\u533A","value":"450602"},{"text":"\u9632\u57CE\u533A","value":"450603"},{"text":"\u4E0A\u601D\u53BF","value":"450621"},{"text":"\u4E1C\u5174\u5E02","value":"450681"}],"450700":[{"text":"\u5E02\u8F96\u533A","value":"450701"},{"text":"\u94A6\u5357\u533A","value":"450702"},{"text":"\u94A6\u5317\u533A","value":"450703"},{"text":"\u7075\u5C71\u53BF","value":"450721"},{"text":"\u6D66\u5317\u53BF","value":"450722"}],"450800":[{"text":"\u5E02\u8F96\u533A","value":"450801"},{"text":"\u6E2F\u5317\u533A","value":"450802"},{"text":"\u6E2F\u5357\u533A","value":"450803"},{"text":"\u8983\u5858\u533A","value":"450804"},{"text":"\u5E73\u5357\u53BF","value":"450821"},{"text":"\u6842\u5E73\u5E02","value":"450881"}],"450900":[{"text":"\u5E02\u8F96\u533A","value":"450901"},{"text":"\u7389\u5DDE\u533A","value":"450902"},{"text":"\u798F\u7EF5\u533A","value":"450903"},{"text":"\u5BB9\u53BF","value":"450921"},{"text":"\u9646\u5DDD\u53BF","value":"450922"},{"text":"\u535A\u767D\u53BF","value":"450923"},{"text":"\u5174\u4E1A\u53BF","value":"450924"},{"text":"\u5317\u6D41\u5E02","value":"450981"}],"451000":[{"text":"\u5E02\u8F96\u533A","value":"451001"},{"text":"\u53F3\u6C5F\u533A","value":"451002"},{"text":"\u7530\u9633\u53BF","value":"451021"},{"text":"\u7530\u4E1C\u53BF","value":"451022"},{"text":"\u5E73\u679C\u53BF","value":"451023"},{"text":"\u5FB7\u4FDD\u53BF","value":"451024"},{"text":"\u9756\u897F\u53BF","value":"451025"},{"text":"\u90A3\u5761\u53BF","value":"451026"},{"text":"\u51CC\u4E91\u53BF","value":"451027"},{"text":"\u4E50\u4E1A\u53BF","value":"451028"},{"text":"\u7530\u6797\u53BF","value":"451029"},{"text":"\u897F\u6797\u53BF","value":"451030"},{"text":"\u9686\u6797\u5404\u65CF\u81EA\u6CBB\u53BF","value":"451031"}],"451100":[{"text":"\u5E02\u8F96\u533A","value":"451101"},{"text":"\u516B\u6B65\u533A","value":"451102"},{"text":"\u662D\u5E73\u53BF","value":"451121"},{"text":"\u949F\u5C71\u53BF","value":"451122"},{"text":"\u5BCC\u5DDD\u7476\u65CF\u81EA\u6CBB\u53BF","value":"451123"}],"451200":[{"text":"\u5E02\u8F96\u533A","value":"451201"},{"text":"\u91D1\u57CE\u6C5F\u533A","value":"451202"},{"text":"\u5357\u4E39\u53BF","value":"451221"},{"text":"\u5929\u5CE8\u53BF","value":"451222"},{"text":"\u51E4\u5C71\u53BF","value":"451223"},{"text":"\u4E1C\u5170\u53BF","value":"451224"},{"text":"\u7F57\u57CE\u4EEB\u4F6C\u65CF\u81EA\u6CBB\u53BF","value":"451225"},{"text":"\u73AF\u6C5F\u6BDB\u5357\u65CF\u81EA\u6CBB\u53BF","value":"451226"},{"text":"\u5DF4\u9A6C\u7476\u65CF\u81EA\u6CBB\u53BF","value":"451227"},{"text":"\u90FD\u5B89\u7476\u65CF\u81EA\u6CBB\u53BF","value":"451228"},{"text":"\u5927\u5316\u7476\u65CF\u81EA\u6CBB\u53BF","value":"451229"},{"text":"\u5B9C\u5DDE\u5E02","value":"451281"}],"451300":[{"text":"\u5E02\u8F96\u533A","value":"451301"},{"text":"\u5174\u5BBE\u533A","value":"451302"},{"text":"\u5FFB\u57CE\u53BF","value":"451321"},{"text":"\u8C61\u5DDE\u53BF","value":"451322"},{"text":"\u6B66\u5BA3\u53BF","value":"451323"},{"text":"\u91D1\u79C0\u7476\u65CF\u81EA\u6CBB\u53BF","value":"451324"},{"text":"\u5408\u5C71\u5E02","value":"451381"}],"451400":[{"text":"\u5E02\u8F96\u533A","value":"451401"},{"text":"\u6C5F\u5DDE\u533A","value":"451402"},{"text":"\u6276\u7EE5\u53BF","value":"451421"},{"text":"\u5B81\u660E\u53BF","value":"451422"},{"text":"\u9F99\u5DDE\u53BF","value":"451423"},{"text":"\u5927\u65B0\u53BF","value":"451424"},{"text":"\u5929\u7B49\u53BF","value":"451425"},{"text":"\u51ED\u7965\u5E02","value":"451481"}],"460100":[{"text":"\u5E02\u8F96\u533A","value":"460101"},{"text":"\u79C0\u82F1\u533A","value":"460105"},{"text":"\u9F99\u534E\u533A","value":"460106"},{"text":"\u743C\u5C71\u533A","value":"460107"},{"text":"\u7F8E\u5170\u533A","value":"460108"}],"460200":[{"text":"\u5E02\u8F96\u533A","value":"460201"}],"460300":[{"text":"\u897F\u6C99\u7FA4\u5C9B","value":"460321"},{"text":"\u5357\u6C99\u7FA4\u5C9B","value":"460322"},{"text":"\u4E2D\u6C99\u7FA4\u5C9B\u7684\u5C9B\u7901\u53CA\u5176\u6D77\u57DF","value":"460323"}],"469000":[{"text":"\u4E94\u6307\u5C71\u5E02","value":"469001"},{"text":"\u743C\u6D77\u5E02","value":"469002"},{"text":"\u510B\u5DDE\u5E02","value":"469003"},{"text":"\u6587\u660C\u5E02","value":"469005"},{"text":"\u4E07\u5B81\u5E02","value":"469006"},{"text":"\u4E1C\u65B9\u5E02","value":"469007"},{"text":"\u5B9A\u5B89\u53BF","value":"469021"},{"text":"\u5C6F\u660C\u53BF","value":"469022"},{"text":"\u6F84\u8FC8\u53BF","value":"469023"},{"text":"\u4E34\u9AD8\u53BF","value":"469024"},{"text":"\u767D\u6C99\u9ECE\u65CF\u81EA\u6CBB\u53BF","value":"469025"},{"text":"\u660C\u6C5F\u9ECE\u65CF\u81EA\u6CBB\u53BF","value":"469026"},{"text":"\u4E50\u4E1C\u9ECE\u65CF\u81EA\u6CBB\u53BF","value":"469027"},{"text":"\u9675\u6C34\u9ECE\u65CF\u81EA\u6CBB\u53BF","value":"469028"},{"text":"\u4FDD\u4EAD\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"469029"},{"text":"\u743C\u4E2D\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"469030"}],"500100":[{"text":"\u4E07\u5DDE\u533A","value":"500101"},{"text":"\u6DAA\u9675\u533A","value":"500102"},{"text":"\u6E1D\u4E2D\u533A","value":"500103"},{"text":"\u5927\u6E21\u53E3\u533A","value":"500104"},{"text":"\u6C5F\u5317\u533A","value":"500105"},{"text":"\u6C99\u576A\u575D\u533A","value":"500106"},{"text":"\u4E5D\u9F99\u5761\u533A","value":"500107"},{"text":"\u5357\u5CB8\u533A","value":"500108"},{"text":"\u5317\u789A\u533A","value":"500109"},{"text":"\u7DA6\u6C5F\u533A","value":"500110"},{"text":"\u5927\u8DB3\u533A","value":"500111"},{"text":"\u6E1D\u5317\u533A","value":"500112"},{"text":"\u5DF4\u5357\u533A","value":"500113"},{"text":"\u9ED4\u6C5F\u533A","value":"500114"},{"text":"\u957F\u5BFF\u533A","value":"500115"},{"text":"\u6C5F\u6D25\u533A","value":"500116"},{"text":"\u5408\u5DDD\u533A","value":"500117"},{"text":"\u6C38\u5DDD\u533A","value":"500118"},{"text":"\u5357\u5DDD\u533A","value":"500119"}],"500200":[{"text":"\u6F7C\u5357\u53BF","value":"500223"},{"text":"\u94DC\u6881\u53BF","value":"500224"},{"text":"\u8363\u660C\u53BF","value":"500226"},{"text":"\u74A7\u5C71\u53BF","value":"500227"},{"text":"\u6881\u5E73\u53BF","value":"500228"},{"text":"\u57CE\u53E3\u53BF","value":"500229"},{"text":"\u4E30\u90FD\u53BF","value":"500230"},{"text":"\u57AB\u6C5F\u53BF","value":"500231"},{"text":"\u6B66\u9686\u53BF","value":"500232"},{"text":"\u5FE0\u53BF","value":"500233"},{"text":"\u5F00\u53BF","value":"500234"},{"text":"\u4E91\u9633\u53BF","value":"500235"},{"text":"\u5949\u8282\u53BF","value":"500236"},{"text":"\u5DEB\u5C71\u53BF","value":"500237"},{"text":"\u5DEB\u6EAA\u53BF","value":"500238"},{"text":"\u77F3\u67F1\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF","value":"500240"},{"text":"\u79C0\u5C71\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"500241"},{"text":"\u9149\u9633\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"500242"},{"text":"\u5F6D\u6C34\u82D7\u65CF\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF","value":"500243"}],"510100":[{"text":"\u5E02\u8F96\u533A","value":"510101"},{"text":"\u9526\u6C5F\u533A","value":"510104"},{"text":"\u9752\u7F8A\u533A","value":"510105"},{"text":"\u91D1\u725B\u533A","value":"510106"},{"text":"\u6B66\u4FAF\u533A","value":"510107"},{"text":"\u6210\u534E\u533A","value":"510108"},{"text":"\u9F99\u6CC9\u9A7F\u533A","value":"510112"},{"text":"\u9752\u767D\u6C5F\u533A","value":"510113"},{"text":"\u65B0\u90FD\u533A","value":"510114"},{"text":"\u6E29\u6C5F\u533A","value":"510115"},{"text":"\u91D1\u5802\u53BF","value":"510121"},{"text":"\u53CC\u6D41\u53BF","value":"510122"},{"text":"\u90EB\u53BF","value":"510124"},{"text":"\u5927\u9091\u53BF","value":"510129"},{"text":"\u84B2\u6C5F\u53BF","value":"510131"},{"text":"\u65B0\u6D25\u53BF","value":"510132"},{"text":"\u90FD\u6C5F\u5830\u5E02","value":"510181"},{"text":"\u5F6D\u5DDE\u5E02","value":"510182"},{"text":"\u909B\u5D03\u5E02","value":"510183"},{"text":"\u5D07\u5DDE\u5E02","value":"510184"}],"510300":[{"text":"\u5E02\u8F96\u533A","value":"510301"},{"text":"\u81EA\u6D41\u4E95\u533A","value":"510302"},{"text":"\u8D21\u4E95\u533A","value":"510303"},{"text":"\u5927\u5B89\u533A","value":"510304"},{"text":"\u6CBF\u6EE9\u533A","value":"510311"},{"text":"\u8363\u53BF","value":"510321"},{"text":"\u5BCC\u987A\u53BF","value":"510322"}],"510400":[{"text":"\u5E02\u8F96\u533A","value":"510401"},{"text":"\u4E1C\u533A","value":"510402"},{"text":"\u897F\u533A","value":"510403"},{"text":"\u4EC1\u548C\u533A","value":"510411"},{"text":"\u7C73\u6613\u53BF","value":"510421"},{"text":"\u76D0\u8FB9\u53BF","value":"510422"}],"510500":[{"text":"\u5E02\u8F96\u533A","value":"510501"},{"text":"\u6C5F\u9633\u533A","value":"510502"},{"text":"\u7EB3\u6EAA\u533A","value":"510503"},{"text":"\u9F99\u9A6C\u6F6D\u533A","value":"510504"},{"text":"\u6CF8\u53BF","value":"510521"},{"text":"\u5408\u6C5F\u53BF","value":"510522"},{"text":"\u53D9\u6C38\u53BF","value":"510524"},{"text":"\u53E4\u853A\u53BF","value":"510525"}],"510600":[{"text":"\u5E02\u8F96\u533A","value":"510601"},{"text":"\u65CC\u9633\u533A","value":"510603"},{"text":"\u4E2D\u6C5F\u53BF","value":"510623"},{"text":"\u7F57\u6C5F\u53BF","value":"510626"},{"text":"\u5E7F\u6C49\u5E02","value":"510681"},{"text":"\u4EC0\u90A1\u5E02","value":"510682"},{"text":"\u7EF5\u7AF9\u5E02","value":"510683"}],"510700":[{"text":"\u5E02\u8F96\u533A","value":"510701"},{"text":"\u6DAA\u57CE\u533A","value":"510703"},{"text":"\u6E38\u4ED9\u533A","value":"510704"},{"text":"\u4E09\u53F0\u53BF","value":"510722"},{"text":"\u76D0\u4EAD\u53BF","value":"510723"},{"text":"\u5B89\u53BF","value":"510724"},{"text":"\u6893\u6F7C\u53BF","value":"510725"},{"text":"\u5317\u5DDD\u7F8C\u65CF\u81EA\u6CBB\u53BF","value":"510726"},{"text":"\u5E73\u6B66\u53BF","value":"510727"},{"text":"\u6C5F\u6CB9\u5E02","value":"510781"}],"510800":[{"text":"\u5E02\u8F96\u533A","value":"510801"},{"text":"\u5229\u5DDE\u533A","value":"510802"},{"text":"\u5143\u575D\u533A","value":"510811"},{"text":"\u671D\u5929\u533A","value":"510812"},{"text":"\u65FA\u82CD\u53BF","value":"510821"},{"text":"\u9752\u5DDD\u53BF","value":"510822"},{"text":"\u5251\u9601\u53BF","value":"510823"},{"text":"\u82CD\u6EAA\u53BF","value":"510824"}],"510900":[{"text":"\u5E02\u8F96\u533A","value":"510901"},{"text":"\u8239\u5C71\u533A","value":"510903"},{"text":"\u5B89\u5C45\u533A","value":"510904"},{"text":"\u84EC\u6EAA\u53BF","value":"510921"},{"text":"\u5C04\u6D2A\u53BF","value":"510922"},{"text":"\u5927\u82F1\u53BF","value":"510923"}],"511000":[{"text":"\u5E02\u8F96\u533A","value":"511001"},{"text":"\u5E02\u4E2D\u533A","value":"511002"},{"text":"\u4E1C\u5174\u533A","value":"511011"},{"text":"\u5A01\u8FDC\u53BF","value":"511024"},{"text":"\u8D44\u4E2D\u53BF","value":"511025"},{"text":"\u9686\u660C\u53BF","value":"511028"}],"511100":[{"text":"\u5E02\u8F96\u533A","value":"511101"},{"text":"\u5E02\u4E2D\u533A","value":"511102"},{"text":"\u6C99\u6E7E\u533A","value":"511111"},{"text":"\u4E94\u901A\u6865\u533A","value":"511112"},{"text":"\u91D1\u53E3\u6CB3\u533A","value":"511113"},{"text":"\u728D\u4E3A\u53BF","value":"511123"},{"text":"\u4E95\u7814\u53BF","value":"511124"},{"text":"\u5939\u6C5F\u53BF","value":"511126"},{"text":"\u6C90\u5DDD\u53BF","value":"511129"},{"text":"\u5CE8\u8FB9\u5F5D\u65CF\u81EA\u6CBB\u53BF","value":"511132"},{"text":"\u9A6C\u8FB9\u5F5D\u65CF\u81EA\u6CBB\u53BF","value":"511133"},{"text":"\u5CE8\u7709\u5C71\u5E02","value":"511181"}],"511300":[{"text":"\u5E02\u8F96\u533A","value":"511301"},{"text":"\u987A\u5E86\u533A","value":"511302"},{"text":"\u9AD8\u576A\u533A","value":"511303"},{"text":"\u5609\u9675\u533A","value":"511304"},{"text":"\u5357\u90E8\u53BF","value":"511321"},{"text":"\u8425\u5C71\u53BF","value":"511322"},{"text":"\u84EC\u5B89\u53BF","value":"511323"},{"text":"\u4EEA\u9647\u53BF","value":"511324"},{"text":"\u897F\u5145\u53BF","value":"511325"},{"text":"\u9606\u4E2D\u5E02","value":"511381"}],"511400":[{"text":"\u5E02\u8F96\u533A","value":"511401"},{"text":"\u4E1C\u5761\u533A","value":"511402"},{"text":"\u4EC1\u5BFF\u53BF","value":"511421"},{"text":"\u5F6D\u5C71\u53BF","value":"511422"},{"text":"\u6D2A\u96C5\u53BF","value":"511423"},{"text":"\u4E39\u68F1\u53BF","value":"511424"},{"text":"\u9752\u795E\u53BF","value":"511425"}],"511500":[{"text":"\u5E02\u8F96\u533A","value":"511501"},{"text":"\u7FE0\u5C4F\u533A","value":"511502"},{"text":"\u5357\u6EAA\u533A","value":"511503"},{"text":"\u5B9C\u5BBE\u53BF","value":"511521"},{"text":"\u6C5F\u5B89\u53BF","value":"511523"},{"text":"\u957F\u5B81\u53BF","value":"511524"},{"text":"\u9AD8\u53BF","value":"511525"},{"text":"\u73D9\u53BF","value":"511526"},{"text":"\u7B60\u8FDE\u53BF","value":"511527"},{"text":"\u5174\u6587\u53BF","value":"511528"},{"text":"\u5C4F\u5C71\u53BF","value":"511529"}],"511600":[{"text":"\u5E02\u8F96\u533A","value":"511601"},{"text":"\u5E7F\u5B89\u533A","value":"511602"},{"text":"\u524D\u950B\u533A","value":"511603"},{"text":"\u5CB3\u6C60\u53BF","value":"511621"},{"text":"\u6B66\u80DC\u53BF","value":"511622"},{"text":"\u90BB\u6C34\u53BF","value":"511623"},{"text":"\u534E\u84E5\u5E02","value":"511681"}],"511700":[{"text":"\u5E02\u8F96\u533A","value":"511701"},{"text":"\u901A\u5DDD\u533A","value":"511702"},{"text":"\u8FBE\u5DDD\u533A","value":"511703"},{"text":"\u5BA3\u6C49\u53BF","value":"511722"},{"text":"\u5F00\u6C5F\u53BF","value":"511723"},{"text":"\u5927\u7AF9\u53BF","value":"511724"},{"text":"\u6E20\u53BF","value":"511725"},{"text":"\u4E07\u6E90\u5E02","value":"511781"}],"511800":[{"text":"\u5E02\u8F96\u533A","value":"511801"},{"text":"\u96E8\u57CE\u533A","value":"511802"},{"text":"\u540D\u5C71\u533A","value":"511803"},{"text":"\u8365\u7ECF\u53BF","value":"511822"},{"text":"\u6C49\u6E90\u53BF","value":"511823"},{"text":"\u77F3\u68C9\u53BF","value":"511824"},{"text":"\u5929\u5168\u53BF","value":"511825"},{"text":"\u82A6\u5C71\u53BF","value":"511826"},{"text":"\u5B9D\u5174\u53BF","value":"511827"}],"511900":[{"text":"\u5E02\u8F96\u533A","value":"511901"},{"text":"\u5DF4\u5DDE\u533A","value":"511902"},{"text":"\u6069\u9633\u533A","value":"511903"},{"text":"\u901A\u6C5F\u53BF","value":"511921"},{"text":"\u5357\u6C5F\u53BF","value":"511922"},{"text":"\u5E73\u660C\u53BF","value":"511923"}],"512000":[{"text":"\u5E02\u8F96\u533A","value":"512001"},{"text":"\u96C1\u6C5F\u533A","value":"512002"},{"text":"\u5B89\u5CB3\u53BF","value":"512021"},{"text":"\u4E50\u81F3\u53BF","value":"512022"},{"text":"\u7B80\u9633\u5E02","value":"512081"}],"513200":[{"text":"\u6C76\u5DDD\u53BF","value":"513221"},{"text":"\u7406\u53BF","value":"513222"},{"text":"\u8302\u53BF","value":"513223"},{"text":"\u677E\u6F58\u53BF","value":"513224"},{"text":"\u4E5D\u5BE8\u6C9F\u53BF","value":"513225"},{"text":"\u91D1\u5DDD\u53BF","value":"513226"},{"text":"\u5C0F\u91D1\u53BF","value":"513227"},{"text":"\u9ED1\u6C34\u53BF","value":"513228"},{"text":"\u9A6C\u5C14\u5EB7\u53BF","value":"513229"},{"text":"\u58E4\u5858\u53BF","value":"513230"},{"text":"\u963F\u575D\u53BF","value":"513231"},{"text":"\u82E5\u5C14\u76D6\u53BF","value":"513232"},{"text":"\u7EA2\u539F\u53BF","value":"513233"}],"513300":[{"text":"\u5EB7\u5B9A\u53BF","value":"513321"},{"text":"\u6CF8\u5B9A\u53BF","value":"513322"},{"text":"\u4E39\u5DF4\u53BF","value":"513323"},{"text":"\u4E5D\u9F99\u53BF","value":"513324"},{"text":"\u96C5\u6C5F\u53BF","value":"513325"},{"text":"\u9053\u5B5A\u53BF","value":"513326"},{"text":"\u7089\u970D\u53BF","value":"513327"},{"text":"\u7518\u5B5C\u53BF","value":"513328"},{"text":"\u65B0\u9F99\u53BF","value":"513329"},{"text":"\u5FB7\u683C\u53BF","value":"513330"},{"text":"\u767D\u7389\u53BF","value":"513331"},{"text":"\u77F3\u6E20\u53BF","value":"513332"},{"text":"\u8272\u8FBE\u53BF","value":"513333"},{"text":"\u7406\u5858\u53BF","value":"513334"},{"text":"\u5DF4\u5858\u53BF","value":"513335"},{"text":"\u4E61\u57CE\u53BF","value":"513336"},{"text":"\u7A3B\u57CE\u53BF","value":"513337"},{"text":"\u5F97\u8363\u53BF","value":"513338"}],"513400":[{"text":"\u897F\u660C\u5E02","value":"513401"},{"text":"\u6728\u91CC\u85CF\u65CF\u81EA\u6CBB\u53BF","value":"513422"},{"text":"\u76D0\u6E90\u53BF","value":"513423"},{"text":"\u5FB7\u660C\u53BF","value":"513424"},{"text":"\u4F1A\u7406\u53BF","value":"513425"},{"text":"\u4F1A\u4E1C\u53BF","value":"513426"},{"text":"\u5B81\u5357\u53BF","value":"513427"},{"text":"\u666E\u683C\u53BF","value":"513428"},{"text":"\u5E03\u62D6\u53BF","value":"513429"},{"text":"\u91D1\u9633\u53BF","value":"513430"},{"text":"\u662D\u89C9\u53BF","value":"513431"},{"text":"\u559C\u5FB7\u53BF","value":"513432"},{"text":"\u5195\u5B81\u53BF","value":"513433"},{"text":"\u8D8A\u897F\u53BF","value":"513434"},{"text":"\u7518\u6D1B\u53BF","value":"513435"},{"text":"\u7F8E\u59D1\u53BF","value":"513436"},{"text":"\u96F7\u6CE2\u53BF","value":"513437"}],"520100":[{"text":"\u5E02\u8F96\u533A","value":"520101"},{"text":"\u5357\u660E\u533A","value":"520102"},{"text":"\u4E91\u5CA9\u533A","value":"520103"},{"text":"\u82B1\u6EAA\u533A","value":"520111"},{"text":"\u4E4C\u5F53\u533A","value":"520112"},{"text":"\u767D\u4E91\u533A","value":"520113"},{"text":"\u89C2\u5C71\u6E56\u533A","value":"520115"},{"text":"\u5F00\u9633\u53BF","value":"520121"},{"text":"\u606F\u70FD\u53BF","value":"520122"},{"text":"\u4FEE\u6587\u53BF","value":"520123"},{"text":"\u6E05\u9547\u5E02","value":"520181"}],"520200":[{"text":"\u949F\u5C71\u533A","value":"520201"},{"text":"\u516D\u679D\u7279\u533A","value":"520203"},{"text":"\u6C34\u57CE\u53BF","value":"520221"},{"text":"\u76D8\u53BF","value":"520222"}],"520300":[{"text":"\u5E02\u8F96\u533A","value":"520301"},{"text":"\u7EA2\u82B1\u5C97\u533A","value":"520302"},{"text":"\u6C47\u5DDD\u533A","value":"520303"},{"text":"\u9075\u4E49\u53BF","value":"520321"},{"text":"\u6850\u6893\u53BF","value":"520322"},{"text":"\u7EE5\u9633\u53BF","value":"520323"},{"text":"\u6B63\u5B89\u53BF","value":"520324"},{"text":"\u9053\u771F\u4EE1\u4F6C\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"520325"},{"text":"\u52A1\u5DDD\u4EE1\u4F6C\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"520326"},{"text":"\u51E4\u5188\u53BF","value":"520327"},{"text":"\u6E44\u6F6D\u53BF","value":"520328"},{"text":"\u4F59\u5E86\u53BF","value":"520329"},{"text":"\u4E60\u6C34\u53BF","value":"520330"},{"text":"\u8D64\u6C34\u5E02","value":"520381"},{"text":"\u4EC1\u6000\u5E02","value":"520382"}],"520400":[{"text":"\u5E02\u8F96\u533A","value":"520401"},{"text":"\u897F\u79C0\u533A","value":"520402"},{"text":"\u5E73\u575D\u53BF","value":"520421"},{"text":"\u666E\u5B9A\u53BF","value":"520422"},{"text":"\u9547\u5B81\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"520423"},{"text":"\u5173\u5CAD\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"520424"},{"text":"\u7D2B\u4E91\u82D7\u65CF\u5E03\u4F9D\u65CF\u81EA\u6CBB\u53BF","value":"520425"}],"520500":[{"text":"\u5E02\u8F96\u533A","value":"520501"},{"text":"\u4E03\u661F\u5173\u533A","value":"520502"},{"text":"\u5927\u65B9\u53BF","value":"520521"},{"text":"\u9ED4\u897F\u53BF","value":"520522"},{"text":"\u91D1\u6C99\u53BF","value":"520523"},{"text":"\u7EC7\u91D1\u53BF","value":"520524"},{"text":"\u7EB3\u96CD\u53BF","value":"520525"},{"text":"\u5A01\u5B81\u5F5D\u65CF\u56DE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"520526"},{"text":"\u8D6B\u7AE0\u53BF","value":"520527"}],"520600":[{"text":"\u5E02\u8F96\u533A","value":"520601"},{"text":"\u78A7\u6C5F\u533A","value":"520602"},{"text":"\u4E07\u5C71\u533A","value":"520603"},{"text":"\u6C5F\u53E3\u53BF","value":"520621"},{"text":"\u7389\u5C4F\u4F97\u65CF\u81EA\u6CBB\u53BF","value":"520622"},{"text":"\u77F3\u9621\u53BF","value":"520623"},{"text":"\u601D\u5357\u53BF","value":"520624"},{"text":"\u5370\u6C5F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"520625"},{"text":"\u5FB7\u6C5F\u53BF","value":"520626"},{"text":"\u6CBF\u6CB3\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF","value":"520627"},{"text":"\u677E\u6843\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"520628"}],"522300":[{"text":"\u5174\u4E49\u5E02","value":"522301"},{"text":"\u5174\u4EC1\u53BF","value":"522322"},{"text":"\u666E\u5B89\u53BF","value":"522323"},{"text":"\u6674\u9686\u53BF","value":"522324"},{"text":"\u8D1E\u4E30\u53BF","value":"522325"},{"text":"\u671B\u8C1F\u53BF","value":"522326"},{"text":"\u518C\u4EA8\u53BF","value":"522327"},{"text":"\u5B89\u9F99\u53BF","value":"522328"}],"522600":[{"text":"\u51EF\u91CC\u5E02","value":"522601"},{"text":"\u9EC4\u5E73\u53BF","value":"522622"},{"text":"\u65BD\u79C9\u53BF","value":"522623"},{"text":"\u4E09\u7A57\u53BF","value":"522624"},{"text":"\u9547\u8FDC\u53BF","value":"522625"},{"text":"\u5C91\u5DE9\u53BF","value":"522626"},{"text":"\u5929\u67F1\u53BF","value":"522627"},{"text":"\u9526\u5C4F\u53BF","value":"522628"},{"text":"\u5251\u6CB3\u53BF","value":"522629"},{"text":"\u53F0\u6C5F\u53BF","value":"522630"},{"text":"\u9ECE\u5E73\u53BF","value":"522631"},{"text":"\u6995\u6C5F\u53BF","value":"522632"},{"text":"\u4ECE\u6C5F\u53BF","value":"522633"},{"text":"\u96F7\u5C71\u53BF","value":"522634"},{"text":"\u9EBB\u6C5F\u53BF","value":"522635"},{"text":"\u4E39\u5BE8\u53BF","value":"522636"}],"522700":[{"text":"\u90FD\u5300\u5E02","value":"522701"},{"text":"\u798F\u6CC9\u5E02","value":"522702"},{"text":"\u8354\u6CE2\u53BF","value":"522722"},{"text":"\u8D35\u5B9A\u53BF","value":"522723"},{"text":"\u74EE\u5B89\u53BF","value":"522725"},{"text":"\u72EC\u5C71\u53BF","value":"522726"},{"text":"\u5E73\u5858\u53BF","value":"522727"},{"text":"\u7F57\u7538\u53BF","value":"522728"},{"text":"\u957F\u987A\u53BF","value":"522729"},{"text":"\u9F99\u91CC\u53BF","value":"522730"},{"text":"\u60E0\u6C34\u53BF","value":"522731"},{"text":"\u4E09\u90FD\u6C34\u65CF\u81EA\u6CBB\u53BF","value":"522732"}],"530100":[{"text":"\u5E02\u8F96\u533A","value":"530101"},{"text":"\u4E94\u534E\u533A","value":"530102"},{"text":"\u76D8\u9F99\u533A","value":"530103"},{"text":"\u5B98\u6E21\u533A","value":"530111"},{"text":"\u897F\u5C71\u533A","value":"530112"},{"text":"\u4E1C\u5DDD\u533A","value":"530113"},{"text":"\u5448\u8D21\u533A","value":"530114"},{"text":"\u664B\u5B81\u53BF","value":"530122"},{"text":"\u5BCC\u6C11\u53BF","value":"530124"},{"text":"\u5B9C\u826F\u53BF","value":"530125"},{"text":"\u77F3\u6797\u5F5D\u65CF\u81EA\u6CBB\u53BF","value":"530126"},{"text":"\u5D69\u660E\u53BF","value":"530127"},{"text":"\u7984\u529D\u5F5D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"530128"},{"text":"\u5BFB\u7538\u56DE\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF","value":"530129"},{"text":"\u5B89\u5B81\u5E02","value":"530181"}],"530300":[{"text":"\u5E02\u8F96\u533A","value":"530301"},{"text":"\u9E92\u9E9F\u533A","value":"530302"},{"text":"\u9A6C\u9F99\u53BF","value":"530321"},{"text":"\u9646\u826F\u53BF","value":"530322"},{"text":"\u5E08\u5B97\u53BF","value":"530323"},{"text":"\u7F57\u5E73\u53BF","value":"530324"},{"text":"\u5BCC\u6E90\u53BF","value":"530325"},{"text":"\u4F1A\u6CFD\u53BF","value":"530326"},{"text":"\u6CBE\u76CA\u53BF","value":"530328"},{"text":"\u5BA3\u5A01\u5E02","value":"530381"}],"530400":[{"text":"\u5E02\u8F96\u533A","value":"530401"},{"text":"\u7EA2\u5854\u533A","value":"530402"},{"text":"\u6C5F\u5DDD\u53BF","value":"530421"},{"text":"\u6F84\u6C5F\u53BF","value":"530422"},{"text":"\u901A\u6D77\u53BF","value":"530423"},{"text":"\u534E\u5B81\u53BF","value":"530424"},{"text":"\u6613\u95E8\u53BF","value":"530425"},{"text":"\u5CE8\u5C71\u5F5D\u65CF\u81EA\u6CBB\u53BF","value":"530426"},{"text":"\u65B0\u5E73\u5F5D\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF","value":"530427"},{"text":"\u5143\u6C5F\u54C8\u5C3C\u65CF\u5F5D\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF","value":"530428"}],"530500":[{"text":"\u5E02\u8F96\u533A","value":"530501"},{"text":"\u9686\u9633\u533A","value":"530502"},{"text":"\u65BD\u7538\u53BF","value":"530521"},{"text":"\u817E\u51B2\u53BF","value":"530522"},{"text":"\u9F99\u9675\u53BF","value":"530523"},{"text":"\u660C\u5B81\u53BF","value":"530524"}],"530600":[{"text":"\u5E02\u8F96\u533A","value":"530601"},{"text":"\u662D\u9633\u533A","value":"530602"},{"text":"\u9C81\u7538\u53BF","value":"530621"},{"text":"\u5DE7\u5BB6\u53BF","value":"530622"},{"text":"\u76D0\u6D25\u53BF","value":"530623"},{"text":"\u5927\u5173\u53BF","value":"530624"},{"text":"\u6C38\u5584\u53BF","value":"530625"},{"text":"\u7EE5\u6C5F\u53BF","value":"530626"},{"text":"\u9547\u96C4\u53BF","value":"530627"},{"text":"\u5F5D\u826F\u53BF","value":"530628"},{"text":"\u5A01\u4FE1\u53BF","value":"530629"},{"text":"\u6C34\u5BCC\u53BF","value":"530630"}],"530700":[{"text":"\u5E02\u8F96\u533A","value":"530701"},{"text":"\u53E4\u57CE\u533A","value":"530702"},{"text":"\u7389\u9F99\u7EB3\u897F\u65CF\u81EA\u6CBB\u53BF","value":"530721"},{"text":"\u6C38\u80DC\u53BF","value":"530722"},{"text":"\u534E\u576A\u53BF","value":"530723"},{"text":"\u5B81\u8497\u5F5D\u65CF\u81EA\u6CBB\u53BF","value":"530724"}],"530800":[{"text":"\u5E02\u8F96\u533A","value":"530801"},{"text":"\u601D\u8305\u533A","value":"530802"},{"text":"\u5B81\u6D31\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF","value":"530821"},{"text":"\u58A8\u6C5F\u54C8\u5C3C\u65CF\u81EA\u6CBB\u53BF","value":"530822"},{"text":"\u666F\u4E1C\u5F5D\u65CF\u81EA\u6CBB\u53BF","value":"530823"},{"text":"\u666F\u8C37\u50A3\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF","value":"530824"},{"text":"\u9547\u6C85\u5F5D\u65CF\u54C8\u5C3C\u65CF\u62C9\u795C\u65CF\u81EA\u6CBB\u53BF","value":"530825"},{"text":"\u6C5F\u57CE\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF","value":"530826"},{"text":"\u5B5F\u8FDE\u50A3\u65CF\u62C9\u795C\u65CF\u4F64\u65CF\u81EA\u6CBB\u53BF","value":"530827"},{"text":"\u6F9C\u6CA7\u62C9\u795C\u65CF\u81EA\u6CBB\u53BF","value":"530828"},{"text":"\u897F\u76DF\u4F64\u65CF\u81EA\u6CBB\u53BF","value":"530829"}],"530900":[{"text":"\u5E02\u8F96\u533A","value":"530901"},{"text":"\u4E34\u7FD4\u533A","value":"530902"},{"text":"\u51E4\u5E86\u53BF","value":"530921"},{"text":"\u4E91\u53BF","value":"530922"},{"text":"\u6C38\u5FB7\u53BF","value":"530923"},{"text":"\u9547\u5EB7\u53BF","value":"530924"},{"text":"\u53CC\u6C5F\u62C9\u795C\u65CF\u4F64\u65CF\u5E03\u6717\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF","value":"530925"},{"text":"\u803F\u9A6C\u50A3\u65CF\u4F64\u65CF\u81EA\u6CBB\u53BF","value":"530926"},{"text":"\u6CA7\u6E90\u4F64\u65CF\u81EA\u6CBB\u53BF","value":"530927"}],"532300":[{"text":"\u695A\u96C4\u5E02","value":"532301"},{"text":"\u53CC\u67CF\u53BF","value":"532322"},{"text":"\u725F\u5B9A\u53BF","value":"532323"},{"text":"\u5357\u534E\u53BF","value":"532324"},{"text":"\u59DA\u5B89\u53BF","value":"532325"},{"text":"\u5927\u59DA\u53BF","value":"532326"},{"text":"\u6C38\u4EC1\u53BF","value":"532327"},{"text":"\u5143\u8C0B\u53BF","value":"532328"},{"text":"\u6B66\u5B9A\u53BF","value":"532329"},{"text":"\u7984\u4E30\u53BF","value":"532331"}],"532500":[{"text":"\u4E2A\u65E7\u5E02","value":"532501"},{"text":"\u5F00\u8FDC\u5E02","value":"532502"},{"text":"\u8499\u81EA\u5E02","value":"532503"},{"text":"\u5F25\u52D2\u5E02","value":"532504"},{"text":"\u5C4F\u8FB9\u82D7\u65CF\u81EA\u6CBB\u53BF","value":"532523"},{"text":"\u5EFA\u6C34\u53BF","value":"532524"},{"text":"\u77F3\u5C4F\u53BF","value":"532525"},{"text":"\u6CF8\u897F\u53BF","value":"532527"},{"text":"\u5143\u9633\u53BF","value":"532528"},{"text":"\u7EA2\u6CB3\u53BF","value":"532529"},{"text":"\u91D1\u5E73\u82D7\u65CF\u7476\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF","value":"532530"},{"text":"\u7EFF\u6625\u53BF","value":"532531"},{"text":"\u6CB3\u53E3\u7476\u65CF\u81EA\u6CBB\u53BF","value":"532532"}],"532600":[{"text":"\u6587\u5C71\u5E02","value":"532601"},{"text":"\u781A\u5C71\u53BF","value":"532622"},{"text":"\u897F\u7574\u53BF","value":"532623"},{"text":"\u9EBB\u6817\u5761\u53BF","value":"532624"},{"text":"\u9A6C\u5173\u53BF","value":"532625"},{"text":"\u4E18\u5317\u53BF","value":"532626"},{"text":"\u5E7F\u5357\u53BF","value":"532627"},{"text":"\u5BCC\u5B81\u53BF","value":"532628"}],"532800":[{"text":"\u666F\u6D2A\u5E02","value":"532801"},{"text":"\u52D0\u6D77\u53BF","value":"532822"},{"text":"\u52D0\u814A\u53BF","value":"532823"}],"532900":[{"text":"\u5927\u7406\u5E02","value":"532901"},{"text":"\u6F3E\u6FDE\u5F5D\u65CF\u81EA\u6CBB\u53BF","value":"532922"},{"text":"\u7965\u4E91\u53BF","value":"532923"},{"text":"\u5BBE\u5DDD\u53BF","value":"532924"},{"text":"\u5F25\u6E21\u53BF","value":"532925"},{"text":"\u5357\u6DA7\u5F5D\u65CF\u81EA\u6CBB\u53BF","value":"532926"},{"text":"\u5DCD\u5C71\u5F5D\u65CF\u56DE\u65CF\u81EA\u6CBB\u53BF","value":"532927"},{"text":"\u6C38\u5E73\u53BF","value":"532928"},{"text":"\u4E91\u9F99\u53BF","value":"532929"},{"text":"\u6D31\u6E90\u53BF","value":"532930"},{"text":"\u5251\u5DDD\u53BF","value":"532931"},{"text":"\u9E64\u5E86\u53BF","value":"532932"}],"533100":[{"text":"\u745E\u4E3D\u5E02","value":"533102"},{"text":"\u8292\u5E02","value":"533103"},{"text":"\u6881\u6CB3\u53BF","value":"533122"},{"text":"\u76C8\u6C5F\u53BF","value":"533123"},{"text":"\u9647\u5DDD\u53BF","value":"533124"}],"533300":[{"text":"\u6CF8\u6C34\u53BF","value":"533321"},{"text":"\u798F\u8D21\u53BF","value":"533323"},{"text":"\u8D21\u5C71\u72EC\u9F99\u65CF\u6012\u65CF\u81EA\u6CBB\u53BF","value":"533324"},{"text":"\u5170\u576A\u767D\u65CF\u666E\u7C73\u65CF\u81EA\u6CBB\u53BF","value":"533325"}],"533400":[{"text":"\u9999\u683C\u91CC\u62C9\u53BF","value":"533421"},{"text":"\u5FB7\u94A6\u53BF","value":"533422"},{"text":"\u7EF4\u897F\u5088\u50F3\u65CF\u81EA\u6CBB\u53BF","value":"533423"}],"540100":[{"text":"\u5E02\u8F96\u533A","value":"540101"},{"text":"\u57CE\u5173\u533A","value":"540102"},{"text":"\u6797\u5468\u53BF","value":"540121"},{"text":"\u5F53\u96C4\u53BF","value":"540122"},{"text":"\u5C3C\u6728\u53BF","value":"540123"},{"text":"\u66F2\u6C34\u53BF","value":"540124"},{"text":"\u5806\u9F99\u5FB7\u5E86\u53BF","value":"540125"},{"text":"\u8FBE\u5B5C\u53BF","value":"540126"},{"text":"\u58A8\u7AF9\u5DE5\u5361\u53BF","value":"540127"}],"542100":[{"text":"\u660C\u90FD\u53BF","value":"542121"},{"text":"\u6C5F\u8FBE\u53BF","value":"542122"},{"text":"\u8D21\u89C9\u53BF","value":"542123"},{"text":"\u7C7B\u4E4C\u9F50\u53BF","value":"542124"},{"text":"\u4E01\u9752\u53BF","value":"542125"},{"text":"\u5BDF\u96C5\u53BF","value":"542126"},{"text":"\u516B\u5BBF\u53BF","value":"542127"},{"text":"\u5DE6\u8D21\u53BF","value":"542128"},{"text":"\u8292\u5EB7\u53BF","value":"542129"},{"text":"\u6D1B\u9686\u53BF","value":"542132"},{"text":"\u8FB9\u575D\u53BF","value":"542133"}],"542200":[{"text":"\u4E43\u4E1C\u53BF","value":"542221"},{"text":"\u624E\u56CA\u53BF","value":"542222"},{"text":"\u8D21\u560E\u53BF","value":"542223"},{"text":"\u6851\u65E5\u53BF","value":"542224"},{"text":"\u743C\u7ED3\u53BF","value":"542225"},{"text":"\u66F2\u677E\u53BF","value":"542226"},{"text":"\u63AA\u7F8E\u53BF","value":"542227"},{"text":"\u6D1B\u624E\u53BF","value":"542228"},{"text":"\u52A0\u67E5\u53BF","value":"542229"},{"text":"\u9686\u5B50\u53BF","value":"542231"},{"text":"\u9519\u90A3\u53BF","value":"542232"},{"text":"\u6D6A\u5361\u5B50\u53BF","value":"542233"}],"542300":[{"text":"\u65E5\u5580\u5219\u5E02","value":"542301"},{"text":"\u5357\u6728\u6797\u53BF","value":"542322"},{"text":"\u6C5F\u5B5C\u53BF","value":"542323"},{"text":"\u5B9A\u65E5\u53BF","value":"542324"},{"text":"\u8428\u8FE6\u53BF","value":"542325"},{"text":"\u62C9\u5B5C\u53BF","value":"542326"},{"text":"\u6602\u4EC1\u53BF","value":"542327"},{"text":"\u8C22\u901A\u95E8\u53BF","value":"542328"},{"text":"\u767D\u6717\u53BF","value":"542329"},{"text":"\u4EC1\u5E03\u53BF","value":"542330"},{"text":"\u5EB7\u9A6C\u53BF","value":"542331"},{"text":"\u5B9A\u7ED3\u53BF","value":"542332"},{"text":"\u4EF2\u5DF4\u53BF","value":"542333"},{"text":"\u4E9A\u4E1C\u53BF","value":"542334"},{"text":"\u5409\u9686\u53BF","value":"542335"},{"text":"\u8042\u62C9\u6728\u53BF","value":"542336"},{"text":"\u8428\u560E\u53BF","value":"542337"},{"text":"\u5C97\u5DF4\u53BF","value":"542338"}],"542400":[{"text":"\u90A3\u66F2\u53BF","value":"542421"},{"text":"\u5609\u9ECE\u53BF","value":"542422"},{"text":"\u6BD4\u5982\u53BF","value":"542423"},{"text":"\u8042\u8363\u53BF","value":"542424"},{"text":"\u5B89\u591A\u53BF","value":"542425"},{"text":"\u7533\u624E\u53BF","value":"542426"},{"text":"\u7D22\u53BF","value":"542427"},{"text":"\u73ED\u6208\u53BF","value":"542428"},{"text":"\u5DF4\u9752\u53BF","value":"542429"},{"text":"\u5C3C\u739B\u53BF","value":"542430"},{"text":"\u53CC\u6E56\u53BF","value":"542431"}],"542500":[{"text":"\u666E\u5170\u53BF","value":"542521"},{"text":"\u672D\u8FBE\u53BF","value":"542522"},{"text":"\u5676\u5C14\u53BF","value":"542523"},{"text":"\u65E5\u571F\u53BF","value":"542524"},{"text":"\u9769\u5409\u53BF","value":"542525"},{"text":"\u6539\u5219\u53BF","value":"542526"},{"text":"\u63AA\u52E4\u53BF","value":"542527"}],"542600":[{"text":"\u6797\u829D\u53BF","value":"542621"},{"text":"\u5DE5\u5E03\u6C5F\u8FBE\u53BF","value":"542622"},{"text":"\u7C73\u6797\u53BF","value":"542623"},{"text":"\u58A8\u8131\u53BF","value":"542624"},{"text":"\u6CE2\u5BC6\u53BF","value":"542625"},{"text":"\u5BDF\u9685\u53BF","value":"542626"},{"text":"\u6717\u53BF","value":"542627"}],"610100":[{"text":"\u5E02\u8F96\u533A","value":"610101"},{"text":"\u65B0\u57CE\u533A","value":"610102"},{"text":"\u7891\u6797\u533A","value":"610103"},{"text":"\u83B2\u6E56\u533A","value":"610104"},{"text":"\u705E\u6865\u533A","value":"610111"},{"text":"\u672A\u592E\u533A","value":"610112"},{"text":"\u96C1\u5854\u533A","value":"610113"},{"text":"\u960E\u826F\u533A","value":"610114"},{"text":"\u4E34\u6F7C\u533A","value":"610115"},{"text":"\u957F\u5B89\u533A","value":"610116"},{"text":"\u84DD\u7530\u53BF","value":"610122"},{"text":"\u5468\u81F3\u53BF","value":"610124"},{"text":"\u6237\u53BF","value":"610125"},{"text":"\u9AD8\u9675\u53BF","value":"610126"}],"610200":[{"text":"\u5E02\u8F96\u533A","value":"610201"},{"text":"\u738B\u76CA\u533A","value":"610202"},{"text":"\u5370\u53F0\u533A","value":"610203"},{"text":"\u8000\u5DDE\u533A","value":"610204"},{"text":"\u5B9C\u541B\u53BF","value":"610222"}],"610300":[{"text":"\u5E02\u8F96\u533A","value":"610301"},{"text":"\u6E2D\u6EE8\u533A","value":"610302"},{"text":"\u91D1\u53F0\u533A","value":"610303"},{"text":"\u9648\u4ED3\u533A","value":"610304"},{"text":"\u51E4\u7FD4\u53BF","value":"610322"},{"text":"\u5C90\u5C71\u53BF","value":"610323"},{"text":"\u6276\u98CE\u53BF","value":"610324"},{"text":"\u7709\u53BF","value":"610326"},{"text":"\u9647\u53BF","value":"610327"},{"text":"\u5343\u9633\u53BF","value":"610328"},{"text":"\u9E9F\u6E38\u53BF","value":"610329"},{"text":"\u51E4\u53BF","value":"610330"},{"text":"\u592A\u767D\u53BF","value":"610331"}],"610400":[{"text":"\u5E02\u8F96\u533A","value":"610401"},{"text":"\u79E6\u90FD\u533A","value":"610402"},{"text":"\u6768\u9675\u533A","value":"610403"},{"text":"\u6E2D\u57CE\u533A","value":"610404"},{"text":"\u4E09\u539F\u53BF","value":"610422"},{"text":"\u6CFE\u9633\u53BF","value":"610423"},{"text":"\u4E7E\u53BF","value":"610424"},{"text":"\u793C\u6CC9\u53BF","value":"610425"},{"text":"\u6C38\u5BFF\u53BF","value":"610426"},{"text":"\u5F6C\u53BF","value":"610427"},{"text":"\u957F\u6B66\u53BF","value":"610428"},{"text":"\u65EC\u9091\u53BF","value":"610429"},{"text":"\u6DF3\u5316\u53BF","value":"610430"},{"text":"\u6B66\u529F\u53BF","value":"610431"},{"text":"\u5174\u5E73\u5E02","value":"610481"}],"610500":[{"text":"\u5E02\u8F96\u533A","value":"610501"},{"text":"\u4E34\u6E2D\u533A","value":"610502"},{"text":"\u534E\u53BF","value":"610521"},{"text":"\u6F7C\u5173\u53BF","value":"610522"},{"text":"\u5927\u8354\u53BF","value":"610523"},{"text":"\u5408\u9633\u53BF","value":"610524"},{"text":"\u6F84\u57CE\u53BF","value":"610525"},{"text":"\u84B2\u57CE\u53BF","value":"610526"},{"text":"\u767D\u6C34\u53BF","value":"610527"},{"text":"\u5BCC\u5E73\u53BF","value":"610528"},{"text":"\u97E9\u57CE\u5E02","value":"610581"},{"text":"\u534E\u9634\u5E02","value":"610582"}],"610600":[{"text":"\u5E02\u8F96\u533A","value":"610601"},{"text":"\u5B9D\u5854\u533A","value":"610602"},{"text":"\u5EF6\u957F\u53BF","value":"610621"},{"text":"\u5EF6\u5DDD\u53BF","value":"610622"},{"text":"\u5B50\u957F\u53BF","value":"610623"},{"text":"\u5B89\u585E\u53BF","value":"610624"},{"text":"\u5FD7\u4E39\u53BF","value":"610625"},{"text":"\u5434\u8D77\u53BF","value":"610626"},{"text":"\u7518\u6CC9\u53BF","value":"610627"},{"text":"\u5BCC\u53BF","value":"610628"},{"text":"\u6D1B\u5DDD\u53BF","value":"610629"},{"text":"\u5B9C\u5DDD\u53BF","value":"610630"},{"text":"\u9EC4\u9F99\u53BF","value":"610631"},{"text":"\u9EC4\u9675\u53BF","value":"610632"}],"610700":[{"text":"\u5E02\u8F96\u533A","value":"610701"},{"text":"\u6C49\u53F0\u533A","value":"610702"},{"text":"\u5357\u90D1\u53BF","value":"610721"},{"text":"\u57CE\u56FA\u53BF","value":"610722"},{"text":"\u6D0B\u53BF","value":"610723"},{"text":"\u897F\u4E61\u53BF","value":"610724"},{"text":"\u52C9\u53BF","value":"610725"},{"text":"\u5B81\u5F3A\u53BF","value":"610726"},{"text":"\u7565\u9633\u53BF","value":"610727"},{"text":"\u9547\u5DF4\u53BF","value":"610728"},{"text":"\u7559\u575D\u53BF","value":"610729"},{"text":"\u4F5B\u576A\u53BF","value":"610730"}],"610800":[{"text":"\u5E02\u8F96\u533A","value":"610801"},{"text":"\u6986\u9633\u533A","value":"610802"},{"text":"\u795E\u6728\u53BF","value":"610821"},{"text":"\u5E9C\u8C37\u53BF","value":"610822"},{"text":"\u6A2A\u5C71\u53BF","value":"610823"},{"text":"\u9756\u8FB9\u53BF","value":"610824"},{"text":"\u5B9A\u8FB9\u53BF","value":"610825"},{"text":"\u7EE5\u5FB7\u53BF","value":"610826"},{"text":"\u7C73\u8102\u53BF","value":"610827"},{"text":"\u4F73\u53BF","value":"610828"},{"text":"\u5434\u5821\u53BF","value":"610829"},{"text":"\u6E05\u6DA7\u53BF","value":"610830"},{"text":"\u5B50\u6D32\u53BF","value":"610831"}],"610900":[{"text":"\u5E02\u8F96\u533A","value":"610901"},{"text":"\u6C49\u6EE8\u533A","value":"610902"},{"text":"\u6C49\u9634\u53BF","value":"610921"},{"text":"\u77F3\u6CC9\u53BF","value":"610922"},{"text":"\u5B81\u9655\u53BF","value":"610923"},{"text":"\u7D2B\u9633\u53BF","value":"610924"},{"text":"\u5C9A\u768B\u53BF","value":"610925"},{"text":"\u5E73\u5229\u53BF","value":"610926"},{"text":"\u9547\u576A\u53BF","value":"610927"},{"text":"\u65EC\u9633\u53BF","value":"610928"},{"text":"\u767D\u6CB3\u53BF","value":"610929"}],"611000":[{"text":"\u5E02\u8F96\u533A","value":"611001"},{"text":"\u5546\u5DDE\u533A","value":"611002"},{"text":"\u6D1B\u5357\u53BF","value":"611021"},{"text":"\u4E39\u51E4\u53BF","value":"611022"},{"text":"\u5546\u5357\u53BF","value":"611023"},{"text":"\u5C71\u9633\u53BF","value":"611024"},{"text":"\u9547\u5B89\u53BF","value":"611025"},{"text":"\u67DE\u6C34\u53BF","value":"611026"}],"620100":[{"text":"\u5E02\u8F96\u533A","value":"620101"},{"text":"\u57CE\u5173\u533A","value":"620102"},{"text":"\u4E03\u91CC\u6CB3\u533A","value":"620103"},{"text":"\u897F\u56FA\u533A","value":"620104"},{"text":"\u5B89\u5B81\u533A","value":"620105"},{"text":"\u7EA2\u53E4\u533A","value":"620111"},{"text":"\u6C38\u767B\u53BF","value":"620121"},{"text":"\u768B\u5170\u53BF","value":"620122"},{"text":"\u6986\u4E2D\u53BF","value":"620123"}],"620200":[{"text":"\u5E02\u8F96\u533A","value":"620201"}],"620300":[{"text":"\u5E02\u8F96\u533A","value":"620301"},{"text":"\u91D1\u5DDD\u533A","value":"620302"},{"text":"\u6C38\u660C\u53BF","value":"620321"}],"620400":[{"text":"\u5E02\u8F96\u533A","value":"620401"},{"text":"\u767D\u94F6\u533A","value":"620402"},{"text":"\u5E73\u5DDD\u533A","value":"620403"},{"text":"\u9756\u8FDC\u53BF","value":"620421"},{"text":"\u4F1A\u5B81\u53BF","value":"620422"},{"text":"\u666F\u6CF0\u53BF","value":"620423"}],"620500":[{"text":"\u5E02\u8F96\u533A","value":"620501"},{"text":"\u79E6\u5DDE\u533A","value":"620502"},{"text":"\u9EA6\u79EF\u533A","value":"620503"},{"text":"\u6E05\u6C34\u53BF","value":"620521"},{"text":"\u79E6\u5B89\u53BF","value":"620522"},{"text":"\u7518\u8C37\u53BF","value":"620523"},{"text":"\u6B66\u5C71\u53BF","value":"620524"},{"text":"\u5F20\u5BB6\u5DDD\u56DE\u65CF\u81EA\u6CBB\u53BF","value":"620525"}],"620600":[{"text":"\u5E02\u8F96\u533A","value":"620601"},{"text":"\u51C9\u5DDE\u533A","value":"620602"},{"text":"\u6C11\u52E4\u53BF","value":"620621"},{"text":"\u53E4\u6D6A\u53BF","value":"620622"},{"text":"\u5929\u795D\u85CF\u65CF\u81EA\u6CBB\u53BF","value":"620623"}],"620700":[{"text":"\u5E02\u8F96\u533A","value":"620701"},{"text":"\u7518\u5DDE\u533A","value":"620702"},{"text":"\u8083\u5357\u88D5\u56FA\u65CF\u81EA\u6CBB\u53BF","value":"620721"},{"text":"\u6C11\u4E50\u53BF","value":"620722"},{"text":"\u4E34\u6CFD\u53BF","value":"620723"},{"text":"\u9AD8\u53F0\u53BF","value":"620724"},{"text":"\u5C71\u4E39\u53BF","value":"620725"}],"620800":[{"text":"\u5E02\u8F96\u533A","value":"620801"},{"text":"\u5D06\u5CD2\u533A","value":"620802"},{"text":"\u6CFE\u5DDD\u53BF","value":"620821"},{"text":"\u7075\u53F0\u53BF","value":"620822"},{"text":"\u5D07\u4FE1\u53BF","value":"620823"},{"text":"\u534E\u4EAD\u53BF","value":"620824"},{"text":"\u5E84\u6D6A\u53BF","value":"620825"},{"text":"\u9759\u5B81\u53BF","value":"620826"}],"620900":[{"text":"\u5E02\u8F96\u533A","value":"620901"},{"text":"\u8083\u5DDE\u533A","value":"620902"},{"text":"\u91D1\u5854\u53BF","value":"620921"},{"text":"\u74DC\u5DDE\u53BF","value":"620922"},{"text":"\u8083\u5317\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF","value":"620923"},{"text":"\u963F\u514B\u585E\u54C8\u8428\u514B\u65CF\u81EA\u6CBB\u53BF","value":"620924"},{"text":"\u7389\u95E8\u5E02","value":"620981"},{"text":"\u6566\u714C\u5E02","value":"620982"}],"621000":[{"text":"\u5E02\u8F96\u533A","value":"621001"},{"text":"\u897F\u5CF0\u533A","value":"621002"},{"text":"\u5E86\u57CE\u53BF","value":"621021"},{"text":"\u73AF\u53BF","value":"621022"},{"text":"\u534E\u6C60\u53BF","value":"621023"},{"text":"\u5408\u6C34\u53BF","value":"621024"},{"text":"\u6B63\u5B81\u53BF","value":"621025"},{"text":"\u5B81\u53BF","value":"621026"},{"text":"\u9547\u539F\u53BF","value":"621027"}],"621100":[{"text":"\u5E02\u8F96\u533A","value":"621101"},{"text":"\u5B89\u5B9A\u533A","value":"621102"},{"text":"\u901A\u6E2D\u53BF","value":"621121"},{"text":"\u9647\u897F\u53BF","value":"621122"},{"text":"\u6E2D\u6E90\u53BF","value":"621123"},{"text":"\u4E34\u6D2E\u53BF","value":"621124"},{"text":"\u6F33\u53BF","value":"621125"},{"text":"\u5CB7\u53BF","value":"621126"}],"621200":[{"text":"\u5E02\u8F96\u533A","value":"621201"},{"text":"\u6B66\u90FD\u533A","value":"621202"},{"text":"\u6210\u53BF","value":"621221"},{"text":"\u6587\u53BF","value":"621222"},{"text":"\u5B95\u660C\u53BF","value":"621223"},{"text":"\u5EB7\u53BF","value":"621224"},{"text":"\u897F\u548C\u53BF","value":"621225"},{"text":"\u793C\u53BF","value":"621226"},{"text":"\u5FBD\u53BF","value":"621227"},{"text":"\u4E24\u5F53\u53BF","value":"621228"}],"622900":[{"text":"\u4E34\u590F\u5E02","value":"622901"},{"text":"\u4E34\u590F\u53BF","value":"622921"},{"text":"\u5EB7\u4E50\u53BF","value":"622922"},{"text":"\u6C38\u9756\u53BF","value":"622923"},{"text":"\u5E7F\u6CB3\u53BF","value":"622924"},{"text":"\u548C\u653F\u53BF","value":"622925"},{"text":"\u4E1C\u4E61\u65CF\u81EA\u6CBB\u53BF","value":"622926"},{"text":"\u79EF\u77F3\u5C71\u4FDD\u5B89\u65CF\u4E1C\u4E61\u65CF\u6492\u62C9\u65CF\u81EA\u6CBB\u53BF","value":"622927"}],"623000":[{"text":"\u5408\u4F5C\u5E02","value":"623001"},{"text":"\u4E34\u6F6D\u53BF","value":"623021"},{"text":"\u5353\u5C3C\u53BF","value":"623022"},{"text":"\u821F\u66F2\u53BF","value":"623023"},{"text":"\u8FED\u90E8\u53BF","value":"623024"},{"text":"\u739B\u66F2\u53BF","value":"623025"},{"text":"\u788C\u66F2\u53BF","value":"623026"},{"text":"\u590F\u6CB3\u53BF","value":"623027"}],"630100":[{"text":"\u5E02\u8F96\u533A","value":"630101"},{"text":"\u57CE\u4E1C\u533A","value":"630102"},{"text":"\u57CE\u4E2D\u533A","value":"630103"},{"text":"\u57CE\u897F\u533A","value":"630104"},{"text":"\u57CE\u5317\u533A","value":"630105"},{"text":"\u5927\u901A\u56DE\u65CF\u571F\u65CF\u81EA\u6CBB\u53BF","value":"630121"},{"text":"\u6E5F\u4E2D\u53BF","value":"630122"},{"text":"\u6E5F\u6E90\u53BF","value":"630123"}],"630200":[{"text":"\u4E50\u90FD\u533A","value":"630202"},{"text":"\u5E73\u5B89\u53BF","value":"630221"},{"text":"\u6C11\u548C\u56DE\u65CF\u571F\u65CF\u81EA\u6CBB\u53BF","value":"630222"},{"text":"\u4E92\u52A9\u571F\u65CF\u81EA\u6CBB\u53BF","value":"630223"},{"text":"\u5316\u9686\u56DE\u65CF\u81EA\u6CBB\u53BF","value":"630224"},{"text":"\u5FAA\u5316\u6492\u62C9\u65CF\u81EA\u6CBB\u53BF","value":"630225"}],"632200":[{"text":"\u95E8\u6E90\u56DE\u65CF\u81EA\u6CBB\u53BF","value":"632221"},{"text":"\u7941\u8FDE\u53BF","value":"632222"},{"text":"\u6D77\u664F\u53BF","value":"632223"},{"text":"\u521A\u5BDF\u53BF","value":"632224"}],"632300":[{"text":"\u540C\u4EC1\u53BF","value":"632321"},{"text":"\u5C16\u624E\u53BF","value":"632322"},{"text":"\u6CFD\u5E93\u53BF","value":"632323"},{"text":"\u6CB3\u5357\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF","value":"632324"}],"632500":[{"text":"\u5171\u548C\u53BF","value":"632521"},{"text":"\u540C\u5FB7\u53BF","value":"632522"},{"text":"\u8D35\u5FB7\u53BF","value":"632523"},{"text":"\u5174\u6D77\u53BF","value":"632524"},{"text":"\u8D35\u5357\u53BF","value":"632525"}],"632600":[{"text":"\u739B\u6C81\u53BF","value":"632621"},{"text":"\u73ED\u739B\u53BF","value":"632622"},{"text":"\u7518\u5FB7\u53BF","value":"632623"},{"text":"\u8FBE\u65E5\u53BF","value":"632624"},{"text":"\u4E45\u6CBB\u53BF","value":"632625"},{"text":"\u739B\u591A\u53BF","value":"632626"}],"632700":[{"text":"\u7389\u6811\u5E02","value":"632701"},{"text":"\u6742\u591A\u53BF","value":"632722"},{"text":"\u79F0\u591A\u53BF","value":"632723"},{"text":"\u6CBB\u591A\u53BF","value":"632724"},{"text":"\u56CA\u8C26\u53BF","value":"632725"},{"text":"\u66F2\u9EBB\u83B1\u53BF","value":"632726"}],"632800":[{"text":"\u683C\u5C14\u6728\u5E02","value":"632801"},{"text":"\u5FB7\u4EE4\u54C8\u5E02","value":"632802"},{"text":"\u4E4C\u5170\u53BF","value":"632821"},{"text":"\u90FD\u5170\u53BF","value":"632822"},{"text":"\u5929\u5CFB\u53BF","value":"632823"}],"640100":[{"text":"\u5E02\u8F96\u533A","value":"640101"},{"text":"\u5174\u5E86\u533A","value":"640104"},{"text":"\u897F\u590F\u533A","value":"640105"},{"text":"\u91D1\u51E4\u533A","value":"640106"},{"text":"\u6C38\u5B81\u53BF","value":"640121"},{"text":"\u8D3A\u5170\u53BF","value":"640122"},{"text":"\u7075\u6B66\u5E02","value":"640181"}],"640200":[{"text":"\u5E02\u8F96\u533A","value":"640201"},{"text":"\u5927\u6B66\u53E3\u533A","value":"640202"},{"text":"\u60E0\u519C\u533A","value":"640205"},{"text":"\u5E73\u7F57\u53BF","value":"640221"}],"640300":[{"text":"\u5E02\u8F96\u533A","value":"640301"},{"text":"\u5229\u901A\u533A","value":"640302"},{"text":"\u7EA2\u5BFA\u5821\u533A","value":"640303"},{"text":"\u76D0\u6C60\u53BF","value":"640323"},{"text":"\u540C\u5FC3\u53BF","value":"640324"},{"text":"\u9752\u94DC\u5CE1\u5E02","value":"640381"}],"640400":[{"text":"\u5E02\u8F96\u533A","value":"640401"},{"text":"\u539F\u5DDE\u533A","value":"640402"},{"text":"\u897F\u5409\u53BF","value":"640422"},{"text":"\u9686\u5FB7\u53BF","value":"640423"},{"text":"\u6CFE\u6E90\u53BF","value":"640424"},{"text":"\u5F6D\u9633\u53BF","value":"640425"}],"640500":[{"text":"\u5E02\u8F96\u533A","value":"640501"},{"text":"\u6C99\u5761\u5934\u533A","value":"640502"},{"text":"\u4E2D\u5B81\u53BF","value":"640521"},{"text":"\u6D77\u539F\u53BF","value":"640522"}],"650100":[{"text":"\u5E02\u8F96\u533A","value":"650101"},{"text":"\u5929\u5C71\u533A","value":"650102"},{"text":"\u6C99\u4F9D\u5DF4\u514B\u533A","value":"650103"},{"text":"\u65B0\u5E02\u533A","value":"650104"},{"text":"\u6C34\u78E8\u6C9F\u533A","value":"650105"},{"text":"\u5934\u5C6F\u6CB3\u533A","value":"650106"},{"text":"\u8FBE\u5742\u57CE\u533A","value":"650107"},{"text":"\u7C73\u4E1C\u533A","value":"650109"},{"text":"\u4E4C\u9C81\u6728\u9F50\u53BF","value":"650121"}],"650200":[{"text":"\u5E02\u8F96\u533A","value":"650201"},{"text":"\u72EC\u5C71\u5B50\u533A","value":"650202"},{"text":"\u514B\u62C9\u739B\u4F9D\u533A","value":"650203"},{"text":"\u767D\u78B1\u6EE9\u533A","value":"650204"},{"text":"\u4E4C\u5C14\u79BE\u533A","value":"650205"}],"652100":[{"text":"\u5410\u9C81\u756A\u5E02","value":"652101"},{"text":"\u912F\u5584\u53BF","value":"652122"},{"text":"\u6258\u514B\u900A\u53BF","value":"652123"}],"652200":[{"text":"\u54C8\u5BC6\u5E02","value":"652201"},{"text":"\u5DF4\u91CC\u5764\u54C8\u8428\u514B\u81EA\u6CBB\u53BF","value":"652222"},{"text":"\u4F0A\u543E\u53BF","value":"652223"}],"652300":[{"text":"\u660C\u5409\u5E02","value":"652301"},{"text":"\u961C\u5EB7\u5E02","value":"652302"},{"text":"\u547C\u56FE\u58C1\u53BF","value":"652323"},{"text":"\u739B\u7EB3\u65AF\u53BF","value":"652324"},{"text":"\u5947\u53F0\u53BF","value":"652325"},{"text":"\u5409\u6728\u8428\u5C14\u53BF","value":"652327"},{"text":"\u6728\u5792\u54C8\u8428\u514B\u81EA\u6CBB\u53BF","value":"652328"}],"652700":[{"text":"\u535A\u4E50\u5E02","value":"652701"},{"text":"\u963F\u62C9\u5C71\u53E3\u5E02","value":"652702"},{"text":"\u7CBE\u6CB3\u53BF","value":"652722"},{"text":"\u6E29\u6CC9\u53BF","value":"652723"}],"652800":[{"text":"\u5E93\u5C14\u52D2\u5E02","value":"652801"},{"text":"\u8F6E\u53F0\u53BF","value":"652822"},{"text":"\u5C09\u7281\u53BF","value":"652823"},{"text":"\u82E5\u7F8C\u53BF","value":"652824"},{"text":"\u4E14\u672B\u53BF","value":"652825"},{"text":"\u7109\u8006\u56DE\u65CF\u81EA\u6CBB\u53BF","value":"652826"},{"text":"\u548C\u9759\u53BF","value":"652827"},{"text":"\u548C\u7855\u53BF","value":"652828"},{"text":"\u535A\u6E56\u53BF","value":"652829"}],"652900":[{"text":"\u963F\u514B\u82CF\u5E02","value":"652901"},{"text":"\u6E29\u5BBF\u53BF","value":"652922"},{"text":"\u5E93\u8F66\u53BF","value":"652923"},{"text":"\u6C99\u96C5\u53BF","value":"652924"},{"text":"\u65B0\u548C\u53BF","value":"652925"},{"text":"\u62DC\u57CE\u53BF","value":"652926"},{"text":"\u4E4C\u4EC0\u53BF","value":"652927"},{"text":"\u963F\u74E6\u63D0\u53BF","value":"652928"},{"text":"\u67EF\u576A\u53BF","value":"652929"}],"653000":[{"text":"\u963F\u56FE\u4EC0\u5E02","value":"653001"},{"text":"\u963F\u514B\u9676\u53BF","value":"653022"},{"text":"\u963F\u5408\u5947\u53BF","value":"653023"},{"text":"\u4E4C\u6070\u53BF","value":"653024"}],"653100":[{"text":"\u5580\u4EC0\u5E02","value":"653101"},{"text":"\u758F\u9644\u53BF","value":"653121"},{"text":"\u758F\u52D2\u53BF","value":"653122"},{"text":"\u82F1\u5409\u6C99\u53BF","value":"653123"},{"text":"\u6CFD\u666E\u53BF","value":"653124"},{"text":"\u838E\u8F66\u53BF","value":"653125"},{"text":"\u53F6\u57CE\u53BF","value":"653126"},{"text":"\u9EA6\u76D6\u63D0\u53BF","value":"653127"},{"text":"\u5CB3\u666E\u6E56\u53BF","value":"653128"},{"text":"\u4F3D\u5E08\u53BF","value":"653129"},{"text":"\u5DF4\u695A\u53BF","value":"653130"},{"text":"\u5854\u4EC0\u5E93\u5C14\u5E72\u5854\u5409\u514B\u81EA\u6CBB\u53BF","value":"653131"}],"653200":[{"text":"\u548C\u7530\u5E02","value":"653201"},{"text":"\u548C\u7530\u53BF","value":"653221"},{"text":"\u58A8\u7389\u53BF","value":"653222"},{"text":"\u76AE\u5C71\u53BF","value":"653223"},{"text":"\u6D1B\u6D66\u53BF","value":"653224"},{"text":"\u7B56\u52D2\u53BF","value":"653225"},{"text":"\u4E8E\u7530\u53BF","value":"653226"},{"text":"\u6C11\u4E30\u53BF","value":"653227"}],"654000":[{"text":"\u4F0A\u5B81\u5E02","value":"654002"},{"text":"\u594E\u5C6F\u5E02","value":"654003"},{"text":"\u4F0A\u5B81\u53BF","value":"654021"},{"text":"\u5BDF\u5E03\u67E5\u5C14\u9521\u4F2F\u81EA\u6CBB\u53BF","value":"654022"},{"text":"\u970D\u57CE\u53BF","value":"654023"},{"text":"\u5DE9\u7559\u53BF","value":"654024"},{"text":"\u65B0\u6E90\u53BF","value":"654025"},{"text":"\u662D\u82CF\u53BF","value":"654026"},{"text":"\u7279\u514B\u65AF\u53BF","value":"654027"},{"text":"\u5C3C\u52D2\u514B\u53BF","value":"654028"}],"654200":[{"text":"\u5854\u57CE\u5E02","value":"654201"},{"text":"\u4E4C\u82CF\u5E02","value":"654202"},{"text":"\u989D\u654F\u53BF","value":"654221"},{"text":"\u6C99\u6E7E\u53BF","value":"654223"},{"text":"\u6258\u91CC\u53BF","value":"654224"},{"text":"\u88D5\u6C11\u53BF","value":"654225"},{"text":"\u548C\u5E03\u514B\u8D5B\u5C14\u8499\u53E4\u81EA\u6CBB\u53BF","value":"654226"}],"654300":[{"text":"\u963F\u52D2\u6CF0\u5E02","value":"654301"},{"text":"\u5E03\u5C14\u6D25\u53BF","value":"654321"},{"text":"\u5BCC\u8574\u53BF","value":"654322"},{"text":"\u798F\u6D77\u53BF","value":"654323"},{"text":"\u54C8\u5DF4\u6CB3\u53BF","value":"654324"},{"text":"\u9752\u6CB3\u53BF","value":"654325"},{"text":"\u5409\u6728\u4E43\u53BF","value":"654326"}],"659000":[{"text":"\u77F3\u6CB3\u5B50\u5E02","value":"659001"},{"text":"\u963F\u62C9\u5C14\u5E02","value":"659002"},{"text":"\u56FE\u6728\u8212\u514B\u5E02","value":"659003"},{"text":"\u4E94\u5BB6\u6E20\u5E02","value":"659004"}]};module.exports={provsData:provsData,citysData:citysData,distsData:distsData};

/***/ }
]);