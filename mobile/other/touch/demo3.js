$(function() {
        var E_log = $('#log');
        function logTouches(touches) {
                var text = [];
                if (touches == undefined) {
                        return 'undefined';
                } else {
                        for (var i = 0; i < touches.length; i++) {
                                var touch = touches[i];
                                text.push('{pageX:' + touch.pageX + ', pageY:' + touch.pageY + '}');
                        }
                        return '[' + text.join(', ') + ']';
                }
        }

        function log(event, touches, targetTouches, changedTouches) {
                E_log.html('<p>' + [
                        'fire: ' + event,
                        'touches: ' + logTouches(touches), 
                        'targetTouches: ' + logTouches(targetTouches), 
                        'changedTouches: ' + logTouches(changedTouches)
                ].join('</p><p>') + '</p>');
        }

        swipe('#touchpanel', {
                onBeforeStart : function(e) {
                        return true;
                },

                onStart : function(e) {
                        log('start', e.touches, e.targetTouches, e.changedTouches);
                },

                onMove : function(e) {
                        log('move', e.touches, e.targetTouches, e.changedTouches);
                },

                onEnd : function(e) {
                        log('end', e.touches, e.targetTouches, e.changedTouches);
                },
                
        });
});