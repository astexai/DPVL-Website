'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-full px-5 md:px-20 py-10 bg-white">
      {/* Unified Grid Block: Form Up, Map Down, No Gaps */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Upside: Contact Form Section */}
        <section className="relative py-7 px-5 md:px-10 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 h-150 z-0 ">
            <Image
              src="/assets/bg/ContactUs.png"
              alt="Contact Background"
              fill
              className="object-cover"
              priority
            />
            {/* Dark Overlay for better contrast */}
            <div className="absolute inset-0 " />
          </div>

          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 ">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-0.5 bg-white rounded-full" />
                  <span className="text-white text-sm font-medium tracking-wider uppercase">
                    Contact Us
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Contact With Us!
                </h1>
                <p className="text-white/90 text-base leading-relaxed max-w-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              {/* Right Form */}
              <div className=" p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="w-full">
                    <label htmlFor="fullName" className="block text-white text-xs font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-white text-xs font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-white text-xs font-medium mb-2">
                        Phone No.
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="9998188832"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label htmlFor="date" className="block text-white text-xs font-medium mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-xl text-white focus:outline-none focus:border-white/60 [color-scheme:dark]"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="message" className="block text-white text-xs font-medium mb-2">
                      Ask any question
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Message..."
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/15 backdrop-blur-md border-2 border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto bg-[#C04493] text-white font-semibold px-12 py-3 rounded-lg hover:shadow-2xl hover:shadow-pink-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm tracking-wide"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Downside: Map Section */}
        <section className="relative w-full h-[350px] md:h-[500px] bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2175112053654!2d-73.98784368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            className="w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="League Office Location"
          />
        </section>

      </div>
    </div>
  );
};

export default ContactSection;