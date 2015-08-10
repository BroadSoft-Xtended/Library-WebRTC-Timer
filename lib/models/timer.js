module.exports = require('webrtc-core').bdsft.Model(Timer, {
  config: require('../../js/config.js')
});

var Utils = require('webrtc-core').utils;

function Timer(eventbus, debug, urlconfig, sipstack) {
  var self = {};

  self.callTimer = null;
  self.startTime = null;

  self.props = ['text', 'classes'];

  self.bindings = {
    classes: {
        timer: 'enableCallTimer',
        sipstack: ['callState', 'audioOnly', 'offerToReceiveVideo']
    },
    enableCallTimer: {
      urlconfig: 'enableCallTimer'
    }
  }

  self.init = function() {
    self.updateText();
  };

  self.listeners = function() {
    eventbus.on("started", function(e) {
      if (e.data && !e.data.isReconnect) {
        self.start();
      }
    });
    eventbus.on(["disconnected", "ended"], function(e) {
      self.stop();
    });
  };

  self.start = function() {
    if (self.callTimer) {
      debug.log('timer ' + self.callTimer + ' already running');
      return;
    }

    var timer = self.runningTimer();
    timer();
    self.callTimer = setInterval(timer, 1000);
    debug.debug("started timer interval");
  };

  self.stop = function() {
    // Don't stop if there are active sessions still
    if(sipstack.sessions.length) {
      return;
    }
    self.startTime = null;
    clearInterval(self.callTimer);
    debug.debug("cleared timer interval");
    self.callTimer = null;
    self.updateText();
  };

  self.getSeconds = function() {
    return Math.round((new Date().getTime() - (self.startTime || new Date().getTime())) / 1000);
  };

  self.updateText = function() {
    var secs = self.getSeconds();
    self.text = Utils.format(secs);
  };

  // Display the timer on the screen
  self.runningTimer = function() {
    self.startTime = new Date().getTime();
    return function() {
      var secs = self.getSeconds();
      if (urlconfig.maxCallLength && secs >= urlconfig.maxCallLength) {
        eventbus.endCall();
        return;
      }
      self.updateText();
    };
  }

  return self;
}