const promptMessage = async (message, author, time, validReactions) => {
    time *= 1000;
    for (const reaction of validReactions) await message.react(reaction);
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
    return message
        .awaitReactions(filter, { max: 1, time })
        .then(collected => collected.first() && collected.first().emoji.name);
};

const laysodep = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};

module.exports = {
    promptMessage,
    laysodep,
    formatBytes,
};