import { useState } from "react";
import { FileText, Send } from "lucide-react";

export function Lor() {
  const [formData, setFormData] = useState({
    studentName: "Samar Raj",
    rollNumber: "2427030312",
    email: "samar.raj@student.edu",
    reason: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.reason.trim()) {
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ ...formData, reason: "" });
      }, 3000);
    }
  };

  return (
    <>
        {/* Header Section */}
        <section className="px-6 py-8 md:px-12 md:py-10 bg-linear-to-r from-white to-amber-50 border-b border-amber-100">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <FileText className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
                Request Letter of Recommendation (LOR)
              </h1>
            </div>
            <p className="text-neutral-600 text-lg">
              Submit your request for a Letter of Recommendation below.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="px-6 py-12 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-neutral-200 rounded-lg p-8 shadow-sm">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    Request Submitted Successfully!
                  </h2>
                  <p className="text-neutral-600">
                    Your LOR request has been submitted. You will be notified once it is processed.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Student Name */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Student Name
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Roll Number and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Roll Number
                      </label>
                      <input
                        type="text"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50"
                        placeholder="Enter your roll number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Reason for Request */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Reason for Request
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-neutral-50 resize-none"
                      placeholder="Please provide the reason for requesting an LOR (e.g., higher education, job application, scholarship)..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      <Send className="w-5 h-5" />
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          studentName: "Samar Raj",
                          rollNumber: "2427030312",
                          email: "samar.raj@student.edu",
                          reason: "",
                        })
                      }
                      className="px-6 py-3 border border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Info Section */}
            <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="font-semibold text-neutral-900 mb-2">ℹ️ Need Help?</h3>
              <p className="text-sm text-neutral-700">
                A Letter of Recommendation is typically required for higher education applications, scholarships, or job opportunities. Please provide sufficient details about your request to expedite processing.
              </p>
            </div>
          </div>
        </section>
    </>
  );
}

export default Lor;
