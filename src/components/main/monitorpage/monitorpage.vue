<script>
    import './monitorpage.scss'
    import dataServices from '../../../dataservices/dataservices'
    export default{
      ready(){
        this.fetchMonitorEvents();
        this.setFetchInterval();
      },
      data(){
        return{
          eventsList:[],
          fetchInterval:null
        }
      },
      methods:{
        setFetchInterval(){
          console.log('interval');
          this.fetchInterval = setInterval(()=> {
            this.fetchMonitorEvents();
          },180000);
        },

        fetchMonitorEvents(){
            dataServices.fetchMonitorEventsUpdate().then((res)=> {
              if (res.data.result == 'OK') {
                for (let i in res.data.data) {
                  res.data.data[i].$$show = false;
                  this.eventsList.push(res.data.data[i]);
                }
              }
            })
        },
        formateSrc(src){
          switch(src){
            case 'TouTiao':
              return '今日头条';
              break;
          }
        },
        formateDate(date){
          return new Date(date).toString().substr(0,24);
        }
      },
      components:{
        monitordetail:require('./monitordetail/monitordetail.vue')
      },
      template:require('./monitorpage.html')
    }
</script>
