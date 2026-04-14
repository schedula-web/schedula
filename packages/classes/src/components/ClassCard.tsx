export default function ClassCard({ cls }: any) {
  return (
    <div className="border rounded-2xl p-5 shadow-sm hover:shadow-md transition bg-white">

      {/* Top Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold">
          {cls.section || "A"}
        </div>

        <button className="text-gray-400 hover:text-blue-600">
          ✏️
        </button>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-1">
        Class {cls.className}
      </h2>

      {/* Teacher */}
      <p className="text-sm text-gray-500 mb-3">
        Class Teacher: {cls.classTeacher || "N/A"}
      </p>

      {/* Students */}
      <p className="text-sm font-medium">
        {cls.numberOfStudents || 0} Students
      </p>

      {/* Action */}
      <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">
        View Timetable →
      </button>
    </div>
  );
}