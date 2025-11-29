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
            this.title = '<div style="">' +
                '<h5>Marca: ' + marca + ' ' + modelo + '</h5>' +
                ' <p>Precio:' + precio + '</p>' +
                info +
                ' </div>';
            // return '<div style="padding: 10px;"> <h5>Marca: ' + info + '</h5> <p>precio:' + precio + '</p> </div>';
        }
    });

    /**
     * Fancybox Catalogo Productos. Podemos ver como integramos el ink que traemos de data-caption por html y
     *  las etiquetas que generamos con js
     * @marca
     * @modelo
     * @precio
     */
    $(".fancybox-catalogo").fancybox({
        beforeShow: function () {
            //  Obtenemos los datos desde la etiqueta con sus propiedades data
            var marca = (!(this.element).data("marca")) ? "---" : (this.element).data("marca");
            var modelo = (!(this.element).data("modelo")) ? "--" : (this.element).data("modelo");
            var info = (!(this.element).data("caption")? "---":(this.element).data("caption"));
            var precio = (!(this.element).data("precio")) ? "---" : (this.element).data("precio");
            this.title = `<div class="fancy" id=""><h5>Marca: ${marca} ${modelo}</h5>` +
                `<p>Precio: ${precio}</p>`+
                info+
                    `</div>`;
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
