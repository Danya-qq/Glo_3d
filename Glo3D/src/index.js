'use strict';

import countTimer from './modules/countTimer.js'
import toggleMenu from './modules/toggleMenu.js'
import togglePopUp from './modules/togglePopUp.js'
import tabs from './modules/tabs.js'
import slider from './modules/slider.js'
import changeImage from './modules/changeImage.js'
import calc from './modules/calc.js'
import sendForm from './modules/sendForm.js'
import validateForms from './modules/validateForms.js'




// Timer
    countTimer('10 may 2020');

// Menu
    toggleMenu();
   
//popup

    togglePopUp();

    // табы

    tabs();

    // slider

    slider();

    // Блок "Наша команда"

    changeImage();

//  Calculator
    calc(100);

//  send-ajax-form

    sendForm();

    // валидация инпутов

    validateForms();