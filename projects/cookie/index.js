/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('input', function () {
  updateFilter();
});

addButton.addEventListener('click', () => {
  const date = new Date(Date.now() + 86400e3).toUTCString();
  if (!addNameInput.value || !addValueInput.value) {
    return false;
  } else if (getCookie(addNameInput.value)) {
    console.log(getCookie(addNameInput.value));
    if (!isMatch(addValueInput.value)) {
      deleteCookieTable(addNameInput.value);

      updateFilter();
    } else {
      deleteCookieTable(addNameInput.value);
      getTrCookie(addNameInput.value, addValueInput.value);
      updateFilter();
    }

    document.cookie = `${addNameInput.value}=${addValueInput.value}; expires=${date}`;
    updateFilter();

    addNameInput.value = '';
    addValueInput.value = '';
  } else {
    getTrCookie(addNameInput.value, addValueInput.value);
    updateFilter();
    document.cookie = `${addNameInput.value}=${addValueInput.value}; expires=${date}`;

    addNameInput.value = '';
    addValueInput.value = '';
  }
});

function isMatch(value) {
  return value.toLowerCase().includes(filterNameInput.value.toLowerCase());
}

function updateFilter() {
  let td, i, x, cell;
  const filter = filterNameInput.value.toLowerCase();
  const tr = listTable.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++) {
    tr[i].style.display = 'none';

    td = tr[i].getElementsByTagName('td');
    for (x = 0; x < td.length; x++) {
      cell = tr[i].getElementsByTagName('td')[x];
      if (cell) {
        if (cell.textContent.toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
          break;
        }
      }
    }
  }
}

function printCookie() {
  const objCookies = document.cookie.split('; ').reduce((acc, curr) => {
    const [name, value] = curr.split('=');
    acc[name] = value;
    return acc;
  }, {});
  console.log(objCookies);
  if (document.cookie) {
    for (const cookie in objCookies) {
      getTrCookie(cookie, objCookies[cookie]);
    }
  }
}

function getCookie(name) {
  let end;
  const dc = document.cookie;
  const prefix = name + '=';
  let begin = dc.indexOf('; ' + prefix);
  if (begin === -1) {
    begin = dc.indexOf(prefix);
    if (begin !== 0) return null;
  } else {
    begin += 2;
    end = document.cookie.indexOf(';', begin);
    if (end === -1) {
      end = dc.length;
    }
  }

  return decodeURI(dc.substring(begin + prefix.length, end));
}
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}

function deleteCookieTable(name) {
  for (const tr of listTable.children) {
    if (tr.firstElementChild.textContent === name) tr.remove();
  }
}

// function getTd(name) {
//   const allTd = listTable.querySelectorAll('td');
//   for (let td of allTd) {
//     if (td.textContent === name) {
//       return td.nextElementSibling;
//     }
//   }
// }

function getTrCookie(cookieName, cookieValue) {
  const tableRow = document.createElement('tr');
  const tableName = document.createElement('td');
  const tableValue = document.createElement('td');
  const deleteBtn = document.createElement('button');

  tableName.textContent = cookieName;
  tableValue.textContent = cookieValue;
  deleteBtn.textContent = 'DELETE';
  tableRow.appendChild(tableName);
  tableRow.appendChild(tableValue);
  tableRow.appendChild(deleteBtn);
  deleteBtn.addEventListener('click', () => {
    deleteCookieTable(cookieName);
    deleteCookie(cookieName);
  });
  return listTable.appendChild(tableRow);
}

printCookie();

listTable.addEventListener('click', (e) => {});
