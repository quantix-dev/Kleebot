/*    
	Bot.js - The initialisation program for the bot, creates the client.
	
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
 
/*---------------------------------------------------------------------------
	Modules
---------------------------------------------------------------------------*/
require('dotenv').config()

const Discord = require("discord.js"),
	  langManager = require("./langManager.js"),
	  config = require("./config.json"),
	  fs = require("fs");

/*---------------------------------------------------------------------------
	Module Loader
---------------------------------------------------------------------------*/

let moduleFiles = fs.readdirSync("./modules/"),
	modules = new Map();

let files = fs.readdirSync("./commands/"),
	cmds = new Map();

moduleFiles.forEach(f => {
	let props = require(`./modules/${f}`);
	modules.set(props.help.name, props)
	
	if(props.help.useCommand == true) {
		cmds.set(props.help.name, props);
		if(props.help.aliases) {
			props.help.aliases.forEach(a => cmds.set(a, props));
		}
	}
});

/*---------------------------------------------------------------------------
	Command loader
---------------------------------------------------------------------------*/
files.forEach(f => {
	let props = require(`./commands/${f}`);
	cmds.set(props.help.name, props);

	if(props.help.aliases) {
		props.help.aliases.forEach(a => cmds.set(a, props));
	}

	// Adding it to help.js
	let cmd = cmds.get("help");
	cmd.addCommand(props.help.name, props)
});

/*---------------------------------------------------------------------------
	Client
---------------------------------------------------------------------------*/
const bot = new Discord.Client({disableEveryone: true});

/*---------------------------------------------------------------------------
	Ready event
---------------------------------------------------------------------------*/

// OTHER EVENTS
function updateData() {
	langManager.updateTranslation(bot, "{guildSize}", bot.guilds.size)
	bot.user.setPresence({game: { name: langManager.accessMSG(bot, "status"), type: 'WATCHING' }, status: 'dnd'});
}

bot.on("guildCreate", guild => {
	let channelID;
    let channels = guild.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = bot.channels.get(guild.systemChannelID || channelID);
	channel.send(langManager.accessMSG(bot, "firstMessage"));
	channel.send(langManager.accessMSG(bot, "joinMessages"));
	
	updateData();
});

bot.on("guildDelete", () => {
	updateData();
});


bot.on("ready", () => {
	bot.generateInvite(["ADMINISTRATOR"]).then(console.log);
	
	console.log("\n\n---------------------------------")
	console.log("Powered by Qubit / Quantix")
	console.log(`Logged in as ${bot.user.tag}\n`);
	
	updateData();
});

/*---------------------------------------------------------------------------
	Message handler
---------------------------------------------------------------------------*/
cooldowns = new Map();

bot.on("message", (message) => {

	if(message.author.bot || message.system) return;
	if(message.channel.type.toLowerCase() === "dm") return;
	if(!message.content.startsWith(process.env.PREFIX)) return;
	if(!message.guild.me.permissionsIn(message.channel).has(["SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES"])) return;
	
	/*---------------------------------------------------------------------------
		Command handler
	---------------------------------------------------------------------------*/
	let split = message.content.split(/ +/g);
	let name = split[0].slice(process.env.PREFIX.length).toLowerCase();
	let args = split.slice(1);
	let cmd = cmds.get(name);
	
	var key = message.author.id + "_" + name

	// check cooldowns
	let userCooldown = cooldowns.get(key)
	if (userCooldown) {
		var cooldown = Math.round((userCooldown - Date.now()) / 1000)
		langManager.updateTranslation(bot, "{cooldown}", cooldown)
		message.channel.send(langManager.accessMSG(bot, "cooldown")).catch()
		return;
	}

	if(cmd) { 
		message.delete().catch()

		cmd.run(bot, message, args);
		cooldowns.set(key, Date.now() + cmd.help.cooldown*1000)

		setTimeout(function () {
			cooldowns.delete(key)
		}, cmd.help.cooldown*1000)

		global.gc();
	}
});


/*---------------------------------------------------------------------------
	Logging in
---------------------------------------------------------------------------*/
bot.login(process.env.CLIENT_TOKEN);