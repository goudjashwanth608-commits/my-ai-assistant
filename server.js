const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Simple memory for this prototype
const memory = {
  name: "JASHWANTH",
  assistantName: "Mine",
  favouriteColour: null,
  status: "Available"
};

function getTime() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getDate() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

app.post("/api/assistant", (req, res) => {
  const message = String(req.body.message || "").trim();

  if (!message) {
    return res.json({
      reply: "Tell me something, and I'll help you."
    });
  }

  const text = message.toLowerCase();

  // Greeting
  if (
    text === "hi" ||
    text === "hello" ||
    text.includes("hey mine")
  ) {
    return res.json({
      reply: `Hello ${memory.name}! 👋 I'm ${memory.assistantName}. How can I help you?`
    });
  }

  // Time
  if (
    text.includes("what time") ||
    text.includes("time now") ||
    text === "time"
  ) {
    return res.json({
      reply: `The current time is ${getTime()}. ⏰`
    });
  }

  // Date
  if (
    text.includes("what date") ||
    text.includes("today's date") ||
    text.includes("today date")
  ) {
    return res.json({
      reply: `Today is ${getDate()}. 📅`
    });
  }

  // Name
  if (
    text.includes("what is my name") ||
    text.includes("who am i")
  ) {
    return res.json({
      reply: `Your name is ${memory.name}. 😊`
    });
  }

  // Save favourite colour
  const colourMatch = text.match(
    /(?:my favorite colour is|my favourite colour is|my favorite color is|my favourite color is)\s+(.+)/i
  );

  if (colourMatch) {
    memory.favouriteColour = colourMatch[1].trim();

    return res.json({
      reply: `Got it! I'll remember that your favourite colour is ${memory.favouriteColour}. 🎨`
    });
  }

  // Favourite colour
  if (
    text.includes("what is my favourite colour") ||
    text.includes("what is my favorite colour") ||
    text.includes("what is my favourite color") ||
    text.includes("what is my favorite color")
  ) {
    if (memory.favouriteColour) {
      return res.json({
        reply: `Your favourite colour is ${memory.favouriteColour}. 🎨`
      });
    }

    return res.json({
      reply: "You haven't told me your favourite colour yet."
    });
  }

  // College/class status
  if (
    text.includes("i am in class") ||
    text.includes("i'm in class") ||
    text.includes("in class")
  ) {
    memory.status = "In Class";

    return res.json({
      reply: "Okay. I've set your status to In Class 📚."
    });
  }

  if (
    text.includes("i am in college") ||
    text.includes("i'm in college") ||
    text.includes("in college")
  ) {
    memory.status = "In College";

    return res.json({
      reply: "Okay. I've set your status to In College 🎓."
    });
  }

  // Busy
  if (
    text.includes("i am busy") ||
    text.includes("i'm busy") ||
    text === "busy"
  ) {
    memory.status = "Busy";

    return res.json({
      reply: "Okay. Your status is now Busy 🔴."
    });
  }

  // Available
  if (
    text.includes("i am free") ||
    text.includes("i'm free") ||
    text.includes("available")
  ) {
    memory.status = "Available";

    return res.json({
      reply: "You're now marked as Available 🟢."
    });
  }

  // Current status
  if (
    text.includes("my status") ||
    text.includes("what is my status")
  ) {
    return res.json({
      reply: `Your current status is ${memory.status}.`
    });
  }

  // Call task
  if (text.includes("call dad")) {
    return res.json({
      reply:
        "I can create the call task, but actual phone calling will require a supported calling service and permission. 📞"
    });
  }

  // Reminder
  if (
    text.includes("remind me") ||
    text.includes("reminder")
  ) {
    return res.json({
      reply:
        "I understand. The reminder system is ready to be connected to scheduled notifications. 🔔"
    });
  }

  // Telugu basic responses
  if (
    text.includes("namaste") ||
    text.includes("నమస్తే")
  ) {
    return res.json({
      reply: `నమస్తే ${memory.name}! 👋 నేను ${memory.assistantName}. మీకు ఎలా సహాయం చేయాలి?`
    });
  }

  // Default response
  return res.json({
    reply:
      `I understood: "${message}"\n\nI'm still being upgraded. Soon I'll be able to handle much more natural conversation and personal tasks. 🤖`
  });
});

app.listen(PORT, () => {
  console.log(`Mine is running on port ${PORT}`);
});
