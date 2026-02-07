"use client"
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function BannersAdmin() {
  const [banners, setBanners] = useState<any[]>([]); 
  const [title, setTitle] = useState("");
  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [laptopFile, setLaptopFile] = useState<File | null>(null);
  const [mobilePreview, setMobilePreview] = useState<string | null>(null);
  const [laptopPreview, setLaptopPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);
  const laptopFileInputRef = useRef<HTMLInputElement>(null);
useEffect(() => {
  // load banners from backend
  fetch("/api/banners")
    .then((r) => r.json())
    .then((data) => {
      console.log("Raw API response:", data);
      if (data?.banners && Array.isArray(data.banners)) {
        // Log each banner's structure
        data.banners.forEach((b: any, idx: number) => {
          console.log(`Banner ${idx}:`, {
            _id: b._id,
            title: b.title,
            mobileSrc: b.mobileSrc,
            laptopSrc: b.laptopSrc,
            status: b.status
          });
        });
        
        const mapped = data.banners.map((b: any, idx: number) => ({
          _id: b._id,
          id: b._id ?? idx + 1,
          title: b.title ?? "",
          mobileSrc: b.mobileSrc,
          laptopSrc: b.laptopSrc,
          status: b.status ?? "Active",
        }));
        setBanners(mapped);
      }
    })
    .catch((err) => console.error("Failed to load banners", err));
}, []);

  const handleMobileFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMobileFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMobilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLaptopFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLaptopFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLaptopPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!mobileFile || !laptopFile) {
      alert("Please select both mobile and laptop images");
      return;
    }

    setUploading(true);
    
    try {
      const payload = {
        title: (title && title.trim()) ? title.trim() : "", 
        mobileSrc: mobilePreview,
        laptopSrc: laptopPreview,
        status: "Active",
      };

      const res = await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      
      // LOGIC: [...prev, appended] adds the new banner to the END of the list
      const appended = {
        id: data.banner._id || banners.length + 1,
        title: data.banner.title ?? "",
        mobileSrc: data.banner.mobileSrc,
        laptopSrc: data.banner.laptopSrc,
        status: data.banner.status ?? "Active",
      };
      
      setBanners((prev) => [...prev, appended]);
      
      // Reset form
      setTitle("");
      setMobileFile(null);
      setLaptopFile(null);
      setMobilePreview(null);
      setLaptopPreview(null);
      if (mobileFileInputRef.current) mobileFileInputRef.current.value = "";
      if (laptopFileInputRef.current) laptopFileInputRef.current.value = "";
      
      alert("Banner uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload banner");
    } finally {
      setUploading(false);
    }
  };

const handleDelete = async (banner: any) => {
  if (!confirm("Are you sure you want to delete this banner?")) return;
  
  console.log("Attempting to delete:", banner);
  
  try {
    // Try to get the ID in multiple ways
    let bannerId = null;
    
    if (banner._id) {
      bannerId = banner._id;
      console.log("Using _id:", bannerId);
    } else if (banner.id) {
      bannerId = banner.id;
      console.log("Using id:", bannerId);
    }
    
    if (!bannerId) {
      throw new Error("No valid ID found for banner");
    }

    // Ensure the ID is a string
    const idString = String(bannerId);
    console.log("ID string:", idString);
    
    const res = await fetch(`/api/banners?id=${encodeURIComponent(idString)}`, { 
      method: "DELETE" 
    });
    
    console.log("Response status:", res.status);
    
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Non-JSON response:", text.substring(0, 500));
      throw new Error(`Server returned ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log("Response data:", data);
    
    if (!res.ok) {
      throw new Error(data.error || data.details || `Delete failed with status ${res.status}`);
    }
    
    // Remove from state - match by both _id and id
    setBanners((prev) => prev.filter((b) => 
      String(b._id) !== String(bannerId) && String(b.id) !== String(bannerId)
    ));
    
    alert(data.message || "Banner deleted successfully!");
  } catch (err: any) {
    console.error("Failed to delete banner:", err);
    alert(`Failed to delete banner: ${err.message || "Unknown error"}`);
  }
};

  const triggerMobileFileInput = () => {
    mobileFileInputRef.current?.click();
  };

  const triggerLaptopFileInput = () => {
    laptopFileInputRef.current?.click();
  };

  return (
    <div className="p-3 md:p-4 space-y-4 max-w-full">
      {/* Upload Banner Card */}
      <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Upload New Banner</h2>
        
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Banner Title (Optional)
            </label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-[#7c2cff] focus:border-transparent" 
              placeholder="e.g. Summer Tournament 2024"
            />
          </div>

          {/* File Uploads - Mobile & Laptop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mobile Banner Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">
                Mobile Banner (Portrait) <span className="text-red-500">*</span>
              </label>
              
              <div className="md:hidden">
                <button
                  onClick={triggerMobileFileInput}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center hover:border-[#7c2cff] hover:bg-[#7c2cff]/5 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-xs font-medium text-gray-600">
                    {mobileFile ? mobileFile.name : "Upload Mobile Banner"}
                  </span>
                  <span className="text-[10px] text-gray-500 mt-1">
                    Recommended: 9:16 aspect ratio
                  </span>
                </button>
              </div>

              <div className="hidden md:block">
                <input 
                  ref={mobileFileInputRef}
                  type="file" 
                  onChange={handleMobileFileSelect}
                  className="w-full text-xs border border-gray-300 rounded-md p-1.5 bg-white file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-[#7c2cff]/10 file:text-[#7c2cff] hover:file:bg-[#7c2cff]/20"
                  accept="image/*"
                />
              </div>

              <input
                ref={mobileFileInputRef}
                type="file"
                onChange={handleMobileFileSelect}
                className="hidden"
                accept="image/*"
              />

              {mobilePreview && (
                <div className="mt-2 p-2 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-600 mb-1">Mobile Preview:</p>
                  <div className="relative w-full h-32 rounded overflow-hidden">
                    <Image
                      src={mobilePreview}
                      alt="Mobile Preview"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Laptop Banner Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-700">
                Laptop Banner (Landscape) <span className="text-red-500">*</span>
              </label>
              
              <div className="md:hidden">
                <button
                  onClick={triggerLaptopFileInput}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center hover:border-[#7c2cff] hover:bg-[#7c2cff]/5 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-600">
                    {laptopFile ? laptopFile.name : "Upload Laptop Banner"}
                  </span>
                  <span className="text-[10px] text-gray-500 mt-1">
                    Recommended: 16:9 aspect ratio
                  </span>
                </button>
              </div>

              <div className="hidden md:block">
                <input 
                  ref={laptopFileInputRef}
                  type="file" 
                  onChange={handleLaptopFileSelect}
                  className="w-full text-xs border border-gray-300 rounded-md p-1.5 bg-white file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-[#7c2cff]/10 file:text-[#7c2cff] hover:file:bg-[#7c2cff]/20"
                  accept="image/*"
                />
              </div>

              <input
                ref={laptopFileInputRef}
                type="file"
                onChange={handleLaptopFileSelect}
                className="hidden"
                accept="image/*"
              />

              {laptopPreview && (
                <div className="mt-2 p-2 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-xs text-gray-600 mb-1">Laptop Preview:</p>
                  <div className="relative w-full h-24 rounded overflow-hidden">
                    <Image
                      src={laptopPreview}
                      alt="Laptop Preview"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleUpload}
              disabled={uploading || !mobileFile || !laptopFile}
              className="bg-[#7c2cff] text-white text-sm px-4 py-2 rounded-md hover:bg-[#6b1de8] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                "Upload Banner"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Active Banners Card */}
      <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-semibold text-gray-800">Active Banners ({banners.length})</h3>
          <span className="text-xs text-gray-500">
            {banners.filter(b => b.status === "Active").length} active
          </span>
        </div>
        
        {banners.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-sm mb-2">No banners uploaded yet</div>
            <div className="text-xs text-gray-500">Upload your first banner using the form above</div>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-3 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              {/* Mobile View - Cards */}
              <div className="md:hidden space-y-3">
                {banners.map(b => (
                  <div key={b.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-gray-900">
                          {b.title ? b.title : <span className="text-gray-400 italic">(No Title)</span>}
                        </h4>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          b.status === "Active" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Mobile</p>
                          <div className="relative w-full h-24 rounded overflow-hidden border border-gray-200">
                            <Image
                              src={b.mobileSrc}
                              alt="Mobile"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Laptop</p>
                          <div className="relative w-full h-24 rounded overflow-hidden border border-gray-200">
                            <Image
                              src={b.laptopSrc}
                              alt="Laptop"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
  onClick={() => handleDelete(b)}
  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md transition-colors font-medium"
>
  Delete
</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View - Table */}
              <table className="min-w-full divide-y divide-gray-200 text-sm hidden md:table">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Mobile Preview</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Laptop Preview</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {banners.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {b.title ? b.title : <span className="text-gray-400 italic">(No Title)</span>}
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 relative w-16 h-24 rounded overflow-hidden border border-gray-200">
                            <Image
                              src={b.mobileSrc}
                              alt="Mobile"
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <span className="ml-2 text-xs text-gray-500">Mobile</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 relative w-32 h-18 rounded overflow-hidden border border-gray-200">
                            <Image
                              src={b.laptopSrc}
                              alt="Laptop"
                              fill
                              className="object-cover"
                              sizes="128px"
                            />
                          </div>
                          <span className="ml-2 text-xs text-gray-500">Laptop</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          b.status === "Active" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <button
  onClick={() => handleDelete(b)}
  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md transition-colors font-medium"
>
  Delete
</button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}