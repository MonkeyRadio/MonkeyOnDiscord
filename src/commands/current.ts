import { CommandInteraction, Client } from "discord.js";
import { Command } from "../types/Command.js";
import { getCurrent } from "../controllers/MonkeyAPI.js";

export const current: Command = {
    name: "monkey",
    description: "Monkey Radio !",
    run: async (client: Client, interaction: CommandInteraction) => {

        const current = await getCurrent();

        console.log(current)

        await interaction.followUp({
            ephemeral: true,
            content: current.current.trackTitle
        });
    }
};
