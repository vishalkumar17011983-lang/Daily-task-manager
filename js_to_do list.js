function createTask(taskText, completed = false) {
    let li = document.createElement("li");
    li.innerHTML = taskText + " ";

    if (completed) {
        li.style.textDecoration = "line-through";
    }

    li.onclick = function () {
        if (li.style.textDecoration === "line-through") {
            li.style.textDecoration = "none";
        } else {
            li.style.textDecoration = "line-through";
        }

        saveTasks();
        updateTaskCount();
    };

    let btn = document.createElement("button");
    btn.innerHTML = "Delete";

    btn.onclick = function (event) {
        event.stopPropagation();

        li.remove();

        saveTasks();
        updateTaskCount();
    };

    li.appendChild(btn);

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";

    editBtn.onclick = function (event) {
        event.stopPropagation();

        let newText = prompt(
            "Edit task:",
            li.firstChild.textContent.trim()
        );

        if (newText !== null && newText.trim() !== "") {
            li.firstChild.textContent = newText + " ";
            saveTasks();
        }
    };

    li.appendChild(editBtn);

    document.getElementById("taskList").appendChild(li);

    updateTaskCount();
}

function taskAdd() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") {
        alert("Enter a task");
        return;
    }

    createTask(task);

    saveTasks();

    input.value = "";
}

function saveTasks() {
    let tasks = [];

    let items = document.querySelectorAll("#taskList li");

    items.forEach(function (item) {
        tasks.push({
            text: item.firstChild.textContent.trim(),
            completed:
                item.style.textDecoration === "line-through"
        });
    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function updateTaskCount() {
    let items = document.querySelectorAll("#taskList li");

    let remaining = 0;
    let completed = 0;

    items.forEach(function (item) {
        if (
            item.style.textDecoration === "line-through"
        ) {
            completed++;
        } else {
            remaining++;
        }
    });

    document.getElementById("taskCount").innerHTML = remaining;

    document.getElementById("completedCount").innerHTML = completed;
}

function loadTasks() {
    let tasks =
        JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task) {
        createTask(task.text, task.completed);
    });

    updateTaskCount();
}

const today = new Date();

const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
};

document.getElementById("date").innerText =
    today.toLocaleDateString("en-IN", options);

window.onload = function () {
    loadTasks();
};