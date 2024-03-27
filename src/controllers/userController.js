// const { executeQuery } = require("../config/db");

// const userController = {
//   //get all users

//   getAllUsers: async (req, res) => {
//     const query = `SELECT * FROM USERS`;
//     try {
//       const result = await executeQuery(query);
//       res.status(200).json({
//         status_code: 200,
//         data: {
//           users: result || [],
//         },
//         message: "",
//       });
//     } catch (error) {
//       console.log(error);
//       res
//         .status(500)
//         .json({ success: false, message: "Internal Server Error" });
//     }
//   },
// };
// module.exports = userController;
