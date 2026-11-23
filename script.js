const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
const today=new Date();
const storage={get:(k,d)=>JSON.parse(localStorage.getItem(k)||JSON.stringify(d)),set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
let tasks=storage.get('gardenTasks',[
 {id:1,name:'Podlać świeżo zasadzone sałaty',date:'',done:false},
 {id:2,name:'Usunąć chwasty przy grządkach',date:'',done:false},
 {id:3,name:'Sprawdzić nasionka pomidorów',date:'',done:true}
]);
let events=storage.get('gardenEvents',[
 {id:1,name:'Sałata',date:new Date(today.getFullYear(),today.getMonth(),today.getDate()+2).toISOString().slice(0,10),color:'green'},
 {id:2,name:'Rzodkiewka',date:new Date(today.getFullYear(),today.getMonth(),today.getDate()+5).toISOString().slice(0,10),color:'pink'},
 {id:3,name:'Marchew',date:new Date(today.getFullYear(),today.getMonth(),today.getDate()+9).toISOString().slice(0,10),color:'amber'}
]);
let photos=storage.get('gardenPhotos',[]);let currentFilter='all';let viewDate=new Date(today.getFullYear(),today.getMonth(),1);

function save(){storage.set('gardenTasks',tasks);storage.set('gardenEvents',events);storage.set('gardenPhotos',photos)}
function fmtDate(d){return d.toLocaleDateString('pl-PL',{day:'numeric',month:'long',year:'numeric'})}
function shortDate(iso){const d=new Date(iso+'T12:00:00');return d.toLocaleDateDateString?d.toLocaleDateDateString('pl-PL',{day:'numeric',month:'short'}):d.toLocaleDateString('pl-PL',{day:'numeric',month:'short'})}
$('#todayDate').textContent=fmtDate(today);
const season=today.getMonth()<2?'Zima':today.getMonth()<5?'Wiosna':today.getMonth()<8?'Lato':today.getMonth()<11?'Jesień':'Zima';$('#seasonLabel').textContent=`${season} ${today.getFullYear()}`;

function showView(name){
 $$('.view').forEach(v=>v.classList.remove('active'));$(`#${name}View`).classList.add('active');
 $$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===name));
 $('#menuButton')?.parentElement.parentElement?.class;$('.sidebar').classList.remove('open');
 if(name==='calendar')renderCalendar();if(name==='gallery')renderGallery();if(name==='tasks')renderTasks();if(name==='today')renderDashboard();
}
$$('.nav-item').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
$$('[data-view-link]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.viewLink)));
$('#menuButton').addEventListener('click',()=>$('.sidebar').classList.toggle('open'));

function escapeHtml(value){const el=document.createElement('div');el.textContent=value||'';return el.innerHTML}
function renderDashboard(){
 const active=tasks.filter(t=>!t.done);$('#taskCount').textContent=active.length;$('#eventCount').textContent=events.length;$('#plantCount').textContent=photos.length+tasks.length;
 const list=$('#todayTaskList');const shown=tasks.slice(0,5);list.innerHTML=shown.length?shown.map(t=>`<div class="preview-task ${t.done?'done':''}"><button class="check-button ${t.done?'done':''}" data-task-check="${t.id}" aria-label="Zmień status"></button><div><span class="task-name">${escapeHtml(t.name)}</span><span class="task-meta">${t.date?shortDate(t.date):'Bez terminu'}</span></div></div>`).join(''):'<div class="empty-state">Brak zadań na dziś</div>';
 const sorted=[...events].sort((a,b)=>a.date.localeCompare(b.date)).filter(e=>e.date>=today.toISOString().slice(0,10)).slice(0,4);
 $('#upcomingList').innerHTML=sorted.length?sorted.map(e=>{const d=new Date(e.date+'T12:00:00');return `<div class="upcoming-item"><div class="upcoming-date"><strong>${d.getDate()}</strong><small>${d.toLocaleDateString('pl-PL',{month:'short'})}</small></div><div><strong>${escapeHtml(e.name)}</strong><span>Wysiew w doniczce lub gruncie</span></div></div>`}).join(''):'<div class="empty-state">Dodaj pierwszy wysiew</div>';
 bindTaskChecks();
}
function renderTasks(){
 let shown=tasks.filter(t=>currentFilter==='all'||(currentFilter==='done'?t.done:!t.done));
 $('#taskList').innerHTML=shown.length?shown.map(t=>`<div class="task-row ${t.done?'done':''}"><button class="check-button ${t.done?'done':''}" data-task-check="${t.id}" aria-label="Zmień status"></button><div><span class="task-name">${escapeHtml(t.name)}</span><span class="task-meta">${t.date?shortDate(t.date):'Bez terminu'}</span></div><button class="delete-button" data-task-delete="${t.id}" aria-label="Usuń">×</button></div>`).join(''):'<div class="empty-state">Na tej liście niczego nie ma</div>';
 bindTaskChecks();$$('[data-task-delete]').forEach(b=>b.onclick=()=>{tasks=tasks.filter(t=>t.id!==+b.dataset.taskDelete);save();renderTasks();renderDashboard()});
}
function bindTaskChecks(){ $$('[data-task-check]').forEach(b=>b.onclick=()=>{const t=tasks.find(x=>x.id===+b.dataset.taskCheck);if(t){t.done=!t.done;save();renderDashboard();renderTasks()}})}
$$('.filter').forEach(f=>f.onclick=()=>{currentFilter=f.dataset.filter;$$('.filter').forEach(x=>x.classList.remove('active'));f.classList.add('active');renderTasks()});

function addTask(name,date){if(!name.trim())return;tasks.unshift({id:Date.now(),name:name.trim(),date:date||'',done:false});save();renderTasks();renderDashboard()}
$('#taskForm').addEventListener('submit',e=>{e.preventDefault();addTask($('#taskInput').value,$('#taskDate').value);e.target.reset()});
$('#modalTaskForm').addEventListener('submit',e=>{e.preventEvent?.();e.preventDefault();addTask($('#modalTaskInput').value,$('#modalTaskDate').value);closeModals();e.target.reset()});

function openModal(id){$(`#${id}`).classList.add('open')}function closeModals(){ $$('.modal-backdrop').forEach(m=>m.classList.remove('open')) }
$('#quickAddButton').onclick=()=>openModal('taskModal');$('#taskViewAdd').onclick=()=>openModal('taskModal');$('#eventAddButton').onclick=()=>openModal('eventModal');$('#photoAddButton').onclick=()=>openModal('photoModal');$$('[data-close-modal]').forEach(b=>b.onclick=closeModals);$$('.modal-backdrop').forEach(m=>m.onclick=e=>{if(e.target===m)closeModals()});

function renderCalendar(){
 const year=viewDate.getFullYear(),month=viewDate.getMonth();$('#calendarTitle').textContent=viewDate.toLocaleDateString('pl-PL',{month:'long',year:'numeric'});
 const first=new Date(year,month,1);let start=(first.getDay()+6)%7;const days=new Date(year,month+1,0).getDate();const prevDays=new Date(year,month,0).getDate();let html='';
 for(let i=0;i<42;i++){const num=i-start+1;let d,cls='';if(num<1){d=prevDays+num;cls='other'}else if(num>days){d=num-days;cls='other'}else d=num;const iso=`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;if(!cls&&d===today.getDate()&&month===today.getMonth()&&year===today.getFullYear())cls='today';const es=cls==='other'?[]:events.filter(e=>e.date===iso);html+=`<div class="calendar-day ${cls}"><span class="day-number">${d}</span>${es.map(e=>`<span class="calendar-event ${e.color}">${escapeHtml(e.name)}</span>`).join('')}</div>`}
 $('#calendarGrid').innerHTML=html;
}
$('#prevMonth').onclick=()=>{viewDate=new Date(viewDate.getFullYear(),viewDate.getMonth()-1,1);renderCalendar()};$('#nextMonth').onclick=()=>{viewDate=new Date(viewDate.getFullYear(),viewDate.getMonth()+1,1);renderCalendar()};
$('#eventForm').addEventListener('submit',e=>{e.preventDefault();events.push({id:Date.now(),name:$('#eventName').value.trim(),date:$('#eventDate').value,color:$('#eventColor').value});save();closeModals();e.target.reset();renderCalendar();renderDashboard()});

function renderGallery(){
 $('#galleryGrid').innerHTML=photos.length?photos.map(p=>`<article class="photo-card"><img src="${p.image}" alt="${escapeHtml(p.title)}"><div class="photo-info"><button class="photo-delete" data-photo-delete="${p.id}" aria-label="Usuń zdjęcie">×</button><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.description)}</p><small>${new Date(p.date).toLocaleDateString('pl-PL',{day:'numeric',month:'long',year:'numeric'})}</small></div></article>`).join(''):'<div class="panel empty-state" style="grid-column:1/-1;padding:60px">Twój ogród dopiero zaczyna się rozwijać.<br>Dodaj pierwszą zdjęcie!</div>';
 $$('[data-photo-delete]').forEach(b=>b.onclick=()=>{photos=photos.filter(p=>p.id!==+b.dataset.photoDelete);save();renderGallery();renderDashboard()});
}
$('#photoFile').addEventListener('change',e=>{const label=$('#uploadBox');if(e.target.files[0])label.querySelector('span').textContent=e.target.files[0].name});
$('#photoForm').addEventListener('submit',e=>{e.preventEvent?.();e.preventDefault();const file=$('#photoFile').files[0];if(!file)return;const reader=new FileReader();reader.onload=()=>{photos.unshift({id:Date.now(),title:$('#photoTitle').value.trim(),description:$('#photoDescription').value.trim(),image:reader.result,date:new Date().toISOString()});save();closeModals();e.target.reset();$('#uploadBox span').textContent='Wybierz zdjęcie';renderGallery();renderDashboard()};reader.readAsDataURL(file)});

renderDashboard();renderTasks();renderCalendar();renderGallery();
