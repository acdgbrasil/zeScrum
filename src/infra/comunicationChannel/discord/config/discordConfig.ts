export const discordConfigs = () => {
    const DISCORD_CHANNELS_NAME = new Map<string, string>()
    DISCORD_CHANNELS_NAME.set("1343704126806294558", "daily");
    return {
        DISCORD_CHANNELS_ID: {
            DAILY: "1343704126806294558",
        },
        DISCORD_CHANNELS_NAME: DISCORD_CHANNELS_NAME,
    }
};

export const DISCORD_CHANNELS_ID = {
    DAILY:"1343704126806294558",
}