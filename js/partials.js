/* Ładuje fragmenty HTML i uruchamia moduły po gotowej strukturze strony. */
async function loadPartial(name, targetSelector) {
  const response = await fetch(`partials/${name}.html`);

  if (!response.ok) {
    throw new Error(`Nie udało się wczytać fragmentu: ${name}`);
  }

  const html = await response.text();
  document.querySelector(targetSelector).innerHTML = html;
}

async function loadScripts(paths) {
  for (const path of paths) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = path;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Nie udało się wczytać skryptu: ${path}`));
      document.body.appendChild(script);
    });
  }
}

async function initializePage() {
  await Promise.all([
    loadPartial('sidebar', '#sidebarSlot'),
    loadPartial('header', '#headerSlot'),
    loadPartial('views', '#viewsSlot'),
    loadPartial('modals', '#modalsSlot')
  ]);

  await loadScripts([
    'js/utils.js',
    'js/navigation.js',
    'js/tasks.js',
    'js/calendar.js',
    'js/gallery.js',
    'js/modals.js',
    'js/app.js'
  ]);
}

initializePage().catch(error => {
  document.body.innerHTML = `<p style="padding:24px;font-family:sans-serif">${error.message}</p>`;
});
