import { useEffect, useState } from "react";
import { createBranchAPI, getBranchesByCourseAPI } from "../adminAPI";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { 
  GitBranch, 
  Users, 
  Plus, 
  ArrowLeft, 
  BookOpen, 
  Trash2, 
  Loader2,
  Trophy
} from "lucide-react";

const ManageBranches = ({ selectedCourse, onBack }) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    intakeCapacity: 60,
  });
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBranches = async () => {
    try {
      const res = await getBranchesByCourseAPI(selectedCourse._id);
      setBranches(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedCourse) fetchBranches();
  }, [selectedCourse]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Guard clause: Don't proceed if selectedCourse is missing
  if (!selectedCourse?._id) {
    console.error("No course selected");
    return;
  }

  setLoading(true);
  try {
    await createBranchAPI({
      ...form,
      courseId: selectedCourse._id, // This is where it was crashing
    });
    setForm({ name: "", code: "", intakeCapacity: 60 });
    fetchBranches();
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        
        {/* Course Info Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <button 
                onClick={onBack}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all active:scale-90"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">
                  <BookOpen className="w-3.5 h-3.5" /> Course Management
                </div>
                <h2 className="text-3xl font-black">{selectedCourse?.name}</h2>
                <p className="text-blue-100/80 text-sm mt-1">Managing specializations and seating for <span className="font-bold text-white">{selectedCourse?.code}</span></p>
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
                <p className="text-2xl font-black leading-none">{branches.reduce((acc, b) => acc + b.intakeCapacity, 0)}</p>
              </div>
            </div>
          </div>
          {/* Decorative circles */}
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
                  placeholder="e.g. Mechanical Engineering"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Branch Code</label>
                  <input
                    placeholder="e.g. ME"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all uppercase"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Intake</label>
                  <input
                    type="number"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                    value={form.intakeCapacity}
                    onChange={(e) => setForm({ ...form, intakeCapacity: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl shadow-gray-200 transition-all active:scale-95 disabled:opacity-70 mt-4 flex items-center justify-center gap-2"
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
                  <p className="text-gray-500 font-medium">No branches configured for this course.</p>
                </div>
              ) : (
                branches.map((b) => (
                  <div 
                    key={b._id}
                    className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {b.code.substring(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{b.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            <Users className="w-3 h-3" /> {b.intakeCapacity} Seats
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            {b.code}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
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