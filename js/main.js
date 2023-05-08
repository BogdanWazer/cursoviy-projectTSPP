const form = document.querySelector('#form'); // знаходимо форму
const taskInput = document.querySelector('#taskInput'); // знаходимо Task Input
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

//Робота з данними
let tasks = [];

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

  tasks.push(newTask);

  console.log(tasks);

  //Формуємо CSS class
  const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

  // Робимо нову розмітку для задачі

  const taskHTML = `<li id="${newTask.id} "class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${newTask.text}</span>
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

  // Очищуємо поле для вводу та повертаємо на нього фокус.

  taskInput.value = '';
  taskInput.focus();
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

  // Перевіряємо чи є інші задачі в списку

  if (tasksList.children.length > 1) {
    emptyList.classList.add('none');
    // назначаємо display:none для "Список справ порожній"
    // Повертаємо HTML колекцію із тегів li
  }
}

// Функціонал кнопки "Готово"
function doneTask(event) {
  // Якщо кнопка не натиснута = виходимо із функції
  if (event.target.dataset.action !== 'done') return;

  const parentNode = event.target.closest('.list-group-item');
  const taskTitle = parentNode.querySelector('.task-title');
  taskTitle.classList.toggle('task-title--done');
}
