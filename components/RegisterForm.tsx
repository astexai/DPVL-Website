"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    email: "",
    phone: "",
    state: "",
    district: "",
    aadhaar: null as File | null,
    terms: false,
  });

  // OTP related states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccessMessage, setOtpSuccessMessage] = useState("");
  const [formSubmitMessage, setFormSubmitMessage] = useState("");
  const [otpToken, setOtpToken] = useState<string | null>(null); // JWT from verify
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Reset OTP verification if email changes
    if (name === "email" && otpSent) {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
      setOtpError("");
      setOtpSuccessMessage("");
      setOtpToken(null);
    }

    // Clear form submit message when form is edited
    if (formSubmitMessage) {
      setFormSubmitMessage("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        aadhaar: e.target.files![0],
      }));
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    if (otpError) setOtpError("");
  };

  // call backend to send OTP
  const sendOtp = async () => {
    if (!formData.email) {
      setOtpError("Please enter email address first");
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setOtpError("Please enter a valid email address");
      return;
    }

    setIsSendingOtp(true);
    setOtpError("");
    setOtpSuccessMessage("");

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to send OTP");
      }
      setOtpSent(true);
      setOtpSuccessMessage(data?.message || `OTP sent to ${formData.email}`);
      setTimeout(() => setOtpSuccessMessage(""), 5000);
    } catch (err: any) {
      setOtpError(err?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // call backend to verify OTP — receives token on success
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");
    setOtpSuccessMessage("");

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          otp: otp,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "OTP verification failed");
      }

      // server returns token
      const token = data?.token;
      if (!token) throw new Error("No token returned from server");
      setOtpToken(token);
      setOtpVerified(true);
      setOtpSuccessMessage("✓ Email verified successfully!");
      setTimeout(() => setOtpSuccessMessage(""), 3000);
    } catch (err: any) {
      setOtpError(err?.message || "Verification failed. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const resendOtp = () => {
    setOtpError("");
    setOtpSuccessMessage("");
    sendOtp();
  };

  // submit registration form to backend with FormData (multipart)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpVerified || !otpToken) {
      setFormSubmitMessage(
        "Please verify your email address before submitting",
      );
      return;
    }
    if (!formData.aadhaar) {
      setFormSubmitMessage("Please attach Aadhaar file");
      return;
    }

    setFormSubmitMessage("");
    try {
      const fd = new FormData();
      fd.append("token", otpToken);
      fd.append("email", formData.email.trim().toLowerCase());
      fd.append("firstName", formData.firstName);
      fd.append("lastName", formData.lastName);
      fd.append("fatherName", formData.fatherName);
      fd.append("phone", formData.phone);
      fd.append("state", formData.state);
      fd.append("district", formData.district);
      fd.append("terms", String(formData.terms));
      fd.append("aadhaar", formData.aadhaar);

      const res = await fetch("/api/register", {
        method: "POST",
        body: fd, // don't set Content-Type — browser will set multipart boundary
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Registration failed");
      }

      setFormSubmitMessage("Registration submitted successfully!");
      setShowSuccessModal(true);

      // reset form after success
      setFormData({
        firstName: "",
        lastName: "",
        fatherName: "",
        email: "",
        phone: "",
        state: "",
        district: "",
        aadhaar: null,
        terms: false,
      });
      setOtpSent(false);
      setOtp("");
      setOtpVerified(false);
      setOtpToken(null);
      // Let the success message stay for a while or until modal closed
      setTimeout(() => setFormSubmitMessage(""), 5000);
    } catch (err: any) {
      setFormSubmitMessage(
        err?.message || "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-3 md:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-7xl font-norch uppercase text-[#3B3BB7] mb-2 tracking-wide text-center">
            Player Registration
          </h2>
          <div className="md:w-90 w-20 h-1 bg-[#D159A3]" />
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* LEFT - Form */}
            <div className="p-4 md:p-10">
              <h2 className="text-3xl font-bold text-[#3B3BB7] mb-6">
                Registration Form
              </h2>

              {/* Form Submission Message */}
              {formSubmitMessage && (
                <div
                  className={`mb-4 p-3 rounded-lg ${
                    formSubmitMessage.includes("Please verify")
                      ? "bg-yellow-50 border border-yellow-200 text-yellow-800"
                      : "bg-green-50 border border-green-200 text-green-800"
                  }`}
                >
                  <p className="text-sm font-medium">{formSubmitMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Enter first name"
                      className="w-full px-4 py-2.5 border-2 placeholder:text-black/40 border-black rounded-lg focus:border-[#3b3bb7] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Enter last name"
                      className="w-full px-4 py-2.5 border-2 placeholder:text-black/40 border-black rounded-lg focus:border-[#3b3bb7] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Father Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                    placeholder="Enter father's name"
                    className="w-full px-4 py-2.5 border-2 placeholder:text-black/40 border-black rounded-lg focus:border-[#3b3bb7] focus:outline-none"
                  />
                </div>

                {/* Email with OTP */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-semibold text-gray-700">
                      Email Address *
                    </label>
                    {otpVerified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={otpVerified}
                      placeholder="Enter email address"
                      className={`flex-1 px-4 py-2.5 border-2 placeholder:text-black/40 rounded-lg focus:border-[#3b3bb7] focus:outline-none ${
                        otpVerified
                          ? "bg-gray-50 border-gray-300 text-gray-700"
                          : "border-black"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={!formData.email || otpVerified || isSendingOtp}
                      className={`px-3 md:px-4 py-2.5 rounded-lg font-semibold transition-colors min-w-[80px] md:min-w-[100px] text-sm md:text-base ${
                        !formData.email || otpVerified
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-[#3b3bb7] text-white hover:bg-[#2a2a8a] active:scale-95"
                      }`}
                    >
                      {isSendingOtp ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-4 w-4 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending
                        </span>
                      ) : otpVerified ? (
                        "Verified"
                      ) : (
                        "Verify"
                      )}
                    </button>
                  </div>

                  {/* OTP Success Message */}
                  {otpSuccessMessage && !otpError && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">
                        {otpSuccessMessage}
                      </p>
                    </div>
                  )}
                </div>

                {/* OTP Input Section */}
                {otpSent && !otpVerified && (
                  <div className="p-3 md:p-4 border-2 border-[#3b3bb7]/20 rounded-lg bg-blue-50/50">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-semibold text-gray-700">
                        Enter Verification Code *
                      </label>
                      <button
                        type="button"
                        onClick={resendOtp}
                        disabled={isSendingOtp}
                        className="text-sm text-[#3b3bb7] font-semibold hover:text-[#2a2a8a] hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        {isSendingOtp ? "Resending..." : "Resend Code"}
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={otp}
                          onChange={handleOtpChange}
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                          className="w-full px-4 py-2.5 border-2 placeholder:text-black/40 border-black rounded-lg focus:border-[#3b3bb7] focus:outline-none"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                          {otp.length}/6
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={verifyOtp}
                        disabled={!otp || otp.length !== 6 || isVerifyingOtp}
                        className={`px-3 md:px-4 py-2.5 rounded-lg font-semibold transition-colors min-w-[80px] md:min-w-[100px] text-sm md:text-base ${
                          !otp || otp.length !== 6
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700 active:scale-95"
                        }`}
                      >
                        {isVerifyingOtp ? (
                          <span className="flex items-center justify-center">
                            <svg
                              className="animate-spin h-4 w-4 mr-2 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Verifying
                          </span>
                        ) : (
                          "Verify"
                        )}
                      </button>
                    </div>

                    {/* OTP Error Message */}
                    {otpError && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800 font-medium">
                          {otpError}
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-gray-600 mt-3">
                      A 6-digit verification code has been sent to{" "}
                      <span className="font-semibold">{formData.email}</span>
                    </p>
                  </div>
                )}

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter mobile number"
                    className="w-full px-4 py-2.5 border-2 placeholder:text-black/40 border-black rounded-lg focus:border-[#3b3bb7] focus:outline-none"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Select State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className={`
                      w-full px-4 py-2.5 border-2 border-black rounded-lg
                      focus:border-[#3b3bb7] focus:outline-none 
                      ${formData.state === "" ? "text-black/40" : "text-black"}
                    `}
                  >
                    <option value="" disabled hidden>
                      Choose your state
                    </option>
                    <option value="Andhra Pradesh" className="text-black">
                      Andhra Pradesh
                    </option>
                    {/* ... other states ... */}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    District *
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    placeholder="Enter district"
                    className="w-full px-4 py-2.5 border-2 placeholder:text-black/40 border-black rounded-lg focus:border-[#3b3bb7] focus:outline-none"
                  />
                </div>

                {/* Aadhaar Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Attach Aadhaar Card *
                  </label>
                  <div className="border-2 border-dashed border-black rounded-lg p-4 md:p-6 text-center hover:bg-gray-50 transition-colors">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                      id="aadhaarUpload"
                    />
                    <label
                      htmlFor="aadhaarUpload"
                      className="cursor-pointer text-[#3b3bb7] font-semibold hover:text-[#2a2a8a]"
                    >
                      Click to upload
                    </label>
                    <p className="text-sm text-gray-500 mt-1">
                      Aadhaar Card (MAX. 5MB)
                    </p>
                    {formData.aadhaar && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.aadhaar.name} selected
                      </p>
                    )}
                  </div>
                  <p className="mt-3 text-[10px] md:text-xs text-gray-600 leading-relaxed font-medium bg-gray-50 p-2 rounded-md border border-gray-200">
                    आधार कार्ड का फोटो दोनों साइड का एक फोटो बनाकर अपलोड करें और
                    फॉर्म को टॉप साइज पर करें। अगर आप अपना फॉर्म सही नहीं करते
                    हैं अथवा आपका फॉर्म किसी प्रकार का कमी पाई गई तो आपका
                    पंजीकरण स्वीकार नहीं किया जाएगा। धन्यवाद।
                  </p>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 text-[#3b3bb7] focus:ring-[#3b3bb7] border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-[#3b3bb7] font-semibold hover:text-[#2a2a8a] hover:underline"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>

                {/* Registration Fee Display */}
                <div className="pt-2">
                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <span className="text-sm font-semibold text-gray-700 font-roboto tracking-wider">
                      REGISTRATION FEE :
                    </span>
                    <span className="text-lg font-bold text-[#3b3bb7]">
                      ₹299
                    </span>
                  </div>
                </div>

                {/* Submit Button with Status */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!otpVerified || !formData.terms}
                    className={`w-full py-3.5 rounded-lg font-bold transition-all duration-200 ${
                      otpVerified && formData.terms
                        ? "bg-[#3b3bb7] text-white hover:bg-[#2a2a8a] active:scale-[0.99] shadow-md hover:shadow-lg"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {otpVerified
                      ? "Complete Registration"
                      : "Verify Email to Continue"}
                  </button>

                  {(!otpVerified || !formData.terms) && (
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      {!otpVerified
                        ? "Email verification required"
                        : "Please accept terms and conditions"}
                    </p>
                  )}
                </div>
              </form>
            </div>

            {/* RIGHT - Image */}
            <div className="relative bg-gradient-to-br from-[#3b3bb7] to-[#D159A3] min-h-[400px] lg:min-h-full hidden md:block">
              <Image
                src="/assets/bg/Register.jpg"
                alt="DPVL"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Registration successful!
            </h3>
            <p className="text-gray-600 mb-8">
              Our team will contact you shortly.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-[#3B3BB7] text-white font-bold rounded-xl hover:bg-indigo-800 transition-colors shadow-lg active:scale-95"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
