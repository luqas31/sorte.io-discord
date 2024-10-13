

# sorte.io - Discord bot

This is a Discord bot built with [Discord.js](https://discord.js.org/) and [Node.js](https://nodejs.org/), designed to simplify and speed up the process of randomly assigning weapons in **FiveM**. In competitive FiveM matches, the winning team takes the weapons from the losing team, and this bot helps automatically distribute those weapons to the members of the winning team.

## Features

- Automatically conducts weapon lotteries among players on the winning team after a match.
- Fully customizable with the available weapons and server-specific configurations.
- Easy to integrate into any Discord server.

## How to Use

1. **Manual Setup**: Insert the necessary information (such as player lists and weapons) into the `src/config.js` file.
   
2. **Automatic Integration**: To add the bot to your Discord server, simply click the link below and authorize the bot:
   [Add Bot to Discord](https://discord.com/oauth2/authorize?client_id=1293651129644879872&scope=bot%20applications.commands&permissions=8)

## Requirements

- Node.js
- Discord.js

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/luqas31/sorte.io-discord.git
   ```
2. Navigate to the project directory and install the dependencies:
   ```bash
   cd your-repo
   npm install
   ```
3. Configure the `src/config.js` file with the necessary data (such as the list of players and weapons).
4. Run the bot:
   ```bash
   node index.js
   ```

## Contributions

Feel free to open issues or submit pull requests if you'd like to add features or fix bugs.