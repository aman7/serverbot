const Discord = require("discord.js");
const Gamedig = require("gamedig");

const client = new Discord.Client();

currentPlayers = async function() {
  var status;
  await Gamedig.query({
    type: "game",
    host: "ip",
    port: "port"
  })
    .then(state => {
      var totalPlayers = state.raw.numplayers;
      status = totalPlayers + "/" + state.maxplayers;
      console.log(status);

      return status;
    })
    .catch(error => {
      status = "offline/rebooting";
    });
  client.user
    .setActivity(status, { type: "PLAYING" })
    .then(presence => {
      console.log(
        `Activity set to ${presence.game ? presence.game.name : "none"}`
      );
    })
    .catch(console.error);
};
client.on("ready", () => {
  setInterval(() => {
    currentPlayers();
  }, 30000);
});

client.login("token");
