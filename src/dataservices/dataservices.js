'use strict'
import axios from 'axios';
class DataService{

  constructor(){

    // this.SERVER_URL = `http://localhost:3000`;
    axios.defaults.headers.common['Authorization'] = 'Basic VsJX0LSys1UJvblOz5W2';
    this.user = null;
    this._getUserProfile();
    this.SERVER_URL = `http://198.11.247.166:3000`;
    // this.AUTHORIZATION = 'Basic VsJX0LSys1UJvblOz5W2';
    // console.log(axios.defaults.headers)
  }

  _getUserProfile(){
    console.log(`${this.SERVER_URL}/api/user/me`)
    axios({
      method: 'GET', url:`${this.SERVER_URL}/api/user/me`, headers: {
      }
    }).then((res)=>{


    }).catch((err)=>{

    })
  }

  fetchMonitorEventsUpdate(){
    return axios({
      method: 'GET', url:`${this.SERVER_URL}/api/events?init=${Date.now()-300000}&end=${Date.now()}`, headers: {
      }
    })
  }
}

let dataService = new DataService();
module.exports = dataService;

