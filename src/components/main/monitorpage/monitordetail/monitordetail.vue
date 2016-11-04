<script>
    import './monitordetail.scss'
//    import dataServices from '../../../dataservices/dataservices'
    export default{
      ready(){
      },
      methods:{
//        fetchMonitorEvents(){
//          dataServices.fetchMonitorEventsUpdate().then((res)=>{
//            console.log(res.data.result);
//            if(res.data.result == 'OK'){
//              console.log('in')
//              this.eventsList.push(res.data.data);
//            }
//          })
//        },
//        formateSrc(src){
//          switch(src){
//            case 'TouTiao':
//              return '今日头条';
//              break;
//          }
//        },
//        formateDate(date){
//          return new Date(date).toString().substr(0,24);
//        }
      },
      props:['monitorEvent'],
      components:{
      },
      template:require('./monitordetail.html')
    }
</script>
