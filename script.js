const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.setHeaderColor('#0a0a0a');
tg.setBackgroundColor('#0a0a0a');

const form = document.getElementById('selectionForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const contactInput = document.getElementById('contact');

// Твои ссылки на документы
const PRIVACY_URL = 'https://telegra.ph/Politika-konfidencialnosti-i-obrabotki-personalnyh-dannyh-03-30-2';
const DATA_URL = 'https://telegra.ph/Soglasie-na-obrabotku-personalnyh-dannyh-03-30-52';

document.getElementById('privacyLink').addEventListener('click', (e) => {
    e.preventDefault();
    tg.openLink(PRIVACY_URL);
});

document.getElementById('dataLink').addEventListener('click', (e) => {
    e.preventDefault();
    tg.openLink(DATA_URL);
});

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    let formatted = '+7 ';
    if (value.length > 1) formatted += '(' + value.slice(1, 4);
    if (value.length >= 4) formatted += ') ' + value.slice(4, 7);
    if (value.length >= 7) formatted += '-' + value.slice(7, 9);
    if (value.length >= 9) formatted += '-' + value.slice(9, 11);
    
    e.target.value = formatted;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const contact = contactInput.value.trim() || 'Не указан';

    if (!name || !phone) {
        tg.showAlert('Заполните имя и телефон');
        return;
    }

    if (!document.getElementById('privacy').checked || !document.getElementById('dataAgree').checked) {
        tg.showAlert('Необходимо согласие на обработку данных');
        return;
    }

    const userData = {
        name, phone, contact,
        user: tg.initDataUnsafe?.user?.username || 'неизвестно'
    };

    tg.MainButton.textColor = '#ffffff';
    tg.MainButton.color = '#f91260';
    tg.MainButton.setText('ОТПРАВИТЬ');
    tg.MainButton.show();

    tg.MainButton.onClick(() => {
        tg.sendData(JSON.stringify(userData));
        tg.showPopup({
            title: '🏁 Заявка принята',
            message: 'Администратор скоро свяжется с тобой',
            buttons: [{type: 'close'}]
        }, () => tg.close());
    });
});

document.addEventListener('DOMContentLoaded', () => tg.ready());
