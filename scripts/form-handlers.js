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

    // Функциональность MBTI и переключения фигур
    const mbtiFirst = document.getElementById('mbti-first'),
          mbtiSecond = document.getElementById('mbti-second'),
          mbtiThird = document.getElementById('mbti-third'),
          mbtiFourth = document.getElementById('mbti-fourth'),
          mbtiAlert = document.getElementById('mbti-alert'),
          triangleCheckbox = document.getElementById('triangle-checkbox'),
          shapeDisplay = document.getElementById('shape-display'),
          borderRadiusSlider = document.getElementById('border-radius-slider'),
          borderRadiusControl = document.getElementById('border-radius-control');

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

    // Функциональность переключения фигур - исправленная версия
    if (triangleCheckbox && shapeDisplay && borderRadiusControl) {
        // Проверяем начальное состояние при загрузке
        if (triangleCheckbox.checked) {
            shapeDisplay.classList.add('triangle');
            borderRadiusControl.style.display = 'none';
        }
        
        triangleCheckbox.addEventListener('change', function() {
            if (this.checked) {
                // Устанавливаем размеры контейнера до изменения класса
                const containerHeight = shapeDisplay.parentElement.offsetHeight;
                shapeDisplay.parentElement.style.minHeight = containerHeight + "px";
                
                // Применяем класс треугольника
                shapeDisplay.classList.add('triangle');
                shapeDisplay.style.borderRadius = '0';
                borderRadiusControl.style.display = 'none';
            } else {
                shapeDisplay.classList.remove('triangle');
                shapeDisplay.style.borderRadius = borderRadiusSlider.value + 'px';
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
    const flagCanvas = document.getElementById('flag-canvas'),
          flagColorButtonsContainer = document.getElementById('flag-color-buttons'),
          currentFlagColorDisplay = document.getElementById('current-flag-color'),
          clearFlagButton = document.getElementById('clear-flag'),
          flagTemplateInput = document.getElementById('flag-template');

    let currentFlagColor = '#000000',
        isDrawing = false;

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

    // Обработчики для шкал характера
    document.querySelectorAll('input[type="range"]').forEach(slider => {
        const valueDisplay = slider.previousElementSibling.querySelector('.scale-value');
        if (valueDisplay) {
            slider.addEventListener('input', () => {
                valueDisplay.textContent = slider.value;
            });
        }
    });

    // Обработчики для MBTI
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
        const type = Array.from(document.querySelectorAll('.mbti-toggle.active'))
            .map(t => t.dataset.value)
            .join('');
        
        if (type.length === 4) {
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
            { color: '#FFFFFF', y: 0, height: 80 },
            { color: '#0039A6', y: 80, height: 80 },
            { color: '#D52B1E', y: 160, height: 80 }
        ],
        germany: [
            { color: '#000000', y: 0, height: 80 },
            { color: '#DD0000', y: 80, height: 80 },
            { color: '#FFCE00', y: 160, height: 80 }
        ],
        // Добавьте остальные шаблоны
    };

    document.querySelectorAll('.flag-template-buttons button').forEach(btn => {
        btn.addEventListener('click', () => {
            const template = flagTemplates[btn.dataset.flag];
            if (template) {
                template.forEach(({color, y, height}) => {
                    ctx.fillStyle = color;
                    ctx.fillRect(0, y, flagCanvas.width, height);
                });
                drawGrid();
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
                toggle.addEventListener('click', function(e) {
                    // Предотвращаем отправку формы
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Удаляем класс active у всех переключателей в этой группе
                    toggles.forEach(t => t.classList.remove('active'));
                    // Добавляем класс active текущему переключателю
                    this.classList.add('active');
                    
                    // Обновляем отображение MBTI
                    updateMBTI();
                    
                    // Для диагностики
                    console.log('MBTI toggle clicked:', this.dataset.value);
                });
            });
        });

        function updateMBTI() {
            const activeToggles = document.querySelectorAll('.mbti-toggle.active');
            console.log('Active toggles:', activeToggles.length);
            
            if (activeToggles.length === 4) {
                const type = Array.from(activeToggles).map(t => t.dataset.value).join('');
                console.log('MBTI type:', type);
                
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
                    
                    console.log('Updated description:', mbtiDescription.textContent);
                }
            }
        }
    }
});
