GardenHub.bindTaskChecks = function () {
  GardenHub.$$('[data-task-check]').forEach(button => {
    button.onclick = () => {
      const task = GardenHub.tasks.find(item => item.id === Number(button.dataset.taskCheck));
      if (!task) return;
      task.done = !task.done;
      GardenHub.save();
      GardenHub.renderDashboard();
      GardenHub.renderTasks();
    };
  });
};

GardenHub.renderDashboard = function () {
  const activeTasks = GardenHub.tasks.filter(task => !task.done);
  GardenHub.$('#taskCount').textContent = activeTasks.length;
  GardenHub.$('#eventCount').textContent = GardenHub.events.length;
  GardenHub.$('#plantCount').textContent = GardenHub.photos.length + GardenHub.tasks.length;

  const shown = GardenHub.tasks.slice(0, 5);
  GardenHub.$('#todayTaskList').innerHTML = shown.length
    ? shown.map(task => `<div class="preview-task ${task.done ? 'done' : ''}"><button class="check-button ${task.done ? 'done' : ''}" data-task-check="${task.id}" aria-label="Zmień status"></button><div><span class="task-name">${GardenHub.escapeHtml(task.name)}</span><span class="task-meta">${task.date ? GardenHub.shortDate(task.date) : 'Bez terminu'}</span></div></div>`).join('')
    : '<div class="empty-state">Brak zadań na dziś</div>';

  const todayIso = GardenHub.today.toISOString().slice(0, 10);
  const upcoming = [...GardenHub.events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter(event => event.date >= todayIso)
    .slice(0, 4);

  GardenHub.$('#upcomingList').innerHTML = upcoming.length
    ? upcoming.map(event => {
        const date = new Date(`${event.date}T12:00:00`);
        return `<div class="upcoming-item"><div class="upcoming-date"><strong>${date.getDate()}</strong><small>${date.toLocaleDateString('pl-PL', { month: 'short' })}</small></div><div><strong>${GardenHub.escapeHtml(event.name)}</strong><span>Wysiew w doniczce lub gruncie</span></div></div>`;
      }).join('')
    : '<div class="empty-state">Dodaj pierwszy wysiew</div>';

  GardenHub.bindTaskChecks();
};

GardenHub.renderTasks = function () {
  const shown = GardenHub.tasks.filter(task => {
    if (GardenHub.currentFilter === 'done') return task.done;
    if (GardenHub.currentFilter === 'active') return !task.done;
    return true;
  });

  GardenHub.$('#taskList').innerHTML = shown.length
    ? shown.map(task => `<div class="task-row ${task.done ? 'done' : ''}"><button class="check-button ${task.done ? 'done' : ''}" data-task-check="${task.id}" aria-label="Zmień status"></button><div><span class="task-name">${GardenHub.escapeHtml(task.name)}</span><span class="task-meta">${task.date ? GardenHub.shortDate(task.date) : 'Bez terminu'}</span></div><button class="delete-button" data-task-delete="${task.id}" aria-label="Usuń">×</button></div>`).join('')
    : '<div class="empty-state">Na tej liście niczego nie ma</div>';

  GardenHub.bindTaskChecks();
  GardenHub.$$('[data-task-delete]').forEach(button => {
    button.onclick = () => {
      GardenHub.tasks = GardenHub.tasks.filter(task => task.id !== Number(button.dataset.taskDelete));
      GardenHub.save();
      GardenHub.renderTasks();
      GardenHub.renderDashboard();
    };
  });
};

GardenHub.addTask = function (name, date) {
  if (!name.trim()) return;
  GardenHub.tasks.unshift({ id: Date.now(), name: name.trim(), date: date || '', done: false });
  GardenHub.save();
  GardenHub.renderTasks();
  GardenHub.renderDashboard();
};

GardenHub.setupTasks = function () {
  GardenHub.$$('.filter').forEach(filter => {
    filter.onclick = () => {
      GardenHub.currentFilter = filter.dataset.filter;
      GardenHub.$$('.filter').forEach(item => item.classList.remove('active'));
      filter.classList.add('active');
      GardenHub.renderTasks();
    };
  });

  GardenHub.$('#taskForm').addEventListener('submit', event => {
    event.preventDefault();
    GardenHub.addTask(GardenHub.$('#taskInput').value, GardenHub.$('#taskDate').value);
    event.target.reset();
  });

  GardenHub.$('#modalTaskForm').addEventListener('submit', event => {
    event.preventDefault();
    GardenHub.addTask(GardenHub.$('#modalTaskInput').value, GardenHub.$('#modalTaskDate').value);
    GardenHub.closeModals();
    event.target.reset();
  });

  GardenHub.$('#quickAddButton').onclick = () => GardenHub.openModal('taskModal');
  GardenHub.$('#taskViewAdd').onclick = () => GardenHub.openModal('taskModal');
};
