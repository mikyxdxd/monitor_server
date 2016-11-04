'use strict'
let router = require('../dev-server.js');
let MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost/test',(err,db)=>{
  if(!err){
    console.log('monitorRouter.js Connected to Mongodb Server');
    new monitorRouter(router,db.collection('monitor_events'))
  }else{
    console.log('monitorRouter.js Mongodb',err);
  }
})

class monitorRouter{

  constructor(router,collection){

    this.router = router;
    this.monitorEvents = collection;
    this.initRoutes();
  }

  initRoutes(){
    let router = this.router;
    router.get('/api/monitor/update',(req,res)=>{
      this.monitorEvents.find().toArray((err,eles)=>{
        if(!err){
          res.json({result:'OK',err:null,data:eles});
          res.end();
        }else{
          res.json({result:'ERROR',err:err});
          res.end();
        }
      })
    })
  }
}

