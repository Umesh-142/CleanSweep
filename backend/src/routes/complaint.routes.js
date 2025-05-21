// import express from "express";
// import { verifyJWT } from "../middleware/auth.middleware.js";
// import {
//   createComplaint,
//   getComplaints,
// } from "../controllers/complaint.controller.js";
// import { upload } from "../middleware/multer.middleware.js";

// const Complaintrouter = express.Router();

// Complaintrouter.use(verifyJWT);

// Complaintrouter.route("/complaints").post(
//   upload.single("photo"),
//   createComplaint,
// );
// export default Complaintrouter;

// import express from "express";
// import { verifyJWT } from "../middleware/auth.middleware.js";
// import {
//   createComplaint,
//   getComplaints,
//   getComplaintStats,
//   getUserComplaints,
// } from "../controllers/complaint.controller.js";
// import { upload } from "../middleware/multer.middleware.js";

// const Complaintrouter = express.Router();

// Complaintrouter.use(verifyJWT);

// Complaintrouter.route("/complaints")
//   .post(upload.single("photo"), createComplaint)
//   .get(getComplaints);

// // Complaintrouter.route("/mycomplaints").get(getComplaints);
// Complaintrouter.route("/stats").get(getComplaintStats);
// Complaintrouter.route("/user").get(getUserComplaints);

// export default Complaintrouter;

import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createComplaint,
  getComplaints,
  getComplaintStats,
  getUserComplaints,
  getComplaintsByArea,
  getAreaComplaintStats,
  getAllComplaints,
  getForAdmin,
} from "../controllers/complaint.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const Complaintrouter = express.Router();

// Apply JWT verification to all complaint routes
Complaintrouter.use(verifyJWT);

// Main complaints endpoint
Complaintrouter.route("/complaints").post(
  upload.single("photo"), // Handle single file upload
  createComplaint,
);

// Statistics endpoint
Complaintrouter.route("/stats").get(getComplaintStats);

// User-specific complaints with limit
Complaintrouter.route("/getcomplaint").get(getUserComplaints);

Complaintrouter.route("/getme").get(getComplaints);

Complaintrouter.route("/getcomplaintsByArea").get(getComplaintsByArea);

Complaintrouter.route("/getAreaStats").post(getAreaComplaintStats);

Complaintrouter.route("/getAllComplaints").get(getAllComplaints);

Complaintrouter.route("/getForAdmin").get(getForAdmin);

export default Complaintrouter;
