var TouchSlide = function (a) {
    a = a || {};
    var b = {
        slideCell: a.slideCell || "#touchSlide",
        titCell: a.titCell || ".hd li",
        mainCell: a.mainCell || ".bd",
        effect: a.effect || "left",
        autoPlay: a.autoPlay || !1,
        delayTime: a.delayTime || 200,
        interTime: a.interTime || 2500,
        defaultIndex: a.defaultIndex || 0,
        titOnClassName: a.titOnClassName || "on",
        autoPage: a.autoPage || !1,
        prevCell: a.prevCell || ".prev",
        nextCell: a.nextCell || ".next",
        pageStateCell: a.pageStateCell || ".pageState",
        pnLoop: "undefined " == a.pnLoop ? !0 : a.pnLoop,
        startFun: a.startFun || xxx,
        endFun: a.endFun || null,
        switchLoad: a.switchLoad || null
    },
    c = document.getElementById(b.slideCell.replace("#", ""));
    yy = b.defaultIndex;
    if (!c) return !1;
    var d = function (a, b) {
        a = a.split(" ");
        var c = [];
        b = b || document;
        var d = [b];
        for (var e in a) 0 != a[e].length && c.push(a[e]);
        for (var e in c) {
            if (0 == d.length) return !1;
            var f = [];
            for (var g in d) if ("#" == c[e][0]) f.push(document.getElementById(c[e].replace("#", "")));
            else if ("." == c[e][0]) for (var h = d[g].getElementsByTagName("*"), i = 0; h.length > i; i++) {
                var j = h[i].className;
                j && -1 != j.search(RegExp("\\b" + c[e].replace(".", "") + "\\b")) && f.push(h[i])
            } else for (var h = d[g].getElementsByTagName(c[e]), i = 0; h.length > i; i++) f.push(h[i]);
            d = f
        }
        return 0 == d.length || d[0] == b ? !1 : d
    },
    e = function (a, b) {
        var c = document.createElement("div");
        c.innerHTML = b,
        c = c.children[0];
        var d = a.cloneNode(!0);
        c.appendChild(d),
        a.parentNode.replaceChild(c, a),
        m = d
    },
    f = function (a, b) {
        var c = 0;
        return c = a.currentStyle ? a.currentStyle[b] : getComputedStyle(a, !1)[b],
        parseInt(c.replace("px", ""))
    },
    g = function (a, b) {
        !a || !b || a.className && -1 != a.className.search(RegExp("\\b" + b + "\\b")) || (a.className += (a.className ? " " : "") + b)
    },
    h = function (a, b) {
        !a || !b || a.className && -1 == a.className.search(RegExp("\\b" + b + "\\b")) || (a.className = a.className.replace(RegExp("\\s*\\b" + b + "\\b", "g"), ""))
    },
    i = b.effect,
    j = d(b.prevCell, c)[0],
    k = d(b.nextCell, c)[0],
    l = d(b.pageStateCell)[0],
    m = d(b.mainCell, c)[0];
    if (!m) return !1;
    var O, n = m.children.length,
    o = d(b.titCell, c),
    p = o ? o.length : n,
    q = b.switchLoad,
    r = parseInt(b.defaultIndex),
    s = parseInt(b.delayTime),
    t = parseInt(b.interTime),
    u = "false" == b.autoPlay || 0 == b.autoPlay ? !1 : !0,
    v = "false" == b.autoPage || 0 == b.autoPage ? !1 : !0,
    w = "false" == b.pnLoop || 0 == b.pnLoop ? !1 : !0,
    x = r,
    y = null,
    z = null,
    A = null,
    B = 0,
    C = 0,
    D = 0,
    E = 0,
    G = /hp-tablet/gi.test(navigator.appVersion),
    H = "ontouchstart" in window && !G,
    I = H ? "touchstart" : "mousedown",
    J = H ? "touchmove" : "mousemove",
    K = H ? "touchend" : "mouseup",
    M = 320,
    N = 0;
    if (0 == p && (p = n), v) {
        p = n,
        o = o[0],
        o.innerHTML = "";
        var P = "";
        if (1 == b.autoPage || "true" == b.autoPage) for (var Q = 0; p > Q; Q++) P += "<li>" + (Q + 1) + "</li>";
        else for (var Q = 0; p > Q; Q++) P += b.autoPage.replace("$", Q + 1);
        o.innerHTML = P,
        o = o.children
    }
    for (var Q = 0; n > Q; Q++) {
        var R = m.children[Q],
        S = f(R, "marginLeft") + f(R, "marginRight"),
        T = f(R, "paddingLeft") + f(R, "paddingRight"),
        U = R.clientWidth - T,
        V = R.offsetWidth + S;
        U > N && (N = U, M = V)
    }
    switch (i) {
        case "left":
            m.style.cssText = "width:" + n * M + "px;" + "position:relative;overflow:hidden;padding:0;margin:0;";
            for (var Q = 0; n > Q; Q++) m.children[Q].style.cssText = "float:left;width:" + N + "px;";
            e(m, '<div class="tempWrap" style="overflow:hidden; position:relative; width:' + M + 'px"></div>');
            break;
        case "leftLoop":
            m.appendChild(m.children[0].cloneNode(!0)),
        m.insertBefore(m.children[n - 1].cloneNode(!0), m.children[0]),
        m.style.cssText = "width:" + (n + 2) * M + "px;" + "position:relative;overflow:hidden;padding:0;margin:0;";
            for (var Q = 0; n + 2 > Q; Q++) m.children[Q].style.cssText = "float:left;width:" + N + "px;";
            e(m, '<div class="tempWrap" style="overflow:hidden; position:relative; width:' + M + 'px"></div>')
    }
    var W = function () {
        "function" == typeof b.startFun && b.startFun(r, p)
    },
    X = function () {
        "function" == typeof b.endFun && b.endFun(r, p)
    },
    Y = function (a) {
        var b = ("leftLoop" == i ? r + 1 : r) + a,
        c = function (a) {
            for (var b = m.children[a].getElementsByTagName("img"), c = 0; b.length > c; c++) b[c].getAttribute(q) && (b[c].setAttribute("src", b[c].getAttribute(q)), b[c].removeAttribute(q))
        };
        if (c(b), "leftLoop" == i) switch (b) {
            case 0:
                c(n);
                break;
            case 1:
                c(n + 1);
                break;
            case n:
                c(0);
                break;
            case n + 1: c(1)
        }
    },
    Z = function (a, b, c) {
        c = c ? c.style : m.style,
        c.webkitTransitionDuration = c.MozTransitionDuration = c.msTransitionDuration = c.OTransitionDuration = c.transitionDuration = b + "ms",
        c.webkitTransform = "translate(" + a + "px,0)" + "translateZ(0)",
        c.msTransform = c.MozTransform = c.OTransform = "translateX(" + a + "px)"
    },
    $ = function (a) {
        switch (i) {
            case "left":
                r >= p ? r = a ? r - 1 : 0 : 0 > r && (r = a ? 0 : p - 1),
            null != q && Y(0),
            Z(-r * M, s),
            x = r;
                break;
            case "leftLoop":
                null != q && Y(0),
            Z(-(r + 1) * M, s),
            -1 == r ? (z = setTimeout(function () {
                Z(-p * M, 0)
            },
            s), r = p - 1) : r == p && (z = setTimeout(function () {
                Z(-M, 0)
            },
            s), r = 0),
            x = r
        }
        W(),
        A = setTimeout(function () {
            X()
        },
        s);
        for (var c = 0; p > c; c++) h(o[c], b.titOnClassName),
        c == r && g(o[c], b.titOnClassName);
        0 == w && (h(k, "nextStop"), h(j, "prevStop"), 0 == r ? g(j, "prevStop") : r == p - 1 && g(k, "nextStop")),
        l && (l.innerHTML = "<span>" + (r + 1) + "</span>/" + p)
    };
    if ($(), u && (y = setInterval(function () {
        r++,
        $()
    },
    t)), o) for (var Q = 0; p > Q; Q++) (function () {
        var a = Q;
        o[a].addEventListener("click",
        function () {
            clearTimeout(z),
            clearTimeout(A),
            r = a,
            $()
        })
    })();
    k && k.addEventListener("click",
    function () {
        (1 == w || r != p - 1) && (clearTimeout(z), clearTimeout(A), r++, $())
    }),
    j && j.addEventListener("click",
    function () {
        (1 == w || 0 != r) && (clearTimeout(z), clearTimeout(A), r--, $())
    });
    var _ = function (a) {
        clearTimeout(z),
        clearTimeout(A),
        O = void 0,
        D = 0;
        var b = H ? a.touches[0] : a;
        B = b.pageX,
        C = b.pageY,
        m.addEventListener(J, ab, !1),
        m.addEventListener(K, bb, !1)
    },
    ab = function (a) {
        if (!H || !(a.touches.length > 1 || a.scale && 1 !== a.scale)) {
            var b = H ? a.touches[0] : a;
            if (D = b.pageX - B, E = b.pageY - C, O === void 0 && (O = !!(O || Math.abs(D) < Math.abs(E))), !O) {
                switch (a.preventDefault(), u && clearInterval(y), i) {
                    case "left":
                        (0 == r && D > 0 || r >= p - 1 && 0 > D) && (D = .4 * D),
                    Z(-r * M + D, 0);
                        break;
                    case "leftLoop":
                        Z(-(r + 1) * M + D, 0)
                }
                null != q && Math.abs(D) > M / 3 && Y(D > 0 ? -1 : 1)
            }
        }
    },
    bb = function (a) {
        0 != D && (a.preventDefault(), O || (Math.abs(D) > M / 10 && (D > 0 ? r-- : r++), $(!0), u && (y = setInterval(function () {
            r++,
            $()
        },
        t))), m.removeEventListener(J, ab, !1), m.removeEventListener(K, bb, !1))
    };
    m.addEventListener(I, _, !1)
};


xxx = function (yy) {

}