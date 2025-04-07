document.addEventListener('DOMContentLoaded', function () {
    // Объявляем глобальные переменные для флага один раз
    let isDrawing = false;
    let selectedColor = '#000000';
    const cellSize = 20;

    // Обработчик для формы регистрации
    const registrationForm = document.querySelector('.registration-form');


    // Связываем поле ввода возраста с ползунком
    const ageInput = document.getElementById('reg-age');
    const ageRange = document.getElementById('reg-age-range');

    if (ageInput && ageRange) {
        ageRange.addEventListener('input', function () {
            ageInput.value = ageRange.value;
        });

        ageInput.addEventListener('input', function () {
            ageRange.value = ageInput.value;
        });
    }

    // Обработчик для ползунка гендерного соотношения
    const genderRatioSlider = document.getElementById('reg-gender-ratio');
    const genderRatioDisplay = document.getElementById('gender-ratio-display');

    if (genderRatioSlider && genderRatioDisplay) {
        genderRatioSlider.addEventListener('input', function () {
            const malePercent = genderRatioSlider.value;
            const femalePercent = 100 - malePercent;
            genderRatioDisplay.textContent = `Мужчина ${malePercent}%, женщина ${femalePercent}%`;
        });
    }

    // Обработчик для добавления члена семьи
    const addMemberBtn = registrationForm.querySelector('.add-member');
    const familyMembersContainer = document.getElementById('family-members-container');

    if (addMemberBtn && familyMembersContainer) {
        addMemberBtn.addEventListener('click', function () {
            const memberTemplate = familyMembersContainer.querySelector('.family-member').cloneNode(true);

            // Очищаем значения полей
            memberTemplate.querySelectorAll('input').forEach(input => {
                input.value = '';
            });

            memberTemplate.querySelectorAll('select').forEach(select => {
                select.selectedIndex = 0;
            });

            // Добавляем обработчик для кнопки удаления
            const removeBtn = memberTemplate.querySelector('.remove-member');
            if (removeBtn) {
                removeBtn.addEventListener('click', function () {
                    memberTemplate.remove();
                });
            }

            familyMembersContainer.appendChild(memberTemplate);
        });
    }

    // Добавляем обработчики для существующих кнопок удаления
    const removeBtns = registrationForm.querySelectorAll('.remove-member');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Проверяем, что это не последний член семьи
            if (familyMembersContainer.querySelectorAll('.family-member').length > 1) {
                btn.closest('.family-member').remove();
            } else {
                alert('Необходимо оставить как минимум одного члена семьи');
            }
        });
    });

    // Обработка отправки формы
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';

        // Простая валидация
        if (!email || !password || !confirmPassword || !agreement) {
            errorMessage.textContent = 'Заполните все обязательные поля';
            errorMessage.style.display = 'block';
            return;
        }


        // Успешная регистрация
        successMessage.style.display = 'block';

        setTimeout(function () {
            registrationForm.reset();
            successMessage.style.display = 'none';
        }, 2000);
    });



    // Обработчик для настроения
    const moodSlider = document.getElementById('reg-mood');
    const moodDisplay = document.getElementById('mood-display');
    if (moodSlider && moodDisplay) {
        moodSlider.addEventListener('input', function () {
            moodDisplay.textContent = `Настроение: ${this.value}%`;
        });
    }


    // Обработчик для номера телефона - форматирование
    const phoneInput = document.getElementById('reg-phone');
    if (phoneInput) {
        phoneInput.addEventListener('focus', function () {
            if (!this.value) {
                this.value = '+7 (';
            }
        });

        phoneInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = value.substring(0, 11);
                let formattedValue = '+7';
                if (value.length > 1) {
                    formattedValue += ' (' + value.substring(1, 4);
                    if (value.length > 4) {
                        formattedValue += ') ' + value.substring(4, 7);
                        if (value.length > 7) {
                            formattedValue += '-' + value.substring(7, 9);
                            if (value.length > 9) {
                                formattedValue += '-' + value.substring(9, 11);
                            }
                        }
                    }
                }
                this.value = formattedValue;
            }
        });
    }


    // Проверка обязательных галочек
    const requiredAgreements = document.querySelectorAll('.required-agreement');
    const registerButton = document.getElementById('register-button');
    const checkTranslationButton = document.getElementById('check-translation');
    const translationResult = document.getElementById('translation-result');
    const chineseTranslationInputs = document.querySelectorAll('input[name="chinese-translation"]');

    // Функция для перемешивания вариантов перевода
    function shuffleTranslations() {
        const container = document.querySelector('.chinese-options');
        if (!container) return;

        // Собираем все пары (радиокнопка + метка)
        const pairs = [];
        const inputs = container.querySelectorAll('input[type="radio"]');

        inputs.forEach(input => {
            // Найдем соответствующую метку
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                pairs.push({
                    input: input.cloneNode(true),
                    label: label.cloneNode(true),
                    value: input.value
                });
            }
        });

        // Перемешиваем пары
        for (let i = pairs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
        }

        // Очищаем контейнер
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // Добавляем перемешанные элементы обратно
        pairs.forEach(pair => {
            container.appendChild(pair.input);
            container.appendChild(pair.label);
        });

    }

    // Функция для проверки всех соглашений
    function checkAllAgreements() {
        let allChecked = true;
        requiredAgreements.forEach(checkbox => {
            if (!checkbox.checked) {
                allChecked = false;
            }
        });
        return allChecked;
    }

    // Слушатели событий для всех галочек
    requiredAgreements.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (checkAllAgreements()) {
                checkTranslationButton.removeAttribute('disabled');
            } else {
                checkTranslationButton.setAttribute('disabled', 'disabled');
                registerButton.setAttribute('disabled', 'disabled');
            }
        });
    });


    // Обработчик кнопки проверки перевода
    if (checkTranslationButton) {
        // Первоначально кнопка должна быть отключена
        if (!checkAllAgreements()) {
            checkTranslationButton.setAttribute('disabled', 'disabled');
        }

        checkTranslationButton.addEventListener('click', function () {
            const selectedTranslation = document.querySelector('input[name="chinese-translation"]:checked');

            if (!selectedTranslation) {
                translationResult.textContent = 'Пожалуйста, выберите вариант перевода';
                translationResult.className = 'validation-message incorrect';
                translationResult.style.display = 'block';
                return;
            }

            if (selectedTranslation.value === 'correct') {
                translationResult.textContent = 'Правильно! Вы можете продолжить регистрацию.';
                translationResult.className = 'validation-message correct';
                registerButton.removeAttribute('disabled');
            } else {
                translationResult.textContent = 'Неправильно. Попробуйте еще раз.';
                translationResult.className = 'validation-message incorrect';
                registerButton.setAttribute('disabled', 'disabled');

                // Очищаем выбранный вариант
                document.querySelectorAll('input[name="chinese-translation"]').forEach(input => {
                    input.checked = false;
                });

                // Перемешиваем варианты ответа
                setTimeout(shuffleTranslations, 500);
            }

            translationResult.style.display = 'block';
        });
    }

    // Отключаем кнопку регистрации по умолчанию
    registerButton.setAttribute('disabled', 'disabled');



    // Тогглинг для блока "Паспортные и банковские данные"
    const togglePassportBank = document.getElementById('toggle-passport-bank');
    const passportBankContainer = document.getElementById('passport-bank-container');
    if (togglePassportBank && passportBankContainer) {
        togglePassportBank.addEventListener('change', function () {
            passportBankContainer.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Тогглинг для блока "Документы (СНИЛС/ИНН/водительские права)"
    const toggleDocuments = document.getElementById('toggle-documents');
    if (toggleDocuments && documentsCard) {
        toggleDocuments.addEventListener('change', function () {
            documentsCard.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Функциональность MBTI и переключения фигур
    const
        triangleCheckbox = document.getElementById('triangle-checkbox'),
        shapeDisplay = document.getElementById('shape-display'),
        borderRadiusSlider = document.getElementById('border-radius-slider');




    // Проверяем начальное состояние при загрузке
    if (triangleCheckbox.checked) {
        shapeDisplay.classList.add('triangle');
        // Выключаем элементы управления вместо скрытия
        if (borderRadiusSlider) {
            borderRadiusSlider.disabled = true;
        }
    }

    triangleCheckbox.addEventListener('change', function () {
        if (this.checked) {
            // Устанавливаем размеры контейнера до изменения класса
            const containerHeight = shapeDisplay.parentElement.offsetHeight;
            shapeDisplay.parentElement.style.minHeight = containerHeight + "px";

            // Применяем класс треугольника
            shapeDisplay.classList.add('triangle');
            shapeDisplay.style.borderRadius = '0';

            // Выключаем элементы управления вместо скрытия
            if (borderRadiusSlider) {
                borderRadiusSlider.disabled = true;
            }
        } else {
            shapeDisplay.classList.remove('triangle');
            shapeDisplay.style.borderRadius = borderRadiusSlider ? borderRadiusSlider.value + 'px' : '0';

            // Включаем элементы управления
            if (borderRadiusSlider) {
                borderRadiusSlider.disabled = false;
            }
        }
    });

    if (borderRadiusSlider) {
        borderRadiusSlider.addEventListener('input', function () {
            if (!triangleCheckbox.checked) {
                shapeDisplay.style.borderRadius = this.value + 'px';
            }
        });
    }


    // Функциональность флага
    const flagCanvas = document.getElementById('flag-canvas'),
        flagColorButtonsContainer = document.getElementById('flag-color-buttons'),
        currentFlagColorDisplay = document.getElementById('current-flag-color'),
        clearFlagButton = document.getElementById('clear-flag'),
        flagTemplateInput = document.getElementById('flag-template');

    let currentFlagColor = '#000000';

    // Общие функции для флага
    function drawGrid(ctx, cellSize) {
        ctx.beginPath();
        for (let x = 0; x < flagCanvas.width; x += cellSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, flagCanvas.height);
        }
        for (let y = 0; y < flagCanvas.height; y += cellSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(flagCanvas.width, y);
        }
        ctx.strokeStyle = "#ddd";
        ctx.stroke();
    }
    if (flagCanvas && flagColorButtonsContainer) {
        const ctx = flagCanvas.getContext('2d');

        const flagPalette = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
            '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#C0C0C0', '#808080'];

        drawGrid(ctx, cellSize);

        // Генерация кнопок выбора цвета
        flagPalette.forEach(color => {
            const btn = document.createElement('button');
            btn.style.backgroundColor = color;
            btn.addEventListener('click', function () {
                currentFlagColor = color;
                currentFlagColorDisplay.textContent = color;
            });
            flagColorButtonsContainer.appendChild(btn);
        });

        // Рисование по клику
        flagCanvas.addEventListener('click', function (event) {
            const rect = flagCanvas.getBoundingClientRect();
            const x = Math.floor((event.clientX - rect.left) / cellSize) * cellSize;
            const y = Math.floor((event.clientY - rect.top) / cellSize) * cellSize;
            ctx.fillStyle = currentFlagColor;
            ctx.fillRect(x, y, cellSize, cellSize);
            ctx.strokeStyle = "#ddd";
            ctx.strokeRect(x, y, cellSize, cellSize);
        });

        // Очистка флага
        if (clearFlagButton) {
            clearFlagButton.addEventListener('click', function () {
                ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);
                drawGrid(ctx, cellSize);
            });
        }

        // Загрузка шаблона
        if (flagTemplateInput) {
            flagTemplateInput.addEventListener('change', function () {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const img = new Image();
                        img.onload = function () {
                            ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);
                            ctx.drawImage(img, 0, 0, flagCanvas.width, flagCanvas.height);
                            drawGrid(ctx, cellSize);
                        }
                        img.src = e.target.result;
                    }
                    reader.readAsDataURL(file);
                }
            });
        }

        function startDrawing(e) {
            isDrawing = true;
            draw(e);
        }

        function draw(e) {
            if (!isDrawing) return;
            const rect = flagCanvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / cellSize) * cellSize;
            const y = Math.floor((e.clientY - rect.top) / cellSize) * cellSize;
            ctx.fillStyle = currentFlagColor;
            ctx.fillRect(x, y, cellSize, cellSize);
            ctx.strokeStyle = "#ddd";
            ctx.strokeRect(x, y, cellSize, cellSize);
        }

        function stopDrawing() {
            isDrawing = false;
        }

        flagCanvas.addEventListener('mousedown', startDrawing);
        flagCanvas.addEventListener('mousemove', draw);
        flagCanvas.addEventListener('mouseup', stopDrawing);
        flagCanvas.addEventListener('mouseout', stopDrawing);

        // Инициализация сетки
        drawGrid(ctx, cellSize);
    }

    // Функциональность включения/отключения полей
    const enablePassportBank = document.getElementById('enable-passport-bank'),
        passportBankCard = document.getElementById('passport-bank-card'),
        enableDocuments = document.getElementById('enable-documents'),
        documentsCard = document.getElementById('documents-card');

    // Обработка карточки с паспортными данными
    if (enablePassportBank && passportBankCard) {
        const passportInputs = passportBankCard.querySelectorAll('input[type="text"], input[type="date"]');
        enablePassportBank.addEventListener('change', function () {
            passportInputs.forEach(input => {
                input.disabled = !this.checked;
            });
        });
    }

    // Обработка карточки с документами
    if (enableDocuments && documentsCard) {
        const documentInputs = documentsCard.querySelectorAll('input[type="text"]');
        enableDocuments.addEventListener('change', function () {
            documentInputs.forEach(input => {
                input.disabled = !this.checked;
            });
        });
    }

    // Обработчики для шкал характера
    document.querySelectorAll('.character-scales input[type="range"]').forEach(slider => {
        const valueDisplay = slider.previousElementSibling.querySelector('.scale-value');
        if (valueDisplay) {
            slider.addEventListener('input', () => {
                valueDisplay.textContent = slider.value;
            });
        }
    });

    // Обработчики для MBTI
    const mbtiToggleGroups = document.querySelectorAll('.mbti-toggle-group');
    const mbtiType = document.querySelector('.mbti-type');
    const mbtiToggleDescription = document.querySelector('.mbti-description');
    const mbtiColors = {
        'ISTJ': '#4A90E2', 'ISFJ': '#50E3C2', 'INFJ': '#B8E986', 'INTJ': '#F5A623',
        'ISTP': '#7ED321', 'ISFP': '#417505', 'INFP': '#9013FE', 'INTP': '#BD10E0',
        'ESTP': '#D0021B', 'ESFP': '#F5A623', 'ENFP': '#7ED321', 'ENTP': '#4A90E2',
        'ESTJ': '#50E3C2', 'ESFJ': '#B8E986', 'ENFJ': '#F5A623', 'ENTJ': '#9013FE'
    };

    mbtiToggleGroups.forEach(group => {
        const toggles = group.querySelectorAll('.mbti-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggles.forEach(t => t.classList.remove('active'));
                toggle.classList.add('active');
                updateMBTI();
            });
        });
    });

    function updateMBTI() {
        const activeToggles = document.querySelectorAll('.mbti-toggle.active');
        if (activeToggles.length === 4) {
            const type = Array.from(activeToggles).map(t => t.dataset.value).join('');
            mbtiType.textContent = type;
            mbtiType.style.color = mbtiColors[type];
            mbtiDescription.style.backgroundColor = `${mbtiColors[type]}22`;
            mbtiToggleDescription.style.backgroundColor = `${mbtiColors[type]}22`;
            // Добавьте описания для каждого типа
            const descriptions = {
                'ISTJ': 'Ответственный и организованный',
                'ISFJ': 'Заботливый и внимательный к деталям',
                // ...добавьте остальные описания
            };
            mbtiToggleDescription.textContent = descriptions[type] || `Тип личности: ${type}`;
        }
    }

    // Обновленное рисование флага
    const ctx = flagCanvas.getContext('2d');

    // Шаблоны флагов
    const flagTemplates = {
        russia: [
            { color: '#FFFFFF', y: 0, height: 100 },
            { color: '#0039A6', y: 100, height: 100 },
            { color: '#D52B1E', y: 200, height: 100 }
        ],
        germany: [
            { color: '#000000', y: 0, height: 100 },
            { color: '#DD0000', y: 100, height: 100 },
            { color: '#FFCE00', y: 200, height: 100 }
        ],
        france: [
            { color: '#0055A4', x: 0, width: 140 },
            { color: '#FFFFFF', x: 140, width: 140 },
            { color: '#EF4135', x: 280, width: 140 }
        ],
        japan: [
            { color: '#FFFFFF', x: 0, y: 0, width: 320, height: 240 },
            { color: '#BC002D', x: 140, y: 80, width: 140, height: 140, isCircle: true }
        ],
        italy: [
            { color: '#009246', x: 0, width: 140 },
            { color: '#FFFFFF', x: 140, width: 140 },
            { color: '#CE2B37', x: 280, width: 140 }
        ]
    };

    // Define cellSize globally
    function pixelateCanvas(ctx, pixelSize) {
        const { width, height } = ctx.canvas;
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        for (let y = 0; y < height; y += pixelSize) {
            for (let x = 0; x < width; x += pixelSize) {
                // Центр квадрата
                const centerX = Math.min(x + Math.floor(pixelSize / 2), width - 1);
                const centerY = Math.min(y + Math.floor(pixelSize / 2), height - 1);
                const centerIndex = (centerY * width + centerX) * 4;

                const r = data[centerIndex];
                const g = data[centerIndex + 1];
                const b = data[centerIndex + 2];
                const a = data[centerIndex + 3];

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                ctx.fillRect(x, y, pixelSize, pixelSize);
            }
        }
    }

    // Update flag template button functionality using pixelateCanvas
    document.querySelectorAll('.flag-template-buttons button').forEach(btn => {
        btn.addEventListener('click', () => {
            const template = flagTemplates[btn.dataset.flag];
            if (template) {
                ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);
                template.forEach(({ color, x = 0, y = 0, width = flagCanvas.width, height = flagCanvas.height, isCircle = false }) => {
                    ctx.fillStyle = color;
                    if (isCircle) {
                        ctx.beginPath();
                        ctx.arc(x + width / 2, y + height / 2, width / 2, 0, Math.PI * 2);
                        ctx.fill();
                    } else {
                        ctx.fillRect(x, y, width, height);
                    }
                });

                // Apply pixelation effect with cellSize
                pixelateCanvas(ctx, cellSize);
                drawGrid(ctx, cellSize);
            }
        });
    });

    flagCanvas.addEventListener('mousedown', startDrawing);
    flagCanvas.addEventListener('mousemove', draw);
    flagCanvas.addEventListener('mouseup', stopDrawing);
    flagCanvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function draw(e) {
        if (!isDrawing) return;
        const rect = flagCanvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / cellSize) * cellSize;
        const y = Math.floor((e.clientY - rect.top) / cellSize) * cellSize;
        ctx.fillStyle = currentFlagColor;
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.strokeStyle = "#ddd";
        ctx.strokeRect(x, y, cellSize, cellSize);
    }

    function stopDrawing() {
        isDrawing = false;
    }

    // Обработчики для MBTI - исправленная версия с предотвращением отправки формы
    if (document.querySelectorAll('.mbti-toggle-group').length > 0) {
        // Полные описания для всех 16 типов MBTI
        const mbtiDescriptions = {
            'ISTJ': 'Ответственный, организованный, практичный и надежный',
            'ISFJ': 'Заботливый, внимательный к деталям, верный и трудолюбивый',
            'INFJ': 'Интуитивный, идеалистичный, стремящийся к гармонии',
            'INTJ': 'Стратегически мыслящий, независимый, логичный',
            'ISTP': 'Наблюдательный, практичный, способный решать проблемы',
            'ISFP': 'Творческий, чувствительный, спокойный и гармоничный',
            'INFP': 'Мечтательный, идеалистичный, руководствуется ценностями',
            'INTP': 'Аналитический, логичный, концептуальный мыслитель',
            'ESTP': 'Энергичный, импульсивный, ориентированный на действие',
            'ESFP': 'Общительный, энергичный, спонтанный и игривый',
            'ENFP': 'Энтузиаст, креативный, общительный и вдохновенный',
            'ENTP': 'Изобретательный, предприимчивый, адаптивный',
            'ESTJ': 'Организованный, эффективный, практичный руководитель',
            'ESFJ': 'Заботливый, общительный, гармоничный и ответственный',
            'ENFJ': 'Вдохновляющий, харизматичный, чуткий и идеалистичный',
            'ENTJ': 'Решительный, логичный, стратегический лидер'
        };

        const mbtiColors = {
            'ISTJ': '#4A90E2', 'ISFJ': '#50E3C2', 'INFJ': '#B8E986', 'INTJ': '#F5A623',
            'ISTP': '#7ED321', 'ISFP': '#417505', 'INFP': '#9013FE', 'INTP': '#BD10E0',
            'ESTP': '#D0021B', 'ESFP': '#F5A623', 'ENFP': '#7ED321', 'ENTP': '#4A90E2',
            'ESTJ': '#50E3C2', 'ESFJ': '#B8E986', 'ENFJ': '#F5A623', 'ENTJ': '#9013FE'
        };

        const mbtiType = document.querySelector('.mbti-type');
        const mbtiDescription = document.querySelector('.mbti-description');
        const mbtiToggleGroups = document.querySelectorAll('.mbti-toggle-group');

        mbtiToggleGroups.forEach(group => {
            const toggles = group.querySelectorAll('.mbti-toggle');
            toggles.forEach(toggle => {
                toggle.addEventListener('click', function (e) {
                    // Предотвращаем отправку формы
                    e.preventDefault();
                    e.stopPropagation();

                    // Удаляем класс active у всех переключателей в этой группе
                    toggles.forEach(t => t.classList.remove('active'));
                    // Добавляем класс active текущему переключателю
                    this.classList.add('active');

                    // Обновляем отображение MBTI
                    updateMBTI();

                });
            });
        });

        function updateMBTI() {
            const activeToggles = document.querySelectorAll('.mbti-toggle.active');
            if (activeToggles.length === 4) {
                const type = Array.from(activeToggles).map(t => t.dataset.value).join('');

                // Обновляем тип личности
                if (mbtiType) {
                    mbtiType.textContent = type;

                    if (mbtiColors[type]) {
                        mbtiType.style.color = mbtiColors[type];
                    }
                }

                // Обновляем описание
                if (mbtiDescription) {
                    mbtiDescription.textContent = mbtiDescriptions[type] || `Тип личности: ${type}`;

                    if (mbtiColors[type]) {
                        mbtiDescription.style.backgroundColor = `${mbtiColors[type]}22`;
                    }

                }
            }
        }
    }

    // CAPTCHA functionality
    const captchaNumber = document.getElementById('captcha-number');
    const captchaSliders = document.querySelectorAll('.captcha-slider');
    const captchaSubmit = document.getElementById('captcha-submit');
    const captchaResult = document.getElementById('captcha-result');

    if (captchaNumber && captchaSliders && captchaSubmit) {
        const generateCaptcha = () => {
            const randomNumber = String(Math.floor(Math.random() * 100000)).padStart(5, '0');
            captchaNumber.textContent = randomNumber;
        };

        const getCaptchaInput = () => Array.from(captchaSliders).map(slider => slider.value).join('');

        captchaSubmit.addEventListener('click', () => {
            const input = getCaptchaInput();
            if (input === captchaNumber.textContent) {
                captchaResult.textContent = 'Капча введена верно!';
                captchaResult.className = 'validation-message success';
            } else {
                captchaResult.textContent = 'Неверная капча. Попробуйте снова.';
                captchaResult.className = 'validation-message error';
            }
        });

        generateCaptcha();
    }

    // Loans functionality
    const loansContainer = document.getElementById('loans-container');
    const addLoanButton = document.querySelector('.add-loan');

    if (loansContainer && addLoanButton) {
        addLoanButton.addEventListener('click', () => {
            const loanTemplate = `
                <div class="loan">
                    <div class="form-group">
                        <label>Тип кредита:</label>
                        <select>
                            <option value="" disabled selected>Выберите тип</option>
                            <option value="mortgage">Ипотека</option>
                            <option value="car">Автокредит</option>
                            <option value="consumer">Потребительский</option>
                            <option value="business">Бизнес-кредит</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Кредитор:</label>
                        <input type="text" placeholder="Сбербанк">
                    </div>
                    <div class="form-group">
                        <label>Сумма кредита:</label>
                        <input type="number" placeholder="1000000 ₽">
                    </div>
                    <div class="form-group">
                        <label>Дата открытия:</label>
                        <input type="date">
                    </div>
                    <div class="form-group">
                        <label>Статус:</label>
                        <select>
                            <option value="active">Активен</option>
                            <option value="closed">Закрыт</option>
                            <option value="overdue">Просрочен</option>
                        </select>
                    </div>
                    <button type="button" class="remove-loan">Удалить</button>
                </div>
            `;
            const loanElement = document.createElement('div');
            loanElement.innerHTML = loanTemplate;
            loansContainer.appendChild(loanElement);

            loanElement.querySelector('.remove-loan').addEventListener('click', () => {
                loanElement.remove();
            });
        });
    }

    // Reaction test functionality
    const reactionStart = document.getElementById('reaction-start');
    const reactionTimer = document.getElementById('reaction-timer');
    const reactionResult = document.getElementById('reaction-result');

    if (reactionStart && reactionTimer) {
        let timerInterval;
        let startTime;

        reactionStart.addEventListener('click', () => {
            if (reactionStart.textContent === 'Старт') {
                reactionStart.textContent = 'Стоп';
                reactionResult.textContent = '';
                startTime = Date.now();
                reactionTimer.textContent = '10.000';

                timerInterval = setInterval(() => {
                    const elapsed = (Date.now() - startTime) / 1000;
                    const remaining = Math.max(10 - elapsed, 0).toFixed(3);
                    reactionTimer.textContent = remaining;

                    if (remaining <= 0) {
                        clearInterval(timerInterval);
                        reactionStart.textContent = 'Старт';
                        reactionResult.textContent = 'Время вышло!';
                        reactionResult.className = 'validation-message error';
                    }
                }, 10);
            } else {
                clearInterval(timerInterval);
                const elapsed = (Date.now() - startTime) / 1000;
                const difference = Math.abs(10 - elapsed).toFixed(3);
                reactionStart.textContent = 'Старт';
                reactionResult.textContent = `Ваш результат: ${difference} секунд.`;
                reactionResult.className = 'validation-message success';
            }
        });
    }

    // Форматирование СНИЛС по маске XXX-XXX-XXX YY
    const snilsInput = document.getElementById('snils');
    if (snilsInput) {
        snilsInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);

            let formattedValue = '';
            if (value.length > 0) {
                formattedValue += value.substring(0, Math.min(3, value.length));
                if (value.length > 3) {
                    formattedValue += '-' + value.substring(3, Math.min(6, value.length));
                    if (value.length > 6) {
                        formattedValue += '-' + value.substring(6, Math.min(9, value.length));
                        if (value.length > 9) {
                            formattedValue += ' ' + value.substring(9, 11);
                        }
                    }
                }
            }
            this.value = formattedValue;
        });
    }

    // Форматирование ИНН (12 цифр)
    const innInput = document.getElementById('inn');
    if (innInput) {
        innInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 12) {
                value = value.substring(0, 12);
            }
            this.value = value;
        });
    }

    // Форматирование водительских прав по маске XX XX XXXXXX
    const driverLicenseInput = document.getElementById('driver-license');
    if (driverLicenseInput) {
        driverLicenseInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 10) value = value.substring(0, 10);

            let formattedValue = '';
            if (value.length > 0) {
                formattedValue += value.substring(0, Math.min(2, value.length));
                if (value.length > 2) {
                    formattedValue += ' ' + value.substring(2, Math.min(4, value.length));
                    if (value.length > 4) {
                        formattedValue += ' ' + value.substring(4, 10);
                    }
                }
            }
            this.value = formattedValue;
        });
    }

    // Включение/отключение полей документов

    if (enableDocuments && documentsCard) {
        const documentInputs = documentsCard.querySelectorAll('input[type="text"]');
        enableDocuments.addEventListener('change', function () {
            documentInputs.forEach(input => {
                input.disabled = !this.checked;
            });
        });
    }

    // CAPTCHA функциональность

    if (captchaNumber && captchaSliders.length > 0 && captchaSubmit) {
        // Генерация случайного числа от 00000 до 99999
        const generateCaptcha = () => {
            const randomNumber = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
            captchaNumber.textContent = randomNumber;
            return randomNumber;
        };

        let correctCaptcha = generateCaptcha();

        // Обновление значения на дисплее при изменении слайдера
        captchaSliders.forEach((slider, index) => {
            slider.addEventListener('input', function () {
                // Ничего не делаем, так как мы не обновляем отображение ввода
            });
        });

        // Проверка CAPTCHA при нажатии кнопки
        captchaSubmit.addEventListener('click', function () {
            const input = Array.from(captchaSliders).map(slider => slider.value).join('');

            if (input === correctCaptcha) {
                captchaResult.textContent = 'Капча введена верно!';
                captchaResult.className = 'validation-message success';
                captchaResult.style.display = 'block';
                // Генерируем новую капчу после успешного ввода
                correctCaptcha = generateCaptcha();
            } else {
                captchaResult.textContent = 'Неверная капча. Попробуйте снова.';
                captchaResult.className = 'validation-message error';
                captchaResult.style.display = 'block';
            }
        });
    }

    // Функциональность кредитов

    if (loansContainer && addLoanButton) {
        addLoanButton.addEventListener('click', function () {
            const loanTemplate = document.createElement('div');
            loanTemplate.className = 'loan';
            loanTemplate.innerHTML = `
                <div class="form-group">
                    <label>Тип кредита:</label>
                    <select>
                        <option value="" disabled selected>Выберите тип</option>
                        <option value="mortgage">Ипотека</option>
                        <option value="car">Автокредит</option>
                        <option value="consumer">Потребительский</option>
                        <option value="business">Бизнес-кредит</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Кредитор:</label>
                    <input type="text" placeholder="Сбербанк">
                </div>
                <div class="form-group">
                    <label>Сумма кредита:</label>
                    <input type="number" placeholder="1000000 ₽">
                </div>
                <div class="form-group">
                    <label>Дата открытия:</label>
                    <input type="date">
                </div>
                <div class="form-group">
                    <label>Статус:</label>
                    <select>
                        <option value="active" selected>Активен</option>
                        <option value="closed">Закрыт</option>
                        <option value="overdue">Просрочен</option>
                    </select>
                </div>
                <button type="button" class="remove-loan">Удалить</button>
            `;

            loansContainer.appendChild(loanTemplate);

            // Добавляем обработчик для кнопки удаления
            const removeButton = loanTemplate.querySelector('.remove-loan');
            removeButton.addEventListener('click', function () {
                loanTemplate.remove();
            });
        });
    }

    // Тест на реакцию

    if (reactionStart && reactionTimer && reactionResult) {
        let timerInterval;
        let startTime;
        let isTimerRunning = false;

        // Точность до миллисекунд
        const formatTime = (time) => {
            return time.toFixed(3);
        };

        reactionStart.addEventListener('click', function () {
            if (!isTimerRunning) {
                // Запуск таймера
                isTimerRunning = true;
                reactionStart.textContent = 'Стоп';
                reactionResult.textContent = '';
                reactionResult.style.display = 'none';
                startTime = Date.now();

                timerInterval = setInterval(function () {
                    const elapsedTime = (Date.now() - startTime) / 1000;
                    const remainingTime = Math.max(10 - elapsedTime, 0);

                    reactionTimer.textContent = formatTime(remainingTime);

                    if (remainingTime <= 0) {
                        clearInterval(timerInterval);
                        isTimerRunning = false;
                        reactionStart.textContent = 'Старт';
                        reactionResult.textContent = 'Время вышло!';
                        reactionResult.className = 'validation-message error';
                        reactionResult.style.display = 'block';
                    }
                }, 10); // Обновляем каждые 10 мс для точности
            } else {
                // Остановка таймера
                clearInterval(timerInterval);
                isTimerRunning = false;
                reactionStart.textContent = 'Старт';

                const elapsedTime = (Date.now() - startTime) / 1000;
                const deviation = Math.abs(10 - elapsedTime);

                reactionResult.textContent = `Ваш результат: ${formatTime(deviation)} секунд от идеальных 10 секунд`;
                reactionResult.className = 'validation-message success';
                reactionResult.style.display = 'block';
            }
        });
    }

    // Функциональность флага - исправленная
    const flagColorButtons = document.getElementById('flag-color-buttons');
    const flagTemplateButtons = document.querySelectorAll('.flag-template-buttons button');

    if (flagCanvas) {
        const ctx = flagCanvas.getContext('2d');
        let selectedColor = '#000000';

        // Шаблоны флагов - четкое определение для России, Германии, Франции, Японии и Италии
        const flagTemplates = {
            russia: [
                { color: '#FFFFFF', x: 0, y: 0, width: flagCanvas.width, height: flagCanvas.height / 3 },
                { color: '#0039A6', x: 0, y: flagCanvas.height / 3, width: flagCanvas.width, height: flagCanvas.height / 3 },
                { color: '#D52B1E', x: 0, y: 2 * flagCanvas.height / 3, width: flagCanvas.width, height: flagCanvas.height / 3 }
            ],
            germany: [
                { color: '#000000', x: 0, y: 0, width: flagCanvas.width, height: flagCanvas.height / 3 },
                { color: '#DD0000', x: 0, y: flagCanvas.height / 3, width: flagCanvas.width, height: flagCanvas.height / 3 },
                { color: '#FFCE00', x: 0, y: 2 * flagCanvas.height / 3, width: flagCanvas.width, height: flagCanvas.height / 3 }
            ],
            france: [
                { color: '#0055A4', x: 0, y: 0, width: flagCanvas.width / 3, height: flagCanvas.height },
                { color: '#FFFFFF', x: flagCanvas.width / 3, y: 0, width: flagCanvas.width / 3, height: flagCanvas.height },
                { color: '#EF4135', x: 2 * flagCanvas.width / 3, y: 0, width: flagCanvas.width / 3, height: flagCanvas.height }
            ],
            japan: [
                { color: '#FFFFFF', x: 0, y: 0, width: flagCanvas.width, height: flagCanvas.height },
                {
                    color: '#BC002D', x: flagCanvas.width / 2 - flagCanvas.height * 0.3, y: flagCanvas.height / 2 - flagCanvas.height * 0.3,
                    radius: flagCanvas.height * 0.3, isCircle: true
                }
            ],
            italy: [
                { color: '#009246', x: 0, y: 0, width: flagCanvas.width / 3, height: flagCanvas.height },
                { color: '#FFFFFF', x: flagCanvas.width / 3, y: 0, width: flagCanvas.width / 3, height: flagCanvas.height },
                { color: '#CE2B37', x: 2 * flagCanvas.width / 3, y: 0, width: flagCanvas.width / 3, height: flagCanvas.height }
            ]
        };

        // Функция для рисования сетки
        function drawGrid(ctx, cellSize) {
            ctx.beginPath();
            for (let x = 0; x <= flagCanvas.width; x += cellSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, flagCanvas.height);
            }
            for (let y = 0; y <= flagCanvas.height; y += cellSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(flagCanvas.width, y);
            }
            ctx.strokeStyle = '#ddd';
            ctx.stroke();
        }

        // Инициализация - очистка и рисование сетки
        function initCanvas() {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, flagCanvas.width, flagCanvas.height);
            drawGrid(ctx, cellSize);
        }

        // Применяем шаблон флага
        function applyFlagTemplate(template) {
            ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);

            if (!template || !flagTemplates[template]) {
                console.error('Template not found:', template);
                initCanvas();
                return;
            }

            flagTemplates[template].forEach(part => {
                ctx.fillStyle = part.color;

                if (part.isCircle && part.radius) {
                    // Рисуем круг (для японского флага)
                    ctx.beginPath();
                    ctx.arc(part.x + part.radius, part.y + part.radius, part.radius, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Рисуем прямоугольник
                    ctx.fillRect(part.x, part.y, part.width, part.height);
                }
            });

            // Рисуем сетку поверх флага
            drawGrid(ctx, cellSize);
        }

        // Создаем цветовую палитру кнопок
        if (flagColorButtons) {
            const colors = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
                '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#C0C0C0', '#808080'];

            colors.forEach(color => {
                const btn = document.createElement('button');
                btn.style.backgroundColor = color;
                btn.setAttribute('data-color', color);
                btn.style.width = '30px';
                btn.style.height = '30px';
                btn.style.margin = '2px';
                btn.style.cursor = 'pointer';
                btn.style.border = color === '#FFFFFF' ? '1px solid #ddd' : 'none';

                btn.addEventListener('click', function () {
                    selectedColor = color;
                    if (currentFlagColor) currentFlagColor.textContent = color;
                });

                flagColorButtons.appendChild(btn);
            });
        }

        // Обработчики событий для рисования
        if (flagCanvas) {
            flagCanvas.addEventListener('mousedown', function (e) {
                isDrawing = true;
                drawPixel(e);
            });

            flagCanvas.addEventListener('mousemove', function (e) {
                if (isDrawing) drawPixel(e);
            });

            flagCanvas.addEventListener('mouseup', function () {
                isDrawing = false;
            });

            flagCanvas.addEventListener('mouseleave', function () {
                isDrawing = false;
            });

            function drawPixel(e) {
                const rect = flagCanvas.getBoundingClientRect();
                const x = Math.floor((e.clientX - rect.left) / cellSize) * cellSize;
                const y = Math.floor((e.clientY - rect.top) / cellSize) * cellSize;

                ctx.fillStyle = selectedColor;
                ctx.fillRect(x, y, cellSize, cellSize);

                // Восстанавливаем границы ячейки
                ctx.strokeStyle = '#ddd';
                ctx.strokeRect(x, y, cellSize, cellSize);
            }
        }

        // Обработчик для кнопки очистки
        if (clearFlagButton) {
            clearFlagButton.addEventListener('click', function () {
                initCanvas();
            });
        }

        // Обработчики для кнопок шаблонов флагов
        if (flagTemplateButtons.length > 0) {
            flagTemplateButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const flagType = this.getAttribute('data-flag');
                    if (flagType) {
                        applyFlagTemplate(flagType);
                    }
                });
            });
        }

        // Инициализируем холст при загрузке
        initCanvas();
    }

});
