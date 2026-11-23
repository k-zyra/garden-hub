GardenHub.renderCalendar = function () {
  const year = GardenHub.viewDate.getFullYear();
  const month = GardenHub.viewDate.getMonth();
  GardenHub.$('#calendarTitle').textContent = GardenHub.viewDate.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  let html = '';

  for (let index = 0; index < 42; index++) {
    const number = index - startOffset + 1;
    let day;
    let className = '';

    if (number < 1) {
      day = previousMonthDays + number;
      className = 'other';
    } else if (number > daysInMonth) {
      day = number - daysInMonth;
      className = 'other';
    } else {
      day = number;
    }

    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (!className && day === GardenHub.today.getDate() && month === GardenHub.today.getMonth() && year === GardenHub.today.getFullYear()) {
      className = 'today';
    }

    const dayEvents = className === 'other'
      ? []
      : GardenHub.events.filter(event => event.date === iso);

    html += `<div class="calendar-day ${className}"><span class="day-number">${day}</span>${dayEvents.map(event => `<span class="calendar-event ${event.color}">${GardenHub.escapeHtml(event.name)}</span>`).join('')}</div>`;
  }

  GardenHub.$('#calendarGrid').innerHTML = html;
};

GardenHub.setupCalendar = function () {
  GardenHub.$('#prevMonth').onclick = () => {
    GardenHub.viewDate = new Date(GardenHub.viewDate.getFullYear(), GardenHub.viewDate.getMonth() - 1, 1);
    GardenHub.renderCalendar();
  };

  GardenHub.$('#nextMonth').onclick = () => {
    GardenHub.viewDate = new Date(GardenHub.viewDate.getFullYear(), GardenHub.viewDate.getMonth() + 1, 1);
    GardenHub.renderCalendar();
  };

  GardenHub.$('#eventAddButton').onclick = () => GardenHub.openModal('eventModal');

  GardenHub.$('#eventForm').addEventListener('submit', event => {
    event.preventDefault();
    GardenHub.events.push({
      id: Date.now(),
      name: GardenHub.$('#eventName').value.trim(),
      date: GardenHub.$('#eventDate').value,
      color: GardenHub.$('#eventColor').value
    });
    GardenHub.save();
    GardenHub.closeModals();
    event.target.reset();
    GardenHub.renderCalendar();
    GardenHub.renderDashboard();
  });
};
