<script>
    import './main.scss'
    export default{
      ready(){

        $('.parallax-window').parallax({imageSrc: 'https://drscdn.500px.org/photo/54929106/q%3D80_m%3D2000/a019a506729394e966d6646298bb5f8f'});
//        var scene = document.getElementById('scene');
//        var parallax = new Parallax(scene);
      },
      data(){
        return{
        }
      },
      components:{
        monitorpage:require('./monitorpage/monitorpage.vue')
      },
      template:require('./main.html')
    }
</script>
