function initNavbar() {

    var scrollSpeed = 750;
    var scrollOffset = 68;
    var easing = 'swing';

    $('#navbar-top .navbar-default ul.nav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: scrollSpeed,
        scrollOffset: scrollOffset,
        scrollThreshold: 0.5,
        filter: ':not(.external)',
        easing: easing
    });

    // ** método para el scroll animado  */

    $('.nav-external').click(function (e) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: $($(this).attr("href")).offset().top - scrollOffset
        }, scrollSpeed, easing);
    });

    $('#navbar-top .navbar-default').affix({
        offset: {
            top: $('#home').height()
        }
    });
}

function initPortfolio() {
    var portfolio = $('#portfolio');
    var items = $('.items', portfolio);
    var filters = $('.filters li a', portfolio);

    items.imagesLoaded(function () {
        items.isotope({
            itemSelector: '.item',
            layoutMode: 'fitRows',
            transitionDuration: '0.7s'
        });
    });

    filters.click(function () {
        var el = $(this);
        filters.removeClass('active');
        el.addClass('active');
        var selector = el.attr('data-filter');
        items.isotope({ filter: selector });
        return false;
    });
}
function initAnimations() {
    $('.animated').appear(function () {
        var el = $(this);
        var animation = el.data('animation');
        var delay = el.data('delay');
        if (delay) {
            setTimeout(function () {
                el.addClass(animation);
                el.addClass('showing');
                el.removeClass('hiding');
            }, delay);
        } else {
            el.addClass(animation);
            el.addClass('showing');
            el.removeClass('hiding');
        }
    }, {
        accY: -60
    });

    // Service hover animation
    $('.service').hover(function () {
        $('i', this).addClass('animated tada');
    }, function () {
        $('i', this).removeClass('animated tada');
    });
}
function initStart() {
    var homeHeight = $(window).innerHeight() - 69;
    $('#home').height(homeHeight);
    // fancybox
    // $(".fancybox").fancybox();


    /**Método fancybox con caption 
     * Este método nos manipula la imagen al darle click , mostrando la imagen mas grande con un resumen
    */
    $(".fancybox").fancybox({
        beforeShow: function () {
            // this.title = $(this.element).data("caption");
            // this.title = $(this.element).data("precio");
            let info = (!$(this.element).data("caption")) ? "---" : $(this.element).data("caption");
            let precio = (!$(this.element).data("precio")) ? "---" : $(this.element).data("precio");
            let marca = (!$(this.element).data("marca")) ? "---" : $(this.element).data("marca");
            let modelo = (!$(this.element).data("modelo")) ? "---" : $(this.element).data("modelo");
            this.title = '<div style="padding: 10px;">' +
                '<h5>Marca: ' + marca + ' ' + modelo + '</h5>' +
                ' <p>Precio:' + precio + '</p>' +
                info +
                ' </div>';
            // return '<div style="padding: 10px;"> <h5>Marca: ' + info + '</h5> <p>precio:' + precio + '</p> </div>';
        }
    });

    $('.collapse ul li a').click(function () {
        $(this).parents('.collapse').removeClass('in');
    });
}

$(document).ready(function () {
    initStart()
    initNavbar();
    initPortfolio();
    initAnimations();
    $(window).resize(function () {
        initStart()
    });


});
$(window).load(function () {
    $(".loader .fading-line").fadeOut();
    $(".loader").fadeOut("slow");
});
