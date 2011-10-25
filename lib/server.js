var beanpole = require('beanpole'),
router = beanpole.router();     

require('colors')     

router.params({
    "http.gateway": {
        "http": {
            "port": process.env.PORT || 31337
        }                 
    },
});
                   
require('bean.http');
require.paths.unshift(__dirname + '/beans');

router.require('sysalert.config');   
         
router.require(__dirname + '/../package.json');
                               
router.require(__dirname + '/beans');

router.push('init');