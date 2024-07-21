const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [];

function addTask(task) {
    tasks.push({ task, completed: false });
}

function displayTasks() {
    console.log("Today Activities List:");
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.task} [${task.completed ? 'Completed' : 'Not Completed'}]`);
    });
}

function markTaskAsCompleted(index) {
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        console.log(`Task "${tasks[index].task}" marked as completed.`);
    } else {
        console.log("Invalid task number");
    }
}

function updateTask(index, newTask) {
    if (index >= 0 && index < tasks.length) {
        console.log(`Task "${tasks[index].task}" updated to "${newTask}".`);
        tasks[index].task = newTask;
    } else {
        console.log("Invalid task number");
    }
}

function deleteTask(index) {
    if (index >= 0 && index < tasks.length) {
        console.log(`Task "${tasks[index].task}" deleted.`);
        tasks.splice(index, 1);
    } else {
        console.log("Invalid task number");
    }
}

function promptTask() {
    rl.question('Enter a command (add, complete, update, delete, view, exit): ', (command) => {
        if (command === 'exit') {
            rl.close();
            return;
        }

        switch (command) {
            case 'add':
                rl.question('Enter a task: ', (task) => {
                    addTask(task);
                    promptTask();
                });
                break;

            case 'complete':
                rl.question('Enter task number to mark as completed: ', (num) => {
                    const index = parseInt(num) - 1;
                    if (index >= 0 && index < tasks.length) {
                        markTaskAsCompleted(index);
                    } else {
                        console.log("Invalid task number");
                    }
                    promptTask();
                });
                break;

            case 'update':
                rl.question('Enter task number to update: ', (num) => {
                    const index = parseInt(num) - 1;
                    if (index >= 0 && index < tasks.length) {
                        rl.question('Enter new task description: ', (newTask) => {
                            updateTask(index, newTask);
                            promptTask();
                        });
                    } else {
                        console.log("Invalid task number");
                        promptTask();
                    }
                });
                break;

            case 'delete':
                rl.question('Enter task number to delete: ', (num) => {
                    const index = parseInt(num) - 1;
                    if (index >= 0 && index < tasks.length) {
                        deleteTask(index);
                    } else {
                        console.log("Invalid task number");
                    }
                    promptTask();
                });
                break;

            case 'view':
                displayTasks();
                promptTask();
                break;

            default:
                console.log('Invalid command');
                promptTask();
                break;
        }
    });
}

// Start the task prompt loop
promptTask();
