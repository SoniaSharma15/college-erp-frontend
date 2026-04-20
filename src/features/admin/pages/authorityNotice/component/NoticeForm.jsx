import React, { useState } from "react";
import { 
  FileText, 
  User, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  Calendar, 
  AlignLeft, 
  RotateCcw, 
  Eye 
} from "lucide-react";
import { createNotice } 
from "../api/noticeApi";


const initialState = {
  action: "",
  personName: "",
  role: "",
  department: "",
  adminName: "",
  date: "",
  reason: ""
};

const NoticeForm = ({ setNoticeData }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
const [loading, setLoading] =
  useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
const handlePreview = async () => {

  if (!validateForm()) return;

  try {

    setLoading(true);

    // Send data to preview component
    setNoticeData(formData);

  } catch (error) {

    alert(
           "Failed to preview notice"
    );

  } finally {

    setLoading(false);

  }

};
  const validateForm = () => {
    let newErrors = {};
    if (!formData.action) newErrors.action = "Select action type";
    if (!formData.personName) newErrors.personName = "Person name required";
    if (!formData.role) newErrors.role = "Role required";
    if (!formData.department) newErrors.department = "Department required";
    if (!formData.adminName) newErrors.adminName = "Admin name required";
    if (!formData.date) newErrors.date = "Date required";
    if (!formData.reason) newErrors.reason = "Reason required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  if (!validateForm()) return;

  try {

    setLoading(true);

    await createNotice(formData);

    alert("Notice Saved Successfully");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Failed to save notice"
    );

  } finally {

    setLoading(false);

  }

};

  const handleReset = () => {
    setFormData(initialState);
    setNoticeData(null);
    setErrors({});
  };

  // Reusable Tailwind classes
  const labelClass = "block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 ml-1";
  const inputClass = "w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all duration-200 text-sm font-medium text-slate-700";
  const iconClass = "absolute left-3.5 top-[38px] text-slate-400 w-4 h-4";
  const errorClass = "text-rose-500 text-[10px] font-bold mt-1 ml-1 animate-pulse";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[2rem] p-6 md:p-8 space-y-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-3 border-b border-slate-50 pb-4 mb-2">
        <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
          <FileText size={20} />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Authority Notice</h2>
          <p className="text-xs text-slate-400 font-medium">Draft formal administrative directives</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Action Type */}
        <div className="relative">
          <label className={labelClass}>Action Type</label>
          <ShieldCheck className={iconClass} />
          <select
            name="action"
            value={formData.action}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select Action</option>
            <option value="Suspend">Suspend</option>
            <option value="Terminate">Terminate</option>
            <option value="Reinstate">Reinstate</option>
          </select>
          {errors.action && <p className={errorClass}>{errors.action}</p>}
        </div>

        {/* Person Name */}
        <div className="relative">
          <label className={labelClass}>Person Name</label>
          <User className={iconClass} />
          <input
            type="text"
            name="personName"
            placeholder="Recipient Name"
            value={formData.personName}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.personName && <p className={errorClass}>{errors.personName}</p>}
        </div>

        {/* Role */}
        <div className="relative">
          <label className={labelClass}>Role / Designation</label>
          <Briefcase className={iconClass} />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="Staff">Staff</option>
          </select>
          {errors.role && <p className={errorClass}>{errors.role}</p>}
        </div>

        {/* Department */}
        <div className="relative">
          <label className={labelClass}>Department</label>
          <Building2 className={iconClass} />
          <input
            type="text"
            name="department"
            placeholder="e.g. Computer Science"
            value={formData.department}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.department && <p className={errorClass}>{errors.department}</p>}
        </div>

        {/* Admin Name */}
        <div className="relative">
          <label className={labelClass}>Issuing Authority (Admin)</label>
          <User className={iconClass} />
          <input
            type="text"
            name="adminName"
            placeholder="Admin Name"
            value={formData.adminName}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.adminName && <p className={errorClass}>{errors.adminName}</p>}
        </div>

        {/* Date */}
        <div className="relative">
          <label className={labelClass}>Effective Date</label>
          <Calendar className={iconClass} />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.date && <p className={errorClass}>{errors.date}</p>}
        </div>

        {/* Reason - Full Width */}
        <div className="relative md:col-span-2">
          <label className={labelClass}>Formal Reason / Description</label>
          <AlignLeft className="absolute left-3.5 top-[38px] text-slate-400 w-4 h-4" />
          <textarea
            name="reason"
            placeholder="Provide a detailed explanation for this notice..."
            rows="4"
            value={formData.reason}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
          {errors.reason && <p className={errorClass}>{errors.reason}</p>}
        </div>
      </div>

     {/* Buttons */}
<div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-50">

  {/* Save Button */}
  <button
    type="submit"
    disabled={loading}
    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-green-700 active:scale-[0.98] transition-all shadow-lg shadow-green-100 disabled:opacity-50"
  >

    {loading ? "Saving..." : "Save Notice"}

  </button>

  {/* Preview Button */}
  <button
    type="button"
    onClick={handlePreview}
    disabled={loading}
    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
  >

    <Eye size={18} />
    Preview Notice

  </button>

  {/* Reset Button */}
  <button
    type="button"
    onClick={handleReset}
    className="flex items-center justify-center gap-2 bg-slate-100 text-slate-500 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-200 active:scale-[0.98] transition-all"
  >

    <RotateCcw size={18} />
    Reset Form

  </button>

</div>
    </form>
  );
};

export default NoticeForm;