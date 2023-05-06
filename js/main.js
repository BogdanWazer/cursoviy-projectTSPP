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

  // Перевіряємо чи є інші задачі в списку

  if (tasksList.children.length > 1) {
    emptyList.classList.add('none'); // назначаємо display:none для "Список справ порожній"
    // Повертаємо HTML колекцію із тегів li
  }
}

function deleteTask(event) {
  if (event.target.dataset.action === 'delete') {
    const parentNode = event.target.closest('.list-group-item');
    parentNode.remove();
  }
}

function doneTask(event) {
  if (event.target.dataset.action === 'done') {
    console.log('done')
  }  
}
