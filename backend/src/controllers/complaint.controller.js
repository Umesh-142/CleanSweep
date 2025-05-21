// import { asyncHandler } from "../utils/asyncHandler.js";
// import { Apierror } from "../utils/apiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { Complaint } from "../models/complaint.model.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";

// const createComplaint = asyncHandler(async (req, res) => {
//   console.log("Hello User");

//   const { title, description, latitude, longitude, category } = req.body;

//   if (!title || !description || !latitude || !longitude || !category) {
//     throw new Apierror(400, "All fields are required");
//   }

//   if (!req.file) {
//     throw new Apierror(400, "Complaint photo is required");
//   }

//   const photoLocalPath = req.file?.path;
//   const photo = await uploadOnCloudinary(photoLocalPath);

//   if (!photo) {
//     throw new Apierror(400, "Error uploading photo");
//   }

//   const complaint = await Complaint.create({
//     title,
//     description,
//     latitude,
//     longitude,
//     photo: photo.url,
//     category,
//     createdBy: req.user._id,
//   });

//   return res
//     .status(201)
//     .json(new ApiResponse(200, complaint, "Complaint created successfully"));
// });

// const getComplaints = asyncHandler(async (req, res) => {
//   const complaints = await Complaint.find({ createdBy: req.user._id }).sort({
//     createdAt: -1,
//   });
//   return res
//     .status(200)
//     .json(new ApiResponse(200, complaints, "Complaints fetched successfully"));
// });

// const getComplaintStats = asyncHandler(async (req, res) => {
//   const stats = await Complaint.aggregate([
//     { $match: { createdBy: req.user._id } },
//     {
//       $group: {
//         _id: null,
//         total: { $sum: 1 },
//         resolved: {
//           $sum: {
//             $cond: [{ $eq: ["$status", "resolved"] }, 1, 0],
//           },
//         },
//         pending: {
//           $sum: {
//             $cond: [{ $ne: ["$status", "resolved"] }, 1, 0],
//           },
//         },
//       },
//     },
//     {
//       $project: { _id: 0, totalComplaints: "$total", resolved: 1, pending: 1 },
//     },
//   ]);

//   const result = stats[0] || { totalComplaints: 0, resolved: 0, pending: 0 };

//   return res
//     .status(200)
//     .json(new ApiResponse(200, result, "Complaint stats fetched successfully"));
// });

// const getUserComplaints = asyncHandler(async (req, res) => {
//   const { limit = 5 } = req.query;

//   const complaints = await Complaint.find({ createdBy: req.user._id })
//     .sort({ createdAt: -1 })
//     .limit(parseInt(limit));

//   return res
//     .status(200)
//     .json(new ApiResponse(200, complaints, "Complaints fetched successfully"));
// });

// export { createComplaint, getComplaints, getComplaintStats, getUserComplaints };

import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Complaint } from "../models/complaint.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createComplaint = asyncHandler(async (req, res) => {
  // Validate required fields
  const { title, description, latitude, longitude, category, Area } = req.body;
  if (!title || !description || !latitude || !longitude || !category) {
    throw new Apierror(400, "All fields are required");
  }

  // Validate photo
  if (!req.file) {
    throw new Apierror(400, "Complaint photo is required");
  }

  // Validate file type
  const validMimeTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!validMimeTypes.includes(req.file.mimetype)) {
    throw new Apierror(400, "Only JPEG, PNG, or WEBP images are allowed");
  }

  // Upload to Cloudinary
  const photoLocalPath = req.file.path;
  const photo = await uploadOnCloudinary(photoLocalPath);
  if (!photo) {
    throw new Apierror(500, "Failed to upload photo to Cloudinary");
  }

  // Create complaint with default status
  const complaint = await Complaint.create({
    title,
    description,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    photo: photo.url,
    category,
    Area,
    status: "pending", // Explicit default status
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, complaint, "Complaint created successfully"));
});

const getComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ createdBy: req.user._id })
    .sort({ createdAt: -1 })
    .select("-__v"); // Exclude version key

  if (!complaints.length) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No complaints found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, complaints, "Complaints fetched successfully"));
});

const getComplaintStats = asyncHandler(async (req, res) => {
  const stats = await Complaint.aggregate([
    {
      $match: {
        createdBy: req.user._id,
        // Optional: Add timeframe filter if needed
        // createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        resolved: {
          $sum: { $cond: [{ $eq: ["$status", "resolved"] }, 1, 0] },
        },
        inProgress: {
          $sum: { $cond: [{ $eq: ["$status", "inProgress"] }, 1, 0] },
        },
        pending: {
          $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
        resolved: 1,
        pending: 1,
        inProgress: 1,
        // Optional: Add percentage calculations
        resolvedPercentage: {
          $round: [
            { $multiply: [{ $divide: ["$resolved", "$total"] }, 100] },
            2,
          ],
        },
      },
    },
  ]);

  const result = stats[0] || {
    total: 0,
    resolved: 0,
    pending: 0,
    inProgress: 0,
    resolvedPercentage: 0,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Complaint stats fetched successfully"));
});

const getUserComplaints = asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit)) || 5;
  const complaints = await Complaint.find({ createdBy: req.user._id })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("-__v");

  return res
    .status(200)
    .json(new ApiResponse(200, complaints, "Complaints fetched successfully"));
});

const getComplaintsByArea = asyncHandler(async (req, res) => {
  const { area } = req.body;
  if (!area) {
    return res.status(400).json(new ApiResponse(400, null, "Area is required"));
  }

  const complaints = await Complaint.find({ Area: area })
    .sort({ createdAt: -1 })
    .select("-__v");

  if (!complaints.length) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], `No complaints found for area: ${area}`));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, complaints, "Complaints fetched successfully"));
});

const getAreaComplaintStats = asyncHandler(async (req, res) => {
  const { area } = req.body;

  // Validate input
  if (!area) {
    throw new Apierror(400, "Area parameter is required");
  }

  // Aggregation pipeline for comprehensive stats
  const stats = await Complaint.aggregate([
    {
      $match: {
        Area: area,
        // Optional: filter by organization/tenant if multi-tenant
        // organization: req.user.organization
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        resolved: {
          $sum: {
            $cond: [{ $eq: ["$status", "resolved"] }, 1, 0],
          },
        },
        pending: {
          $sum: {
            $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
          },
        },
        inProgress: {
          $sum: {
            $cond: [{ $eq: ["$status", "inProgress"] }, 1, 0],
          },
        },
        recentComplaints: {
          $push: {
            id: "$_id",
            title: "$title",
            status: "$status",
            createdAt: "$createdAt",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        area: 1,
        total: 1,
        resolved: 1,
        pending: 1,
        inProgress: 1,
        recentComplaints: {
          $slice: ["$recentComplaints", 5], // Get 5 most recent
        },
      },
    },
  ]);

  // Handle no results
  if (stats.length === 0) {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          total: 0,
          resolved: 0,
          pending: 0,
          inProgress: 0,
          recentComplaints: [],
        },
        `No complaints found for area: ${area}`,
      ),
    );
  }

  // Return formatted response
  return res
    .status(200)
    .json(
      new ApiResponse(200, stats[0], "Area statistics fetched successfully"),
    );
});

const getAllComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $addFields: {
        location: {
          lat: "$latitude",
          long: "$longitude",
        },
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        status: 1,
        createdAt: 1,
        location: 1,
      },
    },
  ]);

  if (!complaints.length) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No complaints found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, complaints, "Complaints fetched successfully"));
});

const getForAdmin = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({})
    .sort({ createdAt: -1 })
    .select("-__v"); // Exclude version key

  if (!complaints.length) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No complaints found"));
  }
  
  return res
    .status(200)
    .json(new ApiResponse(200, complaints, "Complaints fetched successfully"));
});

export {
  createComplaint,
  getComplaints,
  getComplaintStats,
  getUserComplaints,
  getComplaintsByArea,
  getAreaComplaintStats,
  getAllComplaints,
  getForAdmin,
};
