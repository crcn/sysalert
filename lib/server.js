var beanpole = require('beanpole'),
router = beanpole.router();       
                   
require('bean.http');
require.paths.unshift(__dirname + '/beans');   
         
router.require(__dirname + '/../package.json');
                               
router.require(__dirname + '/beans');

router.push('init');