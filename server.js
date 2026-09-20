const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow JSON requests
app.use(express.json());

// Serve the website
app.use(express.static(path.join(__dirname)));

// Basic assistant API
app.post("/api/assistant", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      reply: "Please tell me what you need."
    });
  }

  const text = message.toLowerCase();

  if (
    text.includes("what time") ||
    text.includes("time now")
  ) {
    const time = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit"
    });

    return res.json({
      reply: `The current time is ${time}.`
    });
  }

  if (
    text.includes("hello") ||
    text.includes("hi")
  ) {
    return res.json({
      reply: "Hello! I'm your personal AI assistant. How can I help you?"
    });
  }

  if (
    text.includes("in class") ||
    text.includes("in college")
  ) {
    return res.json({
      reply: "Okay. I've understood that you are currently busy in college/class."
    });
  }

  if (text.includes("call dad")) {
    return res.json({
      reply: "I can create a scheduled call task for Dad. Real phone calling will be connected in a later stage."
    });
  }

  return res.json({
    reply:
      "I understand your request. More AI capabilities will be connected as we build the assistant."
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`My AI Assistant running on port ${PORT}`);
});
