const currentTime = document.getElementById('CrtTime');

const audio = new Audio('AlarmAudio/alarm.mp3');
audio.loop = true;

let alarmTime = null;
let alarmTimeout = null;

let alrmForm = document.getElementById('setTime');

//creating a array to store alarms
const alarmList = [];
let upcomingAlarmList =document.querySelector('#nxt-alarm-list');

//To play alarmSound
function ring(realTime){
    audio.play();
    alert(`Now time is ${realTime}`);
}

//To show the real time
function updateTime(){
    let today = new Date();
    const hour = formateTime(today.getHours());

    const minute = formateTime(today.getMinutes());

    const second = formateTime(today.getSeconds());

    const realTime = `${hour}:${minute}:${second}`;

    currentTime.innerText = `${hour}:${minute}:${second}`;

    //     check if the alarmList includes the current time , "realTime"
    //     if yes, ring() is called
    if(alarmList.includes(realTime)){
        ring(realTime);
    }
}

// If the number is less than 10 append 0 before it.
function formateTime(time){
    if(time<10 && time.length!=2){
        return '0'+time;
    }
    return time;
}

// function to stop the currently playing alarm
function stpAlarm() {
    audio.pause();
    // if (alarmTimeout) {
    //     clearTimeout(alarmTimeout);
    // }
}


// event to set a new alarm whenever the form is submitted 
alrmForm.addEventListener('submit', event => {

    //to stop default actions
    event.preventDefault(); 

    let h = formateTime(alrmForm.hr.value);
    if (h === '0') {
        h = '00'
    }
    let m = formateTime(alrmForm.min.value);
    if (m === '0') {
        m = '00'
    }
    let s = formateTime(alrmForm.sec.value);
    if (s === '0') {
        s = '00'
    }

    let newAlarm = `${h}:${m}:${s}`;
    
    // add newAlarm to alarmList array
    if(!(newAlarm ===`00:00:00`)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            addNewAlarmToList(newAlarm);
            alrmForm.reset();
        }
        else{
            alert(`Alarm of ${newAlarm} is already set`);
        }
    }
    else{
        alert('Invalid Time');
    }

});

// Adds newAlarm to the upcoming-alarms-list as a new list item 
function addNewAlarmToList(newAlarm){
    const line = 
    `<li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm" onclick = "rmvAlrm(this.value)" value=${newAlarm}><i class="bi bi-trash3"></i></button>       
    </li>`
    upcomingAlarmList.innerHTML += line
};

// removes the alarm from the upcoming-alarms-list when "Delete Alarm" is clicked

upcomingAlarmList.addEventListener('click', e => {
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
});

// removes the alarm from the alarmList array when "Delete Alarm" is clicked
rmvAlrm = (value) => {
    alarmList.splice(alarmList.indexOf(value),1);
}

setInterval(updateTime,1000);