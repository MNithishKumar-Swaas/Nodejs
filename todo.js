const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const path = 'todo.json';
let tasks = [];

// Load tasks from todo.json if it exists
try {
    const data = fs.readFileSync(path, 'utf8');
    tasks = JSON.parse(data);
    console.log('Loaded existing tasks.');
} catch (error) {
    // If the file does not exist or is empty
    console.log('No existing tasks found.');
}

function saveTasks() {
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2), 'utf8');
}

function addTask(task) {
    tasks.push({ task, completed: false });
    saveTasks();
    console.log(`Task "${task}" added.`);
    promptTask(); // Continue prompting after adding task
}

function displayTasks() {
    console.log("Today's Activities List:");
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.task} [${task.completed ? 'Completed' : 'Not Completed'}]`);
    });
    promptTask(); // Continue prompting after displaying tasks
}

function markTaskAsCompleted(index) {
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        saveTasks();
        console.log(`Task "${tasks[index].task}" marked as completed.`);
    } else {
        console.log("Invalid task number");
    }
    promptTask(); // Continue prompting after marking task as completed or invalid task number
}

function updateTask(index, newTask) {
    if (index >= 0 && index < tasks.length) {
        tasks[index].task = newTask;
        saveTasks();
        console.log(`Task updated to "${newTask}".`);
    } else {
        console.log("Invalid task number");
    }
    promptTask(); // Continue prompting after updating task or invalid task number
}

function deleteTask(index) {
    if (index >= 0 && index < tasks.length) {
        const deletedTask = tasks[index].task;
        tasks.splice(index, 1);
        saveTasks();
        console.log(`Task "${deletedTask}" deleted.`);
    } else {
        console.log("Invalid task number");
    }
    promptTask(); // Continue prompting after deleting task or invalid task number
}

function promptTask() {
    rl.question('Enter a command (add, complete, update, delete, view, exit): ', (command) => {
        switch (command) {
            case 'exit':
                rl.close();
                break;

            case 'add':
                rl.question('Enter a task: ', (task) => {
                    addTask(task);
                });
                break;

            case 'complete':
                rl.question('Enter task number to mark as completed: ', (num) => {
                    const index = parseInt(num) - 1;
                    markTaskAsCompleted(index);
                });
                break;

            case 'update':
                rl.question('Enter task number to update: ', (num) => {
                    const index = parseInt(num) - 1;
                    rl.question('Enter new task description: ', (newTask) => {
                        updateTask(index, newTask);
                    });
                });
                break;

            case 'delete':
                rl.question('Enter task number to delete: ', (num) => {
                    const index = parseInt(num) - 1;
                    deleteTask(index);
                });
                break;

            case 'view':
                displayTasks();
                break;

            default:
                console.log('Invalid command');
                promptTask(); // Continue prompting after invalid command
                break;
        }
    });
}

// start the prompt 
promptTask();

// Handle 
rl.on('close', () => {
    console.log('Exiting ToDo list application.');
    process.exit(0);
});
