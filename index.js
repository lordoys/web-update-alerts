import fetch from 'node-fetch'
import {parse} from 'node-html-parser';
import list from './list.js';

let index = 0;

const start = async ({name, url, selector, content}) => {
    const response = await fetch(url);
    const body = await response.text();

    const root = parse(body);

    const text = root.querySelector(selector)?.text.trim().replace(/\s{2,}/g, ' ');

    if (!text) {
        console.log('\x1b[31m', `${name} - ошибка парсинга!`)

        return
    }

    if (content === text) {
        console.log('\x1b[37m', `${name} - ничего нового.`)

        return
    }

    console.log('\x1b[33m', `| ${name} - есть изменения! \n | Старое значение - ${content} \n | Новое значение  - ${text}`)
}

const run = async () => {
    await start(list[index])

    if (list[index + 1]) {
        index = index + 1

        await run()
    }

}

run().then(() => console.log('\x1b[32m', 'Done ✓'));
