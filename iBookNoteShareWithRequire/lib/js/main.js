( function() {
  var currentFilePath = $('head link:first').attr('href').split('css/')[0] + 'js';
  requirejs.config({
    baseUrl: currentFilePath,
    paths: {
      'commonUtil': 'commonUtil',
      'Particles': 'particlesConfig'
    }
  });
  require(['commonUtil', 'Particles'],
    function(commonUtil, Particles) {
      commonUtil.pageCommonInit();
      Particles.init();
    }
  );
})( window );