import { execute as executeSorteio } from '../commands/sorteio.js';

export const handleInteractionCreate = async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'sorteio') {
		await executeSorteio(interaction);
	}
};
