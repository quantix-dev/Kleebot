/*    
	  purge.js - purges X amount of messages from a channel
	
    Copyright (C) 2020  QuantixOfficial
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>.
*/
 
var connectionX = null
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
	/// Code in here.
	if (message.author.tag != ("Quantix#0781")) {
    message.channel.send("You are not QUanTIx");
    return;
  }

  // get the argument as a number
  const deleteCount = parseInt(args[0], 10);
    
  if(!deleteCount || deleteCount <= 0 || deleteCount > 100)
    return message.channel.send("-purge [1-100]").catch();
    
  // Get messages and bulk delete them.
  const fetched = await message.channel.fetchMessages({limit: deleteCount});
  message.channel.bulkDelete(fetched)
    .catch(error => message.channel.send(`Couldn't delete messages because of: ${error}`).catch());

  message.channel.send(`Me just purged ${deleteCount} messages.`).catch()
}

module.exports.help = {
	name: "purge",

	category: "other",
  commandHelp: "Purge messages.",
  cooldown: 10
}