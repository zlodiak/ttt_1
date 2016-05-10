<script src="js/jquery/jquery.2.min.js"></script>    
<script src="js/bootstrap-3/js/bootstrap.min.js"></script> 
<script src="js/underscore-min.js"></script>
<script src="js/backbone-min.js"></script>

<script>
  window.APP = window.APP || {};
  APP.playerMark = 1;    
  APP.compMark = -1;     
</script>

<script src="js/project/models/models.js"></script> 
<script src="js/project/collections/collections.js"></script> 
<script src="js/project/views/views.js"></script> 
<script src="js/project/helper.js"></script> 

<script>
  var app = new APP.TttView({el: '#ttt'});
</script>

