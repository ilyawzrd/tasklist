// UI переменные
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Запускаем обработчик
loadEventListeners();

// Функция с обработчиками
function loadEventListeners() {
  // DOM Load 
  document.addEventListener('DOMContentLoaded', getTasks);
  // Добавить задачу
  form.addEventListener('submit', addTask);
  // Убрать задачу
  taskList.addEventListener('click', removeTask);
  // Очистить задачи
  clearBtn.addEventListener('click', clearTasks);
  // Фильтр задач
  filter.addEventListener('keyup', filterTasks);
}

// Получить задачи из LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // Создание Li элемента
    const li = document.createElement('li');
    // Добавляем класс
    li.className = 'collection-item';
    // Создаем текстовой узел и добавляем в Li
    li.appendChild(document.createTextNode(task));
    // Создаем элемент ссылки
    const link = document.createElement('a');
    // Добавляем класс
    link.className = 'delete-item secondary-content';
    // Добавляем иконку
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Добавляем ссылку к Li
    li.appendChild(link);

    // Добавляем Li к Ul
    taskList.appendChild(li);
  });
}

// Добавить задачу
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  // Создание Li элемента
  const li = document.createElement('li');
  // Добавляем класс
  li.className = 'collection-item';
  // Создаем текстовой узел и добавляем в Li
  li.appendChild(document.createTextNode(taskInput.value));
  // Создаем элемент ссылки
  const link = document.createElement('a');
  // Добавляем класс
  link.className = 'delete-item secondary-content';
  // Добавляем иконку
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Добавляем ссылку к Li
  li.appendChild(link);

  // Добавляем Li к Ul
  taskList.appendChild(li);

  // Сохраняем задачу в LS
  storeTaskInLocalStorage(taskInput.value);

  // Очистить строку ввода
  taskInput.value = '';

  e.preventDefault();
}

// Сохраняем задачу
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Убираем задачу
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Убираем задачу из LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Убираем задачу из LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Очистить задачи
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Очистить из LS
  clearTasksFromLocalStorage();
}

// Очистить из LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Отфильтровать задачи
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}