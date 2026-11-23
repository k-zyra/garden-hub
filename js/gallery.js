/* Galeria zdjęć i upload */
GardenHub.renderGallery = function () {
  GardenHub.$('#galleryGrid').innerHTML = GardenHub.photos.length
    ? GardenHub.photos.map(photo => `<article class="photo-card"><img src="${photo.image}" alt="${GardenHub.escapeHtml(photo.title)}"><div class="photo-info"><button class="photo-delete" data-photo-delete="${photo.id}" aria-label="Usuń zdjęcie">×</button><h3>${GardenHub.escapeHtml(photo.title)}</h3><p>${GardenHub.escapeHtml(photo.description)}</p><small>${new Date(photo.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}</small></div></article>`).join('')
    : '<div class="panel empty-state" style="grid-column:1/-1;padding:60px">Twój ogród dopiero zaczyna się rozwijać.<br>Dodaj pierwsze zdjęcie!</div>';

  GardenHub.$$('[data-photo-delete]').forEach(button => {
    button.onclick = () => {
      GardenHub.photos = GardenHub.photos.filter(photo => photo.id !== Number(button.dataset.photoDelete));
      GardenHub.save();
      GardenHub.renderGallery();
      GardenHub.renderDashboard();
    };
  });
};

GardenHub.setupGallery = function () {
  GardenHub.$('#photoAddButton').onclick = () => GardenHub.openModal('photoModal');

  GardenHub.$('#photoFile').addEventListener('change', event => {
    if (event.target.files[0]) {
      GardenHub.$('#uploadBox').querySelector('span').textContent = event.target.files[0].name;
    }
  });

  GardenHub.$('#photoForm').addEventListener('submit', event => {
    event.preventDefault();
    const file = GardenHub.$('#photoFile').files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      GardenHub.photos.unshift({
        id: Date.now(),
        title: GardenHub.$('#photoTitle').value.trim(),
        description: GardenHub.$('#photoDescription').value.trim(),
        image: reader.result,
        date: new Date().toISOString()
      });
      GardenHub.save();
      GardenHub.closeModals();
      event.target.reset();
      GardenHub.$('#uploadBox').querySelector('span').textContent = 'Wybierz zdjęcie';
      GardenHub.renderGallery();
      GardenHub.renderDashboard();
    };
    reader.readAsDataURL(file);
  });
};
