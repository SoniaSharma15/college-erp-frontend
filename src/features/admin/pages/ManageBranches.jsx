import { useEffect, useState } from "react";
import { createBranchAPI, getBranchesByCourseAPI, getCoursesAPI } from "../adminAPI"; 
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { 
  GitBranch, 
  Users, 
  Plus, 
  ArrowLeft, 
  BookOpen, 
  Trash2, 
  Loader2,
  IndianRupee,
  Search,
  ChevronRight
} from "lucide-react";

const ManageBranches = ({ selectedCourse: initialCourse, onBack }) => {
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [allCourses, setAllCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    intakeCapacity: "", 
    generalFees: "",    
  });
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCourses, setFetchingCourses] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all courses using the existing getCoursesAPI from adminAPI.js
  const fetchAllCourses = async () => {
    setFetchingCourses(true);
    try {
      const res = await getCoursesAPI();
      // Adjusting to common response structure (res.data.data or res.data)
      setAllCourses(res.data.data || res.data || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setFetchingCourses(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await getBranchesByCourseAPI(selectedCourse._id);
      setBranches(res.data.data || res.data || []);
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  };

  useEffect(() => {
    if (!selectedCourse) {
      fetchAllCourses();
    } else {
      fetchBranches();
    }
  }, [selectedCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse?._id) return;

    setLoading(true);
    try {
      await createBranchAPI({
        ...form,
        intakeCapacity: Number(form.intakeCapacity),
        generalFees: Number(form.generalFees),
        courseId: selectedCourse._id,
      });
      setForm({ name: "", code: "", intakeCapacity: "", generalFees: "" });
      fetchBranches();
    } catch (err) {
      console.error("Error creating branch:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = allCourses.filter(course => 
    course.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- SELECTION VIEW (If no course is active) ---
  if (!selectedCourse) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Select a Course</h2>
              <p className="text-gray-500 text-sm">Choose a course to manage its branches.</p>
            </div>
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fetchingCourses ? (
              <div className="col-span-full py-20 flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Loading Courses...</p>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 italic">No courses found matching your search.</p>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <button
                  key={course._id}
                  onClick={() => setSelectedCourse(course)}
                  className="group flex items-center justify-between p-5 bg-white border border-gray-200 rounded-3xl text-left hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center font-bold text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                      {course.code?.substring(0, 2) || "CO"}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{course.name}</h4>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{course.code}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // --- MANAGEMENT VIEW (If course is selected) ---
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        
        {/* Course Info Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <button 
                onClick={() => setSelectedCourse(null)} 
                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all active:scale-90"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">
                  <BookOpen className="w-3.5 h-3.5" /> Course Management
                </div>
                <h2 className="text-3xl font-black">{selectedCourse?.name}</h2>
                <p className="text-blue-100/80 text-sm mt-1">Managing branches for <span className="font-bold text-white">{selectedCourse?.code}</span></p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
              <div className="text-right">
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-tighter">Total Branches</p>
                <p className="text-2xl font-black leading-none">{branches.length}</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-right">
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-tighter">Total Capacity</p>
                <p className="text-2xl font-black leading-none">
                  {branches.reduce((acc, b) => acc + (Number(b.intakeCapacity) || 0), 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Creation Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" /> Add New Branch
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Branch Name</label>
                <input
                  placeholder="e.g. Civil Engineering"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Branch Code</label>
                  <input
                    placeholder="e.g. CE"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all uppercase"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Intake</label>
                  <input
                    type="number"
                    placeholder="60"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    value={form.intakeCapacity}
                    onChange={(e) => setForm({ ...form, intakeCapacity: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">General Fees (Per Year)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full p-3 pl-9 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                    value={form.generalFees}
                    onChange={(e) => setForm({ ...form, generalFees: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl transition-all active:scale-95 disabled:opacity-70 mt-4 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register Branch"}
              </button>
            </form>
          </div>

          {/* Branches Display Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {branches.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <GitBranch className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No branches configured.</p>
                </div>
              ) : (
                branches.map((b) => (
                  <div 
                    key={b._id}
                    className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                                {b.code?.substring(0, 2) || "BR"}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{b.name}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{b.code}</p>
                            </div>
                        </div>
                        <button className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-xs font-bold text-gray-600">{b.intakeCapacity} Seats</span>
                        </div>
                        <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                            <IndianRupee className="w-3 h-3 text-emerald-600" />
                            <span className="text-xs font-black text-emerald-700">
                                {Number(b.generalFees || 0).toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageBranches;