// import { Complaint } from "../models/complaint.model.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// // Get all complaints with user details
// export const getAllComplaints = async (req, res) => {
//   try {
//     const complaints = await Complaint.find()
//       .populate("createdBy", "fullName email Area")
//       .sort({ createdAt: -1 });

//     res.json(new ApiResponse(200, complaints));
//   } catch (error) {
//     res.status(500).json(new ApiResponse(500, null, error.message));
//   }
// };

// // Update complaint status
// export const updateComplaintStatus = async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;

//   if (!["pending", "inProgress", "resolved"].includes(status)) {
//     return res.status(400).json(new ApiResponse(400, null, "Invalid status"));
//   }

//   const updated = await Complaint.findByIdAndUpdate(
//     id,
//     { status },
//     { new: true },
//   );

//   res.json(new ApiResponse(200, updated, "Status updated"));
// };

// // Area-wise stats (reuse existing logic)
// export const getAreaStats = async (req, res) => {
//   const { area } = req.query;
//   // ... same as user area stats
// };

import { Complaint } from "../models/complaint.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

// Get all complaints with filters and sorting
export const getAllComplaints = async (req, res) => {
  try {
    const { status, category, area, sort = 'desc' } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (area) filter.Area = area;

    // Sort options
    const sortOptions = { createdAt: sort === 'asc' ? 1 : -1 };

    const complaints = await Complaint.find(filter)
      .populate('createdBy', 'fullName email')
      .sort(sortOptions)
      .lean();

    // Add Google Maps link
    const complaintsWithLocation = complaints.map(complaint => ({
      ...complaint,
      locationLink: `https://www.google.com/maps?q=${complaint.latitude},${complaint.longitude}`
    }));

    return res.status(200).json(
      new ApiResponse(200, complaintsWithLocation, "Complaints fetched successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new ApiResponse(500, null, error.message)
    );
  }
};

// Get single complaint details
export const getComplaintDetails = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('createdBy', 'fullName email phone Area');

    if (!complaint) {
      return res.status(404).json(
        new ApiResponse(404, null, "Complaint not found")
      );
    }

    // Add Google Maps link
    const complaintWithLocation = {
      ...complaint.toObject(),
      locationLink: `https://www.google.com/maps?q=${complaint.latitude},${complaint.longitude}`
    };

    return res.status(200).json(
      new ApiResponse(200, complaintWithLocation, "Complaint details fetched")
    );
  } catch (error) {
    return res.status(500).json(
      new ApiResponse(500, null, error.message)
    );
  }
};

// Update complaint status
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'inProgress', 'resolved'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json(
        new ApiResponse(400, null, "Invalid status value")
      );
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('createdBy', 'fullName');

    return res.status(200).json(
      new ApiResponse(200, updatedComplaint, "Status updated successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new ApiResponse(500, null, error.message)
    );
  }
};

// Get filter options
export const getFilterOptions = async (req, res) => {
  try {
    const areas = await Complaint.distinct("Area");
    const categories = await Complaint.distinct("category");
    const statuses = ['pending', 'inProgress', 'resolved'];

    return res.status(200).json(
      new ApiResponse(200, { areas, categories, statuses }, "Filter options fetched")
    );
  } catch (error) {
    return res.status(500).json(
      new ApiResponse(500, null, error.message)
    );
  }
};