const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = class pingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'misc',
            memberName: 'ping',
            description: 'Check ping bot!',
        });
    }
    async run(message) {
        const msg = await message.channel.send(`🏓 Pinging....`);
        try {
            const response = await axios.get('https://srhpyqt94yxb.statuspage.io/api/v2/components.json');
            const api = response.data.components.filter(el => el.name == "API")[0];
            const embed = new MessageEmbed()
                .addField('Độ trễ (bot):', `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`, true)
                .addField('Độ trễ (API): ', `${this.client.ws.ping}ms`, true)
                .addField('Discord API: ', api.status, true)
                .addField('Vị trí hosting: ', `${IPDATA.regionName}, ${IPDATA.countryCode}`, true);
            msg.edit('Pong! 🏓', embed);
        }
        catch(e) {
            console.log(e);
            return msg.edit(`Pong! \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\``);
        }
    }
};