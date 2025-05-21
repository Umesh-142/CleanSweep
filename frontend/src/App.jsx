// "use client";

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { AuthProvider, useAuth } from "./contexts/AuthContext";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import VerifyPage from "./pages/VerifyPage";
// import DashboardPage from "./pages/DashboardPage";
// import ComplaintsPage from "./pages/ComplaintsPage";
// import "./index.css";

// // Protected route component
// const ProtectedRoute = ({ children }) => {
//   const { user, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         Loading...
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/verify" element={<VerifyPage />} />
//         </Routes>
//         <Toaster position="top-right" />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// "use client";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { AuthProvider, useAuth } from "./contexts/AuthContext";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import VerifyPage from "./pages/VerifyPage";
// import DashboardPage from "./pages/dashboard/DashboardPage";
// import ComplaintsPage from "./pages/dashboard/ComplaintsPage";
// import AreaStatusPage from "./pages/dashboard/AreaStatusPage";
// import "./index.css";
// import Complaints3DMap from "./pages/Complaints3DMap";

// // Protected route component
// const ProtectedRoute = ({ children }) => {
//   const { user, isLoading } = useAuth();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// // Public-only route component
// const PublicRoute = ({ children }) => {
//   const { user } = useAuth();
//   return user ? <Navigate to="/dashboard" /> : children;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public routes */}
//           <Route
//             path="/"
//             element={
//               <PublicRoute>
//                 <HomePage />
//               </PublicRoute>
//             }
//           />
//           <Route
//             path="/login"
//             element={
//               <PublicRoute>
//                 <LoginPage />
//               </PublicRoute>
//             }
//           />
//           <Route
//             path="/register"
//             element={
//               <PublicRoute>
//                 <RegisterPage />
//               </PublicRoute>
//             }
//           />
//           <Route
//             path="/verify"
//             element={
//               <PublicRoute>
//                 <VerifyPage />
//               </PublicRoute>
//             }
//           />

//           {/* Protected routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute>
//                 <DashboardPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/dashboard/complaints"
//             element={
//               <ProtectedRoute>
//                 <ComplaintsPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/dashboard/area-status"
//             element={
//               <ProtectedRoute>
//                 <AreaStatusPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/dashboard/map"
//             element={
//               <ProtectedRoute>
//                 <Complaints3DMap />
//               </ProtectedRoute>
//             }
//           />

//           {/* Fallback route */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             success: {
//               style: {
//                 background: "#4CAF50",
//                 color: "white",
//               },
//             },
//             error: {
//               style: {
//                 background: "#F44336",
//                 color: "white",
//               },
//             },
//           }}
//         />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Logout from "./components/dashboard/Logout";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ComplaintsPage from "./pages/dashboard/ComplaintsPage";
import AreaStatusPage from "./pages/dashboard/AreaStatusPage";
import "./index.css";
import Complaints3DMap from "./pages/Complaints3DMap";

// Add these imports
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { Import } from "lucide-react";

// Original ProtectedRoute (for regular users)
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// New AdminProtectedRoute (simple version)
const AdminProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerifyPage />} />

          {/* New admin login route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* User protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/complaints"
            element={
              <ProtectedRoute>
                <ComplaintsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/area-status"
            element={
              <ProtectedRoute>
                <AreaStatusPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/dashboard/logout"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* New admin protected route */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
