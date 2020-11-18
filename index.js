const fs = require("fs");
let faker = require('faker');
const SexByName = require('./sex-by-name');

faker.locale = "ru";

let result = [];
let code = 1;
let prevCode = 1;
for (let index = 0; index <= 50; index++) {
    code = prevCode + code;
    prevCode = code - prevCode;
    let name = faker.name.findName();
    let phone = faker.phone.phoneNumber().replace(/[{(\-)}+]/g, '');
    let email = faker.internet.email();
    let sms = Math.floor(Math.random()); // random contact card containing many properties

    let sexByName = new SexByName(...name.split(' ').reverse(), '');

    let k = sexByName.get_gender()
    let sex = k ? 'male' : 'female';

    let dateBirth = randomDate(Date.parse('1970-01-01'), Date.parse('2000-12-31'));
    let adress = `Санкт-Петербург, ${faker.address.streetName()}, д.${Math.floor(Math.random()*100)}, кв.${Math.floor(Math.random()*1000)}`;
    let status = Math.floor(Math.random() * 5) === 4 ? 'VIP' : ''

    let ists = ['Совет друзей', 'Другой источник', 'Оффлайн реклама', 'Газета', 'Справочник', ''];
    let istClient = ists[Math.floor(Math.random()*ists.length)];
    let loyal = ['Бронзовый', 'Золотой', 'Серебрянный', 'Платиновый',''];
    let loyalClient = loyal[Math.floor(Math.random()*loyal.length)];
    let money = Math.floor(Math.random() * 10000);
    let bonus = Math.floor(Math.random() * 10000);
    const str = `${name};7${phone};${email};${sms};${sex};${adress};;${dateBirth.getDate()}.${dateBirth.getMonth()+1}.${dateBirth.getFullYear()};${status};${istClient};${code};${loyalClient};${money};${bonus};`
    console.log(str)
    result.push(str);
}
	
fs.writeFileSync("hello.txt", result.join('\n'))
// Источник клиента;Код клиента;Статус в программе лояльности;Баланс счета клиента;Баланс бонусного счета клиента;

function randomDate(start, end) {
    let date = new Date(+start + Math.random() * (end - start));
    return date;
}