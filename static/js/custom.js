(function($){
    "use strict"
    var MORGAN = {};
    $.fn.exists = function () {
        return this.length > 0;
    };

    /*--------------------
        * Header Class
    ----------------------*/
    MORGAN.HeaderSticky = function(){
        $(".navbar-toggler").on("click", function(a) {
            a.preventDefault(), $(".navbar").addClass("fixed-header")
        });
    }

    /*--------------------
    * Pre Load
    ----------------------*/
    MORGAN.WebLoad = function(){
      document.getElementById("loading").style.display = "none"; 
    }

    /*--------------------
        * Menu Close
    ----------------------*/
    MORGAN.MenuClose = function(){
      $(".toggler-menu").on('click', function(){
        $(this).toggleClass('open');
        $('.nav_menu').stop().toggleClass('menu-open');
        $('.nav_menu .navbar-nav').toggleClass('nav-open');
      });
      $('.nav_menu .nav-link').on('click', function() {
       var toggle = $('.toggler-menu').is(':visible');
       if (toggle) {
        $('.toggler-menu').removeClass('open');
         $('.nav_menu').removeClass('menu-open');
         $('.nav_menu .navbar-nav').toggleClass('nav-open');
       }
      });
    }

    /*--------------------
        * Smooth Scroll
    ----------------------*/
    MORGAN.HeaderScroll = function(){
        $('a[href*="#"]:not([href="#"])').on('click', function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
              var target = $(this.hash);
                  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                  if (target.length) {
                    $('html,body').animate({
                      scrollTop: target.offset().top - 87,
                      }, 1000);
                      return false;
                  }
            }
        });
    }

    /*--------------------
        * Header Fixed
    ----------------------*/
    MORGAN.HeaderFixed = function(){
        if ($(window).scrollTop() >= 60) {
           $('.navbar').addClass('fixed-header');
        }
        else {
           $('.navbar').removeClass('fixed-header');
        }
    }

    /*--------------------
        * Tyoe It
    ----------------------*/
    MORGAN.mTypeIt = function() {
      if ($("#type-it").exists()){
      loadScript(plugin_track + 'typeit-master/typeit.min.js', function() {
        if ($("#type-it").exists()){
          new TypeIt('#type-it', {
                  speed: 200,
                  loop:true,
                  strings: [
                    'Designer',
                    'Developer'
                  ],
                  breakLines: false
              }); 
        }
        });
      }
    }

    /*--------------------
        * Progress Bar 
    ----------------------*/
    MORGAN.ProgressBar = function(){
        $(".progress .progress-bar").each(function () {
          var bottom_object = $(this).offset().top + $(this).outerHeight();
          var bottom_window = $(window).scrollTop() + $(window).height();
          var progressWidth = $(this).attr('aria-valuenow') + '%';
          if(bottom_window > bottom_object) {
            $(this).css({
              width : progressWidth
            });
          }
        });
    }

    /*--------------------
    * Counter JS
    ----------------------*/
    var a = 0;
    MORGAN.Counter = function(){
      var oTop = $('.counter-box').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
          $('.count').each(function () {
                $(this).prop('Counter',0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
          a = 1;
        }
    }

    /*--------------------
    * owl Slider
    ----------------------*/
    MORGAN.OwlSlider = function () {
      if ($(".owl-carousel").exists()){
        loadScript(plugin_track + 'owl-carousel/js/owl.carousel.min.js', function() {
          if ($(".owl-carousel").exists()){
            var testimonials_slider = $('#client-slider-single');
            testimonials_slider.owlCarousel({
              loop: true,
              margin: 0,
              nav:false,
              items:1
            });
          }
        });
      }
    }

    /*--------------------
    * Isotope
    ----------------------*/
    MORGAN.MasoNry = function () {
      var portfolioWork = $('.portfolio-content');
      if ($(".portfolio-content").exists()){
        loadScript(plugin_track + 'isotope/isotope.pkgd.min.js', function() {
          if ($(".portfolio-content").exists()){
              $(portfolioWork).isotope({
                resizable: false,
                itemSelector: '.portfolio-item',
                layoutMode: 'masonry',
                filter: '*'
              });
              //Filtering items on portfolio.html
              var portfolioFilter = $('.filter li');
              // filter items on button click
              $(portfolioFilter).on( 'click', function() {
                var filterValue = $(this).attr('data-filter');
                portfolioWork.isotope({ filter: filterValue });
              });
              //Add/remove class on filter list
              $(portfolioFilter).on( 'click', function() {
                $(this).addClass('active').siblings().removeClass('active');
              });
          }
        });
      }
  }

    /* ---------------------------------------------- /*
   * All Functions
  /* ---------------------------------------------- */
    // loadScript
    var _arr  = {};
    function loadScript(scriptName, callback) {
        if (!_arr[scriptName]) {
          _arr[scriptName] = true;
          var body    = document.getElementsByTagName('body')[0];
          var script    = document.createElement('script');
          script.type   = 'text/javascript';
          script.src    = scriptName;
          // then bind the event to the callback function
          // there are several events for cross browser compatibility
          // script.onreadystatechange = callback;
          script.onload = callback;
          // fire the loading
          body.appendChild(script);
        } else if (callback) {
          callback();
        }
    };

    // Window on Load
    $(window).on("load", function(){
      MORGAN.WebLoad();
    });

    // Document On Ready
    $(document).on("ready", function(){
        MORGAN.OwlSlider(),
        MORGAN.MenuClose(),
        MORGAN.Counter(),
        MORGAN.ProgressBar(),
        MORGAN.mTypeIt(),
        MORGAN.HeaderScroll(),
        MORGAN.MasoNry(),
        MORGAN.HeaderSticky();
    });

    // Document on scroll
    $(window).on("scroll", function(){
        MORGAN.Counter(),
        MORGAN.ProgressBar(),
        MORGAN.HeaderFixed();
    });

})(jQuery);


