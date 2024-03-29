
/**
 * Module dependencies.
 */

var express = require('express'),
  setup = require('./routes/setup.js'),
  schemas = require('./routes/schemas.js'),
  assignment = require('./routes/assign.js'),
  view = require('./routes/view.js'),
  //, routes = require('./routes/routes.js')
  http = require('http'),
  path = require('path');

// Create the app
var app = express();

// Connect to the mongodb
if (process.env.MONGOHQ_URL)
{
  url = process.env.MONGOHQ_URL;
}
else
{
  url = 'mongodb://localhost:27017/recsignups';
}
var db = schemas.connect(url);

// Set up the app
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', setup.index);
app.get('/setup', setup.setup);
app.get('/setup/test', setup.test);
app.get('/setup/reset', setup.reset);
app.get('/setup/addCamper', setup.addCamper);
app.get('/setup/batchAddCamper', setup.batchAddCamper);
app.post('/setup/addingCamper', setup.addingCamper);
app.post('/setup/batchAddingCamper', setup.batchAddingCamper);
app.get('/setup/addRec', setup.addRec);
app.post('/setup/addingRec', setup.addingRec);
app.get('/setup/batchAddRec', setup.batchAddRec);
app.post('/setup/batchAddingRec', setup.batchAddingRec);
app.get('/setup/removeRec', setup.removeRec);
app.post('/setup/removingRec', setup.removingRec);
app.get('/setup/removeCamper', setup.removeCamper);
app.post('/setup/removingCamper', setup.removingCamper);
app.post('/setup/undoRemoveCamper', setup.undoRemoveCamper);
app.get('/assign', assignment.assign);
app.post('/assign/submit', assignment.submitAssignment);
app.post('/assign/overwrite', assignment.overwriteAssignment);
app.get('/attendance', view.attendance);
app.get('/cabinList', view.cabinList);


http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
