import { FileText, Clipboard, CheckCircle, User, ArrowRight } from "lucide-react";
import AdminSidenav from "../components/ui/AdminSidebar";

export function FacultyDashboard() {
  const facultyName = "Faculty User";

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
        <section className="px-6 py-8 md:px-12 md:py-12 bg-linear-to-r from-white to-blue-50 border-b border-blue-100">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
              Welcome, {facultyName}
            </h1>
            <p className="text-lg text-neutral-600 mb-6">
              Manage and review student certificate requests.
            </p>

            <div className="bg-white border border-blue-100 rounded-lg p-6 inline-block shadow-sm">
              <div className="flex gap-6">
                <div>
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    Role
                  </p>
                  <p className="text-xl font-bold text-neutral-900">Faculty</p>
                </div>
                <div className="border-l border-blue-200" />
                <div>
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
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

        {/* Table Section */}
        <section className="px-6 py-12 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
              Student Requests (Assigned to You)
            </h2>

            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 uppercase tracking-wide">
                        Student Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 uppercase tracking-wide">
                        Enrollment Number
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 uppercase tracking-wide">
                        Certificate Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 uppercase tracking-wide">
                        Purpose
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 uppercase tracking-wide">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 uppercase tracking-wide">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {certificateRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 text-sm">{request.studentName}</td>
                        <td className="px-6 py-4 text-sm">{request.enrollmentNumber}</td>
                        <td className="px-6 py-4 text-sm">{request.certificateType}</td>
                        <td className="px-6 py-4 text-sm">{request.purpose}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{request.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Faculty Actions */}
        <section className="px-6 py-12 md:px-12 bg-neutral-50">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Review Requests</h3>
              <p className="text-sm text-neutral-600">Check student applications.</p>
            </div>
            <div className="bg-white p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Approve / Reject</h3>
              <p className="text-sm text-neutral-600">Send decision to HOD.</p>
            </div>
            <div className="bg-white p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Track History</h3>
              <p className="text-sm text-neutral-600">View your past approvals.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}