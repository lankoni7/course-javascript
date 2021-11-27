/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

export function createDiv() {
  const div = document.createElement('div');
  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  div.style.width = `${getRandomNum(0, 300)}px`;
  div.style.height = `${getRandomNum(0, 300)}px`;
  div.style.left = `${getRandomNum(0, window.innerWidth)}px`;
  div.style.top = `${getRandomNum(0, window.innerHeight)}px`;
  div.style.backgroundColor = getRandomColor();
  div.classList.add('draggable-div');
  div.draggable = true;
  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
  let offset = [0, 0];
  let isDown = false;
  div.addEventListener('mousedown', function (e) {
    isDown = true;
    offset = [div.offsetLeft - e.clientX, div.offsetTop - e.clientY];
  });
  document.addEventListener('mouseup', function () {
    isDown = false;
  });

  document.addEventListener('mousemove', function (e) {
    e.preventDefault();
    if (isDown) {
      div.style.left = e.clientX + offset[0] + 'px';
      div.style.top = e.clientY + offset[1] + 'px';
    }
  });
});
