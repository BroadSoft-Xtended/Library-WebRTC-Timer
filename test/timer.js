var jsdom = require('mocha-jsdom');
expect = require('expect');
jsdom({});

describe('timer', function() {

  before(function(){
    core = require('webrtc-core');
    testUA = core.testUA;
    testUA.createCore('urlconfig');
    testUA.createModelAndView('sipstack', {
      sipstack: require('webrtc-sipstack')
    });
    testUA.mockWebRTC();
    testUA.createModelAndView('timer', {
      timer: require('../'),
      sipstack: require('webrtc-sipstack')
    });
  });

it('with audioOnly view', function() {
  urlconfig.view = 'audioOnly';
  expect(timer.classes).toEqual(['enableCallTimer', 'audioOnly']);
});
it('format', function() {
  expect(timerview.text.text()).toEqual( '00:00:00');
  testUA.startCall();
  expect(timer.text).toEqual( '00:00:00');
  testUA.endCall();
});
it('timer on call started with enableCallTimer = true', function() {
  testUA.isVisible(timerview.view.find('.timer'), false);
  testUA.startCall();
  testUA.isVisible(timerview.view.find('.timer'), true);
  testUA.endCall();
  testUA.isVisible(timerview.view.find('.timer'), false);
  expect(timer.text).toEqual( '00:00:00');
});
it('hold and answer and resume', function() {
  sipstack.enableAutoAnswer = true;
  var call = testUA.startCall();
  timer.text = '01:01:01';
  sipstack.hold();
  incomingCall = testUA.incomingCall();
  sipstack.terminateSession(incomingCall);
  sipstack.unhold();
  expect(sipstack.sessions.length).toEqual(1);
  expect(timer.text).toEqual( '01:01:01');
  sipstack.terminateSession(call);
  expect(sipstack.sessions.length).toEqual(0);
  expect(timer.text).toEqual( '00:00:00');
});
it('timer on call started with enableCallTimer = false', function() {
  timer.enableCallTimer = false;
  testUA.isVisible(timerview.view.find('.timer'), false);
  testUA.startCall();
  testUA.isVisible(timerview.view.find('.timer'), false);
  testUA.endCall();
  testUA.isVisible(timerview.view.find('.timer'), false);
});
});