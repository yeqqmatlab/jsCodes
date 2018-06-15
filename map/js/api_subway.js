window.BMAP_AUTHENTIC_KEY = "";
(function () {
    window.BMAP_PROTOCOL = "https";
    (function () {
        var T, baidu = T = baidu || {version: "1.3.4"};
        baidu.guid = "$BAIDU$";
        window[baidu.guid] = window[baidu.guid] || {};
        baidu.object = baidu.object || {};
        baidu.extend = baidu.object.extend = function (target, source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p]
                }
            }
            return target
        };
        baidu.dom = baidu.dom || {};
        baidu.dom.g = function (id) {
            if ("string" == typeof id || id instanceof String) {
                return document.getElementById(id)
            } else {
                if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
                    return id
                }
            }
            return null
        };
        baidu.g = baidu.G = baidu.dom.g;
        baidu.dom.hide = function (element) {
            element = baidu.dom.g(element);
            element.style.display = "none";
            return element
        };
        baidu.hide = baidu.dom.hide;
        baidu.lang = baidu.lang || {};
        baidu.lang.isString = function (source) {
            return "[object String]" == Object.prototype.toString.call(source)
        };
        baidu.isString = baidu.lang.isString;
        baidu.dom._g = function (id) {
            if (baidu.lang.isString(id)) {
                return document.getElementById(id)
            }
            return id
        };
        baidu._g = baidu.dom._g;
        baidu.dom.contains = function (container, contained) {
            var g = baidu.dom._g;
            container = g(container);
            contained = g(contained);
            return container.contains ? container != contained && container.contains(contained) : !!(container.compareDocumentPosition(contained) & 16)
        };
        baidu.browser = baidu.browser || {};
        baidu.dom._NAME_ATTRS = (function () {
            var result = {
                cellpadding: "cellPadding",
                cellspacing: "cellSpacing",
                colspan: "colSpan",
                rowspan: "rowSpan",
                valign: "vAlign",
                usemap: "useMap",
                frameborder: "frameBorder"
            };
            result.htmlFor = "for";
            result.className = "class";
            return result
        })();
        baidu.dom.setAttr = function (element, key, value) {
            element = baidu.dom.g(element);
            if ("style" == key) {
                element.style.cssText = value
            } else {
                key = baidu.dom._NAME_ATTRS[key] || key;
                element.setAttribute(key, value)
            }
            return element
        };
        baidu.setAttr = baidu.dom.setAttr;
        baidu.dom.setAttrs = function (element, attributes) {
            element = baidu.dom.g(element);
            for (var key in attributes) {
                baidu.dom.setAttr(element, key, attributes[key])
            }
            return element
        };
        baidu.setAttrs = baidu.dom.setAttrs;
        baidu.string = baidu.string || {};
        baidu.dom.removeClass = function (element, className) {
            element = baidu.dom.g(element);
            var oldClasses = element.className.split(/\s+/), newClasses = className.split(/\s+/), lenOld,
                lenDel = newClasses.length, j, i = 0;
            for (; i < lenDel; ++i) {
                for (j = 0, lenOld = oldClasses.length; j < lenOld; ++j) {
                    if (oldClasses[j] == newClasses[i]) {
                        oldClasses.splice(j, 1);
                        break
                    }
                }
            }
            element.className = oldClasses.join(" ");
            return element
        };
        baidu.removeClass = baidu.dom.removeClass;
        baidu.dom.insertHTML = function (element, position, html) {
            element = baidu.dom.g(element);
            var range, begin;
            if (element.insertAdjacentHTML) {
                element.insertAdjacentHTML(position, html)
            } else {
                range = element.ownerDocument.createRange();
                position = position.toUpperCase();
                if (position == "AFTERBEGIN" || position == "BEFOREEND") {
                    range.selectNodeContents(element);
                    range.collapse(position == "AFTERBEGIN")
                } else {
                    begin = position == "BEFOREBEGIN";
                    range[begin ? "setStartBefore" : "setEndAfter"](element);
                    range.collapse(begin)
                }
                range.insertNode(range.createContextualFragment(html))
            }
            return element
        };
        baidu.insertHTML = baidu.dom.insertHTML;
        baidu.dom.show = function (element) {
            element = baidu.dom.g(element);
            element.style.display = "";
            return element
        };
        baidu.show = baidu.dom.show;
        baidu.dom.getDocument = function (element) {
            element = baidu.dom.g(element);
            return element.nodeType == 9 ? element : element.ownerDocument || element.document
        };
        baidu.dom.addClass = function (element, className) {
            element = baidu.dom.g(element);
            var classArray = className.split(/\s+/), result = element.className, classMatch = " " + result + " ", i = 0,
                l = classArray.length;
            for (; i < l; i++) {
                if (classMatch.indexOf(" " + classArray[i] + " ") < 0) {
                    result += " " + classArray[i]
                }
            }
            element.className = result;
            return element
        };
        baidu.addClass = baidu.dom.addClass;
        baidu.dom._styleFixer = baidu.dom._styleFixer || {};
        baidu.dom._styleFilter = baidu.dom._styleFilter || [];
        baidu.dom._styleFilter.filter = function (key, value, method) {
            for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
                if (filter = filter[method]) {
                    value = filter(key, value)
                }
            }
            return value
        };
        baidu.string.toCamelCase = function (source) {
            if (source.indexOf("-") < 0 && source.indexOf("_") < 0) {
                return source
            }
            return source.replace(/[-_][^-_]/g, function (match) {
                return match.charAt(1).toUpperCase()
            })
        };
        baidu.dom.getStyle = function (element, key) {
            var dom = baidu.dom;
            element = dom.g(element);
            key = baidu.string.toCamelCase(key);
            var value = element.style[key];
            if (!value) {
                var fixer = dom._styleFixer[key], style = element.currentStyle || getComputedStyle(element, null);
                value = fixer && fixer.get ? fixer.get(element, style) : style[fixer || key]
            }
            if (fixer = dom._styleFilter) {
                value = fixer.filter(key, value, "get")
            }
            return value
        };
        baidu.getStyle = baidu.dom.getStyle;
        if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
            baidu.browser.opera = +RegExp["\x241"]
        }
        baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
        baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
        baidu.browser.isStrict = document.compatMode == "CSS1Compat";
        baidu.dom.getPosition = function (element) {
            element = baidu.dom.g(element);
            var doc = baidu.dom.getDocument(element), browser = baidu.browser, getStyle = baidu.dom.getStyle,
                BUGGY_GECKO_BOX_OBJECT = browser.isGecko > 0 && doc.getBoxObjectFor && getStyle(element, "position") == "absolute" && (element.style.top === "" || element.style.left === ""),
                pos = {left: 0, top: 0}, viewport = (browser.ie && !browser.isStrict) ? doc.body : doc.documentElement,
                parent, box;
            if (element == viewport) {
                return pos
            }
            if (element.getBoundingClientRect) {
                box = element.getBoundingClientRect();
                pos.left = Math.floor(box.left) + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
                pos.top = Math.floor(box.top) + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
                pos.left -= doc.documentElement.clientLeft;
                pos.top -= doc.documentElement.clientTop;
                var htmlDom = doc.body, htmlBorderLeftWidth = parseInt(getStyle(htmlDom, "borderLeftWidth")),
                    htmlBorderTopWidth = parseInt(getStyle(htmlDom, "borderTopWidth"));
                if (browser.ie && !browser.isStrict) {
                    pos.left -= isNaN(htmlBorderLeftWidth) ? 2 : htmlBorderLeftWidth;
                    pos.top -= isNaN(htmlBorderTopWidth) ? 2 : htmlBorderTopWidth
                }
            } else {
                parent = element;
                do {
                    pos.left += parent.offsetLeft;
                    pos.top += parent.offsetTop;
                    if (browser.isWebkit > 0 && getStyle(parent, "position") == "fixed") {
                        pos.left += doc.body.scrollLeft;
                        pos.top += doc.body.scrollTop;
                        break
                    }
                    parent = parent.offsetParent
                } while (parent && parent != element);
                if (browser.opera > 0 || (browser.isWebkit > 0 && getStyle(element, "position") == "absolute")) {
                    pos.top -= doc.body.offsetTop
                }
                parent = element.offsetParent;
                while (parent && parent != doc.body) {
                    pos.left -= parent.scrollLeft;
                    if (!browser.opera || parent.tagName != "TR") {
                        pos.top -= parent.scrollTop
                    }
                    parent = parent.offsetParent
                }
            }
            return pos
        };
        if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
            baidu.browser.firefox = +RegExp["\x241"]
        }
        (function () {
            var ua = navigator.userAgent;
            if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua)) {
                baidu.browser.safari = +(RegExp["\x241"] || RegExp["\x242"])
            }
        })();
        if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
            baidu.browser.chrome = +RegExp["\x241"]
        }
        baidu.array = baidu.array || {};
        baidu.array.each = function (source, iterator) {
            var returnValue, item, i, len = source.length;
            if ("function" == typeof iterator) {
                for (i = 0; i < len; i++) {
                    item = source[i];
                    returnValue = iterator.call(source, item, i);
                    if (returnValue === false) {
                        break
                    }
                }
            }
            return source
        };
        baidu.each = baidu.array.each;
        baidu.lang.guid = function () {
            return "GUID__" + (window[baidu.guid]._counter++).toString(36)
        };
        window[baidu.guid]._counter = window[baidu.guid]._counter || 1;
        window[baidu.guid]._instances = window[baidu.guid]._instances || {};
        baidu.lang.isFunction = function (source) {
            return "[object Function]" == Object.prototype.toString.call(source)
        };
        baidu.lang.isNumber = function (source) {
            return "[object Number]" == Object.prototype.toString.call(source)
        };
        baidu.lang.Class = function (guid) {
            this.guid = guid || baidu.lang.guid();
            window[baidu.guid]._instances[this.guid] = this
        };
        window[baidu.guid]._instances = window[baidu.guid]._instances || {};
        baidu.lang.Class.prototype.dispose = function () {
            delete window[baidu.guid]._instances[this.guid];
            for (var property in this) {
                if (!baidu.lang.isFunction(this[property])) {
                    delete this[property]
                }
            }
            this.disposed = true
        };
        baidu.lang.Class.prototype.toString = function () {
            return "[object " + (this._className || "Object") + "]"
        };
        baidu.lang.Event = function (type, target) {
            this.type = type;
            this.returnValue = true;
            this.target = target || null;
            this.currentTarget = null
        };
        baidu.lang.Class.prototype.addEventListener = function (type, handler, key) {
            if (!baidu.lang.isFunction(handler)) {
                return
            }
            !this.__listeners && (this.__listeners = {});
            var t = this.__listeners, id;
            if (typeof key == "string" && key) {
                if (/[^\w\-]/.test(key)) {
                    throw ("nonstandard key:" + key)
                } else {
                    handler.hashCode = key;
                    id = key
                }
            }
            type.indexOf("on") != 0 && (type = "on" + type);
            typeof t[type] != "object" && (t[type] = {});
            id = id || baidu.lang.guid();
            handler.hashCode = id;
            t[type][id] = handler
        };
        baidu.lang.Class.prototype.removeEventListener = function (type, handler) {
            if (baidu.lang.isFunction(handler)) {
                handler = handler.hashCode
            } else {
                if (!baidu.lang.isString(handler)) {
                    return
                }
            }
            !this.__listeners && (this.__listeners = {});
            type.indexOf("on") != 0 && (type = "on" + type);
            var t = this.__listeners;
            if (!t[type]) {
                return
            }
            t[type][handler] && delete t[type][handler]
        };
        baidu.lang.Class.prototype.dispatchEvent = function (event, options) {
            if (baidu.lang.isString(event)) {
                event = new baidu.lang.Event(event)
            }
            !this.__listeners && (this.__listeners = {});
            options = options || {};
            for (var i in options) {
                event[i] = options[i]
            }
            var i, t = this.__listeners, p = event.type;
            event.target = event.target || this;
            event.currentTarget = this;
            p.indexOf("on") != 0 && (p = "on" + p);
            baidu.lang.isFunction(this[p]) && this[p].apply(this, arguments);
            if (typeof t[p] == "object") {
                for (i in t[p]) {
                    t[p][i].apply(this, arguments)
                }
            }
            return event.returnValue
        };
        baidu.lang.inherits = function (subClass, superClass, className) {
            var key, proto, selfProps = subClass.prototype, clazz = new Function();
            clazz.prototype = superClass.prototype;
            proto = subClass.prototype = new clazz();
            for (key in selfProps) {
                proto[key] = selfProps[key]
            }
            subClass.prototype.constructor = subClass;
            subClass.superClass = superClass.prototype;
            if ("string" == typeof className) {
                proto._className = className
            }
        };
        baidu.inherits = baidu.lang.inherits;
        baidu.lang.instance = function (guid) {
            return window[baidu.guid]._instances[guid] || null
        };
        baidu.platform = baidu.platform || {};
        baidu.platform.isAndroid = /android/i.test(navigator.userAgent);
        if (/android (\d+\.\d)/i.test(navigator.userAgent)) {
            baidu.platform.android = baidu.android = RegExp["\x241"]
        }
        baidu.platform.isIpad = /ipad/i.test(navigator.userAgent);
        baidu.platform.isIphone = /iphone/i.test(navigator.userAgent);
        baidu.platform.iosVersion = /iphone os (\d)\_/i.test(navigator.userAgent) ? +RegExp["\x241"] : 0;
        baidu.lang.Event.prototype.inherit = function (e) {
            var me = this;
            this.domEvent = e = window.event || e;
            me.clientX = e.clientX || e.pageX;
            me.clientY = e.clientY || e.pageY;
            me.offsetX = e.offsetX || e.layerX;
            me.offsetY = e.offsetY || e.layerY;
            me.screenX = e.screenX;
            me.screenY = e.screenY;
            me.ctrlKey = e.ctrlKey || e.metaKey;
            me.shiftKey = e.shiftKey;
            me.altKey = e.altKey;
            if (e.touches) {
                me.touches = [];
                for (var i = 0; i < e.touches.length; i++) {
                    me.touches.push({
                        clientX: e.touches[i].clientX,
                        clientY: e.touches[i].clientY,
                        screenX: e.touches[i].screenX,
                        screenY: e.touches[i].screenY,
                        pageX: e.touches[i].pageX,
                        pageY: e.touches[i].pageY,
                        target: e.touches[i].target,
                        identifier: e.touches[i].identifier
                    })
                }
            }
            if (e.changedTouches) {
                me.changedTouches = [];
                for (var i = 0; i < e.changedTouches.length; i++) {
                    me.changedTouches.push({
                        clientX: e.changedTouches[i].clientX,
                        clientY: e.changedTouches[i].clientY,
                        screenX: e.changedTouches[i].screenX,
                        screenY: e.changedTouches[i].screenY,
                        pageX: e.changedTouches[i].pageX,
                        pageY: e.changedTouches[i].pageY,
                        target: e.changedTouches[i].target,
                        identifier: e.changedTouches[i].identifier
                    })
                }
            }
            if (e.targetTouches) {
                me.targetTouches = [];
                for (var i = 0; i < e.targetTouches.length; i++) {
                    me.targetTouches.push({
                        clientX: e.targetTouches[i].clientX,
                        clientY: e.targetTouches[i].clientY,
                        screenX: e.targetTouches[i].screenX,
                        screenY: e.targetTouches[i].screenY,
                        pageX: e.targetTouches[i].pageX,
                        pageY: e.targetTouches[i].pageY,
                        target: e.targetTouches[i].target,
                        identifier: e.targetTouches[i].identifier
                    })
                }
            }
            me.rotation = e.rotation;
            me.scale = e.scale;
            return me
        };
        var BaseEvent = baidu.lang.Event;
        baidu.lang.decontrol = function (guid) {
            var m = window[baidu.guid];
            m._instances && (delete m._instances[guid])
        };
        baidu.event = {};
        baidu.on = baidu.event.on = function (el, type, handler) {
            if (!(el = baidu.g(el))) {
                return el
            }
            type = type.replace(/^on/, "");
            if (el.addEventListener) {
                el.addEventListener(type, handler, false)
            } else {
                if (el.attachEvent) {
                    el.attachEvent("on" + type, handler)
                }
            }
            return el
        };
        baidu.un = baidu.event.un = function (el, type, handler) {
            if (!(el = baidu.g(el))) {
                return el
            }
            type = type.replace(/^on/, "");
            if (el.removeEventListener) {
                el.removeEventListener(type, handler, false)
            } else {
                if (el.detachEvent) {
                    el.detachEvent("on" + type, handler)
                }
            }
            return el
        };
        baidu.dom.hasClass = function (el, className) {
            if (!el || !el.className || typeof el.className != "string") {
                return false
            }
            var res = -1;
            try {
                res = el.className == className || el.className.indexOf(className)
            } catch (e) {
                return false
            }
            return res > -1
        };
        var SVG = this.SVG = function (element) {
            if (SVG.supported) {
                return new SVG.Doc(element)
            }
        };
        SVG.ns = "http://www.w3.org/2000/svg";
        SVG.xlink = "http://www.w3.org/1999/xlink";
        SVG.did = 1000;
        SVG.eid = function (name) {
            return "svgjs" + name.charAt(0).toUpperCase() + name.slice(1) + (SVG.did++)
        };
        SVG.create = function (name) {
            var element = document.createElementNS(this.ns, name);
            element.setAttribute("id", this.eid(name));
            return element
        };
        SVG.extend = function () {
            var modules, methods, key, i;
            modules = [].slice.call(arguments);
            methods = modules.pop();
            for (i = modules.length - 1; i >= 0; i--) {
                if (modules[i]) {
                    for (key in methods) {
                        modules[i].prototype[key] = methods[key]
                    }
                }
            }
        };
        SVG.get = function (id) {
            var node = document.getElementById(id);
            if (node) {
                return node.instance
            }
        };
        SVG.supported = (function () {
            return !!document.createElementNS && !!document.createElementNS(SVG.ns, "svg").createSVGRect
        })();
        if (!SVG.supported) {
            return false
        }
        SVG.regex = {
            test: function (value, test) {
                return this[test].test(value)
            },
            unit: /^(-?[\d\.]+)([a-z%]{0,2})$/,
            rgb: /rgb\((\d+),(\d+),(\d+)\)/,
            isRgb: /^rgb\(/,
            isCss: /[^:]+:[^;]+;?/,
            isStyle: /^font|text|leading|cursor/,
            isBlank: /^(\s+)?$/,
            isNumber: /^-?[\d\.]+$/
        };
        SVG.defaults = {
            matrix: "1,0,0,1,0,0",
            attrs: {
                "fill-opacity": 1,
                "stroke-opacity": 1,
                "stroke-width": 0,
                fill: "#000",
                stroke: "#000",
                opacity: 1,
                x: 0,
                y: 0,
                cx: 0,
                cy: 0,
                width: 0,
                height: 0,
                r: 0,
                rx: 0,
                ry: 0,
                offset: 0
            },
            trans: function () {
                return {x: 0, y: 0, scaleX: 1, scaleY: 1, matrix: this.matrix, a: 1, b: 0, c: 0, d: 1, e: 0, f: 0}
            }
        };
        SVG.Color = function (color) {
            var match;
            this.r = 0;
            this.g = 0;
            this.b = 0;
            if (typeof color == "string") {
                if (SVG.regex.isRgb.test(color)) {
                    match = SVG.regex.rgb.exec(color.replace(/\s/g, ""));
                    this.r = parseInt(match[1]);
                    this.g = parseInt(match[2]);
                    this.b = parseInt(match[3])
                }
            }
        };
        SVG.extend(SVG.Color, {
            toString: function () {
                return this.toHex()
            }, toHex: function () {
                return "#" + this._compToHex(this.r) + this._compToHex(this.g) + this._compToHex(this.b)
            }, _compToHex: function (comp) {
                var hex = comp.toString(16);
                return hex.length == 1 ? "0" + hex : hex
            }
        });
        SVG.Color.test = function (color) {
            color += "";
            return SVG.regex.isRgb.test(color)
        };
        SVG.Color.isRgb = function (color) {
            return color && typeof color.r == "number"
        };
        SVG.ViewBox = function (element) {
            var x, y, width, height, box = element.bbox(), view = (element.attr("viewBox") || "").match(/-?[\d\.]+/g);
            this.x = box.x;
            this.y = box.y;
            this.width = element.node.clientWidth || element.node.getBoundingClientRect().width;
            this.height = element.node.clientHeight || element.node.getBoundingClientRect().height;
            if (view) {
                x = parseFloat(view[0]);
                y = parseFloat(view[1]);
                width = parseFloat(view[2]);
                height = parseFloat(view[3]);
                this.zoom = ((this.width / this.height) > (width / height)) ? this.height / height : this.width / width;
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height
            }
            this.zoom = this.zoom || 1
        };
        SVG.extend(SVG.ViewBox, {
            toString: function () {
                return this.x + " " + this.y + " " + this.width + " " + this.height
            }
        });
        SVG.BBox = function (element) {
            var box;
            try {
                box = element.node.getBBox()
            } catch (e) {
                box = {
                    x: element.node.clientLeft,
                    y: element.node.clientTop,
                    width: element.node.clientWidth,
                    height: element.node.clientHeight
                }
            }
            this.x = box.x + element.trans.x;
            this.y = box.y + element.trans.y;
            this.width = box.width * element.trans.scaleX;
            this.height = box.height * element.trans.scaleY;
            this.cx = this.x + this.width / 2;
            this.cy = this.y + this.height / 2
        };
        SVG.Element = function (node) {
            this._stroke = SVG.defaults.attrs.stroke;
            this.styles = {};
            this.trans = SVG.defaults.trans();
            if (this.node = node) {
                this.type = node.nodeName;
                this.node.instance = this
            }
        };
        SVG.extend(SVG.Element, {
            x: function (x) {
                if (x) {
                    x /= this.trans.scaleX
                }
                return this.attr("x", x)
            }, y: function (y) {
                if (y) {
                    y /= this.trans.scaleY
                }
                return this.attr("y", y)
            }, cx: function (x) {
                return x == null ? this.bbox().cx : this.x(x - this.bbox().width / 2)
            }, cy: function (y) {
                return y == null ? this.bbox().cy : this.y(y - this.bbox().height / 2)
            }, move: function (x, y) {
                return this.x(x).y(y)
            }, center: function (x, y) {
                return this.cx(x).cy(y)
            }, size: function (width, height) {
                return this.attr({width: width, height: height})
            }, remove: function () {
                if (this.parent) {
                    this.parent.removeElement(this)
                }
                return this
            }, doc: function (type) {
                return this._parent(type || SVG.Doc)
            }, attr: function (a, v, n) {
                if (a == null) {
                    a = {};
                    v = this.node.attributes;
                    for (n = v.length - 1; n >= 0; n--) {
                        a[v[n].nodeName] = SVG.regex.test(v[n].nodeValue, "isNumber") ? parseFloat(v[n].nodeValue) : v[n].nodeValue
                    }
                    return a
                } else {
                    if (typeof a == "object") {
                        for (v in a) {
                            this.attr(v, a[v])
                        }
                    } else {
                        if (v === null) {
                            this.node.removeAttribute(a)
                        } else {
                            if (v == null) {
                                if (this._isStyle(a)) {
                                    return a == "text" ? this.content : a == "leading" && this.leading ? this.leading() : this.style(a)
                                } else {
                                    v = this.node.getAttribute(a);
                                    return v == null ? SVG.defaults.attrs[a] : SVG.regex.test(v, "isNumber") ? parseFloat(v) : v
                                }
                            } else {
                                if (a == "style") {
                                    return this.style(v)
                                } else {
                                    if (a == "x" && Array.isArray(this.lines)) {
                                        for (n = this.lines.length - 1; n >= 0; n--) {
                                            this.lines[n].attr(a, v)
                                        }
                                    }
                                    if (a == "stroke-width") {
                                        this.attr("stroke", parseFloat(v) > 0 ? this._stroke : null)
                                    } else {
                                        if (a == "stroke") {
                                            this._stroke = v
                                        }
                                    }
                                    if (SVG.Color.test(v) || SVG.Color.isRgb(v)) {
                                        v = new SVG.Color(v).toHex()
                                    }
                                    n != null ? this.node.setAttributeNS(n, a, v.toString()) : this.node.setAttribute(a, v.toString());
                                    if (this._isStyle(a)) {
                                        a == "text" ? this.text(v) : a == "leading" && this.leading ? this.leading(v) : this.style(a, v);
                                        if (this.rebuild) {
                                            this.rebuild(a, v)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return this
            }, transform: function (o, v) {
                if (arguments.length == 0) {
                    return this.trans
                } else {
                    if (typeof o === "string") {
                        if (arguments.length < 2) {
                            return this.trans[o]
                        }
                        var transform = {};
                        transform[o] = v;
                        return this.transform(transform)
                    }
                }
                var transform = [];
                o = this._parseMatrix(o);
                for (v in o) {
                    if (o[v] != null) {
                        this.trans[v] = o[v]
                    }
                }
                this.trans.matrix = this.trans.a + "," + this.trans.b + "," + this.trans.c + "," + this.trans.d + "," + this.trans.e + "," + this.trans.f;
                o = this.trans;
                if (o.matrix != SVG.defaults.matrix) {
                    transform.push("matrix(" + o.matrix + ")")
                }
                if (o.scaleX !== 1 || o.scaleY !== 1) {
                    transform.push("scale(" + o.scaleX + "," + o.scaleY + ")")
                }
                if (o.x !== 0 || o.y !== 0) {
                    transform.push("translate(" + o.x / o.scaleX + "px," + o.y / o.scaleY + "px)")
                }
                if (this._offset && this._offset.x !== 0 && this._offset.y != 0) {
                    transform.push("translate(" + (-this._offset.x) + "px," + (-this._offset.y) + "px)")
                }
                if (transform.length === 0) {
                    this.node.removeAttribute("transform")
                } else {
                    this.node.style.transform = transform.join(" ");
                    this.node.style.WebkitTransform = transform.join(" ")
                }
                return this
            }, style: function (s, v) {
                if (arguments.length == 0) {
                    return this.attr("style") || ""
                } else {
                    if (arguments.length < 2) {
                        if (typeof s == "object") {
                            for (v in s) {
                                this.style(v, s[v])
                            }
                        } else {
                            if (SVG.regex.isCss.test(s)) {
                                s = s.split(";");
                                for (var i = 0; i < s.length; i++) {
                                    v = s[i].split(":");
                                    if (v.length == 2) {
                                        this.style(v[0].replace(/\s+/g, ""), v[1].replace(/^\s+/, "").replace(/\s+$/, ""))
                                    }
                                }
                            } else {
                                return this.styles[s]
                            }
                        }
                    } else {
                        if (v === null || SVG.regex.test(v, "isBlank")) {
                            delete this.styles[s]
                        } else {
                            this.styles[s] = v
                        }
                    }
                }
                s = "";
                for (v in this.styles) {
                    s += v + ":" + this.styles[v] + ";"
                }
                if (s == "") {
                    this.node.removeAttribute("style")
                } else {
                    this.node.setAttribute("style", s)
                }
                return this
            }, data: function (a, v, r) {
                if (arguments.length < 2) {
                    try {
                        return JSON.parse(this.attr("data-" + a))
                    } catch (e) {
                        return this.attr("data-" + a)
                    }
                } else {
                    this.attr("data-" + a, v === null ? null : r === true || typeof v === "string" || typeof v === "number" ? v : JSON.stringify(v))
                }
                return this
            }, bbox: function () {
                return new SVG.BBox(this)
            }, show: function () {
                return this.style("display", "")
            }, hide: function () {
                return this.style("display", "none")
            }, visible: function () {
                return this.style("display") != "none"
            }, toString: function () {
                return this.attr("id")
            }, _parent: function (parent) {
                var element = this;
                while (element != null && !(element instanceof parent)) {
                    element = element.parent
                }
                return element
            }, _isStyle: function (a) {
                return typeof a == "string" ? SVG.regex.test(a, "isStyle") : false
            }, _parseMatrix: function (o) {
                if (o.matrix) {
                    var m = o.matrix.replace(/\s/g, "").split(",");
                    if (m.length == 6) {
                        o.a = parseFloat(m[0]);
                        o.b = parseFloat(m[1]);
                        o.c = parseFloat(m[2]);
                        o.d = parseFloat(m[3]);
                        o.e = parseFloat(m[4]);
                        o.f = parseFloat(m[5])
                    }
                }
                return o
            }
        });
        SVG.Container = function (element) {
            this.constructor.call(this, element)
        };
        SVG.Container.prototype = new SVG.Element;
        SVG.extend(SVG.Container, {
            children: function () {
                return this._children || (this._children = [])
            }, add: function (element, i) {
                if (!this.has(element)) {
                    i = i == null ? this.children().length : i;
                    if (element.parent) {
                        var index = element.parent.children().indexOf(element);
                        element.parent.children().splice(index, 1)
                    }
                    this.children().splice(i, 0, element);
                    this.node.insertBefore(element.node, this.node.childNodes[i] || null);
                    element.parent = this
                }
                return this
            }, put: function (element, i) {
                this.add(element, i);
                return element
            }, has: function (element) {
                return this.children().indexOf(element) >= 0
            }, each: function (block) {
                var index, children = this.children();
                for (index = 0, length = children.length; index < length; index++) {
                    if (children[index] instanceof SVG.Shape) {
                        block.apply(children[index], [index, children])
                    }
                }
                return this
            }, removeElement: function (element) {
                var i = this.children().indexOf(element);
                this.children().splice(i, 1);
                this.node.removeChild(element.node);
                element.parent = null;
                return this
            }, group: function () {
                return this.put(new SVG.G)
            }, rect: function (width, height) {
                return this.put(new SVG.Rect().size(width, height))
            }, circle: function (size) {
                return this.ellipse(size, size)
            }, ellipse: function (width, height) {
                return this.put(new SVG.Ellipse().size(width, height).move(0, 0))
            }, line: function (x1, y1, x2, y2) {
                return this.put(new SVG.Line().plot(x1, y1, x2, y2))
            }, polyline: function (points, unbiased) {
                return this.put(new SVG.Polyline(unbiased)).plot(points)
            }, path: function (data, unbiased) {
                return this.put(new SVG.Path(unbiased)).plot(data)
            }, image: function (source, width, height) {
                width = width != null ? width : 100;
                return this.put(new SVG.Image().load(source).size(width, height != null ? height : width))
            }, text: function (text) {
                return this.put(new SVG.Text().text(text))
            }, viewbox: function (v) {
                if (arguments.length == 0) {
                    return new SVG.ViewBox(this)
                }
                v = arguments.length == 1 ? [v.x, v.y, v.width, v.height] : [].slice.call(arguments);
                return this.attr("viewBox", v.join(" "))
            }, clear: function () {
                for (var i = this.children().length - 1; i >= 0; i--) {
                    this.removeElement(this.children()[i])
                }
                return this
            }
        });
        ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "mouseenter", "mouseleave", "touchstart", "touchend", "touchmove", "touchcancel"].forEach(function (event) {
            SVG.Element.prototype[event] = function (f) {
                var self = this;
                this.node["on" + event] = typeof f == "function" ? function () {
                    return f.apply(self, arguments)
                } : null;
                return this
            }
        });
        SVG.on = function (node, event, listener) {
            if (node.addEventListener) {
                node.addEventListener(event, listener, false)
            } else {
                node.attachEvent("on" + event, listener)
            }
        };
        SVG.off = function (node, event, listener) {
            if (node.removeEventListener) {
                node.removeEventListener(event, listener, false)
            } else {
                node.detachEvent("on" + event, listener)
            }
        };
        SVG.extend(SVG.Element, {
            on: function (event, listener) {
                SVG.on(this.node, event, listener);
                return this
            }, off: function (event, listener) {
                SVG.off(this.node, event, listener);
                return this
            }
        });
        SVG.G = function () {
            this.constructor.call(this, SVG.create("g"))
        };
        SVG.G.prototype = new SVG.Container;
        SVG.extend(SVG.G, {
            x: function (x) {
                return x == null ? this.trans.x : this.transform("x", x)
            }, y: function (y) {
                return y == null ? this.trans.y : this.transform("y", y)
            }
        });
        SVG.Doc = function (element) {
            this.parent = typeof element == "string" ? document.getElementById(element) : element;
            this.constructor.call(this, this.parent.nodeName == "svg" ? this.parent : SVG.create("svg"));
            this.attr({xmlns: SVG.ns, version: "1.1", width: "100%", height: "100%"}).attr("xlink", SVG.xlink, SVG.ns);
            if (this.parent.nodeName != "svg") {
                this.stage()
            }
        };
        SVG.Doc.prototype = new SVG.Container;
        SVG.extend(SVG.Doc, {
            stage: function () {
                var check, element = this, wrapper = document.createElement("div");
                wrapper.style.cssText = "position:relative;height:100%;";
                element.parent.appendChild(wrapper);
                wrapper.appendChild(element.node);
                check = function () {
                    if (document.readyState === "complete") {
                        element.style("position:absolute;");
                        setTimeout(function () {
                            element.style("position:relative;");
                            element.parent.removeChild(element.node.parentNode);
                            element.node.parentNode.removeChild(element.node);
                            element.parent.appendChild(element.node);
                            element.fixSubPixelOffset();
                            SVG.on(window, "resize", function () {
                                element.fixSubPixelOffset()
                            })
                        }, 5)
                    } else {
                        setTimeout(check, 10)
                    }
                };
                check();
                return this
            }, fixSubPixelOffset: function () {
                var pos = this.node.getScreenCTM();
                this.style("left", (-pos.e % 1) + "px").style("top", (-pos.f % 1) + "px")
            }
        });
        SVG.Shape = function (element) {
            this.constructor.call(this, element)
        };
        SVG.Shape.prototype = new SVG.Element;
        SVG.Rect = function () {
            this.constructor.call(this, SVG.create("rect"))
        };
        SVG.Rect.prototype = new SVG.Shape;
        SVG.Ellipse = function () {
            this.constructor.call(this, SVG.create("ellipse"))
        };
        SVG.Ellipse.prototype = new SVG.Shape;
        SVG.extend(SVG.Ellipse, {
            x: function (x) {
                return x == null ? this.cx() - this.attr("rx") : this.cx(x + this.attr("rx"))
            }, y: function (y) {
                return y == null ? this.cy() - this.attr("ry") : this.cy(y + this.attr("ry"))
            }, cx: function (x) {
                return x == null ? this.attr("cx") : this.attr("cx", x / this.trans.scaleX)
            }, cy: function (y) {
                return y == null ? this.attr("cy") : this.attr("cy", y / this.trans.scaleY)
            }, size: function (width, height) {
                return this.attr({rx: width / 2, ry: height / 2})
            }
        });
        SVG.Line = function () {
            this.constructor.call(this, SVG.create("line"))
        };
        SVG.Line.prototype = new SVG.Shape;
        SVG.extend(SVG.Line, {
            x: function (x) {
                var b = this.bbox();
                return x == null ? b.x : this.attr({x1: this.attr("x1") - b.x + x, x2: this.attr("x2") - b.x + x})
            }, y: function (y) {
                var b = this.bbox();
                return y == null ? b.y : this.attr({y1: this.attr("y1") - b.y + y, y2: this.attr("y2") - b.y + y})
            }, cx: function (x) {
                var half = this.bbox().width / 2;
                return x == null ? this.x() + half : this.x(x - half)
            }, cy: function (y) {
                var half = this.bbox().height / 2;
                return y == null ? this.y() + half : this.y(y - half)
            }, size: function (width, height) {
                var b = this.bbox();
                return this.attr(this.attr("x1") < this.attr("x2") ? "x2" : "x1", b.x + width).attr(this.attr("y1") < this.attr("y2") ? "y2" : "y1", b.y + height)
            }, plot: function (x1, y1, x2, y2) {
                return this.attr({x1: x1, y1: y1, x2: x2, y2: y2})
            }
        });
        SVG.Polyline = function () {
            this.constructor.call(this, SVG.create("polyline"))
        };
        SVG.Polyline.prototype = new SVG.Shape;
        SVG.Path = function (unbiased) {
            this.constructor.call(this, SVG.create("path"));
            this.unbiased = !!unbiased
        };
        SVG.Path.prototype = new SVG.Shape;
        SVG.extend(SVG.Path, {
            _plot: function (data) {
                return this.attr("d", data || "M0,0")
            }
        });
        SVG.extend(SVG.Polyline, SVG.Path, {
            x: function (x) {
                return x == null ? this.bbox().x : this.transform("x", x)
            }, y: function (y) {
                return y == null ? this.bbox().y : this.transform("y", y)
            }, size: function (width, height) {
                var scale = width / this._offset.width;
                return this.transform({scaleX: scale, scaleY: height != null ? height / this._offset.height : scale})
            }, plot: function (data) {
                var x = this.trans.scaleX, y = this.trans.scaleY;
                this._plot(data);
                this._offset = this.transform({scaleX: 1, scaleY: 1}).bbox();
                if (this.unbiased) {
                    this._offset.x = this._offset.y = 0
                } else {
                    this._offset.x -= this.trans.x;
                    this._offset.y -= this.trans.y
                }
                return this.transform({scaleX: x, scaleY: y})
            }
        });
        SVG.Image = function () {
            this.constructor.call(this, SVG.create("image"))
        };
        SVG.Image.prototype = new SVG.Shape;
        SVG.extend(SVG.Image, {
            load: function (url) {
                return (url ? this.attr("href", (this.src = url), SVG.xlink) : this)
            }
        });
        var _styleAttr = ("size family weight stretch variant style").split(" ");
        SVG.Text = function () {
            this.constructor.call(this, SVG.create("text"));
            this.styles = {"font-size": 16, "font-family": "Helvetica, Arial, sans-serif", "text-anchor": "start"};
            this._leading = 1.2;
            this._base = 0.276666666
        };
        SVG.Text.prototype = new SVG.Shape;
        SVG.extend(SVG.Text, {
            x: function (x, a) {
                if (x == null) {
                    return a ? this.attr("x") : this.bbox().x
                }
                if (!a) {
                    a = this.style("text-anchor");
                    x = a == "start" ? x : a == "end" ? x + this.bbox().width : x + this.bbox().width / 2
                }
                return this.attr("x", x)
            }, cx: function (x, a) {
                return x == null ? this.bbox().cx : this.x(x - this.bbox().width / 2)
            }, cy: function (y, a) {
                return y == null ? this.bbox().cy : this.y(a ? y : y - this.bbox().height / 2)
            }, move: function (x, y, a) {
                return this.x(x, a).y(y)
            }, center: function (x, y, a) {
                return this.cx(x, a).cy(y, a)
            }, text: function (text) {
                if (text == null) {
                    return this.content
                }
                this.clear();
                this.content = SVG.regex.isBlank.test(text) ? "text" : text;
                var i, il, lines = text.split("\n");
                for (i = 0, il = lines.length; i < il; i++) {
                    this.tspan(lines[i])
                }
                return this.attr("textLength", 1).attr("textLength", null)
            }, tspan: function (text) {
                var tspan = new SVG.TSpan().text(text);
                this.node.appendChild(tspan.node);
                this.lines.push(tspan);
                return tspan.attr("style", this.style())
            }, size: function (size) {
                return this.attr("font-size", size)
            }, leading: function (value) {
                if (value == null) {
                    return this._leading
                }
                this._leading = value;
                return this.rebuild("leading", value)
            }, rebuild: function () {
                var i, il, size = this.styles["font-size"];
                for (i = 0, il = this.lines.length; i < il; i++) {
                    this.lines[i].attr({
                        dy: size * this._leading - (i == 0 ? size * this._base : 0),
                        x: (this.attr("x") || 0),
                        style: this.style()
                    })
                }
                return this
            }, clear: function () {
                while (this.node.hasChildNodes()) {
                    this.node.removeChild(this.node.lastChild)
                }
                this.lines = [];
                return this
            }
        });
        SVG.TSpan = function () {
            this.constructor.call(this, SVG.create("tspan"))
        };
        SVG.TSpan.prototype = new SVG.Shape;
        SVG.extend(SVG.TSpan, {
            text: function (text) {
                this.node.appendChild(document.createTextNode(text));
                return this
            }
        });
        SVG.Nested = function () {
            this.constructor.call(this, SVG.create("svg"));
            this.style("overflow", "visible")
        };
        SVG.Nested.prototype = new SVG.Container;
        SVG._stroke = ["color", "width", "opacity", "linecap", "linejoin", "miterlimit", "dasharray", "dashoffset"];
        SVG._fill = ["color", "opacity", "rule"];
        var _colorPrefix = function (type, attr) {
            return attr == "color" ? type : type + "-" + attr
        };
        ["fill", "stroke"].forEach(function (method) {
            var extension = {};
            extension[method] = function (o) {
                var indexOf;
                if (typeof o == "string" || SVG.Color.isRgb(o)) {
                    this.attr(method, o)
                } else {
                    for (index = SVG["_" + method].length - 1; index >= 0; index--) {
                        if (o[SVG["_" + method][index]] != null) {
                            this.attr(_colorPrefix(method, SVG["_" + method][index]), o[SVG["_" + method][index]])
                        }
                    }
                }
                return this
            };
            SVG.extend(SVG.Shape, extension)
        });
        SVG.extend(SVG.Element, {
            scale: function (x, y) {
                return this.transform({scaleX: x, scaleY: y == null ? x : y})
            }, matrix: function (m) {
                return this.transform({matrix: m})
            }, opacity: function (value) {
                return this.attr("opacity", value)
            }
        });
        if (SVG.Text) {
            SVG.extend(SVG.Text, {
                font: function (o) {
                    for (var key in o) {
                        key == "anchor" ? this.attr("text-anchor", o[key]) : _styleAttr.indexOf(key) > -1 ? this.attr("font-" + key, o[key]) : this.attr(key, o[key])
                    }
                    return this
                }
            });
            /* Hammer.JS - v1.0.6dev - 2013-09-30
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */
        }
        var Hammer = function (element, options) {
            return new Hammer.Instance(element, options || {})
        };
        Hammer.defaults = {
            stop_browser_behavior: {
                userSelect: "none",
                touchAction: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        Hammer.HAS_POINTEREVENTS = window.navigator.pointerEnabled || window.navigator.msPointerEnabled;
        Hammer.HAS_TOUCHEVENTS = ("ontouchstart" in window);
        Hammer.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i;
        Hammer.NO_MOUSEEVENTS = Hammer.HAS_TOUCHEVENTS && window.navigator.userAgent.match(Hammer.MOBILE_REGEX);
        Hammer.EVENT_TYPES = {};
        Hammer.DIRECTION_DOWN = "down";
        Hammer.DIRECTION_LEFT = "left";
        Hammer.DIRECTION_UP = "up";
        Hammer.DIRECTION_RIGHT = "right";
        Hammer.POINTER_MOUSE = "mouse";
        Hammer.POINTER_TOUCH = "touch";
        Hammer.POINTER_PEN = "pen";
        Hammer.EVENT_START = "start";
        Hammer.EVENT_MOVE = "move";
        Hammer.EVENT_END = "end";
        Hammer.DOCUMENT = window.document;
        Hammer.plugins = {};
        Hammer.READY = false;

        function setup() {
            if (Hammer.READY) {
                return
            }
            Hammer.event.determineEventTypes();
            for (var name in Hammer.gestures) {
                if (Hammer.gestures.hasOwnProperty(name)) {
                    Hammer.detection.register(Hammer.gestures[name])
                }
            }
            Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_MOVE, Hammer.detection.detect);
            Hammer.event.onTouch(Hammer.DOCUMENT, Hammer.EVENT_END, Hammer.detection.detect);
            Hammer.READY = true
        }

        Hammer.Instance = function (element, options) {
            var self = this;
            setup();
            this.element = element;
            this.enabled = true;
            this.options = Hammer.utils.extend(Hammer.utils.extend({}, Hammer.defaults), options || {});
            if (this.options.stop_browser_behavior) {
                Hammer.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior)
            }
            Hammer.event.onTouch(element, Hammer.EVENT_START, function (ev) {
                if (self.enabled) {
                    Hammer.detection.startDetect(self, ev)
                }
            });
            return this
        };
        Hammer.Instance.prototype = {
            on: function onEvent(gesture, handler) {
                var gestures = gesture.split(" ");
                for (var t = 0; t < gestures.length; t++) {
                    this.element.addEventListener(gestures[t], handler, false)
                }
                return this
            }, off: function offEvent(gesture, handler) {
                var gestures = gesture.split(" ");
                for (var t = 0; t < gestures.length; t++) {
                    this.element.removeEventListener(gestures[t], handler, false)
                }
                return this
            }, trigger: function triggerEvent(gesture, eventData) {
                if (!eventData) {
                    eventData = {}
                }
                var event = Hammer.DOCUMENT.createEvent("Event");
                event.initEvent(gesture, true, true);
                event.gesture = eventData;
                var element = this.element;
                if (Hammer.utils.hasParent(eventData.target, element)) {
                    element = eventData.target
                }
                element.dispatchEvent(event);
                return this
            }, enable: function enable(state) {
                this.enabled = state;
                return this
            }
        };
        var last_move_event = null;
        var enable_detect = false;
        var touch_triggered = false;
        Hammer.event = {
            bindDom: function (element, type, handler) {
                var types = type.split(" ");
                for (var t = 0; t < types.length; t++) {
                    element.addEventListener(types[t], handler, false)
                }
            }, onTouch: function onTouch(element, eventType, handler) {
                var self = this;
                this.bindDom(element, Hammer.EVENT_TYPES[eventType], function bindDomOnTouch(ev) {
                    var sourceEventType = ev.type.toLowerCase();
                    if (sourceEventType.match(/mouse/) && touch_triggered) {
                        return
                    } else {
                        if (sourceEventType.match(/touch/) || sourceEventType.match(/pointerdown/) || (sourceEventType.match(/mouse/) && ev.which === 1)) {
                            enable_detect = true
                        } else {
                            if (sourceEventType.match(/mouse/) && ev.which !== 1) {
                                enable_detect = false
                            }
                        }
                    }
                    if (sourceEventType.match(/touch|pointer/)) {
                        touch_triggered = true
                    }
                    var count_touches = 0;
                    if (enable_detect) {
                        if (Hammer.HAS_POINTEREVENTS && eventType != Hammer.EVENT_END) {
                            count_touches = Hammer.PointerEvent.updatePointer(eventType, ev)
                        } else {
                            if (sourceEventType.match(/touch/)) {
                                count_touches = ev.touches.length
                            } else {
                                if (!touch_triggered) {
                                    count_touches = sourceEventType.match(/up/) ? 0 : 1
                                }
                            }
                        }
                        if (count_touches > 0 && eventType == Hammer.EVENT_END) {
                            eventType = Hammer.EVENT_MOVE
                        } else {
                            if (!count_touches) {
                                eventType = Hammer.EVENT_END
                            }
                        }
                        if (count_touches || last_move_event === null) {
                            last_move_event = ev
                        }
                        handler.call(Hammer.detection, self.collectEventData(element, eventType, self.getTouchList(last_move_event, eventType), ev));
                        if (Hammer.HAS_POINTEREVENTS && eventType == Hammer.EVENT_END) {
                            count_touches = Hammer.PointerEvent.updatePointer(eventType, ev)
                        }
                    }
                    if (!count_touches) {
                        last_move_event = null;
                        enable_detect = false;
                        touch_triggered = false;
                        Hammer.PointerEvent.reset()
                    }
                })
            }, determineEventTypes: function determineEventTypes() {
                var types;
                if (Hammer.HAS_POINTEREVENTS) {
                    types = Hammer.PointerEvent.getEvents()
                } else {
                    if (Hammer.NO_MOUSEEVENTS) {
                        types = ["touchstart", "touchmove", "touchend touchcancel"]
                    } else {
                        types = ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"]
                    }
                }
                Hammer.EVENT_TYPES[Hammer.EVENT_START] = types[0];
                Hammer.EVENT_TYPES[Hammer.EVENT_MOVE] = types[1];
                Hammer.EVENT_TYPES[Hammer.EVENT_END] = types[2]
            }, getTouchList: function getTouchList(ev) {
                if (Hammer.HAS_POINTEREVENTS) {
                    return Hammer.PointerEvent.getTouchList()
                } else {
                    if (ev.touches) {
                        return ev.touches
                    } else {
                        ev.indentifier = 1;
                        return [ev]
                    }
                }
            }, collectEventData: function collectEventData(element, eventType, touches, ev) {
                var pointerType = Hammer.POINTER_TOUCH;
                if (ev.type.match(/mouse/) || Hammer.PointerEvent.matchType(Hammer.POINTER_MOUSE, ev)) {
                    pointerType = Hammer.POINTER_MOUSE
                }
                return {
                    center: Hammer.utils.getCenter(touches),
                    timeStamp: new Date().getTime(),
                    target: ev.target,
                    touches: touches,
                    eventType: eventType,
                    pointerType: pointerType,
                    srcEvent: ev,
                    preventDefault: function () {
                        if (this.srcEvent.preventManipulation) {
                            this.srcEvent.preventManipulation()
                        }
                        if (this.srcEvent.preventDefault) {
                            this.srcEvent.preventDefault()
                        }
                    },
                    stopPropagation: function () {
                        this.srcEvent.stopPropagation()
                    },
                    stopDetect: function () {
                        return Hammer.detection.stopDetect()
                    }
                }
            }
        };
        Hammer.PointerEvent = {
            pointers: {}, getTouchList: function () {
                var self = this;
                var touchlist = [];
                Object.keys(self.pointers).sort().forEach(function (id) {
                    touchlist.push(self.pointers[id])
                });
                return touchlist
            }, updatePointer: function (type, pointerEvent) {
                if (type == Hammer.EVENT_END) {
                    this.pointers = {}
                } else {
                    pointerEvent.identifier = pointerEvent.pointerId;
                    this.pointers[pointerEvent.pointerId] = pointerEvent
                }
                return Object.keys(this.pointers).length
            }, matchType: function (pointerType, ev) {
                if (!ev.pointerType) {
                    return false
                }
                var types = {};
                types[Hammer.POINTER_MOUSE] = (ev.pointerType == ev.MSPOINTER_TYPE_MOUSE || ev.pointerType == Hammer.POINTER_MOUSE);
                types[Hammer.POINTER_TOUCH] = (ev.pointerType == ev.MSPOINTER_TYPE_TOUCH || ev.pointerType == Hammer.POINTER_TOUCH);
                types[Hammer.POINTER_PEN] = (ev.pointerType == ev.MSPOINTER_TYPE_PEN || ev.pointerType == Hammer.POINTER_PEN);
                return types[pointerType]
            }, getEvents: function () {
                return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
            }, reset: function () {
                this.pointers = {}
            }
        };
        Hammer.utils = {
            extend: function extend(dest, src, merge) {
                for (var key in src) {
                    if (dest[key] !== undefined && merge) {
                        continue
                    }
                    dest[key] = src[key]
                }
                return dest
            }, hasParent: function (node, parent) {
                while (node) {
                    if (node == parent) {
                        return true
                    }
                    node = node.parentNode
                }
                return false
            }, getCenter: function getCenter(touches) {
                var valuesX = [], valuesY = [];
                for (var t = 0, len = touches.length; t < len; t++) {
                    valuesX.push(touches[t].pageX);
                    valuesY.push(touches[t].pageY)
                }
                return {
                    pageX: ((Math.min.apply(Math, valuesX) + Math.max.apply(Math, valuesX)) / 2),
                    pageY: ((Math.min.apply(Math, valuesY) + Math.max.apply(Math, valuesY)) / 2)
                }
            }, getVelocity: function getVelocity(delta_time, delta_x, delta_y) {
                return {x: Math.abs(delta_x / delta_time) || 0, y: Math.abs(delta_y / delta_time) || 0}
            }, getAngle: function getAngle(touch1, touch2) {
                var y = touch2.pageY - touch1.pageY, x = touch2.pageX - touch1.pageX;
                return Math.atan2(y, x) * 180 / Math.PI
            }, getDirection: function getDirection(touch1, touch2) {
                var x = Math.abs(touch1.pageX - touch2.pageX), y = Math.abs(touch1.pageY - touch2.pageY);
                if (x >= y) {
                    return touch1.pageX - touch2.pageX > 0 ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT
                } else {
                    return touch1.pageY - touch2.pageY > 0 ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN
                }
            }, getDistance: function getDistance(touch1, touch2) {
                var x = touch2.pageX - touch1.pageX, y = touch2.pageY - touch1.pageY;
                return Math.sqrt((x * x) + (y * y))
            }, getScale: function getScale(start, end) {
                if (start.length >= 2 && end.length >= 2) {
                    return this.getDistance(end[0], end[1]) / this.getDistance(start[0], start[1])
                }
                return 1
            }, getRotation: function getRotation(start, end) {
                if (start.length >= 2 && end.length >= 2) {
                    return this.getAngle(end[1], end[0]) - this.getAngle(start[1], start[0])
                }
                return 0
            }, isVertical: function isVertical(direction) {
                return (direction == Hammer.DIRECTION_UP || direction == Hammer.DIRECTION_DOWN)
            }, stopDefaultBrowserBehavior: function stopDefaultBrowserBehavior(element, css_props) {
                var prop, vendors = ["webkit", "khtml", "moz", "Moz", "ms", "o", ""];
                if (!css_props || !element.style) {
                    return
                }
                for (var i = 0; i < vendors.length; i++) {
                    for (var p in css_props) {
                        if (css_props.hasOwnProperty(p)) {
                            prop = p;
                            if (vendors[i]) {
                                prop = vendors[i] + prop.substring(0, 1).toUpperCase() + prop.substring(1)
                            }
                            element.style[prop] = css_props[p]
                        }
                    }
                }
                if (css_props.userSelect == "none") {
                    element.onselectstart = function () {
                        return false
                    }
                }
                if (css_props.userDrag == "none") {
                    element.ondragstart = function () {
                        return false
                    }
                }
            }
        };
        Hammer.detection = {
            gestures: [],
            current: null,
            previous: null,
            stopped: false,
            startDetect: function startDetect(inst, eventData) {
                if (this.current) {
                    return
                }
                this.stopped = false;
                this.current = {inst: inst, startEvent: Hammer.utils.extend({}, eventData), lastEvent: false, name: ""};
                this.detect(eventData)
            },
            detect: function detect(eventData) {
                if (!this.current || this.stopped) {
                    return
                }
                eventData = this.extendEventData(eventData);
                var inst_options = this.current.inst.options;
                for (var g = 0, len = this.gestures.length; g < len; g++) {
                    var gesture = this.gestures[g];
                    if (!this.stopped && inst_options[gesture.name] !== false) {
                        if (gesture.handler.call(gesture, eventData, this.current.inst) === false) {
                            this.stopDetect();
                            break
                        }
                    }
                }
                if (this.current) {
                    this.current.lastEvent = eventData
                }
                if (eventData.eventType == Hammer.EVENT_END && !eventData.touches.length - 1) {
                    this.stopDetect()
                }
                return eventData
            },
            stopDetect: function stopDetect() {
                this.previous = Hammer.utils.extend({}, this.current);
                this.current = null;
                this.stopped = true
            },
            extendEventData: function extendEventData(ev) {
                var startEv = this.current.startEvent;
                if (startEv && (ev.touches.length != startEv.touches.length || ev.touches === startEv.touches)) {
                    startEv.touches = [];
                    for (var i = 0, len = ev.touches.length; i < len; i++) {
                        startEv.touches.push(Hammer.utils.extend({}, ev.touches[i]))
                    }
                }
                var delta_time = ev.timeStamp - startEv.timeStamp, delta_x = ev.center.pageX - startEv.center.pageX,
                    delta_y = ev.center.pageY - startEv.center.pageY,
                    velocity = Hammer.utils.getVelocity(delta_time, delta_x, delta_y);
                Hammer.utils.extend(ev, {
                    deltaTime: delta_time,
                    deltaX: delta_x,
                    deltaY: delta_y,
                    velocityX: velocity.x,
                    velocityY: velocity.y,
                    distance: Hammer.utils.getDistance(startEv.center, ev.center),
                    angle: Hammer.utils.getAngle(startEv.center, ev.center),
                    interimAngle: this.current.lastEvent && Hammer.utils.getAngle(this.current.lastEvent.center, ev.center),
                    direction: Hammer.utils.getDirection(startEv.center, ev.center),
                    interimDirection: this.current.lastEvent && Hammer.utils.getDirection(this.current.lastEvent.center, ev.center),
                    scale: Hammer.utils.getScale(startEv.touches, ev.touches),
                    rotation: Hammer.utils.getRotation(startEv.touches, ev.touches),
                    startEvent: startEv
                });
                return ev
            },
            register: function register(gesture) {
                var options = gesture.defaults || {};
                if (options[gesture.name] === undefined) {
                    options[gesture.name] = true
                }
                Hammer.utils.extend(Hammer.defaults, options, true);
                gesture.index = gesture.index || 1000;
                this.gestures.push(gesture);
                this.gestures.sort(function (a, b) {
                    if (a.index < b.index) {
                        return -1
                    }
                    if (a.index > b.index) {
                        return 1
                    }
                    return 0
                });
                return this.gestures
            }
        };
        Hammer.gestures = Hammer.gestures || {};
        Hammer.gestures.Tap = {
            name: "tap",
            index: 100,
            defaults: {
                tap_max_touchtime: 250,
                tap_max_distance: 10,
                tap_always: true,
                doubletap_distance: 20,
                doubletap_interval: 300
            },
            handler: function tapGesture(ev, inst) {
                if (ev.eventType == Hammer.EVENT_END && ev.srcEvent.type != "touchcancel") {
                    var prev = Hammer.detection.previous, did_doubletap = false;
                    if (ev.deltaTime > inst.options.tap_max_touchtime || ev.distance > inst.options.tap_max_distance) {
                        return
                    }
                    if (prev && prev.name == "tap" && (ev.timeStamp - prev.lastEvent.timeStamp) < inst.options.doubletap_interval && ev.distance < inst.options.doubletap_distance) {
                        inst.trigger("doubletap", ev);
                        did_doubletap = true
                    }
                    if (!did_doubletap || inst.options.tap_always) {
                        Hammer.detection.current.name = "tap";
                        inst.trigger(Hammer.detection.current.name, ev)
                    }
                }
            }
        };
        Hammer.gestures.Drag = {
            name: "drag",
            index: 50,
            defaults: {
                drag_min_distance: 10,
                correct_for_drag_min_distance: true,
                drag_max_touches: 1,
                drag_block_horizontal: false,
                drag_block_vertical: false,
                drag_lock_to_axis: false,
                drag_lock_min_distance: 25
            },
            triggered: false,
            handler: function dragGesture(ev, inst) {
                if (Hammer.detection.current.name != this.name && this.triggered) {
                    inst.trigger(this.name + "end", ev);
                    this.triggered = false;
                    return
                }
                if (inst.options.drag_max_touches > 0 && ev.touches.length > inst.options.drag_max_touches) {
                    return
                }
                switch (ev.eventType) {
                    case Hammer.EVENT_START:
                        this.triggered = false;
                        break;
                    case Hammer.EVENT_MOVE:
                        if (ev.distance < inst.options.drag_min_distance && Hammer.detection.current.name != this.name) {
                            return
                        }
                        if (Hammer.detection.current.name != this.name) {
                            Hammer.detection.current.name = this.name;
                            if (inst.options.correct_for_drag_min_distance) {
                                var factor = Math.abs(inst.options.drag_min_distance / ev.distance);
                                Hammer.detection.current.startEvent.center.pageX += ev.deltaX * factor;
                                Hammer.detection.current.startEvent.center.pageY += ev.deltaY * factor;
                                ev = Hammer.detection.extendEventData(ev)
                            }
                        }
                        if (Hammer.detection.current.lastEvent.drag_locked_to_axis || (inst.options.drag_lock_to_axis && inst.options.drag_lock_min_distance <= ev.distance)) {
                            ev.drag_locked_to_axis = true
                        }
                        var last_direction = Hammer.detection.current.lastEvent.direction;
                        if (ev.drag_locked_to_axis && last_direction !== ev.direction) {
                            if (Hammer.utils.isVertical(last_direction)) {
                                ev.direction = (ev.deltaY < 0) ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN
                            } else {
                                ev.direction = (ev.deltaX < 0) ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT
                            }
                        }
                        if (!this.triggered) {
                            inst.trigger(this.name + "start", ev);
                            this.triggered = true
                        }
                        inst.trigger(this.name, ev);
                        inst.trigger(this.name + ev.direction, ev);
                        if ((inst.options.drag_block_vertical && Hammer.utils.isVertical(ev.direction)) || (inst.options.drag_block_horizontal && !Hammer.utils.isVertical(ev.direction))) {
                            ev.preventDefault()
                        }
                        break;
                    case Hammer.EVENT_END:
                        if (this.triggered) {
                            inst.trigger(this.name + "end", ev)
                        }
                        this.triggered = false;
                        break
                }
            }
        };
        Hammer.gestures.Transform = {
            name: "transform",
            index: 45,
            defaults: {transform_min_scale: 0.01, transform_min_rotation: 1, transform_always_block: false},
            triggered: false,
            handler: function transformGesture(ev, inst) {
                if (Hammer.detection.current.name != this.name && this.triggered) {
                    inst.trigger(this.name + "end", ev);
                    this.triggered = false;
                    return
                }
                if (ev.touches.length < 2) {
                    return
                }
                if (inst.options.transform_always_block) {
                    ev.preventDefault()
                }
                switch (ev.eventType) {
                    case Hammer.EVENT_START:
                        this.triggered = false;
                        break;
                    case Hammer.EVENT_MOVE:
                        var scale_threshold = Math.abs(1 - ev.scale);
                        var rotation_threshold = Math.abs(ev.rotation);
                        if (scale_threshold < inst.options.transform_min_scale && rotation_threshold < inst.options.transform_min_rotation) {
                            return
                        }
                        Hammer.detection.current.name = this.name;
                        if (!this.triggered) {
                            inst.trigger(this.name + "start", ev);
                            this.triggered = true
                        }
                        inst.trigger(this.name, ev);
                        if (rotation_threshold > inst.options.transform_min_rotation) {
                            inst.trigger("rotate", ev)
                        }
                        if (scale_threshold > inst.options.transform_min_scale) {
                            inst.trigger("pinch", ev);
                            inst.trigger("pinch" + ((ev.scale < 1) ? "in" : "out"), ev)
                        }
                        break;
                    case Hammer.EVENT_END:
                        if (this.triggered) {
                            inst.trigger(this.name + "end", ev)
                        }
                        this.triggered = false;
                        break
                }
            }
        };
        (function (root, factory) {
            if (typeof module === "object" && typeof module.exports === "object") {
                module.exports = factory()
            } else {
                if (typeof define === "function" && define.amd) {
                    define([], factory)
                } else {
                    root.Thenjs = factory()
                }
            }
        }(typeof window === "object" ? window : this, function () {
            var maxTickDepth = 100, toString = Object.prototype.toString,
                nextTick = typeof setImmediate === "function" ? setImmediate : function (fn) {
                    setTimeout(fn, 0)
                }, isArray = Array.isArray || function (obj) {
                    return toString.call(obj) === "[object Array]"
                };

            function slice(args, start) {
                start = start || 0;
                if (start >= args.length) {
                    return []
                }
                var len = args.length, ret = Array(len - start);
                while (len-- > start) {
                    ret[len - start] = args[len]
                }
                return ret
            }

            function carry(errorHandler, fn) {
                try {
                    fn.apply(null, slice(arguments, 2))
                } catch (error) {
                    errorHandler(error)
                }
            }

            function defer(errorHandler, fn) {
                var args = arguments;
                nextTick(function () {
                    carry.apply(null, args)
                })
            }

            function toThunk(object) {
                if (object == null) {
                    return object
                }
                if (typeof object.toThunk === "function") {
                    return object.toThunk()
                }
                if (typeof object.then === "function") {
                    return function (callback) {
                        object.then(function (res) {
                            callback(null, res)
                        }, callback)
                    }
                } else {
                    return object
                }
            }

            function Thenjs(start, debug) {
                var self = this, cont;
                if (start instanceof Thenjs) {
                    return start
                }
                if (!(self instanceof Thenjs)) {
                    return new Thenjs(start, debug)
                }
                self._success = self._each = self._eachSeries = self._parallel = self._series = null;
                self._finally = self._error = self._fail = self._result = self._nextThen = self._chain = null;
                if (!arguments.length) {
                    return self
                }
                cont = genContinuation(self, debug);
                start = toThunk(start);
                if (start == null) {
                    cont()
                } else {
                    if (typeof start === "function") {
                        defer(cont, start, cont)
                    } else {
                        cont(null, start)
                    }
                }
            }

            Thenjs.defer = defer;
            Thenjs.each = function (array, iterator, debug) {
                return thenFactory(function (cont) {
                    defer(cont, each, cont, array, iterator)
                }, null, debug)
            };
            Thenjs.eachSeries = function (array, iterator, debug) {
                return thenFactory(function (cont) {
                    defer(cont, eachSeries, cont, array, iterator)
                }, null, debug)
            };
            Thenjs.parallel = function (array, debug) {
                return thenFactory(function (cont) {
                    defer(cont, parallel, cont, array)
                }, null, debug)
            };
            Thenjs.series = function (array, debug) {
                return thenFactory(function (cont) {
                    defer(cont, series, cont, array)
                }, null, debug)
            };
            Thenjs.nextTick = function (fn) {
                var args = slice(arguments, 1);
                nextTick(function () {
                    fn.apply(null, args)
                })
            };
            Thenjs.onerror = function (error) {
                console.error("Thenjs caught error: ", error);
                throw error
            };
            var proto = Thenjs.prototype;
            proto.fin = proto.all = proto["finally"] = function (finallyHandler) {
                return thenFactory(function (cont, self) {
                    self._finally = wrapTaskHandler(cont, finallyHandler)
                }, this)
            };
            proto.then = function (successHandler, errorHandler) {
                return thenFactory(function (cont, self) {
                    self._success = wrapTaskHandler(cont, successHandler);
                    self._error = errorHandler && wrapTaskHandler(cont, errorHandler)
                }, this)
            };
            proto.fail = proto["catch"] = function (errorHandler) {
                return thenFactory(function (cont, self) {
                    self._fail = wrapTaskHandler(cont, errorHandler);
                    self._success = function () {
                        cont.apply(null, [null].concat(slice(arguments)))
                    }
                }, this)
            };
            proto.each = function (array, iterator) {
                return thenFactory(function (cont, self) {
                    self._each = function (dArray, dIterator) {
                        each(cont, array || dArray, iterator || dIterator)
                    }
                }, this)
            };
            proto.eachSeries = function (array, iterator) {
                return thenFactory(function (cont, self) {
                    self._eachSeries = function (dArray, dIterator) {
                        eachSeries(cont, array || dArray, iterator || dIterator)
                    }
                }, this)
            };
            proto.parallel = function (array) {
                return thenFactory(function (cont, self) {
                    self._parallel = function (dArray) {
                        parallel(cont, array || dArray)
                    }
                }, this)
            };
            proto.series = function (array) {
                return thenFactory(function (cont, self) {
                    self._series = function (dArray) {
                        series(cont, array || dArray)
                    }
                }, this)
            };
            proto.toThunk = function () {
                var self = this;
                return function (callback) {
                    if (self._result) {
                        callback.apply(null, self._result);
                        self._result = false
                    } else {
                        if (self._result !== false) {
                            self._finally = callback
                        }
                    }
                }
            };

            function continuation(error) {
                var self = this, args = arguments;
                if (self._result === false) {
                    return
                }
                if (!self._result && self._chain) {
                    self.debug.apply(self, ["\nChain " + self._chain + ": "].concat(slice(args)))
                }
                self._result = false;
                carry(function (err) {
                    continuationError(self, err, error)
                }, continuationExec, self, args, error)
            }

            function continuationExec(ctx, args, error) {
                if (ctx._finally) {
                    return ctx._finally.apply(null, args)
                }
                if (error != null) {
                    throw error
                }
                var success = ctx._success || ctx._each || ctx._eachSeries || ctx._parallel || ctx._series;
                if (success) {
                    return success.apply(null, slice(args, 1))
                }
                ctx._result = args
            }

            function continuationError(ctx, err, error) {
                var _nextThen = ctx, errorHandler = ctx._error || ctx._fail;
                if (ctx._nextThen && error == null) {
                    errorHandler = null;
                    _nextThen = ctx._nextThen
                }
                while (!errorHandler && _nextThen) {
                    errorHandler = _nextThen._fail;
                    _nextThen = _nextThen._nextThen
                }
                if (errorHandler) {
                    return errorHandler(err)
                }
                if (Thenjs.onerror) {
                    return Thenjs.onerror(err)
                }
                _nextThen._result = [err]
            }

            function genContinuation(ctx, debug) {
                function cont() {
                    return continuation.apply(ctx, arguments)
                }

                cont._isCont = true;
                if (debug) {
                    proto.debug = typeof debug === "function" ? debug : defaultDebug;
                    ctx._chain = 1
                }
                return cont
            }

            function thenFactory(fn, ctx, debug) {
                var nextThen = new Thenjs(), cont = genContinuation(nextThen, debug);
                fn(cont, ctx);
                if (!ctx) {
                    return nextThen
                }
                ctx._nextThen = nextThen;
                if (ctx._chain) {
                    nextThen._chain = ctx._chain + 1
                }
                if (ctx._result) {
                    nextTick(function () {
                        continuation.apply(ctx, ctx._result)
                    })
                }
                return nextThen
            }

            function wrapTaskHandler(cont, handler) {
                return handler._isCont ? handler : function () {
                    var args = slice(arguments);
                    args.unshift(cont);
                    handler.apply(null, args)
                }
            }

            function parallelNext(cont, result, counter, i) {
                function next(error, value) {
                    if (counter.finished) {
                        return
                    }
                    if (error != null) {
                        return (counter.finished = true, cont(error))
                    }
                    result[i] = value;
                    return --counter.i < 0 && cont(null, result)
                }

                next._isCont = true;
                return next
            }

            function each(cont, array, iterator) {
                var end, result = [], counter = {};
                if (!isArray(array)) {
                    return cont(errorify(array, "each"))
                }
                counter.i = end = array.length - 1;
                if (end < 0) {
                    return cont(null, result)
                }
                for (var i = 0; i <= end; i++) {
                    iterator(parallelNext(cont, result, counter, i), array[i], i, array)
                }
            }

            function parallel(cont, array) {
                var end, result = [], counter = {};
                if (!isArray(array)) {
                    return cont(errorify(array, "parallel"))
                }
                counter.i = end = array.length - 1;
                if (end < 0) {
                    return cont(null, result)
                }
                for (var i = 0; i <= end; i++) {
                    array[i](parallelNext(cont, result, counter, i), i, array)
                }
            }

            function eachSeries(cont, array, iterator) {
                var i = 0, end, result = [], run, stack = maxTickDepth;

                function next(error, value) {
                    if (error != null) {
                        return cont(error)
                    }
                    result[i] = value;
                    if (++i > end) {
                        return cont(null, result)
                    }
                    run = --stack > 0 ? carry : (stack = maxTickDepth, defer);
                    run(cont, iterator, next, array[i], i, array)
                }

                next._isCont = true;
                if (!isArray(array)) {
                    return cont(errorify(array, "eachSeries"))
                }
                end = array.length - 1;
                if (end < 0) {
                    return cont(null, result)
                }
                iterator(next, array[0], 0, array)
            }

            function series(cont, array) {
                var i = 0, end, result = [], run, stack = maxTickDepth;

                function next(error, value) {
                    if (error != null) {
                        return cont(error)
                    }
                    result[i] = value;
                    if (++i > end) {
                        return cont(null, result)
                    }
                    run = --stack > 0 ? carry : (stack = maxTickDepth, defer);
                    run(cont, array[i], next, i, array)
                }

                next._isCont = true;
                if (!isArray(array)) {
                    return cont(errorify(array, "series"))
                }
                end = array.length - 1;
                if (end < 0) {
                    return cont(null, result)
                }
                array[0](next, 0, array)
            }

            function defaultDebug() {
                console.log.apply(console, arguments)
            }

            function errorify(obj, method) {
                return new Error("The argument " + (obj && obj.toString()) + ' in "' + method + '" is not Array!')
            }

            Thenjs.NAME = "Thenjs";
            Thenjs.VERSION = "1.4.5";
            return Thenjs
        }));
        var BMapSub = BMapSub || {};
        BMapSub._register = [];
        BMapSub.register = function (handler) {
            this._register.push(handler)
        };
        var AUTHENTIC_KEY = window.BMAP_AUTHENTIC_KEY || "";
        BMapSub._rd = {};
        BMapSub.verify = function () {
            var url = BMapSub.apiUrl + "?qt=verify&ak=" + AUTHENTIC_KEY;
            ApiUtil.request(url, function (json) {
                if (json && json.error !== 0) {
                    BMapSub = null;
                    var msg = "百度未授权使用地图API，可能是因为您提供的密钥不是有效的百度LBS开放平台密钥，或此密钥未对本应用的百度地图JavaScriptAPI授权。您可以访问如下网址了解如何获取有效的密钥：http://lbsyun.baidu.com/apiconsole/key#。";
                    switch (json.error) {
                        case 101:
                            msg = "开发者禁用了该ak的jsapi服务权限。您可以访问如下网址了解如何获取有效的密钥：http://lbsyun.baidu.com/apiconsole/key#。";
                            break;
                        case 102:
                            msg = "开发者Referer不正确。您可以访问如下网址了解如何获取有效的密钥：http://lbsyun.baidu.com/apiconsole/key#。";
                            break
                    }
                    alert(msg)
                }
            })
        };
        var SUBWAY_DEFAULT_CITY = 0;
        var SubwayCitiesList = [{keyword: "beijing", name: "北京", citycode: "131"}, {
            keyword: "shanghai",
            name: "上海",
            citycode: "289",
        }, {keyword: "guangzhou", name: "广州", citycode: "257",}, {
            keyword: "shenzhen",
            name: "深圳",
            citycode: "340",
        }, {keyword: "hongkong", name: "香港", citycode: "2912",}, {
            keyword: "chengdu",
            name: "成都",
            citycode: "75",
        }, {keyword: "changchun", name: "长春", citycode: "53",}, {
            keyword: "chongqing",
            name: "重庆",
            citycode: "132",
        }, {keyword: "dalian", name: "大连", citycode: "167",}, {
            keyword: "foshan",
            name: "佛山",
            citycode: "138",
        }, {keyword: "hangzhou", name: "杭州", citycode: "179",}, {
            keyword: "kunming",
            name: "昆明",
            citycode: "104",
        }, {keyword: "nanjing", name: "南京", citycode: "315",}, {
            keyword: "shenyang",
            name: "沈阳",
            citycode: "58",
        }, {keyword: "suzhou", name: "苏州", citycode: "224",}, {
            keyword: "tianjin",
            name: "天津",
            citycode: "332",
        }, {keyword: "wuhan", name: "武汉", citycode: "218",}, {
            keyword: "xian",
            name: "西安",
            citycode: "233",
        }, {keyword: "haerbin", name: "哈尔滨", citycode: "48",}, {
            keyword: "zhengzhou",
            name: "郑州",
            citycode: "268",
        }, {keyword: "changsha", name: "长沙", citycode: "158",}, {
            keyword: "ningbo",
            name: "宁波",
            citycode: "180",
        }, {keyword: "wuxi", name: "无锡", citycode: "317",}, {
            keyword: "taibei",
            name: "台北",
            citycode: "9002",
        }, {keyword: "gaoxiong", name: "高雄", citycode: "9019",}, {
            keyword: "qingdao",
            name: "青岛",
            citycode: "236",
        }, {keyword: "nanchang", name: "南昌", citycode: "163",}, {
            keyword: "fuzhou",
            name: "福州",
            citycode: "300",
        }, {keyword: "dongguan", name: "东莞", citycode: "119",}, {keyword: "nanning", name: "南宁", citycode: "261",}];
        BMapSub.httpUrl = {
            baidumap: "map.baidu.com",
            main_domain_nocdn: {baidu: "api.map.baidu.com"},
            main_domain_cdn: {
                other: ["api.map.baidu.com"],
                baidu: ["api0.map.bdimg.com", "api1.map.bdimg.com", "api2.map.bdimg.com"]
            }
        };
        BMapSub.httpsUrl = {
            baidumap: "gsp0.baidu.com/80MWsjip0QIZ8tyhnq",
            main_domain_nocdn: {baidu: "gsp0.baidu.com/9_Q4sjOpB1gCo2Kml5_Y_D3", other: "api.map.baidu.com"},
            main_domain_cdn: {
                other: "api.map.baidu.com",
                baidu: ["gss0.bdstatic.com/9_Q4vHSd2RZ3otebn9fN2DJv", "gss0.baidu.com/9_Q4vXSd2RZ3otebn9fN2DJv", "gss0.bdstatic.com/9_Q4vnSd2RZ3otebn9fN2DJv"]
            }
        };
        BMapSub.urlType = {
            "0": {proto: "http://", domain: BMapSub.httpUrl},
            "1": {proto: "https://", domain: BMapSub.httpsUrl},
            "2": {proto: "https://", domain: BMapSub.httpsUrl}
        };
        if (window.BMAP_PROTOCOL && window.BMAP_PROTOCOL === "https") {
            window.HOST_TYPE = 2
        }
        BMapSub.urlStr = window.HOST_TYPE || "0";
        BMapSub.url = BMapSub.urlType[BMapSub.urlStr];
        BMapSub.mapUrl = BMapSub.url.proto + BMapSub.url.domain["baidumap"] + "/";
        BMapSub.apiUrl = BMapSub.url.proto + (BMapSub.urlStr == "2" ? BMapSub.url.domain["main_domain_nocdn"]["other"] : BMapSub.url.domain["main_domain_nocdn"]["baidu"]) + "/";
        BMapSub.apiUrlCdn = BMapSub.url.proto + (BMapSub.urlStr == "2" ? BMapSub.url.domain["main_domain_cdn"]["other"] : BMapSub.url.domain["main_domain_cdn"]["baidu"][0]) + "/";
        var ApiUtil = {
            getCurrentStyle: function (el) {
                if (el.currentStyle) {
                    return el.currentStyle
                } else {
                    if (el.ownerDocument && el.ownerDocument.defaultView) {
                        return el.ownerDocument.defaultView.getComputedStyle(el, null)
                    }
                }
            }, request: function (url, cbk) {
                if (cbk) {
                    var timeStamp = (Math.random() * 100000).toFixed(0);
                    BMapSub._rd["_cbk" + timeStamp] = function (json) {
                        cbk && cbk(json);
                        delete BMapSub._rd["_cbk" + timeStamp]
                    };
                    url += "&callback=BMapSub._rd._cbk" + timeStamp
                }
                var script = this.create("script", {src: url, type: "text/javascript", charset: "utf-8"});
                script.addEventListener("load", function (e) {
                    var t = e.target;
                    t.parentNode.removeChild(t)
                }, false);
                document.getElementsByTagName("head")[0].appendChild(script);
                script = null
            }, create: function (tag, attr, ns) {
                var e = document.createElement(tag);
                if (ns) {
                    e = document.createElementNS(ns, tag)
                }
                return baidu.dom.setAttrs(e, attr || {})
            }, parseGeo: function (geo) {
                if (typeof(geo) !== "string") {
                    return
                }
                var info = geo.split("|");
                var type = parseInt(info[0]);
                var bound = info[1];
                var points = info[2];
                var parts = points.split(";");
                var arr = [];
                switch (type) {
                    case 1:
                        arr.push(parts[0]);
                        break;
                    case 2:
                    case 3:
                        for (var i = 0; i < parts.length - 1; i++) {
                            var coords = parts[i];
                            if (coords.length > 100) {
                                coords = coords.replace(/(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*),(-?[1-9]\d*\.\d*|-?0\.\d*[1-9]\d*|-?0?\.0+|0|-?[1-9]\d*)(,)/g, "$1,$2;");
                                arr.push(coords)
                            } else {
                                var str = [];
                                var ps = coords.split(",");
                                for (var j = 0; j < ps.length; j += 2) {
                                    var x = ps[j];
                                    var y = ps[j + 1];
                                    str.push(x + "," + y)
                                }
                                arr.push(str.join(";"))
                            }
                        }
                        break
                }
                if (arr.length <= 1) {
                    arr = arr.toString()
                }
                return {type: type, bound: bound, points: arr}
            }
        };
        var localStorage = window.localStorage;
        var splitStrStart = "<#lsvalid#>";
        var splitStrEnd = "</#lsvalid#>";
        var splitReg = new RegExp("^(<#lsvalid#>)(.*)(</#lsvalid#>)$");
        var Storage = function () {
        };
        var storagePrototype = Storage.prototype;
        storagePrototype.deleteData = function (key, options) {
            if (!localStorage) {
                return
            }
            options = options || {};
            try {
                localStorage.removeItem(key);
                options.success && options.success()
            } catch (e) {
                options.error && options.error()
            }
        };
        storagePrototype.addData = function (key, value, options) {
            if (!localStorage) {
                return
            }
            options = options || {};
            try {
                localStorage.setItem(key, splitStrStart + JSON.stringify(value) + splitStrEnd);
                options.success && options.success()
            } catch (e) {
                options.error && options.error()
            }
        };
        storagePrototype.getData = function (key) {
            if (!localStorage) {
                return
            }
            var value = localStorage.getItem(key);
            if (value === null) {
                return null
            }
            var match = null;
            if (match = value.match(splitReg)) {
                value = match[2];
                return value
            }
        };
        storagePrototype.selectData = function (key, options) {
            if (!localStorage) {
                return
            }
            var value = localStorage.getItem(key);
            var result;
            options = options || {};
            if (value === null) {
                options.success && options.success(value);
                return
            }
            var match = null;
            if (match = value.match(splitReg)) {
                value = match[2];
                try {
                    result = JSON.parse(value);
                    options.success && options.success(result)
                } catch (e) {
                    options.error && options.error()
                }
            } else {
                options.error && options.error()
            }
        };
        var storage = new Storage();
        var listener = {};
        (function () {
            var EXECTIME = 50, DELAY = 25;
            var that = {}, timer = "", slice = [].slice, channelList = {};
            var on = function (channel, type, callback, context) {
                var curChannel = channelList[channel];
                if (!curChannel) {
                    curChannel = channelList[channel] = {}
                }
                curChannel[type] = curChannel[type] || [];
                curChannel[type].push({func: callback, context: context || that})
            };
            var once = function (channel, type, callback, context) {
                var _once = function () {
                    that.off(channel, type, _once);
                    return callback.apply(context || that, arguments)
                };
                on(channel, type, _once, context)
            };
            var trigger = function (channel, type, data) {
                if (channelList[channel] && channelList[channel][type] && channelList[channel][type].length) {
                    var taskList = channelList[channel][type];
                    var curHandlers = [];
                    for (var i = taskList.length; i--;) {
                        curHandlers.push({handler: taskList[i], args: slice.call(arguments, 1)})
                    }
                    (function () {
                        var start = +new Date();
                        do {
                            var curTask = curHandlers.shift(), handler = curTask.handler;
                            try {
                                handler.func.apply(handler.context, curTask.args)
                            } catch (exp) {
                            }
                        } while (curHandlers.length && (+new Date() - start < EXECTIME));
                        if (curHandlers.length > 0) {
                            setTimeout(arguments.callee, DELAY)
                        }
                    })()
                }
            };
            var off = function (channel, type, callback, context) {
                context = context || that;
                if (channelList[channel] && channelList[channel][type] && channelList[channel][type].length) {
                    var taskList = channelList[channel][type];
                    var handler;
                    for (var i = taskList.length; i--;) {
                        handler = taskList[i];
                        if (handler.func === callback && handler.context === context) {
                            taskList.splice(i, 1)
                        }
                    }
                }
            };
            that.on = on;
            that.once = once;
            that.trigger = trigger;
            that.off = off;
            listener = that
        })();
        (function (undefined) {
            if (String.prototype.trim === undefined) {
                String.prototype.trim = function () {
                    return this.replace(/^\s+|\s+$/g, "")
                }
            }
            if (Array.prototype.reduce === undefined) {
                Array.prototype.reduce = function (fun) {
                    if (this === void 0 || this === null) {
                        throw new TypeError()
                    }
                    var t = Object(this), len = t.length >>> 0, k = 0, accumulator;
                    if (typeof fun != "function") {
                        throw new TypeError()
                    }
                    if (len == 0 && arguments.length == 1) {
                        throw new TypeError()
                    }
                    if (arguments.length >= 2) {
                        accumulator = arguments[1]
                    } else {
                        do {
                            if (k in t) {
                                accumulator = t[k++];
                                break
                            }
                            if (++k >= len) {
                                throw new TypeError()
                            }
                        } while (true)
                    }
                    while (k < len) {
                        if (k in t) {
                            accumulator = fun.call(undefined, accumulator, t[k], k, t)
                        }
                        k++
                    }
                    return accumulator
                }
            }
        })();
        var Zepto = (function () {
            var undefined, key, $, classList, emptyArray = [], slice = emptyArray.slice, filter = emptyArray.filter,
                document = window.document, elementDisplay = {}, classCache = {},
                getComputedStyle = document.defaultView.getComputedStyle, cssNumber = {
                    "column-count": 1,
                    columns: 1,
                    "font-weight": 1,
                    "line-height": 1,
                    opacity: 1,
                    "z-index": 1,
                    zoom: 1
                }, fragmentRE = /^\s*<(\w+|!)[^>]*>/,
                tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
                rootNodeRE = /^(?:body|html)$/i,
                methodAttributes = ["val", "css", "html", "text", "data", "width", "height", "offset"],
                adjacencyOperators = ["after", "prepend", "before", "append"], table = document.createElement("table"),
                tableRow = document.createElement("tr"), containers = {
                    tr: document.createElement("tbody"),
                    tbody: table,
                    thead: table,
                    tfoot: table,
                    td: tableRow,
                    th: tableRow,
                    "*": document.createElement("div")
                }, readyRE = /complete|loaded|interactive/, classSelectorRE = /^\.([\w-]+)$/, idSelectorRE = /^#([\w-]*)$/,
                tagSelectorRE = /^[\w-]+$/, class2type = {}, toString = class2type.toString, zepto = {}, camelize, uniq,
                tempParent = document.createElement("div");
            zepto.matches = function (element, selector) {
                if (!element || element.nodeType !== 1) {
                    return false
                }
                var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
                if (matchesSelector) {
                    return matchesSelector.call(element, selector)
                }
                var match, parent = element.parentNode, temp = !parent;
                if (temp) {
                    (parent = tempParent).appendChild(element)
                }
                match = ~zepto.qsa(parent, selector).indexOf(element);
                temp && tempParent.removeChild(element);
                return match
            };

            function type(obj) {
                return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
            }

            function isFunction(value) {
                return type(value) == "function"
            }

            function isWindow(obj) {
                return obj != null && obj == obj.window
            }

            function isDocument(obj) {
                return obj != null && obj.nodeType == obj.DOCUMENT_NODE
            }

            function isObject(obj) {
                return type(obj) == "object"
            }

            function isPlainObject(obj) {
                return isObject(obj) && !isWindow(obj) && obj.__proto__ == Object.prototype
            }

            function isArray(value) {
                return value instanceof Array
            }

            function likeArray(obj) {
                return typeof obj.length == "number"
            }

            function compact(array) {
                return filter.call(array, function (item) {
                    return item != null
                })
            }

            function flatten(array) {
                return array.length > 0 ? $.fn.concat.apply([], array) : array
            }

            camelize = function (str) {
                return str.replace(/-+(.)?/g, function (match, chr) {
                    return chr ? chr.toUpperCase() : ""
                })
            };

            function dasherize(str) {
                return str.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            }

            uniq = function (array) {
                return filter.call(array, function (item, idx) {
                    return array.indexOf(item) == idx
                })
            };

            function classRE(name) {
                return name in classCache ? classCache[name] : (classCache[name] = new RegExp("(^|\\s)" + name + "(\\s|$)"))
            }

            function maybeAddPx(name, value) {
                return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
            }

            function defaultDisplay(nodeName) {
                var element, display;
                if (!elementDisplay[nodeName]) {
                    element = document.createElement(nodeName);
                    document.body.appendChild(element);
                    display = getComputedStyle(element, "").getPropertyValue("display");
                    element.parentNode.removeChild(element);
                    display == "none" && (display = "block");
                    elementDisplay[nodeName] = display
                }
                return elementDisplay[nodeName]
            }

            function children(element) {
                return "children" in element ? slice.call(element.children) : $.map(element.childNodes, function (node) {
                    if (node.nodeType == 1) {
                        return node
                    }
                })
            }

            zepto.fragment = function (html, name, properties) {
                if (html.replace) {
                    html = html.replace(tagExpanderRE, "<$1></$2>")
                }
                if (name === undefined) {
                    name = fragmentRE.test(html) && RegExp.$1
                }
                if (!(name in containers)) {
                    name = "*"
                }
                var nodes, dom, container = containers[name];
                container.innerHTML = "" + html;
                dom = $.each(slice.call(container.childNodes), function () {
                    container.removeChild(this)
                });
                if (isPlainObject(properties)) {
                    nodes = $(dom);
                    $.each(properties, function (key, value) {
                        if (methodAttributes.indexOf(key) > -1) {
                            nodes[key](value)
                        } else {
                            nodes.attr(key, value)
                        }
                    })
                }
                return dom
            };
            zepto.Z = function (dom, selector) {
                dom = dom || [];
                dom.__proto__ = $.fn;
                dom.selector = selector || "";
                return dom
            };
            zepto.isZ = function (object) {
                return object instanceof zepto.Z
            };
            zepto.init = function (selector, context) {
                if (!selector) {
                    return zepto.Z()
                } else {
                    if (isFunction(selector)) {
                        return $(document).ready(selector)
                    } else {
                        if (zepto.isZ(selector)) {
                            return selector
                        } else {
                            var dom;
                            if (isArray(selector)) {
                                dom = compact(selector)
                            } else {
                                if (isObject(selector)) {
                                    dom = [isPlainObject(selector) ? $.extend({}, selector) : selector], selector = null
                                } else {
                                    if (fragmentRE.test(selector)) {
                                        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
                                    } else {
                                        if (context !== undefined) {
                                            return $(context).find(selector)
                                        } else {
                                            dom = zepto.qsa(document, selector)
                                        }
                                    }
                                }
                            }
                            return zepto.Z(dom, selector)
                        }
                    }
                }
            };
            $ = function (selector, context) {
                return zepto.init(selector, context)
            };

            function extend(target, source, deep) {
                for (key in source) {
                    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                        if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                            target[key] = {}
                        }
                        if (isArray(source[key]) && !isArray(target[key])) {
                            target[key] = []
                        }
                        extend(target[key], source[key], deep)
                    } else {
                        if (source[key] !== undefined) {
                            target[key] = source[key]
                        }
                    }
                }
            }

            $.extend = function (target) {
                var deep, args = slice.call(arguments, 1);
                if (typeof target == "boolean") {
                    deep = target;
                    target = args.shift()
                }
                args.forEach(function (arg) {
                    extend(target, arg, deep)
                });
                return target
            };
            zepto.qsa = function (element, selector) {
                var found;
                return (isDocument(element) && idSelectorRE.test(selector)) ? ((found = element.getElementById(RegExp.$1)) ? [found] : []) : (element.nodeType !== 1 && element.nodeType !== 9) ? [] : slice.call(classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) : tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) : element.querySelectorAll(selector))
            };

            function filtered(nodes, selector) {
                return selector === undefined ? $(nodes) : $(nodes).filter(selector)
            }

            $.contains = function (parent, node) {
                return parent !== node && parent.contains(node)
            };

            function funcArg(context, arg, idx, payload) {
                return isFunction(arg) ? arg.call(context, idx, payload) : arg
            }

            function setAttribute(node, name, value) {
                value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
            }

            function className(node, value) {
                var klass = node.className, svg = klass && klass.baseVal !== undefined;
                if (value === undefined) {
                    return svg ? klass.baseVal : klass
                }
                svg ? (klass.baseVal = value) : (node.className = value)
            }

            function deserializeValue(value) {
                var num;
                try {
                    return value ? value == "true" || (value == "false" ? false : value == "null" ? null : !isNaN(num = Number(value)) ? num : /^[\[\{]/.test(value) ? $.parseJSON(value) : value) : value
                } catch (e) {
                    return value
                }
            }

            $.type = type;
            $.isFunction = isFunction;
            $.isWindow = isWindow;
            $.isArray = isArray;
            $.isPlainObject = isPlainObject;
            $.isEmptyObject = function (obj) {
                var name;
                for (name in obj) {
                    return false
                }
                return true
            };
            $.inArray = function (elem, array, i) {
                return emptyArray.indexOf.call(array, elem, i)
            };
            $.camelCase = camelize;
            $.trim = function (str) {
                return str.trim()
            };
            $.uuid = 0;
            $.support = {};
            $.expr = {};
            $.map = function (elements, callback) {
                var value, values = [], i, key;
                if (likeArray(elements)) {
                    for (i = 0; i < elements.length; i++) {
                        value = callback(elements[i], i);
                        if (value != null) {
                            values.push(value)
                        }
                    }
                } else {
                    for (key in elements) {
                        value = callback(elements[key], key);
                        if (value != null) {
                            values.push(value)
                        }
                    }
                }
                return flatten(values)
            };
            $.each = function (elements, callback) {
                var i, key;
                if (likeArray(elements)) {
                    for (i = 0; i < elements.length; i++) {
                        if (callback.call(elements[i], i, elements[i]) === false) {
                            return elements
                        }
                    }
                } else {
                    for (key in elements) {
                        if (callback.call(elements[key], key, elements[key]) === false) {
                            return elements
                        }
                    }
                }
                return elements
            };
            $.grep = function (elements, callback) {
                return filter.call(elements, callback)
            };
            if (window.JSON) {
                $.parseJSON = JSON.parse
            }
            $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
                class2type["[object " + name + "]"] = name.toLowerCase()
            });
            $.fn = {
                forEach: emptyArray.forEach,
                reduce: emptyArray.reduce,
                push: emptyArray.push,
                sort: emptyArray.sort,
                indexOf: emptyArray.indexOf,
                concat: emptyArray.concat,
                map: function (fn) {
                    return $($.map(this, function (el, i) {
                        return fn.call(el, i, el)
                    }))
                },
                slice: function () {
                    return $(slice.apply(this, arguments))
                },
                ready: function (callback) {
                    if (readyRE.test(document.readyState)) {
                        callback($)
                    } else {
                        document.addEventListener("DOMContentLoaded", function () {
                            callback($)
                        }, false)
                    }
                    return this
                },
                get: function (idx) {
                    return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
                },
                toArray: function () {
                    return this.get()
                },
                size: function () {
                    return this.length
                },
                remove: function () {
                    return this.each(function () {
                        if (this.parentNode != null) {
                            this.parentNode.removeChild(this)
                        }
                    })
                },
                each: function (callback) {
                    emptyArray.every.call(this, function (el, idx) {
                        return callback.call(el, idx, el) !== false
                    });
                    return this
                },
                filter: function (selector) {
                    if (isFunction(selector)) {
                        return this.not(this.not(selector))
                    }
                    return $(filter.call(this, function (element) {
                        return zepto.matches(element, selector)
                    }))
                },
                add: function (selector, context) {
                    return $(uniq(this.concat($(selector, context))))
                },
                is: function (selector) {
                    return this.length > 0 && zepto.matches(this[0], selector)
                },
                not: function (selector) {
                    var nodes = [];
                    if (isFunction(selector) && selector.call !== undefined) {
                        this.each(function (idx) {
                            if (!selector.call(this, idx)) {
                                nodes.push(this)
                            }
                        })
                    } else {
                        var excludes = typeof selector == "string" ? this.filter(selector) : (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector);
                        this.forEach(function (el) {
                            if (excludes.indexOf(el) < 0) {
                                nodes.push(el)
                            }
                        })
                    }
                    return $(nodes)
                },
                has: function (selector) {
                    return this.filter(function () {
                        return isObject(selector) ? $.contains(this, selector) : $(this).find(selector).size()
                    })
                },
                eq: function (idx) {
                    return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1)
                },
                first: function () {
                    var el = this[0];
                    return el && !isObject(el) ? el : $(el)
                },
                last: function () {
                    var el = this[this.length - 1];
                    return el && !isObject(el) ? el : $(el)
                },
                find: function (selector) {
                    var result, $this = this;
                    if (typeof selector == "object") {
                        result = $(selector).filter(function () {
                            var node = this;
                            return emptyArray.some.call($this, function (parent) {
                                return $.contains(parent, node)
                            })
                        })
                    } else {
                        if (this.length == 1) {
                            result = $(zepto.qsa(this[0], selector))
                        } else {
                            result = this.map(function () {
                                return zepto.qsa(this, selector)
                            })
                        }
                    }
                    return result
                },
                closest: function (selector, context) {
                    var node = this[0], collection = false;
                    if (typeof selector == "object") {
                        collection = $(selector)
                    }
                    while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector))) {
                        node = node !== context && !isDocument(node) && node.parentNode
                    }
                    return $(node)
                },
                parents: function (selector) {
                    var ancestors = [], nodes = this;
                    while (nodes.length > 0) {
                        nodes = $.map(nodes, function (node) {
                            if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
                                ancestors.push(node);
                                return node
                            }
                        })
                    }
                    return filtered(ancestors, selector)
                },
                parent: function (selector) {
                    return filtered(uniq(this.pluck("parentNode")), selector)
                },
                children: function (selector) {
                    return filtered(this.map(function () {
                        return children(this)
                    }), selector)
                },
                contents: function () {
                    return this.map(function () {
                        return slice.call(this.childNodes)
                    })
                },
                siblings: function (selector) {
                    return filtered(this.map(function (i, el) {
                        return filter.call(children(el.parentNode), function (child) {
                            return child !== el
                        })
                    }), selector)
                },
                empty: function () {
                    return this.each(function () {
                        this.innerHTML = ""
                    })
                },
                pluck: function (property) {
                    return $.map(this, function (el) {
                        return el[property]
                    })
                },
                show: function () {
                    return this.each(function () {
                        this.style.display == "none" && (this.style.display = null);
                        if (getComputedStyle(this, "").getPropertyValue("display") == "none") {
                            this.style.display = defaultDisplay(this.nodeName)
                        }
                    })
                },
                replaceWith: function (newContent) {
                    return this.before(newContent).remove()
                },
                wrap: function (structure) {
                    var func = isFunction(structure);
                    if (this[0] && !func) {
                        var dom = $(structure).get(0), clone = dom.parentNode || this.length > 1
                    }
                    return this.each(function (index) {
                        $(this).wrapAll(func ? structure.call(this, index) : clone ? dom.cloneNode(true) : dom)
                    })
                },
                wrapAll: function (structure) {
                    if (this[0]) {
                        $(this[0]).before(structure = $(structure));
                        var children;
                        while ((children = structure.children()).length) {
                            structure = children.first()
                        }
                        $(structure).append(this)
                    }
                    return this
                },
                wrapInner: function (structure) {
                    var func = isFunction(structure);
                    return this.each(function (index) {
                        var self = $(this), contents = self.contents(),
                            dom = func ? structure.call(this, index) : structure;
                        contents.length ? contents.wrapAll(dom) : self.append(dom)
                    })
                },
                unwrap: function () {
                    this.parent().each(function () {
                        $(this).replaceWith($(this).children())
                    });
                    return this
                },
                clone: function () {
                    return this.map(function () {
                        return this.cloneNode(true)
                    })
                },
                hide: function () {
                    return this.css("display", "none")
                },
                toggle: function (setting) {
                    return this.each(function () {
                        var el = $(this);
                        (setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
                    })
                },
                prev: function (selector) {
                    return $(this.pluck("previousElementSibling")).filter(selector || "*")
                },
                next: function (selector) {
                    return $(this.pluck("nextElementSibling")).filter(selector || "*")
                },
                html: function (html) {
                    return html === undefined ? (this.length > 0 ? this[0].innerHTML : null) : this.each(function (idx) {
                        var originHtml = this.innerHTML;
                        $(this).empty().append(funcArg(this, html, idx, originHtml))
                    })
                },
                text: function (text) {
                    return text === undefined ? (this.length > 0 ? this[0].textContent : null) : this.each(function () {
                        this.textContent = text
                    })
                },
                attr: function (name, value) {
                    var result;
                    return (typeof name == "string" && value === undefined) ? (this.length == 0 || this[0].nodeType !== 1 ? undefined : (name == "value" && this[0].nodeName == "INPUT") ? this.val() : (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result) : this.each(function (idx) {
                        if (this.nodeType !== 1) {
                            return
                        }
                        if (isObject(name)) {
                            for (key in name) {
                                setAttribute(this, key, name[key])
                            }
                        } else {
                            setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
                        }
                    })
                },
                removeAttr: function (name) {
                    return this.each(function () {
                        this.nodeType === 1 && setAttribute(this, name)
                    })
                },
                prop: function (name, value) {
                    return (value === undefined) ? (this[0] && this[0][name]) : this.each(function (idx) {
                        this[name] = funcArg(this, value, idx, this[name])
                    })
                },
                data: function (name, value) {
                    var data = this.attr("data-" + dasherize(name), value);
                    return data !== null ? deserializeValue(data) : undefined
                },
                val: function (value) {
                    return (value === undefined) ? (this[0] && (this[0].multiple ? $(this[0]).find("option").filter(function (o) {
                        return this.selected
                    }).pluck("value") : this[0].value)) : this.each(function (idx) {
                        this.value = funcArg(this, value, idx, this.value)
                    })
                },
                offset: function (coordinates) {
                    if (coordinates) {
                        return this.each(function (index) {
                            var $this = $(this), coords = funcArg(this, coordinates, index, $this.offset()),
                                parentOffset = $this.offsetParent().offset(),
                                props = {top: coords.top - parentOffset.top, left: coords.left - parentOffset.left};
                            if ($this.css("position") == "static") {
                                props.position = "relative"
                            }
                            $this.css(props)
                        })
                    }
                    if (this.length == 0) {
                        return null
                    }
                    var obj = this[0].getBoundingClientRect();
                    return {
                        left: obj.left + window.pageXOffset,
                        top: obj.top + window.pageYOffset,
                        width: Math.round(obj.width),
                        height: Math.round(obj.height)
                    }
                },
                css: function (property, value) {
                    if (arguments.length < 2 && typeof property == "string") {
                        return this[0] && (this[0].style[camelize(property)] || getComputedStyle(this[0], "").getPropertyValue(property))
                    }
                    var css = "";
                    if (type(property) == "string") {
                        if (!value && value !== 0) {
                            this.each(function () {
                                this.style.removeProperty(dasherize(property))
                            })
                        } else {
                            css = dasherize(property) + ":" + maybeAddPx(property, value)
                        }
                    } else {
                        for (key in property) {
                            if (!property[key] && property[key] !== 0) {
                                this.each(function () {
                                    this.style.removeProperty(dasherize(key))
                                })
                            } else {
                                css += dasherize(key) + ":" + maybeAddPx(key, property[key]) + ";"
                            }
                        }
                    }
                    return this.each(function () {
                        this.style.cssText += ";" + css
                    })
                },
                index: function (element) {
                    return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
                },
                hasClass: function (name) {
                    return emptyArray.some.call(this, function (el) {
                        return this.test(className(el))
                    }, classRE(name))
                },
                addClass: function (name) {
                    return this.each(function (idx) {
                        classList = [];
                        var cls = className(this), newName = funcArg(this, name, idx, cls);
                        newName.split(/\s+/g).forEach(function (klass) {
                            if (!$(this).hasClass(klass)) {
                                classList.push(klass)
                            }
                        }, this);
                        classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
                    })
                },
                removeClass: function (name) {
                    return this.each(function (idx) {
                        if (name === undefined) {
                            return className(this, "")
                        }
                        classList = className(this);
                        funcArg(this, name, idx, classList).split(/\s+/g).forEach(function (klass) {
                            classList = classList.replace(classRE(klass), " ")
                        });
                        className(this, classList.trim())
                    })
                },
                toggleClass: function (name, when) {
                    return this.each(function (idx) {
                        var $this = $(this), names = funcArg(this, name, idx, className(this));
                        names.split(/\s+/g).forEach(function (klass) {
                            (when === undefined ? !$this.hasClass(klass) : when) ? $this.addClass(klass) : $this.removeClass(klass)
                        })
                    })
                },
                scrollTop: function () {
                    if (!this.length) {
                        return
                    }
                    return ("scrollTop" in this[0]) ? this[0].scrollTop : this[0].scrollY
                },
                position: function () {
                    if (!this.length) {
                        return
                    }
                    var elem = this[0], offsetParent = this.offsetParent(), offset = this.offset(),
                        parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? {
                            top: 0,
                            left: 0
                        } : offsetParent.offset();
                    offset.top -= parseFloat($(elem).css("margin-top")) || 0;
                    offset.left -= parseFloat($(elem).css("margin-left")) || 0;
                    parentOffset.top += parseFloat($(offsetParent[0]).css("border-top-width")) || 0;
                    parentOffset.left += parseFloat($(offsetParent[0]).css("border-left-width")) || 0;
                    return {top: offset.top - parentOffset.top, left: offset.left - parentOffset.left}
                },
                offsetParent: function () {
                    return this.map(function () {
                        var parent = this.offsetParent || document.body;
                        while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static") {
                            parent = parent.offsetParent
                        }
                        return parent
                    })
                }
            };
            $.fn.detach = $.fn.remove;
            ["width", "height"].forEach(function (dimension) {
                $.fn[dimension] = function (value) {
                    var offset, el = this[0], Dimension = dimension.replace(/./, function (m) {
                        return m[0].toUpperCase()
                    });
                    if (value === undefined) {
                        return isWindow(el) ? el["inner" + Dimension] : isDocument(el) ? el.documentElement["offset" + Dimension] : (offset = this.offset()) && offset[dimension]
                    } else {
                        return this.each(function (idx) {
                            el = $(this);
                            el.css(dimension, funcArg(this, value, idx, el[dimension]()))
                        })
                    }
                }
            });

            function traverseNode(node, fun) {
                fun(node);
                for (var key in node.childNodes) {
                    traverseNode(node.childNodes[key], fun)
                }
            }

            adjacencyOperators.forEach(function (operator, operatorIndex) {
                var inside = operatorIndex % 2;
                $.fn[operator] = function () {
                    var argType, nodes = $.map(arguments, function (arg) {
                        argType = type(arg);
                        return argType == "object" || argType == "array" || arg == null ? arg : zepto.fragment(arg)
                    }), parent, copyByClone = this.length > 1;
                    if (nodes.length < 1) {
                        return this
                    }
                    return this.each(function (_, target) {
                        parent = inside ? target : target.parentNode;
                        target = operatorIndex == 0 ? target.nextSibling : operatorIndex == 1 ? target.firstChild : operatorIndex == 2 ? target : null;
                        nodes.forEach(function (node) {
                            if (copyByClone) {
                                node = node.cloneNode(true)
                            } else {
                                if (!parent) {
                                    return $(node).remove()
                                }
                            }
                            traverseNode(parent.insertBefore(node, target), function (el) {
                                if (el.nodeName != null && el.nodeName.toUpperCase() === "SCRIPT" && (!el.type || el.type === "text/javascript") && !el.src) {
                                    eval.call(window, el.innerHTML)
                                }
                            })
                        })
                    })
                };
                $.fn[inside ? operator + "To" : "insert" + (operatorIndex ? "Before" : "After")] = function (html) {
                    $(html)[operator](this);
                    return this
                }
            });
            zepto.Z.prototype = $.fn;
            zepto.uniq = uniq;
            zepto.deserializeValue = deserializeValue;
            $.zepto = zepto;
            return $
        })();
        $ = Zepto;
        (function ($) {
            function detect(ua) {
                var os = this.os = {}, browser = this.browser = {}, webkit = ua.match(/WebKit\/([\d.]+)/),
                    android = ua.match(/(Android)\s+([\d.]+)/), ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
                    webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), touchpad = webos && ua.match(/TouchPad/),
                    kindle = ua.match(/Kindle\/([\d.]+)/), silk = ua.match(/Silk\/([\d._]+)/),
                    blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
                    bb10 = ua.match(/(BB10).*Version\/([\d.]+)/), rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
                    playbook = ua.match(/PlayBook/),
                    chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
                    firefox = ua.match(/Firefox\/([\d.]+)/);
                if (browser.webkit = !!webkit) {
                    browser.version = webkit[1]
                }
                if (android) {
                    os.android = true, os.version = android[2]
                }
                if (iphone) {
                    os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, ".")
                }
                if (ipad) {
                    os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, ".")
                }
                if (webos) {
                    os.webos = true, os.version = webos[2]
                }
                if (touchpad) {
                    os.touchpad = true
                }
                if (blackberry) {
                    os.blackberry = true, os.version = blackberry[2]
                }
                if (bb10) {
                    os.bb10 = true, os.version = bb10[2]
                }
                if (rimtabletos) {
                    os.rimtabletos = true, os.version = rimtabletos[2]
                }
                if (playbook) {
                    browser.playbook = true
                }
                if (kindle) {
                    os.kindle = true, os.version = kindle[1]
                }
                if (silk) {
                    browser.silk = true, browser.version = silk[1]
                }
                if (!silk && os.android && ua.match(/Kindle Fire/)) {
                    browser.silk = true
                }
                if (chrome) {
                    browser.chrome = true, browser.version = chrome[1]
                }
                if (firefox) {
                    browser.firefox = true, browser.version = firefox[1]
                }
                os.tablet = !!(ipad || playbook || (android && !ua.match(/Mobile/)) || (firefox && ua.match(/Tablet/)));
                os.phone = !!(!os.tablet && (android || iphone || webos || blackberry || bb10 || (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) || (firefox && ua.match(/Mobile/))))
            }

            detect.call($, navigator.userAgent);
            $.__detect = detect
        })(Zepto);
        (function ($) {
            var $$ = $.zepto.qsa, handlers = {}, _zid = 1, specialEvents = {},
                hover = {mouseenter: "mouseover", mouseleave: "mouseout"};
            specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = "MouseEvents";

            function zid(element) {
                return element._zid || (element._zid = _zid++)
            }

            function findHandlers(element, event, fn, selector) {
                event = parse(event);
                if (event.ns) {
                    var matcher = matcherFor(event.ns)
                }
                return (handlers[zid(element)] || []).filter(function (handler) {
                    return handler && (!event.e || handler.e == event.e) && (!event.ns || matcher.test(handler.ns)) && (!fn || zid(handler.fn) === zid(fn)) && (!selector || handler.sel == selector)
                })
            }

            function parse(event) {
                var parts = ("" + event).split(".");
                return {e: parts[0], ns: parts.slice(1).sort().join(" ")}
            }

            function matcherFor(ns) {
                return new RegExp("(?:^| )" + ns.replace(" ", " .* ?") + "(?: |$)")
            }

            function eachEvent(events, fn, iterator) {
                if ($.type(events) != "string") {
                    $.each(events, iterator)
                } else {
                    events.split(/\s/).forEach(function (type) {
                        iterator(type, fn)
                    })
                }
            }

            function eventCapture(handler, captureSetting) {
                return handler.del && (handler.e == "focus" || handler.e == "blur") || !!captureSetting
            }

            function realEvent(type) {
                return hover[type] || type
            }

            function add(element, events, fn, selector, getDelegate, capture) {
                var id = zid(element), set = (handlers[id] || (handlers[id] = []));
                eachEvent(events, fn, function (event, fn) {
                    var handler = parse(event);
                    handler.fn = fn;
                    handler.sel = selector;
                    if (handler.e in hover) {
                        fn = function (e) {
                            var related = e.relatedTarget;
                            if (!related || (related !== this && !$.contains(this, related))) {
                                return handler.fn.apply(this, arguments)
                            }
                        }
                    }
                    handler.del = getDelegate && getDelegate(fn, event);
                    var callback = handler.del || fn;
                    handler.proxy = function (e) {
                        var result = callback.apply(element, [e].concat(e.data));
                        if (result === false) {
                            e.preventDefault(), e.stopPropagation()
                        }
                        return result
                    };
                    handler.i = set.length;
                    set.push(handler);
                    element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
                })
            }

            function remove(element, events, fn, selector, capture) {
                var id = zid(element);
                eachEvent(events || "", fn, function (event, fn) {
                    findHandlers(element, event, fn, selector).forEach(function (handler) {
                        delete handlers[id][handler.i];
                        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
                    })
                })
            }

            $.event = {add: add, remove: remove};
            $.proxy = function (fn, context) {
                if ($.isFunction(fn)) {
                    var proxyFn = function () {
                        return fn.apply(context, arguments)
                    };
                    proxyFn._zid = zid(fn);
                    return proxyFn
                } else {
                    if (typeof context == "string") {
                        return $.proxy(fn[context], fn)
                    } else {
                        throw new TypeError("expected function")
                    }
                }
            };
            $.fn.bind = function (event, callback) {
                return this.each(function () {
                    add(this, event, callback)
                })
            };
            $.fn.unbind = function (event, callback) {
                return this.each(function () {
                    remove(this, event, callback)
                })
            };
            $.fn.one = function (event, callback) {
                return this.each(function (i, element) {
                    add(this, event, callback, null, function (fn, type) {
                        return function () {
                            var result = fn.apply(element, arguments);
                            remove(element, type, fn);
                            return result
                        }
                    })
                })
            };
            var returnTrue = function () {
                return true
            }, returnFalse = function () {
                return false
            }, ignoreProperties = /^([A-Z]|layer[XY]$)/, eventMethods = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            };

            function createProxy(event) {
                var key, proxy = {originalEvent: event};
                for (key in event) {
                    if (!ignoreProperties.test(key) && event[key] !== undefined) {
                        proxy[key] = event[key]
                    }
                }
                $.each(eventMethods, function (name, predicate) {
                    proxy[name] = function () {
                        this[predicate] = returnTrue;
                        return event[name].apply(event, arguments)
                    };
                    proxy[predicate] = returnFalse
                });
                return proxy
            }

            function fix(event) {
                if (!("defaultPrevented" in event)) {
                    event.defaultPrevented = false;
                    var prevent = event.preventDefault;
                    event.preventDefault = function () {
                        this.defaultPrevented = true;
                        prevent.call(this)
                    }
                }
            }

            $.fn.delegate = function (selector, event, callback) {
                return this.each(function (i, element) {
                    add(element, event, callback, selector, function (fn) {
                        return function (e) {
                            var evt, match = $(e.target).closest(selector, element).get(0);
                            if (match) {
                                evt = $.extend(createProxy(e), {currentTarget: match, liveFired: element});
                                return fn.apply(match, [evt].concat([].slice.call(arguments, 1)))
                            }
                        }
                    })
                })
            };
            $.fn.undelegate = function (selector, event, callback) {
                return this.each(function () {
                    remove(this, event, callback, selector)
                })
            };
            $.fn.live = function (event, callback) {
                $(document.body).delegate(this.selector, event, callback);
                return this
            };
            $.fn.die = function (event, callback) {
                $(document.body).undelegate(this.selector, event, callback);
                return this
            };
            $.fn.on = function (event, selector, callback) {
                return !selector || $.isFunction(selector) ? this.bind(event, selector || callback) : this.delegate(selector, event, callback)
            };
            $.fn.off = function (event, selector, callback) {
                return !selector || $.isFunction(selector) ? this.unbind(event, selector || callback) : this.undelegate(selector, event, callback)
            };
            $.fn.trigger = function (event, data) {
                if (typeof event == "string" || $.isPlainObject(event)) {
                    event = $.Event(event)
                }
                fix(event);
                event.data = data;
                return this.each(function () {
                    if ("dispatchEvent" in this) {
                        this.dispatchEvent(event)
                    }
                })
            };
            $.fn.triggerHandler = function (event, data) {
                var e, result;
                this.each(function (i, element) {
                    e = createProxy(typeof event == "string" ? $.Event(event) : event);
                    e.data = data;
                    e.target = element;
                    $.each(findHandlers(element, event.type || event), function (i, handler) {
                        result = handler.proxy(e);
                        if (e.isImmediatePropagationStopped()) {
                            return false
                        }
                    })
                });
                return result
            };
            ("focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error").split(" ").forEach(function (event) {
                $.fn[event] = function (callback) {
                    return callback ? this.bind(event, callback) : this.trigger(event)
                }
            });
            ["focus", "blur"].forEach(function (name) {
                $.fn[name] = function (callback) {
                    if (callback) {
                        this.bind(name, callback)
                    } else {
                        this.each(function () {
                            try {
                                this[name]()
                            } catch (e) {
                            }
                        })
                    }
                    return this
                }
            });
            $.Event = function (type, props) {
                if (typeof type != "string") {
                    props = type, type = props.type
                }
                var event = document.createEvent(specialEvents[type] || "Events"), bubbles = true;
                if (props) {
                    for (var name in props) {
                        (name == "bubbles") ? (bubbles = !!props[name]) : (event[name] = props[name])
                    }
                }
                event.initEvent(type, bubbles, true, null, null, null, null, null, null, null, null, null, null, null, null);
                event.isDefaultPrevented = function () {
                    return this.defaultPrevented
                };
                return event
            }
        })(Zepto);
        (function ($) {
            var jsonpID = 0, document = window.document, key, name,
                rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                scriptTypeRE = /^(?:text|application)\/javascript/i, xmlTypeRE = /^(?:text|application)\/xml/i,
                jsonType = "application/json", htmlType = "text/html", blankRE = /^\s*$/;

            function triggerAndReturn(context, eventName, data) {
                var event = $.Event(eventName);
                $(context).trigger(event, data);
                return !event.defaultPrevented
            }

            function triggerGlobal(settings, context, eventName, data) {
                if (settings.global) {
                    return triggerAndReturn(context || document, eventName, data)
                }
            }

            $.active = 0;

            function ajaxStart(settings) {
                if (settings.global && $.active++ === 0) {
                    triggerGlobal(settings, null, "ajaxStart")
                }
            }

            function ajaxStop(settings) {
                if (settings.global && !(--$.active)) {
                    triggerGlobal(settings, null, "ajaxStop")
                }
            }

            function ajaxBeforeSend(xhr, settings) {
                var context = settings.context;
                if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, "ajaxBeforeSend", [xhr, settings]) === false) {
                    return false
                }
                triggerGlobal(settings, context, "ajaxSend", [xhr, settings])
            }

            function ajaxSuccess(data, xhr, settings) {
                var context = settings.context, status = "success";
                settings.success.call(context, data, status, xhr);
                triggerGlobal(settings, context, "ajaxSuccess", [xhr, settings, data]);
                ajaxComplete(status, xhr, settings)
            }

            function ajaxError(error, type, xhr, settings) {
                var context = settings.context;
                settings.error.call(context, xhr, type, error);
                triggerGlobal(settings, context, "ajaxError", [xhr, settings, error]);
                ajaxComplete(type, xhr, settings)
            }

            function ajaxComplete(status, xhr, settings) {
                var context = settings.context;
                settings.complete.call(context, xhr, status);
                triggerGlobal(settings, context, "ajaxComplete", [xhr, settings]);
                ajaxStop(settings)
            }

            function empty() {
            }

            $.ajaxJSONP = function (options) {
                if (!("type" in options)) {
                    return $.ajax(options)
                }
                var callbackName = "jsonp" + (++jsonpID), script = document.createElement("script"),
                    cleanup = function () {
                        clearTimeout(abortTimeout);
                        $(script).remove();
                        delete window[callbackName]
                    }, abort = function (type) {
                        cleanup();
                        if (!type || type == "timeout") {
                            window[callbackName] = empty
                        }
                        ajaxError(null, type || "abort", xhr, options)
                    }, xhr = {abort: abort}, abortTimeout;
                if (ajaxBeforeSend(xhr, options) === false) {
                    abort("abort");
                    return false
                }
                window[callbackName] = function (data) {
                    cleanup();
                    ajaxSuccess(data, xhr, options)
                };
                script.onerror = function () {
                    abort("error")
                };
                var scriptUrl = options.url.replace(/=\?/, "=" + callbackName);
                script.src = scriptUrl;
                $("head").append(script);
                if (options.timeout > 0) {
                    abortTimeout = setTimeout(function () {
                        abort("timeout")
                    }, options.timeout)
                }
                return xhr
            };
            $.ajaxSettings = {
                type: "GET",
                beforeSend: empty,
                success: empty,
                error: empty,
                complete: empty,
                context: null,
                global: true,
                xhr: function () {
                    return new window.XMLHttpRequest()
                },
                accepts: {
                    script: "text/javascript, application/javascript",
                    json: jsonType,
                    xml: "application/xml, text/xml",
                    html: htmlType,
                    text: "text/plain"
                },
                crossDomain: false,
                timeout: 0,
                processData: true,
                cache: true,
            };

            function mimeToDataType(mime) {
                if (mime) {
                    mime = mime.split(";", 2)[0]
                }
                return mime && (mime == htmlType ? "html" : mime == jsonType ? "json" : scriptTypeRE.test(mime) ? "script" : xmlTypeRE.test(mime) && "xml") || "text"
            }

            function appendQuery(url, query) {
                return (url + "&" + query).replace(/[&?]{1,2}/, "?")
            }

            function serializeData(options) {
                if (options.processData && options.data && $.type(options.data) != "string") {
                    options.data = $.param(options.data, options.traditional)
                }
                if (options.data && (!options.type || options.type.toUpperCase() == "GET")) {
                    options.url = appendQuery(options.url, options.data)
                }
            }

            $.ajax = function (options) {
                var settings = $.extend({}, options || {});
                for (key in $.ajaxSettings) {
                    if (settings[key] === undefined) {
                        settings[key] = $.ajaxSettings[key]
                    }
                }
                ajaxStart(settings);
                if (!settings.crossDomain) {
                    settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && RegExp.$2 != window.location.host
                }
                if (!settings.url) {
                    settings.url = window.location.toString()
                }
                serializeData(settings);
                if (settings.cache === false) {
                    settings.url = appendQuery(settings.url, "_=" + Date.now())
                }
                var dataType = settings.dataType, hasPlaceholder = /=\?/.test(settings.url);
                if (dataType == "jsonp" || hasPlaceholder) {
                    var callbackFnName = settings.jsonp || "callback";
                    if (!hasPlaceholder) {
                        settings.url = appendQuery(settings.url, callbackFnName + "=?")
                    }
                    return $.ajaxJSONP(settings)
                }
                var mime = settings.accepts[dataType], baseHeaders = {},
                    protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
                    xhr = settings.xhr(), abortTimeout;
                if (!settings.crossDomain) {
                    baseHeaders["X-Requested-With"] = "XMLHttpRequest"
                }
                if (mime) {
                    baseHeaders.Accept = mime;
                    if (mime.indexOf(",") > -1) {
                        mime = mime.split(",", 2)[0]
                    }
                    xhr.overrideMimeType && xhr.overrideMimeType(mime)
                }
                if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != "GET")) {
                    baseHeaders["Content-Type"] = (settings.contentType || "application/x-www-form-urlencoded")
                }
                settings.headers = $.extend(baseHeaders, settings.headers || {});
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        xhr.onreadystatechange = empty;
                        clearTimeout(abortTimeout);
                        var result, error = false;
                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == "file:")) {
                            dataType = dataType || mimeToDataType(xhr.getResponseHeader("content-type"));
                            result = xhr.responseText;
                            try {
                                if (dataType == "script") {
                                    (1, eval)(result)
                                } else {
                                    if (dataType == "xml") {
                                        result = xhr.responseXML
                                    } else {
                                        if (dataType == "json") {
                                            result = blankRE.test(result) ? null : $.parseJSON(result)
                                        }
                                    }
                                }
                            } catch (e) {
                                error = e
                            }
                            if (error) {
                                ajaxError(error, "parsererror", xhr, settings)
                            } else {
                                ajaxSuccess(result, xhr, settings)
                            }
                        } else {
                            ajaxError(null, xhr.status ? "error" : "abort", xhr, settings)
                        }
                    }
                };
                var async = "async" in settings ? settings.async : true;
                xhr.open(settings.type, settings.url, async);
                for (name in settings.headers) {
                    xhr.setRequestHeader(name, settings.headers[name])
                }
                if (ajaxBeforeSend(xhr, settings) === false) {
                    xhr.abort();
                    return false
                }
                if (settings.timeout > 0) {
                    abortTimeout = setTimeout(function () {
                        xhr.onreadystatechange = empty;
                        xhr.abort();
                        ajaxError(null, "timeout", xhr, settings)
                    }, settings.timeout)
                }
                xhr.send(settings.data ? settings.data : null);
                return xhr
            };

            function parseArguments(url, data, success, dataType) {
                var hasData = !$.isFunction(data);
                return {
                    url: url,
                    data: hasData ? data : undefined,
                    success: !hasData ? data : $.isFunction(success) ? success : undefined,
                    dataType: hasData ? dataType || success : success
                }
            }

            $.get = function (url, data, success, dataType) {
                return $.ajax(parseArguments.apply(null, arguments))
            };
            $.post = function (url, data, success, dataType) {
                var options = parseArguments.apply(null, arguments);
                options.type = "POST";
                return $.ajax(options)
            };
            $.getJSON = function (url, data, success) {
                var options = parseArguments.apply(null, arguments);
                options.dataType = "json";
                return $.ajax(options)
            };
            $.fn.load = function (url, data, success) {
                if (!this.length) {
                    return this
                }
                var self = this, parts = url.split(/\s/), selector, options = parseArguments(url, data, success),
                    callback = options.success;
                if (parts.length > 1) {
                    options.url = parts[0], selector = parts[1]
                }
                options.success = function (response) {
                    self.html(selector ? $("<div>").html(response.replace(rscript, "")).find(selector) : response);
                    callback && callback.apply(self, arguments)
                };
                $.ajax(options);
                return this
            };
            var escape = encodeURIComponent;

            function serialize(params, obj, traditional, scope) {
                var type, array = $.isArray(obj);
                $.each(obj, function (key, value) {
                    type = $.type(value);
                    if (scope) {
                        key = traditional ? scope : scope + "[" + (array ? "" : key) + "]"
                    }
                    if (!scope && array) {
                        params.add(value.name, value.value)
                    } else {
                        if (type == "array" || (!traditional && type == "object")) {
                            serialize(params, value, traditional, key)
                        } else {
                            params.add(key, value)
                        }
                    }
                })
            }

            $.param = function (obj, traditional) {
                var params = [];
                params.add = function (k, v) {
                    this.push(escape(k) + "=" + escape(v))
                };
                serialize(params, obj, traditional);
                return params.join("&").replace(/%20/g, "+")
            }
        })(Zepto);
        (function ($) {
            $.fn.serializeArray = function () {
                var result = [], el;
                $(Array.prototype.slice.call(this.get(0).elements)).each(function () {
                    el = $(this);
                    var type = el.attr("type");
                    if (this.nodeName.toLowerCase() != "fieldset" && !this.disabled && type != "submit" && type != "reset" && type != "button" && ((type != "radio" && type != "checkbox") || this.checked)) {
                        result.push({name: el.attr("name"), value: el.val()})
                    }
                });
                return result
            };
            $.fn.serialize = function () {
                var result = [];
                this.serializeArray().forEach(function (elm) {
                    result.push(encodeURIComponent(elm.name) + "=" + encodeURIComponent(elm.value))
                });
                return result.join("&")
            };
            $.fn.submit = function (callback) {
                if (callback) {
                    this.bind("submit", callback)
                } else {
                    if (this.length) {
                        var event = $.Event("submit");
                        this.eq(0).trigger(event);
                        if (!event.defaultPrevented) {
                            this.get(0).submit()
                        }
                    }
                }
                return this
            }
        })(Zepto);
        (function ($, undefined) {
            var prefix = "", eventPrefix, endEventName, endAnimationName,
                vendors = {Webkit: "webkit", Moz: "", O: "o", ms: "MS"}, document = window.document,
                testEl = document.createElement("div"),
                supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
                transform, transitionProperty, transitionDuration, transitionTiming, animationName, animationDuration,
                animationTiming, cssReset = {};

            function dasherize(str) {
                return downcase(str.replace(/([a-z])([A-Z])/, "$1-$2"))
            }

            function downcase(str) {
                return str.toLowerCase()
            }

            function normalizeEvent(name) {
                return eventPrefix ? eventPrefix + name : downcase(name)
            }

            $.each(vendors, function (vendor, event) {
                if (testEl.style[vendor + "TransitionProperty"] !== undefined) {
                    prefix = "-" + downcase(vendor) + "-";
                    eventPrefix = event;
                    return false
                }
            });
            transform = prefix + "transform";
            cssReset[transitionProperty = prefix + "transition-property"] = cssReset[transitionDuration = prefix + "transition-duration"] = cssReset[transitionTiming = prefix + "transition-timing-function"] = cssReset[animationName = prefix + "animation-name"] = cssReset[animationDuration = prefix + "animation-duration"] = cssReset[animationTiming = prefix + "animation-timing-function"] = "";
            $.fx = {
                off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
                speeds: {_default: 400, fast: 200, slow: 600},
                cssPrefix: prefix,
                transitionEnd: normalizeEvent("TransitionEnd"),
                animationEnd: normalizeEvent("AnimationEnd")
            };
            $.fn.animate = function (properties, duration, ease, callback) {
                if ($.isPlainObject(duration)) {
                    ease = duration.easing, callback = duration.complete, duration = duration.duration
                }
                if (duration) {
                    duration = (typeof duration == "number" ? duration : ($.fx.speeds[duration] || $.fx.speeds._default)) / 1000
                }
                return this.anim(properties, duration, ease, callback)
            };
            $.fn.anim = function (properties, duration, ease, callback) {
                var key, cssValues = {}, cssProperties, transforms = "", that = this, wrappedCallback,
                    endEvent = $.fx.transitionEnd;
                if (duration === undefined) {
                    duration = 0.4
                }
                if ($.fx.off) {
                    duration = 0
                }
                if (typeof properties == "string") {
                    cssValues[animationName] = properties;
                    cssValues[animationDuration] = duration + "s";
                    cssValues[animationTiming] = (ease || "linear");
                    endEvent = $.fx.animationEnd
                } else {
                    cssProperties = [];
                    for (key in properties) {
                        if (supportedTransforms.test(key)) {
                            transforms += key + "(" + properties[key] + ") "
                        } else {
                            cssValues[key] = properties[key], cssProperties.push(dasherize(key))
                        }
                    }
                    if (transforms) {
                        cssValues[transform] = transforms, cssProperties.push(transform)
                    }
                    if (duration > 0 && typeof properties === "object") {
                        cssValues[transitionProperty] = cssProperties.join(", ");
                        cssValues[transitionDuration] = duration + "s";
                        cssValues[transitionTiming] = (ease || "linear")
                    }
                }
                wrappedCallback = function (event) {
                    if (typeof event !== "undefined") {
                        if (event.target !== event.currentTarget) {
                            return
                        }
                        $(event.target).unbind(endEvent, wrappedCallback)
                    }
                    $(this).css(cssReset);
                    callback && callback.call(this)
                };
                if (duration > 0) {
                    this.bind(endEvent, wrappedCallback)
                }
                this.size() && this.get(0).clientLeft;
                this.css(cssValues);
                if (duration <= 0) {
                    setTimeout(function () {
                        that.each(function () {
                            wrappedCallback.call(this)
                        })
                    }, 0)
                }
                return this
            };
            testEl = null
        })(Zepto);
        (function ($) {
            var touch = {}, touchTimeout, tapTimeout, swipeTimeout, longTapTimeout, longTapDelay = 750, gesture;

            function swipeDirection(x1, x2, y1, y2) {
                return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? "Left" : "Right") : (y1 - y2 > 0 ? "Up" : "Down")
            }

            function longTap() {
                longTapTimeout = null;
                if (touch.last) {
                    touch.el.trigger("longTap");
                    touch = {}
                }
            }

            function cancelLongTap() {
                if (longTapTimeout) {
                    clearTimeout(longTapTimeout)
                }
                longTapTimeout = null
            }

            function cancelAll() {
                if (touchTimeout) {
                    clearTimeout(touchTimeout)
                }
                if (tapTimeout) {
                    clearTimeout(tapTimeout)
                }
                if (swipeTimeout) {
                    clearTimeout(swipeTimeout)
                }
                if (longTapTimeout) {
                    clearTimeout(longTapTimeout)
                }
                touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
                touch = {}
            }

            function isPrimaryTouch(event) {
                return event.pointerType == event.MSPOINTER_TYPE_TOUCH && event.isPrimary
            }

            $(document).ready(function () {
                var now, delta, deltaX = 0, deltaY = 0, firstTouch;
                if ("MSGesture" in window) {
                    gesture = new MSGesture();
                    gesture.target = document.body
                }
                $(document).bind("MSGestureEnd", function (e) {
                    var swipeDirectionFromVelocity = e.velocityX > 1 ? "Right" : e.velocityX < -1 ? "Left" : e.velocityY > 1 ? "Down" : e.velocityY < -1 ? "Up" : null;
                    if (swipeDirectionFromVelocity) {
                        touch.el.trigger("swipe");
                        touch.el.trigger("swipe" + swipeDirectionFromVelocity)
                    }
                }).on("touchstart MSPointerDown", function (e) {
                    if (e.type == "MSPointerDown" && !isPrimaryTouch(e)) {
                        return
                    }
                    firstTouch = e.type == "MSPointerDown" ? e : e.touches[0];
                    now = Date.now();
                    delta = now - (touch.last || now);
                    touch.el = $("tagName" in firstTouch.target ? firstTouch.target : firstTouch.target.parentNode);
                    touchTimeout && clearTimeout(touchTimeout);
                    touch.x1 = firstTouch.pageX;
                    touch.y1 = firstTouch.pageY;
                    if (delta > 0 && delta <= 250) {
                        touch.isDoubleTap = true
                    }
                    touch.last = now;
                    longTapTimeout = setTimeout(longTap, longTapDelay);
                    if (gesture && e.type == "MSPointerDown") {
                        gesture.addPointer(e.pointerId)
                    }
                }).on("touchmove MSPointerMove", function (e) {
                    if (e.type == "MSPointerMove" && !isPrimaryTouch(e)) {
                        return
                    }
                    firstTouch = e.type == "MSPointerMove" ? e : e.touches[0];
                    cancelLongTap();
                    touch.x2 = firstTouch.pageX;
                    touch.y2 = firstTouch.pageY;
                    deltaX += Math.abs(touch.x1 - touch.x2);
                    deltaY += Math.abs(touch.y1 - touch.y2)
                }).on("touchend MSPointerUp", function (e) {
                    if (e.type == "MSPointerUp" && !isPrimaryTouch(e)) {
                        return
                    }
                    cancelLongTap();
                    if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) || (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {
                        swipeTimeout = setTimeout(function () {
                            touch.el.trigger("swipe");
                            touch.el.trigger("swipe" + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
                            touch = {}
                        }, 0)
                    } else {
                        if ("last" in touch) {
                            if (deltaX < 30 && deltaY < 30) {
                                tapTimeout = setTimeout(function () {
                                    var event = $.Event("tap");
                                    event.cancelTouch = cancelAll;
                                    touch.el.trigger(event);
                                    if (touch.isDoubleTap) {
                                        touch.el.trigger("doubleTap");
                                        touch = {}
                                    } else {
                                        touchTimeout = setTimeout(function () {
                                            touchTimeout = null;
                                            touch.el.trigger("singleTap");
                                            touch = {}
                                        }, 250)
                                    }
                                }, 0)
                            } else {
                                touch = {}
                            }
                        }
                    }
                    deltaX = deltaY = 0
                }).on("touchcancel MSPointerCancel", cancelAll);
                $(window).on("scroll", cancelAll)
            });
            ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function (eventName) {
                $.fn[eventName] = function (callback) {
                    return this.on(eventName, callback)
                }
            })
        })(Zepto);
        var JSONParser = function (data) {
            this.data = data
        };
        JSONParser.prototype.parse = function () {
            if (!this.data) {
                return null
            }
            var subway = new DataSubway();
            var ds = this.data;
            for (var x in ds) {
                if (x.toLowerCase() == "lines") {
                    var ll = ds[x];
                    for (var i = 0; i < ll.length; i++) {
                        var l = ll[i];
                        var line = new DataLine();
                        for (var y in l) {
                            if (y.toLowerCase() == "stations") {
                                var ss = l[y];
                                for (var j = 0; j < ss.length; j++) {
                                    var s = ss[j];
                                    var station = new DataStation();
                                    for (var z in s) {
                                        station[z] = s[z]
                                    }
                                    line.stations.push(station)
                                }
                            } else {
                                line[y] = l[y]
                            }
                        }
                        subway.lines.push(line)
                    }
                } else {
                    subway[x] = ds[x]
                }
            }
            return subway
        };

        function addCssByStyle(cssString) {
            var doc = document;
            var style = doc.createElement("style");
            style.setAttribute("type", "text/css");
            if (style.styleSheet) {
                style.styleSheet.cssText = cssString
            } else {
                var cssText = doc.createTextNode(cssString);
                style.appendChild(cssText)
            }
            var heads = doc.getElementsByTagName("head");
            if (heads.length) {
                heads[0].appendChild(style)
            } else {
                doc.documentElement.appendChild(style)
            }
        }

        var cssString = 'html{height:100%}body{height:100%;margin:0px;padding:0px;font-family: Helvetica, Arial, sans-serif;}#bd-subwayInfo{height: 60px;width: 170px;background-color: rgba(0,0,0,0.7);text-align: center;color: #fff;border-radius: 5px;position: relative;top: 0;}#bd-subwayInfo:before{content: "";position: absolute;left: 50%;bottom: -10px;margin: 0 0 0 -7px;width: 0;height: 0;border-left: 7px solid transparent;border-top: 10px solid rgba(0,0,0,0.7);border-right: 7px solid transparent;}#bd-subwayTitle{padding: 5px 12px 3px 12px;text-align: left;overflow: hidden;}#bd-subwayTitle #bd-stationName{float: left;margin: 0;padding:0;width: 100px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}#bd-title-details{text-align: right;float: right;font-size: 12px;line-height: 24px;margin:0;padding:0;}#bd-subwayContent {overflow: hidden;}#bd-subwayContent p{width: 50px;height: 20px;line-height: 20px;float: left;font-size: 12px;padding: 2px 0 2px 15px;margin: 0 5px 0 12px;color: #fff;background-size: 14px 14px;cursor: pointer;}#bd-subwayStart{background: url("//api.map.baidu.com/images/subway/confirm-green.png") 0 5px no-repeat;}#bd-subwayEnd{background: url("//api.map.baidu.com/images/subway/confirm-red.png") 0 5px no-repeat;}#bd-DetailInfo {position: absolute;left: 50%;top: 50%;border-radius: 4px;width: 70%;overflow: hidden;z-index: 450;background: #fff;}#bd-DetailInfo .detailInfoTop {margin: 0 0 5px 0;text-align: left;line-height: 30px;font-size: 14px;border-bottom:1px solid #ddd;}#bd-DetailInfo .detailInfoTop .detailTitle {padding: 0 0 0 20px;}#bd-DetailInfo .detailInfoTop .clearDetailInfo {float: right;font-size: 20px;color: #999;margin: 0 5px 0 0;padding: 0 10px;}#bd-DetailInfo .detailInfoContent {margin: 0 20px;font-size: 12px;padding: 0 0 5px 0;}#bd-DetailInfo .detailInfoContent .lines {line-height:24px;}#bd-DetailInfo .detailInfoContent .linesName {color:#fff;padding: 2px 5px;}#bd-DetailInfo .detailInfoContent .detailList {overflow: hidden;line-height:24px;}#bd-DetailInfo .detailInfoContent .detailList > span {line-height:24px;display: block;}#bd-DetailInfo .detailInfoContent .detailList .bd-lineTime {float: right;}#bd-DetailInfo .detailInfoContent .detailList .direction {float: left;width: 85px;height: 24px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}#bd-DetailInfo .detailInfoContent .detailList .lastTime {width:32px;padding: 0 0 0 20px;float: right;margin: 0 0 0 5px;background: url(//api.map.baidu.com/images/subway/end-time-icon.png) 0 5px no-repeat;background-size: 14px 14px;}#bd-DetailInfo .detailInfoContent .detailList .firstTime {width:32px;padding: 0 0 0 20px;float: left; background: url(//api.map.baidu.com/images/subway/first-time-icon.png) 0 5px no-repeat;background-size: 14px 14px;}@media (max-width:335px) {#bd-DetailInfo .detailInfoContent .detailList .bd-lineTime {float: right;width:52px}#bd-DetailInfo .detailInfoContent .detailList .direction{margin: 12px 0 0 0;}#bd-DetailInfo .detailInfoContent .detailList .lastTime{float: right;}#bd-DetailInfo .detailInfoContent .detailList .firstTime{float: left;}}#bd-DetailBg {width: 100%;height: 100%;z-index: 400;position: absolute;left: 0;top: 0;}';
        cssString += '.direction_panel{width:100%;min-height:45px;position:absolute;bottom:0;left:0;padding:10px 0;background:#fff; border-top:1px solid #ddd;font-family: "Microsoft YaHei",Arial,Verdana,Helvetica,sans-serif;}.direction_lines{width:80%;line-height:18px;font-size:14px;padding-left:15px;color:#333;}.arrow{height:18px;widht:11px;margin:0 10px;color:#999;}.direction_info{height:20px;line-height:20px;font-size:12px;color:#666;padding-left:15px;}.dot{color:#b5b5b5;height:3px;width:3px;padding:0 8px;}.direction_detail{position:absolute;top:10px;right:15px;color:#3385ff;font-size:14px;line-height:42px;}.direction_close{position:absolute;top:15px;right:15px;background: url(//api.map.baidu.com/images/delete.png);height:36px;width:36px;background-size:36px 36px;}';
        addCssByStyle(cssString);

        function Animation(opts) {
            var defaultOptions = {
                duration: 1000,
                fps: 30,
                delay: 0,
                transition: Transitions.linear,
                onStop: function () {
                }
            };
            this._anis = [];
            if (opts) {
                for (var i in opts) {
                    defaultOptions[i] = opts[i]
                }
            }
            this._opts = defaultOptions;
            if (T.lang.isNumber(defaultOptions.delay)) {
                var me = this;
                setTimeout(function () {
                    me.start()
                }, defaultOptions.delay)
            } else {
                if (defaultOptions.delay != Animation.INFINITE) {
                    this.start()
                }
            }
        }

        Animation.INFINITE = "INFINITE";
        Animation.prototype.start = function () {
            if (window.requestAnimationFrame) {
                var me = this;
                me._timer = window.requestAnimationFrame(function (now) {
                    me._loop(now)
                })
            } else {
                this._beginTime = (new Date()).getTime();
                this._endTime = this._beginTime + this._opts.duration;
                this._loop()
            }
        };
        Animation.prototype._loop = function () {
            var me = this;
            var now = (new Date()).getTime();
            if (!this._beginTime) {
                this._beginTime = now;
                this._endTime = this._beginTime + this._opts.duration
            }
            if (now >= me._endTime) {
                if (T.lang.isFunction(me._opts.render)) {
                    me._opts.render(me._opts.transition(1))
                }
                if (T.lang.isFunction(me._opts.finish)) {
                    me._opts.finish()
                }
                return
            }
            me.schedule = me._opts.transition((now - me._beginTime) / me._opts.duration);
            if (T.lang.isFunction(me._opts.render)) {
                me._opts.render(me.schedule)
            }
            if (!me.terminative) {
                if (window.requestAnimationFrame) {
                    me._timer = requestAnimationFrame(function (now) {
                        me._loop(now)
                    })
                } else {
                    me._timer = setTimeout(function () {
                        me._loop()
                    }, 1000 / me._opts.fps)
                }
            }
        };
        Animation.prototype.stop = function (gotoEnd) {
            this.terminative = true;
            for (var i = 0; i < this._anis.length; i++) {
                this._anis[i].stop();
                this._anis[i] = null
            }
            this._anis.length = 0;
            if (this._timer) {
                if (window.cancelAnimationFrame) {
                    cancelAnimationFrame(this._timer)
                } else {
                    clearTimeout(this._timer)
                }
                this._timer = null
            }
            this._opts.onStop(this.schedule);
            if (gotoEnd) {
                this._endTime = this._beginTime;
                this._loop()
            }
        };
        var Transitions = {
            linear: function (t) {
                return t
            }, reverse: function (t) {
                return 1 - t
            }, easeInQuad: function (t) {
                return t * t
            }, easeInCubic: function (t) {
                return Math.pow(t, 3)
            }, easeOutQuad: function (t) {
                return -(t * (t - 2))
            }, easeOutCubic: function (t) {
                return Math.pow((t - 1), 3) + 1
            }, easeInOutQuad: function (t) {
                if (t < 0.5) {
                    return t * t * 2
                } else {
                    return -2 * (t - 2) * t - 1
                }
                return
            }, easeInOutCubic: function (t) {
                if (t < 0.5) {
                    return Math.pow(t, 3) * 4
                } else {
                    return Math.pow(t - 1, 3) * 4 + 1
                }
            }, easeInOutSine: function (t) {
                return (1 - Math.cos(Math.PI * t)) / 2
            }
        };
        Transitions["ease-in"] = Transitions.easeInQuad;
        Transitions["ease-out"] = Transitions.easeOutQuad;
        void function (winElement, docElement, BMapSub) {
            void function (winElement, docElement, BMapSub) {
                var objectName = "alog";
                var oldObject = BMapSub[objectName];
                if (oldObject && oldObject.defined) {
                    return
                }
                var ie = docElement.all && winElement.attachEvent, clickJsLinkTime,
                    startTime = (oldObject && oldObject.l) || +new Date,
                    sid = winElement.logId || (+new Date).toString(36) + Math.random().toString(36).substr(2, 3),
                    guid = 0, loadScripts = {}, $ = function (params) {
                        var args = arguments;
                        var moduleName, module, requires, creator;
                        if (params == "define" || params == "require") {
                            for (var i = 1; i < args.length; i++) {
                                switch (typeof args[i]) {
                                    case"string":
                                        moduleName = args[i];
                                        break;
                                    case"object":
                                        requires = args[i];
                                        break;
                                    case"function":
                                        creator = args[i];
                                        break
                                }
                            }
                            if (params == "require") {
                                if (moduleName && !requires) {
                                    requires = [moduleName]
                                }
                                moduleName = null
                            }
                            moduleName = !moduleName ? "#" + (guid++) : moduleName;
                            module = modules[moduleName] = (modules[moduleName] || {});
                            if (!module.defined) {
                                module.name = moduleName;
                                module.requires = requires;
                                module.creator = creator;
                                if (params == "define") {
                                    module.defining = true
                                }
                                clearDepend(module)
                            }
                            return
                        }
                        if (typeof params == "function") {
                            params($);
                            return
                        }
                        String(params).replace(/^(?:([\w$_]+)\.)?(\w+)$/, function (all, trackerName, method) {
                            args[0] = method;
                            command.apply($.tracker(trackerName), args)
                        })
                    }, alog_listeners = {}, trackers = {}, modules = {alog: {name: "alog", defined: true, instance: $}},
                    closing;

                function loadModules(moduleName) {
                    var modulesConfig = defaultTracker.get("alias") || {};
                    var scriptUrl = modulesConfig[moduleName] || (moduleName + ".js");
                    if (loadScripts[scriptUrl]) {
                        return
                    }
                    loadScripts[scriptUrl] = true;
                    var scriptTag = "script";
                    var scriptElement = docElement.createElement(scriptTag);
                    var lastElement = docElement.getElementsByTagName(scriptTag)[0];
                    scriptElement.async = !0;
                    scriptElement.src = scriptUrl;
                    lastElement.parentNode.insertBefore(scriptElement, lastElement)
                }

                function clearDepend(module) {
                    if (module.defined) {
                        return
                    }
                    var defined = true;
                    var params = [];
                    var requires = module.requires;
                    for (var i = 0; requires && i < requires.length; i++) {
                        var moduleName = requires[i];
                        var depend = modules[moduleName] = (modules[moduleName] || {});
                        if (depend.defined || depend == module) {
                            params.push(depend.instance)
                        } else {
                            defined = false;
                            if (!depend.defining) {
                                loadModules(moduleName)
                            }
                            depend.waiting = depend.waiting || {};
                            depend.waiting[module.name] = module
                        }
                    }
                    if (defined) {
                        module.defined = true;
                        if (module.creator) {
                            module.instance = module.creator.apply(module, params)
                        }
                        clearWaiting(module)
                    }
                }

                function clearWaiting(module) {
                    for (var p in module.waiting) {
                        clearDepend(module.waiting[p])
                    }
                }

                function timestamp(now) {
                    return (now || new Date) - startTime
                }

                function on(element, eventName, callback) {
                    if (!element) {
                        return
                    }
                    if (typeof element == "string") {
                        callback = eventName;
                        eventName = element;
                        element = $
                    }
                    try {
                        if (element == $) {
                            alog_listeners[eventName] = alog_listeners[eventName] || [];
                            alog_listeners[eventName].unshift(callback);
                            return
                        }
                        if (element.addEventListener) {
                            element.addEventListener(eventName, callback, false)
                        } else {
                            if (element.attachEvent) {
                                element.attachEvent("on" + eventName, callback)
                            }
                        }
                    } catch (ex) {
                    }
                }

                function un(element, eventName, callback) {
                    if (!element) {
                        return
                    }
                    if (typeof element == "string") {
                        callback = eventName;
                        eventName = element;
                        element = $
                    }
                    try {
                        if (element == $) {
                            var listener = alog_listeners[eventName];
                            if (!listener) {
                                return
                            }
                            var i = listener.length;
                            while (i--) {
                                if (listener[i] === callback) {
                                    listener.splice(i, 1)
                                }
                            }
                            return
                        }
                        if (element.removeEventListener) {
                            element.removeEventListener(eventName, callback, false)
                        } else {
                            element.detachEvent && element.detachEvent("on" + eventName, callback)
                        }
                    } catch (ex) {
                    }
                }

                function fire(eventName) {
                    var listener = alog_listeners[eventName], result = 0;
                    if (!listener) {
                        return
                    }
                    var items = [];
                    var args = arguments;
                    for (var i = 1; i < args.length; i++) {
                        items.push(args[i])
                    }
                    var i = listener.length;
                    while (i--) {
                        if (listener[i].apply(this, items)) {
                            result++
                        }
                    }
                    return result
                }

                function report(url, data) {
                    if (!url || !data) {
                        return
                    }
                    var image = new Image(1, 1), items = [], name = "img_" + (+new Date);
                    for (var key in data) {
                        if (data[key]) {
                            items.push(key + "=" + encodeURIComponent(data[key]))
                        }
                    }
                    $[name] = image;
                    image.onload = image.onerror = function () {
                        $[name] = image = image.onload = image.onerror = null;
                        delete $[name]
                    };
                    image.src = url + "?" + items.join("&")
                }

                function runProtocolParameter(protocolParameter, data) {
                    if (!protocolParameter) {
                        return data
                    }
                    var result = {};
                    for (var p in data) {
                        if (protocolParameter[p] !== null) {
                            result[protocolParameter[p] || p] = data[p]
                        }
                    }
                    return result
                }

                function command() {
                    var args = arguments;
                    var method = args[0];
                    if (this.created || /^(on|un|set|get|create)$/.test(method)) {
                        var methodFunc = Tracker.prototype[method];
                        var params = [];
                        for (var i = 1, len = args.length; i < len; i++) {
                            params.push(args[i])
                        }
                        if (typeof methodFunc == "function") {
                            methodFunc.apply(this, params)
                        }
                    } else {
                        this.argsList.push(args)
                    }
                }

                function merge(a, b) {
                    var result = {};
                    for (var p in a) {
                        if (a.hasOwnProperty(p)) {
                            result[p] = a[p]
                        }
                    }
                    for (var p in b) {
                        if (b.hasOwnProperty(p)) {
                            result[p] = b[p]
                        }
                    }
                    return result
                }

                function Tracker(name) {
                    this.name = name;
                    this.fields = {protocolParameter: {postUrl: null, protocolParameter: null}};
                    this.argsList = [];
                    this["alog"] = $
                }

                function getTracker(trackerName) {
                    var result;
                    trackerName = trackerName || "default";
                    if (trackerName == "*") {
                        result = [];
                        for (var p in trackers) {
                            result.push(trackers[p])
                        }
                        return result
                    }
                    var tracker = trackers[trackerName];
                    if (!tracker) {
                        tracker = trackers[trackerName] = new Tracker(trackerName)
                    }
                    return tracker
                }

                Tracker.prototype.start = Tracker.prototype.create = function (fields) {
                    if (this.created) {
                        return
                    }
                    if (typeof fields == "object") {
                        this.set(fields)
                    }
                    this.created = new Date;
                    this.fire("create", this);
                    var args;
                    while (args = this.argsList.shift()) {
                        command.apply(this, args)
                    }
                };
                Tracker.prototype.send = function (hitType, fieldObject) {
                    var data = merge({ts: timestamp().toString(36), t: hitType, sid: sid}, this.fields);
                    if (typeof fieldObject == "object") {
                        data = merge(data, fieldObject)
                    } else {
                        var args = arguments;
                        switch (hitType) {
                            case"pageview":
                                if (args[1]) {
                                    data.page = args[1]
                                }
                                if (args[2]) {
                                    data.title = args[2]
                                }
                                break;
                            case"event":
                                if (args[1]) {
                                    data.eventCategory = args[1]
                                }
                                if (args[2]) {
                                    data.eventAction = args[2]
                                }
                                if (args[3]) {
                                    data.eventLabel = args[3]
                                }
                                if (args[4]) {
                                    data.eventValue = args[4]
                                }
                                break;
                            case"timing":
                                if (args[1]) {
                                    data.timingCategory = args[1]
                                }
                                if (args[2]) {
                                    data.timingVar = args[2]
                                }
                                if (args[3]) {
                                    data.timingValue = args[3]
                                }
                                if (args[4]) {
                                    data.timingLabel = args[4]
                                }
                                break;
                            case"exception":
                                if (args[1]) {
                                    data.exDescription = args[1]
                                }
                                if (args[2]) {
                                    data.exFatal = args[2]
                                }
                                break;
                            default:
                                return
                        }
                    }
                    this.fire("send", data);
                    report(this.fields.postUrl, runProtocolParameter(this.fields.protocolParameter, data))
                };
                Tracker.prototype.set = function (name, value) {
                    if (typeof name == "string") {
                        if (name == "protocolParameter") {
                            value = merge({postUrl: null, protocolParameter: null}, value)
                        }
                        this.fields[name] = value
                    } else {
                        if (typeof name == "object") {
                            for (var p in name) {
                                this.set(p, name[p])
                            }
                        }
                    }
                };
                Tracker.prototype.get = function (name, callback) {
                    var result = this.fields[name];
                    if (typeof callback == "function") {
                        callback(result)
                    }
                    return result
                };
                Tracker.prototype.fire = function (eventName, data) {
                    return $.fire(this.name + "." + eventName, data)
                };
                Tracker.prototype.on = function (eventName, callback) {
                    $.on(this.name + "." + eventName, callback)
                };
                Tracker.prototype.un = function (eventName, callback) {
                    $.un(this.name + "." + eventName, callback)
                };
                $.name = "alog";
                $.sid = sid;
                $.defined = true;
                $.timestamp = timestamp;
                $.un = un;
                $.on = on;
                $.fire = fire;
                $.tracker = getTracker;
                $("init");
                var TrackerP = Tracker.prototype;
                exportSymbol(TrackerP, {
                    start: TrackerP.start,
                    create: TrackerP.create,
                    send: TrackerP.send,
                    set: TrackerP.set,
                    get: TrackerP.get,
                    on: TrackerP.on,
                    un: TrackerP.un,
                    fire: TrackerP.fire
                });
                var defaultTracker = getTracker();
                defaultTracker.set("protocolParameter", {alias: null});
                if (oldObject) {
                    var items = [].concat(oldObject.p || [], oldObject.q || []);
                    oldObject.p = oldObject.q = null;
                    for (var p in $) {
                        if ($.hasOwnProperty(p)) {
                            oldObject[p] = $[p]
                        }
                    }
                    $.p = $.q = {
                        push: function (args) {
                            $.apply($, args)
                        }
                    };
                    for (var i = 0; i < items.length; i++) {
                        $.apply($, items[i])
                    }
                }
                BMapSub[objectName] = $;
                if (ie) {
                    on(docElement, "mouseup", function (e) {
                        var target = e.target || e.srcElement;
                        if (target.nodeType == 1 && /^ajavascript:/i.test(target.tagName + target.href)) {
                            clickJsLinkTime = new Date
                        }
                    })
                }

                function unloadHandler() {
                    if (ie && (new Date - clickJsLinkTime < 50)) {
                        return
                    }
                    if (closing) {
                        return
                    }
                    closing = true;
                    var sleepCount = 0;
                    for (var p in trackers) {
                        var tracker = trackers[p];
                        if (tracker.created) {
                            sleepCount += tracker.fire("unload")
                        }
                    }
                    if (sleepCount) {
                        var isSleep = new Date;
                        while (new Date - isSleep < 100) {
                        }
                    }
                }

                var scriptErrorSended = false;
                winElement.onerror = function (message, file, line, column) {
                    var needSend = true;
                    if (!file && /^script error/i.test(message)) {
                        if (scriptErrorSended) {
                            needSend = false
                        } else {
                            scriptErrorSended = true
                        }
                    }
                    if (needSend) {
                        BMapSub.alog("exception.send", "exception", {msg: message, js: file, ln: line, col: column})
                    }
                    return false
                };
                BMapSub.alog("exception.on", "catch", function (ex) {
                    BMapSub.alog("exception.send", "exception", {
                        msg: ex.msg,
                        js: ex.path,
                        ln: ex.ln,
                        method: ex.method,
                        flag: "catch"
                    })
                })
            }(winElement, docElement, BMapSub);
            void function (winElement, docElement, BMapSub) {
                var i = "18_6";
                var config = {
                    product: "18",
                    page: i,
                    monkey_page: "",
                    speed_page: "",
                    monkey: {sample: "0.1"},
                    exception: {sample: "0.1"},
                    cus: {sample: "0.1"},
                    feature: {sample: "0"}
                };
                var imgBd = "http://fex.bdstatic.com";
                var stBd = "http://static.tieba.baidu.com";
                var nsBd = stBd;
                if (winElement.location.protocol === "https:") {
                    imgBd = "https://fex.bdstatic.com";
                    stBd = "https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK";
                    nsBd = stBd
                }
                var product = config.product;
                var page = config.page;
                var monkey_page = config.monkey_page;
                var speed_page = config.speed_page;
                var ran = Math.random;
                var stgif = stBd + "/tb/pms/img/st.gif";
                var nsclick_gif = stgif;
                var monkey = config.monkey;
                var exception = config.exception;
                var cus = config.cus;
                var feature = config.feature;
                if (monkey && monkey.sample && ran() < monkey.sample) {
                    var tracker = BMapSub.alog.tracker("monkey");
                    var timestamp;
                    var screenElement = winElement.screen;
                    var refer = docElement.referrer;
                    tracker.set("ver", 5);
                    tracker.set("pid", 241);
                    if (screenElement) {
                        tracker.set("px", screenElement.width + "*" + screenElement.height)
                    }
                    tracker.set("ref", refer);
                    BMapSub.alog("monkey.on", "create", function () {
                        timestamp = BMapSub.alog.timestamp;
                        tracker.set("protocolParameter", {reports: null})
                    });
                    BMapSub.alog("monkey.on", "send", function (data) {
                        if (data.t == "pageview") {
                            data.cmd = "open"
                        }
                        if (data.now) {
                            data.ts = timestamp(data.now).toString(36);
                            data.now = ""
                        }
                    });
                    BMapSub.alog("monkey.create", {
                        page: page,
                        pid: "241",
                        p: product,
                        dv: 6,
                        postUrl: nsclick_gif,
                        reports: {refer: 1}
                    });
                    BMapSub.alog("monkey.send", "pageview", {now: +new Date})
                }
                if (exception && exception.sample && ran() < exception.sample) {
                    var scriptErrorSended = false;
                    winElement.onerror = function (message, file, line, column) {
                        var needSend = true;
                        if (!file && /^script error/i.test(message)) {
                            if (scriptErrorSended) {
                                needSend = false
                            } else {
                                scriptErrorSended = true
                            }
                        }
                        if (needSend) {
                            BMapSub.alog("exception.send", "exception", {msg: message, js: file, ln: line, col: column})
                        }
                        return false
                    };
                    BMapSub.alog("exception.on", "catch", function (ex) {
                        BMapSub.alog("exception.send", "exception", {
                            msg: ex.msg,
                            js: ex.path,
                            ln: ex.ln,
                            method: ex.method,
                            flag: "catch"
                        })
                    });
                    BMapSub.alog("exception.create", {
                        postUrl: nsclick_gif,
                        dv: 7,
                        page: monkey_page ? monkey_page : page,
                        pid: "170",
                        p: product
                    })
                }
                if (cus && cus.sample && ran() < cus.sample) {
                    BMapSub.alog("cus.on", "time", function (e) {
                        var data = {};
                        var needSend = false;
                        var val;
                        if (e.toString() !== "[object Object]") {
                            return
                        }
                        for (var key in e) {
                            if (key == "page") {
                                data.page = e[key];
                                continue
                            }
                            val = parseInt(e[key]);
                            if (val > 0 && /^z_/.test(key)) {
                                needSend = true;
                                data[key] = val
                            }
                        }
                        if (needSend) {
                            BMapSub.alog("cus.send", "time", data)
                        }
                    });
                    BMapSub.alog("cus.on", "count", function (e) {
                        var data = {};
                        var needSend = false;
                        if (typeof e === "string") {
                            e = [e]
                        }
                        if (e instanceof Array) {
                            for (var i = 0; i < e.length; i++) {
                                if (/^z_/.test(e[i])) {
                                    needSend = true;
                                    data[e[i]] = 1
                                } else {
                                    if (/^page:/.test(e[i])) {
                                        data.page = e[i].substring(5)
                                    }
                                }
                            }
                        }
                        if (needSend) {
                            BMapSub.alog("cus.send", "count", data)
                        }
                    });
                    BMapSub.alog("cus.create", {dv: 3, postUrl: stgif, page: page, p: product})
                }
                if (feature && feature.sample && ran() < feature.sample) {
                    var domPrefixes = ["Moz", "O", "ms", "Webkit"];
                    var prefixes = ["-webkit-", "-moz-", "-o-", "-ms-"];
                    var createElement = function () {
                        if (typeof docElement.createElement !== "function") {
                            return docElement.createElement(arguments[0])
                        } else {
                            return docElement.createElement.apply(docElement, arguments)
                        }
                    };
                    var dpElem = {elem: createElement("dpFeatureTest")};
                    var dpStyle = {style: dpElem.elem.style};

                    function is(obj, type) {
                        return typeof obj === type
                    }

                    function testDOMProps(props, obj, elem) {
                        var item;
                        for (var i in props) {
                            if (props[i] in obj) {
                                if (elem === false) {
                                    return props[i]
                                }
                                item = obj[props[i]];
                                if (is(item, "function")) {
                                    return fnBind(item, elem || obj)
                                }
                                return item
                            }
                        }
                        return false
                    }

                    function testAllProps(prop, value, skipValueTest) {
                        return testPropsAll(prop, undefined, undefined, value, skipValueTest)
                    }

                    function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
                        var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
                            props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" ");
                        if (is(prefixed, "string") || is(prefixed, "undefined")) {
                            return testProps(props, prefixed, value, skipValueTest)
                        } else {
                            props = (prop + " " + (domPrefixes).join(ucProp + " ") + ucProp).split(" ");
                            return testDOMProps(props, prefixed, elem)
                        }
                    }

                    function testProps(props, prefixed, value, skipValueTest) {
                        skipValueTest = is(skipValueTest, "undefined") ? false : skipValueTest;
                        var afterInit, i, propsLength, prop, before;
                        propsLength = props.length;
                        for (i = 0; i < propsLength; i++) {
                            prop = props[i];
                            before = dpStyle.style[prop];
                            if (!!~("" + prop).indexOf("-")) {
                                prop = cssToDOM(prop)
                            }
                            if (dpStyle.style[prop] !== undefined) {
                                return prefixed == "pfx" ? prop : true
                            }
                        }
                        return false
                    }

                    function cssToDOM(name) {
                        return name.replace(/([a-z])-([a-z])/g, function (str, m1, m2) {
                            return m1 + m2.toUpperCase()
                        }).replace(/^-/, "")
                    }

                    var prefixed = function (prop, obj, elem) {
                        if (prop.indexOf("@") === 0) {
                            return atRule(prop)
                        }
                        if (prop.indexOf("-") != -1) {
                            prop = cssToDOM(prop)
                        }
                        if (!obj) {
                            return testPropsAll(prop, "pfx")
                        } else {
                            return testPropsAll(prop, obj, elem)
                        }
                    };

                    function checkSupportsForCanvas() {
                        var elem = createElement("canvas");
                        return !!(elem.getContext && elem.getContext("2d"))
                    }

                    function checkSupportsForDragAndDrop() {
                        var div = createElement("div");
                        return ("draggable" in div) || ("ondragstart" in div && "ondrop" in div)
                    }

                    function checkSupportsForLocalStorage() {
                        var mod = "localStorage";
                        try {
                            localStorage.setItem(mod, mod);
                            localStorage.removeItem(mod);
                            return true
                        } catch (e) {
                            return false
                        }
                    }

                    function checkSupportsForTemplate() {
                        return "content" in docElement.createElement("template")
                    }

                    function checkSupportsForShadowDom() {
                        return "createShadowRoot" in docElement.createElement("a")
                    }

                    function checkSupportsForCustomElements() {
                        return "registerElement" in docElement
                    }

                    function checkSupportsForHTMLImports() {
                        return "import" in docElement.createElement("link")
                    }

                    function checkSupportsForMicrodata() {
                        return "getItems" in docElement
                    }

                    function checkSupportsForEventSource() {
                        return "EventSource" in window
                    }

                    function checkSupportsForWebPFormat(feature, callback) {
                        var kTestImages = {
                            lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
                            lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
                            alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
                            animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
                        };
                        var img = new Image();
                        img.onload = function () {
                            var result = (img.width > 0) && (img.height > 0);
                            callback(feature, result)
                        };
                        img.onerror = function () {
                            callback(feature, false)
                        };
                        img.src = "data:image/webp;base64," + kTestImages[feature]
                    }

                    function webPCallback(feature, result) {
                        _FD.f["WebP-" + feature] = result;
                        return result
                    }

                    function checkSupportsForWebSQL() {
                        return "openDatabase" in winElement
                    }

                    function checkSupportsForNavigationTiming() {
                        return "performance" in winElement && "timing" in winElement.performance
                    }

                    function checkSupportsForUserTiming() {
                        return "performance" in winElement && "mark" in winElement.performance
                    }

                    function checkSupportsForES5Array() {
                        return !!(Array.prototype && Array.prototype.every && Array.prototype.filter && Array.prototype.forEach && Array.prototype.indexOf && Array.prototype.lastIndexOf && Array.prototype.map && Array.prototype.some && Array.prototype.reduce && Array.prototype.reduceRight && Array.isArray)
                    }

                    function checkSupportsForES6Promises() {
                        return "Promise" in winElement && "cast" in winElement.Promise && "resolve" in winElement.Promise && "reject" in winElement.Promise && "all" in winElement.Promise && "race" in winElement.Promise && (function () {
                            var resolve;
                            new winElement.Promise(function (r) {
                                resolve = r
                            });
                            return typeof resolve === "function"
                        }())
                    }

                    function checkSupportsForXMLHttpRequest2() {
                        var progEv = !!(winElement.ProgressEvent);
                        var fdata = !!(winElement.FormData);
                        var wCreds = winElement.XMLHttpRequest && "withCredentials" in new XMLHttpRequest;
                        return progEv && fdata && wCreds
                    }

                    function checkGeolocation() {
                        return "geolocation" in navigator
                    }

                    function checkWebGL() {
                        var canvas = createElement("canvas");
                        var supports = "probablySupportsContext" in canvas ? "probablySupportsContext" : "supportsContext";
                        if (supports in canvas) {
                            return canvas[supports]("webgl") || canvas[supports]("experimental-webgl")
                        }
                        return "WebGLRenderingContext" in winElement
                    }

                    function checkSVG() {
                        return !!docElement.createElementNS && !!docElement.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
                    }

                    function checkWorker() {
                        return !!winElement.Worker
                    }

                    function checkSocket() {
                        return "WebSocket" in winElement && winElement.WebSocket.CLOSING === 2
                    }

                    function checkVideo() {
                        var elem = docElement.createElement("video");
                        return !!elem.canPlayType
                    }

                    function checkAudio() {
                        var elem = docElement.createElement("audio");
                        return !!elem.canPlayType
                    }

                    function checkHistory() {
                        return !!(winElement.history && "pushState" in winElement.history)
                    }

                    function checkFile() {
                        return !!(winElement.File && winElement.FileReader)
                    }

                    function checkPostMessage() {
                        return "postMessage" in window
                    }

                    function checkWebkitNotification() {
                        return !!winElement.webkitNotifications || ("Notification" in winElement && "permission" in winElement.Notification && "requestPermission" in winElement.Notification)
                    }

                    function checkRequestAnimationFrame() {
                        var vendors = ["webkit", "moz", "o", "ms"];
                        var requestAnimationFrame = winElement.requestAnimationFrame;
                        for (var x = 0; x < vendors.length && !requestAnimationFrame; ++x) {
                            requestAnimationFrame = winElement[vendors[x] + "RequestAnimationFrame"]
                        }
                        return !!requestAnimationFrame
                    }

                    function checkSupportsForJSON() {
                        return "JSON" in winElement && "parse" in JSON && "stringify" in JSON
                    }

                    function checkSupportsForFullscreen() {
                        return !!(prefixed("exitFullscreen", docElement, false) || prefixed("cancelFullScreen", docElement, false))
                    }

                    function checkSupportsForI18n() {
                        return !!prefixed("Intl", winElement)
                    }

                    function checkSupportsForFlexbox() {
                        return testAllProps("flexBasis", "1px", true)
                    }

                    function checkSupportsForTransforms3d() {
                        return !!testAllProps("perspective", "1px", true)
                    }

                    function checkSupportsForCssShapes() {
                        return testAllProps("shapeOutside", "content-box", true)
                    }

                    function checkSupportsForCssFilters() {
                        var el = createElement("div");
                        el.style.cssText = prefixes.join("filter:blur(2px); ");
                        return !!el.style.length && ((docElement.documentMode === undefined || docElement.documentMode > 9))
                    }

                    function checkSupportsForCORS() {
                        return "XMLHttpRequest" in winElement && "withCredentials" in new XMLHttpRequest()
                    }

                    function checkSupportsForProgressBar() {
                        return createElement("progress").max !== undefined
                    }

                    function checkSupportsForMeterBar() {
                        return createElement("meter").max !== undefined
                    }

                    function checkSupportsForBeacon() {
                        return "sendBeacon" in navigator
                    }

                    function checkSupportsForBorderRadius() {
                        return testAllProps("borderRadius", "0px", true)
                    }

                    function checkSupportsForBoxShadow() {
                        return testAllProps("boxShadow", "1px 1px", true)
                    }

                    function checkSupportsForOpacity() {
                        var elem = createElement("div");
                        var style = elem.style;
                        style.cssText = prefixes.join("opacity:.55;");
                        return (/^0.55$/).test(style.opacity)
                    }

                    function checkSupportsForTextShadow() {
                        return testProps(["textShadow"], undefined, "1px 1px")
                    }

                    function checkSupportsForAnimations() {
                        return testAllProps("animationName", "a", true)
                    }

                    function checkSupportsForTransition() {
                        return testAllProps("transition", "all", true)
                    }

                    function checkSupportsForTransforms() {
                        return navigator.userAgent.indexOf("Android 2.") === -1 && testAllProps("transform", "scale(1)", true)
                    }

                    var _FD = {
                        f: {}, t: function (attr, testFunc, args) {
                            this.f[attr] = testFunc.apply(this, [].slice.call(arguments, 2))
                        }, c: function (testFunc, args) {
                            testFunc.apply(this, [].slice.call(arguments, 1))
                        }, runAllTest: function () {
                            var that = this;
                            that.t("bdrs", checkSupportsForBorderRadius);
                            that.t("bxsd", checkSupportsForBoxShadow);
                            that.t("opat", checkSupportsForOpacity);
                            that.t("txsd", checkSupportsForTextShadow);
                            that.t("anim", checkSupportsForAnimations);
                            that.t("trsi", checkSupportsForTransition);
                            that.t("trfm", checkSupportsForTransforms);
                            that.t("flex", checkSupportsForFlexbox);
                            that.t("3dtr", checkSupportsForTransforms3d);
                            that.t("shpe", checkSupportsForCssShapes);
                            that.t("fltr", checkSupportsForCssFilters);
                            that.t("cavs", checkSupportsForCanvas);
                            that.t("dgdp", checkSupportsForDragAndDrop);
                            that.t("locs", checkSupportsForLocalStorage);
                            that.t("wctem", checkSupportsForTemplate);
                            that.t("wcsdd", checkSupportsForShadowDom);
                            that.t("wccse", checkSupportsForCustomElements);
                            that.t("wchti", checkSupportsForHTMLImports);
                            that.c(checkSupportsForWebPFormat, "lossy", webPCallback);
                            that.c(checkSupportsForWebPFormat, "lossless", webPCallback);
                            that.c(checkSupportsForWebPFormat, "alpha", webPCallback);
                            that.c(checkSupportsForWebPFormat, "animation", webPCallback);
                            that.t("wsql", checkSupportsForWebSQL);
                            that.t("natm", checkSupportsForNavigationTiming);
                            that.t("ustm", checkSupportsForUserTiming);
                            that.t("arra", checkSupportsForES5Array);
                            that.t("prms", checkSupportsForES6Promises);
                            that.t("xhr2", checkSupportsForXMLHttpRequest2);
                            that.t("wbgl", checkWebGL);
                            that.t("geol", checkGeolocation);
                            that.t("svg", checkSVG);
                            that.t("work", checkWorker);
                            that.t("wbsk", checkSocket);
                            that.t("vido", checkVideo);
                            that.t("audo", checkAudio);
                            that.t("hsty", checkHistory);
                            that.t("file", checkFile);
                            that.t("psmg", checkPostMessage);
                            that.t("wknf", checkWebkitNotification);
                            that.t("rqaf", checkRequestAnimationFrame);
                            that.t("json", checkSupportsForJSON);
                            that.t("flsc", checkSupportsForFullscreen);
                            that.t("i18n", checkSupportsForI18n);
                            that.t("cors", checkSupportsForCORS);
                            that.t("prog", checkSupportsForProgressBar);
                            that.t("metr", checkSupportsForMeterBar);
                            that.t("becn", checkSupportsForBeacon);
                            that.t("mcrd", checkSupportsForMicrodata);
                            that.t("esrc", checkSupportsForEventSource)
                        }
                    };
                    var tracker = BMapSub.alog.tracker("feature");
                    tracker.on("commit", function () {
                        _FD.runAllTest();
                        var t = setInterval(function () {
                            if ("WebP-lossy" in _FD.f && "WebP-lossless" in _FD.f && "WebP-alpha" in _FD.f && "WebP-animation" in _FD.f) {
                                for (var key in _FD.f) {
                                    _FD.f[key] = _FD.f[key] ? "y" : "n"
                                }
                                tracker.send("feature", _FD.f);
                                clearInterval(t)
                            }
                        }, 500)
                    });
                    BMapSub.alog("feature.create", {
                        dv: 4,
                        postUrl: stgif,
                        page: monkey_page ? monkey_page : page,
                        p: product
                    });
                    BMapSub.alog("feature.fire", "commit")
                }
            }(winElement, docElement, BMapSub)
        }(window, document, BMapSub);
        BMapSub._alog = BMapSub.alog || function () {
        };
        BMapSub.alog("cus.fire", "count", "z_loadscriptcount");
        if (location.protocol === "https:") {
            BMapSub.alog("cus.fire", "count", "z_httpscount")
        }

        function exportSymbol(object, opts) {
            for (var property in opts) {
                object[property] = opts[property]
            }
        }

        function SVGRenderer() {
        }

        SVGRenderer.supported = SVG.supported;
        $.extend(SVGRenderer.prototype, {
            initialize: function ($el, subway) {
                this.$el = $el;
                this.subway = subway;
                this.container = null;
                this.svg = null;
                this.highLightLines = [];
                this.highLightStations = [];
                this.resStart = "//api.map.baidu.com/images/subway/start-bak.png";
                this.resEnd = "//api.map.baidu.com/images/subway/end-bak.png";
                this.deviceWidth = $(this.$el).offset().width;
                this.deviceHeight = $(this.$el).offset().height;
                this.mapWidth = subway.width;
                this.mapHeight = subway.height;
                this.rectWidth = Math.max(this.mapWidth, this.deviceWidth), this.rectHeight = Math.max(this.mapHeight, this.deviceHeight);
                this.scaleRatio = 1;
                this.maxScaleRatio = 2;
                this.minScaleRatio = 0.1;
                this.scaleRate = 1.25;
                this.zoomInRate = this.scaleRate;
                this.zoomOutRate = 1 / this.scaleRate;
                this.orig_x = null;
                this.orig_y = null;
                this.tolerance = 50;
                this._plotStations = $.proxy(this._plotStations, this);
                this._createElement()
            }, _createElement: function () {
                $(this.$el).find("#sw_renderer").remove();
                var svg = $('<svg id="sw_svg" stlye="position: absolute" />').get(0);
                this.container = $('<div id="sw_renderer" style="position: relative; width: 100%; height: 100%" />');
                this.mid = $('<div id="mid" style="position: relative; width: 100%; height: 100%; left:-800px;"/>');
                this.mid.append(svg);
                this.container.append(svg);
                this.svg = SVG(svg).size(this.rectWidth, this.rectHeight);
                this.context = this.svg.group();
                window.svg2 = this
            }, animation: function (func, time) {
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(func)
                } else {
                    time = time || 20;
                    window.setTimeout(func, time)
                }
            }, clear: function () {
                var ctx = this.context;
                ctx.clear()
            }, plot: function () {
                this.clear();
                this._plotSVG();
                $(this.$el).append(this.container);
                this._fitSVG()
            }, _plotSVG: function (dest_x, dest_y, scale_ratio) {
                var ctx = this.context, subway = this.subway;
                this.orig_x = (dest_x == undefined ? 0 : dest_x);
                this.orig_y = (dest_y == undefined ? 0 : dest_y);
                scale_ratio = scale_ratio || this.scaleRatio;
                this._plotMap(ctx, subway)
            }, _plotMap: function (ctx, subway) {
                var lines = subway.lines;
                for (var i = 0; i < lines.length; i++) {
                    lines[i].lc = this._modifyColor(lines[i].lc);
                    for (var t = 0; t < lines[i].stations.length; t++) {
                        lines[i].stations[t].lc = this._modifyColor(lines[i].stations[t].lc)
                    }
                }
                ctx.rect(this.rectWidth, this.rectHeight).attr({fill: "none"});
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    this._plotLine(ctx, subway, line)
                }
                this._plotStationsIndex = 0;
                this.animation(this._plotStations, 20)
            }, _modifyColor: function (oldColor) {
                var allcolor = {
                    "#0066CC": "#4f90cb",
                    "#990066": "#d36fb1",
                    "#FFCC33": "#c27f2a",
                    "#ea9914": "#e5a233",
                    "#B699BD": "#b298ba",
                    "#CC0000": "#e8787a",
                    "#D39188": "#bc8081",
                    "#e7600e": "#b58f68",
                    "#0099FF": "#29adc8",
                    "#006633": "#33cc66",
                    "#5c2a69": "#9966cc",
                    "#00CCCC": "#00cc99",
                    "#ADCB13": "#999933",
                    "#D5353F": "#cc9933",
                    "#C40082": "#cc9999",
                    "#5DB85E": "#669966",
                    "#a02024": "#993366",
                    "#cc3736": "#cc3366"
                };
                if (allcolor[oldColor]) {
                    return allcolor[oldColor]
                } else {
                    return oldColor
                }
            }, _plotLine: function (ctx, subway, line, isRenderPlan) {
                if (!isRenderPlan && !line.uid) {
                    return
                }
                var path = ["M"];
                var minX = 1000000;
                var minY = 1000000;
                var maxX = -1000000;
                var maxY = -1000000;
                for (var j = 0; j < line.stations.length; j++) {
                    var station = line.stations[j];
                    var x = station.x, y = station.y, rc = station.rc;
                    if (rc) {
                        var stP = line.stations[j - 1];
                        var stN = line.stations[j + 1];
                        var pxP = stP.x;
                        var pxN = stN.x;
                        var pyP = stP.y;
                        var pyN = stN.y;
                        var cx = 2 * x - (pxP + pxN) / 2;
                        var cy = 2 * y - (pyP + pyN) / 2;
                        if (j > 0) {
                            path.push("Q")
                        }
                        path.push([cx, cy, pxN, pyN].join(","))
                    } else {
                        if (j > 0) {
                            path.push("L")
                        }
                        path.push((x).toFixed(2) + "," + (y).toFixed(2))
                    }
                    if (x < minX) {
                        minX = x
                    }
                    if (x > maxX) {
                        maxX = x
                    }
                    if (y < minY) {
                        minY = y
                    }
                    if (y > maxY) {
                        maxY = y
                    }
                }
                if (line.loop) {
                    path.push("Z")
                }
                var polyline = ctx.path(path.join(""), true).attr({
                    fill: "none",
                    stroke: line.lc,
                    "stroke-width": isRenderPlan ? 12 : 8
                });
                if (!isRenderPlan) {
                    var polylineText = ctx.text(line.lb).font({
                        size: 16,
                        weight: "bold"
                    }).fill({color: line.lc}).move(line.lbx, line.lby - 16);
                    polyline.attr({eletype: 1, lb: line.lb})
                }
                var bdcx = (minX + maxX) / 2;
                var bdcy = (minY + maxY) / 2;
                var bdCenter = {x: bdcx, y: bdcy};
                return {
                    polyline: polyline,
                    polylineText: polylineText,
                    boundCenter: bdCenter,
                    bounds: [minX, minY, maxX, maxY]
                }
            }, _plotStations: function () {
                var ctx = this.context;
                var subway = this.subway;
                var index = this._plotStationsIndex;
                var lines = subway.lines;
                if (index >= lines.length) {
                    listener.trigger("subway", "drawComplete", {});
                    return
                }
                var line = lines[index];
                for (var k = 0; k < line.stations.length; k++) {
                    var station = line.stations[k];
                    this._plotStation(ctx, subway, station)
                }
                this._plotStationsIndex++;
                this.animation(this._plotStations, 20)
            }, _plotStation: function (ctx, subway, station) {
                if (!station.uid) {
                    return
                }
                if (station.slb) {
                    if (station.icon) {
                        var icon_xy = station.icon.split(",");
                        ctx.image(subway.imageDataEncoded.airport, 32, 32).move(station.x + this._toInt(icon_xy[1]), station.y + this._toInt(icon_xy[2]))
                    }
                    if (station.ex) {
                        ctx.image(subway.imageDataEncoded.transfer, 20, 20).move(station.x + station.trs_x, station.y + station.trs_y)
                    } else {
                        ctx.circle(13).fill({color: "white"}).stroke({
                            color: station.lc,
                            width: 2.5
                        }).move(station.x - 6.5, station.y - 6.5)
                    }
                    ctx.text(station.lb).font({
                        size: 14,
                        weight: "normal"
                    }).fill({color: "#000"}).move(station.x + station.rx, station.y + station.ry - 16)
                }
            }, zoomIn: function (pixel_x, pixel_y) {
                this.clearTransition();
                pixel_x = pixel_x || this.deviceWidth / 2;
                pixel_y = pixel_y || this.deviceHeight / 2;
                var center = this.getPointFromPixel(new Coords(pixel_x, pixel_y));
                this.zoom(center.x, center.y, this.scaleRatio * this.zoomInRate)
            }, zoomOut: function (pixel_x, pixel_y) {
                this.clearTransition();
                pixel_x = pixel_x || this.deviceWidth / 2;
                pixel_y = pixel_y || this.deviceHeight / 2;
                var center = this.getPointFromPixel(new Coords(pixel_x, pixel_y));
                this.zoom(center.x, center.y, this.scaleRatio * this.zoomOutRate)
            }, clearTransition: function () {
                this.svg.node.firstChild.style.transition = "transitionend"
            }, zoom: function (center_px, center_py, scale_ratio) {
                if (center_px === undefined || center_py === undefined) {
                    var center = this.getPointFromPixel(new Coords(this.deviceWidth / 2, this.deviceHeight / 2));
                    center_px = center.x;
                    center_py = center.y
                }
                var ctx = this.context;
                scale_ratio = scale_ratio || this.scaleRatio;
                scale_ratio = Math.max(Math.min(scale_ratio, this.maxScaleRatio), this.minScaleRatio);
                ctx.scale(scale_ratio, scale_ratio);
                this.scaleRatio = scale_ratio;
                this.center(center_px, center_py)
            }, getZoom: function () {
                return this.scaleRatio
            }, center: function (point_x, point_y) {
                var ctx = this.context;
                ctx.move(this._toPixel(-point_x) + this.deviceWidth / 2, this._toPixel(-point_y) + this.deviceHeight / 2);
                this.orig_x = ctx.x();
                this.orig_y = ctx.y()
            }, getOriginPoint: function () {
                return new Coords(this._toUnit(this.orig_x - this.deviceWidth / 2), this._toUnit(this.orig_y - this.deviceHeight / 2))
            }, move: function (delta_x, delta_y) {
                this.clearTransition();
                var ctx = this.context;
                var dest_x = this.orig_x + delta_x, dest_y = this.orig_y + delta_y;
                this._setCSSTransform(delta_x, delta_y, 1)
            }, moveTo: function (dest_x, dest_y) {
                this.clearTransition();
                var ctx = this.context;
                dest_x = this._toPixel(dest_x) + this.deviceWidth / 2;
                dest_y = this._toPixel(dest_y) + this.deviceHeight / 2;
                ctx.move(dest_x, dest_y);
                this.orig_x = dest_x;
                this.orig_y = dest_y;
                this._clearCSSTransform()
            }, isOutOfBounds: function (orig_x, orig_y, delta_x, delta_y) {
                var dest_x = orig_x + this.getPointUnitFromPixelValue(delta_x),
                    dest_y = orig_y + this.getPointUnitFromPixelValue(delta_y);
                if (dest_x > 0 || dest_x < -this.mapWidth || dest_y > 0 || dest_y < -this.mapHeight) {
                    return {
                        delta_x: this.getPixelValueFromPointUnit((dest_x > 0 ? 0 : dest_x < -this.mapWidth ? -this.mapWidth : dest_x) - orig_x),
                        delta_y: this.getPixelValueFromPointUnit((dest_y > 0 ? 0 : dest_y < -this.mapHeight ? -this.mapHeight : dest_y) - orig_y)
                    }
                }
                return false
            }, resize: function (width, height) {
                if (!height || height == this.deviceHeight) {
                    return
                }
                var center = this.getPointFromPixel(new Coords(this.deviceWidth / 2, this.deviceHeight / 2)),
                    scale_ratio = this.scaleRatio;
                this.deviceWidth = $(this.$el).offset().width;
                this.deviceHeight = $(this.$el).offset().height;
                this.clear();
                this._plotSVG();
                this.zoom(center.x, center.y, scale_ratio)
            }, _fitSVG: function () {
                var curSize, fitSize;
                var horizonal = this.deviceWidth > this.deviceHeight;
                if (horizonal) {
                    curSize = this.mapHeight;
                    fitSize = this.deviceHeight
                } else {
                    curSize = this.mapWidth;
                    fitSize = this.deviceWidth
                }
                var fitScale = 1, curScale = this.scaleRatio, tmpScale, tmpSize;
                while (curSize > fitSize) {
                    tmpScale = curScale * this.zoomOutRate;
                    tmpSize = curSize * this.zoomOutRate;
                    if (tmpScale < this.minScaleRatio) {
                        break
                    } else {
                        curScale = tmpScale;
                        curSize = tmpSize
                    }
                }
                this.context.scale(curScale, curScale).center(this.deviceWidth / 2, this.deviceHeight / 2);
                this.orig_x = this.context.x();
                this.orig_y = this.context.y();
                this.scaleRatio = curScale
            }, _setCSSTransform: function (dest_x, dest_y, scale) {
                if (dest_x == undefined || dest_y == undefined) {
                    dest_x = this.orig_x || 0;
                    dest_y = this.orig_y || 0
                }
                if (scale == undefined) {
                    scale = 1
                }
                var matrix = this._getTransformMatrix(dest_x, dest_y, scale);
                this.container.css({transform: matrix, "-webkit-transform": matrix})
            }, _clearCSSTransform: function () {
                this._setCSSTransform(0, 0, 1)
            }, _getTransformMatrix: function (dest_x, dest_y, scale) {
                var matrix = [scale, 0, 0, scale, dest_x, dest_y];
                return "matrix(" + matrix.join(",") + ")"
            }, getPointUnitFromPixelValue: function (value) {
                return this._toUnit(value)
            }, getPixelValueFromPointUnit: function (value) {
                return this._toPixel(value)
            }, getPointFromPixel: function (pixel) {
                var ctx = this.context;
                var pixel_x = pixel.x, pixel_y = pixel.y;
                var point_x = this._toInt(this._toUnit(pixel_x - ctx.x())),
                    point_y = this._toInt(this._toUnit(pixel_y - ctx.y()));
                return new Coords(point_x, point_y)
            }, getPixelFromPoint: function (point) {
                var ctx = this.context;
                var point_x = point.x, point_y = point.y;
                var pixel_x = (this._toPixel(point_x) + ctx.x()), pixel_y = (this._toPixel(point_y) + ctx.y());
                return new Coords(pixel_x, pixel_y)
            }, isMaxScale: function () {
                return this.scaleRatio * this.zoomInRate > this.maxScaleRatio
            }, isMinScale: function () {
                return this.scaleRatio * this.zoomOutRate < this.minScaleRatio
            }, _toInt: function (n) {
                return n >> 0
            }, _toUnit: function (pixel) {
                return pixel / this.scaleRatio
            }, _toPixel: function (unit) {
                return unit * this.scaleRatio
            }, searchPlanCbkData: function (data, opts) {
                this.showMaskLayer();
                var me = this;
                if (!me.subwayModel) {
                    me.subwayModel = new DirectionModel(me.subway)
                } else {
                    me.subwayModel.updateSubwayData(me.subway)
                }
                var plan = me.subwayModel.parse(data);
                var bounds = plan.bounds;
                plan.screenBounds = me.calcPlanScreenBounds(bounds);
                me.highLightPlan(plan, data, opts)
            }, showMaskLayer: function () {
                if (!this.maskLayer) {
                    var margin = 100;
                    var ctx = this.context;
                    var width = this.rectWidth + margin;
                    var height = this.rectHeight + margin;
                    this.maskLayer = ctx.rect(width, height).fill({color: "white", opacity: 0.9});
                    this.maskLayer.attr({x: -margin / 2, y: -margin / 2})
                }
                this.maskLayer.show()
            }, calcPlanScreenBounds: function (bounds) {
                var minX = bounds[0];
                var minY = bounds[1];
                var maxX = bounds[2];
                var maxY = bounds[3];
                var minPt = {x: minX, y: minY};
                var maxPt = {x: maxX, y: maxY};
                var minPx = this.getPixelFromPoint(minPt);
                var maxPx = this.getPixelFromPoint(maxPt);
                return [minPx.x, minPx.y, maxPx.x, maxPx.y]
            }, highLightPlan: function (plan, data, opts) {
                this.clearHighLightStations();
                this.clearHighLightLines();
                for (var i = 0, len = plan.length; i < len; i++) {
                    var line = plan[i];
                    var isRenderPlan = true;
                    this.plotHighLightLine(line, isRenderPlan);
                    this.plotHighLightStations(line, isRenderPlan)
                }
                if (!opts.center) {
                    this.reHighLightStartAndEnd()
                } else {
                    this.clearSubwayPlanStation();
                    this.addHighLightStartAndEnd(plan)
                }
                if (opts.center) {
                    this.centerSearchPlan(this.highLightLines)
                }
            }, clearSubwayPlanStation: function () {
                this.subwayPlanStart && this.subwayPlanStart.ele.remove();
                this.subwayPlanEnd && this.subwayPlanEnd.ele.remove();
                this.subwayPlanStart = null;
                this.subwayPlanEnd = null
            }, removeDirection: function () {
                this.clearHighLightLines();
                this.clearHighLightStations();
                this.clearSubwayPlanStation();
                this.hideMaskLayer()
            }, hideMaskLayer: function () {
                if (this.maskLayer) {
                    this.maskLayer.hide()
                }
            }, addHighLightStartAndEnd: function (plan) {
                if (plan && plan.length > 0) {
                    var ctx = this.context;
                    var startStations = plan[0].stations;
                    var endStations = plan[plan.length - 1].stations;
                    if (startStations && endStations) {
                        var start = startStations[0];
                        var end = endStations[endStations.length - 1];
                        var startEle = ctx.image(this.resStart, 35, 56).move(start.x - 18, start.y - 56);
                        this.subwayPlanStart = {
                            uid: start.uid,
                            name: start.sid,
                            mcX: start.px,
                            mcY: start.py,
                            ele: startEle,
                            sx: start.x,
                            sy: start.y
                        };
                        var endEle = ctx.image(this.resEnd, 35, 56).move(end.x - 18, end.y - 56);
                        this.subwayPlanEnd = {
                            uid: end.uid,
                            name: end.sid,
                            mcX: end.px,
                            mcY: end.py,
                            ele: endEle,
                            sx: end.x,
                            sy: end.y
                        }
                    }
                }
            }, centerSearchPlan: function (highLightLines) {
                if (highLightLines && highLightLines.length > 0) {
                    var minX = 1000000;
                    var minY = 1000000;
                    var maxX = -1000000;
                    var maxY = -1000000;
                    highLightLines.forEach(function (line) {
                        var bds = line.bounds;
                        if (bds[0] < minX) {
                            minX = bds[0]
                        }
                        if (bds[2] > maxX) {
                            maxX = bds[2]
                        }
                        if (bds[1] < minY) {
                            minY = bds[1]
                        }
                        if (bds[3] > maxY) {
                            maxY = bds[3]
                        }
                    });
                    var destCenterX = (minX + maxX) / 2;
                    var destCenterY = (minY + maxY) / 2;
                    this.moveToByAnimation(destCenterX, destCenterY);
                    this.zoomBySearchPlan(minX, maxX, minY, maxY)
                }
            }, zoomBySearchPlan: function (minX, maxX, minY, maxY) {
                this.clearTransition();
                var width = maxX - minX;
                var height = maxY - minY;
                var destCenterX = (minX + maxX) / 2;
                var destCenterY = (minY + maxY) / 2;
                var center = this.getPointFromPixel(new Coords(destCenterX, destCenterY));
                var fitHeight = this.deviceHeight - $(".direction_panel").height() - 20;
                var fitWidth = this.deviceWidth - 20;
                var scale = 0.9;
                width = width * scale;
                height = height * scale;
                while ((width > fitWidth || height > fitHeight)) {
                    scale = scale * this.zoomOutRate;
                    width = width * this.zoomOutRate;
                    height = height * this.zoomOutRate
                }
                this.zoom(center.x, center.y, scale)
            }, moveToByAnimation: function (destCenterX, destCenterY) {
                var me = this;
                if (me.centerAni) {
                    me.centerAni.stop()
                }
                var deviceWidth = me.deviceWidth;
                var deviceHeight = me.deviceHeight;
                var originCenter = me.getPointFromPixel({x: deviceWidth / 2, y: deviceHeight / 2});
                var diffX = destCenterX - originCenter.x;
                var diffY = destCenterY - originCenter.y;
                me.centerAni = new Animation({
                    duration: 200, fps: 60, render: function (s) {
                        var curX = originCenter.x + diffX * s;
                        var curY = originCenter.y + diffY * s;
                        me.center(curX, curY)
                    }, finish: function () {
                        me.centerAni = null
                    }, onStop: function (s) {
                        me.centerAni = null
                    }
                })
            }, clearHighLightStations: function (line) {
                if (this.highLightStations && this.highLightStations.length > 0) {
                    for (var i = this.highLightStations.length - 1; i >= 0; i--) {
                        this.highLightStations[i].remove()
                    }
                    this.highLightStations = []
                }
            }, clearHighLightLines: function () {
                if (this.highLightLines && this.highLightLines.length > 0) {
                    for (var i = 0, len = this.highLightLines.length; i < len; i++) {
                        var highLightLine = this.highLightLines[i];
                        highLightLine.polyline && highLightLine.polyline.remove();
                        highLightLine.polylineText && highLightLine.polylineText.remove()
                    }
                    this.highLightLines.length = 0
                }
                this.highLightLineLid = null
            }, plotHighLightLine: function (line, isRenderPlan) {
                if (!isRenderPlan) {
                    this.clearHighLightLines()
                }
                var plotLine = this._plotLine(this.context, null, line, isRenderPlan);
                this.highLightLines.push(plotLine);
                return plotLine
            }, plotHighLightStations: function (line, isRenderPlan) {
                if (!isRenderPlan) {
                    this.clearHighLightStations()
                }
                var ctx = this.context;
                for (var i = 0, len = line.stations.length; i < len; i++) {
                    var station = line.stations[i];
                    if (!station.lb) {
                        continue
                    }
                    if (station.icon) {
                        var icon_xy = station.icon.split(",");
                        var imgStation = ctx.image(this.resAirport, 32, 32).move(station.x + this._toInt(icon_xy[1]), station.y + this._toInt(icon_xy[2]));
                        this.highLightStations.push(imgStation)
                    }
                    var subwayStation;
                    if (station.ex) {
                        subwayStation = ctx.image(this.subway.imageDataEncoded.transfer, 20, 20).move(station.x + station.trs_x, station.y + station.trs_y)
                    } else {
                        subwayStation = ctx.circle(13).fill({color: "white"}).stroke({
                            color: station.lc,
                            width: 2.5
                        }).move(station.x - 6.5, station.y - 6.5)
                    }
                    this.highLightStations.push(subwayStation);
                    if (!!isRenderPlan) {
                        subwayStation.attr({
                            eletype: 0,
                            uid: station.uid,
                            name: station.sid,
                            sx: station.x,
                            sy: station.y,
                            mcX: station.px,
                            mcY: station.py
                        });
                        var txtStation = ctx.text(station.lb).font({
                            size: 14,
                            weight: "normal"
                        }).fill({color: "#000"}).move(station.x + station.rx, station.y + station.ry - 16);
                        this.highLightStations.push(txtStation)
                    }
                }
            }
        });

        function Coords(x, y) {
            this.x = x;
            this.y = y
        }

        Coords.prototype.toString = function () {
            return [this.x, this.y].join(",")
        };
        Coords.prototype.floor = function () {
            return new Coords(this.x >> 0, this.y >> 0)
        };

        function DataLine(lid, lb, slb, uid, n, loop, lbx, lby, lbr, lc) {
            this.lid = lid;
            this.lb = lb;
            this.slb = slb;
            this.uid = uid;
            this.n = n;
            this.loop = loop;
            this.lbx = lbx;
            this.lby = lby;
            this.lbr = lbr;
            this.lc = lc;
            this.stations = []
        }

        function DataStation(sid, lb, uid, px, py, x, y, rx, ry, st, ex, iu, rc, slb, ln, color, icon, dx, dy, trs_x, trs_y) {
            this.sid = sid;
            this.lb = lb;
            this.uid = uid;
            this.px = px;
            this.py = py;
            this.x = x;
            this.y = y;
            this.rx = rx;
            this.ry = ry;
            this.st = st;
            this.ex = ex;
            this.iu = iu;
            this.rc = rc;
            this.slb = slb;
            this.ln = ln;
            this.color = color;
            this.icon = icon;
            this.dx = dx;
            this.dy = dy;
            this.trs_x = trs_x;
            this.trs_y = trs_y
        }

        function DataSubway(shortName, fullName, lines_number) {
            this.fullName = fullName;
            this.shortName = shortName;
            this.lines_number = lines_number;
            this.lines = [];
            this.width = null;
            this.height = null
        }

        DataSubway.prototype.findBy = function (fn) {
            var v = [];
            if (typeof fn === "function") {
                var line;
                for (var i = this.lines.length - 1; i >= 0; i--) {
                    line = this.lines[i];
                    fn.apply(line) && v.push(line);
                    for (var j = line.stations.length - 1; j >= 0; j--) {
                        var station = line.stations[j];
                        fn.apply(station) && v.push(station)
                    }
                }
            }
            return v
        };
        DataSubway.prototype.findNearestStation = function (coords, type, tolerance) {
            var minValue = Number.POSITIVE_INFINITY, curValue = 0, curStation = null,
                key = (type === "point" ? "p" : "");
            if (coords && coords.x && coords.y) {
                var lines = this.lines;
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    for (var j = 0; j < line.stations.length; j++) {
                        var station = line.stations[j];
                        if (station.slb) {
                            curValue = Math.pow(station[key + "x"] - coords.x, 2) + Math.pow(station[key + "y"] - coords.y, 2);
                            if (curValue < minValue) {
                                minValue = curValue;
                                curStation = station
                            }
                        }
                    }
                }
            }
            if (tolerance > 0 && minValue > (tolerance * tolerance)) {
                return
            }
            return curStation
        };
        DataSubway.prototype.findLineOneWayDirection = function (line, name) {
            var first_station, last_station;
            if (name) {
                var stations = this.findBy(function () {
                    return this instanceof Station && this.st && this.sid && this.lid == line.lid && this.sid == name
                });
                if (stations.length === 0) {
                    first_station = line.stations[0];
                    last_station = line.stations[line.stations.length - 1]
                } else {
                    first_station = stations[0];
                    if (line.stations[0] == first_station) {
                        for (var i = line.stations.length - 1; i > 0; i--) {
                            if (line.stations[i].st) {
                                last_station = line.stations[i];
                                break
                            }
                        }
                    } else {
                        for (var j = 0; j < line.stations.length; j++) {
                            if (line.stations[j].st) {
                                last_station = line.stations[j];
                                break
                            }
                        }
                    }
                }
            } else {
                first_station = line.stations[0];
                last_station = line.stations[line.stations.length - 1]
            }
            return {firstStation: first_station, lastStation: last_station}
        };
        DataSubway.prototype.parseStationExt = function (data) {
            var self = this;
            if (data && data.content && data.content.ext && data.content.ext.line_info) {
                var foundLines = {};
                var lostLineExt = [];
                $.each(data.content.ext.line_info, function (index, info) {
                    var remoteLineName = info.line_name;
                    if (foundLines[remoteLineName] === undefined) {
                        var lines = self.findBy(function () {
                            return this instanceof DataLine && this.lid.indexOf(remoteLineName) >= 0
                        });
                        if (lines.length === 0) {
                            lostLineExt.push(info)
                        } else {
                            foundLines[remoteLineName] = {line: lines[0], ext: [info]}
                        }
                    } else {
                        foundLines[remoteLineName].ext.push(info)
                    }
                });
                $.each(lostLineExt, function (index, info) {
                    var remoteLineName = info.line_name;
                    var remoteTerminals = info.terminals;
                    var lines = self.findBy(function () {
                        return this instanceof DataLine && this.lid.indexOf(remoteLineName) === 0 && this.lid.indexOf(remoteTerminals) > 0
                    });
                    if (lines.length === 0) {
                        return
                    } else {
                        $.each(lines, function (i, line) {
                            var localLineName = line.lid;
                            if (foundLines[localLineName] === undefined) {
                                foundLines[localLineName] = {line: line, ext: [info], lost: true}
                            } else {
                                var inExtArray = false;
                                $.each(foundLines[localLineName].ext, function (j, ext) {
                                    if (ext.terminals == info.terminals) {
                                        inExtArray = true
                                    }
                                });
                                if (!inExtArray) {
                                    foundLines[localLineName].ext.push(info)
                                }
                            }
                        })
                    }
                });
                var mistake_line_name = [];
                $.each(foundLines, function (name, line) {
                    if (line.lost && line.ext.length == 1) {
                        mistake_line_name.push(name)
                    }
                });
                $.each(mistake_line_name, function (index, name) {
                    foundLines[name] = null;
                    delete foundLines[name]
                });
                var _lines = [];
                $.each(foundLines, function (name, obj) {
                    var line = obj.line, ext = obj.ext, _line = {};
                    _line.color = line.lc;
                    _line.name = line.lid;
                    _line.dirs = [];
                    $.each(ext, function (i, info) {
                        _line.dirs.push({name: info.terminals, startTime: info.first_time, endTime: info.last_time})
                    });
                    _lines.push(_line)
                });
                var foundStations = self.findBy(function () {
                    return this instanceof DataStation && this.st && this.uid === data.content.uid
                });
                if (foundStations.length === 0) {
                    foundStations = this.findBy(function () {
                        return this instanceof DataStation && this.st && this.sid && data.content.name.indexOf(this.sid) === 0
                    });
                    if (foundStations.length === 0) {
                        return
                    }
                }
                var station = foundStations[0];
                var points = ApiUtil.parseGeo(data.content.geo).points;
                return {station: station, points: points, lines: _lines}
            }
        };

        function Station(station, city) {
            this["name"] = station.lb;
            this["x"] = station.x;
            this["y"] = station.y;
            this["id"] = station.uid;
            this["col"] = station.lc;
            this["line"] = station.ln;
            this["city"] = city
        }

        function Line(name, stations, city) {
            this["name"] = name;
            this["stations"] = stations;
            this["city"] = city
        }

        function Size(width, height) {
            this.width = width || 0;
            this.height = height || 0
        }

        Size.prototype.equals = function (size) {
            return size && this.width == size.width && this.height == size.height
        };

        function Icon(imageUrl, size, opts) {
            this.imageUrl = imageUrl;
            var dpr = this.dpr = 2;
            size.width = size.width / dpr;
            size.height = size.height / dpr;
            this.size = size;
            opts = opts || {};
            if (opts.anchor instanceof Size) {
                opts.anchor.width = opts.anchor.width / dpr;
                opts.anchor.height = opts.anchor.height / dpr
            }
            this.anchor = opts.anchor || new Size(-size.width / 2, -size.height)
        }

        baidu.extend(Icon.prototype, {
            getSVGImg: function () {
                var svgObj = {
                    src: this.imageUrl,
                    width: this.size.width,
                    height: this.size.height,
                    imageOffset: this.anchor
                };
                return svgObj
            }
        });
        var DEFAULT_ICON = new Icon(BMapSub.apiUrlCdn + "/images/hd_red_marker.png", new Size(47, 50), {anchor: new Size(-20, -50)});

        function Marker(station, opts) {
            this.station = station;
            opts = opts || {};
            var icon = DEFAULT_ICON;
            if (opts.icon instanceof Icon) {
                icon = opts.icon
            }
            this.config = {icon: icon}
        }

        baidu.extend(Marker.prototype, {
            init: function (subway) {
                var context = subway.renderer.context;
                var image = this.config.icon.getSVGImg();
                var position = new Size(this.station.x + image.imageOffset.width, this.station.y + image.imageOffset.height);
                this.svgObj = context.image(image.src, image.width, image.height);
                this.svgObj.move(position.width, position.height);
                subway.markers.push(this.svgObj)
            }, remove: function (subway) {
                if (this.svgObj) {
                    this.svgObj.remove()
                }
            }, show: function () {
                if (this.svgObj) {
                    this.svgObj.show()
                }
            }, hide: function () {
                if (this.svgObj) {
                    this.svgObj.hide()
                }
            }
        });

        function InfoWindow(content) {
            this.content = content;
            this._render()
        }

        baidu.lang.inherits(InfoWindow, baidu.lang.Class, "InfoWindow");
        baidu.extend(InfoWindow.prototype, {
            _render: function () {
                this.container = document.createElement("div");
                this.container.id = "sw_info";
                if (typeof this.content === "string") {
                    this.container.innerHTML = this.content
                } else {
                    this.container.appendChild(this.content)
                }
                this.container.style.cssText = "position:absolute;display:none;";
                this.$el = $(this.container)
            }, move: function (offset_x, offset_y) {
                var $el = this.$el;
                var left = parseFloat($el.css("left")), top = parseFloat($el.css("top"));
                $el.css({left: left + offset_x, top: top + offset_y})
            }, setPosition: function (dest_x, dest_y) {
                var $el = this.$el;
                $el.css({left: dest_x - this.width / 2, top: dest_y - this.height})
            }, getPosition: function () {
                var $el = this.$el;
                return {left: parseFloat($el.css("left")), top: parseFloat($el.css("top"))}
            }, getPoint: function () {
                return new Coords(this.station.x, this.station.y)
            }, getContent: function () {
                return this.content
            }, show: function () {
                this.container.style.display = "block"
            }, hide: function () {
                this.container.style.display = "none"
            }, openInStation: function (subway, station) {
                this.station = station;
                var $el = this.$el;
                var me = this;
                setTimeout(function () {
                    me.container.style.display = "block";
                    me.checkSwInfo(subway);
                    subway.renderer.container.append(me.container);
                    $(me.container).on("tap click", function (evt) {
                        evt.stopPropagation()
                    });
                    me.width = parseFloat($el.width());
                    me.height = parseFloat($el.height());
                    $el.css({
                        left: subway.renderer.deviceWidth / 2 - me.width / 2,
                        top: subway.renderer.deviceHeight / 2 - me.height,
                        margin: "-12px 0 0 0;",
                        visibility: ""
                    })
                }, 300)
            }, checkSwInfo: function (subway) {
                var childNodes = subway.renderer.container[0].childNodes;
                for (var i = 0; i < childNodes.length; i++) {
                    var id = childNodes[i].getAttribute("id");
                    if (id === "sw_info") {
                        childNodes[i].remove()
                    }
                }
            }, closeInStation: function () {
                this.$el.remove()
            }
        });

        function DetailInfo(subway, options) {
            var me = this;
            me.subway = subway;
            me.subwayContainer = subway.container;
            options = options || {};
            me.config = {
                onSearchSuccess: options.onSearchSuccess || function () {
                }, onSearchFail: options.onSearchFail || function () {
                }, detailRenderOptions: options.detailRenderOptions || {autoRender: true}
            };
            me.privateInfoData = [];
            me.publicInfoData = []
        }

        baidu.lang.inherits(DetailInfo, baidu.lang.Class, "DetailInfo");
        baidu.extend(DetailInfo.prototype, {
            search: function (station) {
                var me = this;
                this.getDetail(station, function (data) {
                    me.extractData(data);
                    if (me.config.detailRenderOptions.autoRender === true) {
                        me.addDetailBg();
                        me.addDetailInfo(me.privateInfoData)
                    }
                    me.config.onSearchSuccess(me.publicInfoData)
                }, this.config.onSearchFail)
            }, addDetailBg: function (bgColor) {
                var oldBg = document.getElementById("bd-DetailBg");
                if (oldBg) {
                    oldBg.remove()
                }
                this.containerBg = document.createElement("div");
                this.containerBg.id = "bd-DetailBg";
                var bgColorStr = bgColor || "rgba(0, 0, 0, 0.5)";
                this.containerBg.style.cssText = "background:" + bgColorStr;
                this.subway.container.appendChild(this.containerBg);
                $(this.containerBg).on("tap drag dragend click transformend transform transformstart", function (evt) {
                    evt.stopPropagation()
                })
            }, addDetailInfo: function (infoData) {
                var listStr = "";
                for (var i = 0; i < infoData.length; i++) {
                    if (i !== 0 && infoData[i].abb === infoData[i - 1].abb) {
                        listStr += '<div class="detailList"><span class="direction">' + infoData[i].direction + '方向</span><span class="bd-lineTime"><span class="firstTime">' + infoData[i].firstTime + '</span><span class="lastTime">' + infoData[i].lastTime + "</span></span></div>"
                    } else {
                        listStr += '<div class="lines"><span class="linesName" style="background:' + infoData[i].col + '">' + infoData[i].abb + '</span></div><div class="detailList"><span class="direction">' + infoData[i].direction + '方向</span><span class="bd-lineTime"><span class="firstTime">' + infoData[i].firstTime + '</span><span class="lastTime">' + infoData[i].lastTime + "</span></span></div>"
                    }
                }
                var InfoStr = '<div class="detailInfoTop"><span class="detailTitle">' + infoData[0].stationName + '</span><p class="clearDetailInfo" type="clearDetailInfo">×</p></div><div class="detailInfoContent">' + listStr + "</div>";
                var oldInfo = document.getElementById("bd-DetailInfo");
                if (oldInfo) {
                    oldInfo.remove()
                }
                this.containerInfo = document.createElement("div");
                this.containerInfo.id = "bd-DetailInfo";
                this.containerInfo.innerHTML = InfoStr;
                this.subway.container.appendChild(this.containerInfo);
                $(this.containerInfo).on("tap drag dragend click transformend transform transformstart", function (evt) {
                    evt.stopPropagation()
                });
                this.controllerInfoStyle();
                this.onClearBtn()
            }, controllerInfoStyle: function () {
                var top = parseInt(this.containerInfo.offsetHeight / 2, 10);
                this.containerInfo.style.margin = "-" + top + "px 0 0 -35%"
            }, onClearBtn: function () {
                var clearThis = this;
                $(clearThis.containerInfo).on("tap", function (evt) {
                    evt.stopPropagation();
                    evt.gesture && evt.gesture.preventDefault();
                    if (evt.gesture && evt.gesture.touches.length === 1) {
                        var btnType = evt.target.getAttribute("type");
                        if (btnType === "clearDetailInfo") {
                            clearThis.containerInfo.remove();
                            clearThis.containerBg.remove();
                            clearThis.containerInfo = false;
                            clearThis.containerBg = false
                        }
                    }
                })
            }, getDetail: function (station, successCallback, failureCallback) {
                if (!station) {
                    failureCallback && failureCallback();
                    return
                }
                if (typeof(station) === "object") {
                    this.id = station.id
                } else {
                    if (typeof(station) === "string") {
                        var getstation = this.subway.getStation(station);
                        if (getstation === null) {
                            failureCallback && failureCallback();
                            return
                        }
                        this.id = getstation.id
                    }
                }
                var citycode = this.subway.config.currentCity.citycode;
                var url = "//api.map.baidu.com/?qt=inf&newmap=1&it=3&ie=utf-8&f=[1,12,13]&m=sbw&c=" + citycode + "&m=sbw&ccode=" + citycode + "&uid=" + this.id;
                ApiUtil.request(url, function (data) {
                    if (data) {
                        successCallback && successCallback(data.content)
                    } else {
                        failureCallback && failureCallback()
                    }
                })
            }, extractData: function (data) {
                var blInfo = this.uniqeByKeys(data.blinfo, ["uid"]);
                var lineInfo = this.uniqeByKeys(data.ext.line_info, ["uid"]);
                this.recombination(data, blInfo, lineInfo)
            }, recombination: function (data, blInfo, lineInfo) {
                for (var i = 0; i < blInfo.length; i++) {
                    for (var t = 0; t < lineInfo.length; t++) {
                        if (blInfo[i].uid === lineInfo[t].uid) {
                            blInfo[i].firstTime = lineInfo[t].first_time;
                            blInfo[i].lastTime = lineInfo[t].last_time;
                            blInfo[i].abb = lineInfo[t].abb;
                            blInfo[i].col = this.modifyColor("#" + lineInfo[t].clr.slice(2))
                        }
                    }
                }
                var infoDataBak = [];
                for (var i = 0; i < blInfo.length; i++) {
                    if (blInfo[i].lastTime !== "" || blInfo[i].firstTime !== "") {
                        blInfo[i].direction = blInfo[i].name.split("-")[1].replace(")", "");
                        blInfo[i].stationName = data.name;
                        blInfo[i].stationUid = data.uid;
                        infoDataBak.push(blInfo[i]);
                        this.publicInfoData.push({
                            lineName: blInfo[i]["addr"],
                            startStation: blInfo[i]["name"].split("-")[0],
                            startStation: blInfo[i]["name"].split("-")[1],
                            firstTime: blInfo[i]["firstTime"],
                            lastTime: blInfo[i]["lastTime"]
                        })
                    }
                }
                this.privateInfoData = infoDataBak
            }, modifyColor: function (oldColor) {
                var oldColor = oldColor.toUpperCase();
                var allcolor = {
                    "#0066CC": "#4f90cb",
                    "#990066": "#d36fb1",
                    "#FFCC33": "#c27f2a",
                    "#EA9914": "#e5a233",
                    "#B699BD": "#b298ba",
                    "#CC0000": "#e8787a",
                    "#D39188": "#bc8081",
                    "#E7600E": "#b58f68",
                    "#0099FF": "#29adc8",
                    "#006633": "#33cc66",
                    "#5C2A69": "#9966cc",
                    "#00CCCC": "#00cc99",
                    "#ADCB13": "#999933",
                    "#D5353F": "#cc9933",
                    "#C40082": "#cc9999",
                    "#5DB85E": "#669966",
                    "#A02024": "#993366",
                    "#CC3736": "#cc3366"
                };
                if (allcolor[oldColor]) {
                    return allcolor[oldColor]
                } else {
                    return oldColor
                }
            }, obj2key: function (obj, keys) {
                var n = keys.length;
                var key = [];
                while (n--) {
                    key.push(obj[keys[n]])
                }
                return key.join("|")
            }, uniqeByKeys: function (array, keys) {
                var arr = [];
                var hash = {};
                for (var i = 0, j = array.length; i < j; i++) {
                    var k = this.obj2key(array[i], keys);
                    if (!(k in hash)) {
                        hash[k] = true;
                        arr.push(array[i])
                    }
                }
                return arr
            }
        });

        function ZoomControl(opts) {
            var me = this;
            opts = opts || {};
            this._container = null;
            me.config = {anchor: opts.anchor || BMAPSUB_ANCHOR_BOTTOM_RIGHT, offset: opts.offset || new Size(8, 14)}
        }

        baidu.lang.inherits(ZoomControl, baidu.lang.Class, "ZoomControl");
        baidu.object.extend(ZoomControl.prototype, {
            init: function (subway) {
                this._subway = subway;
                var zoomContainer = this._container = document.createElement("div");
                zoomContainer.id = "sw-zoomBtn";
                zoomContainer.style.cssText = "box-shadow:1px 1px 2px rgba(0,0,0,.4);background:rgba(255,255,255,.8);border-radius: 3px; width:36px;position:absolute;z-index:200;";
                var zoomInContainer = this._zoomIn = document.createElement("div");
                zoomInContainer.id = "sw-zoomIn";
                zoomInContainer.style.cssText = "width:36px;height:42px;text-align:center;line-height:42px;font-family:arial;color:#000;";
                zoomInContainer.innerHTML = '<div style="font-size:24px;border-bottom:solid 1px #ccc;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events: none;">+</div>';
                var zoomOutContainer = this._zoomOut = document.createElement("div");
                zoomOutContainer.id = "sw-zoomOut";
                zoomOutContainer.style.cssText = "width:36px;height:42px;text-align:center;line-height:42px;font-family:arial;color:#000;";
                zoomOutContainer.innerHTML = '<div style="font-size:40px;-webkit-user-select:none;-moz-user-select:none;user-select:none;pointer-events:none;">-</div>';
                this._setPosition(zoomContainer);
                zoomContainer.appendChild(zoomInContainer);
                zoomContainer.appendChild(zoomOutContainer);
                subway.container.appendChild(zoomContainer);
                this._bind()
            }, _setPosition: function (zoomContainer) {
                var anchor = this.config.anchor;
                var x = this.config.offset.width;
                var y = this.config.offset.height;
                switch (anchor) {
                    case BMAPSUB_ANCHOR_TOP_LEFT:
                        zoomContainer.style.top = y + "px";
                        zoomContainer.style.left = x + "px";
                        break;
                    case BMAPSUB_ANCHOR_TOP_RIGHT:
                        zoomContainer.style.top = y + "px";
                        zoomContainer.style.right = x + "px";
                        break;
                    case BMAPSUB_ANCHOR_BOTTOM_LEFT:
                        zoomContainer.style.bottom = y + "px";
                        zoomContainer.style.left = x + "px";
                        break;
                    case BMAPSUB_ANCHOR_BOTTOM_RIGHT:
                        zoomContainer.style.bottom = y + "px";
                        zoomContainer.style.right = x + "px";
                        break;
                    default:
                        break
                }
            }, _bind: function () {
                var self = this;
                $(self._zoomOut).on("touchstart", function (evt) {
                    this.style.background = "rgba(94,169,221,.8)";
                    evt.target.handled = true
                });
                $(self._zoomOut).on("tap", function (evt) {
                    evt.stopPropagation();
                    evt.gesture && evt.gesture.preventDefault();
                    if (evt.gesture && evt.gesture.touches.length === 1) {
                        this.style.background = "";
                        listener.trigger("subway", "swZoomOut")
                    }
                });
                $(self._zoomIn).on("touchstart", function (evt) {
                    this.style.background = "rgba(94,169,221,.8)";
                    evt.target.handled = true
                });
                $(self._zoomIn).on("tap", function (evt) {
                    evt.stopPropagation();
                    evt.gesture && evt.gesture.preventDefault();
                    if (evt.gesture && evt.gesture.touches.length === 1) {
                        this.style.background = "";
                        listener.trigger("subway", "swZoomIn")
                    }
                });
                listener.on("subway", "swZoomEnd", this.reset, this)
            }, reset: function (evt, opts) {
                this._subway.renderer.svg.node.firstChild.style.transition = "transitionend";
                opts = opts || {};
                this._zoomOut.style.background = "";
                if (opts.isMinScale) {
                    this._zoomOut.style.background = "rgba(94,169,221,.8)"
                }
                this._zoomIn.style.background = "";
                if (opts.isMaxScale) {
                    this._zoomIn.style.background = "rgba(94,169,221,.8)"
                }
            }, remove: function (subway) {
                subway.controlLayer.removeChild(this._container)
            }
        });
        window.BMAPSUB_ANCHOR_TOP_LEFT = 1;
        window.BMAPSUB_ANCHOR_TOP_RIGHT = 2;
        window.BMAPSUB_ANCHOR_BOTTOM_LEFT = 3;
        window.BMAPSUB_ANCHOR_BOTTOM_RIGHT = 4;

        function CopyrightControl(opts) {
            this["defaultAnchor"] = BMAPSUB_ANCHOR_BOTTOM_LEFT;
            this["defaultOffset"] = new Size(1, 1);
            this._cZIndex = 300;
            this.IMG_URL = BMapSub.apiUrlCdn + "images/copyright_logo_hd.png"
        }

        baidu.lang.inherits(CopyrightControl, baidu.lang.Class, "CopyrightControl");
        baidu.object.extend(CopyrightControl.prototype, {
            init: function (subway) {
                this._subway = subway;
                var div = ApiUtil.create("div");
                var a = ApiUtil.create("a", {
                    title: "到百度地图查看此区域",
                    target: "_blank",
                    href: "http://map.baidu.com/?sr=1"
                });
                a.style.outline = "none";
                div.style.height = "25px";
                div.style.position = "absolute";
                div.style.zIndex = this._cZIndex;
                a.href = "http://map.baidu.com/?sr=1";
                a.innerHTML = "<img style='border:none;width:68px;height:25px' src='" + this.IMG_URL + "' />";
                div.appendChild(a);
                this._setPosition(div);
                subway.container.appendChild(div);
                return
            }, _setPosition: function (container) {
                var anchor = this["defaultAnchor"];
                var x = this["defaultOffset"].width;
                var y = this["defaultOffset"].height;
                switch (anchor) {
                    case BMAPSUB_ANCHOR_TOP_LEFT:
                        container.style.top = y + "px";
                        container.style.left = x + "px";
                        break;
                    case BMAPSUB_ANCHOR_TOP_RIGHT:
                        container.style.top = y + "px";
                        container.style.right = x + "px";
                        break;
                    case BMAPSUB_ANCHOR_BOTTOM_LEFT:
                        container.style.bottom = y + "px";
                        container.style.left = x + "px";
                        break;
                    case BMAPSUB_ANCHOR_BOTTOM_RIGHT:
                        container.style.bottom = y + "px";
                        container.style.right = x + "px";
                        break;
                    default:
                        break
                }
            },
        });
        var DEFALUT_DETAILTEXT = "详情&gt;";
        var DEFALUT_DETAILCLASS = "";
        var DEFALUT_DETAILID = "";

        function DirectionPanel(info, opts) {
            this._cZIndex = 400;
            this.info = info;
            opts = opts || {};
            this.config = {
                detailText: opts.detailText || DEFALUT_DETAILTEXT,
                detailClass: opts.detailClass || DEFALUT_DETAILCLASS,
                detailID: opts.detailID || DEFALUT_DETAILID
            }
        }

        baidu.lang.inherits(DirectionPanel, baidu.lang.Class, "DirectionPanel");
        baidu.object.extend(DirectionPanel.prototype, {
            init: function (subway) {
                var me = this;
                var div = document.createElement("div");
                div.className = "direction_panel";
                div.style.zIndex = this._cZIndex;
                var lines = "";
                lines += this.info.curSLines[0]["sname"];
                lines += " (" + this.info.lines[0] + ")";
                lines += '<span class="arrow">→</span>';
                lines += this.info.curSLines[this.info.curSLines.length - 1]["ename"];
                lines += " (" + this.info.lines[this.info.lines.length - 1] + ")";
                div.innerHTML = '<div class="direction_lines">' + lines + '    </div>    <div class="direction_info">        ' + this.info.totalTimes + '分钟        <span class="dot">|</span>        ' + this.info.totalStops + '站        </div>    <div id="' + this.config.detailID + '"class="direction_detail ' + this.config.detailClass + '">' + this.config.detailText + "</div>";
                subway.container.appendChild(div);
                $(div).on("tap", function (evt) {
                    evt.stopPropagation()
                });
                $(".direction_detail").on("tap", function (evt) {
                    evt.stopPropagation();
                    evt.gesture && evt.gesture.preventDefault();
                    if (evt.gesture && evt.gesture.touches.length === 1) {
                        var detail = new BaseEvent("ondirectioncomplete");
                        detail.totalTime = me.info.totalTimes;
                        detail.totalStops = me.info.totalStops;
                        detail.lines = me.info.lines;
                        subway.dispatchEvent(detail)
                    }
                });
                var close = document.createElement("div");
                close.className = "direction_close";
                close.style.zIndex = this._cZIndex;
                subway.container.appendChild(close);
                $(close).on("tap", function (evt) {
                    evt.stopPropagation();
                    evt.gesture && evt.gesture.preventDefault();
                    if (evt.gesture && evt.gesture.touches.length === 1) {
                        me.info.direction.clearResult()
                    }
                })
            }, remove: function (subway) {
                subway.container.removeChild($(".direction_panel").get(0));
                subway.directionPanel = null;
                $(".direction_detail").off();
                subway.container.removeChild($(".direction_close").get(0));
                $(".direction_close").off()
            }
        });
        var storage = storage;
        var SubwayModel = {
            imageDataEncoded: {
                transfer: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACldJREFUeNq8mmtMVdkVx7eIKOIDn4gvUFuQghjFR6dlfOA79ZFaR/2iNWZMJu2HdtKZpk07TZ0mpp1p06RN+8U2WtExgpgZUzS1GmtQ6wsRH/gCBRF8IiqoKApdvz1n32zO3HPOBbErWV65nLP3/q+19n+ttTddHj16pGpqatQbki6i3ZzPFtHmzhy8paVFjRo1SvXs2VNFA2LXrl2dtegU0TTRyaKpogmi0c7vW0UbRatES0WLRa+I1nV0whcvXqi1a9eqpKSk0CSvI2+JviM6TXSsaFw73q0UPSe6W7RQ9FZHFxEI5OXLl9qFSFRUlIqO1q8QLt8T/aHotx1vfEVaW1vbuqzLVx5LdnSRKPGdL/oX0XLebW5uVt26dQv3XvuAAGLBggUqISFBD9jU1KQKCwvfrq+v39C1a9dsP9BITEyMBm+Ehb169SoESsawfz9M9Meia+S5P2dnZ/8hPT390d69e9WNGzf0/B0GwqKGDRumVUgh7tixYx/V1dW9L4PG2M8AgAUNHDhQDRkyRD8/YMAA1atXrzZAiOmHDx+q27dva4K5c+eOevLkiQbkeBqJl58/KikpWSKx/wP5/5FOCS0sUVlZOWbr1q25Yqm3sLIJGxYWFxenxo0bpzIyMtTw4cNVjx49fMcbMWKEfh65f/++unLlijp//ryqra3VXgIQ4J8/f54pc/5b5v+V6O9fCwggzp07l1FcXFwglk8xIAgRJpw6dapWPNER4T108uTJ6uLFi+rIkSPq1q1bOiQBJZ+x8tineEn0lx0GIoNlFBUV/VPcm4T7EbGUtvzcuXNVcnJyp+QDDJaZmalSUlLU0aNHtRKuVrj9gi0n+tOOABkjWiCTJJlQwhNZWVlq3rx5gSHUEWHMnJwcbSghFfalvck/dPLQx+0Bwiq3OwlOg8BC06dP1xO9acEzffv2VTt37lT37t2zwawXrRDd5n4nymOs9U52Du2JadOm/V9AGIHyV6xYofr166eNaAkb/+uRAPmW6AfmB/YE4RQEwp38OkMggmXLlumQs/LTENHfudfuBoIP/2i+xxPEK3siqObZsWOH2rdvX+DihAH1Zo4UODkJYiGRWu98V3Sp3x7hgSnGwrDG/PnzVffu3X09wcYUmlaG2fCexThtpLq6Wh0/flxVVVWpOXPmRETdEyZM0PmmrKxMmRQg8jPRL0xFbXuEVfzItvLEiRPVyJEjfScBwJkzZ3QpzSSHDh1SJ0+e9Hy+oaFBP3fp0iW1adMmdeLEiTZljZdgHOawns0SnRcutNgb3zRlBxmbZOcn7J/Dhw+HyhA2JYxDlg8nhColCc8D5tmzZ9qb27dvV3fv3vWda9CgQXpcxrDkPVOw2kDeMT+zoLFjx+p6yU8oLaibCCMDfuHChap3795hnwfE06dPQ8AJRQARNps3b1ZSy/l6Z9KkSSo2NtbeK2/LGMk2EHqI2SE3yURk2qCC8uzZs6FFYSne8QMPENRdlgOGyppKd9u2bbqY9KJkQt3ySp/S0tIcG8goJ5Nrb+DGoUOH+gKRUl4nK6yKhViMV0gZefz4sR4/XH9hvHP16lW1ceNGvdfYp25JTU1VtsGFPHIIcQMkzalltKUTExN9mcodJlAj4LGYnzx48MD391gaMLQCFju1EdIBazOsKu3AN8SDIY7Msh8O8obxnIlVwAPEi3IjAYIxCE0qYRbr1RXGx8drpQVwGrMkmXe48UiqO6MGid0wITRRQUIRaC/cdIvmZ6pp+hW/1pYsD6lYpNBPDJQY5dDXQJPcKNDg6yDBvbjfeIUwCwqbxsbGEG1jLLxoFsTiSXiRZHyMZj8nGz4hymGsHgYIiwvqjzXNiVUAzDu4mNaVBXrVYICAIHhn5syZas2aNTrJmYKQMWArCCGSct9FFPFRTkYPPqYIYxXyBSHBImCw8vLyNvRs6irjhfT0dLVu3ToNBECEEhvb9PxkfWK/vWGtv5J/mti7xr0sIJKSgcFgKWNxPskrfFZUVKgtW7aogoKCEOcPHjxYLV68WPXv379NeALO7BXe9coh7jB1EUUTNEM8NBggWC5ciIRtIceMUadOnQq1qzdv3lS5ubn6+Ma0qgDwsKKW0aNHtwllTlmCBOq3RYxzz4xebYeEzS5BQLAwFjVGuHbtWggYSqcXRBo8ZzzrXmS4isJVHTSPHz/+jgFSaj8ciXuJ5wsXLoRAGI+ak0EmZB8EMSCFIxncjOHqBsPOCyGYlkHmqZF3qk0GO2Mfa8JAWCgcnxM+hNP169d1GLDwcGFjgMBufsJ5liEMU3f5CWQAGMKWNcr414TF6s0KoJv7hgapaL1ilY0GUAZkMK/kxSQwW9DCIAYzBu8EVdzUYoYcWIt0kMfZhwZIregpsynhfF4IJ9xHQKGzZ8/Wz7oZxAYStD/oQegYTWmDEbki8Ot/AG68h+Nlf/zLrn5bnbYxNKBkS894xcrkgtWrV+uSggnCUTYnIH5Cd0hFgEcc6+rxvOTy5cs6X1k1XbmQTbG7sfrChJdTVep2NOgcFzCzZs3S77jLbq8wwVu0x6h9ljxlyhTPwpNwArhL8uX7RjcQLlk+szc9bWxQTmGzc3AHIDI1zzMpC/IKLej9wIED2guEJwYgn/j1M4CGaKycQ474u9dx0J+cY0m9EBjFlBiRHNusWrVKH93wLupFvZThS5cu1WRAaPHJPYxX0oR4aLRcv+e08boXkAoHTGgv4BW7hvI9EZfFZ2dna+9gXb/zYUhj+fLluvdZtGhRqAIIR+O0wHjR2uREzydBJ42/FS2za6/du3cHnnK4uzgWF3TQDUPBgBx0eMn+/fv1XnXR+K/Vl5eqvkCou95lfxkrk0nz8/NVXV37LmAjufvzaxkIJ+5MXM/sFP1bpIfY/xX9uT0ZtMcJBxvuTQtkwfHrwYMH3ZehZc49Y0ukQJRzU7TBZFEGpDECTElJyRsDwV7Iy8vTnnBVDmxsbpJr2n1jxU2RJLUYCakPAMLA0Ct7hsw/Y8YMz03aXiH5QrFFRUWapVx7woC41KGrNwaXZujD06dPN0i3t55TPsMcVL4Ujlxscu0QdBTkV/1y0sh5MWFrjlMNYxFO8p0viEAgDMTClyxZ8rF4oko6wE8kNwx2Lip1IuOYk3KGLM+5L5/kCUB7xT/kQdGJV6mdIBHTAtiH6FLZ5sl370v/URtEHNGRMA9WWrly5T8yMzOPFhYWbmhqalrGdyiNEYsj17AwAAKE8r1Pnz6hOMcoJD8KUoBQipuDCzdzSca/LcXgb6Qw/Ss5BO8HHRgGXk8zEPnAsdhVmZjD7hWiPzHXc7Y1WRwWhuXCHe0YA3jQbr1orszxqQC9uWfPHh1uQa1AIBDTZNmVrdNI7ZD/8idF3xH9vugM9eVdeOhPM6wsHIlcFM0DBNUFQCsrK/W8Ef8tCg+HOyyO4ASD/3zu6NdEJ3If4xy/ciju1SExGcnosuh/RPkTDfj8aSQnJu4rP+P1aOI4LS3tddmz3NE852fuLKCxRNFY5+yMFT1w6qQaJ4xem7JNYfo/AQYAqpk3qBLp2UoAAAAASUVORK5CYII=",
                airport: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABdhJREFUeNrsmdlvE1cUh787iyeJs5B9M4EQICwhZYeqVJWoFFVIQNWi0v+o/0jfqr5UpcsLVCIPLCWBVCylUCBkcRJCguN1Zu7cPtipFWOYOLGpp+K8zWhmfD/POb/7O2fEN1cVQQ6NgMd7gP83wDsoL6OCq1e4ChS6hiaCBuApLJ2R7WiC356RdNBFoACkx+EIR3oAltOMTqLrwakBBSGDD7pyh0MdmHql6qEiAFLRFabJyh1uqaG1Fk8FB8Dz6Aijrz7b0Gmrw/MCBKBors0fCqi38AKUQpqg1lxzptZABSWFlMLUsNZqjlkZCaoMAGgaobUrNkRwALIPLdh6NQ0hggPweggQBBlAEaiNTFG4bUkvOBuZAKlwvMKdITgpJLAlGXfNuYwMzj4gPcJm3ghlI2yiaxXJojIDOJJGiy/3sm3LmvMHuxgZyOFVbz9gS7rrOTdIZ30Rc3EyQn2IXx6RdjG06gPIuAy0cG6QRuuN1wx1EDb58SHL6bKZizL8FUphS4Y7ubDvbavPRn8zF4foaiis8v8MwFNIxckIZwepWd/r7AhzcT+7WsnI/xrA9QBO72BkoLS0zhb6wS5suVlp2ngNSIWl89lODnRu5HbL4Oxu6k2uTeGx8bmLsWHBaarh3G76mzfV93y6gwaLy3/jehuUpo0AOJLOes4N0l1fhiQ+3ktDiEt/bVBeSwNQYEv6mzk/WLjXbib2thMO8cOfvEwVdkLlLOKsXA51cGGv/+oLzFza9fFCfU18tZ/eBmxZmvFeL4CncBUfRjg/SJ35tivnE3x3l3vza07ef8G3E0wu+8jr10PsbsUphcFYp+AAp/v5aOvbLptLcGuGu/MspwvdxEqGB4tMxdjTzrEeIo3FnxAO8cVefn3M2Aymvi5p8gdwPSydkYH8qPD1WExyc4Z7C8RtTA3LIL12o006WDoI/pjj0SJ72jgRoSNc5FEhnTO7aAwx+hxP+TMYvpnTaHFmFztbil+wlOLWLBNzxG301WGEECQdULlGWEHSybXFIR3HYzzKg0WGOznWQ0tt4TN1wSfbCYe48hRX+kwDDN9aPNhVfPXLacajTER5lcFYO0cRkHKRoK92CEknvw5NENJxJNenuL/AcCdHeoqowtEeZlcYj/rokn8KGa/dv2IzNsudWZbSGHqRHxCClIP0ciN16ZGwXxu0CEI6SYerz7g7z6FuDnUTNgvTybePM0oah6zYTMwxNstSCl1gGW+8K+XkTY5UJJziPbEmsAxiGS4/4U6U470MdeTHkqIsRWwKgJTL+Cy3oywkCxOmCIAg6eabr4zEfmsq6xo6LKf5+RG3oxzpYbgTQyuHCglB3GVijtFJXqTQKBx6vukNuB5pl3Aop6FK+f+dWYxogp8ecjvKqT4f7HUBmBpjM6QcEIRKMiqKhEMrAAn7X0HyD1MDmFnh+3tYhn/j5r+otIumlfyJLiud2Yg7Jc9Usq4u7fpj+9fAxpy6UiRWAbJvoOTxkljXS6vUbFRB0s5rl1exT96VAnAksUzeCEkvOACuhyPZ0cLwqnc60UukEVvmTGH1DrY8hevRUsvJCIe683U/0MLWJm5Mc2M65/bK+LGjbAC2pMbgaA8nIkWMTUjnVB972hid5N4CrpeTy6oAUAqp2NXKx31vNPrZaKvj8z3sa2d0kqkYpl6GmbuxebXRNc4McKAzJ7gpl/k4t6PUmowM4HpcekiNyf522uuwDHa3sq2J69OMPq8CABS6nut1nr3i8UseLzEXJyPpa0Qq4jZPlllK8fs0PQ30NzPQzNYmDndzbQq56Q8fmwYQKMWVJzxdZiFJykUXGBpCkHCI28RtUi41BkIwvcJkjJsztNfRUVcdNZD1baOTCIEm8lZPF6zYLKVI2GTc3NjU0DDAkUzFmIphaNWQQlkHphcv7pkVkk6RVkarQhktYo8Fz2Nl/pzxTgE0wXQM6VXqG33FAYQg44KgkuuvJMA6m9oqdaPvLN4DvAfYZPwzAFCaEzsLKO5yAAAAAElFTkSuQmCC"
            },
            imageDataLoadedLength: 2,
            cityCode: "",
            cityName: "",
            fileName: "",
            fetch: function (opts, successCallback, failureCallback) {
                var self = this;
                this.imageData = [];
                this.imageDataLoaded = 0;
                for (var key in this.imageDataEncoded) {
                    if (!this.imageData[key]) {
                        this.imageData[key] = new Image();
                        this.imageData[key].onload = function () {
                            self.imageData[key] = this;
                            self.imageDataLoaded++;
                            if (self.imageDataLoaded === self.imageDataLoadedLength) {
                                self.onresourceload = true;
                                listener.trigger("subway", "onresourceload")
                            }
                        };
                        this.imageData[key].src = this.imageDataEncoded[key]
                    }
                }
                if (opts) {
                    this.fileName = opts.keyword;
                    this.cityName = opts.name;
                    this.cityCode = opts.citycode;
                    var fileName = this.fileName;
                    var url = BMapSub.apiUrl + "?qt=subways&c=" + this.cityCode + "&format=json&ak=" + BMAP_AUTHENTIC_KEY + "&v=3.0&from=jsapi";
                    var key;
                    var subway;
                    self._getJSONOffline(key, function (data) {
                        subway = self._parseJSON(data);
                        subway.cityName = self.fileName;
                        subway.cityCode = self.cityCode;
                        subway.imageData = self.imageData;
                        subway.imageDataEncoded = self.imageDataEncoded;
                        self.subway = subway;
                        successCallback && successCallback(subway)
                    }, function () {
                        self._getJSONOnline(url, function (data) {
                            subway = data;
                            subway = self._parseJSON(data);
                            subway.cityName = self.fileName;
                            subway.cityCode = self.cityCode;
                            subway.imageData = self.imageData;
                            subway.imageDataEncoded = self.imageDataEncoded;
                            self.subway = subway;
                            successCallback && successCallback(subway)
                        }, function (error) {
                            failureCallback && failureCallback(cityNode);
                            return
                        })
                    })
                }
            },
            _parseJSON: function (data) {
                var subwayJSONParser = new JSONParser(data);
                return subwayJSONParser.parse()
            },
            findSubwayDataKey: function (cityPy) {
                var strKey = null;
                var strKeyRe = new RegExp("sw_" + cityPy + ".*");
                try {
                    var keys = Object.keys(window.localStorage);
                    for (var i = keys.length - 1; i >= 0; i--) {
                        if (strKeyRe.test(keys[i])) {
                            strKey = keys[i];
                            break
                        }
                    }
                    return strKey
                } catch (ex) {
                    return null
                }
            },
            _getJSONOnline: function (url, successCallback, failureCallback) {
                if (!url) {
                    failureCallback && failureCallback();
                    return
                }
                var self = this;
                ApiUtil.request(url, function (data) {
                    if (data) {
                        data = self._translateJSON(data);
                        successCallback && successCallback(data)
                    } else {
                        failureCallback && failureCallback()
                    }
                })
            },
            _getJSONOffline: function (key, successCallback, failureCallback) {
                failureCallback();
                return;
                if (!key) {
                    failureCallback && failureCallback();
                    return
                }
                storage.selectData(key, {
                    success: function (data) {
                        if (data) {
                            successCallback && successCallback(data)
                        } else {
                            failureCallback && failureCallback()
                        }
                    }, error: function () {
                        failureCallback && failureCallback()
                    }
                })
            },
            _translateJSON: function (obj) {
                var bounds = {
                    left: Number.POSITIVE_INFINITY,
                    right: Number.NEGATIVE_INFINITY,
                    top: Number.POSITIVE_INFINITY,
                    bottom: Number.NEGATIVE_INFINITY
                };
                var stationsShow = {};
                var cityInfo = obj.subways.sw_xmlattr;
                var lineInfo = obj.subways.l;
                var marginRatio = 1.1;
                var transformScale = 1.3;
                var webObj = {};
                webObj.fullName = cityInfo.cid;
                webObj.shortName = cityInfo.c;
                webObj.lines_number = cityInfo.n;
                webObj.lines = [];
                for (var i = 0, k = lineInfo.length; i < k; i++) {
                    if (!lineInfo[i]["l_xmlattr"]["uid"]) {
                        lineInfo.splice(i, 1);
                        k = k - 1;
                        i = i - 1;
                        continue
                    }
                    var line = webObj.lines[i] = {};
                    $.extend(line, lineInfo[i]["l_xmlattr"]);
                    line.stations = [];
                    line.lbx = line.lbx * transformScale;
                    line.lby = line.lby * transformScale + 15 * transformScale;
                    line.lc = "#" + line.lc.slice(2);
                    for (var m = 0, n = lineInfo[i]["p"].length; m < n; m++) {
                        var station = line.stations[m] = {};
                        $.extend(station, lineInfo[i]["p"][m]["p_xmlattr"]);
                        station.lid = lineInfo[i]["l_xmlattr"]["lid"];
                        station.x = station.x * transformScale;
                        station.y = station.y * transformScale;
                        station.rx = station.rx * transformScale + 2 * transformScale;
                        station.ry = station.ry * transformScale + 12 * transformScale;
                        station.dx = parseFloat(station.dx) * transformScale;
                        station.dy = parseFloat(station.dy) * transformScale;
                        station.trs_x = 0;
                        station.trs_y = 0;
                        try {
                            station.trs_x = parseFloat(station.trs_x) * transformScale || 0;
                            station.trs_y = parseFloat(station.trs_y) * transformScale || 0
                        } catch (e) {
                        }
                        station.trs_x -= 8 * transformScale;
                        station.trs_y -= 8 * transformScale;
                        var stationName = station.sid;
                        var slb = station.slb;
                        if (station.x < bounds.left) {
                            bounds.left = station.x
                        }
                        if (station.x > bounds.right) {
                            bounds.right = station.x
                        }
                        if (station.y < bounds.top) {
                            bounds.top = station.y
                        }
                        if (station.y > bounds.bottom) {
                            bounds.bottom = station.y
                        }
                        if (slb === true) {
                            if (stationsShow[stationName] === true) {
                                webObj.lines[i]["stations"][m]["slb"] = false
                            } else {
                                stationsShow[stationName] = true
                            }
                        }
                    }
                }
                var lines = webObj.lines;
                var offset_x = (bounds.left * marginRatio) >> 0;
                var offset_y = (bounds.top * marginRatio) >> 0;
                webObj.stationHash = {};
                webObj.lineHash = {};
                for (var x = 0, y = lines.length; x < y; x++) {
                    var _line = lines[x];
                    _line.lbx -= offset_x;
                    _line.lby -= offset_y;
                    if (_line.lid && !webObj.lineHash[_line.lid]) {
                        webObj.lineHash[_line.lid] = _line
                    }
                    for (i = 0, k = _line.stations.length; i < k; i++) {
                        var _station = _line.stations[i];
                        _station.x -= offset_x;
                        _station.y -= offset_y;
                        _station.lc = _line.lc;
                        if (_station.sid && !webObj.stationHash[_station.sid]) {
                            webObj.stationHash[_station.sid] = _station
                        }
                    }
                }
                webObj.bounds = bounds;
                webObj.width = (Math.abs(bounds.left - bounds.right) * marginRatio) >> 0;
                webObj.height = (Math.abs(bounds.bottom - bounds.top) * marginRatio) >> 0;
                return webObj
            }
        };
        var LINE_TYPE_FIRST = 0;
        var LINE_TYPE_MID = 1;
        var LINE_TYPE_LAST = 2;

        function DirectionModel(subwayData) {
            this.subwayData = subwayData
        }

        $.extend(DirectionModel.prototype, {
            updateSubwayData: function (subwayData) {
                this.subwayData = subwayData
            }, parse: function (lines) {
                var planResult = [];
                for (var i = 0, len = lines.length; i < len; i++) {
                    var line = lines[i];
                    var lineInfo = this.parseLine(line);
                    if (lineInfo) {
                        if (i === 0) {
                            lineInfo.type = LINE_TYPE_FIRST
                        }
                        if (i === len - 1) {
                            lineInfo.type = LINE_TYPE_LAST
                        }
                        if (i > 0 && i < len - 1) {
                            lineInfo.type = LINE_TYPE_MID
                        }
                        planResult.push(lineInfo)
                    }
                }
                var minX = 1000000;
                var minY = 1000000;
                var maxX = -1000000;
                var maxY = -1000000;
                for (var i = 0, len = planResult.length; i < len; i++) {
                    var pLine = planResult[i];
                    var stations = pLine.stations;
                    for (var j = 0, l = stations.length; j < l; j++) {
                        var station = stations[j];
                        var x = station.x;
                        var y = station.y;
                        if (x < minX) {
                            minX = x
                        }
                        if (y < minY) {
                            minY = y
                        }
                        if (x > maxX) {
                            maxX = x
                        }
                        if (y > maxY) {
                            maxY = y
                        }
                    }
                }
                planResult.bounds = [minX, minY, maxX, maxY];
                return planResult
            }, parseLine: function (line) {
                var temp;
                var sid = line.sid;
                temp = sid.split("|");
                var startName = temp[2];
                var eid = line.eid;
                temp = eid.split("|");
                var endName = temp[2];
                var nid = line.nid;
                temp = nid.split("|");
                var nextName = temp[2];
                var lid = line.lid;
                var arrTemp = lid.split("|");
                var LineName = arrTemp[1];
                var reverseLineName = "";
                if (/(\(.+-.+\))$/.test(LineName)) {
                    var strMatch = RegExp.$1;
                    var prefix = LineName.replace(strMatch, "");
                    if (strMatch) {
                        strMatch = strMatch.replace("(", "").replace(")", "");
                        if (strMatch.indexOf("-") > 0) {
                            reverseLineName = prefix + "(" + strMatch.split("-").reverse().join("-") + ")"
                        }
                    }
                }
                var distance = line.distance;
                var subwayData = this.subwayData;
                var lineHash = subwayData.lineHash;
                var objLine = lineHash[LineName] || lineHash[reverseLineName];
                if (!objLine && console) {
                    console.error("请检查: " + LineName + ", 或: " + reverseLineName + " 与xml数据中的是否一致！")
                }
                if (objLine) {
                    var stations = objLine.stations;
                    var startIndex = -1;
                    var nextIndex = -1;
                    for (var i = 0, len = stations.length; i < len; i++) {
                        var station = stations[i];
                        if (station.sid === startName && startIndex === -1) {
                            startIndex = i
                        }
                        if (station.sid === nextName && nextIndex === -1) {
                            nextIndex = i
                        }
                    }
                    var findStations = [];
                    if (!objLine.loop) {
                        if (nextIndex > startIndex) {
                            while (startIndex < stations.length) {
                                var theStation = stations[startIndex];
                                findStations.push(theStation);
                                if (theStation.sid === endName) {
                                    break
                                }
                                startIndex++
                            }
                        } else {
                            while (startIndex >= 0) {
                                var theStation = stations[startIndex];
                                findStations.push(theStation);
                                if (theStation.sid === endName) {
                                    break
                                }
                                startIndex--
                            }
                        }
                    } else {
                        var count = 0;
                        if (nextIndex > startIndex) {
                            while (true) {
                                if (startIndex >= stations.length) {
                                    startIndex = startIndex - stations.length
                                }
                                var theStation = stations[startIndex];
                                findStations.push(theStation);
                                if (theStation.sid === endName) {
                                    break
                                }
                                startIndex++;
                                count++;
                                if (count > stations.length * 2) {
                                    break
                                }
                            }
                        } else {
                            while (true) {
                                if (startIndex < 0) {
                                    startIndex = startIndex + stations.length
                                }
                                var theStation = stations[startIndex];
                                findStations.push(theStation);
                                if (theStation.sid === endName) {
                                    break
                                }
                                startIndex--;
                                count++;
                                if (count > stations.length * 2) {
                                    break
                                }
                            }
                        }
                    }
                }
                return {stations: findStations, lineLabel: objLine.lb, lc: objLine.lc || ""}
            }
        });
        window.BMapSub = BMapSub;
        BMapSub.Subway = Subway;
        BMapSub.Navigation = Navigation;
        BMapSub.Station = Station;
        BMapSub.Line = Line;
        BMapSub.ZoomControl = ZoomControl;
        BMapSub.Size = Size;
        BMapSub.Icon = Icon;
        BMapSub.Marker = Marker;
        BMapSub.InfoWindow = InfoWindow;
        BMapSub.SubwayCitiesList = SubwayCitiesList;
        BMapSub.Direction = Direction;
        BMapSub.DetailInfo = DetailInfo;

        function Subway(container, citycode) {
            var element = baidu.g(container);
            if (!element) {
                return
            }
            var me = this;
            baidu.lang.Class.call(me);
            me.config = {currentCity: me._getCity(citycode), backgroundColor: "#fff"};
            me.subwayData = null;
            me.markers = [];
            me.container = element;
            me._setStyle(element);
            element.unselectable = "on";
            element.innerHTML = "";
            me._initHammer();
            me._getSubwayData(me.config.currentCity);
            me._bind();
            me._addCopyrightControl()
        }

        baidu.lang.inherits(Subway, baidu.lang.Class, "Subway");
        baidu.extend(Subway.prototype, {
            _addCopyrightControl: function () {
                var copyright = new CopyrightControl();
                copyright.init(this)
            }, getCurrentCity: function () {
                return this.config.currentCity
            }, setCity: function (citycode) {
                var me = this;
                this.loaded = false;
                me.config.currentCity = this._getCity(citycode);
                me._getSubwayData(me.config.currentCity)
            }, setCenter: function (station) {
                var me = this;
                if (me.loaded) {
                    if (typeof station === "string") {
                        station = this.getStation(station)
                    }
                    if (station !== null) {
                        me.renderer.center(station.x, station.y)
                    }
                } else {
                    this.addEventListener("onsubwayloaded", function () {
                        if (typeof station === "string") {
                            station = this.getStation(station)
                        }
                        if (station !== null) {
                            me.renderer.center(station.x, station.y)
                        }
                    })
                }
            }, setZoom: function (zoom) {
                if (this.loaded) {
                    this.renderer.zoom(undefined, undefined, zoom)
                } else {
                    this.addEventListener("onsubwayloaded", function () {
                        this.renderer.zoom(undefined, undefined, zoom)
                    })
                }
            }, getZoom: function () {
                return this.renderer.getZoom()
            }, zoomIn: function () {
                this.renderer.zoomIn()
            }, zoomOut: function () {
                this.renderer.zoomOut()
            }, getStation: function (station) {
                station = station || "";
                var lines = this.subwayData.lines;
                for (var i = 0, linesLength = lines.length; i < linesLength; i++) {
                    var stations = lines[i].stations;
                    for (var j = 0, stationLength = stations.length; j < stationLength; j++) {
                        var item = stations[j];
                        if (item.lb === station) {
                            var stationObj = new Station(item, this.getCurrentCity());
                            return stationObj
                        }
                    }
                }
                return null
            }, getLines: function () {
                var lines = this.subwayData.lines;
                var results = [];
                for (var i = 0, linesLength = lines.length; i < linesLength; i++) {
                    var name = lines[i]["lid"];
                    var city = this.getCurrentCity();
                    var stationsData = lines[i].stations;
                    var stations = [];
                    for (var j = 0, stationLength = stationsData.length; j < stationLength; j++) {
                        var item = stationsData[j];
                        if (item.uid != undefined && item.lb != "") {
                            stations.push(new Station(item, this.getCurrentCity()))
                        }
                    }
                    results.push(new Line(name, stations, city))
                }
                return results
            }, addMarker: function (marker) {
                var self = this;
                if (marker instanceof Marker) {
                    if (self.loaded) {
                        if (typeof marker.station === "string") {
                            marker.station = self.getStation(marker.station)
                        }
                        marker.init(self)
                    } else {
                        this.addEventListener("onsubwayloaded", function () {
                            if (typeof marker.station === "string") {
                                marker.station = self.getStation(marker.station)
                            }
                            marker.init(self)
                        })
                    }
                }
            }, removeMarker: function (marker) {
                if (marker instanceof Marker) {
                    marker.remove(this)
                }
            }, clearMarkers: function () {
                for (var i = 0; i < this.markers.length; i++) {
                    this.markers[i].remove(this)
                }
                this.markers = []
            }, openInfoWindow: function (infowindow, station) {
                var self = this;
                if (self.infoWindow) {
                    self.infoWindow.closeInStation()
                }
                if (infowindow instanceof InfoWindow) {
                    if (self.loaded) {
                        if (typeof station === "string") {
                            station = self.getStation(station)
                        }
                        self.renderer.svg.node.firstChild.style.transition = "transform 0.3s";
                        self.renderer.svg.node.firstChild.style.WebkitTransition = "-webkit-transform 0.3s";
                        infowindow.openInStation(self, station);
                        self.setCenter(station);
                        self.infoWindow = infowindow
                    } else {
                        this.addEventListener("onsubwayloaded", function () {
                            if (typeof station === "string") {
                                station = self.getStation(station)
                            }
                            self.renderer.svg.node.firstChild.style.transition = "transform 0.3s";
                            self.renderer.svg.node.firstChild.style.WebkitTransition = "-webkit-transform 0.3s";
                            infowindow.openInStation(self, station);
                            self.setCenter(station);
                            self.infoWindow = infowindow
                        })
                    }
                }
            }, closeInfoWindow: function () {
                if (this.infoWindow) {
                    window.setTimeout(this.infoWindow.closeInStation(), 10);
                    this.infoWindow = null
                }
            }, clearOverlays: function () {
                this.closeInfoWindow();
                this.clearMarkers()
            }, _getCity: function (citycode) {
                for (var i = 0, len = SubwayCitiesList.length; i < len; i++) {
                    if (citycode === SubwayCitiesList[i].citycode) {
                        return SubwayCitiesList[i]
                    }
                }
                return SubwayCitiesList[0]
            }, _render: function (data) {
                this.subwayData = data;
                var renderer = this.renderer = this._getRenderer();
                renderer.initialize(this.container, data);
                var me = this;
                if (SubwayModel.onresourceload) {
                    renderer.plot()
                } else {
                    listener.once("subway", "onresourceload", function (evt) {
                        renderer.plot()
                    })
                }
            }, _subwayloaded: function () {
                this.loaded = true;
                var loaded = new BaseEvent("onsubwayloaded");
                this.dispatchEvent(loaded)
            }, _setStyle: function (el) {
                var style = el.style;
                var cssText = style.cssText;
                if (ApiUtil.getCurrentStyle(el).position != "absolute") {
                    cssText += "position: relative; z-index: 0;"
                }
                var backColor = this.config.backgroundColor;
                cssText += ("overflow:hidden;background-color:" + backColor + ";color:#000;text-align:left-webkit-tap-highlight-color :rgba(0,0,0,0)");
                style.cssText = cssText
            }, _getSubwayData: function (city) {
                var me = this;
                SubwayModel.fetch(city, function (successData) {
                    me._render(successData)
                }, function (errorData) {
                })
            }, _getRenderer: function () {
                var Renderer = new SVGRenderer();
                return Renderer
            }, _isSupportSVG: function () {
                return !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
            }, _initHammer: function () {
                var self = this, container = this.container;
                if (this.hammer) {
                    this.hammer.off("transformstart transform transformend dragstart drag dragend tap");
                    this.renderer.locked = false
                }
                var hammer = this.hammer = new Hammer(container, {
                    prevent_default: true,
                    drag: true,
                    drag_block_vertical: true,
                    drag_block_horizontal: true,
                    drag_min_distance: 10,
                    transform: true,
                    transform_always_block: true,
                    tap: true
                });
                var transform_scale;
                hammer.on("transformstart", function (evt) {
                    self.clearTransition();
                    var subway = self.subway, renderer = self.renderer;
                    renderer.locked = true
                });
                hammer.on("transform", function (evt) {
                    self.clearTransition();
                    var subway = self.subway, renderer = self.renderer;
                    evt.gesture && evt.gesture.preventDefault();
                    transform_scale = renderer.scaleRatio * evt.gesture.scale;
                    renderer._setCSSTransform(0, 0, evt.gesture.scale)
                });
                hammer.on("transformend", function (evt) {
                    self.clearTransition();
                    var subway = self.subway, renderer = self.renderer;
                    renderer.locked = false;
                    evt.gesture && evt.gesture.preventDefault();
                    evt.gesture.stopDetect();
                    renderer._clearCSSTransform();
                    var center = renderer.getPointFromPixel(new Coords(renderer.deviceWidth / 2, renderer.deviceHeight / 2));
                    renderer.zoom(center.x, center.y, transform_scale);
                    listener.trigger("subway", "swZoomEnd", {
                        isMinScale: renderer.isMinScale(),
                        isMaxScale: renderer.isMaxScale()
                    });
                    if (self.infoWindow) {
                        var pixel = renderer.getPixelFromPoint(self.infoWindow.getPoint());
                        self.infoWindow.setPosition(pixel.x, pixel.y)
                    }
                });
                var orig_x, orig_y;
                var preDelta = {x: 0, y: 0};
                hammer.on("dragstart", function (evt) {
                    self.clearTransition();
                    var subway = self.subway, renderer = self.renderer;
                    if (renderer.locked) {
                        return
                    }
                    evt.gesture && evt.gesture.preventDefault();
                    origin = renderer.getOriginPoint();
                    orig_x = origin.x;
                    orig_y = origin.y;
                    preDelta = {x: 0, y: 0}
                });
                hammer.on("drag", function (evt) {
                    self.clearTransition();
                    var subway = self.subway, renderer = self.renderer;
                    if (renderer.locked) {
                        return
                    }
                    evt.gesture && evt.gesture.preventDefault();
                    renderer.move(evt.gesture.deltaX, evt.gesture.deltaY);
                    var dest_x = orig_x + renderer.getPointUnitFromPixelValue(evt.gesture.deltaX);
                    var dest_y = orig_y + renderer.getPointUnitFromPixelValue(evt.gesture.deltaY);
                    renderer.moveTo(dest_x, dest_y);
                    self.infoWindow && self.infoWindow.move(evt.gesture.deltaX - preDelta.x, evt.gesture.deltaY - preDelta.y);
                    preDelta = {x: evt.gesture.deltaX, y: evt.gesture.deltaY}
                });
                hammer.on("dragend", function (evt) {
                    self.clearTransition();
                    var subway = self.subway, renderer = self.renderer;
                    if (renderer.locked) {
                        return
                    }
                    evt.gesture && evt.gesture.preventDefault();
                    if (orig_x == null || orig_y == null) {
                        renderer._clearCSSTransform();
                        return
                    }
                    var position = renderer.isOutOfBounds(orig_x, orig_y, evt.gesture.deltaX, evt.gesture.deltaY);
                    if (position) {
                        evt.gesture.deltaX = position.delta_x;
                        evt.gesture.deltaY = position.delta_y
                    }
                    var dest_x = orig_x + renderer.getPointUnitFromPixelValue(evt.gesture.deltaX);
                    var dest_y = orig_y + renderer.getPointUnitFromPixelValue(evt.gesture.deltaY);
                    self.infoWindow && self.infoWindow.move(evt.gesture.deltaX - preDelta.x, evt.gesture.deltaY - preDelta.y);
                    renderer.moveTo(dest_x, dest_y);
                    orig_x = null;
                    orig_y = null
                });
                hammer.on("tap", function (evt) {
                    if (self.directionPanel) {
                        return
                    }
                    var path = evt.path;
                    if (path && path.length > 0) {
                        for (var i = 0; i < path.length; i++) {
                            if (self.infoWindow && path[i] === self.infoWindow.container) {
                                return
                            }
                        }
                    }
                    var parentNode = evt.target;
                    while (parentNode) {
                        if (self.infoWindow && parentNode === self.infoWindow.container) {
                            return
                        }
                        parentNode = parentNode.parentNode
                    }
                    var subway = self.subwayData, renderer = self.renderer;
                    evt.gesture && evt.gesture.preventDefault();
                    if (evt.gesture && evt.gesture.touches.length === 1) {
                        var clientRect = container.getBoundingClientRect(), touch = evt.gesture.touches[0],
                            pixel = new Coords(touch.clientX - clientRect.left, touch.clientY - clientRect.top);
                        self.hideInfoWindow(evt);
                        var point = renderer.getPointFromPixel(pixel);
                        var station = subway.findNearestStation(point, "pixel", renderer.tolerance || 16);
                        if (station && station.uid) {
                            var tap = new BaseEvent("ontap");
                            var stationObj = new Station(station, self.getCurrentCity());
                            tap.station = stationObj;
                            self.dispatchEvent(tap)
                        }
                    }
                })
            }, hideInfoWindow: function (evt) {
                var btnId = evt.target.getAttribute("id");
                if (btnId === "sw_svg" || btnId.indexOf("svgjsTspan") >= 0) {
                    if (this.infoWindow && this.infoWindow.container.style.display === "block") {
                        this.infoWindow.hide()
                    }
                }
            }, _renderControlLayer: function () {
                this.controlLayer = $('<div id="sw_control" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index:200; background: none;" />').get(0);
                this.container.append(this.controlLayer)
            }, _renderOverlayLayer: function () {
                var self = this;
                if (self.loaded) {
                    self.overlayLayer = $('<div id="sw_overlay" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index:100; background: none;" />').get(0);
                    $("#sw_renderer").append(self.overlayLayer)
                } else {
                    this.addEventListener("onsubwayloaded", function () {
                        self.overlayLayer = $('<div id="sw_overlay" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index:100; background: none;" />').get(0);
                        $("#sw_renderer").append(self.overlayLayer)
                    })
                }
            }, _overlayLayerMove: function () {
            }, addControl: function (control) {
                if (control instanceof ZoomControl) {
                    control.init(this)
                }
            }, removeControl: function (control) {
                if (control instanceof ZoomControl) {
                    control.remove(this)
                }
            }, addDirectionPanel: function (panel) {
                panel.init(this)
            }, removeDirectionPanel: function (panel) {
                panel = panel || this.directionPanel;
                panel.remove(this)
            }, _bind: function () {
                listener.on("subway", "swZoomIn", this.zoomIn, this);
                listener.on("subway", "swZoomOut", this.zoomOut, this);
                listener.on("subway", "drawComplete", this._subwayloaded, this)
            }, zoomIn: function () {
                this.clearTransition();
                var renderer = this.renderer, infoWindow = this.infoWindow, pixel;
                if (!renderer.isMaxScale()) {
                    renderer.zoomIn();
                    if (infoWindow) {
                        pixel = renderer.getPixelFromPoint(infoWindow.getPoint());
                        infoWindow.setPosition(pixel.x, pixel.y)
                    }
                }
                listener.trigger("subway", "swZoomEnd", {
                    isMinScale: renderer.isMinScale(),
                    isMaxScale: renderer.isMaxScale()
                })
            }, zoomOut: function () {
                this.clearTransition();
                var renderer = this.renderer, infoWindow = this.infoWindow, pixel;
                if (!renderer.isMinScale()) {
                    renderer.zoomOut();
                    if (infoWindow) {
                        pixel = renderer.getPixelFromPoint(infoWindow.getPoint());
                        infoWindow.setPosition(pixel.x, pixel.y)
                    }
                }
                listener.trigger("subway", "swZoomEnd", {
                    isMinScale: renderer.isMinScale(),
                    isMaxScale: renderer.isMaxScale()
                })
            }, clearTransition: function () {
                this.renderer.svg.node.firstChild.style.transition = ""
            }, getDetail: function (station, successCallback) {
                this.DetailInfo = new DetailInfo(this, station, {hideInfo: true});
                this.DetailInfo.getDetail(station, function (data) {
                    if (data) {
                        successCallback && successCallback(data)
                    }
                })
            }
        });

        function Navigation(subway, options) {
            var me = this;
            me.subway = subway;
            me.options = options || {};
            me.startIcon = options.startIcon || null;
            me.endIcon = options.endIcon || null;
            me.options.direction = !(options.direction === false);
            me.options.addMarkers = !(options.addMarkers === false);
            me.options.detail = !(options.detail === false);
            me.options.drctOptions = options.drctOptions || {};
            me.currentStation = "";
            me.endMarkers = [];
            me.startMarkers = [];
            me.pointCache = {start: "", end: ""};
            me.subway.addEventListener("tap", function (e) {
                me.currentStation = e.station;
                var tap = new BaseEvent("stationtap");
                tap.station = e.station;
                me.dispatchEvent(tap);
                if (e.station) {
                    me.infoWindow = new InfoWindow('<div id="bd-subwayInfo"><div id="bd-subwayTitle"><p id="bd-stationName">' + e.station.name + '</p><p type="details" id="bd-title-details">详情&gt;&gt;</p></div><div id="bd-subwayContent"><p type="start" id="bd-subwayStart">设为起点</p><p type="end" id="bd-subwayEnd">设为终点</p></div></div>');
                    $(me.infoWindow.container).on("tap", function (evt) {
                        evt.stopPropagation();
                        evt.gesture && evt.gesture.preventDefault();
                        if (evt.gesture && evt.gesture.touches.length === 1) {
                            var btnType = evt.target.getAttribute("type");
                            if (btnType === "start") {
                                var starttap = new BaseEvent("starttap");
                                starttap.station = e.station;
                                me.dispatchEvent(starttap);
                                if (me.options.addMarkers) {
                                    me.setPoint(btnType)
                                }
                            }
                            if (btnType === "end") {
                                var endtap = new BaseEvent("endtap");
                                endtap.station = e.station;
                                me.dispatchEvent(endtap);
                                if (me.options.addMarkers) {
                                    me.setPoint(btnType)
                                }
                            }
                            if (btnType === "details") {
                                var detailtap = new BaseEvent("detailtap");
                                detailtap.station = e.station;
                                me.dispatchEvent(detailtap);
                                if (me.options.detail) {
                                    me.subway.DetailInfo = new DetailInfo(me.subway);
                                    me.subway.DetailInfo.search(me.currentStation.name)
                                }
                            }
                        }
                    });
                    me.subway.openInfoWindow(me.infoWindow, e.station)
                }
            })
        }

        baidu.lang.inherits(Navigation, baidu.lang.Class, "Navigation");
        baidu.extend(Navigation.prototype, {
            _ClearMarkers: function (type) {
                if (type === "start" && this.startMarkers.length > 0) {
                    for (var i = 0; i < this.startMarkers.length; i++) {
                        this.subway.removeMarker(this.startMarkers[i])
                    }
                    this.startMarkers.length = 0
                } else {
                    if (type === "end" && this.endMarkers.length > 0) {
                        for (var i = 0; i < this.endMarkers.length; i++) {
                            this.subway.removeMarker(this.endMarkers[i])
                        }
                        this.endMarkers.length = 0
                    }
                }
            }, setPoint: function (type, station) {
                this.infoWindow.hide();
                this.pointCache[type] = station || this.currentStation;
                this._ClearMarkers(type);
                if (type === "start") {
                    if (this.endMarkers.length > 0 && this.currentStation.name === this.endMarkers[0].station.name) {
                        this._ClearMarkers("end")
                    }
                    var marker = new Marker(this.currentStation, {icon: this.startIcon || new Icon("//api.map.baidu.com/images/subway/start.png", new Size(50, 80))});
                    this.startMarkers.push(marker);
                    this.subway.addMarker(marker)
                } else {
                    if (type === "end") {
                        if (this.startMarkers.length > 0 && this.currentStation.name === this.startMarkers[0].station.name) {
                            this._ClearMarkers("start")
                        }
                        var marker = new Marker(this.currentStation, {icon: this.endIcon || new Icon("//api.map.baidu.com/images/subway/end.png", new Size(50, 80))});
                        this.endMarkers.push(marker);
                        this.subway.addMarker(marker)
                    }
                }
                if (this.endMarkers.length > 0 && this.startMarkers.length > 0) {
                    this.direction()
                }
                return false
            }, direction: function () {
                if (this.options.direction && this.pointCache.start && this.pointCache.end) {
                    var drct = new Direction(this.subway, this.options.drctOptions);
                    drct.search(this.pointCache.start, this.pointCache.end);
                    this.pointCache = {start: "", end: ""};
                    this._ClearMarkers("start");
                    this._ClearMarkers("end")
                }
            }
        });

        function Direction(subway, opts) {
            this.subway = subway;
            opts = opts || {};
            this.config = {drctRenderOptions: opts.drctRenderOptions || {}}
        }

        baidu.lang.inherits(Direction, baidu.lang.Class, "Direction");
        baidu.extend(Direction.prototype, {
            search: function (start, end) {
                var cc = this.subway.getCurrentCity().citycode;
                var me = this;
                var sy = 0;
                var bCenter = true;
                var noAnimation = false;
                var sn = "";
                var en = "";
                if (typeof(start) === "string") {
                    start = this.subway.getStation(start)
                }
                if (typeof(end) === "string") {
                    end = this.subway.getStation(end)
                }
                if (start instanceof Station && start.id) {
                    sn = "0$$" + start.id + "$$" + start.mcX + "," + start.mcY + "$$" + encodeURIComponent(start.name) + "$$"
                }
                if (end instanceof Station && end.id) {
                    en = "0$$" + end.id + "$$" + end.mcX + "," + end.mcY + "$$" + encodeURIComponent(end.name) + "$$"
                }
                var url = BMapSub.apiUrl + "?qt=bt2&newmap=1&ie=utf-8&f=[1,12,13,14]&c=" + cc + "&sn=" + sn + "&en=" + en + "&m=sbw&ccode=" + cc + "&from=dtzt&sy=" + sy + "&t=" + new Date().getTime();
                this.reqTransData(url, bCenter, noAnimation)
            }, clearResult: function () {
                this.subway.removeDirectionPanel();
                this.subway.renderer.removeDirection()
            }, reqTransData: function (url, bCenter, noAnimation) {
                var me = this;
                var reqOnsuccess = function (json) {
                    if (!json || !json.content || json.content.length < 1 || !json.result || json.result.type !== 14 || json.result.error !== 0) {
                        return
                    }
                    me.json = json;
                    me.renderPanel();
                    me.renderSVG(bCenter)
                };
                ApiUtil.request(url, reqOnsuccess)
            }, renderPanel: function () {
                var json = this.json;
                if (!json || !json.content) {
                    return
                }
                var finalIndex = this.getSchemeIndex(json.content);
                var c = json.content[finalIndex];
                var curSLines = [];
                var totalStops = 0;
                var sbwStops = c.stops[0];
                var clines = c.lines[0];
                var exts = c.exts[0];
                var totalTimes = 0;
                var linesName = [];
                if (exts && exts.time) {
                    totalTimes = this.formatSectoMin(exts.time)
                }
                var lname = "";
                var walk = null;
                for (var i = 0, l = sbwStops.length; i < l; i++) {
                    if (i < l - 1 && clines[i]) {
                        curSLines[i] = {luid: clines[i].uid, lname: clines[i].name};
                        if (i === l - 2) {
                        }
                        lname = this.setBranches(clines[i]);
                        linesName.push(lname.replace(/\(.+\)$/, ""))
                    }
                    if (i > 0 && i <= l - 1) {
                        if (clines && clines[i - 1] && curSLines[i - 1]) {
                            curSLines[i - 1].suid = sbwStops[i - 1].getOn.uid;
                            curSLines[i - 1].sname = sbwStops[i - 1].getOn.name;
                            curSLines[i - 1].euid = sbwStops[i].getOff.uid;
                            curSLines[i - 1].ename = sbwStops[i].getOff.name;
                            if (i < l - 1) {
                                walk = sbwStops[i].walk;
                                if (walk) {
                                    if (typeof walk.time === "number") {
                                        curSLines[i - 1].wtime = parseFloat(walk.time / 60) >= 1 ? parseInt(walk.time / 60, 10) : 2
                                    } else {
                                        curSLines[i - 1].wtime = 2
                                    }
                                    if (typeof walk.distance === "number" && walk.distance > 10) {
                                        curSLines[i - 1].distance = walk.distance
                                    } else {
                                        curSLines[i - 1].distance = curSLines[i - 1].wtime * 90
                                    }
                                }
                            }
                        }
                    }
                    if (i < l - 1 && clines) {
                        totalStops += clines[i].station_num
                    }
                }
                this.curSLines = curSLines;
                this.subway.directionPanel = new DirectionPanel({
                    direction: this,
                    lines: linesName,
                    totalStops: totalStops,
                    totalTimes: totalTimes,
                    curSLines: curSLines
                }, this.config.drctRenderOptions);
                this.subway.addDirectionPanel(this.subway.directionPanel)
            }, renderSVG: function (bCenter) {
                this.queryLine(bCenter)
            }, queryLine: function (bCenter) {
                var me = this;
                var curSLines = this.curSLines;
                var cc = this.subway.getCurrentCity().citycode;
                var reqUrl = "";

                function reqBsl(url, callback) {
                    ApiUtil.request(url, callback)
                }

                Thenjs.each(curSLines, function (cont, cline, index, curSLines) {
                    reqUrl = BMapSub.apiUrl + "?qt=bsl&newmap=1&bsltp=1&uid=" + cline.luid + "&c=" + cc + "&ie=utf-8&suid=" + cline.suid + "&euid=" + cline.euid + "&ccode=" + cc + "&t=" + (new Date()).getTime();
                    reqBsl(reqUrl, function (json) {
                        if (!json || !json.content || !json.content[0]) {
                            return
                        }
                        me.setSvgRes(json.content[0], curSLines, index, bCenter)
                    })
                })
            }, setSvgRes: function (c, curSLines, index, bCenter) {
                if (curSLines[index]) {
                    curSLines[index].stations = [];
                    var setToSvg = true;
                    var j = 0;
                    var etime = 0;
                    var ctime = 0;
                    var sta = {};
                    var sname;
                    var ename;
                    for (j = 0, l = c.stations.length; j < l; j++) {
                        sta = {name: c.stations[j].name};
                        if (j === 0) {
                        } else {
                        }
                        curSLines[index].stations.push(sta)
                    }
                }
                if (c.stations[0]) {
                    curSLines[index].nname = c.stations[0].name
                } else {
                    curSLines[index].nname = curSLines[index].ename
                }
                var ll = curSLines.length;
                for (j = 0; j < ll; j++) {
                    if (!curSLines[j].nname) {
                        setToSvg = false;
                        break
                    }
                }
                if (setToSvg) {
                    this._setResult4Svg(bCenter)
                }
            }, _setResult4Svg: function (bCenter) {
                var res = this.getResForSvg();
                var opts = {center: bCenter};
                this.subway.renderer.searchPlanCbkData(res, opts)
            }, getSchemeIndex: function (c) {
                var index = -1;
                var i, j, l, ll, stops;
                for (i = 0, l = c.length; i < l; i++) {
                    if (c[i].stops && c[i].stops[0]) {
                        stops = c[i].stops[0];
                        index = i;
                        for (j = 1, ll = stops.length - 1; j < ll; j++) {
                            if (stops[j] && stops[j].getOff.name != stops[j].getOn.name) {
                                index = -1;
                                break
                            }
                        }
                        if (index != -1) {
                            break
                        }
                    }
                }
                return index
            }, formatSectoMin: function (seconds) {
                if (!seconds || isNaN(seconds)) {
                    return ""
                }
                var m = 60;
                var minutes = Math.ceil(seconds / m);
                var a = minutes % 10;
                var b = parseInt(minutes / 10, 10);
                minutes = a !== 0 ? (a > 5 ? (++b * 10) : b ? (b * 10) : 5) : minutes;
                return minutes
            }, setBranches: function (cl) {
                var cname = this.subway.getCurrentCity().name;
                var sLname = cl.name;
                var lname = cl.name.replace("地铁", "").replace(/\(.+\)$/, "");
                if (cname.indexOf("上海") > -1) {
                    if (sLname.indexOf("航中路") > -1) {
                        lname = "10号线(航中路-新江湾城)"
                    } else {
                        if (sLname.indexOf("虹桥火车站") > -1) {
                            lname = "10号线(新江湾城-虹桥火车站）"
                        } else {
                            if (sLname.indexOf("嘉定北") > -1) {
                                lname = "11号线(嘉定北-康新公路)"
                            } else {
                                if (sLname.indexOf("花桥") > -1) {
                                    lname = "11号线(花桥-三林)"
                                }
                            }
                        }
                    }
                } else {
                    if (cname.indexOf("香港") > -1) {
                        if (sLname.indexOf("东铁") > -1 && sLname.indexOf("罗湖") > -1) {
                            lname = "东铁线(红磡-罗湖)"
                        } else {
                            if (sLname.indexOf("落马洲") > -1) {
                                lname = "东铁线(红磡-落马洲)"
                            } else {
                                if (sLname.indexOf("康城") > -1) {
                                    lname = "将军澳线(北角-康城)"
                                } else {
                                    if (sLname.indexOf("宝琳") > -1) {
                                        lname = "将军澳线(北角-宝琳)"
                                    }
                                }
                            }
                        }
                    } else {
                        if (cname.indexOf("杭州") > -1) {
                            if (sLname.indexOf("临平") > -1) {
                                lname = "1号线(临平-湘湖)"
                            } else {
                                if (sLname.indexOf("文泽路") > -1) {
                                    lname = "1号线(文泽路-湘湖)"
                                }
                            }
                        } else {
                            if (cname.indexOf("北京") > -1) {
                                if (sLname.indexOf("14号线") > -1) {
                                    if (sLname.indexOf("善各庄") > -1) {
                                        lname = "14号线(北京南站-善各庄)"
                                    } else {
                                        if (sLname.indexOf("张郭庄") > -1) {
                                            lname = "14号线(张郭庄-西局)"
                                        }
                                    }
                                }
                            } else {
                                if (cname.indexOf("台北") > -1) {
                                    if (sLname.indexOf("中和新芦线") > -1) {
                                        if (sLname.indexOf("芦洲-南势角") > -1) {
                                            lname = "中和新芦线(芦洲-南势角)"
                                        } else {
                                            if (sLname.indexOf("南势角-回龙") > -1) {
                                                lname = "中和新芦线(回龙-南势角)"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return lname
            }, getLid: function (txt) {
                var curLid = "";
                var lname = txt.replace("地铁", "").replace(/\(.+\)$/, "");
                if (lname.match(/\d+/) && lname.match(/\d+/).length > 0) {
                    curLid = lname.match(/\d+/)[0]
                }
                var ccode = parseInt(this.subway.getCurrentCity().citycode);
                switch (ccode) {
                    case parseInt(AID["北京"]):
                        if (lname.indexOf("八通") > -1) {
                            curLid = "8t"
                        } else {
                            if (lname.indexOf("亦庄") > -1) {
                                curLid = "yz"
                            } else {
                                if (lname.indexOf("昌平") > -1) {
                                    curLid = "cp"
                                } else {
                                    if (lname.indexOf("房山") > -1) {
                                        curLid = "fs"
                                    } else {
                                        if (lname.indexOf("机场") > -1) {
                                            curLid = "air"
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case parseInt(AID["上海"]):
                        if (lname.indexOf("磁悬浮") > -1) {
                            curLid = "cxf"
                        }
                        break;
                    case parseInt(AID["广州"]):
                        if (lname.indexOf("支线") > -1 || lname.indexOf("北延段") > -1) {
                            curLid = "3zx"
                        } else {
                            if (lname.indexOf("广佛") > -1) {
                                curLid = "gf"
                            } else {
                                if (lname.indexOf("apm") > -1) {
                                    curLid = "apm"
                                }
                            }
                        }
                        break;
                    case parseInt(AID["深圳"]):
                        if (lname.indexOf("罗宝") > -1) {
                            curLid = "lb"
                        } else {
                            if (lname.indexOf("蛇口") > -1) {
                                curLid = "sk"
                            } else {
                                if (lname.indexOf("龙岗") > -1) {
                                    curLid = "lg"
                                } else {
                                    if (lname.indexOf("龙华") > -1) {
                                        curLid = "lh"
                                    } else {
                                        if (lname.indexOf("环中") > -1) {
                                            curLid = "hz"
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case parseInt(AID["香港特别行政区"]):
                        if (lname.indexOf("荃湾") > -1) {
                            curLid = "qw"
                        } else {
                            if (lname.indexOf("港岛") > -1) {
                                curLid = "gd"
                            } else {
                                if (lname.indexOf("将军澳") > -1) {
                                    curLid = "jja"
                                } else {
                                    if (lname.indexOf("迪士尼") > -1) {
                                        curLid = "dsn"
                                    } else {
                                        if (lname.indexOf("机场") > -1) {
                                            curLid = "jc"
                                        } else {
                                            if (lname.indexOf("东铁") > -1) {
                                                curLid = "dt"
                                            } else {
                                                if (lname.indexOf("西铁") > -1) {
                                                    curLid = "xt"
                                                } else {
                                                    if (lname.indexOf("马鞍山") > -1) {
                                                        curLid = "mas"
                                                    } else {
                                                        if (lname.indexOf("观塘") > -1) {
                                                            curLid = "gt"
                                                        } else {
                                                            if (lname.indexOf("东涌") > -1) {
                                                                curLid = "dy"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case parseInt(AID["南京"]):
                        if (lname.indexOf("机场线") > -1 || (lname.match(/s1/i) && lname.match(/s1/i).length > 0)) {
                            curLid = "jch"
                        } else {
                            if (lname.match(/s8/i) && lname.match(/s8/i).length > 0) {
                                curLid = "s8"
                            }
                        }
                        break;
                    case parseInt(AID["大连"]):
                        if (lname.indexOf("九里线") > -1) {
                            curLid = "kg"
                        } else {
                            if (lname.indexOf("保税区线") > -1) {
                                curLid = "bsq"
                            } else {
                                if (lname.indexOf("九里支线") > -1) {
                                    curLid = "9zx"
                                }
                            }
                        }
                        break;
                    case parseInt(AID["佛山"]):
                        if (lname.indexOf("广佛") > -1) {
                            curLid = "gf"
                        }
                        break;
                    case parseInt(AID["重庆"]):
                        if (lname.indexOf("国博") > -1) {
                            curLid = "gb"
                        }
                        break;
                    case parseInt(AID["台北"]):
                        if (lname.indexOf("淡水信义线") > -1) {
                            curLid = "danshui"
                        } else {
                            if (lname.indexOf("中和新芦线") > -1) {
                                curLid = "zhonghe"
                            } else {
                                if (lname.indexOf("板南线") > -1) {
                                    curLid = "bannan"
                                } else {
                                    if (lname.indexOf("松山新店线") > -1) {
                                        curLid = "songshan"
                                    } else {
                                        if (lname.indexOf("文湖线") > -1) {
                                            curLid = "wenhu"
                                        } else {
                                            if (lname.indexOf("猫空缆车") > -1) {
                                                curLid = "maokong"
                                            } else {
                                                if (lname.indexOf("小碧潭线") > -1) {
                                                    curLid = "xiaobitan"
                                                } else {
                                                    if (lname.indexOf("新北投线") > -1) {
                                                        curLid = "xinbeitou"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case parseInt(AID["高雄"]):
                        if (lname.indexOf("红线") > -1) {
                            curLid = "hx"
                        } else {
                            if (lname.indexOf("橘线") > -1) {
                                curLid = "jx"
                            }
                        }
                        break;
                    default:
                        break
                }
                return curLid
            }, getResForSvg: function () {
                var r = [];
                var i = 0;
                var curSLines = this.curSLines;
                var lineName, scname;
                var price = 0;
                for (i = 0, l = curSLines.length; i < l; i++) {
                    r[i] = {};
                    lineName = curSLines[i].lname;
                    scname = this.subway.getCurrentCity().name;
                    r[i].lid = scname + "|" + lineName.replace(/\(.+-.+\)$/, "");
                    if (scname.indexOf("上海") > -1) {
                        if (lineName.indexOf("10") > -1) {
                            r[i].lid = scname + "|" + lineName
                        } else {
                            if (lineName.indexOf("11") > -1) {
                                r[i].lid = scname + "|" + lineName
                            }
                        }
                    } else {
                        if (scname.indexOf("香港") > -1) {
                            if (lineName.indexOf("东铁") > -1) {
                                r[i].lid = scname + "|" + lineName
                            } else {
                                if (lineName.indexOf("将军") > -1) {
                                    r[i].lid = scname + "|" + lineName
                                }
                            }
                        } else {
                            if (scname.indexOf("杭州") > -1) {
                                if (lineName.indexOf("1号线") > -1) {
                                    r[i].lid = scname + "|" + lineName
                                }
                            } else {
                                if (scname.indexOf("北京") > -1) {
                                    if (lineName.indexOf("14号线") > -1) {
                                        r[i].lid = scname + "|" + lineName
                                    }
                                } else {
                                    if (scname.indexOf("台北") > -1) {
                                        if (lineName.indexOf("中和新芦线") > -1) {
                                            r[i].lid = scname + "|" + lineName
                                        }
                                    } else {
                                        if (scname.indexOf("深圳") > -1) {
                                            if (lineName.indexOf("罗宝") > -1 || lineName.indexOf("蛇口") > -1 || lineName.indexOf("龙岗") > -1 || lineName.indexOf("龙华") > -1 || lineName.indexOf("环中") > -1) {
                                                lineName = lineName.replace(/\)\(.*-.*\)/i, ")");
                                                r[i].lid = scname + "|" + lineName
                                            }
                                        } else {
                                            if (scname.indexOf("重庆") > -1) {
                                                if (lineName.indexOf("轨道交通3号线") > -1) {
                                                    lineName = lineName.replace(/\)\(.*-.*\)/i, ")");
                                                    r[i].lid = scname + "|" + lineName
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    r[i].sid = r[i].lid + "|" + curSLines[i].sname;
                    r[i].eid = r[i].lid + "|" + curSLines[i].ename;
                    if (i < l - 1) {
                        r[i].time = curSLines[i].wtime
                    } else {
                        r[i].time = curSLines[i].ttime
                    }
                    r[i].distance = curSLines[i].distance;
                    r[i].nid = r[i].lid + "|" + curSLines[i].nname
                }
                return r
            }
        });
        BMapSub.verify()
    })();
})();