import { FileText, Clipboard, CheckCircle, User, ArrowRight } from "lucide-react";
import AdminSidenav from "../components/ui/AdminSidebar";

export function HODDashboard() {
  const hodName = "HOD User";

  const certificateRequests = [
    {
      id: 1,
      studentName: "Samar Raj",
      enrollmentNumber: "2427030312",
      certificateType: "LOR",
      purpose: "Job Application",
      status: "Pending",
      date: "2024-01-15"
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

        {/* Welcome */}
        <section className="px-6 py-10 bg-gradient-to-r from-white to-purple-50 border-b">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold">Welcome, {hodName}</h1>
            <p className="text-neutral-600 mt-2">Department level approval panel</p>
          </div>
        </section>

        {/* Table */}
        <section className="px-6 py-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Faculty Approved Requests</h2>

            <table className="w-full bg-white border rounded-lg">
              <thead className="bg-purple-50">
                <tr>
                  <th className="p-4 text-left text-purple-600">Student</th>
                  <th className="p-4 text-left text-purple-600">Enrollment</th>
                  <th className="p-4 text-left text-purple-600">Type</th>
                  <th className="p-4 text-left text-purple-600">Status</th>
                  <th className="p-4 text-left text-purple-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {certificateRequests.map(req => (
                  <tr key={req.id}>
                    <td className="p-4">{req.studentName}</td>
                    <td className="p-4">{req.enrollmentNumber}</td>
                    <td className="p-4">{req.certificateType}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4">{req.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}