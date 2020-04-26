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

            if (timer.timeRemaining <0){
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                clearInterval(idInterval) 
             } 
         }
         updateClock();
    
        let idInterval = setInterval(updateClock, 1000);
            
    };

    countTimer('29 april 2020');

// Menu
   
   const toggleMenu = () => {

    const body = document.querySelector('body'),
        // btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu');
        // closeBtn = document.querySelector('.close-btn'),
        // menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () =>{
            menu.classList.toggle('active-menu')
        };
        
        body.addEventListener('click', (event) =>{
            let target = event.target;
            
            target = target.closest('.menu')
            
             if (!target){
                 return
             } else handlerMenu();

        })

        menu.addEventListener('click', (event) =>{
            let target = event.target;
            if (target.tagName === 'A') handlerMenu();
        });
    
}

toggleMenu();


//popup

const togglePopUp = () =>{
    const popUp = document.querySelector('.popup'),
        popUpBtn = document.querySelectorAll('.popup-btn'),
        popUpCloseBtn = document.querySelector('.popup-close');

    
    popUp.addEventListener('click', (event)  =>{
        let target = event.target;

        if (target.classList.contains('popup-close')){
            if (screen.width >768) {
                popUp.style.display = `none`;
                popUp.firstElementChild.style.left = '0%'
                count = 0; 
            } else {
                popUp.style.display = `none`;
            }
        };
            target = target.closest('.popup-content'); // при нажатии по таргету и ниже по иеарархии, будет возвращаться блок с классом .popup-content, иначе !!!null
            if (!target) {
                popUp.style.display = 'none';
            } 
            
    })

    let count = 0;
    let animate;
    let popUpAnimate = function(){ 
        animate = requestAnimationFrame(popUpAnimate)          
        count++;  
        if (parseFloat(popUp.firstElementChild.style.left) < +parseFloat('38%')) {
            popUp.firstElementChild.style.left = count*3 + '%'
        } else {
            cancelAnimationFrame(animate)
        }        
    } 
    
    
    popUpBtn.forEach((elem) =>{
        elem.addEventListener('click', () =>{
            popUp.style.display = `block`; 
            if (screen.width >768) {
            popUp.firstElementChild.style.left = '0%';   
            animate = requestAnimationFrame(popUpAnimate);
            }
                 
        })  
    }) 
}

    togglePopUp();

    // табы

    const tabs = () =>{
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) =>{
            for (let i=0; i<tabContent.length; i++){
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        }

        tabHeader.addEventListener('click', (event) =>{
            let target = event.target; // получаем элемент, на который кликнули
                target = target.closest('.service-header-tab'); // метод closest ищет селектор и если находит,то возвращает элемент, если нет - null

                if(target) {
                    tab.forEach((item, i) =>{

                        if (item === target){
                            toggleTabContent(i);   
                        }
                
                    });
                }
                

                // !ОСТАВИЛ ЦИКЛ ДЛЯ ПОНИМАНИЯ
            // while (target !== tabHeader){
            //     console.log(target);

            //     if (target.classList.contains('service-header-tab')){
                    
            //         tab.forEach((item, i) =>{

            //             if (item === target){
            //                 toggleTabContent(i);   
            //             }

            //         });
            //         return;   
            //     }
            //     target = target.parentNode;
            // }
            
        });
    }

    tabs();

    // slider

    const slider = () =>{
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.porfolio-btn'),
            slider = document.querySelector('.portfolio-content');
        
        slide.forEach(() =>{
            let li = document.createElement('li')
            li.classList.add('dot')
            slider.lastElementChild.append(li)
        });   
    
        let dot = document.querySelectorAll('.dot');

        let currentSlide = 0, // текущий слайд
            interval;

        const prevSlide = (elem, index, strClass) =>{
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) =>{
            elem[index].classList.add(strClass);    
        };

        const autoPlaySlide = () =>{
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            
            currentSlide++;

            if (currentSlide >= slide.length){
                currentSlide = 0;
            };
            
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
    
        };

        const startSlide = (time = 3000) =>{
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () =>{
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) =>{
            event.preventDefault();

            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')){ //  проверяем, кликнули ли по одному из элементов с указанным классом
                return;  
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')){
                currentSlide++;
            } else if(target.matches('#arrow-left')){
                currentSlide--;
            } else if(target.matches('.dot')){
                dot.forEach((elem, index) =>{
                    if(elem === target){
                        currentSlide =index;
                    }
                })
            };

            if(currentSlide >= slide.length){
                currentSlide =0;
            }

            if(currentSlide <0){
                currentSlide = slide.length -1
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) =>{
            if(event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')){
                stopSlide()
            }
        });

        slider.addEventListener('mouseout', (event) =>{
            if(event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')){
                startSlide()
            };   
        });

        startSlide(1500)

    };

    slider();

    // Блок "Наша команда"

    const changeImage = () => {

        const teamArea = document.querySelector('.command .row');
        let images = teamArea.querySelectorAll('img');
        
        let sourceImg = [...images].map((elem) => {
            return elem.src;  
        });

        let sourceData = [...images].map((elem) => {
            return elem.dataset.img; 
        });

        const changeImg = (event, arr) => {
            if (event.target.matches('img')) {
                event.target.src = event.target.dataset.img;
            }  
        }

        teamArea.addEventListener('mouseover', changeImg) 
        teamArea.addEventListener('mouseout', (event) => {
            if (event.target.matches('img')) {
                sourceData.forEach((elem, index) => { 
                
                    if(event.target.src.slice(28) === elem) {
                    event.target.src = sourceImg[index]
                };
                
            });
            
            };
        
        })
            

    }

    changeImage();



//  Calculator

    const validate = () => {

        const calc = document.querySelector('.calc-block');

        calc.addEventListener('input', (event) => {

            if (event.target.matches('input')) {
        
                event.target.value = event.target.value.match(/^[0-9]*$/);         
               
            }
            
        })

    };

    validate();


});


