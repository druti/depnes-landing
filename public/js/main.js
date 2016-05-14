(function ($) {
  // initialize application
  var app = {
    nav: {
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
        var $target = $(e.target);
        var slideIndex = $target.data('slide-index');

        if (typeof slideIndex === 'number') {
          // add active class to controller button
          $target.addClass('active');
          // change slide
          app.slider.elements.slider.slick('slickGoTo', slideIndex);
          // activate switch in new slide
          app.nav.elements
            .switchInput
            .within('[data-slick-index=' + slideIndex + ']')[0].checked = true;
        }
      },

      onSwitchInputChange: function (e) {
        // change slide
        app.slider.elements.slider.slick('slickGoTo', app.slider.landingSlide);

        // animate switch
        e.target.checked = false;

        // remove active class from controller buttons
        app.nav.elements.controller.find('.button').removeClass('active');
      }
    },


    slider: {
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

      landingSlide: 1,

      onBeforeChange: function (e, slick, cS, nS) {
        slick.$slides.eq(cS).css('opacity', 0);
        slick.$slides.eq(nS).css('opacity', 1);
      },

      init: function () {
        var els = this.elements;

        // init slick
        els.slider.slick(this.options);

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

        els.slider.on('beforeChange', this.onBeforeChange);
      }
    },


    init: function () {
      this.nav.init();
      this.slider.init();
    }
  };

  app.init();
}(jQuery));

$('form').on('submit', function (e) {
  var $target = $(e.target);

  var email = $target.find('[type="email"]').val();
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  if (!re.test(email)) {
    e.preventDefault();
    $('.callout').remove();
    $('body').prepend('<div class="alert callout"><p>Please provide a valid email.</p></div>');
  }
});

$.fn.within = function (parent) {
  return this.filter(function () {
    return $(this).closest(parent).length;
  });
};
