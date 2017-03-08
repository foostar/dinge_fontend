if(process.env.NODE_ENV == "test") {
    module.exports = require("./cache.test.js");
} else {
    module.exports = require("./cache.pro.js");
}