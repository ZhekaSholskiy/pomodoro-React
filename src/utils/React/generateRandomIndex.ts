// nanoid - библиотека для генерации случайных значений. Ниже - пример использования встроенных средств,
// но есть маааааааааленькая вероятность повтора. Очень маленькая. Чувака из видео она ни разу не подводила
import { assoc } from "../js/assoc";

export const generateRandomString = () => Math.random().toString(36).substring(2,15);

export const assignId = assoc('id', generateRandomString());

export const generateId = <O extends object>(obj: O) => assoc('id', generateRandomString())(obj);
