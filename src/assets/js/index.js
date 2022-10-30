//about -66.25vw
//hobby -93.75vw
//projects -111.25vw
//media -133.75vw


document.addEventListener('DOMContentLoaded', function () {
    const animationsPolygon = document.getElementById('animationsPolygon')
    const hamburgerMenu = document.getElementById('hamburgerSection')
    const primarySliderSection = document.getElementById('primarySlider')
    const primarySections = document.querySelectorAll('.section')
    const primary = document.querySelector('.primary')
    const news = document.querySelector('.news')

    const initVerticalSlider = ($el, slidesPerView = 2, spaceBetween = 15) => {
        return new Swiper($el, {
            // Optional parameters
            direction: 'vertical',
            loop: true,
            slidesPerView: slidesPerView,
            spaceBetween: Number(spaceBetween),
            scrollbar: {
                verticalClass: 'd-none'
            },
            on: {
                afterInit: function () {
                    let delay = 500
                    this.slides.forEach((slide, n) => {
                        setTimeout(() => {
                            slide.style.opacity = '1'
                        }, delay)
                        delay += 200
                    })
                }
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            mousewheel: true,
            // Navigation arrows
            navigation: {
                nextEl: `${$el.slice(0, $el.indexOf('-'))}-next`,
                prevEl: `${$el.slice(0, $el.indexOf('-'))}-prev`,
                lockClass: 'd-none'
            },
        });
    }

    const initMediaSlider = () => {
        new Swiper('#mediaSlider', {
            slidesPerView: "auto",
            centeredSlides: false,
            spaceBetween: 0,
            loop: true,
            centeredSlides: false,
            initialSlide: 0,
            on: {
                afterInit: function () {
                    let delay = 500
                    this.slides.forEach((slide, n) => {
                        setTimeout(() => {
                            slide.style.opacity = '1'
                        }, delay)
                        delay += 200
                    })
                }
            },
        })
    }

    const initDesktopInnerSlider = (initialSlidePosiiton) => {
        new Swiper('.primary-swiper-desktop', {
            slidesPerView: "auto",
            spaceBetween: 0,
            loop: true,
            loopedSlides: 4,
            centeredSlides: true,
            initialSlide: Number(initialSlidePosiiton),
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            on: {
                slideChange: function () {
                    const {
                        activeIndex
                    } = this
                    this.slides.forEach((slide, n) => {
                        if (n === activeIndex) {
                            slide.querySelector('.active-content').style.opacity = '1'
                            slide.querySelector('.inactive-content').style.opacity = '0'
                        } else {
                            slide.querySelector('.active-content').style.opacity = '0'
                            slide.querySelector('.inactive-content').style.opacity = '1'
                        }
                    })
                },
            }
        });
    }

    const initVerticalTextSlider = ($el) => (
        new Swiper($el, {
            direction: "vertical",
            slidesPerView: "auto",
            freeMode: true,
            scrollbar: {
                el: ".swiper-scrollbar",
            },
            navigation: {
                nextEl: `.vertical-text-next`,
                prevEl: `.vertical-text-prev `,
                lockClass: 'd-none'
            },
            mousewheel: true,
        })
    )

    const utils = {
        $el: (selector) => document.querySelector(selector),
        expandPrimarySection: (section) => {
            const outerName = section.querySelector(`[data-position-${section.dataset.name}="outer"]`)
            const innerName = section.querySelectorAll(`[data-position-${section.dataset.name}="inner"]`)
            initVerticalTextSlider('#mobileVerticalTextSlider')
            initVerticalSlider('.projects-slider')
            initVerticalSlider('.hobby-slider')
            initMediaSlider()
            switch (section.dataset.name) {
                case 'about':
                    section.querySelector('.slide-1').classList.add('slide-1__scrolled')
                    section.querySelector('.slide-3').classList.add('slide-3__scrolled')
                    break;
                case 'hobby':
                    innerName.forEach(name => name.style.display = 'none')
                    section.querySelector('.slide-1').classList.add('slide-1__scrolled')
                    section.querySelector('.section-name').classList.add('section-name__scrolled')
                    section.querySelector('.slide-2').classList.add('slide-2__scrolled')
                    section.addEventListener('animationend', function () {
                        outerName.style.display = 'none'
                        innerName.forEach(name => name.style.display = 'block')
                    })
                    break;
                case 'projects':
                    innerName.forEach(name => name.style.display = 'none')
                    section.querySelector('.slide-2').classList.add('slide-2__scrolled')
                    section.querySelector('.section-name').classList.add('section-name__scrolled')
                    section.addEventListener('animationend', function () {
                        outerName.style.display = 'none'
                        innerName.forEach(name => name.style.display = 'block')
                    })
                    break;
                case 'media':
                    section.querySelector('.slide-1').classList.add('slide-1__scrolled')
                    section.querySelector('.slide-2').classList.add('slide-2__scrolled')
                    section.querySelector('.slide-2').addEventListener('animationend', function () {
                    })
                    break;
            }
        },
        expandPrimarySectionOnDesktop: (section) => {
            const desktopPrimaryWrapper = document.querySelector('.section-slider-desktop')
            const about = desktopPrimaryWrapper.querySelector('[data-name="about"]')
            const hobby = desktopPrimaryWrapper.querySelector('[data-name="hobby"]')
            const projects = desktopPrimaryWrapper.querySelector('[data-name="projects"]')
            const media = desktopPrimaryWrapper.querySelector('[data-name="media"]')
            initVerticalTextSlider('#desktopVerticalTextSlider')
            initVerticalSlider('.hobbydesktop-', 'auto')
            initVerticalSlider('.projectsdesktop-', 'auto')
            initVerticalSlider('.mediadesktop-', 'auto')
            section.style.width = '95%'

            switch (section.dataset.name) {
                case 'about':
                    section.querySelector('.section-desktop__content').style.right = 'calc(100% - 412px)'
                    about.style.left = '2.5%'
                    hobby.style.left = '97.5%'
                    projects.style.right = '-25%'
                    media.style.right = '-50%'
                    break;
                case 'hobby':
                    section.querySelector('.section-desktop__content').style.left = '0px'
                    about.style.left = '-30%'
                    hobby.style.left = '2.5%'
                    projects.style.right = '-10%'
                    media.style.right = '-40%'
                    break;
                case 'projects':
                    section.querySelector('.section-name').style.left = '0'
                    about.style.left = '-50%'
                    hobby.style.left = '-20%'
                    projects.style.right = '2.5%'
                    media.style.right = '-30%'

                    break;
                case 'media':
                    about.style.left = '-60%'
                    hobby.style.left = '-30%'
                    projects.style.right = '97.5%'
                    media.style.right = '2.5%'
                    break;
            }
        },
        changePage: (e) => {
            e.preventDefault()
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

        const desktopPrimaryWrapper = document.querySelector('.section-slider-desktop')
        const desktopPrimarySections = desktopPrimaryWrapper.querySelectorAll('.section-desktop')
        const desktopPrimaryInnerSlider = document.getElementById('primarySwiperDesktop')
        desktopPrimarySections.forEach(section => {
            section.addEventListener('click', function () {
                initDesktopInnerSlider(section.dataset.order)
                utils.expandPrimarySectionOnDesktop(section)
                section.addEventListener('transitionend', () => {
                    desktopPrimaryInnerSlider.style.top = '0'
                    setTimeout(() => desktopPrimaryInnerSlider.classList.add('showed'), 350)
                })
            })
        })

        const $innerSliderEl = document.querySelector('.inner-section-slider')

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
        })

        const initInnerSlider = (initialSlidePosiiton) => {
            new Swiper('#innerPrimarySlider', {
                slidesPerView: "auto",
                centeredSlides: false,
                spaceBetween: 0,
                loop: true,
                loopedSlides: 4,
                centeredSlides: false,
                keyboard: {
                    enabled: true,
                    onlyInViewport: true,
                },
                initialSlide: Number(initialSlidePosiiton),
                on: {
                    transitionEnd: function (swiper) {
                        console.log(swiper.slides[swiper.activeIndex].childNode)
                        // swiper.slides[swiper.activeIndex].childNode
                    }
                }
            })
        }

        const primarySlider = new Swiper("#primarySlider", {
            slidesPerView: "auto",
            centeredSlides: false,
            spaceBetween: 0,
            loop: true,
            loopedSlides: 4,
            // keyboard: {
            //     enabled: true,
            //     onlyInViewport: false,
            // },
            initialSlide: 0,
            on: {
                init: function () {
                    this.slides.forEach((slide, n) => {
                        slide.style.zIndex = this.slides.length - n
                    })
                    this.slides[this.activeIndex].style.zIndex = 10
                },
                click: function (swiper, e) {
                    const slide = e.path.find(el => {
                        if (el.classList) {
                            return Array.from(el.classList).includes('swiper-slide-active')
                        }
                    })
                    if (slide) {
                        slide.style.width = '102%'
                        slide.style.boxShadow = 'none'
                        swiper.disable()
                        slide.addEventListener('transitionend', function () {
                            const section = slide.querySelector('.section')
                            let wrapper;
                            switch (section.dataset.name) {
                                case 'about':
                                    wrapper = section.querySelector('.slide-3')
                                    if (!wrapper.querySelector('.inner-section-slider')) {
                                        section.querySelector('.slide-3').insertAdjacentElement(
                                            'afterbegin', $innerSliderEl.cloneNode(true)
                                        );
                                        $innerSliderEl.innerHTML = ''
                                        initInnerSlider(section.dataset.inner)
                                        utils.expandPrimarySection(section)
                                    }
                                    break;
                                case 'hobby':
                                case 'projects':
                                case 'media':
                                    wrapper = section.querySelector('.slide-2')
                                    if (!wrapper.querySelector('.inner-section-slider')) {
                                        section.querySelector('.slide-2').insertAdjacentElement(
                                            'afterbegin', $innerSliderEl.cloneNode(true)
                                        );
                                        $innerSliderEl.innerHTML = ''
                                        initInnerSlider(section.dataset.inner)
                                        utils.expandPrimarySection(section)
                                    }
                                    break;
                            }
                        })
                    }
                },
                // activeIndexChange: function (swiper) {
                //     this.slides.forEach((slide, n) => {
                //         slide.style.width = '25%'
                //     })
                //     this.slides[this.activeIndex].style.width = '40%'

                // }
            }
            // pagination: {
            //   el: ".swiper-pagination",
            //   clickable: true
            // }
        })
        // initInnerSlider()
    }

    if (utils.$el('.black-slider')) {
        new Swiper('.black-slider', {
            // Optional parameters
            direction: 'vertical',
            loop: true,
            slidesPerView: 2,
            spaceBetween: 24,
            scrollbar: {
                verticalClass: 'd-none'
            },
            on: {
                afterInit: function () {
                    let delay = 600
                    this.slides.forEach((slide, n) => {
                        setTimeout(() => {
                            slide.style.opacity = '1'
                        }, delay)
                        delay += 200
                    })
                }
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            mousewheel: true,
            navigation: {
                nextEl: `.black-slider-next`,
                prevEl: `.black-slider-prev`,
                lockClass: 'd-none'
            },
        })
    }

    if (news) {
        isMarked && clearInterval(menuInterval)
        let delay = 200
        news.querySelectorAll('.news-item').forEach(item => {
            setTimeout(() => item.style.opacity = 1, delay)
            delay += 200
        })

        new Swiper('.horizontal-desktop-slider', {
            direction: 'vertical',
            slidesPerView: 'auto',
            spaceBetween: 10,
            loop: false,
            breakpoints: {
                996: {
                    slidesPerView: 3,
                    direction: 'horizontal',
                    spaceBetween: 36,
                }
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            mousewheel: true,
            navigation: {
                nextEl: `.swiper-button-next`,
                prevEl: `.swiper-button-prev`,
                lockClass: 'd-none'
            },
        })
    }

    if (utils.$el('.single-page')) {

        initVerticalSlider('.single-slider', 'auto', 30)
    }
})