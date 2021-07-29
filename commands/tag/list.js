const { Command } = require('discord.js-commando');
const { all } = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = class listCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'list',
            group: 'tag',
            memberName: 'list',
            description: 'Xem tất cả các tag có sẵn trong server',
            guildOnly: true,
        });
    }
    async run(message) {
        const listTag = all().map(el => el.ID);
        if (!listTag || listTag.length == 0) return message.channel.send('Không có tag, hãy sử dụng lệnh add để add tag vào!');
        const embed = new MessageEmbed()
            .setAuthor('Các tag hiện có trong server', message.guild.iconURL())
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription(listTag.map(el => `\`${el}\``).join(', '));
        return message.channel.send(embed);
    }
};