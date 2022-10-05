document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger__section')
    const primarySections = Array.from(document.querySelectorAll('.section'))

    hamburgerMenu.addEventListener('click', function (e) {
        hamburgerMenu.classList.add('hamburger__section__opened')
        hamburgerMenu.addEventListener('animationend', () => {
            hamburgerMenu.classList.add('hamburger__section__finally_opened')
        })
    })

    primarySections.forEach(section => {
        section.addEventListener("click", function (e) {
            section.classList.add('chosen')

            const $el = document.querySelector('.chosen')
            const $prevEl = $el.previousElementSibling
            const primary = document.querySelector('.primary')

            $el.addEventListener('animationend', function (e) {
                section.style.width = 'calc(100vw - 33px)'
                switch ($el.dataset.name) {
                    case 'about':
                        section.querySelector('.slide-1').classList.add('slide-1__scrolled')
                        document.querySelector('.primary').style.paddingLeft = '0'
                        document.querySelector('.text-bottom').style.paddingLeft = '33px'
                        section.style.width = '100vw'
                        document.querySelector('.transparent-btn').addEventListener('click', function (e) {
                            console.log('hey')
                            document.querySelector('.slide-3').classList.add('slide-3__scrolled')
                        })
                    case 'hobby':
                        section.querySelector('.slide-1').classList.add('slide-1__scrolled')
                        section.querySelector('.section-name').classList.add('section-name__scrolled')
                        section.querySelector('.slide-2').classList.add('slide-2__scrolled')
                    case 'projects':
                        section.querySelector('.slide-2').classList.add('slide-2__scrolled')
                        section.querySelector('.section-name').classList.add('section-name__scrolled')
                    default:
                        section.querySelector('.slide-1').classList.add('slide-1__scrolled')
                        section.querySelector('.slide-2').classList.add('slide-2__scrolled')
                }
            })

            if ($prevEl) {
                $prevEl.classList.add(`hidden-${$prevEl.dataset.order}`)
                $prevEl.style.marginLeft = `calc(-1 * (100vw - 33px) / 4 * ${$prevEl.dataset.order})`
            }
        })
    })

})