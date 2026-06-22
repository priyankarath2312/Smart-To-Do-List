const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">
                <button onclick="toggleTask(${index})">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    taskCount.textContent = tasks.length;
}

function addTask() {

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text:text,
        completed:false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}

function clearTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}

renderTasks();