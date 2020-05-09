
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
                    })
                    .finally(() => {
                        setTimeout(() => {
                            statusMessage.textContent = ''
                        }, 5000)
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

export default sendForm;