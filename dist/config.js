window.CONFIG = {
  company: {
    name: "Domivka Shop",
    copyright: "© 2026 Domivka Shop "
  },
  product: {
    title: "Засіб Для відновлення кольору дерева",
    badge: "50%\nзнижка",
    price: 350,
    originalPrice: 700,
    currency: "грн",
    mainImage: "/assets/main.png", //Головна картинка
  },
  promo: {
    enabled: true, //Якщо true, то показується акція
    timer: {
      enabled: true,
      text: "Ця пропозиція закінчиться через:",
      endDate: "2026-06-15T23:59:59"
    }
  },
  contentBlocks: [
    {
      title: "Як використовувати засіб для відновлення меблів?",
      image: "/assets/3.gif",
      text: "🪵 Засіб допомагає швидко освіжити вигляд деревини, повертає насичений колір та підкреслює природну текстуру дерева. ✨\n\nНадає поверхні доглянутого вигляду без шліфування та дорогого ремонту. Ідеально підходить для меблів, дверей, терас і парканів. 🌿🏡"
    },
    {
      title: "Глибоке проникнення",
      image: "/assets/1.png",
      text: "Засіб глибоко проникає в структуру дерева, захищаючи його від пересихання, вологи та дрібних подряпин. Безпечний склад."
    },
    {
      title: "Ідеальний результат",
      image: "/assets/2.png",
      text: "Ваші меблі виглядатимуть як нові. Залишає легкий блиск та приємний аромат. Підходить для будь-яких порід дерева."
    }
  ],
  reviews: [
    "/assets/1_comment.png",
    "/assets/2_comment.png",
    "/assets/3_comment.png"
  ],
  footerImage: "/assets/footer.png",
  integrations: {
    telegram: { enabled: false, botToken: "", chatId: [] },
    googleSheets: {
      enabled: true,
      webAppUrl: "https://script.google.com/macros/s/AKfycbyD5J55T5FGGhpkkGuN_yA6Hrvcp9AXAUft0mlTTojv_j46Nrlv7eQ5LWKliEDdjzk2jw/exec"
    },
    novaPoshta: { apiKey: "3d0d63604ab16ec8e6a8c6634f7e961a" }
  },
  uiText: {
    hero: {
      oldPrice: "Звичайна ціна",
      newPrice: "Акційна ціна",
      orderButton: "Замовити зараз"
    },
    finalCta: {
      title: "Встигніть замовити\nзі знижкою!",
      oldPrice: "Звичайна ціна",
      newPrice: "Акційна ціна",
      orderButton: "Оформити замовлення",
      securePayment: "Безпечна оплата при отриманні"
    },
    checkout: {
      title: "Оформити замовлення",
      nameLabel: "Ваше ім'я",
      namePlaceholder: "Іван Іванов",
      phoneLabel: "Номер телефону",
      cityLabel: "Місто доставки",
      cityPlaceholder: "Введіть місто",
      branchLabel: "Відділення або поштомат",
      branchPlaceholder: "Наприклад: Відділення №1",
      quantity: "Кількість:",
      totalToPay: "До оплати:",
      submitButton: "Підтвердити замовлення",
      submitting: "Надсилаємо...",
      success: "Дякуємо! Ваше замовлення успішно прийнято.",
      error: "Виникла помилка при оформленні. Спробуйте ще раз."
    },
    reviews: {
      title: "Відгуки покупців",
      subtitle: "98% покупців рекомендують цей товар",
      reviewAlt: "Відгук"
    },
    timer: {
      expired: "Акція завершена"
    },
    footer: {
      altText: "Оплата і доставка"
    }
  }
};
