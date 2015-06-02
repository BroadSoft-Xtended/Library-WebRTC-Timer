var jsdom = require('mocha-jsdom');
expect = require('expect');
jsdom({});

describe('timer', function() {

  before(function(){
    core = require('webrtc-core');
    testUA = core.testUA;
    testUA.createCore('urlconfig');
    testUA.createCore('sipstack');
    testUA.mockWebRTC();
    testUA.createModelAndView('timer', {timer: require('../')});
  });

it('with audioOnly view', function() {
  urlconfig.view = 'audioOnly';
  expect(timerview.timer.attr('class')).toEqual('timer fadeable classes enableCallTimer audioOnly');
});
it('format', function() {
  expect(timerview.text.text()).toEqual( '00:00:00');
  testUA.startCall();
  expect(timer.text).toEqual( '00:00:00');
  testUA.endCall();
});
it('timer on call started with enableCallTimer = true', function() {
  testUA.isVisible(timerview.timer, false);
  testUA.startCall();
  testUA.isVisible(timerview.timer, true);
  testUA.endCall();
  testUA.isVisible(timerview.timer, false);
  expect(timer.text).toEqual( '00:00:00');
});
it('timer on call started with enableCallTimer = false', function() {
  timer.enableCallTimer = false;
  testUA.isVisible(timerview.timer, false);
  testUA.startCall();
  testUA.isVisible(timerview.timer, false);
  testUA.endCall();
  testUA.isVisible(timerview.timer, false);
});
});