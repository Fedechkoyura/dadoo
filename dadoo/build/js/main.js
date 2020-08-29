function oldNo() {
    $('header, main, footer, body > div:not(#how-old)').remove();
}

function oldYes() {
    $('#how-old').addClass('close');
    $('.overlay--how-old').removeClass('open');
    $('body').removeClass('no-scroll');
    setTimeout(function() {
        $('#how-old').remove();
        $('.overlay--how-old').remove();
    }, 500);
}

function loginForgotSuccess() {
    event.preventDefault();
    $('.login__forgot .login__form, .login__forgot .login__links').addClass('close');
    $('.login__forgot-success').addClass('open');
}

function videoSendSuccess() {
    event.preventDefault();
    $('.cart__download-form').addClass('close');
    $('.cart__download-success').addClass('open');
    setTimeout(function() {
        $('.cart__download-form').removeClass('close');
        $('.cart__download-success').removeClass('open');
    }, 4000);
}

function accountMessageSuccess() {
    event.preventDefault();
    let valueTextareaa = $('.account__message-form textarea').val();
    if (valueTextareaa.length < 1) {
        $('.account__message-form .input').addClass('input--error');
    } else {
        $('.account__message-success').addClass('open');
        setTimeout(function() {
            $('.account__message-form textarea').val('');
            $('.account__message-success').removeClass('open');
            $('.account__message-form .input').removeClass('input--error');
        }, 3000);
    }
}

$(document).ready(function() {
    let windowWidth = window.innerWidth;
    // Function after risize
    function resizeWIndow(myFunc) {
        myFunc();
        window.addEventListener("resize", resizeThrottler, false);
        let resizeTimeout;

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
    $("a[href='#']").click(function(event) {
        event.preventDefault();
    });
    // Меню ссылки-якоря (без изминения url)
    $('.anchor').on('click', function(event) {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({ scrollTop: $(hash).offset().top - 65 }, 900);
    });
    // Кнопка наверх
    $('.footer__up').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1000);
    });

    function showBtnUp() {
        if ($(this).scrollTop() > 200) {
            $('.footer__up').addClass("show");
        } else {
            $('.footer__up').removeClass("show");
        }
    }
    showBtnUp();
    $(window).scroll(showBtnUp);
    // DEMO
    $('.product__buy').click(function(event) {
        $(this).fadeOut(0);
        $(this).siblings('.product__number').fadeIn(400);
    });
    // 

    // MENU
    $('.popup__open').click(function(event) {
        $('#' + $(this).attr('data-link')).toggleClass('open');
        $('body').addClass('no-scroll');
    });

    function popupClose() {
        $('.popup:not("#login__enter"), .login__forgot-success, .overlay2')
            .removeClass('open');
        $('.login__form, .login__links').removeClass('close');
        $('.login__enter').removeClass('login__enter--hidden');
        $('body').removeClass('no-scroll');
    }
    $('.popup__close').click(popupClose);
    $('.overlay2').click(popupClose);

    // Account messages
    let allMessages = document.querySelectorAll('.header__message');
    let overlayMessage = document.querySelector('.overlay--message');
    for (var i = 1; i <= allMessages.length; i++) {
        if (i === allMessages.length) {
            let lastCloseBtn = allMessages[0].querySelector('.header__popup-close');
            lastCloseBtn.addEventListener('click', function() {
                overlayMessage.classList.remove('open');
            })
        }
    }
    // 

    $('.login__close-this').click(function(event) {
        $(this).parent().parent().removeClass('open');
        $('#login__enter').removeClass('login__enter--hidden');
    });

    $('.header__message-close').click(function(event) {
        let myThis = $(this);
        myThis.parent().parent().css('opacity', '0');
        setTimeout(function() {
            myThis.parent().parent().remove();
        }, 300);
    });

    $('.input--error').click(function(event) {
        $(this).removeClass('input--error');
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
    $('.product__number-minus, .cart__number-minus').click(function(event) {
        event.preventDefault();
        let $input = $(this).parent().find('input');
        let count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.product__number-plus, .cart__number-plus').click(function(event) {
        event.preventDefault();
        let $input = $(this).parent().find('input');
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

    // CATEGORY TEXT
    let textHeightSmall;

    function setSmallHeight() {
        if (windowWidth < 768) {
            textHeightSmall = '120px';
        } else if (windowWidth < 1280) {
            textHeightSmall = '144px';
        } else if (windowWidth < 1900) {
            textHeightSmall = '144px';
        } else {
            textHeightSmall = '175px';
        }
    }
    $('.page-desc__btn-show').click(function(event) {
        setSmallHeight();
        let textHeight = $('.page-desc__content').height();
        $('.page-desc').css('height', textHeight + 40 + 'px');
        $('.page-desc').toggleClass('open');
        $('.page-desc__btn-item').fadeToggle(0);
        console.log(textHeightSmall)
    });
    $('.page-desc__btn-hide').click(function(event) {
        setSmallHeight();
        $('.page-desc').css('height', textHeightSmall);
        $('.page-desc__btn-item').fadeToggle(0);
        $('.page-desc').toggleClass('open');
        console.log(textHeightSmall)
    });
    // 

    // CATEGORY SORT
    $('.category__list-sort-links a').click(function(event) {
        let choosedSort = $(this).text();
        console.log(choosedSort);
        $('.category__list-sort-picked span').text(choosedSort);
    });
    // 

    // Product tabs
    $('.cart__tabs a').click(function(event) {
        event.preventDefault();
        $('.cart__tabs a').not(this).removeClass('active');
        $(this).addClass('active');
        var idContent = $(this).attr('href');
        $('.cart__tabs-item').removeClass('active');
        $(idContent).addClass('active');
    });

    // Product Video
    if ($('.cart__video').length) {
        var tag = document.createElement('script');
        tag.src = "https://youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)

        var initPlayer = function(element) {
            var player = element.querySelector('.cart__video-iframe');
            var button = element.querySelector('.cart__video-play');
            var ytplayer = new YT.Player(player, {
                playerVars: {
                    'autoplay': 0,
                    'modestbranding': 1,
                    'controls': 1,
                    'rel': 0,
                    'enablejsapi': 1,
                    'showinfo': 0,
                    'host': 'https://www.youtube.com',
                    'origin': window.location.host
                },
                videoId: element.dataset.id
            });

            button.addEventListener('click', function() {
                // console.log(ytplayer);
                // console.log(ytplayer.getPlayerState());
                ytplayer.playVideo();
                switch (ytplayer.getPlayerState()) {
                    case 1:
                        button.classList.remove('cart__video-play--hidden');
                        ytplayer.pauseVideo();
                        break;
                    default:
                        button.classList.add('cart__video-play--hidden');
                        ytplayer.playVideo();

                        break;
                }
            });

            var img = element.querySelector(".cart__video-img");
            img.src = "http://img.youtube.com/vi/" + element.dataset.id + "/0.jpg";
        };

        var swiper_youtube = new Swiper('.cart__video-list', {
            slidesPerView: 'auto',
            spaceBetween: 7,
            freeMode: true,
            grabCursor: true,
            breakpoints: {
                1024: {
                    spaceBetween: 19
                },
            }
        }).on('slideChange', function() {
            var isVideo = swiper_youtube.slides[swiper_youtube.previousIndex].querySelector('.cart__video-container');
            if (isVideo) {
                YT.get(isVideo.querySelector('iframe').id).pauseVideo();
                // console.log(isVideo.querySelector('iframe').id);
            }
        });

        window.onYouTubePlayerAPIReady = function() {
            var container = document.querySelectorAll('.cart__video-container');
            for (var i = 0; i < container.length; i++) {
                initPlayer(container[i])
            }
        };

        // if ($('.cart__video-list .swiper-slide').length < 2) {
        //     $('.video-ctrl').hide();
        // }
    }

    // Product feedback
    $('.feedback__desc, .feedback__btn--comment').click(function(event) {
        $(this).parent().parent().toggleClass('open');
    });
    $('.feedback__answ').on('click', function(event) {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({ scrollTop: $(hash).offset().top - 200 }, 900);
        var name = $(this).parent().siblings('.feedback__name').text();
        var valueTextareaa = $('.feedback__send').val();
        $('.feedback__send textarea').val(name + ', ' + valueTextareaa);
        $('.feedback__send textarea').focus();
    });

    // Product file upload
    function fileUpload(input, textblock) {
        $(input).change(function() {
            var filename = $(this).val().replace(/.*\\/, "");
            $(textblock).html(filename);
        });
    }
    fileUpload("#cart__download-input", ".cart__download-text");

    if ($('select').length) {
        setTimeout(function() {
            $('select').styler();
        }, 100)
    }

    // Questions NAVIGATION
    $('.questions__title').click(function(event) {
        $(this).find('i').toggleClass('icon-minus');
        $(this).siblings('.questions__desc').slideToggle(300);
    });
});