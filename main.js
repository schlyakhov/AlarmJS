//Переменные
const clockHours = document.querySelector(".clock_hours");
const clockMinutes = document.querySelector(".clock_minutes");
const clockSeconds = document.querySelector(".clock_seconds");
const alarmHours = document.getElementById("alarm_hours");
const alarmMinutes = document.getElementById("alarm_minutes");
const alarmSeconds = document.getElementById("alarm_seconds");
const alarmButton = document.querySelector(".set_alarm");
const alarmInfo = document.querySelector(".alarm_info");
const alarmTextEl = document.querySelector(".alarm_text");
const alarmCancel = document.querySelector(".cancel_alarm");
const alarmSound = new Audio("alarm_sound.mp3");
let alarmIntervalId;
//Функция для добавления нуля перед цифрой
function addZero(num) {
  return num < 10 ? "0" + num : num; // вместо конструкции if,else
}
//Функция показа поставленного будильника и отключения кнопки "поставить таймер"
function showAlarm() {
  const alarmText = `Будильник установлен на ${alarmHours.value} ч ${alarmMinutes.value} мин ${alarmSeconds.value} сек`;
  alarmTextEl.textContent = alarmText;
  alarmInfo.classList.add("show");
  alarmButton.disabled = true;
}
//Задать будильник
function setAlarm() {
  alarmIntervalId = setInterval(() => {
    const TimeNow = new Date();
    //Сравниваем текущее время с временем, поставленным на будильник
    //Data.get -- возвращает число, а value строку
    const isAlarmTime =
      TimeNow.getHours() === Number(alarmHours.value) &&
      TimeNow.getMinutes() === Number(alarmMinutes.value) &&
      TimeNow.getSeconds() === Number(alarmSeconds.value);
    console.log(isAlarmTime);
    if (isAlarmTime) {
      alarmSound.play();
      clearInterval(alarmIntervalId);
    }
  }, 1000);
}
// Удаляем будильник
function cancelAlarm() {
  alarmSound.pause();
  clearInterval(alarmIntervalId);
}

// Часы
// Задаем setInterval для показа каждой секунды +
setInterval(() => {
  //Константа текущего времени
  const TimeNow = new Date();
  // Задаем спанам значение текущего времени
  clockHours.textContent = addZero(TimeNow.getHours());
  clockMinutes.textContent = addZero(TimeNow.getMinutes());
  clockSeconds.textContent = addZero(TimeNow.getSeconds());
}, 1000);
//Будильник
// Создали функцию для задания опций в select
function createOption(num, el) {
  for (let i = 0; i < num; i++) {
    const OptionElement = document.createElement("option");
    OptionElement.value = addZero(i);
    OptionElement.textContent = addZero(i);
    el.append(OptionElement);
  }
}
//Создаем опции для селекта
createOption(24, alarmHours);
createOption(60, alarmMinutes);
createOption(60, alarmSeconds);

// Слушатель на кнопку "Поставить будильник"
alarmButton.addEventListener("click", () => {
  setAlarm();
  showAlarm();
});
// Слушатель на кнопку "Удалить будильник"
alarmCancel.addEventListener("click", () => {
  alarmInfo.classList.remove("show");
  alarmButton.disabled = false;

  cancelAlarm();
});
