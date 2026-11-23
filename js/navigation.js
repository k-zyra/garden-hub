GardenHub.showView = function (name) {
  GardenHub.$$('.view').forEach(view => view.classList.remove('active'));
  GardenHub.$(`#${name}View`).classList.add('active');
  GardenHub.$$('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === name));
  GardenHub.$('.sidebar').classList.remove('open');

  if (name === 'calendar') GardenHub.renderCalendar();
  if (name === 'gallery') GardenHub.renderGallery();
  if (name === 'tasks') GardenHub.renderTasks();
  if (name === 'today') GardenHub.renderDashboard();
};

GardenHub.setupNavigation = function () {
  GardenHub.$('#todayDate').textContent = GardenHub.fmtDate(GardenHub.today);

  const month = GardenHub.today.getMonth();
  const season = month < 2 ? 'Zima' : month < 5 ? 'Wiosna' : month < 8 ? 'Lato' : month < 11 ? 'Jesień' : 'Zima';
  GardenHub.$('#seasonLabel').textContent = `${season} ${GardenHub.today.getFullYear()}`;

  GardenHub.$$('.nav-item').forEach(button => {
    button.addEventListener('click', () => GardenHub.showView(button.dataset.view));
  });

  GardenHub.$$('[data-view-link]').forEach(button => {
    button.addEventListener('click', () => GardenHub.showView(button.dataset.viewLink));
  });

  GardenHub.$('#menuButton').addEventListener('click', () => GardenHub.$('.sidebar').classList.toggle('open'));
};
