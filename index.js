var Twit = require("twit");
const $ = require("jquery");
const express = require("express");
const app = express();

const server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require("fs");
const tmi = require("tmi.js");
const syllables = require("syllables");
const options = require("./options");
const rs = require("text-readability");
var Sentiment = require("sentiment");
var sentiment = new Sentiment();
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
require("events").EventEmitter.defaultMaxListeners = 25;
var data = 0;
var counter = 1;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
const client = new tmi.client(options);
client.connect();

function sentencesCount(msg) {
  const desiredMatch = msg.match(/\./g);
  if (desiredMatch == null) {
    return 0;
  } else {
    const sentenceLength = desiredMatch.length;
    return sentenceLength;
  }
}

function wordCount(msg) {
  return msg.split(" ").length;
}

function syllableCount(msg) {
  /*   var count = 0;
      const wordsArray = msg.split(" ");
      for (words in wordsArray) {
        word = word.toLowerCase();
        if (word.length <= 3) {
          return 1;
        }
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
        word = word.replace(/^y/, "");
        const sylcount = word.match(/[aeiouy]{1,2}/g).length;
        count = count + sylcount;
      }
      return count; */
  return syllables(msg);
}

function gradeFilter(gradeLevel, message) {
  var counter = 0;
  if (rs.automatedReadabilityIndex(message) > gradeLevel) {
    counter++;
  }
  if (rs.fleschReadingEase(message) / 10 > gradeLevel) {
    counter++;
  }
  if (rs.daleChallReadabilityScore(message) > gradeLevel) {
    counter++;
  }
  if (rs.gunningFog(message) > gradeLevel) {
    counter++;
  }
  if (rs.colemanLiauIndex(message) > gradeLevel) {
    counter++;
  }
  return counter;
}

io.on("connection", function(socket) {
  var gradeLevel = 0;

  socket.on("messager", msg => {
    console.log("messager: " + msg);
    gradeLevel = msg;
  });

  client.on("chat", (channel, user, message, self) => {
    if (self) return;

    const testsPassed = gradeFilter(gradeLevel, message);

    if (testsPassed > 2) {
      var data = sentiment.analyze(message).score;
      io.emit("pushdata", data);

      var bardata = rs.colemanLiauIndex(message);
      io.emit("bardata", bardata);
      console.log(
        `autoRead: ${rs.automatedReadabilityIndex(
          message
        )} ${rs.automatedReadabilityIndex(message) > gradeLevel}`
      );
      console.log(
        `Freadingease:  ${rs.fleschReadingEase(message) /
          10} ${rs.fleschReadingEase(message) / 10 > gradeLevel}`
      );
      console.log(
        `ChallReadbilityScore:  ${rs.daleChallReadabilityScore(
          message
        )} ${rs.daleChallReadabilityScore(message) > gradeLevel}`
      );
      console.log(
        `GunningFog :${rs.gunningFog(message)}  ${rs.gunningFog(message) >
          gradeLevel}`
      );
      console.log(
        `Coleman:${rs.colemanLiauIndex(message)} ${rs.colemanLiauIndex(
          message
        ) > gradeLevel}`
      );
      console.log(testsPassed);
      const avgScore =
        (rs.automatedReadabilityIndex(message) +
          rs.fleschReadingEase(message) / 10 +
          rs.daleChallReadabilityScore(message) +
          rs.gunningFog(message) +
          rs.colemanLiauIndex(message)) /
        5;
      const msgInfo = {
        channel: channel,
        dispName: user["display-name"],
        message: message,
        msgColor: user["color"],
        avgScore: avgScore,
        sentiment: sentiment.analyze(message).score
      };

      io.emit("tweet", { message: msgInfo });
    }
  });
});

/* app.get("/mods-api/channels/:channel", (req, res) => {
  if (client.readyState() !== "OPEN") {
    return res.json({
      error: "Service Unavailable",
      status: 503,
      message: "Not ready"
    });
  }
  let channel = req.params.channel.toLowerCase();
  client
    .mods(channel)
    .then(moderators => {
      res.json({
        channel,
        moderators
      });
    })
    .catch(err => {
      res.json({
        error: "Internal Server Error",
        status: 500,
        message: "Some error occurred"
      });
    });
}); */

// listen for requests :)
const listener = server.listen(7000, function() {
  console.log("Your app is listening on port " + "7000");
});
