import { useState } from "react";
import axios from "../../../services/axiosInstance";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { School, UserPlus, ShieldCheck, PlusCircle, Loader2 } from "lucide-react";

const CreateCollege = () => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    adminName: "",
    adminEmail: "",
    adminPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/college/create", form);
      alert("College Created Successfully ✅");
      setForm({ name: "", code: "", adminName: "", adminEmail: "", adminPassword: "" }); // Reset form
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Register New College</h2>
          <p className="text-gray-500 mt-2">Setup a new institutional entity and assign its primary administrator.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Section 1: College Details */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2 text-blue-600 font-semibold uppercase text-xs tracking-wider">
                <School className="w-4 h-4" />
                College Information
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Full College Name</label>
                <input 
                  name="name" 
                  value={form.name}
                  placeholder="e.g. Harvard Institute of Tech" 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Institution Code</label>
                <input 
                  name="code" 
                  value={form.code}
                  placeholder="e.g. HIT-2024" 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Section 2: Admin Details */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2 text-indigo-600 font-semibold uppercase text-xs tracking-wider">
                <UserPlus className="w-4 h-4" />
                Primary Admin Account
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Admin Name</label>
                <input 
                  name="adminName" 
                  value={form.adminName}
                  placeholder="Full Name" 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Admin Email</label>
                <input 
                  name="adminEmail" 
                  type="email"
                  value={form.adminEmail}
                  placeholder="admin@college.com" 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Set Password</label>
                <input 
                  name="adminPassword" 
                  type="password"
                  value={form.adminPassword}
                  placeholder="••••••••" 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-4 bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-200">
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 mr-auto ml-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              This will automatically grant College Admin privileges.
            </div>
            
            <button 
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            
            <button 
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  Create College
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateCollege;