const { Command } = require('discord.js-commando');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const { promptMessage } = require('../../handler/utils');

module.exports = class deleteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'delete',
            group: 'tag',
            memberName: 'delete',
            description: 'Xoá tag',
            guildOnly: true,
            userPermissions: ["MANAGE_GUILD"],
            args: [
                {
                    type: 'string',
                    prompt: 'Nhập tên tag cần xoá',
                    key: 'tagName',
                    validate: text => text.length < 10,
                    error: 'Vui lòng nhập lại tag',
                    wait: 60,
                },
            ],
        });
    }
    async run(message, args) {
        const tagName = args.tagName.toLowerCase();
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor('Hãy trả lời trong 30 giây!')
            .setDescription(`Bạn có muốn xoá tag: \`${tagName}?\``);

        const msg = await message.channel.send(embed);

        const emoji = await promptMessage(msg, message.author, 30, ['✅', '❌']);

        if (emoji === '✅') {
            await db.delete(tagName);
            message.channel.send(`Đã xoá thành công tag \`${tagName}\``);
        } else message.channel.send('Đã huỷ lệnh!');

        if (msg.deletable) msg.delete();
    }
};