window.addEventListener('DOMContentLoaded', function(){
    'use strict';

// Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            idInterval;
            
        // day = Math.floor(timeRemaining / 60 / 60 /24)

         function getTimeRemaining(){
           let dateStop = new Date(deadline),
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
    
        idInterval = setInterval(updateClock, 1000);
            
    };

    countTimer('10 may 2020');

// Menu

const toggleMenu = () => {

    const body = document.querySelector('body'),
        menu = document.querySelector('menu'),
        menuAnchors = menu.querySelectorAll('ul>li>a'),
        mainBtn = document.querySelector('a[href="#service-block"]');
        
        // Функция плавной прокрутки до якоря с хэшем '#'
        const smoothScroll = (elem) =>{
            elem.addEventListener('click', (event) =>{
                event.preventDefault();  // отмена события при нажатии на якорь
                const anchor = elem.getAttribute('href');
                document.querySelector(anchor).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });  
            })
        };

        menuAnchors.forEach(smoothScroll)
        smoothScroll(mainBtn);
        
        const handlerMenu = () =>{
            menu.classList.toggle('active-menu') // используем свойства, описанные в css
        };

        body.addEventListener('click', (event) =>{
            let target = event.target;

            if(!target.matches('.menu, .close-btn, img, small'))
                return;  
    
            target = target.closest('.menu')

             if (target){
                return handlerMenu();
             } else {
                target = event.target;
        
                if (target.tagName === 'A') 
                return handlerMenu();
            }
            
            target = event.target.closest('.active-menu');

            if (!target) menu.classList.remove('active-menu')
        })
        
        
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

    const calc = (price = 100) => {

        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        function animate({ duration, draw, timing }) {

            let start = performance.now();
    
            requestAnimationFrame(function animate(time) {
    
                let timeFraction = (time - start) / duration;
    
                if (timeFraction > 1) timeFraction = 1;
    
                let progress = timing(timeFraction)
    
                draw(progress);
    
                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
    
            });
        };
             
        const countSum = () => {
            let total = 0,
            countValue = 1,
            dayValue = 1;

            animate({
                // скорость анимации
                duration: 2000,
                // Функция расчёта времени
                timing(timeFraction) {
                    return timeFraction;
                },
                // Функция отрисовки
                draw(progress) {
                    // в ней мы и производим вывод данных
                    totalValue.textContent = Math.floor(progress * total)
        
                }
            });
           
            const typeValue = calcType.options[calcType.selectedIndex].value,
            squareVaue = +calcSquare.value;
            
            if (calcCount.value > 1){
                countValue += (calcCount.value -1) / 10;
            };

            if (calcDay.value && calcDay.value < 5) {
                dayValue *=2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            };
            
            if(typeValue && squareVaue){
                total = price * typeValue * squareVaue * countValue * dayValue;
            };

        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            if (target.matches('.calc-type') || target.matches('.calc-square') 
            || target.matches('.calc-day') || target.matches('.calc-count')) {
                countSum();
                
            };
        
        });

        calcBlock.addEventListener('input', (event) => {

            if (event.target.matches('input')) {
        
                event.target.value = event.target.value.match(/^[0-9]*$/);        
            };
            
        });

    };

    calc(100);



//  send-ajax-form

    const  sendForm = () => {
        const erorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

        const forms = document.querySelectorAll('form'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem';

        forms.forEach(elem => {
            elem.addEventListener('submit', (event) => {
                event.preventDefault();
                elem.appendChild(statusMessage);
                statusMessage.textContent = loadMessage;
                // создаем спец объект, к-ый считывает данные с нашей формы
                const formData = new FormData(elem); 
                      
                let body = {};

                // получаем все данные из объекта formData, записываем в body
                formData.forEach((value, key) => {    
                    body[key] = value;
                });

                // очищаем инпуты после отправки
                 [...event.target.elements].forEach((item) => {
                     if (item.tagName.toLowerCase() === 'input') {
                    item.value = '';                
                    }
                });
                
                postData(body)
                    .then((response) => {
                        if (response.status !== 200) {
                            throw new Error ('Status network is not 200')
                        }

                        statusMessage.textContent = successMessage
                    })
                    .catch((error) => {
                        statusMessage.textContent = erorMessage;
                        console.error(error); 
                    }); 

            });

        });    

      const postData = (body) => {
        // создаем Fetch
        return fetch('./server.php', { // url, второй аргумент - объект настроек
            // проиписываем метод, по дефолту - GET
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }) 
      };
    };

    sendForm();

    // валидация инпутов
    const validateForms = () => {

    const form = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3');

    let forms = [...form.elements, ...form2.elements, ...form3.elements];

    forms.forEach((item) => {
        if (item.id && item.id.includes('phone')) {
            item.addEventListener('input', () => {
                
               item.value =  item.value.match(/^\+[0-9]*$/)  
            });
        };

        if (item.id.includes('name')) {
            item.addEventListener('input', () => {
                item.value = item.value.match(/[А-Яа-я\s]*$/)
            })    
        };     
    });

    };

    validateForms();

    console.log(2);
    

});


