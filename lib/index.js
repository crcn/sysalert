var beanie = require("beanie");

beanie.
loader().
paths(__dirname + "/node_modules").
params(require(__dirname + "/config.js")).
require(__dirname + "/plugins").
require("beanpoll-http").
load();