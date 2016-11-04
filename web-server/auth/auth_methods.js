module.exports = (db)=>{
  "use strict";
  let jwt = require('jsonwebtoken');
  const AUTHORIZATION =
  { 'Basic VsJX0LSys1UJvblOz5W2': {options:['GET','POST','PUT']},
    'Basic VsJX0LSys1UJvblOz5A2': {options:['GET']}
  };
  return{
    validfyBasic(basic){
      console.log(basic)
      if(AUTHORIZATION[basic] != null){
        return true;
      }
    },
    signUserToken(info,cb){



    },
    validfyUserToken(token,cb){
      token = token.split(' ')[1];
      let users =  db.collection('monitor_users');
      console.log(users)
      if(token){
        jwt.verify(token,'123abc456efg',(err,decoded)=>{
            if(!err){



            }else{

              cb(err,null);
            }
        })
      }else{

        cb('Invalid Token',null)
      }
    }
  }
}
