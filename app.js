
// Module dependencies

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , partials = require('express-partials')
  , MongoStore = require('connect-mongo')(express)
  , flash = require('connect-flash')
  , settings = require('./settings')
  , mongodb = require('./models/db');

var app = express();

mongodb.open(function(err,db){});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(partials());
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  secret: settings.cookieSecret,
  store: new MongoStore({
  	db: settings.db
  })
}));
app.use(function(req, res, next){
  var error = req.flash('error');
  var success = req.flash('success');
  res.locals.user = req.session.user;
  res.locals.error = error.length ? error : null;
  res.locals.success = success.length ? success : null;
  next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// route
app.get('/', routes.index);
app.post('/addNewFeature',routes.addNewFeature);
app.post('/loadFeatureModel', routes.loadFeatureModel);
app.post('/removeFeature', routes.removeFeature);
app.post('/updateText', routes.updateText);
app.post('/updateDescription', routes.updateDescription);
app.post('/updateOptionality', routes.updateOptionality);
//app.post('/updateParent_id', routes.updateParent_id);
app.post('/updateVP', routes.updateVP);
app.post('/removeSubtree', routes.removeSubtree);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
