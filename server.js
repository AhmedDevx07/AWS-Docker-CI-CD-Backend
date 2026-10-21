import express, { json } from "express";
import dotenv from "dotenv";
import ngrok from "@ngrok/ngrok";

dotenv.config();

const app = express();
app.use(express.json());

const listener = await ngrok.forward({
  addr: 3000,
  authtoken: process.env.NGROK_AUTHTOKEN,
});

console.log(listener.url());

const users = [];

app.get("/health", (req, res) => {
  res.json({
    status: true,
    message: "Application is working fine",
  });
});

app.get("/users", (req, res) => {
  res.json({
    status: true,
    users: users,
  });
});

app.post("/users", (req, res) => {
  console.log(req.body, "==>> req.body");
  users.push(req.body);
  console.log(users, "==>>> users");
  res.json({
    status: true,
    message: "User added successfully",
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    status: true,
    users: users[id],
  });
});

app.listen(3000, () => {
  console.log("application is running on port 3000");
});
