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
      is_touch_device: function() {
        return !!("ontouchstart" in window) || !!window.navigator.msMaxTouchPoints;
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
      }
    },
    e = function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
        window.setTimeout(t, 50);
      };
    }(),
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
    _snooze: function(t) {
      t.addClass("snooze");
    },
    _wake: function(t) {
      t.removeClass("snooze");
    },
    _near_bottom: function() {
      var t = 3;
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
      this.$html = t("html");
    },
    animate: function() {
      this.go_to_position && !this.animating && (this.animating = !0,
        t("html, body").stop().animate({
          scrollTop: this.go_to_position - 10
        }, 250, t.proxy(function() {
          this.animating = !1;
        }, this)));
    },
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
    i.Popmenu = h,
        t(function() {
          var s = t("body");
          t("#page").popmenu();
        });
}(window.jQuery, window.Optica);
