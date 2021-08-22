
// ------------ HEADER -----------------

(() => {
    let $menu

    $('#header .level1 .sub').on('click', (e) => {
        e.stopPropagation()
    })

    $('#header .level1 li:has(.sub) > a').on('click', function (e) {

        e.preventDefault()
        e.stopPropagation()

        $menu = $(this).closest('li')
        if ($menu.hasClass('open')) {
            $('body').removeClass('open-menu')
            $menu.removeClass('open')
        } else {
            $('#header .level1 li.open').removeClass('open')
            $menu.addClass('open')
            $('body').addClass('open-menu')

        }

        // if ($menu && $menu?.[0] !== this) {
        //     $menu?.removeClass('open')
        // }

        // if ($menu.hasClass('open')) {
        //     $('body').addClass('open-menu')
        // } else {
        //     $('body').removeClass('open-menu')
        // }
    })

    function closeMenu() {
        $('body').removeClass('open-menu')
        $menu.removeClass('open')
        $menu = null
    }

    // $('#header .level1 li:has(.sub) > .sub').on('mouseleave', closeMenu)

    $('#overlay').on('click', closeMenu)

    $('.services-col a').on('click', function () {
        let $this = $(this)

        let id = $this.data('id')

        $this.closest('.services-col').find('.active').removeClass('active')
        $this.addClass('active')

        $this.closest('li').find('.feature-col.active').removeClass('active').hide()
        $this.closest('li').find(`.feature-col.${id}`).addClass('active').show()
    })


    $(window).on('scroll', () => {
        if ($(window).scrollTop() > 0) {
            $('#header').addClass('header-fixed')
        } else {
            $('#header').removeClass('header-fixed')
        }
    })

})()




//  ----------------------- Lazy loading image --------------------
const convertImages = (image, callback) => {
    fetch(image.src)
        .then(res => res.text())
        .then(data => {
            const parser = new DOMParser();
            const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

            if (image.id) svg.id = image.id;
            if (image.className) svg.classList = image.classList;

            svg.removeAttribute('width')
            svg.removeAttribute('height')


            image.parentNode.replaceChild(svg, image);


        })
        .then(callback)
        .catch(error => console.error(error))
}
$('img[src$=".svg"],[data-src$=".svg"]').each((i, e) => {
    if (e.dataset.src) {
        e.src = e.dataset.src
    }
    convertImages(e)
})



$(document).ready(() => {
    $('#page-loading').hide()


    let $carousel = $('.main-carousel').flickity({
        // options
        autoPlay: true,
        cellAlign: 'center',
        contain: true,
        wrapAround: true,
    })

    // $carousel.find('.carousel-cell').on('click', function () {
    //     let i = $(this).data('index')
    //     $carousel.flickity('select', i)
    // })

    // var flkty = $carousel.data('flickity');
    // let $imgs = $('.carousel-cell img');
    // $carousel.on('scroll.flickity', function (event, progress) {
    //     flkty.slides.forEach(function (slide, i) {
    //         var img = $imgs[i];
    //         var x = (slide.target + flkty.x) * -1 / 3;
    //         img.style.transform = 'translateX( ' + x + 'px)';
    //     });
    // });

    $('.carousel').each((i, e) => {
        if ($(e).find('> *').length > parseInt($(e).attr('data-carousel-min') || 1)) {
            $(e).flickity({
                // options
                autoPlay: true,
                cellAlign: 'center',
                contain: true,
                wrapAround: true
            });
        }
    })



    $('.select-open').on('change', function() {
        let $this = $(this)
        let value = $this.val()
        let name = $this.attr('name')

        $(`[data-select-name="${name}"]`).hide()
        $(`[data-select-name="${name}"][data-select-id="${value}"]`).show()
    })

    $('[data-select-name]').filter('.select-open').hide()
    $('.select-open').trigger('change')
})

