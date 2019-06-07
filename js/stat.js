'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var FONT_GAP = 16;
var TEXT_GAP = 5;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT_MAX = 150;

var CAPTIONS = ['Ура вы победили!', 'Список результатов:'];

// Выбирает максимальное значение
function getMaxElement(arr) {
  return arr.reduce(function (acc, el) {
    acc = el > acc ? el : acc;
    return acc;
  });
}

// Выбирает случайное значение
function getRandomSaturation(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Рисует облако
function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

// Отрисовывает заголовок
function renderCaption(ctx, arr, color) {
  ctx.fillStyle = color;
  arr.forEach(function (el, i) {
    ctx.fillText(el, CLOUD_X + GAP, CLOUD_Y + GAP + (FONT_GAP + TEXT_GAP) * i);
  });
}

// Отрисовывает гистограмму
function renderHistogram(ctx, paramsX, paramsY) {
  // ширина общая
  var histogramWidth = (BAR_GAP + BAR_WIDTH) * (paramsX.length) - BAR_GAP;
  // отступы по краям
  var histogramGap = (CLOUD_WIDTH - histogramWidth) / 2;

  paramsX.forEach(function (el, i) {
    var barHeight = BAR_HEIGHT_MAX * paramsY[i] / getMaxElement(paramsY);
    var histogramCloudX = CLOUD_X + histogramGap + (BAR_WIDTH + BAR_GAP) * i;
    var histogramCloudY = CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - TEXT_GAP - barHeight;

    // цвет колонок
    ctx.fillStyle = el === 'Вы'
      ? 'rgba(255, 0, 0, 1)'
      : 'hsl(240, ' + getRandomSaturation(0, 100) + '%, 25%)';

    // Отрисовывает колонки;
    ctx.fillRect(histogramCloudX, histogramCloudY, BAR_WIDTH, barHeight);

    ctx.fillStyle = '#000';

    // Отрисовывает подписи колонок;
    ctx.fillText(el, histogramCloudX, CLOUD_Y + CLOUD_HEIGHT - GAP);

    // Отрисовывает подписи значений;
    ctx.fillText(Math.round(paramsY[i]), histogramCloudX, histogramCloudY - TEXT_GAP);
  });
}

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP / 2, CLOUD_Y + GAP / 2, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'top';
  renderCaption(ctx, CAPTIONS, '#000');

  ctx.textBaseline = 'alphabetic';
  renderHistogram(ctx, names, times);
};
