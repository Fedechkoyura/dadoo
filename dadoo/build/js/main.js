function oldNo() {
    $('header, main, footer, body > div:not(#how-old)').remove();
}
function oldYes() {
    $('#how-old').addClass('open');
    $('.overlay2').removeClass('open');
    setTimeout(function() {
        $('#how-old').remove();
    }, 500);
}
function loginForgotSuccess() {
    event.preventDefault();
    $('.login__forgot .login__form, .login__forgot .login__links').addClass('close');
    $('.login__forgot-success').addClass('open');
}

$(document).ready(function() {
    $("a[href='#']").click(function(event) {
        event.preventDefault();
    });
    $('.footer__up').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1000);
    });
    var windowWidth = window.innerWidth;
    // Function after risize
    function resizeWIndow(myFunc) {
        myFunc();
        window.addEventListener("resize", resizeThrottler, false);
        var resizeTimeout;

        function resizeThrottler() {
            // ignore resize events as long as an actualResizeHandler execution is in the queue
            if (!resizeTimeout) {
                resizeTimeout = setTimeout(function() {
                    resizeTimeout = null;
                    actualResizeHandler();
                }, 500);
            }
        }

        function actualResizeHandler() {
            if (windowWidth !== window.innerWidth) {
                windowWidth = window.innerWidth;
                myFunc();
            }
        }
    };

    // DEMO
    $('.product__buy').click(function(event) {
        $(this).hide();
        $(this).siblings('.product__number').show();
    });
    // 

    // MENU
    $('.popup__open').click(function(event) {
        console.log('click')
        $('#' + $(this).attr('data-link')).toggleClass('open');
        $('body').addClass('no-scroll');
    });

    function popupClose(){
        $('.popup:not("#login__enter"), .login__forgot-success, .overlay2')
            .removeClass('open');
        $('.login__form, .login__links').removeClass('close');
        $('.login__enter').removeClass('login__enter--hidden');
        $('body').removeClass('no-scroll');
    }
    $('.popup__close').click(popupClose);
    $('.overlay2').click(popupClose);

    $('.login__close-this').click(function(event) {
        $(this).parent().parent().removeClass('open');
        $('#login__enter').removeClass('login__enter--hidden');
    });

    function openClosePopup() {
        if (windowWidth < 1024) {
            $('.popup__open2 > i').click(function(event) {
                $('#' + $(this).parent().attr('data-link')).toggleClass('open');
                $('body').addClass('no-scroll');
            });
        } else {
            $('.popup__open2').unbind('click');
            $('.popup__open').click(function(event) {
                $('.overlay2').addClass('open');
            });
            $('.popup__close-enter').click(function(event) {
                $('#login__enter').addClass('login__enter--hidden');
            });
        }
    }
    resizeWIndow(openClosePopup);

    $('.menu__catalog ul').addClass('menu__links-list');
    $('.menu__links-list').siblings('a').addClass('menu__has-child')

    function menu() {
        if (windowWidth < 1024) {
            $('.menu__catalog > a').click(function(event) {
                if ($(this).parent().children('ul').length) {
                    event.preventDefault();
                    if (!$(this).parent().children('ul').hasClass('open')) {
                        $('.menu__catalog ul').not(this).slideUp(300);
                        $('.menu__catalog ul').not(this).removeClass('open');
                        $('.menu__catalog a').not(this).removeClass('active');
                        $(this).parent().children('ul').slideToggle(300);
                        $(this).parent().children('ul').toggleClass('open');
                        $(this).toggleClass('active');
                    } else {
                        $('.menu__catalog ul').removeClass('open');
                        $('.menu__catalog ul').slideUp(300);
                        $(this).removeClass('active');
                    }
                }
            });
            $('.menu__catalog > ul > li > a').click(function(event) {
                if ($(this).parent().children('ul').length) {
                    event.preventDefault();
                    if (!$(this).parent().children('ul').hasClass('open')) {
                        $('.menu__catalog > ul > li > ul').not(this).slideUp(300);
                        $('.menu__catalog > ul a').not(this).removeClass('active');
                        $(this).parent().children('ul').slideToggle(300);
                        $(this).parent().children('ul').toggleClass('open');
                        $(this).toggleClass('active');
                    } else {
                        $('.menu__catalog > ul > li > ul').removeClass('open');
                        $('.menu__catalog > ul > li > ul').slideUp(300);
                        $(this).removeClass('active');
                    }
                }
            });
        } else {
            $('.menu__catalog > ul > li > a, .menu__catalog > a').unbind('click');
            $('.menu > li').hover(function() {
                if ($(this).children('a').hasClass('menu__has-child')) {
                    $('.overlay').addClass('open');
                }
            }, function() {
                $('.overlay').removeClass('open');
            });
        }
    }
    resizeWIndow(menu);
    // MENU -- END

    // INPUT PLUS $ MINUS
    $('.product__number-minus').click(function() {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.product__number-plus').click(function() {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
    // INPUT PLUS $ MINUS -- END

    // FOOTER NAVIGATION
    function footerNav() {
        if (windowWidth < 1024) {
            $('.footer__nav > ul > li > span').click(function(event) {
                $(this).parent().toggleClass('open');
                $(this).toggleClass('open');
            });
        }
    }
    resizeWIndow(footerNav);
    // 
});