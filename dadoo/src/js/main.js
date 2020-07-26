function oldNo(){
    $('header, main, footer, body > div:not(#how-old)').remove();
}
function oldYes(){
    $('body').removeClass('no-scroll');
    $('#how-old').css('transform', 'translateX(100vw)');
    setTimeout(function() {
        $('#how-old').remove();
    }, 500);
}

$(document).ready(function() {
    $("a[href='#']").click(function(event) {
        event.preventDefault();
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

    // MENU
    function openClosePopup() {
        if (windowWidth < 992) {
            $('.popup__open').unbind('click');
            $('.popup__open').click(function(event) {
                console.log('click')
                $('#' + $(this).attr('data-link')).toggleClass('open');
                $('body').toggleClass('no-scroll');
            });

            $('.popup__close').click(function(event) {
                $('.popup').removeClass('open');
                $('body').removeClass('no-scroll');
            });

            $('.login__close-this').click(function(event) {
                $(this).parent().parent().removeClass('open');
            });
        } else {
            $('.popup__open').unbind('click');
        }
    }
    resizeWIndow(openClosePopup);

    $('.menu__catalog ul').addClass('menu__links-list');
    $('.menu__links-list').siblings('a').addClass('menu__has-child')

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
    // MENU -- END

    // INPUT PLUS $ MINUS
    $('.number__minus').click(function() {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.number__plus').click(function() {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
    // INPUT PLUS $ MINUS -- END
});