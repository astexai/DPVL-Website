"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Download,
  Trash2,
  ChevronDown,
  CheckCircle,
  XCircle,
  Mail,
  X,
  Eye,
} from "lucide-react";

const TABS = [
  { id: "pending", label: "Registration Requests" },
  { id: "accepted", label: "Verified Candidates" },
  { id: "rejected", label: "Rejected Candidates" },
  { id: "email", label: "Send Email to Participants" },
];

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("pending");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAadhaar, setSelectedAadhaar] = useState<string | null>(null);
  const [aadhaarUrl, setAadhaarUrl] = useState<string | null>(null);
  const [isViewingAadhaar, setIsViewingAadhaar] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/admin/candidates", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      } else {
        console.error("API error:", data.error);
        setUsers([]);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/admin/candidates", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        alert(`Status updated to ${newStatus}`);
        fetchUsers();
      } else {
        const data = await res.json();
        alert("Failed to update status: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleViewAadhaar = async (path: string) => {
    if (!path) return;
    setIsViewingAadhaar(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(path, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch Aadhaar file");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAadhaarUrl(url);
    } catch (err) {
      console.error("Error fetching Aadhaar:", err);
      alert("Could not load Aadhaar file");
    } finally {
      setIsViewingAadhaar(false);
    }
  };

  const closeAadhaarModal = () => {
    if (aadhaarUrl) {
      URL.revokeObjectURL(aadhaarUrl);
    }
    setAadhaarUrl(null);
  };

  const handleDeleteCandidate = async (id: string) => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/candidates?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        fetchUsers();
        setDeleteConfirmId(null);
      } else {
        const data = await res.json();
        alert("Failed to delete: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Failed to delete candidate:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredData = users.filter((u) => {
    const status = u.status || "pending";
    const matchesTab =
      activeTab === "email" ? status === "accepted" : status === activeTab;
    const matchesSearch =
      u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.includes(searchTerm);
    return matchesTab && matchesSearch;
  });

  const getCount = (tabId: string) => {
    return users.filter(
      (u) =>
        (u.status || "pending") === (tabId === "email" ? "accepted" : tabId),
    ).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">
      {/* --- Top Navigation Tabs --- */}
      <div className="flex flex-wrap gap-4 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-6 py-3 rounded-lg border transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-[#3B3BB7] text-white border-[#1e1b4b] shadow-md"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-sm font-medium">{tab.label}</span>
            <span
              className={`ml-3 text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.id
                  ? "bg-white text-[#1e1b4b]"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {getCount(tab.id)}
            </span>
          </button>
        ))}
      </div>

      {/* --- Main Content Area --- */}
      {activeTab === "email" ? (
        <EmailComposer data={filteredData} />
      ) : (
        <TableLayout
          data={filteredData}
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onStatusUpdate={handleStatusUpdate}
          onViewAadhaar={handleViewAadhaar}
          onDeleteCandidate={(id) => setDeleteConfirmId(id)}
          activeTab={activeTab}
        />
      )}

      {/* Aadhaar Modal */}
      {aadhaarUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">Aadhaar Card View</h3>
              <div className="flex items-center gap-2">
                <a
                  href={aadhaarUrl}
                  download="aadhaar-card.png"
                  className="flex items-center gap-2 px-4 py-2 bg-[#3B3BB7] text-white text-sm font-medium rounded-lg hover:bg-indigo-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
                <button
                  onClick={closeAadhaarModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center bg-gray-100/50">
              <img
                src={aadhaarUrl}
                alt="Aadhaar Card"
                className="max-w-full w-auto h-auto object-contain rounded-lg shadow-xl border border-gray-200"
              />
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={closeAadhaarModal}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isViewingAadhaar && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/20">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#3B3BB7] border-t-transparent" />
            <span className="text-sm font-medium">Loading Aadhaar...</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete Candidate?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this candidate profile? This
              action cannot be undone.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                disabled={isDeleting}
              >
                No
              </button>
              <button
                onClick={() => handleDeleteCandidate(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TableLayout({
  data,
  loading,
  searchTerm,
  setSearchTerm,
  onStatusUpdate,
  onViewAadhaar,
  onDeleteCandidate,
  activeTab,
}: {
  data: any[];
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  onStatusUpdate: (id: string, status: string) => void;
  onViewAadhaar: (url: string) => void;
  onDeleteCandidate: (id: string) => void;
  activeTab: string;
}) {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6 overflow-hidden flex flex-col max-h-[calc(100vh-250px)]">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-white z-10 border-b border-gray-100">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or mobile..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto min-h-[400px]">
          <div className="min-w-[800px]">
            <div className="sticky top-0 z-20 bg-[#F9FAFB] border-b border-gray-100">
              <div className="grid grid-cols-12 gap-3 px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <div className="col-span-3">Candidate</div>
                <div className="col-span-3">Contact</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-1 text-center">Aadhar</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20 text-gray-400 bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-3"></div>
                <span>Loading candidates...</span>
              </div>
            ) : data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white">
                <p className="text-lg font-medium text-gray-500 mb-1">
                  No candidates found
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {data.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-3">
                      <p className="text-sm font-medium text-gray-900 leading-tight">
                        {item.firstName} {item.lastName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Father: {item.fatherName}
                      </p>
                    </div>

                    <div className="col-span-3 overflow-hidden">
                      <p
                        className="text-sm text-gray-700 truncate"
                        title={item.email}
                      >
                        {item.email}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.phone}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-xs text-gray-700 font-medium">
                        {item.state}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {item.district}
                      </p>
                    </div>

                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => onViewAadhaar(item.aadhaarPath)}
                        className="text-[#3B3BB7] hover:bg-indigo-50 p-2 rounded-lg transition-colors group"
                        title="View Aadhaar"
                      >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>

                    <div className="col-span-3 flex items-center justify-end gap-2">
                      <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
                        {item.status !== "accepted" && (
                          <button
                            onClick={() => onStatusUpdate(item._id, "accepted")}
                            className="p-1.5 text-green-600 hover:bg-white hover:shadow-sm rounded-md transition-all"
                            title="Verify Candidate"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {item.status !== "rejected" && (
                          <button
                            onClick={() => onStatusUpdate(item._id, "rejected")}
                            className="p-1.5 text-red-600 hover:bg-white hover:shadow-sm rounded-md transition-all"
                            title="Reject Candidate"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        {(activeTab === "accepted" ||
                          activeTab === "rejected") && (
                          <button
                            onClick={() => onDeleteCandidate(item._id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-white hover:shadow-sm rounded-md transition-all"
                            title="Delete Profile"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function EmailComposer({ data }: { data: any[] }) {
  const [subject, setSubject] = useState("Information Regarding Participation");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  useEffect(() => {
    setSelectedEmails(data.map((u) => u.email));
  }, [data]);

  const toggleSelect = (email: string) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email],
    );
  };

  const handleSendBatch = async () => {
    if (selectedEmails.length === 0 || !content) {
      alert("Please select recipients and enter message content");
      return;
    }
    setSending(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/admin/send-bulk-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ emails: selectedEmails, subject, content }),
      });
      if (res.ok) {
        alert("Emails sent successfully!");
        setContent("");
      } else {
        const err = await res.json();
        alert("Failed to send: " + err.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error sending emails");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-[#1e1b4b] font-bold text-lg mb-4">
          Send Email to Approved Participants
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-gray-600"
            placeholder="Write your email here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          onClick={handleSendBatch}
          disabled={sending}
          className="flex items-center gap-2 bg-[#3B3BB7] text-white px-6 py-2 rounded-lg hover:bg-indigo-800 transition-colors disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send Batch Email"}
          <Mail className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-3 bg-gray-50/50 flex items-center gap-3 border-b border-gray-100">
          <input
            type="checkbox"
            checked={selectedEmails.length === data.length && data.length > 0}
            onChange={(e) =>
              setSelectedEmails(
                e.target.checked ? data.map((u) => u.email) : [],
              )
            }
            className="w-4 h-4 rounded border-gray-300 text-indigo-900 focus:ring-indigo-500 cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-700">
            Select All ({data.length})
          </span>
        </div>

        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/30">
          <div className="col-span-1"></div>
          <div className="col-span-4">Name</div>
          <div className="col-span-7">Email</div>
        </div>

        <div className="divide-y divide-gray-100">
          {data.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50"
            >
              <div className="col-span-1">
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(item.email)}
                  onChange={() => toggleSelect(item.email)}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-900 focus:ring-indigo-500 cursor-pointer"
                />
              </div>
              <div className="col-span-4">
                <p className="text-sm text-gray-900">
                  {item.firstName} {item.lastName}
                </p>
              </div>
              <div className="col-span-7">
                <p className="text-sm text-gray-600">{item.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
