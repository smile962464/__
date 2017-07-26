const container = document.querySelector('.scroller-container');
const scroller = document.querySelector('.scroller');

const arr = len => Array.from(new Array(len), (x, i) => i);
const html = (c, ci) => `<div style="border:1px dotted rgb(${Math.round(Math.random() * ci)},10,20)">${c}</div>`;
document.querySelector('#main').innerHTML = arr(20).
  reduce((previousValue, currentValue, index) => `${html(
    arr(20).reduce((pv, cv, ii) => html(`${index}-${ii} ${pv}`, 50), ''),
    255
  )}${previousValue}`, '');

const rException = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
const rAF = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

function momentum(current, start, time, deceleration) {
  const distance = current - start;
  const speed = Math.abs(distance) / time;
  const d = deceleration === undefined ? 0.0006 : deceleration;

  const destination = current + (speed * speed) / (2 * d) * (distance < 0 ? -1 : 1);
  const duration = speed / d;

  return {
    destination: Math.round(destination),
    duration,
  };
}

(function SimulatedScroller() {

  container.addEventListener('touchstart', start);
  container.addEventListener('touchmove', move);
  container.addEventListener('touchend', end);

  let _lastEl;
  let _pageY;
  let _startY;
  let _lastY = 0;
  let _distY;
  let _startTime;
  let _endTime;
  let _isAnimating;

  function start(e) {
    const target = e.target;
    if (rException.test(target.tagName)) {
      return;
    }
    // console.log(e, _event(e));
    const _e = _event(e);
    _lastEl = _e.target;
    _startTime = Date.now();
    _startY = _lastY;
    _distY = 0;
    _pageY = _e.pageY;

    if (_isAnimating) {
      _isAnimating = false;
      _translate(_startY);
    }
    
    // can not preventDefault, because the body maybe scroll
    // e.preventDefault();
  }

  function move(e) {
    if (!_lastEl) {
      return;
    }
    const _e = _event(e);
    const _diff = Math.round(_e.pageY - _pageY);

    _distY += _diff;
    _lastY += _diff;
    _pageY = _e.pageY;
    _translate(_lastY);

    e.preventDefault();
  }

  function end(e) {
    if (!_lastEl) {
      return;
    }
    _lastEl = null;
    if (Math.abs(_distY) < 10) {
      return;
    }
    _endTime = Date.now();
    let _duration = _endTime - _startTime;
    if (_duration < 300) {
      const _momentum = momentum(_lastY, _startY, _duration);

      if (Math.abs(_momentum.destination) > 0) {
        _lastY = _momentum.destination;
        _duration = Math.max(_duration, _momentum.duration);
        _animate(_lastY, _startY, _duration);
      }
    }
  }
  
  function _event(e) {
    if (e.touches && e.touches.length) {
      return e.touches[0];
    }
    if (e.changedTouches && e.changedTouches.length) {
      return e.changedTouches[0];
    }
    return e;
  }
  function _translate(y) {
    let _y = y;
    const MAX_HEIGHT = scroller.offsetHeight - container.offsetHeight;
    if (_y < -MAX_HEIGHT) {
      _y = -MAX_HEIGHT;
    }
    if (_y > 0) {
      _y = 0;
    }
    _distY = Math.round(_y);
    scroller.style.transform = `translate3d(0, ${Math.round(_y)}px, 0) scale(1)`;
  }
  function _animate(destY, startY, duration) {
    const startTime = Date.now();
    const destTime = startTime + duration;

    function step() {
      let now = Date.now();
      let newY;
      let easing;

      if (now >= destTime) {
        _translate(destY);
        return;
      }

      now = (now - startTime) / duration;
      easing = _easing(now);
      newY = (destY - startY) * easing + startY;
      _translate(newY);

      if (_isAnimating) {
        rAF(step);
      }
    }

    _isAnimating = true;
    step();
  }
  function _easing(k) {
    let kk = k;
    return Math.sqrt(1 - (--kk * kk));
  }

})();