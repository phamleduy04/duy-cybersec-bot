const { Command } = require('discord.js-commando');
const { set } = require('quick.db');
const utf8 = require('utf8');

module.exports = class addCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'add',
            group: 'tag',
            memberName: 'add',
            description: 'Add thông tin vào tag',
            guildOnly: true,
            userPermissions: ["MANAGE_GUILD"],
            args: [
                {
                    type: 'string',
                    prompt: 'Nhập tên tag (tất cả chữ thường)',
                    key: 'tagName',
                    validate: text => text.length < 10,
                    error: 'Vui lòng nhập lại tag',
                    wait: 60,
                },
                {
                    type: 'string',
                    prompt: 'Nhập tin nhắn cần gởi',
                    key: 'text',
                    wait: 300,
                },
            ],
        });
    }
    async run(message, args) {
        const tagName = args.tagName.toLowerCase().split(/ +/g).join('');
        let attachment;
        if (message.attachments.array().length > 0) attachment = message.attachments.array();
        await set(tagName, { text: utf8.encode(args.text), images: attachment ? attachment : null });
        message.channel.send(`Đã lưu tag \`${tagName}\` thành công!`);
    }
};