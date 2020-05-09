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
                 
        });  
    }); 
};

export default togglePopUp;