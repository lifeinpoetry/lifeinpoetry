            (function($) {
                $( window ).on( "load", function() {
                    $("iframe.photoset").load( function() {
                        $("iframe.photoset").contents().find("head")
                            .append($("<style type='text/css'>.photoset .photoset_row:first-child img {border-radius: 3px 3px 0 0;} .photoset .photoset_row:last-child img{border-radius: 0 0 3px 3px;}  <\/style>"));
                    });
                });
                
                $( window ).on( "load", function() {
   function removeFrameBorder(){
                        $('iframe').removeAttr('frameborder');
                        $('iframe').removeAttr('scrolling');
                        $('div.like_button iframe').attr('style', 'background-color:transparent;').removeAttr('allowtransparency');
                        $('iframe[name="unified-controls"]').attr('title', 'Tumblr controls');
                        $('div.like-control iframe').attr('title', 'Like button');
                        $("iframe[id='ga_target']").attr('title', 'Google Analytics');
   };
                    $("body").removeClass('tmblr-iframe-full-width');
                
                    $("iframe.tmblr-iframe--unified-controls").load( function() {
                        $("body").removeClass('tmblr-iframe-full-width');
                    });
                       window.setTimeout( removeFrameBorder, 5000 ); // 5 seconds
                    
                    $("body").removeClass('tmblr-iframe-full-width');
                });
                
                $( 'html' ).attr('lang', 'en');
            })(window.jQuery);
