"use client";

import React, { useState } from "react";
import { Search, Download, Trash2, ChevronDown } from "lucide-react";

// --- Mock Data based on your screenshots ---
const VERIFIED_DATA = [
  {
    id: 1,
    name: "Sachin Kumar Sharma",
    fatherName: "Sadhu ram sharma",
    email: "sanjubaba67671@gmail.com",
    phone: "9911514109",
    state: "Rajasthan",
    district: "Alwar",
    submittedOn: "21 Dec 2025, 10:23 am",
  },
  {
    id: 2,
    name: "Gajendra Kanwar",
    fatherName: "Dhaneshwar shing",
    email: "gajendrakanwar096@gmail.com",
    phone: "6268279635",
    state: "Chhattisgarh",
    district: "Sakti",
    submittedOn: "20 Dec 2025, 11:43 pm",
  },
  {
    id: 3,
    name: "Mahipal Sinwar",
    fatherName: "Chena ram",
    email: "mahipalsinwarratau@gmail.com",
    phone: "7878949524",
    state: "Rajasthan",
    district: "Nagaur",
    submittedOn: "20 Dec 2025, 08:53 pm",
  },
  {
    id: 4,
    name: "Manish Saharan",
    fatherName: "Surjeet Singh",
    email: "surjeetsaharan02572@gmail.com",
    phone: "9306144534",
    state: "Haryana",
    district: "Sirsa",
    submittedOn: "20 Dec 2025, 11:29 am",
  },
  {
    id: 5,
    name: "Aashish Tushir",
    fatherName: "Balwan",
    email: "aashishtushir916@gmail.com",
    phone: "9350431029",
    state: "Haryana",
    district: "Sonipat",
    submittedOn: "19 Dec 2025, 08:52 am",
  },
];

const REJECTED_DATA = [
  {
    id: 1,
    name: "Sohel Lade",
    fatherName: "Kishor",
    email: "sohellade0716@gmail.com",
    phone: "7448057075",
    state: "Maharashtra",
    district: "Sangli",
    submittedOn: "9 Dec 2025, 12:26 pm",
  },
];

const TABS = [
  { id: "requests", label: "Registration Requests", count: 0 },
  { id: "verified", label: "Verified Candidates", count: 9 },
  { id: "rejected", label: "Rejected Candidates", count: 1 },
  { id: "email", label: "Send Email to Participants", count: null },
];

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("verified");

  // Determine which data to show based on tab
  const getDataForTab = () => {
    switch (activeTab) {
      case "requests":
        return [];
      case "verified":
        return VERIFIED_DATA;
      case "rejected":
        return REJECTED_DATA;
      case "email":
        return VERIFIED_DATA; // Email tab usually shows verified users to select
      default:
        return [];
    }
  };

  const currentData = getDataForTab();

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
                ? "bg-[#1e1b4b] text-white border-[#1e1b4b] shadow-md" // Dark Indigo Active
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            <span className="text-sm font-medium">{tab.label}</span>
            {tab.count !== null && (
              <span
                className={`ml-3 text-xs px-2 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? "bg-white text-[#1e1b4b]"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* --- Main Content Area --- */}
      {activeTab === "email" ? (
        // Email Tab Layout (Screenshot 4)
        <EmailComposer data={currentData} />
      ) : (
        // Table Layout (Screenshots 1, 2, 3)
        <TableLayout data={currentData} activeTab={activeTab} />
      )}
    </div>
  );
}

// --- Sub-Component: Standard Table Layout ---
function TableLayout({ data, activeTab }: { data: any[]; activeTab: string }) {
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
        {/* Toolbar */}
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or mobile..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>
          <div className="relative w-full md:w-1/3 md:max-w-[200px]">
            <button className="w-full flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 hover:bg-gray-50">
              <span>All States</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="border-t border-gray-100 bg-gray-50/50">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">Candidate Info</div>
            <div className="col-span-3">Contact</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">Aadhar Card</div>
            <div className="col-span-1">Terms</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
        </div>

        {/* Table Body / Empty State */}
        <div className="min-h-[300px]">
          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <p className="text-lg font-medium text-gray-500 mb-1">
                No candidates found
              </p>
              <p className="text-sm">No requests candidates available</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
                >
                  {/* Candidate Info */}
                  <div className="col-span-3">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Father: {item.fatherName}
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="col-span-3">
                    <p className="text-sm text-gray-700">{item.email}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.phone}</p>
                  </div>

                  {/* Location */}
                  <div className="col-span-2">
                    <p className="text-sm text-gray-700">{item.state}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.district}
                    </p>
                  </div>

                  {/* Aadhar */}
                  <div className="col-span-2 flex items-center gap-2">
                    {/* Placeholder image resembling an ID card */}
                    <div className="w-12 h-8 bg-gray-200 rounded border border-gray-300 overflow-hidden relative">
                       <img src="https://placehold.co/48x32/e2e8f0/94a3b8?text=ID" alt="ID" className="w-full h-full object-cover opacity-70" />
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Terms */}
                  <div className="col-span-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Agreed
                    </span>
                  </div>

                  {/* Actions & Date */}
                  <div className="col-span-1 flex flex-col items-end gap-2">
                    <button className="flex items-center gap-1 bg-[#b91c1c] hover:bg-red-800 text-white text-xs px-3 py-1.5 rounded shadow-sm transition-colors">
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">
                      {item.submittedOn}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-50">
          Previous
        </button>
        <span className="text-sm text-gray-600">Page 1 of 3</span>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200">
          Next
        </button>
      </div>
    </>
  );
}

// --- Sub-Component: Email Composer Layout ---
function EmailComposer({ data }: { data: any[] }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Compose Section */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-[#1e1b4b] font-bold text-lg mb-4">
          Send Email to Approved Participants
        </h2>
        <textarea
          className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-gray-600"
          placeholder="Write your email here..."
        ></textarea>
      </div>

      {/* Recipient Selection List */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* Select All */}
        <div className="px-6 py-3 bg-gray-50/50 flex items-center gap-3 border-b border-gray-100">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-indigo-900 focus:ring-indigo-500 cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-700">Select All</span>
        </div>

        {/* Header Row */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/30">
            <div className="col-span-1"></div>
            <div className="col-span-4">Name</div>
            <div className="col-span-7">Email</div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100">
          {data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50"
            >
               <div className="col-span-1">
                 <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-indigo-900 focus:ring-indigo-500 cursor-pointer"
                  />
               </div>
              <div className="col-span-4">
                <p className="text-sm text-gray-900">{item.name}</p>
              </div>
              <div className="col-span-7">
                <p className="text-sm text-gray-600">{item.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
       {/* Pagination (Email View) */}
       <div className="flex items-center justify-between pb-10">
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-50">
          Previous
        </button>
        <span className="text-sm text-gray-600">Page 1 of 3</span>
        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200">
          Next
        </button>
      </div>
    </div>
  );
}