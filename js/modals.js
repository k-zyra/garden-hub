GardenHub.setupModals = function () {
  GardenHub.$$('[data-close-modal]').forEach(button => {
    button.onclick = GardenHub.closeModals;
  });

  GardenHub.$$('.modal-backdrop').forEach(modal => {
    modal.onclick = event => {
      if (event.target === modal) GardenHub.closeModals();
    };
  });
};
