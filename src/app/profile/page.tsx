import Logo_profile from "@/components/logo_profile";

export default function ProfilePage() {
  // Placeholder user data
  const user = {
    username: "anurag0hcpq",
    fullName: "Anurag Maurya",
    email: "anurag@example.com",
    contact: "9876543210",
    language: "English",
    profession: "Student",
    coursesGenerated: 5,
    coursesCompleted: 3,
    quizzesAttempted: 8,
  };


  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Topbar */}
      <div className="flex items-center justify-between bg-gray-800 p-4 shadow-md">
        <div className="flex items-center">
          <Logo_profile />
        </div>
        <input
          type="text"
          placeholder="Search courses..."
          className="p-2 rounded bg-gray-700 text-white w-96"
        />
      </div>

      {/* Main content */}
      <div className="flex p-6">
        {/* Left Profile Box */}
        <div className="w-1/4 p-16 bg-gray-800 rounded-lg shadow-md text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center text-3xl font-bold">
            A
          </div>
          <p className="text-sm text-gray-300">{user.username}</p>
          <p className="text-lg font-semibold">{user.fullName}</p>
        </div>

        {/* Stats + Info */}
        <div className="w-3/4 pl-6">
          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
              <p className="text-2xl font-bold">{user.coursesGenerated}</p>
              <p className="text-sm text-gray-300">Courses Generated</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
              <p className="text-2xl font-bold">{user.coursesCompleted}</p>
              <p className="text-sm text-gray-300">Courses Completed</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
              <p className="text-2xl font-bold">{user.quizzesAttempted}</p>
              <p className="text-sm text-gray-300">Quizzes Attempted</p>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <p><strong>Full Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact Number:</strong> {user.contact}</p>
            <p><strong>Preferred Language:</strong> {user.language}</p>
            <p><strong>Profession:</strong> {user.profession}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
