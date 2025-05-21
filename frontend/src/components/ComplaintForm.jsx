// import React, { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { api } from "../lib/api";

// const ComplaintForm = ({ onSubmit }) => {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     latitude: "",
//     longitude: "",
//     category: "infrastructure",
//   });
//   const [photo, setPhoto] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePhotoChange = (e) => {
//     setPhoto(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("description", formData.description);
//       formDataToSend.append("latitude", formData.latitude);
//       formDataToSend.append("longitude", formData.longitude);
//       formDataToSend.append("category", formData.category);
//       formDataToSend.append("photo", photo);

//       const response = await api.post("/users/complaints", formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       onSubmit(response.data.data);
//       setFormData({
//         title: "",
//         description: "",
//         latitude: "",
//         longitude: "",
//         category: "infrastructure",
//       });
//       setPhoto(null);
//     } catch (error) {
//       console.error("Error submitting complaint:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md border border-green-400">
//       <h2 className="text-xl font-bold mb-3 text-green-600 text-center">
//         File a Complaint
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <div>
//           <label
//             className="block text-green-700 font-medium mb-1"
//             htmlFor="title"
//           >
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full p-2 border border-green-400 rounded focus:ring-2 focus:ring-green-500"
//             required
//           />
//         </div>

//         <div>
//           <label
//             className="block text-green-700 font-medium mb-1"
//             htmlFor="description"
//           >
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border border-green-400 rounded focus:ring-2 focus:ring-green-500"
//             rows="3"
//             required
//           />
//         </div>

//         <div>
//           <label
//             className="block text-green-700 font-medium mb-1"
//             htmlFor="latitude"
//           >
//             Latitude
//           </label>
//           <input
//             type="number"
//             id="latitude"
//             name="latitude"
//             value={formData.latitude}
//             onChange={handleChange}
//             className="w-full p-2 border border-green-400 rounded focus:ring-2 focus:ring-green-500"
//             required
//             step="any"
//           />
//         </div>

//         <div>
//           <label
//             className="block text-green-700 font-medium mb-1"
//             htmlFor="longitude"
//           >
//             Longitude
//           </label>
//           <input
//             type="number"
//             id="longitude"
//             name="longitude"
//             value={formData.longitude}
//             onChange={handleChange}
//             className="w-full p-2 border border-green-400 rounded focus:ring-2 focus:ring-green-500"
//             required
//             step="any"
//           />
//         </div>

//         <div>
//           <label
//             className="block text-green-700 font-medium mb-1"
//             htmlFor="category"
//           >
//             Category
//           </label>
//           <select
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full p-2 border border-green-400 rounded focus:ring-2 focus:ring-green-500"
//             required
//           >
//             <option value="infrastructure">Infrastructure</option>
//             <option value="sanitation">Sanitation</option>
//             <option value="safety">Safety</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label
//             className="block text-green-700 font-medium mb-1"
//             htmlFor="photo"
//           >
//             Photo Evidence
//           </label>
//           <input
//             type="file"
//             id="photo"
//             name="photo"
//             onChange={handlePhotoChange}
//             className="w-full p-2 border border-green-400 rounded focus:ring-2 focus:ring-green-500"
//             accept="image/*"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white font-semibold p-2 rounded-lg hover:bg-green-600 disabled:bg-green-300 transition-all"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Submitting..." : "Submit Complaint"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ComplaintForm;

// import React, { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { api } from "../lib/api";
// import { LogIn } from "lucide-react";

// const ComplaintForm = ({ onSubmit, onCancel }) => {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     latitude: "",
//     longitude: "",
//     category: "infrastructure",
//   });
//   const [photo, setPhoto] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [locationStatus, setLocationStatus] = useState("pending"); // pending, success, error
//   const [address, setAddress] = useState("");
//   const [locationError, setLocationError] = useState("");

//   // Fetch user's location and address
//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         if (!navigator.geolocation) {
//           throw new Error("Geolocation is not supported by your browser");
//         }

//         const position = await new Promise((resolve, reject) => {
//           navigator.geolocation.getCurrentPosition(resolve, reject, {
//             enableHighAccuracy: true,
//             timeout: 10000,
//             maximumAge: 0,
//           });
//         });

//         const { latitude, longitude } = position.coords;
//         setFormData((prev) => ({ ...prev, latitude, longitude }));

//         // Fetch address using PositionStack API
//         try {
//           const response = await fetch(
//             `http://api.positionstack.com/v1/reverse?access_key=fa0600145502aedfc82ab528967307c8&query=${latitude},${longitude}`
//           );
//           const data = await response.json();

//           if (data.data && data.data.length > 0) {
//             setAddress(data.data[0].label);
//             console.log(data);
//           } else {
//             setAddress("Address details not available");
//           }
//           setLocationStatus("success");
//         } catch (err) {
//           console.error("Address fetch error:", err);
//           setAddress("Approximate location only");
//           setLocationStatus("success"); // We still have coords even if address fails
//         }
//       } catch (error) {
//         console.error("Location error:", error);
//         setLocationError(error.message);
//         setLocationStatus("error");
//       }
//     };

//     fetchLocation();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handlePhotoChange = (e) => {
//     setPhoto(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (locationStatus !== "success") {
//       setLocationError("Please enable location services to submit a complaint");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("description", formData.description);
//       formDataToSend.append("latitude", formData.latitude);
//       formDataToSend.append("longitude", formData.longitude);
//       formDataToSend.append("category", formData.category);
//       if (photo) formDataToSend.append("photo", photo);

//       const response = await api.post("/users/complaints", formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       onSubmit(response.data.data);
//       setFormData({
//         title: "",
//         description: "",
//         latitude: "",
//         longitude: "",
//         category: "infrastructure",
//       });
//       setPhoto(null);
//     } catch (error) {
//       console.error("Error submitting complaint:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-green-100">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-green-700">File a Complaint</h2>
//         <button
//           onClick={onCancel}
//           className="text-gray-500 hover:text-gray-700"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Location Information */}
//         <div className="bg-green-50 p-4 rounded-lg border border-green-200">
//           <h3 className="font-medium text-green-700 mb-2 flex items-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 mr-2"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             Your Location
//           </h3>

//           {locationStatus === "pending" && (
//             <div className="flex items-center text-gray-600">
//               <svg
//                 className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-500"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Detecting your location...
//             </div>
//           )}

//           {locationStatus === "success" && (
//             <div>
//               <p className="text-sm text-gray-700">{address}</p>
//               <a
//                 href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-xs text-green-600 hover:underline mt-1 inline-block"
//               >
//                 View on map
//               </a>
//             </div>
//           )}

//           {locationStatus === "error" && (
//             <div className="text-red-500 text-sm">
//               <p>Could not detect your location: {locationError}</p>
//               <p className="mt-1">
//                 Please enable location services to file a complaint.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Complaint Form Fields */}
//         <div>
//           <label
//             className="block text-sm font-medium text-gray-700 mb-1"
//             htmlFor="title"
//           >
//             Complaint Title*
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             placeholder="Brief description of the issue"
//             required
//           />
//         </div>

//         <div>
//           <label
//             className="block text-sm font-medium text-gray-700 mb-1"
//             htmlFor="description"
//           >
//             Detailed Description*
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             rows="4"
//             placeholder="Please describe the issue in detail..."
//             required
//           />
//         </div>

//         <div>
//           <label
//             className="block text-sm font-medium text-gray-700 mb-1"
//             htmlFor="category"
//           >
//             Category*
//           </label>
//           <select
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
//             required
//           >
//             <option value="infrastructure">
//               Infrastructure (roads, bridges, etc.)
//             </option>
//             <option value="sanitation">
//               Sanitation (garbage, sewage, etc.)
//             </option>
//             <option value="safety">
//               Safety (street lights, hazards, etc.)
//             </option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label
//             className="block text-sm font-medium text-gray-700 mb-1"
//             htmlFor="photo"
//           >
//             Photo Evidence*
//           </label>
//           <div className="mt-1 flex items-center">
//             <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
//               {photo ? photo.name : "Choose a photo"}
//               <input
//                 type="file"
//                 id="photo"
//                 name="photo"
//                 onChange={handlePhotoChange}
//                 className="sr-only"
//                 accept="image/*"
//                 required
//               />
//             </label>
//             {photo && (
//               <button
//                 type="button"
//                 onClick={() => setPhoto(null)}
//                 className="ml-2 text-red-500 hover:text-red-700"
//               >
//                 Remove
//               </button>
//             )}
//           </div>
//           <p className="mt-1 text-xs text-gray-500">
//             Upload a clear photo of the issue (JPEG, PNG)
//           </p>
//         </div>

//         <div className="pt-2">
//           <button
//             type="submit"
//             disabled={isSubmitting || locationStatus !== "success"}
//             className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//               isSubmitting || locationStatus !== "success"
//                 ? "bg-green-300 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//             }`}
//           >
//             {isSubmitting ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Submitting...
//               </>
//             ) : (
//               "Submit Complaint"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ComplaintForm;

import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../lib/api";

const ComplaintForm = ({ onSubmit, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    category: "infrastructure",
    Area: "",
  });

  const [customCategory, setCustomCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationStatus, setLocationStatus] = useState("pending");
  const [address, setAddress] = useState("");
  const [locationError, setLocationError] = useState("");

  const areaOptions = [
    "Vijay Nagar",
    "Palasia",
    "Mahalaxmi Nagar",
    "Nipania",
    "Bengali Square",
    "LIG Colony",
    "Navlakha",
    "Vidur Nagar",
    "Chandan Nagar",
    "Super Corridor",
    "other",
  ];

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       if (!navigator.geolocation)
  //         throw new Error("Geolocation not supported");
  //       const position = await new Promise((resolve, reject) =>
  //         navigator.geolocation.getCurrentPosition(resolve, reject, {
  //           enableHighAccuracy: true,
  //           timeout: 10000,
  //           maximumAge: 0,
  //         })
  //       );
  //       console.log(position);

  //       const { latitude, longitude } = position.coords;
  //       setFormData((prev) => ({ ...prev, latitude, longitude }));

  //       try {
  //         const response = await fetch(
  //           `http://api.positionstack.com/v1/reverse?access_key=b77f3ab4b46c74885888441b00b1cf06&query=${latitude},${longitude}`
  //         );
  //         const data = await response.json();
  //         if (data.data && data.data.length > 0) {
  //           setAddress(data.data[0].label);
  //         } else {
  //           setAddress("Address details not available");
  //         }
  //         setLocationStatus("success");
  //       } catch {
  //         setAddress("Approximate location only");
  //         setLocationStatus("success");
  //       }
  //     } catch (error) {
  //       setLocationError(error.message);
  //       setLocationStatus("error");
  //     }
  //   };

  //   fetchLocation();
  // }, []);
  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchLocation = async () => {
      try {
        if (!navigator.geolocation)
          throw new Error("Geolocation not supported");

        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          })
        );

        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({ ...prev, latitude, longitude }));

        const startTime = Date.now();

        try {
          const response = await fetch(
            `http://api.positionstack.com/v1/reverse?access_key=b77f3ab4b46c74885888441b00b1cf06&query=${latitude},${longitude}`
          );

          const data = await response.json();

          const elapsed = Date.now() - startTime;
          if (elapsed < 10000) {
            await delay(10000 - elapsed); // Enforce 10s minimum
          }

          if (data.data && data.data.length > 0) {
            setAddress(data.data[0].label);
          } else {
            setAddress("Address details not available");
          }

          setLocationStatus("success");
        } catch {
          const elapsed = Date.now() - startTime;
          if (elapsed < 10000) {
            await delay(10000 - elapsed);
          }

          setAddress("Approximate location only");
          setLocationStatus("success");
        }
      } catch (error) {
        setLocationError(error.message);
        setLocationStatus("error");
      }
    };

    fetchLocation();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (locationStatus !== "success") {
      setLocationError("Please enable location services to submit a complaint");
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("latitude", formData.latitude);
      formDataToSend.append("longitude", formData.longitude);
      formDataToSend.append("Area", formData.Area);
      formDataToSend.append(
        "category",
        formData.category === "other" ? customCategory : formData.category
      );
      if (photo) formDataToSend.append("photo", photo);

      const response = await api.post("/users/complaints", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSubmit(response.data.data);
      setFormData({
        title: "",
        description: "",
        latitude: "",
        longitude: "",
        category: "infrastructure",
        Area: "",
      });
      setPhoto(null);
      setCustomCategory("");
    } catch (error) {
      console.error("Error submitting complaint:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-green-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-700">File a Complaint</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Location */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-medium text-green-700 mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            Your Location
          </h3>
          {locationStatus === "pending" && (
            <div className="text-gray-600 flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Detecting your location...
            </div>
          )}
          {locationStatus === "success" && (
            <div>
              <p className="text-sm text-gray-700">{address}</p>
              <a
                href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green-600 hover:underline mt-1 inline-block"
              >
                View on map
              </a>
            </div>
          )}
          {locationStatus === "error" && (
            <div className="text-red-500 text-sm">
              <p>Could not detect your location: {locationError}</p>
              <p className="mt-1">
                Please enable location services to file a complaint.
              </p>
            </div>
          )}
        </div>

        {/* Area Dropdown */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="Area"
          >
            Select Area*
          </label>
          <select
            id="Area"
            name="Area"
            value={formData.Area}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">-- Select Area --</option>
            {areaOptions.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="title"
          >
            Complaint Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Brief description of the issue"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="description"
          >
            Detailed Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Please describe the issue in detail..."
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Category */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="category"
          >
            Category*
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => {
              handleChange(e);
              if (e.target.value === "other") setCustomCategory("");
            }}
            required
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="infrastructure">
              Infrastructure (roads, bridges, etc.)
            </option>
            <option value="sanitation">
              Sanitation (garbage, sewage, etc.)
            </option>
            <option value="safety">
              Safety (street lights, hazards, etc.)
            </option>
            <option value="other">Other</option>
          </select>
          {formData.category === "other" && (
            <input
              type="text"
              placeholder="Enter custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              required
              className="mt-2 w-full px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="photo"
          >
            Photo Evidence*
          </label>
          <div className="mt-1 flex items-center">
            <label className="cursor-pointer bg-white py-2 px-3 border rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
              {photo ? photo.name : "Choose a photo"}
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handlePhotoChange}
                className="sr-only"
                accept="image/*"
                required
              />
            </label>
            {photo && (
              <button
                type="button"
                onClick={() => setPhoto(null)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Upload a clear photo of the issue (JPEG, PNG)
          </p>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || locationStatus !== "success"}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting || locationStatus !== "success"
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Complaint"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;
