<script>
    import './userlibrary.scss'
    import dataServices from '../../../dataservices/dataservices'
    export default{
      ready(){

        let dropzone = $("#upload_form").dropzone({
          url: "http://198.11.247.166:3000/fileupload",
          addRemoveLinks : true,
          dictDefaultMessage: '<span class="text-center"><span class="font-lg visible-xs-block visible-sm-block visible-lg-block"><span class="font-lg"><i class="fa fa-caret-right text-danger"></i> Drop files <span class="font-xs">to upload</span></span><span>&nbsp&nbsp<h4 class="display-inline"> (Or Click)</h4></span>',
          dictResponseError: 'Error uploading file!',
          headers: {
            'authorization': 'Basic VsJX0LSys1UJvblOz5W2'
          },
          success: (file, res)=>{

            if(res.result == 'EXISTED'){
              this.duplication = res;
            }else{
              this.duplication = null;
            }
            this.fetching = false;
            this.processingTime = Date.now() - this.initFetchingTime;
          },
          sending:(file, xhr, formData)=>{

            this.fetching = true;
            this.initFetchingTime = Date.now();
            formData.append("errorRate", this.errorRate);
            formData.append("searchType", this.searchType);
          }
        });
      },
      methods:{
        changeErrorRate:function(rate){
          this.errorRate = rate;
        },
        changeSearchType:function(type){
          this.searchType = type;
        }
      },
      data(){
        return{
          eventsList:[],
          fetching:false,
          duplication:null,
          errorRate:5,
          initFetchingTime:0,
          processTime:0,
          searchType:'similar'
        }
      },
      components:{

      },
      template:require('./userlibrary.html')
    }
</script>
