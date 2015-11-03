test = require('../node_modules/webrtc-sipstack/test/includes/common')(require('../node_modules/bdsft-sdk-test/lib/common'));
describe('timer', function() {

  before(function() {
    test.createModelAndView('core', {
      core: require('webrtc-core')
    }, 'urlconfig');
    test.createModelAndView('sipstack', {
      sipstack: require('webrtc-sipstack'),
      eventbus: require('bdsft-sdk-eventbus'),
      debug: require('bdsft-sdk-debug'),
      core: require('webrtc-core')
    });
    test.createModelAndView('timer', {
      timer: require('../'),
      sipstack: require('webrtc-sipstack'),
      eventbus: require('bdsft-sdk-eventbus'),
      debug: require('bdsft-sdk-debug'),
      core: require('webrtc-core')
    });
  });

  it('with audioOnly view', function() {
    urlconfig.view = 'audioOnly';
    expect(timer.classes).toEqual(['enableCallTimer']);
    urlconfig.view = 'audioVideo';
  });
  it('format', function() {
    expect(timerview.text.text()).toEqual('00:00:00');
    test.startCall();
    expect(timer.text).toEqual('00:00:00');
    test.endCall();
  });
  it('timer on call started with enableCallTimer = true', function() {
    test.isVisible(timerview.view.find('.timer'), false);
    test.startCall();
    test.isVisible(timerview.view.find('.timer'), true);
    test.endCall();
    test.isVisible(timerview.view.find('.timer'), false);
    expect(timer.text).toEqual('00:00:00');
  });
  it('hold and answer and resume', function() {
    sipstack.enableAutoAnswer = true;
    var call = test.startCall();
    timer.text = '01:01:01';
    sipstack.hold();
    incomingCall = test.incomingCall();
    sipstack.terminateSession(incomingCall);
    sipstack.unhold();
    expect(sipstack.sessions.length).toEqual(1);
    expect(timer.text).toEqual('01:01:01');
    sipstack.terminateSession(call);
    expect(sipstack.sessions.length).toEqual(0);
    expect(timer.text).toEqual('00:00:00');
  });
  it('timer on call started with enableCallTimer = false', function() {
    timer.enableCallTimer = false;
    test.isVisible(timerview.view.find('.timer'), false);
    test.startCall();
    test.isVisible(timerview.view.find('.timer'), false);
    test.endCall();
    test.isVisible(timerview.view.find('.timer'), false);
  });
});