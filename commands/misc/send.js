const { Command } = require('discord.js-commando');

module.exports = class sendCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'send',
            group: 'tag',
            memberName: 'send',
            description: 'Xoá tag',
            guildOnly: true,
            userPermissions: ["ADMINISTRATOR"],
            args: [
                {
                    type: 'channel',
                    prompt: 'Nhập channel cần gởi',
                    key: 'channel',
                    error: 'Vui lòng nhập lại channel',
                    wait: 60,
                },
                {
                    type: 'string',
                    prompt: 'Nhập tin nhắn cần gởi',
                    key: 'text',
                    error: 'Vui lòng nhập lại tin nhắn cần gởi',
                    wait: 300,
                },
            ],
        });
    }
    async run(message, args) {
        args.channel.send(args.text);
        message.channel.send('Thao tác thành công!');
    }
};