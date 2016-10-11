/**
 * @filename swipe.js
 * @overview swipe事件
 * @dependence zepto
 * @author zhuxun.jb
 * @use see demo.html
 */

var swipe = (function(require, exports) {

	var doc = document,
		body = document.body,
		$doc = $(doc),
		appVersion = navigator.appVersion,
		hasTouch = 'ontouchstart' in window,


		// Browser capabilities
		isAndroid = (/android/gi).test(appVersion),
		isIDevice = (/iphone|ipad/gi).test(appVersion),

		// Events
		START_EV = hasTouch ? 'touchstart' : 'mousedown',
		MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
		END_EV = hasTouch ? 'touchend' : 'mouseup',
		CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup'
		;

	function emptyFn() {return true;}
	
	function abs(i) {
		return (i < 0 ? -i : i);
	}

	function round(r) {
		return r >> 0;
	}
	
	function getTime(e) {
		return (e.timeStamp || Date.now());
	}
	
	function getTouchEvent(e) {
		return hasTouch ? e.changedTouches[0] : e;
	}
	
	function getTargetNode(node){
		return 'tagName' in node ? node : node.parentNode;
	}
	
	function Swipe(selector, options) {
		var that = this;
		
		that._selector = selector;
		
		that._options = {
			// 各种委托事件
			onBeforeStart : emptyFn,
			onStart : emptyFn,	
			onLeft : emptyFn,	// left, right, up, down 只在方向改变时触发（包括第一次）
			onRight : emptyFn,
			onUp : emptyFn,
			onDown : emptyFn,
			onMove : emptyFn,
			onCancel : emptyFn,
			onEnd : emptyFn,
			
			// 配置
			isPreventDefault : false,	// 是否阻止默认事件
			isPrecision : false,	// 是否启用精确模式
			lockDirection : false,	// 表示锁定的方向，可以是字符串，也可以字符串数组
			useTouchMove : true,	// 表示是否绑定touchmove事件，默认为true
			cancelMove : false, 	//和lockDirection配合使用，当lockDirection不为false时，如果cancelMove为true，则会在划动方向出错时直接取消整个事件
			fixScroll : isAndroid ? true : false,	//是否修整系统滚动条滚动造成的XY轴错误的问题，android下需修整scroll
		};
		
		// use defined options
		for (i in options) that._options[i] = options[i];
		
		that._status = {};
		that._now = {};
		if (typeof that._options.lockDirection == 'string') {
			that._options.lockDirection = that._options.lockDirection.split(',');
		}
		that._bindEvent();
	}
	
	Swipe.prototype = {			
		
		_bindEvent : function() {
			var that = this,
				selector = that._selector
				;
			
			if (typeof selector == 'object') {
				selector.addEventListener(START_EV, function(e) {
					that._element = this;
					that.handleEvent(e);
				}, false);
			} else if (typeof selector == 'string') {
				$doc.on(START_EV, selector, function(e) {
					that._element = this;
					that.handleEvent(e);
				});
			}
		},
		
		_addEventListener : function() {
			var that = this,
				useTouchMove = that._options.useTouchMove,
				el = that._element;
			
			useTouchMove && el.addEventListener(MOVE_EV, that, false);
			el.addEventListener(END_EV, that, false);
			el.addEventListener(CANCEL_EV, that, false);
			if (!hasTouch) {
				el.addEventListener('mouseout', that, false);
			}
		},
		
		_removeEventListener : function() {
			var that = this,
				useTouchMove = that._options.useTouchMove,
				el = that._element;
			
			useTouchMove && el.removeEventListener(MOVE_EV, that, false);
			el.removeEventListener(END_EV, that, false);
			el.removeEventListener(CANCEL_EV, that, false);
		},
		
		handleEvent : function(e) {
			var that = this
				;
			
			switch(e.type) {
				case START_EV:
					that._beforeStart(e) && 
						that._start(e);
					break;
				case MOVE_EV:
					that._move(e);
					break;
				case END_EV:
				case CANCEL_EV:
					that._end(e);
				case 'mouseout':
					that._mouseout(e);
					break;					
			}
		},
	
		_initVars : function() {
			var that = this
				;
			
			// status
			that._status = {};
			
			// now
			that._now = {};
		},

		_trigger : function(type, e) {
			var that = this,
				options = that._options,
				status = that._status,
				handler,
				Type = type.split('')
				;
			
			Type[0] = Type[0].toUpperCase();
			handler = options['on' + Type.join('')];
			if (handler) {
				return handler.call(that, e, status);
			} else {
				return true;
			}
		},
		
		_beforeStart : function(e) {
			var that = this;
			
			// init
			that._initVars();
			
			var options = that._options,
				status = that._status,
				now = that._now,
				touch
				;
			
	    	status.el = that._element;
	    	status.direction = null;
	    	status.start = false;
	    	status.move = false;
	    	status.cancel = false;
	    	status.end = false;
			
	    	// before start
	    	if (that._trigger('beforeStart', e)) {
	    		that._addEventListener();
	    		return true;
	    	} else {
	    		return false;
	    	}
		},
		
		_start : function(e) {
			var that = this,
				options = that._options,
				status = that._status,
				now = that._now,
				touch
				;
			
	    	// now
	    	now.start = getTime(e);
	    	
	    	// status
	    	touch = getTouchEvent(e);
	    	status.x1 = status.sx = touch.pageX;
	    	status.y1 = status.sy = touch.pageY;
	    	status.startScrollX = body.scrollLeft;
	    	status.startScrollY = body.scrollTop;
	    	status.start = true;

	    	// start
	    	that._trigger('start', e);
		},
		
		_ignoreMove : function() {
			var that = this,
				status = that._status,
				now = that._now
				;
			
			return ((status.x1 == status.x2 && status.y1 == status.y2) || 
					(abs(status.x1 - status.x2) < 5 && abs(status.y1 - status.y2) < 5) || 
					(now.x2 - now.x1 < 100));
		},
		
		_getDelta : function(x1, x2, y1, y2) {
			return {
				x : abs(x1 - x2),
				y : abs(y1 - y2)
			};
		},
		
		_getDirection : function(x1, x2, y1, y2)  {
			var that = this,
				options = that._options,
				isPrecision = options.isPrecision,
				delta = that._getDelta(x1, x2, y1, y2),
				angle = delta.y/delta.x,
				direction
				;

			if (angle < (isPrecision?0.577:1)) {	
				// 精确模式下，只在30度角以内的滑动才会生效
				if (x1 > x2) {
					direction = 'left';
				} else if (x1 < x2) {
					direction = 'right';
				}
			} else if (angle > (isPrecision?1.732:1)) { 
				// 精确模式下，只在30度角以内的滑动才会生效
				if (y1 > y2) {
					direction = 'up';
				} else if (y1 < y2) {
					direction = 'down';
				}
			}
			
			return direction;
		},
		
		_move : function(e) {
			var that = this,
				options = that._options,
				lockDirection = options.lockDirection,
				cancelMove = options.cancelMove,
				status = that._status,
				now = that._now,
				timestamp = getTime(e),
				touch, direction
				;
			
	    	if (!status.start) return;
	    	if (options.isPreventDefault) e.preventDefault();
	    	
	    	touch = getTouchEvent(e);
	    	status.x2 = touch.pageX;
	    	status.y2 = touch.pageY;
    		status.move = false;
    		
	    	if (!that._ignoreMove()) {
	    		direction = that._getDirection(status.x1, status.x2, status.y1, status.y2);

	    		if (direction) {
		    		if (!lockDirection || lockDirection.indexOf(direction) > -1) {
			    		status.move = true;
			    		if (status.direction != direction) {
			    			status.direction = direction;
			    			that._trigger(direction, e);
			    		}
			
			    		// trigger for move
			    		that._trigger('move', e);
		    		} else if (cancelMove) {
		    			// cancel move
		    			status.cancel = true;
		    			that._cancel(e);
		    		}
	    		}
 
		        status.x1 = status.x2;
		        status.y1 = status.y2;
	    	}
		},
		
		_end : function(e) {
			var that = this,
				options = that._options,
				status = that._status,
				fixScroll = options.fixScroll,
				now = that._now,
				touche, fixScrollX = fixScrollY = 0
				;

			// now
			now.end = getTime(e);

			if (!status.start) return;
	    	
	    	touch = getTouchEvent(e);
	    	status.x2 = status.ex = touch.pageX;
	    	status.y2 = status.ey = touch.pageY;
	    	status.endScrollX = body.scrollLeft;
	    	status.endScrollY = body.scrollTop;
	    	if (fixScroll) {
	    		fixScrollX = status.endScrollX - status.startScrollX;
	    		fixScrollY = status.endScrollY - status.startScrollY;
	    	}
    		status.direction = that._getDirection(
				status.sx, 
				status.ex - fixScrollX,  // 修整因为滚动条滚动的原因
				status.sy, 
				status.ey - fixScrollY // 修整因为滚动条滚动的原因
    		);
			status.start = false;
			status.move = false;
			status.end = true;
			
			that._removeEventListener();
			that._trigger('end', e);
		},
		
		_cancel : function(e) {
			var that = this
				;

			that._removeEventListener();
			that._trigger('cancel', e);
		},
		
		_mouseout : function(e) {
			var that = this,
				target = e.relatedTarget,
				el = that._element
				;

			if (!target) {
				that._end(e);
				return;
			}

			while (target = target.parentNode) if (target == el) return;
			
			that._end(e);
		}
	};
	
	return function(selector, options)  {
		return new Swipe(selector, options);
	};
})();