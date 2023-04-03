import config from "../config.js";

export async function getCurrent(): Promise<any> {
    const response = await fetch(config.monkeyAPI.url + config.monkeyAPI.endpoints.current);
    return await response.json();
}
