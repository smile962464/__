$(function() {
        var E_log = $('#log');
        function logXY(touch) {
                var text = [];
                for (var k in touch) {
                        if (/(client|screen|page)(X|Y)$/.test(k)) {
                                text.push(k + ': ' + touch[k]);
                        }
                }
                return '{' + text.join(',') + '}';
                
        }

        function log(event, touch) {
                var E_p;
                if (event === 'start') {
                        E_p = E_log.find('p:nth-child(1)');
                } else if (/^changeTo(Left|Right|Up|Down)/i.test(event)) {
                        E_p = E_log.find('p:nth-child(2)');
                } else if (/^move(Left|Right|Up|Down)/i.test(event)) {
                        E_p = E_log.find('p:nth-child(3)');
                } else if (event === 'end') {
                        E_p = E_log.find('p:nth-child(4)');
                }

                E_p.html(event + ': ' + logXY(touch));
        }

        swipe('#touchpanel', {
                isPrecision : true,

                onBeforeStart : function(e) {
                        E_log.html([
                                '<p></p>',
                                '<p></p>',
                                '<p></p>',
                                '<p></p>'
                        ].join(''))
                        return true;
                },

                onStart : function(e) {
                        log('start', e.changedTouches[0]);
                },

                onLeft : function(e) {
                        log('changeToLeft', e.changedTouches[0]);
                },

                onRight : function(e) {
                        log('changeToRight', e.changedTouches[0]);
                },

                onUp : function(e) {
                        log('changeToUp', e.changedTouches[0]);
                },

                onDown : function(e) {
                        log('changeToDown', e.changedTouches[0]);
                },

                onMove : function(e, touch) {
                        log('move' + touch.direction, e.changedTouches[0]);
                },

                onEnd : function(e) {
                        log('end', e.changedTouches[0]);
                },
                
        });
});