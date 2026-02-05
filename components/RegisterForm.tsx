'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fatherName: '',
    email: '',
    phone: '',
    state: '',
    district: '',
    aadhaar: null as File | null,
    age: '',
    gender: '',
    position: '',
    experience: '',
    terms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({
        ...prev,
        aadhaar: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Registration submitted!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center mb-12">
            <h2 className="text-5xl md:text-7xl font-norch uppercase text-[#3B3BB7] mb-2 tracking-wide">
              Player Registration
            </h2>
            <div className="md:w-90 w-20 h-1 bg-[#D159A3]" />
          </div>


        {/* Main Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2">

            {/* LEFT - Form */}
            <div className="p-6 md:p-10">
              <h2 className="text-3xl font-bold text-[#3B3BB7] mb-6">
                Registration Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-4">
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
                    Father’s Name *
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

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email address"
                    className="w-full px-4 py-2.5 border-2 placeholder:text-black/40 border-black rounded-lg focus:border-[#3b3bb7] focus:outline-none"
                  />
                </div>

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

    {/* States */}
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>

    {/* Union Territories */}
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">
      Dadra and Nagar Haveli and Daman and Diu
    </option>
    <option value="Delhi">Delhi</option>
    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
    <option value="Ladakh">Ladakh</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
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
                  <div className="border-2 border-dashed border-black rounded-lg p-6 text-center">
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
                      className="cursor-pointer text-[#3b3bb7] font-semibold"
                    >
                      Click to upload
                    </label>
                    <p className="text-sm text-gray-500 mt-1">
                      Aadhaar Card (MAX. 5MB)
                    </p>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4"
                  />
                  <label className="text-sm text-gray-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-[#3b3bb7] font-semibold">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#3b3bb7] text-white py-3 rounded-lg font-bold hover:bg-[#2a2a8a] transition-colors"
                >
                  Complete Registration
                </button>
              </form>
            </div>

            {/* RIGHT - Image */}
            <div className="relative bg-gradient-to-br from-[#3b3bb7] to-[#D159A3] min-h-[400px] lg:min-h-full">
              <Image
                src="/assets/bg/Register.webp"
                alt="DPVL"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
