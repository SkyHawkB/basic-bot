const Discord = require('discord.js');

function addPossesive(string) {
  const lastChar = string.substring(string.length - 1);

  if(lastChar !== 's') return string + '\'s';
  return string + '\'';
}

module.exports.run = (client, message, args, config) => {
  if(!message.guild) {
    message.channel.send(config.messages.global.notGuildError);
    return;
  }

  if(message.mentions.members.size === 0) {
    message.channel.send(config.messages.global.noMentionError.replace('#ACTION#', 'see the roles of'));
  } else {
    const member = message.mentions.members.first();
    const roles = member.roles;
    let roleString = ``;

    roles.forEach((value, key, map) => {
      roleString += `\`${value.name}\``;
      roleString += `, `;
    });
    roleString = roleString.substring(0, roleString.length - 2);

    const rolesEmbed = new Discord.MessageEmbed()
      .setColor(16711715)
      .setThumbnail(member.user.avatarURL())
      .addField(addPossesive(member.displayName) + ' roles:', roleString);

    message.channel.send(rolesEmbed);
  }
};

module.exports.info = {
  'version': '1.0',
  'name': 'whichroles',
  'help': 'See someone\'s roles!',
  'usage': '',
  'hidden': false,
};
