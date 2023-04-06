import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../types/Command.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ping_the_monkey")
        .setDescription("Ping the monkey"),
    execute: async (interaction: CommandInteraction): Promise<void> => {
        await interaction.reply("Pong!");
    }
} as Command;
