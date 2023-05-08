const form = document.querySelector('#form'); // знаходимо форму
const taskInput = document.querySelector('#taskInput'); // знаходимо Task Input
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

//Задача завершена
tasksList.addEventListener('click', doneTask);

function addTask(event) {
  // за допомогою цього, можемо для кнопки "Додати" відіграти якусь дію
  event.preventDefault();

  // Ми отримаємо назву задачі
  const taskText = taskInput.value;

  // Робимо нову розмітку для задачі

  const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${taskText}</span>
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
  if (event.target.dataset.action !== 'delete') return;

  const parentNode = event.target.closest('.list-group-item');
  parentNode.remove();

  // Перевіряємо чи є інші задачі в списку

  if (tasksList.children.length > 1) {
    emptyList.classList.add('none'); // назначаємо display:none для "Список справ порожній"
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
  console.log(taskTitle);
}
