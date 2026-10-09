// Збирає всі дані сайту з папки content/ в один об'єкт config.
//  - тексти й ціни:  content/texts.js
//  - ключі:          content/keys.js (якщо його немає — content/keys.example.js)
//  - фото:           content/photos/  (знаходяться автоматично за назвою файлу)
import texts from '../content/texts.js';

// ---------- Ключі ----------
const privateKeys = Object.values(import.meta.glob('../content/keys.js', { eager: true, import: 'default' }))[0];
const exampleKeys = Object.values(import.meta.glob('../content/keys.example.js', { eager: true, import: 'default' }))[0];
if (!privateKeys) {
  console.warn('[config] Файл content/keys.js не знайдено — використовується content/keys.example.js (замовлення не надсилатимуться).');
}
const keys = privateKeys || exampleKeys || {};

// ---------- Фото / відео ----------
// Будь-яке розширення: main.jpg, main.png, main.webp ... Регістр назви не важливий.
const mediaFiles = import.meta.glob(
  '../content/photos/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,avif,AVIF,gif,GIF,svg,SVG,mp4,MP4,webm,WEBM}',
  { eager: true, query: '?url', import: 'default' }
);

const VIDEO_EXT = ['mp4', 'webm'];
const photos = {};
for (const [path, src] of Object.entries(mediaFiles)) {
  const file = path.split('/').pop();
  const dot = file.lastIndexOf('.');
  const name = file.slice(0, dot).trim().toLowerCase();
  const ext = file.slice(dot + 1).toLowerCase();
  if (!photos[name]) photos[name] = { src, isVideo: VIDEO_EXT.includes(ext) };
}

// Номери фото, що відповідають шаблону (наприклад "1", "2" або "1_comment", "2_comment"), за зростанням
const numbersFor = (pattern) =>
  Object.keys(photos)
    .map((name) => name.match(pattern))
    .filter(Boolean)
    .map((m) => Number(m[1]))
    .sort((a, b) => a - b);

// ---------- Блоки з описом: блок N = фото "N" + текст blocks[N-1] ----------
const textBlocks = texts.blocks || [];
const blockPhotoNumbers = numbersFor(/^(\d+)$/);
const blockCount = Math.max(textBlocks.length, blockPhotoNumbers.at(-1) || 0);

const contentBlocks = Array.from({ length: blockCount }, (_, i) => ({
  title: textBlocks[i]?.title || '',
  text: textBlocks[i]?.text || '',
  media: photos[String(i + 1)] || null,
})).filter((b) => b.title || b.text || b.media);

// ---------- Відгуки: всі фото "N_comment" по порядку ----------
const reviews = numbersFor(/^(\d+)_comment$/).map((n) => photos[`${n}_comment`]);

// ---------- Підсумковий config ----------
const form = texts.form || {};

const config = {
  company: {
    name: texts.siteTitle,
    copyright: texts.copyright,
  },
  product: {
    title: (texts.productTitle || '').trim(),
    badge: texts.badge,
    price: Number(texts.price) || 0,
    originalPrice: Number(texts.oldPrice) || 0,
    currency: texts.currency,
    mainImage: photos.main || null,
  },
  promo: {
    enabled: !!texts.timer?.show,
    timer: {
      enabled: !!texts.timer?.show,
      text: texts.timer?.text,
      endDate: texts.timer?.endDate,
    },
  },
  contentBlocks,
  reviews,
  footerImage: photos.footer || null,
  integrations: {
    googleSheets: { webAppUrl: (keys.googleSheetsUrl || '').trim() },
    novaPoshta: { apiKey: (keys.novaPoshtaApiKey || '').trim() },
  },
  uiText: {
    hero: {
      oldPrice: texts.hero?.oldPriceLabel,
      newPrice: texts.hero?.newPriceLabel,
      orderButton: texts.hero?.button,
    },
    finalCta: {
      title: texts.finalBlock?.title || '',
      oldPrice: texts.finalBlock?.oldPriceLabel,
      newPrice: texts.finalBlock?.newPriceLabel,
      securePayment: texts.finalBlock?.securePayment,
    },
    checkout: {
      title: form.title,
      nameLabel: form.nameLabel,
      namePlaceholder: form.namePlaceholder,
      phoneLabel: form.phoneLabel,
      cityLabel: form.cityLabel,
      cityPlaceholder: form.cityPlaceholder,
      branchLabel: form.branchLabel,
      branchPlaceholder: form.branchPlaceholder,
      branchNeedCity: form.branchNeedCity,
      quantity: form.quantityLabel,
      totalToPay: form.totalLabel,
      submitButton: form.submitButton,
      submitting: form.submitting,
      success: form.success,
      error: form.error,
      deliveryNotSpecified: form.deliveryNotSpecified,
    },
    reviews: {
      title: texts.reviews?.title,
      subtitle: texts.reviews?.subtitle,
    },
    timer: {
      expired: texts.timer?.expiredText,
    },
  },
};

export default config;
