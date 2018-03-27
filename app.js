var express = require('express');//connect express
var http = require('http');//moduls http
var path = require('path');
var config=require('config');
var app = express();//create app
app.set('port',config.get('port'));
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + config.get('port'));
});//Express will process all incoming requests

//Middleware
app.use(function (req,res,next) {
    if(req.url=='/'){
      res.end("Hello");
    }else{
      next();
    }
});
app.use(function (req,res,next) {
    if(req.url=='/test'){
        res.end("Test");
    }else{
        next();
    }
});

app.use(function (req,res,next) {
    if(req.url=="/forbidden"){
        next(new Error("wops,denied"));
    }else{
        next();
}
});
//else
app.use(function (req,res) {
    res.send(404,"Page not found");
});
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




// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here' }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);
app.get('/users', user.list);
*/
