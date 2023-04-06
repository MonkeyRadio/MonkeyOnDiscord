import { Client } from "discord.js";
import { register_commands } from "../Commands.js";
import fs from "fs";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        await register_commands();

        console.log(`${client.user.username} is online`);
    });
};