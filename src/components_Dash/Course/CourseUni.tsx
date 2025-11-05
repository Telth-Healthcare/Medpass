import React, { useEffect, useRef, useState } from "react";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  DollarSign,
  Search,
  Filter,
  Grid,
  List,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCourse, getCourseDetail } from "../../API/CourseApi";
import { toast } from "react-toastify";

const CourseCatalog = () => {
  const scrollRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const [courseRes, courseDetailRes] = await Promise.all([
        getCourse(),
        getCourseDetail(),
      ]);

      const courseList = courseRes?.results || [];
      const courseDetailList = courseDetailRes?.results || [];

      const mergedCourses = courseList
        .filter((course) => courseDetailList.some((d) => d.course === course.id))
        .map((course) => {
          const detail = courseDetailList.find((d) => d.course === course.id);

          return {
            id: course.id,
            title: course.name,
            code: course.code,
            duration: course.duration,
            price: course.fees,
            department: detail?.department || "N/A",
            application_status: detail?.application_status || "CLOSED",
            summary: detail?.summary || "",
            qualifications: detail?.qualifications || "",
            credits: detail?.credit_hours || 0,
            poster: detail?.poster || "",
            rating: detail?.rating ?? course.average_rating ?? 0,
            location: course.location,
            university: course.university,
          };
        });

      setCourses(mergedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel =
      levelFilter === "all" || course.level === levelFilter;
    const matchesStatus =
      statusFilter === "all" ||
      course.application_status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesLevel && matchesStatus;
  });

  const handleNavigate = (course) => {
    navigate("/course-details", { state: { from: course } });
  };

  return (
    <div
      ref={scrollRef}
      style={{ overflowY: "scroll", height: "200px" }}
      className="min-h-screen bg-gray-50 py-4 px-4 sm:px-6 lg:px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Search + Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses, departments..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg ${viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-500 hover:bg-gray-100"
                  }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-lg ${viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-500 hover:bg-gray-100"
                  }`}
                onClick={() => setViewMode("list")}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filter by:
              </span>
            </div>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Course Cards */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "grid grid-cols-1 gap-6 max-w-4xl mx-auto"
          }
        >
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group h-full flex flex-col"
            >
              {/* Poster */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.poster || "https://via.placeholder.com/300x200"}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm font-bold text-gray-800">
                    {course.code}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {course.title}
                </h3>
                <p className="text-sm text-blue-600 font-medium mb-2">
                  {course.department}
                </p>

                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">
                    {course.rating ? course.rating.toFixed(1) : "N/A"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">
                      {course.credits} Credits
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      {course.duration} Weeks
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600">
                      ${course.price}
                    </span>
                  </div>
                </div>

                <button
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${course.application_status === "OPEN"
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  disabled={course.application_status === "CLOSED"}
                  onClick={() => handleNavigate(course)}
                >
                  {course.application_status === "OPEN" && "Enroll Now"}
                  {course.application_status === "CLOSED" && "Enrollment Closed"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;
