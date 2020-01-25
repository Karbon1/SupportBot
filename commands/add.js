// SupportBot
// Created by © 2020 Emerald Services
// Command: Add

const Discord = require("discord.js");
const bot = new Discord.Client()
const yaml = require('js-yaml');

const supportbot = yaml.load(fs.readFileSync('./supportbot-config.yml', 'utf8'));

module.exports.run = (bot, message, args) => {
    message.delete();
    
    console.log(`\u001b[31;1m`, `${message.author.tag}`, `\u001b[32;1m`, `has executed`, `\u001b[31;1m`, `${supportbot.Prefix}${supportbot.Add_Command}`);
    
    let staffGroup = message.guild.roles.find(staffRole => staffRole.name === supportbot.StaffRole);

    const rolemissing = new Discord.RichEmbed()
        .setDescription(`:x: Looks like this server doesn't have the role **${supportbot.StaffRole}**`)
        .setColor(supportbot.EmbedColour);
    if (!staffGroup) return message.reply({embed: rolemissing});

    const donothaverole = new Discord.RichEmbed()
        .setDescription(`:x: Sorry! You cannot use this command with the role **${supportbot.StaffRole}**`)
        .setColor(supportbot.EmbedColour); 
    if (!message.member.roles.has(staffGroup.id)) return message.reply({embed: donothaverole});

    const outsideticket = new Discord.RichEmbed()
        .setDescription(`:x: Cannot use this command becase you are outside a ticket channel.`)
        .setColor(supportbot.EmbedColour); 
    if (!message.channel.name.startsWith(`${supportbot.Ticket_Channel_Name}-`)) return message.channel.send({embed: outsideticket});

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    const cantfinduser = new Discord.RichEmbed()
        .setDescription(`:x: Hmm! Does that user exist? I cannot find the user.`)
        .setColor(supportbot.EmbedColour); 
    if(!rUser) return message.channel.send({embed: cantfinduser});

    const channel = message.guild.channels.find(channel => channel.name === message.channel.name);

    const cantfindchannel = new Discord.RichEmbed()
        .setDescription(`:x: Hmm! Does that ticket exist? I cannot find the ticket channel.`)
        .setColor(supportbot.EmbedColour); 
    
    if(!channel) return message.channel.send({embed: cantfindchannel});
        message.delete().catch(O_o=>{});
        message.channel.overwritePermissions(rUser, { READ_MESSAGES: true, SEND_MESSAGES: true });

    const useradded = new Discord.RichEmbed()
        .setColor(supportbot.EmbedColour)
        .setTitle("User Added")
        .setDescription(`👍 ${rUser} has been added to this ticket`)
        .setTimestamp();
    message.channel.send({embed: useradded});
    
};

exports.help = {
    name: supportbot.Add_Command,
};
