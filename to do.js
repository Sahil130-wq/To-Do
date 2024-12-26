const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskList = document.getElementById('taskList');

let tasks = [];

// Function to add a task
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const taskDateValue = taskDate.value;

    if (taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        date: taskDateValue,
        completed: false,
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = '';
    taskDate.value = '';
});

// Function to mark a task as completed
function toggleComplete(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    renderTasks();
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Function to edit a task
function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    const newText = prompt('Edit task:', task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
    }
    renderTasks();
}

// Function to render tasks on the UI
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        taskElement.innerHTML = `
            <span>${task.text}</span> 
            <span>${task.date ? new Date(task.date).toLocaleString() : ''}</span>
            <div>
                <button class="complete" onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskElement);
    });
}
