(function ($) {
    "use strict";

    var promoVision = {

        /* ============================================================ */
        /* PRELOADER
        /* ============================================================ */
        preloader: function(){
            $(window).on('load', function() {
                $(".preloader").fadeOut();     
            });
        },
        
        /* ============================================================ */
        /* StickyHeader
        /* ============================================================ */
        sticky_header: function() {
            var fixed_top = $(".header");
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 30) {
                    fixed_top.addClass("sticky");
                } else {
                    fixed_top.removeClass("sticky");
                }
            });
        },

        /* ============================================================ */
        /* Jquery Plugins Calling
        /* ============================================================ */
        onePageFunction: function(){
            $('header .menu a[href*="#"]:not([href="#"])').on('click', function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                    if (target.length) {
                        $('html,body').animate({
                          scrollTop: target.offset().top - 150,
                        }, 100);
                        return false;
                    }
                }
            });
        },

        /* ============================================================ */
        /* Mobile Menu Integration
        /* ============================================================ */
        mobile_menu: function() {
            //Clone Mobile Menu
            function cloneMobileMenu($cloneItem, $mobileLoc) {
                var $combinedmenu = $($cloneItem).clone();
                $combinedmenu.appendTo($mobileLoc);                
            }
            cloneMobileMenu("header .nav-menu .menu", ".mobile-menu .menu");

            function mobile_menu(selector, actionSelector) {
                var mobile_menu = $(selector);
                mobile_menu.on("click", function() {
                    $(selector).toggleClass('is-menu-open');
                });
                
                var hamburgerbtn = $(selector);
                hamburgerbtn.on("click", function() {
                    $(actionSelector).toggleClass('is-menu-open');
                });
        
                $(document).on('click', function(e) {
                    var selectorType = $(actionSelector).add(mobile_menu);
                    if (selectorType.is(e.target) !== true && selectorType.has(e.target).length === 0) {
                        $(actionSelector).removeClass("is-menu-open");
                        $(selector).removeClass("is-menu-open");
                    }          
                });
            
            };
            mobile_menu('.toggler-menu, .close-menu', '.mobile-menu');            
        },

        /* ============================================================ */
        /* Owl Carousel
        /* ============================================================ */
        owlCarousel: function () {
            var $heroBanner = $('.hero-slider');
            if ($heroBanner.length) {
                $heroBanner.owlCarousel({
                    loop: true,
                    items: 1,
                    dots: !1,
                    autoplay: 1,
                    autoplayTimeout: 5000,
                    autoplaySpeed: 700,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn',
                });                
            };
            var $serviceSlider = $('.service-slider');
            if ($serviceSlider.length) {
                $serviceSlider.owlCarousel({
                    loop: true,
                    items: 1,
                    dots: !1,
                    autoplay: 1,
                    margin: 20,
                    autoplayTimeout: 5000,
                    autoplaySpeed: 700,
                    autoHeight:true,
                    responsive: {
                        480: {
                            items: 2,
                        },
                        576: {
                            items: 3,
                        },
                        1360: {
                            items: 4,
                        },
                    }
                });                
            };
            var $clientSlider = $('.client-carousel');
            if ($clientSlider.length) {
                $clientSlider.owlCarousel({
                    loop: true,
                    items: 2,
                    dots: !1,
                    autoplay: 1,
                    margin: 10, 
                    autoplayTimeout: 5000,
                    autoplaySpeed: 700,
                    responsive: {
                        480: {
                            items: 3,
                        },
                        576: {
                            items: 4,
                        },
                        1200: {
                            items: 5,
                        },
                    }
                });                
            };

        },

        /* ============================================================ */
        /* Scroll Top
        /* ============================================================ */
        scroll_to_top: function() {
            $('body').append(
                "<a href='#top' title='Scroll Top' id='scroll-top' class='topbutton btn-hide'><i class='flaticon-right-arrow-2'></i></a>"
            );
            var $scrolltop = $('#scroll-top');
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > $(this).height()) {
                    $scrolltop.addClass('btn-show').removeClass('btn-hide');
                } else {
                    $scrolltop.addClass('btn-hide').removeClass('btn-show');
                }
            });
            $("a[href='#top']").on('click', function () {
                $('html, body').animate(
                    {
                        scrollTop: 0,
                    },
                    'normal'
                );
                return false;
            });
        },

        
        /* ============================================================ */
        /* Background Image
        /* ============================================================ */
        background_image: function() {
            $("[data-bg-color], [data-bg-image]").each(function() {
                var $this = $(this);               
    
                if(  $this.attr("data-bg-color") !== undefined ){                        
                    $this.css("background-color", $this.attr("data-bg-color") );
                }
                if( $this.attr("data-bg-image") !== undefined ){
                    $this.css("background-image", "url("+ $this.attr("data-bg-image") +")" );    
                    $this.css("background-size", $this.attr("data-bg-size") );
                    $this.css("background-repeat", $this.attr("data-bg-repeat") );
                    $this.css("background-position", $this.attr("data-bg-position") );
                    $this.css("background-blend-mode", $this.attr("data-bg-blend-mode") );
                }
            });
        },

        /* ============================================================ */
        /* ISOTOP
        /* ============================================================ */
        isotopGallery: function() {
            $(window).on("load resize",function(e){ 
                var $container = $('.portfolio-wrapper'),
                isotope = function () {
                    $container.isotope({
                        resizable: true,
                        itemSelector: '.item',
                        layoutMode: 'packery',
                        hiddenStyle: {
                            transform: 'scale(.2) skew(30deg)',
                            opacity: 0
                        },
                        visibleStyle: {
                            transform: 'scale(1) skew(0deg)',
                            opacity: 1,
                        },
                        transitionDuration: '.5s',
                    });
                };
                isotope(); 
            }); 
        },

        initialize: function() {
			promoVision.preloader();
			promoVision.onePageFunction();
			promoVision.mobile_menu();
			// promoVision.scroll_to_top();
			promoVision.owlCarousel();
			promoVision.background_image();
			promoVision.isotopGallery();
		}
    };
    $(function() {
		promoVision.initialize();
	});
})(jQuery);