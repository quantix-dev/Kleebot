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

const embed = new Discord.RichEmbed()
embed.setTitle("The poo poo peep pee song lyric thing");
		embed.setDescription(`It's me baby kata
							I have a huge diarrhea
							If you fart like you don't care
							raise your bog roll in the air

							(chorus)
							PEE PEE 
							POO POO
							WEE WEE
							EHO-EHO-EU

							PEE PEE PEE
							POO POO POO
							WEE WEE  EHO-EHO-EU

							WHEN YOU TAKE A COMFORT STOP
							CHOCO BALLS ARE GONNA POP
							IT'S THE SOUND OF THE BIG FLOP

							EVERY POOP IS SO FANTASTIC
							EVERY POOP IS SO TERRIFIC
							EVERYBODY LOOK AT ME
							I'M MAKING A BIG POOPIE

							(chorus)
							PEE PEE 
							POO POO
							WEE WEE
							EHO-EHO-EU

							PEE PEE PEE
							POO POO POO
							WEE WEE  EHO-EHO-EU

							LET ME SHOW YOU MAGIC TRICKS
							BROWN MONKEY DOES GYMNASTICS
							TINY TURDS OR MASSIVE BRICKS
							I LIKE TO SHARE MY POO PICS

							EVERY POOP IS SO FANTASTIC
							EVERY POOP IS SO TERRIFIC

							ARE YOU READY FOR ACTION
							IT'S TIME TO RELEASE THE KRAKEN

							(chorus)
							PEE PEE 
							POO POO
							WEE WEE
							EHO-EHO-EU

							PEE PEE PEE
							POO POO POO
							WEE WEE  EHO-EHO-EU

							COME ON, DROP IT NOW

							*poop noises*`);
embed.setColor([237, 141, 14]);

module.exports.run = async (bot, message, args) => {
	embed.setThumbnail(bot.user.displayAvatarURL);
	message.channel.send(embed).catch()
}

module.exports.help = {
	name: "poo",

	category: "other",
	commandHelp: "sends funny poo hahaha :binge:",
	cooldown: 100
}