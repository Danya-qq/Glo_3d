let date = new Date(),
hours = date.getHours()
newYearDate = new Date('01 january 2021'),
dayTime = ['Доброе утро', 'Добрый день!', 'Добрый вечер', 'Доброй ночи'],
days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];



let showDayTime = function (){
    if (hours >= 0 && hours <= 3) {
    return dayTime[3]
    } else if (hours >=4 && hours <=11) {
        return dayTime[0]
    } else if (hours >=12 && hours <= 15) {
        return dayTime[1]
    } else return dayTime[2]
};

let div = document.createElement('div'),
body = document.querySelector('body');
body.prepend(div);

div.innerText = `${showDayTime()}
Сегодня: ${days[date.getDay()]}
Текущее время ${date.toLocaleTimeString('en')}
До нового года осталось ${Math.floor((newYearDate - date)/86400/1000)} дня`;





 
