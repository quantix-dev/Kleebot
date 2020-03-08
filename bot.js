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
	bot.user.setPresence({game: { name: `you.. and ${bot.guilds.size} server(s)`, type: 'WATCHING' }, status: 'dnd'});
}

bot.on("guildCreate", () => {
	updateData();
});

bot.on("guildDelete", () => {
	updateData();
});


bot.on("ready", () => {
	updateData();
	bot.generateInvite(["ADMINISTRATOR"]).then(console.log);
	
	console.log("\n\n---------------------------------")
	console.log("Powered by Qubit / Quantix")
	console.log(`Logged in as ${bot.user.tag}\n`);
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
		message.channel.send(`ÆUGH :blowfish: you can run this command again in: \`\`${cooldown} seconds.\`\``).catch()
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
