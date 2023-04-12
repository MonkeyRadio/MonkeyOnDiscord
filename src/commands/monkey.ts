import { Client, CommandInteraction, SlashCommandBuilder, CommandInteractionOptionResolver, ChannelType } from "discord.js";
import { Command } from "../types/Command.js";
import { playTheMonkey } from "./MonkeyVoice/voiceConnect.js";
import { stopTheMonkey } from "./MonkeyVoice/voiceDisconnect.js";
import { getListeners } from "./MonkeyUtils/Listeners.js";
import { getCurrent } from "./MonkeyUtils/Current.js";
import { getShow } from "./MonkeyUtils/Show.js";

export default {
    data: new SlashCommandBuilder()
        .setName("monkey")
        .setDescription("Get the current monkey")
        .addSubcommand(option =>
            option.setName("play")
                .setDescription("Play the monkey")
                .addChannelOption(option =>
                    option.setName("voicechannel")
                        .setDescription("The voice channel to join or empty to join the current channel")
                        .addChannelTypes(ChannelType.GuildVoice)))
        .addSubcommand(option =>
            option.setName("join")
                .setDescription("Play the monkey")
                .addChannelOption(option =>
                    option.setName("voicechannel")
                        .setDescription("The voice channel to join or empty to join the current channel")
                        .addChannelTypes(ChannelType.GuildVoice)))
        .addSubcommand(option =>
            option.setName("stop")
                .setDescription("Stop the monkey"))
        .addSubcommand(option =>
            option.setName("current")
                .setDescription("Get the current monkey"))
        .addSubcommand(option =>
            option.setName("listeners")
                .setDescription("Get the current listeners number on the monkey"))
        .addSubcommand(option =>
            option.setName("show")
                .setDescription("Get the current show on the monkey")),


    execute: async (interaction: CommandInteraction, client: Client): Promise<void> => {
        let subCommand: string | null = (interaction.options as CommandInteractionOptionResolver).getSubcommand();
        
        switch (subCommand) {

            case "join":
                await playTheMonkey(interaction, client);
                break;

            case "play":
                await playTheMonkey(interaction, client);
                break;

            case "stop":
                await stopTheMonkey(interaction);
                break;

            case "listeners":
                await getListeners(interaction);
                break;

            case "current":
                await getCurrent(interaction);
                break;

            case "show":
                await getShow(interaction);
                break;

            default:
                await interaction.reply("Unknown subcommand");
                break;

        }
    }
} as Command;
