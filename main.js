var textInput = document.getElementById('text-input');
var minutesInput = document.getElementById('minutes-input');
var secondsInput = document.getElementById('seconds-input');
var studyButton = document.getElementById('study');
var meditateButton = document.getElementById('meditate');
var exerciseButton = document.getElementById('exercise');
var boxArray = [studyButton, meditateButton, exerciseButton];
var startActBtn = document.getElementById('start-act-btn');
var activeBtn = document.querySelector('.active');
var warningPopUp = document.getElementById('warning-pop-up');
var timerPage = document.getElementById('create-new-activity');
var circleColor = null;
var minutesHolder = document.getElementById('minutes');
var secondsHolder = document.getElementById('seconds');

minutesInput.addEventListener('keyup', onlyNumbersCheck);
secondsInput.addEventListener('keyup', onlyNumbersCheck);
document.addEventListener('click', handleClick);

function handleClick(event) {
  if (event.target.classList.contains('study')) {
    changeColors(event);
    circleColor = 'green';
  } else if (event.target.classList.contains('meditate')) {
    changeColors(event);
    circleColor = 'purple';
  } else if (event.target.classList.contains('exercise')) {
    changeColors(event);
    circleColor = 'pink';
  } else if (event.target.classList.contains('start-act-btn')) {
    checkInputFields(event);
  } else if (event.target.classList.contains('timer-circle')) {
    startTimerCountDown(event);
  }
}

function changeColors(event) {
  var clickedId = event.target.id;
  if(event.target.classList.contains('active')) {
    event.target.classList.remove('active');
    event.target.firstElementChild.src = `./assets/${clickedId}.svg`;
  } else {
    event.target.classList.add('active');
    event.target.firstElementChild.src = `./assets/${clickedId}-active.svg`;
  }
  removeActiveState(clickedId);
}

function removeActiveState(clickedId) {
  for (var i = 0; i < boxArray.length; i++) {
    if (boxArray[i].id !== clickedId) {
      boxArray[i].classList.remove('active');
      boxArray[i].firstElementChild.src = `./assets/${boxArray[i].id}.svg`;
    }
  }
}

function onlyNumbersCheck(event) {
  var replaceMinValue = minutesInput.value.replace('e', '');
  var replaceSecValue = secondsInput.value.replace('e', '');
  minutesInput.value = replaceMinValue;
  secondsInput.value = replaceSecValue;
}

function checkInputFields(e) {
  e.preventDefault();
  var totalTime = parseInt((minutesInput.value * 60) + secondsInput.value);
  var areBtnsClicked = checkCategoryBtns();
  if (!minutesInput.value || !secondsInput.value || !textInput.value || !areBtnsClicked || !totalTime){
    warningPopUp.innerHTML = `<img src="./assets/warning.svg" class="warning-img" alt="warning img">
    <p class="warning">Please fill out all information!</p>`;
  } else {
    generateTimerPage(totalTime);
  }
}

function checkCategoryBtns() {
  if (studyButton.classList.contains('active') || meditateButton.classList.contains('active') || exerciseButton.classList.contains('active')) {
    return true;
  } else {
    return false;
  }
}

function generateTimerPage(totalTime) {
  var secondsHolder = totalTime % 60;
  timerPage.innerHTML = `<p class="user-activity" id="user-activity">${textInput.value}</p>
  <p class="timer" id="timer"><span id="minutes">${minutesInput.value}:</span><span id="seconds">${secondsHolder > 9 ? secondsHolder : "0" + secondsHolder % 60}</span></p>
    <div class="timer-circle-holder" id="timer-circle-holder">
      <div class="timer-circle" id="timer-circle" role="button">
        <p class="start-complete" id="start-complete">start</p>
      </div>
    </div>`
  changeCircleColor();
}

function changeCircleColor() {
  var timerCircle = document.getElementById('timer-circle');
  if (circleColor === 'green') {
    timerCircle.classList.add('green-circle');
  } else if (circleColor === 'purple') {
    timerCircle.classList.add('purple-circle');
  } else if (circleColor === 'pink') {
    timerCircle.classList.add('pink-circle');
  }
}

function startTimerCountDown() {
  var totalTime = (parseInt(minutesInput.value) * 60) + parseInt(secondsInput.value);
  var secondsHolder = parseInt(totalTime % 60 > 9 ? totalTime % 60 : "0" + totalTime % 60);
  var minutesHolder = (totalTime - (totalTime % 60)) / 60;
  var timer = setInterval(function() {
    console.log(minutesHolder)
    timerPage.innerHTML = `<p class="user-activity" id="user-activity">${textInput.value}</p>
    <p class="timer" id="timer"><span id="minutes">${(totalTime - (totalTime % 60)) / 60}:</span><span id="seconds">${totalTime % 60 > 9 ? totalTime % 60 : "0" + totalTime % 60}</span></p>
    <div class="timer-circle-holder" id="timer-circle-holder">
      <div class="timer-circle" id="timer-circle" role="button">
        <p class="start-complete" id="start-complete">start</p>
      </div>
    </div>`
    totalTime--;
    if (totalTime < 0) {
      alert("congratulations");
      clearInterval(timer);
      return;
    }
  }, 1000);
}
