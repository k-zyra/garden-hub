// App start point
async function startApp() {
  GardenHub.setupNavigation();
  GardenHub.setupTasks();
  GardenHub.setupCalendar();
  GardenHub.setupGallery();
  GardenHub.setupModals();

  await GardenHub.loadFromSupabase();

  GardenHub.renderDashboard();
  GardenHub.renderTasks();
  GardenHub.renderCalendar();
  GardenHub.renderGallery();
}

startApp();
