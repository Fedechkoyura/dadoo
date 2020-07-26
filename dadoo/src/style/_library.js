jQuery(document).ready(function($) {
	// Выключаем ссылки с #
    $("a[href='#']") .click(function(event) {
        event.preventDefault();
    });

    $('.top-btn').click(function () { // При клике по кнопке "Наверх" попадаем в эту функцию
      /* Плавная прокрутка наверх */
      $('body, html').animate({
        scrollTop: 0
      });
    });

    // Меню ссылки-якоря (без изминения url)
    $('.anchor').on('click', function(event) {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({scrollTop: $(hash).offset().top - 65}, 900);
    });


    // Срабатывания кода если ширина больше или меньше определенного размера
    var $window = $(window);
    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
    if(windowWidth < 768 ) {
        $(body).toggleClass('no-scroll');
    };


    // Изминения шапки при скролле
    $(window).scroll(function() {
        if ($(this).scrollTop() > 10){
            $('.header').addClass("header--sticky");
        } else {
             $('.header').removeClass("header--sticky");
        }
    });


    // Маска телефона - подключаем плагин 'maskinput.js'
    var tel = document.querySelectorAll('.tel');
    jQuery(function($){
        $(tel).mask("+99(999) 999-9999");
    });


    // Счетчик цифр
    var num = $(".why-we__number");
    num.each(function(indx, el) {
        var max = $(el).data("max");
        var duration = 2000;
        var visibility = checkViewport(el);
        $(el).on("animeNum", function() {
            $({n: 0}).animate({n: max}, {
                easing: "linear",
                duration: duration,
                step: function(now, fx) {
                    $(el).html(now | 0)
                }
            })
        }).data("visibility", visibility);
        visibility && $(el).trigger("animeNum")
    });

    function checkViewport(el) {
    var H = document.documentElement.clientHeight,
        h = el.scrollHeight,
        pos = el.getBoundingClientRect();
        return pos.top + h > 0 && pos.bottom - h < H
    }
    $(window).scroll(function() {
        num.each(function(indx, el) {
            var visibility = checkViewport(el);
            el = $(el);
            var old = el.data("visibility");
            old != visibility && el.data("visibility", visibility) && !old && el.trigger("animeNum")
        })
    });

    // Модальное окно без скрола
    $('html').addClass('no-scroll');

    var curScrollTop = $(window).scrollTop();
    $('html').toggleClass('noscroll').css('top', '-' + curScrollTop + 'px');

    // Счетчик цифр
    var num = $(".why-we__number");
    num.each(function(indx, el) {
      var max = $(el).data("max");
      var duration = 2000;
      var visibility = checkViewport(el);
      $(el).on("animeNum", function() {
          $({n: 0}).animate({n: max}, {
              easing: "linear",
              duration: duration,
              step: function(now, fx) {
                  $(el).html(now | 0)
              }
          })
      }).data("visibility", visibility);
      visibility && $(el).trigger("animeNum")
    });

    function checkViewport(el) {
    var H = document.documentElement.clientHeight,
      h = el.scrollHeight,
      pos = el.getBoundingClientRect();
      return pos.top + h > 0 && pos.bottom - h < H
    }
    $(window).scroll(function() {
      num.each(function(indx, el) {
          var visibility = checkViewport(el);
          el = $(el);
          var old = el.data("visibility");
          old != visibility && el.data("visibility", visibility) && !old && el.trigger("animeNum")
      })
    });

  // Выпадающее меню при клике
  $('.itemsMenu>a').click(function() {
    $('.itemsMenu>a').removeClass('active');
    if ($(this).next('.dropMenu').css("display") == "none") {
      $('.dropMenu').hide('normal');
      $(this).next('.dropMenu').toggle('normal');
      $('.itemsMenu>a').removeClass('active');
      $(this).toggleClass('active');
    } else $('.dropMenu').hide('normal');
    return false;
  });

  // Задержка ссылок
  $('a').click(function (e) {
      var anchor = $(this),
          h;
      h = anchor.attr('href');
      e.preventDefault();
      anchor.animate({
          'opacity': 0
      }, 800, function () {
          window.location = h;
      });
  });
}