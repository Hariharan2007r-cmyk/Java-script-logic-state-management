let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {

    taskList.innerHTML = "";

    let filtered = tasks.filter(task => {

        if (filter === "active")
            return !task.completed;

        if (filter === "completed")
            return task.completed;

        return true;
    });

    filtered.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed)
            li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });

    saveTasks();
}

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    renderTasks();
});

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    renderTasks();
}

function deleteTask(index) {

    tasks.splice(index,1);

    renderTasks();
}

function editTask(index) {

    const newTask = prompt("Edit Task", tasks[index].text);

    if(newTask){

        tasks[index].text = newTask;

        renderTasks();
    }
}

document.querySelectorAll(".filter").forEach(btn => {

    btn.addEventListener("click", () => {

        renderTasks(btn.dataset.filter);

    });

});

renderTasks();
