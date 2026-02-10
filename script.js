function showSection(id) {
    document.querySelectorAll('.section')
        .forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

function addSubject() {
    if (subName.value === "") {
        alert("Enter subject name");
        return;
    }

    subjects.push({
        name: subName.value,
        priority: subPriority.value
    });

    localStorage.setItem("subjects", JSON.stringify(subjects));
    subName.value = "";
    displaySubjects();
}

function displaySubjects() {
    subjectList.innerHTML = "";

    subjects.forEach((s, i) => {
        subjectList.innerHTML += `
            <li>
                ${s.name} (${s.priority})
                <button onclick="deleteSubject(${i})">❌</button>
            </li>`;
    });

    updateDashboard();
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    localStorage.setItem("subjects", JSON.stringify(subjects));
    displaySubjects();
}

function addTask() {
    if (taskName.value === "" || taskDate.value === "") {
        alert("Fill all task details");
        return;
    }

    tasks.push({
        name: taskName.value,
        type: taskType.value,
        date: taskDate.value,
        done: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskName.value = "";
    taskDate.value = "";
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((t, i) => {
        taskList.innerHTML += `
            <li class="${t.done ? 'completed' : ''}">
                <input type="checkbox"
                       ${t.done ? "checked" : ""}
                       onclick="toggleTask(${i})">
                ${t.name} (${t.type}) - ${t.date}
                <button onclick="deleteTask(${i})">❌</button>
            </li>`;
    });

    updateDashboard();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function addSchedule() {
    if (day.value === "" || time.value === "" || scheduleSubject.value === "") {
        alert("Fill all schedule fields");
        return;
    }

    if (schedules.some(s => s.day === day.value && s.time === time.value)) {
        alert("Time conflict!");
        return;
    }

    schedules.push({
        day: day.value,
        time: time.value,
        subject: scheduleSubject.value,
        done: false
    });

    localStorage.setItem("schedules", JSON.stringify(schedules));
    scheduleSubject.value = "";
    displaySchedules();
}

function displaySchedules() {
    scheduleList.innerHTML = "";

    schedules.forEach((s, i) => {
        scheduleList.innerHTML += `
            <li class="${s.done ? 'completed' : ''}">
                <input type="checkbox"
                       ${s.done ? "checked" : ""}
                       onclick="toggleSchedule(${i})">
                ${s.day} ${s.time} - ${s.subject}
                <button onclick="deleteSchedule(${i})">❌</button>
            </li>`;
    });

    updateDashboard();
}

function toggleSchedule(index) {
    schedules[index].done = !schedules[index].done;
    localStorage.setItem("schedules", JSON.stringify(schedules));
    displaySchedules();
}

function deleteSchedule(index) {
    schedules.splice(index, 1);
    localStorage.setItem("schedules", JSON.stringify(schedules));
    displaySchedules();
}

function updateDashboard() {
    totalSubjects.innerText = subjects.length;
    totalTasks.innerText = tasks.length;
    todaySchedule.innerText = schedules.length;

    pSubjects.innerText = subjects.length;

    const completedTasks = tasks.filter(t => t.done).length;
    pTasks.innerText = completedTasks;

    let progress = tasks.length === 0
        ? 0
        : Math.round((completedTasks / tasks.length) * 100);

    progressBar.style.width = progress + "%";
    progressText.innerText = progress + "% Completed";
}

function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

function resetData() {
    if (confirm("Are you sure you want to reset all data?")) {
        localStorage.clear();
        location.reload();
    }
}

function exportData() {
    const data = { subjects, tasks, schedules };
    alert(JSON.stringify(data, null, 2));
}


displaySubjects();
displayTasks();
displaySchedules();
updateDashboard();
