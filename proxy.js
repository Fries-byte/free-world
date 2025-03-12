const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Proxy endpoint
app.get("/api/messages", async (req, res) => {
    const DISCORD_CHANNEL_ID = "1349382872716410951";
    const DISCORD_BOT_TOKEN = "MTM0OTM4MzkwMTczMDA0NjEzNA.GFdTCH.5v-Ru7QfnDeJ_C35vJ5KisupPbBjFpRyyeSp9o";

    try {
        const response = await fetch(`https://discord.com/api/v10/channels/${DISCORD_CHANNEL_ID}/messages`, {
            headers: { "Authorization": `Bot ${DISCORD_BOT_TOKEN}` }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Proxy Error:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
