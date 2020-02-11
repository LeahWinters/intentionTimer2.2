var textInput = document.getElementById('text-input');
var minutesInput = document.getElementById('minutes-input');
var secondsInput = document.getElementById('seconds-input');
var studyButton = document.getElementById('study');
var meditateButton = document.getElementById('meditate');
var exerciseButton = document.getElementById('exercise');
var boxArray = [studyButton, meditateButton, exerciseButton];
var startActBtn = document.getElementById('start-act-btn');
var currentActivityTitle = document.getElementById('new-activity');
var activeBtn = document.querySelector('.active');
var warningPopUp = document.getElementById('warning-pop-up');
var timerPage = document.getElementById('create-new-activity');
var circleColor;
var minutesHolder = document.getElementById('minutes');
var secondsHolder = document.getElementById('seconds');
var activityColor;
var categoryName;

minutesInput.addEventListener('keyup', onlyNumbersCheck);
secondsInput.addEventListener('keyup', onlyNumbersCheck);
document.addEventListener('click', handleClick);

function handleClick(event) {
  if (event.target.classList.contains('study')) {
    changeColors(event);
    circleColor = 'green';
    categoryName = 'Study';
  } else if (event.target.classList.contains('meditate')) {
    changeColors(event);
    circleColor = 'purple';
    categoryName = 'Meditate';
  } else if (event.target.classList.contains('exercise')) {
    changeColors(event);
    circleColor = 'pink';
    categoryName = 'Exercise';
  } else if (event.target.classList.contains('start-act-btn')) {
    checkInputFields(event);
  } else if (event.target.classList.contains('timer-circle')) {
    startTimerCountDown(event);
  } else if (event.target.classList.contains('log-act-btn')) {
    logActivity(event);
  } else if (event.target.classList.contains('create-new-act')) {
    bringUserToHomePage(event);
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
    </div>
    <div id="log-btn-holder" class="log-btn-holder">
    </div>`;
  currentActivityTitle.innerHTML = 'Current Activity';
  console.log(document.getElementById('timer-circle').classList);
  changeCircleColor();
}

function changeCircleColor() {
  var timerCircle = document.getElementById('timer-circle');
  if (circleColor === 'green') {
    timerCircle.classList.add('green-circle');
    activityColor = 'green-border';
  } else if (circleColor === 'purple') {
    timerCircle.classList.add('purple-circle');
    activityColor = 'purple-border';
  } else if (circleColor === 'pink') {
    timerCircle.classList.add('pink-circle');
    activityColor = 'pink-border';
  }
}

function startTimerCountDown() {
  var totalTime = (parseInt(minutesInput.value) * 60) + parseInt(secondsInput.value);
  var secondsHolder = parseInt(totalTime % 60 > 9 ? totalTime % 60 : "0" + totalTime % 60);
  var minutesHolder = (totalTime - (totalTime % 60)) / 60;
  var timer = setInterval(function() {
    timerPage.innerHTML = `<p class="user-activity" id="user-activity">${textInput.value}</p>
    <p class="timer" id="timer"><span id="minutes">${(totalTime - (totalTime % 60)) / 60}:</span><span id="seconds">${totalTime % 60 > 9 ? totalTime % 60 : "0" + totalTime % 60}</span></p>
    <div class="timer-circle-holder" id="timer-circle-holder">
      <div class="timer-circle" id="timer-circle" role="button">
        <p class="start-complete" id="start-complete">start</p>
      </div>
    </div>
    <div id="log-btn-holder" class="log-btn-holder">
    </div>`;
    changeCircleColor();
    totalTime--;
    if (totalTime < 0) {
      clearInterval(timer);
      finishActivityAlert();
      return;
    }
  }, 1000);
}

function finishActivityAlert() {
  var completeMessage = document.getElementById('start-complete');
  completeMessage.innerText = 'complete!';
  var logActivityBtn = document.getElementById('log-btn-holder');
  logActivityBtn.innerHTML = `<button class="log-act-btn" id="log-act-btn">
    log activity
  </button>`;
}

function logActivity() {
  timerPage.innerHTML = `<button class="create-new-act" id="create-new-act">create new activity</button>`;
  currentActivityTitle.innerHTML = 'Completed Activity';
  savePastActivity();
}

function savePastActivity() {
  var totalTime = (parseInt(minutesInput.value) * 60) + parseInt(secondsInput.value);
  var pastActivitySection = document.getElementById('past-act-section');
  pastActivitySection.innerHTML = `<h2 class="past-activities">Past Activities</h2>
  <section class="past-act-cards-holder">
    <div class="logged-act-card" id=${activityColor}>
      <p class="category-name">${categoryName}</p>
      <p class="logged-time"><span class="logged-min">${(totalTime - (totalTime % 60)) / 60} minutes </span><span class="logged-sec">${totalTime % 60 > 9 ? totalTime % 60 : "0" + totalTime % 60} seconds</span></p>
    </div>
    <p class="activity-name">${textInput.value}</p>
  </section>`;
  console.log(activityColor);
}

function bringUserToHomePage() {
  var backToHomePage = document.getElementById('home-page');
  backToHomePage.innerHTML = `<h2 class="new-activity" id="new-activity">New Activity</h2>
  <section class="create-new-activity card-shadow" id="create-new-activity">
    <p>Select a category:</p>
    <section class="category-btn">
      <button id="study" class="study" type="button">
        <img class="study-img" src="./assets/study.svg" alt="study-img">
        <p class="labels study-label">Study</p>
      </button>
      <button id="meditate" class="meditate" type="button">
        <img class="meditate-img" src="./assets/meditate.svg" alt="meditate-img">
        <p class="labels meditate-label">Meditate</p>
      </button>
      <button id="exercise" class="exercise" type="button">
        <img class="exercise-img" src="./assets/exercise.svg" alt="exercise-img">
        <p class="labels exercise-label">Exercise</p>
      </button>
    </section>
    <p class="what-to-accomplish">What would you like to accomplish during this time?</p>
    <input id="text-input" type="text" class="accomplish-input">
    <div class="all-time-input">
      <div class="time-input minutes">
        <p class="time-name">Minutes</p>
        <input id="minutes-input" class="input-time" type="number" name="minutes" min=0 value="">
      </div>
      <div class="time-input seconds">
        <p class="time-name">Seconds</p>
        <input id="seconds-input" class="input-time" type="number" name="seconds" min=0 value="">
      </div>
    </div>
    <div class="warning-pop-up" id="warning-pop-up">
    </div>
    <button type="button" id="start-act-btn" class="start-act-btn" name="Start Activity">Start Activity</button>
  </section>`;
}
