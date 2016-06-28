/****************************************************
* author：  hualei
* time：    2013/8/17 18:13:13
* fileName：popLayer.js

弹出层 -- 从页面右侧拉出效果

(修改扩展自 \base\styles\component\leftcate\js\lefttab.js )

{ fixed : true } 时：

在ios5上，其内部元素，会出现“延迟”渲染的现象，解决办法：http://cantina.co/2012/03/06/ios-5-native-scrolling-grins-and-gothcas/
即用 -webkit-transform: translate3d(0,0,0); 开启 硬件加速，
注意：
如果设置为此： .open3d * { -webkit-transform: translate3d(0,0,0) }  *选择器（或者是3d加速？）会严重影响渲染性能


问题：
    获取一个display:none (!important)的元素时，一般先把其（同时确保其父元素不为none）设为display:block; 获取后再把它设为原有值。
    但是用ele.css('display')获取不到样式的‘!important’优先级标记，因此 恢复原有值时便不准确。
解决：
    1、通过遍历css样式表，获得准确的样式值，能找到优先级!important标记。（不太好）
    2、样式表引入下列样式
        .blockimp{
            display: block !important;	
        }
        添加/去除 此样式，而不影响原样式

    

使用：
        G_popLayer = new PopLayer({
            mask: true,
            fixed: true,
            minHeight: 400,
            content: '',
            onHide: function () {
                $doc.off('touchmove', stopScroll);
            },
            onShow: function () {

                //处理 ios5_fixed_bug
                G_popLayer.ios5_fixed_bug_ele.css('height', '200px');
                setTimeout(function () {
                    G_popLayer.ios5_fixed_bug_ele.css('height', '0');
                }, 100);
                $doc.on('touchmove', stopScroll);

            }
        });

*****************************************************/

; (function ($, undefined) {
    "use strict";

    var body = document.body;

    function PopLayer(opts) {
        var op = this.op = {
            container: body,
            mask: true,
            content: '',
            wrapId: 'popLayerWrap',
            fixed: false,
            minHeight: 480,  //fixed设置为true时有效
            onHide: function () { },
            onShow: function () { }
        };
        $.extend(op, opts);

        if ($('#' + op.warpId).length) {
            console.log('[error] This page already have the element [' + op.warpId + ']');
            return;
        }
        if (!$(op.container).length) this.op.container = body;

        this.init();
    }
    $.extend(PopLayer.prototype, {
        init: function () {
            var that = this;
            var op = this.op;
            var wrapDiv = this.wrapDiv = $('<div id="' + op.wrapId + '" class="pop-layer-wrap" style="display:none;"></div>');
            var content = this.content = $('<div class="js-pop-layer pop-layer">' + op.content + '</div>');
            var mask = this.mask = $('<div class="' + op.wrapId + '-mask pop-layer-mask"></div>');
            wrapDiv.append(content);

            var $container = $(op.container);
            $container.append(wrapDiv);
            if (op.mask) {
                wrapDiv.append(mask);
                mask.on('click', function () {
                    that.hide.apply(that)
                });
            }

            if (op.fixed) {
                this.content.addClass('scrollable');

                //ios5 position:fixed bug 
                var ios5_fixed_bug_ele = $('<div id="ios5_fixed_bug_ele"></div>'), $body = $(body);
                $body.append(ios5_fixed_bug_ele);
                this.ios5_fixed_bug_ele = ios5_fixed_bug_ele;

                //设置fixed的基本样式
                var minHeight = op.minHeight;
                wrapDiv.css({
                    'min-height': minHeight,
                    'position': 'fixed',
                    'bottom': 0
                });
                content.css({
                    'min-height': minHeight,
                    'position': 'fixed',
                    'bottom': 0,
                    'overflow': 'auto'
                });
                mask.css('min-height', minHeight);
            }
        },
        refresh: function (ele) {
            var that = this;
            if (!that.op.fixed) {

                var wrap = this.wrapDiv, dis = wrap.css('display');
                var $ele = wrap.find(ele), edis = $ele.css('display');
                var newH = $ele.height();

                if (dis.substr(0, 4) == 'none') {  //如果ele元素的包裹父元素display:none，暂时改变其display为block
                    //wrap.css('display', 'block !important');
                    wrap.addClass('blockimp');
                    if (edis.substr(0, 4) == 'none') {  //当ele元素本身的display:none，暂时改变其为block
                        $ele.addClass('blockimp');
                        newH = $ele.height();
                        $ele.removeClass('blockimp');
                    } else {
                        newH = $ele.height();
                    }
                    //wrap.css('display', dis);
                    wrap.removeClass('blockimp');
                }
                
                var bodyH = $(body).height();
                var newH = parseFloat(newH);
                if (newH > bodyH) bodyH = newH;
                //console.log(newH,bodyH);
                bodyH = bodyH + 20;

                that.content.css('height', bodyH);
                that.wrapDiv.css('height', bodyH);
            }

        },
        show: function (ele) {
            var that = this;
            this.wrapDiv.show();

            this.content.addClass('stopflick');

            if (ele) this.refresh(ele);

            if (that.op.mask) {
                that.mask.show();
            }
            this.translation(this.content[0], { x: 0 }, function () {

                that.content.addClass('open3d');

                that.op.onShow();
                that.wrapDiv.attr('p_show', 'show'); //做标记
            });
        },
        hide: function () {
            var that = this;
            if (that.op.mask) {
                that.mask.hide();
            }
            this.translation(this.content[0], { x: 280, duration: '0.4s' }, function () {

                that.content.removeClass('stopflick');
                var style = that.content[0].style;
                style['webkitBackfaceVisibility'] = '';
                style['webkitTransform'] = '';
                style['webkitTransformStyle'] = '';  //有必要么？

                if (that.op.fixed) that.content.removeClass('open3d');

                that.wrapDiv.hide();
                that.op.onHide();
                that.wrapDiv.attr('p_show', 'hide');
            })
        },
        // 平移
        translation: function (el, options, callback) {
            var opt = $.extend({
                duration: '0.4s',
                origin: '0 0'
            }, options || {}),

				style = el.style;

            !style['webkitTransitionProperty'] &&
				(style['webkitTransitionProperty'] = '-webkit-transform');

            style['webkitTransitionDuration'] !== opt.duration &&
				(style['webkitTransitionDuration'] = opt.duration);

            style['webkitTransformOrigin'] !== opt.origin &&
				(style['webkitTransformOrigin'] = opt.origin);

            style['webkitBackfaceVisibility'] !== 'hidden' &&
				(style['webkitBackfaceVisibility'] = 'hidden');

            style['webkitTransformStyle'] !== 'preserve-3d' &&
				(style['webkitTransformStyle'] = 'preserve-3d');

            if (opt.x != null || opt.y != null) {
                //原来为2d
                style['webkitTransform'] = 'translate(' +
						(opt.x ? opt.x + 'px,' : '0,') +
                		(opt.y ? opt.y + 'px' : '0') + ')';

                //改为 translate3d，部分安卓机估计有兼容性问题
                //style['webkitTransform'] = 'translate3d(' +
				//		(opt.x ? opt.x + 'px,' : '0,') +
                //		(opt.y ? opt.y + 'px,' : '0,') + '0)';

                setTimeout(callback, parseFloat(opt.duration) * 1500);
            }
        },
        content_destroy: function () {
            this.content.off();
        },
        destroy: function () {
            this.content.off();
            if (this.op.mask) this.mask.off();
        }
    });

    window.PopLayer = PopLayer;

    //zepto插件
    //$.popLayer = PopLayer;
    //$.fn.popLayer = function (options) {
    //    return new PopLayer(options);
    //}

})($);