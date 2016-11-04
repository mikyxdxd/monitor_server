<script>
    import './intro.scss'
    export default{
      methods:{
        hovermov(e){

          $(e.currentTarget).find('.after').css('clip', 'rect(0px 100vw 500px ' + e.clientX + 'px)');
        }
      },
      components:{
      },
      template:require('./intro.html')
    }
</script>
