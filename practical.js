const express = require("express");
const app = express();

const PORT = 3000;


app.use(express.json());


app.use((req, res, next) => {
  const currentTime = new Date().toLocaleString();
  console.log(`Request received at: ${currentTime}`);
  console.log(`${req.method} ${req.url}`);
  next();
});


let users = [];


const sendResponse = (res, message, data = null) => {
  res.json({
    message,
    time: new Date().toLocaleString(),
    data
  });
};


app.get("/", (req, res) => {
  sendResponse(res, "Server Running");
});


app.get("/users", (req, res) => {
  sendResponse(res, "Users fetched successfully", users);
});


app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (id < 0 || id >= users.length) {
    return sendResponse(res, "User not found");
  }

  sendResponse(res, "User found", users[id]);
});

/
app.post("/users", (req, res) => {
  const { name, email } = req.body;

 
  if (!name || !email) {
    return sendResponse(res, "Name and email are required");
  }

 
  const exists = users.find(user => user.email === email);
  if (exists) {
    return sendResponse(res, "Email already exists");
  }

  const newUser = { name, email };
  users.push(newUser);

  sendResponse(res, "User added successfully", newUser);
});


app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (id < 0 || id >= users.length) {
    return sendResponse(res, "User not found");
  }

  const deletedUser = users.splice(id, 1);

  sendResponse(res, "User deleted successfully", deletedUser);
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

 
  if (!email || !password) {
    return sendResponse(res, "All fields required");
  }

 
  if (email === "admin@gmail.com" && password === "1234") {
    return sendResponse(res, "Login Success");
  } else {
    return sendResponse(res, "Invalid Credentials");
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});