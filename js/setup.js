'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var wizardWrap = setup.querySelector('.wizard');
var wizardCoat = wizardWrap.querySelector('.wizard-coat');
var wizardEyes = wizardWrap.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');

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
* @param {object} obj объект мага, сгенерированного `getWizard`
* @return {object} DOM Node мага
*/
function createWizardNode(obj) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = obj.name + ' ' + obj.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = obj.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = obj.eyesColor;

  return wizardElement;
}

/**
* Отрисовывает магов
*
* @param {number} quantity количество магов для отрисовки
*/
function renderWizards(quantity) {
  var wizards = getWizards(quantity);
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizardNode(wizards[i]));
  }
  similarListElement.appendChild(fragment);
}

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

// открываем окно настройки персонажа
function openPopup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

// закрываем окно настройки персонажа
function closePopup() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

wizardCoat.addEventListener('click', function () {
  var idx = getRandomNumber(0, COAT_COLORS.length - 1);
  wizardCoat.style.fill = COAT_COLORS[idx];
  setup.querySelector('input[name = "coat-color"]').value = COAT_COLORS[idx];
});

wizardEyes.addEventListener('click', function () {
  var idx = getRandomNumber(0, EYES_COLORS.length - 1);
  wizardEyes.style.fill = EYES_COLORS[idx];
  setup.querySelector('input[name = "eyes-color"]').value = EYES_COLORS[idx];
});

fireball.addEventListener('click', function () {
  var idx = getRandomNumber(0, FIREBALL_COLORS.length - 1);
  fireball.style.backgroundColor = FIREBALL_COLORS[idx];
  fireball.querySelector('input[name = "fireball-color"]').value = FIREBALL_COLORS[idx];
});

renderWizards(4);
