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
};

export default tabs;