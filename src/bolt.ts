const { App } = require('@slack/bolt');

const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
})
export default function sendMessage() {

slackApp.client({
  channel: "C02DPNGRH39",
  text: `Welcome🎉 You can introduce yourself in this channel.`
});
}