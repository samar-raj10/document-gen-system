import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

export function Profile() {
  const studentInfo = {
    name: "Samar Raj",
    rollNumber: "2427030312",
    email: "samar.raj@student.edu",
    phone: "+91 98765 43210",
    semester: "3rd Semester",
    department: "Computer Science & Engineering",
    dateOfBirth: "2004-08-15",
    address: "123 Main Street, City, State 12345",
  };

  return (
    <>
      {/* Header Section */}
        <section className="px-6 py-8 md:px-12 md:py-10 bg-linear-to-r from-white to-amber-50 border-b border-amber-100">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <User className="w-6 h-6" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
                My Profile
              </h1>
            </div>
            <p className="text-neutral-600 text-lg">
              View and manage your student profile information.
            </p>
          </div>
        </section>

        {/* Profile Section */}
        <section className="px-6 py-12 md:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header Card */}
            <div className="bg-white border border-neutral-200 rounded-lg p-8 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
                  <User className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                    {studentInfo.name}
                  </h2>
                  <p className="text-lg text-neutral-600 mb-3">
                    {studentInfo.department}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                    <span className="font-semibold text-amber-600">
                      Roll: {studentInfo.rollNumber}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-amber-600">
                      {studentInfo.semester}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white border border-neutral-200 rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6 border-b border-neutral-200 pb-4">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Email */}
                <div className="flex gap-4">
                  <div className="p-3 bg-amber-50 rounded-lg h-fit">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-lg text-neutral-900">{studentInfo.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="p-3 bg-amber-50 rounded-lg h-fit">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="text-lg text-neutral-900">{studentInfo.phone}</p>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="flex gap-4">
                  <div className="p-3 bg-amber-50 rounded-lg h-fit">
                    <Calendar className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
                      Date of Birth
                    </p>
                    <p className="text-lg text-neutral-900">{studentInfo.dateOfBirth}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="p-3 bg-amber-50 rounded-lg h-fit">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
                      Address
                    </p>
                    <p className="text-lg text-neutral-900">{studentInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-8 flex gap-3">
              <button className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors">
                Edit Profile
              </button>
              <button className="px-6 py-3 border border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </section>
    </>
  );
}

export default Profile;
