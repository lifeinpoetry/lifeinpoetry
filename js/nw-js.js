! function(t, i) {
    var s = {
            init: function() {
                this.globals(),
                    this.devices(),
                    Function("/*@cc_on return document.documentMode===10@*/")() && i.$body.addClass("ie10");
            },
            globals: function() {
                i.$win = t(window),
                    i.$doc = t(document),
                    i.$body = t("body"),
                    i.$win_body = t("html, body");
            },
            in_iframe: function() {
                window.self !== window.top && i.$body.addClass("iframe");
            },
            is_touch_device: function() {
                return !!("ontouchstart" in window) || !!window.navigator.msMaxTouchPoints;
            },
            like_button: function() {
                t("#posts, .related-posts").on("mouseenter touchstart", ".like_button", function(i) {
                    var s = t(i.currentTarget);
                    s.hasClass("liked") || s.addClass("interacted");
                });
            },
            link_color: function() {
                var t = i.Utils.hex_to_hsv(i.ACCENT_COLOR),
                    s = i.Utils.hex_to_hsv(i.BACKGROUND_COLOR);
                t.s < .2 && t.v > .8 && (i.$body.addClass("light-accent"),
                        s.s < .2 && s.v > .8 && i.$body.addClass("light-on-light")),
                    t.v < .2 && s.v < .2 && i.$body.addClass("dark-on-dark");
            },
            description_color: function() {
                var s = t(".title-group .description");
                if (s.length) {
                    var e = i.Utils.hex_to_rgb(i.TITLE_COLOR);
                    s.css({
                        color: "rgba(" + e.r + "," + e.g + "," + e.b + ", 0.7)"
                    });
                }
            },
            devices: function() {
                var s = navigator.userAgent;
                this.is_touch_device() && (i.$body.addClass("touch"),
                        i.$body.hasClass("permalink") || setTimeout(function() {
                            window.scrollTo(0, 1);
                        }, 1));
                var e = (s.match(/Android\s([0-9\.]*)/) || [])[1];
                s.match(/(iPhone|iPod|iPad)/) ? (this.ios()) : e && (
                        i.$body.addClass("android"),
                        parseFloat(e) < 4.4 && i.$body.addClass("android-lt-4-4")),
                     this.supports_local_storage() && (i.$body.addClass("catch-share-events")),
                    t("#page").on("click", "a.open-in-app", t.proxy(function(i) {
                        i.preventDefault();
                        var s, e, o, n = t(i.currentTarget),
                            a = n.data("post");
                        this.open_in_app(a, s, e, o);
                    }, this));
            },
            supports_local_storage: function() {
                try {
                    return "localStorage" in window && null !== window.localStorage;
                } catch (t) {
                    return !1;
                }
            },
            ios: function() {
                i.$body.addClass("ios"),
                    this.is_ios = !0;
            },
            open_in_app: function(i, s, e, o) {
                s = s || "blog_popover",
                    e = e || "",
                    o = o || "";
                var n = "//www.tumblr.com/open/app?referrer=" + s + "&variant=" + e + "&num_related_posts=" + o + "&app_args=" + encodeURIComponent("blog?blogName=") + t("body").data("urlencoded-name");
                return i && (n += encodeURIComponent("&postID=" + i)),
                    this.is_ios ? void this.open_in_app_or_store(n, s) : void(document.location = n);
            },
            open_in_app_or_store: function(t, i) {
                var s = "itms-apps://itunes.com/apps/tumblr/tumblr";
                "blog_engagement_popover" === i && (s += "?pt=212308&ct=optica-popup");
                var e = document.getElementById("app_protocol_check") || document.createElement("iFrame");
                e.setAttribute("id", "app_protocol_check"),
                    e.style.display = "none",
                    document.body.appendChild(e),
                    e.src = t,
                    setTimeout(function() {
                        document.location.href = s;
                    }, 1e3);
            },
            rgb_to_hex: function(t, i, s) {
                return "#" + ((1 << 24) + (t << 16) + (i << 8) + s).toString(16).slice(1);
            },
            hex_to_rgb: function(t) {
                t = (t + "").replace(/[^0-9a-f]/gi, ""),
                    t.length < 6 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]);
                var i = "([a-f\\d]{2})",
                    s = new RegExp("^#?" + i + i + i + "$", "i").exec(t);
                return s ? {
                    r: parseInt(s[1], 16),
                    g: parseInt(s[2], 16),
                    b: parseInt(s[3], 16)
                } : null;
            },
            rgb_to_hsv: function(t, i, s) {
                var e = Math.min(Math.min(t, i), s),
                    o = Math.max(Math.max(t, i), s),
                    n = o - e,
                    a = {
                        h: 6,
                        s: o ? (o - e) / o : 0,
                        v: o / 255
                    };
                return n ? o === t ? a.h += (i - s) / n : o === i ? a.h += 2 + (s - t) / n : a.h += 4 + (t - i) / n : a.h = 0,
                    a.h = 60 * a.h % 360,
                    a;
            },
            hsv_to_rgb: function(t, i, s) {
                var e, o, n;
                if (i) {
                    e = o = n = 0;
                    var a = (t + 360) % 360 / 60,
                        r = s * i,
                        h = s - r,
                        l = r * (1 - Math.abs(a % 2 - 1));
                    a < 1 ? (e = r,
                            o = l) : a < 2 ? (e = l,
                            o = r) : a < 3 ? (o = r,
                            n = l) : a < 4 ? (o = l,
                            n = r) : a < 5 ? (n = r,
                            e = l) : (n = l,
                            e = r),
                        e += h,
                        o += h,
                        n += h;
                } else
                    e = o = n = s;
                return {
                    r: Math.round(255 * e),
                    g: Math.round(255 * o),
                    b: Math.round(255 * n)
                };
            },
            hex_to_hsv: function(s) {
                s = (s + "").replace(/[^0-9a-f]/gi, ""),
                    s.length < 6 && (s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2]);
                var e = i.Utils.hex_to_rgb(s),
                    o = t.map(e, function(t) {
                        return t;
                    }),
                    n = i.Utils.rgb_to_hsv.apply(i.Utils, o);
                return n;
            },
            hsv_to_hex: function(s, e, o) {
                var n = i.Utils.hsv_to_rgb(s, e, o),
                    a = t.map(n, function(t) {
                        return t;
                    }),
                    r = i.Utils.rgb_to_hex.apply(i.Utils, a);
                return r;
            },
            hex_brightness: function(t, i) {
                t = String(t).replace(/[^0-9a-f]/gi, ""),
                    t.length < 6 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]),
                    i = i || 0;
                var s, e, o, n = parseInt(t, 16),
                    a = i < 0 ? 0 : 255,
                    r = i < 0 ? -i : i,
                    h = n >> 16,
                    l = n >> 8 & 255,
                    c = 255 & n;
                return s = Math.round((a - h) * r) + h,
                    e = Math.round((a - l) * r) + l,
                    o = Math.round((a - c) * r) + c,
                    "#" + (16777216 + 65536 * s + 256 * e + o).toString(16).slice(1);
            },
            init_no_likes_text: function() {
                var s = i.NO_LIKES_VARIANTS,
                    e = s[Math.floor(Math.random() * s.length)],
                    o = t(".likes-no-likes.content");
                o.length > 0 && o.text(e);
            },
            init_no_posts_text: function() {
                var s = i.NO_POSTS_VARIANTS,
                    e = s[Math.floor(Math.random() * s.length)],
                    o = t(".posts-no-posts.content");
                o.length > 0 && o.text(e);
            },
            init_no_following_text: function() {
                var s = i.NO_FOLLOWING_VARIANTS,
                    e = s[Math.floor(Math.random() * s.length)],
                    o = t(".following-no-following.content");
                o.length > 0 && o.text(e);
            }
        },
        e = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
                window.setTimeout(t, 50);
            };
        }(),
        o = {
            init: function() {
                this.tick = !1,
                    this.event_loop();
            },
            event_loop: function() {
                i.$win.on("scroll.Eventor:next-frame", t.proxy(function() {
                    this.tick || (e(t.proxy(this.next_frame, this)),
                        this.tick = !0);
                }, this));
            },
            next_frame: function(t) {
                i.$win.trigger("Eventor:scroll"),
                    this.tick = !1;
            },
            popover_frame: function(t) {
                i.$win.trigger("Eventor:scroll:popover"),
                    this.tick = !1;
            }
        },
        n = function(i, s) {
            return this instanceof n ? (this.el = "string" == typeof i ? t(i).get(0) : i,
                this.$el = t(i),
                this.options = s,
                this.metadata = this.$el.data("plugin-options"),
                this.config = t.extend({}, n.defaults, this.options, this.metadata),
                this.trigger = this.config.trigger || !1,
                this.$trigger = t(this.config.trigger) || this.$el,
                this.bind_events(),
                this) : new n(i, s);
        };
    n.prototype = {
        __mouse_enter: function(i) {
            this.show(t(i.currentTarget));
        },
        __mouse_leave: function(i) {
            this.hide(t(i.currentTarget));
        },
        bind_events: function() {
            this.$el.on("mouseenter", this.trigger, t.proxy(this.__mouse_enter, this)),
                    this.$el.on("mouseleave", this.trigger, t.proxy(this.__mouse_leave, this));
        },
        show: function(i) {
            clearTimeout(this.leave_delay),
            t(this.trigger).removeClass("active"),
                    i.addClass("active");
        },
        hide: function(s) {
            i.Popmenu.hide_all(),
                    this.leave_delay = setTimeout(t.proxy(function() {
                        s.removeClass("active"),
                            clearTimeout(this.leave_delay);
                    }, this), this.config.forgiveness_delay);
        }
    },
    n.defaults = {
        forgiveness_delay: 0
    },
    t.fn.drawer = function(t) {
        return this.each(function() {
            new n(this, t);
        });
    };
    var a = function(s, e) {
        this.$el = t(s),
            this.options = t.extend({
                animate_opacity: !1,
                animate_position: !0,
                inertia: .3,
                opacity_inertia: .4
            }, e || {}),
            this.inertia = this.options.inertia,
            i.$win.on("Eventor:scroll", t.proxy(this.__window_scroll, this));
    };
    var r = function(i, s, e) {
        return this instanceof r ? (this.el = "string" == typeof i ? t(i).get(0) : i,
            this.$el = t(i),
            this.config = t.extend({}, r.defaults, s),
            this.callback = e || function() {},
            this.successes = 0,
            this.errors = 0,
            this.items = [],
            this.get_items(),
            this) : new r(i, s, e);
    };
    var h = function(i, s) {
        return this instanceof h ? (this.el = "string" == typeof i ? t(i).get(0) : i,
            this.$el = t(i),
            this.options = s,
            this.metadata = this.$el.data("plugin-options"),
            this.config = t.extend({}, h.defaults, this.options, this.metadata),
            this.trigger = this.config.trigger,
            this.$trigger = this.$el.find(this.trigger),
            this.$search_input = t("#search input"),
            this.close_button = this.config.close_button,
            this.$close_button = this.$el.find(this.close_button),
            this.popover = this.config.popover || !1,
            this.$popover = this.$el.find(this.popover),
            this.events = {
                trigger_click: t.proxy(this.__trigger_click, this),
                document_click: t.proxy(this.__document_click, this),
                close_click: t.proxy(this.__close_click, this),
                glass_click: t.proxy(this.__class_click, this),
                offset_scroll: t.proxy(this._check_offset, this),
                popover_mouseenter: t.proxy(this.__popover_mouseenter, this),
                popover_mouseleave: t.proxy(this.__popover_mouseleave, this)
            },
            this.bind_events(),
            h.register(this),
            this) : new h(i, s);
    };
    h.prototype = {
        __document_click: function(i) {
            var s = t(i.target);
            this.$popover && this.$popover.hasClass("active") && !this.$el.has(s.parents(this.config.container)).length && !s.is(this.config.ignore) && this.hide();
        },
        __close_click: function(t) {
            this.hide();
        },
        __trigger_click: function(i) {
            i.preventDefault(),
                    this.$trigger = t(i.currentTarget),
                    this.options && this.options.hash && (document.location.hash = this.options.hash),
                    this.$container = this.$trigger.parents(this.config.container),
                    this.$glass = this.$container.siblings(this.config.glass),
                    this.$popover = this.$trigger.siblings(this.config.popopver),
                    this.$popover.hasClass("active") ? this.hide() : this.show();
        },
        __popover_mouseenter: function() {},
        __popover_mouseleave: function() {
            i.$body.removeClass("no-scroll");
        },
        _check_offset: function() {
            Math.abs(this.scroll_offset - i.$win.scrollTop()) > this.config.scroll_distance && (this.$search_input.is(":focus") || this.hide());
        },
        _has_overflow: function(t) {
            var i = t[0];
            return i.scrollHeight > i.clientHeight;
        },
        bind_events: function() {
            this.$el.on("touchstart click", this.trigger, this.events.trigger_click),
                    this.$el.on("touchstart click", this.close_button, this.events.close_click),
                    this.$el.on("mouseenter", this.popover, this.events.popover_mouseenter),
                    this.$el.on("mouseleave", this.popover, this.events.popover_mouseleave),
                    i.$doc.on("click", this.events.document_click);
        },
        unbind_events: function() {
            this.$el.off("click", this.trigger, this.events.trigger_click),
                    this.$el.off("mouseenter", this.popover, this.events.popover_mouseenter),
                    this.$el.off("mouseleave", this.popover, this.events.popover_mouseleave),
                    i.$doc.off("click", this.events.document_click);
        },
        destroy: function() {},
        show: function() {
            this.$glass && this.$glass.addClass("active"),
                    this.$popover.parents("article").addClass("visible"),
                    this.$popover.addClass("show"),
                    this.$trigger.addClass("show"),
                    setTimeout(t.proxy(function() {
                        i.$body.addClass(this.config.body_active_class),
                            this.$trigger.addClass("active"),
                            this.$container.addClass("active"),
                            this.$popover.addClass("active"),
                            this.scroll_offset = i.$win.scrollTop(),
                            this.config.close_on_scroll && i.$win.on("Eventor:scroll", this.events.offset_scroll);
                    }, this), 10);
        },
        hide: function(s) {
            this.$search_input.blur();
            var e = this.$el.find(this.config.popover),
                o = this.$el.find(this.config.trigger);
            i.$win.off("Eventor:scroll", this.events.offset_scroll),
                    i.$body.removeClass(this.config.body_active_class),
                    history.replaceState("", document.title, window.location.pathname + window.location.search),
                    this.$glass && this.$glass.removeClass("active"),
                    this.$container && this.$container.removeClass("active"),
                    o.removeClass("active"),
                    e.removeClass("active"),
                    e.each(function() {
                        t(this).parents("article").removeClass("visible");
                    }),
                    setTimeout(t.proxy(function() {
                        o.removeClass("show"),
                            e.removeClass("show");
                    }, this), s ? 0 : 250);
        }
    },
    h.instances = [],
    h.defaults = {
        container: ".pop",
        trigger: ".selector",
        popover: ".pop-menu",
        use_glass: !1,
        close_button: ".notes-wrapper-header-close",
        glass: ".glass",
        close_on_scroll: !0,
        scroll_distance: 50,
        body_active_class: "popover-active",
        ignore: ""
    },
    h.register = function(t) {
        this.instances.push(t);
    },
    h.hide_all = function() {
        for (var t = 0; t < this.instances.length; t++)
            this.instances[t].hide(!0);
    },
    t.fn.popmenu = function(t) {
        return this.each(function() {
            new h(this, t);
        });
    };
    var c = function(s, e) {
        return new c(s, e);
    };
    c.prototype = {
        __document_keydown: function(s) {
            var e = s.charCode ? s.charCode : s.keyCode,
                o = s ? s.target : window.event.srcElement;
            t(o).is("input:focus") || (27 === e && i.Popmenu.hide_all(),
                    190 === e && i.$win_body.animate({
                        scrollTop: 0
                    }));
        },
        __window_resize: function() {},
        __window_scroll: function() {},
        _debounce: function(i, s) {
            var e = null;
            return function() {
                var o = arguments;
                clearTimeout(e),
                        e = setTimeout(t.proxy(function() {
                            i.apply(this, o);
                        }, this), s);
            };
        },
        _throttle: function(t, i, s) {
            i || (i = 250);
            var e, o;
            return function() {
                var n = s || this,
                    a = +new Date,
                    r = arguments;
                e && a < e + i ? (clearTimeout(o),
                        o = setTimeout(function() {
                            e = a,
                                t.apply(n, r);
                        }, i)) : (e = a,
                        t.apply(n, r));
            };
        },
        _get_window_bounds: function() {
            this.window_height = i.$win.height();
        },
        _get_post_bounds: function(i) {
            return t.data(i[0], "offsets");
        },
        _set_post_bounds: function(i) {
            var s = i.offset().top,
                e = i.outerHeight(),
                o = s + e;
            return t.data(i[0], "offsets", {
                top: s,
                height: e,
                bottom: o
            });
        },
        _in_view: function(t) {
            var s, e = i.$win.scrollTop();
            this.window_height = this.window_height || i.$win.height();
            var o = e + this.window_height;
            return s = this._get_post_bounds(t),
                s || (s = this._set_post_bounds(t)), !(s.bottom + this.window_height < e || s.top > o + this.window_height);
        },
        _snooze: function(t) {
            t.addClass("snooze");
        },
        _wake: function(t) {
            t.removeClass("snooze");
        },
        _near_bottom: function() {
            var t = this.is_grid_layout ? 1.25 : 3;
            return i.$doc.height() - this.$el.scrollTop() < this.$el.height() * t;
        },
        _near_top: function() {
            return !!(i.$win.scrollTop() < 50);
        },
        _slender: function() {
            return i.$win.width() < 720;
        },
        _failed: function() {
            this.hide_loader(!0);
        },
        cache_selectors: function() {
            this.$html = t("html"),
                    this.$header = t("#header"),
                    this.$posts = t("#posts"),
                    this.$relatedPosts = t(".related-posts");
        },
        animate: function() {
            this.go_to_position && !this.animating && (this.animating = !0,
                    t("html, body").stop().animate({
                        scrollTop: this.go_to_position - 10
                    }, 250, t.proxy(function() {
                        this.animating = !1;
                    }, this)));
        },
        bind_events: function() {
            this.$el.on("Eventor:scroll", t.proxy(this.__window_scroll, this)),
                    this.$el.on("resize orientationchange", t.proxy(this._debounce(this.__window_resize, this.config.resizeDelay), this)),
                    i.$doc.on("keydown", t.proxy(this.__document_keydown, this));
        },
        hide_loader: function(t) {
            t,
                    this.config.$loader.removeClass("animate");
        },
        show_loader: function() {
            this.config.$loader.addClass("animate");
        }
    },
    c.instances = [],
    c.defaults = {
        bufferPx: 1e3,
        $loader: t(".loader"),
        resizeDelay: 100,
        scrollDelay: 100,
        $target: t("#posts")
    },
    c.register = function(t) {
        this.instances.push(t);
    },
    i.Utils = s,
    i.Eventor = o,
    i.Popmenu = h,
    i.Parallaxer = a,
    i.Drawer = n,
    i.Pager = c,
    t(function() {
        i.Utils.init(),
            i.Eventor.init();
        var s = t("body");
        t("#page").popmenu();
    });
}(window.jQuery, window.Optica);
