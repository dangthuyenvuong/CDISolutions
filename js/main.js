$(document).ready(() => {
    $('#page-loading').hide()
})

$(window).on('scroll', () => {
    if ($(window).scrollTop() > 0) {
        $('#header').addClass('header-fixed')
    } else {
        $('#header').removeClass('header-fixed')
    }
})

let $carousel = $('.main-carousel').flickity({
    // options
    autoPlay: true,
    cellAlign: 'center',
    contain: true,
    wrapAround: true,
})

$carousel.find('.carousel-cell').on('click', function() {
    let i = $(this).data('index')
    $carousel.flickity('select', i)
})

// var flkty = $carousel.data('flickity');
// let $imgs = $('.carousel-cell img');
// $carousel.on('scroll.flickity', function (event, progress) {
//     flkty.slides.forEach(function (slide, i) {
//         var img = $imgs[i];
//         var x = (slide.target + flkty.x) * -1 / 3;
//         img.style.transform = 'translateX( ' + x + 'px)';
//     });
// });



$('.carousel').flickity({
    // options
    autoPlay: true,
    cellAlign: 'center',
    contain: true,
    wrapAround: true
});

(() => {
    let $menu

    $('#header .level1 .sub').on('click', (e) => {
        e.stopPropagation()
    })

    $('#header .level1 li:has(.sub) > a').on('click', function (e) {

        e.preventDefault()
        e.stopPropagation()
        $('body').toggleClass('open-menu')


        // if ($menu && $menu?.[0] !== this) {
        //     $menu?.removeClass('open')
        // }
        $menu = $(this).closest('li').toggleClass('open')
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

    $('.services-col a').on('click', (e) => {
        let id = $(e.currentTarget).data('id')
        $('.services-col .active').removeClass('active')
        $(e.currentTarget).addClass('active')

        $('.feature-col.active').removeClass('active').hide()
        $(`.feature-col.${id}`).addClass('active').show()
    })
})()

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