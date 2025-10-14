import React, { useEffect, useState } from "react";
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Upload,
  Loader2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getsingleClaim } from "../store/claiminatoraction";

const ReviewModal = ({ selectedCase, setSelectedCase }) => {
  const { isLoading, singleClaim, claims } = useSelector(
    (state) => state.claim
  );
  const dispatch = useDispatch();
  const [singleStateData, setsingleStateData] = useState([]);

  const getRiskColor = (score) => {
    if (score >= 75) return "from-red-500 to-red-600";
    if (score >= 50) return "from-amber-500 to-orange-600";
    return "from-emerald-500 to-green-600";
  };

  const getRuleStatusBadge = (status) => {
    const styles = {
      Pass: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
      Fail: "bg-gradient-to-r from-red-500 to-rose-600 text-white",
      Flagged: "bg-gradient-to-r from-amber-500 to-orange-600 text-white",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  const getDecisionBadge = (decision) => {
    const styles = {
      Approved:
        "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30",
      Rejected:
        "bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/30",
      Pending:
        "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30",
    };

    const icons = {
      Approved: <CheckCircle className="w-4 h-4" />,
      Rejected: <XCircle className="w-4 h-4" />,
      Pending: <AlertTriangle className="w-4 h-4" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold text-white ${styles[decision]}`}
      >
        {icons[decision]}
        {decision}
      </span>
    );
  };

  useEffect(() => {
    if (!selectedCase) return;
    const single = claims.find((claim) => claim.case_id == selectedCase);
    setsingleStateData(single);
    dispatch(getsingleClaim(selectedCase));
  }, [selectedCase, claims]);

  console.log(singleStateData, singleClaim, selectedCase);
//    if (isLoading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 flex justify-center items-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-700 font-semibold">Loading cases...</p>
//         </div>
//       </div>
//     );
//   }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8 rounded-t-2xl flex justify-between items-center">
          <div>
            <h2 className="text-left text-3xl font-bold">Case Review</h2>
            <p className="text-slate-300 mt-2">
              {singleClaim
                ? `${singleStateData.case_no} - ${singleStateData.claim_number}`
                : "Loading..."}
            </p>
          </div>
          <button
            onClick={() => setSelectedCase(null)}
            className="text-white hover:bg-white/20 rounded-full p-2"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {/* {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <p className="text-gray-600 mt-4 font-semibold">Loading...</p>
            </div>
          )} */}

          {singleClaim && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
                  <p className="text-sm font-bold text-blue-600 mb-2">
                    Risk Score
                  </p>
                  <p
                    className={`text-5xl font-black bg-gradient-to-r ${getRiskColor(
                      singleStateData.risk_score
                    )} bg-clip-text text-transparent`}
                  >
                    {singleStateData.risk_score}
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-200">
                  <p className="text-sm font-bold text-purple-600 mb-2">
                    Decision
                  </p>
                  <p className="text-3xl font-bold">
                    {singleStateData.decision}
                  </p>
                </div>
                <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200">
                  <p className="text-sm font-bold text-amber-600 mb-2">
                    Documents
                  </p>
                  <p className="text-5xl font-black text-amber-600">
                    {singleStateData.documents?.length || 0}
                  </p>
                </div>
              </div>

              {/* Documents */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                Uploaded Documents
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {singleStateData.documents?.map((doc) => (
                  <div
                    key={doc.document_id}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border-2 border-gray-200 hover:shadow-md transition-all duration-200"
                  >
                    <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-semibold text-base leading-tight">
                        {doc.document_name}
                      </span>
                      <span className="text-left text-sm text-gray-500 font-medium mt-0.5 tracking-wide">
                        {doc.document_type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rules */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                Rules & Validation
              </h3>

              <div className="space-y-4">
                {singleClaim && singleClaim.length > 0 ? (
                  singleClaim.map((rule) => (
                    <div
                      key={rule.case_rule_id}
                      className="border-2 border-gray-200 rounded-xl p-6 bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-gray-800">
                          {rule.rule_name}
                        </h4>
                        {getRuleStatusBadge(rule.rule_status)}
                      </div>
                      <p className="text-left text-sm text-gray-600">
                        {rule.notes}
                      </p>
                      <p className="text-left text-xs text-gray-500 mt-1">
                        Evaluated by: {rule.evaluated_by} | Date:{" "}
                        {new Date(rule.evaluation_date).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 text-sm font-medium py-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                    For this claim, no validation rules are applied.
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex gap-4 mt-4">
            <button className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-[1.02]">
              Approve Case
            </button>
            <button className="flex-1 px-8 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:from-red-600 hover:to-rose-700 transition-all duration-200 font-bold text-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-[1.02]">
              Reject Case
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
