// Importing necessary modules
import inquirer from 'inquirer';

// Todo item structure
interface TodoItem {
    task: string;
}

// Array to store todo items
let todos: TodoItem[] = [];

// Function to prompt user for task addition
async function addTodo() {
    const { task } = await inquirer.prompt({
        type: 'input',
        name: 'task',
        message: 'Enter your task:',
    });
    todos.push({ task });
    console.log('Task added successfully!');
    mainMenu();
}

// Function to display the list of todos
function listTodos() {
    console.log('Todo List:');
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo.task}`);
    });
    mainMenu();
}

// Function to prompt user for task removal
async function removeTodo() {
    const { index } = await inquirer.prompt({
        type: 'number',
        name: 'index',
        message: 'Enter the index of the task to remove:',
    });
    if (index >= 1 && index <= todos.length) {
        todos.splice(index - 1, 1);
        console.log('Task removed successfully!');
    } else {
        console.log('Invalid index!');
    }
    mainMenu();
}

// Main menu function
function mainMenu() {
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add Todo', 'List Todos', 'Remove Todo', 'Exit'],
        })
        .then(({ action }) => {
            switch (action) {
                case 'Add Todo':
                    addTodo();
                    break;
                case 'List Todos':
                    listTodos();
                    break;
                case 'Remove Todo':
                    removeTodo();
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    break;
                default:
                    console.log('Invalid option');
                    mainMenu();
            }
        });
}

// Starting the application
console.log('Welcome to Todo App!');
mainMenu();
