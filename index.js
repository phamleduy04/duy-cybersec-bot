const { CommandoClient } = require('discord.js-commando');
const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
require('dotenv').config();
const publicIP = require('public-ip');
const axios = require('axios');

const { TOKEN, PREFIX, OWNERID } = process.env;

const client = new CommandoClient({
    commandPrefix: PREFIX,
    owner: OWNERID,
});

client.limit = new Collection();
client.cooldownAmount = 1200 * 1000;

client.registry
    .registerDefaultTypes()
    .registerGroups(readdirSync('./commands').map(el => [el, capfirstLetter(el)]) || null)
    .registerDefaultGroups()
    .registerDefaultCommands({
        ping: false,
        unknownCommand: false,
    })
    .registerCommandsIn(require('path').join(__dirname, 'commands'));

client.on('ready', async () => {
    console.log(`${client.user.tag} đã sẵn sàng`);
    // set presence

    const myIP = await publicIP.v4();
    const res = await axios.get(`http://ip-api.com/json/${myIP}`);
    global.IPDATA = res.data;
});

client.on('message', async (message) => {
    require('./messageEvent')(client, message, PREFIX);
});

client.login(TOKEN);

function capfirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}