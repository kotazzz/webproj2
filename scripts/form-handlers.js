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
});
