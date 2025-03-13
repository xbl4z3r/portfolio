import {NextResponse} from "next/server";

import {Client, GatewayIntentBits, Partials} from 'discord.js';

export const dynamic = "force-dynamic";

const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
    ]
});

let loggedIn = false;

export async function GET() {
    if (loggedIn) {
        return NextResponse.json({
            guilds: client.guilds.cache.size,
            users: client.users.cache.size,
        });
    }
    await client.login(process.env.DISCORD_TOKEN);
    loggedIn = true;
    return NextResponse.json({
        guilds: client.guilds.cache.size,
        users: client.users.cache.size,
    });
}
