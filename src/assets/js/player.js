document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('audio')) {
        const isTouch = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0
        const events = {
            click: isTouch ? 'touchstart' : 'mousedown',
            move: isTouch ? 'touchmove' : 'mousemove',
            end: isTouch ? 'touchend' : 'mouseup'
        }

        const generatePodcastSource = () => {
            //Путь к папке с подкастами
            const BASE_URL = '/assets/mp3/'
            /**
             * Генерируем ссылку на подкаст.
             * На выходе получается 'ep-15.mp3', где 15 - номер подкаста, получаемый из кода в фигурных скобках
             */
            const num = new URLSearchParams(window.location.search).get('ep')
            const episode = `ep-${num}.mp3`

            getContentForPodcast(num)
            enablePodcastNavigation(num)
            //Соединяем путь к папке подкастов с названием конкретного подкаста, чтобы вставить его на сайт
            return BASE_URL + episode
        }

        const getContentForPodcast = (podcastNum) => {
            const CONTENT = {
                '2': {
                    title: "«Вас обязательно захейтят»: о настоящем и будущем коммуникаций в России с Марией Лапук (Vinci Agency)",
                    text: ['В гостях «А за окном Россия» — соосновательница Vinci Agency, эксперт по продвижению технологических компаний Мария Лапук.',
                        `Обсудил с Марией:

                            что будет с PR в России;  
                            как брендам сейчас общаться с аудиторией;
                            как пробиться в инфополе с новостями компаний;
                            зависит ли от пиара успех стартапа и многое другое.`,
                        'А ещё я узнал, какие у Марии любимая книга и хобби (спойлер — работа).'
                    ]
                },
                '3': {
                    title: "«Программист — это путь, который вечен»: об ИТ-сообществе и хакатонах с Андреем Кавериным (МТС Digital)",
                    text: ['Поговорили со старшим ML-разработчиком МТС Digital, амбассадором конкурса «Цифровой прорыв» Андреем Кавериным о том, что объединяет айтишников и как стать одним из них.',
                        `Во втором выпуске «А за окном Россия»:

                            как перейти из программистов в ML-инженеры;
                            легко ли стать ИТ-специалистом;
                            чем отличаются друг от друга языки программирования;
                            возможно ли создать российский аналог GitHub;
                            почему ИТ-сообщество такое сплочённое.`
                    ]
                },
                '4': {
                    title: "«Где есть деньги, там есть IT»: о рынке труда и ИТ-кадрах с Алексеем Захаровым (SuperJob)",
                    text: ['Гость нового выпуска «А за окном Россия» — основатель и президент компании SuperJob Алексей Захаров. Кстати, Алексей — человек с первым дипломом в России со словом «интернет».',
                        `
                        Обсудили с Алексеем:

                            переоценены ли айтишники;
                            можно ли предсказать тренды рынка труда;
                            какие меры поддержки нужны ИТ-бизнесу;
                            как проблемы в сфере образования тормозят ИТ-отрасль и многое другое.`,
                        'А ещё Алексей поделился своим философским пониманием счастья. '
                    ]
                },
                '5': {
                    title: "«Конкуренция залипательного эффекта»: о супераппах и эмоциональном ИИ с Анной Ивановой (Rambler&Co)",
                    text: ['Что такое супераппы и есть ли они в России? Почему за голосовыми технологиями будущее? Что должен уметь digital-журналист? Эти и другие вопросы мы обсудили с директором департамента дистрибуции контента и технологий Rambler & Co Анной Ивановой']
                },
                '6': {
                    title: "«Цифра меняет и космос»: о спутниках, венчуре и мечтах о звёздах с Антоном Алексеевым («Новый космос»)",
                    text: ['Как цифровые технологии проникают в космическую индустрию? Как сделать космос снова модным в России? Может ли в России появиться своя Кремниевая долина? Что полезнее для бизнеса: венчур или гранты?',
                        'Обо всём этом и не только поговорили с генеральным директором аэрокосмической корпорации «Новый космос» Антоном Алексеевым. Кстати, этот выпуск мы записали на площадке РИФа.'
                    ]
                },
                '7': {
                    title: "«Сравнение позволяет клиенту понять, что лучше»: о финтехе и метавселенных с Алексеем Грибковым (Сравни)",
                    text: ['В гостях у «А за окном Россия» — заместитель генерального директора Финансового маркетплейса Сравни Алексей Грибков.',
                        `
                        Обсудили с Алексеем:

                            почему в России крутой финтех, но низкая финансовая грамотность;
                            что такое финансовый маркетплейс и зачем нужен этот статус;
                            как скоро мы окажемся в метавселенных. 
                        `
                    ]
                },
                '8': {
                    title: "«Заряд уверенности перевернул моё сознание»: о йоге и программировании с ИТ-предпринимателем Кириллом Непомилуевым",
                    text: ['Йога + ИТ = ? Ответ на этот вопрос точно знает ИТ-предприниматель, инструктор йоги и амбассадор конкурса «Цифровой прорыв» Кирилл Непомилуев.',
                        `
                        Поговорили с Кириллом о том:

                            можно ли стать программистом с нуля после 30 лет;
                            какие ИТ-решения нужны спортивной индустрии;
                            зачем участвовать в хакатонах;
                            какие навыки помогает развить йога. 
                        `
                    ]
                },
                '9': {
                    title: "«Давайте не только тратить деньги, но и зарабатывать»: о трендах соцсетей с Семёном Теняевым (TenChat)",
                    text: ['В гостях «А за окном Россия» — основатель TenChat Семён Теняев.',
                        `
                        Обсудили с Семёном:

                            что нужно пользователям от соцсетей;
                            есть ли у TenChat конкуренты;
                            нужно ли регулировать алгоритмы соцсетей; 
                            можно ли искать тендеры в соцсети.
                        `
                    ]
                },
                '10': {
                    title: "Восхищаюсь не нейросетями, а их разработчиками»: об ИИ и медицине с Егором Богдановым (Forward-IT)",
                    text: ['ИТ-предприниматель, амбассадор конкурса «Цифровой прорыв. Сезон: искусственный интеллект» Егор Богданов делится своей историей: от программирования на советском «Агате» до интегратора цифровых решений Forward-IT в сфере ИИ и медицины.',
                        `
                        Узнал у Егора: 

                            чего нам не хватает, чтобы выращивать единорогов;
                            заменит ли ИИ врача;
                            какие есть трудности при внедрении ИИ-решения в поликлиниках; 
                            могут ли разработчики-злодеи создать ИИ, который поработит человечество. 
                        `
                    ]
                },
                '11': {
                    title: "RPA: что это и зачем нужно бизнесу?",
                    text: ['Стартует новый сезон «А за окном Россия»! И первый гость — основатель «Миг33», председатель кластера «РАЭК / RPA» Сергей Вотяков.',
                        `
                        Обсудили с Сергеем:

                            как RPA помогает бизнесу;
                            есть ли перспективы у этого рынка в России;
                            лишатся ли люди работы из-за роботов;
                            почему бизнес боится внедрять RPA-решения.
                        `
                    ]
                },
                '12': {
                    title: "Digital в фарме: реклама, блогеры и ИИ",
                    text: [`
                            Как рекламировать лекарства креативно, этично и в рамках закона? 
                            Каким источникам о препаратах стоит доверять? 
                            Могут ли врачи и фармацевты быть блогерами?  `,
                        'Эти и другие вопросы обсудили с Наталией Власенко, управляющим директором агентства MOLEKULA (Atom Media Group), председателем кластера «РАЭК / Pharma & IT».'
                    ]
                },
                '13': {
                    title: "Онлайн-сделки и VR: как инновации меняют рынок недвижимости",
                    text: ['Меняет ли цифра рынок недвижимости? И нужно ли это покупателям? В гостях «А за окном Россия» — председатели кластера «РАЭК / Недвижимость» Олег Казаков и Айгуль Дуйсембаева из Atom Media Group.',
                        `
                        Обсудили с гостями:

                            что важнее: технологии или цена; 
                            как поколение зумеров выбирает квартиры;
                            как работают онлайн-продажи сегодня;
                            какие застройщики самые инновационные.
                        `
                    ]
                },
                '14': {
                    title: "Наука + практика: ИИ, беспилотный транспорт и путь к профессии",
                    text: ['Гостем «А за окном Россия» стал Роман Вайнберг — руководитель отдела стратегического развития и партнёрств Центра когнитивного моделирования МФТИ, эксперт Кластера «РАЭК/ Искусственный интеллект».',
                        `
                            Обсудили с Романом:

                                какие навыки нужны, чтобы разбираться в искусственном интеллекте;
                                какое место у России по внедрению ИИ в мире;
                                чем занимаются учёные в сфере ИИ и робототехники; 
                                беспилотный транспорт — далёкое будущее или счастливое завтра;
                                как студенту найти свой путь в ИТ. 
                            `
                    ]
                },
                '15': {
                    title: "Киберспорт: спорт, бизнес или нечто большее?",
                    text: ['В студии «А за окном Россия» — Ярослав Мешалкин, директор по стратегическим коммуникациям ESforce Holding, председатель Кластера «РАЭК / Игровая индустрия и киберспорт».',
                        `
                        Обсудили с Ярославом:

                            является ли Россия лидером в киберспорте;
                            кто может быть киберспортсменом; 
                            как СМИ спекулируют на теме киберспорта;
                            за каким трендом киберспорта важно следить.
                        `
                    ]
                },
                '16': {
                    title: "Цифровой этикет: как вести себя в сети?",
                    text: ['Гостем подкаста «А за окном Россия» стала Ольга Лукинова — автор книги «Цифровой этикет: как не бесить друг друга в интернете», преподаватель РАНХиГС, создатель телеграм-канала «Цифровой этикет».',
                        `Обсудили с Ольгой:

                            как меняется цифровой этикет;
                            может ли руководитель добавлять в друзья младших сотрудников; 
                            что не так со словом «коллеги»;
                            можно ли ставить точку в сообщениях.  
                        `
                    ]
                },
            }

            const {
                title,
                text
            } = CONTENT[podcastNum]

            document.querySelectorAll('.title').forEach(($el, i) => i < 2 ? $el.textContent = title : null)
            document.querySelector('.media-text').insertAdjacentHTML('afterbegin',
                text.map(textEl => `<p class="text-bottom">${textEl}</p>`).join('')
            )
        }

        const enablePodcastNavigation = (podcastNum) => {
            const MAX = '16'
            const MIN = '2'

            document.querySelector(`[data-nav='prev']`).addEventListener('click', () => {
                if(podcastNum -  1 > MIN) {
                    window.open(`/podcast.html?ep=${podcastNum - 1}`, '_self')
                }
            })

            document.querySelector(`[data-nav='next']`).addEventListener('click', () => {
                if((+podcastNum) +  1 < MAX) {
                    window.open(`/podcast.html?ep=${(+podcastNum) + 1}`, '_self')
                }
            })
        }

        const audioPlayer = document.querySelector('audio');

        //Если динамическая генерация ссылки на подкаст больше не требуется - необходимо убрать следующую строку
        audioPlayer.src = generatePodcastSource()

        const mediaFile = new Audio(audioPlayer.src)
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