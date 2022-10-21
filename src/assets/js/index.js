document.addEventListener('DOMContentLoaded', function () {
    const animationsPolygon = document.getElementById('animationsPolygon')
    const hamburgerMenu = document.getElementById('hamburgerSection')
    const primarySections = Array.from(document.querySelectorAll('.section'))
    const primary = document.querySelector('.primary')
    const news = document.querySelector('.news')

    const utils = {
        $el: (selector) => document.querySelector(selector),
        fadeOutSlider: (slider, delay = 250) => slider.querySelectorAll('.swiper-slide').forEach((slide, n) => {
            setTimeout(() => {
                // if (n < 2) {
                //     slide.style.opacity = '1'
                // } else if (n === 2) {
                //     slide.style.opacity = '.5'
                // } else {
                //     slide.style.opacity = '.25'
                // }
                slide.style.opacity = '1'
            }, delay)
            delay += 200
        }),
        changePage: (e) => {
            e.preventDefault()
            console.log(e.target)
            document.querySelector('main').classList.add('page-changing')
            setTimeout(() => window.location.href = e.target.href, 700)
        },
        checkIsActiveLink: (link) => {
            link.classList.add('active')
            link.previousElementSibling.classList.add('active-divider')
        }
    }

    let isMarked = false;
    const menuInterval = setInterval(() => {
        if (hamburgerMenu.querySelector('.active') && utils.$el('.hamburger__section__finally_opened')) {
            utils.checkIsActiveLink(utils.$el('.active'))
            isMarked = true
        }
        isMarked && clearInterval(menuInterval)
    }, 100)

    // Клонируем шапку, чтобы вычислить длину пунктов меню для их плавной анимации
    animationsPolygon.insertAdjacentElement('afterbegin', hamburgerMenu.cloneNode(true))
    animationsPolygon.querySelector('#hamburgerSection').id = ''
    const headerLinksCopy = animationsPolygon.querySelectorAll('a')
    headerLinksCopy.forEach((a, i) => {
        if (i !== headerLinksCopy.length - 1) {
            a.style.width = 'auto'
            a.style.visibility = 'visible'
        }
    })

    document.querySelector('.desktop-links').querySelectorAll('a').forEach(a => a.addEventListener('click', function (e) {
        utils.changePage(e)
    }))

    hamburgerMenu.addEventListener('click', function (e) {
        hamburgerMenu.classList.add('hamburger__section__opened')
        hamburgerMenu.addEventListener('animationend', () => {
            hamburgerMenu.classList.add('hamburger__section__finally_opened')
            hamburgerMenu.querySelectorAll('a').forEach((a, i) => {
                if (i !== headerLinksCopy.length - 1) {
                    a.style.width = headerLinksCopy[i].offsetWidth + 'px'
                    a.addEventListener('click', function (e) {
                        utils.changePage(e)
                    })
                }
            })
        })
    })

    if (primary) {
        primarySections.forEach(section => {
            section.addEventListener("click", function (e) {

                if (section.dataset.name === 'about' || section.dataset.name === 'hobby' || section.dataset.name === 'projects') {
                    document.querySelector('.primary').style.paddingLeft = '0'
                    section.classList.add('chosen-full')
                } else {
                    section.classList.add('chosen')
                }

                const $prevEl = section.previousElementSibling

                section.addEventListener('animationend', function (e) {
                    // section.style.width = 'calc(100vw - 33px)'
                    switch (section.dataset.name) {
                        case 'about':
                            section.querySelector('.slide-1').classList.add('slide-1__scrolled')
                            section.querySelector('.slide-3').classList.add('slide-3__scrolled')
                            // document.querySelector('.transparent-btn').addEventListener('click', function (e) {
                            //     console.log('hey')
                            //     document.querySelector('.slide-3').classList.add('slide-3__scrolled')
                            // })
                        case 'hobby':
                            section.querySelector('.slide-1').classList.add('slide-1__scrolled')
                            section.querySelector('.section-name').classList.add('section-name__scrolled')
                            section.querySelector('.slide-2').classList.add('slide-2__scrolled')
                            section.addEventListener('animationend', function () {
                                utils.fadeOutSlider(document.querySelector('.hobby-slider'))
                            })
                        case 'projects':
                            section.querySelector('.slide-2').classList.add('slide-2__scrolled')
                            section.style.width = '100vw'
                            section.querySelector('.section-name').classList.add('section-name__scrolled')
                            section.addEventListener('animationend', function () {
                                utils.fadeOutSlider(document.querySelector('.projects-slider'))
                            })
                        case 'media':
                            section.querySelector('.slide-1').classList.add('slide-1__scrolled')
                            section.querySelector('.slide-2').classList.add('slide-2__scrolled')
                            section.querySelector('.slide-2').addEventListener('animationend', function () {
                                let delay = 250
                                section.querySelectorAll('.podcast-col').forEach(col => {
                                    setTimeout(() => col.style.opacity = '1', delay)
                                    delay += 200
                                })
                            })
                    }
                })

                if ($prevEl) {
                    $prevEl.classList.add(`hidden-${$prevEl.dataset.order}`)
                    $prevEl.style.marginLeft = `calc(-1 * (100vw - 33px) / 4 * ${$prevEl.dataset.order})`
                }
            })
        })

        const projectsSlider = new Swiper('.projects-slider', {
            // Optional parameters
            direction: 'vertical',
            loop: false,
            slidesPerView: 2,
            spaceBetween: 15,
            scrollbar: {
                verticalClass: 'd-none'
            },

            // Navigation arrows
            navigation: {
                nextEl: '.projects-next',
                prevEl: '.projects-prev',
                lockClass: 'd-none'
            },

            on: {
                // init: function () {
                //     console.log(this)
                //     this.slides.forEach((slide, n) => {
                //         slide.style.opacity = n > 1 && n < 3 ? '.5' : n > 2 && n < 4 ? '.25' : '1'
                //     })
                // },
                // activeIndexChange: function () {
                //     const {
                //         activeIndex
                //     } = this
                //     this.slides.forEach((slide, n) => {
                //         if (n <= activeIndex || n === activeIndex + 1) {
                //             slide.style.opacity = '1'
                //         } else if (n === activeIndex + 2) {
                //             slide.style.opacity = '.5'
                //         } else if (n > activeIndex + 2 && n < activeIndex + 4) {
                //             slide.style.opacity = '.25'
                //         } else {
                //             slide.style.opacity = '0'
                //         }
                //     })
                // },
                // reachEnd: function () {
                //     this.slides.forEach(slide => slide.style.opacity = '1')
                // }
            }
        });

        const hobby = new Swiper('.hobby-slider', {
            // Optional parameters
            direction: 'vertical',
            loop: false,
            slidesPerView: 2,
            spaceBetween: 15,
            scrollbar: {
                verticalClass: 'd-none'
            },

            // Navigation arrows
            navigation: {
                nextEl: '.hobby-next',
                prevEl: '.hobby-prev',
                lockClass: 'd-none'
            },

            on: {
                // init: function () {
                //     console.log(this)
                //     this.slides.forEach((slide, n) => {
                //         slide.style.opacity = n > 1 && n < 3 ? '.5' : n > 2 && n < 4 ? '.25' : '1'
                //     })
                // },
                // activeIndexChange: function () {
                //     const {
                //         activeIndex
                //     } = this
                //     this.slides.forEach((slide, n) => {
                //         if (n <= activeIndex || n === activeIndex + 1) {
                //             slide.style.opacity = '1'
                //         } else if (n === activeIndex + 2) {
                //             slide.style.opacity = '.5'
                //         } else if (n > activeIndex + 2 && n < activeIndex + 4) {
                //             slide.style.opacity = '.25'
                //         } else {
                //             slide.style.opacity = '0'
                //         }
                //     })
                // }
            }
        });

        // document.querySelector('.swiper').querySelectorAll('img').forEach(img => {
        //     img.addEventListener('click', function (e) {
        //         console.log(e.target)
        //     })
        // })
    }

    if (news) {
        isMarked && clearInterval(menuInterval)
        let delay = 200
        news.querySelectorAll('.news-item').forEach(item => {
            setTimeout(() => item.style.opacity = 1, delay)
            delay += 200
        })
    }

    if (utils.$el('.single-page')) {
        utils.$el('#slideToText').addEventListener('click', function (e) {
            utils.$el('.poster').style.left = '-100%'
        })

        const singlePageSwiper = new Swiper(".single-page-swiper", {
            direction: "vertical",
            slidesPerView: "auto",
            freeMode: true,
            mousewheel: true,
            on: {
                reachEnd: function () {
                    const link = utils.$el('#slideToText')
                    link.style.transform = 'rotateZ(180deg)'
                    link.href = '/'
                }
            }
        });
    }
})