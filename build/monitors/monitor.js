'use strict'
let MongoClient = require('mongodb').MongoClient;
class monitor{
  constructor(collection){
    this.collection = collection;
    this.initMonitorProcesses();
  }

  initMonitorProcesses(){

    this.monitorTouTiao();
  }


  monitorTouTiao(){

    //TODO monitor TouTIao Interval(60000)


  }
}


MongoClient.connect('mongodb://localhost/test',(err,db)=>{
  if(!err){

    console.log('Connected correctly to server');
    // new monitor(db.collection('monitorDatas'));
    // db.collection('monitor_events').insertOne({
    //   addedDate:Date.now(),
    //   src:'TouTiao',
    //   scannedUrl:['http://www.toutiao.com/a6340073507930226945/','http://www.toutiao.com/a6316272578365358337/','http://www.toutiao.com/a6340015846120096002/#w=1','http://www.toutiao.com/a6340104122552844545/#w=1'],
    //   scannedImg:[{htmlSrc:'http://www.toutiao.com/a6340104122552844545/#w=1',imgSrc:'http://p3.pstatp.com/origin/efc00075677f6682e39'},
    //               {htmlSrc:'http://www.toutiao.com/a6340104122552844545/#w=1',imgSrc:'http://p1.pstatp.com/origin/eff000757a719f9c952'}]
    //
    // })

  }else{
    console.log('Mongodb ',err);
  }
})
