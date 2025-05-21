import express from "express";
import { verifyAdmin } from "../middleware/adminAuth.js";
import {
  getAllComplaints,
  updateComplaintStatus,
  getAreaStats,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Admin Login (No auth required)
router.post("/login", async (req, res) => {
  const { username, password, city } = req.body;

  // Hardcoded verification
  if (
    username !== "cleanadmin" ||
    password !== "admin@123" ||
    city !== "Indore"
  ) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate token
  const token = jwt.sign(
    { username, role: "admin" },
    process.env.ADMIN_JWT_SECRET,
    { expiresIn: "8h" },
  );

  res.json({ token });
});

// Protected routes
router.get("/complaints", verifyAdmin, getAllComplaints);
router.patch("/complaints/:id/status", verifyAdmin, updateComplaintStatus);
router.get("/stats/area", verifyAdmin, getAreaStats);

export default router;
