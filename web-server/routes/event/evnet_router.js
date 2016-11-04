module.exports = (app,db)=> {

  "use strict";
  class eventRouter{
    constructor(app){
      this.app = app;
      this.initRoutes();
      this.events = db.collection('monitor_events');
    }
    initRoutes(){
      app.get('/api/events',(req,res)=>{
        if(!req.query.init || !req.query.end){
          res.status(400).end('Invalid Init | End Time');
        }else{
          let init = parseInt(req.query.init);
          let end = parseInt(req.query.end);
          this.events.find({addedDate: { $gt: init, $lt: end}}).toArray((err,elems)=>{
            if(!err) {
              res.json({
                method: 'GET',
                result: 'OK',
                length: elems.length,
                data: elems
              })
            }else{
              res.status(400).end(err);
            }
          });
        }
      })
      app.get('/api/events/all',(req,res)=>{
        if(!req.query.page || !req.query.size){
          res.status(400).end('Invalid Page | Size');
        }else{
          let page = parseInt(req.query.page);
          let size = parseInt(req.query.size);
          this.events.find().sort({_id:-1}).skip(page * size).limit(size).toArray((err, elems)=> {
            if (!err) {
              res.json({
                method: 'GET',
                result: 'OK',
                length: elems.length,
                data: elems
              })
            } else {
              res.status(400).end(err);
            }
          })
        }
      })
      app.post('/api/events',(req,res)=>{
        if(!req.body.src || (!req.body.scannedUrl.length && !req.body.scannedImg.length)){
          res.status(400).end('Invalid Data');
        }else{
          let data = req.body;
          this.events.insertOne({addedDate:Date.now(),
                                 src:data.src,
                                 scannedUrl:data.scannedUrl,
                                 scannedImg:data.scannedImg},
            function(err,ele){
                if(!err){
                  res.json({
                    method: 'POST',
                    result: 'ADDED',
                    data: ele.ops
                  })
                }else{
                  res.status(400).end(err);
                }
          })
        }
      })
    }
  }


  new eventRouter(app,db);

}
