define(function (require, exports, module) {
    if (!!!window.floatNotify) {
        window.floatNotify = (function () {

            // 判断 移动浏览器版本
            var browser = function () {
                var ua = navigator.userAgent;
                var filter = ['iPhone OS ', 'Android '];
                var platform = {
                    'iphone': false,
                    'adnroid': false
                };
                var version = '';
                var vArray = [];
                for (var i = 0; i < filter.length; i++) {
                    var index = ua.indexOf(filter[i]);
                    if (index > -1) {
                        switch (i) {
                            case 0:
                                platform['iphone'] = true;
                                break;
                            case 1:
                                platform['adnroid'] = true;
                                break;
                        }
                        var len = filter[i].length;
                        version = ua.substr(index + len, 6);
                        vArray = version.split(/_|\./);
                    }
                }
                return {
                    'iphone': platform['iphone'],
                    'android': platform['adnroid'],
                    'version': vArray
                }
            } ();
            // 检测position是否支持fixed属性
            var suppFix = false;
            var suppFixed = function () {
                if ((browser.android && Number(browser.version[0] + '.' + browser.version[1]) >= 2.2) || (browser.iphone && Number(browser.version[0]) > 4)) {
                    suppFix = true;
                }
            } ();

            //判断类型
            var type = function (obj) {
                return Object.prototype.toString.call(obj);
            };
            var float_display = false;
            //简单提示框
            function simple(txt, bg, timeout) {
                /// <summary>
                ///    简单的提示文字
                /// </summary>
                ///  <param name="txt">必选（string）：提示文字</param>
                /// <param name="bg">可选（string）：背景颜色</param>
                /// <param name="timeout">可选（number）：提示框显示时间（ms），默认为1s</param>
                //设置默认值
                switch (arguments.length) {
                    case 0:
                        return;
                    case 1:
                        if (type(arguments[0]) !== "[object String]") return;
                        break;
                    case 2:
                        if (type(arguments[0]) !== "[object String]") {
                            return;
                        } else if (type(arguments[1]) === "[object String]") {
                            bg = arguments[1];
                        } else if (type(arguments[1]) === "[object Number]") {
                            timeout = arguments[1];
                            bg = 'rgba(23, 23, 23, 0.9)';
                        } else {
                            return;
                        }
                        break;
                    case 3:
                        if (type(arguments[0]) !== "[object String]" || type(arguments[1]) !== "[object String]" || type(arguments[2]) !== "[object Number]") {
                            return;
                        }
                        break;
                    default:
                        //....;
                };
                txt = txt ? txt : '出现错误';
                bg = bg ? bg : 'rgba(23, 23, 23, 0.9)';
                timeout = timeout ? timeout : 2000;

                //防止短时间重复触发事件
                if (float_display) {
                    return;
                }
                setTimeout(function () {
                    float_display = false;
                }, timeout + 450);
                float_display = true;

                //创建 or 获取 元素
                var fixEle = document.getElementById('hl-floatNotify-sim');
                if (fixEle == null) {
                    fixEle = document.createElement('div');
                    fixEle.id = 'hl-floatNotify-sim';
                    fixEle.style.cssText = 'display:block;position:absolute;z-index:99999;left:0;opacity:1;width:100%;padding:10px 0;color:white;text-align:center';
                    if (suppFix) {
                        fixEle.style.position = 'fixed';
                    }
                    document.getElementsByTagName('body')[0].appendChild(fixEle);
                }
                fixEle.style.display = 'block';
                fixEle.style.background = bg;
                //fixEle.innerHTML = '<span>' + txt + '</span>';
                fixEle.innerHTML = txt;

                //处理元素
                var offsetH = fixEle.offsetHeight;
                var tem;
                if (suppFix) {
                    tem = -offsetH;
                } else {
                    tem = window.scrollY - offsetH;
                }
                fixEle.style.top = tem + 'px';
                //动画函数
                var anim = function (begin, flag) {
                    flag = flag ? 1 : -1;
                    var num = 0;
                    var interval = false;
                    clearInterval(interval);
                    interval = setInterval(function () {
                        if (num < 10) {
                            num++;
                            fixEle.style.top = begin + flag * num * offsetH / 10 + 'px';
                        } else {
                            clearInterval(interval);
                            if (flag == -1) {
                                fixEle.style.display = 'none';
                            }
                        }
                    }, 20);
                };
                anim(tem, true);
                var nowT;
                setTimeout(function () {
                    nowT = parseInt(fixEle.style.top);
                    anim(nowT);
                }, timeout);


                //绑定事件
                function Scroll(event) {
                    fixEle.style.opacity = '1';
                    fixEle.style.top = window.scrollY + 'px';
                    nowT = window.scrollY;
                }
                function touchMove(event) {
                    fixEle.style.opacity = '0';
                    nowT = window.scrollY;
                }

                if (!suppFix) {
                    window.addEventListener('scroll', Scroll, false);
                    document.addEventListener('touchmove', touchMove, false);
                }

            }

            function finger() {  //暂时不可配置
                var txt = '请以两指滑动回到顶端';
                var innerhtm = '<div style="width:183px;margin:0 auto;padding-top:5px;"><div style="display:inline-block;width: 63px;height: 70px;background-image: url(images/fingers.png);"></div><div style="display:inline-block;width:101px;padding:20px 0 10px 10px;vertical-align:top;color: white;text-align:left;">' + txt + '</div></div>';

                simple(innerhtm);
            };

            return {
                simple: simple,
                finger: finger
            };
        })();

        return floatNotify;
    }
});
