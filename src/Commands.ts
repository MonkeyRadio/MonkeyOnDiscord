import { Command } from "./types/Command.js";
import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import fs from "fs";

export async function get_commands(): Promise<Array<Command>> {
    const commands: Command[] = [];
    let routes: Array<string> = [];
    fs.readdirSync("./dist/commands/").forEach((file: string) => {
      if (file.endsWith(".js")) {
        routes.push(file);
      }
    });
  
    let numCalls = 0;

    for (const route of routes) {
        let imported = await import(`./commands/${route}`)
        commands.push(imported.default);
        numCalls++;
    }
    return commands;
};

let commandsGet: Array<Command> = [];

const commandsObj:any = {};

let commands: Array<SlashCommandBuilder> = [];

export async function register_commands() {
  commandsGet = await get_commands();
  for (const command of commandsGet) {
    commandsObj[command.data.name] = command;
    commands.push(command.data);
  }
  try {
    console.log(`Started refreshing application (/) commands.`);
    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN!);
		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID!),
			{ body: commands },
		);
    console.log(`Successfully reloaded application (/) commands.`);
	} catch (error) {
    console.error(`Failed to reload application (/) commands.`);
		console.error(error);
	}
}

export { commandsObj as commands };
