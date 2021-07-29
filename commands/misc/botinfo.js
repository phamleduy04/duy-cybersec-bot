const { Command } = require('discord.js-commando');
const { MessageEmbed, version: djsversion } = require('discord.js');
const ms = require('ms');
const os = require('os');
const { laysodep, formatBytes } = require('../../handler/utils');
const { version, license } = require('../../package.json');
const { utc } = require('moment');

module.exports = class botInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            group: 'misc',
            memberName: 'botinfo',
            description: 'Check thông tin của bot!',
        });
    }
    async run(message) {
        const client = this.client;
        const guildManager = client.guilds.cache;
        const guildCount = guildManager.size;
        const memberCount = client.users.cache.size;
        const channelCount = client.channels.cache.size;
        const core = os.cpus()[0];
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(message.guild.me.displayHexColor || 'RANDOM')
            .addField("Thông tin cơ bản", [
                `**--> Tên bot:** ${client.user.tag} (${client.user.id})`,
                `**--> Số lệnh:** ${this.client.registry.commands.size}`,
                `**--> Uptime:** ${ms(client.uptime)}`,
                `**--> Số Server:** ${laysodep(guildCount)}`,
                `**--> Người dùng:** ${laysodep(memberCount)}`,
                `**--> Channels:** ${laysodep(channelCount)}`,
                `**--> Ngày tạo bot:** ${utc(client.user.createdTimestamp).format('MM/DD/YYYY HH:mm:ss')}`,
                `**--> Node.js version:** ${process.version}`,
                `**--> Bot version: ** v${version}`,
                `**--> Discord.js version:** v${djsversion}`,
                `**--> License:** ${license}`,
                '\u200b',
            ])
            .addField('Thông tin máy chủ', [
                `**--> Platfrom: ** ${process.platform}`,
                `**--> CPU:**`,
                `\u3000 Cores: ${os.cpus().length}`,
                `\u3000 Model: ${core.model}`,
                `\u3000 Speed: ${core.speed}MHz`,
                `**--> Memory:**`,
                `\u3000 Total: ${formatBytes(process.memoryUsage().heapTotal)}`,
                `\u3000 Used: ${formatBytes(process.memoryUsage().heapUsed)}`,
            ])
            .setTimestamp();
        message.channel.send(embed);
    }
};