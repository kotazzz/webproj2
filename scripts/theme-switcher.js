document.addEventListener('DOMContentLoaded', function() {
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    
    // Применяем сохраненную тему или используем темную по умолчанию
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        body.className = 'dark-theme';
    }
    
    // Находим кнопку переключения темы
    const themeToggle = document.getElementById('theme-switcher');
    
    if (themeToggle) {
        // Обновляем иконку в соответствии с текущей темой
        updateThemeIcon();
        
        // Добавляем обработчик события для переключения темы
        themeToggle.addEventListener('click', function() {
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light-theme');
            } else {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark-theme');
            }
            
            // Обновляем иконку
            updateThemeIcon();
        });
    }
    
    // Функция для обновления иконки темы
    function updateThemeIcon() {
        if (themeToggle) {
            if (body.classList.contains('dark-theme')) {
                themeToggle.innerHTML = '☀️'; // Солнце для переключения на светлую тему
            } else {
                themeToggle.innerHTML = '🌙'; // Луна для переключения на темную тему
            }
        }
    }
});
