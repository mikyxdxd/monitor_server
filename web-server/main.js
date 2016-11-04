const express = require('express'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      app = express(),
      port = 3000,
      Authorization = 'Basic VsJX0LSys1UJvblOz5W2',
      MongoClient = require('mongodb').MongoClient,
      url='mongodb://localhost:27017/test',
      auth = require('./auth/auth');

      MongoClient.connect(url, function(err, db) {
        // console.log(db);
        if(!err){
          app.use(auth.headerAuth);
          app.use(bodyParser.urlencoded());
          app.use(bodyParser.json());
          app.use(logger('dev'));
          require('./routes/event/evnet_router.js')(app,db);
          require('./routes/data/data_router')(app,db);
          require('./routes/user/user_route')(app,db);
          require('./routes/media/media_router')(app,db);
          require('./routes/uploader/uploader')(app,db);
          // require('./routes/data')
          let server = require('http').createServer(app);
          server.listen(port,()=>{console.log('Server Started at Port ' + port)})
        }
      });







