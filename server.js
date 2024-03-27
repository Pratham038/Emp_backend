const express = require("express");
const bodyParser = require("body-parser");
const db = require("../server/src/config/db");
// const userRoutes = require("./src/routes/userRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes");

// const authRoutes = require("./src/routes/authRoutes");
const cors = require("cors");
// const { authenticateToken } = require("./src/middleware/userAuthentication");
// const { checkUserRole } = require("./src/middleware/userAuthorization");
const app = express();

const port = process.env.APP_PORT;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
// app.use("/api", userRoutes);
// app.use("/api", authRoutes);
app.use("/api", employeeRoutes);

// app.use('/api', authenticateToken);
// app.use('/api/users', checkUserRole('admin'));

app.get("/", (req, res) => {
  res.send("Hello, Employee Management System!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
