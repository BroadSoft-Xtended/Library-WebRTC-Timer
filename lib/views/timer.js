module.exports = require('bdsft-sdk-view')(TimerView, {
  template: require('../../js/templates'), 
  style: require('../../js/styles'),
  constants: require('../constants')
});

function TimerView(timer) {
  var self = {};

  self.model = timer;
  
  self.elements = ['text'];

  return self;
}