const { executeQuery } = require("../config/db");

const employeeController = {
  //get all users
  getAllEmployee: async (req, res) => {
    const query = `SELECT * FROM employee`;
    try {
      const result = await executeQuery(query);
      res.status(200).json({
        status_code: 200,
        data: {
          employees: result || [],
        },
        message: "",
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
  //
  createEmployee: async (req, res) => {
    const { emp_name, emp_mail, emp_designation, emp_joining_date } = req.body;

    if (!emp_name || !emp_mail || !emp_designation || !emp_joining_date) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    try {
      // Check if employee email already exists
      const checkQuery = `SELECT COUNT(*) AS count FROM Employee WHERE emp_mail = ?`;
      const checkValues = [emp_mail];
      const [existingEmployee] = await executeQuery(checkQuery, checkValues);

      if (existingEmployee && existingEmployee.count > 0) {
        // Employee email already exists
        return res.status(409).json({
          success: false,
          status_code: 409,
          message: "Employee already exists",
        });
      }

      // Insert new employee
      const insertQuery = `
        INSERT INTO Employee (emp_name, emp_mail, emp_designation, emp_joining_date) 
        VALUES (?, ?, ?, ?)
      `;
      const insertValues = [
        emp_name,
        emp_mail,
        emp_designation,
        emp_joining_date,
      ];

      await executeQuery(insertQuery, insertValues);
      return res
        .status(201)
        .json({ status_code: 201, message: "Employee created successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },

  //
};
module.exports = employeeController;
