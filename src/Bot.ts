import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import ready from './listeners/ready.js';
import interactionsCreate from "./events/interactionsCreate.js";

dotenv.config();

const token = process.env.BOT_TOKEN;

const client = new Client({
    intents: [GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds]
});

ready(client);
interactionsCreate(client);

client.login(token);

process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});