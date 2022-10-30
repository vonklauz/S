document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('audio')) {
        const isTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0
        const events = {
            click: isTouch ? 'touchstart' : 'mousedown',
            move:  isTouch ? 'touchmove' : 'mousemove',
            end: isTouch ? 'touchend' : 'mouseup'
        }
        const mediaFile = new Audio(document.querySelector('audio').src)
        const showedStyleClass = 'showed-control'
        const hiddenStyleClass = 'hidden-control'
        const controls = document.querySelectorAll('.controls-component')
        const triggerShow = ($toHideEl, $toShowEl) => {
            $toHideEl.classList.remove(showedStyleClass)
            $toHideEl.classList.add(hiddenStyleClass)

            $toShowEl.classList.add(showedStyleClass)
            $toShowEl.classList.remove(hiddenStyleClass)
        }

        const fmtMSS = (s) => (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s

        const countPlayedPercents = (mediaFile) => {
            const duration = mediaFile.duration.toFixed(0)
            const currentTime = mediaFile.currentTime.toFixed(0)
            return currentTime / (duration / 100)
        }

        setTimeout(() => {
            controls.forEach((control, n) => {
                const playBtn = control.querySelector('[data-action="play"]')
                const stopBtn = control.querySelector('[data-action="stop"]')
                const back = control.querySelector('[data-action="back"]')
                const forward = control.querySelector('[data-action="forward"]')
                const progressLine = control.querySelector('.line')
                const timeDiv = control.querySelector('.time')
                const playingInterval = setInterval(() => {
                    progressLine.style.width = `${countPlayedPercents(mediaFile)}%`
                }, 1000)
                const timeInterval = setInterval(() => {
                    timeDiv.textContent = fmtMSS((mediaFile.duration - mediaFile.currentTime).toFixed(0))
                }, 1000)

                progressLine.addEventListener(events.click, (pointerdownEvent) => {
                    const startedX = !isTouch ? pointerdownEvent.x : pointerdownEvent.changedTouches[0].clientX
                    const lineWidth = progressLine.style.width
                    clearInterval(playingInterval)

                    const pointerUpListener = (e) => {
                        progressLine.removeEventListener(events.move, pointermoveListener)
                        const lineFillingPercentage = progressLine.offsetWidth / (progressLine.parentElement.offsetWidth / 100)
                        mediaFile.currentTime = lineFillingPercentage * (mediaFile.duration / 100)
                        timeDiv.textContent = fmtMSS((mediaFile.duration - mediaFile.currentTime).toFixed(0))
                    }

                    const pointermoveListener = (pointermoveEvent) => {
                        if (pointermoveEvent.target === progressLine ||
                            pointermoveEvent.target === progressLine.querySelector('.dot')) {
                            const offsetX = !isTouch ? pointermoveEvent.x - startedX : pointermoveEvent.changedTouches[0].clientX - startedX
                            progressLine.style.width = `calc(${lineWidth} + ${offsetX}px)`
                        } else {
                            pointerUpListener(null)
                        }
                    }
                    progressLine.addEventListener(events.move, pointermoveListener)

                    progressLine.addEventListener(events.end, pointerUpListener)
                })

                playBtn && playBtn.addEventListener('click', () => {
                    triggerShow(playBtn, stopBtn)
                    mediaFile.play()
                })

                stopBtn && stopBtn.addEventListener('click', () => {
                    triggerShow(stopBtn, playBtn)
                    mediaFile.pause()
                })

                back && back.addEventListener('click', () => {
                    mediaFile.currentTime = mediaFile.currentTime < 15 ? 0 : mediaFile.currentTime - 15
                    progressLine.style.width = `${countPlayedPercents(mediaFile)}%`
                    timeDiv.textContent = fmtMSS((mediaFile.duration - mediaFile.currentTime).toFixed(0))
                })

                forward && forward.addEventListener('click', () => {
                    mediaFile.currentTime = mediaFile.currentTime < mediaFile.duration - 15 ? mediaFile.currentTime + 15 : mediaFile.duration
                    progressLine.style.width = `${countPlayedPercents(mediaFile)}%`
                    timeDiv.textContent = fmtMSS((mediaFile.duration - mediaFile.currentTime).toFixed(0))
                })

                mediaFile.addEventListener('ended', (event) => {
                    triggerShow(stopBtn, playBtn)
                });

                playBtn && stopBtn && document.addEventListener('keydown', function (e) {
                    if (e.code === 'Space') {
                        if (mediaFile.paused) {
                            mediaFile.play()
                            triggerShow(playBtn, stopBtn)
                        } else {
                            mediaFile.pause()
                            triggerShow(stopBtn, playBtn)
                        }
                    }
                })
            })
        }, 1000)


    }
})