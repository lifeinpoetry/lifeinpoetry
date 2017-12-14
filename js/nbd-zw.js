(function($) {
    if ( $("meta[property='og:description']").length )
    {
        $("meta[property='og:description']").attr("content", $("meta[property='og:description']").attr("content").replace(/<br>|\n/g, " &#47; ") );
    }

    if ( $("meta[charset='UTF-8']").length )
    {
        $("meta[charset='UTF-8']").detach().prependTo("html > head");
    }

    $("script[type='application/javascript']").attr("type", "text/javascript");

    if ( $("[language='javascript']").length )
    {
        $("[language='javascript']").attr("type", "text/javascript").removeAttr("language");
    }

    if ( $("script[type='text/javascript']"))
    {
        $("script[type='text/javascript']").attr("type", "text/javascript").removeAttr("language");
    }

    $("script:not([language]):not([type])").attr("type", "text/javascript");

    if ( $("link[rel='alternate'][type='application/json+oembed']").length )
    {
        $("link[rel='alternate'][type='application/json+oembed']").attr("title", $("link[rel='alternate'][type='application/json+oembed']").attr("title").replace(/br|\n/g, " &#47; ") );
    }

    if ( $("meta[property='og:title']").length )
    {
        $("meta[property='og:title']").attr("content", $("meta[property='og:title']").attr("content").replace(/<br>|\n/g, " &#47; ") );
    }

    $("b").replaceWith(function() {
        return $("<strong>").html($(this).html());
    });

    $("i").replaceWith(function() {
        return $("<em>").html($(this).html());
    });

    var htmlJsHeadline = "";
    var jsHeadline = "";
    var postJsHeadlineLength = 0;

    if ( postPostType == "quote" )
    {
        $("h1.source").html ( $.trim( $("h1.source").html().replace( /^\s*(?:<br\s*\/?\s*>)+|(?:<br\s*\/?\s*>)+\s*$/gi, "" ) ) );

        htmlJsHeadline = $("h1.source").html();
        htmlJsHeadline = htmlJsHeadline.replace( ",<\/strong> from", ",<\/strong>").replace( ",” published in", ",”");

        jsHeadline = $.trim( he.decode(  $( "<div>" + htmlJsHeadline + "<\/div>" ).text() ) );

        $("input[name='permalink-input-']" + postPostId ).attr("title", "Permalink to " + jsHeadline );

        if ( jsHeadline.length )
        {
            completeJsHeadline = jsHeadline + postJsHeadline;

            if ( postJsHeadline.length && completeJsHeadline.length > 67 )
            {
                postJsHeadlineLength = 67 - postJsHeadline.length;
                clippedJsHeadline = jsHeadline.substr( 0, postJsHeadlineLength );

                if ( completeJsHeadline.length > 66 )
                {
                    completeJsHeadline = clippedJsHeadline + "…" + postJsHeadline;
                }
            }

            $("title").text( completeJsHeadline );

            $(".blog-title").replaceWith($("<h2 class='blog-title'>" + $(".blog-title").html() + "</h2>"));
        }
    } else {
        if ( $("article.text").length  )
        {
            if ( $("article.text").find( "h1" ).length > 0 )
            {
                var headElement = $(".blog-title");
                var headlineElement = $("article.text blockquote + p > b").parent();

                if ( headlineElement.length )
                {
                    $("article.text blockquote + p > b").parent().detach().prependTo("article header.post-header").wrap( "<h1 class='new-headline'></h1>" ).find("b").unwrap();

                    $("article h1.new-headline").html( $.trim( $("h1.source").html().replace( /^\s*(?:<br\s*\/?\s*>)+|(?:<br\s*\/?\s*>)+\s*$/gi, "" ) ) );

                    htmlJsHeadline = $("article h1.new-headline").html();
                    htmlJsHeadline = htmlJsHeadline.replace( ",<\/strong> from", ",<\/strong>").replace( ",” published in", ",”");

                    jsHeadline = $.trim( he.decode(  $( "<div>" + htmlJsHeadline + "<\/div>" ).text() ) );

                    $("input[name='permalink-input-']" + postPostId ).attr("title", "Permalink to " + jsHeadline );

                    if ( jsHeadline.length )
                    {
                        completeJsHeadline = jsHeadline + postJsHeadline;

                        if ( postJsHeadline.length && completeJsHeadline.length > 67 )
                        {
                            postJsHeadlineLength = 67 - postJsHeadline.length;
                            clippedJsHeadline = jsHeadline.substr( 0, postJsHeadlineLength );

                            if ( completeJsHeadline.length > 66 )
                            {
                                completeJsHeadline = clippedJsHeadline + "…" + postJsHeadline;
                            }
                        }
                        $("title").text( completeJsHeadline );
                    }

                    $(".blog-title").replaceWith($("<h2 class='blog-title'>" + $(".blog-title").html() + "</h2>"));
                }
            }
        }
    }

    var isofixed = "";

    if ( postTypePage == "index" )
    {
        isoFixed = moment.unix( postPostTimestamp ).utc().format();

        if ( isoFixed != null && isoFixed != "" )
        {
            if ( $("meta[property='og:updated_time']").length )
            {
                $("meta[property='og:updated_time']").attr("content", isoFixed);
            }

            if ( $("time").length )
            {
                $("time").attr("datetime", isoFixed);
            }
        }
    } else if ( postTypePage == "permalink" ) {
        isoFixed = moment.unix( postPostTimestamp ).utc().format();

        if ( isoFixed != null && isoFixed != "" )
        {
            if ( $("meta[property='article:modified_time']").length )
            {
                $("meta[property='article:modified_time']").attr("content", isoFixed);
            }

            if ( $("meta[property='article:published_time']").length )
            {
                $("meta[property='article:published_time']").attr("content", isoFixed);
            }

            if ( $("meta[property='og:updated_time']").length )
            {
                $("meta[property='og:updated_time']").attr("content", isoFixed);
            }

            if ( $("time").length )
            {
                $("time").attr("datetime", isoFixed);
            }
        }
    }

    $("iframe.tmblr-iframe--controls").each(function () {
        //Using closures to capture each one
        var iframe = $(this);
        iframe.on("load", function () { //Make sure it is fully loaded
            iframe.contents().click(function (event) {
                iframe.trigger("click");
            });
        });

        iframe.click(function () {
            if ( $(this).is("a") )
            {
                var outboundHref = $(this).attr("href");
                if ( outboundHref == "https://www.tumblr.com/register/follow/lifeinpoetry" ) {
                    ga("send", "event", {
                        eventCategory: "Tumblr Events",
                        eventAction: "click",
                        eventLabel: "New Tumblr User Follow",
                        transport: "beacon",
                        eventValue: 1
                    });
                } else if ( outboundHref == "https://www.tumblr.com/?referring_blog=lifeinpoetry" ) {
                    ga("send", "event", {
                        eventCategory: "Tumblr Events",
                        eventAction: "click",
                        eventLabel: "New Tumblr User",
                        transport: "beacon",
                        eventValue: 1
                    });
            } else if ( $(this).hasClass("dashboard-button") ) {
                ga("send", "event", {
                    eventCategory: "Tumblr Message",
                    eventAction: "click",
                    eventLabel: "Dashboard",
                    transport: "beacon",
                    eventValue: 1
                });
                } else if ( $(this).hasClass("message-button") ) {
                    ga("send", "event", {
                        eventCategory: "Tumblr Events",
                        eventAction: "click",
                        eventLabel: "Message",
                        transport: "beacon",
                        eventValue: 1
                    });
                }
            } else if ( $(this).is( "span.tx-button") ) {
                outboundHref = $(this).attr("href");
                if ( $(this).hasClass("subscribe-button") ) {
                    ga("send", "event", {
                        eventCategory: "Tumblr Events",
                        eventAction: "click",
                        eventLabel: "Subscribe",
                        eventValue: 1
                    });
                } else if ( $(this).hasClass("follow-button") ) {
                    ga("send", "event", {
                        eventCategory: "Tumblr Events",
                        eventAction: "click",
                        eventLabel: "Follow",
                        eventValue: 1
                    });
                } else if ( $(this).hasClass("unfollow-button") ) {
                    ga("send", "event", {
                        eventCategory: "Tumblr Events",
                        eventAction: "click",
                        eventLabel: "Unfollow",
                        eventValue: -1
                    });
                }
            } else if ( $(this).is( "span.button-label") ) {
                var parentSleepwalkingSpan = $(this).parent();
                if ( parentSleepwalkingSpan.hasClass("subscribe-button") ) {
                    ga("send", "event", {
                        eventCategory: "Tumblr Events",
                        eventAction: "click",
                        eventLabel: "Subscribe",
                        eventValue: 1
                    });
                } else if ( parentSleepwalkingSpan.hasClass("follow-button") ) {
                    ga("send", "event", {
                        eventCategory: "Tumblr Events",
                        eventAction: "click",
                        eventLabel: "Follow",
                        eventValue: 1
                    });
                } else if ( parentSleepwalkingSpan.hasClass("unfollow-button") ) {
                    ga("send", "event", {
                        eventCategory: "Tumblr Events",
                        eventAction: "click",
                        eventLabel: "Unfollow",
                        eventValue: -1
                    });
                }
            }
        });
    });
    
     $("#sidebar-two a.open").click(function (e) {
        var popup = $(".pop-menu:visible");

        if ( $( this ).hasClass( "selected" ) ) {
            e.preventDefault();
            popup.hide(500);
            popup.removeClass( "pop-add" );
            $( this ).removeClass( "selected" );
        } else {
            e.preventDefault();
            $( this ).addClass( "selected" );
            var doPopup = $( this ).parent( "li" ).children( ".pop-menu" );
            doPopup.show(500);
            doPopup.addClass( "pop-add" );
        }
    });

    $(document).mouseup(function (e) {
        var popup = $(".pop-menu:visible");

        if ( !$("#sidebar-two a.open").is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
            popup.hide(500);
            popup.removeClass( "pop-add" );
            $("#sidebar-two a.open").removeClass( "selected" );
        }
    });

    $( ".post-controls .control .share" ).click(function(e) {
        e.preventDefault();
        var articlePop = $( this ).parents("article");
        var dataPostId = articlePop.attr("data-post-id");
        $("#share_" + dataPostId).show( "slow", function() {
        });
    });

    $(document).mouseup(function (e) {
        var popup = $(".share-menu:visible");

        if (!$(".post-controls .control .share").is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
            popup.hide(500);
        }
    });

    $( ".permalink-submit" ).click(function(e) {
        e.preventDefault();
    });

    var mywindow = $(window);
    var mypos = mywindow.scrollTop();
    var up = false;
    var newscroll;

    mywindow.scroll(function () {
        newscroll = mywindow.scrollTop();

        if (newscroll > mypos && ( ( newscroll - mypos) > 10 ) && !up) {
            $(".pop-menu:visible").removeClass("pop-add").stop().slideUp();
            $(".share-menu:visible").stop().slideToggle();
            up = !up;
        } else if(newscroll < mypos && ( ( mypos - newscroll ) > 10 ) && up) {
            $(".pop-menu:visible").removeClass("pop-add").stop().slideUp();
            $(".share-menu:visible").stop().slideToggle();
            up = !up;
        }

        mypos = newscroll;
    });

    $(".permalink-form input").click(function(e) {
        $( this ).select();
    });

    $(".permalink-form label").click(function(e) {
        $( this ).parents( ".permalink-form" ).find("input").select();
    });

    $( window ).on( "load", function() {
        $("iframe.photoset").load( function() {
            $("iframe.photoset").contents().find("head").append( $("<style type='text/css'>.photoset .photoset_row:first-child img {border-radius: 3px 3px 0 0;} .photoset .photoset_row:last-child img{border-radius: 0 0 3px 3px;}  <\/style>"));
        });

        $("body").removeClass("tmblr-iframe-full-width");
        $("iframe.tmblr-iframe--unified-controls").load( function() {
            $("body").removeClass("tmblr-iframe-full-width");
        });
        
        $("body").removeClass("tmblr-iframe-full-width");
    });

    $( "html" ).attr("lang", "en");
    
   function unwrap_p(){
      $("p").find("p").unwrap();
      $("p:empty").remove();
   };
   window.setTimeout( unwrap_p, 5000 ); // 5 seconds
})(window.jQuery);
