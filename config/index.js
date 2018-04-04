//configuration port
var nconf=require('nconf');
var path=require('path');
//read configuration in json file
nconf.argv()
    .env()
    .file({file: path.join(__dirname,'config.json')});
module.exports=nconf;