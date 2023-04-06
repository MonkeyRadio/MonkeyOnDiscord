import { Client, CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export type Command = {
    data: SlashCommandBuilder;
    execute: (interaction: CommandInteraction, client: Client) => Promise<void>;
};
