// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Растягиваем на весь экран
tg.enableClosingConfirmation(); // Подтверждение закрытия

// Устанавливаем цвет верхней панели (в тон дизайну)
tg.setHeaderColor('#000000');
tg.setBackgroundColor('#000000');

// Элементы формы
const form = document.getElementById('selectionForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const instInput = document.getElementById('inst');

// Ссылки на документы (пока заглушки, потом заменишь на реальные ссылки)
document.getElementById('privacyLink').addEventListener('click', (e) => {
    e.preventDefault();
    tg.openLink('https://твой-сайт.com/privacy'); // ЗАМЕНИ
});

document.getElementById('dataLink').addEventListener('click', (e) => {
    e.preventDefault();
    tg.openLink('https://твой-сайт.com/data-agreement'); // ЗАМЕНИ
});

// Обработка отправки формы
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const inst = instInput.value.trim() || 'Не указан';

    if (!name || !phone) {
        tg.showAlert('Пожалуйста, заполните имя и телефон');
        return;
    }

    // Проверка чекбоксов
    const privacyChecked = document.getElementById('privacy').checked;
    const dataChecked = document.getElementById('dataAgree').checked;

    if (!privacyChecked || !dataChecked) {
        tg.showAlert('Необходимо согласие на обработку данных');
        return;
    }

    // Собираем данные для отправки боту
    const userData = {
        name: name,
        phone: phone,
        instagram: inst,
        // Доп. данные от Telegram, если нужны
        user: tg.initDataUnsafe?.user?.username || 'неизвестно'
    };

    // 1. Показываем кнопку готовности (MainButton)
    tg.MainButton.textColor = '#000000';
    tg.MainButton.color = '#f91260';
    tg.MainButton.setText('ОТПРАВИТЬ ДАННЫЕ');
    tg.MainButton.show();

    // 2. По нажатию на MainButton отправляем данные боту и закрываем приложение
    tg.MainButton.onClick(() => {
        // Отправляем данные обратно в бот (метод sendData)
        tg.sendData(JSON.stringify(userData));
        
        // Показываем алерт и закрываем
        tg.showPopup({
            title: 'Заявка принята! 🏁',
            message: 'Скоро с тобой свяжется администратор студии FOREIS.',
            buttons: [{type: 'close'}]
        }, () => {
            tg.close();
        });
    });

    // Дополнительно: если пользователь хочет отправить без MainButton, раскомментируй:
    // tg.sendData(JSON.stringify(userData));
    // tg.close();
});

// Анимация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    tg.ready();
    console.log('FOREIS Team App загружен');
});
