var express = require('express');//connect express
var http = require('http');//moduls http
var path = require('path');
var config=require('config');
var log=require('libs/log')(module);

var app = express();//create app
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'ejs');

// all environments
app.use(express.favicon());//read url and give favicon.ico
if(app.get('env')=='development'){
    app.use(express.logger('dev'));
}else{
    app.use(express.logger('default'))
}
app.use(express.bodyParser());//read json(work with get/post):req.body....
app.use(express.cookieParser());
app.use(app.router);
app.get('/',function (req,res,next) {
   res.render("index",{
       body:'<b>Hello</b>'
   });
});
app.use(express.static(path.join(__dirname, 'public')));

//create my handler
app.use(function (err,req,res,next) {
    //NODE_ENV='production'
    if(app.get('env')=='development'){
       var errorHandler=express.errorHandler();
       errorHandler(err,req,res,next);
    }else{
       res.send(500);
    }
});
/*var routes = require('./routes');
var user = require('./routes/user');
app.get('/', routes.index);
app.get('/users', user.list);
*/
http.createServer(app).listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});//Express will process all incoming requests