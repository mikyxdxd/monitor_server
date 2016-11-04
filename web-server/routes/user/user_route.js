module.exports = (app,db)=> {

  let userMethods = require('./user')(app,db);
  let authMethods = require('../../auth/auth_methods')();
  let bcrypt = require('bcrypt-nodejs');
  var jwt = require('jsonwebtoken');
  let ObjectID = require('mongodb').ObjectID;

  "use strict";
  class eventRouter{
    constructor(app){
      this.app = app;
      this.initRoutes();
      this.users = db.collection('monitor_users');
    }
    initRoutes(){

      app.get('/api/user/me',(req,res)=>{
        //TODO Retrive User Info Via Token Info.
        res.json({user:{}})
      })

      app.post('/login',(req,res)=>{
        if(!req.body || !req.body.email || !req.body.password) {
          res.status(400).end('Invalid Email | Password');
        }
        else{
          if (authMethods.validfyBasic(req.headers['authorization'])) {
            this.users.findOne({email: req.body.email}, (err, user)=> {
              bcrypt.compare(req.body.password,user.password,(err,valid)=>{
                if(valid){
                  let tokens = user.tokens,
                      expireDate = Date.now() + 15770000000,
                      token = {
                        token:jwt.sign({_id: user._id, expire:expireDate}, '123abc456efg'),
                        expire: expireDate
                      }
                  tokens.push(token);
                  this.users.updateOne({_id:user._id},{$set:{tokens:tokens}},(err,ele)=>{
                    if(!err){
                      res.json({
                          result: 'User_Logined', data: {
                          token_type: 'Bearer',
                          access_token: token
                        }
                      })
                    }
                  })
                }else{
                  res.status(400).end('Invalid Password');
                }
              })
            })
          } else {
            res.status(401).send('Invalid Authorization');
          }
        }
      })


      app.post('/signup',(req,res)=>{
        if(!req.body||!req.body.email||!req.body.password){
          res.status(400).end('Invalid Email | Password');
        }else{
          this.users.findOne({email:req.body.email},(err,ele)=>{
            if(!err && !ele){
              console.log(req.body.password);
              this.users.insert({
                email:req.body.email,
                password:bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
                level:'USER'
              },(err,ele)=>{
                let expireDate = Date.now() + 15770000000;
                let tokens = [{
                  token:jwt.sign({_id: ele.ops[0]._id, expire:expireDate}, '123abc456efg'),
                  expire: expireDate
                }]
                this.users.updateOne({_id:ele.ops[0]._id},{$set: {tokens:tokens}},(err,ele)=>{
                  if(!err && ele) {
                    res.json({
                      result: 'User_Registered', data: {
                        token_type: 'Bearer',
                        access_token: tokens[0]
                      }
                    })
                  }
                })
              })
            }else{
              res.json({result:'Duplicate_Email',method:'POST'});
            }
          })
        }
      })


      app.get('/api/user/medias',(req,res)=>{
        // console.log(req.headers['authorization']);
        let token = req.headers['authorization'].split(' ')[1];
        userMethods.isTokenValid(token,(valid)=>{
          if(valid){
            //TODO Retrive User Medias from Database
          }else{
            res.status(401).send('Invalid Token');
          }
        })
      })


    }
  }
  new eventRouter(app,db);
}
