export default(App)=>{

  let VueRouter = require('vue-router');
  let dataService = require('./dataservices/dataservices');
  // let Vue = require('Vue');
  let router = new VueRouter({
    hashbang: false,
    history: true,
    root: '/'
  })

  router.map({

    '/':{
      component:require('./components/main/userlibrary/userlibrary.vue')
    },
    'notify':{
      component:require('./components/main/notificationpage/notificationpage.vue')
    },
    'monitor':{
      component:require('./components/main/monitorpage/monitorpage.vue')
    },
    'library':{
      component:require('./components/main/userlibrary/userlibrary.vue')
    }

  })

  router.start(App,'#app');

}
