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


export default validateForms;