import fs from 'fs';

const configContent = `window.CONFIG = {
  company: {
    name: "Shop Men",
    copyright: "© 2026 Shop Men. Всі права захищено."
  },
  product: {
    title: "Засіб для відновлення кольору дерева",
    badge: "50%\\nзнижка",
    price: 249,
    originalPrice: 499,
    currency: "грн",
    mainImage: "/assets/main.png",
  },
  promo: {
    enabled: true,
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
      text: "🪵 Засіб допомагає швидко освіжити вигляд деревини, повертає насичений колір та підкреслює природну текстуру дерева. ✨\\n\\nНадає поверхні доглянутого вигляду без шліфування та дорогого ремонту. Ідеально підходить для меблів, дверей, терас і парканів. 🌿🏡"
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
      title: "Встигніть замовити\\nзі знижкою!",
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
      npLabel: "Доставка Новою Поштою",
      npSelect: "Вибрати відділення",
      npSubtitle: "Поштомат або відділення на карті",
      quantity: "Кількість:",
      totalToPay: "До оплати:",
      submitButton: "Підтвердити замовлення",
      submitting: "Надсилаємо...",
      success: "Дякуємо! Ваше замовлення успішно прийнято.",
      error: "Виникла помилка при оформленні. Спробуйте ще раз.",
      mapTitle: "Виберіть відділення на карті"
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
`;
fs.writeFileSync('public/config.js', configContent);

let hero = fs.readFileSync('src/components/Hero.jsx', 'utf-8');
hero = hero.replace('Звичайна ціна', '{config.uiText.hero.oldPrice}');
hero = hero.replace('Акційна ціна', '{config.uiText.hero.newPrice}');
hero = hero.replace('Замовити зараз', '{config.uiText.hero.orderButton}');
fs.writeFileSync('src/components/Hero.jsx', hero);

let finalCta = fs.readFileSync('src/components/FinalCTA.jsx', 'utf-8');
finalCta = finalCta.replace('>Встигніть замовити<br/>зі знижкою!<', ' dangerouslySetInnerHTML={{ __html: config.uiText.finalCta.title.replace(/\\n/g, "<br/>") }}><');
finalCta = finalCta.replace('Звичайна ціна', '{config.uiText.finalCta.oldPrice}');
finalCta = finalCta.replace('Акційна ціна', '{config.uiText.finalCta.newPrice}');
finalCta = finalCta.replace('Оформити замовлення', '{config.uiText.finalCta.orderButton}');
finalCta = finalCta.replace('Безпечна оплата при отриманні', '{config.uiText.finalCta.securePayment}');
fs.writeFileSync('src/components/FinalCTA.jsx', finalCta);

let checkout = fs.readFileSync('src/components/CheckoutModal.jsx', 'utf-8');
checkout = checkout.replace('Оформити замовлення', '{config.uiText.checkout.title}');
checkout = checkout.replace("Ваше ім'я", "{config.uiText.checkout.nameLabel}");
checkout = checkout.replace('placeholder="Іван Іванов"', 'placeholder={config.uiText.checkout.namePlaceholder}');
checkout = checkout.replace('Номер телефону', '{config.uiText.checkout.phoneLabel}');
checkout = checkout.replace('Доставка Новою Поштою', '{config.uiText.checkout.npLabel}');
checkout = checkout.replace('Вибрати відділення', '{config.uiText.checkout.npSelect}');
checkout = checkout.replace('"Вибрати відділення"', 'config.uiText.checkout.npSelect');
checkout = checkout.replace('Поштомат або відділення на карті', '{config.uiText.checkout.npSubtitle}');
checkout = checkout.replace('"Поштомат або відділення на карті"', 'config.uiText.checkout.npSubtitle');
checkout = checkout.replace('Кількість:', '{config.uiText.checkout.quantity}');
checkout = checkout.replace('До оплати:', '{config.uiText.checkout.totalToPay}');
checkout = checkout.replace('{isSubmitting ? "Надсилаємо..." : "Підтвердити замовлення"}', '{isSubmitting ? config.uiText.checkout.submitting : config.uiText.checkout.submitButton}');
checkout = checkout.replace('"Дякуємо! Ваше замовлення успішно прийнято."', 'config.uiText.checkout.success');
checkout = checkout.replace('"Виникла помилка при оформленні. Спробуйте ще раз."', 'config.uiText.checkout.error');
checkout = checkout.replace('Виберіть відділення на карті', '{config.uiText.checkout.mapTitle}');
fs.writeFileSync('src/components/CheckoutModal.jsx', checkout);

let reviews = fs.readFileSync('src/components/Reviews.jsx', 'utf-8');
reviews = reviews.replace('Відгуки покупців', '{config.uiText.reviews.title}');
reviews = reviews.replace('98% покупців рекомендують цей товар', '{config.uiText.reviews.subtitle}');
reviews = reviews.replace(/Відгук/g, '${config.uiText.reviews.reviewAlt}');
fs.writeFileSync('src/components/Reviews.jsx', reviews);

let timer = fs.readFileSync('src/components/PromoTimer.jsx', 'utf-8');
timer = timer.replace('"Акція завершена"', 'config.uiText.timer.expired');
fs.writeFileSync('src/components/PromoTimer.jsx', timer);

let footer = fs.readFileSync('src/components/Footer.jsx', 'utf-8');
footer = footer.replace('"Оплата і доставка"', 'config.uiText.footer.altText');
fs.writeFileSync('src/components/Footer.jsx', footer);
