import { FileText, Clipboard, CheckCircle, User, ArrowRight } from "lucide-react";

export function Home() {
  const studentName = "Samar Raj";
  const studentId = "2427030312";
  const semester = "3rd Semester";

  const quickActions = [
    {
      id: 1,
      title: "Request LOR",
      description: "Letter of Recommendation",
      icon: <FileText className="w-6 h-6" />,
      href: "/request/lor",
      color: "amber",
    },
    {
      id: 2,
      title: "Bonafide Certificate",
      description: "Student Verification",
      icon: <Clipboard className="w-6 h-6" />,
      href: "/request/bonafide",
      color: "amber",
    },
    {
      id: 3,
      title: "No-Dues Certificate",
      description: "Financial Clearance",
      icon: <CheckCircle className="w-6 h-6" />,
      href: "/request/no-dues",
      color: "amber",
    },
    {
      id: 4,
      title: "Character Certificate",
      description: "Conduct Record",
      icon: <User className="w-6 h-6" />,
      href: "/request/character",
      color: "amber",
    },
  ];

  return (
    <>
      {/* Welcome Section */}
      <section className="px-6 py-8 md:px-12 md:py-12 bg-linear-to-r from-white to-amber-50 border-b border-amber-100">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
              Welcome, {studentName}
            </h1>
            <p className="text-lg text-neutral-600 mb-6">
              Manage all your academic document requests easily.
            </p>

            {/* Student Info Card */}
            <div className="bg-white border border-amber-100 rounded-lg p-6 inline-block shadow-sm">
              <div className="flex gap-6">
                <div>
                  <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
                    Student ID
                  </p>
                  <p className="text-xl font-bold text-neutral-900">{studentId}</p>
                </div>
                <div className="border-l border-amber-200" />
                <div>
                  <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide">
                    Current Semester
                  </p>
                  <p className="text-xl font-bold text-neutral-900">{semester}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <section className="px-6 py-12 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action) => (
                <a
                  key={action.id}
                  href={action.href}
                  className="group bg-white border border-neutral-200 rounded-lg p-6 hover:border-amber-300 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-amber-50 rounded-lg text-amber-600 group-hover:bg-amber-100 transition-colors">
                      {action.icon}
                    </div>
                    <ArrowRight className="w-5 h-5 text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 text-lg mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-neutral-500">{action.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="px-6 py-12 md:px-12 bg-neutral-50 flex-1">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold mb-4">
                  1
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Select a Document</h3>
                <p className="text-sm text-neutral-600">
                  Choose the academic document you need from the quick actions above.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold mb-4">
                  2
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Submit Your Request</h3>
                <p className="text-sm text-neutral-600">
                  Fill in the required details and submit your document request.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-neutral-200">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold mb-4">
                  3
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Track & Download</h3>
                <p className="text-sm text-neutral-600">
                  Monitor your request status and download once processed.
                </p>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}