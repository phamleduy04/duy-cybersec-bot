const { db: mongodb } = require('./database');
const db = mongodb.createModel('done');

const add = async (key, value) => {
    if (!key) throw new Error('Missing key');
    if (!value) throw new Error('Missing value');
    if((isNaN(value))) throw new Error('Value must be a number!');
    const data = await db.fetch(key);
    if (data === null) await db.set(key, 0);
    return await db.add(key, value);
};

const set = async (key, value = null) => {
    if (!key) throw new Error('Missing key');
    return await db.set(key, value);
};

const get = async (key) => {
    return await db.fetch(key);
};

const push = async (key, value) => {
    if (!key) throw new Error('Missing key');
    if (!value) throw new Error('Missing value');
    const data = await db.fetch(key);
    if (data === null) await db.set(key, []);
    return await db.push(key, value);
};

module.exports = {
    add,
    set,
    get,
    push,
};