import fetch from 'node-fetch'
import {parse} from 'node-html-parser';
import list from './list.js';

const start = async ({name, url, selector, content}, index) => {
    const response = await fetch(url);
    const body = await response.text();

    const root = parse(body);

    const text = root.querySelector(selector)?.text

    if (!text) {
        console.log('\x1b[31m', `${index}. ${name} - ошибка парсинга!`)

        return
    }

    if (content === text) {
        console.log('\x1b[32m', `${index}. ${name} - ничего нового.`)

        return
    }

    console.log('\x1b[33m', `${index}. ${name} - есть изменения!`)
    console.log(`Предыдущее значение - ${content}`)
    console.log(`Новое значение - ${text}`)
}

list.forEach((item, index) => start(item, index));