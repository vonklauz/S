document.addEventListener('DOMContentLoaded', function () {
    const utils = {
        $el: (selector) => document.querySelector(selector),
        setState: () => {
            sessionStorage.setItem('state', JSON.stringify(utils.$el('.index-main').innerHTML))
        },
        clearState: () => {
            sessionStorage.removeItem('state')
        },
        initStateLinks: () => {
            // Ссылки, при клике на которых сохраняется состояние фронта на главной странице
            setTimeout(() => {
                const stateLinks = document.querySelectorAll('.state-link')
                stateLinks.forEach(link => link.addEventListener('click', () => {
                    utils.setState()
                }))
            }, 1000)
        },
        isState: () => !!sessionStorage.getItem('state'),
        isDesktop: () => window.innerWidth >= 996,
        expandPrimarySection: (section) => {
            const primaryWrapper = utils.$el('.section-slider')
            const about = primaryWrapper.querySelector('[data-name="about"]')
            const hobby = primaryWrapper.querySelector('[data-name="hobby"]')
            const projects = primaryWrapper.querySelector('[data-name="projects"]')
            const media = primaryWrapper.querySelector('[data-name="media"]')

            const outerName = section.querySelector(`[data-position-${section.dataset.name}="outer"]`)
            const innerName = section.querySelectorAll(`[data-position-${section.dataset.name}="inner"]`)
            utils.initStateLinks()
            section.style.width = '100%'
            switch (section.dataset.name) {
                case 'about':
                    hobby.style.left = '100%'
                    projects.style.right = '-50%'
                    media.style.right = '-70%'
                    section.addEventListener('transitionend', function () {
                        section.querySelector('.slide-1').classList.add('slide-1__scrolled')
                        section.querySelector('.slide-3').classList.add('slide-3__scrolled')
                    })
                    break;
                case 'hobby':
                    about.style.left = '-25%'
                    section.style.left = 0;
                    projects.style.right = '-25%'
                    media.style.right = '-50%'
                    innerName.forEach(name => name.style.display = 'none')
                    section.addEventListener('transitionend', function () {
                        section.querySelector('.slide-1').classList.add('slide-1__scrolled')
                        section.querySelector('.section-name').classList.add('section-name__scrolled')
                        section.querySelector('.slide-2').classList.add('slide-2__scrolled')
                    })
                    section.addEventListener('animationend', function () {
                        outerName.style.display = 'none'
                        innerName.forEach(name => {
                            name.style.display = 'block'
                        })
                    })
                    break;
                case 'projects':
                    about.style.left = '-50%'
                    hobby.style.left = '-25%';
                    section.style.right = 0
                    media.style.right = '-25%'
                    innerName.forEach(name => name.style.display = 'none')
                    section.addEventListener('transitionend', function () {
                        section.querySelector('.slide-2').classList.add('slide-2__scrolled')
                        section.querySelector('.section-name').classList.add('section-name__scrolled')
                    })
                    section.addEventListener('animationend', function () {
                        outerName.style.display = 'none'
                        innerName.forEach(name => name.style.display = 'block')
                    })
                    break;
                case 'media':
                    about.style.left = '-75%'
                    hobby.style.left = '-50%';
                    projects.style.right = '100%'
                    // media.style.right = '-100%'
                    section.addEventListener('transitionend', function () {
                        section.querySelector('.slide-1').classList.add('slide-1__scrolled')
                        section.querySelector('.slide-2').classList.add('slide-2__scrolled')
                    })
                    section.querySelector('.slide-2').addEventListener('animationend', function () {})
                    break;
            }
            sessionStorage.setItem('order', section.dataset.order)
        },
        expandPrimarySectionOnDesktop: (section) => {
            const desktopPrimaryWrapper = utils.$el('.section-slider-desktop')
            const about = desktopPrimaryWrapper.querySelector('[data-name="about"]')
            const hobby = desktopPrimaryWrapper.querySelector('[data-name="hobby"]')
            const projects = desktopPrimaryWrapper.querySelector('[data-name="projects"]')
            const media = desktopPrimaryWrapper.querySelector('[data-name="media"]')
            initVerticalTextSlider('#desktopVerticalTextSlider')
            initVerticalSlider('.hobbydesktop-', 'auto')
            initVerticalSlider('.projectsdesktop-', 'auto')
            initVerticalSlider('.mediadesktop-', 'auto')
            section.style.width = '95%'
            sessionStorage.setItem('order', section.dataset.order)
            switch (section.dataset.name) {
                case 'about':
                    section.querySelector('.section-desktop__content').style.right = 'calc(100% - 413px)'
                    about.style.left = '2.5%'
                    hobby.style.left = '97.5%'
                    projects.style.right = '-25%'
                    media.style.right = '-90%'
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
            utils.initStateLinks()
        },
        changePage: (e) => {
            e.preventDefault()
            utils.$el('main').classList.add('page-changing')
            utils.clearState()
            setTimeout(() => window.location.href = e.target.href, 700)
        },
        checkIsActiveLink: (link) => {
            link.classList.add('active')
            link.previousElementSibling.classList.add('active-divider')
        },
    }

    const animationsPolygon = document.getElementById('animationsPolygon')
    const hamburgerMenu = document.getElementById('hamburgerSection')
    const primary = utils.$el('.primary')
    const news = utils.$el('.news')

    const initVerticalSlider = ($el, slidesPerView = 2, spaceBetween = 15, isNavigation = true) => {
        return new Swiper($el, {
            // Optional parameters
            direction: 'vertical',
            loop: true,
            slidesPerView: slidesPerView,
            spaceBetween: Number(spaceBetween),
            preloadImages: false,
            lazy: true,
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
                afterInit: function () {
                    document.querySelectorAll('.section-desktop').forEach(section => section.style.cursor = 'grab')
                },
                slideChange: function () {
                    const {
                        activeIndex
                    } = this
                    sessionStorage.setItem('order', this.slides[activeIndex].dataset.swiperSlideIndex)
                    this.slides.forEach((slide, n) => {
                        if (n === activeIndex) {
                            slide.querySelector('.active-content').classList.remove('active-content__inactive')
                            // slide.querySelector('.inactive-content').style.opacity = '0'
                        } else {
                            slide.querySelector('.active-content').classList.add('active-content__inactive')
                        }
                    })
                },
            }
        });
    }

    const initVerticalTextSlider = ($el) => {
        return new Swiper($el, {
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

    document.querySelectorAll('.logo__wrapper').forEach(logo => logo.addEventListener('click', e => {
        e.preventDefault()
        sessionStorage.removeItem('test')
        sessionStorage.removeItem('order')
        sessionStorage.removeItem('state')
        window.location.href = '/'
    }))

    utils.$el('.desktop-links').querySelectorAll('a').forEach(a => a.addEventListener('click', function (e) {
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

    // Если пользователь на главной
    if (primary) {
        if (utils.isState()) {
            if (utils.isDesktop()) {
                initDesktopInnerSlider(sessionStorage.getItem('order'))
                initVerticalTextSlider('#desktopVerticalTextSlider')
                initVerticalSlider('.hobbydesktop-', 'auto')
                initVerticalSlider('.projectsdesktop-', 'auto')
                initVerticalSlider('.mediadesktop-', 'auto')
                utils.$el('main').style.opacity = '1'
            } else {
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
                    on: {
                        slideChange: function () {
                            const {
                                activeIndex
                            } = this
                            sessionStorage.setItem('test', this.slides[activeIndex].dataset.swiperSlideIndex)
                        },
                    },
                    initialSlide: Number(sessionStorage.getItem('test')),
                })
                initVerticalTextSlider('#mobileVerticalTextSlider')
                initVerticalSlider('.projects-slider', 2, 15, false)
                initVerticalSlider('.hobby-slider', 2, 15, false)
                initVerticalSlider('.podcast-slider', 2, 15, false)
                utils.$el('main').style.transition = 'all .25s'
                setTimeout(() => utils.$el('main').style.opacity = '1', 1400)
            }
            utils.initStateLinks()
            utils.clearState()
        } else {
            utils.$el('main').style.opacity = '1'
            const primarySliderSection = document.getElementById('primarySlider')
            const primarySections = document.querySelectorAll('.section')
            const desktopPrimaryWrapper = utils.$el('.section-slider-desktop')
            const desktopPrimarySections = desktopPrimaryWrapper.querySelectorAll('.section-desktop')
            const desktopPrimaryInnerSlider = document.getElementById('primarySwiperDesktop')
            const $innerSliderEl = utils.$el('.inner-section-slider')

            let isPrimaryExpanded = false;

            // Обрабатываем клик на главной в мобильной версии
            primarySections.forEach(section => {
                section.addEventListener('click', function (e) {
                    if (!isPrimaryExpanded) {
                        const wrapper = section.querySelector('.slide-1').nextElementSibling
                        if (!wrapper.querySelector('.inner-section-slider')) {
                            wrapper.insertAdjacentElement(
                                'afterbegin', $innerSliderEl.cloneNode(true)
                            );
                            $innerSliderEl.innerHTML = ''
                        }
                        utils.expandPrimarySection(section)
                        isPrimaryExpanded = true
                        setTimeout(() => {
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
                                on: {
                                    slideChange: function () {
                                        const {
                                            activeIndex
                                        } = this
                                        sessionStorage.setItem('order', this.slides[activeIndex].dataset.swiperSlideIndex)
                                        sessionStorage.setItem('test', this.slides[activeIndex].dataset.swiperSlideIndex)
                                    },
                                },
                                initialSlide: Number(section.dataset.inner),
                            })
                        }, 400)
                        setTimeout(() => {
                            initVerticalTextSlider('#mobileVerticalTextSlider')
                        }, 950)
                        setTimeout(() => {
                            initVerticalSlider('.hobby-slider', 2, 15, false)
                        }, 1450)
                        // setTimeout(() => {
                        //     initVerticalTextSlider('#mobileVerticalTextSlider')
                        //     initVerticalSlider('.hobby-slider')
                        // }, 1700)
                        setTimeout(() => {
                            initVerticalSlider('.projects-slider', 2, 15, false)
                            initVerticalSlider('.podcast-slider', 2, 15, false)
                        }, 1700)
                    }
                })
            })

            // Обрабатываем клик на главной в десктопной версии
            desktopPrimarySections.forEach(section => {
                section.addEventListener('click', function () {
                    initDesktopInnerSlider(section.dataset.order)
                    utils.expandPrimarySectionOnDesktop(section)
                    section.addEventListener('transitionend', () => {
                        desktopPrimaryInnerSlider.style.top = '0'
                        setTimeout(() => {
                            desktopPrimaryInnerSlider.classList.add('showed')
                        }, 350)
                    })
                })
            })
        }
    }

    if (utils.$el('.black-slider')) {
        new Swiper('.black-slider', {
            // Optional parameters
            direction: 'vertical',
            loop: true,
            slidesPerView: 2,
            spaceBetween: 24,
            preloadImages: false,
            lazy: true,
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
            breakpoints: {
                996: {
                    slidesPerView: 2,
                }
            },
        })
    }

    if (news) {
        let delay = 200
        news.querySelectorAll('.news-item').forEach(item => {
            setTimeout(() => item.style.opacity = 1, delay)
            delay += 200
        })

        window.addEventListener('load', () => {
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
                preloadImages: false,
                lazy: true,
                mousewheel: true,
                navigation: {
                    nextEl: `.swiper-button-next`,
                    prevEl: `.swiper-button-prev`,
                    lockClass: 'd-none'
                },
            })
        })
    }

    if (utils.$el('.single-page')) {
        // initVerticalSlider('.singlepagedesktop-', 'auto')
        new Swiper('.singlepagedesktop-', {
            // Optional parameters
            direction: 'vertical',
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 15,
            preloadImages: false,
            lazy: true,
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
                },
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            mousewheel: true,
            // Navigation arrows
            navigation: {
                nextEl: `.singlepagedesktop-next`,
                prevEl: `.singlepagedesktop-prev`,
                lockClass: 'd-none'
            },
        });
    }
})