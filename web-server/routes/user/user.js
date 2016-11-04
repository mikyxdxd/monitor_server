module.exports = (app,db)=>{
  "use strict"
  let jwt = require('jsonwebtoken'), ObjectID = require('mongodb').ObjectID;
  let users = db.collection('monitor_users')
  return {
    generateToken(){

    },
    decodeToken(){

    },
    isTokenValid(token,cb){
      jwt.verify(token, '123abc456efg', (err, decoded)=> {
        if(decoded && decoded._id) {
          users.findOne({_id: ObjectID(decoded._id)}, (err, ele)=> {
            if (!err && ele) {
              let tokenIsValid = false;
              for (let t in ele.tokens) {
                if (ele.tokens[t].token == token) tokenIsValid = true;
              }
              if (tokenIsValid) {
                cb(true);
                //TODO Retrive User Medias from Database
              }
            } else {
              cb(false);
            }
          })
        }else{
          cb(false);
        }
      });

    },
  }
}




