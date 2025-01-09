const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;
app.get("api/users", (req, res) => {
  res.json(users);
});

app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>`;
  res.send(html);
});

app.route("/api/users/:id").get((req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: 200 });
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
