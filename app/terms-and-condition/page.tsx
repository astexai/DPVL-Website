import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-20 md:py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          {/* Main Heading */}
          <h1 className="font-norch text-center text-4xl md:text-6xl text-[#3b3bb7] mb-2 uppercase">
            Terms & Conditions
          </h1>
          <p className="font-roboto text-center text-gray-500 mb-12 italic text-lg">
            & Disclaimer For Delhi Pro Volleyball League
          </p>

          <div className="font-roboto space-y-10 text-gray-700 leading-relaxed">
            {/* 1. Accuracy of Information */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                1. Accuracy of Information
              </h2>
              <p className="text-justify">
                The applicant confirms that all information, documents, and declarations submitted as part of this registration are true, complete, and accurate to the best of their knowledge. Any false, misleading, or incomplete information may result in rejection or disqualification at any stage without notice.
              </p>
            </section>

            {/* 2. Registration & Selection */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                2. Registration & Selection
              </h2>
              <p className="text-justify">
                Submission of this registration form does not guarantee selection, trial participation, auction inclusion, team allotment, or engagement in the League in any capacity. Selection shall be strictly at the sole discretion of the League Management and/or its appointed selectors.
              </p>
            </section>

            {/* 3. Final Authority */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                3. Final Authority
              </h2>
              <p className="text-justify">
                All decisions taken by the League Management, selectors, or authorized officials with respect to registration, trials, selection, auction, scheduling, participation, and related matters shall be final, conclusive, and binding on the applicant.
              </p>
            </section>

            {/* 4. Eligibility & Compliance */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                4. Eligibility & Compliance
              </h2>
              <p className="text-justify">
                The applicant confirms that they meet all eligibility criteria prescribed by the League, including age, fitness, and regulatory requirements, and agrees to comply with all League rules, codes of conduct, anti-doping regulations, and disciplinary policies as may be amended from time to time.
              </p>
            </section>

            {/* 5. Medical Fitness & Risk Acknowledgement */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                5. Medical Fitness & Risk Acknowledgement
              </h2>
              <p className="text-justify">
                The applicant acknowledges that participation in sports involves inherent risks of injury. The applicant declares themselves medically fit to participate and agrees that the League, its organizers, officials, sponsors, and partners shall not be held liable for any injury, illness, loss, or damage arising during trials, camps, matches, or related activities, except as required by applicable law.
              </p>
            </section>

            {/* 6. Code of Conduct & Discipline */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                6. Code of Conduct & Discipline
              </h2>
              <p className="text-justify">
                The applicant agrees to maintain professional behavior and discipline at all times. Any misconduct, indiscipline, breach of League rules, or actions bringing disrepute to the League may result in immediate disqualification or disciplinary action.
              </p>
            </section>

            {/* 7. Use of Image & Media Rights */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                7. Use of Image & Media Rights
              </h2>
              <p className="text-justify">
                The applicant grants the League the irrevocable right to use their name, image, likeness, voice, and performance for promotional, marketing, broadcast, archival, and commercial purposes, without any additional compensation, unless otherwise agreed in writing.
              </p>
            </section>

            {/* 8. Fees & Expenses */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                8. Fees & Expenses
              </h2>
              <p className="text-justify">
                Any registration fees paid are non-refundable unless explicitly stated otherwise. The League shall not be responsible for any personal expenses incurred by the applicant in connection with registration, trials, travel, accommodation, or participation unless specifically agreed in writing.
              </p>
            </section>

            {/* 9. Data Protection & Privacy */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                9. Data Protection & Privacy
              </h2>
              <p className="text-justify">
                The applicant consents to the collection, storage, and use of their personal data by the League for purposes related to registration, selection, administration, and promotion, in accordance with applicable data protection laws.
              </p>
            </section>

            {/* 10. No Legal Claim */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                10. No Legal Claim
              </h2>
              <p className="text-justify">
                The applicant agrees that no claim, right, demand, or dispute shall arise against the League, its organizers, officials, sponsors, or partners in relation to non-selection, non-participation, or any decision taken by the League in good faith.
              </p>
            </section>

            {/* 11. Jurisdiction */}
            <section>
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                11. Jurisdiction
              </h2>
              <p className="text-justify">
                These Terms & Conditions shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts at the League&apos;s designated location.
              </p>
            </section>

            {/* Disclaimer Section */}
            <section className="pt-6 border-t border-gray-100">
              <h2 className="font-roboto font-bold text-xl md:text-2xl text-gray-900 mb-4 uppercase tracking-normal">
                Disclaimer
              </h2>
              <p className="text-justify">
                The League reserves the right to modify, amend, postpone, suspend, or cancel the registration process, trials, or the League itself without prior notice due to administrative, technical, commercial, or force majeure reasons. Such actions shall not give rise to any claim or compensation against the League.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}