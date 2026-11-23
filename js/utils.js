/* Wspólne funkcje i stan aplikacji */
window.GardenHub = window.GardenHub || {};

GardenHub.$ = selector => document.querySelector(selector);
GardenHub.$$ = selector => [...document.querySelectorAll(selector)];

GardenHub.today = new Date();
GardenHub.storage = {
  get: (key, fallback) => JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)),
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value))
};

GardenHub.tasks = GardenHub.storage.get('gardenTasks', [
  { id: 1, name: 'Podlać świeżo zasadzone sałaty', date: '', done: false },
  { id: 2, name: 'Usunąć chwasty przy grządkach', date: '', done: false },
  { id: 3, name: 'Sprawdzić nasionka pomidorów', date: '', done: true }
]);

GardenHub.events = GardenHub.storage.get('gardenEvents', [
  { id: 1, name: 'Sałata', date: new Date(GardenHub.today.getFullYear(), GardenHub.today.getMonth(), GardenHub.today.getDate() + 2).toISOString().slice(0, 10), color: 'green' },
  { id: 2, name: 'Rzodkiewka', date: new Date(GardenHub.today.getFullYear(), GardenHub.today.getMonth(), GardenHub.today.getDate() + 5).toISOString().slice(0, 10), color: 'pink' },
  { id: 3, name: 'Marchew', date: new Date(GardenHub.today.getFullYear(), GardenHub.today.getMonth(), GardenHub.today.getDate() + 9).toISOString().slice(0, 10), color: 'amber' }
]);

GardenHub.photos = GardenHub.storage.get('gardenPhotos', []);
GardenHub.currentFilter = 'all';
GardenHub.viewDate = new Date(GardenHub.today.getFullYear(), GardenHub.today.getMonth(), 1);

GardenHub.save = function () {
  GardenHub.storage.set('gardenTasks', GardenHub.tasks);
  GardenHub.storage.set('gardenEvents', GardenHub.events);
  GardenHub.storage.set('gardenPhotos', GardenHub.photos);
};

GardenHub.fmtDate = date => date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });

GardenHub.shortDate = iso => {
  if (!iso) return 'Bez terminu';
  return new Date(`${iso}T12:00:00`).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' });
};

GardenHub.escapeHtml = value => {
  const element = document.createElement('div');
  element.textContent = value || '';
  return element.innerHTML;
};

GardenHub.openModal = id => document.querySelector(`#${id}`).classList.add('open');
GardenHub.closeModals = () => GardenHub.$$('.modal-backdrop').forEach(modal => modal.classList.remove('open'));
