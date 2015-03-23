module.exports = require('webrtc-core').bdsft.View(TimerView);

function TimerView(timer) {
  var self = {};

  self.model = timer;
  
  self.elements = ['text', 'timer'];

  return self;
}