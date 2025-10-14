import React, { useState } from "react";
import { Upload } from "lucide-react";

const Header = ({ setShowUploadModal }) => {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Case Management System
            </h1>
            <p className="text-gray-600 mt-2 text-left">
              Manage and review insurance claims efficiently
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
          >
            <Upload className="w-5 h-5" />
            Upload Documents
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
