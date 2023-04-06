import { CommandInteraction, Client, Interaction, Events } from "discord.js";
import { commands } from "../Commands.js";
import { Command } from "../types/Command.js";

export default (client: Client): void => {
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
        if (interaction.isCommand()) {
            let command:Command = commands[interaction.commandName];
            if (!command) return;
            try {
                await command.execute(interaction as CommandInteraction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
            }
        }
    });
};
