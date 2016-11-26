if(process.env.NODE_ENV == "pro") {
    module.exports = require("./config.pro.js");
} else {
    module.exports = require("./config.dev.js");
}