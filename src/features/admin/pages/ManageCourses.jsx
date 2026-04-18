import { useEffect, useState } from "react";
import { createCourseAPI, getCoursesAPI } from "../adminAPI";
import DashboardLayout from "../../../components/layout/DashboardLayout";

import { 
  BookOpen, 
  Plus, 
  Layers, 
  Calendar, 
  GraduationCap, 
  ArrowRight, 
  Search,
  Loader2,
  Trash2
} from "lucide-react";

const ManageCourses = ({ navigateToBranches }) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    degreeType: "UG",
    durationYears: "",
    totalSemesters: "",
  });

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await getCoursesAPI();
      setCourses(res.data.data || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCourseAPI({
        ...form,
        durationYears: Number(form.durationYears),
        totalSemesters: Number(form.totalSemesters),
      });
      setForm({ name: "", code: "", degreeType: "UG", durationYears: "", totalSemesters: "" });
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* 1. Header & Quick Creation Form */}
      <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Plus className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Course</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="lg:col-span-1 space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Course Name</label>
            <input
              placeholder="e.g. B.TECH"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Code</label>
            <input
              placeholder="9999"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Type</label>
            <select
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm appearance-none"
              value={form.degreeType}
              onChange={(e) => setForm({ ...form, degreeType: e.target.value })}
            >
              <option value="UG">Undergraduate (UG)</option>
              <option value="PG">Postgraduate (PG)</option>
              <option value="Diploma">Diploma</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Dur / Sems</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Yrs"
                className="w-1/2 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                value={form.durationYears}
                onChange={(e) => setForm({ ...form, durationYears: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Sems"
                className="w-1/2 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                value={form.totalSemesters}
                onChange={(e) => setForm({ ...form, totalSemesters: e.target.value })}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Course"}
          </button>
        </form>
      </section>

      {/* 2. Course Catalog */}
      <section>
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-gray-400" />
            Existing Courses
          </h3>
          <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full border border-gray-200">
            {courses.length} Total
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div 
              key={course._id} 
              className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen className="w-12 h-12" />
              </div>

              <div className="flex items-start justify-between mb-4">
                <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-blue-100">
                  {course.degreeType}
                </div>
                <button className="text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h4 className="text-lg font-bold text-gray-900 truncate pr-4">{course.name}</h4>
              <p className="text-sm font-medium text-gray-400 mb-6">{course.code}</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-600">{course.durationYears} Yrs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-600">{course.totalSemesters} Sems</span>
                </div>
              </div>

              <button
                onClick={() => navigateToBranches(course)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 group-hover:bg-blue-600 group-hover:text-white rounded-xl text-sm font-bold text-gray-600 transition-all"
              >
                Manage Branches
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
    </DashboardLayout>
  );
};

export default ManageCourses;