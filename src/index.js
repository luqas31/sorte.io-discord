import { Client, GatewayIntentBits } from 'discord.js';
import { token } from '../data.js';

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
});

client.on('ready', c => {
	console.log(`${c.user.username} is ready!`);
});

/* client.on('messageCreate', msg => {
	if (msg.author.bot) return;

	if (msg.content === 'ping') {
		msg.reply('pong');
	}
}); */

client.on('interactionCreate', interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'hey') {
		interaction.reply('hey nigguh');
	}
});

client.login(token);
