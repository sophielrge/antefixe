import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderModule } from '@angular/platform-server';
import { readFileSync } from 'fs';
import { existsSync } from 'node:fs';


const __dirname = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(__dirname, '../browser');
let indexHtmlPath = resolve(__dirname, '../.angular/prerender-root/browser/index.html');

if (!existsSync(indexHtmlPath)) {
  indexHtmlPath = resolve(__dirname, '../browser/index.html'); // fallback si prerender n'existe pas
}

const indexHtml = readFileSync(indexHtmlPath, 'utf-8');
const app = express();

/**
 * Sert les fichiers statiques (uniquement si build fait, sinon vide)
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * SSR : toutes les routes renvoient l'app Angular
 */
app.get('*', async (req, res, next) => {
  try {
    const html = await renderModule(class {}, {
      document: indexHtml,
      url: req.url,
    });
    res.send(html);
  } catch (err) {
    next(err);
  }
});

const port = 4200;
app.listen(port, () => {
  console.log(`✅ Server ready on http://localhost:${port}`);
});