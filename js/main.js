const form = document.querySelector('#form'); // знаходимо форму
const taskInput = document.querySelector('#taskInput'); // знаходимо Task Input

form.addEventListener('submit', function (event) { // за допомогою цього, можемо для кнопки "Додати" відіграти якусь дію
  event.preventDefault();
});
