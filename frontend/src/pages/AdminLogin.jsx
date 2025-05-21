// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../lib/api";
// import { toast } from "react-hot-toast";

// export default function AdminLogin() {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     city: "Indore",
//   });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.post("/admin/login", formData);
//       localStorage.setItem("adminToken", data.token);
//       navigate("/admin/dashboard");
//       toast.success("Login successful");
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Admin Portal</h2>

//         <div className="space-y-4">
//           <input
//             type="text"
//             placeholder="Username"
//             value={formData.username}
//             onChange={(e) =>
//               setFormData({ ...formData, username: e.target.value })
//             }
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//             className="w-full p-2 border rounded"
//             required
//           />
//           <select
//             value={formData.city}
//             onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//             className="w-full p-2 border rounded"
//           >
//             <option value="Indore">Indore</option>
//             <option value="Bhopal">Bhopal</option>
//           </select>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    if (
      formData.username === "cleanadmin" &&
      formData.password === "admin@123"
    ) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
      toast.success("Admin login successful");
    } else {
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
