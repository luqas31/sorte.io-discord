import { REST, Routes } from 'discord.js';
import { token, guild_id, client_id } from '../data.js';

const commands = [
	{
		name: 'hey',
		description: 'Replies with hey!',
	},
];

const rest = new REST({ version: '10' }).setToken(token);

async function registerCommands() {
	try {
		console.log('Registering slash commands');
		await rest.put(Routes.applicationGuildCommands(client_id, guild_id), { body: commands });

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
}

registerCommands();
