document.addEventListener('DOMContentLoaded', function () {
    // Variable declaration at the top
    let isDrawing = false;
    let currentFlagColor = '#000000'; // Add missing variable declaration
    
    const cellSize = 20;
    const registrationForm = document.querySelector('.registration-form');
    const container = document.querySelector('.chinese-options');
    const selectedTranslation = document.querySelector('input[name="chinese-translation"]:checked');
    const mbtiType = document.querySelector('.mbti-type');
    const mbtiToggleDescription = document.querySelector('.mbti-description');
    const mbtiDescription = document.querySelector('.mbti-description');
    const addLoanButton = document.querySelector('.add-loan');
    const ageInput = document.getElementById('reg-age');
    const ageRange = document.getElementById('reg-age-range');
    const genderRatioSlider = document.getElementById('reg-gender-ratio');
    const genderRatioDisplay = document.getElementById('gender-ratio-display');
    const familyMembersContainer = document.getElementById('family-members-container');
    const moodSlider = document.getElementById('reg-mood');
    const moodDisplay = document.getElementById('mood-display');
    const phoneInput = document.getElementById('reg-phone');
    const registerButton = document.getElementById('register-button');
    const checkTranslationButton = document.getElementById('check-translation');
    const translationResult = document.getElementById('translation-result');
    const togglePassportBank = document.getElementById('toggle-passport-bank');
    const passportBankContainer = document.getElementById('passport-bank-container');
    const toggleDocuments = document.getElementById('toggle-documents');
    const triangleCheckbox = document.getElementById('triangle-checkbox');
    const shapeDisplay = document.getElementById('shape-display');
    const borderRadiusSlider = document.getElementById('border-radius-slider');
    const flagCanvas = document.getElementById('flag-canvas');
    const ctx = flagCanvas.getContext('2d');
    const flagColorButtonsContainer = document.getElementById('flag-color-buttons');
    const currentFlagColorDisplay = document.getElementById('current-flag-color');
    const clearFlagButton = document.getElementById('clear-flag');
    const flagTemplateInput = document.getElementById('flag-template');
    const enablePassportBank = document.getElementById('enable-passport-bank');
    const passportBankCard = document.getElementById('passport-bank-card');
    const enableDocuments = document.getElementById('enable-documents');
    const documentsCard = document.getElementById('documents-card');
    const captchaNumber = document.getElementById('captcha-number');
    const captchaSubmit = document.getElementById('captcha-submit');
    const captchaResult = document.getElementById('captcha-result');
    const loansContainer = document.getElementById('loans-container');
    const reactionStart = document.getElementById('reaction-start');
    const reactionTimer = document.getElementById('reaction-timer');
    const reactionResult = document.getElementById('reaction-result');
    const snilsInput = document.getElementById('snils');
    const innInput = document.getElementById('inn');
    const driverLicenseInput = document.getElementById('driver-license');
    const flagColorButtons = document.getElementById('flag-color-buttons');

    if (ageInput && ageRange) {
        ageRange.addEventListener('input', function () {
            ageInput.value = ageRange.value;
        });
        ageInput.addEventListener('input', function () {
            ageRange.value = ageInput.value;
        });
    }

    if (genderRatioSlider && genderRatioDisplay) {
        genderRatioSlider.addEventListener('input', function () {
            const malePercent = genderRatioSlider.value;
            const femalePercent = 100 - malePercent;
            genderRatioDisplay.textContent = `Мужчина ${malePercent}%, женщина ${femalePercent}%`;
        });
    }
    const addMemberBtn = registrationForm.querySelector('.add-member');
    if (addMemberBtn && familyMembersContainer) {
        addMemberBtn.addEventListener('click', function () {
            const memberTemplate = familyMembersContainer.querySelector('.family-member').cloneNode(true);
            memberTemplate.querySelectorAll('input').forEach(input => {
                input.value = '';
            });
            memberTemplate.querySelectorAll('select').forEach(select => {
                select.selectedIndex = 0;
            });
            const removeBtn = memberTemplate.querySelector('.remove-member');
            if (removeBtn) {
                removeBtn.addEventListener('click', function () {
                    memberTemplate.remove();
                });
            }
            familyMembersContainer.appendChild(memberTemplate);
        });
    }
    const removeBtns = registrationForm.querySelectorAll('.remove-member');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (familyMembersContainer.querySelectorAll('.family-member').length > 1) {
                btn.closest('.family-member').remove();
            } else {
                alert('Необходимо оставить как минимум одного члена семьи');
            }
        });
    });
    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
        if (!email || !password || !confirmPassword || !agreement) {
            errorMessage.textContent = 'Заполните все обязательные поля';
            errorMessage.style.display = 'block';
            return;
        }
        successMessage.style.display = 'block';
        setTimeout(function () {
            registrationForm.reset();
            successMessage.style.display = 'none';
        }, 2000);
    });
    if (moodSlider && moodDisplay) {
        moodSlider.addEventListener('input', function () {
            moodDisplay.textContent = `Настроение: ${this.value}%`;
        });
    }

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
    const requiredAgreements = document.querySelectorAll('.required-agreement');
    const chineseTranslationInputs = document.querySelectorAll('input[name="chinese-translation"]');
    function shuffleTranslations() {
        if (!container) return;
        const pairs = [];
        const inputs = container.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => {
            if (label) {
                pairs.push({
                    input: input.cloneNode(true),
                    label: label.cloneNode(true),
                    value: input.value
                });
            }
        });
        for (let i = pairs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
        }
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        pairs.forEach(pair => {
            container.appendChild(pair.input);
            container.appendChild(pair.label);
        });
    }
    function checkAllAgreements() {
        let allChecked = true;
        requiredAgreements.forEach(checkbox => {
            if (!checkbox.checked) {
                allChecked = false;
            }
        });
        return allChecked;
    }
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
    if (checkTranslationButton) {
        if (!checkAllAgreements()) {
            checkTranslationButton.setAttribute('disabled', 'disabled');
        }
        checkTranslationButton.addEventListener('click', function () {
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
                document.querySelectorAll('input[name="chinese-translation"]').forEach(input => {
                    input.checked = false;
                });
                setTimeout(shuffleTranslations, 500);
            }
            translationResult.style.display = 'block';
        });
    }
    registerButton.setAttribute('disabled', 'disabled');
    if (togglePassportBank && passportBankContainer) {
        togglePassportBank.addEventListener('change', function () {
            passportBankContainer.style.display = this.checked ? 'block' : 'none';
        });
    }
    if (toggleDocuments && documentsCard) {
        toggleDocuments.addEventListener('change', function () {
            documentsCard.style.display = this.checked ? 'block' : 'none';
        });
    }

    if (triangleCheckbox.checked) {
        shapeDisplay.classList.add('triangle');
        if (borderRadiusSlider) {
            borderRadiusSlider.disabled = true;
        }
    }
    triangleCheckbox.addEventListener('change', function () {
        if (this.checked) {
            const containerHeight = shapeDisplay.parentElement.offsetHeight;
            shapeDisplay.parentElement.style.minHeight = containerHeight + "px";
            shapeDisplay.classList.add('triangle');
            shapeDisplay.style.borderRadius = '0';
            if (borderRadiusSlider) {
                borderRadiusSlider.disabled = true;
            }
        } else {
            shapeDisplay.classList.remove('triangle');
            shapeDisplay.style.borderRadius = borderRadiusSlider ? borderRadiusSlider.value + 'px' : '0';
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
    const flagPalette = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
        '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#C0C0C0', '#808080'];
    drawGrid(ctx, cellSize);
    flagPalette.forEach(color => {
        const btn = document.createElement('button');
        btn.style.backgroundColor = color;
        btn.addEventListener('click', function () {
            currentFlagColor = color; // Ensure currentFlagColor is updated
            currentFlagColorDisplay.textContent = color;
        });
        flagColorButtonsContainer.appendChild(btn);
    });
    flagCanvas.addEventListener('click', function (event) {
        const rect = flagCanvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / cellSize) * cellSize;
        const y = Math.floor((event.clientY - rect.top) / cellSize) * cellSize;
        ctx.fillStyle = currentFlagColor;
        ctx.fillRect(x, y, cellSize, cellSize);
        ctx.strokeStyle = "#ddd";
        ctx.strokeRect(x, y, cellSize, cellSize);
    });
    if (clearFlagButton) {
        clearFlagButton.addEventListener('click', function () {
            ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);
            drawGrid(ctx, cellSize);
        });
    }
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

    // Define drawing functions once
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

    // Only add event listeners once
    if (flagCanvas) {
        flagCanvas.addEventListener('mousedown', startDrawing);
        flagCanvas.addEventListener('mousemove', draw);
        flagCanvas.addEventListener('mouseup', stopDrawing);
        flagCanvas.addEventListener('mouseout', stopDrawing);
    }

    if (enablePassportBank && passportBankCard) {
        const passportInputs = passportBankCard.querySelectorAll('input[type="text"], input[type="date"]');
        enablePassportBank.addEventListener('change', function () {
            passportInputs.forEach(input => {
                input.disabled = !this.checked;
            });
        });
    }
    if (enableDocuments && documentsCard) {
        const documentInputs = documentsCard.querySelectorAll('input[type="text"]');
        enableDocuments.addEventListener('change', function () {
            documentInputs.forEach(input => {
                input.disabled = !this.checked;
            });
        });
    }
    const characterScales = document.querySelectorAll('#character-scales input[type="range"]');
    if (characterScales.length > 0) {
        characterScales.forEach(slider => {
            // Select the label element that's the immediate previous sibling of this slider
            const label = slider.previousElementSibling;
            if (label) {
                // Find the span with class 'scale-value' inside the label
                const valueDisplay = label.querySelector('.scale-value');
                if (valueDisplay) {
                    // Update the initial display
                    valueDisplay.textContent = slider.value;
                    
                    // Add event listener to update the display when slider value changes
                    slider.addEventListener('input', function() {
                        valueDisplay.textContent = this.value;
                    });
                }
            }
        });
    }
    const mbtiToggleGroups = document.querySelectorAll('.mbti-toggle-group');
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
            const descriptions = {
                'ISTJ': 'Ответственный и организованный',
                'ISFJ': 'Заботливый и внимательный к деталям',
            };
            mbtiToggleDescription.textContent = descriptions[type] || `Тип личности: ${type}`;
        }
    }
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
    if (document.querySelectorAll('.mbti-toggle-group').length > 0) {
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
        const mbtiToggleGroups = document.querySelectorAll('.mbti-toggle-group');
        mbtiToggleGroups.forEach(group => {
            const toggles = group.querySelectorAll('.mbti-toggle');
            toggles.forEach(toggle => {
                toggle.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggles.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    updateMBTI();
                });
            });
        });
        function updateMBTI() {
            const activeToggles = document.querySelectorAll('.mbti-toggle.active');
            if (activeToggles.length === 4) {
                const type = Array.from(activeToggles).map(t => t.dataset.value).join('');
                if (mbtiType) {
                    mbtiType.textContent = type;
                    if (mbtiColors[type]) {
                        mbtiType.style.color = mbtiColors[type];
                    }
                }
                if (mbtiDescription) {
                    mbtiDescription.textContent = mbtiDescriptions[type] || `Тип личности: ${type}`;
                    if (mbtiColors[type]) {
                        mbtiDescription.style.backgroundColor = `${mbtiColors[type]}22`;
                    }
                }
            }
        }
    }
    const captchaSliders = document.querySelectorAll('.captcha-slider');
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
    addLoanButton.addEventListener('click', function () {
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
        loansContainer.appendChild(loanElement.firstElementChild);
        loanElement.querySelector('.remove-loan').addEventListener('click', () => {
            loanElement.firstElementChild.remove();
        });
    });
    if (reactionStart && reactionTimer && reactionResult) {
        let timerInterval;
        let startTime;
        let isTimerRunning = false;
        const maxReactionTime = 4;
        const formatTime = (time) => {
            return Math.max(0, time).toFixed(3);
        };
        reactionStart.addEventListener('click', function () {
            if (!isTimerRunning) {
                isTimerRunning = true;
                reactionStart.textContent = 'Стоп';
                reactionResult.textContent = '';
                reactionResult.style.display = 'none';
                startTime = Date.now();
                timerInterval = setInterval(function () {
                    const elapsedTime = (Date.now() - startTime) / 1000;
                    const remainingTime = Math.max(maxReactionTime - elapsedTime, 0);
                    reactionTimer.textContent = formatTime(remainingTime);
                    if (remainingTime <= 0) {
                        clearInterval(timerInterval);
                        isTimerRunning = false;
                        reactionStart.textContent = 'Старт';
                        reactionResult.textContent = 'Время вышло!';
                        reactionResult.className = 'validation-message error';
                        reactionResult.style.display = 'block';
                    }
                }, 10);
            } else {
                clearInterval(timerInterval);
                isTimerRunning = false;
                reactionStart.textContent = 'Старт';
                const elapsedTime = (Date.now() - startTime) / 1000;
                const deviation = Math.abs(maxReactionTime - elapsedTime);
                reactionResult.textContent = `Ваш результат: ${formatTime(deviation)} секунд от идеальных ${maxReactionTime} секунд`;
                reactionResult.className = 'validation-message success';
                reactionResult.style.display = 'block';
            }
        });
    }
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
    if (innInput) {
        innInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 12) {
                value = value.substring(0, 12);
            }
            this.value = value;
        });
    }
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
    if (enableDocuments && documentsCard) {
        const documentInputs = documentsCard.querySelectorAll('input[type="text"]');
        enableDocuments.addEventListener('change', function () {
            documentInputs.forEach(input => {
                input.disabled = !this.checked;
            });
        });
    }
    if (captchaNumber && captchaSliders.length > 0 && captchaSubmit) {
        const generateCaptcha = () => {
            const randomNumber = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
            captchaNumber.textContent = randomNumber;
            return randomNumber;
        };
        let correctCaptcha = generateCaptcha();
        captchaSliders.forEach((slider, index) => {
            slider.addEventListener('input', function () {

            });
        });
        captchaSubmit.addEventListener('click', function () {
            const input = Array.from(captchaSliders).map(slider => slider.value).join('');
            if (input === correctCaptcha) {
                captchaResult.textContent = 'Капча введена верно!';
                captchaResult.className = 'validation-message success';
                captchaResult.style.display = 'block';
                correctCaptcha = generateCaptcha();
            } else {
                captchaResult.textContent = 'Неверная капча. Попробуйте снова.';
                captchaResult.className = 'validation-message error';
                captchaResult.style.display = 'block';
            }
        });
    }

    const flagTemplateButtons = document.querySelectorAll('.flag-template-buttons button');
    function pixelateCanvas(ctx, pixelSize) {
        const { width, height } = ctx.canvas;
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let y = 0; y < height; y += pixelSize) {
            for (let x = 0; x < width; x += pixelSize) {
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
    if (flagCanvas) {
        let selectedColor = '#000000';

        const flagTemplates = {
            russia: [
                { color: '#FFFFFF', x: 0, y: 0, width: flagCanvas.width, height: flagCanvas.height / 3 },
                { color: '#0039A6', x: 0, y: flagCanvas.height / 3, width: flagCanvas.width, height: flagCanvas.height / 3 },
                { color: '#D52B1E', x: 0, y: (2 * flagCanvas.height) / 3, width: flagCanvas.width, height: flagCanvas.height / 3 }
            ],
            germany: [
                { color: '#000000', x: 0, y: 0, width: flagCanvas.width, height: flagCanvas.height / 3 },
                { color: '#DD0000', x: 0, y: flagCanvas.height / 3, width: flagCanvas.width, height: flagCanvas.height / 3 },
                { color: '#FFCE00', x: 0, y: (2 * flagCanvas.height) / 3, width: flagCanvas.width, height: flagCanvas.height / 3 }
            ],
            france: [
                { color: '#0055A4', x: 0, y: 0, width: flagCanvas.width / 3, height: flagCanvas.height },
                { color: '#FFFFFF', x: flagCanvas.width / 3, y: 0, width: flagCanvas.width / 3, height: flagCanvas.height },
                { color: '#EF4135', x: (2 * flagCanvas.width) / 3, y: 0, width: flagCanvas.width / 3, height: flagCanvas.height }
            ],
            japan: [
                { color: '#FFFFFF', x: 0, y: 0, width: flagCanvas.width, height: flagCanvas.height },
                { color: '#BC002D', x: flagCanvas.width / 2 - 70, y: flagCanvas.height / 2 - 70, width: 140, height: 140, isCircle: true }
            ],
            italy: [
                { color: '#009246', x: 0, y: 0, width: flagCanvas.width / 3, height: flagCanvas.height },
                { color: '#FFFFFF', x: flagCanvas.width / 3, y: 0, width: flagCanvas.width / 3, height: flagCanvas.height },
                { color: '#CE2B37', x: (2 * flagCanvas.width) / 3, y: 0, width: flagCanvas.width / 3, height: flagCanvas.height }
            ]
        };

        function applyFlagTemplate(template) {
            ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);
            if (!template || !flagTemplates[template]) {
                console.error('Template not found:', template);
                initCanvas();
                return;
            }

            flagTemplates[template].forEach(part => {
                ctx.fillStyle = part.color;

                if (part.isCircle) {
                    // Handle circular parts of the flag
                    const centerX = part.x + part.width / 2;
                    const centerY = part.y + part.height / 2;
                    const radius = Math.min(part.width, part.height) / 2;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Handle rectangular parts of the flag
                    ctx.fillRect(part.x || 0, part.y || 0, part.width || flagCanvas.width, part.height || flagCanvas.height);
                }
            });

            drawGrid(ctx, cellSize); // Redraw the grid after applying the template
        }

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
        function initCanvas() {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, flagCanvas.width, flagCanvas.height);
            drawGrid(ctx, cellSize);
        }
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
                    ctx.beginPath();
                    ctx.arc(part.x + part.radius, part.y + part.radius, part.radius, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(part.x, part.y, part.width, part.height);
                }
            });
            pixelateCanvas(ctx, cellSize);
            drawGrid(ctx, cellSize);
        }
        if (flagCanvas) {
            flagCanvas.addEventListener('mousedown', function (e) {
                currentFlagColor = currentFlagColor || '#000000'; // Ensure a valid color is set
                isDrawing = true;
                drawPixel(e); // Start drawing immediately with the correct color
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
                ctx.fillStyle = currentFlagColor; // Use currentFlagColor consistently
                ctx.fillRect(x, y, cellSize, cellSize);
                ctx.strokeStyle = '#ddd';
                ctx.strokeRect(x, y, cellSize, cellSize);
            }
        }

        if (clearFlagButton) {
            clearFlagButton.addEventListener('click', function () {
                initCanvas();
            });
        }
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
        initCanvas();
    }
});
