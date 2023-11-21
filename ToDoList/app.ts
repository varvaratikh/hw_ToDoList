const todos: { text: string; completed: boolean }[] = JSON.parse(localStorage.getItem('todos')) || [];
const todoList = document.getElementById('todo-list') as HTMLDivElement;

function renderTodoItem(todo: { text: string; completed: boolean }, index: number) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    if (todo.completed) {
        todoItem.classList.add('completed');
    }

    const todoText = document.createElement('span');
    todoText.innerText = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function () {
        todos.splice(index, 1);
        renderTodos();
    });

    const completeButton = document.createElement('button');
    completeButton.innerText = 'Complete';
    completeButton.addEventListener('click', function () {
        todo.completed = !todo.completed;
        renderTodos();
    });

    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);
    todoItem.appendChild(completeButton);

    return todoItem;
}

function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach(function (todo, index) {
        const todoItem = renderTodoItem(todo, index);
        todoList.appendChild(todoItem);
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

document.getElementById('todo-form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const todoInput = document.getElementById('todo-input') as HTMLInputElement;
    const todoText = todoInput.value.trim();

    if (todoText !== '') {
        const newTodo = {
            text: todoText,
            completed: false,
        };

        todos.push(newTodo);
        todoInput.value = '';
    }

    renderTodos();
});

renderTodos();
