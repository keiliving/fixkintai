"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App = require('@slack/bolt').App;
var slackApp = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});
function sendMessage() {
    slackApp.client({
        channel: "C02DPNGRH39",
        text: "Welcome\uD83C\uDF89 You can introduce yourself in this channel."
    });
}
exports.default = sendMessage;
