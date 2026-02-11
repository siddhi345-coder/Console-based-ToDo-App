const prompt = require("prompt-sync")({ sigint: true });


class Task {
    constructor(id, description, priority) {
        this.id = id;
        this.description = description;
        this.priority = priority;
        this.completed = false;
    }

    display() {
        return 
        `[${this.completed ? "Task Completed" : "Pending"}] | 
        ID: ${this.id} | 
        Description: ${this.description} | 
        Priority: ${this.priority}`;
    }

    update({ description, priority }) {
        if (description) this.description = description;
        if (priority) this.priority = priority;
    }
}


let tasks = [];


function addTask(description, priority) {
    let id = tasks.length + 1;
    let task = new Task(id, description, priority);
    tasks.push(task);
    console.log(`Task "${description}" added successfully!\n`);
}

function listTasks() {
    if (tasks.length === 0) {
        console.log("No tasks found.\n");
        return;
    }
    console.log("------ Todo List ------");
    tasks.forEach(task => console.log(task.display()));
    console.log("-----------------------\n");
}

function removeTask(id) {
    let index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        console.log(`Task with ID ${id} not found.\n`);
        return;
    }
    let removed = tasks.splice(index, 1);
    console.log(`Task "${removed[0].description}" removed successfully!\n`);
}

function updateTask(id, description, priority) {
    let task = tasks.find(t => t.id === id);
    if (!task) {
        console.log(`Task with ID ${id} not found.\n`);
        return;
    }
    task.update({ description, priority });
    console.log(`Task ID ${id} updated successfully.\n`);
}

function menu() {
    while (true) {
        console.log("------ Todo List Menu ------");
        console.log("1. Add Task");
        console.log("2. List Tasks");
        console.log("3. Remove Task");
        console.log("4. Update Task");
        console.log("5. Exit");
        console.log("----------------------------");

        let choice = prompt("Choose an option (1-5): ");

        switch (choice) {
            case "1":
                let desc = prompt("Enter task description: ");
                let prio = prompt("Enter task priority (Low/Medium/High): ");
                addTask(desc, prio);
                break;

            case "2":
                listTasks();
                break;

            case "3":
                let removeId = parseInt(prompt("Enter task ID to remove: "));
                removeTask(removeId);
                break;

            case "4":
                let updateId = parseInt(prompt("Enter task ID to update: "));

                let newDesc = prompt("Enter new description (leave empty to skip): ");

                let newPrio = prompt("Enter new priority (leave empty to skip): ");

                updateTask(updateId, newDesc || undefined, newPrio || undefined);
                
                break;

            case "5":
                console.log("Exiting... Goodbye!");
                return;

            default:
                console.log("Invalid option! Please try again.\n");
        }
    }
}


menu();
