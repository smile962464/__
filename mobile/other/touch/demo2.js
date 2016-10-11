$(function() {
        var E_log = $('#log');
        function log(text) {
                E_log[0].innerHTML += '<p>' + text + '</p>';
        }

        swipe('#touchpanel', {
                onBeforeStart : function(e) {
                        return true;
                },

                onStart : function(e) {
                        log('fire touchstart');
                        log('add event touchmove');
                        log('add event touchend');
                        log('add event touchcancel');
                },

                onMove : function(e) {
                        log('fire move');
                        e.preventDefault();
                },

                onEnd : function(e) {
                        log('fire end');
                        log('remove event touchmove');
                        log('remove event touchend');
                        log('remove event touchcancel');
                },
                
        });
});