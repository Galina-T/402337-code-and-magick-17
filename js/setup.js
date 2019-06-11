'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

/**
* Возвращает целое случайное число в диапазоне [min; max]
*
* @param {number} min минимальное значение
* @param {number} max максимальное значение
* @return {number} случайное число.
*/
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
* Генерирует объект, описывающий мага
*
* @return {object} обьект, описывающий мага.
*/
function getWizard() {
  var wizard = {};
  wizard.name = WIZARD_NAMES[getRandomNumber(0, WIZARD_NAMES.length - 1)];
  wizard.surname = WIZARD_SURNAMES[getRandomNumber(0, WIZARD_SURNAMES.length - 1)];
  wizard.coatColor = COAT_COLORS[getRandomNumber(0, COAT_COLORS.length - 1)];
  wizard.eyesColor = EYES_COLORS[getRandomNumber(0, EYES_COLORS.length - 1)];
  return wizard;
}

/**
* Генерирует массив нескольких магов
*
* @param {number} quantity количество магов для генерации
* @return {object} массив из n сгенерированных объектов, описывающих магов.
*/
function getWizards(quantity) {
  var arr = [];
  for (var i = 0; i < quantity; i++) {
    arr.push(getWizard());
  }
  return arr;
}

/**
* Подготавливает DOM Node объект мага
*
* @param {object} wizard объект мага, сгенерированного `getWizard`
* @return {object} DOM Node мага
*/
function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

/**
* Отрисовывает магов
*
* @param {number} quantity количество магов для отрисовки
*/
function showWizards(quantity) {
  var wizards = getWizards(quantity);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
}

/**
* Удаляет класс у DOM элемента
*
* @param {object} root родительский DOM элемент
* @param {string} el селектор элемента, у которого удаляется класс
* @param {string} className имя класса, который необходимо удалить
*/
function setup(root, el, className) {
  root.querySelector(el).classList.remove(className);
}

setup(document, '.setup', 'hidden');
showWizards(4);
setup(userDialog, '.setup-similar', 'hidden');
