/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */

const arr = [1, 2, 4, 65];

function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}
forEach(arr, (el) => console.log(el));

/*
    Задание 2:
    Напишите аналог встроенного метода map для работы с массивами
    Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
    Пример:
      map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
    */

function map(array, fn) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(fn(array[i], i, array));
  }
  return newArray;
}
map(arr, (el) => el * 2);

/*
    Задание 3:
    Напишите аналог встроенного метода reduce для работы с массивами
    Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
    Пример:
      reduce([1, 2, 3], (all, current) => all + current) // 6
    */
function reduce(array, fn, initial) {
  let i = 0;
  let sum = initial !== undefined ? initial : (i++, array[0]);

  for (; i < array.length; i++) {
    sum = fn(sum, array[i], i, array);
  }
  return sum;
}
reduce(arr, (a, b) => a + b);

/*
    Задание 4:
    Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива
    Пример:
      upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
    */
function upperProps(obj) {
  const array = [];
  for (const key in obj) {
    array.push(key.toUpperCase());
  }
  return array;
}

/*
    Задание 5 *:
    Функция принимает объект и должна вернуть Proxy для этого объекта
    Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
    Пример:
      const obj = createProxy({});
      obj.foo = 2;
      console.log(obj.foo); // 4
    */

function createProxy(obj) {
  const myObjProxy = new Proxy(obj, {
    set: function (target, prop, value) {
      target[prop] = value * value;

      return true;
    },
  });
  return myObjProxy;
}
const obj = createProxy({});
obj.age = 28;

export { forEach, map, reduce, upperProps, createProxy };
