import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-20 md:py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          {/* Main Heading */}
          <h1 className="font-norch text-center text-4xl md:text-6xl text-[#3b3bb7] mb-2 uppercase">
            Privacy Policy
          </h1>
          <p className="font-roboto text-center text-gray-500 mb-12 italic text-lg">
            For Delhi Pro Volleyball League
          </p>

          <div className="font-roboto space-y-10 text-gray-700 leading-relaxed">
            {/* 1. Introduction */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                1. Introduction
              </h2>
              <p className="text-justify">
                The Delhi Pro Volleyball League (“DPVL”, “we”, “our”, or “us”)
                respects your privacy and is committed to protecting your
                personal data. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website or use our services. By accessing or using our website,
                you agree to the terms of this Privacy Policy.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                2. Information We Collect
              </h2>
              <p className="mb-4">
                We may collect the following types of information:
              </p>

              <div className="ml-4 space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    a. Personal Information
                  </h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Date of birth</li>
                    <li>Address</li>
                    <li>
                      Any information submitted through forms (registrations,
                      trials, contact forms)
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    b. Non-Personal Information
                  </h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Browser type</li>
                    <li>Device information</li>
                    <li>IP address</li>
                    <li>Pages visited and time spent on the website</li>
                    <li>Cookies and usage data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. How We Use Information */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">We use the collected information to:</p>
              <ul className="list-disc ml-6 space-y-2 text-justify">
                <li>
                  Manage registrations, trials, events, and league activities
                </li>
                <li>Communicate updates, announcements, and notifications</li>
                <li>Improve website performance and user experience</li>
                <li>Ensure compliance with legal obligations</li>
                <li>Prevent fraud and maintain website security</li>
              </ul>
            </section>

            {/* 4. Cookies Policy */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                4. Cookies Policy
              </h2>
              <p className="text-justify">
                Our website may use cookies and similar tracking technologies to
                enhance user experience. Cookies help us understand user
                behavior and improve our services. You can disable cookies in
                your browser settings if you prefer.
              </p>
            </section>

            {/* 5. Sharing of Information */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                5. Sharing of Information
              </h2>
              <p className="mb-4">
                We do not sell or rent your personal information. We may share
                information only:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  With authorized partners or service providers for league
                  operations
                </li>
                <li>When required by law or legal authorities</li>
                <li>
                  To protect the rights, property, or safety of DPVL, users, or
                  others
                </li>
              </ul>
            </section>

            {/* 6. Data Security */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                6. Data Security
              </h2>
              <p className="text-justify">
                We implement appropriate technical and organizational measures
                to protect your personal information from unauthorized access,
                misuse, or disclosure. However, no digital platform is 100%
                secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* 7. Third-Party Links */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                7. Third-Party Links
              </h2>
              <p className="text-justify">
                Our website may contain links to third-party websites. DPVL is
                not responsible for the privacy practices or content of such
                external websites.
              </p>
            </section>

            {/* 8. Children’s Privacy */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                8. Children’s Privacy
              </h2>
              <p className="text-justify">
                Our services are not directed toward children under the age of
                13 without parental consent. We do not knowingly collect
                personal data from minors.
              </p>
            </section>

            {/* 9. Changes to This Privacy Policy */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                9. Changes to This Privacy Policy
              </h2>
              <p className="text-justify">
                We reserve the right to update this Privacy Policy at any time.
                Any changes will be posted on this page with an updated
                effective date.
              </p>
            </section>

            {/* 10. Contact Us */}
            <section className="pt-6 border-t border-gray-100">
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                10. Contact Us
              </h2>
              <p className="mb-2 text-lg">
                For any questions or concerns regarding this Privacy Policy,
                please contact us at:
              </p>
              <a
                href="mailto:info@delhiprovolleyball.com"
                className="text-[#3b3bb7] font-bold text-xl hover:underline"
              >
                info@delhiprovolleyball.com
              </a>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
