const { get, has } = require('quick.db');
const utf8 = require('utf8');
const _ = require('lodash');

module.exports = async (client, message, prefix) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    const cmd = message.content.slice(prefix.length).trim().split(/ +/g).shift().toLowerCase();
    if (cmd.length === 0) return;
    const check = await has(cmd);
    if (!check) return;
    else {
        const tag = await get(cmd);
        const text = utf8.decode(tag.text);

        await message.channel.send(text, {
            files: tag.images,
            split: true,
        });

    }
};