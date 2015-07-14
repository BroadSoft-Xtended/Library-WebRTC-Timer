# Timer

Displays a timer for an active call.

Model : bdsft_webrtc.default.timer

View : bdsft_webrtc.default.timerview

Dependencies : [Timer](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer)

## Elements
<a name="elements"></a>

Element  |Type  |Description
---------|------|------------------------------------
text     |div   |Displays the timer's current text.

## Properties
<a name="properties"></a>

Property  |Type    |Description
----------|--------|----------------------------------
text      |string  |The displayed text of the timer.

## Configuration
<a name="configuration"></a>

Property         |Type     |Default  |Description
-----------------|---------|---------|------------------------------------
enableCallTimer  |boolean  |true     |True if the call timer is enabled.

## Methods
<a name="methods"></a>

Method   |Parameters  |Description
---------|------------|-------------------
start()  |            |Starts the timer.
stop()   |            |Stops the timer.


