import React, { useState } from "react";

import Header from "../Components/Header";
import UploadModel from "../Components/UploadModel";
import ClaimList from "../Components/ClaimList";
import ReviewModal from "../Components/reviewModel";

const ShowClaim = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <Header setShowUploadModal={setShowUploadModal} />

        {/* claim list card */}
        <ClaimList
          setSelectedCase={setSelectedCase}
        />
        {/* upload document */}
         {showUploadModal && (
          <UploadModel
            setShowUploadModal={setShowUploadModal}
          />
        )}

        {/* review model */}
        {selectedCase && (
          <ReviewModal selectedCase={selectedCase} setSelectedCase={setSelectedCase} />
        )}
      </div>
    </div>
  );
};

export default ShowClaim;
