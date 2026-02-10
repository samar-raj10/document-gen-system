import { FileText, Clipboard, CheckCircle, User, ArrowRight } from "lucide-react";
import AdminSidenav from "../components/ui/AdminSidebar";

export function AdminDashboard() {
  const adminName = "Admin User";

  // Sample certificate requests data
  const certificateRequests = [
    {
      id: 1,
      studentName: "Samar Raj",
      enrollmentNumber: "2427030312",
      certificateType: "LOR",
      purpose: "Job Application",
      status: "Pending",
      date: "2024-01-15"
    },
    {
      id: 2,
      studentName: "Sahil Kumar",
      enrollmentNumber: "2427030313",
      certificateType: "Bonafide",
      purpose: "Bank Loan",
      status: "Approved",
      date: "2024-01-14"
    },
    {
      id: 3,
      studentName: "Manthan Vats",
      enrollmentNumber: "2427030314",
      certificateType: "No-Dues",
      purpose: "Graduation",
      status: "Rejected",
      date: "2024-01-13"
    },
    {
      id: 4,
      studentName: "Anupal Rajkumar",
      enrollmentNumber: "2427030315",
      certificateType: "Character",
      purpose: "Visa Application",
      status: "Pending",
      date: "2024-01-12"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-amber-600 bg-amber-50";
      case "Approved":
        return "text-green-600 bg-green-50";
      case "Rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-neutral-600 bg-neutral-50";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidenav />
      <main className="flex-1 overflow-auto">
        {/* Welcome Section */}
        <section className="px-6 py-8 md:px-12 md:py-12 bg-linear-to-r from-white to-amber-50 border-b border-amber-100">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
              Welcome, {adminName}
            </h1>
            <p className="text-lg text-neutral-600 mb-6">
              Manage certificate requests and oversee the system.
            </p>

            {/* Admin Info Card */}
            <div className="bg-white border border-amber-100 rounded-lg p-6 inline-block shadow-sm">
              <div className="flex gap-6">
                <div>
                  <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
                    Role
                  </p>
                  <p className="text-xl font-bold text-neutral-900">Administrator</p>
                </div>
                <div className="border-l border-amber-200" />
                <div>
                  <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
                    Pending Requests
                  </p>
                  <p className="text-xl font-bold text-neutral-900">
                    {certificateRequests.filter(req => req.status === "Pending").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificate Requests Section */}
        <section className="px-6 py-12 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
              Certificate Requests
            </h2>

            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-amber-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-amber-600 uppercase tracking-wide">
                        Student Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-amber-600 uppercase tracking-wide">
                        Enrollment Number
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-amber-600 uppercase tracking-wide">
                        Certificate Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-amber-600 uppercase tracking-wide">
                        Purpose
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-amber-600 uppercase tracking-wide">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-amber-600 uppercase tracking-wide">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {certificateRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4 text-sm text-neutral-900">
                          {request.studentName}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-900">
                          {request.enrollmentNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-900">
                          {request.certificateType}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-900">
                          {request.purpose}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-900">
                          {request.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Admin Actions Section */}
        <section className="px-6 py-12 md:px-12 bg-neutral-50 flex-1">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
              Admin Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Review Requests</h3>
                <p className="text-sm text-neutral-600">
                  Review and approve or reject certificate requests from students.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Generate Certificates</h3>
                <p className="text-sm text-neutral-600">
                  Generate and issue approved certificates to students.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold mb-4">
                  3
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Monitor System</h3>
                <p className="text-sm text-neutral-600">
                  Track system usage and manage administrative tasks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}