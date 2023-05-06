const form = document.querySelector('#form'); // знаходимо форму
const taskInput = document.querySelector('#taskInput'); // знаходимо Task Input
const tasksList = document.querySelector('#tasksList');

form.addEventListener('submit', function (event) {
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

  tasksList.insertAdjacentHTML('beforeend', taskHTML);
});
