document.addEventListener('DOMContentLoaded', function () {
    // Variable declaration at the top
    let isDrawing = false;
    let currentFlagColor = '#000000'; // Add missing variable declaration

    const cellSize = 20;
    const registrationForm = document.querySelector('.registration-form');
    const container = document.querySelector('.chinese-options');
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
    const cardDetailsCard = document.getElementById('card-details-card');
    const enableCardDetails = document.getElementById('enable-card-details');
    const passportNumberInput = document.getElementById('passport-number');
    const cardNumberInput = document.getElementById('card-number');
    const cardExpiryInput = document.getElementById('card-expiry');
    const cardCvvInput = document.getElementById('card-cvv');
    const captchaInputDisplay = document.getElementById('captcha-input-display');

    // Add these lines to define errorMessage and successMessage
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const exportButton = document.getElementById('export-button');
    const importButton = document.getElementById('import-button');
    const importButtonLabel = document.getElementById('import-button-label');
    const formDataContent = document.getElementById('formDataContent');
    const copyButton = document.getElementById('copy-button');
    const importText = document.getElementById('import-text');
    const importTextButton = document.getElementById('import-text-button');

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

        if (!checkAllAgreements()) {
            errorMessage.textContent = 'Необходимо согласиться со всеми условиями';
            errorMessage.style.display = 'block';
            return;
        }

        if (translationResult.className !== 'validation-message correct') {
            errorMessage.textContent = 'Необходимо правильно ответить на вопрос';
            errorMessage.style.display = 'block';
            return;
        }

        if (captchaResult.className !== 'validation-message success') {
            errorMessage.textContent = 'Необходимо правильно ввести капчу';
            errorMessage.style.display = 'block';
            return;
        }

        // Collect form data
        const formData = collectFormData();

        // Display success message
        successMessage.style.display = 'block';

        // Display modal with JSON data
        displayFormDataModal(formData);
    });

    // Add event listener for the export button
    if (exportButton) {
        exportButton.addEventListener('click', function () {
            const formData = collectFormData();
            displayFormDataModal(formData);
        });
    }

    // Add event listener for the import button
    if (importButtonLabel && importButton) {
        importButtonLabel.addEventListener('click', function () {
            importButton.click(); // Trigger the file input
        });

        importButton.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    try {
                        const jsonData = JSON.parse(e.target.result);
                        populateForm(jsonData);
                    } catch (error) {
                        alert('Ошибка при чтении файла: ' + error);
                    }
                }
                reader.readAsText(file);
            }
        });
    }

    // Add event listener for the copy button
    if (copyButton && formDataContent) {
        copyButton.addEventListener('click', function () {
            formDataContent.select();
            document.execCommand('copy');
            alert('Данные скопированы в буфер обмена!');
        });
    }

    // Add event listener for the import text button
    if (importTextButton && importText) {
        importTextButton.addEventListener('click', function () {
            try {
                const jsonData = JSON.parse(importText.value);
                populateForm(jsonData);
                const modal = document.getElementById('formDataModal');
                if (modal) {
                    modal.style.display = 'none';
                }
                
                // Add safety check before using successMessage
                if (successMessage) {
                    successMessage.textContent = 'Данные успешно импортированы!';
                    successMessage.style.display = 'block';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 3000);
                } else {
                    // Fallback if successMessage element doesn't exist - create a temporary message
                    const tempMessage = document.createElement('div');
                    tempMessage.textContent = 'Данные успешно импортированы!';
                    tempMessage.style.position = 'fixed';
                    tempMessage.style.top = '20px';
                    tempMessage.style.left = '50%';
                    tempMessage.style.transform = 'translateX(-50%)';
                    tempMessage.style.backgroundColor = '#48BB78';
                    tempMessage.style.color = 'white';
                    tempMessage.style.padding = '15px 20px';
                    tempMessage.style.borderRadius = '5px';
                    tempMessage.style.zIndex = '9999';
                    document.body.appendChild(tempMessage);
                    
                    setTimeout(() => {
                        document.body.removeChild(tempMessage);
                    }, 3000);
                }
            } catch (error) {
                alert('Ошибка при разборе JSON: ' + error);
            }
        });
    }

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
                    slider.addEventListener('input', function () {
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
                registerButton.removeAttribute('disabled'); // Enable the register button
            } else {
                captchaResult.textContent = 'Неверная капча. Попробуйте снова.';
                captchaResult.className = 'validation-message error';
                registerButton.setAttribute('disabled', 'disabled'); // Disable the register button
            }
        });
        generateCaptcha();
    }
    if (enableCardDetails && cardDetailsCard) {
        const cardInputs = cardDetailsCard.querySelectorAll('input[type="text"], input[type="number"]');
        enableCardDetails.addEventListener('change', function () {
            cardInputs.forEach(input => {
                input.disabled = !this.checked;
            });
        });
    }
    function setupLoanDeleteButtons() {
        const removeButtons = document.querySelectorAll('.remove-loan');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const loan = this.closest('.loan');
                if (loan) {
                    loan.remove();
                }
            });
        });
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
        setupLoanDeleteButtons(); // Setup delete button for newly added loan
    });

    // Initialize delete buttons for any existing loans
    setupLoanDeleteButtons();

    // Updated reaction timer functionality
    if (reactionStart && reactionTimer && reactionResult) {
        let timerInterval;
        let startTime;
        let isTimerRunning = false;
        const maxReactionTime = 4;
        const formatTime = (time) => {
            return time.toFixed(3);
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
                    const remainingTime = maxReactionTime - elapsedTime;
                    reactionTimer.textContent = formatTime(remainingTime);

                    // Only stop the timer when it reaches -4 seconds
                    if (remainingTime <= -4) {
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

    // Format masks for document fields
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

    // Add formatting for passport number
    if (passportNumberInput) {
        passportNumberInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 10) value = value.substring(0, 10);
            let formattedValue = '';
            if (value.length > 0) {
                formattedValue += value.substring(0, Math.min(4, value.length));
                if (value.length > 4) {
                    formattedValue += ' ' + value.substring(4, 10);
                }
            }
            this.value = formattedValue;
        });
    }

    // Add formatting for credit card fields
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 16) value = value.substring(0, 16);
            let formattedValue = '';
            for (let i = 0; i < value.length; i += 4) {
                formattedValue += value.substring(i, i + 4);
                if (i + 4 < value.length) {
                    formattedValue += ' ';
                }
            }
            this.value = formattedValue;
        });
    }

    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 4) value = value.substring(0, 4);
            let formattedValue = '';
            if (value.length > 0) {
                formattedValue += value.substring(0, Math.min(2, value.length));
                if (value.length > 2) {
                    formattedValue += '/' + value.substring(2, 4);
                }
            }
            this.value = formattedValue;
        });
    }

    if (cardCvvInput) {
        cardCvvInput.addEventListener('input', function (e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 3) value = value.substring(0, 3);
            this.value = value;
        });
    }

    // Update captcha to display entered value
    if (captchaNumber && captchaSliders.length > 0 && captchaSubmit) {
        const generateCaptcha = () => {
            const randomNumber = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
            captchaNumber.textContent = randomNumber;
            return randomNumber;
        };

        let correctCaptcha = generateCaptcha();

        // Update the input display whenever sliders change
        function updateCaptchaInputDisplay() {
            const input = Array.from(captchaSliders).map(slider => slider.value).join('');
            if (captchaInputDisplay) {
                captchaInputDisplay.textContent = input;
            }
        }

        captchaSliders.forEach((slider, index) => {
            slider.addEventListener('input', function () {
                updateCaptchaInputDisplay();
            });
        });

        // Initial update for input display
        updateCaptchaInputDisplay();

        captchaSubmit.addEventListener('click', function () {
            const input = Array.from(captchaSliders).map(slider => slider.value).join('');
            if (input === correctCaptcha) {
                captchaResult.textContent = 'Капча введена верно!';
                captchaResult.className = 'validation-message success';
                captchaResult.style.display = 'block';
                correctCaptcha = generateCaptcha();
                updateCaptchaInputDisplay(); // Reset the display after generating new captcha
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

    function collectFormData() {
        const formData = {
            personalInfo: {
                name: '',
                age: '',
                gender: '',
                phone: '',
                mood: ''
            },
            familyMembers: [],
            documents: {
                passport: {
                    number: '',
                    issueDate: '',
                    isEnabled: false
                },
                driverLicense: '',
                snils: '',
                inn: ''
            },
            bankingInfo: {
                cardDetails: {
                    number: '',
                    expiry: '',
                    cvv: '',
                    isEnabled: false
                },
                loans: []
            },
            preferences: {
                mbtiType: '',
                characterScales: {},
                agreements: {}
            },
            customization: {
                flag: getFlagPixelData(),
                shape: {
                    isTriangle: false,
                    borderRadius: 0
                }
            }
        };

        // Fill personal info
        formData.personalInfo.name = document.getElementById('reg-name')?.value || '';
        formData.personalInfo.age = document.getElementById('reg-age')?.value || '';
        formData.personalInfo.gender = genderRatioSlider?.value || '';
        formData.personalInfo.phone = phoneInput?.value || '';
        formData.personalInfo.mood = moodSlider?.value || '';

        // Fill family members
        const familyMembers = document.querySelectorAll('.family-member');
        familyMembers.forEach(member => {
            formData.familyMembers.push({
                name: member.querySelector('input[name="member-name"]')?.value || '',
                relation: member.querySelector('select[name="member-relation"]')?.value || '',
                age: member.querySelector('input[name="member-age"]')?.value || ''
            });
        });

        // Fill documents
        formData.documents.passport.number = passportNumberInput?.value || '';
        formData.documents.passport.issueDate = document.getElementById('passport-issue-date')?.value || '';
        formData.documents.passport.isEnabled = enablePassportBank?.checked || false;
        formData.documents.driverLicense = driverLicenseInput?.value || '';
        formData.documents.snils = snilsInput?.value || '';
        formData.documents.inn = innInput?.value || '';

        // Fill banking info
        formData.bankingInfo.cardDetails.number = cardNumberInput?.value || '';
        formData.bankingInfo.cardDetails.expiry = cardExpiryInput?.value || '';
        formData.bankingInfo.cardDetails.cvv = cardCvvInput?.value || '';
        formData.bankingInfo.cardDetails.isEnabled = enableCardDetails?.checked || false;

        // Fill loans
        const loans = document.querySelectorAll('.loan');
        loans.forEach(loan => {
            formData.bankingInfo.loans.push({
                type: loan.querySelector('select')?.value || '',
                creditor: loan.querySelector('input[type="text"]')?.value || '',
                amount: loan.querySelector('input[type="number"]')?.value || '',
                openDate: loan.querySelector('input[type="date"]')?.value || '',
                status: loan.querySelector('select:last-child')?.value || ''
            });
        });

        // Fill preferences
        formData.preferences.mbtiType = mbtiType?.textContent || '';
        
        // Character scales
        document.querySelectorAll('#character-scales input[type="range"]').forEach(scale => {
            formData.preferences.characterScales[scale.id] = scale.value;
        });

        // Agreements
        document.querySelectorAll('.required-agreement').forEach(agreement => {
            formData.preferences.agreements[agreement.id] = agreement.checked;
        });

        // Fill customization
        formData.customization.shape.isTriangle = triangleCheckbox?.checked || false;
        formData.customization.shape.borderRadius = borderRadiusSlider?.value || 0;

        return formData;
    }

    function displayFormDataModal(formData) {
        const modal = document.getElementById('formDataModal');
        const modalContent = document.getElementById('formDataContent');

        modalContent.value = JSON.stringify(formData, null, 2);
        modal.style.display = 'block';

        const closeBtn = document.querySelector('.close-button');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    function populateForm(jsonData) {
        for (const key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                const element = document.getElementById(key);
                if (element) {
                    if (element.type === 'checkbox' || element.type === 'radio') {
                        element.checked = jsonData[key];
                    } else if (element.tagName === 'SELECT' && element.multiple) {
                        const values = jsonData[key];
                        for (let i = 0; i < element.options.length; i++) {
                            element.options[i].selected = values.includes(element.options[i].value);
                        }
                    } else if (element.tagName === 'CANVAS') {
                        setFlagPixelData(jsonData[key]);
                    }
                     else {
                        element.value = jsonData[key];
                    }
                }
            }
        }

        // Handle personal info
        if (jsonData.personalInfo) {
            document.getElementById('reg-name').value = jsonData.personalInfo.name || '';
            document.getElementById('reg-age').value = jsonData.personalInfo.age || '';
            if (ageRange) ageRange.value = jsonData.personalInfo.age || '';
            if (genderRatioSlider) {
                genderRatioSlider.value = jsonData.personalInfo.gender || 50;
                genderRatioDisplay.textContent = `Мужчина ${genderRatioSlider.value}%, женщина ${100 - genderRatioSlider.value}%`;
            }
            if (phoneInput) phoneInput.value = jsonData.personalInfo.phone || '';
            if (moodSlider) {
                moodSlider.value = jsonData.personalInfo.mood || 50;
                moodDisplay.textContent = `Настроение: ${moodSlider.value}%`;
            }
        }

        // Handle family members
        if (jsonData.familyMembers && jsonData.familyMembers.length > 0 && familyMembersContainer) {
            // Clear existing family members except the first one
            const existingMembers = familyMembersContainer.querySelectorAll('.family-member');
            for (let i = 1; i < existingMembers.length; i++) {
                existingMembers[i].remove();
            }
            
            // Use the first one as a template
            const template = existingMembers[0];
            const inputs = template.querySelectorAll('input');
            const selects = template.querySelectorAll('select');
            
            // Fill the first member
            if (inputs.length >= 3 && selects.length >= 2) {
                inputs[0].value = jsonData.familyMembers[0].name || '';
                inputs[1].value = jsonData.familyMembers[0].relation || '';
                inputs[2].value = jsonData.familyMembers[0].age || '';
            }
            
            // Add additional members
            for (let i = 1; i < jsonData.familyMembers.length; i++) {
                const member = jsonData.familyMembers[i];
                const newMember = template.cloneNode(true);
                const newInputs = newMember.querySelectorAll('input');
                
                if (newInputs.length >= 3) {
                    newInputs[0].value = member.name || '';
                    newInputs[1].value = member.relation || '';
                    newInputs[2].value = member.age || '';
                }
                
                const removeBtn = newMember.querySelector('.remove-member');
                if (removeBtn) {
                    removeBtn.addEventListener('click', function () {
                        if (familyMembersContainer.querySelectorAll('.family-member').length > 1) {
                            newMember.remove();
                        } else {
                            alert('Необходимо оставить как минимум одного члена семьи');
                        }
                    });
                }
                
                familyMembersContainer.appendChild(newMember);
            }
        }

        // Handle documents
        if (jsonData.documents) {
            if (jsonData.documents.passport) {
                if (passportNumberInput) passportNumberInput.value = jsonData.documents.passport.number || '';
                const passportIssueDate = document.getElementById('passport-issue-date');
                if (passportIssueDate) passportIssueDate.value = jsonData.documents.passport.issueDate || '';
                if (enablePassportBank) enablePassportBank.checked = jsonData.documents.passport.isEnabled || false;
            }
            if (driverLicenseInput) driverLicenseInput.value = jsonData.documents.driverLicense || '';
            if (snilsInput) snilsInput.value = jsonData.documents.snils || '';
            if (innInput) innInput.value = jsonData.documents.inn || '';
        }

        // Handle banking info
        if (jsonData.bankingInfo) {
            if (jsonData.bankingInfo.cardDetails) {
                if (cardNumberInput) cardNumberInput.value = jsonData.bankingInfo.cardDetails.number || '';
                if (cardExpiryInput) cardExpiryInput.value = jsonData.bankingInfo.cardDetails.expiry || '';
                if (cardCvvInput) cardCvvInput.value = jsonData.bankingInfo.cardDetails.cvv || '';
                if (enableCardDetails) enableCardDetails.checked = jsonData.bankingInfo.cardDetails.isEnabled || false;
            }

            // Handle loans
            if (jsonData.bankingInfo.loans && jsonData.bankingInfo.loans.length > 0 && loansContainer) {
                // Clear existing loans
                loansContainer.innerHTML = '';
                
                jsonData.bankingInfo.loans.forEach(loan => {
                    const loanTemplate = `
                        <div class="loan">
                            <div class="form-group">
                                <label>Тип кредита:</label>
                                <select>
                                    <option value="" disabled>Выберите тип</option>
                                    <option value="mortgage" ${loan.type === 'mortgage' ? 'selected' : ''}>Ипотека</option>
                                    <option value="car" ${loan.type === 'car' ? 'selected' : ''}>Автокредит</option>
                                    <option value="consumer" ${loan.type === 'consumer' ? 'selected' : ''}>Потребительский</option>
                                    <option value="business" ${loan.type === 'business' ? 'selected' : ''}>Бизнес-кредит</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Кредитор:</label>
                                <input type="text" value="${loan.creditor || ''}" placeholder="Сбербанк">
                            </div>
                            <div class="form-group">
                                <label>Сумма кредита:</label>
                                <input type="number" value="${loan.amount || ''}" placeholder="1000000 ₽">
                            </div>
                            <div class="form-group">
                                <label>Дата открытия:</label>
                                <input type="date" value="${loan.openDate || ''}">
                            </div>
                            <div class="form-group">
                                <label>Статус:</label>
                                <select>
                                    <option value="active" ${loan.status === 'active' ? 'selected' : ''}>Активен</option>
                                    <option value="closed" ${loan.status === 'closed' ? 'selected' : ''}>Закрыт</option>
                                    <option value="overdue" ${loan.status === 'overdue' ? 'selected' : ''}>Просрочен</option>
                                </select>
                            </div>
                            <button type="button" class="remove-loan">Удалить</button>
                        </div>
                    `;
                    
                    const loanElement = document.createElement('div');
                    loanElement.innerHTML = loanTemplate;
                    loansContainer.appendChild(loanElement.firstElementChild);
                });
                
                setupLoanDeleteButtons();
            }
        }

        // Handle preferences
        if (jsonData.preferences) {
            // Handle MBTI type
            if (jsonData.preferences.mbtiType && mbtiType) {
                const mbtiTypeParts = jsonData.preferences.mbtiType.split('');
                if (mbtiTypeParts.length === 4) {
                    const mbtiToggleGroups = document.querySelectorAll('.mbti-toggle-group');
                    if (mbtiToggleGroups.length === 4) {
                        for (let i = 0; i < 4; i++) {
                            const toggles = mbtiToggleGroups[i].querySelectorAll('.mbti-toggle');
                            toggles.forEach(toggle => {
                                if (toggle.dataset.value === mbtiTypeParts[i]) {
                                    toggle.classList.add('active');
                                } else {
                                    toggle.classList.remove('active');
                                }
                            });
                        }
                        updateMBTI();
                    }
                }
            }

            // Handle character scales
            if (jsonData.preferences.characterScales) {
                Object.entries(jsonData.preferences.characterScales).forEach(([id, value]) => {
                    const scale = document.getElementById(id);
                    if (scale) {
                        scale.value = value;
                        const label = scale.previousElementSibling;
                        if (label) {
                            const valueDisplay = label.querySelector('.scale-value');
                            if (valueDisplay) {
                                valueDisplay.textContent = value;
                            }
                        }
                    }
                });
            }

            // Handle agreements
            if (jsonData.preferences.agreements) {
                Object.entries(jsonData.preferences.agreements).forEach(([id, checked]) => {
                    const checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = checked;
                    }
                });
                
                // Check if all agreements are checked and update UI accordingly
                if (checkAllAgreements()) {
                    checkTranslationButton.removeAttribute('disabled');
                }
            }
        }

        // Handle customization
        if (jsonData.customization) {
            // Handle shape
            if (jsonData.customization.shape) {
                if (triangleCheckbox) {
                    triangleCheckbox.checked = jsonData.customization.shape.isTriangle;
                    if (triangleCheckbox.checked) {
                        shapeDisplay.classList.add('triangle');
                        shapeDisplay.style.borderRadius = '0';
                        if (borderRadiusSlider) {
                            borderRadiusSlider.disabled = true;
                        }
                    } else {
                        shapeDisplay.classList.remove('triangle');
                        if (borderRadiusSlider) {
                            borderRadiusSlider.value = jsonData.customization.shape.borderRadius;
                            shapeDisplay.style.borderRadius = jsonData.customization.shape.borderRadius + 'px';
                            borderRadiusSlider.disabled = false;
                        }
                    }
                }
            }

            // Handle flag
            if (jsonData.customization.flag && flagCanvas) {
                setFlagPixelData(jsonData.customization.flag);
            }
        }

        // After importing data, check if all agreements are checked
        if (checkAllAgreements()) {
            // Also check if translation is correct
            const selectedTranslation = document.querySelector('input[name="chinese-translation"][value="correct"]');
            if (selectedTranslation) {
                selectedTranslation.checked = true;
                if (translationResult) {
                    translationResult.textContent = 'Правильно! Вы можете продолжить регистрацию.';
                    translationResult.className = 'validation-message correct';
                    translationResult.style.display = 'block';
                    registerButton.removeAttribute('disabled');
                }
            }
        }
    }

    function getFlagPixelData() {
        const pixels = [];
        for (let y = 0; y < flagCanvas.height; y += cellSize) {
            const row = [];
            for (let x = 0; x < flagCanvas.width; x += cellSize) {
                const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
                const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
                row.push(hex);
            }
            pixels.push(row);
        }
        return pixels;
    }

    function setFlagPixelData(pixelData) {
        ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);
        drawGrid(ctx, cellSize);
        pixelData.forEach(pixel => {
            ctx.fillStyle = pixel.color;
            ctx.fillRect(pixel.x, pixel.y, cellSize, cellSize);
            ctx.strokeStyle = '#ddd';
            ctx.strokeRect(pixel.x, pixel.y, cellSize, cellSize);
        });
    }

    // Add div elements for error and success messages if they don't exist in the DOM
    function ensureMessagesExist() {
        // Create error message element if it doesn't exist
        if (!errorMessage) {
            const errorDiv = document.createElement('div');
            errorDiv.id = 'error-message';
            errorDiv.className = 'validation-message error';
            errorDiv.style.display = 'none';
            
            // Insert before the register button
            const registerBtn = document.getElementById('register-button');
            if (registerBtn && registerBtn.parentNode) {
                registerBtn.parentNode.insertBefore(errorDiv, registerBtn);
            } else {
                // Fallback - add to the form
                const form = document.querySelector('.registration-form');
                if (form) form.appendChild(errorDiv);
            }
        }
        
        // Create success message element if it doesn't exist
        if (!successMessage) {
            const successDiv = document.createElement('div');
            successDiv.id = 'success-message';
            successDiv.className = 'validation-message success';
            successDiv.style.display = 'none';
            
            // Insert before the register button
            const registerBtn = document.getElementById('register-button');
            if (registerBtn && registerBtn.parentNode) {
                registerBtn.parentNode.insertBefore(successDiv, registerBtn);
            } else {
                // Fallback - add to the form
                const form = document.querySelector('.registration-form');
                if (form) form.appendChild(successDiv);
            }
        }
    }
    
    // Call this function early in the script to ensure message elements exist
    ensureMessagesExist();
});
