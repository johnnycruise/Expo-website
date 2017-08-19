/*! pace 0.4.7 */
(function() {
    var a,
        b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        w,
        x,
        y,
        z,
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I = [].slice,
        J = {}.hasOwnProperty,
        K = function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b)
                J.call(b, d) && (a[d] = b[d]);
            return c.prototype = b.prototype,
            a.prototype = new c,
            a.__super__ = b.prototype,
            a
        };
    p = {
        catchupTime: 500,
        initialRate: .03,
        minTime: 500,
        ghostTime: 250,
        maxProgressPerFrame: 10,
        easeFactor: 1.25,
        startOnPageLoad: !0,
        restartOnPushState: !0,
        restartOnBackboneRoute: !0,
        elements: {
            checkInterval: 100,
            selectors: ["body"]
        },
        eventLag: {
            minSamples: 10
        },
        target: "body"
    },
    w = function() {
        var a;
        return null != (a = "undefined" != typeof performance && null !== performance
            ? "function" == typeof performance.now
                ? performance.now()
                : void 0
            : void 0)
            ? a :+ new Date
    },
    y = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
    o = window.cancelAnimationFrame || window.mozCancelAnimationFrame,
    null == y && (y = function(a) {
        return setTimeout(a, 50)
    },
    o = function(a) {
        return clearTimeout(a)
    }),
    A = function(a) {
        var b,
            c;
        return b = w(),
        c = function() {
            var d;
            return d = w() - b,
            b = w(),
            a(d, function() {
                return y(c)
            })
        },
        c()
    },
    z = function() {
        var a,
            b,
            c;
        return c = arguments[0],
        b = arguments[1],
        a = 3 <= arguments.length
            ? I.call(arguments, 2)
            : [],
        "function" == typeof c[b]
            ? c[b].apply(c, a)
            : c[b]
    },
    q = function() {
        var a,
            b,
            c,
            d,
            e,
            f,
            g;
        for (b = arguments[0], d = 2 <= arguments.length
            ? I.call(arguments, 1)
            : [], f = 0, g = d.length; g > f; f++)
            if (c = d[f])
                for (a in c)
                    J.call(c, a) && (e = c[a], null != b[a] && "object" == typeof b[a] && null != e && "object" == typeof e
                        ? q(b[a], e)
                        : b[a] = e);
        return b
    },
    s = function(a, b) {
        var c,
            d,
            e;
        if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
            if (c = e.getAttribute("data-pace-" + a), !b)
                return c;
            try {
                return JSON.parse(c)
            } catch (f) {
                return d = f,
                "undefined" != typeof console && null !== console
                    ? console.error("Error parsing inline pace options", d)
                    : void 0
            }
        }
    },
    null == window.Pace && (window.Pace = {}),
    x = Pace.options = q(p, window.paceOptions, s()),
    b = function() {
        function a() {
            this.progress = 0
        }
        return a.prototype.getElement = function() {
            var a;
            return null == this.el && (this.el = document.createElement("div"), this.el.className = "pace pace-active", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', a = document.querySelector(x.target), null != a.firstChild
                ? a.insertBefore(this.el, a.firstChild)
                : a.appendChild(this.el)),
            this.el
        },
        a.prototype.finish = function() {
            var a;
            return a = this.getElement(),
            a.className = a.className.replace("pace-active", ""),
            a.className += " pace-inactive"
        },
        a.prototype.update = function(a) {
            return this.progress = a,
            this.render()
        },
        a.prototype.destroy = function() {
            return this.getElement().parentNode.removeChild(this.getElement()),
            this.el = void 0
        },
        a.prototype.render = function() {
            var a,
                b;
            return null == document.querySelector(x.target)
                ? !1
                : (a = this.getElement(), a.children[0].style.width = "" + this.progress + "%", (!this.lastRenderedProgress || 0 | (this.lastRenderedProgress | 0 !== this.progress)) && (a.setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100
                    ? b = "99"
                    : (b = this.progress < 10
                        ? "0"
                        : "", b += 0 | this.progress), a.setAttribute("data-progress", "" + b)), this.lastRenderedProgress = this.progress)
        },
        a.prototype.done = function() {
            return this.progress >= 100
        },
        a
    }(),
    g = function() {
        function a() {
            this.bindings = {}
        }
        return a.prototype.trigger = function(a, b) {
            var c,
                d,
                e,
                f,
                g;
            if (null != this.bindings[a]) {
                for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++)
                    c = f[d],
                    g.push(c.call(this, b));
                return g
            }
        },
        a.prototype.on = function(a, b) {
            var c;
            return null == (c = this.bindings)[a] && (c[a] = []),
            this.bindings[a].push(b)
        },
        a
    }(),
    F = window.XMLHttpRequest,
    E = window.XDomainRequest,
    h = function(a) {
        function b() {
            var a,
                c = this;
            b.__super__.constructor.apply(this, arguments),
            a = function(a) {
                var b;
                return b = a.open,
                a.open = function(d, e) {
                    return c.trigger("request", {
                        type: d,
                        url: e,
                        request: a
                    }),
                    b.apply(a, arguments)
                }
            },
            window.XMLHttpRequest = function() {
                var b;
                return b = new F,
                a(b),
                b
            },
            null != E && (window.XDomainRequest = function() {
                var b;
                return b = new E,
                a(b),
                b
            })
        }
        return K(b, a),
        b
    }(g),
    v = new h,
    a = function() {
        function a() {
            var a = this;
            this.elements = [],
            v.on("request", function(b) {
                var c;
                return c = b.request,
                a.watch(c)
            })
        }
        return a.prototype.watch = function(a) {
            var b;
            return b = new i(a),
            this.elements.push(b)
        },
        a
    }(),
    i = function() {
        function a(a) {
            var b,
                c,
                d,
                e,
                f,
                g,
                h,
                i,
                j = this;
            if (this.progress = 0, void 0 !== a.onprogress)
                for (c = null, g = a.onprogress, a.onprogress = function() {
                    var b,
                        d,
                        e,
                        f;
                    try {
                        d = a.getAllResponseHeaders();
                        for (e in d)
                            if (f = d[e], "content-length" === e.toLowerCase()) {
                                c =+ f;
                                break
                            }
                        } catch (g) {
                        b = g
                    }
                    if (null == c)
                        return j.progress = j.progress + (100 - j.progress) / 2;
                    try {
                        return j.progress = a.responseText.length / c
                    } catch (g) {
                        b = g
                    }
                },
                "function" == typeof g && g.apply(null, arguments),
                i = [
                    "onload", "onabort", "ontimeout", "onerror"
                ],
                d = function() {
                    var c;
                    return c = a[b],
                    a[b] = function() {
                        return j.progress = 100,
                        "function" == typeof c
                            ? c.apply(null, arguments)
                            : void 0
                    }
                },
                e = 0,
                f = i.length; f > e; e++)
                    b = i[e],
                    d();
        else
                h = a.onreadystatechange,
                a.onreadystatechange = function() {
                    var b;
                    return 0 === (b = a.readyState) || 4 === b
                        ? j.progress = 100
                        : 3 === a.readyState && (j.progress = 50),
                    "function" == typeof h
                        ? h.apply(null, arguments)
                        : void 0
                }
            }
        return a
    }(),
    d = function() {
        function a(a) {
            var b,
                c,
                d,
                f;
            for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++)
                b = f[c],
                this.elements.push(new e(b))
        }
        return a
    }(),
    e = function() {
        function a(a) {
            this.selector = a,
            this.progress = 0,
            this.check()
        }
        return a.prototype.check = function() {
            var a = this;
            return document.querySelector(this.selector)
                ? this.done()
                : setTimeout(function() {
                    return a.check()
                }, x.elements.checkInterval)
        },
        a.prototype.done = function() {
            return this.progress = 100
        },
        a
    }(),
    c = function() {
        function a() {
            var a,
                b = this;
            this.progress = 0,
            a = document.onreadystatechange,
            document.onreadystatechange = function() {
                return null != b.states[document.readyState] && (b.progress = b.states[document.readyState]),
                "function" == typeof a
                    ? a.apply(null, arguments)
                    : void 0
            }
        }
        return a.prototype.states = {
            loading: 0,
            interactive: 50,
            complete: 100
        },
        a
    }(),
    f = function() {
        function a() {
            var a,
                b,
                c,
                d = this;
            this.progress = 0,
            a = 0,
            c = 0,
            b = w(),
            setInterval(function() {
                var e;
                return e = w() - b - 50,
                b = w(),
                a += (e - a) / 15,
                c ++> x.eventLag.minSamples && Math.abs(a) < 3 && (a = 0),
                d.progress = 100 * (3 / (a + 3))
            }, 50)
        }
        return a
    }(),
    k = function() {
        function a(a) {
            this.source = a,
            this.last = this.sinceLastUpdate = 0,
            this.rate = x.initialRate,
            this.catchup = 0,
            this.progress = this.lastProgress = 0,
            null != this.source && (this.progress = z(this.source, "progress"))
        }
        return a.prototype.tick = function(a, b) {
            var c;
            return null == b && (b = z(this.source, "progress")),
            b >= 100 && (this.done = !0),
            b === this.last
                ? this.sinceLastUpdate += a
                : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / x.catchupTime, this.sinceLastUpdate = 0, this.last = b),
            b > this.progress && (this.progress += this.catchup * a),
            c = 1 - Math.pow(this.progress / 100, x.easeFactor),
            this.progress += c * this.rate * a,
            this.progress = Math.min(this.lastProgress + x.maxProgressPerFrame, this.progress),
            this.progress = Math.max(0, this.progress),
            this.progress = Math.min(100, this.progress),
            this.lastProgress = this.progress,
            this.progress
        },
        a
    }(),
    C = null,
    B = null,
    m = null,
    D = null,
    l = null,
    n = null,
    t = function() {
        return x.restartOnPushState
            ? Pace.restart()
            : void 0
    },
    null != window.history.pushState && (G = window.history.pushState, window.history.pushState = function() {
        return t(),
        G.apply(window.history, arguments)
    }),
    null != window.history.replaceState && (H = window.history.replaceState, window.history.replaceState = function() {
        return t(),
        H.apply(window.history, arguments)
    }),
    r = !0,
    x.restartOnBackboneRoute && setTimeout(function() {
        return null != window.Backbone
            ? Backbone.history.on("route", function(a, b) {
                var c,
                    d,
                    e,
                    f,
                    g;
                if (d = x.restartOnBackboneRoute) {
                    if (r)
                        return r = !1,
                        void 0;
                    if ("object" == typeof d) {
                        for (g = [], e = 0, f = d.length; f > e; e++)
                            if (c = d[e], c === b) {
                                Pace.restart();
                                break
                            }
                        return g
                    }
                    return Pace.restart()
                }
            })
            : void 0
    }, 0),
    j = {
        ajax: a,
        elements: d,
        document: c,
        eventLag: f
    },
    (u = function() {
        var a,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            l;
        for (C = [], h = [
            "ajax", "elements", "document", "eventLag"
        ], d = 0, f = h.length; f > d; d++)
            c = h[d],
            x[c] !== !1 && C.push(new j[c](x[c]));
        for (l = null != (i = x.extraSources)
            ? i
            : [], e = 0, g = l.length; g > e; e++)
            a = l[e],
            C.push(new a(x));
        return m = new b,
        B = [],
        D = new k
    })(),
    Pace.stop = function() {
        return m.destroy(),
        n = !0,
        null != l && ("function" == typeof o && o(l), l = null),
        u()
    },
    Pace.restart = function() {
        return Pace.stop(),
        Pace.go()
    },
    Pace.go = function() {
        return m.render(),
        n = !1,
        l = A(function(a, b) {
            var c,
                d,
                e,
                f,
                g,
                h,
                i,
                j,
                l,
                o,
                p,
                q,
                r,
                s,
                t,
                u,
                v,
                y;
            for (j = 100 - m.progress, d = r = 0, e = !0, h = s = 0, u = C.length; u > s; h = ++s)
                for (p = C[h], o = null != B[h]
                    ? B[h]
                    : B[h] = [], g = null != (y = p.elements)
                    ? y
                    : [p], i = t = 0, v = g.length; v > t; i = ++t)
                    f = g[i],
                    l = null != o[i]
                        ? o[i]
                        : o[i] = new k(f),
                    e &= l.done,
                    l.done || (d++, r += l.tick(a));
        return c = r / d,
            m.update(D.tick(a, c)),
            q = w(),
            m.done() || e || n
                ? (m.update(100), setTimeout(function() {
                    return m.finish()
                }, Math.max(x.ghostTime, Math.min(x.minTime, w() - q))))
                : b()
        })
    },
    Pace.start = function(a) {
        return q(x, a),
        m.render(),
        document.querySelector(".pace")
            ? Pace.go()
            : setTimeout(Pace.start, 50)
    },
    "function" == typeof define && define.amd
        ? define(function() {
            return Pace
        })
        : "object" == typeof exports
            ? module.exports = Pace
            : x.startOnPageLoad && Pace.start()
}).call(this);
