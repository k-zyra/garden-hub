GardenHub.renderGallery = function () {
  GardenHub.$('#galleryGrid').innerHTML = GardenHub.photos.length
    ? GardenHub.photos.map(photo => `<article class="photo-card"><img src="${photo.image}" alt="${GardenHub.escapeHtml(photo.title)}"><div class="photo-info"><button class="photo-delete" data-photo-delete="${photo.id}" aria-label="Usuń zdjęcie">×</button><h3>${GardenHub.escapeHtml(photo.title)}</h3><p>${GardenHub.escapeHtml(photo.description)}</p><small>${new Date(photo.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}</small></div></article>`).join('')
    : '<div class="panel empty-state" style="grid-column:1/-1;padding:60px">Twój ogród dopiero zaczyna się rozwijać.<br>Dodaj pierwsze zdjęcie!</div>';

  GardenHub.$$('[data-photo-delete]').forEach(button => {
    button.onclick = () => {
      const photoId = Number(button.dataset.photoDelete);
      GardenHub.photos = GardenHub.photos.filter(photo => photo.id !== photoId);
      GardenHub.save();

      gardenSupabase
        .from('photos')
        .delete()
        .eq('id', photoId)
        .then(({ error }) => {
          if (error) console.error('Nie udało się usunąć zdjęcia:', error);
        });

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
      const photo = {
        id: Date.now(),
        title: GardenHub.$('#photoTitle').value.trim(),
        description: GardenHub.$('#photoDescription').value.trim(),
        image: reader.result,
        date: new Date().toISOString()
      };

      GardenHub.photos.unshift(photo);
      GardenHub.save();

      gardenSupabase
        .from('photos')
        .insert({
          id: photo.id,
          title: photo.title,
          description: photo.description,
          image: photo.image,
          date: photo.date
        })
        .then(({ error }) => {
          if (error) console.error('Nie udało się dodać zdjęcia:', error);
        });

      GardenHub.closeModals();
      event.target.reset();
      GardenHub.$('#uploadBox').querySelector('span').textContent = 'Wybierz zdjęcie';
      GardenHub.renderGallery();
      GardenHub.renderDashboard();
    };
    reader.readAsDataURL(file);
  });
};
