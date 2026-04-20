import React, { useEffect, useState } from "react";
import { 
  IndianRupee, 
  TrendingUp, 
  AlertCircle, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Building2
} from "lucide-react";
// Assuming you have a charting library like Recharts installed
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const FeesAnalyticsPage = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalPaid: 4500000,
    totalRemaining: 1200000,
    totalStudents: 1250,
  });

  // Mock Data for Branch-wise breakdown
  const branchData = [
    { name: "Computer Science", paid: 1200000, remaining: 200000, students: 300 },
    { name: "Mechanical", paid: 800000, remaining: 400000, students: 250 },
    { name: "Civil", paid: 950000, remaining: 150000, students: 220 },
    { name: "Electrical", paid: 750000, remaining: 250000, students: 200 },
    { name: "Electronics", paid: 800000, remaining: 200000, students: 280 },
  ];

  const COLORS = ['#4F46E5', '#EF4444'];

  return (
    <>
      <div className="space-y-8 animate-in fade-in duration-700">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Financial Analytics</h1>
            <p className="text-slate-500 font-medium italic text-sm">Academic Year 2025-26</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-50 transition-all">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              <Download size={16} /> Export PDF
            </button>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Paid This Year" 
            value={stats.totalPaid} 
            icon={<TrendingUp className="text-emerald-600" />} 
            color="bg-emerald-50"
            trend="+12% vs last year"
          />
          <StatCard 
            title="Remaining Balance" 
            value={stats.totalRemaining} 
            icon={<AlertCircle className="text-rose-600" />} 
            color="bg-rose-50"
            trend="Pending from 142 students"
          />
          <StatCard 
            title="Total Potential" 
            value={stats.totalPaid + stats.totalRemaining} 
            icon={<Users className="text-indigo-600" />} 
            color="bg-indigo-50"
            trend="100% Student Capacity"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Branch-wise Bar Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <Building2 className="text-indigo-600" /> Revenue vs Pending by Branch
            </h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={branchData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="paid" fill="#4F46E5" radius={[6, 6, 0, 0]} barSize={20} name="Fees Collected" />
                  <Bar dataKey="remaining" fill="#EF4444" radius={[6, 6, 0, 0]} barSize={20} name="Fees Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
               Audited Records
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
                    <th className="pb-4">Branch</th>
                    <th className="pb-4">Collected</th>
                    <th className="pb-4">Pending</th>
                    <th className="pb-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {branchData.map((branch, index) => (
                    <tr key={index} className="group">
                      <td className="py-4 font-bold text-slate-700 text-sm">{branch.name}</td>
                      <td className="py-4 font-black text-slate-900 text-sm">₹{branch.paid.toLocaleString('en-IN')}</td>
                      <td className="py-4 font-black text-rose-500 text-sm">₹{branch.remaining.toLocaleString('en-IN')}</td>
                      <td className="py-4 text-right text-[10px] font-black uppercase">
                        <span className={`px-3 py-1 rounded-full ${branch.remaining < 200000 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {((branch.paid / (branch.paid + branch.remaining)) * 100).toFixed(0)}% Collected
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

// Helper Stat Card Component
const StatCard = ({ title, value, icon, color, trend }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/40 relative overflow-hidden group">
    <div className="flex items-center justify-between mb-4 relative z-10">
      <div className={`p-3 rounded-2xl ${color}`}>
        {icon}
      </div>
      <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-slate-400">
        View Report <ArrowUpRight size={12} />
      </div>
    </div>
    <div className="relative z-10">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <h2 className="text-3xl font-black text-slate-900 mt-1">₹{value.toLocaleString('en-IN')}</h2>
      <p className="text-xs font-bold text-slate-500 mt-2">{trend}</p>
    </div>
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-50 rounded-full group-hover:scale-150 transition-all duration-700 opacity-50" />
  </div>
);

export default FeesAnalyticsPage;