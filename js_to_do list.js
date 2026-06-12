function createTask(taskText, completed = false) {

    
    let li = document.createElement("li");
    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    
    li.appendChild(checkbox);
    
    let taskSpan = document.createElement("span");
    taskSpan.innerHTML = taskText + " ";
    
    if (completed) {
        taskSpan.style.textDecoration = "line-through";
        taskSpan.style.color = "gray";
    }
    
    li.appendChild(taskSpan);
    
    checkbox.onchange = function () {
    
        if (checkbox.checked) {
            taskSpan.style.textDecoration = "line-through";
            taskSpan.style.color = "gray";
        } else {
            taskSpan.style.textDecoration = "none";
            taskSpan.style.color = "black";
        }
    
        saveTasks();
        updateTaskCount();
    };
    
    let btn = document.createElement("button");
    btn.innerHTML = "Delete";
    
    btn.onclick = function () {
    
        li.remove();
    
        saveTasks();
        updateTaskCount();
    };
    
    li.appendChild(btn);
    
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    
    editBtn.onclick = function () {
    
        let newText = prompt(
            "Edit task:",
            taskSpan.textContent.trim()
        );
    
        if (newText !== null && newText.trim() !== "") {
    
            taskSpan.textContent = newText + " ";
    
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
    
        let checkbox =
            item.querySelector('input[type="checkbox"]');
    
        let taskSpan =
            item.querySelector("span");
    
        tasks.push({
            text: taskSpan.textContent.trim(),
            completed: checkbox.checked
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
        
            let checkbox =
                item.querySelector('input[type="checkbox"]');
        
            if (checkbox.checked) {
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

