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

export default calc;