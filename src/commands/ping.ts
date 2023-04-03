import { CommandInteraction, Client } from "discord.js";
import { Command } from "../types/Command.js";

export const pingMonkey: Command = {
    name: "pingmonkey",
    description: "Ping the MonkeyRadio Bot !",
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "Monkey Pong";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
