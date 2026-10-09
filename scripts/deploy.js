// Публікація сайту на Firebase Hosting однією командою.
//
//   npm run deploy     — зібрати сайт і опублікувати його
//   npm run site:off   — вимкнути сайт (на адресі буде сторінка "Site Not Found")
//
// ID проекту береться з content/keys.js (firebaseProjectId),
// а якщо його там немає — з файлу .firebaserc.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const keysPath = path.join(root, 'content', 'keys.js');

function run(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: 'inherit', shell: true, cwd: root });
  if (result.status !== 0) {
    console.error(`\n❌ Команда "${cmd} ${args.join(' ')}" завершилась з помилкою.`);
    process.exit(result.status ?? 1);
  }
}

// 1. Чи встановлено Firebase CLI
const check = spawnSync('firebase', ['--version'], { shell: true, stdio: 'ignore' });
if (check.status !== 0) {
  console.error('\n❌ Firebase CLI не встановлено. Виконайте один раз:\n\n   npm install -g firebase-tools\n   firebase login\n');
  process.exit(1);
}

// 2. ID проекту
let projectId = '';
if (existsSync(keysPath)) {
  const keys = (await import(pathToFileURL(keysPath).href)).default || {};
  projectId = String(keys.firebaseProjectId || '').trim();
}
const projectArgs = projectId ? ['--project', projectId] : [];
console.log(projectId
  ? `\n🔥 Проект Firebase: ${projectId}\n`
  : '\n⚠ firebaseProjectId не вказано в content/keys.js — використовується проект з .firebaserc\n');

// 3. Дія
if (process.argv.includes('--off')) {
  run('firebase', ['hosting:disable', '--force', ...projectArgs]);
  console.log('\n✅ Сайт вимкнено. Щоб увімкнути знову — npm run deploy\n');
} else {
  run('npx', ['vite', 'build']);
  run('firebase', ['deploy', '--only', 'hosting', ...projectArgs]);
  console.log('\n✅ Готово! Сайт опубліковано.\n');
}
