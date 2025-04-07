document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для формы регистрации
    const registrationForm = document.querySelector('.registration-form');
    
    if (registrationForm) {
        // Связываем поле ввода возраста с ползунком
        const ageInput = document.getElementById('reg-age');
        const ageRange = document.getElementById('reg-age-range');
        
        if (ageInput && ageRange) {
            ageRange.addEventListener('input', function() {
                ageInput.value = ageRange.value;
            });
            
            ageInput.addEventListener('input', function() {
                ageRange.value = ageInput.value;
            });
        }
        
        // Обработчик для ползунка гендерного соотношения
        const genderRatioSlider = document.getElementById('reg-gender-ratio');
        const genderRatioDisplay = document.getElementById('gender-ratio-display');
        
        if (genderRatioSlider && genderRatioDisplay) {
            genderRatioSlider.addEventListener('input', function() {
                const malePercent = genderRatioSlider.value;
                const femalePercent = 100 - malePercent;
                genderRatioDisplay.textContent = `Мужчина ${malePercent}%, женщина ${femalePercent}%`;
            });
        }
        
        // Обработчик для добавления члена семьи
        const addMemberBtn = registrationForm.querySelector('.add-member');
        const familyMembersContainer = document.getElementById('family-members-container');
        
        if (addMemberBtn && familyMembersContainer) {
            addMemberBtn.addEventListener('click', function() {
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
                    removeBtn.addEventListener('click', function() {
                        memberTemplate.remove();
                    });
                }
                
                familyMembersContainer.appendChild(memberTemplate);
            });
        }
        
        // Добавляем обработчики для существующих кнопок удаления
        const removeBtns = registrationForm.querySelectorAll('.remove-member');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Проверяем, что это не последний член семьи
                if (familyMembersContainer.querySelectorAll('.family-member').length > 1) {
                    btn.closest('.family-member').remove();
                } else {
                    alert('Необходимо оставить как минимум одного члена семьи');
                }
            });
        });
        
        // Обработка отправки формы
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-password-confirm').value;
            const agreement = document.getElementById('reg-agreement').checked;
            
            const errorMessage = registrationForm.querySelector('.validation-message.error');
            const successMessage = registrationForm.querySelector('.validation-message.success');
            
            // Скрываем сообщения
            errorMessage.style.display = 'none';
            successMessage.style.display = 'none';
            
            // Простая валидация
            if (!email || !password || !confirmPassword || !agreement) {
                errorMessage.textContent = 'Заполните все обязательные поля';
                errorMessage.style.display = 'block';
                return;
            }
            
            if (password !== confirmPassword) {
                errorMessage.textContent = 'Пароли не совпадают';
                errorMessage.style.display = 'block';
                return;
            }
            
            // Успешная регистрация
            successMessage.style.display = 'block';
            
            // Сброс формы через 2 секунды
            setTimeout(function() {
                registrationForm.reset();
                successMessage.style.display = 'none';
            }, 2000);
        });
    }

    // Обработчик для выбора аватара
    const avatarInputs = document.querySelectorAll('.avatar-selection input[type="radio"]');
    avatarInputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log(`Выбран аватар: ${this.value}`);
        });
    });

    // Обработчик для выбора цвета
    const colorInput = document.getElementById('reg-color');
    if (colorInput) {
        colorInput.addEventListener('input', function() {
            console.log(`Выбран цвет: ${this.value}`);
        });
    }

    // Обработчик для текстовой области хобби
    const hobbiesTextarea = document.getElementById('reg-hobbies');
    if (hobbiesTextarea) {
        hobbiesTextarea.addEventListener('input', function() {
            console.log(`Хобби: ${this.value}`);
        });
    }

    // Обработчик для выбора даты рождения
    const birthdayInput = document.getElementById('reg-birthday');
    if (birthdayInput) {
        birthdayInput.addEventListener('change', function() {
            console.log(`Дата рождения: ${this.value}`);
        });
    }

    // Обработчик для настроения
    const moodSlider = document.getElementById('reg-mood');
    const moodDisplay = document.getElementById('mood-display');
    if (moodSlider && moodDisplay) {
        moodSlider.addEventListener('input', function() {
            moodDisplay.textContent = `Настроение: ${this.value}%`;
        });
    }

    // Обработчик для выбора звезды
    const starInputs = document.querySelectorAll('.star-selection input[type="radio"]');
    starInputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log(`Выбрана звезда: ${this.value}`);
        });
    });

    // Обработчик для мультивыбора навыков
    const spaceSkillSelect = document.getElementById('reg-space-skill');
    if (spaceSkillSelect) {
        spaceSkillSelect.addEventListener('change', function() {
            const selectedSkills = Array.from(this.selectedOptions).map(option => option.text);
            console.log(`Выбранные навыки: ${selectedSkills.join(', ')}`);
        });
    }

    // Обработчик для любимой космической еды
    const spaceFoodInput = document.getElementById('reg-favorite-space-food');
    if (spaceFoodInput) {
        spaceFoodInput.addEventListener('input', function() {
            console.log(`Любимая космическая еда: ${this.value}`);
        });
    }

    // Обработчик для любимого созвездия
    const constellationInput = document.getElementById('reg-favorite-constellation');
    if (constellationInput) {
        constellationInput.addEventListener('input', function() {
            console.log(`Любимое созвездие: ${this.value}`);
        });
    }

    // Обработчик для выбора любимого фильма
    const favoriteMovieInput = document.getElementById('reg-favorite-movie');
    if (favoriteMovieInput) {
        favoriteMovieInput.addEventListener('input', function() {
            console.log(`Любимый фильм: ${this.value}`);
        });
    }

    // Обработчик для выбора музыкального жанра
    const favoriteMusicSelect = document.getElementById('reg-favorite-music');
    if (favoriteMusicSelect) {
        favoriteMusicSelect.addEventListener('change', function() {
            console.log(`Любимый музыкальный жанр: ${this.value}`);
        });
    }

    // Обработчик для выбора времени года
    const favoriteSeasonSelect = document.getElementById('reg-favorite-season');
    if (favoriteSeasonSelect) {
        favoriteSeasonSelect.addEventListener('change', function() {
            console.log(`Любимое время года: ${this.value}`);
        });
    }

    // Обработчик для выбора цвета
    const favoriteColorInput = document.getElementById('reg-favorite-color');
    if (favoriteColorInput) {
        favoriteColorInput.addEventListener('input', function() {
            console.log(`Любимый цвет: ${this.value}`);
        });
    }

    // Обработчик для радиокнопок (домашние животные)
    const petInputs = document.querySelectorAll('input[name="pet"]');
    petInputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log(`Домашние животные: ${this.value === 'yes' ? 'Есть' : 'Нет'}`);
        });
    });

    // Обработчик для радиокнопок (путешествия)
    const travelInputs = document.querySelectorAll('input[name="travel"]');
    travelInputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log(`Любите путешествовать: ${this.value === 'yes' ? 'Да' : 'Нет'}`);
        });
    });

    // Обработчик для выбора космического объекта
    const favoriteObjectInputs = document.querySelectorAll('input[name="favorite-object"]');
    favoriteObjectInputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log(`Выбран любимый космический объект: ${this.value}`);
        });
    });

    // Обработчик для выбора космического фильма
    const favoriteSpaceMovieSelect = document.getElementById('favorite-space-movie');
    if (favoriteSpaceMovieSelect) {
        favoriteSpaceMovieSelect.addEventListener('change', function() {
            console.log(`Выбран любимый космический фильм: ${this.value}`);
        });
    }

    // Обработчик для номера телефона - форматирование
    const phoneInput = document.getElementById('reg-phone');
    if (phoneInput) {
        phoneInput.addEventListener('focus', function() {
            if (!this.value) {
                this.value = '+7 (';
            }
        });

        phoneInput.addEventListener('input', function(e) {
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

    // Обработчик для ранга в Genshin Impact
    const genshinRankSelect = document.getElementById('reg-genshin-rank');
    if (genshinRankSelect) {
        genshinRankSelect.addEventListener('change', function() {
            console.log(`Выбран ранг в Genshin Impact: ${this.value}`);
        });
    }

    // Обработчик для любимого персонажа Genshin Impact
    const favoriteCharacterInput = document.getElementById('reg-favorite-character');
    if (favoriteCharacterInput) {
        favoriteCharacterInput.addEventListener('input', function() {
            console.log(`Любимый персонаж Genshin Impact: ${this.value}`);
        });
    }

    // Обработчик для любимых песен Lady Gaga
    const ladyGagaSongs = document.getElementById('lady-gaga-songs');
    if (ladyGagaSongs) {
        ladyGagaSongs.addEventListener('change', function() {
            const selectedSongs = Array.from(this.selectedOptions).map(option => option.text);
            console.log(`Выбранные песни Lady Gaga: ${selectedSongs.join(', ')}`);
        });
    }

    // Обработчик для любимой даты
    const favoriteDateInput = document.getElementById('reg-favorite-date');
    if (favoriteDateInput) {
        favoriteDateInput.addEventListener('change', function() {
            console.log(`Любимая дата: ${this.value}`);
        });
    }

    // Обработчик для любимого времени
    const favoriteTimeInput = document.getElementById('reg-favorite-time');
    if (favoriteTimeInput) {
        favoriteTimeInput.addEventListener('change', function() {
            console.log(`Любимое время: ${this.value}`);
        });
    }

    // Обработчик для любимой погоды
    const favoriteWeatherSelect = document.getElementById('reg-favorite-weather');
    if (favoriteWeatherSelect) {
        favoriteWeatherSelect.addEventListener('change', function() {
            console.log(`Любимая погода: ${this.value}`);
        });
    }

    // Обработчик для выбора предмета для Марса
    const marsItemInputs = document.querySelectorAll('input[name="mars-item"]');
    marsItemInputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log(`Что бы взяли на Марс: ${this.value}`);
        });
    });

    // Обработчик для выбора суперсилы
    const superpowerSelect = document.getElementById('superpower');
    if (superpowerSelect) {
        superpowerSelect.addEventListener('change', function() {
            console.log(`Выбранная суперсила: ${this.value}`);
        });
    }

    // Проверка обязательных галочек
    const requiredAgreements = document.querySelectorAll('.required-agreement');
    const registerButton = document.getElementById('register-button');
    const checkTranslationButton = document.getElementById('check-translation');
    const chineseOptions = document.getElementById('chinese-options');
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
        
        // Заново добавляем обработчики событий
        container.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', function() {
                console.log(`Выбран вариант перевода: ${this.value}`);
            });
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
        checkbox.addEventListener('change', function() {
            if (checkAllAgreements()) {
                checkTranslationButton.removeAttribute('disabled');
            } else {
                checkTranslationButton.setAttribute('disabled', 'disabled');
                registerButton.setAttribute('disabled', 'disabled');
            }
        });
    });

    // Добавляем обработчики для радиокнопок с китайским переводом
    chineseTranslationInputs.forEach(input => {
        input.addEventListener('change', function() {
            console.log(`Выбран вариант перевода: ${this.value}`);
        });
    });

    // Обработчик кнопки проверки перевода
    if (checkTranslationButton) {
        // Первоначально кнопка должна быть отключена
        if (!checkAllAgreements()) {
            checkTranslationButton.setAttribute('disabled', 'disabled');
        }
        
        checkTranslationButton.addEventListener('click', function() {
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
    if (registerButton) {
        registerButton.setAttribute('disabled', 'disabled');
    }

    // Добавляем обработчики для новых рандомных вопросов
    const starTrekSeasonInputs = document.querySelectorAll('input[name="favorite-season-trek"]');
    if (starTrekSeasonInputs.length > 0) {
        starTrekSeasonInputs.forEach(input => {
            input.addEventListener('change', function() {
                console.log(`Выбран любимый сезон Звездного пути: ${this.value}`);
            });
        });
    }

    const spaceFoodInputs = document.querySelectorAll('input[name="space-food"]');
    if (spaceFoodInputs.length > 0) {
        spaceFoodInputs.forEach(input => {
            input.addEventListener('change', function() {
                console.log(`Выбрана космическая еда: ${this.value}`);
            });
        });
    }

    const shipColorInputs = document.querySelectorAll('input[name="ship-color"]');
    if (shipColorInputs.length > 0) {
        shipColorInputs.forEach(input => {
            input.addEventListener('change', function() {
                console.log(`Выбран цвет корабля: ${this.value}`);
            });
        });
    }

    const crewSizeInputs = document.querySelectorAll('input[name="crew-size"]');
    if (crewSizeInputs.length > 0) {
        crewSizeInputs.forEach(input => {
            input.addEventListener('change', function() {
                console.log(`Выбран размер экипажа: ${this.value}`);
            });
        });
    }

    const spaceMusicInputs = document.querySelectorAll('input[name="space-music"]');
    if (spaceMusicInputs.length > 0) {
        spaceMusicInputs.forEach(input => {
            input.addEventListener('change', function() {
                console.log(`Выбрана музыка для полета: ${this.value}`);
            });
        });
    }

    // Тогглинг для блока "Паспортные и банковские данные"
    const togglePassportBank = document.getElementById('toggle-passport-bank');
    const passportBankContainer = document.getElementById('passport-bank-container');
    if (togglePassportBank && passportBankContainer) {
        togglePassportBank.addEventListener('change', function() {
            passportBankContainer.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Тогглинг для блока "Документы (СНИЛС/ИНН/водительские права)"
    const toggleDocuments = document.getElementById('toggle-documents');
    if (toggleDocuments && documentsCard) {
        toggleDocuments.addEventListener('change', function() {
            documentsCard.style.display = this.checked ? 'block' : 'none';
        });
    }

    // Функциональность MBTI
    const mbtiFirst = document.getElementById('mbti-first');
    const mbtiSecond = document.getElementById('mbti-second');
    const mbtiThird = document.getElementById('mbti-third');
    const mbtiFourth = document.getElementById('mbti-fourth');
    const mbtiAlert = document.getElementById('mbti-alert');
    const mbtiDescription = document.getElementById('mbti-description');

    if (mbtiFirst && mbtiSecond && mbtiThird && mbtiFourth && mbtiAlert && mbtiDescription) {
        function updateMbtiDescription() {
            if(mbtiFirst.value && mbtiSecond.value && mbtiThird.value && mbtiFourth.value) {
                const mbtiCombined = mbtiFirst.value + mbtiSecond.value + mbtiThird.value + mbtiFourth.value;
                let description = "";
                switch(mbtiCombined) {
                    case "ESTJ": description = "Рациональный, организованный, лидерский"; break;
                    case "INFP": description = "Чуткий, мечтательный, идеалистичный"; break;
                    default: description = `Ваш MBTI: ${mbtiCombined}`;
                }
                mbtiDescription.textContent = description;
                mbtiAlert.style.display = 'block';
            } else {
                mbtiAlert.style.display = 'none';
            }
        }
        [mbtiFirst, mbtiSecond, mbtiThird, mbtiFourth].forEach(select => {
            select.addEventListener('change', updateMbtiDescription);
        });
    }

    // Функциональность переключения фигур
    const triangleCheckbox = document.getElementById('triangle-checkbox');
    const shapeDisplay = document.getElementById('shape-display');
    const borderRadiusSlider = document.getElementById('border-radius-slider');
    const borderRadiusControl = document.getElementById('border-radius-control');

    if (triangleCheckbox && shapeDisplay && borderRadiusControl) {
        triangleCheckbox.addEventListener('change', function() {
            if (this.checked) {
                shapeDisplay.classList.add('triangle');
                shapeDisplay.style.borderRadius = '0';
                borderRadiusControl.style.display = 'none';
            } else {
                shapeDisplay.classList.remove('triangle');
                borderRadiusControl.style.display = 'block';
            }
        });

        if (borderRadiusSlider) {
            borderRadiusSlider.addEventListener('input', function() {
                if (!triangleCheckbox.checked) {
                    shapeDisplay.style.borderRadius = this.value + 'px';
                }
            });
        }
    }

    // Функциональность флага
    const flagCanvas = document.getElementById('flag-canvas');
    const flagColorButtonsContainer = document.getElementById('flag-color-buttons');
    const currentFlagColorDisplay = document.getElementById('current-flag-color');
    const clearFlagButton = document.getElementById('clear-flag');
    const flagTemplateInput = document.getElementById('flag-template');
    let currentFlagColor = '#000000';

    if (flagCanvas && flagColorButtonsContainer) {
        const ctx = flagCanvas.getContext('2d');
        const cellSize = 20;
        const flagPalette = ['#000000','#FFFFFF','#FF0000','#00FF00','#0000FF','#FFFF00','#FF00FF','#00FFFF',
                            '#800000','#008000','#000080','#808000','#800080','#008080','#C0C0C0','#808080'];

        function drawGrid() {
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
        drawGrid();

        // Генерация кнопок выбора цвета
        flagPalette.forEach(color => {
            const btn = document.createElement('button');
            btn.style.backgroundColor = color;
            btn.addEventListener('click', function() {
                currentFlagColor = color;
                currentFlagColorDisplay.textContent = color;
            });
            flagColorButtonsContainer.appendChild(btn);
        });

        // Рисование по клику
        flagCanvas.addEventListener('click', function(event) {
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
            clearFlagButton.addEventListener('click', function() {
                ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);
                drawGrid();
            });
        }

        // Загрузка шаблона
        if (flagTemplateInput) {
            flagTemplateInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = new Image();
                        img.onload = function() {
                            ctx.clearRect(0, 0, flagCanvas.width, flagCanvas.height);
                            ctx.drawImage(img, 0, 0, flagCanvas.width, flagCanvas.height);
                            drawGrid();
                        }
                        img.src = e.target.result;
                    }
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    // Функциональность включения/отключения полей и переключения видимости
    const enablePassportBank = document.getElementById('enable-passport-bank');
    const passportBankCard = document.getElementById('passport-bank-card');
    const enableDocuments = document.getElementById('enable-documents');
    const documentsCard = document.getElementById('documents-card');

    // Обработка карточки с паспортными данными
    if (enablePassportBank && passportBankCard) {
        const passportInputs = passportBankCard.querySelectorAll('input[type="text"], input[type="date"]');
        enablePassportBank.addEventListener('change', function() {
            passportInputs.forEach(input => {
                input.disabled = !this.checked;
            });
        });
    }

    // Обработка карточки с документами
    if (enableDocuments && documentsCard) {
        const documentInputs = documentsCard.querySelectorAll('input[type="text"]');
        enableDocuments.addEventListener('change', function() {
            documentInputs.forEach(input => {
                input.disabled = !this.checked;
            });
        });
    }
});
