import { Client } from 'discord.js';
import dotenv from 'dotenv';
import ready from './listeners/ready.js';
import interactionsCreate from "./events/interactionsCreate.js";

dotenv.config();

const token = process.env.BOT_TOKEN;

const client = new Client({
    intents: []
});

ready(client);
interactionsCreate(client);

client.login(token);
