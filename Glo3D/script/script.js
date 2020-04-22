window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    // Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
            
        // day = Math.floor(timeRemaining / 60 / 60 /24)

         function getTimeRemaining(){
           let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow)/1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining/60) % 60),
                hours = Math.floor(timeRemaining /60 /60);

            return{ timeRemaining, hours, minutes,seconds };
         } 
         
         function addZero(num) {
            if (num >= 0 && num <= 9) {
                return '0' + num;
            } else {
                return num;
            }
        };
         
         function updateClock(){
            let timer = getTimeRemaining();
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);
         }
         updateClock();
    
        let timer = getTimeRemaining();
        let idInterval = setInterval(updateClock, 1000);
              
        if (timer.timeRemaining <0){
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
            clearInterval(idInterval)
           
         } 
    };

    countTimer('24 april 2020');
    
    













});
