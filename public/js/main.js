jQuery(function ($) {
  var nav = {
    elements: {
      controller: $('.controller'),
      switchInput: $('.switch-input')
    },
    init: function () {
      var els = this.elements;
      els.controller.on('click', this.onControllerClick);
      els.switchInput.on('change', this.onSwitchInputChange);
    },
    onControllerClick: function (e) {
      var $target = $(e.target),
          slideIndex = $target.data('slide-index');

      if (typeof slideIndex === 'number') {
        // add active class to controller button
        $target.addClass('active');
        // change slide
        slider.elements.slider.slick('slickGoTo', slideIndex);
        // activate switch in new slide
        nav.elements.switchInput.within('[data-slick-index=' + slideIndex + ']')[0].checked = true;
      }
    },
    onSwitchInputChange: function (e) {
      // hide scroll bar
      $(e.target).closest('.switch').next('.outer').css('overflow-y', 'hidden');

      // change slide
      slider.elements.slider.slick('slickGoTo', slider.landingSlide);

      // animate switch
      e.target.checked = false;

      // remove active class from controller buttons
      nav.elements.controller.find('.button').removeClass('active');
    }
  };

  var slider = {
    elements: {
      slider: $('#slider'),
      slides: $('.slide'),
      slidesAndHalfs: $('.slide, .half')
    },
    options: {
      arrows: false,
      draggable: false,
      swipe: false,
      touchMove: false,
      dots: false,
      infinite: false,
      initialSlide: 1,
      speed: 300,
      lazyLoad: 'progressive'
    },
    landingSlide: 1, // remove hard coding
    viewedSlides: [],
    init: function () {
      var self = this,
          els = this.elements;

      // init slick
      els.slider.slick(self.options);

      // full page slides
      els.slides.height($(window).height());

      els.slides.show();

      // full page slides clones
      setTimeout(function () {
        els.clones = $('.slick-cloned');
        els.clones.height($(window).height());
      }, 1000);

      // full page slides on resize
      $(window).resize(function () {
        els.slides.height($(window).height());
      });

      // slider events
      els.slider.on('afterChange', self.onAfterChange);
    },
    onAfterChange: function (e, slick, currentSlide) {
      var self = slider,
          viewedSlides = self.viewedSlides;

      viewedSlides[currentSlide] = true;

      if (currentSlide !== self.landingSlide) {
        var $currentSlide = self.elements.slides.filter('[data-slick-index=' + currentSlide + ']');
        $currentSlide.find('.outer').css('overflow-y', 'auto');
        if (viewedSlides[0] && viewedSlides[2]) {
          // show main overlay
        }
      }
    }
  };

  // initialize application
  app = {
    init: function () {
      nav.init();
      slider.init();
    },
    nav: nav,
    slider: slider
  };

  app.init();
});

$.fn.within = function (parent) {
  return this.filter(function () {
    return $(this).closest(parent).length;
  });
};


// Video
////////
$( document ).ready(function() {
  scaleVideoContainer();

  //initBannerVideoSize('.video-container .poster img');
  initBannerVideoSize('.video-container .filter');
  initBannerVideoSize('.video-container video');

  $(window).on('resize', function() {
    scaleVideoContainer();
    //scaleBannerVideoSize('.video-container .poster img');
    scaleBannerVideoSize('.video-container .filter');
    scaleBannerVideoSize('.video-container video');
  });
});

function scaleVideoContainer() {
  var height = $(window).height();
  var unitHeight = parseInt(height) + 'px';
  $('.homepage-hero-module').css('height',unitHeight);
}

function initBannerVideoSize(element){
  $(element).each(function(){
    $(this).data('height', $(this).height());
    $(this).data('width', $(this).width());
  });

  scaleBannerVideoSize(element);
}

function scaleBannerVideoSize(element){
  var windowWidth = $(window).width(),
  windowHeight = $(window).height(),
  videoWidth,
  videoHeight;

  $(element).each(function(){
    var videoAspectRatio = $(this).data('height')/$(this).data('width');

    $(this).width(windowWidth);

    videoHeight = windowHeight;
    videoWidth = videoHeight / videoAspectRatio;
    $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

    $(this).width(videoWidth).height(videoHeight);

    $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
  });
}
