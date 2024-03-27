const express = require("express");
const employeeController = require("../controllers/employeeController");

const router = express.Router();

router.get("/employee", employeeController.getAllEmployee);
router.post("/employee", employeeController.createEmployee);

module.exports = router;
