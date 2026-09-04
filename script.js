/* ========================================
   TODO APP
======================================== */


/* ========================================
   DOM ELEMENTS
======================================== */

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyState = document.getElementById("empty-state");


/* ========================================
   TASK DATA
======================================== */

let tasks = [];


/* ========================================
   ADD TASK
======================================== */

taskForm.addEventListener("submit", function (event) {

    // Prevent page reload
    event.preventDefault();

    const taskText = taskInput.value.trim();

    // Don't add empty task
    if (taskText === "") {
        return;
    }

    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add task to array
    tasks.push(task);

    // Clear input
    taskInput.value = "";

    // Update UI
    renderTasks();

    // Put cursor back into input
    taskInput.focus();
});


/* ========================================
   RENDER TASKS
======================================== */

function renderTasks() {

    // Clear current list
    taskList.innerHTML = "";

    // Create each task
    tasks.forEach(function (task) {

        const taskItem = document.createElement("li");

        taskItem.className = "task-item";

        // Add completed class
        if (task.completed) {
            taskItem.classList.add("completed");
        }

        taskItem.innerHTML = `
            <input
                type="checkbox"
                class="task-checkbox"
                ${task.completed ? "checked" : ""}
                aria-label="Mark task as completed"
            >

            <span class="task-text">
                ${task.text}
            </span>

            <div class="task-item-actions">

                <button
                    type="button"
                    class="task-action-btn delete"
                    aria-label="Delete task"
                    title="Delete task"
                >
                    🗑
                </button>

            </div>
        `;


        /* ========================================
           COMPLETE TASK
        ======================================== */

        const checkbox =
            taskItem.querySelector(".task-checkbox");

        checkbox.addEventListener("change", function () {

            task.completed = checkbox.checked;

            renderTasks();
        });


        /* ========================================
           DELETE TASK
        ======================================== */

        const deleteButton =
            taskItem.querySelector(".delete");

        deleteButton.addEventListener("click", function () {

            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            renderTasks();
        });


        // Add task to list
        taskList.appendChild(taskItem);
    });


    // Update counter
    updateTaskCount();


    // Show / hide empty state
    updateEmptyState();
}


/* ========================================
   TASK COUNTER
======================================== */

function updateTaskCount() {

    const totalTasks = tasks.length;

    if (totalTasks === 0) {
        taskCount.textContent = "0 tasks";
    } else if (totalTasks === 1) {
        taskCount.textContent = "1 task";
    } else {
        taskCount.textContent = `${totalTasks} tasks`;
    }
}


/* ========================================
   EMPTY STATE
======================================== */

function updateEmptyState() {

    if (tasks.length === 0) {

        emptyState.style.display = "flex";

    } else {

        emptyState.style.display = "none";
    }
}


/* ========================================
   INITIAL RENDER
======================================== */

renderTasks();