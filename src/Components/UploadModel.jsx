import React, { useState } from "react";
import { FileText, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addClaim } from "../store/claiminatoraction";
import { useNavigate } from "react-router";
const UploadModel = ({ setShowUploadModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, claims } = useSelector((state) => state.claim);
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState("");
  const [uploadData, setUploadData] = useState({
    fnol: null,
    claimNumber: "",
    lossReport: null,
    photos: [],
  });

  const handleFileUpload = (field, files) => {
    if (field === "photos") {
      setUploadData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(files)],
      }));
    } else {
      setUploadData((prev) => ({ ...prev, [field]: files[0] }));
    }
  };

  const processCase = async () => {
    if (
      !uploadData.fnol ||
      !uploadData.claimNumber ||
      !uploadData.lossReport ||
      uploadData.photos.length === 0
    ) {
      alert("Please fill all required fields");
      return;
    }

    setProcessing(true);

    const steps = [
      { name: "Creating Case...", duration: 700 },
      { name: "Running OCR on documents...", duration: 700 },
      { name: "AI Analysis in progress...", duration: 1500 },
      { name: "Applying business rules...", duration: 1000 },
      { name: "Saving to database...", duration: 100 },
    ];

    for (const step of steps) {
      setProcessingStep(step.name);
      await new Promise((resolve) => setTimeout(resolve, step.duration));
    }

    // ✅ Create FormData (matching your cURL)
    const formData = new FormData();
    formData.append("claim_number", uploadData.claimNumber);
    formData.append("fnol_file", uploadData.fnol);
    formData.append("loss_report_file", uploadData.lossReport);
    uploadData.photos.forEach((photo) => {
      formData.append("property_images", photo);
    });

    try {
      let response = await dispatch(addClaim(formData));
      console.log("Upload response:", response);
      if (response == 200) { setProcessingStep(""); setShowUploadModal(false);}
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error creating case. Please try again.");
    } finally {
      setProcessing(false);
      setProcessingStep("");
      setShowUploadModal(false);
      setUploadData({
        fnol: null,
        claimNumber: "",
        lossReport: null,
        photos: [],
      });
    }
  };


  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto animate-in zoom-in-95 duration-200">
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-left">
                  Upload Documents
                </h2>
                <p className="text-blue-100 mt-2">
                  Create a new case by uploading required documents
                </p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                disabled={processing}
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-8">
            {processing ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="w-24 h-24 border-8 border-blue-100 rounded-full"></div>
                  <div className="w-24 h-24 border-8 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                </div>
                <p className="text-2xl font-bold text-gray-800 mt-6">
                  {processingStep}
                </p>
                <p className="text-gray-600 mt-2">
                  Please wait while we process your documents...
                </p>
                <div className="flex gap-2 mt-6">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Claim Number */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Claim Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={uploadData.claimNumber}
                    onChange={(e) =>
                      setUploadData((prev) => ({
                        ...prev,
                        claimNumber: e.target.value,
                      }))
                    }
                    placeholder="Enter claim number (e.g., CLM-456793)"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 font-medium"
                  />
                </div>

                {/* FNOL Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    FNOL (First Notice of Loss){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="group border-3 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-blue-100 rounded-2xl group-hover:bg-blue-200 transition-colors mb-4">
                        <FileText className="w-10 h-10 text-blue-600" />
                      </div>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileUpload("fnol", e.target.files)
                        }
                        className="hidden"
                        id="fnol-upload"
                        accept=".pdf,.doc,.docx"
                      />
                      <label htmlFor="fnol-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-bold text-lg">
                          Click to upload
                        </span>
                        <span className="text-gray-600 font-medium">
                          {" "}
                          or drag and drop
                        </span>
                      </label>
                      <p className="text-sm text-gray-500 mt-2 font-medium">
                        PDF, DOC, DOCX up to 10MB
                      </p>
                      {uploadData.fnol && (
                        <div className="mt-4 px-4 py-2 bg-green-100 border border-green-300 rounded-lg">
                          <p className="text-sm text-green-700 font-bold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            {uploadData.fnol.name}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Loss Report Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Loss Report <span className="text-red-500">*</span>
                  </label>
                  <div className="group border-3 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-indigo-100 rounded-2xl group-hover:bg-indigo-200 transition-colors mb-4">
                        <FileText className="w-10 h-10 text-indigo-600" />
                      </div>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileUpload("lossReport", e.target.files)
                        }
                        className="hidden"
                        id="loss-report-upload"
                        accept=".pdf,.doc,.docx"
                      />
                      <label
                        htmlFor="loss-report-upload"
                        className="cursor-pointer"
                      >
                        <span className="text-blue-600 hover:text-blue-700 font-bold text-lg">
                          Click to upload
                        </span>
                        <span className="text-gray-600 font-medium">
                          {" "}
                          or drag and drop
                        </span>
                      </label>
                      <p className="text-sm text-gray-500 mt-2 font-medium">
                        PDF, DOC, DOCX up to 10MB
                      </p>
                      {uploadData.lossReport && (
                        <div className="mt-4 px-4 py-2 bg-green-100 border border-green-300 rounded-lg">
                          <p className="text-sm text-green-700 font-bold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            {uploadData.lossReport.name}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Photos Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Photos <span className="text-red-500">*</span>
                  </label>
                  <div className="group border-3 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-purple-100 rounded-2xl group-hover:bg-purple-200 transition-colors mb-4">
                        <FileText className="w-10 h-10 text-purple-600" />
                      </div>
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileUpload("photos", e.target.files)
                        }
                        className="hidden"
                        id="photos-upload"
                        accept="image/*"
                        multiple
                      />
                      <label htmlFor="photos-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700 font-bold text-lg">
                          Click to upload
                        </span>
                        <span className="text-gray-600 font-medium">
                          {" "}
                          or drag and drop
                        </span>
                      </label>
                      <p className="text-sm text-gray-500 mt-2 font-medium">
                        PNG, JPG, JPEG up to 10MB each (multiple files)
                      </p>
                      {uploadData.photos.length > 0 && (
                        <div className="mt-4 space-y-2 w-full">
                          {uploadData.photos.map((photo, idx) => (
                            <div
                              key={idx}
                              className="px-4 py-2 bg-green-100 border border-green-300 rounded-lg"
                            >
                              <p className="text-sm text-green-700 font-bold flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                {photo.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Process Button */}
                <button
                  onClick={processCase}
                  className="w-full px-6 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-[1.02]"
                >
                  Process & Create Case
                </button>

                {/* Info Box */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                  <p className="text-sm text-blue-900 font-bold mb-3 flex items-center gap-2">
                    <Loader2 className="w-5 h-5" />
                    Processing Steps:
                  </p>
                  <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside font-medium">
                    <li>Create case record</li>
                    <li>OCR document extraction</li>
                    <li>AI analysis and validation</li>
                    <li>Apply business rules</li>
                    <li>Save to database</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadModel;
