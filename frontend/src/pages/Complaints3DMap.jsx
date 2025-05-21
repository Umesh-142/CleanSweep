// import React, { useEffect, useRef, useState } from "react";
// import { useAuth } from "../contexts/AuthContext.jsx";
// import { api } from "../lib/api.js";
// import LoadingSpinner from "../components/shared/LoadingSpinner.jsx";

// // Load Cesium CSS dynamically
// const loadCesiumCSS = () => {
//   const link = document.createElement("link");
//   link.href =
//     "https://cesium.com/downloads/cesiumjs/releases/1.118/Build/Cesium/Widgets/widgets.css";
//   link.rel = "stylesheet";
//   document.head.appendChild(link);
// };

// const Complaints3DMap = () => {
//   const { user } = useAuth();
//   const cesiumContainerRef = useRef(null);
//   const viewerRef = useRef(null);
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Initialize Cesium
//   useEffect(() => {
//     loadCesiumCSS();

//     const script = document.createElement("script");
//     script.src =
//       "https://cesium.com/downloads/cesiumjs/releases/1.118/Build/Cesium/Cesium.js";
//     script.async = true;
//     script.onload = () => {
//       if (window.Cesium && cesiumContainerRef.current) {
//         initializeCesium();
//       } else {
//         console.error("Cesium failed to load.");
//       }
//     };
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//       if (viewerRef.current) {
//         viewerRef.current.destroy();
//       }
//     };
//   }, []);

//   // Fetch complaints
//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get("users/getAllComplaints");

//         setComplaints(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to load complaints");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComplaints();
//   }, []);

//   const initializeCesium = () => {
//     const Cesium = window.Cesium;

//     Cesium.Ion.defaultAccessToken =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MDg0ZWYzMS02OGRjLTRkMzItYjNmMi1jNGFlMDk4ZTFlMzQiLCJpZCI6MjkxMjY1LCJpYXQiOjE3NDM5MjMwNDJ9.KgMK63txKV7HBxmYYVlxQEnqFqaSWSA6R14_v-_3mNc";

//     viewerRef.current = new Cesium.Viewer(cesiumContainerRef.current, {
//       animation: false,
//       timeline: false,
//       geocoder: false,
//       homeButton: false,
//       sceneModePicker: false,
//       baseLayerPicker: false,
//       navigationHelpButton: false,
//       infoBox: true,
//       fullscreenButton: true,
//     });

//     const viewer = viewerRef.current;
//     viewer.scene.globe.enableLighting = true;
//     viewer.scene.fog.enabled = true;
//     viewer.scene.globe.depthTestAgainstTerrain = true;

//     viewer.camera.flyTo({
//       destination: Cesium.Cartesian3.fromDegrees(75.8577, 22.7177, 25000),
//       orientation: {
//         heading: 0.0,
//         pitch: Cesium.Math.toRadians(-60.0),
//         roll: 0.0,
//       },
//       duration: 3,
//     });
//   };

//   // Add complaint markers
//   useEffect(() => {
//     const Cesium = window.Cesium;
//     if (!Cesium || !viewerRef.current || complaints.length === 0) return;

//     const viewer = viewerRef.current;
//     viewer.entities.removeAll();

//     complaints.forEach((complaint) => {
//       console.log(complaint);

//       let markerColor;
//       switch (complaint.status) {
//         case "reported":
//           markerColor = Cesium.Color.RED;
//           break;
//         case "inProgress":
//           markerColor = Cesium.Color.YELLOW;
//           break;
//         case "resolved":
//           markerColor = Cesium.Color.LIME;
//           break;
//         default:
//           markerColor = Cesium.Color.GRAY;
//       }

//       viewer.entities.add({
//         id: complaint._id,
//         position: Cesium.Cartesian3.fromDegrees(
//           complaint.location.longitude,
//           complaint.location.latitude
//         ),
//         name: `${complaint.title} (${complaint.status})`,
//         description: `
//           <b>Title:</b> ${complaint.title}<br/>
//           <b>Status:</b> ${complaint.status}<br/>
//           <b>Description:</b> ${complaint.description}<br/>
//           <b>Location:</b> ${complaint.location.latitude.toFixed(
//             4
//           )}, ${complaint.location.longitude.toFixed(4)}<br/>
//           <b>Created:</b> ${new Date(complaint.createdAt).toLocaleString()}
//         `,
//         point: {
//           pixelSize: 24,
//           color: markerColor,
//           outlineColor: Cesium.Color.BLACK,
//           outlineWidth: 2,
//         },
//       });
//     });

//     viewer.zoomTo(viewer.entities);
//   }, [complaints]);

//   const handleComplaintClick = (complaintId) => {
//     const Cesium = window.Cesium;
//     if (viewerRef.current && Cesium) {
//       const entity = viewerRef.current.entities.getById(complaintId);
//       if (entity) {
//         viewerRef.current.flyTo(entity, { duration: 2.0 });
//         viewerRef.current.selectedEntity = entity;
//       }
//     }
//   };

//   if (loading) return <LoadingSpinner fullPage />;
//   if (error) return <div className="text-red-500 p-4">{error}</div>;

//   return (
//     <div className="relative w-full h-screen">
//       <div ref={cesiumContainerRef} className="w-full h-full" />

//       <div className="absolute top-4 left-4 w-80 max-h-[90%] bg-gray-800 bg-opacity-90 text-white p-4 rounded-lg shadow-xl z-10 overflow-y-auto">
//         <h2 className="text-xl font-bold mb-3 border-b border-gray-600 pb-2">
//           Cleanup Reports
//         </h2>
//         <ul className="space-y-2">
//           {complaints.map((complaint) => (
//             <li
//               key={complaint._id}
//               onClick={() => handleComplaintClick(complaint._id)}
//               className="p-3 bg-gray-700 bg-opacity-50 rounded cursor-pointer hover:bg-opacity-70 transition flex items-start gap-2"
//             >
//               <span
//                 className={`inline-block w-3 h-3 mt-1 rounded-full flex-shrink-0 ${
//                   complaint.status === "reported"
//                     ? "bg-red-500"
//                     : complaint.status === "inProgress"
//                     ? "bg-yellow-500"
//                     : "bg-green-500"
//                 }`}
//               />
//               <div>
//                 <h3 className="font-medium">{complaint.title}</h3>
//                 <p className="text-sm text-gray-300 line-clamp-1">
//                   {complaint.description}
//                 </p>
//                 <span className="text-xs text-gray-400">
//                   {new Date(complaint.createdAt).toLocaleDateString()}
//                 </span>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Complaints3DMap;

import React, { useEffect, useRef, useState } from "react";
import { api } from "../lib/api";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const Complaints3DMap = () => {
  const cesiumContainerRef = useRef(null);
  const viewerRef = useRef(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Enhanced container mounting check
  const ensureContainerReady = () => {
    return new Promise((resolve) => {
      const checkContainer = () => {
        if (cesiumContainerRef.current) {
          console.log(
            "Container element verified:",
            cesiumContainerRef.current
          );
          resolve(true);
        } else {
          console.warn("Container not ready, retrying...");
          setTimeout(checkContainer, 100);
        }
      };
      checkContainer();
    });
  };

  // 1. Load Cesium after ensuring container is ready
  useEffect(() => {
    let script;
    let link;
    let retryCount = 0;
    const maxRetries = 5;

    const initialize = async () => {
      try {
        console.log("Starting Cesium initialization...");

        // Wait for container to be ready
        const containerReady = await ensureContainerReady();
        if (!containerReady) {
          throw new Error("Failed to verify container after retries");
        }

        // Load CSS
        link = document.createElement("link");
        link.href =
          "https://cesium.com/downloads/cesiumjs/releases/1.118/Build/Cesium/Widgets/widgets.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        // Load JS
        script = document.createElement("script");
        script.src =
          "https://cesium.com/downloads/cesiumjs/releases/1.118/Build/Cesium/Cesium.js";

        script.onload = async () => {
          try {
            if (!window.Cesium) {
              throw new Error("Cesium global object not available");
            }

            console.log(
              "Creating Cesium viewer with container:",
              cesiumContainerRef.current
            );

            Cesium.Ion.defaultAccessToken = "your-cesium-token-here";
            viewerRef.current = new Cesium.Viewer(cesiumContainerRef.current, {
              animation: false,
              timeline: false,
              baseLayerPicker: false,
              shouldAnimate: true,
            });

            console.log("Setting initial view...");
            viewerRef.current.camera.flyTo({
              destination: Cesium.Cartesian3.fromDegrees(
                75.8577,
                22.7177,
                5000
              ),
              orientation: {
                heading: 0.0,
                pitch: Cesium.Math.toRadians(-60),
                roll: 0.0,
              },
              duration: 0,
            });

            fetchComplaints();
          } catch (err) {
            if (retryCount < maxRetries) {
              retryCount++;
              console.warn(
                `Retrying initialization (attempt ${retryCount})...`
              );
              setTimeout(initialize, 500 * retryCount);
            } else {
              throw err;
            }
          }
        };

        script.onerror = () => {
          throw new Error("Failed to load Cesium script");
        };

        document.body.appendChild(script);
      } catch (err) {
        setError(`Initialization failed: ${err.message}`);
        console.error("Initialization error:", err);
        setLoading(false);
      }
    };

    initialize();

    return () => {
      if (link && document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
      }
    };
  }, []);

  // ... rest of your component code (fetchComplaints, marker plotting, etc.) ...

  return (
    <div className="relative w-full h-screen">
      {/* Key fix: This container must have explicit dimensions */}
      <div
        ref={cesiumContainerRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      />

      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-10">
          <strong>Error:</strong> {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Reload
          </button>
        </div>
      )}
    </div>
  );
};

export default Complaints3DMap;
