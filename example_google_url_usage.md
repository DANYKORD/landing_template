# Інтеграція з Google Apps Script (Відправка даних у Google Таблиці)

У цьому проекті реалізовано відправку даних форми (замовлення) безпосередньо у Google Таблиці через Google Apps Script (Web App). Ось детальний приклад та пояснення того, як це працює, на основі реалізації в `CheckoutModal.jsx`.

## 1. Конфігурація (Збереження URL)

URL вашого розгорнутого Google Script зберігається у конфігураційному файлі (наприклад, `public/config.js`), щоб його було легко змінювати без перезбирання та зміни коду самого проекту:

```javascript
// public/config.js
window.appConfig = {
  // ...
  integrations: {
    googleSheets: {
      enabled: true,
      webAppUrl: "https://script.google.com/macros/s/ВАШ_ІДЕНТИФІКАТОР/exec"
    }
  }
};
```

## 2. Підготовка даних (FormData)

Перед відправкою ми збираємо всі необхідні дані у об'єкт `FormData`. Це зручний спосіб структурувати поля, які ми хочемо передати до таблиці.

```javascript
const formData = new FormData();

// Додаємо поля, які очікує наш Google Script
formData.append('date', new Date().toLocaleString("uk-UA")); // Дата замовлення
formData.append('name', userName.trim());                    // Ім'я клієнта
formData.append('phone', userPhone.trim());                  // Телефон
formData.append('price', config.product.price);              // Ціна за одиницю
formData.append('product', config.product.title);            // Назва товару
formData.append('quantity', quantity);                       // Кількість замовлених товарів
formData.append('totalPrice', config.product.price * quantity); // Загальна сума
formData.append('delivery', npDeliveryAddress);              // Адреса доставки (Нова Пошта)
```

## 3. Відправка запиту (Fetch API)

Найважливіша частина — це правильне формування HTTP-запиту. Google Apps Script має специфічні вимоги до політики CORS (Cross-Origin Resource Sharing) та формату передачі даних.

Ось правильна реалізація:

```javascript
try {
  // Відправляємо POST-запит на URL Google Script
  await fetch(config.integrations.googleSheets.webAppUrl, {
    method: "POST",
    
    // ВАЖЛИВО: mode: "no-cors" - ОБОВ'ЯЗКОВО! 
    // Без цього запит буде заблоковано браузером (CORS error)
    mode: "no-cors", 
    
    // ВАЖЛИВО: Вказуємо, що дані передаються як стандартна веб-форма
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded" 
    },
    
    // ВАЖЛИВО: FormData конвертується у рядок параметрів за допомогою URLSearchParams
    // Результат виглядає як: name=Іван&phone=+380991234567&product=Товар...
    body: new URLSearchParams(formData).toString()
  });

  // УВАГА: При mode: "no-cors" ми НЕ можемо прочитати відповідь від сервера.
  // JavaScript не знатиме, що відповів сервер (успіх чи помилка), він просто знає, що запит пішов.
  // Тому ми просто продовжуємо виконання і показуємо користувачу повідомлення про успіх.
  
  console.log("Замовлення успішно відправлено!");
  
  // Очищення форми або показ повідомлення:
  // setFormStatus({ type: "success", message: "Дякуємо! Ваше замовлення успішно прийнято." });
  
} catch (err) {
  // Цей блок спрацює, якщо взагалі немає інтернету або запит навіть не зміг відправитись
  console.error("Виникла помилка при відправці запиту:", err);
}
```

## Ключові моменти (Чому зроблено саме так?):

1. **Чому `mode: "no-cors"`?**
   Браузери з міркувань безпеки блокують запити до інших доменів (cross-origin), якщо сервер прямо не дозволяє це через спеціальні HTTP-заголовки. Google Apps Script Web Apps для POST запитів не повертають правильні CORS-заголовки. 
   Якщо не вказати `no-cors`, браузер видасть помилку і скасує запит. З режимом `no-cors` браузер відправляє запит (і Google Script його успішно обробляє та записує в таблицю!), але браузер "засекречує" відповідь від JavaScript (це називається Opaque response). Це стандартний хак для таких інтеграцій.

2. **Чому `URLSearchParams(formData)`?**
   Google Script найкраще і найстабільніше розуміє дані, надіслані у форматі `application/x-www-form-urlencoded` (як звичайна HTML форма, яку сабмітять). Використання `new URLSearchParams(formData).toString()` автоматично конвертує об'єкт `FormData` у правильний URL-кодований рядок.

3. **Як це виглядає на стороні Google Script?**
   На стороні вашого скрипта в Google має бути функція `doPost(e)`. Дані, які ви відправляєте, будуть доступні в об'єкті `e.parameter`. 
   
   *Приклад скрипта Google:*
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     
     // Отримуємо дані з нашого запиту
     var name = e.parameter.name;
     var phone = e.parameter.phone;
     var product = e.parameter.product;
     // і так далі...
     
     // Записуємо в таблицю (новий рядок)
     sheet.appendRow([new Date(), name, phone, product]);
     
     return ContentService.createTextOutput("Success");
   }
   ```
