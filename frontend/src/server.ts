import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderModule } from '@angular/platform-server';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(__dirname, '../browser');
const indexHtml = readFileSync(resolve(browserDistFolder, 'index.html')).toString();

const app = express();

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 * On Angular 19+, renderModule can être utilisé directement sans module pré-compilé.
 */
app.get('/**', async (req, res, next) => {
  try {
    const html = await renderModule(
      // Ici tu peux mettre ton AppServerModule si tu en crées un plus tard
      // ou un module inline minimal pour le SSR
      class {},
      {
        document: indexHtml,
        url: req.url,
      }
    );
    res.send(html);
  } catch (err) {
    next(err);
  }
});


const port = 4200;
app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});

export default app;
