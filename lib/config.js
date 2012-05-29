var fs = require('fs'),
_      = require("underscore");


var cfgDir = "/usr/local/etc/sysalert";

//load the config synchronously 
var cfg = JSON.parse(fs.readFileSync(cfgDir + "/config.json", "utf8")),

//then pull out the config settings depenging on the node environment variable, OR development by default
target  = cfg[process.env.NODE_ENV || "development"];

//override the default values with the target values
module.exports = _.extend(cfg.default, target || {});