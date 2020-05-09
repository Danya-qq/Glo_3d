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
        });
    };
    
    export default toggleMenu;