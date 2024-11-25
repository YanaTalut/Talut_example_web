document.getElementById('orderForm').addEventListener('submit', function (event) {
    event.preventDefault(); // предотвращаем стандартную отправку формы

    // Получаем значения полей формы
    const name = document.getElementById('name_usluga').value.trim();
    const familia = document.getElementById('familia_usluga').value.trim();
    const email = document.getElementById('email_usluga').value.trim();
    const bulochka = document.getElementById('bulochka_usluga').value.trim();
    const kolvo = Number(document.getElementById('kolvo_usluga').value);
    const date = document.getElementById('date_usluga').value;
    const time = document.getElementById('time_usluga').value;

    const errors = [];

    // Проверка полей
    if (!name) {
        errors.push("Введите ваше имя.");
    }
    if (!familia) {
        errors.push("Введите вашу фамилию.");
    }
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        errors.push("Введите корректный email.");
    }
    if (!bulochka) {
        errors.push("Введите название булочки.");
    }
    if (!kolvo || kolvo < 1 || kolvo >= 30) {
        errors.push("Количество булочек должно быть больше 0 и меньше 30.");
    }
    if (!date) {
        errors.push("Выберите дату доставки.");
    }
    if (!time) {
        errors.push("Выберите время доставки.");
    } else {
        // Получаем часы и минуты из выбранного времени
        const [hour, minute] = time.split(':').map(Number);
        // Проверяем диапазон времени (08:00 до 21:00)
        if (hour < 8 || (hour === 21 && minute > 0) || hour > 21) {
            errors.push("Время должно быть между 08:00 и 21:00.");
        }
    }

    const responseMessage = document.getElementById('responseMessage');
    if (errors.length > 0) {
        responseMessage.textContent = errors.join("\n"); // Выводим ошибки на экран
        responseMessage.style.color = "red"; // Окрашиваем ошибки в красный цвет
    } else {
        // Формируем сообщение для пользователя
        const message = `${name} ${familia}, ваши булочки "${bulochka}" будут доставлены ${date} в ${time} в количестве ${kolvo} штук. Чек вышлем на почту ${email}.`;
        responseMessage.textContent = message; // Выводим сообщение на экран
        responseMessage.style.color = "green"; // Окрашиваем сообщение в зеленый цвет

        // Изменение стиля контейнера формы заказа
        const orderFormContainer = document.querySelector('.form_blocks');
        orderFormContainer.style.backgroundColor = '#D8EFD8'; // Меняем цвет фона на светло-зеленый
        orderFormContainer.style.padding = '20px'; // Добавляем отступы

        // Скрытие формы обратного звонка после успешной отправки
        const callbackForm = document.querySelector('form[onsubmit="handleCallbackSubmit(event)"]');
        callbackForm.style.display = 'none'; // Скроем форму

        // После успешной отправки можно сделать дополнительные действия
        // Например, отправить данные на сервер или очистить поля формы
    }
});
