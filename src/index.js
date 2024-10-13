import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { token, clientId } from './config/config.js';
import { handleInteractionCreate } from './events/interactionCreate.js';
import { handleReady } from './events/ready.js';
import { data as sorteioCommand } from './commands/sorteio.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const commands = [sorteioCommand].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log('Iniciando o registro dos comandos de slash...');
		await rest.put(Routes.applicationCommands(clientId), { body: commands });
		console.log('Comandos de slash registrados com sucesso!');
	} catch (error) {
		console.error('Erro ao registrar os comandos de slash:', error);
	}
})();

client.once('ready', () => handleReady(client));
client.on('interactionCreate', async interaction => handleInteractionCreate(interaction));

client.login(token);
