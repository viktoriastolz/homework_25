"use strict";

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const todosWrapper = document.querySelector('.js--todos-wrapper');
  todosWrapper.innerHTML = '';

  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';

    todoItem.innerHTML = `
      <input type="checkbox" ${todo.checked ? 'checked' : ''}>
      <span class="todo-item__description">${todo.text}</span>
      <button class="todo-item__delete">Видалити</button>
    `;

    if (todo.checked) {
      todoItem.classList.add('todo-item--checked');
    }

    todosWrapper.appendChild(todoItem);
  });
}

function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

loadTodos();

document.querySelector('.js--form').addEventListener('submit', function (event) {
  event.preventDefault();

  const input = document.querySelector('.js--form__input');
  const todosWrapper = document.querySelector('.js--todos-wrapper');
  const taskText = input.value.trim();

  if (taskText === '') {
    alert('Task cannot be empty.');
    return;
  }

  const todoItem = document.createElement('li');
  todoItem.className = 'todo-item';

  todoItem.innerHTML = `
    <input type="checkbox">
    <span class="todo-item__description">${taskText}</span>
    <button class="todo-item__delete">Видалити</button>
  `;

  todosWrapper.appendChild(todoItem);

  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push({ text: taskText, checked: false });
  saveTodos(todos);

  input.value = '';
});

document.querySelector('.js--todos-wrapper').addEventListener('click', function (event) {
  const target = event.target;
  const todosWrapper = document.querySelector('.js--todos-wrapper');

  if (target.classList.contains('todo-item__delete')) {
    const todoItem = target.closest('.todo-item');
    const todoText = todoItem.querySelector('.todo-item__description').textContent;

    todoItem.remove();

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo.text !== todoText);
    saveTodos(todos);
  }

  if (target.type === 'checkbox') {
    const todoItem = target.closest('.todo-item');
    todoItem.classList.toggle('todo-item--checked');

    const todoText = todoItem.querySelector('.todo-item__description').textContent;
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.forEach(todo => {
      if (todo.text === todoText) {
        todo.checked = target.checked;
      }
    });

    saveTodos(todos);
  }
});
