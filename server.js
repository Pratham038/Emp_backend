const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/config/db");
const employeeRoutes = require("./src/routes/employeeRoutes");

const cors = require("cors");
const app = express();

const port = process.env.APP_PORT;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", employeeRoutes);

// app.use('/api', authenticateToken);
// app.use('/api/users', checkUserRole('admin'));

app.get("/", (req, res) => {
  res.send("Hello, Employee Management System!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
