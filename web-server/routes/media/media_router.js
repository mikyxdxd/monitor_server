module.exports = (app,db)=> {

  let authMethods = require('../../auth/auth_methods')(db);
  let bcrypt = require('bcrypt-nodejs');
  let ObjectID = require('mongodb').ObjectID;

  "use strict";
  class eventRouter{
    constructor(app){
      this.app = app;
      this.initRoutes();
      this.medias = db.collection('monitor_datas');
    }
    initRoutes(){

      app.get('/api/medias',(req,res)=>{
        if(!req.query.page || !req.query.size){
          res.status(400).end('Invalid Page | Size');
        }else {

          authMethods.validfyUserToken(req.headers['authorization'],(err,result)=>{

            console.log(result);
          })

          // if(authMethods.validfyUserToken(req.headers['authorization'])) {
          //
          //
          // } else {
          //
          //   res.status(401).send('Invalid Authorization');
          // }
          // authMethods.verifyUserToken()


          // let page = parseInt(req.query.page);
          // let size = parseInt(req.query.size);
          // this.datas.find().sort({_id:-1}).skip(page * size).limit(size).toArray((err, elems)=> {
          //   if (!err) {
          //     res.json({
          //       method: 'GET',
          //       result: 'OK',
          //       length: elems.length,
          //       data: elems
          //     })
          //   } else {
          //     res.status(400).end(err);
          //   }
          // })
        }
      })

    }
  }
  new eventRouter(app,db);
}
