const form = document.querySelector('#form'); // знаходимо форму
const taskInput = document.querySelector('#taskInput'); // знаходимо Task Input
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

//Робота з данними
let tasks = [];

// Парсинг елементів через JSON

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

// Якщо натиснуто - додати задачу
form.addEventListener('submit', addTask);

// якщо клік - Видалити задачу
tasksList.addEventListener('click', deleteTask);

// якщо клік - Задача виконана
tasksList.addEventListener('click', doneTask);

function addTask(event) {
  // за допомогою цього, можемо для кнопки "Додати" відіграти якусь дію
  event.preventDefault();

  // Ми отримаємо назву задачі
  const taskText = taskInput.value;

  // Створюємо обʼєкт, що містить данні про нашу нову задачу
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  //Додавання задачі в NewTask
  tasks.push(newTask);
  //Додавання задачі в LocalStorage
  saveToLocalStorage();

  //Рендеринг завдань перед стартом роботи
  renderTask(newTask);

  // Очищуємо поле для вводу та повертаємо на нього фокус.

  taskInput.value = '';
  taskInput.focus();
  checkEmptyList();
}
// Функціонал кнопки "Видалити"

function deleteTask(event) {
  // Якщо кнопка не натиснута = виходимо із функції
  if (event.target.dataset.action !== 'delete') {
    return;
  }
  const parentNode = event.target.closest('.list-group-item');

  // Визначаємо ID задачі
  const id = Number(parentNode.id);

  // // Знаходимо індекс задачі в масиві
  // const index = tasks.findIndex((task) => task.id === id);

  // // Видаляємо задачу з масиву задач

  // tasks.splice(index, 1);

  tasks = tasks.filter((task) => task.id !== id);

  // Видаляємо задачі з розмітки
  parentNode.remove();

  checkEmptyList();
}

// Функціонал кнопки "Готово"
function doneTask(event) {
  // Якщо кнопка не натиснута = виходимо із функції
  if (event.target.dataset.action !== 'done') return;

  const parentNode = event.target.closest('.list-group-item');

  const id = Number(parentNode.id);

  const task = tasks.find((task) => task.id === id);
  //Змінюємо статус на зворотній
  task.done = !task.done;

  saveToLocalStorage();

  console.log(task);

  const taskTitle = parentNode.querySelector('.task-title');
  taskTitle.classList.toggle('task-title--done');

  checkEmptyList();
}

function checkEmptyList() {
  if (tasks.length === 0) {
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
            <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
            <div class="empty-list__title">Список справ порожній</div>
          </li>`;
    tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
  }

  if (tasks.length > 0) {
    const emptyListEl = document.querySelector('#emptyList');
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

  // Робимо нову розмітку для задачі

  const taskHTML = `<li id="${task.id} "class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
              <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18" />
              </button>
              <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18" />
              </button>
            </div>
          </li>`;

  tasksList.insertAdjacentHTML('afterbegin', taskHTML);
}
