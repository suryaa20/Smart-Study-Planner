function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

function addSubject() {
    subjects.push({
        name: subName.value,
        priority: subPriority.value
    });
    localStorage.setItem("subjects", JSON.stringify(subjects));
    displaySubjects();
}

function displaySubjects() {
    subjectList.innerHTML = "";
    subjects.forEach((s, i) => {
        subjectList.innerHTML += `<li>${s.name} (${s.priority})
        <button onclick="subjects.splice(${i},1);save()">❌</button></li>`;
    });
    updateDashboard();
}

function addTask() {
    tasks.push({
        name: taskName.value,
        type: taskType.value,
        date: taskDate.value,
        done: false
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((t, i) => {
        taskList.innerHTML += `<li>${t.name} - ${t.date}</li>`;
    });
    updateDashboard();
}

function addSchedule() {
    if (schedules.some(s => s.day === day.value && s.time === time.value)) {
        alert("Time conflict!");
        return;
    }
    schedules.push({
        day: day.value,
        time: time.value,
        subject: scheduleSubject.value
    });
    localStorage.setItem("schedules", JSON.stringify(schedules));
    displaySchedules();
}

function displaySchedules() {
    scheduleList.innerHTML = "";
    schedules.forEach(s => {
        scheduleList.innerHTML += `<li>${s.day} ${s.time} - ${s.subject}</li>`;
    });
    updateDashboard();
}

function updateDashboard() {
    totalSubjects.innerText = subjects.length;
    totalTasks.innerText = tasks.length;
    todaySchedule.innerText = schedules.length;
    pSubjects.innerText = subjects.length;
    pTasks.innerText = tasks.filter(t => t.done).length;
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

function resetData() {
    localStorage.clear();
    location.reload();
}

function exportData() {
    const data = { subjects, tasks, schedules };
    alert(JSON.stringify(data, null, 2));
}

function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

displaySubjects();
displayTasks();
displaySchedules();
updateDashboard();