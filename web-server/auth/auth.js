'use strict'
const AUTHORIZATION =
{'Basic VsJX0LSys1UJvblOz5W2': {options:['GET','POST','PUT']},
 'Basic VsJX0LSys1UJvblOz5A2': {options:['GET']}
};
let headerAuth = function(req, res, next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since,X-CSRF-Token");
  res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,OPTIONS");

  // next();
  if(req.method == 'OPTIONS'){
    next();
  }else{
    if(req.headers['authorization']){
      verifyUserToken(req,res,next);
    }else {
      res.status(401).send('Unauthorized');
    }
  }
}

let verifyUserToken = function(req,res,next){
  if(AUTHORIZATION[req.headers['authorization']] && ~AUTHORIZATION[req.headers['authorization']].options.indexOf(req.method)){
    next();
  }else{
    if(~req.headers['authorization'].indexOf('Bearer')){
      next();
    }else {
      res.status(401).send('Unauthorized');
    }
  }
}

module.exports = {headerAuth}

