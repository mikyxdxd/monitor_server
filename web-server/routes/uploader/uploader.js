module.exports = (app,db)=> {

  "use strict";
  let multer = require('multer')
  let upload = multer({dest:'temp/'});
  let fs = require('fs');
  let sizeOf = require('image-size');
  let exec = require('child_process').exec;

  class uploaderRouter{

    constructor(app){

      this.app = app;
      this.medias = db.collection('monitor_datas');
      this.initRoutes();
      this.dataElements = [];
      this.medias.find({feature_64:{$ne: null}}).toArray((err, eles)=> {this.dataElements = eles})
    }
    initRoutes(){


      app.post('/fileupload/',upload.single( 'file' ),(req,res)=> {

        exec(`./featureCalculation/ImageHash ${req.file.path}`, (error, stdout, stderr)=> {

          let featureArr = stdout.split(' ');
          let option = req.body.searchType;
          featureArr.splice(featureArr.indexOf(`\n`, 1));
               let ini_time = Date.now();
               let similars = []
               let ele = this.dataElements;
               let errorRate;
               let ctrErrorRate =  Math.pow(parseInt(req.body.errorRate) / 1000, 2);


               switch(option){

                 case 'similar':

                   for(let i in ele){

                     if(ele[i].feature_64.length != 0) {

                       errorRate = this.determineSimilarity(ele[i].feature_64, featureArr);
                       if (errorRate <= ctrErrorRate) {

                                 ele[i]._errorRate = errorRate;
                                 similars.push(ele[i]);
                       }
                     }
                   }




                 break;


                 case 'identical':

                   for(let i in ele){

                     if(ele[i].feature_64.length != 0) {

                       errorRate = this.determineIdentical(ele[i].feature_64, featureArr);
                       if (0 == errorRate) {

                         ele[i]._errorRate = errorRate;
                         similars.push(ele[i]);
                         break;
                       }
                     }
                   }

                 break;
               }


                if (similars.length == 0) {
                  res.json({
                    result: 'NOT EXIST',
                    method: 'POST',
                    indexCount: ele.length,
                    searchTime: Date.now() - ini_time,
                    data: null
                  });

                } else {

                  res.json({
                    result: 'EXISTED',
                    method: 'POST',
                    indexCount: ele.length,
                    searchTime: Date.now() - ini_time,
                    data: similars
                  })
                }

              fs.unlink(`./${req.file.path}`, (err)=>{

                if (!err) {

                  console.log(req.file.path + ' deleted');
                }else {

                  console.log('unlink', err)
                }
              })
        })
      })
    }

    determineIdentical(feature,feature_o){

      let top = 0, bottom = 0, next_top = 0, next_bottom = 0;

      for(let j = 0; j < feature.length; j++){

        next_top = (feature_o[j] - feature[j]) * (feature_o[j] - feature[j]);
        next_bottom = feature_o[j] * feature_o[j];
        top += next_top;
        bottom += next_bottom;
      }

      return Math.pow(top,1/2)/Math.pow(bottom,1/2)


    }

    determineSimilarity(feature,feature_o){

      let top = 0, bottom = 0;
      let heap = [];


      for(let j = 0; j < feature.length; j++){

        let next_top = (feature_o[j] - feature[j]) * (feature_o[j] - feature[j]);
        let next_bottom = feature_o[j] * feature_o[j];
        top += next_top;
        bottom += next_bottom;

        if(j < 6){

          heap.push([next_top,next_bottom]);
          if(j == 5){

            heap.sort((a,b)=>{return a[0] - b[0]})
          }

        }else{

          if(next_top > heap[0][0]){
            heap.shift();
            heap.push([next_top,next_bottom]);
            heap.sort((a,b)=>{return a[0] - b[0]})
          }

        }

      }


      for(let i = 0; i < 6; i++){

        top -= heap[i][0];
        bottom -= heap[i][1];
      }

      return top/bottom

    }
  }


  new uploaderRouter(app,db);
}
