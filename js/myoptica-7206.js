!function(t, i, s) {
    "use strict";
    var e, n = i.event;
    n.special.smartresize = {
        setup: function() {
            i(this).bind("resize", n.special.smartresize.handler) ;
        },
        teardown: function() {
            i(this).unbind("resize", n.special.smartresize.handler);
        },
        handler: function(t, i) {
            var s = this
              , o = arguments;
            t.type = "smartresize",
            e && clearTimeout(e),
            e = setTimeout(function() {
                n.dispatch.apply(s, o) ;
            }, "execAsap" === i ? 0 : 100);
        }
    },
    i.fn.smartresize = function(t) {
        return t ? this.bind("smartresize", t) : this.trigger("smartresize", ["execAsap"]);
    }
    ,
    /*
    i.Mason = function(t, s) {
        this.element = i(s),
        this._create(t),
        this._init();
    }
    ,
    i.Mason.settings = {
        isResizable: !0,
        isAnimated: !1,
        animationOptions: {
            queue: !1,
            duration: 500
        },
        gutterWidth: 0,
        isRTL: !1,
        isFitWidth: !1,
        containerStyle: {
            position: "relative"
        }
    },
    i.Mason.prototype = {
        _filterFindBricks: function(t) {
            var i = this.options.itemSelector;
            return i ? t.filter(i).add(t.find(i)) : t;
        },
        _getBricks: function(t) {
            var i = this._filterFindBricks(t).css({
                position: "absolute"
            }).addClass("masonry-brick");
            return i;
        },
        _create: function(s) {
            this.options = i.extend(!0, {}, i.Mason.settings, s),
            this.styleQueue = [];
            var e = this.element[0].style;
            this.originalStyle = {
                height: e.height || ""
            };
            var n = this.options.containerStyle;
            for (var o in n)
                this.originalStyle[o] = e[o] || "";
            this.element.css(n),
            this.horizontalDirection = this.options.isRTL ? "right" : "left";
            var h = this.element.css("padding-" + this.horizontalDirection)
              , a = this.element.css("padding-top");
            this.offset = {
                x: h ? parseInt(h, 10) : 0,
                y: a ? parseInt(a, 10) : 0
            },
            this.isFluid = this.options.columnWidth && "function" == typeof this.options.columnWidth;
            var r = this;
            setTimeout(function() {
                r.element.addClass("masonry");
            }, 0),
            this.options.isResizable && i(t).bind("smartresize.masonry", function() {
                r.resize();
            }),
            this.reloadItems();
        },
        _init: function(t) {
            this._getColumns(),
            this._reLayout(t);
        },
        option: function(t, s) {
            i.isPlainObject(t) && (this.options = i.extend(!0, this.options, t));
        },
        layout: function(t, i) {
            for (var s = 0, e = t.length; s < e; s++)
                this._placeBrick(t[s]);
            var n = {height: "auto"};
            if (this.options.isFitWidth) {
                var o = 0;
                for (s = this.cols; --s && 0 === this.colYs[s]; )
                    o++;
                n.width = (this.cols - o) * this.columnWidth - this.options.gutterWidth;
            }
            this.styleQueue.push({
                $el: this.element,
                style: n
            });
            var h, a = this.isLaidOut && this.options.isAnimated ? "animate" : "css", r = this.options.animationOptions;
            for (s = 0,
            e = this.styleQueue.length; s < e; s++)
                h = this.styleQueue[s],
                h.$el[a](h.style, r);
            this.styleQueue = [],
            i && i.call(t),
            this.isLaidOut = !0;
        },
        _getColumns: function() {
            var t = this.options.isFitWidth ? this.element.parent() : this.element
              , i = t.width();
            this.columnWidth = this.isFluid ? this.options.columnWidth(i) : this.options.columnWidth || this.$bricks.outerWidth(!0) || i,
            this.columnWidth += this.options.gutterWidth,
            this.cols = Math.floor((i + this.options.gutterWidth) / this.columnWidth),
            this.cols = Math.max(this.cols, 1);
        },
        _placeBrick: function(t) {
            var s, e, n, o, h, a = i(t);
            if (s = Math.ceil(a.outerWidth(!0) / this.columnWidth),
            s = Math.min(s, this.cols),
            1 === s)
                n = this.colYs;
            else
                for (e = this.cols + 1 - s,
                n = [],
                h = 0; h < e; h++)
                    o = this.colYs.slice(h, h + s),
                    n[h] = Math.max.apply(Math, o);
            for (var r = Math.min.apply(Math, n), l = 0, c = 0, u = n.length; c < u; c++)
                if (n[c] === r) {
                    l = c;
                    break;
                }
            var d = {
                top: r + this.offset.y
            };
            d[this.horizontalDirection] = this.columnWidth * l + this.offset.x,
            this.styleQueue.push({
                $el: a,
                style: d
            });
            var m = r + a.outerHeight(!0)
              , p = this.cols + 1 - u;
            for (c = 0; c < p; c++)
                this.colYs[l + c] = m;
        },
        resize: function() {
            var t = this.cols;
            this._getColumns(),
            (this.isFluid || this.cols !== t) && this._reLayout();
        },
        _reLayout: function(t) {
            var i = this.cols;
            for (this.colYs = []; i--; )
                this.colYs.push(0);
            this.layout(this.$bricks, t);
        },
        reloadItems: function() {
            this.$bricks = this._getBricks(this.element.children());
        },
        reload: function(t) {
            this.reloadItems(),
            this._init(t);
        },
        appended: function(t, i, s) {
            if (i) {
                this._filterFindBricks(t).css({
                    top: this.element.height()
                });
                var e = this;
                setTimeout(function() {
                    e._appended(t, s);
                }, 1);
            } else
                this._appended(t, s);
        },
        _appended: function(t, i) {
            var s = this._getBricks(t);
            this.$bricks = this.$bricks.add(s),
            this.layout(s, i);
        },
        remove: function(t) {
            this.$bricks = this.$bricks.not(t),
            t.remove();
        },
        destroy: function() {
            this.$bricks.removeClass("masonry-brick").each(function() {
                this.style.position = "",
                this.style.top = "",
                this.style.left = "";
            });
            var s = this.element[0].style;
            for (var e in this.originalStyle)
                s[e] = this.originalStyle[e];
            this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),
            i(t).unbind(".masonry");
        }
    },
    */
    i.fn.imagesLoaded = function(t) {
        function s() {
            t.call(n, o);
        }
        function e(t) {
            var n = t.target;
            n.src !== a && i.inArray(n, r) === -1 && (r.push(n),
            --h <= 0 && (setTimeout(s),
            o.unbind(".imagesLoaded", e)));
        }
        var n = this
          , o = n.find("img").add(n.filter("img"))
          , h = o.length
          , a = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
          , r = [];
        return h || s(),
        o.bind("load.imagesLoaded error.imagesLoaded", e).each(function() {
            var t = this.src;
            this.src = a,
            this.src = t;
        }),
        n;
    }
    ;
    /*
    var o = function(i) {
        t.console && t.console.error(i);
    };
    i.fn.masonry = function(t) {
        if ("string" == typeof t) {
            var s = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var e = i.data(this, "masonry");
                return e ? i.isFunction(e[t]) && "_" !== t.charAt(0) ? void e[t].apply(e, s) : void o("no such method '" + t + "' for masonry instance") : void o("cannot call methods on masonry prior to initialization; attempted to call method '" + t + "'");
            });
        } else
            this.each(function() {
                var s = i.data(this, "masonry");
                s ? (s.option(t || {}),
                s._init()) : i.data(this, "masonry", new i.Mason(t,this));
            });
        return this;
    };
    */
}(window, jQuery);
!function(t, i) {
    var s = {
            init: function() {
                this.globals(),
                this.devices(),
                this.like_button(),
                this.in_iframe(),
                this.like_button(),
                this.link_color(),
                this.description_color(),
                t(".header-image").length && this.load_header(),
                Function("/*@cc_on return document.documentMode===10@*/")() && i.$body.addClass("ie10"),
                this.init_related_posts_cta(),
                this.init_no_likes_text(),
                this.init_no_posts_text(),
                this.init_no_following_text();
            },
            globals: function() {
                i.$win = t(window),
                i.$doc = t(document),
                i.$notes = t(".notes-wrapper"),
                i.$notesInner = t(".notes"),
                i.$body = t("body"),
                i.$win_body = t("html, body");
            },
            in_iframe: function() {
                window.self !== window.top && i.$body.addClass("iframe");
            },
            is_touch_device: function() {
                return !!("ontouchstart"in window) || !!window.navigator.msMaxTouchPoints;
            },
            load_header: function() {
                var s = t(".header-image");
                if (i.$body.hasClass("iframe") || i.$body.hasClass("touch"))
                    s.css({
                        opacity: 1
                    }).addClass("loaded");
                else {
                    var e = s.data("bg-image")
                      , o = new Image;
                    t(o).bind("load", function(t) {
                        s.addClass("loaded");
                    }),
                    o.src = e;
                }
            },
            like_button: function() {
                t("#posts, .related-posts").on("mouseenter touchstart", ".like_button", function(i) {
                    var s = t(i.currentTarget);
                    s.hasClass("liked") || s.addClass("interacted");
                });
            },
            link_color: function() {
                var t = i.Utils.hex_to_hsv(i.ACCENT_COLOR)
                , s = i.Utils.hex_to_hsv(i.BACKGROUND_COLOR);
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
                this.supports_app_nag = !1,
                this.is_touch_device() && (i.$body.addClass("touch"),
                i.$body.hasClass("permalink") || setTimeout(function() {
                    window.scrollTo(0, 1);
                }, 1));
                var e = (s.match(/Android\s([0-9\.]*)/) || [])[1];
                s.match(/(iPhone|iPod|iPad)/) ? (this.ios(),
                this.supports_app_nag = !0) : e && (this.supports_app_nag = !0,
                i.$body.addClass("android"),
                parseFloat(e) < 4.4 && i.$body.addClass("android-lt-4-4")),
                this.supports_app_nag && this.supports_local_storage() && "true" !== localStorage.getItem("has-seen-app-nag") && (i.$body.addClass("catch-share-events"),
                this.prepare_app_nag()),
                t("#page").on("click", "a.open-in-app", t.proxy(function(i) {
                    i.preventDefault();
                    var s, e, o, n = t(i.currentTarget), a = n.data("post");
                    n.hasClass("related-post-cta") && (s = "blog_related_posts_cta",
                    e = n.data("cta-variant"),
                    o = t(".related-posts > article").length),
                    this.open_in_app(a, s, e, o);
                }, this));
            },
            supports_local_storage: function() {
                try {
                    return "localStorage"in window && null !== window.localStorage;
                } catch (t) {
                    return !1;
                }
            },
            prepare_app_nag: function() {
                t(".catch-share-events").on("click.shareEvents", ".reblog-control, .like-control", t.proxy(function(i) {
                    i.preventDefault();
                    var s = t(i.currentTarget).closest("article").data("post-id");
                    this.open_app_nag(s);
                }, this));
                var s = t(".app-nag");
                s.on("click", ".app-nag-close-button", t.proxy(function(t) {
                    i.$body.removeClass("show-app-nag"),
                    this.close_app_nag(!1);
                }, this)),
                s.on("click", ".app-nag-app-store-deny", t.proxy(function(t) {
                    this.close_app_nag(!1);
                }, this)),
                s.on("click", ".app-nag-app-store-link", t.proxy(function(i) {
                    this.close_app_nag(!0),
                    this.open_in_app(t(i.currentTarget).data("id"), "blog_engagement_popover");
                }, this));
            },
            open_app_nag: function(s) {
                i.$body.addClass("show-app-nag"),
                t(".app-nag-app-store-link").data("id", s);
            },
            close_app_nag: function(s) {
                s === !1 && (t(".catch-share-events").off("click.shareEvents"),
                localStorage.setItem("has-seen-app-nag", !0)),
                i.$body.removeClass("show-app-nag catch-share-events");
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
                this.is_ios ? void this.open_in_app_or_store(n, s) : void (document.location = n);
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
                var i = "([a-f\\d]{2})"
                  , s = new RegExp("^#?" + i + i + i + "$","i").exec(t);
                return s ? {
                    r: parseInt(s[1], 16),
                    g: parseInt(s[2], 16),
                    b: parseInt(s[3], 16)
                } : null;
            },
            rgb_to_hsv: function(t, i, s) {
                var e = Math.min(Math.min(t, i), s)
                  , o = Math.max(Math.max(t, i), s)
                  , n = o - e
                  , a = {
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
                    var a = (t + 360) % 360 / 60
                      , r = s * i
                      , h = s - r
                      , l = r * (1 - Math.abs(a % 2 - 1));
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
                var e = i.Utils.hex_to_rgb(s)
                , o = t.map(e, function(t) {
                    return t;
                })
                , n = i.Utils.rgb_to_hsv.apply(i.Utils, o);
                return n;
            },
            hsv_to_hex: function(s, e, o) {
                var n = i.Utils.hsv_to_rgb(s, e, o)
                 , a = t.map(n, function(t) {
                     return t;
                 })
                 , r = i.Utils.rgb_to_hex.apply(i.Utils, a);
                return r;
            },
            hex_brightness: function(t, i) {
                t = String(t).replace(/[^0-9a-f]/gi, ""),
                t.length < 6 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]),
                i = i || 0;
                var s, e, o, n = parseInt(t, 16), a = i < 0 ? 0 : 255, r = i < 0 ? -i : i, h = n >> 16, l = n >> 8 & 255, c = 255 & n;
                return s = Math.round((a - h) * r) + h,
                e = Math.round((a - l) * r) + l,
                o = Math.round((a - c) * r) + c,
                "#" + (16777216 + 65536 * s + 256 * e + o).toString(16).slice(1);
            },
            init_related_posts_cta: function() {
                var s = i.RELATED_POSTS_CTA_VARIANTS
                  , e = s[Math.floor(Math.random() * s.length)]
                  , o = t(".related-post-cta.open-in-app");
                if (o.length > 0) {
                    o.text(e.text),
                    o.attr("data-cta-variant", e.variant);
                    var n = this.supports_app_nag ? 2 : 10;
                    t(".related-posts article:nth-child(n+" + (n + 1) + ")").remove();
                }
            },
            init_no_likes_text: function() {
                var s = i.NO_LIKES_VARIANTS
                  , e = s[Math.floor(Math.random() * s.length)]
                  , o = t(".likes-no-likes.content");
                o.length > 0 && o.text(e);
            },
            init_no_posts_text: function() {
                var s = i.NO_POSTS_VARIANTS
                  , e = s[Math.floor(Math.random() * s.length)]
                  , o = t(".posts-no-posts.content");
                o.length > 0 && o.text(e);
            },
            init_no_following_text: function() {
                var s = i.NO_FOLLOWING_VARIANTS
                  , e = s[Math.floor(Math.random() * s.length)]
                  , o = t(".following-no-following.content");
                o.length > 0 && o.text(e);
            }
        }
      , e = function() {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
              window.setTimeout(t, 50);
          };
      }()
      , o = {
          init: function() {
              this.tick = !1,
              this.event_loop();
          },
          event_loop: function() {
              i.$win.on("scroll.Eventor:next-frame", t.proxy(function() {
                  this.tick || (e(t.proxy(this.next_frame, this)),
                  this.tick = !0);
              }, this)),
            t(".notes-wrapper .notes").on("scroll.Eventor:next-frame", t.proxy(function() {
                this.tick || (e(t.proxy(this.popover_frame, this)),
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
      }
      , n = function(i, s) {
          return this instanceof n ? (this.el = "string" == typeof i ? t(i).get(0) : i,
          this.$el = t(i),
          this.options = s,
          this.metadata = this.$el.data("plugin-options"),
          this.config = t.extend({}, n.defaults, this.options, this.metadata),
          this.trigger = this.config.trigger || !1,
          this.$trigger = t(this.config.trigger) || this.$el,
          this.bind_events(),
          this) : new n(i,s);
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
            new n(this,t);
        });
    }
    ;
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
    a.prototype = {
        __window_scroll: function() {
            this.parallax();
        },
        reset_offset: function() {
            this.$el.css({
                transform: "translate3d(0, 0, 0)"
            });
        },
        parallax: function() {
            var t = i.$win.scrollTop()
              , s = Math.round(t * this.inertia);
            if (!(s > 400)) {
                if (this.options.animate_opacity) {
                    var e = t * this.options.opacity_inertia
                      , o = (100 - e) / 100;
                    o < 0 && (o = 0),
                    this.$el.css({
                        opacity: o
                    });
                }
                this.options.animate_position && this.$el.css({
                    transform: "translate3d(0," + s + "px, 0)"
                });
            }
        }
    };
    var r = function(i, s, e) {
        return this instanceof r ? (this.el = "string" == typeof i ? t(i).get(0) : i,
        this.$el = t(i),
        this.config = t.extend({}, r.defaults, s),
        this.callback = e || function() {}
        ,
        this.successes = 0,
        this.errors = 0,
        this.items = [],
        this.get_items(),
        this) : new r(i,s,e);
    };
    r.prototype = {
        get_items: function() {
            this.items = this.el.querySelectorAll(this.config.selector),
            this.items.length || this.callback();
            for (var i = 0, s = this.items.length; i < s; i++)
                this.re_load(t(this.items[i]));
        },
        re_load: function(i) {
            i.on("load", t.proxy(function() {
                this.successes += 1,
                this.done() && this.callback.apply(this);
            }, this)),
            i.on("error", function() {
                this.errors += 1;
            }),
            i.attr({
                src: i.attr("src")
            });
        },
        done: function() {
            return this.items.length === this.successes + this.errors;
        }
    },
    r.defaults = {
        selector: "iframe"
    },
    t.fn.iframesLoaded = function(t, i) {
        return this.each(function() {
            new r(this,t,i);
        });
    }
    ;
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
        this) : new h(i,s);
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
        __popover_mouseenter: function() {
            var t = this.$popover.find(".notes");
            t.length && this._has_overflow(t) && i.$body.addClass("no-scroll");
        },
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
            var e = this.$el.find(this.config.popover)
              , o = this.$el.find(this.config.trigger);
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
    }
    ,
    h.hide_all = function() {
        for (var t = 0; t < this.instances.length; t++)
            this.instances[t].hide(!0);
    }
    ,
    t.fn.popmenu = function(t) {
        return this.each(function() {
            new h(this,t);
        });
    }
    ;
    var l = {
            __popover_scroll: function() {
                i.DONE_LOADING_NOTES && this.unbind_events(),
                this._near_bottom() && !i.LOADING_NOTES && this.load_notes();
            },
            _near_bottom: function() {
                return i.$notesInner[0].scrollHeight - i.$notesInner.scrollTop() < 3 * i.$notes.height();
            },
            init: function() {
                i.LOADING_NOTES = !1,
                this.events = {
                    scroll: t.proxy(this.__popover_scroll, this)
                },
                this.bind_events();
            },
            bind_events: function() {
                i.$win.on("Eventor:scroll:popover", this.events.scroll);
            },
            unbind_events: function() {
                i.$win.off("Eventor:scroll:popover", this.events.scroll);
            },
            load_notes: function() {
                i.LOADING_NOTES || (i.LOADING_NOTES = !0,
                t(".more_notes_link").trigger("click"));
            }
        }
      , c = function(s, e) {
          return this instanceof c ? (this.el = "string" == typeof s ? t(s).get(0) : s,
          this.$el = t(s),
          this.config = t.extend({}, c.defaults, e),
          this.config.$pagination || this.config.$pagination.length ? (this.current_page = this.config.$pagination.data("current-page"),
          this.next_page_number = this.current_page + 1,
          this.total_pages = this.config.$pagination.data("total-pages"),
          this.base_url = this.config.$pagination.attr("href"),
          this.base_url && (this.base_url = this.base_url.substring(0, this.base_url.lastIndexOf("/")) + "/"),
          this.loading_data = !1,
          this.is_scrolling = !1,
          this.body_timeout = -1,
          this.cache_selectors(),
          this.bind_events(),
          this.config.endless_scrolling && this.config.$pagination.length ? (this.config.$pagination.addClass("invisible"),
          this.init = !0) : this.init = !1,
          (i.$body.hasClass("touch") || this.$html.hasClass("lt-ie9")) && (i.GRID_LAYOUT = !1,
          this.is_grid_layout = !1,
          i.$body.removeClass("grid")),
          this.update_body(),
          this.set_body_type(),
          this.updateMedia(),
          i.GRID_LAYOUT || this.update_spotify(),
          i.$body.hasClass("narrow") && this.upscale_images(),
          c.register(this),
          this) : void 0) : new c(s,e);
      };
    c.prototype = {
        __document_keydown: function(s) {
            var e = s.charCode ? s.charCode : s.keyCode
              , o = s ? s.target : window.event.srcElement;
            t(o).is("input:focus") || (27 === e && i.Popmenu.hide_all(),
            190 === e && i.$win_body.animate({
                scrollTop: 0
            }),
            this.is_grid_layout || i.$body.hasClass("permalink") || (74 === e ? this.next_post() : 75 === e && this.previous_post()));
        },
        __window_resize: function() {
            this.set_body_type(),
            this.is_grid_layout || this.update_spotify(),
            this.updateMedia();
        },
        __window_scroll: function() {
            i.$body.hasClass("touch") && this.update_body(),
            this.is_scrolling || (i.$body.addClass("is-scrolling"),
            this.is_scrolling = !0),
            clearTimeout(this.body_timeout),
            this.body_timeout = setTimeout(t.proxy(function() {
                i.$body.removeClass("is-scrolling"),
                this.is_scrolling = !1;
            }, this), 200),
            this.init && this._near_bottom() && !this.loading_data && this.next_page();
        },
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
                var n = s || this
                  , a = +new Date
                  , r = arguments;
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
            var s = i.offset().top
              , e = i.outerHeight()
              , o = s + e;
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
            s || (s = this._set_post_bounds(t)),
            !(s.bottom + this.window_height < e || s.top > o + this.window_height);
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
        _get_next_page: function() {
            this.show_loader();
            var i = t.ajax({
                url: this.base_url + this.next_page_number,
                dataType: "html"
            });
            i.done(t.proxy(this._append_new_items, this)),
            i.fail(t.proxy(this._failed, this));
        },
        _failed: function() {
            this.hide_loader(!0);
        },
        _append_new_items: function(s) {
            var e = t(s).find("#posts > div")
              , o = e.children()
              , n = [];
            o.each(t.proxy(function(i, s) {
                var e = t(s).find(".like_button").data("post-id");
                e && n.push(e);
            }, this)),
            t("#posts > div").append(o),
            this.updateMedia(e),
            n && n.length > 0 && window.Tumblr.LikeButton.get_status_by_post_ids(n),
            window.ga && window.ga("send", "pageview", {
                page: "/page/" + this.next_page_number,
                title: "Index Page -- Ajax Load"
            }),
            this.current_page = this.next_page_number,
            this.next_page_number++,
            i.$win.trigger("next_page_loaded", s);
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
        set_masonry: function() {
            var i = t("#posts")
              , s = i.find("article, .blog-card");
            i.imagesLoaded(t.proxy(function() {
                i.iframesLoaded({
                    selector: ".post-content iframe"
                }, t.proxy(function() {
                    i.masonry({
                        itemSelector: "article, .blog-card",
                        isFitWidth: !0
                    }),
                    this.animate_posts(s);
                }, this));
            }, this)),
            this.is_grid_layout = !0;
        },
        set_related_posts_masonry: function() {
            var i = this.$relatedPosts
              , s = i.find("article");
            i.imagesLoaded(t.proxy(function() {
                i.iframesLoaded({
                    selector: ".post-content iframe"
                }, t.proxy(function() {
                    i.masonry({
                        itemSelector: "article",
                        isFitWidth: !0
                    }),
                    this.animate_posts(s);
                }, this));
            }, this)),
            this.related_posts_is_grid = !0;
        },
        animate_posts: function(i) {
            i.first().fadeTo(250, 1),
            i.length > 0 ? this.animate_timer = setTimeout(t.proxy(function() {
                this.animate_posts(i.slice(1));
            }, this), 25) : clearTimeout(this.animate_timer);
        },
        next_post: function() {
            this.update_post_info();
            for (var t in this.post_positions) {
                var i = this.post_positions[t];
                i > this.current_position + 12 && (i < this.go_to_position || !this.go_to_position) && (this.go_to_position = i);
            }
            this.animate();
        },
        previous_post: function() {
            this.update_post_info();
            for (var t in this.post_positions) {
                var i = this.post_positions[t];
                i < this.current_position - 12 && i > this.go_to_position && (this.go_to_position = i);
            }
            this.animate();
        },
        set_body_type: function() {
            this._slender() && !i.$body.hasClass("following-page") ? (i.$body.addClass("slender").removeClass("grid"),
            i.GRID_LAYOUT && this.is_grid_layout && (this.config.$target.css({
                width: "auto"
            }),
            this.config.$target.masonry("destroy"),
            this.is_grid_layout = !1),
            this.$relatedPosts.removeClass("grid"),
            this.related_posts_is_grid && (this.$relatedPosts.css({
                width: "auto"
            }),
            this.$relatedPosts.masonry("destroy"),
            this.related_posts_is_grid = !1)) : (i.$body.removeClass("slender"),
            (i.GRID_LAYOUT && i.$body.hasClass("index-page") || i.$body.hasClass("following-page")) && (i.$body.addClass("grid"),
            this.set_masonry()),
            i.$body.hasClass("display-related-posts") && i.$body.hasClass("permalink") && (this.$relatedPosts.addClass("grid"),
            this.set_related_posts_masonry()));
        },
        update_body: function() {
            this._near_top() ? (i.$body.addClass("top"),
            i.$body.removeClass("below-header")) : (i.$body.removeClass("top"),
            i.$body.addClass("below-header"));
        },
        update_post_info: function() {
            this.update_post_positions(),
            this.current_position = window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop,
            this.go_to_position = 0;
        },
        update_post_positions: function() {
            var i = {};
            t("#posts article").each(function() {
                var s = t(this).data("post-id");
                i[s] = t(this).offset().top;
            }),
            this.post_positions = i;
        },
        bind_events: function() {
            this.$el.on("Eventor:scroll", t.proxy(this.__window_scroll, this)),
            this.$el.on("resize orientationchange", t.proxy(this._debounce(this.__window_resize, this.config.resizeDelay), this)),
            i.$doc.on("keydown", t.proxy(this.__document_keydown, this));
        },
        update_spotify: function(i) {
            var s = t(".audio_container").width()
              , e = s + 80
              , o = i && i.length ? t(".spotify_audio_player", i) : t(".spotify_audio_player");
            s > 500 ? o.each(function() {
                t(this).css({
                    width: s,
                    height: e
                }),
                t(this).attr("src", t(this).attr("src"));
            }) : o.each(function() {
                t(this).css({
                    width: s,
                    height: 80
                }),
                t(this).attr("src", t(this).attr("src"));
            });
        },
        upscale_images: function(i) {
            var s = i && i.length ? t(".photo figure:not(.high-res)", i) : t(".photo figure:not(.high-res)");
            s.each(function() {
                t(this).data("photo-width") > 420 && t(this).addClass("high-res");
            });
        },
        updateMedia: function(i) {
            var s = ".like_toggle, .twitter-tweet, .tumblr-embed, .tumblr_audio_player, .spotify_audio_player, .instagram-media"
              , e = "iframe:not(" + s + "), object, embed";
            i && i.length || (i = t("#page"));
            var o = i.find(e);
            o.each(function() {
                var i = t(this);
                if (i.data("aspect-ratio"))
                    i.css({
                        height: i.width() * i.data("aspect-ratio") + "px"
                    });
                else {
                    var s = i.attr("height") || i.height()
                      , e = i.attr("width") || i.width()
                      , o = s / e;
                    i.data("aspect-ratio", o),
                    i.is(".photoset") ? i.width(i.parent().width()) : i.css({
                        width: "100%"
                    }),
                    i.css({
                        height: i.width() * o + "px"
                    });
                }
            });
            var n = window.Tumblr && window.Tumblr.LivePhotos && window.Tumblr.LivePhotos.create;
            n && i.find("img[data-live-photo]").map(function(t, i) {
                return n(i);
            });
        },
        next_page: function() {
            return this.total_pages < this.next_page_number ? void this.hide_loader(!0) : (this.loading_data = !0,
            this.show_loader(),
            void this._get_next_page());
        },
        hide_loader: function(t) {
            t && this.config.$pagination.hide(),
            this.config.$loader.removeClass("animate");
        },
        show_loader: function() {
            this.config.$loader.addClass("animate");
        }
    },
    c.instances = [],
    c.defaults = {
        bufferPx: 1e3,
        $pagination: t("#pagination"),
        $loader: t(".loader"),
        resizeDelay: 100,
        scrollDelay: 100,
        $target: t("#posts")
    },
    c.register = function(t) {
        this.instances.push(t);
    }
    ,
    t.fn.pager = function(t) {
        return this.each(function() {
            new c(this,t);
        });
    }
    ,
    i.Utils = s,
    i.Eventor = o,
    i.Popmenu = h,
    i.Parallaxer = a,
    i.Drawer = n,
    i.Pager = c,
    i.NotesPager = l,
    window.tumblrNotesInserted = function() {
        t(".more_notes_link").length ? i.LOADING_NOTES = !1 : i.DONE_LOADING_NOTES = !0;
    }
    ,
    t(function() {
        i.Utils.init(),
        i.Eventor.init();
        var s = t("body");
        s.hasClass("contain-header-image") ? new i.Parallaxer("body:not(.ie10, .touch) .parallax",{
            animate_opacity: !0,
            animate_position: !1
        }) : new i.Parallaxer("body:not(.ie10, .touch) .parallax");
        t("body:not(.touch) #posts").drawer({
            trigger: "article:not(.exposed)"
        }),
        t("#page").popmenu(),
        t(".related-posts-wrapper").popmenu(),
        s.hasClass("permalink") && (t("#page").popmenu({
            container: ".notes-pop-container",
            trigger: "#posts .post-notes",
            popover: ".notes-wrapper",
            hash: "notes",
            close_button: ".notes-wrapper-header-close",
            use_glass: !1,
            glass: ".glass",
            close_on_scroll: !1,
            body_active_class: "popover-active notes-popover",
            ignore: ".more_notes_link"
        }),
        "#notes" === document.location.hash && t("#posts .post-notes").click());
        window.Optica.$win.on("lrec_ads_placeholder_inserted", o),
        window.Optica.$win.on("lrec_ads_loaded", n),
        i.NotesPager.init();
    });
}(window.jQuery, window.Optica);
