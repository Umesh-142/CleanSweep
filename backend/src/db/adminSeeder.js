import { Admin } from "../models/admin.model.js";
import argon2 from "argon2";

const seedAdmin = async () => {
  try {
    await Admin.deleteMany(); // Clear existing

    const admin = await Admin.create({
      username: "cleanadmin",
      password: await argon2.hash("admin@123"),
      city: "Indore", // Default city
    });

    console.log("Admin seeded:", admin.username);
  } catch (error) {
    console.error("Admin seeding failed:", error);
  }
};

export default seedAdmin;
