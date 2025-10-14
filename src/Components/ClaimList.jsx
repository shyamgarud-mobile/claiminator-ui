import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClaims } from "../store/claiminatoraction";
import { FileText, Eye, StickyNote, Clock } from "lucide-react";

const ClaimList = ({ setSelectedCase }) => {
  const { isLoading, claims,callApi} = useSelector((state) => state.claim);
  const dispatch = useDispatch();
  const getRiskColor = (score) => {
    if (score >= 75) return "from-red-500 to-red-600";
    if (score >= 50) return "from-amber-500 to-orange-600";
    return "from-emerald-500 to-green-600";
  }; 

  const getRiskBg = (score) => {
    if (score >= 75) return "bg-red-50 border-red-200";
    if (score >= 50) return "bg-amber-50 border-orange-200";
    return "bg-emerald-50 border-green-200";
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

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold text-white ${styles[decision]}`}
      >
        {decision}
      </span>
    );
  };
  const getStatusBadge = (status) => {
    const colors = {
      Active: "bg-green-100 text-green-700 border-green-200",
      Closed: "bg-gray-100 text-gray-700 border-gray-200",
      Suspended: "bg-yellow-100 text-yellow-700 border-yellow-200",
      //  Active: "bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30",
      //   Closed: "bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/30",
      //   Suspended: "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30",
    };
    return (
      <span
        className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
          colors[status] || colors["Closed"]
        }`}
      >
        {status}
      </span>
    );
  };

  useEffect(() => {
    console.log("call here api after uplaod ")
    dispatch(getAllClaims());
  }, []);

  useEffect(() => {
    if(callApi ==true){
    dispatch(getAllClaims());
    }
  }, [callApi]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading cases...</p>
        </div>
      </div>
    );
  }
  if (!claims.length) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
        <p className="text-gray-600 font-semibold">No cases found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
            <tr>
              <th className="text-left py-4 px-4 font-bold text-gray-700 uppercase text-xs tracking-wider">
                Case No
              </th>
              <th className="text-left py-4 px-4 font-bold text-gray-700 uppercase text-xs tracking-wider">
                Claim Number
              </th>
              <th className="text-left py-4 px-4 font-bold text-gray-700 uppercase text-xs tracking-wider">
                Documents
              </th>
              <th className="text-left py-4 px-4 font-bold text-gray-700 uppercase text-xs tracking-wider">
                Risk Score
              </th>
              <th className="text-left py-4 px-4 font-bold text-gray-700 uppercase text-xs tracking-wider">
                Decision
              </th>
              <th className="text-left py-4 px-4 font-bold text-gray-700 uppercase text-xs tracking-wider">
                Status
              </th>
              <th className="text-left py-4 px-4 font-bold text-gray-700 uppercase text-xs">
                Notes
              </th>

              <th className="text-left py-4 px-4 font-bold text-gray-700 uppercase text-xs tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {claims &&
              claims.map((caseItem) => (
                <tr
                  key={caseItem.case_id}
                  className=" text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-150"
                >
                  <td className="py-4 px-3">
                    <span className=" text-left font-bold text-gray-900">
                      {caseItem.case_no}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <span className="text-gray-700 font-medium">
                      {caseItem.claim_number}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <div className=" text-left inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-700 font-semibold text-sm">
                        {caseItem?.documents?.length == 0
                          ? 0
                          : caseItem?.documents?.length}{" "}
                        files
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div
                      className={`text-left inline-flex items-center justify-center w-16 h-16 rounded-2xl border-2 ${getRiskBg(
                        caseItem.risk_score
                      )}`}
                    >
                      <span
                        className={` text-left text-2xl font-black bg-gradient-to-r ${getRiskColor(
                          caseItem.risk_score
                        )} bg-clip-text text-transparent`}
                      >
                        {caseItem.risk_score}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    {getDecisionBadge(caseItem.decision)}
                  </td>
                  <td className="py-4 px-3">
                    {getStatusBadge(caseItem.status)}
                  </td>

                  {/* <td className="py-4 px-3 text-gray-600 text-sm relative group">
                    <div className="flex items-center gap-2 w-[180px] overflow-hidden">
                      <StickyNote className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span
                        className="truncate flex-1"
                        title={caseItem.notes || "—"}
                      >
                        {caseItem.notes || "—"}
                      </span>

                     
                      {caseItem.created_at && (
                        <div className="relative flex-shrink-0">
                          <Clock className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-600 transition-colors duration-200" />
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10 shadow-lg">
                            {new Date(caseItem.created_at).toLocaleString(
                              "en-IN",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </td> */}

                  {/* <td className="py-4 px-3 text-gray-600 text-sm relative group">
                    <div className="flex items-center gap-2 w-[180px] overflow-hidden">
                      <StickyNote className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span
                        className="truncate flex-1"
                        title={caseItem.notes || "—"}
                      >
                        {caseItem.notes || "—"}
                      </span>

                      
                      {caseItem.created_at && (
                        <div className="relative flex-shrink-0">
                          <Clock className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-600 transition-colors duration-200" />
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10 shadow-lg">
                            {(() => {
                              try {
                                const date = new Date(caseItem.created_at);
                                return date.toLocaleString("en-IN", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                });
                              } catch (error) {
                                return "Invalid date";
                              }
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  </td> */}

                  <td className="py-4 px-3 text-gray-600 text-sm">
                    <div className="flex items-center gap-2 w-[180px] overflow-hidden group/note">
                      <StickyNote className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span
                        className="truncate flex-1"
                        title={caseItem.notes || "—"}
                      >
                        {caseItem.notes || "—"}
                      </span>

                      {/* Hover clock tooltip */}
                      {caseItem.created_at && (
                        <div className="relative flex-shrink-0 group/clock">
                          <Clock className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-600 transition-colors duration-200" />

                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-3 py-1 opacity-0 group-hover/clock:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-10 shadow-lg">
                            {caseItem.created_at}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-3">
                    <button
                      onClick={() => setSelectedCase(caseItem.case_id)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl hover:from-slate-800 hover:to-black transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Eye className="w-4 h-4" />
                      Review
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimList;
