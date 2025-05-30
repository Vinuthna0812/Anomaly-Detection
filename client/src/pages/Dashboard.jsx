// // // // import { useContext, useState, useRef } from "react";
// // // // import { UserContext } from "../../context/userContext";
// // // // import '../styles/Dashboard.css';
// // // // import axios from "axios";

// // // // const Dashboard = () => {
// // // //   const { user, setUser } = useContext(UserContext);
// // // //   const [file, setFile] = useState(null);
// // // //   const [uploading, setUploading] = useState(false);
// // // //   const [anomalyResult, setAnomalyResult] = useState(null);
// // // //   const [previewUrl, setPreviewUrl] = useState(null);
// // // //   const fileInputRef = useRef(null);

// // // //   const handleFileChange = (e) => {
// // // //     const selectedFile = e.target.files[0];
// // // //     setFile(selectedFile);
// // // //     if (selectedFile) {
// // // //       // Revoke previous URL if exists
// // // //       if (previewUrl && previewUrl.startsWith('blob:')) {
// // // //         URL.revokeObjectURL(previewUrl);
// // // //       }
// // // //       setPreviewUrl(URL.createObjectURL(selectedFile));
// // // //     } else {
// // // //       setPreviewUrl(null);
// // // //     }
// // // //     // Clear any previous results when selecting new file
// // // //     setAnomalyResult(null);
// // // //   };

// // // //   const handleUpload = async () => {
// // // //     if (!file || !user?._id) return alert("Please select a file and login first!");

// // // //     setUploading(true);
// // // //     const formData = new FormData();
// // // //     formData.append("image", file);
// // // //     formData.append("userId", user._id);

// // // //     try {
// // // //       const { data } = await axios.post("http://localhost:8000/api/auth/upload", formData, {
// // // //         headers: { "Content-Type": "multipart/form-data" },
// // // //         withCredentials: true,
// // // //       });

// // // //       console.log("📡 Server Response:", data);
// // // //       setAnomalyResult({
// // // //         isAnomalous: data.is_anomalous,
// // // //         anomalyScore: data.error,
// // // //       });

    
// // // //       if (data.imageUrl) {
// // // //         // Revoke the previous object URL
// // // //         if (previewUrl && previewUrl.startsWith('blob:')) {
// // // //           URL.revokeObjectURL(previewUrl);
// // // //         }
      
// // // //         // Construct and log full image URL
// // // //         const serverImageUrl = `http://localhost:8000${data.imageUrl}?t=${new Date().getTime()}`;
// // // //         console.log("🔗 Generated Image URL:", serverImageUrl);
      
// // // //         // Set as preview
// // // //         setPreviewUrl(serverImageUrl);
      
// // // //         // Update user context (if needed)
// // // //         setUser((prevUser) => ({
// // // //           ...prevUser,
// // // //           imageUrl: data.imageUrl,
// // // //         }));
// // // //       }
      
// // // //       alert("✅ Upload successful!");
// // // //     } catch (error) {
// // // //       console.error("❌ Upload failed:", error);
// // // //       alert("Upload failed!");
// // // //     } finally {
// // // //       setUploading(false);
// // // //     }
// // // //   };

// // // //   const triggerFileInput = () => {
// // // //     fileInputRef.current.click();
// // // //   };

// // // //   const handleClear = () => {
// // // //     setFile(null);
// // // //     setPreviewUrl(null);
// // // //     setAnomalyResult(null);
// // // //     if (fileInputRef.current) {
// // // //       fileInputRef.current.value = '';
// // // //     }
// // // //     // Revoke object URL if exists
// // // //     if (previewUrl && previewUrl.startsWith('blob:')) {
// // // //       URL.revokeObjectURL(previewUrl);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="dashboard-container">
// // // //       <div className="upload-card">
// // // //         <div className="upload-area" onClick={triggerFileInput}>
// // // //           {previewUrl ? (
// // // //             <img 
// // // //               src={previewUrl}
// // // //               alt="Preview" 
// // // //               className="preview-image"
// // // //             />
// // // //           ) : (
// // // //             <div className="upload-prompt">
// // // //               <svg className="upload-icon" viewBox="0 0 24 24">
// // // //                 <path fill="currentColor" d="M14,13V17H10V13H7L12,8L17,13H14M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z" />
// // // //               </svg>
// // // //               <p>Click to select an image</p>
// // // //               <p className="file-types">Supports: JPG, PNG, JPEG</p>
// // // //             </div>
// // // //           )}
// // // //           <input
// // // //             type="file"
// // // //             ref={fileInputRef}
// // // //             onChange={handleFileChange}
// // // //             accept="image/*"
// // // //             className="file-input"
// // // //           />
// // // //         </div>

// // // //         <div className="actions">
// // // //           {previewUrl && (
// // // //             <button
// // // //               onClick={handleUpload}
// // // //               disabled={uploading}
// // // //               className={`upload-button ${uploading ? 'uploading' : ''}`}
// // // //             >
// // // //               {uploading ? (
// // // //                 <>
// // // //                   <svg className="spinner" viewBox="0 0 50 50">
// // // //                     <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
// // // //                   </svg>
// // // //                   Processing...
// // // //                 </>
// // // //               ) : (
// // // //                 'Analyze Image'
// // // //               )}
// // // //             </button>
// // // //           )}

// // // //           {previewUrl && (
// // // //             <button 
// // // //               onClick={handleClear}
// // // //               className="clear-button"
// // // //             >
// // // //               Clear
// // // //             </button>
// // // //           )}
// // // //         </div>

// // // //         {anomalyResult !== null && (
// // // //           <div className={`result-container ${anomalyResult.isAnomalous ? 'anomaly' : 'normal'}`}>
// // // //             <div className="result-header">
// // // //               {anomalyResult.isAnomalous ? (
// // // //                 <>
// // // //                   <svg className="result-icon" viewBox="0 0 24 24">
// // // //                     <path fill="currentColor" d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
// // // //                   </svg>
// // // //                   <span>Anomaly Detected!</span>
// // // //                 </>
// // // //               ) : (
// // // //                 <>
// // // //                   <svg className="result-icon" viewBox="0 0 24 24">
// // // //                     <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
// // // //                   </svg>
// // // //                   <span>No Anomalies Found</span>
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //             <div className="result-score">
// // // //               Confidence: <span>{anomalyResult.anomalyScore}</span>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;
// // // import { useContext, useState, useEffect, useRef } from "react";
// // // import { UserContext } from "../../context/userContext";
// // // import '../styles/Dashboard.css';
// // // import axios from "axios";
// // // import { useNavigate } from "react-router-dom";

// // // const Dashboard = () => {
// // //   const { user, setUser } = useContext(UserContext);
// // //   const [file, setFile] = useState(null);
// // //   const [uploading, setUploading] = useState(false);
// // //   const [anomalyResult, setAnomalyResult] = useState(null);
// // //   const [defectClass, setDefectClass] = useState(null);
// // //   const [localizations, setLocalizations] = useState([]);
// // //   const [previewUrl, setPreviewUrl] = useState(null);
// // //   const fileInputRef = useRef(null);
// // //   const navigate = useNavigate();
// // //   const [category, setCategory] = useState("");

// // //   useEffect(() => {
// // //     const selected = localStorage.getItem("selectedCategory");
// // //     if (!selected) {
// // //       alert("Please select a category first!");
// // //       navigate("/select-category");
// // //     } else {
// // //       setCategory(selected);
// // //     }
// // //   }, [navigate]);

// // //   const handleFileChange = (e) => {
// // //     const selectedFile = e.target.files[0];
// // //     setFile(selectedFile);
// // //     if (selectedFile) {
// // //       if (previewUrl && previewUrl.startsWith('blob:')) {
// // //         URL.revokeObjectURL(previewUrl);
// // //       }
// // //       setPreviewUrl(URL.createObjectURL(selectedFile));
// // //     } else {
// // //       setPreviewUrl(null);
// // //     }
// // //     setAnomalyResult(null);
// // //     setDefectClass(null);
// // //     setLocalizations([]);
// // //   };

// // //   const handleUpload = async () => {
// // //     if (!file || !user?._id || !category) {
// // //       return alert("Please select a file, login, and choose category!");
// // //     }

// // //     setUploading(true);
// // //     const formData = new FormData();
// // //     formData.append("file", file);
// // //     formData.append("userId", user._id);
// // //     formData.append("category", category);

// // //     try {
// // //       const { data } = await axios.post("http://localhost:5001/predict", formData, {
// // //         withCredentials: true,
// // //       });

// // //       setAnomalyResult({
// // //         isAnomalous: data.is_anomalous,
// // //         anomalyScore: data.error,
// // //       });

// // //       setDefectClass(data.defect_class || null);
// // //       setLocalizations(data.localization || []);

// // //       if (data.imageUrl) {
// // //         const newImageUrl = `http://localhost:8000${data.imageUrl}?t=${Date.now()}`;
// // //         setPreviewUrl(newImageUrl);
// // //         setUser((prevUser) => ({
// // //           ...prevUser,
// // //           imageUrl: data.imageUrl,
// // //         }));
// // //       }

// // //       alert("✅ Upload successful!");
// // //       console.log("API response:", data);
// // //     } catch (error) {
// // //       console.error("❌ Upload failed:", error);
// // //       alert("Upload failed.");
// // //     } finally {
// // //       setUploading(false);
// // //     }
// // //   };

// // //   const triggerFileInput = () => {
// // //     fileInputRef.current.click();
// // //   };

// // //   const handleClear = () => {
// // //     setFile(null);
// // //     setPreviewUrl(null);
// // //     setAnomalyResult(null);
// // //     setDefectClass(null);
// // //     setLocalizations([]);
// // //     if (fileInputRef.current) fileInputRef.current.value = '';
// // //     if (previewUrl && previewUrl.startsWith('blob:')) {
// // //       URL.revokeObjectURL(previewUrl);
// // //     }
// // //   };

// // //   return (
// // //     <div className="dashboard-container">
// // //       <div className="upload-card">
// // //         <div className="upload-area" onClick={triggerFileInput}>
// // //           {previewUrl ? (
// // //             <img src={previewUrl} alt="Preview" className="preview-image" />
// // //           ) : (
// // //             <div className="upload-prompt">
// // //               <svg className="upload-icon" viewBox="0 0 24 24">
// // //                 <path fill="currentColor" d="M14,13V17H10V13H7L12,8L17,13H14M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z" />
// // //               </svg>
// // //               <p>Click to select an image</p>
// // //               <p className="file-types">Supports: JPG, PNG, JPEG</p>
// // //             </div>
// // //           )}
// // //           <input
// // //             type="file"
// // //             ref={fileInputRef}
// // //             onChange={handleFileChange}
// // //             accept="image/*"
// // //             className="file-input"
// // //           />
// // //         </div>

// // //         <div className="actions">
// // //           {previewUrl && (
// // //             <>
// // //               <button
// // //                 onClick={handleUpload}
// // //                 disabled={uploading}
// // //                 className={`upload-button ${uploading ? 'uploading' : ''}`}
// // //               >
// // //                 {uploading ? (
// // //                   <>
// // //                     <svg className="spinner" viewBox="0 0 50 50">
// // //                       <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
// // //                     </svg>
// // //                     Processing...
// // //                   </>
// // //                 ) : (
// // //                   "Analyze Image"
// // //                 )}
// // //               </button>

// // //               <button onClick={handleClear} className="clear-button">
// // //                 Clear
// // //               </button>
// // //             </>
// // //           )}
// // //         </div>

// // //         {anomalyResult && (
// // //           <div className={`result-container ${anomalyResult.isAnomalous ? 'anomaly' : 'normal'}`}>
// // //             <div className="result-header">
// // //               {anomalyResult.isAnomalous ? (
// // //                 <>
// // //                   <svg className="result-icon" viewBox="0 0 24 24">
// // //                     <path fill="currentColor" d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
// // //                   </svg>
// // //                   <span>Anomaly Detected!</span>
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   <svg className="result-icon" viewBox="0 0 24 24">
// // //                     <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
// // //                   </svg>
// // //                   <span>No Anomalies Found</span>
// // //                 </>
// // //               )}
// // //             </div>
// // //             <div className="result-score">
// // //               Confidence: <span>{anomalyResult.anomalyScore}</span>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {defectClass && (
// // //           <div className="defect-class">
// // //             <strong>Defect Type:</strong> {defectClass}
// // //           </div>
// // //         )}

// // //         {localizations.length > 0 && (
// // //           <div className="localization-details">
// // //             <strong>Localization Coordinates:</strong>
// // //             {/* <ul> */}
// // //               {localizations.map((loc, index) => (
// // //                 <li key={index}>
// // //                   x: {loc.x}, y: {loc.y}, width: {loc.width}, height: {loc.height}
// // //                 </li>
// // //               ))}
// // //             </ul>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;
// // import { useContext, useState, useEffect, useRef } from "react";
// // import { UserContext } from "../../context/userContext";
// // import '../styles/Dashboard.css';
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // const Dashboard = () => {
// //   const { user, setUser } = useContext(UserContext);
// //   const [file, setFile] = useState(null);
// //   const [uploading, setUploading] = useState(false);
// //   const [anomalyResult, setAnomalyResult] = useState(null);
// //   const [defectClass, setDefectClass] = useState(null);
// //   const [predictedClass, setPredictedClass] = useState(null);
// //   const [confidence, setConfidence] = useState(null);
// //   const [localizations, setLocalizations] = useState([]);
// //   const [previewUrl, setPreviewUrl] = useState(null);
// //   const fileInputRef = useRef(null);
// //   const navigate = useNavigate();
// //   const [category, setCategory] = useState("");

// //   useEffect(() => {
// //     const selected = localStorage.getItem("selectedCategory");
// //     if (!selected) {
// //       alert("Please select a category first!");
// //       navigate("/select-category");
// //     } else {
// //       setCategory(selected);
// //     }
// //   }, [navigate]);

// //   const handleFileChange = (e) => {
// //     const selectedFile = e.target.files[0];
// //     setFile(selectedFile);
// //     if (selectedFile) {
// //       if (previewUrl && previewUrl.startsWith('blob:')) {
// //         URL.revokeObjectURL(previewUrl);
// //       }
// //       setPreviewUrl(URL.createObjectURL(selectedFile));
// //     } else {
// //       setPreviewUrl(null);
// //     }
// //     setAnomalyResult(null);
// //     setDefectClass(null);
// //     setPredictedClass(null);
// //     setConfidence(null);
// //     setLocalizations([]);
// //   };

// //   const handleUpload = async () => {
// //     if (!file || !user?._id || !category) {
// //       return alert("Please select a file, login, and choose category!");
// //     }

// //     setUploading(true);
// //     const formData = new FormData();
// //     formData.append("file", file);
// //     formData.append("userId", user._id);
// //     formData.append("category", category);

// //     try {
// //       const { data } = await axios.post("http://localhost:5001/predict", formData, {
// //         withCredentials: true,
// //       });

// //       setAnomalyResult({
// //         isAnomalous: data.is_anomalous,
// //         anomalyScore: data.error,
// //       });

// //       setDefectClass(data.defect_class || null);
// //       setPredictedClass(data.predicted_class || null);
// //       setConfidence(data.confidence || null);
// //       setLocalizations(data.localization || []);

// //       if (data.imageUrl) {
// //         //ageUrl = `http://localhost:8000${data.imageUrl}?t=${Date.now()}`;
// //         // Change the image URL construction to use the API endpoint
// // //const newImageUrl = `http://localhost:8000/api/auth/image/${data.imageId}`;
// //  const newImageUrl = data.imageUrl.startsWith("http")
// //   ? data.imageUrl
// //   : `http://localhost:8000/api/auth/image/${data.imageId}`;
// //        setPreviewUrl(newImageUrl);
// //         setUser((prevUser) => ({
// //           ...prevUser,
// //           imageUrl: data.imageUrl,
// //         }));
// //       }

// //       alert("✅ Upload successful!");
// //       console.log("API response:", data);
// //     } catch (error) {
// //       console.error("❌ Upload failed:", error);
// //       alert("Upload failed.");
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   const triggerFileInput = () => {
// //     fileInputRef.current.click();
// //   };

// //   const handleClear = () => {
// //     setFile(null);
// //     setPreviewUrl(null);
// //     setAnomalyResult(null);
// //     setDefectClass(null);
// //     setPredictedClass(null);
// //     setConfidence(null);
// //     setLocalizations([]);
// //     if (fileInputRef.current) fileInputRef.current.value = '';
// //     if (previewUrl && previewUrl.startsWith('blob:')) {
// //       URL.revokeObjectURL(previewUrl);
// //     }
// //   };

// //   return (
// //     <div className="dashboard-container">
// //       <div className="upload-card">

// //         {/* ✅ Selected Category Display */}
// //         {category && (
// //           <div className="selected-category">
// //             <strong>Selected Category:</strong> {category}
// //           </div>
// //         )}

// //         <div className="upload-area" onClick={triggerFileInput}>
// //           {previewUrl ? (
// //             <img src={previewUrl} alt="Preview" className="preview-image" />
// //           ) : (
// //             <div className="upload-prompt">
// //               <svg className="upload-icon" viewBox="0 0 24 24">
// //                 <path fill="currentColor" d="M14,13V17H10V13H7L12,8L17,13H14M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z" />
// //               </svg>
// //               <p>Click to select an image</p>
// //               <p className="file-types">Supports: JPG, PNG, JPEG</p>
// //             </div>
// //           )}
// //           <input
// //             type="file"
// //             ref={fileInputRef}
// //             onChange={handleFileChange}
// //             accept="image/*"
// //             className="file-input"
// //           />
// //         </div>

// //         <div className="actions">
// //           {previewUrl && (
// //             <>
// //               <button
// //                 onClick={handleUpload}
// //                 disabled={uploading}
// //                 className={`upload-button ${uploading ? 'uploading' : ''}`}
// //               >
// //                 {uploading ? (
// //                   <>
// //                     <svg className="spinner" viewBox="0 0 50 50">
// //                       <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
// //                     </svg>
// //                     Processing...
// //                   </>
// //                 ) : (
// //                   "Analyze Image"
// //                 )}
// //               </button>

// //               <button onClick={handleClear} className="clear-button">
// //                 Clear
// //               </button>
// //             </>
// //           )}
// //         </div>

// //         {anomalyResult && (
// //           <div className={`result-container ${anomalyResult.isAnomalous ? 'anomaly' : 'normal'}`}>
// //                     {confidence !== null && (
// //           <div className="confidence-score">
// //             <strong>Confidence Score:</strong> {(confidence * 100).toFixed(2)}%
// //           </div>
// //         )}
// //                 {predictedClass && (
// //           <div className="predicted-class">
// //             <strong>Predicted Class:</strong> {predictedClass}
// //           </div>
// //         )}
// //           </div>
// //         )}

// //         {/* ✅ Display predicted class */}


// //         {/* ✅ Display confidence score */}
// //         {/* {confidence !== null && (
// //           <div className="confidence-score">
// //             <strong>Confidence Score:</strong> {(confidence * 100).toFixed(2)}%
// //           </div>
// //         )} */}

// //         {defectClass && (
// //           <div className="defect-class">
// //             <strong>Defect Type:</strong> {defectClass}
// //           </div>
// //         )}

// //         {localizations.length > 0 && (
// //           <div className="localization-details">
// //             <strong>Localization Coordinates:</strong>
// //             <ul>
// //               {localizations.map((loc, index) => (
// //                 <li key={index}>
// //                   x: {loc.x}, y: {loc.y}, width: {loc.width}, height: {loc.height}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;
// import { useContext, useState, useEffect, useRef } from "react";
// import { UserContext } from "../../context/userContext";
// import '../styles/Dashboard.css';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const { user, setUser } = useContext(UserContext);
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [anomalyResult, setAnomalyResult] = useState(null);
//   const [defectClass, setDefectClass] = useState(null);
//   const [predictedClass, setPredictedClass] = useState(null);
//   const [confidence, setConfidence] = useState(null);
//   const [localizations, setLocalizations] = useState([]);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();
//   const [category, setCategory] = useState("");

//   useEffect(() => {
//     const selected = localStorage.getItem("selectedCategory");
//     if (!selected) {
//       alert("Please select a category first!");
//       navigate("/select-category");
//     } else {
//       setCategory(selected);
//     }
//   }, [navigate]);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     if (selectedFile) {
//       if (previewUrl && previewUrl.startsWith('blob:')) {
//         URL.revokeObjectURL(previewUrl);
//       }
//       setPreviewUrl(URL.createObjectURL(selectedFile));
//     } else {
//       setPreviewUrl(null);
//     }
//     setAnomalyResult(null);
//     setDefectClass(null);
//     setPredictedClass(null);
//     setConfidence(null);
//     setLocalizations([]);
//   };

//   const handleUpload = async () => {
//     if (!file || !user?._id || !category) {
//       return alert("Please select a file, login, and choose category!");
//     }

//     setUploading(true);
//     const formData = new FormData();
//     formData.append("image", selectedFile);  // ✅ use "image" like in old working logic
//     formData.append("userId", user._id);
//     formData.append("category", category);

//     try {
//       const { data } = await axios.post("http://localhost:8000/api/auth/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       setAnomalyResult({
//         isAnomalous: data.is_anomalous,
//         anomalyScore: data.error,
//       });

//       setDefectClass(data.defect_class || null);
//       setPredictedClass(data.predicted_class || null);
//       setConfidence(data.confidence || null);
//       setLocalizations(data.localization || []);

//       if (data.imageUrl) {
//         if (previewUrl && previewUrl.startsWith('blob:')) {
//           URL.revokeObjectURL(previewUrl);
//         }
//         const imageUrl = data.imageUrl.startsWith("http")
//           ? data.imageUrl
//           : `http://localhost:8000${data.imageUrl}?t=${Date.now()}`;
//         setPreviewUrl(imageUrl);

//         setUser((prevUser) => ({
//           ...prevUser,
//           imageUrl: data.imageUrl,
//         }));
//       }

//       alert("✅ Upload successful!");
//     } catch (error) {
//       console.error("❌ Upload failed:", error);
//       alert("Upload failed.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const triggerFileInput = () => fileInputRef.current.click();

//   const handleClear = () => {
//     setFile(null);
//     setPreviewUrl(null);
//     setAnomalyResult(null);
//     setDefectClass(null);
//     setPredictedClass(null);
//     setConfidence(null);
//     setLocalizations([]);
//     if (fileInputRef.current) fileInputRef.current.value = '';
//     if (previewUrl && previewUrl.startsWith('blob:')) {
//       URL.revokeObjectURL(previewUrl);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="upload-card">
//         {category && (
//           <div className="selected-category">
//             <strong>Selected Category:</strong> {category}
//           </div>
//         )}

//         <div className="upload-area" onClick={triggerFileInput}>
//           {previewUrl ? (
//             <img src={previewUrl} alt="Preview" className="preview-image" />
//           ) : (
//             <div className="upload-prompt">
//               <svg className="upload-icon" viewBox="0 0 24 24">
//                 <path fill="currentColor" d="M14,13V17H10V13H7L12,8L17,13H14M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z" />
//               </svg>
//               <p>Click to select an image</p>
//               <p className="file-types">Supports: JPG, PNG, JPEG</p>
//             </div>
//           )}
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             accept="image/*"
//             className="file-input"
//           />
//         </div>

//         <div className="actions">
//           {previewUrl && (
//             <button
//               onClick={handleUpload}
//               disabled={uploading}
//               className={`upload-button ${uploading ? 'uploading' : ''}`}
//             >
//               {uploading ? (
//                 <>
//                   <svg className="spinner" viewBox="0 0 50 50">
//                     <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
//                   </svg>
//                   Processing...
//                 </>
//               ) : (
//                 'Analyze Image'
//               )}
//             </button>
//           )}

//           {previewUrl && (
//             <button onClick={handleClear} className="clear-button">
//               Clear
//             </button>
//           )}
//         </div>

//         {anomalyResult && (
//           <div className={`result-container ${anomalyResult.isAnomalous ? 'anomaly' : 'normal'}`}>
//             <div className="result-header">
//               {anomalyResult.isAnomalous ? (
//                 <>
//                   <svg className="result-icon" viewBox="0 0 24 24">
//                     <path fill="currentColor" d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
//                   </svg>
//                   <span>Anomaly Detected!</span>
//                 </>
//               ) : (
//                 <>
//                   <svg className="result-icon" viewBox="0 0 24 24">
//                     <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
//                   </svg>
//                   <span>No Anomalies Found</span>
//                 </>
//               )}
//             </div>
//             <div className="result-score">
//               Confidence: <span>{anomalyResult.anomalyScore}</span>
//             </div>
//           </div>
//         )}

//         {/* 🔍 Extra Info (optional UI) */}
//         {defectClass && <div><strong>Defect Class:</strong> {defectClass}</div>}
//         {predictedClass && <div><strong>Predicted Class:</strong> {predictedClass}</div>}
//         {confidence && <div><strong>Confidence:</strong> {confidence}</div>}
//         {localizations.length > 0 && (
//           <div>
//             <strong>Localization Boxes:</strong>
//             <ul>
//               {localizations.map((loc, idx) => (
//                 <li key={idx}>{JSON.stringify(loc)}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context/userContext";
import '../styles/Dashboard.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [anomalyResult, setAnomalyResult] = useState(null);
  const [defectClass, setDefectClass] = useState(null);
  const [predictedClass, setPredictedClass] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [localizations, setLocalizations] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  useEffect(() => {
    const selected = localStorage.getItem("selectedCategory");
    if (!selected) {
      alert("Please select a category first!");
      navigate("/select-category");
    } else {
      setCategory(selected);
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }

    // Reset previous results
    setAnomalyResult(null);
    setDefectClass(null);
    setPredictedClass(null);
    setConfidence(null);
    setLocalizations([]);
  };

  const handleUpload = async () => {
    if (!file || !user?._id || !category) {
      return alert("Please select a file, login, and choose a category!");
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);  // ✅ FIXED: use correct variable
    formData.append("userId", user._id);
    formData.append("category", category);

    try {
      const { data } = await axios.post("https://anomaly-detection-qgwh.onrender.com/api/auth/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });



      setDefectClass(data.defect_class || null);
      setPredictedClass(data.predicted_class || null);
      setConfidence(data.confidence || null);
      setLocalizations(data.localization || []);
const isAnomalous = (data.defect_class && data.defect_class.toLowerCase() !== 'good') 
                 || (data.predicted_class && data.predicted_class.toLowerCase() !== 'good');

setAnomalyResult({
  isAnomalous: isAnomalous,
  anomalyScore: data.error,
  defectClass: data.defect_class || null,
  predictedClass: data.predicted_class || null
});

      if (data.imageUrl) {
        if (previewUrl && previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(previewUrl);
        }
        const imageUrl = data.imageUrl.startsWith("http")
          ? data.imageUrl
          : `https://anomaly-detection-qgwh.onrender.com${data.imageUrl}?t=${Date.now()}`;
        setPreviewUrl(imageUrl);

        setUser((prevUser) => ({
          ...prevUser,
          imageUrl: data.imageUrl,
        }));
      }

      alert("✅ Upload successful!");
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleClear = () => {
    setFile(null);
    setPreviewUrl(null);
    setAnomalyResult(null);
    setDefectClass(null);
    setPredictedClass(null);
    setConfidence(null);
    setLocalizations([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="upload-card">
        {category && (
          <div className="selected-category">
            <strong>Selected Category:</strong> {category}
          </div>
        )}

        <div className="upload-area" onClick={triggerFileInput}>
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="preview-image" />
          ) : (
            <div className="upload-prompt">
              <svg className="upload-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,13V17H10V13H7L12,8L17,13H14M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z" />
              </svg>
              <p>Click to select an image</p>
              <p className="file-types">Supports: JPG, PNG, JPEG</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="file-input"
          />
        </div>

        <div className="actions">
          {previewUrl && (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`upload-button ${uploading ? 'uploading' : ''}`}
            >
              {uploading ? (
                <>
                  <svg className="spinner" viewBox="0 0 50 50">
                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
                  </svg>
                  Processing...
                </>
              ) : (
                'Analyze Image'
              )}
            </button>
          )}

          {previewUrl && (
            <button onClick={handleClear} className="clear-button">
              Clear
            </button>
          )}
        </div>

        {anomalyResult && (
          <div className={`result-container ${anomalyResult.isAnomalous ? 'anomaly' : 'normal'}`}>
            <div className="result-header">
              {anomalyResult.isAnomalous ? (
                <>
                  <svg className="result-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
                  </svg>
                  <span>Anomaly Detected!</span>
                </>
              ) : (
                <>
                  <svg className="result-icon" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                  </svg>
                  <span>No Anomalies Found</span>
                </>
              )}
            </div>
            {/* <div className="result-score">
              Confidence: <span>{anomalyResult.anomalyScore}</span>
            </div> */}
                    {defectClass && <div><strong>Defect Class:</strong> {defectClass}</div>}
        {predictedClass && <div><strong>Predicted Class:</strong> {predictedClass}</div>}
        {confidence && <div><strong>Confidence:</strong> {confidence}</div>}
          </div>
        )}


        {localizations.length > 0 && (
          <div>
            <strong>Localization Boxes:</strong>
            <ul>
              {localizations.map((loc, idx) => (
                <li key={idx}>{JSON.stringify(loc)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
