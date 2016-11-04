module.exports = (app,db)=> {

  "use strict";
  class eventRouter{
    constructor(app){
      this.app = app;
      this.initRoutes();
      this.datas = db.collection('monitor_datas');
    }
    initRoutes(){
      app.get('/api/monitordata',(req,res)=>{
        if(!req.query.page || !req.query.size){
          res.status(400).end('Invalid Page | Size');
        }else {
          let page = parseInt(req.query.page);
          let size = parseInt(req.query.size);
          this.datas.find().sort({_id:-1}).skip(page * size).limit(size).toArray((err, elems)=> {
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

      app.get('/api/monitordata/:id',(req,res)=>{
        this.datas.findOne({_id:req.params.id},(err,ele)=>{
          if(!err){
            res.json({
              method:'GET',
              result:'OK',
              data:ele
            })
          }else{
            res.status(400).end(err);
          }
        })
      })

      app.post('/api/monitordata',(req,res)=>{
        console.log(req.body);
        if(!req.body.url || !req.body.type || (!req.body.pageSrc && !req.body.text)){
          res.status(400).end('Invalid Data');
        }else {
          let data = req.body;
          this.datas.findOne({_id:data.url},(err,ele)=>{
            if(!err && !ele) {
              this.datas.insertOne({
                  _id: data.url,
                  addedData:Date.now(),
                  type: data.type,
                  pageSrc: data.pageSrc,
                  text: data.text,
                  owner:data.owner,
                  feature:ele.feature?ele.feature:[]
                },
                function (err, ele){
                  if (!err) {
                    res.json({
                      method: 'POST',
                      result: 'ADDED',
                      data: ele.ops
                    })
                    //TODO Calculating Feature
                  } else {
                    res.status(400).end(err);
                  }
                })
            }else{
              res.status(400).end('Duplicate Id');
            }
          })
        }
      })
    }
  }
  new eventRouter(app,db);
}
