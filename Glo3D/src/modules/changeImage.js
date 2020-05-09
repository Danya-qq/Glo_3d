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
    
    });
  
};

export default changeImage;