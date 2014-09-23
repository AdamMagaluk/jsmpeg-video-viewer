(function(){

  var url = require('url');
  var u = url.parse(window.location.href, true);

  var streamUrl = u.query.stream || '';
  var width = Number(u.query.width) || 640;
  var height = Number(u.query.height) || 480;
  
  document.getElementById('i-stream').setAttribute('value', streamUrl);
  document.getElementById('i-width').setAttribute('value', width);
  document.getElementById('i-height').setAttribute('value', height);

  if (!streamUrl) {
    return;
  }

  var canvas = document.getElementById('videoCanvas');
  canvas.setAttribute('style','width:' + width + 'px;height:' + height + 'px');

  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#444';
  ctx.fillText('Loading...', canvas.width/2-30, canvas.height/3);

  var client = new WebSocket(streamUrl);
  var player = new jsmpeg(client, { canvas:canvas });
  player.width = width;
  player.height = height;
  player.initBuffers();

})();
