import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import texts from './content/texts.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        const title = (texts.siteTitle || 'Domivka Shop').trim();
        const desc = (texts.productTitle ? `${texts.productTitle} — швидке оформлення замовлення` : 'Офіційний сайт').trim();
        return html
          .replace(/<title>(.*?)<\/title>/g, `<title>${title}</title>`)
          .replace(/(<meta name="title" content=").*?(" \/>)/g, `$1${title}$2`)
          .replace(/(<meta property="og:title" content=").*?(" \/>)/g, `$1${title}$2`)
          .replace(/(<meta name="twitter:title" content=").*?(" \/>)/g, `$1${title}$2`)
          .replace(/(<meta name="description" content=").*?(" \/>)/g, `$1${desc}$2`)
          .replace(/(<meta property="og:description" content=").*?(" \/>)/g, `$1${desc}$2`)
          .replace(/(<meta name="twitter:description" content=").*?(" \/>)/g, `$1${desc}$2`);
      }
    }
  ],
})
